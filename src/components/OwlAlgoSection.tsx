import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle, ExternalLink, ArrowRight, Star, ChevronLeft, ChevronRight, Zap, TrendingUp, TrendingDown, X } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface OwlAlgoSectionProps {
  onOpenLightbox?: (images: { url: string; caption?: string; title?: string }[], startIndex?: number) => void;
}

const RESULT_GROUP_IMAGES = [
  "https://owlfx.online/cdn/shop/files/IMG_0361.png?v=1782731631&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0362.png?v=1782731650&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0370.png?v=1782731700&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0372.png?v=1782731724&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0373.png?v=1782731753&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0371.png?v=1782732013&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0366.png?v=1782732117&width=900",
  "https://owlfx.online/cdn/shop/files/IMG_0369.png?v=1782732198&width=900"
];

const TESTIMONIAL_PERSONAL_IMAGES = [
  "https://brocepris.com/cdn/shop/files/4.jpg?v=1784299785&width=1400",
  "https://brocepris.com/cdn/shop/files/2.jpg?v=1784300142&width=1400",
  "https://brocepris.com/cdn/shop/files/WhatsApp_Image_2026-07-15_at_21.03.24.jpg?v=1784302292&width=1400",
  "https://brocepris.com/cdn/shop/files/WhatsApp_Image_2026-07-17_at_13.40.22.jpg?v=1784300185&width=1400"
];

const TIMEFRAME_CHART_IMAGES: Record<'M5' | 'M15' | 'M30' | 'H1', string> = {
  M5: 'https://i.imgur.com/6R4Xg5i.png',
  M15: 'https://i.imgur.com/pZbLzmL.png',
  M30: 'https://i.imgur.com/g0Rxl3l.png',
  H1: 'https://i.imgur.com/hlZSlrI.png',
};

const SETUP_MODAL_DATA = {
  buy: {
    kicker: '01',
    category: 'TRADING SETUP',
    title: 'Setup Buy',
    description: 'Daripada confirmation indicator kepada execution sebenar di MT5.',
    signalBadge: 'OWL ALGO • SIGNAL',
    signalImage: 'https://brocepris.com/cdn/shop/files/Buy_B.jpg?v=1784345290&width=1600',
    signalCaption: 'Setup dan confirmation yang dikenal pasti melalui Owl Algo.',
    entryBadge: 'MT5 ENTRY • REAL EXECUTION',
    entryImage: 'https://brocepris.com/cdn/shop/files/Buy_A.jpg?v=1784345325&width=1600',
    entryCaption: 'Execution entry sebenar selepas confirmation setup diperoleh.',
  },
  sell: {
    kicker: '02',
    category: 'TRADING SETUP',
    title: 'Setup Sell',
    description: 'Contoh bagaimana indicator membantu melihat setup dengan lebih tersusun dan objektif.',
    signalBadge: 'OWL ALGO • SIGNAL',
    signalImage: 'https://brocepris.com/cdn/shop/files/1b.jpg?v=1784345430&width=1600',
    signalCaption: 'Setup dan confirmation yang dikenal pasti melalui Owl Algo.',
    entryBadge: 'MT5 ENTRY • REAL EXECUTION',
    entryImage: 'https://brocepris.com/cdn/shop/files/WhatsApp_Image_2026-07-18_at_00.48.01.jpg?v=1784345451&width=1600',
    entryCaption: 'Execution entry sebenar selepas confirmation setup diperoleh.',
  },
};

