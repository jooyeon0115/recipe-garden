let savedRecipes = [];
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/recipe", async (req, res) => {
  const { ingredients } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `재료: ${ingredients}
이 재료로 만들 수 있는 요리 레시피를 하나 추천해줘.
요리 이름, 간단한 설명, 조리 방법을 알려줘.`,
        },
      ],
    });

    res.json({
      recipe: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "AI 오류 발생" });
  }
});

app.listen(3000, () => {
  console.log("🌱 Recipe Garden 서버 실행 중!");
});
