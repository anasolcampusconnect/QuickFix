import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CategoriesNearYou = () => {
  const categories = [
    { title: "Salon & Spa", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80" },
    { title: "Home Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80" },
    { title: "Appliance Repair", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80" },
    { title: "Plumbing & Electrical", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=500&q=80" },
    { title: "Pest Control", image: "https://images.unsplash.com/photo-1605371924597-2d6e6761005b?auto=format&fit=crop&w=500&q=80" },
    { title: "Massage Therapy", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=500&q=80" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Categories Near You</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="h-40 overflow-hidden rounded-xl mb-4">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center">{cat.title}</h3>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesNearYou;