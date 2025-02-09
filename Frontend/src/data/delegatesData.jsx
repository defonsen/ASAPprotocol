export const delegates = [
    {
      id: 1,
      name: 'mintblockchain.eth',
      // Basic info shown in delegate cards
      avatar: '🍃',
      avatarBgColor: 'bg-green-500',
      op: '1.07M',
      participation: '20%',
      description: 'Mint Blockchain, the native Ethereum L2 scaling solution, focuses on sustainable blockchain development and eco-friendly consensus mechanisms. Active participant in governance since 2022.',
      
      // Detailed info for profile view
      statement: `As a delegate, Mint Blockchain focuses on sustainable blockchain development and eco-friendly consensus mechanisms. We believe in building scalable solutions that don't compromise on environmental responsibility.
  
  Our voting principles prioritize:
  1. Environmental sustainability
  2. Technical innovation
  3. Community-driven governance
  4. Long-term ecosystem health`,
      
      delegationStats: {
        votingPower: '1.07M',
        delegatedAddresses: 156,
        proposalsCreated: 3,
        votes: {
          for: 12,
          against: 2,
          abstain: 1
        }
      },
      recentActivity: {
        lastActive: '2024-12-07',
        recentProposals: [
          'Eco-friendly Validator Requirements',
          'Green Computing Initiative',
          'Sustainability Metrics Implementation'
        ]
      }
    },
    {
      id: 2,
      name: '0x2c...2b63',
      avatar: '➕',
      avatarBgColor: 'bg-red-500',
      op: '388.5K',
      participation: '0%',
      description: null,
      
      delegationStats: {
        votingPower: '388.5K',
        delegatedAddresses: 45,
        proposalsCreated: 0,
        votes: {
          for: 0,
          against: 0,
          abstain: 0
        }
      },
      recentActivity: {
        lastActive: 'Never',
        recentProposals: []
      }
    },
    {
      id: 3,
      name: 'jackanorak.eth',
      avatar: '🎧',
      avatarBgColor: 'bg-gray-900',
      op: '1.855M',
      participation: '85%',
      description: 'Delegates have a primary job: direct ASAP\'s capacity to support the collective good. Focused on protocol security and sustainable scaling solutions for the ASAP ecosystem.',
      
      statement: `I believe in a security-first approach to scaling solutions. My voting record demonstrates a consistent focus on protocol stability and sustainable growth. I actively participate in technical discussions and contribute to security audits.
  
  Key focus areas:
  - Protocol security enhancements
  - Scalable infrastructure development
  - Risk assessment and mitigation
  - Community education on security practices`,
      
      delegationStats: {
        votingPower: '1.855M',
        delegatedAddresses: 312,
        proposalsCreated: 5,
        votes: {
          for: 15,
          against: 3,
          abstain: 2
        }
      },
      recentActivity: {
        lastActive: '2024-12-08',
        recentProposals: [
          'Security Audit Framework',
          'Scaling Solutions v2',
          'Protocol Upgrade Review Process'
        ]
      }
    },
    {
      id: 4,
      name: 'defi_maximalist.eth',
      avatar: '💎',
      avatarBgColor: 'bg-blue-500',
      op: '725.3K',
      participation: '92%',
      description: 'DeFi ecosystem developer and advocate. Contributing to ASAP\'s financial infrastructure since inception. Focused on improving capital efficiency and reducing barriers to entry.',
      
      statement: `My mission is to expand DeFi accessibility while maintaining robust security standards. I evaluate proposals based on their potential to enhance financial inclusion and ecosystem efficiency.
  
  Voting priorities:
  - Capital efficiency improvements
  - DeFi protocol integrations
  - Financial inclusion initiatives
  - Market stability measures`,
      
      delegationStats: {
        votingPower: '725.3K',
        delegatedAddresses: 89,
        proposalsCreated: 4,
        votes: {
          for: 18,
          against: 2,
          abstain: 0
        }
      },
      recentActivity: {
        lastActive: '2024-12-08',
        recentProposals: [
          'DeFi Liquidity Program',
          'Cross-chain Integration Framework',
          'Trading Fee Structure Update'
        ]
      }
    },
];