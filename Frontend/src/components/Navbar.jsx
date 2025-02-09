import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
  const [userAddress, setUserAddress] = useState(null);
  const location = useLocation();

  const navLinks = [
    { text: 'Proposals', path: '/', active: location.pathname === '/' },
    { text: 'Voters', path: '/delegates', active: location.pathname === '/delegates' },
    { text: 'Attestation Committee', path: '/styrx', active: location.pathname === '/styrx' }
  ];

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        console.log('Connected address:', address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet');
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="w-full border-b border-indigo-950/30 bg-[#0A0B0F] px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo and title */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-sm 
            group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all"></div>
          <div className="relative">
            <div className="w-2 h-2 bg-blue-400 rounded-full absolute -top-1 -right-2 
              animate-pulse"></div>
            <span className="text-base font-medium bg-gradient-to-r from-indigo-400 to-purple-400 
              bg-clip-text text-transparent">ASAP</span>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="flex gap-1 bg-indigo-950/30 p-1 rounded-lg backdrop-blur-lg">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              to={link.path}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
                ${link.active 
                  ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-300 shadow-lg shadow-indigo-500/10'
                  : 'text-gray-400 hover:text-indigo-300 hover:bg-indigo-950/50'}`}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Wallet Connection */}
        <button 
          onClick={handleConnectWallet}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${userAddress 
              ? 'bg-indigo-950/30 text-indigo-300 border border-indigo-800/30'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'}`}
        >
          {userAddress ? formatAddress(userAddress) : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;