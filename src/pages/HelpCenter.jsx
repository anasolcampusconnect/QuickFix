import React, { useEffect, useRef, useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  Wallet,
  CalendarDays,
  ChevronDown,
  X,
  Send,
  CheckCheck,
  ArrowLeft,
  FileText,
  Clock,
  Bell,
  Play,
  MonitorPlay,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categoryDetails = {
  bookings: {
    title: "Bookings Help Center",
    description: "Manage your scheduled services, track professional arrival, or learn how to reschedule.",
    icon: CalendarDays,
    color: "text-purple-700",
    bg: "bg-purple-100",
    subTopics: [
      { title: "Rescheduling Policies", duration: "3 min read" },
      { title: "Cancellation Fees Explained", duration: "5 min read" },
      { title: "How to Extend a Service Session", duration: "2 min read" },
      { title: "Booking on behalf of someone else", duration: "4 min read" },
    ],
  },
  payments: {
    title: "Payments & Invoicing",
    description: "Secure transaction processing, billing histories, updates on refund timelines, and payment failure troubleshooting.",
    icon: Wallet,
    color: "text-pink-700",
    bg: "bg-pink-100",
    subTopics: [
      { title: "Understanding Temporary Holds", duration: "3 min read" },
      { title: "Updating Saved Credit Cards", duration: "2 min read" },
      { title: "How to Apply Promo Codes", duration: "2 min read" },
      { title: "Requesting a Corporate Tax Invoice", duration: "4 min read" },
    ],
  },
  safety: {
    title: "Trust & Safety Center",
    description: "Your security is our priority. Learn about our verification procedures, insurance covers, and data protection guidelines.",
    icon: ShieldCheck,
    color: "text-cyan-700",
    bg: "bg-cyan-100",
    subTopics: [
      { title: "Professional Verification Checks", duration: "4 min read" },
      { title: "QuickFix Property Damage Insurance Coverage", duration: "6 min read" },
      { title: "Reporting Unprofessional Behavior", duration: "2 min read" },
      { title: "Data Privacy and Home Security Protocols", duration: "3 min read" },
    ],
  },
};

const faqs = [
  {
    question: "How do I book a service?",
    answer: "Search for the service you need, choose a professional, select a date & time, and confirm your booking securely.",
    category: "bookings",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can manage your bookings from the ‘My Bookings’ section before the scheduled service time.",
    category: "bookings",
  },
  {
    question: "How are payments handled?",
    answer: "All payments are securely processed online. You can also choose cash payment for selected services.",
    category: "payments",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team through live chat, email, or customer helpline available 24/7.",
    category: "safety",
  },
  {
    question: "Are professionals verified?",
    answer: "Yes, all professionals undergo background verification and skill assessment before onboarding.",
    category: "safety",
  },
];

const supportCards = [
  {
    title: "Live Chat",
    description: "Chat instantly with our support team.",
    icon: MessageCircle,
    bg: "bg-purple-100",
    iconBg: "bg-purple-200",
    text: "text-purple-700",
    button: "bg-purple-500",
  },
  {
    title: "Call Support",
    description: "Speak directly with our experts.",
    icon: Phone,
    bg: "bg-pink-100",
    iconBg: "bg-pink-200",
    text: "text-pink-700",
    button: "bg-pink-500",
  },
  {
    title: "Email Help",
    description: "Get support through email assistance.",
    icon: Mail,
    bg: "bg-cyan-100",
    iconBg: "bg-cyan-200",
    text: "text-cyan-700",
    button: "bg-cyan-500",
  },
];

const helpCategories = [
  {
    id: "bookings",
    title: "Bookings",
    icon: CalendarDays,
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    id: "payments",
    title: "Payments",
    icon: Wallet,
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  {
    id: "safety",
    title: "Safety",
    icon: ShieldCheck,
    bg: "bg-cyan-100",
    text: "text-cyan-700",
  },
];

const autoReplies = [
  "Our support team is checking your request.",
  "Thanks for reaching out. We'll help you shortly 😊",
  "Your booking issue has been forwarded to our team.",
  "Can you please share more details regarding the issue?",
  "We appreciate your patience 💜",
];

const recommendedSearches = [
  "Cancel booking",
  "Refund status",
  "Verify identity",
  "Payment failed",
  "Reschedule",
];

// Production-ready streaming video elements to play moving assets automatically
const videoTutorials = [
  {
    id: "v1",
    title: "How to Book and Track Your First Service",
    duration: "2 mins",
    author: "Support Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    iconColor: "text-purple-500",
    summary: "Step-by-step visual workflow displaying how to discover service professionals, complete our checkout steps, and review live technician routing straight from your device dashboard map interface.",
  },
  {
    id: "v2",
    title: "Managing Refunds & Payment Security",
    duration: "3 mins",
    author: "Finance Ops",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    iconColor: "text-pink-500",
    summary: "Deep dive demonstrating how online processing safeguards credit profiles, how cancellation timelines affect escrow, and the method to view tracking logs whenever standard refunds process back onto banking networks.",
  },
  {
    id: "v3",
    title: "Account Privacy & Verification Guidelines",
    duration: "4 mins",
    author: "Trust & Safety",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    iconColor: "text-cyan-500",
    summary: "An explicit primer walking through safety check regulations, multi-factor credential setups, identity submission standards, and the secure framework handling physical data storage privacy records.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const [chatMessageInput, setChatMessageInput] = useState("");
  const [modalMessages, setModalMessages] = useState([
    {
      sender: "support",
      text: "Hello 👋 Welcome to QuickFix support. How can we help you today?",
    },
  ]);

  const faqSectionRef = useRef(null);
  const modalChatEndRef = useRef(null);

  useEffect(() => {
    modalChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [modalMessages]);

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 5000);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const targetedBase = selectedCategory 
      ? faqs.filter(f => f.category === selectedCategory) 
      : faqs;

    if (!value.trim()) {
      setFilteredFaqs(targetedBase);
    } else {
      const lowerQuery = value.toLowerCase();
      const filtered = targetedBase.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerQuery) ||
          faq.answer.toLowerCase().includes(lowerQuery)
      );
      setFilteredFaqs(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredFaqs(selectedCategory ? faqs.filter(f => f.category === selectedCategory) : faqs);
  };

  const handleExploreCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); 
    setFilteredFaqs(faqs.filter(faq => faq.category === categoryId));
    setOpenIndex(null);
    
    setTimeout(() => {
      faqSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const resetExplore = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setFilteredFaqs(faqs);
    setOpenIndex(null);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setShowEmailModal(false);
    triggerToast("Support ticket successfully created! Check your inbox for confirmation.");
  };

  const handleSendModalMessage = () => {
    if (!chatMessageInput.trim()) return;

    const userMsg = { sender: "user", text: chatMessageInput };
    setModalMessages((prev) => [...prev, userMsg]);
    setChatMessageInput("");

    setTimeout(() => {
      const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      setModalMessages((prev) => [...prev, { sender: "support", text: randomReply }]);
    }, 1200);
  };

  const handlePlayInternalVideo = (videoObj) => {
    setPlayingVideo(videoObj);
  };

  const activeCategoryInfo = categoryDetails[selectedCategory];

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-800 flex flex-col relative">
      <Navbar />

      {/* TOAST NOTIFICATION HUB */}
      {toast.show && (
        <div className="fixed bottom-8 right-8 z-50 animate-slideUp max-w-md w-full bg-white text-neutral-800 rounded-2xl p-6 shadow-2xl border border-neutral-100 flex items-start gap-5">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl mt-0.5 flex-shrink-0">
            <Bell size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-neutral-900">System Notification</h4>
            <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast({ ...toast, show: false })}
            className="text-neutral-400 hover:text-neutral-600 transition p-1.5 rounded-xl hover:bg-neutral-50"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-purple-100 via-pink-50 to-cyan-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border border-neutral-200 mb-6">
            <HelpCircle size={18} className="text-purple-600" />
            <span className="text-sm font-medium text-neutral-700">24/7 Customer Support</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 leading-tight mb-4">
            {selectedCategory ? activeCategoryInfo.title : "Welcome to the Help Center"}
          </h1>

          <p className="max-w-2xl mx-auto text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
            {selectedCategory ? activeCategoryInfo.description : "Find answers, manage bookings, resolve issues, and connect with our support team anytime you need assistance."}
          </p>

          {/* SEARCH BAR CONTAINER */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3 border border-neutral-100 relative group transition-all focus-within:ring-2 focus-within:ring-purple-200">
              <Search className="text-neutral-400 ml-2" size={22} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={selectedCategory ? `Search within ${selectedCategory}...` : "Search for help, FAQs, bookings..."}
                className="w-full outline-none text-neutral-700 bg-transparent text-sm sm:text-base pr-8"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-28 p-1 rounded-full text-neutral-400 hover:bg-neutral-100 transition">
                  <X size={16} />
                </button>
              )}
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold transition shadow-md shadow-purple-200">
                Search
              </button>
            </div>

            {/* RECOMMENDED SEARCH PILLS */}
            {!selectedCategory && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-1">Popular:</span>
                {recommendedSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearchChange(term)}
                    className="bg-white/80 hover:bg-white text-neutral-600 hover:text-purple-600 text-xs font-medium px-3.5 py-1.5 rounded-full border border-neutral-200/60 shadow-sm transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DYNAMIC EXPLORE TOPICS SECTION */}
      <div ref={faqSectionRef} className="scroll-mt-6">
        {selectedCategory ? (
          <section className="max-w-6xl mx-auto px-6 py-12 w-full">
            <button 
              onClick={resetExplore}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 mb-8 group transition"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Help Topics
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Knowledge Base Articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCategoryInfo.subTopics.map((topic, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                      <div className="flex items-start gap-3">
                        <FileText size={20} className="text-neutral-400 group-hover:text-purple-500 mt-0.5 transition" />
                        <div>
                          <h4 className="font-semibold text-neutral-800 group-hover:text-neutral-950 transition mb-1">{topic.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-neutral-400">
                            <Clock size={12} />
                            <span>{topic.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Related FAQs</h3>
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => setOpenIndex(openIndex === index ? null : index)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left"
                        >
                          <span className="font-semibold text-neutral-900 text-base">{faq.question}</span>
                          <ChevronDown className={`transition-transform duration-300 text-neutral-500 ${openIndex === index ? "rotate-180" : ""}`} />
                        </button>
                        {openIndex === index && (
                          <div className="px-6 pb-5 text-neutral-500 text-sm leading-relaxed">{faq.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm sticky top-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeCategoryInfo.bg} ${activeCategoryInfo.color} mb-4`}>
                  {React.createElement(activeCategoryInfo.icon, { size: 24 })}
                </div>
                <h4 className="text-lg font-bold text-neutral-900 mb-2">Need immediate assistance?</h4>
                <p className="text-sm text-neutral-500 mb-6">If your query isn't fully cleared by these entries, open an instant session with our support staff.</p>
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold py-3.5 rounded-xl transition"
                >
                  Start Live Support Chat
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="max-w-6xl mx-auto px-6 py-16 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900">Browse Help Topics</h2>
              <p className="text-neutral-500 mt-3">Quick access to commonly used support sections.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {helpCategories.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.text} mb-6`}>
                        <Icon size={30} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-neutral-900">{item.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                        Get complete help related to {item.title.toLowerCase()}, updates, and support requests.
                      </p>
                    </div>
                    <button 
                      onClick={() => handleExploreCategory(item.id)}
                      className="w-full text-center bg-neutral-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition mt-auto"
                    >
                      Explore
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* COMPACT GENERAL FAQ INDEX */}
      {!selectedCategory && (
        <section className="max-w-4xl mx-auto px-6 py-12 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">
              {searchQuery ? "Search Results" : "Frequently Asked Questions"}
            </h2>
          </div>
          <div className="space-y-5">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-neutral-900 text-base">{faq.question}</span>
                  <ChevronDown className={`transition-transform duration-300 text-neutral-500 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 text-neutral-500 text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT SUPPORT OPTIONS BLOCK */}
      <section className="py-16 px-6 bg-[#fcfcfc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">Contact Support</h2>
            <p className="text-neutral-500 mt-3">Reach out to our support team through multiple channels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className={`${card.bg} rounded-3xl p-8 border border-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}>
                  <div>
                    <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6`}>
                      <Icon className={card.text} size={30} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${card.text}`}>{card.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">{card.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (card.title === "Live Chat") setShowChatModal(true);
                      if (card.title === "Call Support") setShowCallModal(true);
                      if (card.title === "Email Help") setShowEmailModal(true);
                    }}
                    className={`${card.button} text-white w-full px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition mt-auto text-center`}
                  >
                    Contact Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HELPFUL VIDEO WALKTHROUGHS SECTION */}
      {!selectedCategory && (
        <section className="py-16 px-6 bg-white border-t border-neutral-100">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">Helpful Video Walkthroughs</h3>
                <p className="text-sm text-neutral-500 mt-1">Visual instructions to guide you through common tasks.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videoTutorials.map((video, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handlePlayInternalVideo(video)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-150 shadow-sm flex items-center justify-center bg-neutral-100">
                      <img 
                        src={video.image} 
                        alt={video.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-neutral-900/10 to-transparent z-10" />
                      
                      <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                        <Play size={20} fill="currentColor" className={`ml-1 ${video.iconColor}`} />
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-neutral-800 text-base mt-4 group-hover:text-purple-600 transition duration-200 line-clamp-2 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 font-medium">
                      Duration: {video.duration} • By {video.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMPANION IN-PAGE VIDEO STREAMING PLAYER OVERLAY */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-[28px] w-full max-w-2xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col">
            
            {/* Header control line */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-neutral-50/80">
              <div className="flex items-center gap-2.5 text-neutral-800">
                <MonitorPlay className="text-neutral-500" size={20} />
                <span className="font-bold text-sm uppercase tracking-wider text-neutral-400">In-Page Stream Player</span>
              </div>
              <button 
                onClick={() => setPlayingVideo(null)}
                className="p-1.5 rounded-xl hover:bg-neutral-200 text-neutral-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video container loading actual running streaming mp4 context variables smoothly */}
            <div className="relative aspect-video w-full bg-black overflow-hidden select-none">
              <video 
                key={playingVideo.id}
                src={playingVideo.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                controls
                playsInline
              />
            </div>

            {/* Metadata and dynamic description panel */}
            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-lg">Tutorial Lesson</span>
                <span className="text-xs font-medium text-neutral-400">Published by: {playingVideo.author} • {playingVideo.duration}</span>
              </div>
              <h3 className="font-extrabold text-neutral-900 text-lg pt-1 leading-tight">{playingVideo.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {playingVideo.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LIVE CHAT DRAWER */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col h-[520px]">
            <div className="flex items-center justify-between px-6 py-5 border-b bg-purple-50">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Live Chat Support</h2>
                <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Support Team Online
                </p>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-neutral-500 hover:opacity-70"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-[#fafafa] space-y-4">
              {modalMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white rounded-br-none"
                      : "bg-white text-neutral-700 border border-neutral-200 rounded-bl-none"
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.sender === "user" && (
                      <div className="flex justify-end mt-1 text-purple-200">
                        <CheckCheck size={14} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={modalChatEndRef} />
            </div>

            <div className="p-4 border-t bg-white flex items-center gap-3">
              <input
                type="text"
                value={chatMessageInput}
                onChange={(e) => setChatMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendModalMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-200 transition"
              />
              <button onClick={handleSendModalMessage} className="bg-purple-500 text-white p-3 rounded-xl"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* HELPLINE MODAL */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-pink-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Direct Inbound Line</h3>
            <div className="bg-neutral-100 rounded-2xl p-4 text-xl font-bold text-neutral-900 mb-6">+91 98765 43210</div>
            <button onClick={() => setShowCallModal(false)} className="bg-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold">Close</button>
          </div>
        </div>
      )}

      {/* EMAIL SERVICE MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Email Support</h2>
              <button onClick={() => setShowEmailModal(false)}><X className="text-neutral-500" /></button>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input type="text" required placeholder="Your Name" className="w-full border rounded-2xl px-4 py-3 outline-none border-neutral-200" />
              <input type="email" required placeholder="Your Email" className="w-full border rounded-2xl px-4 py-3 outline-none border-neutral-200" />
              <textarea rows="4" required placeholder="Describe your issue..." className="w-full border rounded-2xl px-4 py-3 outline-none resize-none border-neutral-200"></textarea>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3.5 rounded-2xl font-bold transition">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HelpCenter;