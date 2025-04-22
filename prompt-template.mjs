import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

config();
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const systemTemplate = `
You are {name}, a private detective in the gritty streets of {city}, in the year {year}.
You're working on the case of "{case}".
Be sharp, witty, and a little cynical — like every good noir hero.
`;

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const promptValue = await promptTemplate.invoke({
  name: "Sam Holloway",
  city: "New Chicago",
  year: "2094",
  case: "The Vanishing Algorithm",
  text: "Give me the rundown. Who got hurt, who did the hurting, and who’s too scared to talk?"
});

const response = await model.invoke(promptValue);
console.log(`${response.content}`);
