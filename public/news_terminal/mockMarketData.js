/* =====================================================================
 * ⚡ ARCHITECTURE BY IQWANENGINE (UPDATED)
 * SINGLE SOURCE OF TRUTH: SUPABASE ONLY (VIP ALERTS)
 * ===================================================================== */

(async function () {
  // 1. Kredensial Supabase Anda
  const SUPABASE_URL = 'https://mxlkvnvegtsbzrdszzoi.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_YJaMCHPp-pQqhpbweeT33w_9guu9eAn';

  // 2. Struktur Asas (Paparan sementara sebelum data berjaya ditarik)
  let TIER1_CATALYST_CONFIG = {
    id: "loading-catalyst",
    isDummy: false,
    title: "Mengambil Data Pasaran Terkini...",
    subLabel: "OWL-FX TERMINAL",
    category: "HIGH_IMPACT",
    description: "Sistem sedang mencari isyarat makroekonomi berimpak tinggi seterusnya...",
    consensus: { previous: "--", forecast: "--", devThreshold: "--", histVolatility: "--" },
    sessionTime: "Menunggu Sambungan...",
    release_time: null,
    defaultHoursAhead: 0,
    defaultMinsAhead: 0,
    vipTelegramSync: { active: true, badgeText: "🔔 VIP TELEGRAM SYNC: ACTIVE" },
    statusBadge: "CONNECTING TO RELAY...",
    subStatus: "Menyegerak Data Masa Nyata"
  };

  let MARKET_NEWS_DATA = {
    highImpact: [],
    centralBank: [],
    geopolitical: []
  };

  // Mendedahkan pembolehubah ke 'window' supaya index.html boleh membacanya
  window.TIER1_CATALYST_CONFIG = TIER1_CATALYST_CONFIG;
  window.MARKET_NEWS_DATA = MARKET_NEWS_DATA;
  window.MOCK_NEWS_DATA = MARKET_NEWS_DATA;

  let supabaseDataCache = [];

  // =====================================================================
  // SINGLE FETCH: SUPABASE ENGINE
  // =====================================================================
  async function fetchAllDataFromSupabase() {
    try {
      // Ambil limit yang cukup besar dan sort by masa descending supaya kita dapat history & masa depan
      const response = await fetch(`${SUPABASE_URL}/rest/v1/vip_alerts?select=*&order=release_time.desc&limit=500`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Ralat Supabase: ${response.statusText}`);
      }

      const alerts = await response.json();

      if (alerts && Array.isArray(alerts)) {
        supabaseDataCache = alerts;

        // 1. UPDATE ACTIVE NEWS FEED (PAGINATION READY)
        updateActiveNewsFeed(alerts);

        // 2. UPDATE TIER-1 & COUNTDOWN ENGINE
        updateNextTier1Event(alerts);
      }
    } catch (error) {
      console.error("Gagal menarik data dari Supabase:", error);
    }
  }

  // =====================================================================
  // ACTIVE NEWS FEED LOGIC
  // =====================================================================
  function updateActiveNewsFeed(alerts) {
    // Sort descending for feed (newest time first)
    const sortedForFeed = [...alerts].sort((a, b) => {
      const timeA = new Date(a.release_time || a.created_at).getTime();
      const timeB = new Date(b.release_time || b.created_at).getTime();
      return timeB - timeA;
    });

    const mappedNews = sortedForFeed.map(alert => {
      // Check validity of release_time
      let timeStr = "Baru saja";
      if (alert.release_time) {
        const d = new Date(alert.release_time);
        if (!isNaN(d.getTime())) {
          timeStr = d.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });
        }
      }

      return {
        id: alert.id,
        isDummy: false,
        title: alert.title,
        headline: alert.title,
        time: timeStr,
        impact: alert.impact || "Unknown",
        tag: alert.currency || "MACRO",
        categoryTag: alert.category || alert.categoryTag || "Alert",
        category: alert.category || "Alert",
        tags: [alert.category, alert.currency].filter(Boolean),
      source: "OWL-FX AI BOT",
      desc: `Matawang terlibat: ${alert.currency || '--'}. Data sebelumnya: ${alert.previous || '--'}, Jangkaan: ${alert.forecast || '--'}.`,
      synthesis: "Isyarat dikesan secara automatik. Bersedia untuk lonjakan volatiliti.",
      postMortem: "Menunggu atau telah dilepaskan ke pasaran...",
      metrics: `Sila rujuk terminal.`,
      xauDelta: "--",
      dxyDelta: "--",
      yieldDelta: "--",
      drivers: ["Ketidaktentuan pasaran berikutan pengumuman data makroekonomi utama."],
      assetClassBias: {
        gold: { bias: "VOLATILE", delta: "--", note: "Menunggu pelepasan data" },
        dxy: { bias: "VOLATILE", delta: "--", note: "Menunggu pelepasan data" },
        yield: { bias: "VOLATILE", delta: "--", note: "Menunggu pelepasan data" },
        macroFx: { bias: "VOLATILE", delta: "--", note: "Menunggu pelepasan data" }
      }
    };
    });

    window.MARKET_NEWS_DATA = {
      highImpact: mappedNews,
      centralBank: [],
      geopolitical: []
    };
    window.MOCK_NEWS_DATA = window.MARKET_NEWS_DATA;

    // Trigger kemas kini Active News Feed
    window.dispatchEvent(new Event('supabaseDataLoaded'));
  }

  // =====================================================================
  // TIER-1 & GIANT COUNTDOWN UPCOMING DETECTION
  // =====================================================================
  function updateNextTier1Event(alerts) {
    const nowMs = Date.now();

    // 1. Tapis: Valid date, Future date, dan High Impact sahaja
    let upcomingEvents = alerts.filter(evt => {
      if (!evt.release_time || !evt.impact) return false;

      // Normalise impact naming
      const impactLower = String(evt.impact).toLowerCase().trim();
      // Berdasarkan existing logic, hanya "high" atau "red" digunakan
      if (impactLower !== 'high' && impactLower !== 'red') return false;

      const eventTime = new Date(evt.release_time).getTime();
      if (isNaN(eventTime)) return false;

      return eventTime > nowMs;
    });

    // 2. Susun mengikut masa terdekat dari sekarang (Ascending)
    upcomingEvents.sort((a, b) => new Date(a.release_time).getTime() - new Date(b.release_time).getTime());

    if (upcomingEvents.length > 0) {
      const targetAlert = upcomingEvents[0]; // Nearest future event

      window.TIER1_CATALYST_CONFIG = {
        id: "supa-event-" + targetAlert.id,
        isDummy: false,
        title: targetAlert.title || "Berita Impak Tinggi (Tiada Tajuk)",
        subLabel: targetAlert.currency ? `${targetAlert.currency} Impact` : "MACRO // TIER-1",
        category: "HIGH_IMPACT",
        description: "Enjin Supabase mengesan pelepasan data makroekonomi ini sebagai pencetus utama volatiliti pasaran akan datang.",
        consensus: {
          previous: targetAlert.previous || "--",
          forecast: targetAlert.forecast || "--",
          devThreshold: "±N/A",
          histVolatility: "N/A"
        },
        release_time: targetAlert.release_time,
        vipTelegramSync: { active: true, badgeText: "🔔 VIP TELEGRAM SYNC: ACTIVE" },
        statusBadge: "COUNTDOWN TO RELEASE",
        subStatus: "HIGH-IMPACT VOLATILITY WINDOW APPROACHING",
        impact: "HIGH"
      };
    } else {
      // Tiada high impact event dijumpai pada masa hadapan (Neutral State)
      window.TIER1_CATALYST_CONFIG.release_time = null;
    }

    // Beri isyarat (trigger) kepada index.html bahawa Countdown boleh direfresh
    window.dispatchEvent(new Event('tier1DataLoaded'));
  }

  // Mendedahkan enjin kemas kini agar countdown loop di index.html boleh call semula jika event tamat
  window.recalcNextSupabaseEvent = function() {
    if (supabaseDataCache && supabaseDataCache.length > 0) {
      updateNextTier1Event(supabaseDataCache);
    } else {
      fetchAllDataFromSupabase();
    }
  };

  // Mulakan proses (Single source call)
  fetchAllDataFromSupabase();

})();
