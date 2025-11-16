# MemAgent AI - Memory-as-a-Service Platform

**Tagline:** “Give any web app a persistent, centralized brain.”

MemAgent AI has evolved from a simple client-side SDK into a robust, full-stack "Memory-as-a-Service" platform. It provides a centralized, persistent memory layer for any number of web applications through a simple and secure API, powered by a Node.js backend and a vector database.

This new architecture is secure, scalable, and enterprise-ready, making it ideal for building sophisticated AI agents that learn and remember across sessions and users.

## New Architecture

The system is now composed of two main parts:

1.  **Backend Service (`/backend`):** A Node.js server using Express.js that:
    *   Exposes a secure `/api/chat` endpoint.
    *   Manages the OpenAI API key, keeping it off the client.
    *   Uses **LangChain.js** to handle interactions with AI models.
    *   Stores and retrieves memories as vectors in a **ChromaDB** database.
    *   Handles the logic of retrieving relevant context, enriching prompts, and saving new interactions.

2.  **Frontend SDK (`/src/memagent.js`):** A lightweight JavaScript client that:
    *   Provides a simple `init()` and `chat()` function for easy integration.
    *   Communicates with the backend service.
    *   Can be dropped into any web application to give it a "brain."

## Features

- **Centralized Memory:** Memory is stored on the server, not the client, allowing it to be persistent across devices and sessions.
- **Secure:** API keys and sensitive logic are kept securely on the backend.
- **Scalable:** Built with a proper vector database (ChromaDB) that can handle large amounts of memory.
- **Simple Integration:** The frontend SDK is even simpler, requiring just one primary function (`chat`) to interact with the AI.
- **Demo Apps:** The chat and to-do demos have been updated to use the new backend-powered SDK.

## How to Run the System

### Step 1: Configure the Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create an environment file:** Copy the example `.env.example` file to a new file named `.env`.
    ```bash
    # On Windows
    copy .env.example .env

    # On macOS/Linux
    cp .env.example .env
    ```

3.  **Edit your `.env` file:** Open the new `.env` file in a text editor and configure your desired AI provider.

    **To use Gemini (Default):**
    *   Set `LLM_PROVIDER="GEMINI"`.
    *   Add your Google Gemini API key to `GEMINI_API_KEY`.

    **To use OpenAI:**
    *   Set `LLM_PROVIDER="OPENAI"`.
    *   Uncomment the `OPENAI_API_KEY` line and add your key.

### Step 2: Run the Backend Server

1.  **Make sure you are in the `backend` directory.**

2.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`. You will see a message indicating whether it's using Gemini or OpenAI models.

### Step 3: Run the Frontend Demos

1.  **Open a new terminal.** Leave the backend server running in the first one.

2.  **Serve the root project directory.** You can use any static file server. For example, with Python:
    ```bash
    # This serves the project on http://localhost:8000
    python -m http.server 8000
    ```

3.  **Open a demo in your browser:**
    *   **Chat Demo:** [http://localhost:8000/demo/index.html](http://localhost:8000/demo/index.html)
    *   **To-Do Demo:** [http://localhost:8000/demo/todo.html](http://localhost:8000/demo/todo.html)

Now you can interact with the demos, and all AI interactions will be handled by your chosen provider (Gemini or OpenAI) via the secure backend service!