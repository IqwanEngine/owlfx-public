import React from 'react';
import { ArrowUp, Instagram, Lock, Send, Video } from 'lucide-react';
import { CommunityLinks } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CommunityFooterSectionProps { communityLinks: CommunityLinks; onOpenAdmin: () => void; }

export const CommunityFooterSection: React.FC<CommunityFooterSectionProps> = ({ communityLinks, onOpenAdmin }) => {
  const { t } = useLanguage();
  const links = [
    { label: 'TikTok', href: communityLinks.tiktok || 'https://www.tiktok.com/@wan.owlfx', icon: <Video className="h-4 w-4" /> },
    { label: 'Telegram', href: communityLinks.telegramVip || 'https://t.me/OWLfxPublicChannel', icon: <Send className="h-4 w-4" /> },
    { label: 'Instagram', href: communityLinks.instagram || 'https://www.instagram.com/wan.owlfx', icon: <Instagram className="h-4 w-4" /> },
  ];
  return (
    <footer id="community" className="border-t border-white/10 bg-[#04060A] px-4 py-12 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div><p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400">{t.footer.badge}</p><h2 className="mt-2 text-2xl font-black uppercase text-white">{t.footer.headline1} <span className="text-amber-400">{t.footer.headline2}</span></h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">{t.footer.desc}</p></div>
          <div className="flex flex-wrap gap-2">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-amber-400/50 hover:text-amber-400">{link.icon}{link.label}</a>)}</div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs md:flex-row md:items-start md:justify-between"><div><p className="text-slate-300">© 2026 OWLFX Institutional Trading Architecture. Hak Cipta Terpelihara.</p><p className="mt-2 max-w-3xl leading-relaxed text-slate-500">{t.footer.disclaimer}</p></div><div className="flex items-center gap-3"><button type="button" onClick={onOpenAdmin} className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-amber-400"><Lock className="h-3.5 w-3.5" />Admin Portal</button><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Kembali ke Atas" className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"><ArrowUp className="h-4 w-4" /></button></div></div>
      </div>
    </footer>
  );
};
