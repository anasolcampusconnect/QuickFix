import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { spacesData } from '../data/spacesData';
import { 
  MapPin, ShoppingCart, User, ChevronRight, ChevronDown, Search, 
  Star, Heart, Clock, Shield, CheckCircle, X, Calendar, Sparkles, HelpCircle, ArrowRight
} from 'lucide-react';

const Revamp = () => {
  const navigate = useNavigate();

  // Booking, Cart, and Navigation States
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('slot-1');
  const [openFaq, setOpenFaq] = useState(null);

  // References for scrolling anchor updates
  const sectionRefs = {
    panels: useRef(null),
    wooden: useRef(null),
    textured: useRef(null),
  };

  const scrollToSection = (id) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const toggleFavorite = (id, title) => {
    setFavorites(prev => {
      const isFav = !prev[id];
      triggerToast(isFav ? `❤️ Added ${title} to your wishlist.` : `Removed ${title} from wishlist.`);
      return { ...prev, [id]: isFav };
    });
  };

  // Structured Item Categories matching your precise layout metrics
  const servicesData = [
    {
      id: "rev-panel-01",
      category: "panels",
      title: "Premium Wall Panels",
      rating: "4.8",
      reviews: "9.4K reviews",
      price: 2999,
      oldPrice: 3599,
      duration: "1-2 Days Handover",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      highlights: ["Custom charcoal or PVC premium louvered finishes", "Anti-termite backing support installation", "Seamless alignment calibration checks", "Complete post-installation dusting cleanup"]
    },
    {
      id: "rev-wood-02",
      category: "wooden",
      title: "Modern Wooden Finish",
      rating: "4.9",
      reviews: "11.2K reviews",
      price: 3499,
      oldPrice: 4299,
      duration: "2-3 Days Handover",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      highlights: ["Premium natural wood veneer overlays", "Scratch-resistant polyurethane protective coat", "Hidden channel mounting fasteners", "Eco-friendly material compliance standard"]
    },
    {
      id: "rev-text-03",
      category: "textured",
      title: "Luxury Textured Walls",
      rating: "4.7",
      reviews: "16K reviews",
      price: 4299,
      oldPrice: 5199,
      duration: "1 Day Handover",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      highlights: ["Premium metallic or stucco finish options", "Dual-coat primer surface sand preparation", "Royale premium emulsion compound protection", "Complete furniture masking protective wrap"]
    }
  ];

  const inspiration = [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
  ];

  const faqs = [
    { q: "How are square footage metrics verified?", a: "Our consulting structural technician takes electronic laser readings on-site to map the canvas area flawlessly. There are zero unnoted extra charges." },
    { q: "Does the pricing structure include raw materials?", a: "Yes. All premium compounds, adhesive substrates, and finish profiles are bundle-calculated inside the listed flat cost up front." },
    { q: "What happens if there's an accidental spill or spot?", a: "Every assignment is completely protected under a corporate damage protection cover to fix any property incident instantly." }
  ];

  // Inline Quantity Stepper Computations
  const handleQtyAdjust = (id, delta) => {
    setCart(prev => {
      const activeCount = prev[id] || 0;
      const nextCount = Math.max(0, activeCount + delta);
      const clone = { ...prev };
      if (nextCount === 0) delete clone[id];
      else clone[id] = nextCount;
      return clone;
    });
  };

  const cartTotalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotalPriceSum = servicesData.reduce((total, item) => total + (cart[item.id] || 0) * item.price, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-neutral-800 antialiased font-sans flex flex-col relative pb-32">
      <Navbar />

      {/* Action alerts overlay */}
      {toast && (
        <div className="fixed top-24 right-6 z-[100] bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold tracking-wide animate-in slide-in-from-top-3">
          {toast}
        </div>
      )}

      {/* TWO-COLUMN MATRIX CORE STRIP */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-14 flex-grow">
        
        {/* HERO TITLE SECTION */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl font-black text-black leading-tight max-w-4xl tracking-tight">
              Beautiful interiors for all your spaces
            </h1>
            <p className="text-gray-500 text-xl mt-6 max-w-2xl leading-relaxed">
              Discover premium wall panels, modern interiors, elegant textures, and luxury home transformations.
            </p>
          </div>

          {/* Urban Company Trust Protocol Badge */}
          <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm h-fit shrink-0">
            <span className="text-base font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-xl flex items-center gap-0.5 border border-indigo-100">
              4.8 <Star className="size-3.5 fill-indigo-600 text-indigo-600" />
            </span>
            <div>
              <p className="text-neutral-900 font-extrabold">Top-Tier Quality Assurance</p>
              <p className="text-[11px] text-neutral-400 font-medium">8.9K project sign-offs completed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start mt-10">
          
          {/* LEFT INTERACTIVE STICKY ANCHOR SLIDEMENU */}
          <div className="hidden lg:block lg:col-span-1 sticky top-28 space-y-1 bg-white border border-gray-200 p-3 rounded-3xl shadow-sm">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-3 pt-2 mb-3">Service Menu</p>
            {[
              { id: 'panels', label: 'Premium Wall Panels' },
              { id: 'wooden', label: 'Modern Wooden Finishes' },
              { id: 'textured', label: 'Luxury Textured Surfaces' }
            ].map(tabLink => (
              <button
                key={tabLink.id}
                onClick={() => scrollToSection(tabLink.id)}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-neutral-50 transition-all flex items-center justify-between border-0 bg-transparent cursor-pointer"
              >
                <span>{tabLink.label}</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
            ))}
          </div>

          {/* RIGHT INDEPENDENT FEED MATRIX PACKAGES CONTAINER */}
          <div className="lg:col-span-3 space-y-14">
            {[
              { id: 'panels', label: 'Premium Wall Panels' },
              { id: 'wooden', label: 'Modern Wooden Finish' },
              { id: 'textured', label: 'Luxury Textured Walls' }
            ].map(group => {
              const matches = servicesData.filter(item => item.category === group.id);
              return (
                <div key={group.id} ref={sectionRefs[group.id]} className="scroll-mt-32">
                  <h2 className="text-2xl font-black text-gray-900 border-b border-gray-200 pb-3 uppercase tracking-wide mb-6">
                    {group.label} Options
                  </h2>

                  <div className="space-y-6">
                    {matches.map(service => (
                      <div 
                        key={service.id}
                        className="bg-white border border-gray-200 rounded-[32px] p-6 flex flex-col sm:flex-row gap-6 relative shadow-xs"
                      >
                        {/* Package Info Framework */}
                        <div className="flex-grow order-2 sm:order-1">
                          <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">{service.title}</h3>
                          
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mt-1">
                            <span className="flex items-center gap-0.5 text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-black">
                              <Star className="size-3 fill-indigo-600 text-indigo-600" /> {service.rating}
                            </span>
                            <span>•</span>
                            <span>{service.reviews}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-black uppercase text-gray-500 mt-3.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded w-fit tracking-wide">
                            <Clock className="size-3.5 text-gray-400" /> Est. Timeline: {service.duration}
                          </div>

                          {/* Itemized Deliverables Checkbox Breakdown */}
                          <ul className="mt-4 space-y-2 text-sm text-gray-500 font-medium">
                            {service.highlights.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                <CheckCircle className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Currency Structure */}
                          <div className="mt-6 flex items-baseline gap-2">
                            <span className="text-2xl font-black text-gray-900">₹{service.price.toLocaleString('en-IN')}</span>
                            <span className="text-sm text-gray-400 line-through">₹{service.oldPrice.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        {/* Image Thumbnail and Action Stepper Housing */}
                        <div className="w-full sm:w-44 flex flex-col items-center justify-start gap-3 order-1 sm:order-2 flex-shrink-0 relative">
                          <div className="w-full aspect-video sm:size-44 rounded-2xl overflow-hidden border border-gray-100 shadow-xs relative">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                            
                            <button 
                              onClick={() => toggleFavorite(service.id, service.title)}
                              className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-0 cursor-pointer transition-transform active:scale-90"
                            >
                              <Heart size={16} className={`transition-colors ${favorites[service.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                            </button>
                          </div>

                          {/* The True Urban Company Stepper Control Box */}
                          {cart[service.id] > 0 ? (
                            <div className="flex items-center bg-indigo-50 border border-indigo-200 rounded-xl w-32 h-10 overflow-hidden text-indigo-600 font-black shadow-xs">
                              <button onClick={() => handleQtyAdjust(service.id, -1)} className="flex-1 hover:bg-indigo-100/60 h-full text-center transition-colors text-lg bg-transparent border-0 cursor-pointer">-</button>
                              <span className="px-1 text-sm font-black bg-white h-full flex items-center justify-center min-w-[28px] text-gray-900">{cart[service.id]}</span>
                              <button onClick={() => handleQtyAdjust(service.id, 1)} className="flex-1 hover:bg-indigo-100/60 h-full text-center transition-colors text-lg bg-transparent border-0 cursor-pointer">+</button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => {
                                handleQtyAdjust(service.id, 1);
                                triggerToast(`➕ Added ${service.title} bundle sequence assignment layout.`);
                              }}
                              className="w-32 h-10 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-600 text-indigo-600 text-sm font-black rounded-xl uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EXPLORE BY SPACE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <h2 className="text-6xl font-black text-black mb-14 tracking-tight">
          Explore by space
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {spacesData.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                triggerToast(`🔗 Navigating to layout verification portal track: ${item.title}`);
                navigate(`/space/${item.id}`);
              }}
              className="relative group cursor-pointer overflow-hidden rounded-[32px] shadow-sm"
            >
              <div className="overflow-hidden h-[650px] w-full">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-black/10 rounded-[32px]" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                <h3 className="text-white text-3xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-0 cursor-pointer">
                  <ChevronRight size={28} className="text-gray-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN INSPIRATION SECTION */}
      <section className="bg-white py-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-14">
            <div>
              <h2 className="text-5xl font-black text-black tracking-tight">
                Design inspiration
              </h2>
              <p className="text-gray-500 mt-3 text-lg">
                Explore trending premium interiors
              </p>
            </div>

            <button 
              onClick={() => triggerToast('🖼️ Opening full structural rendering blueprint cloud data...')}
              className="text-lg font-semibold flex items-center gap-2 bg-transparent border-0 cursor-pointer text-gray-900 hover:text-indigo-600 transition-colors"
            >
              View All
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {inspiration.map((img, index) => (
              <div
                key={index}
                onClick={() => triggerToast(`🔍 Opened full-screen render frame inspection blueprint #${index+1}`)}
                className="overflow-hidden rounded-[28px] cursor-pointer shadow-xs aspect-[3/4]"
              >
                <img
                  src={img}
                  alt="Inspiration reference card"
                  className="h-full w-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="bg-white border border-gray-200 rounded-[32px] p-8 max-w-4xl">
          <h3 className="font-black text-2xl text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="size-6 text-indigo-600" /> Frequently Asked Questions
          </h3>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <div className="flex justify-between items-center font-bold text-gray-800 text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className={`size-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === index && (
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed pl-1">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETING PROMO OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="bg-black rounded-[40px] overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-12 lg:p-20">
              <span className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                Limited Period Offer
              </span>
              <h2 className="text-5xl font-black text-white mt-8 leading-tight tracking-tight">
                Transform your interiors with modern luxury
              </h2>
              <p className="text-gray-300 mt-6 text-lg leading-relaxed font-medium">
                Premium textures, designer walls, modern finishes, and elegant home transformations.
              </p>
              <button 
                onClick={() => {
                  scrollToSection('panels');
                  triggerToast('👇 Scrolled to allocation catalog. Add tracks below to activate promo pricing!');
                }}
                className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-98 transition duration-200 border-0 cursor-pointer"
              >
                Explore Now
              </button>
            </div>
            <div className="h-full min-h-[350px]">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                alt="Promo showcase background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* URBAN COMPANY COMPLIANT STICKY BOTTOM CHECKOUT TRAY */}
      {cartTotalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-12px_40px_rgba(0,0,0,0.08)] py-4 px-8 animate-in slide-in-from-bottom-5 duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-gray-900">₹{cartTotalPriceSum.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-400 font-bold">({cartTotalItems} {cartTotalItems === 1 ? 'service selection' : 'service selections'} configured)</span>
              </div>
              <p className="text-xs text-emerald-600 font-black flex items-center gap-1 mt-1 uppercase tracking-wider">
                <Sparkles className="size-3.5" /> Direct specialist consultation assignment and structural warranty guaranteed
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl flex items-center gap-2 shadow-md shadow-indigo-600/10 active:scale-[0.98] transition-transform cursor-pointer uppercase tracking-widest border-0"
            >
              Select Schedule Window <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* TIME SLOT CALENDAR MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-neutral-100 transform animate-in zoom-in-95 duration-150">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-neutral-50 transition-colors border-0 bg-transparent cursor-pointer">
              <X className="size-5" />
            </button>

            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Schedule Site Sizing</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">A structural design expert will verify canvas square footage dimensions during this timeframe block.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if(!selectedDate) return;
              setIsModalOpen(false);
              setCart({});
              triggerToast(`🎉 Booking successfully registered! Assessment assigned for ${selectedDate}.`);
              setTimeout(() => navigate('/my-bookings'), 1500);
            }} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-0.5">1. Sizing Date Target</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 size-4 text-gray-400 pointer-events-none" />
                  <input 
                    type="date" required value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm font-bold outline-none text-gray-800 bg-gray-50 focus:bg-white focus:border-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-0.5">2. Field Architect Window Slot</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'slot-1', label: '08:00 AM - 11:00 AM', tag: 'Slots filling fast' },
                    { id: 'slot-2', label: '12:00 PM - 03:00 PM', tag: 'Available' },
                    { id: 'slot-3', label: '04:00 PM - 07:00 PM', tag: 'Available' }
                  ].map(slot => (
                    <div 
                      key={slot.id} onClick={() => setSelectedSlot(slot.id)}
                      className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center text-xs font-bold transition-all ${
                        selectedSlot === slot.id ? 'border-indigo-600 bg-indigo-50/40 shadow-xs' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-gray-800">{slot.label}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-black tracking-wider ${slot.tag.includes('fast') ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-gray-100 text-gray-500'}`}>{slot.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs py-4 rounded-xl shadow-md uppercase tracking-widest mt-2 transition-all active:scale-99 border-0 cursor-pointer">
                Confirm Allocation Contract (₹{cartTotalPriceSum.toLocaleString('en-IN')})
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Revamp;