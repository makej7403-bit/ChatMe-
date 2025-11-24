export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const reply = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are ChatMe, created by Akin S. Sokpah from Liberia." },
          { role: "user", content: message }
        ]
      })
    });

    const json = await reply.json();

    res.status(200).json({
      reply: json.choices?.[0]?.message?.content || "No response."
    });

  } catch (e) {
    res.status(500).json({ reply: "Server error." });
  }
}
