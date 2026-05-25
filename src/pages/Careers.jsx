import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Scroll Animation Wrapper Component
const FadeInSection = ({ children, direction = 'up', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  let transformClass = 'translate-y-12';
  if (direction === 'left') transformClass = '-translate-x-12';
  if (direction === 'right') transformClass = 'translate-x-12';
  if (direction === 'none') transformClass = 'translate-y-0 scale-95';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${transformClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Careers = () => {
  
  // Dummy Perks & Benefits Data
  const perks = [
    {
      icon: "🏥",
      title: "Health & Wellness",
      desc: "Comprehensive family health insurance, mental wellness programs, and regular health check-ups."
    },
    {
      icon: "💻",
      title: "Flexible Work",
      desc: "Hybrid working models, flexible hours, and remote work options for eligible roles."
    },
    {
      icon: "📚",
      title: "Continuous Learning",
      desc: "Annual learning budgets, leadership programs, and free access to premium online courses."
    },
    {
      icon: "🏖️",
      title: "Time Off",
      desc: "Generous paid time off, parental leave, and mandatory company-wide recharge days."
    },
    {
      icon: "📈",
      title: "Wealth Creation",
      desc: "Competitive salaries, performance bonuses, and Employee Stock Ownership Plans (ESOPs)."
    },
    {
      icon: "🎉",
      title: "Vibrant Culture",
      desc: "Regular team offsites, catered lunches, and a collaborative, ego-free work environment."
    }
  ];

  // Dummy Job Openings Data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (React.js/React Native)",
      department: "Engineering",
      location: "Hyderabad, IND (Hybrid)",
      type: "Full-Time"
    },
    {
      id: 2,
      title: "Backend Engineer (Java/Spring Boot)",
      department: "Engineering",
      location: "Bengaluru, IND",
      type: "Full-Time"
    },
    {
      id: 3,
      title: "Category Manager - Beauty & Wellness",
      department: "Operations",
      location: "Delhi NCR, IND",
      type: "Full-Time"
    },
    {
      id: 4,
      title: "Product Designer (UI/UX)",
      department: "Design",
      location: "Remote",
      type: "Full-Time"
    },
    {
      id: 5,
      title: "Customer Success Executive",
      department: "Customer Support",
      location: "Hyderabad, IND",
      type: "Full-Time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        
        {/* Hero Section */}
        <FadeInSection direction="none">
          <div className="relative text-white py-32 px-6 text-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover scale-105 animate-pulse-slow"
              />
              <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
                Build the Future of Home Services
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                Join a team of passionate builders, creators, and operators. We are on a mission to empower millions of professionals worldwide to deliver safe, reliable, and high-quality services.
              </p>
              <div className="mt-10">
                <a 
                  href="#open-roles" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  View Open Roles
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Life at Company / Image Grid Section */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <FadeInSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Life at Our Company</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We believe that the best work happens when people feel supported, challenged, and valued. Discover what it means to be part of our journey.
              </p>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeInSection direction="up" delay={100}>
              <div className="h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" alt="Office Culture" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={200}>
              <div className="h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Team meeting" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={300}>
              <div className="h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Celebration" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Perks and Benefits Section */}
        <div className="bg-white py-24 px-6 border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  We take care of our people so they can take care of our customers. Here are some of the perks and benefits of working with us.
                </p>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perks.map((perk, index) => (
                <FadeInSection key={index} direction="up" delay={index * 100}>
                  <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 h-full group">
                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{perk.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{perk.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{perk.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions Section */}
        <div id="open-roles" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
          <FadeInSection direction="up">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
              <p className="text-gray-600 text-lg">
                Ready to make an impact? Explore our open roles and find the perfect fit for your skills.
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <FadeInSection key={job.id} direction="left" delay={index * 100}>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Job Details */}
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {job.department}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {job.location}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div>
                    <button className="w-full md:w-auto bg-white text-gray-900 border-2 border-gray-200 font-bold py-2.5 px-6 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                      Apply Now
                    </button>
                  </div>

                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Fallback Message */}
          <FadeInSection direction="up" delay={500}>
            <div className="mt-12 text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Don't see your role?</h3>
              <p className="text-gray-600 mb-4">We are always looking for talented people to join our team.</p>
              <button className="text-blue-600 font-bold hover:underline">
                Send us your resume &rarr;
              </button>
            </div>
          </FadeInSection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;