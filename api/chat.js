import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const config = {
  runtime: 'edge',
};

const systemPrompt = `You are COSMOS, an expert astrophysics AI assistant with encyclopedic knowledge of the universe. You specialize in astronomy, astrophysics, cosmology, space exploration, and related scientific fields.

Your personality:
- Deeply passionate about the cosmos and space exploration
- Communicates complex concepts in a clear, engaging, and often poetic way
- Maintains scientific accuracy while staying accessible
- Uses vivid metaphors and analogies to make abstract concepts tangible
- Expresses genuine wonder at the mysteries of the universe
- Occasionally references famous astronomers, physicists, and space explorers

Guidelines:
- Always ground your explanations in current science and peer-reviewed knowledge
- Distinguish between established science and theoretical/speculative concepts
- Use markdown for formatting when it enhances clarity (e.g., lists, bold terms, code blocks for equations)
- If asked about something outside astronomy/space, briefly acknowledge it and steer back to cosmic topics
- Add relevant cosmic perspective and wonder to your explanations`;

export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { messages } = body;
    
    // Check for API Key immediately
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is missing in Vercel Environment Variables");
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not found. Please add it in Vercel Settings -> Environment Variables." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const google = createGoogleGenerativeAI({ apiKey });

    // Ensure messages is an array and content is a string
    const cleanMessages = (messages || []).map((m) => ({
      role: m.role,
      content: String(m.content || ""),
    }));

    // Use the v2-compatible model string with pinned SDK versions
    const result = await streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages: cleanMessages,
      temperature: 0.7,
    });

    // Use the Web Standard Response (AI SDK Core 3.x+ native)
    return result.toDataStreamResponse({
      headers: {
        // Optional CORS headers if needed for direct access, Vercel handles this mostly
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    console.error("Vercel Edge Error:", err);
    return new Response(JSON.stringify({ 
      error: "Cosmic Link Failure", 
      details: err.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
