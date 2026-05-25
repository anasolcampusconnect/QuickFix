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

// SVG Star Component Helper
const StarIcon = ({ filled }) => (
  <svg 
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} 
    fill="currentColor" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const UCReviews = () => {
  const [filter, setFilter] = useState('All');

  // Dummy Reviews Data
  const reviewsData = [
    {
      id: 1,
      name: "Ravi Teja",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      service: "AC Service & Repair",
      date: "May 15, 2026",
      rating: 5,
      comment: "Excellent service! The technician was very polite, arrived exactly on time, and fixed my AC cooling issue within 45 minutes. Highly recommended.",
      verified: true
    },
    {
      id: 2,
      name: "Sneha Reddy",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      service: "Deep Home Cleaning",
      date: "May 12, 2026",
      rating: 4,
      comment: "The cleaning team did a fantastic job. The kitchen and bathrooms are sparkling clean. Deducting one star because they were 15 mins late due to traffic.",
      verified: true
    },
    {
      id: 3,
      name: "Vikram Kumar",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      service: "Men's Haircut & Grooming",
      date: "May 10, 2026",
      rating: 5,
      comment: "Very professional salon experience at home. They carried all their equipment and cleaned up everything after the haircut. Super convenient!",
      verified: true
    },
    {
      id: 4,
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      service: "Washing Machine Repair",
      date: "May 08, 2026",
      rating: 3,
      comment: "The repair was done fine, but the spare part took 2 extra days to procure. Customer support was helpful though.",
      verified: true
    },
    {
      id: 5,
      name: "Karthik Iyer",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      service: "Plumbing Services",
      date: "May 05, 2026",
      rating: 5,
      comment: "Fixed my leaking sink perfectly. Honest pricing and transparent billing. Will definitely book again.",
      verified: true
    },
    {
      id: 6,
      name: "Anjali Desai",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      service: "Sofa & Carpet Cleaning",
      date: "May 02, 2026",
      rating: 4,
      comment: "My old sofa looks brand new now. The chemicals they used had a slight smell, but it went away in an hour. Good work overall.",
      verified: true
    }
  ];

  // Rating Stats
  const stats = {
    average: 4.6,
    total: 12450,
    breakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 }
    ]
  };

  // Filter Logic
  const filteredReviews = filter === 'All' 
    ? reviewsData 
    : reviewsData.filter(review => review.rating === parseInt(filter));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        
        {/* Page Header */}
        <FadeInSection direction="up">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Customer Reviews</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from our verified customers. See why millions trust us for their home service needs.
            </p>
          </div>
        </FadeInSection>

        {/* Rating Summary Section */}
        <FadeInSection direction="up" delay={100}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 flex flex-col md:flex-row gap-12 items-center">
            
            {/* Average Score Box */}
            <div className="flex flex-col items-center justify-center text-center md:w-1/3 md:border-r border-gray-100 md:pr-12">
              <h2 className="text-6xl font-extrabold text-gray-900 mb-2">{stats.average}</h2>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(stats.average)} />
                ))}
              </div>
              <p className="text-gray-500 font-medium">Based on {stats.total.toLocaleString()} reviews</p>
            </div>

            {/* Rating Breakdown Progress Bars */}
            <div className="flex-1 w-full">
              {stats.breakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-3 last:mb-0">
                  <span className="text-sm font-semibold text-gray-700 w-16 whitespace-nowrap">
                    {item.stars} Stars
                  </span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-10 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Filter Buttons */}
        <FadeInSection direction="up" delay={200}>
          <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-gray-200 pb-6">
            <span className="text-gray-900 font-bold mr-2">Filter by:</span>
            {['All', '5', '4', '3', '2', '1'].map(star => (
              <button
                key={star}
                onClick={() => setFilter(star)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  filter === star 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {star === 'All' ? 'All Reviews' : `${star} Stars`}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <FadeInSection key={review.id} direction="up" delay={index * 100}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  
                  {/* Reviewer Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                      <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{review.date}</p>
                      </div>
                    </div>
                    {/* Verified Badge */}
                    {review.verified && (
                      <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Rating & Service Area */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < review.rating} />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                      {review.service}
                    </p>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    "{review.comment}"
                  </p>
                </div>
              </FadeInSection>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">No reviews found for this rating.</p>
              <button 
                onClick={() => setFilter('All')}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredReviews.length > 0 && (
          <FadeInSection direction="up" delay={300}>
            <div className="mt-16 text-center">
              <button className="bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300">
                Load More Reviews
              </button>
            </div>
          </FadeInSection>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default UCReviews;