import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { delegates } from '../data/delegatesData'; // Import your delegates data

const DelegateProfile = () => {
  const { id } = useParams(); // Get the delegate ID from the URL
  const navigate = useNavigate();

  // Find the delegate data from your delegates array
  const delegateData = delegates.find(d => d.id === parseInt(id));

  // If delegate not found, redirect to delegates page
  if (!delegateData) {
    navigate('/delegates');
    return null;
  }

  const delegate = {
    address: delegateData.name,
    avatar: delegateData.avatar,
    avatarBgColor: delegateData.avatarBgColor,
    votingPower: delegateData.op,
    delegatedAddresses: parseInt(delegateData.op.replace(/[MK]/g, '')) * 100, // Example calculation
    proposalsCreated: 0,
    votes: {
      for: Math.floor(parseInt(delegateData.participation) / 10),
      against: 0,
      abstain: 0
    },
    status: {
      text: parseInt(delegateData.participation) > 50 ? 'Active delegate' : 'Inactive delegate',
      subtext: `Voted in ${parseInt(delegateData.participation)}% of the most recent proposals`,
      participation: delegateData.participation
    }
  };

const delegations = [
  {
    allowance: '4.891 ASAP',
    delegatedOn: '12/08/2024',
    from: 'pishiii.eth',
    txnHash: 'hash1'
  },
  {
    allowance: '0.09 ASAP',
    delegatedOn: '12/08/2024',
    from: '0xd3...d454',
    txnHash: 'hash2'
  },
  {
    allowance: '17.011 ASAP',
    delegatedOn: '12/08/2024',
    from: 'cracen.eth',
    txnHash: 'hash3'
  },
  {
    allowance: '0.398 ASAP',
    delegatedOn: '12/07/2024',
    from: '0x15...59a4',
    txnHash: 'hash4'
  },
  {
    allowance: '0.37 ASAP',
    delegatedOn: '12/07/2024',
    from: '0x52...4a4b',
    txnHash: 'hash5'
  },
  {
    allowance: '0.29 ASAP',
    delegatedOn: '12/07/2024',
    from: '0x47...794f',
    txnHash: 'hash6'
  },
  {
    allowance: '0.544 ASAP',
    delegatedOn: '12/07/2024',
    from: 'tunadex.eth',
    txnHash: 'hash7'
  },
  {
    allowance: '0.135 ASAP',
    delegatedOn: '12/07/2024',
    from: '0x48...006d',
    txnHash: 'hash8'
  },
  {
    allowance: '1.107 ASAP',
    delegatedOn: '12/07/2024',
    from: '0x43...8c60',
    txnHash: 'hash9'
  }
];

   return (
    <div className="min-h-screen bg-[#0A0B0F] text-gray-200 pt-16">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-[400px,1fr] gap-8">
          {/* Left sidebar */}
          <div className="space-y-6">
            {/* Status card */}
            <div className="bg-[#17181C] p-4 rounded-lg border border-gray-800/50">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-200 font-medium">
                  {delegate.status.text}
                </span>
                <div className="flex items-center">
                  <span className="text-gray-400">💤</span>
                  <span className="ml-1 text-gray-300">{delegate.status.participation}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {delegate.status.subtext}
              </p>
            </div>

            {/* Delegate info card */}
            <div className="bg-[#17181C] rounded-lg border border-gray-800/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl
                  ${delegate.avatarBgColor} bg-opacity-80`}>
                  {delegate.avatar}
                </div>
                <span className="font-medium text-lg text-gray-200">{delegate.address}</span>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Voting power</span>
                  <span className="font-medium text-gray-200">{delegate.votingPower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delegated addresses</span>
                  <span className="font-medium text-gray-200">{delegate.delegatedAddresses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Proposals created</span>
                  <span className="font-medium text-gray-200">{delegate.proposalsCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">For/Against/Abstain</span>
                  <span className="font-medium">
                    <span className="text-emerald-400">{delegate.votes.for}</span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-rose-400">{delegate.votes.against}</span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-gray-400">{delegate.votes.abstain}</span>
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 py-2 text-center border border-gray-800/50 rounded-lg 
                text-gray-300 hover:bg-[#1E1F24] transition-colors">
                Delegate
              </button>
            </div>
          </div>

          {/* Right side content */}
          <div className="space-y-8">
            {/* Statement section */}
            <div>
              <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent 
                bg-gradient-to-r from-indigo-400 to-purple-400">
                Delegate Statement
              </h2>
              <div className="space-y-4 bg-[#17181C] p-6 rounded-lg border border-gray-800/50">
                <p className="text-gray-300">
                  The Anticapture Commission (ACC) is a key tokenholder group, mandated to prevent 
                  the capture of the Token House by any single tokenholder or group of tokenholders, 
                  including protocols, etc.
                </p>
                <p className="text-gray-300">
                  This multisig comprises members of the Anticapture Commission (ACC), consisting of 
                  high-impact delegates who meet the membership criteria and Council Leads from all 
                  other existing Councils who chose to participate.
                </p>
                <div className="mt-4">
                  <p className="text-gray-300 mb-2">To read more about the ACC:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Communication Thread
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Internal Operating Procedures
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Delegation table */}
            <div>
              <div className="flex gap-6 mb-4">
                <h2 className="text-xl font-bold bg-clip-text text-transparent 
                  bg-gradient-to-r from-indigo-400 to-purple-400">
                  Delegated from
                </h2>
                <h2 className="text-xl font-bold text-gray-600">Delegated to</h2>
              </div>

              <div className="bg-[#17181C] border border-gray-800/50 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#1E1F24] border-b border-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium text-gray-400">Allowance</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-400">Delegated on</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-400">From</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-400">Txn Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {delegations.map((delegation, index) => (
                      <tr key={index} className="hover:bg-[#1E1F24] transition-colors">
                        <td className="px-6 py-4 text-gray-300">{delegation.allowance}</td>
                        <td className="px-6 py-4 text-gray-300">{delegation.delegatedOn}</td>
                        <td className="px-6 py-4 text-gray-300">{delegation.from}</td>
                        <td className="px-6 py-4">
                          <button className="flex items-center text-gray-400 hover:text-indigo-400 
                            transition-colors">
                            View
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegateProfile;