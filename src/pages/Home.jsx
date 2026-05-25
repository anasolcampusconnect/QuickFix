import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, Quote, ShieldCheck, Zap, Clock, X, CheckCircle2, ShoppingBag, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Import core Swiper files
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const serviceDetails = {
  1: {
    category: "InstaHelp",
    subtitle: "Emergency & rapid assistance within 15-30 minutes",
    iconColor: "from-emerald-500 to-teal-600",
    items: [
      {
        name: "Instant Plumbing Assist",
        desc: "Urgent fix for major leakages, tap bursts, or drain blocks.",
        price: "₹199",
        duration: "15-30 mins",
        rating: "4.9 (1.2k)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Quick Electrical Restore",
        desc: "Immediate diagnostic & restoration for sudden blackouts or short circuits.",
        price: "₹249",
        duration: "20 mins",
        rating: "4.8 (850)",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Emergency Lockout Service",
        desc: "Safe & non-destructive opening of main doors or bedroom doors.",
        price: "₹349",
        duration: "25 mins",
        rating: "4.7 (420)",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Gas Leakage Check",
        desc: "Rapid safety inspection and secure pipe/regulator fix.",
        price: "₹149",
        duration: "15 mins",
        rating: "4.9 (980)",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  2: {
    category: "Womens Salon & Spa",
    subtitle: "Pamper yourself with premium beauty and therapy services at home",
    iconColor: "from-pink-500 to-rose-600",
    items: [
      {
        name: "Facial & Skincare Glow",
        desc: "Deep cleansing, exfoliation, and a revitalizing vitamin C serum mask.",
        price: "₹899",
        duration: "60 mins",
        rating: "4.9 (3.4k)",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Premium Pedicure & Manicure",
        desc: "Nourishing cuticle care, soothing hot towel wrap, and a relaxing massage.",
        price: "₹599",
        duration: "50 mins",
        rating: "4.8 (2.1k)",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Hair Styling & Deep Spa",
        desc: "Deep conditioning steam spa, scalp massage, and professional blow dry.",
        price: "₹799",
        duration: "45 mins",
        rating: "4.7 (1.8k)",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Stress Relief Aromatherapy",
        desc: "Soothing body oil massage using lavender and chamomile essential extracts.",
        price: "₹1,499",
        duration: "60 mins",
        rating: "4.9 (1.5k)",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  3: {
    category: "Mens Salon & Massage",
    subtitle: "Expert grooming, haircuts, and relaxing massages for men",
    iconColor: "from-blue-500 to-indigo-600",
    items: [
      {
        name: "Haircut & Beard Grooming",
        desc: "Precision haircut, detailed beard shaping, and a relaxing post-shave balm.",
        price: "₹299",
        duration: "45 mins",
        rating: "4.8 (4.2k)",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Deep Tissue Therapy",
        desc: "Firm pressure massage to relieve chronic muscle tension and stiff shoulders.",
        price: "₹1,299",
        duration: "60 mins",
        rating: "4.9 (1.7k)",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Charcoal Facial & Cleansing",
        desc: "Activated charcoal scrub, blackhead removal, and cold steam hydration.",
        price: "₹499",
        duration: "30 mins",
        rating: "4.7 (950)",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Head & Shoulder Massage",
        desc: "Relieving acupressure scalp massage using cooling Ayurvedic hair oils.",
        price: "₹199",
        duration: "20 mins",
        rating: "4.9 (2.3k)",
        image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  4: {
    category: "Cleaning & Pest Control",
    subtitle: "Complete deep cleaning, disinfection, and premium pest solutions",
    iconColor: "from-purple-500 to-fuchsia-600",
    items: [
      {
        name: "Full House Deep Cleaning",
        desc: "Deep vacuuming, floor scrubbing, door & window dusting, and bathroom wash.",
        price: "₹2,499",
        duration: "4-5 hours",
        rating: "4.8 (5.6k)",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Kitchen Intensive Wash",
        desc: "Grease removal from tiles & chimneys, cabinet sanitization, and sink wash.",
        price: "₹1,199",
        duration: "2-3 hours",
        rating: "4.7 (3.1k)",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Bathroom Deep Sanitization",
        desc: "Descaling wall tiles, polishing metallic fixtures, and intensive floor disinfection.",
        price: "₹399",
        duration: "60 mins",
        rating: "4.9 (4.8k)",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Eco-Friendly Pest Control",
        desc: "Safe gel treatments for cockroaches, ants, and bedbugs. ODORLESS process.",
        price: "₹699",
        duration: "45 mins",
        rating: "4.8 (2.5k)",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  5: {
    category: "Wall Makeover by Revamp",
    subtitle: "Give your walls a premium face-lift with textures and designer themes",
    iconColor: "from-amber-500 to-orange-600",
    items: [
      {
        name: "Textured Accent Wall",
        desc: "Premium metallic or matte patterns applied by our certified interior artists.",
        price: "₹3,499",
        duration: "1 day",
        rating: "4.9 (680)",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Premium Wallpaper Setup",
        desc: "Precision layout styling with smooth bubble-free wallpaper pastes.",
        price: "₹1,899",
        duration: "3 hours",
        rating: "4.8 (820)",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Living Room Wall Revamp",
        desc: "Laser alignments, base plastering, and custom double coat painting.",
        price: "₹4,999",
        duration: "2 days",
        rating: "4.9 (540)",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Anti-Crack Damp Care Base",
        desc: "Protective underlayer sealant that blocks moisture and prevents wall cracklines.",
        price: "₹1,299",
        duration: "4 hours",
        rating: "4.7 (380)",
        image: "https://images.unsplash.com/photo-1595844730298-b9595cb63698?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  6: {
    category: "Painting & Water-proofing",
    subtitle: "Complete home painting and advanced waterproofing solutions",
    iconColor: "from-cyan-500 to-blue-600",
    items: [
      {
        name: "Full House Outer Painting",
        desc: "Weather-shield outer coat paint with protective anti-algae treatment.",
        price: "₹12,499",
        duration: "4 days",
        rating: "4.9 (430)",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Ceiling Leakage Proofing",
        desc: "Chemical injection grout & rubber sealant coating to block active water drops.",
        price: "₹2,499",
        duration: "5 hours",
        rating: "4.8 (790)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Interior Wall Damp Treat",
        desc: "Scrubbing off flakes, applying anti-fungal primers, and finishing with matching paints.",
        price: "₹1,899",
        duration: "1 day",
        rating: "4.8 (910)",
        image: "https://images.unsplash.com/photo-1595844730298-b9595cb63698?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Wood & Metal Gloss Polish",
        desc: "Sandpaper leveling and premium enamel spray painting for window grills or furniture.",
        price: "₹999",
        duration: "4 hours",
        rating: "4.7 (520)",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  7: {
    category: "AC & Appliance Repair",
    subtitle: "Premium appliance servicing, deep cleaning and immediate fixes",
    iconColor: "from-orange-500 to-red-600",
    items: [
      {
        name: "AC Foam Jet Cleaning",
        desc: "High-pressure jet spraying, coil foam wash, and filter sheet checkup.",
        price: "₹599",
        duration: "45 mins",
        rating: "4.9 (8.4k)",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Refrigerator Gas Charging",
        desc: "Full leak test checks, filter dryer swaps, and R134a/R600a eco-gas refills.",
        price: "₹1,499",
        duration: "60 mins",
        rating: "4.8 (2.1k)",
        image: "https://images.unsplash.com/photo-1571175432290-ef01a7199351?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Washing Machine Drum Scale",
        desc: "Full chemical scaling wash, rotor alignment test, and pump drainage checks.",
        price: "₹349",
        duration: "40 mins",
        rating: "4.8 (3.2k)",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Microwave Magnetron Swap",
        desc: "Diagnostics for heat-failure and high-quality copper magnetron parts setup.",
        price: "₹799",
        duration: "30 mins",
        rating: "4.7 (1.2k)",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  8: {
    category: "Electrician",
    subtitle: "Certified residential electrical maintenance, setups, and repairs",
    iconColor: "from-yellow-500 to-amber-600",
    items: [
      {
        name: "Switch & Socket Setup",
        desc: "Replacement of modular switch boards, dimmer units, or high-volt sockets.",
        price: "₹129",
        duration: "20 mins",
        rating: "4.8 (5.9k)",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Ceiling Fan Repair & Install",
        desc: "Speed regulator swaps, copper coil windings, or direct fan hang setups.",
        price: "₹189",
        duration: "30 mins",
        rating: "4.9 (4.8k)",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Smart Home Device Setup",
        desc: "Integration of smart touch hubs, Alexa sockets, or automated light bulbs.",
        price: "₹349",
        duration: "45 mins",
        rating: "4.7 (1.4k)",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Short Circuit Fault Finding",
        desc: "Thermal imaging scanner diagnostic checks and direct rewire replacement.",
        price: "₹499",
        duration: "60 mins",
        rating: "4.9 (2.7k)",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  9: {
    category: "Native Water Purifier",
    subtitle: "Premium RO purifiers with multi-stage mineral filtration systems",
    iconColor: "from-blue-500 to-sky-600",
    items: [
      {
        name: "Native M1 Water Purifier",
        desc: "8-stage RO + UV + UF + MTDS purification, mineral enrichment, and smart app integration.",
        price: "₹13,499",
        type: "RO + UV + UF",
        rating: "4.9 (4.8k)",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native M2 Alkaline Water Purifier",
        desc: "Advanced active copper filtration with pH alkaline tuning for healthy drinking water.",
        price: "₹15,999",
        type: "Active Copper + Alkaline",
        rating: "4.8 (3.1k)",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native Lite RO Purifier",
        desc: "Compact modular design with eco-water saving membrane technology, perfect for mid-TDS households.",
        price: "₹9,999",
        type: "RO + UV Compact",
        rating: "4.7 (2.4k)",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native Pro Ultra Purifier",
        desc: "Smart purifier featuring instant hot/cold water dispensing, carbon filter, and touch panel controls.",
        price: "₹18,499",
        type: "Smart Hot & Cold RO",
        rating: "4.9 (1.2k)",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  10: {
    category: "Native Smart Locks",
    subtitle: "High-security digital biometric smart locks for modern homes",
    iconColor: "from-slate-600 to-zinc-800",
    items: [
      {
        name: "Native Secure Touch Biometric Lock",
        desc: "Instant fingerprint scanner, touch keypad passcode, RFID cards, and mechanical key override.",
        price: "₹8,999",
        type: "Biometric & Keypad",
        rating: "4.9 (1.5k)",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native WiFi Video Smart Lock",
        desc: "Built-in HD camera doorbell with instant video stream alerts, remote locking, and OTP codes.",
        price: "₹14,999",
        type: "Video Smart Lock",
        rating: "4.8 (890)",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native Keyless Auto-Lock Deadbolt",
        desc: "Ultra slim design that automatically locks behind you. Ideal for bedrooms, home-offices, and cabinets.",
        price: "₹5,499",
        type: "Auto-Lock Deadbolt",
        rating: "4.7 (740)",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Native Slide Gate Smart Lock",
        desc: "Heavy-duty weatherproof IP65 biometric lock specialized for sliding gates and metal grill entry doors.",
        price: "₹11,999",
        type: "Weatherproof Slide Gate",
        rating: "4.9 (350)",
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  11: {
    category: "Plumber",
    subtitle: "Professional tap fixes, drain clearance, and leak repairs",
    iconColor: "from-blue-500 to-cyan-600",
    items: [
      {
        name: "Tap & Mixer Installation",
        desc: "Fitting premium kitchen sinks taps or vanity basin mixer units.",
        price: "₹149",
        duration: "25 mins",
        rating: "4.8 (7.8k)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Drain Blockage Clearance",
        desc: "Chemical and spring wire drain cleaning to clear hair or food waste.",
        price: "₹249",
        duration: "40 mins",
        rating: "4.9 (4.5k)",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Flush Tank Repair & Fitting",
        desc: "Syphon valve replacement, dual-button kit swaps, or inlet float fixes.",
        price: "₹199",
        duration: "30 mins",
        rating: "4.7 (3.2k)",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "G.I. or PVC Pipeline Leak Fix",
        desc: "Thread sealing tape coatings, structural pipe cuts, and solvent glue joins.",
        price: "₹349",
        duration: "50 mins",
        rating: "4.8 (2.9k)",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  12: {
    category: "Carpenter",
    subtitle: "On-demand custom woodwork repairs, hinges and lock fittings",
    iconColor: "from-amber-600 to-amber-800",
    items: [
      {
        name: "Door Lock & Latch Fitting",
        desc: "Setup of premium brass locks, tower bolts, or magnetic door catch units.",
        price: "₹189",
        duration: "30 mins",
        rating: "4.8 (3.9k)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Cabinet Hinge & Magnet Fix",
        desc: "Replacing rusted steel cabinet hinges or magnetic cabinet catchers.",
        price: "₹129",
        duration: "25 mins",
        rating: "4.7 (2.4k)",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Furniture Setup & Repair",
        desc: "Assembly of flat-pack study tables, bed frames, or cabinet doors.",
        price: "₹499",
        duration: "60 mins",
        rating: "4.9 (1.8k)",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Drawer Channel Alignment",
        desc: "Tuning side slider tracks for kitchen slide baskets or bedroom dressers.",
        price: "₹149",
        duration: "30 mins",
        rating: "4.8 (1.6k)",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
};

// Import core Swiper files
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
const Home = () => {
  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      title: "Give your space the\nglow-up it deserves",
      subtitle: "Premium Home Painting & Wall Makeovers"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
      title: "Impeccable clean,\nevery single corner",
      subtitle: "Certified Structural Hygiene & Deep Sanitization"
    }
  ];
  const navigate = useNavigate();

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('morning');

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedServiceId || isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedServiceId, isBookingModalOpen]);

  // Services array with dynamic premium badges added
  const services = [
    {
      id: 1,
      name: 'InstaHelp',
      image: 'https://t4.ftcdn.net/jpg/09/12/84/71/360_F_912847172_jmLjKGVu3grCSMoDgL26GIZxzEr77WFC.jpg',
      badge: { text: 'Instant', type: 'urgent' }
    },
    {
      id: 2,
      name: 'Womens Salon & Spa',
      image: 'https://img.freepik.com/premium-vector/illustration-cute-girl-her-skin-care-face-cleansing_591769-36.jpg',
      badge: { text: '50 mins', type: 'premium' }
    },
    {
      id: 3,
      name: 'Mens Salon & Massage',
      image: 'https://thumbs.dreamstime.com/b/man-spa-treatment-having-female-hand-applying-natural-facial-white-mask-to-clean-face-skin-106962609.jpg',
      badge: { text: '1 hour', type: 'normal' }
    },
    {
      id: 4,
      name: 'Cleaning & Pest Control',
      image: 'https://www.electrolux.in/globalassets/appliances/vacuum-clearner/corded-vacuum/z931/z931-fr-1500x1500.png',
      badge: { text: '45 mins', type: 'time' }
    },
    {
      id: 5,
      name: 'Wall Makeover by Revamp',
      image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25115908/wooden-wall-designs-2.jpg',
      badge: { text: '3 hour', type: 'normal' }
    },
    {
      id: 6,
      name: 'Painting & Water-proofing',
      image: 'https://artsynest.in/upload/products/1597522212wp_drip_brush_896.jpg',
      badge: { text: '50 mins', type: 'premium' }
    },
    {
      id: 7,
      name: 'AC & Appliance Repair',
      image: 'https://eeslmart.in/images/thumbs/0000392_15-tr-super-efficient-5-star-split-ac.jpeg',
      badge: { text: 'Instant', type: 'urgent' }
    },
    {
      id: 8,
      name: 'Electrician',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1EFjPMg3OZKX-GwfY8bCj1tFv6ri_7nCstQ&s',
      badge: { text: 'Within 30m', type: 'time' }
    },
    {
      id: 9,
      name: 'Native Water Purifier',
      image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/water-purifier/z/m/z/-original-imahgu9evp3yrmrh.jpeg?q=20',
      badge: { text: 'Best Seller', type: 'premium' }
    },
    {
      id: 10,
      name: 'Native Smart Locks',
      image: 'https://m.media-amazon.com/images/I/61CzW1moLLL._AC_UF1000,1000_QL80_.jpg',
      badge: { text: 'Free Setup', type: 'normal' }
    },
    {
      id: 11,
      name: 'Plumber',
      image: 'https://www.frakem.com/blog/wp-content/uploads/2016/05/Toilet_Plunger-1.jpg',
      badge: { text: 'Instant', type: 'urgent' }
    },
    {
      id: 12,
      name: 'Carpenter',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/047/425/404/small/classic-worker-or-carpenter-civil-engineering-construction-worker-isolated-on-white-cartoon-character-illustration-vector.jpg',
      badge: { text: 'On Demand', type: 'normal' }
    },
  ];

  const stats = [
    { value: '12M+', label: 'services done', icon: <ShieldCheck className="size-5 text-indigo-600" /> },
    { value: '4.9★', label: 'avg rating', icon: <Star className="size-5 text-amber-500 fill-amber-500" /> },
    { value: '48hr', label: 'guarantee', icon: <Clock className="size-5 text-indigo-600" /> },
    { value: '50K+', label: 'pros trained', icon: <Zap className="size-5 text-indigo-600" /> },
  ];

  const getBadgeStyles = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'time':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'premium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
      default:
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const popularServices = [
    {
      id: 1,
      title: 'AC Deep Cleaning',
      rating: 4.8,
      desc: 'Intense foam cleaning of indoor & outdoor units for absolute chilling and clean air.',
      price: '₹599',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/072/709/110/small/man-cleaning-an-air-conditioner-with-a-pressure-washer-photo.jpg'
    },
    {
      id: 2,
      title: 'Full House Painting',
      rating: 4.9,
      desc: 'Expert color consultation, laser scanning, flawless execution, and clean post-job walkthrough.',
      price: '₹9,999',
      image: 'https://townboyspainting.ca/wp-content/uploads/2025/06/painting-workers-doing-painting-in-office-1024x717.webp'
    },
    {
      id: 3,
      title: 'Electrician Visit',
      rating: 4.7,
      desc: 'Certified breakdown diagnostics, safe short circuit repairs, and high-load appliance wiring.',
      price: '₹149',
      image: 'https://img.freepik.com/premium-photo/technician-black-man-electrician-checking-cables-fixing-faulty-wires-server-mechanic-male-employee-entrepreneur-engineer-with-tools-electrical-maintenance-with-handyman-focus_590464-165466.jpg'
    },
    {
      id: 4,
      title: 'Kitchen Deep Cleaning',
      rating: 4.8,
      desc: 'Complete grease removal from tiles, exhaust mesh, cabinets, and premium countertop polishing.',
      price: '₹1,299',
      image: 'https://www.bondcleaningindarwin.com.au/wp-content/uploads/2024/03/professional-cleaning.webp'
    },
    {
      id: 5,
      title: 'Bathroom Intensive Wash',
      rating: 4.6,
      desc: 'Hard water stain removal from premium fixtures, deep tile scrubbing, and anti-bacterial sanitization.',
      price: '₹449',
      image: 'https://techsquadteam.com/assets/profile/blogimages/19c7a67f84cce8f95e5b2271ec32ce8b.png'
    },
    {
      id: 6,
      title: 'Upholstery Spa',
      rating: 4.9,
      desc: 'Deep odor removal treatment, premium products and relaxing session with our top specialist and workers.',
      price: '₹799',
      image: 'https://thumbs.dreamstime.com/b/close-up-women-laying-eyes-closed-massage-bed-beauty-treatment-young-latin-enjoying-spa-holiday-resort-cheerful-435790452.jpg'
    },
    {
      id: 7,
      title: 'Water Purifier Service',
      rating: 4.7,
      desc: 'RO membrane health checkups, filter replacements, sediment removal, and TDS level tuning.',
      price: '₹399',
      image: 'https://roserviceman.com/wp-content/uploads/2024/03/Ro-Repair-1.jpg'
    }
  ];

  const applianceServices = [
    {
      id: 1,
      title: 'Refrigerator Repair',
      rating: 4.8,
      desc: 'Comprehensive diagnostics, gas charging, thermostat replacement, and cooling optimization.',
      price: '₹299',
      image: 'https://t4.ftcdn.net/jpg/03/30/61/59/360_F_330615955_AdnnZtL9HBXhIFrbQexD4z2961diIORI.jpg'
    },
    {
      id: 2,
      title: 'Washing Machine Service',
      rating: 4.9,
      desc: 'Drum scaling removal, alignment fixes, error code diagnostics, and heavy-load rinse tuning.',
      price: '₹349',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Microwave Oven Repair',
      rating: 4.7,
      desc: 'Magnetron replacement, spark troubleshooting, door switch repairs, and heating uniform checks.',
      price: '₹199',
      image: 'https://media.istockphoto.com/id/1096969718/photo/man-repairing-microwave-oven.jpg?s=612x612&w=0&k=20&c=WmjFtOhiF2tpG2o1Fa7K3OgBl-Wjf7chU3LwIuiR_Cg='
    },
    {
      id: 4,
      title: 'Geyser Repair Visit',
      rating: 4.6,
      desc: 'Thermostat health checks, scale buildup removal from elements, and absolute leak control protection.',
      price: '₹249',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/074/236/990/small/professional-plumber-inspecting-a-water-heater-unit-with-smartphone-and-tools-photo.jpg'
    },
  ];

  const womenMassage = [
    {
      id: 1,
      title: 'Stress Relief Massage',
      rating: 4.9,
      desc: 'Soothing Swedish strokes combined with calming essential oils to thoroughly unpack muscle knots.',
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Deep Tissue Therapy',
      rating: 4.8,
      desc: 'Targeted firm pressure manipulation focused on realigning deep layers of worn-out muscle fibers.',
      price: '₹1,899',
      image: 'https://oasismassagesalon.com/wp-content/uploads/2017/04/Oasis-deep-tissue-massage.jpg'
    },
    {
      id: 3,
      title: 'Aromatherapy Session',
      rating: 4.9,
      desc: 'Custom blended natural botanicals matched with rhythmic pressure to elevate mood and spirit.',
      price: '₹1,699',
      image: 'https://www.zyurthaispa.com/manage/upload/aromatheraphy.jpg'
    },
    {
      id: 4,
      title: 'Hot Stone Massage',
      rating: 4.7,
      desc: 'Warm stones are used during massage to relax muscles and improve blood flow.',
      price: '₹1,699',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      title: 'Foot Reflexology',
      rating: 4.5,
      desc: 'Pressure-point foot massage that helps reduce stress and promotes relaxation throughout the body.',
      price: '₹1,699',
      image: 'https://www.targettherapies.co.uk/wp-content/uploads/2023/12/focused-crop-woman-massaging-foot-of-patient.jpeg'
    },
  ];

  const menSalon = [
    {
      id: 1,
      title: 'Haircut & Styling',
      rating: 4.7,
      desc: 'Trendset cuts tailored precisely to your facial structural layout, featuring premium wash setups.',
      price: '₹249',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Beard Grooming & Trim',
      rating: 4.8,
      desc: 'Sharp perimeter razor profiling, volume balancing, and softening hot oil massage finishes.',
      price: '₹149',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Men\'s Detox Facial',
      rating: 4.6,
      desc: 'Intense charcoal scrubbing, extraction treatments, and cold therapy pore-firming masks.',
      price: '₹499',
      image: 'https://rnlasermedspa.com/wp-content/uploads/2020/12/Gentlemans-Facial_1157432647-LR2.jpg'
    },
    {
      id: 4,
      title: 'Men\'s Waxing, Manicure, Pedicure',
      rating: 4.8,
      desc: 'Complete grooming care for smooth skin, clean nails, and well-maintained hands and feet.',
      price: '₹999',
      image: 'https://cdn.hswstatic.com/gif/real-men-manicures-1.jpg'
    },
    {
      id: 5,
      title: 'Men\'s Head, Body Massage',
      rating: 4.3,
      desc: 'Relaxing massage therapy that refreshes the mind and body by relieving stress and fatigue.',
      price: '₹1999',
      image: 'https://t3.ftcdn.net/jpg/09/39/17/84/360_F_939178453_EkjO9Cda6c4rohWKNEaV0MfmEBhA0K3i.webp'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ananya Sharma',
      role: 'Homeowner',
      serviceUsed: 'Full House Painting',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'The laser scanning and structured color assessment workflow completely changed how we structured our renovation. Flawless execution and zero mess left behind!',
    },
    {
      id: 2,
      name: 'Rohan Malhotra',
      role: 'Tech Lead',
      serviceUsed: 'AC Deep Cleaning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'Super crisp servicing! The specialist showed up exactly on time with full foam setups, protective sheets, and structural diagnostics. Absolute absolute value.',
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Product Designer',
      serviceUsed: 'Stress Relief Massage',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment: 'Unbelievably premium experience right at my residence. Booking a spa session through this application was fluid, completely safe, and professional.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-neutral-800 antialiased font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">

        {/* HERO SECTION: Modern Split-Pane Style */}
        <section className="w-full h-[460px] md:h-[420px] bg-neutral-900 relative">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={'fade'}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {bannerSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="w-full h-full relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="max-w-[1500px] h-full mx-auto px-6 sm:px-8 flex flex-col justify-center relative z-10 text-white">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-2xl flex flex-col items-start gap-4"
                  >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-neutral-300 text-sm sm:text-base font-medium">
                      {slide.subtitle}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsBookingModalOpen(true);
                        setIsBookingSubmitted(false);
                      }}
                      className="mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Book Now
                    </motion.button>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* SERVICES GRID SECTION: Soft Rose-Tinted Layout Base */}
        <section className="bg-rose-50/40 border-b border-neutral-100/60 transition-colors duration-300">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-8 pt-16 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-200/40"
            >
              <div className="relative">
                <div className="w-12 h-1 bg-amber-500 rounded-full mb-3" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 flex items-center gap-2">
                  Every service, one roof.
                </h2>
                <p className="text-neutral-500 text-xs sm:text-sm mt-1.5 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Select from our verified range of assistance suites.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04 }
                }
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white p-2.5 rounded-xl flex flex-col items-center justify-between min-h-[135px] border border-neutral-200/70 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer relative"
                >
                  {/* Badge */}
                  <div className="w-full flex justify-center mb-1.5">
                    <span className={`inline-block text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider ${getBadgeStyles(service.badge.type)}`}>
                      {service.badge.text}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-1.5 bg-neutral-50/80 p-1 border border-neutral-100/60">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-[12px] font-extrabold text-neutral-900 text-center leading-tight tracking-tight mt-auto w-full line-clamp-2">
                    {service.nameStatus || service.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* METRICS SECTION: Core Layout preserved completely */}
        <section className="max-w-[1400px] mx-auto px-6 sm:px-8 pb-20 pt-12">
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 items-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-4 md:border-r border-neutral-200 last:border-0 w-full"
              >
                <div className="p-3 bg-slate-50 rounded-xl border border-neutral-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
                    {stat.value}
                  </div>
                  <div className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider leading-none mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Services Section */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Popular Services in Your Area
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {popularServices.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-full h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-semibold text-neutral-500 ml-1.5 pt-0.5">
                        {item.rating}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Starts at</span>
                    <span className="text-base font-bold text-indigo-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Brand Campaign Promo Section */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-amber-100/40 border border-amber-200/60 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
          >
            <div className="flex flex-col items-start gap-4 max-w-xl md:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
                Give your space the glow-up it deserves
              </h2>
              <p className="text-neutral-600 text-[15px] sm:text-base font-medium mb-4">
                Premium interior finishes, micro-textures, and customized wall paint styling.
              </p>
              <button onClick={() => navigate('/Revamp')} className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm">
                Explore styles
              </button>
            </div>
            <div className="w-full md:w-1/2 h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="Premium interior layout view"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* SECTION 1: Appliance Repair & Services */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Appliance Repair & Services
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {applianceServices.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-full h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-semibold text-neutral-500 ml-1.5 pt-0.5">
                        {item.rating}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Starts at</span>
                    <span className="text-base font-bold text-indigo-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 2: Massage for Women */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Massage for Women
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {womenMassage.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-full h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-semibold text-neutral-500 ml-1.5 pt-0.5">
                        {item.rating}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Starts at</span>
                    <span className="text-base font-bold text-indigo-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 3: Salon for Men */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Salon for Men
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {menSalon.map((item) => (
              <div
                key={item.id}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-full h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1 leading-tight">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-semibold text-neutral-500 ml-1.5 pt-0.5">
                        {item.rating}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Starts at</span>
                    <span className="text-base font-bold text-indigo-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* FINAL PROMO SECTION */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
          >
            <div className="w-full md:w-1/2 h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=800&q=80"
                alt="Professional home cleaning and setup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-4 max-w-xl md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15]">
                Your home, maintained by professionals
              </h2>
              <p className="text-neutral-600 text-[15px] sm:text-base font-medium mb-4">
                Book verify-checked experts for instant breakdowns, installations, and seasonal structural deep care packages.
              </p>
              <button
                onClick={() => {
                  setIsBookingModalOpen(true);
                  setIsBookingSubmitted(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Book a service now
              </button>
            </div>
          </motion.div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-20">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                What our community says
              </h2>
              <p className="text-neutral-500 text-base font-medium">
                Real feedback from verified residential bookings.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100/60 border border-neutral-200/40 px-3.5 py-1.5 rounded-full w-max">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800">4.9/5 Average Rating</span>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 20px -4px rgba(0,0,0,0.04), 0 4px 8px -2px rgba(0,0,0,0.02)",
                  borderColor: "rgb(212, 212, 212)"
                }}
                className="bg-white border border-neutral-200/70 rounded-2xl p-6 md:p-7 flex flex-col justify-between items-start relative transition-shadow duration-300 cursor-pointer"
              >
                <div className="absolute top-6 right-6 text-neutral-100 pointer-events-none z-0">
                  <Quote className="w-12 h-12 rotate-180 fill-current" />
                </div>

                <div className="mb-6 w-full relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-block bg-orange-50 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-orange-100/50 uppercase tracking-wider">
                      {t.serviceUsed}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-neutral-700 font-medium text-[14px] leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-100 w-full relative z-10">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border border-neutral-200/80 bg-neutral-50"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 border border-white w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                      <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 leading-tight">{t.name}</h4>
                    <p className="text-xs text-neutral-400 font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </main>

      {/* Services Detail Modal */}
      <AnimatePresence>
        {selectedServiceId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedServiceId(null)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl border border-neutral-100 flex flex-col relative z-10 max-h-[85vh] md:max-h-[90vh]"
            >
              {/* Header Cover */}
              <div className={`p-6 md:p-8 bg-gradient-to-r ${serviceDetails[selectedServiceId]?.iconColor || 'from-indigo-500 to-purple-600'} text-white relative`}>
                <button
                  onClick={() => setSelectedServiceId(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors border border-white/10 cursor-pointer animate-none flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-white/20 rounded-full border border-white/10">
                  Premium Assistance
                </span>
                <h2 className="text-2xl md:text-3xl font-black mt-3 leading-tight">
                  {serviceDetails[selectedServiceId]?.category}
                </h2>
                <p className="text-white/80 text-xs md:text-sm mt-1.5 font-medium">
                  {serviceDetails[selectedServiceId]?.subtitle}
                </p>
              </div>

              {/* Service Items List */}
              <div className="p-4 md:p-6 overflow-y-auto space-y-4 flex-grow">
                {serviceDetails[selectedServiceId]?.items.map((item, idx) => {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl border border-neutral-100 hover:border-neutral-200/80 hover:bg-neutral-50/50 shadow-sm transition-all"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-start gap-4 flex-grow">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-neutral-100 flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed max-w-md">
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100/50 px-1.5 py-0.5 rounded text-[11px] font-bold text-amber-700">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                              {item.type ? (
                                <>
                                  <Tag className="w-3 h-3 text-neutral-400" />
                                  <span>{item.type}</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>{item.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Booking Action */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        <div className="flex flex-col sm:items-end">
                          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Price</span>
                          <span className="text-lg font-black text-indigo-600">{item.price}</span>
                        </div>
                        <button
                          className="px-4 py-2 bg-indigo-600 text-white border border-transparent rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:bg-indigo-700"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-neutral-50/80 border-t border-neutral-100/60 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-semibold">
                  *All professionals are verified & background checked
                </span>
                <button
                  onClick={() => setSelectedServiceId(null)}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Booking Form Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsBookingModalOpen(false);
                setIsBookingSubmitted(false);
              }}
              className="absolute inset-0 bg-neutral-950/45 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-100 p-6 sm:p-8 flex flex-col gap-6 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setIsBookingSubmitted(false);
                }}
                className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-600 p-1.5 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {isBookingSubmitted ? (
                <div className="flex flex-col items-center text-center py-6 gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Booking Requested!</h3>
                    <p className="text-xs text-neutral-500 mt-2 max-w-xs mx-auto">
                      Our certified representative will call you back within 15 minutes to confirm your scheduling.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setIsBookingSubmitted(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="pb-3 border-b border-neutral-100">
                    <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                      Book a Service
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Select your required service and fill out the details.
                    </p>
                  </div>

                  {/* Form Content */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsBookingSubmitted(true);
                    }}
                    className="flex flex-col gap-4"
                  >
                    {/* Service Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Service Required
                      </label>
                      <div className="relative">
                        <select
                          required
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-semibold focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 appearance-none cursor-pointer"
                        >
                          <option value="">-- Choose a Service --</option>
                          <option value="instahelp">InstaHelp (Emergency Fix)</option>
                          <option value="womens-salon">Womens Salon & Spa</option>
                          <option value="mens-salon">Mens Salon & Massage</option>
                          <option value="cleaning">Cleaning & Pest Control</option>
                          <option value="wall-makeover">Wall Makeover</option>
                          <option value="painting">Painting & Waterproofing</option>
                          <option value="ac-repair">AC & Appliance Repair</option>
                          <option value="electrician">Electrician</option>
                          <option value="water-purifier">Native Water Purifier</option>
                          <option value="smart-locks">Native Smart Locks</option>
                          <option value="plumber">Plumber</option>
                          <option value="carpenter">Carpenter</option>
                        </select>
                        {/* Custom Arrow */}
                        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-400">
                          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Name & Contact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      {/* Contact Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter contact number"
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Date & Time Slot Group */}
                    <div className="flex flex-col gap-4">
                      {/* Date Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                        />
                      </div>

                      {/* Time Slot Picker */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                          Preferred Time Slot
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'morning', label: 'Morning', time: '9am - 12pm' },
                            { id: 'afternoon', label: 'Afternoon', time: '12pm - 3pm' },
                            { id: 'evening', label: 'Evening', time: '3pm - 6pm' },
                            { id: 'night', label: 'Night', time: '6pm - 9pm' }
                          ].map((slot) => {
                            const isSelected = selectedSlot === slot.id;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedSlot(slot.id)}
                                className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                    : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-600'
                                }`}
                              >
                                <span className="text-[11px] font-bold">{slot.label}</span>
                                <span className={`text-[9px] mt-0.5 font-medium whitespace-nowrap ${
                                  isSelected ? 'text-indigo-100' : 'text-neutral-400'
                                }`}>{slot.time}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-colors mt-2 cursor-pointer"
                    >
                      Request Booking
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Home;