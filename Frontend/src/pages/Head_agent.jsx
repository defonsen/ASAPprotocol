import React, { useState } from "react";
import { 
  Send, 
  MessageSquare,
  Settings,
  Copy,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

const Styrx = () => {
  // Initial messages (optional)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I am Father Zeus. Ask me anything about DAOs!',
      timestamp: 'just now'
    }
  ]);

  const [inputValue, setInputValue] = useState('');

  /**
   * handleSubmit:
   * - Send user's message to the Node server (POST /query)
   * - Receive Father Zeus's response
   * - Update messages array with both user and assistant messages
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMsg = inputValue.trim();
    if (!userMsg) return;

    // 1) Add user’s message to the conversation
    const userMessage = {
      role: 'user',
      content: userMsg,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // 2) Send POST request to your Node server
      //    Updated to match our Express server port (3000)
      const response = await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg })
      });
      if (!response.ok) {
        // If server returned an error
        const errData = await response.json();
        throw new Error(errData.error || "Server Error");
      }
      const data = await response.json();
      // data = { agentName, creditScore, response }

      // 3) Add assistant’s response to the conversation
      const assistantMessage = {
        role: 'assistant',
        content: data.response || "No response",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error:", err);
      // Show error message in chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  // A small UI item to display tokens
  const TokenItem = ({ icon, name, amount, value }) => (
    <div className="flex items-center justify-between p-3 hover:bg-gray-800/30 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="text-gray-200 text-sm font-medium">{name}</div>
          <div className="text-gray-500 text-xs">{amount}</div>
        </div>
      </div>
      <div className="text-gray-300 text-sm">{value}</div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-64px)] font-sans bg-[#0A0B0F]">
      <div className="h-full flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-[#0E0F12] border-r border-gray-800/50 flex flex-col">
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-b border-gray-800/50">
            <ArrowLeft className="w-4 h-4 text-gray-400 cursor-pointer" />
            <span className="text-gray-200">rockstar</span>
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <span className="text-indigo-500 text-xs">⬡</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500 text-xs">∞</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-500 text-xs">◉</span>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="p-4 border-b border-gray-800/50">
            <div className="bg-gray-800/30 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Total Balance:</div>
              <div className="text-gray-200 text-lg font-medium flex items-center gap-2">
                $529.41
                <span className="text-emerald-500 text-xs">+2.4%</span>
              </div>
              <div className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                0x1a996...fe8F
                <Copy className="w-3 h-3 cursor-pointer hover:text-gray-300" />
              </div>
            </div>
          </div>

          {/* Token List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm">Connected</span>
                </div>
                <Settings className="w-4 h-4 text-gray-500 hover:text-gray-400 cursor-pointer" />
              </div>

              <div className="space-y-1">
                <TokenItem 
                  icon="₿" 
                  name="Instadapp" 
                  amount="50.000000 INST" 
                  value="$344.74" 
                />
                <TokenItem 
                  icon="Ξ" 
                  name="ETH" 
                  amount="0.02749 ETH" 
                  value="$99.52" 
                />
                <TokenItem 
                  icon="M" 
                  name="MATIC" 
                  amount="112.86147 MATIC" 
                  value="$63.03" 
                />
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                  flex items-center justify-center text-gray-200">
                  SJ
                </div>
                <span className="text-gray-200">Sowmay J.</span>
              </div>
              <button className="text-red-400 hover:text-red-300 text-sm">
                Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-14 border-b border-gray-800/50 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <RotateCcw className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
              <Copy className="w-5 h-5 text-indigo-400 hover:text-indigo-300 cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 text-sm hover:bg-gray-800/70">
                Backroom
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300 text-sm hover:bg-gray-800/70">
                Edit
              </button>
              <button 
                className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20"
                onClick={() => setMessages([])}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#0A0B0F]">
            {messages.map((message, index) => (
              <div key={index} className="mb-6 last:mb-4">
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800/50 text-gray-200'
                  }`}>
                    {message.content}
                  </div>
                </div>
                <div className={`mt-1 text-xs text-gray-500 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800/50 bg-[#0A0B0F]">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-gray-800/50 text-gray-200 rounded-lg pl-4 pr-24 py-3 
                  placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <button type="submit">
                  <Send className="w-5 h-5 text-indigo-400 hover:text-indigo-300 cursor-pointer" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Styrx;
