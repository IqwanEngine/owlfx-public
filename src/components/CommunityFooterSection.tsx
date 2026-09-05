import React from 'react';
import { CommunityLinks } from '../types';
import { Send, MessageCircle, Video, Youtube, Instagram, Lock, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CommunityFooterSectionProps {
  communityLinks: CommunityLinks;
  onOpenAdmin: () => void;
}

export const CommunityFooterSection: React.FC<CommunityFooterSectionProps> = ({
  communityLinks,
  onOpenAdmin,
}) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const telegramUrl = communityLinks.telegramVip || "https://t.me/OWLfxPublicChannel";
  const whatsAppUrl = communityLinks.whatsAppCareline || "http://wasap.my/+60102263677/(Website)Hai,%20saya%20nak%20tahu%20lebih%20mendalam%20tentang%20OWLFX";
  const tiktokUrl = communityLinks.tiktok || "https://www.tiktok.com/@wan.owlfx";
  const youtubeUrl = communityLinks.youtube || "https://www.youtube.com/@owlfx.official";
  const instagramUrl = communityLinks.instagram || "https://www.instagram.com/wan.owlfx";

  return (
    <footer id="community" className="relative bg-[#04060A] text-slate-400 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0A1024] via-[#101B3A] to-[#0A1024] border border-[#D4AF37]/40 p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              {t.footer.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {t.footer.headline1} <span className="text-gold-gradient">{t.footer.headline2}</span>
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {t.footer.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <a
              id="footer-join-vip-btn"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-luxury-shimmer btn-gold-luxury px-6 py-3.5 rounded-xl font-extrabold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-white via-[#F5E6B3] to-[#D4AF37] border border-amber-300/60 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              <span>{t.footer.btnVipCommunity}</span>
            </a>
            <a
              id="footer-whatsapp-admin-btn"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-luxury-shimmer btn-cyan-luxury px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-slate-900/90 border border-white/10 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-125 transition-transform duration-300" />
              <span>{t.footer.btnWhatsAppAdmin}</span>
            </a>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h4 className="text-sm font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              {t.footer.socialHeading}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {t.footer.socialSub}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Telegram */}
            <a
              id="footer-social-telegram"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-[#38BDF8]/60 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Telegram VIP</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">OWLfxPublicChannel</span>
            </a>

            {/* WhatsApp Careline */}
            <a
              id="footer-social-whatsapp"
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-emerald-500/60 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp Careline</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">Hubungi Untuk Sebarang Pertanyaan</span>
            </a>

            {/* TikTok */}
            <a
              id="footer-social-tiktok"
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-pink-500/60 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-950/80 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">TikTok Rasmi</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">wan.owlfx</span>
            </a>

            {/* YouTube */}
            <a
              id="footer-social-youtube"
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-red-500/60 transition-all flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/80 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">YouTube Channel</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">@owlfx.official</span>
            </a>

            {/* Instagram */}
            <a
              id="footer-social-instagram"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-white/5 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center text-center col-span-2 sm:col-span-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 text-[#D4AF37] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">Instagram Media</span>
              <span className="text-[10px] font-mono text-slate-500 mt-0.5">wan.owlfx</span>
            </a>
          </div>
        </div>

        {/* Corporate Legal & Badges Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10">
              <img
                src="/OWLFXpng.png"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('OWLFXpng.png')) {
                    target.src = 'OWLFXpng.png';
                  }
                }}
                alt="OWLFX Logo"
                className="w-4 h-4 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
              />
              <span className="text-white font-bold">{t.footer.securedBy}</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t.footer.ecosystemTag}</span>
          </div>

          <div className="text-center md:text-right text-slate-400 max-w-xl">
            <p>© 2026 OWLFX Institutional Trading Architecture. Hak Cipta Terpelihara.</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="footer-admin-portal-btn"
              type="button"
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-[#D4AF37] flex items-center space-x-1 transition-colors cursor-pointer"
              title="Akses Pentadbir"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
            <button
              id="footer-scroll-top-btn"
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
