import React from 'react';
import { ShieldCheck, TrendingUp, Cpu, ArrowUpRight, Award, Zap, Users, MapPin, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onExploreAlgo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreAlgo,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden bg-radial-vignette bg-grid-pattern"
    >
      {/* Decorative dynamic ambient glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-[#06B6D4]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Institutional Pill Tag */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#D4AF37]/40 shadow-inner backdrop-blur-xl">
            <img
              src="/OWLFXpng.png"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith('OWLFXpng.png')) {
                  target.src = 'OWLFXpng.png';
                }
              }}
              alt="OWLFX"
              className="w-4 h-4 object-contain drop-shadow-[0_0_6px_rgba(212,175,55,0.35)]"
            />
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
              {t.hero.statusLive}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-[#D4AF37] font-semibold">
              {t.hero.ecosystem}
            </span>
          </div>
        </div>

        {/* Quantitative Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            {t.hero.headline1}{' '}
            <span className="text-gold-gradient block sm:inline">
              {t.hero.headline2}
            </span>{' '}
            {t.hero.headline3}
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {t.hero.description}
          </p>

          {/* Dual Call-to-Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Button 1: Malaysia Community / Daftar VIP */}
            <a
              id="hero-cta-malaysia"
              href="/interested?action=register"
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-luxury-shimmer btn-gold-luxury w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-white via-[#F5E6B3] to-[#D4AF37] border border-amber-300/60 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🇲🇾</span>
              <span className="font-extrabold">{t.hero.btnMalaysia}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
            </a>

            {/* Button 2: Indonesia Registration */}
            <a
              id="hero-cta-indonesia"
              href="/id/register"
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-luxury-shimmer btn-rose-luxury w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#991B1B]/80 via-[#DC2626]/80 to-[#D4AF37]/80 border border-rose-400/50 backdrop-blur-md flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🇮🇩</span>
              <span className="font-extrabold">{t.hero.btnIndonesia}</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1.5 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
            </a>

            {/* Quick Algo Demo Button */}
            <button
              id="hero-cta-algo-preview"
              type="button"
              onClick={onExploreAlgo}
              className="group btn-luxury-shimmer btn-cyan-luxury w-full sm:w-auto px-6 py-4 rounded-full font-mono text-xs font-semibold text-[#06B6D4] backdrop-blur-xl bg-[#06B6D4]/10 border border-[#06B6D4]/40 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#06B6D4] group-hover:rotate-45 transition-transform duration-500" />
              <span>{t.hero.btnAlgoPreview}</span>
            </button>
          </div>

          {/* Institutional Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.badgeLiquidity}</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-[#06B6D4]" />
              <span>{t.hero.badgeExecution}</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#10B981]" />
              <span>{t.hero.badgeLicensed}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Ticker Bar under Hero */}
        <div
          id="hero-metrics-ticker-bar"
          className="mt-14 w-full rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top golden light line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
            {/* Metric 1 */}
            <div className="pt-2 md:pt-0">
              <div className="flex items-center justify-center space-x-2 text-slate-400 mb-1">
                <Users className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#06B6D4]">{t.hero.statTraders}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                5,840+ <span className="text-xs text-emerald-400 font-mono">MY &amp; ID</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{t.hero.statTradersSub}</p>
            </div>

            {/* Metric 2 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center space-x-2 text-slate-400 mb-1">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">14 Negeri</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                14 <span className="text-slate-400 text-lg font-normal">Negeri</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">Ekspedisi Jelajah Kebangsaan</p>
            </div>

            {/* Metric 3 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center space-x-2 text-slate-400 mb-1">
                <BarChart3 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">{t.hero.statWinrate}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight">
                84.2<span className="text-slate-300 text-lg">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{t.hero.statWinrateSub}</p>
            </div>

            {/* Metric 4 */}
            <div className="pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center space-x-2 text-slate-400 mb-1">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF37]">{t.hero.statVolume}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#D4AF37] tracking-tight">
                $18.4M<span className="text-[#D4AF37]">+</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{t.hero.statVolumeSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
