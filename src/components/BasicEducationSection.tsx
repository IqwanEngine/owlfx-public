import React, { useState } from 'react';
import { GraduationCap, Play, Pause, Volume2, Maximize, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BasicEducationSectionProps {}

export const BasicEducationSection: React.FC<BasicEducationSectionProps> = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(0);

  const episodes = [
    {
      id: 0,
      title: "Ep 01: Pendaftaran Akaun Valetax MIB & Pengesahan KYC",
      duration: "14:20",
      thumbnail: "https://i.imgur.com/mEDs7TZ.jpeg?auto=format&fit=crop&w=1000&q=80",
      description: "Panduan langkah demi langkah membuka akaun ECN Zero Spread di bawah naungan kod MIB rasmi OWLFX."
    },
    {
      id: 1,
      title: "Ep 02: Integrasi & Konfigurasi Script OWL ALGO",
      duration: "18:45",
      thumbnail: "https://i.imgur.com/glB5iPP.png?auto=format&fit=crop&w=1000&q=80",
      description: "Cara menambah penunjuk proprietari ke akaun TradingView anda dan menetapkan push alert telefon pintar."
    },
    {
      id: 2,
      title: "Ep 03: Mengesan Zon Liquidity Sweeps & Order Block",
      duration: "24:10",
      thumbnail: "https://i.imgur.com/7635Vvy.png?auto=format&fit=crop&w=1000&q=80",
      description: "Memahami logik pasaran Smart Money dan mengelak perangkap manipulasi sesi dagangan London & NY."
    },
    {
      id: 3,
      title: "Ep 04: Pengurusan Modal & Matematik Saiz Lot Institusi",
      duration: "16:30",
      thumbnail: "https://i.imgur.com/UwLaWfT.png?auto=format&fit=crop&w=1000&q=80",
      description: "Formula pengiraan risiko 1% hingga 2% bagi mengekalkan kestabilan modal dan kelayakan self-rebate."
    }
  ];

  const currentEp = episodes[activeEpisode];

  return (
    <section id="education" className="py-24 relative bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.education.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.education.title1} <span className="text-gold-gradient">{t.education.title2}</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.education.description}
          </p>
        </div>

        {/* Step-by-Step Roadmap (3 Strategic Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#D4AF37]/50 transition-all relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30">
                {t.education.step1Badge}
              </span>
              <span className="text-xs font-mono text-slate-500">{t.education.step1Time}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
              {t.education.step1Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {t.education.step1Desc}
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-bold">{t.education.step1Perk}</span>
              <a
                href="/my/register"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-[#D4AF37] hover:text-amber-300 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>{t.education.step1Action}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#38BDF8]/50 transition-all relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#2563EB]/20 text-[#60A5FA] font-mono text-xs font-bold border border-[#2563EB]/30">
                {t.education.step2Badge}
              </span>
              <span className="text-xs font-mono text-slate-500">{t.education.step2Time}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
              {t.education.step2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {t.education.step2Desc}
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-sky-400 font-bold">{t.education.step2Perk}</span>
              <span className="text-slate-500">Auto Pinned</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/50 transition-all relative group">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                {t.education.step3Badge}
              </span>
              <span className="text-xs font-mono text-slate-500">{t.education.step3Time}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {t.education.step3Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {t.education.step3Desc}
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-bold">{t.education.step3Perk}</span>
              <span className="text-slate-500">Drawdown &lt; 5%</span>
            </div>
          </div>
        </div>

        {/* Modern Video Player Container */}
        <div className="rounded-3xl bg-[#090E1D] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Player Screen */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black group">
                <img
                  src={currentEp.thumbnail}
                  alt={currentEp.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isPlaying ? 'scale-105 filter brightness-75' : 'brightness-90'
                  }`}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                {/* Center Play/Pause Trigger */}
                <button
                  id="video-player-toggle"
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all gold-glow cursor-pointer z-20"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-slate-950" />
                  ) : (
                    <Play className="w-8 h-8 fill-slate-950 ml-1" />
                  )}
                </button>

                {/* Video Info Watermark Header */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-[#D4AF37] border border-white/10">
                      OWLFX MASTERCLASS
                    </span>
                    <span className="text-xs font-mono text-white/80 drop-shadow">
                      {currentEp.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isPlaying && (
                      <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-red-600 text-[10px] font-mono font-bold text-white animate-pulse">
                        <span>LIVE STREAMING</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="mb-2">
                    <h4 className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                      {currentEp.title}
                    </h4>
                    <p className="text-xs text-slate-300 drop-shadow hidden sm:block">
                      {currentEp.description}
                    </p>
                  </div>

                  {/* Simulated Scrub Bar */}
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] rounded-full transition-all duration-300 ${
                        isPlaying ? 'w-2/3 animate-pulse' : 'w-1/4'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-white"
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      <span>{isPlaying ? '08:42' : '02:15'} / {currentEp.duration}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                      <Maximize className="w-4 h-4 cursor-pointer hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Episode Selector / Masterclass Playlist */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-[#D4AF37] font-bold">MODUL MASTERCLASS</span>
                <span className="text-xs font-mono text-slate-400">4 Siri Lengkap</span>
              </div>

              <div className="space-y-2.5">
                {episodes.map((ep, idx) => (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => {
                      setActiveEpisode(idx);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border flex items-center space-x-3 ${
                      activeEpisode === idx
                        ? 'bg-slate-800 border-[#D4AF37] text-white shadow-lg'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        activeEpisode === idx ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{ep.title}</div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-2 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{ep.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA Button "Daftar Masterclass Percuma" */}
              <div className="pt-4">
                <a
                  id="education-cta-masterclass-btn"
                  href="/masterclass_registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn-luxury-shimmer btn-gold-luxury w-full py-3.5 px-4 rounded-xl text-slate-950 font-extrabold text-xs tracking-wider uppercase bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] border border-amber-300/60 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t.education.btnMasterclass}</span>
                </a>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                  {t.education.masterclassSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