export const OwlAlgoSection: React.FC<OwlAlgoSectionProps> = ({ onOpenLightbox }) => {
  const { t } = useLanguage();
  const [selectedTF, setSelectedTF] = useState<'M5' | 'M15' | 'M30' | 'H1'>('M15');
  const [modalSetup, setModalSetup] = useState<'buy' | 'sell' | null>(null);
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string; caption: string } | null>(null);
  const containerRef = useScrollReveal();

  // Close modal or zoom on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) {
          setZoomedImage(null);
        } else if (modalSetup) {
          setModalSetup(null);
        }
      }
    };
    if (modalSetup || zoomedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalSetup, zoomedImage]);

  const nextTestimonial = () => {
    // No-op - removed unused testimonial navigation logic
  };

  const prevTestimonial = () => {
    // No-op - removed unused testimonial navigation logic
  };

  return (
    <section id="owl-algo" ref={containerRef} className="py-24 relative bg-[#06090E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.algo.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.algo.title1} <span className="text-gold-gradient">{t.algo.title2}</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.algo.description}
          </p>
        </div>

        {/* High-Tech Real Chart Display Container (Obsidian Glass) */}
        <div
          id="owl-algo-real-chart-container"
          className="rounded-2xl bg-[#0C1017] border border-slate-800/80 shadow-2xl overflow-hidden mb-8 relative reveal-on-scroll reveal-delay-1"
        >
          {/* Top Bar / Timeframe Header */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0E131F] border-b border-white/10 text-xs font-mono gap-3">
            {/* Pair Label & Institutional Feed Status */}
            <div className="flex items-center space-x-2.5 py-1">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-extrabold tracking-wide">XAUUSD (GOLD)</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400 text-[11px] font-bold tracking-wider">CHART VIEW ({selectedTF})</span>
              </div>
            </div>

            {/* Timeframe Selectors: [ M5 ], [ M15 ], [ M30 ], [ H1 ] */}
            <div className="flex items-center space-x-2 py-1">
              {(['M5', 'M15', 'M30', 'H1'] as const).map((tf) => (
                <button
                  key={tf}
                  id={`tf-btn-${tf.toLowerCase()}`}
                  type="button"
                  onClick={() => setSelectedTF(tf)}
                  className={`btn-luxury-shimmer px-3.5 py-1.5 rounded-lg text-xs font-mono font-black transition-all cursor-pointer ${
                    selectedTF === tf
                      ? 'bg-gradient-to-r from-amber-400 via-[#D4AF37] to-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(212,175,55,0.5)] ring-1 ring-white/60 scale-105'
                      : 'text-slate-300 bg-slate-800/80 border border-white/10 hover:border-cyan-400/80 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-slate-700/80'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* TradingView Script Direct Link */}
            <div className="flex items-center space-x-3 py-1 text-slate-300">
              <a
                id="tradingview-script-link-btn"
                href="https://www.tradingview.com/script/2ZIMV08M-OWLALGO/"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-luxury-shimmer flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#2563EB]/20 hover:bg-[#2563EB]/40 border border-[#2563EB]/40 text-[#60A5FA] hover:text-white font-bold text-xs shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
              >
                <span>{t.algo.btnScript}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Chart Image Display */}
          <div className="relative w-full bg-[#070A12] p-3 sm:p-5 flex items-center justify-center min-h-[320px] sm:min-h-[440px] select-none">
            <img
              key={selectedTF}
              id={`chart-image-${selectedTF.toLowerCase()}`}
              src={TIMEFRAME_CHART_IMAGES[selectedTF]}
              alt={`Owl Algo Chart ${selectedTF}`}
              referrerPolicy="no-referrer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onAuxClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-auto max-h-[520px] object-contain rounded-xl transition-all duration-300 shadow-xl border border-slate-800/60 select-none cursor-default"
            />
          </div>

          {/* Bottom Chart Status Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#090D18] border-t border-white/5 text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center space-x-2.5">
              <span className="text-[#D4AF37] font-bold">OWL ALGO INDICATOR</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">LIVE SETUP: {selectedTF} CONFIRMED</span>
            </div>
            <div className="text-cyan-400 font-medium text-[10px] sm:text-[11px]">
              TRADINGVIEW PROPRIETARY ALGORITHM
            </div>
          </div>
        </div>

        {/* Dual Action Buttons: Lihat Setup Buy & Lihat Setup Sell */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 max-w-4xl mx-auto reveal-on-scroll reveal-delay-2">
          <button
            id="btn-view-setup-buy"
            type="button"
            onClick={() => setModalSetup('buy')}
            className="group btn-luxury-shimmer btn-emerald-luxury relative flex items-center justify-center space-x-3 px-6 py-4 rounded-xl border border-emerald-500/50 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-500 hover:text-slate-950 font-mono font-bold text-sm sm:text-base cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5" />
            <span className="tracking-wider">LIHAT SETUP BUY</span>
          </button>

          <button
            id="btn-view-setup-sell"
            type="button"
            onClick={() => setModalSetup('sell')}
            className="group btn-luxury-shimmer btn-rose-luxury relative flex items-center justify-center space-x-3 px-6 py-4 rounded-xl border border-rose-500/50 text-rose-400 bg-rose-950/30 hover:bg-rose-500 hover:text-white font-mono font-bold text-sm sm:text-base cursor-pointer"
          >
            <TrendingDown className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:translate-y-0.5" />
            <span className="tracking-wider">LIHAT SETUP SELL</span>
          </button>
        </div>

        {/* Dual Infinite Horizontal Testimonial Loop (Social Proof Engine) */}
        <div className="w-full max-w-full overflow-hidden relative py-6 mb-16 space-y-8 reveal-on-scroll reveal-delay-1">
          {/* BARIS 1: RESULT GROUP SUPPORT OWLFX (BERGERAK KE KIRI - SPEED: 38s) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono w-fit shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-bold tracking-wider">HASIL SETUP &amp; RESULT GROUP VIP</span>
            </div>

            <div className="w-full max-w-full overflow-hidden relative py-2">
              {/* Luxury Gradient Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#06090E] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#06090E] to-transparent z-10" />

              {/* Marquee Track (Left Direction, 38s) */}
              <div className="animate-marquee-left flex items-center space-x-4 sm:space-x-6 hover:[animation-play-state:paused]">
                {/* Primary Set */}
                {RESULT_GROUP_IMAGES.map((imgUrl, idx) => (
                  <div
                    key={`row1-item-${idx}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenLightbox?.(
                        RESULT_GROUP_IMAGES.map((u, i) => ({
                          url: u,
                          title: `Hasil Setup & Result Group VIP #${i + 1}`,
                          caption: 'Pengesahan hasil posisi dan perkongsian setup ahli komuniti OWLFX.'
                        })),
                        idx
                      );
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="shrink-0 rounded-2xl border border-[rgba(6,182,212,0.25)] hover:border-cyan-400/80 bg-slate-950/80 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt={`Hasil Setup Group VIP ${idx + 1}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onAuxClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bc-feedback-image h-[260px] sm:h-[300px] lg:h-[380px] w-auto max-w-none object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] select-none"
                    />
                  </div>
                ))}

                {/* Duplicate Clone Set for Seamless Loop */}
                {RESULT_GROUP_IMAGES.map((imgUrl, idx) => (
                  <div
                    key={`row1-clone-${idx}`}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenLightbox?.(
                        RESULT_GROUP_IMAGES.map((u, i) => ({
                          url: u,
                          title: `Hasil Setup & Result Group VIP #${i + 1}`,
                          caption: 'Pengesahan hasil posisi dan perkongsian setup ahli komuniti OWLFX.'
                        })),
                        idx
                      );
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="shrink-0 rounded-2xl border border-[rgba(6,182,212,0.25)] hover:border-cyan-400/80 bg-slate-950/80 shadow-lg overflow-hidden group cursor-pointer transition-all duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onAuxClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bc-feedback-image h-[260px] sm:h-[300px] lg:h-[380px] w-auto max-w-none object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] select-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BARIS 2: TESTIMONI PERSONAL & KOMUNITI (BERGERAK KE KANAN - SPEED: 42s) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-950/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono w-fit shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
              <span className="font-bold tracking-wider">MAKLUM BALAS &amp; TESTIMONI PEDAGANG</span>
            </div>

            <div className="w-full max-w-full overflow-hidden relative py-2">
              {/* Luxury Gradient Masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#06090E] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#06090E] to-transparent z-10" />

              {/* Marquee Track (Right Direction, 42s) */}
              <div className="animate-marquee-right flex items-center space-x-4 sm:space-x-6 hover:[animation-play-state:paused]">
                {/* Primary Set (repeated for wide coverage) */}
                {[...TESTIMONIAL_PERSONAL_IMAGES, ...TESTIMONIAL_PERSONAL_IMAGES].map((imgUrl, idx) => (
                  <div
                    key={`row2-item-${idx}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenLightbox?.(
                        TESTIMONIAL_PERSONAL_IMAGES.map((u, i) => ({
                          url: u,
                          title: `Maklum Balas & Testimoni #${i + 1}`,
                          caption: 'Perbualan WhatsApp dan maklum balas jujur komuniti pedagang OWLFX.'
                        })),
                        idx % TESTIMONIAL_PERSONAL_IMAGES.length
                      );
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="shrink-0 rounded-2xl border border-slate-800/80 hover:border-amber-400/50 bg-slate-950/80 shadow-lg overflow-hidden group cursor-pointer transition-colors duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt={`Maklum Balas Pedagang ${(idx % TESTIMONIAL_PERSONAL_IMAGES.length) + 1}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onAuxClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bc-feedback-image h-[260px] sm:h-[300px] lg:h-[380px] w-auto max-w-none object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] select-none"
                    />
                  </div>
                ))}

                {/* Duplicate Clone Set for Seamless Loop */}
                {[...TESTIMONIAL_PERSONAL_IMAGES, ...TESTIMONIAL_PERSONAL_IMAGES].map((imgUrl, idx) => (
                  <div
                    key={`row2-clone-${idx}`}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenLightbox?.(
                        TESTIMONIAL_PERSONAL_IMAGES.map((u, i) => ({
                          url: u,
                          title: `Maklum Balas & Testimoni #${i + 1}`,
                          caption: 'Perbualan WhatsApp dan maklum balas jujur komuniti pedagang OWLFX.'
                        })),
                        idx % TESTIMONIAL_PERSONAL_IMAGES.length
                      );
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="shrink-0 rounded-2xl border border-slate-800/80 hover:border-amber-400/50 bg-slate-950/80 shadow-lg overflow-hidden group cursor-pointer transition-colors duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onAuxClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="bc-feedback-image h-[260px] sm:h-[300px] lg:h-[380px] w-auto max-w-none object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] select-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Valetax MIB Account Activation CTA Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0B0F19] border border-[#D4AF37]/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 gold-glow mb-16 reveal-on-scroll reveal-delay-2">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-xs font-bold mb-2">
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.algo.ctaBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {t.algo.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {t.algo.ctaDesc}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>{t.algo.ctaFeature1}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>{t.algo.ctaFeature2}</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>{t.algo.ctaFeature3}</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-72 shrink-0 space-y-3">
            <a
              id="algo-cta-tradingview-btn"
              href="https://www.tradingview.com/script/2ZIMV08M-OWLALGO/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs tracking-wider uppercase bg-[#2563EB]/30 hover:bg-[#2563EB]/50 border border-[#2563EB]/50 hover:border-[#38BDF8] active:scale-95 shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.algo.btnScript}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#60A5FA]" />
            </a>

            <a
              id="algo-cta-valetax-btn"
              href="/my/register"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl text-slate-950 font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-[#FFF6D3] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-95 shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.algo.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Trader Testimonials & Feedback Carousel */}
        <div className="rounded-2xl glass-card border border-white/10 p-6 sm:p-8 reveal-on-scroll reveal-delay-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] font-bold uppercase">SUARA KOMUNITI PEDAGANG</span>
              <h3 className="text-xl font-bold text-white">Hasil & Maklum Balas Pedagang Sebenar</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Testimoni Sebelum"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Testimoni Seterusnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_TESTIMONIALS.slice(0, 2).map((testi) => (
              <div
                key={testi.id}
                className="p-5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testi.avatar}
                        alt={testi.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-sm font-bold text-white">{testi.name}</span>
                          {testi.verifiedBadge && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono">
                              TERSAH
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{testi.role} • {testi.location}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[10px] text-slate-400 block">HASIL DIJANA</span>
                      <span className="text-xs font-bold text-emerald-400">{testi.profit}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{testi.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-1 mt-4 pt-3 border-t border-white/5">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                  <span className="text-xs font-mono text-slate-400 ml-2">5.0 Star Rating</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Modal (Setup Buy / Setup Sell) */}
      {modalSetup && (
        <div
          id="setup-comparison-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setModalSetup(null)}
        >
          <div
            id="setup-comparison-modal-content"
            className="relative w-full max-w-5xl bg-[#0C1017] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0E131F] flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider ${
                    modalSetup === 'buy'
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-950/80 border border-rose-500/40 text-rose-400'
                  }`}
                >
                  {SETUP_MODAL_DATA[modalSetup].category} • {SETUP_MODAL_DATA[modalSetup].kicker}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                  <span>{SETUP_MODAL_DATA[modalSetup].title}</span>
                  {modalSetup === 'buy' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-400 inline" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-rose-400 inline" />
                  )}
                </h3>
              </div>

              {/* Close Button */}
              <button
                id="btn-close-setup-modal"
                type="button"
                onClick={() => setModalSetup(null)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Subheader / Description */}
            <div className="px-5 py-3 bg-[#0A0D15] border-b border-white/5 text-xs sm:text-sm text-slate-300 font-mono flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
              <span>{SETUP_MODAL_DATA[modalSetup].description}</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setModalSetup(modalSetup === 'buy' ? 'sell' : 'buy')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer"
                >
                  {modalSetup === 'buy' ? 'Lihat Setup Sell →' : '← Lihat Setup Buy'}
                </button>
              </div>
            </div>

            {/* Modal Body: Two-Column Side-by-Side Comparison on Desktop, Stacked on Mobile */}
            <div className="p-3 sm:p-6 max-h-[85vh] overflow-y-auto px-1 sm:px-6 flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 bg-[#070A10]">
              {/* Card 1: Owl Algo Signal */}
              <div className="bc-ie-proof flex flex-col p-4 sm:p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                {/* Header di LUAR media dengan mb-3 atau mb-4 dan relative z-10 */}
                <div className="bc-ie-proof__header mb-3 sm:mb-4 relative z-10 flex items-center justify-between px-3.5 py-2.5 bg-[#141A29] border border-white/5 rounded-xl flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wide">
                      {SETUP_MODAL_DATA[modalSetup].signalBadge}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    TRADINGVIEW
                  </span>
                </div>

                {/* Kontena Media (.bc-ie-proof__media) dengan ruang menegak terkawal & fit penuh */}
                <div
                  className="bc-ie-proof__media w-full relative flex items-center justify-center bg-slate-900/40 rounded-xl p-2 sm:p-3 border border-slate-800/80 h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setZoomedImage({
                      url: SETUP_MODAL_DATA[modalSetup].signalImage,
                      title: `${SETUP_MODAL_DATA[modalSetup].title} • ${SETUP_MODAL_DATA[modalSetup].signalBadge}`,
                      caption: SETUP_MODAL_DATA[modalSetup].signalCaption,
                    });
                  }}
                  onAuxClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  title="Klik untuk besarkan paparan penuh"
                >
                  <img
                    src={SETUP_MODAL_DATA[modalSetup].signalImage}
                    alt={`${SETUP_MODAL_DATA[modalSetup].title} Signal`}
                    referrerPolicy="no-referrer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setZoomedImage({
                        url: SETUP_MODAL_DATA[modalSetup].signalImage,
                        title: `${SETUP_MODAL_DATA[modalSetup].title} • ${SETUP_MODAL_DATA[modalSetup].signalBadge}`,
                        caption: SETUP_MODAL_DATA[modalSetup].signalCaption,
                      });
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="bc-ie-proof__image w-auto h-full max-h-full max-w-full object-contain cursor-zoom-in rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] select-none"
                  />
                  {/* Floating mini badge: Klik untuk Besarkan */}
                  <span className="bg-black/60 text-slate-300 text-[10px] px-2 py-1 rounded-md backdrop-blur-sm pointer-events-none absolute bottom-2 right-2 border border-white/10 flex items-center space-x-1 shadow-md">
                    <span>🔍 Klik untuk Besarkan</span>
                  </span>
                </div>

                {/* Caption */}
                <div className="mt-3 sm:mt-4 p-3.5 rounded-xl bg-[#0F1420] border border-white/5 text-xs text-slate-300 font-mono leading-relaxed">
                  {SETUP_MODAL_DATA[modalSetup].signalCaption}
                </div>
              </div>

              {/* Card 2: MT5 Entry Real Execution */}
              <div className="bc-ie-proof flex flex-col p-4 sm:p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                {/* Header di LUAR media dengan mb-3 atau mb-4 dan relative z-10 */}
                <div className="bc-ie-proof__header mb-3 sm:mb-4 relative z-10 flex items-center justify-between px-3.5 py-2.5 bg-[#141A29] border border-white/5 rounded-xl flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        modalSetup === 'buy'
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                          : 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                      }`}
                    />
                    <span
                      className={`text-xs font-mono font-bold tracking-wide ${
                        modalSetup === 'buy' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {SETUP_MODAL_DATA[modalSetup].entryBadge}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-white/10">
                    METATRADER 5
                  </span>
                </div>

                {/* Kontena Media (.bc-ie-proof__media) dengan ruang menegak terkawal & fit penuh */}
                <div
                  className="bc-ie-proof__media w-full relative flex items-center justify-center bg-slate-900/40 rounded-xl p-2 sm:p-3 border border-slate-800/80 h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setZoomedImage({
                      url: SETUP_MODAL_DATA[modalSetup].entryImage,
                      title: `${SETUP_MODAL_DATA[modalSetup].title} • ${SETUP_MODAL_DATA[modalSetup].entryBadge}`,
                      caption: SETUP_MODAL_DATA[modalSetup].entryCaption,
                    });
                  }}
                  onAuxClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  title="Klik untuk besarkan paparan penuh"
                >
                  <img
                    src={SETUP_MODAL_DATA[modalSetup].entryImage}
                    alt={`${SETUP_MODAL_DATA[modalSetup].title} MT5 Entry`}
                    referrerPolicy="no-referrer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setZoomedImage({
                        url: SETUP_MODAL_DATA[modalSetup].entryImage,
                        title: `${SETUP_MODAL_DATA[modalSetup].title} • ${SETUP_MODAL_DATA[modalSetup].entryBadge}`,
                        caption: SETUP_MODAL_DATA[modalSetup].entryCaption,
                      });
                    }}
                    onAuxClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="bc-ie-proof__image w-auto h-full max-h-full max-w-full object-contain cursor-zoom-in rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] select-none"
                  />
                  {/* Floating mini badge: Klik untuk Besarkan */}
                  <span className="bg-black/60 text-slate-300 text-[10px] px-2 py-1 rounded-md backdrop-blur-sm pointer-events-none absolute bottom-2 right-2 border border-white/10 flex items-center space-x-1 shadow-md">
                    <span>🔍 Klik untuk Besarkan</span>
                  </span>
                </div>

                {/* Caption */}
                <div className="mt-3 sm:mt-4 p-3.5 rounded-xl bg-[#0F1420] border border-white/5 text-xs text-slate-300 font-mono leading-relaxed">
                  {SETUP_MODAL_DATA[modalSetup].entryCaption}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0E131F] border-t border-white/10 flex-shrink-0">
              <span className="text-[11px] font-mono text-slate-400">
                Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">ESC</kbd> atau klik di luar untuk tutup
              </span>
              <button
                type="button"
                onClick={() => setModalSetup(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer border border-white/10"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Zoom Modal Popup */}
      {zoomedImage && (
        <div
          id="lightbox-zoom-modal-backdrop"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          {/* Top Right Close Button with [ESC] text */}
          <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
            <button
              id="btn-close-zoom-modal"
              type="button"
              onClick={() => setZoomedImage(null)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/20 shadow-2xl transition-all cursor-pointer group"
              aria-label="Tutup Paparan Zum"
            >
              <span className="text-xs font-mono font-bold tracking-wider text-[#D4AF37]">Tutup [ESC]</span>
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200 text-rose-400" />
            </button>
          </div>

          {/* Top Left Title Bar */}
          {zoomedImage.title && (
            <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 pointer-events-none shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-bold text-white tracking-wide">{zoomedImage.title}</span>
            </div>
          )}

          {/* High-Resolution Full Size Image Container */}
          <div
            className="relative flex items-center justify-center max-w-full max-h-full my-auto p-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onAuxClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <img
              src={zoomedImage.url}
              alt={zoomedImage.title}
              referrerPolicy="no-referrer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onAuxClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/15 select-none cursor-default"
            />
          </div>

          {/* Bottom Floating Caption Bar */}
          {zoomedImage.caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-2xl px-4 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 backdrop-blur-md pointer-events-none text-center shadow-xl">
              <p className="text-xs font-mono text-slate-300">
                {zoomedImage.caption}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
