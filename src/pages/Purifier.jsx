import { useEffect, useState } from "react";
import { Star, ShoppingCart, Shield, Droplet, Truck, Headphones, MapPin, RefreshCw, Heart, TrendingUp, Award, Zap } from "lucide-react";
import purifierM2 from "../assets/purifier-m2.jpg"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Checkout } from "./Checkout";

export function Purifier() {
  // --- STATE MANAGEMENT ---
  const [selectedModel, setSelectedModel] = useState("m2pro");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartQuantities, setCartQuantities] = useState({
    m2pro: 1,
    m1pro: 0,
    m1: 0,
    m0: 0
  });

  // Comprehensive Product Dataset matching image item configurations
  const products = {
    m2pro: {
      id: "m2pro",
      name: "Native M2 Pro",
      rating: 4.83,
      reviews: "100K",
      price: 18499,
      originalPrice: 24999,
      badge: "NEW",
      features: ["In-built battery", "Touch dispensing", "Smart app", "5-stage purification"]
    },
    m1pro: {
      id: "m1pro",
      name: "Native M1 Pro",
      rating: 4.84,
      reviews: "969",
      price: 16499,
      originalPrice: 21999,
      badge: "NEW",
      features: ["Smart app", "4-stage purification", "Compact design"]
    },
    m1: {
      id: "m1",
      name: "Native M1",
      rating: 4.86,
      reviews: "137K",
      price: 15299,
      originalPrice: 18999,
      badge: "BEST SELLER",
      features: ["Essential features", "Energy efficient", "Easy maintenance"]
    },
    m0: {
      id: "m0",
      name: "Native M0",
      rating: 4.86,
      reviews: "8K",
      price: 12299,
      originalPrice: 15999,
      badge: "VALUE PICK",
      features: ["Most affordable", "RO purification", "Compact size"]
    }
  };

  const currentProduct = products[selectedModel];
  const getActiveCartPayload = () => {
    return Object.entries(cartQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        name: products[id].name,
        price: products[id].price,
        quantity: qty
      }));
  }
  // Counter Handler Logic
  const updateQuantity = (modelId, direction) => {
    setCartQuantities(prev => {
      const currentQty = prev[modelId];
      if (direction === "minus" && currentQty > 0) {
        return { ...prev, [modelId]: currentQty - 1 };
      } else if (direction === "plus") {
        return { ...prev, [modelId]: currentQty + 1 };
      }
      return prev;
    });
  };

  // Calculate overall basket metrics
  const totalItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cartQuantities).reduce((sum, [id, qty]) => {
    return sum + (products[id].price * qty);
  }, 0);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      <Navbar />

      {/* ================= HERO INTRO PROFILE SECTION ================= */}
      <section className="pt-28 pb-6 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
              Native Water Purifiers
            </h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500 mt-1">
              <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold text-xs">★ 4.84</span>
              <span>(249K bookings completed)</span>
            </div>
          </div>
          
          {/* Earliest Slot Badge Badge Container */}
          <div className="bg-[#f4fbf7] border border-[#e3f6eb] rounded-xl p-2.5 shadow-sm flex flex-col min-w-[130px]">
            <span className="text-[9px] text-emerald-700 font-black tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Earliest
            </span>
            <span className="text-xs font-extrabold text-neutral-800 mt-0.5">Wed, 5:00 PM</span>
          </div>
        </div>
      </section>

      {/* ================= MAIN RESPONSIVE MARKETPLACE LAYOUT GRID ================= */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ---------------- LEFT & HOVER CENTRE COLUMN SUITE (7 Columns) ---------------- */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* MODELS CATALOGUE GRID SECTOR */}
            <div id="models-grid" className="space-y-6 bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Available Models</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.values(products).map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => setSelectedModel(product.id)}
                    className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                      selectedModel === product.id 
                        ? 'border-purple-500 ring-2 ring-purple-500/10 shadow-md' 
                        : 'border-neutral-200 hover:border-neutral-300 shadow-sm'
                    }`}
                  >
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-purple-700 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase shadow-sm z-10">
                        {product.badge}
                      </span>
                    )}

                    <div className="w-full h-40 bg-neutral-50 rounded-xl p-4 flex items-center justify-center overflow-hidden mb-4 shadow-inner">
                      <img 
                        src={purifierM2 || "/api/placeholder/200/200"} 
                        alt={product.name} 
                        className="h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="space-y-1 flex-1">
                      <h3 className="font-bold text-neutral-900 text-base">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-neutral-800">{product.rating}</span>
                        <span>({product.reviews} reviews)</span>
                      </div>
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-lg font-black text-neutral-900">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Inline Mini Add Button Trigger Layer */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center" onClick={(e)=>e.stopPropagation()}>
                      <span className="text-[11px] font-bold text-neutral-400">2 Options Available</span>
                      {cartQuantities[product.id] === 0 ? (
                        <button 
                          onClick={() => updateQuantity(product.id, "plus")}
                          className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 px-4 py-1 rounded-lg text-xs font-black uppercase shadow-sm tracking-wide transition"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center border border-purple-200 bg-purple-50/50 rounded-lg p-0.5 font-bold shadow-sm">
                          <button onClick={() => updateQuantity(product.id, "minus")} className="w-6 h-6 bg-white text-purple-700 rounded-md flex items-center justify-center font-black text-xs border shadow-sm">-</button>
                          <span className="w-8 text-center text-xs font-black text-purple-900 font-mono">{cartQuantities[product.id]}</span>
                          <button onClick={() => updateQuantity(product.id, "plus")} className="w-6 h-6 bg-white text-purple-700 rounded-md flex items-center justify-center font-black text-xs border shadow-sm">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHY NATIVE RO CORE COMPARISON BLOCK */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Why Native RO</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Panel 1: AMC Cost */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 text-center text-xs font-bold divide-x border-b pb-3">
                      <div className="text-neutral-400">Others<p className="font-medium text-[11px] mt-1">2-year life (with 1-yr AMC included)</p></div>
                      <div className="text-purple-700 font-black">NATIVE<p className="text-purple-900 font-black text-[11px] mt-1">2-year life. ₹0 AMC cost.</p></div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Complete freedom from recurring filter subscription traps or forced periodic technician charges.</p>
                  </div>
                  <button className="w-full text-center py-2.5 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold border-t text-neutral-600 transition">Know more →</button>
                </div>

                {/* Panel 2: Warranty */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 text-center text-xs font-bold divide-x border-b pb-3">
                      <div className="text-neutral-400">Others<p className="font-medium text-[11px] mt-1">1-year warranty with hidden T&Cs</p></div>
                      <div className="text-purple-700 font-black">NATIVE<p className="text-purple-900 font-black text-[11px] mt-1">2-year unconditional warranty</p></div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Everything covered inside the chassis, including filters, RO membrane, electrical pumps, and structural valves.</p>
                  </div>
                  <button className="w-full text-center py-2.5 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold border-t text-neutral-600 transition">Know more →</button>
                </div>

                {/* Panel 3: Filtration */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 text-center text-xs font-bold divide-x border-b pb-3">
                      <div className="text-neutral-400">Others<p className="font-medium text-[11px] mt-1">Skips RO & mixes impure water to adjust TDS</p></div>
                      <div className="text-purple-700 font-black">NATIVE<p className="text-purple-900 font-black text-[11px] mt-1">100% RO-purification. No mixing.</p></div>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Maintains absolute dynamic physical purity standards, refusing to blend impure back-feed lines into your glass.</p>
                  </div>
                  <button className="w-full text-center py-2.5 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold border-t text-neutral-600 transition">Know more →</button>
                </div>

              </div>
            </div>

            {/* TESTED LAB REPORTS CONFIGURATION SECTOR */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Tested for all water sources</h2>
                <p className="text-xs text-neutral-500 font-medium">Rigorously certified performance parameters across challenging environments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Test 1 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm relative">
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wide border border-emerald-100">PASSED</span>
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider">Hard & salty water test</h4>
                  <p className="text-lg font-black text-neutral-900 leading-tight">TDS reduction up to 98%</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-neutral-700 border-t border-dashed border-neutral-100">
                    <div>Input: <span className="text-neutral-900 block font-mono font-black">1710 mg/L</span></div>
                    <div className="text-right">Output: <span className="text-emerald-600 block font-mono font-black">19 mg/L</span></div>
                  </div>
                </div>

                {/* Test 2 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm relative">
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wide border border-emerald-100">PASSED</span>
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider">Virus & bacteria test</h4>
                  <p className="text-lg font-black text-neutral-900 leading-tight">100% protection from bacteria</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-neutral-700 border-t border-dashed border-neutral-100">
                    <div>Bacteria Input: <span className="text-neutral-900 block font-mono font-black">48 Million</span></div>
                    <div className="text-right">Output: <span className="text-emerald-600 block font-mono font-black">0 Microbial</span></div>
                  </div>
                </div>

                {/* Test 3 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm relative">
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-black tracking-wide border border-emerald-100">PASSED</span>
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider">Groundwater & chemicals</h4>
                  <p className="text-lg font-black text-neutral-900 leading-tight">Removed toxic fertilizer runoff</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-neutral-700 border-t border-dashed border-neutral-100">
                    <div>Nitrate Input: <span className="text-neutral-900 block font-mono font-black">140.9 mg/L</span></div>
                    <div className="text-right">Output: <span className="text-emerald-600 block font-mono font-black">1.5 mg/L</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICE ADVANTAGES SECTIONS */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">UC App Service Advantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 border border-neutral-200 rounded-2xl space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center text-lg shadow-sm border border-purple-100">🛠️</div>
                  <h4 className="font-bold text-neutral-900 text-sm pt-1">Trained Technicians</h4>
                  <p className="text-xs text-neutral-500 font-medium">Background verified mechanics deployed directly from centralized core squads.</p>
                </div>
                <div className="bg-white p-5 border border-neutral-200 rounded-2xl space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center text-lg shadow-sm border border-pink-100">💬</div>
                  <h4 className="font-bold text-neutral-900 text-sm pt-1">24×7 Expert Support</h4>
                  <p className="text-xs text-neutral-500 font-medium">Direct live chat logs troubleshooting access pipeline directly on your phone.</p>
                </div>
                <div className="bg-white p-5 border border-neutral-200 rounded-2xl space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg shadow-sm border border-emerald-100">📍</div>
                  <h4 className="font-bold text-neutral-900 text-sm pt-1">14,500+ PIN Codes</h4>
                  <p className="text-xs text-neutral-500 font-medium">We maintain native operations networks everywhere, never outsourcing to third parties.</p>
                </div>
              </div>
            </div>

          </div>

          {/* ---------------- RIGHT PANEL: STICKY TRANSACTION CONTROL CART (5 Columns) ---------------- */}
          {/* CHANGED: Transferred transactional matrices directly to the right side layout block matching request parameters */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            
            {/* INTERACTIVE CART AND CONFIGURE CARD */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                <div>
                  <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Total Active Booking</p>
                  <span className="text-3xl font-black text-neutral-900 tracking-tight">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 font-extrabold px-2.5 py-1 rounded-lg">
                  {totalItems} Items Added
                </span>
              </div>

              {/* ACTIVE SELECTION TRACKING ITEMIZATIONS LIST */}
              <div className="space-y-3 max-h-48 overflow-y-auto divide-y divide-neutral-50">
                {Object.entries(cartQuantities).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const prod = products[id];
                  return (
                    <div key={id} className="flex justify-between items-center text-xs font-bold text-neutral-800 pt-2.5 first:pt-0">
                      <div className="space-y-0.5">
                        <span className="text-neutral-900 font-black block">{prod.name}</span>
                        <span className="text-neutral-400 font-medium">₹{prod.price.toLocaleString()} each</span>
                      </div>
                      
                      {/* COUNTER MATRIX ADJUSTMENT TRACK */}
                      <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-50 shadow-sm">
                        <button onClick={() => updateQuantity(id, "minus")} className="w-7 h-7 bg-white text-neutral-800 rounded-md flex items-center justify-center border shadow-sm font-black text-xs">-</button>
                        <span className="w-8 text-center text-neutral-900 font-mono text-xs">{qty}</span>
                        <button onClick={() => updateQuantity(id, "plus")} className="w-7 h-7 bg-white text-neutral-800 rounded-md flex items-center justify-center border shadow-sm font-black text-xs">+</button>
                      </div>
                    </div>
                  );
                })}
                {totalItems === 0 && (
                  <div className="text-center py-6 space-y-2">
                    <span className="text-2xl block">🛒</span>
                    <p className="text-xs font-bold text-neutral-400">Your basket stack is completely empty</p>
                  </div>
                )}
              </div>

              {/* CALL TO ACTION BUTTONS MATRIX LAYOUT */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
               <button 
                  onClick={() => {
                    if (totalItems === 0) return alert("Basket is empty!");
                    setShowCheckout(true);
                  }}
                  disabled={totalItems === 0}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-black py-4 rounded-xl shadow-md text-center uppercase tracking-wider"
                >
                  Buy Now
                </button>

                <button 
                  onClick={() => {
                    if (totalItems === 0) return alert("Basket is empty!");
                    alert("Cart compilation synchronized with cloud profiles successfully.");
                  }}
                  disabled={totalItems === 0}
                  className="w-full border-2 border-purple-700 hover:bg-purple-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-neutral-400 text-purple-700 font-black text-sm py-3.5 rounded-xl transition duration-150 text-center block uppercase tracking-wider active:scale-98"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* APP EXCLUSIVE BENEFITS ACCENT CARDS LIST */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-black text-neutral-400 uppercase tracking-wider border-b pb-2">
                UC App Exclusive Benefits
              </h4>
              
              <div className="space-y-3 text-xs font-semibold text-neutral-700">
                <div className="flex gap-2.5 items-start">
                  <span className="text-purple-600 font-bold">🎁</span>
                  <div>
                    <h5 className="font-bold text-neutral-900">Free bottle & tote bag</h5>
                    <p className="text-[11px] text-neutral-400 font-medium">Extra gift accessories included worth ₹1,799</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="text-emerald-600 font-bold">💰</span>
                  <div>
                    <h5 className="font-bold text-neutral-900">Get extra ₹1,500 off</h5>
                    <p className="text-[11px] text-neutral-400 font-medium">Valid instant validation on premier credit bank instruments.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="text-sky-600 font-bold">🔄</span>
                  <div>
                    <h5 className="font-bold text-neutral-900">Exchange your old RO</h5>
                    <p className="text-[11px] text-neutral-400 font-medium">Get up to ₹1,000 off instantly. We welcome any legacy device brand swap.</p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </main>

      <Footer />
      {showCheckout && (
        <Checkout 
          cartItems={getActiveCartPayload()} 
          onClose={() => setShowCheckout(false)} 
          onOrderSuccess={() => {
            setShowCheckout(false);
            setCartQuantities({ m2pro: 0, m1pro: 0, m1: 0, m0: 0 });
          }}
        />
      )}
    </div>
  );
}

export default Purifier;