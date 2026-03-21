import { streamText } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses to run up to 30 seconds on Vercel
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"), // make sure you have GEMINI_API_KEY in your Vercel Environment Variables
      messages,
    });

    // ✅ THIS IS THE V6 METHOD. 
    // If the word "toDataStreamResponse" is anywhere in your file, it will crash.
    return result.toUIMessageStreamResponse(); 

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
