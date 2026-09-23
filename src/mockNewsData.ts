/* =====================================================================
   ZED EDITOR TODO: BACKEND TELEGRAM CRON INTEGRATION
   =====================================================================
   - Target VIP Group ID: -3960855060
   - Bot Target: @OWLfx_IE_bot
   - Architecture: Do not run Telegram POST requests directly from here.
   - Action: Replace this dummy state by fetching from Next.js API route 
     (e.g., /api/active-alerts) which is updated by Vercel Cron Jobs.
   ===================================================================== */

/* ============================================================
   DUMMY_DATA_START: HAPUS BLOK INI SAAT KONEKSI KE REAL API
   ============================================================ */

export interface Tier1CatalystConsensus {
  previous: string;
  forecast: string;
  devThreshold: string;
  histVolatility: string;
}

export interface VipTelegramSyncMetadata {
  active: boolean;
  badgeText: string;
  targetGroupId: string;
  botTarget: string;
  status: string;
  lastSyncTimestamp: string;
}

export interface Tier1CatalystConfig {
  id: string;
  isDummy: boolean;
  title: string;
  subLabel: string;
  category: string;
  description: string;
  consensus: Tier1CatalystConsensus;
  sessionTime: string;
  defaultHoursAhead: number;
  defaultMinsAhead: number;
  vipTelegramSync: VipTelegramSyncMetadata;
  statusBadge: string;
  subStatus: string;
}

