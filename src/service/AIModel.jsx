/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel plan for X, for U days, for Y with a Z budget. Give me Hotels option list with Hotel name, hotel image url, price, rating, description and suggest an itinerary with place name, place details, place image ulr, geo coorinates, ticket pricing, time to travel to each location for U days with each day with best time to visit in JSON format."},
          ],
        },
        
      ],
    });

  
  