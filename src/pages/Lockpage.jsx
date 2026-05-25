import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Shield, Eye, Bell, Moon, Users, Coffee, Fingerprint, Wifi, Battery, Volume2 } from "lucide-react";
import lockUltra from "../assets/lock-ultra.jpg";
import lockPro from "../assets/lock-pro.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Checkout } from "./Checkout";

export function Lockpage() {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  // --- STATE MANAGEMENT ---
  const [selectedModel, setSelectedModel] = useState("ultra");
  const [cartQuantities, setCartQuantities] = useState({
    ultra: 1,
    pro: 0,
    videoDemo: 0
  });

  // Comprehensive Product Dataset from image layout configurations
  const products = {
    ultra: {
      id: "ultra",
      name: "Native Lock Ultra",
      rating: 4.76,
      reviews: "145",
      price: 24999,
      originalPrice: 34999,
      badge: "NEW",
      img: lockUltra,
      tagline: "Face unlock. Live feed. Two-way talk.",
      features: ["3D Face Unlock", "HD Live Feed", "Two-way Talk"]
    },
    pro: {
      id: "pro",
      name: "Native Lock Pro",
      rating: 4.81,
      reviews: "19K",
      price: 16799,
      originalPrice: 24999,
      badge: "BEST SELLER",
      img: lockPro,
      tagline: "Camera, doorbell, all-in-one.",
      features: ["Fingerprint Sensor", "Built-in Camera", "Digital Keypad"]
    },
    videoDemo: {
      id: "videoDemo",
      name: "Video Demo Service",
      rating: 4.75,
      reviews: "735",
      price: 49,
      originalPrice: 199,
      badge: "EXPERT GUIDE",
      img: null, // Placeholder or service icon
      tagline: "Live expert video demo at your home.",
      features: ["Live Interaction", "On-site Testing"]
    }
  };

  // Quantity Handler Logic
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
  const getActiveCartPayload = () => {
    return Object.entries(cartQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        name: products[id].name,
        price: products[id].price,
        quantity: qty
      }));
  };
  // Calculate overall basket metrics
  const totalItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cartQuantities).reduce((sum, [id, qty]) => {
    return sum + (products[id].price * qty);
  }, 0);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      <Navbar />

      {/* ================= HERO INTRO BANNER SECTION ================= */}
      <section className="pt-28 pb-6 bg-white border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
              Native Smart Locks
            </h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500 mt-1">
              <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold text-xs">★ 4.78</span>
              <span>(23K bookings completed securely)</span>
            </div>
          </div>
          
          <div className="bg-[#f4fbf7] border border-[#e3f6eb] rounded-xl p-2.5 shadow-sm flex flex-col min-w-[130px]">
            <span className="text-[9px] text-emerald-700 font-black tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Earliest Slot
            </span>
            <span className="text-xs font-extrabold text-neutral-800 mt-0.5">Today, 4:00 PM</span>
          </div>
        </div>
      </section>

      {/* ================= MAIN RESPONSIVE TWO-COLUMN LAYOUT GRID ================= */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ---------------- LEFT CONTENT COLUMN SUITE (7 Columns) ---------------- */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* MODELS CATALOGUE SECTOR */}
            <div id="models-view" className="space-y-6 bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Select Model</h2>
              
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
                      {product.img ? (
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="text-3xl">📹</div>
                      )}
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

                    {/* Urban Company Custom Interactive Add counter button */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center" onClick={(e)=>e.stopPropagation()}>
                      <span className="text-[11px] text-neutral-400 font-semibold">Starts at base price</span>
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

            {/* FEATURES ONLY ON NATIVE LOCKS SECTOR */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Features only on Native Locks</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature 1 */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5 space-y-3">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-lg border border-purple-100 shadow-sm">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-neutral-900 text-base">Face Unlock</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Unlock with just one look. Advanced deep-learning anti-spoofing facial recognition technology.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5 space-y-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg border border-blue-100 shadow-sm">
                      <Bell className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-neutral-900 text-base">Doorbell Connect</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Connects flawlessly with your home chime network. Delivers instant snapshot logs right to your phone screen.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5 space-y-3">
                    <div className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-neutral-900 text-base">Reinforced Steel Mortise</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">Heavy mechanical multi-bolt structure built from military grade alloys for ultimate break-in resistance.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* LIVE LIFE UNINTERRUPTED SECTOR */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Live life uninterrupted</h2>
                <p className="text-xs text-neutral-500 font-medium">Smart modular security designed seamlessly around your daily lifestyle scenarios</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Scenario 1 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100"><Moon className="w-4 h-4" /></div>
                  <h4 className="font-black text-neutral-900 text-sm">Unknown midnight visitor?</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium">View clear night-vision video feeds and communicate safely inside via secure two-way audio streams.</p>
                </div>

                {/* Scenario 2 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"><Users className="w-4 h-4" /></div>
                  <h4 className="font-black text-neutral-900 text-sm">Surprise guests at door?</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium">Generate remote disposable OTP triggers or unlock instantly on the go using your integrated companion app.</p>
                </div>

                {/* Scenario 3 */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100"><Coffee className="w-4 h-4" /></div>
                  <h4 className="font-black text-neutral-900 text-sm">Both hands completely full?</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium">Step right in front of the scanner; hands-free 3D facial node mapping triggers instant lock release mechanics.</p>
                </div>
              </div>
            </div>

            {/* TECHNICAL HARDWARE DIAGNOSTICS */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Technical Specifications</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 border border-neutral-200 rounded-xl text-center shadow-sm">
                  <Fingerprint className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h5 className="font-bold text-xs text-neutral-900">Biometric</h5>
                  <p className="text-[10px] text-neutral-400 font-medium mt-0.5">0.3s Quick Scanner</p>
                </div>
                <div className="bg-white p-4 border border-neutral-200 rounded-xl text-center shadow-sm">
                  <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h5 className="font-bold text-xs text-neutral-900">Connectivity</h5>
                  <p className="text-[10px] text-neutral-400 font-medium mt-0.5">Dual-Band Wi-Fi Sync</p>
                </div>
                <div className="bg-white p-4 border border-neutral-200 rounded-xl text-center shadow-sm">
                  <Battery className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h5 className="font-bold text-xs text-neutral-900">Battery Life</h5>
                  <p className="text-[10px] text-neutral-400 font-medium mt-0.5">6 Months Cell Longevity</p>
                </div>
                <div className="bg-white p-4 border border-neutral-200 rounded-xl text-center shadow-sm">
                  <Volume2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h5 className="font-bold text-xs text-neutral-900">Audio Core</h5>
                  <p className="text-[10px] text-neutral-400 font-medium mt-0.5">Noise-Cancelling Mic</p>
                </div>
              </div>
            </div>

          </div>

          {/* ---------------- RIGHT PANEL: STICKY TRANSACTION CONTROL CARD (5 Columns) ---------------- */}
          {/* CHANGED: This part of the code is now strictly locked onto the right column of the desktop layout structure next to the imagery grids */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            
            {/* REAL-TIME BASKET MANAGEMENT SYSTEM */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
                <div>
                  <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider">Total Cart Amount</p>
                  <span className="text-3xl font-black text-neutral-900 tracking-tight">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-xs bg-purple-50 text-purple-700 border border-purple-100 font-extrabold px-2.5 py-1 rounded-lg">
                  {totalItems} Items Added
                </span>
              </div>

              {/* DYNAMIC ROW TRACKER LIST */}
              <div className="space-y-3.5 max-h-48 overflow-y-auto divide-y divide-neutral-50">
                {Object.entries(cartQuantities).map(([id, qty]) => {
                  if (qty === 0) return null;
                  const prod = products[id];
                  return (
                    <div key={id} className="flex justify-between items-center text-xs font-bold text-neutral-800 pt-3 first:pt-0">
                      <div className="space-y-0.5">
                        <span className="text-neutral-900 font-black block">{prod.name}</span>
                        <span className="text-neutral-400 font-medium">₹{prod.price.toLocaleString()} per unit</span>
                      </div>
                      
                      {/* ADJUSTMENT TOGGLE TRACK BUTTONS MATRIX */}
                      <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-50 shadow-sm">
                        <button onClick={() => updateQuantity(id, "minus")} className="w-7 h-7 bg-white text-purple-700 rounded-md flex items-center justify-center border shadow-sm font-black text-xs">-</button>
                        <span className="w-8 text-center text-neutral-900 font-mono text-xs">{qty}</span>
                        <button onClick={() => updateQuantity(id, "plus")} className="w-7 h-7 bg-white text-purple-700 rounded-md flex items-center justify-center border shadow-sm font-black text-xs">+</button>
                      </div>
                    </div>
                  );
                })}
                
                {/* Empty Cart Placeholder block */}
                {totalItems === 0 && (
                  <div className="text-center py-6 space-y-2">
                    <span className="text-2xl block">🛒</span>
                    <p className="text-xs font-bold text-neutral-400">Your layout basket is currently empty</p>
                  </div>
                )}
              </div>

              {/* ACTION TRANSACTION BUTTONS SUBMITTERS MATRIX */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
               <button 
                  onClick={() => {
                    if (totalItems === 0) return alert("Please add an item to continue!");
                    setShowCheckout(true); // Opens common checkout modal framework
                  }}
                  disabled={totalItems === 0}
                  className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-neutral-100 text-white font-black text-sm py-4 rounded-xl shadow-md text-center block uppercase tracking-wider"
                >
                  Buy Now
                </button>

                <button 
                  onClick={() => {
                    if (totalItems === 0) return alert("Basket is empty!");
                    alert("Staged product parameters successfully backed up to application session database cache.");
                  }}
                  disabled={totalItems === 0}
                  className="w-full border-2 border-purple-700 hover:bg-purple-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-neutral-400 text-purple-700 font-black text-sm py-3.5 rounded-xl transition text-center block uppercase tracking-wider active:scale-97"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* COUPOUN CARDS ADVANTAGES BLOCK */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center text-sm font-black border border-purple-100 shadow-inner">%</div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-neutral-900">Flat 10% off up to ₹1,500</h4>
                <p className="text-[11px] font-medium text-neutral-400">Valid on HSBC & credit card EMI transactions</p>
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
            setCartQuantities({ ultra: 0, pro: 0, videoDemo: 0 });
          }}
        />
      )}
    </div>
  );
}

export default Lockpage;