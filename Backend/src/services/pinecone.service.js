import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

let pineconeClient = null;

const getRequiredEnvironmentVariable = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing.`);
  }

  return value;
};

const getPineconeClient = () => {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: getRequiredEnvironmentVariable(
        "PINECONE_API_KEY",
      ),
    });

    console.log("Pinecone client initialized.");
  }

  return pineconeClient;
};

export { getPineconeClient };