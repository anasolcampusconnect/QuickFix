import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Search,
  Star,
  CalendarDays,
  Sparkles,
  X,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Check,
  Gift,
  Copy,
  Scissors,
  CheckCircle,
  Camera,
  Activity,
  RefreshCw,
} from "lucide-react";

const AnimationStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes slowFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes scanLine {
      0% { top: 0%; }
      50% { top: 100%; }
      100% { top: 0%; }
    }
    .animate-slow-float {
      animation: slowFloat 5s ease-in-out infinite;
    }
    .animate-scan {
      animation: scanLine 3s linear infinite;
    }
  `}} />
);

const AnimatedCounter = ({ targetString }) => {
  const numericPart = parseFloat(targetString.replace(/[^0-9.]/g, ""));
  const suffix = targetString.replace(/[0-9.]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = numericPart;
    const duration = 1500; 
    const isDecimal = end % 1 !== 0;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * end;

      if (isDecimal) {
        setCount(parseFloat(currentVal.toFixed(1)));
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [numericPart]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const verticalSlides = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop", 
];

const initialQuickServices = [
  { 
    title: "Glow Facial", 
    category: "Skin", 
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    rating: "4.8",
    discount: "20% OFF",
    features: ["Brightening", "Fruit Cleanse"]
  },
  { 
    title: "Luxury Spa", 
    category: "Spa", 
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    discount: "15% OFF",
    features: ["Aromatherapy", "Hot Towel"]
  },
  { 
    title: "Hair Styling", 
    category: "Hair", 
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop",
    rating: "4.7",
    discount: "10% OFF",
    features: ["Keratin Infused", "Top Stylist"]
  },
  { 
    title: "Beard Grooming", 
    category: "Grooming", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop",
    rating: "4.6",
    discount: "25% OFF",
    features: ["Razor Edge", "Beard Oil Ritual"]
  },
];

const expandedQuickServices = [
  { 
    title: "Nail Art Studio", 
    category: "Nails", 
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
    rating: "4.8",
    discount: "20% OFF",
    features: ["Gel Finish", "Custom Art"]
  },
  { 
    title: "Luxury Makeup", 
    category: "Makeup", 
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    rating: "4.9",
    discount: "15% OFF",
    features: ["HD Airbrush", "Waterproof"]
  },
  { 
    title: "Luxury Pedicure", 
    category: "Nails", 
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop",
    rating: "4.7",
    discount: "30% OFF",
    features: ["Scrub Massage", "Detox Care"]
  },
  { 
    title: "Bridal Styling", 
    category: "Makeup", 
    image: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?q=80&w=1200&auto=format&fit=crop",
    rating: "5.0",
    discount: "Special Package",
    features: ["Pre-Wedding Trial", "Premium Kit"]
  },
];

const popularServices = [
  { title: "Hydra Facial", price: "₹899", rating: "4.9", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop" },
  { title: "Hair Spa", price: "₹699", rating: "4.8", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Luxury Massage", price: "₹1499", rating: "4.9", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop" },
  { title: "Haircut & Styling", price: "₹549", rating: "4.7", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop" },
  { title: "Skin Brightening", price: "₹999", rating: "4.8", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop" },
  { title: "Glow Cleanup", price: "₹499", rating: "4.6", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
  { title: "Organic Facial", price: "₹799", rating: "4.9", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200&auto=format&fit=crop" },
  { title: "Spa Therapy", price: "₹1999", rating: "5.0", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop" },
];

const genderSalonData = {
  women: {
    accent: "#e8b4bc",
    tagline: "The Women's Salon",
    subtitle: "Special treatments for glowing skin, soft hair, and perfect shine.",
    services: [
      { title: "Luxury Hair Care", desc: "Deep hair treatment with nourishing masks and relaxing scalp massage.", duration: "60 min", price: "₹1,299", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop" },
      { title: "Glow Facial Studio", desc: "Multi-step brightening facial with Vitamin C and gentle scrubbing.", duration: "45 min", price: "₹999", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop" },
      { title: "Premium Makeup", desc: "Beautiful makeup looks created by top expert makeup artists.", duration: "75 min", price: "₹2,499", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  men: {
    accent: "#3f414d",
    tagline: "The Gentlemen's Salon",
    subtitle: "Sharp haircuts, clean beard lines, and deeply relaxing spas.",
    services: [
      { title: "Signature Haircut", desc: "Precise haircut designed to match your face shape and lifestyle.", duration: "45 min", price: "₹699", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" },
      { title: "Beard Sculpting", desc: "Hot towel shave with neat lining and a relaxing oil finish.", duration: "30 min", price: "₹499", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop" },
      { title: "Relaxing Spa", desc: "Deep body massage with healthy essential oils and warm steam.", duration: "60 min", price: "₹1,499", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
};

const faceProfileData = [
  {
    id: "oval",
    shapeName: "Oval Face Shape",
    cutMatch: "Classic Pompadour / Mid Fade",
    beardStyle: "Clean Shave or Short Even Stubble",
    product: "High-Hold Matte Hair Clay",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "square",
    shapeName: "Square Face Shape",
    cutMatch: "Textured Crop / High & Tight Fade",
    beardStyle: "Full Neat Beard (highlights a strong jawline)",
    product: "Natural Shine Styling Pomade",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "round",
    shapeName: "Round Face Shape",
    cutMatch: "Asymmetrical Quiff / Volume Undercut",
    beardStyle: "Pointed Van Dyke or Tapered Full Beard",
    product: "Sea Salt Volumizing Texturizer Spray",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
];

const scanModes = [
  { id: "hydration", label: "Hydration", icon: "💧", score: "84%", status: "Good Balance", color: "rgba(56, 189, 248, 0.25)", rec: "Hydra Facial" },
  { id: "texture", label: "Smoothness", icon: "✨", score: "72%", status: "Needs Softening", color: "rgba(245, 158, 11, 0.25)", rec: "Glow Facial Studio" },
  { id: "tone", label: "Tone Glow", icon: "🌟", score: "68%", status: "Slightly Dull", color: "rgba(232, 180, 188, 0.25)", rec: "Skin Brightening" },
];

const Beauty = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMoreQuickServices, setShowMoreQuickServices] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [selectedGender, setSelectedGender] = useState("women");
  const [activeIdx, setActiveIdx] = useState(0);

  const [isScratched, setIsScratched] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedFaceProfile, setSelectedFaceProfile] = useState("oval");

  const [activeScanMode, setActiveScanMode] = useState("hydration");
  const [isScanning, setIsScanning] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    service: "Hydra Facial",
    date: "",
    time: "",
    name: "",
    phone: "",
  });
  const [selectedExploreCategory, setSelectedExploreCategory] = useState("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % verticalSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.time || !bookingForm.name || !bookingForm.phone) {
      alert("Please fill out all booking details.");
      return;
    }
    setShowBooking(false);
    setShowSuccess(true);
  };

  const copyVoucherToClipboard = () => {
    navigator.clipboard.writeText("GLOWEXTRA20");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerDiagnosticScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2500);
  };

  const displayedQuickServices = showMoreQuickServices
    ? [...initialQuickServices, ...expandedQuickServices]
    : initialQuickServices;

  const displayedPopularServices = showAllPopular
    ? popularServices
    : popularServices.slice(0, 4);

  const currentStudio = genderSalonData[selectedGender];
  const activeService = currentStudio.services[activeIdx];

  const allAvailableServices = [
    ...popularServices.map(s => s.title),
    ...genderSalonData.women.services.map(s => s.title),
    ...genderSalonData.men.services.map(s => s.title)
  ];
  const uniqueServiceOptions = Array.from(new Set(allAvailableServices));

  const fullExploreList = [...initialQuickServices, ...expandedQuickServices];
  const filteredExploreServices = selectedExploreCategory === "All"
    ? fullExploreList
    : fullExploreList.filter(s => s.category === selectedExploreCategory);

  const matchedManProfile = faceProfileData.find(p => p.id === selectedFaceProfile) || faceProfileData[0];
  const currentScanData = scanModes.find(m => m.id === activeScanMode) || scanModes[0];

  return (
    <div className="bg-[#f7f7f7] min-h-screen overflow-hidden text-[#3f414d]">
      <AnimationStyles />
      
      {/* FIXED NAVBAR WRAPPER: Forced layout to top view with highest index stacking */}
      <div className="fixed top-0 left-0 right-0 w-full z-[100] bg-white border-b border-gray-100 shadow-sm">
        <Navbar />
      </div>

      {/* SPACER ELEMENT: Offset the layout content beneath the fixed navigation header */}
      <div className="pt-24">
        {/* HERO SECTION */}
        <section className="px-6 md:px-16 xl:px-24 py-12 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center justify-items-center">
            
            <div className="w-full max-w-xl lg:max-w-2xl justify-self-center lg:justify-self-end">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-5 border border-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Sparkles size={15} className="text-[#3f414d]" />
                <span className="font-semibold text-sm tracking-wide text-gray-600">Premium Salon Experiences</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-gray-700">
                Beauty Services
                <span className="block text-gray-400 mt-1 font-extrabold">
                  At Your Home
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl">
                Professional beauty, skin care, and grooming services delivered at your doorstep by certified experts.
              </p>

              <div className="mt-8 bg-white p-3.5 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-100 max-w-xl focus-within:ring-2 focus-within:ring-gray-300 transition-all duration-300">
                <Search size={20} className="text-gray-400 ms-1" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full outline-none bg-transparent text-base text-gray-600 placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-4 mt-8 flex-wrap">
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-[#3f414d] hover:bg-[#2c2d35] active:scale-95 transition-all text-white px-6 py-3.5 rounded-xl text-base font-bold shadow-md flex items-center gap-2"
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </button>

                <button
                  onClick={() => setShowServices(true)}
                  className="bg-[#3f414d] hover:bg-[#2c2d35] active:scale-95 transition-all text-white px-6 py-3.5 rounded-xl text-base font-bold shadow-md flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  Explore Services
                </button>
              </div>

              <div className="flex gap-4 mt-10 flex-wrap">
                {[
                  ["4.9★", "Service Rating"],
                  ["25K+", "Happy Clients"],
                  ["12K+", "Appointments"],
                ].map((item, i) => (
                  <div key={i} className="bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-50 min-w-[140px] flex-1 sm:flex-initial text-center sm:text-left hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-700">
                      <AnimatedCounter targetString={item[0]} />
                    </h2>
                    <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-wider">{item[1]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-[540px] justify-self-center lg:justify-self-start">
              <div className="relative w-full h-[640px] rounded-[48px] overflow-hidden shadow-2xl bg-gray-200 animate-slow-float">
                {verticalSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <img src={slide} alt="Salon Presentation" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3f414d]/10 via-transparent to-transparent" />
                  </div>
                ))}
                <div className="absolute bottom-6 right-8 flex gap-2 z-10">
                  {verticalSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK SERVICES SECTION */}
        <section className="px-6 md:px-16 py-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-700">What are you looking for?</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Find our best categories</p>
            </div>
            <button 
              onClick={() => setShowMoreQuickServices(!showMoreQuickServices)}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#3f414d] shadow-sm hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowRight size={20} className={`transform transition-transform duration-300 ${showMoreQuickServices ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayedQuickServices.map((item, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setBookingForm(prev => ({ ...prev, service: item.title }));
                  setShowBooking(true);
                }}
                className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  
                  {item.rating && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-black shadow-sm flex items-center gap-1 text-gray-700">
                      <Star size={10} className="fill-yellow-500 text-yellow-500" />
                      {item.rating}
                    </span>
                  )}

                  {item.discount && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide shadow-sm">
                      {item.discount}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black tracking-tight text-gray-700">{item.title}</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setBookingForm(prev => ({ ...prev, service: item.title }));
                        setShowBooking(true);
                      }}
                      className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#3f414d] opacity-0 group-hover:opacity-100 group-hover:bg-[#3f414d] group-hover:text-white transition-all duration-300"
                    >
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {item.features && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-50">
                      {item.features.map((feat, fIdx) => (
                        <span key={fIdx} className="bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MOST BOOKED SECTION */}
        <section className="px-6 md:px-16 py-8 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-gray-700">Most Booked Services</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Our most popular home treatments</p>
            </div>
            <button
              onClick={() => setShowAllPopular(!showAllPopular)}
              className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl shadow-sm text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              {showAllPopular ? "View Less" : "View All"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {displayedPopularServices.map((service, index) => (
              <div key={index} className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black shadow-sm flex items-center gap-1 text-gray-600">
                    <Star size={12} className="fill-gray-500 text-gray-500" />
                    {service.rating}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black tracking-tight text-gray-700">{service.title}</h3>
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-50">
                    <h4 className="text-2xl font-black text-gray-700">{service.price}</h4>
                    <button 
                      onClick={() => {
                        setBookingForm(prev => ({ ...prev, service: service.title }));
                        setShowBooking(true);
                      }}
                      className="bg-[#3f414d] hover:bg-[#2c2d35] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GENDER STUDIO SECTION */}
        <section className="px-6 md:px-16 py-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[2px] w-8 bg-gray-400" />
                <span className="uppercase tracking-[0.25em] text-[10px] font-black text-gray-400">Our Collections</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-700">{currentStudio.tagline}</h2>
              <p className="text-base text-gray-400 mt-2 font-medium">{currentStudio.subtitle}</p>
            </div>

            <div className="relative inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => { setSelectedGender("women"); setActiveIdx(0); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  selectedGender === "women" ? "bg-white text-gray-700 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Women
              </button>
              <button
                onClick={() => { setSelectedGender("men"); setActiveIdx(0); }}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  selectedGender === "men" ? "bg-white text-gray-700 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Men
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 relative rounded-[32px] overflow-hidden shadow-xl h-[490px] group">
              <img src={activeService.image} alt={activeService.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  <Clock size={14} />
                  {activeService.duration}
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{activeService.title}</h3>
                <p className="text-white/70 text-sm max-w-md font-medium leading-relaxed">{activeService.desc}</p>
                <button
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, service: activeService.title }));
                    setShowBooking(true);
                  }}
                  className="mt-6 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-xs font-black shadow-lg transition-all duration-300"
                >
                  Reserve Now
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              {currentStudio.services.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`rounded-[24px] p-4.5 text-left transition-all duration-300 border ${
                      isActive 
                        ? "bg-[#3f414d] text-white border-[#3f414d] shadow-lg translate-x-1" 
                        : "bg-white border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${
                        isActive ? "bg-white/10 text-white" : "bg-gray-50 text-gray-600"
                      }`}>
                        0{idx + 1}
                      </div>
                      <img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="text-base font-black tracking-tight">{item.title}</h4>
                        <p className={`text-xs mt-1 font-medium ${isActive ? "text-white/60" : "text-gray-400"}`}>
                          {item.duration} • {item.price}
                        </p>
                      </div>
                      <ArrowUpRight size={16} className={isActive ? "text-white" : "text-gray-400"} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* REWARDS GIFT CARD SECTION */}
        <section className="px-6 md:px-16 py-8 max-w-[1600px] mx-auto my-4">
          <div className="bg-[#3f414d] text-white rounded-[36px] p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/5 rounded-full blur-2xl animate-pulse-glow pointer-events-none" />
            
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60 flex items-center justify-center md:justify-start gap-2 mb-3">
                <Gift size={14} className="animate-bounce" /> Today's Special Offer
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Your Daily Secret Gift</h3>
              <p className="text-white/70 mt-2.5 text-sm md:text-base leading-relaxed">
                Click on our lucky card to uncover a surprise free treat. You can copy and use the coupon code on your next appointment booking.
              </p>
            </div>

            <div className="w-full max-w-[320px] shrink-0">
              <div 
                onClick={() => setIsScratched(true)}
                className={`h-44 rounded-2xl border-2 border-dashed relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden ${
                  isScratched 
                    ? "bg-white border-transparent shadow-2xl scale-100" 
                    : "bg-gradient-to-br from-gray-700/80 to-gray-600/50 border-white/20 hover:border-white/40 shadow-inner"
                }`}
              >
                {!isScratched ? (
                  <div className="text-center p-5 select-none">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/10">
                      <Sparkles size={20} className="text-white/80" />
                    </div>
                    <span className="text-sm font-black tracking-wider uppercase block opacity-90">Reveal Mystery Gift</span>
                    <span className="text-[10px] text-white/50 mt-1 block tracking-wide">Click card to open your offer</span>
                  </div>
                ) : (
                  <div className="text-center p-6 flex flex-col items-center justify-center h-full w-full animate-fade-in">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Unlocked Free Gift</span>
                    <h4 className="text-xl font-black tracking-tight text-[#3f414d] mt-1">Free Hair Spa Treatment</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-semibold">Valid on any service above ₹799</p>
                    
                    <div 
                      onClick={(e) => { e.stopPropagation(); copyVoucherToClipboard(); }}
                      className="mt-3.5 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all shadow-sm"
                    >
                      <span className="text-xs font-mono font-black text-[#3f414d] tracking-wider">GLOWEXTRA20</span>
                      {copiedCode ? <Check size={12} className="text-emerald-500 stroke-[3]" /> : <Copy size={12} className="text-gray-400" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MEN'S HAIR AND BEARD LOOK MATCHER */}
        <section className="px-6 md:px-16 py-12 max-w-[1600px] mx-auto my-4">
          <div className="bg-white rounded-[36px] p-8 md:p-12 shadow-sm border border-gray-400 transition-all duration-300">
            
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Scissors size={14} /> Style Advisor
                </span>
                <h3 className="text-3xl font-black mt-1.5 tracking-tight text-gray-700">Grooming Profile Blueprint</h3>
                <p className="text-sm text-gray-400 mt-1 font-medium">Pick a face shape layout below to find your perfect haircut and beard look.</p>
              </div>

              <div className="flex gap-1.5 p-1 bg-gray-50 border border-gray-200/60 rounded-xl w-full sm:max-w-xs self-start shadow-inner">
                {faceProfileData.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedFaceProfile(profile.id)}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all duration-300 ${
                      selectedFaceProfile === profile.id
                        ? "bg-[#3f414d] text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {profile.shapeName.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

          <div className="grid md:grid-cols-12 gap-10 items-center">
            
            <div className="md:col-span-7 space-y-4">
              {[
                ["01", "Recommended Haircut Line", matchedManProfile.cutMatch],
                ["02", "Complementary Beard Taper", matchedManProfile.beardStyle],
                ["03", "Essential Workspace Pomade", matchedManProfile.product]
              ].map((spec, sIdx) => (
                <div 
                  key={sIdx} 
                  className="p-4.5 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center gap-4.5 transition-all duration-300 hover:bg-gray-50"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-black text-xs shrink-0">
                    {spec[0]}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">{spec[1]}</span>
                    <p className="text-base font-black text-[#3f414d] mt-0.5 tracking-tight">{spec[2]}</p>
                  </div>
                </div>
              ))}

                <button
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, service: "Signature Haircut" }));
                    setShowBooking(true);
                  }}
                  className="mt-4 bg-[#3f414d] hover:bg-[#2c2d35] text-white px-6 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm"
                >
                  Book Custom Grooming Package
                </button>
              </div>

              <div className="md:col-span-5 h-full min-h-[280px]">
                <div className="h-72 rounded-3xl overflow-hidden relative shadow-md border border-gray-100 group">
                  {faceProfileData.map((prof) => (
                    <img 
                      key={prof.id}
                      src={prof.image} 
                      alt={prof.shapeName} 
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 transform ${
                        prof.id === selectedFaceProfile ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                      }`} 
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-gray-600 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle size={13} className="text-emerald-500" /> Best Match
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* VIRTUAL SKIN SCANNER SECTION */}
        <section className="px-6 md:px-16 py-8 max-w-[1600px] mx-auto my-6">
          <div className="bg-gray-100/80 text-[#3f414d] rounded-[36px] p-8 md:p-10 shadow-sm border border-gray-400 relative overflow-hidden">
            
            <div className="mb-8">
              <h3 className="text-3xl font-black tracking-tight text-gray-700">Virtual Skin Scanner</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Run our layout scanner simulator to evaluate skin hydration levels, scan texture, and look for immediate home treatments.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-5 flex flex-col bg-white border border-gray-200 rounded-2xl p-4 relative overflow-hidden min-h-[360px]">
                <div className="flex-1 rounded-xl overflow-hidden relative border border-white/10 bg-gray-900 h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop" 
                    alt="Face Scanner Display" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  <div 
                    className="absolute inset-0 transition-opacity duration-500 mix-blend-color-burn" 
                    style={{ 
                      backgroundColor: currentScanData.color,
                      opacity: isScanning ? 0.8 : 0.4
                    }} 
                  />

                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,1)] animate-scan z-10" />
                  )}

                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2 flex justify-between items-center z-10 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Camera size={13} className={isScanning ? "text-emerald-400 animate-pulse" : "text-gray-400"} />
                      <span className="font-semibold text-gray-300 font-mono text-[10px]">
                        {isScanning ? "COMPUTING VALUE..." : "SCANNER READY"}
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Mode: {currentScanData.label}</span>
                  </div>
                </div>

                <button
                  onClick={triggerDiagnosticScan}
                  disabled={isScanning}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-[#3f414d] font-bold text-xs p-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isScanning ? "animate-spin" : ""} />
                  {isScanning ? "Analyzing Biological Factors..." : "Initialize Diagnostic Scan"}
                </button>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                
                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-200 rounded-xl shadow-inner">
                  {scanModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveScanMode(mode.id)}
                      className={`p-3 rounded-lg transition-all text-center flex items-center justify-center gap-2 border ${
                        activeScanMode === mode.id
                          ? "bg-[#3f414d] text-white border-[#3f414d] shadow-sm"
                          : "text-gray-500 hover:text-gray-700 border-transparent"
                      }`}
                    >
                      <span className="text-base">{mode.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{mode.label}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Metric Output Level</span>
                      <h4 className="text-3xl font-black text-gray-700 mt-0.5">{currentScanData.score}</h4>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 px-2.5 py-1 rounded border border-gray-200">
                        {currentScanData.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-400 mb-1.5">
                      <span>Diagnostic Integrity Vector</span>
                      <span>{isScanning ? "Evaluating..." : "Stabilized"}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden relative">
                      <div 
                        className="bg-[#3f414d] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: isScanning ? "15%" : currentScanData.score }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white text-gray-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-gray-200">
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Recommended Targeted Remedy</span>
                    <p className="text-sm font-black text-gray-700 tracking-tight mt-0.5">{currentScanData.rec}</p>
                  </div>
                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: currentScanData.rec }));
                      setShowBooking(true);
                    }}
                    className="bg-[#3f414d] hover:bg-[#2c2d35] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  >
                    Schedule Treatment
                    <ArrowRight size={12} />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* POPUP MODALS */}
        {showBooking && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full p-8 relative transform scale-100 transition-all border border-gray-50">
              <button 
                onClick={() => setShowBooking(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl text-[#3f414d]">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-gray-700">Schedule Treatment</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Fill out your preferred home visit details</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4.5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Choose Service</label>
                  <select 
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    {uniqueServiceOptions.map((srvName, idx) => (
                      <option key={idx} value={srvName}>{srvName}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Select Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Select Time</label>
                    <input 
                      type="time" 
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter 10 digit number" 
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-3 bg-[#3f414d] text-white p-4 rounded-xl text-sm font-bold shadow-lg hover:bg-[#2c2d35] transition-all"
                >
                  Confirm Booking Now
                </button>
              </form>
            </div>
          </div>
        )}

        {showServices && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#f7f7f7] rounded-[40px] shadow-2xl max-w-4xl w-full p-8 md:p-10 relative max-h-[85vh] overflow-y-auto border border-gray-100">
              <button 
                onClick={() => setShowServices(false)} 
                className="absolute top-8 right-8 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.25em] font-black text-gray-400">Complete Index</span>
                <h3 className="text-4xl font-black mt-1 tracking-tight text-[#3f414d]">Our Premium Home Services</h3>
                <p className="text-sm text-gray-400 mt-1 font-medium">Browse our simple categories to discover targeted beauty care packages.</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-5">
                {["All", "Skin", "Hair", "Spa", "Grooming", "Nails", "Makeup"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedExploreCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      selectedExploreCategory === cat 
                        ? "bg-[#3f414d] text-white border-[#3f414d]" 
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-[#3f414d]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredExploreServices.map((srv, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full group">
                    <div className="h-40 overflow-hidden relative">
                      <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 bg-white/95 border border-gray-50 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-[#3f414d]">
                        {srv.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <h4 className="text-base font-black text-gray-700 tracking-tight mb-4">{srv.title}</h4>
                      <button
                        onClick={() => {
                          setBookingForm(prev => ({ ...prev, service: srv.title }));
                          setShowServices(false);
                          setShowBooking(true);
                        }}
                        className="w-full bg-gray-50 hover:bg-[#3f414d] hover:text-white transition-all text-[#3f414d] text-center py-2.5 rounded-xl text-xs font-bold border border-gray-100"
                      >
                        Instant Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[36px] max-w-sm w-full p-8 text-center shadow-2xl border border-gray-50">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4.5 border border-emerald-100">
                <Check size={32} className="stroke-[3]" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-700 tracking-tight">Booking Confirmed!</h3>
              <p className="text-sm text-gray-400 mt-2 px-1 font-medium leading-relaxed">
                Your appointment is successful. A verified salon expert is now assigned to visit your home.
              </p>

              <div className="my-5 p-4 bg-gray-50 rounded-2xl text-left text-xs space-y-2 border border-gray-100/60 font-medium text-gray-600">
                <div className="flex justify-between"><span className="text-gray-400">Treatment:</span><span className="font-bold">{bookingForm.service}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Scheduled:</span><span className="font-bold">{bookingForm.date} at {bookingForm.time}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Client Name:</span><span className="font-bold">{bookingForm.name}</span></div>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-[#3f414d] hover:bg-[#2c2d35] text-white py-3.5 rounded-xl text-sm font-bold shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Beauty;