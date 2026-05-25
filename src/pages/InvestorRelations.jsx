import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Scroll Animation Wrapper Component
const FadeInSection = ({ children, direction = 'up', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  let transformClass = 'translate-y-12';
  if (direction === 'left') transformClass = '-translate-x-12';
  if (direction === 'right') transformClass = 'translate-x-12';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${transformClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const InvestorRelations = () => {
  
  // Customized Business Verticals (Unique content)
  const businesses = [
    {
      title: "Domestic Home Solutions",
      desc: "Premium at-home services spanning beauty, wellness, and expert repairs, designed to deliver ultimate convenience and reliability to modern households.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Express Taskers",
      desc: "On-demand, verified helpers for everyday household chores and rapid fixes, ensuring high efficiency, safety, and trust in every task.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "SmartLiving Devices",
      desc: "Our proprietary line of smart home appliances built for modern living—combining energy efficiency, durability, and elegant tech-enabled design.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Global Operations",
      desc: "Scaling our gold-standard service framework internationally, bringing dignified and standardized home services to emerging markets worldwide.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Customized Flagship Initiatives (Unique content)
  const initiatives = [
    {
      title: "Initiative Pragati",
      desc: "Empowering female service partners through advanced skill training, safety protocols, and micro-financing to foster independent entrepreneurship.",
      linkText: "Read our 2026 Impact Report",
      icon: "🌱"
    },
    {
      title: "Suraksha Campaign",
      desc: "A dedicated support system providing legal, mental, and physical safety resources to protect our partners against domestic distress and abuse.",
      icon: "🛡️"
    },
    {
      title: "Vidya Foundation",
      desc: "Our core educational scholarship program aimed at funding the schooling and higher education of our dedicated service professionals' children.",
      icon: "🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <FadeInSection direction="up">
          <div className="relative text-white py-32 px-6 text-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" 
                alt="Investor Relations Background" 
                className="w-full h-full object-cover scale-105 animate-pulse-slow"
              />
              <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide drop-shadow-lg">Investor Relations</h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
                Discover our financial performance, strategic milestones, and future outlook. We are committed to driving sustainable growth and maximizing shareholder value.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Latest Results Banner */}
        <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
          <FadeInSection direction="up" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl transition-shadow duration-300">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Financial Highlights</p>
                <h2 className="text-3xl font-extrabold text-gray-900">Q3 FY26 Results</h2>
              </div>
              <button className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300">
                View detailed reports
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </FadeInSection>
        </div>

        {/* Our Business Section */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <FadeInSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Verticals</h2>
              <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {businesses.map((biz, index) => (
              <FadeInSection key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 150}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={biz.image} 
                      alt={biz.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{biz.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{biz.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* Beyond Business Section */}
        <div className="bg-black text-white py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 w-full">
              <FadeInSection direction="left">
                <h2 className="text-4xl font-bold mb-6">Beyond The Business</h2>
                <div className="w-20 h-1 bg-blue-500 rounded-full mb-8"></div>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Our greatest asset is our vast network of service partners. They are the backbone of our platform, delivering excellence and trust to millions of households.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  By providing them with world-class upskilling, comprehensive health benefits, and financial independence, we are transforming the unorganized gig economy into a structured pathway for upward mobility.
                </p>
              </FadeInSection>
            </div>
            <div className="lg:w-1/2 w-full">
              <FadeInSection direction="right">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
                    alt="Service Professionals Empowerment" 
                    className="rounded-2xl shadow-2xl w-full object-cover h-[450px]"
                  />
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-2xl -z-10"></div>
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gray-800 rounded-full -z-10"></div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>

        {/* Flagship Initiatives */}
        <div className="bg-gray-50 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Social Impact</h2>
                <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((item, index) => (
                <FadeInSection key={index} direction="up" delay={index * 200}>
                  <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 h-full flex flex-col group">
                    <div className="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">{item.desc}</p>
                    
                    {/* Render link if exists */}
                    {item.linkText && (
                      <a href="#" className="inline-flex items-center text-blue-600 font-bold hover:text-black transition-colors group-hover:underline">
                        {item.linkText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default InvestorRelations;