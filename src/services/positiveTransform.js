import OpenAI from 'openai';
// Remove Firebase import
// import { getFunctions } from "firebase/functions";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Changed to VITE_OPENAI_API_KEY

if (!API_KEY) {
  console.error("OpenAI API key is missing. Please check your .env file.");
}

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // Note: This is not recommended for production
});

// Remove Firebase functions usage
// const functions = getFunctions(app);

export const transformToPositive = async (message) => {
  if (!API_KEY) {
    return "I apologize, but I'm unable to process your request at the moment due to a configuration issue. Please try again later.";
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Changed to a valid model name
      messages: [
        { role: 'system', content: 'You are a spiritual healer. Your purpose is to provide guidance that encompasses all aspects of spirituality, including insights from the universe and cosmic wisdom.' },
        { role: 'user', content: message }
      ],
      max_tokens: 200,
      temperature: 0.85,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in transformToPositive:', error);
    return "I'm here to help you find peace and clarity. Let's work through this together.";
  }
};
