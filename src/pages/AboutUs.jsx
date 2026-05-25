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

// Number Counter Component
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(true);
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return <span ref={domRef}>{count}{suffix}</span>;
};

const AboutUs = () => {
  const teamMembers = [
    { name: "Rahul Sharma", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/men/32.jpg", bio: "10+ years building scalable service marketplaces." },
    { name: "Priya Desai", role: "Co-Founder & COO", image: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Ensures seamless service delivery across regions." },
    { name: "Vikram Reddy", role: "General Manager", image: "https://randomuser.me/api/portraits/men/46.jpg", bio: "Heads daily operational workflows & strategy." },
    { name: "Ananya Singh", role: "Chief Technology Officer", image: "https://randomuser.me/api/portraits/women/68.jpg", bio: "Leads engineering and tech innovations." },
    { name: "Neha Gupta", role: "Chief Marketing Officer", image: "https://randomuser.me/api/portraits/women/22.jpg", bio: "Drives user growth, branding, and campaigns." },
    { name: "Karthik Iyer", role: "Chief Financial Officer", image: "https://randomuser.me/api/portraits/men/85.jpg", bio: "Manages financial planning & investor relations." },
    { name: "Siddharth Rao", role: "VP of Engineering", image: "https://randomuser.me/api/portraits/men/29.jpg", bio: "Architects scalable mobile and web platforms." },
    { name: "Meera Nair", role: "Head of Customer Success", image: "https://randomuser.me/api/portraits/women/33.jpg", bio: "Dedicated to resolving user queries and support." },
    { name: "Arjun Kapoor", role: "Category Head - Beauty", image: "https://randomuser.me/api/portraits/men/61.jpg", bio: "Manages the entire Salon & Spa at home division." },
    { name: "Roshni Patel", role: "Category Head - Home Repairs", image: "https://randomuser.me/api/portraits/women/55.jpg", bio: "Oversees plumbing, electrical & cleaning services." }
  ];

  const services = [
    { title: "Salon & Spa", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80", desc: "Expert beauty professionals right at your doorstep." },
    { title: "Home Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80", desc: "Deep cleaning services for a spotless home." },
    { title: "Appliance Repair", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80", desc: "Quick fixes for AC, Refrigerator, Washing Machine." },
    // Fixed image link for Plumbing & Electrical
    { title: "Plumbing & Electrical", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=500&q=80", desc: "Certified technicians for all your home repairs." }
  ];

  const coreValues = [
    { title: "Verified Professionals", icon: "🛡️", desc: "Every professional undergoes strict background checks and high-level skill training." },
    { title: "Transparent Pricing", icon: "💳", desc: "No hidden charges. You pay exactly what you see before booking the service." },
    { title: "High-Quality Service", icon: "⭐", desc: "We use premium products and standardized procedures for the best results." },
    { title: "Safe & Secure", icon: "🔒", desc: "Your safety is our priority with secure online payments and verified experts." }
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
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80" 
                alt="Home Services Background" 
                className="w-full h-full object-cover scale-105 animate-pulse-slow"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide drop-shadow-lg">About Our Company</h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
                Your trusted partner for all home services. We seamlessly connect skilled professionals with customers to provide high-quality, reliable services right at your doorstep.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Our Business / Story Section */}
        <div className="max-w-7xl mx-auto px-6 py-20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full">
              <FadeInSection direction="left">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" 
                  alt="Our Business" 
                  className="rounded-2xl shadow-2xl w-full object-cover h-[400px] hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </FadeInSection>
            </div>
            <div className="lg:w-1/2 w-full">
              <FadeInSection direction="right">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Empowering Professionals, Delighting Customers</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Started with a vision to organize the unorganized home services sector, our platform has grown into a leading marketplace. We provide independent professionals with the technology, training, and branding they need to succeed.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Today, we serve millions of customers across 50+ cities, ensuring that every service delivered is safe, standardized, and of the highest quality.
                </p>
                
                {/* Number Counters */}
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default">
                    <h4 className="text-3xl font-bold text-blue-600"><Counter end={5} suffix="M+" /></h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Happy Customers</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default">
                    <h4 className="text-3xl font-bold text-blue-600"><Counter end={50} suffix="k+" /></h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Professionals</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default">
                    <h4 className="text-3xl font-bold text-blue-600"><Counter end={50} suffix="+" /></h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Cities Live</p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>

        {/* Why Choose Us / Core Values */}
        <div className="bg-blue-50 py-20 px-6 border-y border-blue-100">
          <div className="max-w-7xl mx-auto">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">We are committed to delivering the best home service experience with transparency, quality, and safety at our core.</p>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <FadeInSection key={index} direction="up" delay={index * 150}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 text-center group cursor-pointer">
                    <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Services We Provide */}
        <div className="bg-white py-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Services We Provide</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">From beauty treatments to essential home repairs, we have you covered with trusted and verified experts.</p>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <FadeInSection key={index} direction="left" delay={index * 200}>
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="py-20 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">The passionate minds driving our vision forward and making everyday living easier for you.</p>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <FadeInSection key={index} direction="up" delay={index * 100}>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                    <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-gray-50 shadow-md group-hover:border-blue-100 transition-colors duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mt-1 mb-3">{member.role}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
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

export default AboutUs;