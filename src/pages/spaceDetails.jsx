// src/pages/SpaceDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { spacesData } from '../data/spacesData';
import { ArrowLeft, Heart, ChevronRight, CheckCircle } from 'lucide-react';

const spaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    const foundSpace = spacesData.find(s => s.id === parseInt(id));
    setSpace(foundSpace);
    window.scrollTo(0, 0);
  }, [id]);

  if (!space) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900 font-sans flex flex-col pb-32">
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-6 py-10 flex-grow">
        
        {/* Breadcrumb Back Button */}
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-8">
          <button onClick={() => navigate('/revamp')} className="hover:text-gray-900 transition flex items-center gap-1 bg-transparent border-0 cursor-pointer">
            <ArrowLeft className="size-4" /> Back to Spaces
          </button>
          <ChevronRight className="size-4 text-gray-300" />
          <span className="text-gray-900">{space.title} Collection</span>
        </div>

        <h1 className="text-5xl font-black text-black tracking-tight mb-10">
          The {space.title} Collection
        </h1>

        {/* The "Parts Images" Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Main Cover Image */}
          <div className="lg:col-span-2 aspect-[16/9] rounded-[32px] overflow-hidden relative group">
            <img src={space.cover} alt={`${space.title} cover`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm">
              Featured Layout
            </div>
          </div>

          {/* Related Images Loop */}
          {space.images.map((imgUrl, index) => (
            <div key={index} className="aspect-square sm:aspect-auto sm:h-full rounded-[32px] overflow-hidden relative group shadow-sm bg-white border border-gray-200">
              <img src={imgUrl} alt={`${space.title} part ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              
              <button className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border-0 cursor-pointer active:scale-90 transition-transform">
                <Heart size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
          ))}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default spaceDetails;