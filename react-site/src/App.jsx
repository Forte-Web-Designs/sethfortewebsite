import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, Zap, Bot, BarChart3, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Noise Overlay ─── */
function NoiseOverlay() {
  return (
    <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 flex items-center gap-8 ${
        scrolled
          ? 'bg-void/60 backdrop-blur-xl border border-white/[0.06] shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <a href="#" className="font-bold text-ghost text-sm tracking-tight whitespace-nowrap">Seth Forte</a>
      <div className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-xs text-ghost/60 hover:text-plasma transition-colors lift-hover">Services</a>
        <a href="#philosophy" className="text-xs text-ghost/60 hover:text-plasma transition-colors lift-hover">Philosophy</a>
        <a href="#protocol" className="text-xs text-ghost/60 hover:text-plasma transition-colors lift-hover">Process</a>
      </div>
      <a
        href="https://calendly.com/seth-fortewebdesigns/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-plasma text-white text-xs font-semibold px-5 py-2 rounded-full btn-magnetic relative overflow-hidden group"
      >
        <span className="relative z-10">Book a Call</span>
        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
      </a>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-label', { y: 30, opacity: 0, duration: 0.8, delay: 0.6 })
        .from('.hero-line-1', { y: 40, opacity: 0, duration: 0.9 }, '-=0.4')
        .from('.hero-line-2', { y: 40, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background image — bioluminescence / dark water */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534996858221-380b92700493?w=1920&q=80)' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20" />
      {/* Plasma ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-plasma/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 md:pb-28 max-w-4xl">
        <div className="hero-label inline-flex items-center gap-2 bg-plasma/10 border border-plasma/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-plasma pulse-dot" />
          <span className="text-plasma text-xs font-mono tracking-wide">SYSTEMS ARCHITECT</span>
        </div>

        <h1 className="hero-line-1 text-ghost font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-2">
          Systems beyond
        </h1>
        <h1 className="hero-line-2 font-display italic text-plasma text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-8">
          Limits.
        </h1>

        <p className="text-ghost/50 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
          I build the systems that make your business growth repeatable — CRM pipelines, AI automation, and reporting infrastructure that compounds.
        </p>

        <a
          href="https://calendly.com/seth-fortewebdesigns/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta inline-flex items-center gap-3 bg-plasma text-white font-semibold px-8 py-4 rounded-full btn-magnetic relative overflow-hidden group text-sm plasma-glow"
        >
          <span className="relative z-10 flex items-center gap-3">
            Book a Call <ArrowRight size={16} />
          </span>
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
        </a>

        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-plasma/40" />
          <span className="text-[10px] font-mono text-ghost/30 tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Feature Card 1: Diagnostic Shuffler ─── */
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { label: 'Pipeline Health', color: 'bg-plasma/10 border-plasma/30' },
    { label: 'Lead Scoring', color: 'bg-cyan-500/10 border-cyan-500/30' },
    { label: 'Deal Velocity', color: 'bg-fuchsia-500/10 border-fuchsia-500/30' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-void border border-white/[0.06] rounded-4xl p-8 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Zap size={16} className="text-plasma" />
        <h3 className="text-ghost font-bold text-lg">CRM & Pipeline</h3>
      </div>
      <p className="text-ghost/40 text-sm mb-8 leading-relaxed">Automated lead routing, scoring, and deal tracking that keeps your pipeline moving.</p>
      <div className="relative flex-1 min-h-[180px]">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`absolute left-0 right-0 rounded-2xl border px-5 py-4 transition-all duration-700 ${card.color}`}
            style={{
              top: `${i * 24}px`,
              zIndex: 3 - i,
              transform: `scale(${1 - i * 0.04})`,
              opacity: 1 - i * 0.2,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="font-mono text-sm text-ghost/80">{card.label}</span>
            <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-plasma/60 transition-all duration-1000"
                style={{ width: `${85 - i * 20}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature Card 2: Telemetry Typewriter ─── */
function TelemetryTypewriter() {
  const messages = [
    '▶ Voice agent deployed — avg call time 2:34',
    '▶ AI responder handled 847 inbound queries',
    '▶ Sentiment analysis: 94% positive',
    '▶ Automation triggered: follow-up sequence #12',
    '▶ Model retrained on 2,400 new conversations',
  ];
  const [lines, setLines] = useState([]);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentMsg >= messages.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentMsg(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const msg = messages[currentMsg];
    if (currentChar < msg.length) {
      const timeout = setTimeout(() => setCurrentChar(c => c + 1), 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, msg]);
        setCurrentMsg(m => m + 1);
        setCurrentChar(0);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentMsg, currentChar]);

  return (
    <div className="bg-void border border-white/[0.06] rounded-4xl p-8 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Bot size={16} className="text-plasma" />
        <h3 className="text-ghost font-bold text-lg">AI & Voice</h3>
      </div>
      <p className="text-ghost/40 text-sm mb-6 leading-relaxed">Conversational AI agents and voice automation that handle the front line.</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
        <span className="font-mono text-[11px] text-emerald-400/80 tracking-wide">LIVE FEED</span>
      </div>

      <div className="flex-1 bg-void-light rounded-2xl p-4 font-mono text-xs overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="text-ghost/40 mb-1 leading-relaxed">{line}</div>
        ))}
        {currentMsg < messages.length && (
          <div className="text-ghost/70 mb-1">
            {messages[currentMsg].slice(0, currentChar)}
            <span className="cursor-blink text-plasma">▌</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Feature Card 3: Cursor Protocol Scheduler ─── */
function CursorScheduler() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await wait(1000);
      setCursorPos({ x: 20, y: 60, visible: true });
      await wait(600);

      for (let i = 1; i <= 5; i++) {
        setCursorPos({ x: 20 + i * 42, y: 60, visible: true });
        await wait(400);
        if (i === 1 || i === 3 || i === 5) {
          setActiveDay(i);
          await wait(300);
        }
      }

      setCursorPos({ x: 140, y: 120, visible: true });
      await wait(500);
      setSaved(true);
      await wait(1500);

      setCursorPos({ x: 140, y: 120, visible: false });
      await wait(1000);
      setActiveDay(-1);
      setSaved(false);
    };

    sequence();
    const interval = setInterval(sequence, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-void border border-white/[0.06] rounded-4xl p-8 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 size={16} className="text-plasma" />
        <h3 className="text-ghost font-bold text-lg">Reporting & Scale</h3>
      </div>
      <p className="text-ghost/40 text-sm mb-8 leading-relaxed">Dashboards, KPI tracking, and automated reporting that scales with you.</p>

      <div className="relative flex-1">
        {/* Animated cursor */}
        <svg
          className="absolute z-20 transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            opacity: cursorPos.visible ? 1 : 0,
          }}
          width="20" height="20" viewBox="0 0 24 24" fill="none"
        >
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="#7B61FF" stroke="#0A0A14" strokeWidth="1" />
        </svg>

        {/* Day grid */}
        <div className="flex gap-2 mb-6">
          {days.map((d, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                activeDay === i
                  ? 'bg-plasma text-white scale-95 font-bold'
                  : 'bg-white/[0.03] text-ghost/40 border border-white/[0.06]'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
            saved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/[0.04] text-ghost/40 border border-white/[0.06]'
          }`}
        >
          {saved ? '✓ Scheduled' : 'Save Schedule'}
        </button>
      </div>
    </div>
  );
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ─── Features Section ─── */
function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-plasma text-xs font-mono tracking-widest uppercase mb-4 block">What I Build</span>
          <h2 className="text-ghost font-extrabold text-3xl md:text-4xl tracking-tight">Three systems. <span className="text-ghost/40">One machine.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="feature-card"><DiagnosticShuffler /></div>
          <div className="feature-card"><TelemetryTypewriter /></div>
          <div className="feature-card"><CursorScheduler /></div>
        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy ─── */
function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0A0A14' }}
    >
      {/* Parallax texture — microscopy / bioluminescence */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1920&q=80)' }}
      />
      {/* Plasma glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-plasma/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="phil-line text-ghost/30 text-xl md:text-2xl font-medium leading-relaxed mb-12">
          Most consultants focus on: adding more tools, more dashboards, more complexity.
        </div>
        <div className="phil-line">
          <span className="text-ghost text-3xl md:text-5xl lg:text-6xl font-display italic leading-[1.1]">
            I focus on: building{' '}
            <span className="text-plasma">one system</span>{' '}
            that makes everything else unnecessary.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Protocol Stacking Cards ─── */
function ProtocolCards() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const protocols = [
    {
      step: '01',
      title: 'Diagnose',
      desc: 'Audit your existing stack. Map every tool, every workflow, every leak. Find the 20% causing 80% of friction.',
      animation: 'geometric',
    },
    {
      step: '02',
      title: 'Architect',
      desc: 'Design a unified system — CRM, automation, AI — where every piece reinforces the others.',
      animation: 'scanner',
    },
    {
      step: '03',
      title: 'Deploy',
      desc: 'Build it, launch it, train your team. Then optimize until the numbers compound.',
      animation: 'waveform',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < protocols.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cardsRef.current[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - self.progress * 0.1,
                filter: `blur(${self.progress * 10}px)`,
                opacity: 1 - self.progress * 0.5,
                duration: 0.1,
              });
            },
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative">
      {protocols.map((proto, i) => (
        <div
          key={proto.step}
          ref={el => cardsRef.current[i] = el}
          className="stack-card h-screen flex items-center justify-center px-8"
          style={{ background: i === 0 ? '#0A0A14' : i === 1 ? '#0E0E1A' : '#131320' }}
        >
          <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-plasma/60 text-sm tracking-widest mb-4 block">{proto.step}</span>
              <h2 className="text-ghost font-extrabold text-4xl md:text-5xl tracking-tight mb-6">{proto.title}</h2>
              <p className="text-ghost/40 text-lg leading-relaxed max-w-md">{proto.desc}</p>
            </div>
            <div className="flex items-center justify-center">
              <ProtocolAnimation type={proto.animation} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Protocol SVG Animations ─── */
function ProtocolAnimation({ type }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (type === 'geometric') {
        gsap.to('.geo-ring-1', { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
        gsap.to('.geo-ring-2', { rotation: -360, duration: 30, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
        gsap.to('.geo-ring-3', { rotation: 360, duration: 25, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
      } else if (type === 'scanner') {
        gsap.to('.scan-line', {
          y: 200,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      } else if (type === 'waveform') {
        gsap.to('.wave-path', {
          strokeDashoffset: -1000,
          duration: 4,
          repeat: -1,
          ease: 'none',
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, [type]);

  if (type === 'geometric') {
    return (
      <svg ref={svgRef} width="280" height="280" viewBox="0 0 280 280" className="opacity-40">
        <circle className="geo-ring-1" cx="140" cy="140" r="120" fill="none" stroke="#7B61FF" strokeWidth="0.5" strokeDasharray="8 12" />
        <circle className="geo-ring-2" cx="140" cy="140" r="90" fill="none" stroke="#7B61FF" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle className="geo-ring-3" cx="140" cy="140" r="60" fill="none" stroke="#7B61FF" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="140" cy="140" r="4" fill="#7B61FF" opacity="0.6" />
        <circle className="geo-ring-1" cx="140" cy="20" r="3" fill="#7B61FF" opacity="0.8" />
        <circle className="geo-ring-2" cx="230" cy="140" r="2.5" fill="#7B61FF" opacity="0.6" />
        <circle className="geo-ring-3" cx="140" cy="80" r="2" fill="#7B61FF" opacity="0.7" />
      </svg>
    );
  }

  if (type === 'scanner') {
    const dots = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        dots.push(
          <circle
            key={`${row}-${col}`}
            cx={40 + col * 30}
            cy={40 + row * 30}
            r="2"
            fill="#7B61FF"
            opacity="0.15"
          />
        );
      }
    }
    return (
      <svg ref={svgRef} width="280" height="280" viewBox="0 0 280 280" className="opacity-50">
        {dots}
        <line className="scan-line" x1="20" y1="40" x2="260" y2="40" stroke="#7B61FF" strokeWidth="1" opacity="0.6" />
        <rect className="scan-line" x="20" y="35" width="240" height="20" fill="url(#scanGrad)" opacity="0.15" />
        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#7B61FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'waveform') {
    return (
      <svg ref={svgRef} width="280" height="280" viewBox="0 0 280 280" className="opacity-40">
        <path
          className="wave-path"
          d="M20,140 Q50,80 80,140 T140,140 T200,140 T260,140"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="2"
          strokeDasharray="500"
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        <path
          d="M20,140 Q50,80 80,140 T140,140 T200,140 T260,140"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          className="wave-path"
          d="M20,160 L60,160 L70,100 L80,200 L90,130 L100,160 L260,160"
          fill="none"
          stroke="#7B61FF"
          strokeWidth="1.5"
          strokeDasharray="600"
          strokeDashoffset="0"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}

/* ─── CTA ─── */
function CTA() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%',
        },
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="py-32 md:py-48 px-8 md:px-16 lg:px-24 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-plasma/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="cta-content max-w-3xl mx-auto text-center relative z-10">
        <span className="text-plasma text-xs font-mono tracking-widest uppercase mb-6 block">Ready?</span>
        <h2 className="text-ghost font-extrabold text-3xl md:text-5xl tracking-tight mb-6">
          Let's build your growth engine.
        </h2>
        <p className="text-ghost/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          30-minute call. No pitch deck. Just a clear diagnosis of what's broken and a roadmap to fix it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/seth-fortewebdesigns/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-plasma text-white font-semibold px-10 py-4 rounded-full btn-magnetic relative overflow-hidden group text-sm plasma-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Calendar size={16} />
              Book a Call
            </span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
          </a>
          <a
            href="https://www.upwork.com/freelancers/sethf5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-plasma/70 hover:text-plasma text-sm font-medium transition-colors lift-hover"
          >
            View Upwork Profile <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-void-light rounded-t-5xl border-t border-white/[0.04] px-8 md:px-16 lg:px-24 pt-20 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-ghost font-bold text-xl mb-3">Seth Forte</h3>
            <p className="text-ghost/30 text-sm leading-relaxed max-w-sm">
              Systems architect based in Grapevine, Texas. I build the infrastructure that makes business growth repeatable.
            </p>
          </div>

          <div>
            <h4 className="text-ghost/50 text-xs font-mono tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">Services</a></li>
              <li><a href="#philosophy" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">Philosophy</a></li>
              <li><a href="#protocol" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">Process</a></li>
              <li><a href="/upwork.html" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">Upwork Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ghost/50 text-xs font-mono tracking-widest uppercase mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://calendly.com/seth-fortewebdesigns/30min" target="_blank" rel="noopener noreferrer" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">
                  Book a Call
                </a>
              </li>
              <li>
                <a href="https://www.upwork.com/freelancers/sethf5" target="_blank" rel="noopener noreferrer" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">
                  Upwork Profile
                </a>
              </li>
              <li>
                <a href="mailto:seth@sethforte.com" className="text-ghost/30 hover:text-plasma text-sm transition-colors lift-hover">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ghost/20 text-xs">© 2026 Seth Forte. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono text-[11px] text-ghost/30 tracking-wide">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <ProtocolCards />
      <CTA />
      <Footer />
    </>
  );
}
