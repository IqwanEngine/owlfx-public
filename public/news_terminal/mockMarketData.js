/* =====================================================================
   ZED EDITOR TODO: BACKEND TELEGRAM CRON INTEGRATION
   =====================================================================
   - Target VIP Group ID: -3960855060
   - Bot Target: @OWLfx_IE_bot
   - Architecture: Do not run Telegram POST requests directly from here.
   - Action: Replace this dummy state by fetching from Next.js API route 
     (e.g., /api/active-alerts) which is updated by Vercel Cron Jobs.
   ===================================================================== */

(function () {
/* ============================================================
   DUMMY_DATA_START: SEPARATED MOCK DATA MODULE FOR VERCEL/NEXT.JS
   ============================================================ */

/**
 * Tier-1 Catalyst Active State Configuration
 * Can be replaced by `await fetch('/api/active-alerts')` in Next.js / Vercel
 */
const TIER1_CATALYST_CONFIG = {
  id: "catalyst-nfp-2026",
  isDummy: true,
  title: "US Non-Farm Payrolls (NFP) & Unemployment Rate",
  subLabel: "NFP // BLS CATALYST",
  category: "HIGH_IMPACT",
  description: "Benchmark US labor market report and wage inflation indicator. Functions as the primary institutional trigger for Federal Reserve policy path, Treasury yield curve repricing, and multi-asset gold volatility.",
  consensus: {
    previous: "142K",
    forecast: "165K",
    devThreshold: "±25K",
    histVolatility: "150-220 Pips"
  },
  sessionTime: "12:30 UTC // 08:30 EST",
  // Default offset for dynamic live demo: ~18 hours 45 minutes ahead
  defaultHoursAhead: 18,
  defaultMinsAhead: 45,
  vipTelegramSync: {
    active: true,
    badgeText: "🔔 VIP TELEGRAM SYNC: ACTIVE",
    targetGroupId: "-3960855060",
    botTarget: "@OWLfx_IE_bot",
    status: "CRON_DISPATCH_ENABLED",
    lastSyncTimestamp: new Date().toISOString()
  },
  statusBadge: "COUNTDOWN TO RELEASE // HIGH VOLATILITY IMMINENT",
  subStatus: "HIGH-IMPACT VOLATILITY WINDOW APPROACHING"
};

/**
 * 9 Curated Real-Time Grounded Market News Items
 * Split across 3 categories: High Impact, Central Bank, Geopolitical
 */
const MARKET_NEWS_DATA = {
  highImpact: [
    {
      id: "hi-1",
      isDummy: true,
      title: "US August CPI Inflation Steady at 3.4% YoY as Energy Jumps 16.3%, Core Rises +0.29% MoM",
      headline: "US August CPI Inflation Steady at 3.4% YoY as Energy Jumps 16.3%, Core Rises +0.29% MoM",
      time: "Baru saja",
      impact: "HIGH",
      tag: "INFLATION",
      categoryTag: "High Impact",
      category: "High Impact",
      tags: ["High Impact", "CPI", "INFLATION", "MACRO"],
      source: "US BUREAU OF LABOR STATISTICS",
      desc: "Kadar inflasi tahunan AS kekal pada 3.4% pada Ogos 2026 selari jangkaan pasaran, didorong oleh lonjakan harga tenaga sebanyak 16.3% tahun-ke-tahun manakala inflasi teras meningkat 0.29% secara bulanan.",
      synthesis: "Kadar inflasi tahunan AS kekal pada 3.4% pada Ogos 2026 selari jangkaan pasaran, didorong oleh lonjakan harga tenaga sebanyak 16.3% tahun-ke-tahun manakala inflasi teras meningkat 0.29% secara bulanan.",
      postMortem: "Inflasi yang kekal melekat (sticky inflation) memperkukuh indeks dolar AS (DXY +0.48%) dan menekan harga spot emas sebanyak $18.40 akibat pengurangan spekulasi pemotongan faedah mendadak. Pasaran bon perbendaharaan bertindak balas dengan peningkatan hasil US 10-Tahun sebanyak 8 bps sebelum sokongan belian institusi muncul di zon $4,300/oz.",
      metrics: "Gold: -$18.40 (-184 pips) | DXY: +0.48% | US10Y: +8 bps",
      xauDelta: "-$18.40 (-184 pips)",
      dxyDelta: "+0.48%",
      yieldDelta: "+8 bps",
      drivers: [
        "Kenaikan mendadak komponen tenaga sebanyak 16.3% mengekalkan inflasi utama pada 3.4%.",
        "Anggaran inflasi teras bulanan 0.29% membuktikan tekanan kos barangan dan tempat tinggal belum reda.",
        "Pengurangan jangkaan pelonggaran dasar monetari segera menyokong pengukuhan indeks dolar."
      ],
      assetClassBias: {
        gold: { bias: "BEARISH REACTION", delta: "-$18.40 (-184p)", note: "Tekanan jualan serta-merta susulan lonjakan hasil bon Perbendaharaan AS" },
        dxy: { bias: "BULLISH EXPANSION", delta: "+0.48%", note: "Permintaan kukuh dolar dipacu jangkaan kadar faedah kekal tinggi lebih lama" },
        yield: { bias: "YIELD SURGE", delta: "+8 bps", note: "Keluk hasil US 10Y meningkat mencerminkan premium inflasi tegar" },
        macroFx: { bias: "USD DOMINANCE", delta: "EUR/USD -42p", note: "Mata wang utama G10 melemah berbanding dolar AS" }
      }
    },
    {
      id: "hi-2",
      isDummy: true,
      title: "US Non-Farm Payrolls Surge to 162,000 in August Crushing 56,000 Forecast, Jobless Rate at 4.1%",
      headline: "US Non-Farm Payrolls Surge to 162,000 in August Crushing 56,000 Forecast, Jobless Rate at 4.1%",
      time: "15m lalu",
      impact: "HIGH",
      tag: "LABOR MARKET",
      categoryTag: "High Impact",
      category: "High Impact",
      tags: ["High Impact", "NFP", "JOBS", "FED"],
      source: "US DEPARTMENT OF LABOR",
      desc: "Pertambahan pekerjaan sektor bukan perladangan AS melonjak kepada 162,000 pekerjaan pada Ogos 2026, mengatasi unjuran konsensus 56,000 secara ketara, manakala kadar pengangguran kekal stabil pada paras 4.1%.",
      synthesis: "Pertambahan pekerjaan sektor bukan perladangan AS melonjak kepada 162,000 pekerjaan pada Ogos 2026, mengatasi unjuran konsensus 56,000 secara ketara, manakala kadar pengangguran kekal stabil pada paras 4.1%.",
      postMortem: "Kekuatan pasaran buruh AS yang luar biasa memadamkan naratif kemelesetan ekonomi dan mencetuskan lonjakan DXY menembusi paras 100.00. Harga emas tergelincir -$26.80 dalam reaksi pembukaan pantas apabila pedagang menyelaraskan semula kedudukan lindung nilai kadar faedah.",
      metrics: "Gold: -$26.80 (-268 pips) | DXY: +0.65% | US10Y: +11 bps",
      xauDelta: "-$26.80 (-268 pips)",
      dxyDelta: "+0.65%",
      yieldDelta: "+11 bps",
      drivers: [
        "Data pekerjaan 162k mengatasi jangkaan hampir tiga kali ganda membuktikan ketahanan kitaran ekonomi.",
        "Kadar pengangguran stabil pada 4.1% mengurangkan tekanan ke atas Fed untuk melonggarkan dasar.",
        "Pertumbuhan gaji purata per jam kekal sihat menyokong kuasa beli isi rumah."
      ],
      assetClassBias: {
        gold: { bias: "HAWKISH CONTRACTION", delta: "-$26.80 (-268p)", note: "Pembubaran posisi belian pendek akibat repricing agresif pasaran derivatif" },
        dxy: { bias: "AGGRESSIVE BID", delta: "+0.65%", note: "Aliran masuk modal institusi mencari perlindungan hasil sebenar (real yields)" },
        yield: { bias: "BEAR STEEPENING", delta: "+11 bps", note: "Hasil bon 2Y dan 10Y melonjak selari unjuran terminal rate yang lebih tinggi" },
        macroFx: { bias: "PRO-USD MOMENTUM", delta: "GBP/USD -65p", note: "Tekanan meluas ke atas pasangan mata wang utama merentas sesi New York" }
      }
    },
    {
      id: "hi-3",
      isDummy: true,
      title: "Brent Crude Re-Tests $92/bbl Resistance as Red Sea & Hormuz Chokepoints Disrupt Tankers",
      headline: "Brent Crude Re-Tests $92/bbl Resistance as Red Sea & Hormuz Chokepoints Disrupt Tankers",
      time: "42m lalu",
      impact: "HIGH",
      tag: "ENERGY CRUNCH",
      categoryTag: "High Impact",
      category: "High Impact",
      tags: ["High Impact", "OIL", "BRENT", "COMMODITIES"],
      source: "S&P GLOBAL COMMODITY INSIGHTS",
      desc: "Niaga hadapan minyak mentah Brent melepasi $91.80 setong berikutan gangguan keselamatan laluan kapal tangki di Selat Hormuz dan Laut Merah yang memaksa kenaikan kadar tambang perkapalan sebanyak 25-30%.",
      synthesis: "Niaga hadapan minyak mentah Brent melepasi $91.80 setong berikutan gangguan keselamatan laluan kapal tangki di Selat Hormuz dan Laut Merah yang memaksa kenaikan kadar tambang perkapalan sebanyak 25-30%.",
      postMortem: "Lonjakan harga tenaga menyuntik semula premi risiko inflasi global, mendorong aliran masuk modal ke dalam emas fizikal sebagai aset pelindung nilai terkemuka (safe haven). Emas spot melonjak +$21.50 disokong oleh permintaan komoditi institusi merentas benua.",
      metrics: "Gold: +$21.50 (+215 pips) | Brent: +$3.40 (+3.8%) | DXY: -0.15%",
      xauDelta: "+$21.50 (+215 pips)",
      dxyDelta: "-0.15%",
      yieldDelta: "+4 bps",
      drivers: [
        "Lencongan laluan kapal melalui Tanjung Harapan menambah masa transit selama 10 hingga 14 hari.",
        "Kos insurans risiko perang maritim meningkat mendadak menekan margin pengeluar.",
        "Kekhuatiran sekatan bekalan hidrokarbon menyalakan sentimen stagflasi global."
      ],
      assetClassBias: {
        gold: { bias: "SAFE-HAVEN EXPANSION", delta: "+$21.50 (+215p)", note: "Peningkatan peruntukan emas sebagai perlindungan terhadap risiko geopolitik dan tenaga" },
        dxy: { bias: "RANGE-BOUND", delta: "-0.15%", note: "DXY terperangkap antara hasil bon meningkat dan kebimbangan inflasi tenaga" },
        yield: { bias: "INFLATION PRICING", delta: "+4 bps", note: "Kadar inflasi titik pulang modal (breakeven inflation) meningkat" },
        macroFx: { bias: "PETRO-CURRENCY BID", delta: "USD/CAD -35p", note: "Mata wang pengeksport komoditi mengukuh disokong harga minyak mentah" }
      }
    }
  ],
  centralBank: [
    {
      id: "cb-1",
      isDummy: true,
      title: "Federal Reserve Hikes Benchmark Rate 25 bps to 3.75%-4.00% Range, Powell Flags Dot Plot to 4.4%",
      headline: "Federal Reserve Hikes Benchmark Rate 25 bps to 3.75%-4.00% Range, Powell Flags Dot Plot to 4.4%",
      time: "1j lalu",
      impact: "HIGH",
      tag: "FEDERAL RESERVE",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "FOMC", "POWELL", "RATES"],
      source: "FEDERAL RESERVE BOARD COMMUNICATIONS",
      desc: "Jawatankuasa Pasaran Terbuka Persekutuan (FOMC) mengejutkan pasaran dengan kenaikan kadar dasar 25 mata asas kepada julat 3.75%-4.00%, dengan Pengerusi Powell menegaskan komitmen menurunkan inflasi ke sasaran 2.0%.",
      synthesis: "Jawatankuasa Pasaran Terbuka Persekutuan (FOMC) mengejutkan pasaran dengan kenaikan kadar dasar 25 mata asas kepada julat 3.75%-4.00%, dengan Pengerusi Powell menegaskan komitmen menurunkan inflasi ke sasaran 2.0%.",
      postMortem: "Keputusan kenaikan kadar faedah kali pertama sejak 2023 membuktikan keazaman Fed dalam memerangi inflasi tegar. Emas mengalami pembetulan sederhana -$15.20 manakala DXY naik +0.52% susulan kenyataan Powell bahawa kestabilan harga adalah prasyarat mutlak ekonomi.",
      metrics: "Gold: -$15.20 (-152 pips) | DXY: +0.52% | Fed Funds: 3.75%-4.00%",
      xauDelta: "-$15.20 (-152 pips)",
      dxyDelta: "+0.52%",
      yieldDelta: "+9 bps",
      drivers: [
        "Unjuran Dot Plot menunjukkan kadar median terminal disemak naik kepada 4.1%-4.4% menjelang 2027.",
        "Kenyataan dasar menekankan inflasi teras masih melebihi tahap toleransi bank pusat.",
        "Fed mengekalkan pengurangan kunci kira-kira kuantitatif (QT) pada kadar semasa."
      ],
      assetClassBias: {
        gold: { bias: "HAWKISH RETRACEMENT", delta: "-$15.20 (-152p)", note: "Kos pegangan alternatif emas meningkat susulan kadar faedah nominal lebih tinggi" },
        dxy: { bias: "STRONG ACCUMULATION", delta: "+0.52%", note: "Perbezaan kadar faedah global terus memihak kepada pengukuhan dolar AS" },
        yield: { bias: "FRONT-END SURGE", delta: "+9 bps", note: "Hasil bon 2-Tahun AS melompat mencerminkan laluan dasar hawkish" },
        macroFx: { bias: "G10 LIQUIDATION", delta: "AUD/USD -58p", note: "Penjualan ketara pada mata wang berbeta tinggi berbanding greenback" }
      }
    },
    {
      id: "cb-2",
      isDummy: true,
      title: "ECB Delivers 25 bps Rate Increase as Lagarde Warns on Persistent Eurozone Stagflation Risks",
      headline: "ECB Delivers 25 bps Rate Increase as Lagarde Warns on Persistent Eurozone Stagflation Risks",
      time: "1j 20m lalu",
      impact: "HIGH",
      tag: "ECB POLICY",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "ECB", "LAGARDE", "EUROZONE"],
      source: "EUROPEAN CENTRAL BANK PRESS BRIEFING",
      desc: "Presiden ECB Christine Lagarde mengumumkan pelarasan kadar pembiayaan semula utama kepada 3.65% sambil memberi amaran bahawa pertumbuhan Zon Euro perlahan (0.9%) diiringi tekanan upah yang masih berlarutan.",
      synthesis: "Presiden ECB Christine Lagarde mengumumkan pelarasan kadar pembiayaan semula utama kepada 3.65% sambil memberi amaran bahawa pertumbuhan Zon Euro perlahan (0.9%) diiringi tekanan upah yang masih berlarutan.",
      postMortem: "Kombinasi pertumbuhan perlahan dan inflasi berterusan mencetuskan kebimbangan stagflasi di Eropah, merangsang permintaan emas berdenominasi Euro (XAU/EUR). Emas spot global meningkat +$12.80 manakala pasangan mata wang EUR/USD bergelut di zon sokongan kritikal.",
      metrics: "Gold: +$12.80 (+128 pips) | EUR/USD: -0.28% | Bund 10Y: +6 bps",
      xauDelta: "+$12.80 (+128 pips)",
      dxyDelta: "+0.18%",
      yieldDelta: "+6 bps",
      drivers: [
        "Unjuran pertumbuhan ekonomi Zon Euro disemak turun kepada 0.9% untuk tahun 2026.",
        "Pertumbuhan gaji rundingan (negotiated wages) kekal melebihi 4.2% mengehadkan ruang pelonggaran.",
        "Risiko stagflasi serantau meningkatkan daya tarikan aset nyata dan logam bernilai."
      ],
      assetClassBias: {
        gold: { bias: "STAGFLATION HEDGE", delta: "+$12.80 (+128p)", note: "Aliran dana Eropah membeli emas bagi mengimbangi kelemahan kuasa beli fiat" },
        dxy: { bias: "MILD SUPPORT", delta: "+0.18%", note: "Kelemahan mata wang Euro memberi sokongan mekanikal kepada indeks dolar" },
        yield: { bias: "PERIPHERAL WIDENING", delta: "+6 bps", note: "Spread bon Itali-Jerman BTP/Bund melebar menandakan kegelisahan kredit" },
        macroFx: { bias: "EUR WEAKNESS", delta: "EUR/USD -32p", note: "Pedagang mengambil sikap defensif terhadap prospek ekonomi Zon Eropah" }
      }
    },
    {
      id: "cb-3",
      isDummy: true,
      title: "Bank of Japan Hikes Policy Rate 25 bps to 1.25% (31-Year High), Governor Ueda Signals Further Moves",
      headline: "Bank of Japan Hikes Policy Rate 25 bps to 1.25% (31-Year High), Governor Ueda Signals Further Moves",
      time: "2j lalu",
      impact: "HIGH",
      tag: "BOJ UNWIND",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "BOJ", "YEN", "UEDA"],
      source: "BANK OF JAPAN POLICY BOARD STATEMENT",
      desc: "Gabenor Kazuo Ueda memimpin kenaikan kadar faedah BOJ kali keenam berturut-turut kepada 1.25% paras tertinggi sejak 1995 disokong lonjakan gaji buruh musim bunga dan inflasi perkhidmatan yang konsisten melebihi 2.8%.",
      synthesis: "Gabenor Kazuo Ueda memimpin kenaikan kadar faedah BOJ kali keenam berturut-turut kepada 1.25% paras tertinggi sejak 1995 disokong lonjakan gaji buruh musim bunga dan inflasi perkhidmatan yang konsisten melebihi 2.8%.",
      postMortem: "Kenaikan kadar keenam di bawah Ueda mencetuskan penutupan posisi Yen carry-trade merentas pasaran Asia, melemahkan DXY (-0.62%) dan menyokong lantunan harga emas spot sebanyak +$16.40 di sesi pasaran Asia dan London.",
      metrics: "Gold: +$16.40 (+164 pips) | USD/JPY: -185 pips | Nikkei: -2.1%",
      xauDelta: "+$16.40 (+164 pips)",
      dxyDelta: "-0.62%",
      yieldDelta: "+7 bps (JGB)",
      drivers: [
        "Kenaikan kadar faedah ke 1.25% menamatkan era dasar kadar sifar selama lebih tiga dekad.",
        "Penutupan posisi pembiayaan Yen (carry-trade unwind) mencetuskan volatiliti mudah tunai merentas pasaran.",
        "Pelemahan mendadak dolar berbanding Yen mengurangkan tekanan ke atas harga komoditi."
      ],
      assetClassBias: {
        gold: { bias: "LIQUIDITY EXPANSION", delta: "+$16.40 (+164p)", note: "Pelemahan indeks dolar memacu lonjakan minat belian spot emas fizikal" },
        dxy: { bias: "BEARISH REVERSAL", delta: "-0.62%", note: "Penurunan ketara pasangan USD/JPY menolak DXY ke bawah aras sokongan" },
        yield: { bias: "GLOBAL SPILLOVER", delta: "+7 bps", note: "Hasil bon kerajaan Jepun (JGB 10Y) melonjak ke paras tertinggi dekad ini" },
        macroFx: { bias: "JPY RALLY", delta: "USD/JPY -185p", note: "Yen Jepun mengukuh secara agresif merentas semua silang mata wang utama" }
      }
    }
  ],
  geopolitical: [
    {
      id: "geo-1",
      isDummy: true,
      title: "Middle East & Red Sea Maritime Conflict Escalates War Risk Premiums as Multi-Front Tensions Flare",
      headline: "Middle East & Red Sea Maritime Conflict Escalates War Risk Premiums as Multi-Front Tensions Flare",
      time: "2j 15m lalu",
      impact: "HIGH",
      tag: "CONFLICT RISK",
      categoryTag: "Geopolitical",
      category: "Geopolitical",
      tags: ["Geopolitical", "RED SEA", "WAR RISK", "DEFENSE"],
      source: "DEFENSE INTELLIGENCE & LLOYD'S MARITIME MONITOR",
      desc: "Serangan peluru berpandu baharu ke atas infrastruktur logistik maritim mendorong syarikat perkapalan gergasi menghentikan transit Laut Merah sepenuhnya, mencetuskan lonjakan premium risiko keselamatan geopolitik.",
      synthesis: "Serangan peluru berpandu baharu ke atas infrastruktur logistik maritim mendorong syarikat perkapalan gergasi menghentikan transit Laut Merah sepenuhnya, mencetuskan lonjakan premium risiko keselamatan geopolitik.",
      postMortem: "Eskalasi risiko maritim bertindak sebagai pemangkin kecemasan bagi aset keselamatan kualiti tinggi (flight-to-quality). Emas melonjak pantas +$24.60 dengan spread bidaan-permintaan menegang, mengukuhkan peranan emas sebagai pelindung mutlak ketidaktentuan geopolitik.",
      metrics: "Gold: +$24.60 (+246 pips) | VIX: +18.4% | Silver: +3.2%",
      xauDelta: "+$24.60 (+246 pips)",
      dxyDelta: "+0.12%",
      yieldDelta: "-5 bps",
      drivers: [
        "Laluan perkapalan Teluk Aden dan Bab el-Mandeb mengalami penutupan berkesan sehingga suku keempat.",
        "Kadar tambang kontena Asia-Eropah melonjak melepasi $6,800 setiap FEU.",
        "Permintaan aset selamat fizikal melonjak di bursa London Bullion Market Association (LBMA)."
      ],
      assetClassBias: {
        gold: { bias: "FLIGHT-TO-SAFETY", delta: "+$24.60 (+246p)", note: "Aliran masuk kecemasan ke dalam simpanan emas diperakui tanpa risiko pihak lawan" },
        dxy: { bias: "DEFENSIVE SUPPORT", delta: "+0.12%", note: "Permintaan kecairan dolar kekal teguh sebagai instrumen penyelesaian perdagangan" },
        yield: { bias: "BOND RALLY", delta: "-5 bps", note: "Hasil bon perbendaharaan AS menurun berikutan pembelian panik bon berdaulat" },
        macroFx: { bias: "SWISS FRANC BID", delta: "EUR/CHF -45p", note: "Mata wang pelindung nilai tradisi Franc Swiss dan Yen melonjak" }
      }
    },
    {
      id: "geo-2",
      isDummy: true,
      title: "US-China Semiconductor & AI Tech Export Curbs Tighten Ahead of November 2026 Tariff Suspension",
      headline: "US-China Semiconductor & AI Tech Export Curbs Tighten Ahead of November 2026 Tariff Suspension",
      time: "2j 45m lalu",
      impact: "HIGH",
      tag: "TRADE FRICTION",
      categoryTag: "Geopolitical",
      category: "Geopolitical",
      tags: ["Geopolitical", "TARIFFS", "TECH EMBARGO", "TRADE"],
      source: "DEPARTMENT OF COMMERCE & US-CHINA STRATEGIC REVIEW",
      desc: "Jabatan Perdagangan AS memperluas sekatan cip semikonduktor kecerdasan buatan termaju manakala Beijing membalas dengan mengetatkan kawalan eksport mineral nadir bumi dan galium sebelum tarikh luput penggantungan tarif November 2026.",
      synthesis: "Jabatan Perdagangan AS memperluas sekatan cip semikonduktor kecerdasan buatan termaju manakala Beijing membalas dengan mengetatkan kawalan eksport mineral nadir bumi dan galium sebelum tarikh luput penggantungan tarif November 2026.",
      postMortem: "Ketidakpastian dasar tarif perdagangan dan sekatan teknologi mendorong pengurus dana mengurangkan pendedahan saham berisiko tinggi dan memindahkan peruntukan ke dalam komoditi fizikal. Emas mencatatkan kenaikan +$13.50 di tengah sentimen defensif pasaran ekuiti.",
      metrics: "Gold: +$13.50 (+135 pips) | SOX Index: -3.4% | CNH: -0.45%",
      xauDelta: "+$13.50 (+135 pips)",
      dxyDelta: "+0.22%",
      yieldDelta: "-3 bps",
      drivers: [
        "Sekatan peralatan litografi dan pemproses AI generasi baharu menjejaskan rantaian bekalan perkakasan.",
        "Sekatan eksport antimoni dan galium oleh China meningkatkan kos pembuatan ketenteraan global.",
        "Kekhuatiran perang tarif pusingan baharu mendorong kepelbagaian rizab institusi."
      ],
      assetClassBias: {
        gold: { bias: "HEDGE EXPANSION", delta: "+$13.50 (+135p)", note: "Instrumen pelindung nilai rantaian bekalan dan fragmentasi pasaran global" },
        dxy: { bias: "TRADE HEDGE BID", delta: "+0.22%", note: "Dolar disokong oleh aliran penutupan kedudukan ekuiti berorientasikan eksport" },
        yield: { bias: "GROWTH DRAG", delta: "-3 bps", note: "Kebimbangan pertumbuhan industri global menekan hasil bon jangka panjang" },
        macroFx: { bias: "EM WEAKNESS", delta: "USD/CNH +42p", note: "Mata wang pasaran pesat membangun Asia mengalami tekanan susut nilai terkawal" }
      }
    },
    {
      id: "geo-3",
      isDummy: true,
      title: "Record 45% of Central Banks Accelerate Gold Inflows; Sovereign De-Dollarisation Sets $4,900 Target",
      headline: "Record 45% of Central Banks Accelerate Gold Inflows; Sovereign De-Dollarisation Sets $4,900 Target",
      time: "3j lalu",
      impact: "HIGH",
      tag: "GEOPOLITICS",
      categoryTag: "Geopolitical",
      category: "Geopolitical",
      tags: ["Geopolitical", "DE-DOLLAR", "GOLD", "RESERVES"],
      source: "WORLD GOLD COUNCIL RESEARCH",
      desc: "Tinjauan rasmi bank pusat mendedahkan rekod 45% merancang meningkatkan pegangan emas dengan 89% meramalkan peningkatan rizab emas global, dipacu oleh pembelian konsisten 1,000 tan setahun dan unjuran Goldman Sachs mencecah $4,900/oz.",
      synthesis: "Tinjauan rasmi bank pusat mendedahkan rekod 45% merancang meningkatkan pegangan emas dengan 89% meramalkan peningkatan rizab emas global, dipacu oleh pembelian konsisten 1,000 tan setahun dan unjuran Goldman Sachs mencecah $4,900/oz.",
      postMortem: "Pengumpulan emas berstruktur oleh bank pusat pasaran membangun membentuk lantai harga institusi yang tidak dapat ditembusi. Pembelian berterusan ini menyerap sebarang tekanan jualan jangka pendek dan menyumbang lonjakan +$19.30 kepada harga emas spot.",
      metrics: "Gold: +$19.30 (+193 pips) | DXY: -0.38% | US10Y: -1 bps",
      xauDelta: "+$19.30 (+193 pips)",
      dxyDelta: "-0.38%",
      yieldDelta: "-1 bps",
      drivers: [
        "Purata perolehan emas tahunan bank pusat melebihi 1,000 tan metrik bagi tahun keempat berturut-turut.",
        "89% pengurus rizab berdaulat menjangkakan rizab emas bank pusat dunia terus berkembang.",
        "Goldman Sachs Research menaikkan unjuran sasaran harga emas kepada $4,900 bagi akhir 2026."
      ],
      assetClassBias: {
        gold: { bias: "STRUCTURAL BULLISH", delta: "+$19.30 (+193p)", note: "Sokongan pembelian rizab berdaulat membentuk lantai harga kekal" },
        dxy: { bias: "BEARISH", delta: "-0.38%", note: "Diversifikasi keluar daripada kebergantungan aset tunggal fiat" },
        yield: { bias: "STABLE", delta: "-1 bps", note: "Pengimbangan semula portfolio bon kedaulatan global" },
        macroFx: { bias: "DIVERSIFYING", delta: "Sovereign Holdings", note: "Peruntukan modal beralih kepada rizab aset ketara berbilang hala" }
      }
    }
  ]
};

const MOCK_NEWS_DATA = MARKET_NEWS_DATA;

/* ============================================================
   DUMMY_DATA_END
   ============================================================ */

// Attach to browser global window scope for vanilla JS engine in index.html
if (typeof window !== 'undefined') {
  window.TIER1_CATALYST_CONFIG = TIER1_CATALYST_CONFIG;
  window.MARKET_NEWS_DATA = MARKET_NEWS_DATA;
  window.MOCK_NEWS_DATA = MARKET_NEWS_DATA;
}

if (typeof globalThis !== 'undefined') {
  globalThis.TIER1_CATALYST_CONFIG = TIER1_CATALYST_CONFIG;
  globalThis.MARKET_NEWS_DATA = MARKET_NEWS_DATA;
  globalThis.MOCK_NEWS_DATA = MARKET_NEWS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TIER1_CATALYST_CONFIG, MARKET_NEWS_DATA, MOCK_NEWS_DATA };
}
})();

