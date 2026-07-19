import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import * as dotenv from "dotenv";

dotenv.config();

let genAIInstance = null;
let embeddingsInstance = null;

const requireEnvironmentVariable = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing.`);
  }

  return value;
};

export const getGoogleGenAI = () => {
  if (!genAIInstance) {
    const apiKey = requireEnvironmentVariable("GEMINI_API_KEY");

    genAIInstance = new GoogleGenerativeAI(apiKey);
    console.log("GoogleGenerativeAI client initialized.");
  }

  return genAIInstance;
};

export const getEmbeddings = () => {
  if (!embeddingsInstance) {
    const apiKey = requireEnvironmentVariable("GEMINI_API_KEY");

    embeddingsInstance = new GoogleGenerativeAIEmbeddings({
      apiKey,
      model: "gemini-embedding-001",

      // Keep this only if your installed package actually returns 768.
      // outputDimensionality: 768,
    });

    console.log("GoogleGenerativeAIEmbeddings initialized.");
  }

  return embeddingsInstance;
};