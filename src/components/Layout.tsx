import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { CommunityFooterSection } from './CommunityFooterSection';
import { ShieldCheck } from 'lucide-react';
import { CommunityLinks } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAdmin: () => void;
  communityLinks: CommunityLinks;
  securityToast: { show: boolean; message: string };
}

export function Layout({ children, onOpenAdmin, communityLinks, securityToast }: LayoutProps) {
  const [marketPhase, setMarketPhase] = useState('EXPANSION');

  useEffect(() => {
    const phases = ['ACCUMULATION', 'MANIPULATION', 'EXPANSION'];
    const interval = window.setInterval(() => {
      setMarketPhase((current) => phases[(phases.indexOf(current) + 1) % phases.length]);
    }, 12000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#03060a] text-slate-200 antialiased">
      <aside aria-label="Institutional Market Status" className="relative z-50 flex w-full items-center justify-between border-b border-amber-400/20 bg-slate-950/90 px-3 py-1.5 font-mono text-[11px] tracking-wider">
        <div className="flex items-center gap-3 overflow-x-auto sm:gap-6">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />ENGINE: ACTIVE</span>
          <span className="hidden whitespace-nowrap text-slate-400 sm:inline">ASSET: <strong className="text-amber-400">XAUUSD [GOLD]</strong></span>
          <span className="whitespace-nowrap text-slate-400">REGIME: <strong className="text-cyan-300">{marketPhase}</strong></span>
        </div>
        <span className="hidden text-slate-400 md:inline">CORE: <span className="text-slate-200">IQWAN_V3</span></span>
      </aside>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(212,175,55,0.12),transparent_38%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,44px_44px,44px_44px]" />
      <Navbar onOpenAdmin={onOpenAdmin} />
      <main id="main-content" className="relative z-10">{children}</main>
      <CommunityFooterSection communityLinks={communityLinks} onOpenAdmin={onOpenAdmin} />

      {securityToast.show && (
        <div id="anti-theft-toast" role="alert" aria-live="polite" className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-amber-400/60 bg-[#080d1a]/95 px-5 py-3 shadow-2xl">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          <div><span className="block font-mono text-[10px] uppercase tracking-wider text-amber-400">OWL_ENGINE DEFENSE SYSTEM</span><p className="whitespace-nowrap font-mono text-xs text-slate-100">{securityToast.message}</p></div>
        </div>
      )}
    </div>
  );
}
