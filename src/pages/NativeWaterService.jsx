import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import purifierM2 from "../assets/purifier-m2.jpg";
import purifierM1 from "../assets/purifier-m1.jpg";
import purifierM0 from "../assets/purifier-m0.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// --- IMPORT THE COMMON CHECKOUT COMPONENT ---
import { Checkout } from "./Checkout";

export function NativeWaterService() {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // --- NEW STATE FOR COMMON CHECKOUT VIEW ---
  const [showCheckout, setShowCheckout] = useState(false);

  // Pure data models array from the main catalogue screen
  const modelsData = [
    {
      id: "m2-pro",
      title: "Native M2 Pro",
      rating: "4.83",
      reviews: "100K reviews",
      price: "18,499",
      img: purifierM2,
      isNew: false,
      tagline: "2-year filter life. Now, smarter than ever.",
      subTagline: "With in-built power backup"
    },
    {
      id: "m1-pro",
      title: "Native M1 Pro",
      rating: "4.84",
      reviews: "969 reviews",
      price: "16,499",
      img: purifierM1,
      isNew: true,
      tagline: "Uninterrupted pure water supply with zero drops missed.",
      subTagline: "Smart App Connectivity Active"
    },
    {
      id: "m1",
      title: "Native M1",
      rating: "4.86",
      reviews: "137K reviews",
      price: "15,299",
      img: purifierM0,
      isNew: false,
      tagline: "All the essentials your family needs for healthy water.",
      subTagline: "Most value added RO on the market"
    }
  ];

  // Helper function to build dynamic checkout payload data structure
  const getCheckoutPayload = () => {
    if (selectedProduct) {
      return [{
        name: selectedProduct.title,
        // Safely converts the string price to an integer value
        price: parseInt(selectedProduct.price.replace(/,/g, '')),
        quantity: quantity
      }];
    }
    return [];
  };

  // --- INTERACTIVE DEEP DETAIL PAGE TEMPLATE ---
  if (showFullDetails && selectedProduct) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased selection:bg-purple-100 flex flex-col">
        <Navbar />
        
        {/* BACK NAVIGATION STRIP */}
        <div className="bg-white border-b border-neutral-200/80 px-6 py-4 sticky top-16 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => {
                setShowFullDetails(false);
                setQuantity(1);
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center gap-2 text-xs font-black text-neutral-500 hover:text-purple-700 transition uppercase tracking-wider"
            >
              ← Back to Models Overview
            </button>
            <span className="text-xs bg-purple-50 text-purple-700 font-black px-3 py-1 rounded-full border border-purple-200/60">
              {selectedProduct.title} Deep Specifications
            </span>
          </div>
        </div>

        {/* ================= MAIN TWO-COLUMN SPLIT DESKTOP GRID ================= */}
        <div className="flex-1 bg-white py-12 px-4 max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ---------------- LEFT PANEL: HIGH TECH FEATURES INFOGRAPHICS (7 Columns) ---------------- */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Product Profile Banner */}
              <div className="space-y-4">
                <span className="inline-block text-purple-700 text-xs font-black uppercase tracking-[0.25em] bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
                  ⚡ UC Native Device Suite
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-neutral-900">
                  {selectedProduct.tagline}
                </h2>
                <p className="text-base sm:text-lg font-extrabold text-amber-600 uppercase tracking-wide">
                  {selectedProduct.subTagline}
                </p>
                
                {/* Visual Asset Device Container */}
                <div className="relative mt-6 w-full bg-gradient-to-b from-sky-500/5 to-neutral-50 rounded-3xl border border-neutral-200/60 flex items-center justify-center p-8 shadow-sm">
                  <img 
                    src={selectedProduct.img} 
                    alt={selectedProduct.title} 
                    className="h-80 object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 bg-white border border-neutral-200 text-[10px] text-sky-700 font-black px-2.5 py-1 rounded-lg tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                    True Real-Time Monitoring Enabled
                  </span>
                </div>
              </div>

              {/* SECTION: FILTRATION CAPABILITIES */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                  Premium Filtration <span className="border-b-2 border-purple-500 pb-1">Architecture Features</span>
                </h3>

                {/* Smart Rinse Technology */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-sm">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                      Anti-Clogging Framework
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900 leading-snug">
                      Smart Rinse Technology™
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      Auto-cleans the modular carbon filter assembly dynamically to prevent internal clogging, exponentially expanding total output longevity.
                    </p>
                  </div>
                  <div className="sm:col-span-5 bg-neutral-900 text-white rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[140px] relative overflow-hidden shadow-inner group">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-lg shadow animate-bounce">
                      🌀
                    </div>
                    <span className="text-[10px] font-black tracking-wider uppercase text-purple-300 mt-3">Auto-Cleaning Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 3-Layer Filters */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-purple-300 transition">
                    <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                      🛡️ 3-Layer Integrated Filters
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      Traps micro impurities and dissolved solid metals sequentially by exact particle size, effectively extending membrane life safely to 2 Full Years.
                    </p>
                  </div>

                  {/* 10-Stage Purification */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-sm hover:border-purple-300 transition">
                    <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                      🔬 10-Stage Heavy RO + UV + Minerals
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      Every single drop is pushed through severe custom processing channels to re-introduce vital copper and alkaline mineral compounds perfectly.
                    </p>
                  </div>
                </div>

                {/* Financial Savings Report */}
                <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider">💰 Long-Term Economy Guarantee</h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      Engineered with superior commercial filters that need absolutely no service overhead for 2 complete calendar years.
                    </p>
                  </div>
                  <div className="text-center bg-white border border-emerald-200 px-4 py-3 rounded-xl flex-shrink-0 shadow-sm">
                    <span className="text-2xl font-black text-emerald-600 block">₹20,000</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight">Savings Over 8 Years</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ---------------- RIGHT PANEL: STICKY PURCHASE ACTION CARD (5 Columns) ---------------- */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              
              {/* CART AND PRICING CALCULATOR BLOCK */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
                
                {/* Upper Price Mapping */}
                <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                  <div>
                    <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Total Booking Amount</p>
                    <span className="text-3xl font-black text-neutral-900">
                      ₹{(parseInt((selectedProduct?.price || "18499").toString().replace(/,/g, '')) * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs bg-purple-50 text-purple-700 font-black px-2.5 py-1 rounded-md border border-purple-100">
                    {quantity} Model{quantity > 1 ? 's' : ''} Added
                  </span>
                </div>

                {/* INTERACTIVE QUANTITY INCREMENT COUNTER (- 1 +) */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block">
                    Manage Order Quantity
                  </label>
                  <div className="flex items-center justify-between border border-neutral-200 rounded-xl bg-neutral-50 p-2 shadow-inner">
                    <span className="text-xs font-bold text-neutral-600 pl-1">Device Counter</span>
                    
                    <div className="flex items-center gap-2 select-none">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-9 h-9 bg-white hover:bg-neutral-100 rounded-lg text-neutral-800 flex items-center justify-center border border-neutral-200 font-black text-base transition active:scale-95 shadow-sm"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-black text-neutral-900 font-mono">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-9 h-9 bg-white hover:bg-neutral-100 rounded-lg text-neutral-800 flex items-center justify-center border border-neutral-200 font-black text-base transition active:scale-95 shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* BUY NOW & ADD TO CART ACTION TRANSACTION BUTTONS */}
                <div className="space-y-3 pt-2">
                  {/* MODIFIED: Buy Now now triggers the common Checkout Drawer layout panel instead of a fake alert */}
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-black text-sm py-4 rounded-xl shadow-md transition active:scale-95 text-center block uppercase tracking-wider"
                  >
                    Buy Now
                  </button>

                  <button 
                    onClick={() => alert(`🛒 Stack Synced! ${quantity} unit(s) of ${selectedProduct.title} added to your active basket list.`)}
                    className="w-full border-2 border-purple-700 hover:bg-purple-50 text-purple-700 font-black text-sm py-3.5 rounded-xl transition active:scale-95 shadow-sm text-center block uppercase tracking-wider"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>

              {/* EXCLUSIVE METRIC BANK DETAILS CARD */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm flex-shrink-0 border border-emerald-100 font-black">
                  %
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-neutral-900">Flat 10% off up to ₹1,000</h4>
                  <p className="text-[11px] font-medium text-neutral-400">Axis Bank CC Full Swipe Transaction</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* COMMON CHECKOUT PANEL PORTAL OVERLAY */}
        {showCheckout && (
          <Checkout 
            cartItems={getCheckoutPayload()} 
            onClose={() => setShowCheckout(false)} 
            onOrderSuccess={() => {
              setShowCheckout(false);
              setShowFullDetails(false);
              setQuantity(1);
            }}
          />
        )}
        
        <Footer />
      </div>
    );
  }

  // --- CATALOGUE VIEW MODE (Original layout preserved seamlessly) ---
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased">
      <Navbar />

      {/* ================= MAIN WRAPPER CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. LEFT COLUMN: BRAND META DETAILS */}
          <div className="lg:col-span-3 space-y-5 sticky top-24">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                Native Water ...
              </h1>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                <span>★ 4.84</span>
                <span className="text-neutral-400 font-medium">(249K bookings)</span>
              </div>
            </div>

            {/* Earliest Slot Badge */}
            <div className="inline-flex flex-col bg-[#f4fbf7] border border-[#e3f6eb] rounded-xl p-2.5 max-w-[140px] shadow-sm">
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-black tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Earliest
              </div>
              <p className="text-xs font-extrabold text-neutral-800 mt-0.5">
                Wed, 5:00 PM
              </p>
            </div>

            <div>
              <button 
                onClick={() => document.getElementById("models-grid").scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition duration-150"
              >
                View Services
              </button>
            </div>
          </div>

          {/* 2. MIDDLE COLUMN: WATER PURIFIER MODELS LIST */}
          <section id="models-grid" className="lg:col-span-5 space-y-8 border-l border-r border-neutral-100 px-0 sm:px-6">
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight px-2 sm:px-0">
              Models
            </h2>

            <div className="divide-y divide-neutral-100">
              {modelsData.map((model) => (
                <div key={model.id} className="flex justify-between items-start gap-4 py-6 first:pt-2 px-2 sm:px-0">
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                      {model.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-neutral-500">
                      <span className="text-purple-700 bg-purple-50 px-1 rounded text-[11px] font-bold">★ {model.rating}</span>
                      <span>({model.reviews})</span>
                    </div>
                    <p className="text-xs font-bold text-neutral-400 pt-0.5">
                      Starts at <span className="text-sm font-black text-neutral-950">₹{model.price}</span>
                    </p>
                    
                    <button 
                      onClick={() => {
                        setSelectedProduct(model);
                        setShowFullDetails(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-purple-700 text-xs font-bold hover:underline block pt-2 text-left"
                    >
                      View details
                    </button>
                  </div>

                  {/* Device Thumbnail */}
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0 w-24 relative">
                    {model.isNew && (
                      <span className="absolute -top-2 left-2 bg-purple-700 text-white text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded uppercase z-10 scale-90">
                        New
                      </span>
                    )}
                    <div 
                      onClick={() => {
                        setSelectedProduct(model);
                        setShowFullDetails(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-24 h-24 bg-[#fafafa] border border-neutral-100 rounded-xl p-2 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-200 transition-all shadow-sm"
                    >
                      <img 
                        src={model.img} 
                        alt={model.title} 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    
                    <div className="relative -mt-4 w-20">
                      <button 
                        onClick={() => {
                          setSelectedProduct(model);
                          setShowFullDetails(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-white hover:bg-neutral-50 text-purple-700 border border-purple-200 font-black text-xs py-1.5 rounded-lg shadow-md tracking-wide transition uppercase"
                      >
                        Add
                      </button>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">2 options</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. RIGHT COLUMN: ACCENT TRUST CARD PACK */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/60 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base flex-shrink-0 border border-emerald-100 font-bold">
                %
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-neutral-900">Flat 10% off upto ₹1000</h4>
                <p className="text-[11px] font-medium text-neutral-400">Axis Bank CC Full Swipe</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-neutral-200/60 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-2.5">
                <h4 className="text-sm font-black text-neutral-900 tracking-tight">
                  UC Promise
                </h4>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-black text-[7px] flex items-center justify-center text-center p-0.5 shadow-sm uppercase tracking-tighter">
                  Quality Assured
                </div>
              </div>
              
              <ul className="space-y-2.5 text-xs font-medium text-neutral-600">
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 font-bold">✓</span> Verified Professionals
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 font-bold">✓</span> Hassle Free Booking
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 font-bold">✓</span> Transparent Pricing
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </main>

      {/* MODAL CHECKOUT COMPONENT FRAMEWORK BINDING */}
      {showCheckout && (
        <Checkout 
          cartItems={getCheckoutPayload()} 
          onClose={() => setShowCheckout(false)} 
          onOrderSuccess={() => {
            setShowCheckout(false);
            setQuantity(1);
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default NativeWaterService;