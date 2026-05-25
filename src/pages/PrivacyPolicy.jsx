import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
// Footer import is removed as requested

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

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('background');
  const rightContainerRef = useRef(null);

  // 9 Topics List provided by you
  const sections = [
    { id: 'background', title: '1. Background and Key Information' },
    { id: 'personal-data', title: '2. Personal Data That We Collect' },
    { id: 'how-we-collect', title: '3. How Do We Collect Personal Data?' },
    { id: 'how-we-use', title: '4. How Do We Use Your Personal Data?' },
    { id: 'cookies', title: '5. Cookies' },
    { id: 'disclosures', title: '6. Disclosures of Your Personal Data' },
    { id: 'your-rights', title: '7. Your Rights in Relation to Your Data' },
    { id: 'deletion', title: '8. Deletion of Account and Personal Data' },
    { id: 'transfers', title: '9. Transfers of Your Personal Data' }
  ];

  // ScrollSpy Tracker Logic: Automatic Left Menu Item Highlighting on Right Side Scroll
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '-20% 0px -55% 0px', 
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
        
        {/* LEFT SIDE PANEL: Locked menu layout, items fit exactly in one screen */}
        <div className="lg:w-[30%] xl:w-[25%] w-full bg-white border-r border-gray-200 p-6 flex flex-col justify-start overflow-hidden hidden lg:block">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
            Privacy Directory
          </h3>
          <nav className="space-y-1.5">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
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
          {/* Text Header */}
          <div className="px-6 lg:px-10 pt-10 pb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-wide">Privacy Policy</h1>
            <p className="text-[13px] text-gray-500 font-semibold uppercase tracking-wider">Effective Date: May 2026</p>
          </div>

          {/* Text Content Sections */}
          <div className="px-6 lg:px-10 pb-20 space-y-8 flex-grow">
            
            {/* Introduction Box */}
            <FadeInSection direction="up" rootRef={rightContainerRef}>
              <div className="bg-blue-50/60 rounded-xl p-6 border border-blue-100/50 mt-2">
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  We are deeply committed to protecting your privacy and personal data. This policy explains our practices regarding the collection, use, and disclosure of information when you use our platform and the choices you have associated with that data.
                </p>
              </div>
            </FadeInSection>

            {/* 1. BACKGROUND AND KEY INFORMATION */}
            <div id="background">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Background and Key Information</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology laws. This policy does not require any physical, electronic, or digital signature. By using our platform, you explicitly agree to our practices involving your data.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 2. PERSONAL DATA THAT WE COLLECT */}
            <div id="personal-data">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Personal Data That We Collect</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We collect various types of information to provide and improve our service to you. This includes:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li><strong>Identity Data:</strong> First name, last name, username.</li>
                      <li><strong>Contact Data:</strong> Delivery address, email address, and mobile numbers.</li>
                      <li><strong>Financial Data:</strong> Limited payment details (we rely primarily on secure third-party payment gateways).</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, time zone setting, and device identifiers.</li>
                    </ul>
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 3. HOW DO WE COLLECT PERSONAL DATA? */}
            <div id="how-we-collect">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. How Do We Collect Personal Data?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We use different methods to collect data from and about you, including through:
                    <br/><br/>
                    <strong>Direct Interactions:</strong> You provide us with your identity, contact, and financial data by filling in forms or corresponding with us via the app.
                    <br/><br/>
                    <strong>Automated Technologies:</strong> As you interact with our platform, we automatically collect technical data about your equipment, browsing actions, and patterns.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 4. HOW DO WE USE YOUR PERSONAL DATA? */}
            <div id="how-we-use">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. How Do We Use Your Personal Data?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We will only use your personal data when the law allows us to. Most commonly, we use it to:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Register you as a new user or professional partner.</li>
                      <li>Process and deliver the services you booked.</li>
                      <li>Manage our relationship with you, including notifying you about changes to our terms or asking you to leave a review.</li>
                      <li>Administer and protect our business and platform (including troubleshooting, data analysis, testing, and fraud prevention).</li>
                    </ul>
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 5. COOKIES */}
            <div id="cookies">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cookies are small files placed on your device to collect standard internet log information and visitor behavior information. We use cookies to:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Keep you signed in.</li>
                      <li>Understand how you use our platform.</li>
                      <li>Remember your preferences and region settings.</li>
                    </ul>
                    You can set your browser to refuse all or some browser cookies, but doing so may cause certain parts of our application to become inaccessible or function improperly.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 6. DISCLOSURES OF YOUR PERSONAL DATA */}
            <div id="disclosures">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">6. Disclosures of Your Personal Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We may share your personal data with independent service professionals purely to enable them to reach your location and execute the required home services. Additionally, we may share limited data with external third parties such as IT service providers, legal regulators, or in the event of a corporate merger or acquisition. We require all third parties to respect the security of your personal data and treat it in accordance with the law.
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 7. YOUR RIGHTS IN RELATION TO YOUR PERSONAL DATA */}
            <div id="your-rights">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights in Relation to Your Personal Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Under specific circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Request access to your personal data.</li>
                      <li>Request correction of any incomplete or inaccurate data we hold about you.</li>
                      <li>Object to the processing of your data where we are relying on a legitimate interest.</li>
                      <li>Withdraw consent at any time where we are relying on consent to process your personal data.</li>
                    </ul>
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 8. DELETION OF ACCOUNT AND PERSONAL DATA */}
            <div id="deletion">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">8. Deletion of Account and Personal Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You hold the right to request the deletion of your account and the personal data we have collected about you. You can initiate an account deletion request directly through the platform's settings. Upon receiving a verifiable request, we will permanently delete or anonymize your personal information from our active databases, except where legal retention obligations apply (such as fraud prevention or financial record-keeping).
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 9. TRANSFERS OF YOUR PERSONAL DATA */}
            <div id="transfers">
              <FadeInSection direction="up" rootRef={rightContainerRef}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">9. Transfers of Your Personal Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If we transfer your data internationally, we ensure a similar degree of protection is afforded to it by utilizing appropriate operational safeguards and standard contractual clauses.
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

export default PrivacyPolicy;