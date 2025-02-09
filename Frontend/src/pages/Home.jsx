import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { proposals } from '../data/proposalsData';

const Home = () => {
  const VotingBar = ({ forVotes, againstVotes }) => {
    const convertVoteToNumber = (voteStr) => {
      const num = parseFloat(voteStr.replace(/[MK]/g, ''));
      const multiplier = voteStr.includes('M') ? 1000000 : (voteStr.includes('K') ? 1000 : 1);
      return num * multiplier;
    };

    const forNum = convertVoteToNumber(forVotes);
    const againstNum = convertVoteToNumber(againstVotes);
    const total = forNum + againstNum;
    const forPercentage = (forNum / total) * 100;
    const againstPercentage = (againstNum / total) * 100;

    return (
      <div className="w-40 h-1.5 rounded-full overflow-hidden flex bg-indigo-950/30">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
          style={{ width: `${forPercentage}%` }}
        />
        <div 
          className="h-full bg-gradient-to-r from-rose-500 to-rose-600"
          style={{ width: `${againstPercentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B0F]">
      <HeroSection />
      <div className="w-full px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center py-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 
              bg-clip-text text-transparent">
              Active Proposals
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/40 transition-all
              border border-indigo-800/30">
              Relevant
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-indigo-950 rounded-lg overflow-hidden
            backdrop-blur-xl bg-indigo-950/10">
            <div className="bg-indigo-950/30 px-6 py-4 flex justify-between items-center">
              <span className="text-indigo-300">
                Currently in Special Voting Cycle #31a · Voting ends on December 11th
              </span>
              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 
                transition-colors group">
                View calendar
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 
                  transition-transform" />
              </button>
            </div>

            <div className="divide-y divide-indigo-950/50">
              {proposals.map((proposal) => (
                <Link 
                  key={proposal.id}
                  to={`/proposal/${proposal.id}`}
                  className="block hover:bg-indigo-950/30 transition-all"
                >
                  <div className="grid grid-cols-[1fr,auto,auto] gap-4 px-6 py-4 items-center">
                    <div className="space-y-1.5">
                      <div className="text-indigo-400/80 text-sm flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-950/50 text-xs">
                          {proposal.type}
                        </span>
                        <span>by {proposal.author}</span>
                      </div>
                      <div className="font-medium text-indigo-100 hover:text-white transition-colors">
                        {proposal.title}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-indigo-400/80 mb-1">
                        {proposal.endDate}
                      </div>
                      <div className={`font-medium ${
                        proposal.status === 'Active' 
                          ? 'text-blue-400' 
                          : 'text-emerald-400'
                      }`}>
                        {proposal.status}
                      </div>
                    </div>

                    <div className="w-80">
                      <div className="text-right mb-2 font-medium text-indigo-200">
                        <span className="text-emerald-400">{proposal.votes.for}</span>
                        <span className="text-indigo-400"> For </span>
                        <span className="text-indigo-400 mx-1">–</span>
                        <span className="text-rose-400">{proposal.votes.against}</span>
                        <span className="text-indigo-400"> Against</span>
                      </div>
                      <div className="ml-40">
                        <VotingBar 
                          forVotes={proposal.votes.for} 
                          againstVotes={proposal.votes.against}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;