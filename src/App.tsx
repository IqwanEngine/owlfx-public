import { useState, useEffect } from 'react';
import { Region, RoadtourStateData, IBRegionData, CommunityLinks, LiveEventAlertData } from './types';
import { INITIAL_ROADTOUR_STATES, IB_REGIONS_DATA, INITIAL_COMMUNITY_LINKS, INITIAL_LIVE_EVENT_ALERTS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { VipSignalSection } from './components/VipSignalSection';
import { OwlAlgoSection } from './components/OwlAlgoSection';
import { RoadtourSection } from './components/RoadtourSection';
import { IBDevelopmentSection } from './components/IBDevelopmentSection';
import { BasicEducationSection } from './components/BasicEducationSection';
import { CommunityFooterSection } from './components/CommunityFooterSection';
import { LightboxModal } from './components/LightboxModal';
import { RegistrationModal, RegistrationTabType } from './components/RegistrationModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { LiveEventAlert } from './components/LiveEventAlert';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  // Anti-theft warning toast state
  const [securityToast, setSecurityToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  // Global Anti-Theft Protection (Sekat Right-Click, Drag Gambar & Inspect Element)
  useEffect(() => {
    let toastTimer: ReturnType<typeof setTimeout>;

    const triggerSecurityNotice = (msg: string) => {
      setSecurityToast({ show: true, message: msg });
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        setSecurityToast({ show: false, message: '' });
      }, 2400);
    };

    // 1. Sekat Klik Kanan (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerSecurityNotice('Perlindungan Media & Hak Cipta OWLFX Aktif. Klik kanan disekat.');
    };

    // 2. Sekat Drag Imej / Media (Anti-Drag)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      triggerSecurityNotice('Perlindungan Kandungan: Penarikan imej (drag-and-drop) disekat.');
    };

    // 3. Sekat Kekunci Inspect Element & Pintasan Pembangun (F12, Ctrl+Shift+I, Ctrl+U, dll.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityNotice('Pintasan pembangun disekat untuk melindungi integriti platform.');
        return;
      }

      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityNotice('Pemeriksaan elemen (Inspect Element) disekat.');
        return;
      }

      // Ctrl+U (View Source)
      if (ctrlOrCmd && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityNotice('Paparan kod sumber disekat.');
        return;
      }

      // Ctrl+S (Save Page)
      if (ctrlOrCmd && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityNotice('Penyimpanan halaman secara luar talian disekat.');
        return;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(toastTimer);
    };
  }, []);
  // Region State
  const [currentRegion] = useState<Region>(() => {
    const saved = localStorage.getItem('owlfx_region');
    return (saved === 'ID' ? 'ID' : 'MY') as Region;
  });

  // Dynamic Content States with LocalStorage Persistence
  const [statesData, setStatesData] = useState<RoadtourStateData[]>(() => {
    const saved = localStorage.getItem('owlfx_roadtour_states');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved roadtour states', e);
      }
    }
    return INITIAL_ROADTOUR_STATES;
  });

  const [ibData, setIBData] = useState<Record<'MY' | 'ID', IBRegionData>>(() => {
    const saved = localStorage.getItem('owlfx_ib_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved ib data', e);
      }
    }
    return IB_REGIONS_DATA;
  });

  const [communityLinks, setCommunityLinks] = useState<CommunityLinks>(() => {
    const saved = localStorage.getItem('owlfx_community_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved community links', e);
      }
    }
    return INITIAL_COMMUNITY_LINKS;
  });

  // Live Event Alerts State (Array of alerts persisted to localStorage)
  const [eventAlerts, setEventAlerts] = useState<LiveEventAlertData[]>(() => {
    const saved = localStorage.getItem('owlfx_live_event_alerts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved live event alerts', e);
      }
    }
    // Backward compatibility for single alert stored previously
    const singleSaved = localStorage.getItem('owlfx_live_event_alert');
    if (singleSaved) {
      try {
        const parsedSingle = JSON.parse(singleSaved);
        if (parsedSingle && parsedSingle.eventName) {
          return [{ id: parsedSingle.id || `alert-${Date.now()}`, ...parsedSingle }];
        }
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_LIVE_EVENT_ALERTS;
  });

  // Modals States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; caption?: string; title?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [regModalOpen, setRegModalOpen] = useState(false);
  const [regModalTab] = useState<RegistrationTabType>('my-community');

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const token = sessionStorage.getItem('owlfx_admin_auth') || localStorage.getItem('owlfx_admin_auth');
    return !!token;
  });

  const handleAdminLoginSuccess = (token: string) => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('owlfx_admin_auth', token);
    localStorage.setItem('owlfx_admin_auth', token);
    setSecurityToast({
      show: true,
      message: 'Hi IqwanEngine. Sesi Pentadbir OWLFX telah disahkan dengan selamat.',
    });
  };

  const handleAdminSignOut = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.clear();
    localStorage.removeItem('owlfx_admin_auth');
    setSecurityToast({
      show: true,
      message: 'Sesi Pentadbir telah dilog keluar dan cache dipadamkan.',
    });
  };

  // Sync states data to local storage
  const handleUpdateStatesData = (newStates: RoadtourStateData[]) => {
    setStatesData(newStates);
    localStorage.setItem('owlfx_roadtour_states', JSON.stringify(newStates));
  };

  // Sync IB data to local storage
  const handleUpdateIBData = (newIBData: Record<'MY' | 'ID', IBRegionData>) => {
    setIBData(newIBData);
    localStorage.setItem('owlfx_ib_data', JSON.stringify(newIBData));
  };

  // Sync community links to local storage
  const handleUpdateCommunityLinks = (newLinks: CommunityLinks) => {
    setCommunityLinks(newLinks);
    localStorage.setItem('owlfx_community_links', JSON.stringify(newLinks));
  };

  // Sync event alerts array to local storage
  const handleUpdateEventAlerts = (newEventAlerts: LiveEventAlertData[]) => {
    setEventAlerts(newEventAlerts);
    localStorage.setItem('owlfx_live_event_alerts', JSON.stringify(newEventAlerts));
  };

  // Reset all to default initial data
  const handleResetDefaults = () => {
    if (window.confirm('Adakah anda pasti ingin memulihkan semua data galeri dan pautan ke tetapan asal?')) {
      setStatesData(INITIAL_ROADTOUR_STATES);
      setIBData(IB_REGIONS_DATA);
      setCommunityLinks(INITIAL_COMMUNITY_LINKS);
      setEventAlerts(INITIAL_LIVE_EVENT_ALERTS);
      localStorage.removeItem('owlfx_roadtour_states');
      localStorage.removeItem('owlfx_ib_data');
      localStorage.removeItem('owlfx_community_links');
      localStorage.removeItem('owlfx_live_event_alerts');
      localStorage.removeItem('owlfx_live_event_alert');
    }
  };

  // Lightbox handlers
  const handleOpenLightbox = (images: { url: string; caption?: string; title?: string }[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleExploreAlgo = () => {
    const el = document.getElementById('owl-algo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-[#E2E8F0] relative overflow-x-hidden font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Frosted Glass Ambient Lighting Mesh & Crisp Grid */}
      <div
        className="fixed inset-0 opacity-25 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% -20%, #06B6D4 0%, transparent 55%), radial-gradient(circle at 85% 85%, #D4AF37 0%, transparent 45%), radial-gradient(circle at 10% 50%, #2563EB 0%, transparent 40%)',
        }}
      />
      <div
        className="fixed inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 1. Header & High-Tech Sticky Glass Navbar */}
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main id="main-content">
        {/* A. Hero Section with Dual CTA & Dynamic Ticker Bar */}
        <HeroSection
          onExploreAlgo={handleExploreAlgo}
        />

        {/* B. About Us - Editorial Corporate Luxury & 3 Pillars */}
        <AboutSection />

        {/* C. VIP Signal & Support (4 Cards + Self-Rebate Calculator + Setup Proofs) */}
        <VipSignalSection
          onOpenLightbox={handleOpenLightbox}
        />

        {/* D. OWL ALGO Indicator (Interactive TradingView Mockup, Backtests, Testimonials) */}
        <OwlAlgoSection
          onOpenLightbox={handleOpenLightbox}
        />

        {/* E. Roadtour (14 Malaysian States Grid, Album Smooth Transitions, Lightbox) */}
        <RoadtourSection
          statesData={statesData}
          onOpenLightbox={handleOpenLightbox}
          isAdmin={isAdminAuthenticated}
          onUpdateStatesData={handleUpdateStatesData}
          onOpenAdminLogin={() => setAdminModalOpen(true)}
          onAdminSignOut={handleAdminSignOut}
        />

        {/* F. IB Development Program (Dual Region Albums MY & ID + Action Routes) */}
        <IBDevelopmentSection
          currentRegion={currentRegion}
          ibData={ibData}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* G. Basic Education (Roadmap & Modern Video Player Container) */}
        <BasicEducationSection
        />
      </main>

      {/* H. Find Us & Community Footer */}
      <CommunityFooterSection
        communityLinks={communityLinks}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Full-Screen Image Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Multi-Purpose Registration Modal */}
      <RegistrationModal
        isOpen={regModalOpen}
        onClose={() => setRegModalOpen(false)}
        defaultTab={regModalTab}
      />

      {/* Admin CMS Portal Modal */}
      <AdminCMSModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        statesData={statesData}
        onUpdateStatesData={handleUpdateStatesData}
        ibData={ibData}
        onUpdateIBData={handleUpdateIBData}
        communityLinks={communityLinks}
        onUpdateCommunityLinks={handleUpdateCommunityLinks}
        onResetDefaults={handleResetDefaults}
        isAdminAuthenticated={isAdminAuthenticated}
        onLoginSuccess={handleAdminLoginSuccess}
        onSignOut={handleAdminSignOut}
        eventAlerts={eventAlerts}
        onUpdateEventAlerts={handleUpdateEventAlerts}
      />

      {/* Floating Live Event Alert (Sudut Bawah Kanan) */}
      <LiveEventAlert alerts={eventAlerts} />

      {/* Floating Anti-Theft Security Toast Notification */}
      {securityToast.show && (
        <div
          id="anti-theft-toast"
          role="alert"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-950/95 border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none"
        >
          <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs font-mono text-slate-200 tracking-wide font-medium whitespace-nowrap">
            {securityToast.message}
          </p>
        </div>
      )}
    </div>
  );
}
