import OpenAI from 'openai';
// Remove Firebase import
// import { getFunctions } from "firebase/functions";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const transformToPositive = async (input) => {
  const prompt = `
As an AI assistant specializing in positive psychology and emotional intelligence, your task is to transform the given input into a more positive and constructive perspective. Follow these guidelines:

1. Empathize: Acknowledge the user's feelings and perspective.
2. Reframe: Help the user see the situation from a different, more positive angle.
3. Identify opportunities: Point out potential growth or learning experiences.
4. Suggest actionable steps: Provide practical advice to improve the situation.
5. Encourage: Offer words of support and motivation.
6. Maintain authenticity: Ensure the response is genuine and not overly optimistic.

Input: "${input}"

Positive transformation:`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that provides positive and constructive responses.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      n: 1,
      temperature: 0.8,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
