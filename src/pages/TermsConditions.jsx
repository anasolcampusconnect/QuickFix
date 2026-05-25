import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Scroll Animation Wrapper Component
const FadeInSection = ({ children, direction = 'up', delay = 0, rootRef }) => {
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
      {
        root: rootRef?.current || null,
        threshold: 0.1
      }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [rootRef]);

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

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState('services');
  const rightContainerRef = useRef(null);

  // 16 Topics List
  const sections = [
    { id: 'services', title: '1. Services' },
    { id: 'account', title: '2. Account Creation' },
    { id: 'user-content', title: '3. User Content' },
    { id: 'consent-data', title: '4. Consent to Use Data' },
    { id: 'bookings', title: '5. Bookings' },
    { id: 'pricing', title: '6. Pricing, Fees & Payment' },
    { id: 'customer-conduct', title: '7. Customer Conduct' },
    { id: 'third-party', title: '8. Third Party Services' },
    { id: 'responsibilities', title: '9. Your Responsibilities' },
    { id: 'intellectual-property', title: '10. Intellectual Property' },
    { id: 'termination', title: '11. Term & Termination' },
    { id: 'disclaimers', title: '12. Disclaimers & Warranties' },
    { id: 'indemnity', title: '13. Indemnity' },
    { id: 'jurisdiction', title: '14. Jurisdiction & Laws' },
    { id: 'grievance', title: '15. Grievance Redressal' },
    { id: 'miscellaneous', title: '16. Miscellaneous' }
  ];

  // ScrollSpy Tracker Logic: Automatic Left Menu Item Highlighting on Right Side Scroll
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '-20% 0px -55% 0px', // Captures focal element passing the upper-middle window block
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll helper execution logic
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    const container = rightContainerRef.current;
    
    if (element && container) {
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const totalScroll = elementTop - containerTop + container.scrollTop - 24; 

      container.scrollTo({
        top: totalScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      {/* Main Framework with Viewport Locked Height */}
      <main className="flex-grow flex flex-col lg:flex-row h-[calc(100vh-72px)] overflow-hidden">
        
        {/* LEFT SIDE PANEL: Exactly locked menu layout, py-1.5 to fit exactly 16 points */}
        <div className="lg:w-[30%] xl:w-[25%] w-full bg-white border-r border-gray-200 p-4 flex flex-col justify-start overflow-hidden hidden lg:block">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
            Table of Contents
          </h3>
          <nav className="space-y-0.5">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
                  activeSection === sec.id
                    ? 'bg-blue-600 text-white shadow-md translate-x-2'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE PANEL: Independently Scrollable Container */}
        <div 
          ref={rightContainerRef}
          className="lg:w-[70%] xl:w-[75%] w-full h-full overflow-y-auto bg-gray-50 flex flex-col"
        >
          {/* Text Header (No Image Block) */}
          <div className="px-6 lg:px-10 pt-10 pb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-wide">Terms & Conditions</h1>
            <p className="text-[13px] text-gray-500 font-semibold uppercase tracking-wider">Last Updated: May 2026</p>
          </div>

          {/* Text Content Sections */}
          <div className="px-6 lg:px-10 pb-16 space-y-6 flex-grow">
            
            {/* Introduction Box */}
            <FadeInSection direction="up" rootRef={rightContainerRef}>
              <div className="bg-blue-50/60 rounded-xl p-6 border border-blue-100/50">
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  Welcome to our marketplace. These terms constitute a legally binding agreement between you and the company regarding your use of our application, website, and the services provided by independent professionals.
                </p>
              </div>
            </FadeInSection>

            {/* 1. SERVICES */}
            <div id="services">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">1. Services</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our platform acts as a technology aggregation matching system. We connect end-users seeking specific home and beauty services with independent service professionals. We do not directly employ the service professionals nor do we directly provide the underlying physical services.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 2. ACCOUNT CREATION */}
            <div id="account">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">2. Account Creation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To utilize our features, you must register for an account by providing accurate phone numbers, email addresses, and personal details. You must be at least 18 years old. You are entirely responsible for keeping your login credentials secure and for all activities that occur under your account.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 3. USER CONTENT */}
            <div id="user-content">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">3. User Content</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Any reviews, ratings, comments, or multimedia you post on the platform remain your property. However, by posting, you grant us a worldwide, irrevocable, royalty-free license to use, display, modify, and distribute this content for marketing, operational, and promotional purposes.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 4. CONSENT TO USE DATA */}
            <div id="consent-data">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">4. Consent to Use Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    By using our application, you agree to the collection, processing, and storage of your personal data (including location, device information, and usage metrics) strictly in accordance with our Privacy Policy. This data is utilized to enhance platform matching and safety mechanisms.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 5. BOOKINGS */}
            <div id="bookings">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">5. Bookings</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All bookings are subject to the availability of independent professionals in your geographical region. While we strive to ensure punctuality, exact arrival times may fluctuate due to traffic, weather, or previous booking delays.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 6. PRICING, FEES, AND PAYMENT TERMS */}
            <div id="pricing">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">6. Pricing, Fees, and Payment Terms</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Final billing will include the core service cost, applicable convenience fees, safety fees, and statutory taxes. Payments must be routed through our verified online payment gateways or authorized post-service cash methods. We reserve the right to levy cancellation charges if a booking is revoked beyond the permitted time window.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 7. CUSTOMER CONDUCT */}
            <div id="customer-conduct">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">7. Customer Conduct</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Customers are mandated to treat service professionals with utmost dignity. Any form of physical abuse, verbal harassment, discrimination, or inappropriate behavior will result in an immediate lifetime ban from the platform and possible legal action.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 8. THIRD PARTY SERVICES */}
            <div id="third-party">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">8. Third Party Services</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The platform may contain links or integrations with third-party systems (like payment processors or mapping APIs). We do not control these external services and accept no liability for any delays, errors, or losses caused by them.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 9. YOUR RESPONSIBILITIES */}
            <div id="responsibilities">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">9. Your Responsibilities</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You agree to provide a safe, hazard-free working environment for our professionals. It is your responsibility to secure pets, provide access to basic utilities (like water and electricity) necessary for the job, and secure your personal valuables prior to the service.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 10. OUR INTELLECTUAL PROPERTY */}
            <div id="intellectual-property">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">10. Our Intellectual Property</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All source code, UI/UX designs, trademarks, logos, and proprietary algorithms belong exclusively to us. You are strictly prohibited from reverse-engineering, scraping, or copying any platform elements without written authorized consent.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 11. TERM AND TERMINATION */}
            <div id="termination">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">11. Term and Termination</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    These terms apply as long as you have an active account. You may terminate your account at any time via the app settings. We retain the unilateral right to suspend or permanently block your access if we suspect any breach of these guidelines or fraudulent activities.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 12. DISCLAIMERS AND WARRANTIES */}
            <div id="disclaimers">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">12. Disclaimers and Warranties</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The platform is provided on an "as-is" and "as-available" basis without any express warranties. While we verify our professionals, we do not guarantee the perfection of the physical services rendered.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 13. INDEMNITY */}
            <div id="indemnity">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">13. Indemnity</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You agree to indemnify and hold harmless the company, its directors, and employees against any claims, damages, liabilities, or expenses arising from your direct misuse of the platform or violation of these established terms.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 14. JURISDICTION, GOVERNING LAWS AND DISPUTE RESOLUTION */}
            <div id="jurisdiction">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">14. Jurisdiction, Governing Laws, and Dispute Resolution</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    These terms are governed strictly by the laws of India. Any disputes arising from these terms or platform usage shall be subject to the exclusive jurisdiction of the competent courts located in your respective operational city.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 15. GRIEVANCE REDRESSAL */}
            <div id="grievance">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">15. Grievance Redressal</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    If you have any complaints regarding the platform or a service partner, you may contact our Grievance Officer via the Help Center. We endeavor to resolve all reported conflicts within a standard timeline of 48-72 business hours.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 16. MISCELLANEOUS PROVISIONS */}
            <div id="miscellaneous">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">16. Miscellaneous Provisions</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>Force Majeure:</strong> We are not liable for operational failures due to natural disasters, strikes, or acts of God. <br/><br/>
                    <strong>Severability:</strong> If any clause herein is deemed invalid, the remainder of these terms shall continue in full force and effect.
                  </p>
                </div>
              </FadeInSection>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default TermsConditions;