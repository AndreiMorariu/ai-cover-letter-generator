import * as fs from "fs";
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

import trimString from "./helpers/stringTrim.js";

const app = express();
const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.use(express.json());
app.use(express());
app.use(cors());

const coverLetterContent = fs.readFileSync("coverLetterContent.txt", "utf8");

app.post("/api/cover-letters", async (req, res) => {
  const {
    name,
    email,
    jobTitle,
    jobDescription,
    companyName,
    language,
    experience,
    phoneNumber,
    address,
  } = req.body;

  let finalString = `
Name: ${name}
Email: ${email}
Phone number: ${phoneNumber}
address: ${address}
Job Title: ${jobTitle}
Company name: ${companyName}
Previous experience: ${experience}
Language: ${language} 
Job description: 
"${jobDescription}".

${coverLetterContent}`;

  finalString = trimString(finalString);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: finalString,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.json({ data: response.choices[0].message.content });
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
