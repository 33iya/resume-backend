const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =======================
// AI RESUME GENERATOR
// =======================
const generateResume = async (req, res) => {
  try {
    const { jobTitle, skills, experience } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        message: "Job title is required",
      });
    }

    const prompt = `
You are an expert resume writer.

Create a professional ATS-friendly resume content for:

Job Title: ${jobTitle}
Skills: ${skills}
Experience: ${experience}

Return output in JSON format:
{
  "summary": "",
  "skills": [],
  "experiencePoints": [],
  "improvementTips": []
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "AI generation failed",
    });
  }
};

module.exports = {
  generateResume,
};