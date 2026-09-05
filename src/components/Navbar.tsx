import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.groupSupport, href: '#vip-signal' },
    { name: t.nav.owlAlgo, href: '#owl-algo' },
    { name: t.nav.roadtour, href: '#roadtour' },
    { name: t.nav.ibDevelopment, href: '#ib-development' },
    { name: t.nav.education, href: '#education' },
    { name: t.nav.community, href: '#community' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 backdrop-blur-md bg-black/60 border-b border-white/10 shadow-2xl'
          : 'py-3.5 backdrop-blur-md bg-black/40 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Official OWLFX PNG */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <img
                src="/OWLFXpng.png"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.endsWith('OWLFXpng.png')) {
                    target.src = 'OWLFXpng.png';
                  }
                }}
                alt="OWLFX Official Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-105 group-hover:drop-shadow-[0_0_22px_rgba(212,175,55,0.45)] transition-all duration-300"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-bold tracking-tighter text-white uppercase font-sans">
                  OWL<span className="text-[#D4AF37]">FX</span>
                </span>
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 tracking-wider">
                  {t.nav.badge}
                </span>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-slate-400">
                {t.nav.sub}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav-menu"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2 backdrop-blur-xl bg-white/5 p-1 rounded-full border border-white/10"
          >
            {navLinks.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400 hover:text-[#D4AF37] rounded-full transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Switcher: Frosted Glass Pill [MY / EN] */}
            <div
              id="language-switcher"
              className="flex items-center backdrop-blur-xl bg-white/5 p-0.5 rounded-full border border-white/10 text-xs font-mono"
            >
              <button
                id="language-switch-my"
                type="button"
                onClick={() => setLanguage('MY')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'MY'
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bahasa Melayu"
              >
                🇲🇾 MY
              </button>
              <button
                id="language-switch-en"
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'EN'
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Quick Action: Daftar VIP - Direct Link */}
            <a
              id="navbar-cta-vip"
              href="https://owlfx.my/interested?action=register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-shimmer btn-gold-luxury px-6 py-2 rounded-full bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] text-slate-950 text-xs font-black flex items-center justify-center space-x-1 cursor-pointer border border-amber-300/60"
            >
              <span className="tracking-wider">{t.nav.ctaVip}</span>
            </a>

            {/* Admin CMS Portal Trigger */}
            <button
              id="navbar-admin-trigger"
              type="button"
              onClick={onOpenAdmin}
              className="p-2 rounded-full backdrop-blur-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#D4AF37] border border-white/10 transition-colors cursor-pointer"
              title="Panel Pengurusan Kandungan (Admin CMS)"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              id="mobile-language-toggle"
              type="button"
              onClick={() => setLanguage(language === 'MY' ? 'EN' : 'MY')}
              className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 font-mono text-slate-200 cursor-pointer"
            >
              {language === 'MY' ? '🇲🇾 MY' : '🇬🇧 EN'}
            </button>

            <button
              id="mobile-hamburger-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-200 cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="sm:hidden mt-3 p-5 rounded-3xl backdrop-blur-xl bg-black/80 border border-white/10 shadow-2xl animate-in slide-in-from-top duration-200"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-[#D4AF37] hover:bg-white/5 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                <a
                  id="mobile-cta-vip"
                  href="https://owlfx.my/interested?action=register"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-luxury-shimmer btn-gold-luxury w-full py-3 rounded-full text-center text-xs font-black text-slate-950 bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] border border-amber-300/60 block"
                >
                  {t.nav.ctaVip}
                </a>

                <button
                  id="mobile-admin-btn"
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-full text-center text-xs font-mono text-slate-400 hover:text-[#D4AF37] bg-white/5 border border-white/10 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.nav.adminCms}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
