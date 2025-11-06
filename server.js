import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY in .env");
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    console.log("📨 Incoming message:", messages[messages.length - 1].text);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // ✅ use stable Groq model
        messages: [
          {
            role: "system",
            content:
              "You are UrbanReporter AI Assistant. Help users report civic issues like garbage, sewage, potholes, streetlights. Be short, friendly, and helpful.",
          },
          ...messages.map((m) => ({ role: m.role, content: m.text })),
        ],
      }),
    });

    const data = await response.json();

    console.log("🧠 Groq raw reply:", JSON.stringify(data, null, 2));

    if (data?.choices?.length > 0 && data.choices[0]?.message?.content) {
      return res.json({ reply: data.choices[0].message.content });
    } else {
      return res.json({
        reply:
          "⚠️ AI did not respond properly. Please check your GROQ_API_KEY or try again later.",
      });
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      reply: "⚠️ AI server error. Try again later.",
    });
  }
});
app.get("/", (req, res) => {
  res.send("✅ UrbanReporter AI API is running successfully!");
});

app.listen(5000, () =>
  console.log("✅ Groq AI server running on http://localhost:5000")
);
