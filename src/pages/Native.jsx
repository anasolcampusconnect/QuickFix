import { useEffect, useRef, useState } from "react";
import lockHero from "../assets/lock-hero.jpg";
import purifierHero from "../assets/purifier-hero.jpg";
import lockUltra from "../assets/lock-ultra.jpg";
import lockPro from "../assets/lock-pro.jpg";
import purifierM2 from "../assets/purifier-m2.jpg";
import purifierM1 from "../assets/purifier-m1.jpg";
import purifierM0 from "../assets/purifier-m0.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// FIXED: Imported from react-router-dom instead of @tanstack/react-router
import { useNavigate } from "react-router-dom"; 

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

/* ---------------- SCENE 1: Smart Lock unlocking on scroll ---------------- */
function LockScene() {
  const ref = useRef(null);
  const y = useScrollY();
  const [p, setP] = useState(0);
  
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const top = el.offsetTop;
    const h = el.offsetHeight - window.innerHeight;
    setP(clamp((y - top) / Math.max(h, 1)));
  }, [y]);
  
  const bolt = p * 110;
  const doorRotate = p * 75;
  const ringRotate = p * 360;
  const glow = 0.3 + p * 0.7;
  const titleY = p * -40;
  const lightLeak = 0.4 + p * 0.6;
  
  return (
    <section
      ref={ref}
      id="locks"
      className="relative h-[220vh]"
      style={{ background: "linear-gradient(135deg, #fffaf2 0%, #fffffe 50%, #f0e6d8 100%)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: 1400 }}>
        <div
          className="absolute -left-40 top-1/4 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,200,150,0.3), transparent 60%)", opacity: lightLeak * 0.5 }}
        />
        <div
          className="absolute -right-40 bottom-0 w-[50rem] h-[50rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,180,250,0.3), transparent 60%)", opacity: lightLeak * 0.5 }}
        />
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative"
            style={{
              width: "min(520px, 70vw)",
              height: "min(680px, 80vh)",
              transformStyle: "preserve-3d",
              transform: `rotateY(${-doorRotate}deg) translateZ(0)`,
              transformOrigin: "left center",
              transition: "transform 0.05s linear",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #e78610 100%, #c48836 100%, #d87d0e 100%)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.15), inset 0 0 60px rgba(255,255,255,0.3)",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 opacity-20"
                  style={{
                    top: `${15 + i * 14}%`,
                    height: "1px",
                    background: "linear-gradient(90deg,transparent,#8a6e4e,transparent)",
                  }}
                />
              ))}
              <div
                className="absolute right-6 top-[70%] -translate-y-1/2 w-20 h-56 rounded-2xl"
                style={{
                  background: "linear-gradient(180deg, #d37619, #c2701a, #da7a1a)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,230,200,0.5)",
                }}
              >
                <div className="absolute inset-x-3 top-3 h-20 rounded-md bg-black/60 grid place-items-center text-[10px] text-amber-600 font-mono">
                  {p > 0.5 ? "UNLOCKED" : "LOCKED"}
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-8 w-10 h-10 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #f5c88a, #c49a5a)",
                    boxShadow: `0 0 ${20 + glow * 30}px rgba(255,180,80,${glow * 0.5})`,
                    transform: `rotate(${ringRotate}deg)`,
                  }}
                />
                <div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 rounded-full"
                  style={{
                    width: `${20 + bolt}px`,
                    background: "linear-gradient(90deg, #c4a373, #a07848)",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none px-6"
          style={{ transform: `translateY(calc(-50% + ${titleY}px))` }}
        >
          <p className="text-amber-700 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 ">
            Native Smart Locks
          </p>
          <h1 className="text-neutral-800 font-black tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", textShadow: "0 2px 20px rgba(0,0,0,0.1)" }}>
            Unlock
            <br />
            <span className="text-amber-900">the future</span>
          </h1>
        </div>
        <img
          src={purifierHero}
          alt="Smart lock with face unlock"
          className="absolute right-[5%] bottom-[5%] w-[28%] max-w-[360px] min-w-[180px] rounded-2xl shadow-2xl"
          style={{
            opacity: 1 - p * 0.6,
            transform: `translateY(${p * 60}px) rotate(${p * -6}deg)`,
          }}
        />
        <div className="absolute bottom-6 inset-x-0 grid place-items-center text-neutral-500 text-xs tracking-widest"
             style={{ opacity: 1 - p * 2 }}>
          SCROLL TO UNLOCK ↓
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCENE 2: Water Purifier with falling drops ---------------- */
function PurifierScene({ onEnd }) {
  const ref = useRef(null);
  const y = useScrollY();
  const [p, setP] = useState(0);
  
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const top = el.offsetTop;
    const h = el.offsetHeight - window.innerHeight;
    const np = clamp((y - top) / Math.max(h, 1));
    setP(np);
    if (np > 0.95 && onEnd) onEnd();
  }, [y, onEnd]);
  
  const tapOpen = clamp((p - 0.1) / 0.15);
  const dropsActive = p > 0.2;
  
  const drops = Array.from({ length: 5 }).map((_, i) => {
    const offset = (i / 5) * 0.8;
    const t = ((p * 3 + offset) % 1);
    const startY = -15;
    const endY = 80;
    const dropY = startY + t * endY;
    const opacity = dropsActive ? (t < 0.9 ? 1 : 0) : 0;
    const scale = 1.2 + Math.sin(t * Math.PI) * 0.5;
    return { dropY, opacity, scale, i };
  });
  
  const rotateY = -25 + p * 40;
  const rotateX = 10 - p * 8;
  const titleX = p * -120;
  
  return (
    <section
      ref={ref}
      id="purifiers"
      className="relative h-[220vh]"
      style={{ background: "linear-gradient(135deg, #e8f0f5 0%, #d4e4ed 50%, #e0eaf1 100%)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: 1600 }}>
        <div className="absolute -left-10 top-0 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(100,180,230,0.2), transparent 60%)" }} />
        <div className="absolute -right-10 bottom-0 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(80,160,200,0.2), transparent 60%)" }} />
        <div className="absolute left-6 sm:left-16 top-1/2 -translate-y-1/2 max-w-xl z-10"
             style={{ transform: `translate(${titleX}px,-50%)` }}>
          <p className="text-sky-700 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">
            Native Water Purifiers
          </p>
          <h2 className="font-black text-neutral-800 tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Every drop,
            <br />
            <span className="text-sky-600">perfected.</span>
          </h2>
          <p className="text-neutral-600 mt-6 text-sm sm:text-base">
            Keep scrolling — watch it pour. Built-in battery. Touch dispensing. Smart app.
          </p>
        </div>
        <div className="absolute inset-0 absolute top-1/2 -translate-y-1/2 left-92 right-0 grid place-items-center pr-[5%] sm:pr-[8%] ">
          <div
            className="relative"
            style={{
              width: "min(380px, 55vw)",
              height: "min(560px, 75vh)",
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
              transition: "transform 0.05s linear",
            }}
          >
            <img
              src={lockPro}
              alt="Native water purifier"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.15))" }}
            />
            <div
              className="absolute"
              style={{
                left: "38%",
                top: "55%",
                width: "14%",
                height: "8%",
                borderRadius: "8px",
                background: `radial-gradient(circle, rgba(80,180,255,${tapOpen * 0.5}), transparent 70%)`,
                boxShadow: `0 0 ${20 * tapOpen}px rgba(80,180,255,${tapOpen * 0.5})`,
              }}
            />
            {drops.map((d) => (
              <div
                key={d.i}
                className="absolute pointer-events-none"
                style={{
                  left: `${42 + (d.i % 3) * 3}%`,
                  top: `${62 + d.dropY}%`,
                  width: `${18 * d.scale}px`,
                  height: `${24 * d.scale}px`,
                  background: "radial-gradient(circle at 40% 35%, #ffffff, #7fc4ff 50%, #3a8ed9)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  opacity: d.opacity,
                  boxShadow: "0 0 20px rgba(80,160,230,0.6)",
                  transform: "rotate(180deg)",
                  transition: "opacity 0.1s ease",
                }}
              />
            ))}
            <div
              className="absolute"
              style={{
                left: "30%",
                bottom: "-6%",
                width: `${20 + p * 60}%`,
                height: "20px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(80,180,230,0.4), rgba(80,160,230,0.1) 60%, transparent)",
                filter: "blur(4px)",
                opacity: dropsActive ? 1 : 0,
              }}
            />
          </div>
        </div>
        <div className="absolute bottom-6 inset-x-0 grid place-items-center text-neutral-500 text-xs tracking-widest"
             style={{ opacity: 1 - p * 2 }}>
          SCROLL TO POUR ↓
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCT CARDS ---------------- */
function ProductCard({ c, onCardClick }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  return (
    <div
      ref={ref}
      onClick={() => onCardClick && c.path && onCardClick(c.path)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        background: c.tone === "dark"
          ? "linear-gradient(160deg,#1a0a0a 0%,#2a0a05 50%,#ff5a1f 100%)"
          : "linear-gradient(160deg,#e8e8e8,#d4d4d4)",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.2s ease",
        boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
        const y = -((e.clientY - r.top) / r.height - 0.5) * 10;
        setTilt({ x, y });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="aspect-[4/5] flex flex-col">
        <div className="p-6 sm:p-8 flex-shrink-0">
          {c.badge && (
            <p className={`text-xs font-bold tracking-widest mb-2 ${c.tone === "dark" ? "text-pink-400" : "text-pink-600"}`}>
              {c.badge}
            </p>
          )}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${c.tone === "dark" ? "text-white" : "text-neutral-900"}`}>
                {c.title}
              </h3>
              <p className={`mt-1 text-sm ${c.tone === "dark" ? "text-white/80" : "text-neutral-600"}`}>
                {c.subtitle}
              </p>
            </div>
            <span className={`grid place-items-center w-10 h-10 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${c.tone === "dark" ? "bg-white/15 text-white" : "bg-white text-neutral-900"}`}>
              →
            </span>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <img
            src={c.img}
            alt={c.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
      </div>
    </div>
  );
}

function CardGrid({ title, cards, onCardClick }) {
  return (
    <section className="bg-neutral-50 py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight mb-10">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <ProductCard key={c.title} c={c} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Service advantages ---------------- */
function Service() {
  const items = [
    { t: "Professional installation", d: "Only top technicians trained by Native.", icon: "🛠️" },
    { t: "24×7 expert support", d: "Talk to experts who understand the product.", icon: "💬" },
    { t: "Servicing 14,500+ pin codes", d: "We never outsource service to locals.", icon: "📍" },
  ];
  
  return (
    <section id="service" className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight mb-10">
          Native service advantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.t} className="rounded-3xl bg-neutral-100 p-8 hover:bg-neutral-200 transition">
              <div className="text-4xl mb-6">{it.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900">{it.t}</h3>
              <p className="text-neutral-600 mt-2 text-sm">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
function Native() {
  // FIXED: Standard react-router-dom hook statement
  const navigate = useNavigate(); 
  
  const handleCardClick = (path) => {
    if (path) {
      // FIXED: Standard react-router-dom declarative string routing pattern (No objects!)
      navigate(path); 
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased">
      <Navbar />
      <LockScene />
      <CardGrid
        title="Newly launched"
        cards={[
          { title: "Lock Ultra", subtitle: "Face unlock. Live feed. Two-way talk.", img: lockUltra, tone: "dark", badge: "NEW", path: "/native-lock-service" },
          { title: "Native M2 Pro", subtitle: "In-built battery. Touch dispensing. Smart app.", img: purifierM2, tone: "dark", path: "/native-water-service" },
          { title: "Native M1 Pro", subtitle: "Everything essential. Smart app.", img: purifierM1, tone: "dark", path: "/native-water-service" },
        ]}
        onCardClick={handleCardClick}
      />
      <PurifierScene />
      <CardGrid
        title="Water Purifiers"
        cards={[
          { title: "Native M2 Pro", subtitle: "In-built battery. Touch dispensing. Smart app.", img: purifierM2, tone: "light", badge: "NEW", path: "/native-water-service" },
          { title: "Native M1", subtitle: "All the essentials you need.", img: purifierM1, tone: "light", path: "/native-water-service" },
          { title: "Native M0", subtitle: "Most value added RO.", img: purifierM0, tone: "light", path: "/native-water-service" },
        ]}
        onCardClick={handleCardClick}
      />
      <CardGrid
        title="Smart Works"
        cards={[
          { title: "Native Lock Ultra", subtitle: "Face unlock. Live feed. Two-way talk.", img: lockUltra, tone: "light", badge: "NEW", path: "/lock" },
          { title: "Water Purifier", subtitle: "Pure water. Smart technology.", img: lockPro, tone: "light", path: "/purifier" },
        ]}
        onCardClick={handleCardClick}
      />
      <Service />
      <Footer />
    </div>
  );
}

export default Native;