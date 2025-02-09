import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { proposals } from '../data/proposalsData';

const ProposalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    const proposalData = proposals.find(p => p.id === parseInt(id));
    if (!proposalData) {
      navigate('/');
      return;
    }
    setProposal(proposalData);
  }, [id, navigate]);

  if (!proposal) {
    return <div className="text-indigo-300">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0B0F] py-8">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-indigo-400/70 mb-2">
                <span>{proposal.type} by {proposal.author}</span>
                <ExternalLink className="w-4 h-4 hover:text-indigo-300 transition-colors" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 
                bg-clip-text text-transparent">{proposal.title}</h1>
            </div>

            {/* Voting Chart */}
            <div className="bg-[#0A0B0F]/80 rounded-lg p-6 mb-6 border border-indigo-950 
              backdrop-blur-xl shadow-lg shadow-indigo-500/10">
              <div className="flex justify-between mb-4">
                <button className="text-indigo-400/70 hover:text-indigo-300 transition-colors">
                  Proposal Visualization
                </button>
                <div className="flex gap-4">
                  <button className="text-indigo-300">Timeline</button>
                  <button className="text-indigo-400/70 hover:text-indigo-300">Composition</button>
                </div>
              </div>
              <LineChart 
                width={700} 
                height={300} 
                data={proposal.votingData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(99, 102, 241, 0.1)"
                  vertical={false}
                />
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#818cf8' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value/1000000}M`}
                  tick={{ fill: '#818cf8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0B0F',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
                  }}
                  formatter={(value) => [`${value/1000000}M ASAP`]}
                  labelStyle={{ color: '#818cf8' }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="votes" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  fill="url(#gradient)"
                  fillOpacity={0.1}
                />
                <ReferenceLine 
                  y={4500000} 
                  stroke="#818cf8" 
                  strokeDasharray="5 5"
                  strokeOpacity={0.5}
                  label={{ 
                    value: "QUORUM", 
                    position: 'left',
                    fill: '#818cf8',
                    fontSize: 12
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </LineChart>
            </div>

            {/* Proposal Description */}
            <div className="bg-[#0A0B0F]/80 rounded-lg p-6 border border-indigo-950 
              backdrop-blur-xl shadow-lg shadow-indigo-500/10">
              <p className="text-indigo-200/80">{proposal.description}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-96">
            {/* Voting Stats */}
            <div className="bg-[#0A0B0F]/80 rounded-lg p-6 border border-indigo-950 
              backdrop-blur-xl shadow-lg shadow-indigo-500/10">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 
                to-purple-400 bg-clip-text text-transparent">Proposal votes</h2>
              
              <div className="space-y-4">
                {/* Vote counts */}
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-400">FOR {proposal.votes.for} ASAP</span>
                  <span className="text-rose-400">AGAINST {proposal.votes.against} ASAP</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-indigo-950/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 relative"
                    style={{ 
                      width: `${(parseFloat(proposal.votes.for.replace('M', '')) / 
                      (parseFloat(proposal.votes.for.replace('M', '')) + 
                      parseFloat(proposal.votes.against.replace('K', '')) / 1000)) * 100}%` 
                    }}
                  >
                    <div className="absolute right-[51%] top-0 h-full w-0.5 bg-indigo-400/50"/>
                  </div>
                </div>
                
                {/* Quorum and threshold */}
                <div className="flex justify-between text-sm text-indigo-400/70">
                  <span>Quorum 4.5M ASAP</span>
                  <span>Threshold 51%</span>
                </div>
                
                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-md text-sm font-medium ${
                    proposal.status === 'Active' 
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {proposal.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-indigo-400/70">
                    {proposal.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Voters List */}
            <div className="border-t border-indigo-950 mt-4">
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-indigo-300">Voters</span>
                  <button className="text-indigo-400/70 hover:text-indigo-300 transition-colors">
                    Hasn't voted
                  </button>
                </div>
                
                <div className="space-y-3">
                  {proposal.voters.map(voter => (
                    <div key={voter.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-950/50 
                          flex items-center justify-center text-sm">
                          {voter.avatar}
                        </div>
                        <span className="font-medium text-indigo-300">{voter.name}</span>
                        <span className="text-emerald-400 text-sm">voted for</span>
                      </div>
                      <span className="text-indigo-400/70">{voter.votes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connect Wallet Button */}
            <div className="p-4 border-t border-indigo-950">
              <button className="w-full py-2 rounded-lg text-indigo-300 
                border border-indigo-800/50 bg-indigo-950/30 
                hover:bg-indigo-900/40 hover:border-indigo-700/50 transition-all">
                Connect wallet to vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;