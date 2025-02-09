import React from 'react';
import './Hero.css'

const HeroSection = () => {
  // Decorative elements with animated gradients and glow effects
  const DecorativeElements = () => (
    <div className="relative w-48 h-48">
      {/* Center diamond icon with gradient and glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 
          rounded-xl rotate-45 flex items-center justify-center transform-gpu hover:scale-105 
          transition-transform duration-300 shadow-lg shadow-indigo-500/30">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full 
            flex items-center justify-center backdrop-blur-xl">
            <span className="text-white text-2xl transform -rotate-45 animate-pulse">✦</span>
          </div>
        </div>
      </div>
      
      {/* Animated stars */}
      <div className="absolute top-0 right-0 text-2xl animate-twinkle">
        <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">★</span>
      </div>
      <div className="absolute bottom-0 right-8 text-xl animate-twinkle-delayed">
        <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">★</span>
      </div>
      
      {/* Floating icons with glassmorphism */}
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
        rounded-lg flex items-center justify-center transform rotate-12 backdrop-blur-md 
        border border-indigo-500/20 hover:border-indigo-500/40 transition-all
        hover:shadow-lg hover:shadow-indigo-500/20">
        <span className="text-2xl transform hover:scale-110 transition-transform">⚡</span>
      </div>
      
      <div className="absolute top-8 left-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 
        rounded-lg flex items-center justify-center transform -rotate-12 backdrop-blur-md 
        border border-indigo-500/20 hover:border-indigo-500/40 transition-all
        hover:shadow-lg hover:shadow-indigo-500/20">
        <span className="text-2xl transform hover:scale-110 transition-transform">⭐</span>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#0A0B0F]/95 px-4 py-24 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
        from-indigo-500/10 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-7xl flex items-center justify-between relative z-10">
        {/* Text content with gradient effects */}
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 
              bg-clip-text text-transparent">
              The home of ASAP voters
            </span>
          </h1>
          <p className="text-xl text-indigo-200/80 leading-relaxed">
            Delegates are the stewards of the ASAP, appointed by 
            token holders to make governance decisions on their behalf.
          </p>
        </div>

        {/* Decorative elements */}
        <DecorativeElements />
      </div>
    </div>
  );
};

// Add required animations to your global CSS or Tailwind config
const styles = `
  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  .animate-twinkle {
    animation: twinkle 3s infinite;
  }
  
  .animate-twinkle-delayed {
    animation: twinkle 3s infinite;
    animation-delay: 1s;
  }
`;

export default HeroSection;