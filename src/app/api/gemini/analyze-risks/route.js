import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { projectData } = await request.json();
    
    // Get the API key from environment variable first, then cookies
    let apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      apiKey = request.cookies.get("gemini-api-key")?.value;
    }
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not provided" },
        { status: 400 }
      );
    }
    
    // Construct prompt for the Gemini API
    const prompt = `
      You are a project risk analysis assistant.

      Analyze the following project for potential risks using only the provided details.
      Use standard risk management terminology and avoid speculation or unrelated risks.
      Do not invent risks not directly supported by the input. Do not use synonyms for the same risk in different runs.
      Use concise, formal language. For the same input, always return the same risks, in the same order, with the same wording, be very deterministic.

      Project Name: ${projectData.projectName}
      Industry: ${projectData.industry}
      Budget: $${projectData.budget}
      Timeline: ${projectData.timeline} months
      Team Size: ${projectData.teamSize}

      Description: ${projectData.projectDescription}

      Objectives: ${projectData.objectives}

      Constraints: ${projectData.constraints}

      Identify 5-10 relevant risks for this project. For each risk:
      - title: A brief, descriptive name
      - probability: Integer 1-5 (1=very low, 5=very high)
      - impact: Integer 1-5 (1=minimal, 5=severe)
      - mitigation: 1-2 sentence practical mitigation strategy

      Rank the risks by severity (probability × impact), highest first.
      Output ONLY a JSON array of risk objects, each with the following structure and field order:
      [
        {
          "title": "Risk title/description",
          "probability": 1-5,
          "impact": 1-5,
          "mitigation": "Brief mitigation strategy"
        }
      ]
      Do not include any explanation, commentary, or formatting outside the JSON array.
    `;
    
    // Call the Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );
    
    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Error calling Gemini API", details: errorData },
        { status: 500 }
      );
    }
    
    const data = await geminiResponse.json();
    
    // Extract the text from Gemini's response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return NextResponse.json(
        { error: "Invalid response from Gemini API" },
        { status: 500 }
      );
    }
    
    // Parse the JSON risks from the response text
    // This uses a regex to find JSON array between square brackets
    const risksMatch = responseText.match(/\[[\s\S]*\]/);
    
    if (!risksMatch) {
      return NextResponse.json(
        { error: "Could not parse risks from API response" },
        { status: 500 }
      );
    }
    
    try {
      const risks = JSON.parse(risksMatch[0]);
      
      // Validate the response structure
      const validatedRisks = risks.map(risk => ({
        title: risk.title || "Undefined Risk",
        probability: parseInt(risk.probability) || 3,
        impact: parseInt(risk.impact) || 3,
        mitigation: risk.mitigation || "No mitigation strategy provided"
      }));
      
      return NextResponse.json({ risks: validatedRisks });
    } catch (parseError) {
      console.error("Error parsing JSON from Gemini response:", parseError);
      return NextResponse.json(
        { error: "Error parsing JSON from Gemini response", details: parseError.message },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}