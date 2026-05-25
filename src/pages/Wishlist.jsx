import { useState, useEffect } from "react";
import {
  Heart,
  Star,
  Clock,
  Trash2,
  ShoppingCart,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Filter,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  {
    id: 1,
    category: "Cleaning",
    title: "Full Home Deep Clean",
    rating: 4.9,
    reviews: 2341,
    price: 1299,
    originalPrice: 1799,
    duration: "3–4 hrs",
    tag: "Bestseller",

    addedOn: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Salon",
    title: "Bridal Makeup Package",
    rating: 4.8,
    reviews: 1892,
    price: 4499,
    originalPrice: 6000,
    duration: "2–3 hrs",
    tag: "Trending",

    addedOn: "1 week ago",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Repairs",
    title: "AC Service & Gas Refill",
    rating: 4.7,
    reviews: 3102,
    price: 899,
    originalPrice: 1299,
    duration: "1–2 hrs",
    tag: "Summer Deal",

    addedOn: "3 days ago",
    image:
      "https://content.jdmagicbox.com/v2/comp/hyderabad/y1/040pxx40.xx40.240112123419.s9y1/catalogue/asian-cool-care-asif-nagar-hyderabad-ac-repair-and-services-mk5l95p0l0.jpg",
  },
  {
    id: 4,
    category: "Fitness",
    title: "Personal Training · 10 Sessions",
    rating: 4.9,
    reviews: 784,
    price: 3999,
    originalPrice: 5500,
    duration: "10 × 45 min",
    tag: "New",

    addedOn: "5 days ago",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Plumbing",
    title: "Bathroom Renovation & Fitting",
    rating: 4.6,
    reviews: 562,
    price: 8999,
    originalPrice: 12000,
    duration: "1–2 days",
    tag: "Premium",

    addedOn: "2 weeks ago",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Pest Control",
    title: "Full Home Pest Treatment",
    rating: 4.8,
    reviews: 1240,
    price: 1599,
    originalPrice: 2199,
    duration: "2–3 hrs",
    tag: "Guaranteed",

    addedOn: "4 days ago",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Cleaning",
  "Salon",
  "Repairs",
  "Fitness",
  "Plumbing",
  "Pest Control",
];
const SORT_OPTIONS = [
  { key: "recent", label: "Recently Added" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Highest Rated" },
];

function ServiceCard({
  service,
  index,
  isRemoving,
  isAddingToCart,
  inCart,
  onRemove,
  onAddToCart,
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);

  const discount = Math.round(
    ((service.originalPrice - service.price) / service.originalPrice) * 100,
  );

  return (
    <div
      className={`
        bg-white rounded-2xl overflow-hidden border border-slate-100
        shadow-sm hover:shadow-md hover:-translate-y-1
        transition-all duration-300 ease-out mt-5
        ${visible && !isRemoving ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
        ${isRemoving ? "!opacity-0 !translate-x-8 scale-95 pointer-events-none" : ""}
      `}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[11px] font-semibold text-slate-700 shadow">
            {service.category}
          </span>
        </div>

        {/* <div className="absolute top-4 right-4 text-3xl">{service.emoji}</div> */}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-bold leading-snug">
            {service.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-white/90 text-xs">
            <Clock size={12} />
            Added {service.addedOn}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {service.tag}
          </span>
          <div className="flex items-center gap-1.5">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-[13px] font-semibold text-slate-700">
              {service.rating}
            </span>
            <span className="text-[12px] text-slate-400">
              ({service.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                ₹{service.price.toLocaleString()}
              </span>
              <span className="text-[13px] text-slate-400 line-through">
                ₹{service.originalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[12px] text-emerald-600 font-semibold mt-0.5">
              {discount}% off · saves ₹
              {(service.originalPrice - service.price).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
            <Clock size={11} />
            {service.duration}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => !inCart && onAddToCart(service.id)}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-2.5 rounded-xl text-[13px] font-semibold
              transition-all duration-200 active:scale-95
              ${
                inCart || isAddingToCart
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
              }
            `}
          >
            {inCart ? (
              <>
                <CheckCircle2 size={14} /> In Cart
              </>
            ) : isAddingToCart ? (
              <>
                <Sparkles size={14} /> Adding…
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> Add to Cart
              </>
            )}
          </button>

          <button
            onClick={() => onRemove(service.id)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`
      fixed bottom-6 right-6 z-50
      flex items-center gap-2.5 px-4 py-3
      rounded-2xl text-[13px] font-semibold
      shadow-lg animate-[slideUp_0.3s_ease_forwards]
      ${toast.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 border border-slate-200"}
    `}
    >
      {toast.type === "success" ? (
        <CheckCircle2 size={15} />
      ) : (
        <Heart size={15} />
      )}
      {toast.msg}
    </div>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(SERVICES.map((s) => s.id));
  const [cart, setCart] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showSort, setShowSort] = useState(false);
  const [toast, setToast] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const removeItem = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setWishlist((p) => p.filter((w) => w !== id));
      setRemovingId(null);
      notify("Removed from wishlist", "info");
    }, 360);
  };

  const addToCart = (id) => {
    setAddingId(id);
    setTimeout(() => {
      setCart((p) => (p.includes(id) ? p : [...p, id]));
      setAddingId(null);
      notify("Added to cart");
    }, 500);
  };

  const filtered = SERVICES.filter((s) => wishlist.includes(s.id))
    .filter((s) => activeFilter === "All" || s.category === activeFilter)
    .filter(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalSavings = filtered.reduce(
    (sum, s) => sum + (s.originalPrice - s.price),
    0,
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 antialiased font-sans flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-5 py-5">
          <div className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-5">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">
              Home
            </span>
            <ChevronRight size={12} />
            <span className="text-slate-700 font-medium">Wishlist</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Heart size={18} className="text-red-500 fill-red-100" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                  My Wishlist
                </h1>
                <p className="text-[13px] text-slate-400 mt-0.5">
                  Save now, book when you're ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 pb-16 pt-3">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                index={i}
                isRemoving={removingId === s.id}
                isAddingToCart={addingId === s.id}
                inCart={cart.includes(s.id)}
                onRemove={removeItem}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-[fadeIn_0.4s_ease_forwards]">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
              <Heart size={28} className="text-slate-300" />
            </div>
            <h2 className="text-lg font-bold text-slate-700 mb-2">
              {searchQuery ? "No results found" : "Your wishlist is empty"}
            </h2>
            <p className="text-[14px] text-slate-400 max-w-xs mb-6">
              {searchQuery
                ? `No services match "${searchQuery}"`
                : "Browse services and tap the heart to save them here"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              {searchQuery ? "Clear search" : "Explore services"}
            </button>
          </div>
        )}
      </div>

      <Toast toast={toast} />
      <Footer />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
