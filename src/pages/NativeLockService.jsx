import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import lockUltra from "../assets/lock-ultra.jpg";
import lockPro from "../assets/lock-pro.jpg";
import lockHero from "../assets/lock-hero.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Checkout } from "./Checkout";

export function NativeLockService() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  
  
  // --- NEW STATE FOR FULL PAGE VIEW ---
  const [showFullDetails, setShowFullDetails] = useState(false);

  // Fake product highlights / banner messages matching image carousel
  const sliderData = [
    { text: "Unlock door from anywhere", bgGradient: "from-amber-950/40 to-black/60" },
    { text: "7 Ways to unlock for your family", bgGradient: "from-blue-950/40 to-black/60" },
    { text: "Unlock request with visitor photo", bgGradient: "from-emerald-950/40 to-black/60" }
  ];

  // --- COMPREHENSIVE STATIC DATA STRUCTURE (FROM PROVIDED IMAGES) ---
  const premiumProductData = {
    name: "Native M2 Pro Smart Lock",
    tagline: "2-year filter life. Now, smarter than ever.",
    subTagline: "With in-built power backup",
    appExclusive: {
      headline: "UC APP EXCLUSIVE",
      totalValue: "₹4,299",
      subHeadline: "worth of extra benefits",
      boxValue: "Benefits worth ₹3,299",
      breakdown: [
        "₹1,799 worth free goodies & installation kit",
        "₹1,500 off with premier credit bank offers"
      ],
      exchangeHeadline: "Exchange your old RO system to get an instant flat ₹1,000 off"
    },
    proFeatures: [
      {
        title: "Uninterrupted water during power outage",
        desc: "Equipped with a heavy-duty in-built battery backup system ensuring fluid delivery up to 48 hours without active power.",
        badge: "In-built battery"
      },
      {
        title: "PresetMode™ dispensing",
        desc: "One-touch intelligent volume mapping algorithm for absolute hands-free container filling calibration.",
        badge: "Smart Sensor"
      },
      {
        title: "Real-time RO health diagnosis",
        desc: "Advanced 9 structural parameter health diagnostic check module syncs directly with your mobile app logs.",
        badge: "Smart App Connected"
      }
    ]
  };
