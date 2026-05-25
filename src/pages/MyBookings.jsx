import React, { useState } from 'react';
import { Clock, MapPin, X, Calendar, CheckCircle, Package, AlertCircle, Info, ChevronRight, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    { id: 1, service: "AC Deep Cleaning", date: "May 25, 2026", status: "Upcoming", price: "₹799", address: "3-52-3/a, Tara Complex, Hyderabad", img: "https://i.ytimg.com/vi/s6NHxfKUkUo/maxresdefault.jpg", details: "Includes comprehensive cleaning, coil disinfection, and drain pipe check. Professional technician assigned." },
    { id: 2, service: "Home Painting", date: "May 10, 2026", status: "Completed", price: "₹4,500", address: "3-52-3/a, Tara Complex, Hyderabad", img: "https://www.ultratechcement.com/content/ultratechcement/in/en/home/for-homebuilders/home-building-explained-single/descriptive-articles/painting-tips-for-transforming-the-walls-of-your-home/_jcr_content/root/container/container_2072089177/teaser.coreimg.png/1699004302950/home-painting-tips.png", details: "High-quality emulsion paint, full wall sanding, and protective masking for furniture." },
    { id: 3, service: "Sofa cleaning", date: "May 05, 2026", status: "Completed", price: "₹1,200", address: "3-52-3/a, Tara Complex, Hyderabad", img: "https://www.thecleaning.company/wp-content/uploads/2024/05/Sofa-2.jpg", details: "Deep steam cleaning for upholstery, stain treatment, and anti-bacterial sanitization." },
    { id: 4, service: "Pest Control", date: "April 20, 2026", status: "Cancelled", price: "₹999", address: "3-52-3/a, Tara Complex, Hyderabad", img: "https://5.imimg.com/data5/SELLER/Default/2023/11/363792242/TF/WA/IK/2553956/pest-control-services-in-gurgaon.jpeg", details: "Eco-friendly, odorless treatment for residential insect management." }
  ];

  const filtered = activeTab === 'All' ? bookings : bookings.filter(b => b.status === activeTab);

  const statusStyles = (status) => {
    switch(status) {
      case 'Upcoming': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
      <Navbar />
      
      <main className="flex-grow w-full max-w-6xl mx-auto px-2 py-6">
      <div className="mb-10 pb-8 border-b border-neutral-200 flex justify-between items-end">
  <div>
    <h1 className="text-4xl font-extrabold text-neutral-950 tracking-tight mb-2">My Bookings</h1>
    <p className="text-lg text-neutral-500 font-medium">
      Welcome back, <span className="text-indigo-600 font-bold">Garima</span>. Here is your service history.
    </p>
  </div>
  
  {/* Optional: Add a subtle date or helper tag */}
  <div className="hidden md:block text-right">
    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Current Date</p>
    <p className="text-sm font-semibold text-neutral-700">May 22, 2026</p>
  </div>
</div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total', val: 4, icon: Package, color: 'text-indigo-600', iconBg: 'bg-indigo-100', cardBg: 'bg-indigo-50/50', border: 'border-l-indigo-500' },
            { label: 'Upcoming', val: 1, icon: Calendar, color: 'text-blue-600', iconBg: 'bg-blue-100', cardBg: 'bg-blue-50/50', border: 'border-l-blue-500' },
            { label: 'Completed', val: 2, icon: CheckCircle, color: 'text-emerald-600', iconBg: 'bg-emerald-100', cardBg: 'bg-emerald-50/50', border: 'border-l-emerald-500' },
            { label: 'Cancelled', val: 1, icon: AlertCircle, color: 'text-rose-600', iconBg: 'bg-rose-100', cardBg: 'bg-rose-50/50', border: 'border-l-rose-500' }
          ].map((stat, i) => (
            <div key={i} className={`${stat.cardBg} p-6 rounded-3xl border border-neutral-100 border-l-[6px] ${stat.border} shadow-sm hover:shadow-md transition-all`}>
              <div className={`p-3 w-fit rounded-2xl ${stat.iconBg} ${stat.color} mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-neutral-950">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 space-y-2">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 px-2">Filter Bookings</div>
                {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all flex justify-between items-center ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-100'}`}
                    >
                        {tab}
                        {activeTab === tab && <ChevronRight size={18} />}
                    </button>
                ))}
            </aside>

            <div className="flex-grow space-y-6">
              <p className="text-neutral-500">All of your bookings will appear here.</p>
                {filtered.map((b) => (
                    <div key={b.id} className="group bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all flex gap-6 items-center">
                    <img src={b.img} className="w-28 h-28 rounded-2xl object-cover bg-neutral-100" alt="" />
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-neutral-950">{b.service}</h3>
                                <p className="text-xs text-neutral-400 font-medium tracking-wide">ID: BK-{b.id}8294</p>
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${statusStyles(b.status)} uppercase tracking-wider`}>{b.status}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {b.date}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {b.address}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                            <p className="font-bold text-xl text-neutral-950">{b.price}</p>
                            <div className="flex gap-2">
                                <button onClick={() => setSelectedBooking(b)} className="px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-200 transition-colors">Details</button>
                                <button onClick={() => navigate('/help-center')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">Help</button>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}></div>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300">
            <div className="relative h-48 bg-neutral-200">
              <img src={selectedBooking.img} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-950">{selectedBooking.service}</h2>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Booking ID: BK-{selectedBooking.id}8294</p>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${statusStyles(selectedBooking.status)}`}>{selectedBooking.status}</span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl border border-neutral-100"><User className="text-indigo-600" size={18} /></div>
                    <div>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase">Booked By</p>
                        <p className="text-sm font-semibold text-neutral-900">Garima Singh</p>
                    </div>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                    <div className="flex items-start gap-3">
                        <Info className="text-indigo-600 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-semibold text-sm mb-1">Service Overview</h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">{selectedBooking.details}</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors">Reschedule</button>
                <button className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyBookings;