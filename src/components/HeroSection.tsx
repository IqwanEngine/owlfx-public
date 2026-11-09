import React, { useEffect, useState } from 'react';
import { ArrowUpRight, BarChart3, Cpu, MapPin, Radio, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps { onExploreAlgo: () => void; }

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreAlgo }) => {
  const { t } = useLanguage();
  const [traderCount, setTraderCount] = useState(5840);
  useEffect(() => { const timer = window.setInterval(() => setTraderCount((count) => count + 1), 4500); return () => window.clearInterval(timer); }, []);

  return (
    <section id="hero-section" className="relative isolate overflow-hidden bg-[#050810] bg-[url('/assets/hero-bg.png')] bg-cover bg-center bg-no-repeat px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,6,10,0.68),rgba(3,6,10,0.9)_70%,#050810),linear-gradient(90deg,rgba(3,6,10,0.95),transparent,rgba(3,6,10,0.92))]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(212,175,55,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-950/70 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald-300"><Radio className="h-3.5 w-3.5" />{t.hero.statusLive}<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /></div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-8xl"><span className="block text-slate-100">{t.hero.headline1}</span><span className="block text-amber-400">{t.hero.headline2} {t.hero.headline3}</span></h1>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-xl">{t.hero.description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://t.me/OWLfxPublicChannel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-amber-400 px-7 py-4 font-mono text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-amber-300"><span>MY</span>{t.hero.btnMalaysia}<ArrowUpRight className="h-4 w-4" /></a>
            <a href="/id/register" className="inline-flex items-center gap-3 rounded-xl border border-rose-400/50 bg-rose-950/50 px-7 py-4 font-mono text-sm font-black uppercase tracking-wider text-white transition hover:border-rose-300"><span>ID</span>{t.hero.btnIndonesia}<ArrowUpRight className="h-4 w-4" /></a>
            <button type="button" onClick={onExploreAlgo} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-slate-950/80 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 transition hover:border-cyan-300"><Cpu className="h-4 w-4" />{t.hero.btnAlgoPreview}</button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3 font-mono text-xs text-slate-300"><span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><ShieldCheck className="h-4 w-4 text-amber-400" />{t.hero.badgeLiquidity}</span><span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><Zap className="h-4 w-4 text-cyan-400" />{t.hero.badgeExecution}</span><span className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"><BarChart3 className="h-4 w-4 text-emerald-400" />{t.hero.badgeLicensed}</span></div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-950/75 p-5 sm:grid-cols-4 sm:p-8">
          <Metric icon={<Users />} label={t.hero.statTraders} value={traderCount.toLocaleString()} sub={t.hero.statTradersSub} />
          <Metric icon={<MapPin />} label="14 NEGERI" value="14" sub="Ekspedisi Jelajah Kebangsaan" />
          <Metric icon={<BarChart3 />} label={t.hero.statWinrate} value="84.2%" sub={t.hero.statWinrateSub} accent="text-emerald-400" />
          <Metric icon={<TrendingUp />} label={t.hero.statVolume} value="$18.4M+" sub={t.hero.statVolumeSub} accent="text-amber-400" />
        </div>
      </div>
    </section>
  );
};

function Metric({ icon, label, value, sub, accent = 'text-white' }: { icon: React.ReactNode; label: string; value: string; sub: string; accent?: string }) {
  return <div className="flex flex-col items-center gap-2 text-center"><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">{React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'h-4 w-4 text-amber-400' })}{label}</span><strong className={`font-mono text-2xl font-black sm:text-3xl ${accent}`}>{value}</strong><span className="text-[10px] text-slate-500">{sub}</span></div>;
}
