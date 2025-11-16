const express = require('express');
const cors = require('cors');
require('dotenv').config();

const memoryService = require('./memoryService');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/', (req, res) => {
  res.send('MemAgent Backend is running!');
});

/**
 * Endpoint to get a response from the AI, enriched with memory.
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // 1. Retrieve relevant context from memory
    const memoryContext = await memoryService.retrieveMemory(query);

    // 2. Enrich the query with the context
    const enrichedQuery = `${query}${memoryContext}`;

    // 3. Get AI response
    const aiResponse = await memoryService.llm.invoke(enrichedQuery);
    const aiResponseContent = aiResponse.content;

    // 4. Save the new query and response to memory
    await memoryService.saveMemory(query, aiResponseContent);

    // 5. Send response to the client
    res.json({
      response: aiResponseContent,
      memory_context: memoryContext || null, // Send context for debugging/UI purposes
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Main function to initialize services and start the server.
 */
async function startServer() {
  try {
    await memoryService.init();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
