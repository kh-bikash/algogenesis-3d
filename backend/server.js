// In: backend/server.js

const express = require('express');
const cors = require('cors');
const vm = require('vm');
const dotenv = require('dotenv');
const connectDB = require('./db');
const Problem = require('./models/ProblemModel');
const fetch = require('node-fetch');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB when the server starts
connectDB();

// Initialize the Express application
const app = express();

// Define the port the server will run on
const PORT = 5001;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

app.get('/', (req, res) => {
  res.send('3D Code Visualizer Backend is running!');
});

app.get('/api/problems', async (req, res) => {
  try {
    const problemsList = await Problem.find({});
    const groupedProblems = {
        array: [],
        bst: [],
        linkedList: [],
        stack: [],
    };
    problemsList.forEach(p => {
        if (groupedProblems[p.dataType]) {
            groupedProblems[p.dataType].push(p);
        }
    });
    res.json(groupedProblems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Could not fetch problems." });
  }
});

app.post('/api/execute', (req, res) => {
  const { userCode, problemInput } = req.body;

  if (!userCode || problemInput === undefined) {
    return res.status(400).json({ error: 'Missing required fields: userCode and problemInput.' });
  }

  const animationSteps = [];
  const sandbox = {
    visualizeStep: (step) => {
      animationSteps.push(JSON.parse(JSON.stringify(step)));
    },
    console: { log: () => {} },
    input: JSON.parse(JSON.stringify(problemInput)), 
  };
  
  const fullScript = `${userCode}\nmain(input);`;

  try {
    const script = new vm.Script(fullScript);
    script.runInNewContext(sandbox, { timeout: 5000 });
    res.json({ animationSteps });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/explain', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Missing required field: code.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error: Missing Groq API Key."});
  }

  const apiUrl = `https://api.groq.com/openai/v1/chat/completions`;

  const systemPrompt = "You are an expert computer science professor. Explain the following algorithm code clearly and concisely, as if you were teaching it to a university student. Focus on the high-level strategy, how it works, and its performance characteristics (time and space complexity).";

  const payload = {
    // CORRECTED: Using a stable and current production model from your list.
    model: "llama-3.1-8b-instant", 
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `Explain this code:\n\n${code}`
      }
    ]
  };

  try {
    const groqResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!groqResponse.ok) {
        const errorBody = await groqResponse.text();
        throw new Error(`Groq API Error: ${groqResponse.status} ${groqResponse.statusText} - ${errorBody}`);
    }

    const result = await groqResponse.json();
    const explanation = result.choices?.[0]?.message?.content;

    if (explanation) {
      res.json({ explanation });
    } else {
      throw new Error("Invalid response structure from Groq API.");
    }

  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: 'Failed to generate explanation.' });
  }
});

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});