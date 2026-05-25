import { useState } from "react";
import { Shield, MapPin, Clock, CreditCard, ChevronRight, CheckCircle, ArrowLeft, Percent } from "lucide-react";

export function Checkout({ cartItems = [], onClose, onOrderSuccess }) {
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [selectedAddress, setSelectedAddress] = useState("home");

  // Dynamic computation matrix derived from injected payloads
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // System Constants mirroring structural layouts
  const serviceFee = itemTotal > 0 ? 49 : 0;
  const promotionDiscount = itemTotal > 15000 ? 1500 : 0;
  const totalPayable = Math.max(0, itemTotal + serviceFee - promotionDiscount);

  const handlePaymentSubmit = () => {
    alert(`Order securely processing via ${selectedPayment.toUpperCase()} for ₹${totalPayable.toLocaleString('en-IN')}`);
    if (onOrderSuccess) onOrderSuccess();
  };

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-neutral-100">
          <span className="text-4xl block animate-bounce">🛒</span>
          <h3 className="text-xl font-black text-neutral-900">Your basket is empty</h3>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">No selected premium hardware setups or maintenance triggers found inside system payload pipeline buffers.</p>
          <button onClick={onClose} className="w-full bg-purple-700 hover:bg-purple-800 text-white font-black py-3 rounded-xl transition text-sm uppercase tracking-wider">
            Return to Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div className="bg-neutral-50 w-full max-w-xl h-full flex flex-col justify-between shadow-2xl relative animate-slide-left overflow-hidden border-l border-neutral-200">
        
        {/* MODAL CONTROL HEADER LAYER */}
        <header className="bg-white px-6 py-5 border-b border-neutral-200/60 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition text-neutral-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-black text-neutral-900 tracking-tight">Secure Checkout</h2>
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide mt-0.5">Urban Company Verified Escrow Gateway</p>
          </div>
        </header>

        {/* CONTAINER SCROLL SUITE AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          
          {/* ADDRESS REGION CONTAINER */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" /> Service Location Address
              </h3>
              <button className="text-xs font-extrabold text-purple-700 hover:underline">Change</button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div 
                onClick={() => setSelectedAddress("home")}
                className={`p-4 border rounded-xl cursor-pointer transition flex items-start gap-3 relative ${
                  selectedAddress === "home" ? 'border-purple-600 bg-purple-50/10' : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input type="radio" checked={selectedAddress === "home"} readOnly className="mt-1 accent-purple-700" />
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-neutral-900">Primary Residence (Hyderabad Central)</h4>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed">Plot 42, Phase II, Jubilee Hills, Hyderabad, Telangana - 500033</p>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC SELECTED PRODUCTS RECAP SHEET */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-wider">Items in Bundle Setup</h3>
            <div className="divide-y divide-neutral-100">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start py-3 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <span className="text-sm font-black text-neutral-900 block">{item.name}</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                      <span>Qty: {item.quantity}</span>
                      <span>•</span>
                      <span>₹{item.price.toLocaleString('en-IN')} each</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-neutral-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BANK PROMO BANNERS MATRICES */}
          <div className="bg-white border border-emerald-200 bg-emerald-50/10 rounded-2xl p-4 shadow-sm flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black border border-emerald-100 shadow-inner">
              <Percent className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-emerald-900">Automated Promotion Activated</h4>
              <p className="text-[11px] font-medium text-emerald-600">Flat ₹1,500 off auto applied for structural volume values tracking exceeding ₹15,000 threshold milestones.</p>
            </div>
          </div>

          {/* PAYMENT OPTIONS SELECTOR TRACK */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" /> Secure Escrow Payment Method
            </h3>
            
            <div className="space-y-3">
              <div 
                onClick={() => setSelectedPayment("razorpay")}
                className={`p-3.5 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                  selectedPayment === "razorpay" ? 'border-purple-600 bg-purple-50/10' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={selectedPayment === "razorpay"} readOnly className="accent-purple-700" />
                  <span className="text-xs font-black text-neutral-900">Razorpay Secure Pipeline (UPI, Cards, NetBanking)</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-black tracking-wide">INSTANT</span>
              </div>

              <div 
                onClick={() => setSelectedPayment("cod")}
                className={`p-3.5 border rounded-xl cursor-pointer transition flex items-center justify-between ${
                  selectedPayment === "cod" ? 'border-purple-600 bg-purple-50/10' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input type="radio" checked={selectedPayment === "cod"} readOnly className="accent-purple-700" />
                  <span className="text-xs font-black text-neutral-900">Cash / Pay After System Installation Delivery</span>
                </div>
                <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-black tracking-wide">COD</span>
              </div>
            </div>
          </div>

          {/* CRITICAL BILL BREAKDOWN CONFIGURATION DIAGRAM */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-wider">Payment Bill Summary Breakdown</h3>
            <div className="space-y-3 text-xs font-semibold text-neutral-600">
              <div className="flex justify-between">
                <span>Item Basket Subtotal ({totalQuantity} units)</span>
                <span className="text-neutral-900">₹{itemTotal.toLocaleString('en-IN')}</span>
              </div>
              {promotionDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Volume Structural Discount</span>
                  <span>- ₹{promotionDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>UC Smart Fleet Logistics & Service Fee</span>
                <span className="text-neutral-900">₹{serviceFee}</span>
              </div>
              <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm font-black text-neutral-900">
                <span>Total Amount Payable</span>
                <span className="text-purple-700 text-base">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* CONFIDENCE & ESCROW PROMISE REGION */}
          <div className="flex items-center justify-center gap-2 text-neutral-400 py-2">
            <Shield className="w-4 h-4 text-neutral-400 fill-neutral-100" />
            <span className="text-[11px] font-bold uppercase tracking-wider">PCI-DSS Compliant 256-Bit SSL Secured Core</span>
          </div>

        </div>

        {/* STICKY BOTTOM SUBMISSION WRAPPER BAR */}
        <footer className="bg-white border-t border-neutral-200 px-6 py-4 sticky bottom-0 z-10 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">Grand Total</p>
            <span className="text-xl font-black text-neutral-900 tracking-tight">₹{totalPayable.toLocaleString('en-IN')}</span>
          </div>
          
          <button 
            onClick={handlePaymentSubmit}
            className="bg-purple-700 hover:bg-purple-800 text-white font-black text-xs px-8 py-3.5 rounded-xl uppercase tracking-wider shadow-md transition transform active:scale-95"
          >
            Confirm & Pay Order
          </button>
        </footer>

      </div>
    </div>
  );
}