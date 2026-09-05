import React, { useState, useMemo } from 'react';
import { RoadtourStateData } from '../types';
import {
  MapPin,
  Calendar,
  Users,
  ZoomIn,
  Clock,
  ArrowRight,
  Compass,
  Edit3,
  Trash2,
  Plus,
  X,
  Save,
  CheckCircle2,
  LogOut,
  Lock
} from 'lucide-react';
import { ShimmerImage } from './ShimmerImage';

interface RoadtourSectionProps {
  statesData: RoadtourStateData[];
  onOpenLightbox: (images: { url: string; caption?: string; title?: string }[], index: number) => void;
  isAdmin?: boolean;
  onUpdateStatesData?: (newStates: RoadtourStateData[]) => void;
  onOpenAdminLogin?: () => void;
  onAdminSignOut?: () => void;
}

export const RoadtourSection: React.FC<RoadtourSectionProps> = ({
  statesData,
  onOpenLightbox,
  isAdmin = false,
  onUpdateStatesData,
  onOpenAdminLogin,
  onAdminSignOut,
}) => {
  // Synchronous, zero-latency state ID initialization with robust fallback
  const [selectedStateId, setSelectedStateId] = useState<string>(() => {
    return statesData && statesData.length > 0 ? statesData[0].id : 'kuala-lumpur';
  });
  const [selectedZone, setSelectedZone] = useState<string>('Semua');

  // Modal 1: Edit Info Negeri state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editHotel, setEditHotel] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editAttendees, setEditAttendees] = useState('');
  const [editStatus, setEditStatus] = useState<'completed' | 'upcoming' | 'coming_soon'>('upcoming');
  const [editHighlight, setEditHighlight] = useState('');

  // Modal 2: Tambah Gambar Baharu state
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Instantaneous synchronous lookup matching ID, Name, or Code
  const currentState = useMemo(() => {
    if (!statesData || statesData.length === 0) return undefined;
    return (
      statesData.find(
        (s) =>
          s.id.toLowerCase() === selectedStateId.toLowerCase() ||
          s.name.toLowerCase() === selectedStateId.toLowerCase() ||
          s.code.toLowerCase() === selectedStateId.toLowerCase()
      ) || statesData[0]
    );
  }, [statesData, selectedStateId]);

  const zones = ['Semua', 'Pantai Timur', 'Selatan', 'Utara', 'Tengah', 'Borneo'];

  const filteredStates = selectedZone === 'Semua'
    ? statesData
    : statesData.filter((s) => s.zone === selectedZone);

  const handleImageClick = (index: number) => {
    if (!currentState?.gallery || currentState.gallery.length === 0) return;
    const formatted = currentState.gallery.map((g) => ({
      url: g.url,
      caption: `[Jelajah ${currentState.name}] ${g.caption}`,
      title: `${currentState.name} Roadtour Album`
    }));
    onOpenLightbox(formatted, index);
  };

  // Open Edit State Info Modal
  const handleOpenEditModal = () => {
    if (!currentState) return;
    setEditHotel(currentState.hotel || '');
    setEditDate(currentState.date || '');
    setEditAttendees(String(currentState.attendees || ''));
    setEditStatus(currentState.status || 'upcoming');
    setEditHighlight(currentState.highlight || '');
    setIsEditModalOpen(true);
  };

  // Save State Info Changes
  const handleSaveStateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editHotel.trim()) {
      showToast('Sila masukkan nama dewan atau hotel.');
      return;
    }

    if (!onUpdateStatesData || !currentState) return;

    const targetId = currentState.id.toLowerCase();
    const targetName = currentState.name.toLowerCase();

    const updated = statesData.map((st) => {
      if (st.id.toLowerCase() === targetId || st.name.toLowerCase() === targetName) {
        return {
          ...st,
          hotel: editHotel.trim(),
          date: editDate.trim() || st.date,
          attendees: editAttendees.trim() || st.attendees,
          status: editStatus,
          highlight: editHighlight.trim() || st.highlight
        };
      }
      return st;
    });

    onUpdateStatesData(updated);
    setIsEditModalOpen(false);
    showToast(`Maklumat acara Roadtour ${currentState.name} berjaya dikemaskini!`);
  };

  // Delete Image from Gallery (Instant execution without blocking iframe window.confirm)
  const handleDeleteImage = (index: number) => {
    if (!currentState || !onUpdateStatesData) return;

    const currentGallery = currentState.gallery || [];
    if (index < 0 || index >= currentGallery.length) return;

    const targetId = currentState.id.toLowerCase();
    const targetName = currentState.name.toLowerCase();

    const updatedGallery = currentGallery.filter((_, i) => i !== index);

    const updatedStates = statesData.map((st) => {
      if (st.id.toLowerCase() === targetId || st.name.toLowerCase() === targetName) {
        return {
          ...st,
          gallery: updatedGallery
        };
      }
      return st;
    });

    onUpdateStatesData(updatedStates);
    showToast(`Gambar berjaya dipadam daripada album ${currentState.name}.`);
  };

  // Add New Image to Gallery
  const handleSaveNewImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      showToast('Sila masukkan pautan URL imej yang sah.');
      return;
    }

    if (!onUpdateStatesData || !currentState) return;

    const newPhoto = {
      url: newImageUrl.trim(),
      caption: newImageCaption.trim() || `Dokumentasi Rasmi Jelajah ${currentState.name}`
    };

    const targetId = currentState.id.toLowerCase();
    const targetName = currentState.name.toLowerCase();

    const updatedStates = statesData.map((st) => {
      if (st.id.toLowerCase() === targetId || st.name.toLowerCase() === targetName) {
        return {
          ...st,
          gallery: [...(st.gallery || []), newPhoto]
        };
      }
      return st;
    });

    onUpdateStatesData(updatedStates);
    setNewImageUrl('');
    setNewImageCaption('');
    setIsAddImageModalOpen(false);
    showToast(`Gambar baharu berjaya dimuat naik ke album ${currentState.name}!`);
  };

  return (
    <section id="roadtour" className="py-24 relative bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Floating In-Section Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-slate-950/95 border border-[#D4AF37]/50 shadow-2xl backdrop-blur-xl flex items-center space-x-3 text-xs font-mono text-[#D4AF37] animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-slate-100 font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Admin Bar Indicator when authenticated */}
        {isAdmin && (
          <div className="mb-8 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#D4AF37]/10 to-slate-900 border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                Mod Pentadbir Aktif • Roadtour Dynamic CMS
              </span>
              <span className="text-slate-400 text-xs font-mono hidden md:inline">
                (Klik butang "Edit Info Negeri" atau "+" untuk kemaskini langsung)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {onOpenAdminLogin && (
                <button
                  type="button"
                  onClick={onOpenAdminLogin}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                >
                  Buka Portal Penuh CMS
                </button>
              )}
              {onAdminSignOut && (
                <button
                  type="button"
                  onClick={onAdminSignOut}
                  className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Keluar</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono mb-4">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>NATIONWIDE PHYSICAL EXPEDITION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Roadtour Jelajah <span className="text-gold-gradient">Komuniti OWLFX</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
              Meliputi 14 negeri di seluruh Malaysia. Membawa pendidikan dagangan bertaraf institusi,
              bedah carta secara langsung, dan agihan faedah komuniti terus ke dewan seminar di negeri anda.
            </p>
          </div>

          {/* Zone Filter Pill Bar */}
          <div className="mt-6 md:mt-0 flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 font-mono text-xs">
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedZone === zone
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* 14-State Selector Grid / Tab System */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>PILIH NEGERI ROADTOUR UNTUK MEMBUKA ALBUM KHAS:</span>
            <div className="flex items-center space-x-3">
              <span className="text-[#D4AF37]">{filteredStates.length} Negeri Tersedia</span>
              {!isAdmin && onOpenAdminLogin && (
                <button
                  type="button"
                  onClick={onOpenAdminLogin}
                  className="text-[11px] text-slate-500 hover:text-[#D4AF37] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                  title="Akses Pentadbir Roadtour"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Access</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {filteredStates.map((st) => {
              const isSelected = st.id === selectedStateId;
              return (
                <button
                  key={st.id}
                  id={`roadtour-state-btn-${st.id}`}
                  type="button"
                  onClick={() => setSelectedStateId(st.id)}
                  className={`group roadtour-state-card p-3 rounded-xl text-left transition-all duration-300 border relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02]'
                      : 'bg-[#0A0F1D]/85 border-white/5 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {/* Active gold line indicator */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFF6D3] via-[#F59E0B] to-[#D4AF37]"></div>
                  )}

                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                        isSelected
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                          : 'bg-slate-800 text-slate-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'
                      }`}
                    >
                      {st.code}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        st.status === 'completed'
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                          : st.status === 'upcoming'
                          ? 'bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                          : 'bg-slate-600'
                      }`}
                      title={st.status}
                    />
                  </div>

                  <div className="font-bold text-sm text-white truncate group-hover:-translate-y-0.5 transition-transform duration-300">
                    {st.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate group-hover:text-slate-300 transition-colors">
                    {st.zone}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected State Special Album Display with Smooth Transition */}
        {currentState && (
          <div
            id={`roadtour-album-${currentState.id}`}
            key={currentState.id}
            className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Ambient subtle glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* State Info Card Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-white/10 mb-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#F59E0B] border border-[#D4AF37]/40">
                    JELAJAH NEGERI {currentState.name.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      currentState.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : currentState.status === 'upcoming'
                        ? 'bg-blue-950 text-sky-400 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400 border border-white/10'
                    }`}
                  >
                    {currentState.status === 'completed'
                      ? '✓ SELESAI DILAKSANAKAN'
                      : currentState.status === 'upcoming'
                      ? '⏳ AKAN BERLANGSUNG (PENDAFTARAN DIBUKA)'
                      : 'AKAN DATANG'}
                  </span>
                </div>

                {/* State Title & Mini "Edit Info Negeri" Button */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentState.hotel}
                  </h3>

                  {isAdmin && (
                    <button
                      id={`edit-info-state-btn-${currentState.id}`}
                      type="button"
                      onClick={handleOpenEditModal}
                      className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                      title="Kemaskini Maklumat Acara Negeri Ini"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Info Negeri</span>
                    </button>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentState.highlight}
                </p>

                {/* Event Highlights Metadata Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>TARIKH ACARA</span>
                    </div>
                    <div className="text-xs font-bold text-white font-mono">{currentState.date}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono mb-1">
                      <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>KEHADIRAN PESERTA</span>
                    </div>
                    <div className="text-xs font-bold text-white font-mono">{currentState.attendees}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono mb-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>LOKASI DEWAN</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate font-mono">{currentState.name}</div>
                  </div>
                </div>
              </div>

              {/* State Cover Feature Box */}
              <div className="lg:col-span-5">
                <div
                  className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl group cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageClick(0);
                  }}
                  onAuxClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ShimmerImage
                    src={currentState.coverImage}
                    alt={currentState.name}
                    priority={true}
                    loading="eager"
                    fallbackSrc="https://i.imgur.com/aCQ6hLX.jpg"
                    containerClassName="relative w-full h-full"
                    imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    badgeLabel={`JELAJAH ${currentState.name.toUpperCase()}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                    <div>
                      <span className="text-[10px] font-mono text-slate-300 block">DOKUMENTASI RASMI</span>
                      <span className="text-base font-bold text-white font-mono">{currentState.hotel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Image Gallery Grid */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-base font-bold text-white">
                    Album Liputan & Foto Acara ({currentState.name})
                  </h4>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    • {currentState.gallery?.length || 0} Foto
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setIsAddImageModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs font-mono flex items-center space-x-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Gambar</span>
                    </button>
                  )}
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    Klik gambar untuk zum skrin penuh (Lightbox HD)
                  </span>
                </div>
              </div>

              {currentState.gallery && currentState.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {currentState.gallery.map((img, idx) => (
                    <div
                      key={`${currentState.id}-${idx}-${img.url}`}
                      id={`gallery-item-${currentState.id}-${idx}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleImageClick(idx);
                      }}
                      onAuxClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="group relative h-48 rounded-xl overflow-hidden bg-slate-900 border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shadow-md"
                    >
                      <ShimmerImage
                        src={img.url}
                        alt={img.caption || `Foto ${currentState.name}`}
                        loading="lazy"
                        fallbackSrc="https://drive.google.com/file/d/1tm2SG-Y3tJya5AjgYDkOipVLD3VyxZRX/view?usp=drive_link"
                        containerClassName="relative w-full h-full"
                        imageClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        badgeLabel={`OWLFX ${currentState.code}`}
                      />

                      {/* Admin Delete Button */}
                      {isAdmin && (
                        <button
                          type="button"
                          id={`delete-img-btn-${currentState.id}-${idx}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(idx);
                          }}
                          className="absolute top-2 right-2 z-30 p-2 rounded-lg bg-rose-950/90 text-rose-400 hover:bg-rose-900 hover:text-white border border-rose-500/50 shadow-lg transition-all active:scale-90 cursor-pointer"
                          title="Padam Gambar Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
                        <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                          {img.caption}
                        </p>
                      </div>

                      {/* Hover Overlay Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-20">
                        <div className="p-2.5 rounded-full bg-[#D4AF37] text-slate-950 shadow-xl">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Image Card at the end of the gallery grid */}
                  {isAdmin && (
                    <button
                      type="button"
                      id={`add-gallery-img-card-${currentState.id}`}
                      onClick={() => setIsAddImageModalOpen(true)}
                      className="group relative h-48 rounded-xl border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-slate-900/40 hover:bg-[#D4AF37]/10 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 cursor-pointer shadow-md"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform mb-2">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-white font-mono">
                        Tambah Gambar Baharu
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-1">
                        + Pautan Imgur/CDN ke {currentState.name}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                /* Clean Placeholder for Upcoming / Coming Soon */
                <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 border-dashed text-center flex flex-col items-center justify-center">
                  <Clock className="w-10 h-10 text-[#D4AF37] mb-3 animate-pulse" />
                  <h4 className="text-lg font-bold text-white mb-1">
                    Album Liputan {currentState.name} Sedang Disiapkan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
                    Siri jelajah bagi negeri {currentState.name} dijadualkan pada {currentState.date}.
                    Pendaftaran kerusi VIP sedang dibuka sekarang sebelum kuota dewan penuh.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      id="roadtour-reserve-btn"
                      href="https://owlfx.my/my/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group btn-luxury-shimmer btn-gold-luxury inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] text-slate-950 font-extrabold text-xs tracking-wider uppercase border border-amber-300/60 cursor-pointer"
                    >
                      <span>Tempah Kerusi VIP Negeri Ini</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
                    </a>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => setIsAddImageModalOpen(true)}
                        className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-bold cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Muat Naik Foto Pertama</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 1: KEMASKINI ACARA ROADTOUR (DYNAMIC LOCATION & HOTEL CMS)         */}
        {/* ========================================================================= */}
        {isEditModalOpen && currentState && (
          <div
            id="edit-roadtour-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setIsEditModalOpen(false)}
          >
            <div
              id="edit-roadtour-modal"
              className="relative max-w-lg w-full rounded-3xl bg-[#0B0F19] border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] p-6 sm:p-7 overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white font-mono">
                      Kemaskini Acara Roadtour
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Jelajah Komuniti • Negeri {currentState.name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveStateInfo} className="space-y-4">
                {/* Medan Input 1: Nama Negeri (Readonly) */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Medan Input 1: Nama Negeri (Readonly):
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={currentState.name}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono cursor-not-allowed opacity-80"
                  />
                </div>

                {/* Medan Input 2: Lokasi / Nama Dewan / Hotel */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Medan Input 2: Lokasi / Nama Dewan / Hotel *:
                  </label>
                  <input
                    type="text"
                    required
                    value={editHotel}
                    onChange={(e) => setEditHotel(e.target.value)}
                    placeholder="cth: Hotel Grand Riverview, Kota Bharu"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                {/* Medan Input 3: Tarikh Acara */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Medan Input 3: Tarikh Acara:
                  </label>
                  <input
                    type="text"
                    required
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    placeholder="cth: 15 Oktober 2026"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                {/* Medan Input 4: Anggaran / Angka Kehadiran */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Medan Input 4: Anggaran / Angka Kehadiran:
                  </label>
                  <input
                    type="text"
                    required
                    value={editAttendees}
                    onChange={(e) => setEditAttendees(e.target.value)}
                    placeholder="cth: 350 Peserta"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                {/* Medan Input 5: Status Acara (Dropdown) */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Medan Input 5: Status Acara (Pilih Status):
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as RoadtourStateData['status'])}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="coming_soon">Akan Datang</option>
                    <option value="upcoming">Pendaftaran Dibuka</option>
                    <option value="completed">Selesai</option>
                  </select>
                </div>

                {/* Keterangan Highlight */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Keterangan Sesi / Sorotan Utama:
                  </label>
                  <textarea
                    rows={2}
                    value={editHighlight}
                    onChange={(e) => setEditHighlight(e.target.value)}
                    placeholder="Keterangan singkat mengenai sesi..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Butang Tindakan */}
                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] text-slate-950 font-extrabold font-mono text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: TAMBAH GAMBAR BAHARU KE ALBUM NEGERI                           */}
        {/* ========================================================================= */}
        {isAddImageModalOpen && currentState && (
          <div
            id="add-image-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setIsAddImageModalOpen(false)}
          >
            <div
              id="add-image-modal"
              className="relative max-w-md w-full rounded-3xl bg-[#0B0F19] border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] p-6 sm:p-7 overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white font-mono">
                      Tambah Gambar Baharu
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Album Negeri {currentState.name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddImageModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNewImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Pautan Imej (URL Langsung Imgur / CDN / Foto) *:
                  </label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://i.imgur.com/... atau URL foto HD"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Kapsyen Gambar / Keterangan Sesi:
                  </label>
                  <input
                    type="text"
                    value={newImageCaption}
                    onChange={(e) => setNewImageCaption(e.target.value)}
                    placeholder="cth: Sesi live chart analysis bersama 200+ trader"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                {newImageUrl && (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-2">
                    <p className="text-[10px] font-mono text-slate-400 mb-1">Pratonton Imej:</p>
                    <img
                      src={newImageUrl}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddImageModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] text-slate-950 font-extrabold font-mono text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Muat Naik / Simpan ke Album</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
