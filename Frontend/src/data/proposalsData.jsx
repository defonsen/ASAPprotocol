export const proposals = [
  {
    id: 1,
    type: 'Standard Proposal',
    author: 'The ASAP Foundation',
    title: 'Onchain Treasury Transfer Test',
    status: 'Active',
    endDate: 'Ends December 10 at 4:08 AM GMT+5:30',
    votes: {
      for: '25.81M',
      against: '1.5K'
    },
    description: 'This is a test vote for a future on onchain treasury transfer. This test vote will transfer a nominal amount of ASAP to 0x17956526...A8, if approved. This test vote will validate the new transfer mechanics to be implemented as a result of Governor Update #3. Upon successful completion of this test vote, the ASAP Foundation will transition to full onchain execution of ASAP token transfers in special voting cycle #31a.',
    votingData: [
      { timestamp: '12/04 4:08 AM', votes: 0 },
      { timestamp: '12/05', votes: 5000000 },
      { timestamp: '12/06', votes: 8000000 },
      { timestamp: '12/07', votes: 12000000 },
      { timestamp: '12/08', votes: 15000000 },
      { timestamp: '12/09', votes: 20000000 },
      { timestamp: '12/10 4:08 AM', votes: 25650000 },
    ],
    voters: [
      { id: 1, name: 'olimpio.eth', votes: '3.3M ASAP', avatar: '🎮' },
      { id: 2, name: 'polynya.eth', votes: '3.23M ASAP', avatar: '🔴' },
      { id: 3, name: 'gfxlabs.eth', votes: '2.28M ASAP', avatar: '🟣' },
      { id: 4, name: 'jackanorak.eth', votes: '1.9M ASAP', avatar: '⚫' },
      { id: 5, name: 'opmichael.eth', votes: '1.42M ASAP', avatar: '🔵' },
      { id: 6, name: 'snxambassador.eth', votes: '1.25M ASAP', avatar: '⭕' },
      { id: 7, name: 'joxes.eth', votes: '1.24M ASAP', avatar: '🟡' },
      { id: 8, name: 'brichis.eth', votes: '1.18M ASAP', avatar: '🔴' },
      { id: 9, name: '0x07...961b', votes: '1.16M ASAP', avatar: '🔴' },
      { id: 10, name: 'tanegov.eth', votes: '1.07M ASAP', avatar: '⚫' }
    ]
  },
{
  id: 2,
  type: 'Standard Proposal',
  author: 'The ASAP Foundation',
  title: 'Governor Update Proposal #3: Enable Onchain Treasury Execution',
  status: 'Succeeded',
  endDate: 'Ended October 30, 2024 at 11:56 PM',
  votes: {
    for: '65.57M',
    against: '1.05M'
  },
  description: `This proposal outlines the "Enable onchain treasury execution" governor upgrade, allowing ASAP token transfer proposals to be executed automatically onchain without relying on the ASAP Foundation. Non-treasury proposals, such as protocol and governor upgrades, will continue to be executed via standard processes. This upgrade also includes minor patches based on previous audits.

If approved by governance, the ASAP Foundation admin will set the new implementation of governor proxy at 0xcDF27F107725988f22261Ce2256bDfCdE8B382B10 to new implementation deployed at 0xecbf4ed9f47302f00f0f039a691e7db83bdd2624.`,
  votingData: [
    { timestamp: '10/24', votes: 0 },
    { timestamp: '10/25', votes: 15000000 },
    { timestamp: '10/26', votes: 30000000 },
    { timestamp: '10/27', votes: 45000000 },
    { timestamp: '10/28', votes: 55000000 },
    { timestamp: '10/29', votes: 60000000 },
    { timestamp: '10/30', votes: 65570000 }
  ],
  quorum: '28.95M',
  threshold: '76%',
  voters: [
    { id: 1, name: 'delegate.l2beat.eth', votes: '5.47M ASAP', avatar: '🟣' },
    { id: 2, name: '0xf1...c06b', votes: '5.2M ASAP', avatar: '🔴' },
    { id: 3, name: '0xef...71f1', votes: '5.01M ASAP', avatar: '🔴' },
    { id: 4, name: 'lindaxie.eth', votes: '3.16M ASAP', avatar: '🟤' },
    { id: 5, name: 'lefteris.eth', votes: '2.8M ASAP', avatar: '⚪' },
    { id: 6, name: 'ceresstation.eth', votes: '1.41M ASAP', avatar: '🔴' },
    { id: 7, name: 'opmichael.eth', votes: '1.4M ASAP', avatar: '🔵' },
    { id: 8, name: 'she256.eth', votes: '1.3M ASAP', avatar: '🔴' },
    { id: 9, name: 'brichis.eth', votes: '1.18M ASAP', avatar: '🔴' },
    { id: 10, name: 'reveriegov.eth', votes: '1.1M ASAP', avatar: '🔴' }
  ]
},
{
  id: 3,
  type: 'Standard Proposal',
  author: 'The ASAP Foundation',
  title: 'Season 6: Standard Rollup Charter Ratification',
  status: 'Succeeded',
  endDate: 'Ended October 30, 2024 at 11:57 PM',
  votes: {
    for: '54.43M',
    against: '33.92K'
  },
  description: `The Standard Rollup is the ASAP Collective's flagship, high-security blockspace product. The Standard Rollup targets the Collective's highest bar for security, uptime, and decentralization.

This Charter applies the principles of the Law of Chains to the specific context of Standard Rollups, and does not modify or supersede the Law of Chains in any way. All conflicts between this Charter and the provisions of Law of Chains will be resolved in favor of the Law of Chains.

ASAP Governance is responsible for upholding the standards and policies outlined in this Charter and ensuring their consistency with the Law of Chains. All potential changes to the Standard Rollup should be treated with careful consideration by the governance community, to enable long-term, sustainable ecosystems to be built around Standard Rollup blockspace with confidence.`,
  votingData: [
    { timestamp: '10/24', votes: 0 },
    { timestamp: '10/25', votes: 10000000 },
    { timestamp: '10/26', votes: 20000000 },
    { timestamp: '10/27', votes: 35000000 },
    { timestamp: '10/28', votes: 45000000 },
    { timestamp: '10/29', votes: 50000000 },
    { timestamp: '10/30', votes: 54430000 }
  ],
  quorum: '28.95M',
  threshold: '51%',
  voters: [
    { id: 1, name: 'delegate.l2beat.eth', votes: '5.84M ASAP', avatar: '🟣' },
    { id: 2, name: 'mattgov.eth', votes: '4.67M ASAP', avatar: '🔴' },
    { id: 3, name: 'delegate.testinprod-io.eth', votes: '4.53M ASAP', avatar: '🔵' },
    { id: 4, name: 'polynya.eth', votes: '3.22M ASAP', avatar: '🔴' },
    { id: 5, name: 'olimpio.eth', votes: '3.01M ASAP', avatar: '🟢' },
    { id: 6, name: 'lefteris.eth', votes: '2.56M ASAP', avatar: '⚪' }
  ]
}
];