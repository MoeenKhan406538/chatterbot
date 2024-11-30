import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: body.messages,
      });

      console.log(completion.choices[0].message);
      const theResponse = completion.choices[0].message;

      res.status(200).json({ output: theResponse });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