export const TIER1_CATALYST_CONFIG: Tier1CatalystConfig = {
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

export interface AssetClassBiasDetail {
  bias: string;
  delta: string;
  note: string;
}

export interface AssetClassBiasMap {
  gold: AssetClassBiasDetail;
  dxy: AssetClassBiasDetail;
  yield: AssetClassBiasDetail;
  macroFx: AssetClassBiasDetail;
}

export interface NewsItemStructure {
  id: string;
  isDummy: boolean;
  title: string;
  headline: string;
  time: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  tag: string;
  categoryTag: string;
  category: string;
  tags: string[];
  source: string;
  desc: string;
  synthesis: string;
  postMortem: string;
  metrics: string;
  xauDelta: string;
  dxyDelta: string;
  yieldDelta: string;
  drivers: string[];
  assetClassBias: AssetClassBiasMap;
}

export const MARKET_NEWS_DATA: {
  highImpact: NewsItemStructure[];
  centralBank: NewsItemStructure[];
  geopolitical: NewsItemStructure[];
} = {
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
        gold: { bias: "BEARISH", delta: "-$18.40 (-184p)", note: "Tekanan jualan jangka pendek diuji pada sokongan teknikal" },
        dxy: { bias: "BULLISH", delta: "+0.48%", note: "Aliran masuk modal ke dolar susulan data inflasi tegar" },
        yield: { bias: "FIRM", delta: "+8 bps", note: "Hasil US10Y melantun ke paras rintangan mingguan" },
        macroFx: { bias: "BEARISH", delta: "EUR/USD & GBP/USD", note: "Mata wang utama mengalami tekanan berbanding USD" }
      }
    },
    {
      id: "hi-2",
      isDummy: true,
      title: "US Non-Farm Payrolls Surge to 162,000 in August Crushing 56,000 Forecast, Unemployment Holds at 4.1%",
      headline: "US Non-Farm Payrolls Surge to 162,000 in August Crushing 56,000 Forecast, Unemployment Holds at 4.1%",
      time: "25m lalu",
      impact: "HIGH",
      tag: "LABOR",
      categoryTag: "High Impact",
      category: "High Impact",
      tags: ["High Impact", "NFP", "LABOR", "EMPLOYMENT"],
      source: "US DEPT OF LABOR",
      desc: "Ekonomi AS menambah 162,000 peluang pekerjaan pada Ogos 2026, melepasi konsensus pasaran sebanyak 56,000 secara signifikan dengan kadar pengangguran kekal stabil pada 4.1%.",
      synthesis: "Ekonomi AS menambah 162,000 peluang pekerjaan pada Ogos 2026, melepasi konsensus pasaran sebanyak 56,000 secara signifikan dengan kadar pengangguran kekal stabil pada 4.1%.",
      postMortem: "Kekuatan pasaran buruh AS yang luar biasa memadamkan naratif kemelesetan ekonomi dan mencetuskan lonjakan DXY menembusi paras 100.00. Harga emas tergelincir -$26.80 dalam reaksi pembukaan pantas apabila pedagang menyelaraskan semula kedudukan lindung nilai kadar faedah.",
      metrics: "Gold: -$26.80 (-268 pips) | DXY: +0.65% | US10Y: +11 bps",
      xauDelta: "-$26.80 (-268 pips)",
      dxyDelta: "+0.65%",
      yieldDelta: "+11 bps",
      drivers: [
        "Pertambahan pekerjaan 162,000 adalah catatan bulanan terkuat sejak Mac 2026.",
        "Kadar pengangguran bertahan pada 4.1% mengesahkan daya tahan kitaran ekonomi AS.",
        "Pasaran hadapan kadar faedah menyingkirkan kemungkinan pemotongan kadar kecemasan."
      ],
      assetClassBias: {
        gold: { bias: "STRONG BEARISH", delta: "-$26.80 (-268p)", note: "Liquidasi ketara susulan lonjakan mendadak hasil bon" } ,
        dxy: { bias: "STRONG BULLISH", delta: "+0.65%", note: "DXY mengukuh kukuh melepasi halangan 100.00" },
        yield: { bias: "SURGE", delta: "+11 bps", note: "Keluk hasil bon 10-Tahun menegang ketara" },
        macroFx: { bias: "BEARISH", delta: "AUD/USD & NZD/USD", note: "Mata wang pro-pertumbuhan tertekan susulan pengukuhan dolar" }
      }
    },
    {
      id: "hi-3",
      isDummy: true,
      title: "Brent Crude Re-Tests $92/bbl Resistance as Red Sea & Hormuz Chokepoints Disrupt Tanker Routes",
      headline: "Brent Crude Re-Tests $92/bbl Resistance as Red Sea & Hormuz Chokepoints Disrupt Tanker Routes",
      time: "48m lalu",
      impact: "HIGH",
      tag: "ENERGY",
      categoryTag: "High Impact",
      category: "High Impact",
      tags: ["High Impact", "ENERGY", "BRENT", "COMMODITIES"],
      source: "REUTERS COMMODITIES DESK",
      desc: "Harga minyak mentah Brent kembali menguji paras $92 setong berikutan lencongan kapal tangki di Laut Merah dan peningkatan ketegangan di Selat Hormuz yang melonjakkan kos tambang perkapalan sebanyak 25-30%.",
      synthesis: "Harga minyak mentah Brent kembali menguji paras $92 setong berikutan lencongan kapal tangki di Laut Merah dan peningkatan ketegangan di Selat Hormuz yang melonjakkan kos tambang perkapalan sebanyak 25-30%.",
      postMortem: "Lonjakan harga tenaga menyuntik semula premi risiko inflasi global, mendorong aliran masuk modal ke dalam emas fizikal sebagai aset pelindung nilai terkemuka (safe haven). Emas spot melonjak +$21.50 disokong oleh permintaan komoditi institusi merentas benua.",
      metrics: "Gold: +$21.50 (+215 pips) | DXY: +0.18% | US10Y: +5 bps",
      xauDelta: "+$21.50 (+215 pips)",
      dxyDelta: "+0.18%",
      yieldDelta: "+5 bps",
      drivers: [
        "Lencongan kapal mengelilingi Tanjung Harapan menambah 10-14 hari masa transit Asia-Eropah.",
        "Kadar tambang kontena dan tanker FAK melonjak 25-30% di koridor perdagangan utama.",
        "Risiko gangguan rute tenaga mencetuskan peruntukan modal lindung nilai ke logam berharga."
      ],
      assetClassBias: {
        gold: { bias: "BULLISH", delta: "+$21.50 (+215p)", note: "Permintaan safe haven komoditi fizikal meningkat teguh" },
        dxy: { bias: "NEUTRAL-BULLISH", delta: "+0.18%", note: "Permintaan dolar dari penyelesaian import tenaga" },
        yield: { bias: "ELEVATED", delta: "+5 bps", note: "Kenaikan ekspektasi inflasi breakeven 5-Tahun" },
        macroFx: { bias: "BULLISH", delta: "CAD & NOK", note: "Mata wang pengeksport minyak menikmati sokongan dagangan" }
      }
    }
  ],
  centralBank: [
    {
      id: "cb-1",
      isDummy: true,
      title: "Federal Reserve Hikes Benchmark Rate 25 bps to 3.75%-4.00% Range, Powell Flags Dot Plot to 4.4%",
      headline: "Federal Reserve Hikes Benchmark Rate 25 bps to 3.75%-4.00% Range, Powell Flags Dot Plot to 4.4%",
      time: "12m lalu",
      impact: "HIGH",
      tag: "FED",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "FED", "POWELL", "RATES"],
      source: "FEDERAL RESERVE BOARD",
      desc: "Jawatankuasa Pasaran Terbuka Persekutuan (FOMC) sebulat suara menaikkan kadar dana persekutuan sebanyak 25 mata asas kepada julat 3.75%-4.00%, dengan unjuran 'dot plot' mensasarkan kadar 4.1%-4.4% menjelang akhir tahun.",
      synthesis: "Jawatankuasa Pasaran Terbuka Persekutuan (FOMC) sebulat suara menaikkan kadar dana persekutuan sebanyak 25 mata asas kepada julat 3.75%-4.00%, dengan unjuran 'dot plot' mensasarkan kadar 4.1%-4.4% menjelang akhir tahun.",
      postMortem: "Keputusan kenaikan kadar faedah kali pertama sejak 2023 membuktikan keazaman Fed dalam memerangi inflasi tegar. Emas mengalami pembetulan sederhana -$15.20 manakala DXY naik +0.52% susulan kenyataan Powell bahawa kestabilan harga adalah prasyarat mutlak ekonomi.",
      metrics: "Gold: -$15.20 (-152 pips) | DXY: +0.52% | US10Y: +7 bps",
      xauDelta: "-$15.20 (-152 pips)",
      dxyDelta: "+0.52%",
      yieldDelta: "+7 bps",
      drivers: [
        "Undian sebulat suara FOMC menaikkan julat sasaran penanda aras kepada 3.75%-4.00%.",
        "Unjuran median dot plot mengesahkan sekurang-kurangnya satu lagi kenaikan sebelum akhir tahun.",
        "Pengerusi Powell menekankan pendekatan bergantung data secara mesyuarat demi mesyuarat."
      ],
      assetClassBias: {
        gold: { bias: "BEARISH", delta: "-$15.20 (-152p)", note: "Kos memegang aset bukan faedah meningkat semula" },
        dxy: { bias: "STRONG BULLISH", delta: "+0.52%", note: "Kelebihan hasil faedah menyokong kekuatan dolar" },
        yield: { bias: "UPWARD", delta: "+7 bps", note: "Yield 2Y dan 10Y AS meningkat selari hala tuju Fed" },
        macroFx: { bias: "BEARISH", delta: "Major Currencies", note: "Tekanan jualan meluas ke atas mata wang Eropah dan Pasifik" }
      }
    },
    {
      id: "cb-2",
      isDummy: true,
      title: "ECB Delivers 25 bps Rate Increase as Lagarde Warns on Persistent Eurozone Stagflation Risks",
      headline: "ECB Delivers 25 bps Rate Increase as Lagarde Warns on Persistent Eurozone Stagflation Risks",
      time: "1j lalu",
      impact: "MEDIUM",
      tag: "ECB",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "ECB", "LAGARDE", "EUROZONE"],
      source: "EUROPEAN CENTRAL BANK",
      desc: "Presiden ECB Christine Lagarde dan Majlis Tadbir menaikkan tiga kadar faedah utama sebanyak 25 bps di tengah-tengah unjuran inflasi kawasan Euro pada 3.0% dan pertumbuhan ekonomi yang perlahan pada 0.9% bagi 2026.",
      synthesis: "Presiden ECB Christine Lagarde dan Majlis Tadbir menaikkan tiga kadar faedah utama sebanyak 25 bps di tengah-tengah unjuran inflasi kawasan Euro pada 3.0% dan pertumbuhan ekonomi yang perlahan pada 0.9% bagi 2026.",
      postMortem: "Kombinasi pertumbuhan perlahan dan inflasi berterusan mencetuskan kebimbangan stagflasi di Eropah, merangsang permintaan emas berdenominasi Euro (XAU/EUR). Emas spot global meningkat +$12.80 manakala pasangan mata wang EUR/USD bergelut di zon sokongan kritikal.",
      metrics: "Gold: +$12.80 (+128 pips) | DXY: -0.10% | US10Y: +2 bps",
      xauDelta: "+$12.80 (+128 pips)",
      dxyDelta: "-0.10%",
      yieldDelta: "+2 bps",
      drivers: [
        "Unjuran inflasi Eurozone 2026 disemak naik kepada 3.0% ekoran lonjakan kos input tenaga.",
        "Pertumbuhan KDNK zon Euro dianggarkan lembap pada kadar 0.9% sepanjang tahun ini.",
        "Keputusan kadar mencerminkan kesediaan ECB mengutamakan kawalan inflasi mengatasi pertumbuhan."
      ],
      assetClassBias: {
        gold: { bias: "BULLISH", delta: "+$12.80 (+128p)", note: "Permintaan emas fizikal di benua Eropah meningkat teguh" },
        dxy: { bias: "MILD BEARISH", delta: "-0.10%", note: "Pengurangan jurang kadar faedah transatlantik jangka pendek" },
        yield: { bias: "TIGHTENING", delta: "+2 bps", note: "Yield bon kerajaan Jerman (Bund) melantun sedikit" },
        macroFx: { bias: "VOLATILE", delta: "EUR/USD & EUR/GBP", note: "Euro berayun dalam koridor sempit pasca kenyataan Lagarde" }
      }
    },
    {
      id: "cb-3",
      isDummy: true,
      title: "Bank of Japan Hikes Policy Rate 25 bps to 1.25% (31-Year High), Governor Ueda Signals Further Moves",
      headline: "Bank of Japan Hikes Policy Rate 25 bps to 1.25% (31-Year High), Governor Ueda Signals Further Moves",
      time: "2j lalu",
      impact: "HIGH",
      tag: "BOJ",
      categoryTag: "Central Bank",
      category: "Central Bank",
      tags: ["Central Bank", "BOJ", "UEDA", "YEN"],
      source: "BANK OF JAPAN TOKYO",
      desc: "Bank of Japan menaikkan kadar faedah dasarnya sebanyak suku mata kepada 1.25%—paras tertinggi dalam tempoh 31 tahun—dengan Gabenor Kazuo Ueda menegaskan bahawa fasa penentuan dasar telah berubah untuk mengekang inflasi melebihi 2%.",
      synthesis: "Bank of Japan menaikkan kadar faedah dasarnya sebanyak suku mata kepada 1.25%—paras tertinggi dalam tempoh 31 tahun—dengan Gabenor Kazuo Ueda menegaskan bahawa fasa penentuan dasar telah berubah untuk mengekang inflasi melebihi 2%.",
      postMortem: "Kenaikan kadar keenam di bawah Ueda mencetuskan penutupan posisi Yen carry-trade merentas pasaran Asia, melemahkan DXY (-0.62%) dan menyokong lantunan harga emas spot sebanyak +$16.40 di sesi pasaran Asia dan London.",
      metrics: "Gold: +$16.40 (+164 pips) | DXY: -0.62% | US10Y: -4 bps",
      xauDelta: "+$16.40 (+164 pips)",
      dxyDelta: "-0.62%",
      yieldDelta: "-4 bps",
      drivers: [
        "Kadar faedah penanda aras Jepun mencecah 1.25%, rekod tertinggi sejak lebih tiga dekad.",
        "Gabenor Ueda menegaskan keperluan mencegah inflasi daripada menyimpang terlalu tinggi dari 2%.",
        "Pembongkaran carry trade mencetuskan pengukuhan Yen dan penguncupan kecairan USD."
      ],
      assetClassBias: {
        gold: { bias: "BULLISH", delta: "+$16.40 (+164p)", note: "Penyusutan DXY membuka ruang kenaikan harga emas spot" },
        dxy: { bias: "BEARISH", delta: "-0.62%", note: "Tekanan jualan dolar didorong pengukuhan mata wang Yen" },
        yield: { bias: "SOFTENING", delta: "-4 bps", note: "Hasil bon AS mengendur susulan rotasi bon serantau" },
        macroFx: { bias: "STRONG BULLISH", delta: "USD/JPY (-165p)", note: "Yen mengukuh secara mendadak terhadap semua mata wang utama" }
      }
    }
  ],
  geopolitical: [
    {
      id: "geo-1",
      isDummy: true,
      title: "Middle East & Red Sea Maritime Conflict Escalates War Risk Premiums as Carriers Reroute via Cape",
      headline: "Middle East & Red Sea Maritime Conflict Escalates War Risk Premiums as Carriers Reroute via Cape",
      time: "38m lalu",
      impact: "HIGH",
      tag: "GEOPOLITICS",
      categoryTag: "Geopolitical",
      category: "Geopolitical",
      tags: ["Geopolitical", "RED SEA", "SHIPPING", "SECURITY"],
      source: "LLOYD'S MARITIME INTELLIGENCE",
      desc: "Ketegangan keselamatan maritim di Laut Merah dan ancaman konflik Selat Hormuz memaksa syarikat perkapalan gergasi meneruskan lencongan melalui Tanjung Harapan, menaikkan premi risiko perang dan kadar FAK sebanyak 25-30%.",
      synthesis: "Ketegangan keselamatan maritim di Laut Merah dan ancaman konflik Selat Hormuz memaksa syarikat perkapalan gergasi meneruskan lencongan melalui Tanjung Harapan, menaikkan premi risiko perang dan kadar FAK sebanyak 25-30%.",
      postMortem: "Eskalasi risiko maritim bertindak sebagai pemangkin kecemasan bagi aset keselamatan kualiti tinggi (flight-to-quality). Emas melonjak pantas +$24.60 dengan spread bidaan-permintaan menegang, mengukuhkan peranan emas sebagai pelindung mutlak ketidaktentuan geopolitik.",
      metrics: "Gold: +$24.60 (+246 pips) | DXY: -0.22% | US10Y: -5 bps",
      xauDelta: "+$24.60 (+246 pips)",
      dxyDelta: "-0.22%",
      yieldDelta: "-5 bps",
      drivers: [
        "Syarikat gergasi MSC, Maersk dan CMA CGM mengekalkan penilaian risiko tinggi di Terusan Suez.",
        "Peningkatan masa transit 10-14 hari mengurangkan kecekapan logistik perkapalan global.",
        "Ancaman eskalasi ke Selat Hormuz mengekalkan premi risiko perang pada tahap maksimum."
      ],
      assetClassBias: {
        gold: { bias: "STRONG BULLISH", delta: "+$24.60 (+246p)", note: "Aliran modal kecemasan ke dalam logam safe haven" },
        dxy: { bias: "DEFENSIVE", delta: "-0.22%", note: "Modal berpecah antara dolar, emas fizikal dan franc Swiss" },
        yield: { bias: "DIP", delta: "-5 bps", note: "Hasil bon AS menurun ekoran pembelian defensif bon" },
        macroFx: { bias: "SAFE-HAVEN", delta: "CHF & JPY", note: "Mata wang pelindung tradisional mendapat bidaan kukuh" }
      }
    },
    {
      id: "geo-2",
      isDummy: true,
      title: "US-China Semiconductor & AI Tech Export Curbs Tighten as November 2026 Tariff Suspension Window Nears",
      headline: "US-China Semiconductor & AI Tech Export Curbs Tighten as November 2026 Tariff Suspension Window Nears",
      time: "1j 15m lalu",
      impact: "MEDIUM",
      tag: "GEOPOLITICS",
      categoryTag: "Geopolitical",
      category: "Geopolitical",
      tags: ["Geopolitical", "TECH", "TARIFFS", "SEMICONDUCTOR"],
      source: "ASIA PACIFIC TRADE DESK",
      desc: "Sekatan eksport cip kecerdasan buatan (AI) dan semikonduktor canggih diperketat menjelang tarikh akhir penggantungan tarif November 2026, mencetuskan gangguan rantaian bekalan dan pembelian awalan oleh firma pengeluar perkakasan.",
      synthesis: "Sekatan eksport cip kecerdasan buatan (AI) dan semikonduktor canggih diperketat menjelang tarikh akhir penggantungan tarif November 2026, mencetuskan gangguan rantaian bekalan dan pembelian awalan oleh firma pengeluar perkakasan.",
      postMortem: "Ketidakpastian dasar tarif perdagangan dan sekatan teknologi mendorong pengurus dana mengurangkan pendedahan saham berisiko tinggi dan memindahkan peruntukan ke dalam komoditi fizikal. Emas mencatatkan kenaikan +$13.50 di tengah sentimen defensif pasaran ekuiti.",
      metrics: "Gold: +$13.50 (+135 pips) | DXY: +0.14% | US10Y: -2 bps",
      xauDelta: "+$13.50 (+135 pips)",
      dxyDelta: "+0.14%",
      yieldDelta: "-2 bps",
      drivers: [
        "Had kapasiti pada nod memori dan logik semikonduktor canggih membataskan rantaian bekalan.",
        "Tarif Seksyen 301 ke atas semikonduktor asal China memicu diversifikasi lokasi kilang.",
        "Permintaan terhadap cip AI kekal tinggi walaupun halangan perdagangan rentas sempadan diperketat."
      ],
      assetClassBias: {
        gold: { bias: "MODERATE BULLISH", delta: "+$13.50 (+135p)", note: "Rotasi sektor keluar daripada saham teknologi ke aset ketara" },
        dxy: { bias: "MILD BULLISH", delta: "+0.14%", note: "Permintaan tunai korporat menyokong kestabilan dolar" },
        yield: { bias: "FLAT", delta: "-2 bps", note: "Pasaran bon bergerak berhati-hati menjelang dialog perdagangan" },
        macroFx: { bias: "MIXED", delta: "Asian Currencies", note: "Mata wang ekonomi berorientasikan eksport menghadapi tekanan" }
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

export const MOCK_NEWS_DATA = MARKET_NEWS_DATA;
/* ============================================================
   DUMMY_DATA_END
   ============================================================ */

export type MockNewsItem = typeof MARKET_NEWS_DATA.highImpact[number];
