import * as fs from 'fs';
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.use(express.json());
app.use(express());
app.use(cors());

app.post('/api/cover-letters', async (request, response) => {
  if (!request.body) response.status(403).send({ message: 'Content mising' });

  const { jobTitle, jobDescription, companyName, language, experience } =
    request.body;

  let prompt = `
  Job Title: ${jobTitle}
  Company name: ${companyName}
  Previous experience: ${experience}
  Cover letter language: ${language}
  Job description: ${jobDescription}`;

  const firstParagraph = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${prompt}\n. Imagine you are the person above. Create a single paragraph in which you will convey who you are, what position you are interested in and summarize what you have to offer. Do not put placeholders, not opening or closing formulas such as 'Dear...', 'Sincerly...'. Just a single paragraph.`,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const secondParagraph = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${prompt}\n. Imagine you are the person above. Create a single paragraph in which you will focus on you are a great fit drawing parallels between the experience included in the resume and the qualifications on the job description. Do not put placeholders, not opening or closing formulas such as 'Dear...', 'Sincerly...'. Just a single paragraph.`,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const thirdParagraph = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `${prompt}\n. Imagine you are the person above. Create a single paragraph in which restate your interest in the organization and/or job and summarize what you have to offer and thank the reader for their time and consideration. Do not put placeholders, not opening or closing formulas such as 'Dear...', 'Sincerly...'. Just a single paragraph.`,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (!firstParagraph || !secondParagraph || !thirdParagraph)
    response
      .status(500)
      .send({ error: 'The content of the cover letter was not generated' })
      .end();
  else {
    response.send([
      firstParagraph.choices[0].message,
      secondParagraph.choices[0].message,
      thirdParagraph.choices[0].message,
    ]);
  }
});

app.listen(process.env.PORT, () => {
  console.log('Listening');
});
