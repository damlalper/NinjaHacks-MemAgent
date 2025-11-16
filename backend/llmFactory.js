const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
const { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");

/**
 * Creates and returns the appropriate LLM and Embeddings models based on the
 * configured provider in the environment variables.
 *
 * @returns {{llm: object, embeddings: object}} An object containing the initialized
 *          language model and embeddings model.
 */
function createModels() {
  const provider = process.env.LLM_PROVIDER || "GEMINI"; // Default to Gemini

  if (provider.toUpperCase() === "GEMINI") {
    console.log("Using Gemini models.");
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables.");
    }
    const llm = new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        modelName: "gemini-pro",
    });
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        modelName: "embedding-001", // Gemini's embedding model
    });
    return { llm, embeddings };
  }

  if (provider.toUpperCase() === "OPENAI") {
    console.log("Using OpenAI models.");
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not found in environment variables.");
    }
    const llm = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-3.5-turbo",
    });
    const embeddings = new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: "text-embedding-3-small",
    });
    return { llm, embeddings };
  }

  throw new Error(`Unsupported LLM_PROVIDER: "${provider}". Please use "GEMINI" or "OPENAI".`);
}

module.exports = { createModels };
