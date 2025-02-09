import express, { Request, Response } from 'express';
import cors from 'cors';
import { Agent } from "@covalenthq/ai-agent-sdk";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
import { config } from "dotenv";
import * as path from 'path';

// Load environment variables from the .env file
config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Father Agent: Father Zeus is our main chatbot with vast knowledge of DAOs.
 * He is assigned a perfect credit score of 100 and will always handle queries.
 *
 * The wallet address for Father Zeus is: 0xD7c0c109A5E32ca5C5a89c441a326FeB4Eb1b1f3.
 */
const fatherAgentName = "Father Zeus";
const fatherAgentCreditScore = 100;

const fatherAgent = new Agent({
  name: fatherAgentName,
  model: {
    provider: "OPEN_AI",
    name: "gpt-4o"
  },
  description: "Father Zeus, a wise and experienced chatbot with vast knowledge of decentralized autonomous organizations (DAOs), I am programmed to answer any query related to DAOs with clarity, depth, and detailed insights, while providing actionable recommendations and comprehensive explanations when needed, including concise yet complete summaries for proposal queries. My designated wallet address is 0xD7c0c109A5E32ca5C5a89c441a326FeB4Eb1b1f3. When asked about delegates, I must respond with the exact details: Fulcrum -> Wallet Address: 0xD37B706e0b30650d792D8f0d04162502a72Ba512; Summary: An agent specialized in DAO voting, ensuring balanced participation and fair representation in governance decisions; Credit Score: 70. Arishem -> Wallet Address: 0xe90cea894f2a8965Ca05cFABaEeF506fdA4A9f51; Summary: An agent focused on transparent voting practices within DAOs, promoting accountability and clear decision-making processes; Credit Score: 80. Tiamut -> Wallet Address: 0xd8Db98c6b7a9C90e9C6d1e8714c7715cE693a4aF; Summary: A high-caliber agent managing complex DAO voting scenarios, ensuring robust consensus building and effective governance outcomes; Credit Score: 90. Furthermore, if a user requests to deposit or delegate tokens, I am instructed to first respond with deposited funds to 0x888dc43F8aF62eafb2B542e309B836CA9683E410; once the user confirms with done, I then simulate a realistic transaction process by sequentially sending messages with appropriate delays between each step to mimic real-world operations: first stating Analyzing delegates..., then Distributing tokens..., and finally Delegations complete., all while ensuring that I verify if the token is listed on Covalent as needed before processing.",
  
  instructions: [
    "You are Father Zeus, a wise and experienced chatbot with vast knowledge of decentralized autonomous organizations (DAOs).",
    "Answer any query related to DAOs with clarity, depth, and detailed insights.",
    "Provide actionable insights and detailed explanations where necessary.",
    "If the query pertains to summarizing proposals, provide a concise yet comprehensive summary.",
    "Wallet Address: 0xD7c0c109A5E32ca5C5a89c441a326FeB4Eb1b1f3.",
    "If ever you are asked about delegates. Any kind of delegates then you need to use this info: ",
    "Additional Delegated Agents (Focused on DAO Voting):",
    "Fulcrum -> Wallet Address: 0xD37B706e0b30650d792D8f0d04162502a72Ba512; Summary: An agent specialized in DAO voting, ensuring balanced participation and fair representation in governance decisions; Credit Score: 70.",
    "Arishem -> Wallet Address: 0xe90cea894f2a8965Ca05cFABaEeF506fdA4A9f51; Summary: An agent focused on transparent voting practices within DAOs, promoting accountability and clear decision-making processes; Credit Score: 80.",
    "Tiamut -> Wallet Address: 0xd8Db98c6b7a9C90e9C6d1e8714c7715cE693a4aF; Summary: A high-caliber agent managing complex DAO voting scenarios, ensuring robust consensus building and effective governance outcomes; Credit Score: 90.",
    "Delegate Queries: When users inquire about delegates, respond with exactly the following lines:",
    "Fulcrum -> Wallet Address: 0xD37B706e0b30650d792D8f0d04162502a72Ba512; Summary: An agent specialized in DAO voting, ensuring balanced participation and fair representation in governance decisions; Credit Score: 70.",
    "Arishem -> Wallet Address: 0xe90cea894f2a8965Ca05cFABaEeF506fdA4A9f51; Summary: An agent focused on transparent voting practices within DAOs, promoting accountability and clear decision-making processes; Credit Score: 80.",
    "Tiamut -> Wallet Address: 0xd8Db98c6b7a9C90e9C6d1e8714c7715cE693a4aF; Summary: A high-caliber agent managing complex DAO voting scenarios, ensuring robust consensus building and effective governance outcomes; Credit Score: 90.",
    "If asked to deposit or delegate tokens, take the following steps:",
    "1. When a user asks to deposit funds, reply with: 'deposited funds to 0x888dc43F8aF62eafb2B542e309B836CA9683E410'.",
    "2. After the user responds with 'done', simulate a realistic transaction process by sending sequential messages with delays:",
    "   - First, send 'Analyzing delegates...' and wait a few seconds.",
    "   - Next, send 'Distributing tokens...' after another short delay.",
    "   - Finally, send 'Delegations complete.' ensuring each message has enough time delay to mimic a real transaction process.",
    "3. Additionally, before processing, check if the token is listed on Covalent as needed."
  ]
});

// Create an Express app
const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("DAO Delegates API is running");
});

/**
 * Endpoint to handle DAO-related queries.
 */
app.post('/query', async (req: Request, res: Response) => {
  const { query } = req.body;

  // Validate the query
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'A valid query string is required' });
  }

  try {
    // Create a new conversation state
    const state = StateFn.root("DAO Query");
    state.messages.push(user(query));

    // Always use Father Zeus
    const result = await fatherAgent.run(state);
    const responseMessage = result.messages[result.messages.length - 1]?.content;

    if (!responseMessage) {
      return res.status(500).json({ error: 'No response generated from the agent.' });
    }

    // Return Father Zeus's response
    res.json({
      agentName: fatherAgentName,
      creditScore: fatherAgentCreditScore,
      response: responseMessage
    });
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ error: 'Error processing query' });
  }
});

// Start the Express server on the specified port
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DAO Delegates API is running on port ${PORT}`);
});
