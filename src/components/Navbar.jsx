import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  ArrowLeft,
  Target,
  X,
  Loader2,
  TrendingUp,
} from "lucide-react";

import LoginPopup from "../pages/Login";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationText, setLocationText] = useState("Current Location, Ju...");
  const [isLocating, setIsLocating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchContainerRef = useRef(null);

  const trendingSearches = [
    "Professional bathroom cleaning",
    "Salon",
    "Washing machine repair",
    "Professional kitchen cleaning",
    "Refrigerator repair",
    "RO repair",
    "Air cooler repair",
    "Full home cleaning",
    "Gas stove repair",
    "Massage for men",
  ];

  const mockDatabase = {
    "Salon": [
      { 
        id: 1, 
        title: "Salon", 
        subtitle: "Prime", 
        type: "category", 
        img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=80" 
      },
      { 
        id: 2, 
        title: "Salon", 
        subtitle: "Royale", 
        type: "category", 
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&w=80" 
      },
      { 
        id: 3, 
        title: "Salon", 
        subtitle: "Prime", 
        type: "category", 
        img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=150&auto=format&fit=crop&w=80" 
      },
      { 
        id: 4, 
        title: "Salon", 
        subtitle: "Luxe", 
        type: "category", 
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop&w=80" 
      },
      { 
        id: 5, 
        title: "Full arms & underarms waxing", 
        subtitle: "Salon Prime", 
        type: "service", 
        rating: "4.85", 
        reviews: "1.1M", 
        price: "349", 
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=150&auto=format&fit=crop&w=80" 
      },
    ],
    "Professional bathroom cleaning": [
      { id: 1, title: "Bathroom Cleaning", subtitle: "Classic", type: "category", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&w=80" },
      { id: 2, title: "Intense Bathroom Cleaning", subtitle: "Move-in Special", rating: "4.90", reviews: "500K", price: "499", type: "service", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&w=80" }
    ],
    "default": (item) => [
      { id: 1, title: item, subtitle: "Standard Premium Service", type: "category", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&w=80" },
      { id: 2, title: `Top Rated ${item}`, subtitle: "QuickFix Verified", rating: "4.88", reviews: "240K", price: "299", type: "service", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&w=80" }
    ]
  };

  const getSearchResults = (query) => {
    return mockDatabase[query] || mockDatabase["default"](query);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const { latitude, longitude } = position.coords;
        console.log(`User coordinates: Lat ${latitude}, Lng ${longitude}`);
 
        setIsLocating(false);
        setIsLocationModalOpen(false);
        setLocationText("Current Location, Jubilee Hills");
      },
      (error) => {

        console.error("Error retrieving location:", error);
        setIsLocating(false);
        
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location permission denied. Please search for your area manually.");
        } else {
   
          setIsLocationModalOpen(false);
          setLocationText("Current Location, Jubilee Hills");
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleTrendingItemClick = (item) => {
    setSearchQuery(item);
    setShowSearchResults(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  };

  return (
    <>
     
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200/70 shadow-sm w-full">
        <nav className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 md:gap-10">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 no-underline">
              <div className="bg-indigo-600 size-9 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-md shadow-indigo-600/10">
                Q
              </div>
              <span className="text-2xl font-bold tracking-tighter text-neutral-900">
                Quick<span className="text-indigo-600">Fix</span>
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-neutral-700">
              <Link to="/revamp" className="hover:text-indigo-600 transition-colors no-underline">
                Revamp
              </Link>
              <Link to="/native" className="hover:text-indigo-600 transition-colors no-underline">
                Native
              </Link>
              <Link to="/beauty" className="hover:text-indigo-600 transition-colors no-underline">
                Beauty
              </Link>
            </div>
          </div>

          {/* SEARCH + LOCATION */}
          <div className="flex-grow flex items-center gap-3 max-w-2xl relative" ref={searchContainerRef}>
            {/* LOCATION BOX ON NAVBAR */}
            <div
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden sm:flex items-center justify-between gap-3 px-4 py-2.5 border border-neutral-200 rounded-full bg-white text-neutral-800 hover:bg-neutral-50 cursor-pointer flex-shrink-0 transition-all min-w-[180px] max-w-[220px]"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="size-4 text-indigo-500 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{locationText}</span>
              </div>
              <ChevronDown className="size-3.5 text-neutral-400 flex-shrink-0" />
            </div>

            {/* SEARCH INPUT BAR */}
            <div className="relative flex-grow flex items-center border border-neutral-200 rounded-full bg-white transition-all focus-within:border-neutral-300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search for 'AC service'"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-transparent outline-none placeholder:text-neutral-400 text-neutral-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(""); setShowSearchResults(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 bg-transparent border-0 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* DROP-DOWN SEARCH DIALOG CONTAINER */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[480px] flex flex-col">
                
                {/* VIEW 1: TRENDING SEARCHES DISPLAY OVERLAY */}
                {!showSearchResults ? (
                  <div className="p-5 md:p-6 overflow-y-auto">
                    <h3 className="text-base font-bold text-neutral-900 mb-4 tracking-tight flex items-center gap-2">
                      Trending searches
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {trendingSearches.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleTrendingItemClick(item)}
                          className="flex items-center gap-2 px-3.5 py-2 border border-neutral-200 hover:border-neutral-300 rounded-xl bg-white hover:bg-neutral-50/70 text-neutral-700 hover:text-neutral-900 text-sm font-medium transition-all cursor-pointer shadow-sm"
                        >
                          <TrendingUp className="size-3.5 text-neutral-400 flex-shrink-0" />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* VIEW 2: DYNAMIC LIST ITEMS DESIGN VIEW */
                  <div className="overflow-y-auto py-2">
                    {getSearchResults(searchQuery).map((result) => (
                      <div 
                        key={result.id} 
                        className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 cursor-pointer transition-colors border-b border-neutral-50 last:border-0"
                      >
                        <img 
                          src={result.img} 
                          alt={result.title} 
                          className="w-14 h-14 object-cover rounded-xl bg-neutral-100 flex-shrink-0"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${result.title}&backgroundColor=f1f5f9&textColor=4f46e5`;
                          }}
                        />
                        
                        <div className="flex flex-col flex-grow">
                          <div className="text-[15px] font-bold text-neutral-900">
                            {result.title} <span className="text-neutral-400 font-normal">{result.subtitle && result.type === 'category' ? result.subtitle : ''}</span>
                          </div>
                          
                          {result.type === "service" && (
                            <div className="flex flex-col mt-0.5">
                              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                <span className="text-amber-500 font-semibold">★ {result.rating}</span>
                                <span>({result.reviews})</span>
                                <span className="text-neutral-300">•</span>
                                <span>Starts at ₹{result.price}</span>
                              </div>
                              <span className="text-xs text-neutral-400 mt-0.5">{result.subtitle}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link to="/wishlist" className="relative size-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition text-neutral-700">
              <Heart className="size-5 sm:size-6" />
            </Link>

            <Link to="/cart" className="relative size-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition text-neutral-700">
              <ShoppingCart className="size-5 sm:size-6" />
              <span className="absolute top-0.5 right-0.5 size-4 sm:size-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold">
                2
              </span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="size-10 flex items-center justify-center rounded-full border-2 border-neutral-200 hover:border-neutral-300 bg-neutral-50 transition text-neutral-700"
              >
                <User className="size-5 sm:size-6" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 z-50 flex flex-col">
                  {isLoggedIn ? (
                    <>
                      <Link to="/help-center" onClick={() => setDropdownOpen(false)} className="px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 no-underline">
                        Help Center
                      </Link>
                      <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} className="px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 no-underline">
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 text-left transition border-t border-neutral-100 mt-1 bg-transparent border-0 cursor-pointer"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setPopupOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-neutral-50 text-left transition bg-transparent border-0 cursor-pointer"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* LOCATION MODAL */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-150">
            
            <div className="p-6 md:p-7">
              {/* Address Search Input Panel */}
              <div className="relative flex items-center border border-neutral-200/90 rounded-2xl px-3.5 py-3 shadow-sm bg-white focus-within:border-neutral-300 transition-all">
                <ArrowLeft
                  className="size-5 text-neutral-700 mr-2.5 cursor-pointer hover:text-neutral-900 transition-colors"
                  onClick={() => !isLocating && setIsLocationModalOpen(false)}
                />
                <input
                  type="text"
                  disabled={isLocating}
                  placeholder="Search for your location/society/apartment"
                  className="w-full text-[15px] bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/90 font-normal"
                  autoFocus
                />
                <X 
                  className="size-5 text-neutral-400 ml-2 cursor-pointer hover:text-neutral-600"
                  onClick={() => !isLocating && setIsLocationModalOpen(false)}
                />
              </div>

              {/* Geo-location trigger button block */}
              <div className="mt-5 px-1">
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 font-semibold text-[15px] bg-transparent border-0 cursor-pointer transition-colors group"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="size-5 animate-spin text-indigo-600" />
                      <span className="text-neutral-600 font-medium">Getting your location...</span>
                    </>
                  ) : (
                    <>
                      <div className="relative flex items-center justify-center size-5">
                        <Target className="size-5 text-indigo-600 group-hover:scale-105 transition-transform" />
                      </div>
                      <span>Use current location</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Google Footer Strip */}
            <div className="border-t border-neutral-100 py-3 bg-neutral-50/60 flex justify-center items-center text-[11px] font-medium text-neutral-400">
              powered by&nbsp;
              <span className="font-bold tracking-tight text-neutral-500/90 text-xs">
                Google
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN POPUP */}
      <LoginPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onLogin={(userData) => {
          setIsLoggedIn(true);
          setPopupOpen(false);
          console.log("Logged in user:", userData);
        }}
      />
    </>
  );
};

export default Navbar;