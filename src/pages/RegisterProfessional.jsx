import React from 'react';
import Navbar from '../components/Navbar';

const RegisterProfessional = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80" 
            alt="Professionals" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Partner with Urban Company</h1>
            <p className="text-lg md:text-xl opacity-90">Grow your business, earn more, and work on your own terms.</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Earn More", desc: "Get high-paying jobs directly from customers in your area." },
            { title: "Flexibility", desc: "Choose your own working hours and work-life balance." },
            { title: "Upskilling", desc: "Free professional training and certification programs for every partner." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Updated Registration Form UI */}
        <div className="bg-white max-w-xl mx-auto p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-extrabold mb-8 text-center text-gray-900">Become a Professional</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">First Name</label>
                <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="relative">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Last Name</label>
                <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors" />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Mobile Number</label>
              <div className="flex gap-2">
                <span className="p-3.5 bg-gray-100 rounded-xl border border-gray-200 font-bold text-gray-600">+91</span>
                <input type="tel" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors" />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Select Skill</label>
              <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>Choose your expertise</option>
                <option>Beauty & Salon</option>
                <option>Home Repair & Maintenance</option>
                <option>Deep Cleaning</option>
              </select>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">City</label>
              <input type="text" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors" />
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-[0.98]">
              Register Now
            </button>
          </form>
        </div>

      </main>
    </div>
  );
};

export default RegisterProfessional;