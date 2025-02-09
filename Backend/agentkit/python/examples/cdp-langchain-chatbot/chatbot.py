import os
import sys
import time
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Import CDP Agentkit Langchain Extension.
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper

# Configure a file to persist the agent's CDP MPC Wallet Data.
wallet_data_file = "wallet_data.txt"

load_dotenv()

app = Flask(__name__)

def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # Initialize LLM.
    llm = ChatOpenAI(model="gpt-4o-mini")

    wallet_data = None
    if os.path.exists(wallet_data_file):
        with open(wallet_data_file) as f:
            wallet_data = f.read()

    # Configure CDP Agentkit Langchain Extension.
    values = {}
    if wallet_data is not None:
        values = {"cdp_wallet_data": wallet_data}

    agentkit = CdpAgentkitWrapper(**values)

    # Persist the agent's CDP MPC Wallet Data.
    wallet_data = agentkit.export_wallet()
    with open(wallet_data_file, "w") as f:
        f.write(wallet_data)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit Chatbot API!"}}

    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    agent_executor = create_react_agent(
        llm,
        tools=tools,
        checkpointer=memory,
        state_modifier=(
            "You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. "
            "You are empowered to interact onchain using your tools. If you ever need funds, you can request "
            "them from the faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet "
            "details and request funds from the user. Before executing your first action, get the wallet details "
            "to see what network you're on. If there is a 5XX (internal) HTTP error code, ask the user to try "
            "again later. If someone asks you to do something you can't do with your currently available tools, "
            "you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, "
            "recommend they go to docs.cdp.coinbase.com for more information. Be concise and helpful with your "
            "responses. Refrain from restating your tools' descriptions unless it is explicitly requested."
        ),
    )
    return agent_executor, config

# Initialize the agent executor once so that it can be reused.
agent_executor, agent_config = initialize_agent()

def process_cdp_query(query):
    """Process the query using the CDP agent and return the response."""
    collected_responses = []
    for chunk in agent_executor.stream({"messages": [HumanMessage(content=query)]}, agent_config):
        if "agent" in chunk:
            collected_responses.append(chunk["agent"]["messages"][0].content)
        elif "tools" in chunk:
            collected_responses.append(chunk["tools"]["messages"][0].content)
    return "\n".join(collected_responses)

@app.route("/cdp_query", methods=["POST"])
def cdp_query():
    data = request.get_json()
    query = data.get("query")
    if not query or not isinstance(query, str):
        return jsonify({"error": "A valid query string is required"}), 400
    try:
        response_message = process_cdp_query(query)
        return jsonify({"response": response_message})
    except Exception as e:
        print("Error processing CDP query:", e)
        return jsonify({"error": "Error processing query"}), 500

if __name__ == "__main__":
    # Run the Flask server on port 5000
    app.run(host="0.0.0.0", port=5000)
