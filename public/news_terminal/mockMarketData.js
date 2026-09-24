/* =====================================================================
 * ⚡ ARCHITECTURE BY IQWANENGINE (UPDATED)
 * SINGLE SOURCE OF TRUTH: SUPABASE ONLY (VIP ALERTS)
 * VERSION: 1.0.5 - PRODUCTION PARITY AUDIT READY
 * ===================================================================== */

(async function () {
  const AUDIT_VERSION = "1.0.5";
  console.info(`[OWL-FX AUDIT] Core Engine Version: ${AUDIT_VERSION}`);

  // 1. Kredensial Supabase Anda
  // WARNING: Ensure these match your Production Project in Supabase Dashboard
  const SUPABASE_URL = 'https://mxlkvnvegtsbzrdszzoi.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_YJaMCHPp-pQqhpbweeT33w_9guu9eAn';

  /**
   * 2. CENTRALIZED TIMESTAMP RESOLVER
   * Mengaudit pelbagai kemungkinan nama column database.
   */
  function resolveEventTimestamp(item) {
    if (!item) return null;
    
    // Senarai kemungkinan column nama (priority order)
    const fields = ['release_time', 'timestamp', 'date', 'created_at'];
    
    for (const f of fields) {
      const val = item[f];
      if (val) {
        // Pastikan ia valid date
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
          return val;
        }
      }
    }
    
    return null;
  }

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
    console.info(`[OWL-FX] Fetching from: ${SUPABASE_URL}/rest/v1/vip_alerts`);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/vip_alerts?select=*&order=release_time.desc&limit=500`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`[OWL-FX] Supabase Error Response:`, response.status, response.statusText);
        throw new Error(`Ralat Supabase: ${response.statusText}`);
      }

      const alerts = await response.json();
      console.info(`[OWL-FX] Supabase Data Received: ${alerts ? alerts.length : 0} rows.`);

      if (alerts && Array.isArray(alerts)) {
        if (alerts.length > 0) {
          // Check schema of the first record for debugging
          console.info(`[OWL-FX] Schema Audit (Row 0):`, Object.keys(alerts[0]).join(', '));
        } else {
          console.warn(`[OWL-FX] Warning: Supabase returned zero rows. Check Table Permissions / RLS.`);
        }

        supabaseDataCache = alerts;

        // 1. UPDATE ACTIVE NEWS FEED (PAGINATION READY)
        updateActiveNewsFeed(alerts);

        // 2. UPDATE TIER-1 & COUNTDOWN ENGINE
        updateNextTier1Event(alerts);
      }
    } catch (error) {
      console.error("[OWL-FX] Gagal menarik data dari Supabase:", error);
      // Explicit notification for UI fallback
      window.dispatchEvent(new CustomEvent('supabaseError', { detail: error.message }));
    }
  }

  // =====================================================================
  // ACTIVE NEWS FEED LOGIC
  // =====================================================================
  function updateActiveNewsFeed(alerts) {
    // Sort descending for feed (newest time first)
    const sortedForFeed = [...alerts].sort((a, b) => {
      const timeA = new Date(resolveEventTimestamp(a)).getTime();
      const timeB = new Date(resolveEventTimestamp(b)).getTime();
      return timeB - timeA;
    });

    const mappedNews = sortedForFeed.map(alert => {
      // Check validity of resolved timestamp
      let timeStr = "Baru saja";
      const resolvedTs = resolveEventTimestamp(alert);
      if (resolvedTs) {
        const d = new Date(resolvedTs);
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
    console.info(`[OWL-FX] Scanning for Upcoming Tier-1. Now (ms): ${nowMs}`);

    // 1. Tapis: Valid date, Future date, dan High/Medium Impact
    let upcomingEvents = alerts.filter(evt => {
      const resolvedTs = resolveEventTimestamp(evt);
      if (!resolvedTs || !evt.impact) return false;

      // Normalise impact naming
      const impactLower = String(evt.impact).toLowerCase().trim();
      // Tier-1 Radar priority: high, red, medium, amber
      const isEligibleImpact = ['high', 'red', 'medium', 'amber'].includes(impactLower);
      if (!isEligibleImpact) return false;

      const eventTime = new Date(resolvedTs).getTime();
      if (isNaN(eventTime)) return false;

      return eventTime > nowMs;
    });

    // 2. Susun mengikut masa terdekat dari sekarang (Ascending)
    upcomingEvents.sort((a, b) => {
      return new Date(resolveEventTimestamp(a)).getTime() - new Date(resolveEventTimestamp(b)).getTime();
    });

    console.info(`[OWL-FX] Future Events Found: ${upcomingEvents.length}`);

    if (upcomingEvents.length > 0) {
      const targetAlert = upcomingEvents[0]; // Nearest future event
      const finalTs = resolveEventTimestamp(targetAlert);
      
      console.info(`[OWL-FX] Selected Upcoming Event: ${targetAlert.title} at ${finalTs}`);

      window.TIER1_CATALYST_CONFIG = {
        id: "supa-event-" + targetAlert.id,
        isDummy: false,
        title: targetAlert.title || "Upcoming Market Event",
        subLabel: targetAlert.currency ? `${targetAlert.currency} Impact` : "MACRO // TIER-1",
        category: "HIGH_IMPACT",
        description: targetAlert.description || "Enjin Supabase mengesan pelepasan data makroekonomi ini sebagai pencetus utama volatiliti pasaran akan datang.",
        consensus: {
          previous: targetAlert.previous || "--",
          forecast: targetAlert.forecast || "--",
          devThreshold: targetAlert.dev_threshold || "±N/A",
          histVolatility: targetAlert.historical_volatility || "N/A"
        },
        release_time: finalTs,
        vipTelegramSync: { active: true, badgeText: "🔔 VIP TELEGRAM SYNC: ACTIVE" },
        statusBadge: "COUNTDOWN TO RELEASE",
        subStatus: "HIGH-IMPACT VOLATILITY WINDOW APPROACHING",
        impact: String(targetAlert.impact).toUpperCase()
      };
    } else {
      console.warn(`[OWL-FX] No upcoming High/Medium impact events found in the current ${alerts.length} rows.`);
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