const activeProductPayload = [{
  name: premiumProductData?.name || "Native M2 Pro Smart Lock",
  price: 18499, // Dynamic base parsing value integer conversion setup fallback logic
  quantity: quantity
}];
  // Condition to check if user wants full details page view
  if (showFullDetails) {
    return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased selection:bg-purple-100 flex flex-col">
        <Navbar />
        
        {/* BACK TO DASHBOARD NAVIGATION BAR */}
        <div className="bg-white border-b border-neutral-200/80 px-6 py-4 sticky top-16 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => {
                setShowFullDetails(false);
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center gap-2 text-xs font-black text-neutral-500 hover:text-purple-700 transition uppercase tracking-wider"
            >
              ← Back to Overview
            </button>
            <span className="text-xs bg-purple-50 text-purple-700 font-black px-3 py-1 rounded-full border border-purple-200/60">
              Product Specifications Deep-Dive
            </span>
          </div>
        </div>

        {/* ================= MAIN TWO-COLUMN RESPONSIVE GRID ================= */}
        {/* CHANGED: Converted the layout into a 12-column grid system */}
        <div className="flex-1 bg-white py-12 px-4 max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ---------------- LEFT SIDE: PRODUCT IMAGES & INFO (7 Columns) ---------------- */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* HERO PRO-SPEC BLOCK */}
              <div className="text-left space-y-4">
                <span className="inline-block text-purple-700 text-xs font-black uppercase tracking-[0.25em] bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
                  {premiumProductData.name}
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-neutral-900">
                  {premiumProductData.tagline}
                </h2>
                <p className="text-base sm:text-lg font-extrabold text-amber-600 uppercase tracking-wide">
                  {premiumProductData.subTagline}
                </p>
                
                {/* Product Layout Frame Image */}
                <div className="relative mt-6 w-full bg-gradient-to-b from-amber-500/5 to-neutral-50 rounded-3xl border border-neutral-200/60 flex items-center justify-center p-8 shadow-sm">
                  <img 
                    src={lockUltra} 
                    alt="Native Smart Core Alignment Platform" 
                    className="h-72 object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute bottom-4 left-4 bg-white border border-neutral-200 text-[10px] text-emerald-700 font-black px-2.5 py-1 rounded-lg tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {premiumProductData.proFeatures[0].badge}
                  </span>
                </div>
              </div>

              {/* WHAT'S NEW IN PRO SECTION */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                  What’s new in <span className="border-b-2 border-purple-500 pb-1">Pro Architecture</span>
                </h3>

                {/* Main feature with battery vector preview */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-sm">
                  <div className="sm:col-span-7 space-y-3">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Uninterrupted Safe Flow
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900-tight">
                      {premiumProductData.proFeatures[0].title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      {premiumProductData.proFeatures[0].desc}
                    </p>
                  </div>
                  
                  <div className="sm:col-span-5 bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[140px] shadow-inner">
                    <div className="w-20 h-10 border-2 border-emerald-500/30 rounded-xl relative p-1 flex items-center bg-neutral-50">
                      <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-md animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.3)]"></div>
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-emerald-500/30 rounded-r"></div>
                    </div>
                    <span className="text-[11px] font-black text-emerald-700 mt-3 tracking-wider uppercase">
                      {premiumProductData.proFeatures[0].badge} Backup ON
                    </span>
                  </div>
                </div>

                {/* Grid features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-2 shadow-sm">
                    <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                      ✨ {premiumProductData.proFeatures[1].title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      {premiumProductData.proFeatures[1].desc}
                    </p>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-2 shadow-sm">
                    <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                      📊 {premiumProductData.proFeatures[2].title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      {premiumProductData.proFeatures[2].desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ---------------- RIGHT SIDE: FIXED / STICKY ACTION CARD (5 Columns) ---------------- */}
            {/* CHANGED: Moved the price counter block and offers right next to the image section layout */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              
              {/* INTERACTIVE TRANSACTION CARD COMPONENT */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                
                {/* Upper Heading Price Segment */}
                <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                  <div>
                    <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Total Amount</p>
                    <span className="text-3xl font-black text-neutral-900">
                      ₹{(parseInt((premiumProductData?.price || "16799").toString().replace(/,/g, '')) * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs bg-neutral-100 text-neutral-500 font-bold px-2.5 py-1 rounded-lg">
                    {quantity} Item{quantity > 1 ? 's' : ''} Added
                  </span>
                </div>

                {/* QUANTITY CONFIGURE MODULE PANEL (- 1 +) */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral-500 uppercase tracking-wider block">
                    Select Product Quantity
                  </label>
                  <div className="flex items-center justify-between border border-neutral-200 rounded-xl bg-neutral-50 p-2 font-bold shadow-sm">
                    <span className="text-xs font-bold text-neutral-600 pl-2">Adjust Quantity</span>
                    <div className="flex items-center gap-1.5 select-none">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 bg-white hover:bg-neutral-100 rounded-lg text-neutral-800 flex items-center justify-center border border-neutral-200/50 shadow-sm font-black text-lg transition active:scale-95"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-sm font-black text-neutral-900 font-mono">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-10 h-10 bg-white hover:bg-neutral-100 rounded-lg text-neutral-800 flex items-center justify-center border border-neutral-200/50 shadow-sm font-black text-lg transition active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* CORE BUTTONS STACK MATRIX */}
                <div className="space-y-3 pt-2">
                  <button 
                     onClick={() => setShowCheckout(true)}
                     className="bg-purple-700 hover:bg-purple-800 text-white font-black px-8 py-3.5 rounded-xl uppercase tracking-wider"
                   >
                     Buy Now
                   </button>
                  
                  <button 
                    onClick={() => alert(`${quantity} item(s) successfully staged inside your Cart stack!`)}
                    className="w-full border-2 border-purple-700 hover:bg-purple-50 text-purple-700 font-black text-sm py-3.5 rounded-xl transition duration-150 active:scale-95 shadow-sm text-center block"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>

              {/* APP EXCLUSIVE CAMPAIGNS BENEFITS SCREEN (Shifted below Cart card for perfect alignment layout) */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div>
                  <p className="text-[9px] font-black text-amber-600 tracking-widest uppercase">
                    {premiumProductData.appExclusive.headline}
                  </p>
                  <h4 className="text-base font-black text-neutral-900 mt-0.5">
                    Benefits worth {premiumProductData.appExclusive.totalValue}
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-neutral-500 font-medium list-disc pl-4 marker:text-purple-400">
                  {premiumProductData.appExclusive.breakdown.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-2xl text-xs font-bold text-neutral-700 leading-relaxed">
                  {premiumProductData.appExclusive.exchangeHeadline}
                </div>
              </div>

            </div>

          </div>
        </div>
        
        <Footer />
    {showCheckout && (
      <Checkout 
        cartItems={activeProductPayload} 
        onClose={() => setShowCheckout(false)} 
        onOrderSuccess={() => setShowCheckout(false)} 
      />
    )}
      </div>
    );
  }

  // STANDARD VIEW MODE (Original layout preserved exactly with trigger modifications)
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-neutral-900 font-sans antialiased selection:bg-purple-100">
      <Navbar />

      {/* ================= HERO CONTAINER SECTION ================= */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-neutral-100">
          
          {/* LEFT COLUMN: TITLE & META DATA (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
              Native Smart Locks
            </h1>
            
            {/* UC Rating Badges Block */}
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
              <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs font-bold border border-purple-100">
                ★ 4.78
              </span>
              <span>(23K bookings)</span>
            </div>

            <button 
              onClick={() => document.getElementById("product-section").scrollIntoView({ behavior: 'smooth' })}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition duration-150"
            >
              View Services
            </button>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE MEDIA BANNER CAROUSEL (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden group shadow-lg aspect-[16/8] sm:aspect-[16/7] bg-neutral-900">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-[0.8]"
              style={{ 
                backgroundImage: `url(${lockHero || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80'})` 
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${sliderData[activeSlide].bgGradient} transition-all duration-500`} />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end h-full z-10 pointer-events-none">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-md drop-shadow-sm">
                {sliderData[activeSlide].text}
              </h2>
            </div>

            <button 
              onClick={() => setActiveSlide(prev => (prev === 0 ? sliderData.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-neutral-900 font-bold rounded-full shadow grid place-items-center opacity-0 group-hover:opacity-100 transition z-20 text-xs"
            >
              ❮
            </button>
            <button 
              onClick={() => setActiveSlide(prev => (prev === sliderData.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-neutral-900 font-bold rounded-full shadow grid place-items-center opacity-0 group-hover:opacity-100 transition z-20 text-xs"
            >
              ❯
            </button>

            <div className="absolute bottom-4 inset-x-6 flex gap-2 z-20">
              {sliderData.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 flex-1 rounded transition-all duration-300 ${idx === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ================= LOWER SERVICE MANAGEMENT DETAILS MATRIX ================= */}
        <div id="product-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* PRIMARY PRODUCT ITEMIZATION MATRIX (7 cols) */}
          {/* UPDATED: Added structural page switch triggers directly on interactive sections */}
          <section 
            onClick={() => {
              setShowFullDetails(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200/50 space-y-6 shadow-sm cursor-pointer hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-black text-neutral-900 tracking-tight">
                Feature lock
              </h3>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
                Open full page layout view ↗
              </span>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-bold text-neutral-900 group-hover:text-purple-700 transition">Native Lock Pro</h4>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold">★ 4.81</span>
                  <span>(19K reviews)</span>
                </div>
                
                <p className="text-sm font-black text-neutral-900 pt-1">
                  Starts at <span className="text-base text-neutral-900">₹16,799</span>
                </p>

                {/* Bullets feature list configuration */}
                <ul className="space-y-1.5 text-xs text-neutral-500 font-medium pt-3 list-disc pl-4 marker:text-neutral-300">
                  <li>7 ways to unlock</li>
                  <li>Unlock request with visitor photo on every doorbell press</li>
                </ul>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Shield child triggers from bubble collisions 
                    setShowFullDetails(true);
                    window.scrollTo({ top: 0 });
                  }}
                  className="text-purple-700 text-xs font-bold hover:underline block pt-2 text-left"
                >
                  View details
                </button>
              </div>

              {/* Product Thumbnail Action Block */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0 w-28" onClick={(e) => e.stopPropagation()}>
                <div className="w-24 h-24 bg-neutral-50 border rounded-2xl p-2 flex items-center justify-center overflow-hidden shadow-inner">
                  <img 
                    src={lockUltra} 
                    alt="Native Lock Pro device layout" 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                
                <button className="w-20 bg-white hover:bg-neutral-50 text-purple-700 border border-purple-200 hover:border-purple-300 font-extrabold text-xs py-1.5 rounded-lg shadow-sm tracking-wide transition">
                  Add
                </button>
                <span className="text-[10px] text-neutral-400 font-semibold">2 options</span>
              </div>
            </div>
          </section>

          {/* SECONDARY SIDEBAR ACCENT CARDS COLUMNS (5 cols) */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/60 shadow-sm flex items-start gap-4 transition hover:shadow-md">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg flex-shrink-0 border border-emerald-100">
                %
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900">Flat 10% off upto ₹1500</h4>
                <p className="text-xs font-semibold text-neutral-400">HSBC Bank CC EMI transactions</p>
                <button className="text-purple-700 text-xs font-bold flex items-center gap-1 pt-1.5 hover:text-purple-800">
                  View More Offers <span>▼</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="text-base font-black text-neutral-900 tracking-tight">
                  UC Promise
                </h4>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold text-[8px] flex items-center justify-center text-center leading-none p-1 shadow-sm uppercase tracking-tighter">
                  Quality Assured
                </div>
              </div>
              
              <ul className="space-y-3 text-xs font-semibold text-neutral-600">
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 text-sm">✓</span> Verified Professionals
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 text-sm">✓</span> Hassle-Free Booking Architecture
                </li>
                <li className="flex items-center gap-2 text-neutral-700">
                  <span className="text-emerald-500 text-sm">✓</span> Comprehensive Post Service Coverage Guarantee
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NativeLockService;