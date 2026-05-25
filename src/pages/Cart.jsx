import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiPlus, FiMinus, FiTrash2, FiCreditCard, FiTruck, FiShield, FiClock, FiCheckCircle } from 'react-icons/fi';
import { SiRazorpay } from 'react-icons/si';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Deep Cleaning & Sanitization',
      category: 'Home Cleaning',
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
      duration: '4-5 hours',
      description: 'Complete home deep cleaning with eco-friendly products'
    },
    {
      id: 2,
      name: 'AC Service & Maintenance',
      category: 'Appliance Care',
      price: 899,
      originalPrice: 1799,
      discount: 50,
      qty: 2,
      image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&auto=format&fit=crop',
      duration: '1-2 hours',
      description: 'Professional AC cleaning, gas refill & maintenance'
    },
    {
      id: 3,
      name: 'Sofa & Carpet Deep Clean',
      category: 'Upholstery',
      price: 1899,
      originalPrice: 3799,
      discount: 50,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1583321500900-828e5b283f4c?q=80&w=800&auto=format&fit=crop',
      duration: '3-4 hours',
      description: 'Steam cleaning & stain removal for sofas & carpets'
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.qty,
    0
  );

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const discount = totalMRP - totalAmount;
  const platformFee = 20;
  const gst = totalAmount * 0.05;
  const grandTotal = totalAmount + platformFee + gst;

  // Generate a unique order ID
  const generateOrderId = () => {
    return 'URBAN' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  // Save order to localStorage
  const saveOrderToLocalStorage = (orderData) => {
    const existingOrders = JSON.parse(localStorage.getItem('urbanClampOrders') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('urbanClampOrders', JSON.stringify(existingOrders));
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle successful order placement
  const handleOrderSuccess = (paymentDetails = null) => {
    const orderId = generateOrderId();
    const orderData = {
      orderId: orderId,
      date: new Date().toISOString(),
      items: [...cartItems],
      totalAmount: grandTotal,
      paymentMethod: paymentMethod,
      paymentDetails: paymentDetails,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    
    saveOrderToLocalStorage(orderData);
    setOrderDetails(orderData);
    setShowOrderSuccess(true);
    setCartItems([]);
    
    setTimeout(() => {
      setShowOrderSuccess(false);
    }, 5000);
  };

  // Razorpay payment handler
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please check your internet connection and try again.');
      setIsProcessing(false);
      return;
    }

    // Create a unique receipt ID
    const receiptId = `receipt_${Date.now()}`;

    const options = {
      key: 'rzp_test_YourRazorpayKey', // Replace with your actual Razorpay test key
      amount: Math.round(grandTotal * 100), // Amount in paise
      currency: 'INR',
      name: 'Urban Clamp',
      description: `Payment for ${cartItems.length} cleaning service(s)`,
      image: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png', // Replace with your logo
      order_id: undefined, // Will be created on frontend for demo
      receipt: receiptId,
      prefill: {
        name: 'Urban Clamp Customer',
        email: 'customer@urbanclamp.com',
        contact: '9876543210'
      },
      notes: {
        address: 'Your delivery address will be collected',
        items: cartItems.map(item => `${item.name} x${item.qty}`).join(', ')
      },
      theme: {
        color: '#ff3f6c',
        backdrop_color: '#ffffff'
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          alert('Payment cancelled. You can try again anytime.');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.success', (response) => {
      console.log('Payment successful:', response);
      handleOrderSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      });
      setIsProcessing(false);
    });

    razorpay.on('payment.error', (response) => {
      console.error('Payment error:', response.error);
      alert('Payment failed: ' + (response.error.description || 'Please try again'));
      setIsProcessing(false);
    });

    razorpay.open();
  };

  // COD order handler
  const handleCODOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      handleOrderSuccess({
        cod_reference: `COD_${Date.now()}`,
        amount_to_collect: grandTotal
      });
      setIsProcessing(false);
    }, 1500);
  };

  // Main place order handler
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (paymentMethod === 'prepaid') {
      await handleRazorpayPayment();
    } else {
      handleCODOrder();
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  // Empty cart view
  if (cartItems.length === 0 && !showOrderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-6 animate-bounce">🧹</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Ready to make your space sparkle? Book a cleaning service now!</p>
            <button className="bg-gradient-to-r from-[#ff3f6c] to-[#ff527b] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
              Browse Services
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />

      {/* Success Modal */}
      {showOrderSuccess && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform animate-scale-up">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-green-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed! 🎉</h3>
              <p className="text-gray-500 mb-4">Your cleaning service has been scheduled</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                <p className="text-sm text-gray-600 mb-1">Order ID: <span className="font-mono font-semibold">{orderDetails.orderId}</span></p>
                <p className="text-sm text-gray-600 mb-1">Payment Method: <span className="font-semibold capitalize">{orderDetails.paymentMethod}</span></p>
                <p className="text-sm text-gray-600">Estimated Service Date: <span className="font-semibold">{orderDetails.estimatedDelivery}</span></p>
              </div>
              
              <button 
                onClick={() => setShowOrderSuccess(false)}
                className="w-full bg-gradient-to-r from-[#ff3f6c] to-[#ff527b] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SECTION - Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Your Services ({cartItems.length} items)
              </h1>
              {cartItems.length > 0 && (
                <button 
                  onClick={() => {
                    if (window.confirm('Clear all items from cart?')) {
                      setCartItems([]);
                    }
                  }}
                  className="text-red-500 text-sm hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <FiTrash2 /> Clear All
                </button>
              )}
            </div>

            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex gap-5 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* IMAGE */}
                <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[#ff3f6c] bg-pink-50 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock className="text-xs" /> {item.duration}
                      </span>
                    </div>
                    
                    <h2 className="font-bold text-gray-800 text-lg mt-2">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="font-bold text-2xl text-gray-900">
                        {formatCurrency(item.price)}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        {formatCurrency(item.originalPrice)}
                      </span>
                      <span className="text-[#ff3f6c] font-semibold text-sm bg-pink-50 px-2 py-0.5 rounded-full">
                        {item.discount}% OFF
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="text-gray-600" />
                      </button>
                      <span className="px-4 text-sm font-semibold text-gray-800 min-w-[40px] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-500 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                      <FiTrash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SECTION - Payment & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FiCreditCard /> Payment Details
                </h2>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>{formatCurrency(totalMRP)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee</span>
                  <span>{formatCurrency(platformFee)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span>{formatCurrency(gst)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span className="flex items-center gap-1">
                    <FiTruck /> FREE
                  </span>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-[#ff3f6c]">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="px-6 pb-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Select Payment Method</p>
                <div className="space-y-3">
                  <label 
                    className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-[#ff3f6c] ${
                      paymentMethod === 'prepaid' ? 'border-[#ff3f6c] bg-pink-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="prepaid"
                        checked={paymentMethod === 'prepaid'}
                        onChange={() => setPaymentMethod('prepaid')}
                        className="w-4 h-4 text-[#ff3f6c] focus:ring-[#ff3f6c]"
                      />
                      <div className="flex items-center gap-2">
                        <SiRazorpay className="text-blue-600 text-xl" />
                        <span className="font-medium">Prepaid (Razorpay)</span>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Instant Confirmation</span>
                  </label>

                  <label 
                    className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:border-[#ff3f6c] ${
                      paymentMethod === 'cod' ? 'border-[#ff3f6c] bg-pink-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-[#ff3f6c] focus:ring-[#ff3f6c]"
                      />
                      <div className="flex items-center gap-2">
                        <FiTruck className="text-gray-600 text-xl" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </div>
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Pay at Service</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="p-6 pt-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || cartItems.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isProcessing || cartItems.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#ff3f6c] to-[#ff527b] hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiShield className="text-lg" />
                      PLACE ORDER • {formatCurrency(grandTotal)}
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                  <FiShield /> Safe & Secure Payments | 100% Buyer Protection
                </p>
              </div>

              {/* Trust Badges */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>✨ Free cancellation</span>
                  <span>🔒 Secure payments</span>
                  <span>⭐ Professional service</span>
                  <span>💯 Quality assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;