const axios = require("axios");

const generateResume = async (req, res) => {
  try {
    const { jobTitle, skills, experience } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ success: false, message: "Job title is required" });
    }

    const promptText = `
You are an expert resume writer.
Create a professional ATS-friendly resume summary for a candidate with the following details:
Job Title: ${jobTitle}
Skills: ${skills || "Not specified yet"}
Experience: ${experience || "Not specified yet"}

Return only 3-4 sentences of a professional summary. Do not include any extra text, markdown, or headers. Just the paragraph.
`;

    const apiKey = process.env.OPENAI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(url, {
      contents: [{ parts: [{ text: promptText }] }]
    });

    // ✅ Gemini se raw text nikalna
    let resultText = response.data.candidates[0].content.parts[0].text;
    
    // Agar Gemini ne quotes ya backticks lagaye ho toh saaf karna
    resultText = resultText.replace(/```json|```/g, "").trim();

    // Frontend ko direct text ya object dono format mein bhej rahe hain taaki koi galti na ho
    res.json({
      success: true,
      data: {
        summary: resultText
      }
    });

  } catch (error) {
    console.error("❌ GEMINI API ERROR:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "AI setup configuration issue",
    });
  }
};

module.exports = { generateResume };