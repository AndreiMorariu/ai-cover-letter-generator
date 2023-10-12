import * as fs from "fs";
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import pdf from "pdf-creator-node";

import trimString from "./helpers/stringTrim.js";

const app = express();
const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.use(express.json());
app.use(express());
app.use(cors());

let coverLetterContent;
let html;
try {
  coverLetterContent = fs.readFileSync("coverLetterContent.txt", "utf8");
  html = fs.readFileSync("template.html", "utf8");
} catch (error) {
  console.error(error);
}

const options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Cover Letter</div>',
  },
};

app.post("/api/cover-letters", async (request, response) => {
  if (!coverLetterContent || !html) {
    response.status(500);
    return;
  }

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
  } = request.body;

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

  const coverLetterResponse = await openai.chat.completions.create({
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

  if (!coverLetterResponse) {
    response
      .status(500)
      .send({ message: "The content of the cover letter was not generated" });
    return;
  }

  const document = {
    html: html.replace(
      "{{ data }}",
      coverLetterResponse.choices[0].message.content,
    ),
    data: finalString,
    path: "../client/public/output.pdf",
    type: "",
  };

  pdf
    .create(document, options)
    .then((res) => {
      response.send({
        message: coverLetterResponse.choices[0].message.content,
      });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send({ message: "Error creating the pdf" });
    });
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
