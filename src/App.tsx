import { useState, useEffect, useRef } from 'react'
import { useTypewriter } from './hooks/useTypewriter'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  const { displayed, done } = useTypewriter("I bridge the gap between imagination and implementation. My work exists at the intersection of aesthetic precision and functional excellence.");

  useEffect(() => {
    const timer = setTimeout(() => setShowPills(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Background video scrubbing logic
  useEffect(() => {
    let prevX = -1;
    const SENSITIVITY = 0.8;
    let accumulatedDelta = 0;
    let ticking = false;

    const processMove = (clientX: number) => {
      if (prevX === -1) {
        prevX = clientX;
        return;
      }
      
      accumulatedDelta += clientX - prevX;
      prevX = clientX;

      if (!ticking) {
        requestAnimationFrame(() => {
          const video = videoRef.current;
          if (!video || isNaN(video.duration) || video.duration === 0) {
            ticking = false;
            accumulatedDelta = 0;
            return;
          }

          targetTimeRef.current += (accumulatedDelta / window.innerWidth) * SENSITIVITY * video.duration;
          targetTimeRef.current = Math.max(0, Math.min(targetTimeRef.current, video.duration));
          
          accumulatedDelta = 0;
          ticking = false;

          if (!isSeekingRef.current) {
            isSeekingRef.current = true;
            video.currentTime = targetTimeRef.current;
          }
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => processMove(e.clientX);
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevX = e.touches[0].clientX;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        processMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('kishandavda2008@gmail.com');
    alert('Email copied to clipboard!');
  };

  const navLinks = ['About', 'Expertise', 'Work'];

  return (
    <>
      <video 
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        className="fixed inset-0 z-0 object-cover w-full h-full"
        style={{ objectPosition: '70% center' }}
        muted 
        playsInline 
        preload="auto"
        onSeeked={handleSeeked}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center bg-transparent mix-blend-difference text-white">
          <div className="flex flex-row gap-3 items-center">
            <span className="text-[21px] sm:text-[26px] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Kishan Davda
            </span>
            <span className="text-[25px] sm:text-[30px] select-none tracking-[-0.02em]">✳︎</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-row text-[23px] gap-2">
            {navLinks.map((item, i, arr) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
                {item}{i < arr.length - 1 ? ', ' : ''}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity">
              Let's Talk
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex flex-col gap-[5px] z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>

        {/* Mobile Overlay */}
        <div 
          className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-[9] flex flex-col justify-center px-8 gap-8 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[32px] font-medium text-black" onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </a>
          ))}
          <a href="#contact" className="text-[32px] font-medium text-black underline" onClick={() => setIsMobileMenuOpen(false)}>
            Let's Talk
          </a>
        </div>

        {/* HERO SECTION */}
        <section className="h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative z-10 text-white mix-blend-difference">
          <div className="max-w-3xl relative z-10">
            <div className="pointer-events-none select-none mb-5 sm:mb-6 blur-[2px]" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.3, fontWeight: 400 }}>
              Hey there, I'm Kishan,<br />
              Full-Stack Developer
            </div>

            <p className="mb-5 sm:mb-6 min-h-[54px] md:min-h-[120px]" style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, fontWeight: 400 }}>
              {displayed}
              {!done && <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />}
            </p>

            <div 
              className={`flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-in-out transform-gpu will-change-transform ${showPills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <a href="./Kishan_Davda_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-black border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                View Resume
              </a>
              <a href="#work" className="inline-flex items-center justify-center bg-white text-black border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                See my work
              </a>
              <a href="https://github.com/KishanDavda-IT" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-black border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/kishan-davda-667909342" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-black border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                LinkedIn
              </a>

              <button 
                onClick={copyEmail}
                className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200"
              >
                <span className="underline underline-offset-1">hello: kishandavda2008@gmail.com</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 bg-white pt-24 pb-12 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="flex-1">
            <h2 className="text-4xl sm:text-6xl mb-8 tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
              01. The Philosophy
            </h2>
            <p className="text-2xl sm:text-3xl text-black/80 leading-relaxed mb-6">
              I bridge the gap between imagination and implementation. My work exists at the intersection of aesthetic precision and functional excellence.
            </p>
            <p className="text-xl sm:text-2xl text-black/60 leading-relaxed">
              Currently mastering Python and Modern JS, I focus on building systems that don't just work—they feel alive.
            </p>
          </div>
          <div className="w-full sm:w-2/3 md:w-1/3">
            <img 
              src={`${import.meta.env.BASE_URL}Profile.jpeg`} 
              alt="Kishan Davda" 
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 aspect-[3/4] object-top"
            />
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="relative z-10 bg-white py-12 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto border-t border-black/10 pt-16">
          <h2 className="text-4xl sm:text-6xl mb-12 tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            02. Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: 'A', title: 'FULL-STACK ARCHITECTURE', desc: 'Designing robust, scalable backend systems with Node.js and Python, seamlessly integrated with performant frontend frameworks.' },
              { id: 'B', title: 'AI & AUTOMATION', desc: 'Leveraging local LLMs and custom automation scripts to build intelligent environments and optimized development workflows.' },
              { id: 'C', title: 'FINANCIAL SYSTEMS', desc: 'Building high-precision financial tools and coupon intelligence platforms with real-time data scraping and verification.' }
            ].map(exp => (
              <div key={exp.id} className="flex flex-col border-l-2 border-black/10 pl-6 hover:border-black transition-colors duration-300">
                <span className="text-sm font-medium mb-4">{exp.id}.</span>
                <h4 className="text-xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{exp.title}</h4>
                <p className="text-black/70 text-lg leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="work" className="relative z-10 bg-white py-12 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto border-t border-black/10 pt-16">
          <h2 className="text-4xl sm:text-6xl mb-16 tracking-tight text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            03. Selected Works
          </h2>
          <div className="flex flex-col gap-10">
            {[
              { name: 'Gemma Chat', desc: 'A local-first coding agent powered by Google\'s Gemma models. Built for offline "vibe coding" without cloud dependencies.', lang: 'TypeScript / LLM', url: 'https://github.com/KishanDavda-IT/Gemma-chat-win' },
              { name: 'Kupi Coupon', desc: 'Real-time coupon intelligence platform scraping and verifying discount codes for major Indian food delivery services.', lang: 'Python / Scraping', url: 'https://github.com/KishanDavda-IT/Kupi-coupon' },
              { name: 'OpenEnv Scheduler', desc: 'AI-ready environment for complex calendar management with deterministic grading and Gradio visualization.', lang: 'Python / AI Agents', url: 'https://github.com/KishanDavda-IT/-OpenEnv-Scheduler' },
              { name: 'RupeeTools', desc: 'Comprehensive suite of Indian financial calculators including SIP, EMI, and GST, built for precision and performance.', lang: 'Next.js / Financial', url: 'https://github.com/KishanDavda-IT/RupeeTools' },
            ].map((proj, idx) => (
              <a key={proj.name} href={proj.url} target="_blank" rel="noopener noreferrer" className="group block border-t border-black/20 pt-6 hover:border-black transition-colors duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl text-black group-hover:opacity-60 transition-opacity" style={{ fontFamily: 'var(--font-heading)' }}>
                    0{idx + 1} — {proj.name}
                  </h3>
                  <span className="text-sm px-4 py-1 border border-black/20 rounded-full text-black group-hover:border-black transition-colors">{proj.lang}</span>
                </div>
                <p className="text-lg text-black/70 max-w-2xl">{proj.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 bg-white pt-12 pb-32 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto border-t border-black/10 pt-16 flex flex-col items-start">
          <h2 className="text-[12vw] md:text-[8rem] leading-none mb-8 tracking-tighter text-black uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            Let's Talk
          </h2>
          <a href="mailto:kishandavda2008@gmail.com" className="text-2xl sm:text-4xl hover:opacity-60 transition-opacity mb-12 border-b-2 border-black pb-2 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
            kishandavda2008@gmail.com
          </a>
          <div className="flex flex-wrap gap-6 sm:gap-10 text-lg sm:text-xl text-black/80 font-medium tracking-wide">
            <a href="https://github.com/KishanDavda-IT" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:opacity-60 transition-all">GITHUB</a>
            <a href="https://www.linkedin.com/in/kishan-davda-667909342" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:opacity-60 transition-all">LINKEDIN</a>
            <a href="./Kishan_Davda_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:opacity-60 transition-all">RESUME</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default App