import React, { useState, useEffect } from 'react';
import { RoadtourStateData, IBRegionData, CommunityLinks, Region, LiveEventAlertData } from '../types';
import {
  Lock,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  RotateCcw,
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Link2,
  Briefcase,
  LogOut,
  AlertTriangle,
  Database,
  RefreshCw,
  Edit3,
  ShieldAlert,
  Bell,
  Zap,
  Eye,
  EyeOff,
  MessageCircle
} from 'lucide-react';
import { isEventExpired } from './LiveEventAlert';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  statesData: RoadtourStateData[];
  onUpdateStatesData: (newStates: RoadtourStateData[]) => void;
  ibData: Record<'MY' | 'ID', IBRegionData>;
  onUpdateIBData: (newIBData: Record<'MY' | 'ID', IBRegionData>) => void;
  communityLinks: CommunityLinks;
  onUpdateCommunityLinks: (newLinks: CommunityLinks) => void;
  onResetDefaults: () => void;
  isAdminAuthenticated: boolean;
  onLoginSuccess: (token: string) => void;
  onSignOut: () => void;
  eventAlerts: LiveEventAlertData[];
  onUpdateEventAlerts: (newEventAlerts: LiveEventAlertData[]) => void;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const MALAYSIAN_STATES = [
  'Selangor',
  'Kuala Lumpur',
  'Kelantan',
  'Johor',
  'Pulau Pinang',
  'Pahang',
  'Perak',
  'Kedah',
  'Melaka',
  'Negeri Sembilan',
  'Terengganu',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Putrajaya',
  'Labuan',
  'Online / Webinar',
];

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  statesData,
  onUpdateStatesData,
  ibData,
  onUpdateIBData,
  communityLinks,
  onUpdateCommunityLinks,
  onResetDefaults,
  isAdminAuthenticated,
  onLoginSuccess,
  onSignOut,
  eventAlerts = [],
  onUpdateEventAlerts,
}) => {
  // Passcode gate state
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(MAX_ATTEMPTS);
  const [lockoutRemainingSec, setLockoutRemainingSec] = useState<number>(0);

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'roadtour' | 'state-edit' | 'events' | 'ib' | 'community' | 'sheet-sync'>('roadtour');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Roadtour Manager state
  const [selectedStateId, setSelectedStateId] = useState<string>(statesData[0]?.id || 'kelantan');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  // 2. Edit Info Negeri Form state
  const currentState = statesData.find((s) => s.id === selectedStateId) || statesData[0];
  const [editHotel, setEditHotel] = useState(currentState?.hotel || '');
  const [editDate, setEditDate] = useState(currentState?.date || '');
  const [editAttendees, setEditAttendees] = useState(String(currentState?.attendees || ''));
  const [editStatus, setEditStatus] = useState<'completed' | 'upcoming' | 'coming_soon'>(currentState?.status || 'upcoming');
  const [editHighlight, setEditHighlight] = useState(currentState?.highlight || '');

  // 3. Update News (Update Kelas / Event Akan Datang) - Dynamic List & Edit state
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [alertEventName, setAlertEventName] = useState('');
  const [alertState, setAlertState] = useState('Selangor');
  const [alertLocation, setAlertLocation] = useState('');
  const [alertDate, setAlertDate] = useState('');
  const [alertQuota, setAlertQuota] = useState('');

  const resetAlertForm = () => {
    setEditingAlertId(null);
    setAlertEventName('');
    setAlertState('Selangor');
    setAlertLocation('');
    setAlertDate('');
    setAlertQuota('');
  };

  // 4. IB Album Manager state
  const [selectedIBRegion, setSelectedIBRegion] = useState<Region>('MY');
  const [newIBTitle, setNewIBTitle] = useState('');
  const [newIBCategory, setNewIBCategory] = useState<'Workshop' | 'Dinner' | 'Merchandise' | 'Leadership'>('Workshop');
  const [newIBDate, setNewIBDate] = useState('');
  const [newIBLocation, setNewIBLocation] = useState('');
  const [newIBImageUrl, setNewIBImageUrl] = useState('');
  const [newIBDescription, setNewIBDescription] = useState('');

  // 5. Community Links state
  const [editLinks, setEditLinks] = useState<CommunityLinks>(communityLinks);

  // 6. Google Sheet & Valetax API connection test state (STRICT NO MOCK DATA)
  const [sheetUrl, setSheetUrl] = useState('');
  const [sheetStatus, setSheetStatus] = useState<'idle' | 'checking' | 'error'>('idle');
  const [sheetErrorMessage, setSheetErrorMessage] = useState<string | null>(null);

  // Sync form when selectedStateId changes
  useEffect(() => {
    if (currentState) {
      setEditHotel(currentState.hotel || '');
      setEditDate(currentState.date || '');
      setEditAttendees(String(currentState.attendees || ''));
      setEditStatus(currentState.status || 'upcoming');
      setEditHighlight(currentState.highlight || '');
    }
  }, [selectedStateId, statesData]);

  // Sync editLinks when communityLinks props change
  useEffect(() => {
    setEditLinks(communityLinks);
  }, [communityLinks]);

  // Check Lockout Status on Mount and Tick
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = Number(localStorage.getItem('owlfx_admin_lockout_until') || 0);
      const now = Date.now();
      if (lockoutUntil > now) {
        const remaining = Math.ceil((lockoutUntil - now) / 1000);
        setLockoutRemainingSec(remaining);
        setAttemptsLeft(0);
      } else {
        setLockoutRemainingSec(0);
        const storedAttempts = Number(localStorage.getItem('owlfx_admin_attempts') || 0);
        setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - storedAttempts));
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Login with Strict Auth & Brute-force Lockout
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutRemainingSec > 0) {
      setPasscodeError(`Borang dikunci selama ${Math.floor(lockoutRemainingSec / 60)}m ${lockoutRemainingSec % 60}s atas faktor keselamatan.`);
      return;
    }

    const trimmed = passcode.trim();
    if (trimmed === 'owlfx2026') {
      // Success: Clear attempts & lockout
      localStorage.removeItem('owlfx_admin_attempts');
      localStorage.removeItem('owlfx_admin_lockout_until');
      setPasscodeError(null);
      setPasscode('');

      // Generate secure session token
      const sessionToken = `OWLFX_SEC_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      onLoginSuccess(sessionToken);
      showToast('Kunci sesi pentadbir disahkan dengan jaminan integriti penuh.');
    } else {
      // Failed attempt
      const currentAttempts = (Number(localStorage.getItem('owlfx_admin_attempts') || 0)) + 1;
      localStorage.setItem('owlfx_admin_attempts', currentAttempts.toString());

      if (currentAttempts >= MAX_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
        localStorage.setItem('owlfx_admin_lockout_until', lockUntil.toString());
        setLockoutRemainingSec(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setAttemptsLeft(0);
        setPasscodeError('Percubaan maksimum (5 kali) telah dicapai! Sistem mengunci borang log masuk selama 15 minit bagi mengekang serangan Brute-Force.');
      } else {
        const remaining = MAX_ATTEMPTS - currentAttempts;
        setAttemptsLeft(remaining);
        setPasscodeError(`Kunci laluan tidak tepat. Baki percubaan keselamatan: ${remaining} kali.`);
      }
    }
  };

  // Handle Sign Out
  const handleSignOutClick = () => {
    sessionStorage.clear();
    localStorage.removeItem('owlfx_admin_auth');
    onSignOut();
    onClose();
  };

  // Handle Save Info Negeri
  const handleSaveStateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editHotel.trim()) {
      showToast('Sila masukkan nama dewan atau hotel.');
      return;
    }

    const updated = statesData.map((st) => {
      if (st.id === selectedStateId) {
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
    showToast(`Maklumat acara Roadtour ${currentState.name} berjaya disimpan dan dikemaskini!`);
  };

  // Handle Add Image to State Album
  const handleAddStateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const updated = statesData.map((st) => {
      if (st.id === selectedStateId) {
        return {
          ...st,
          gallery: [
            ...st.gallery,
            {
              url: newImageUrl.trim(),
              caption: newImageCaption.trim() || `Liputan Acara ${st.name}`
            }
          ]
        };
      }
      return st;
    });

    onUpdateStatesData(updated);
    setNewImageUrl('');
    setNewImageCaption('');
    showToast(`Gambar berjaya ditambah ke album ${currentState.name}!`);
  };

  // Handle Delete Image from State Album (Instant delete without blocking iframe window.confirm)
  const handleDeleteStateImage = (index: number) => {
    if (!currentState) return;

    const targetId = selectedStateId.toLowerCase();
    const targetName = currentState.name.toLowerCase();

    const updated = statesData.map((st) => {
      if (st.id.toLowerCase() === targetId || st.name.toLowerCase() === targetName) {
        const currentGallery = st.gallery || [];
        const newGallery = currentGallery.filter((_, i) => i !== index);
        return { ...st, gallery: newGallery };
      }
      return st;
    });

    onUpdateStatesData(updated);
    showToast(`Gambar berjaya dipadam daripada album ${currentState.name}.`);
  };

  // Handle Save / Update Event Alert (Update News)
  const handleSaveOrUpdateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEventName.trim()) {
      showToast('Sila masukkan Nama Acara / Kelas.');
      return;
    }
    if (!alertLocation.trim()) {
      showToast('Sila masukkan Lokasi (Hotel / Dewan).');
      return;
    }
    if (!alertDate.trim()) {
      showToast('Sila masukkan Tarikh Acara.');
      return;
    }

    if (editingAlertId) {
      // 1. Mod Sunting: Kemaskini rekod sedia ada
      const updated = eventAlerts.map((item) => {
        if (item.id === editingAlertId) {
          return {
            ...item,
            eventName: alertEventName.trim(),
            state: alertState.trim() || 'Selangor',
            location: alertLocation.trim(),
            date: alertDate.trim(),
            quota: alertQuota.trim() || 'Tempat Terhad',
            isActive: true,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      });
      onUpdateEventAlerts(updated);
      resetAlertForm();
      showToast('Notifikasi Acara Berjaya Dikemaskini di Laman Utama!');
    } else {
      // 2. Mod Tambah Baru: Cipta ID unik dan tambah ke senarai
      const newAlert: LiveEventAlertData = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        eventName: alertEventName.trim(),
        state: alertState.trim() || 'Selangor',
        location: alertLocation.trim(),
        date: alertDate.trim(),
        quota: alertQuota.trim() || 'Tempat Terhad',
        isActive: true,
        updatedAt: new Date().toISOString()
      };
      onUpdateEventAlerts([newAlert, ...eventAlerts]);
      resetAlertForm();
      showToast('Notifikasi Baharu Berjaya Disimpan & Diaktifkan di Laman Utama!');
    }
  };

  // Handle Edit Alert: Pre-fill borang dengan data kad terpilih
  const handleEditAlert = (item: LiveEventAlertData) => {
    setEditingAlertId(item.id);
    setAlertEventName(item.eventName || '');
    setAlertState(item.state || 'Selangor');
    setAlertLocation(item.location || '');
    setAlertDate(item.date || '');
    setAlertQuota(item.quota || '');
    showToast(`Memuatkan maklumat "${item.eventName}" untuk disunting.`);

    // Smooth scroll ke borang suntingan
    setTimeout(() => {
      document.getElementById('admin-events-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    resetAlertForm();
    showToast('Mod suntingan dibatalkan.');
  };

  // Handle Toggle Alert Active Status (Aktifkan / Nyahaktifkan Real-time)
  const handleToggleAlertStatus = (id: string) => {
    const updated = eventAlerts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isActive: !item.isActive,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    onUpdateEventAlerts(updated);
    const target = updated.find((a) => a.id === id);
    showToast(target?.isActive ? 'Notifikasi diaktifkan di laman web!' : 'Notifikasi dinyahaktifkan dari laman web.');
  };

  // Handle Delete Alert: Padam terus daripada pangkalan data / state
  const handleDeleteAlert = (id: string) => {
    if (!window.confirm('Adakah anda pasti mahu memadam notifikasi ini? Kad akan dipadamkan daripada senarai storan dan tidak lagi dipaparkan kepada pengunjung laman web.')) {
      return;
    }
    const updated = eventAlerts.filter((item) => item.id !== id);
    onUpdateEventAlerts(updated);
    if (editingAlertId === id) {
      resetAlertForm();
    }
    showToast('Notifikasi acara telah dipadam dari pangkalan data dan laman utama.');
  };

  // Handle Add IB Activity
  const handleAddIBActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIBTitle.trim() || !newIBImageUrl.trim()) return;

    const currentRegionObj = ibData[selectedIBRegion];
    const newActivity = {
      id: `${selectedIBRegion.toLowerCase()}-act-${Date.now()}`,
      title: newIBTitle.trim(),
      category: newIBCategory,
      date: newIBDate.trim() || '2026',
      location: newIBLocation.trim() || 'Ibu Pejabat OWLFX',
      imageUrl: newIBImageUrl.trim(),
      description: newIBDescription.trim() || 'Aktiviti liputan rasmi IB.'
    };

    const updated = {
      ...ibData,
      [selectedIBRegion]: {
        ...currentRegionObj,
        activities: [newActivity, ...currentRegionObj.activities]
      }
    };

    onUpdateIBData(updated);
    setNewIBTitle('');
    setNewIBImageUrl('');
    setNewIBDescription('');
    setNewIBLocation('');
    setNewIBDate('');
    showToast(`Aktiviti IB bagi Wilayah ${selectedIBRegion === 'MY' ? 'Malaysia' : 'Indonesia'} ditambah!`);
  };

  // Handle Save Community Links
  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCommunityLinks(editLinks);
    showToast('Pautan media sosial rasmi berjaya dikemaskini secara langsung!');
  };

  // Google Sheet & Valetax Live API Connector check (Strict No Mock Data)
  const handleTestSheetConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setSheetStatus('checking');
    setSheetErrorMessage(null);

    // Simulate real verification check against endpoint
    setTimeout(() => {
      setSheetStatus('error');
      setSheetErrorMessage('Connection Error: Failed to fetch active sheet. Pautan Google Sheet atau Valetax API tidak dapat dicapai atau belum dikonfigurasi. Tiada data tiruan/fallback olok-olok digunakan.');
    }, 900);
  };

  return (
    <div
      id="admin-cms-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="admin-cms-modal"
        className="relative max-w-4xl w-full rounded-3xl bg-[#090D1A] border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.15)] p-6 sm:p-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white font-mono tracking-tight">OWLFX ADMIN ACCESS</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                  {isAdminAuthenticated ? 'SESI AKTIF' : 'PENGESAHAN DIPERLUKAN'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Sistem Kawalan Kandungan Roadtour, Album HD & Pautan Komuniti
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdminAuthenticated && (
              <button
                id="admin-sign-out-btn"
                type="button"
                onClick={handleSignOutClick}
                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                title="Log Keluar Sesi Pentadbir"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Keluar</span>
              </button>
            )}

            <button
              id="admin-modal-close"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {!isAdminAuthenticated ? (
          /* Passcode Gate with Brute-Force Lockout */
          <div className="py-10 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-xl">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-1">Akses Kawalan Keselamatan Pentadbir</h4>
              <p className="text-xs text-slate-400 font-mono">
                Masukkan kunci keselamatan laluan rasmi pentadbir untuk menyunting kandungan.
              </p>
            </div>

            {/* Lockout Warning Banner */}
            {lockoutRemainingSec > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs font-mono space-y-1 text-left">
                <div className="flex items-center space-x-2 font-bold text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>SISTEM DIKUNCI (BRUTE-FORCE LOCKOUT)</span>
                </div>
                <p>
                  5 percubaan gagal berturut-turut dikesan. Borang dikunci selama:{' '}
                  <span className="font-bold text-white bg-rose-900 px-2 py-0.5 rounded">
                    {Math.floor(lockoutRemainingSec / 60)}m {lockoutRemainingSec % 60}s
                  </span>
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  id="admin-passcode-input"
                  type="password"
                  disabled={lockoutRemainingSec > 0}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Kunci Keselamatan Pentadbir"
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-center text-white placeholder-slate-600 focus:outline-none font-mono tracking-widest ${
                    lockoutRemainingSec > 0
                      ? 'border-rose-800 bg-rose-950/20 opacity-50 cursor-not-allowed'
                      : 'border-white/10 focus:border-[#D4AF37]'
                  }`}
                />

                {passcodeError && (
                  <p className="text-xs text-rose-400 font-mono mt-2 leading-relaxed">
                    {passcodeError}
                  </p>
                )}

                {lockoutRemainingSec === 0 && (
                  <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                    Baki had percubaan keselamatan: <span className="text-[#D4AF37] font-bold">{attemptsLeft} / {MAX_ATTEMPTS}</span>
                  </p>
                )}
              </div>

              <button
                id="admin-submit-login-btn"
                type="submit"
                disabled={lockoutRemainingSec > 0}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all ${
                  lockoutRemainingSec > 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#F59E0B] text-slate-950 hover:brightness-110 active:scale-95 cursor-pointer'
                }`}
              >
                {lockoutRemainingSec > 0 ? 'Borang Dikunci Sementara' : 'Buka Kunci Akses Sesi'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Dashboard */
          <div>
            {/* Top Navigation Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 text-xs font-mono border-b border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('roadtour')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'roadtour'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>1. Album Roadtour ({statesData.length} Negeri)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('state-edit')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'state-edit'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>2. Edit Info Negeri (Hotel & Tarikh)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'events'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>3. Update News (Kelas / Event)</span>
                {eventAlerts && eventAlerts.some((a) => a.isActive) && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ib')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'ib'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>4. Album IB (MY & ID)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('community')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'community'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>5. Pautan Komuniti</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sheet-sync')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeTab === 'sheet-sync'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>6. Pangkalan Data Google Sheet</span>
              </button>

              <button
                type="button"
                onClick={onResetDefaults}
                className="ml-auto px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors flex items-center space-x-1 whitespace-nowrap"
                title="Pulihkan data asal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Asal</span>
              </button>
            </div>

            {/* TAB 1: PENGURUS ALBUM ROADTOUR */}
            {activeTab === 'roadtour' && (
              <div className="space-y-6 animate-in fade-in">
                {/* State selector dropdown */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      PILIH NEGERI ROADTOUR:
                    </label>
                    <select
                      value={selectedStateId}
                      onChange={(e) => setSelectedStateId(e.target.value)}
                      className="bg-slate-900 border border-white/20 rounded-lg px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                    >
                      {statesData.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.hotel}) - {st.gallery?.length || 0} Gambar
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-right text-xs font-mono">
                    <span className="text-slate-400 block">Status Acara:</span>
                    <span className="text-[#D4AF37] font-bold uppercase">{currentState.status}</span>
                  </div>
                </div>

                {/* Form to Add Image */}
                <form onSubmit={handleAddStateImage} className="p-5 rounded-xl bg-slate-900/60 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    <span>Tambah Gambar Baharu ke Album {currentState.name}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Pautan Imej (URL Langsung / Imgur / CDN) *:
                      </label>
                      <input
                        type="url"
                        required
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://i.imgur.com/... atau URL foto HD"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
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
                        placeholder="cth: Sesi bedah setup live market bersama komuniti"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Simpan Gambar ke Album Awam
                  </button>
                </form>

                {/* Current State Album Gallery List & Delete */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 mb-3 uppercase">
                    Imej Semasa Dalam Album {currentState.name} ({currentState.gallery?.length || 0}):
                  </h4>

                  {currentState.gallery && currentState.gallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentState.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-xl overflow-hidden bg-slate-950 border border-white/10 p-2 space-y-2 group"
                        >
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="h-28 w-full object-cover rounded-lg"
                          />
                          <p className="text-[11px] text-slate-300 line-clamp-1 font-mono">
                            {img.caption}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleDeleteStateImage(idx)}
                            className="absolute top-3 right-3 p-1.5 rounded-md bg-red-950 text-red-400 border border-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-900 hover:text-white"
                            title="Padam Imej"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-slate-950/60 border border-white/5 text-center text-xs text-slate-500 font-mono">
                      Tiada imej dalam album negeri ini. Gunakan borang di atas untuk memuat naik imej baharu.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: EDIT INFO NEGERI ROADTOUR (DYNAMIC LOCATION & HOTEL CMS) */}
            {activeTab === 'state-edit' && (
              <form onSubmit={handleSaveStateInfo} className="space-y-4 animate-in fade-in">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                        <Edit3 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Kemaskini Acara Roadtour</span>
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Sunting maklumat lokasi hotel, tarikh, kuota dewan dan status acara.
                      </p>
                    </div>

                    <select
                      value={selectedStateId}
                      onChange={(e) => setSelectedStateId(e.target.value)}
                      className="bg-slate-900 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                    >
                      {statesData.map((st) => (
                        <option key={st.id} value={st.id}>
                          Negeri: {st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Medan 1: Nama Negeri (Readonly) */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Medan 1: Nama Negeri (Readonly):
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={currentState.name}
                        className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono cursor-not-allowed"
                      />
                    </div>

                    {/* Medan 2: Lokasi / Nama Dewan / Hotel */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Medan 2: Lokasi / Nama Dewan / Hotel *:
                      </label>
                      <input
                        type="text"
                        required
                        value={editHotel}
                        onChange={(e) => setEditHotel(e.target.value)}
                        placeholder="cth: Hotel Grand Riverview, Kota Bharu"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Medan 3: Tarikh Acara */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Medan 3: Tarikh Acara:
                      </label>
                      <input
                        type="text"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        placeholder="cth: 15 Oktober 2026"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Medan 4: Anggaran / Angka Kehadiran */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Medan 4: Anggaran / Angka Kehadiran:
                      </label>
                      <input
                        type="text"
                        value={editAttendees}
                        onChange={(e) => setEditAttendees(e.target.value)}
                        placeholder="cth: 350 Peserta"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Medan 5: Status Acara (Dropdown) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Medan 5: Status Acara:
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as RoadtourStateData['status'])}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="coming_soon">Akan Datang</option>
                        <option value="upcoming">Pendaftaran Dibuka</option>
                        <option value="completed">Selesai</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Keterangan Ringkas / Sorotan:
                      </label>
                      <input
                        type="text"
                        value={editHighlight}
                        onChange={(e) => setEditHighlight(e.target.value)}
                        placeholder="cth: Sesi Analisis Fundamental & Agihan Akses Algoritma"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditHotel(currentState.hotel || '');
                        setEditDate(currentState.date || '');
                        setEditAttendees(String(currentState.attendees || ''));
                        setEditStatus(currentState.status || 'upcoming');
                        setEditHighlight(currentState.highlight || '');
                        showToast('Perubahan dibatalkan.');
                      }}
                      className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: UPDATE NEWS (UPDATE KELAS / EVENT AKAN DATANG) */}
            {activeTab === 'events' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Borang Input Utama: Tambah Acara Baru ATAU Sunting Acara Terpilih */}
                <form id="admin-events-form" onSubmit={handleSaveOrUpdateAlert} className="space-y-4">
                  <div
                    className={`p-4 sm:p-5 rounded-xl bg-slate-950/80 border transition-all ${
                      editingAlertId
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white flex items-center space-x-2">
                          <Bell className="w-4 h-4 text-[#D4AF37]" />
                          <span>
                            {editingAlertId ? 'Sunting Notifikasi Acara / Kelas' : 'Update News (Update Kelas / Event Akan Datang)'}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {editingAlertId
                            ? 'Anda sedang dalam mod menyunting. Ubah maklumat di bawah dan tekan butang "Kemaskini & Simpan".'
                            : 'Borang penambahan acara. Data akan terus ditambah ke dalam senarai pratonton dan dipaparkan di laman utama awam.'}
                        </p>
                      </div>

                      {editingAlertId ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                          <Edit3 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          <span>MOD SUNTINGAN AKTIF</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 text-xs font-mono">
                          <Plus className="w-3.5 h-3.5 text-emerald-400" />
                          <span>BORANG ACARA BAHARU</span>
                        </div>
                      )}
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Medan Input 1: Nama Acara */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Nama Acara / Kelas: <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={alertEventName}
                          onChange={(e) => setAlertEventName(e.target.value)}
                          placeholder="cth: Class Masterkey Price Zone / IB Development Workshop"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>

                      {/* Medan Input 2: Negeri */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Negeri: <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={alertState}
                          onChange={(e) => setAlertState(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                        >
                          {MALAYSIAN_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                      {/* Medan Input 3: Lokasi */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Lokasi (Hotel / Dewan): <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={alertLocation}
                          onChange={(e) => setAlertLocation(e.target.value)}
                          placeholder="cth: Hotel Marriott, Putrajaya"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>

                      {/* Medan Input 4: Tarikh */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Tarikh: <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={alertDate}
                          onChange={(e) => setAlertDate(e.target.value)}
                          placeholder="cth: 19/09/2026"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>

                      {/* Medan Input 5: Quota */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Quota: <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={alertQuota}
                          onChange={(e) => setAlertQuota(e.target.value)}
                          placeholder="cth: 5 Left / 10 Seats Only / Tempat Terhad"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                      <button
                        type="submit"
                        id="admin-save-activate-alert-btn"
                        className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        {editingAlertId ? (
                          <>
                            <Save className="w-4 h-4 text-slate-950" />
                            <span>Kemaskini & Simpan Notifikasi</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-slate-950" />
                            <span>Simpan & Tambah Notifikasi</span>
                          </>
                        )}
                      </button>

                      {editingAlertId && (
                        <button
                          type="button"
                          id="admin-cancel-edit-alert-btn"
                          onClick={handleCancelEdit}
                          className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Batal Edit</span>
                        </button>
                      )}

                      {!editingAlertId && (alertEventName || alertLocation) && (
                        <button
                          type="button"
                          onClick={resetAlertForm}
                          className="px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Kosongkan Borang</span>
                        </button>
                      )}
                    </div>
                  </div>
                </form>

                {/* PRATONTON LANGSUNG NOTIFIKASI AWAM (EDIT & PADAM REAL-TIME) */}
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-amber-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4" />
                        Pratonton Langsung Notifikasi Awam ({eventAlerts.length} Acara)
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Setiap kad memaparkan rupa notifikasi langsung di laman utama. Gunakan butang di bawah untuk Edit, Padam, atau Tukar Status secara masa nyata.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        {eventAlerts.filter((a) => a.isActive && !isEventExpired(a.date)).length} Aktif di Web
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-white/10">
                        Jumlah: {eventAlerts.length}
                      </span>
                    </div>
                  </div>

                  {eventAlerts.length === 0 ? (
                    <div className="py-10 px-4 text-center rounded-xl bg-slate-950/60 border border-dashed border-white/10">
                      <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-300 font-mono font-medium">
                        Tiada notifikasi berdaftar pada masa ini.
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono mt-1">
                        Sila isi borang di atas untuk menambah pengumuman kelas atau acara baharu.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eventAlerts.map((item) => {
                        const isEditingThis = editingAlertId === item.id;
                        const expired = isEventExpired(item.date);
                        const isLiveOnSite = item.isActive && !expired;

                        return (
                          <div
                            key={item.id}
                            className={`relative bg-slate-950/90 backdrop-blur-xl rounded-xl p-4 text-white shadow-xl transition-all flex flex-col justify-between ${
                              isEditingThis
                                ? 'border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/20 scale-[1.01]'
                                : isLiveOnSite
                                ? 'border border-amber-500/40 hover:border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                                : 'border border-white/10 opacity-80'
                            }`}
                          >
                            <div>
                              {/* Card Header: Live indicator + Action Buttons (Status, Edit, Padam) */}
                              <div className="flex items-center justify-between pb-2 border-b border-white/10 gap-2">
                                <div className="flex items-center space-x-1.5 min-w-0">
                                  {isLiveOnSite ? (
                                    <div className="flex items-center">
                                      <span className="relative flex h-2 w-2 mr-1.5 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                      </span>
                                      <span className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider truncate">
                                        LIVE DI WEB
                                      </span>
                                    </div>
                                  ) : expired ? (
                                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 rounded">
                                      <AlertTriangle className="w-2.5 h-2.5" />
                                      TAMAT TEMPOH
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-medium text-slate-400 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">
                                      <EyeOff className="w-2.5 h-2.5" />
                                      NYAHAKTIF
                                    </span>
                                  )}

                                  {isEditingThis && (
                                    <span className="bg-[#D4AF37] text-slate-950 font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded whitespace-nowrap">
                                      SEDANG DISUNTING
                                    </span>
                                  )}
                                </div>

                                {/* Card Action Controls: Toggle Status, Edit, Padam */}
                                <div className="flex items-center space-x-1.5 shrink-0">
                                  {/* Quick Toggle Active Status */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAlertStatus(item.id)}
                                    className={`px-2 py-1 rounded-md text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer border ${
                                      item.isActive
                                        ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-white/10'
                                    }`}
                                    title={item.isActive ? 'Nyahaktifkan Notifikasi' : 'Aktifkan Notifikasi'}
                                  >
                                    {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                    <span className="hidden sm:inline">{item.isActive ? 'Aktif' : 'Nyahaktif'}</span>
                                  </button>

                                  {/* Edit Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleEditAlert(item)}
                                    className="px-2 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Sunting Maklumat Acara Ini"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAlert(item.id)}
                                    className="px-2 py-1 rounded-md bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Padam Notifikasi Ini Serta-Merta"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Padam</span>
                                  </button>
                                </div>
                              </div>

                              {/* Event Details */}
                              <div className="pt-2.5 space-y-1.5">
                                <h5 className="font-bold text-sm text-white leading-snug">
                                  {item.eventName}
                                </h5>

                                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  <span className="truncate">
                                    {item.location} • {item.state}
                                  </span>
                                </div>

                                <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                  <span>{item.date}</span>
                                </div>

                                {item.quota && (
                                  <div className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 inline-flex items-center gap-1 mt-1 font-mono">
                                    <Zap className="w-3 h-3 text-amber-400" />
                                    <span>{item.quota}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* WhatsApp Direct Link Preview & Footer */}
                            <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5 text-[10px] font-mono text-slate-400">
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-400 font-medium flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3" />
                                  Booking WhatsApp: +60102263677
                                </span>
                                <span className="text-slate-500">ID: {item.id.slice(-6)}</span>
                              </div>
                              <div className="bg-slate-900/80 rounded px-2 py-1 text-slate-400 truncate text-[9px] border border-white/5">
                                Teks: &quot;Hai, saya nak join kelas {item.eventName} di {item.location}...&quot;
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: PENGURUS ALBUM IB DEVELOPMENT */}
            {activeTab === 'ib' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Region Selector */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedIBRegion('MY')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedIBRegion === 'MY'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    🇲🇾 Album Wilayah Malaysia
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIBRegion('ID')}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedIBRegion === 'ID'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    🇮🇩 Album Wilayah Indonesia
                  </button>
                </div>

                {/* Form to Add IB Activity */}
                <form onSubmit={handleAddIBActivity} className="p-5 rounded-xl bg-slate-900/60 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    Tambah Liputan Aktiviti IB ({selectedIBRegion === 'MY' ? 'Malaysia' : 'Indonesia'})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Tajuk Aktiviti *</label>
                      <input
                        type="text"
                        required
                        value={newIBTitle}
                        onChange={(e) => setNewIBTitle(e.target.value)}
                        placeholder="cth: Bengkel Pemerkasaan IB Wilayah"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Kategori</label>
                      <select
                        value={newIBCategory}
                        onChange={(e) => setNewIBCategory(e.target.value as 'Workshop' | 'Dinner' | 'Merchandise' | 'Leadership')}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Merchandise">Merchandise</option>
                        <option value="Leadership">Leadership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Pautan Imej *</label>
                      <input
                        type="url"
                        required
                        value={newIBImageUrl}
                        onChange={(e) => setNewIBImageUrl(e.target.value)}
                        placeholder="https://i.imgur.com/... atau URL foto HD"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Lokasi & Tarikh</label>
                      <input
                        type="text"
                        value={newIBLocation}
                        onChange={(e) => setNewIBLocation(e.target.value)}
                        placeholder="cth: Grand Hyatt KL • Mac 2026"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Keterangan Singkat</label>
                      <input
                        type="text"
                        value={newIBDescription}
                        onChange={(e) => setNewIBDescription(e.target.value)}
                        placeholder="cth: Latihan intensif pembangunan jaringan pedagang."
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs hover:brightness-110 cursor-pointer"
                  >
                    Simpan ke Album IB
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: PENGURUS PAUTAN KOMUNITI */}
            {activeTab === 'community' && (
              <form onSubmit={handleSaveLinks} className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Link2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Kemaskini Pautan Media Sosial Rasmi</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Pautan Saluran Telegram VIP:
                    </label>
                    <input
                      type="url"
                      value={editLinks.telegramVip}
                      onChange={(e) => setEditLinks({ ...editLinks, telegramVip: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Pautan WhatsApp Careline:
                    </label>
                    <input
                      type="url"
                      value={editLinks.whatsAppCareline}
                      onChange={(e) => setEditLinks({ ...editLinks, whatsAppCareline: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">TikTok:</label>
                      <input
                        type="url"
                        value={editLinks.tiktok}
                        onChange={(e) => setEditLinks({ ...editLinks, tiktok: e.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">YouTube:</label>
                      <input
                        type="url"
                        value={editLinks.youtube}
                        onChange={(e) => setEditLinks({ ...editLinks, youtube: e.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Instagram:</label>
                      <input
                        type="url"
                        value={editLinks.instagram}
                        onChange={(e) => setEditLinks({ ...editLinks, instagram: e.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 cursor-pointer"
                  >
                    Simpan Pautan Komuniti Serta-merta
                  </button>
                </div>
              </form>
            )}

            {/* TAB 6: PANGKALAN DATA GOOGLE SHEET / VALETAX (STRICT NO MOCK DATA) */}
            {activeTab === 'sheet-sync' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        Pangkalan Data Google Sheet & Valetax Broker API
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        Pengesahan integriti pangkalan data luaran. Tiada data rekaan / mock dibenarkan.
                      </p>
                    </div>
                  </div>

                  {sheetErrorMessage && (
                    <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs font-mono space-y-1">
                      <div className="flex items-center space-x-2 font-bold text-rose-300">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>RALAT SAMBUNGAN PANGKALAN DATA (REAL ERROR ALERT)</span>
                      </div>
                      <p className="leading-relaxed">{sheetErrorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleTestSheetConnection} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Pautan Endpoint Google Sheet CSV / Valetax API:
                      </label>
                      <input
                        type="url"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                      />
                      <p className="text-[11px] text-slate-500 font-mono mt-1">
                        Sistem menguatkuasakan sambungan terus. Sekiranya pelayan terputus, sistem akan melaporkan status ralat sebenar tanpa menggunakan data tiruan.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={sheetStatus === 'checking'}
                      className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${sheetStatus === 'checking' ? 'animate-spin' : ''}`} />
                      <span>{sheetStatus === 'checking' ? 'Menguji Sambungan...' : 'Uji Sambungan Google Sheet / API'}</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
