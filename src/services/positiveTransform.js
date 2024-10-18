import OpenAI from 'openai';
// Remove Firebase import
// import { getFunctions } from "firebase/functions";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

let openai;

try {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
} catch (error) {
  console.error("Error initializing OpenAI:", error.message);
}

export async function transformToPositive(input) {
  if (!openai) {
    console.error("OpenAI client is not initialized. Please check your API key configuration.");
    return "I apologize, but I'm unable to process your request at the moment. Please try again later.";
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a mystical healer assistant. Transform the user's input into a positive, uplifting message that promotes healing and well-being." },
        { role: "user", content: input }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm sorry, but I couldn't process your request. Let's focus on positive energy and try again.";
  }
}
