import React from 'react';
import Navbar from '../components/Navbar';

const AntiDiscrimination = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar directly at the top */}
      <Navbar />
      
      {/* Main Content Container */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 md:py-16 w-full">
        
        {/* Header Section: Heading Top, Flag Middle */}
        <div className="mb-10 flex flex-col items-center text-center">
          
          {/* Main Title at the Top */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Anti-Discrimination Policy
          </h1>

          {/* Indian Flag Representative Badge in the Middle */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <div className="flex flex-col w-6 h-4 border border-gray-300 overflow-hidden rounded-sm">
              <div className="bg-[#FF9933] h-1/3 w-full"></div>
              <div className="bg-white h-1/3 w-full flex items-center justify-center relative">
                <div className="w-1 h-1 bg-[#000080] rounded-full"></div>
              </div>
              <div className="bg-[#138808] h-1/3 w-full"></div>
            </div>
            <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">IND</span>
          </div>

        </div>

        {/* Content Nested inside a Styled Card Wrapper */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm space-y-6 text-gray-700 text-[15px] leading-relaxed text-left">
          
          <p>
            Urban Company seeks to empower millions of service professionals across the world to deliver safe, reliable and high quality services at home. Urban Company therefore does not tolerate, and prohibits discrimination against customers or service providers based on religion, caste, race, national origin, disability, sexual orientation, sex, marital status, gender identity, age or any other characteristic that may protected under applicable laws.
          </p>
          
          <p>
            Such discrimination includes, but is not limited to, refusing to provide or accept services based on any of these characteristics.
          </p>

          <p className="font-semibold text-gray-900 pt-6 mt-4 border-t border-gray-100">
            Any customer or service partner found to have violated this prohibition will lose access to the Urban Company platform.
          </p>
          
        </div>
        
      </main>

      {/* Footer is strictly excluded */}
    </div>
  );
};

export default AntiDiscrimination;