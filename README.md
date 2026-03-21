# Cosmos AI 🌌

## What was built
Cosmos AI is a modern, full-stack chatbot web application. It features a stunning space-themed UI with a star background, glassmorphism elements, and sleek typography. 

**Tech Stack:**
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **AI Integration:** Google Generative AI (Gemini), Vercel AI SDK

The application supports real-time streaming responses, graceful error handling, and a fully responsive design that works seamlessly on both desktop and mobile devices. A local Express server (`local.js`) acts as a proxy for the backend, maintaining a clean architecture that runs locally easily while being ready for production deployments.

## Why this topic was chosen
I chose the theme of "Cosmos" because space represents exploration, intelligence, and the limitless future—concepts that perfectly align with interacting with artificial intelligence.

Standard chatbot interfaces are often sterile, minimal, and overly corporate. By introducing a dark, moody galactic aesthetic with animated stars and pulsars, the application offers an immersive, premium, and visually engaging user experience that makes chatting with the AI feel like you are communicating with an advanced computer terminal from the future.

## Getting Started

1. Set up your `.env.local` file with your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Start the local backend server (if required):
   ```bash
   npm run server
   ```
