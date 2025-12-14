export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY in environment variables");
      return res.status(500).json({ 
        reply: "Server configuration error. Please contact support." 
      });
    }

    console.log("Incoming message:", messages[messages.length - 1]?.text);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
You are UrbanReporter AI Assistant.

Your job:
1. Understand the user's civic issue (garbage, potholes, sewage, streetlights, etc.)
2. Ask follow-up questions if details are missing.
3. When you have a complete report, OUTPUT ONLY this JSON:

#FINAL_REPORT
{
  "name": "<user name>",
  "issueType": "<issue type>",
  "location": "<location>",
  "description": "<description>"
}

RULES:
- ALWAYS include "#FINAL_REPORT" before the JSON.
- DO NOT add any text before or after the JSON.
- DO NOT format with Markdown or backticks.
- DO NOT explain the JSON.`,
            },
            ...messages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", response.status, errorData);
      return res.status(500).json({
        reply: "AI service temporarily unavailable. Please try again later.",
      });
    }

    const data = await response.json();

    console.log("Groq raw reply:", JSON.stringify(data, null, 2));

    if (data?.choices?.length > 0 && data.choices[0]?.message?.content) {
      return res.status(200).json({
        reply: data.choices[0].message.content,
      });
    } else {
      return res.status(200).json({
        reply: "AI did not respond properly. Please check your API key or try again.",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      reply: "AI server error. Try again later.",
    });
  }
}

