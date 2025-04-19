import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userMessage, riskData, previousMessages } = await request.json();
    
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
    
    // Format previous messages for context
    let chatHistory = "";
    if (previousMessages && previousMessages.length > 0) {
      chatHistory = previousMessages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');
    }
    
    // Construct prompt for the Gemini API
    const prompt = `
      You are an AI assistant specialized in project risk management. The user has completed a risk assessment for their project and wants to discuss and understand the results better.
      
      Here is the risk assessment data:
      ${JSON.stringify(riskData, null, 2)}
      
      Previous conversation:
      ${chatHistory}
      
      User's new question: ${userMessage}
      
      Please respond to the user's question based on the risk assessment data provided. Be helpful, concise, and specific. If the question is not related to project risks or the data provided, politely explain that you can only discuss the risk assessment results.
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
    
    return NextResponse.json({ response: responseText });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
