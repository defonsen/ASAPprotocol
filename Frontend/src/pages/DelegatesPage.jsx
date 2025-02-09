import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { JsonRpcProvider, Contract, formatUnits } from "ethers";


const DelegatesPage = () => {
  // Expanded dataset with realistic delegate information
  const delegates = [
    {
      id: 1,
      name: 'mintblockchain.eth',
      avatar: '🍃',
      avatarBgColor: 'bg-green-500',
      op: '1.07M',
      participation: '20%',
      description: '**Introduction to Mint Blockchain** Mint Blockchain, the native Ethereum L2 scaling solution, focuses on sustainable blockchain development and eco-friendly consensus mechanisms. Active participant in governance since 2022.'
    },
    {
      id: 2,
      name: 'security_sentinel.eth',
      avatar: '🛡️',
      avatarBgColor: 'bg-yellow-500',
      op: '1.93M',
      participation: '97%',
      description: 'Smart contract security expert conducting regular audits of protocol upgrades. Contributing to the development of security standards and best practices for the ASAP ecosystem.',
    },
    {
      id: 3,
      name: 'jackanorak.eth',
      avatar: '🎧',
      avatarBgColor: 'bg-gray-900',
      op: '1.855M',
      participation: '85%',
      description: 'Delegates have a primary job: direct ASAP\'s capacity to support the collective good. Focused on protocol security and sustainable scaling solutions for the ASAP ecosystem.'
    },
    {
      id: 4,
      name: 'defi_maximalist.eth',
      avatar: '💎',
      avatarBgColor: 'bg-blue-500',
      op: '725.3K',
      participation: '92%',
      description: 'DeFi ecosystem developer and advocate. Contributing to ASAP\'s financial infrastructure since inception. Focused on improving capital efficiency and reducing barriers to entry.'
    },
    {
      id: 5,
      name: 'governance_sage.eth',
      avatar: '🏛️',
      avatarBgColor: 'bg-purple-500',
      op: '2.31M',
      participation: '95%',
      description: 'Governance specialist with experience in DAOs and traditional organizations. Advocating for transparent decision-making processes and sustainable tokenomics models.'
    },
    {
      id: 6,
      name: 'tech_pioneer.eth',
      avatar: '🚀',
      avatarBgColor: 'bg-orange-500',
      op: '952.8K',
      participation: '78%',
      description: 'Layer 2 scaling solutions researcher and implementer. Working on improving transaction throughput while maintaining decentralization. Regular contributor to ASAP improvement proposals.'
    },
    {
      id: 7,
      name: 'research_wizard.eth',
      avatar: '📚',
      avatarBgColor: 'bg-indigo-500',
      op: '1.62M',
      participation: '88%',
      description: 'Academic researcher focused on blockchain scalability and zero-knowledge proofs. Publishing regular analyses of ASAP network performance and contributing to the technical documentation. Active in governance since early 2023.',
    },
    {
      id: 8,
      name: 'ecosystem_builder.eth',
      avatar: '🌱',
      avatarBgColor: 'bg-emerald-500',
      op: '893.7K',
      participation: '82%',
      description: 'Focused on growing the ASAP ecosystem through developer tooling and education initiatives. Founded multiple successful projects in the ecosystem and actively mentoring new teams.',
    },
    {
      id: 9,
      name: '0x2c...2b63',
      avatar: '➕',
      avatarBgColor: 'bg-red-500',
      op: '388.5K',
      participation: '0%',
      description: null
    },
    {
      id: 10,
      name: 'community_catalyst.eth',
      avatar: '🤝',
      avatarBgColor: 'bg-pink-500',
      op: '1.15M',
      participation: '90%',
      description: 'Community organizer and advocate focusing on governance participation and user engagement. Hosting regular governance calls and maintaining comprehensive proposal summaries.',
    },
    {
      id: 11,
      name: 'protocol_architect.eth',
      avatar: '⚙️',
      avatarBgColor: 'bg-cyan-500',
      op: '2.05M',
      participation: '94%',
      description: 'Core protocol developer with expertise in rollup technology and cross-chain communication. Leading several key protocol upgrades and optimization initiatives.',
    },
    {
      id: 12,
      name: 'tokenomics_sage.eth',
      avatar: '📊',
      avatarBgColor: 'bg-violet-500',
      op: '1.47M',
      participation: '86%',
      description: 'Economics researcher specializing in token mechanism design and incentive alignment. Contributing to the development of sustainable tokenomics models for the ASAP ecosystem.',
    }
  ];

  const HARDCODED_BALANCES = {
    4: "725.30",
    5: "2310.00",
    6: "952.80",
    7: "1620.00",
    8: "893.70",
    9: "388.50",
    10: "1150.00",
    11: "2050.00",
    12: "1470.00"
  };

  // Delegate card component with consistent height
  const ERC20_ABI = 
    [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
  
  // Mock addresses - Replace these with actual addresses
  const TOKEN_ADDRESS = "0x7F870b560eBA4da0Ea1C547593e84d9F14CF3A6B";
  const DELEGATE_ADDRESSES = {
    1: "0xD37B706e0b30650d792D8f0d04162502a72Ba512",
    2: "0xe90cea894f2a8965Ca05cFABaEeF506fdA4A9f51",
    3: "0xd8Db98c6b7a9C90e9C6d1e8714c7715cE693a4aF",
  };
  
  const DelegateCard = ({ delegate }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBalance = async () => {
        try {
          // Check if delegate has a real address (ids 1-3)
          if (delegate.id <= 3 && DELEGATE_ADDRESSES[delegate.id]) {
            const provider = new JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/Uw5J_8eeIJNsqu4dfQ02muJkthuk_ahq");
            const contract = new Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
            
            const delegateAddress = DELEGATE_ADDRESSES[delegate.id];
            const rawBalance = await contract.balanceOf(delegateAddress);
            const decimals = await contract.decimals();
            const formattedBalance = formatUnits(rawBalance, decimals);
            const roundedBalance = parseFloat(formattedBalance).toFixed(2);
            
            setBalance(roundedBalance);
          } else {
            // Use hardcoded balance for other delegates
            setBalance(HARDCODED_BALANCES[delegate.id]);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setLoading(false);
        }
      };
  
      fetchBalance();
    }, [delegate.id]);
  
    return (
      <Link 
        to={`/delegate/${delegate.id}`} 
        className="group relative block bg-[#0A0B0F]/80 rounded-xl p-6 border border-indigo-950 
          backdrop-blur-xl hover:bg-indigo-950/30 transition-all duration-300 h-[260px]
          hover:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/20"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/5 to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Header with avatar and name */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-14 h-14 rounded-full ${delegate.avatarBgColor} 
            flex items-center justify-center text-white text-2xl shadow-lg 
            shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-300`}>
            {delegate.avatar}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg text-indigo-200 group-hover:text-indigo-100 
              transition-colors duration-300">
              {delegate.name}
            </span>
            {delegate.participation && (
              <span className="text-sm text-indigo-400/70">
                {delegate.participation} Participation
              </span>
            )}
          </div>
        </div>
  
        {/* Balance */}
        <div className="mb-5">
        {loading ? (
          <div className="flex items-center gap-2 text-indigo-300/70">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Fetching balance...</span>
          </div>
        ) : (
          <div className="font-medium text-lg text-indigo-300 group-hover:text-indigo-200 
            transition-colors duration-300">
            {balance ? `${balance} ASAP` : 'Balance unavailable'}
          </div>
        )}
      </div>
  
        {/* Description */}
        <div className="relative">
          {delegate.description ? (
            <p className="text-indigo-300/70 line-clamp-3 group-hover:text-indigo-300/80 
              transition-colors duration-300">
              {delegate.description}
            </p>
          ) : (
            <div className="text-indigo-400/50 italic">No description provided</div>
          )}
          
          {/* Gradient fade for text */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t 
            from-[#0A0B0F]/80 to-transparent group-hover:from-indigo-950/30" />
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      <HeroSection />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-6">
            <button className="text-xl font-bold bg-gradient-to-r from-indigo-400 
              via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Delegates
            </button>
          </div>

          <div className="flex gap-4">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Attestation ID or Schema"
                className="w-80 px-4 py-2 rounded-lg border border-indigo-800/50 
                  bg-indigo-950/30 text-indigo-300 placeholder-indigo-400/50 pl-10
                  focus:border-indigo-700/50 focus:outline-none focus:ring-1 
                  focus:ring-indigo-700/50 transition-all"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter buttons */}
            <button className="px-4 py-2 rounded-lg flex items-center gap-2 
              border border-indigo-800/50 bg-indigo-950/30 text-indigo-300
              hover:bg-indigo-900/40 hover:border-indigo-700/50 transition-all">
              All Issues
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <button className="px-4 py-2 rounded-lg flex items-center gap-2 
              border border-indigo-800/50 bg-indigo-950/30 text-indigo-300
              hover:bg-indigo-900/40 hover:border-indigo-700/50 transition-all">
              Weighted random
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid of delegate cards */}
        <div className="grid grid-cols-3 gap-6">
          {delegates.map(delegate => (
            <DelegateCard key={delegate.id} delegate={delegate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DelegatesPage;