export interface Translation {
  nav: {
    about: string;
    groupSupport: string;
    owlAlgo: string;
    roadtour: string;
    ibDevelopment: string;
    education: string;
    community: string;
    badge: string;
    sub: string;
    ctaVip: string;
    adminCms: string;
  };
  hero: {
    statusLive: string;
    ecosystem: string;
    headline1: string;
    headline2: string;
    headline3: string;
    description: string;
    btnMalaysia: string;
    btnIndonesia: string;
    btnAlgoPreview: string;
    badgeLiquidity: string;
    badgeExecution: string;
    badgeLicensed: string;
    statTraders: string;
    statTradersSub: string;
    statWinrate: string;
    statWinrateSub: string;
    statLatency: string;
    statLatencySub: string;
    statVolume: string;
    statVolumeSub: string;
  };
  about: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    pillarsBadge: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    metric1Label: string;
    metric1Desc: string;
    metric2Label: string;
    metric2Desc: string;
    metric3Label: string;
    metric3Desc: string;
  };
  vip: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card3Badge: string;
    card3Title: string;
    card3Desc: string;
    card4Badge: string;
    card4Title: string;
    card4Desc: string;
    calcBadge: string;
    calcTitle: string;
    calcDesc: string;
    lotLabel: string;
    daysLabel: string;
    rateLabel: string;
    estMonthUsd: string;
    estMonthLocal: string;
    estYear: string;
    disclaimer: string;
    proofsBadge: string;
    proofsTitle: string;
    proofsDesc: string;
  };
  algo: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    tvTitle: string;
    tvSub: string;
    metricWinrate: string;
    metricProfitFactor: string;
    metricAvgRR: string;
    metricDrawdown: string;
    accessBadge: string;
    accessTitle: string;
    accessDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    btnTradingView: string;
    btnScript: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaFeature1: string;
    ctaFeature2: string;
    ctaFeature3: string;
    ctaButton: string;
    testimonialsBadge: string;
    testimonialsTitle: string;
  };
  roadtour: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    zoneAll: string;
    zoneEast: string;
    zoneSouth: string;
    zoneNorth: string;
    zoneCentral: string;
    zoneBorneo: string;
    selectStateLabel: string;
    statusCompleted: string;
    statusUpcoming: string;
    statusSoon: string;
    attendeesLabel: string;
    venueLabel: string;
    viewAlbumBtn: string;
    badgeGallery: string;
  };
  ib: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    tabMY: string;
    tabID: string;
    btnRegisterMY: string;
    btnRegisterID: string;
    partnerSupport1: string;
    partnerSupport2: string;
    partnerSupport3: string;
    officialUrlLabel: string;
    supportNote: string;
  };
  education: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    step1Badge: string;
    step1Duration: string;
    step1Title: string;
    step1Desc: string;
    step1Perk: string;
    step1Action: string;
    step2Badge: string;
    step2Duration: string;
    step2Title: string;
    step2Desc: string;
    step2Perk: string;
    step3Badge: string;
    step3Duration: string;
    step3Title: string;
    step3Desc: string;
    step3Perk: string;
    playlistTitle: string;
    btnMasterclass: string;
    masterclassSub: string;
  };
  footer: {
    badge: string;
    headline1: string;
    headline2: string;
    desc: string;
    btnVipCommunity: string;
    btnWhatsAppAdmin: string;
    socialHeading: string;
    socialSub: string;
    securedBy: string;
    ecosystemTag: string;
    disclaimer: string;
  };
}

export const translations: Record<"MY" | "EN", Translation> = {
  MY: {
    nav: {
      about: "Mengenai Kami",
      groupSupport: "MEJA SOKONGAN VIP",
      owlAlgo: "PETUNJUK OWL ALGO",
      roadtour: "JELAJAH MASTERCLASS",
      ibDevelopment: "PROGRAM PEMBANGUNAN IB",
      education: "ASAS DAGANGAN",
      community: "Hubungi Kami",
      badge: "Rasmi",
      sub: "ONE WORLD LEGACY",
      ctaVip: "MAKLUM BALAS",
      adminCms: "Portal CMS",
    },
    hero: {
      statusLive: "OWLFX OFFICIAL LIVE",
      ecosystem: "EKOSISTEM TRADER",
      headline1: "Pemecutan Prestasi",
      headline2: "Infrastruktur Dagangan",
      headline3: "Bertaraf Institusi",
      description:
        "Kombinasi ketepatan algoritma kuantitatif dan pelaksanaan elit. Kami mengintegrasikan sistem pengagihan rebat automatik dan infrastruktur berprestasi tinggi untuk komuniti trader di Malaysia & Indonesia.",
      btnMalaysia: "Sertai Komuniti Malaysia",
      btnIndonesia: "Pendaftaran Indonesia",
      btnAlgoPreview: "Pratonton OWL ALGO",
      badgeLiquidity: "Likuiditi Pelbagai Aset",
      badgeExecution: "Presisi Pelaksanaan Tinggi",
      badgeLicensed: "Pelesenan Master IB",
      statTraders: "Trader Aktif",
      statTradersSub: "Komuniti MY & ID",
      statWinrate: "Penanda Aras Ketepatan",
      statWinrateSub: "Berdasarkan Model Kuantitatif",
      statLatency: "Purata Latensi Pesanan",
      statLatencySub: "Infrastruktur Pelayan ECN",
      statVolume: "Volum Dagangan & Rebat",
      statVolumeSub: "Diproses Melalui MIB",
    },
    about: {
      badge: "MENGENAI OWLFX",
      title1: "Merevolusikan Seni Bina Dagangan Runcit",
      title2: "Menerusi Piawaian Institusi",
      description:
        "OWLFX ditubuhkan dengan satu misi yang teguh: Memperkasa komuniti pedagang Asia Tenggara dengan instrumen dagangan tahap Wall Street, sistem analitik kuantitatif, dan sokongan likuiditi elit — dikuasakan oleh ekosistem MIB yang terbukti ampuh.",
      pillarsBadge: "3 TONGGAK UTAMA",
      pillar1Title: "Kecerdasan Algoritma",
      pillar1Desc:
        "Sistem petunjuk proprietari OWL ALGO yang menyingkirkan bias emosi melalui pengesanan jejak wang pintar (Smart Money) dan kolam likuiditi pasaran.",
      pillar2Title: "Kuasa Institusi MIB",
      pillar2Desc:
        "Kerjasama Master IB elit yang menjana pulangan rebat tunai (self-rebate) tertinggi, tahap leveraj dinamik, dan rangka kerja pengurusan risiko yang sistematik.",
      pillar3Title: "Literasi Kewangan & Jelajah",
      pillar3Desc:
        "Ekspedisi fizikal ke 14 negeri di seluruh Malaysia dan bandar-bandar utama Indonesia untuk menyalurkan latihan secara bersemuka kepada komuniti secara langsung.",
      metric1Label: "SESI ROADTOUR",
      metric1Desc: "Siri Jelajah 14 Negeri",
      metric2Label: "PENANDA ARAS KETEPATAN",
      metric2Desc: "Model Kuantitatif v4.2",
      metric3Label: "INFRASTRUKTUR SOKONGAN",
      metric3Desc: "Meja Bantuan 24/7",
    },
    vip: {
      badge: "MEJA DAGANGAN VIP",
      title1: "Isyarat Berketepatan Tinggi &",
      title2: "Sokongan Komuniti",
      description:
        "Alami ketepatan paras kemasukan (setup) harian, bimbingan langsung, dan integrasi akaun lancar dengan pulangan rebat automatik tanpa sebarang caj tersembunyi.",
      card1Badge: "HAPUSKAN TEKAAN",
      card1Title: "Setup Harian Berpresisi Tinggi",
      card1Desc:
        "Setiap setup dilengkapi zon kemasukan yang disahkan, nisbah Risiko-Ganjaran minimum 1:3, Hentian Rugi (SL) berdisiplin, dan sasaran Ambil Untung (TP) berperingkat.",
      card2Badge: "LIPUTAN MULTI-PASARAN",
      card2Title: "Analisis Pelbagai Aset",
      card2Desc:
        "Pengkhususan utama pada instrumen XAUUSD (Emas), FX Majors (EURUSD, GBPUSD, USDJPY), serta indeks penanda aras global (US30, NAS100).",
      card3Badge: "DATA MASA NYATA",
      card3Title: "Makroekonomi & Fundamental",
      card3Desc:
        "Analisis mendalam mengenai peristiwa makroekonomi berimpak tinggi termasuk NFP, bacaan inflasi CPI, dan peralihan dasar FOMC sebelum pasaran bertindak balas.",
      card4Badge: "EKOSISTEM AKTIF",
      card4Title: "Meja Bantuan Langsung 24/7",
      card4Desc:
        "Ruang dagangan eksklusif di Telegram bersama penganalisis kuantitatif kanan yang bersedia meleraikan kemusykilan teknikal dan pergerakan pasaran anda.",
      calcBadge: "SIMULATOR REBAT TUNAI TRADER",
      calcTitle: "Kalkulator Rebat Tunai Akaun Dagangan",
      calcDesc:
        "Kira potensi pulangan tunai harian dan bulanan yang dikreditkan terus ke akaun dagangan anda, berdasarkan volum pelaksanaan lot sebenar.",
      lotLabel: "Purata Volum Lot Harian:",
      daysLabel: "Jumlah Hari Berdagang (Sebulan):",
      rateLabel: "Kadar Rebat Terjamin:",
      estMonthUsd: "Anggaran Rebat Bulanan (USD)",
      estMonthLocal: "Anggaran Nilai Tempatan",
      estYear: "Unjuran Pulangan Tahunan",
      disclaimer:
        "Rebat tunai akan dikreditkan secara automatik ke dalam dompet trader anda dan sedia untuk pengeluaran serta-merta pada bila-bila masa.",
      proofsBadge: "REKOD PRESTASI TERKINI",
      proofsTitle: "Bukti Setup & Rekod Pasaran",
      proofsDesc:
        "Rekod sejarah dagangan komuniti yang telus, diaudit dan disahkan melalui pengiraan algoritma kuantitatif OWL ALGO.",
    },
    algo: {
      badge: "PETUNJUK KUANTITATIF PROPRIETARI",
      title1: "Sistem Petunjuk",
      title2: "OWL ALGO",
      description:
        "Kejuruteraan khusus untuk platform TradingView. Mengintegrasikan Analisis Volum & Spread (VSA), mitigasi blok pesanan (Order Block) institusi, dan tapisan penembusan palsu (False Breakout) dalam satu paparan yang bersih.",
      tvTitle: "PRATONTON CARTA TRADINGVIEW LANGSUNG",
      tvSub: "Simulasi Enjin Analisis Pelbagai Jangka Masa",
      metricWinrate: "KADAR KEMENANGAN",
      metricProfitFactor: "FAKTOR KEUNTUNGAN",
      metricAvgRR: "PURATA R:R",
      metricDrawdown: "DRAWDOWN MAKSIMUM",
      accessBadge: "AKSES PENUH TRADINGVIEW",
      accessTitle: "Buka Akaun OWLFX Untuk Pendaftaran",
      accessDesc:
        "Petunjuk OWL ALGO diberikan secara 100% PERCUMA kepada semua trader yang mendaftar dan mengesahkan akaun di bawah struktur MIB rasmi OWLFX.",
      feature1: "Pengaktifan automatik sepantas 15 minit",
      feature2: "Akses eksklusif Isyarat Tertutup Telegram VIP",
      feature3: "Kelayakan rebat tunai harian (Self-Rebate)",
      btnTradingView: "Buka Skrip Rasmi OWL ALGO",
      btnScript: "Akses Skrip TradingView",
      ctaBadge: "AKSES PENUH TRADINGVIEW",
      ctaTitle: "Buka Akaun OWLFX Untuk Pendaftaran",
      ctaDesc:
        "Petunjuk OWL ALGO diberikan secara 100% PERCUMA kepada semua trader yang mendaftar dan mengesahkan akaun di bawah struktur MIB rasmi OWLFX.",
      ctaFeature1: "Pengaktifan automatik sepantas 15 minit",
      ctaFeature2: "Akses eksklusif Isyarat Tertutup Telegram VIP",
      ctaFeature3: "Kelayakan rebat tunai harian (Self-Rebate)",
      ctaButton: "Daftar Akaun Dagangan",
      testimonialsBadge: "SUARA KOMUNITI TRADER",
      testimonialsTitle: "Maklum Balas & Prestasi Trader Sebenar",
    },
    roadtour: {
      badge: "EKSPEDISI FIZIKAL BERSIRI",
      title1: "Jelajah Komuniti",
      title2: "OWLFX Seluruh Negara",
      description:
        "Meliputi 14 buah negeri di seluruh Malaysia. Membawakan literasi pasaran bertaraf institusi, analisis teknikal carta secara langsung, dan insentif komuniti — terus ke dewan seminar di negeri anda.",
      zoneAll: "Semua Zon",
      zoneEast: "Pantai Timur",
      zoneSouth: "Selatan",
      zoneNorth: "Utara",
      zoneCentral: "Tengah",
      zoneBorneo: "Borneo",
      selectStateLabel: "PILIH NEGERI UNTUK MELIHAT ALBUM EKSKLUSIF:",
      statusCompleted: "SELESAI",
      statusUpcoming: "AKAN DATANG",
      statusSoon: "AKAN DIUMUMKAN",
      attendeesLabel: "Kehadiran:",
      venueLabel: "Lokasi:",
      viewAlbumBtn: "Lihat Album Penuh",
      badgeGallery: "GALERI FOTO EKSKLUSIF",
    },
    ib: {
      badge: "PERKONGSIAN STRATEGIK & PEMECUTAN",
      title1: "Program Pembangunan Agensi",
      title2: "& Introducing Broker (IB)",
      description:
        "Infrastruktur agensi kewangan terulung di Asia Tenggara. Bina empayar dagangan anda dengan dokongan teknologi OWLFX, sistem komisen pelbagai peringkat, serta geran penajaan lokasi seminar fizikal.",
      tabMY: "Wilayah Malaysia",
      tabID: "Wilayah Indonesia",
      btnRegisterMY: "Pendaftaran IB Malaysia",
      btnRegisterID: "Pendaftaran IB Indonesia",
      partnerSupport1: "Papan Pemuka Analitik Kuantitatif OWLFX",
      partnerSupport2: "Tajaan Bahan Pemasaran & Barangan Rasmi",
      partnerSupport3: "Geran Lokasi Seminar & Produksi Media",
      officialUrlLabel: "PAUTAN RASMI:",
      supportNote:
        "Penyertaan pantas disokong penuh oleh pasukan bantuan rakan kongsi 24/7.",
    },
    education: {
      badge: "AKADEMI & LITERASI KEWANGAN",
      title1: "Silabus Pendidikan Berstruktur",
      title2: "Dari Asas Ke Penguasaan Kuantitatif",
      description:
        "Kerangka pembelajaran berstruktur untuk melatih trader berfikir secara institusi, mengurus varians risiko secara matematik, dan melaksanakan algoritma dengan keyakinan penuh.",
      step1Badge: "LANGKAH 01",
      step1Duration: "Durasi: ~5 Minit",
      step1Title: "Pendaftaran Akaun",
      step1Desc:
        "Mulakan dagangan anda menggunakan pautan rasmi OWLFX. Nikmati kefleksibelan jenis akaun, spread serendah 0.0 pip, dan faedah eksklusif yang disediakan oleh pasukan OWLFX.",
      step1Perk: "✓ Kelayakan Percuma",
      step1Action: "Buka Akaun",
      step2Badge: "LANGKAH 02",
      step2Duration: "Durasi: ~10 Minit",
      step2Title: "Setup OWL ALGO di TradingView",
      step2Desc:
        "Gunakan kelebihan analisis berpresisi OWL ALGO terus di platform TradingView. Sambungkan akaun anda hari ini untuk mengenal pasti zon kemasukan berpotensi tinggi dengan objektif dan tepat.",
      step2Perk: "✓ E-Buku Rasmi",
      step3Badge: "LANGKAH 03",
      step3Duration: "Durasi: Berterusan",
      step3Title: "Risiko Modal & Saiz Lot (Lot Sizing)",
      step3Desc:
        "Guna pakai formula penetapan saiz lot institusi, hadkan risiko pada 1-2% setiap kemasukan, dan jana pulangan rebat tunai automatik harian secara konsisten.",
      step3Perk: "✓ Pulangan Tunai Harian",
      playlistTitle: "EPISOD MASTERCLASS",
      btnMasterclass: "Daftar Masterclass Percuma",
      masterclassSub: "Ikuti Panduan Langkah-Demi-Langkah",
    },
    footer: {
      badge: "KOMUNITI TRADER ELIT",
      headline1: "Sertai Rangkaian Dagangan",
      headline2: "OWLFX Hari Ini",
      desc: "Dapatkan akses terus kepada setup pasaran berpresisi tinggi, sokongan infrastruktur agensi, dan rebat tunai harian yang dikreditkan secara automatik.",
      btnVipCommunity: "Sertai Komuniti VIP",
      btnWhatsAppAdmin: "Hubungi Pentadbir (WhatsApp)",
      socialHeading: "MEDIA SOSIAL & TALIAN CARELINE RASMI",
      socialSub:
        "Ikuti perkembangan harian, jadual siri jelajah, dan video tutorial kami menerusi rangkaian rasmi yang disahkan.",
      securedBy: "Dikuasakan Oleh Enjin OWLFX",
      ecosystemTag: "EKOSISTEM OWLFX",
      disclaimer:
        "AMARAN RISIKO: Dagangan berleveraj seperti Pertukaran Mata Wang Asing (Forex) dan CFD membawa tahap risiko yang tinggi ke atas modal anda. Prestasi masa lalu tidak menjamin keputusan masa hadapan. Sila pastikan anda benar-benar memahami risiko yang terlibat sebelum melaksanakan sebarang dagangan sebenar.",
    },
  },
  EN: {
    nav: {
      about: "About Us",
      groupSupport: "VIP Singal & Support",
      owlAlgo: "OWL ALGO INDICATOR",
      roadtour: "MASTERCLASS ROADTOUR",
      ibDevelopment: "IB DEV PROGRAM",
      education: "BASIC TRADING",
      community: "Find Us",
      badge: "Official",
      sub: "ONE WORLD LEGACY",
      ctaVip: "MAKLUM BALAS",
      adminCms: "CMS Portal",
    },
    hero: {
      statusLive: "OWLFX OFFICIAL LIVE",
      ecosystem: "TRADER ECOSYSTEM",
      headline1: "Performance Acceleration",
      headline2: "Institutional Trading",
      headline3: "Infrastructure",
      description:
        "Where quantitative precision meets elite execution. Automated rebate distribution and high-performance algorithms built for traders across Malaysia & Indonesia.",
      btnMalaysia: "Join Malaysia Community",
      btnIndonesia: "Indonesia Registration",
      btnAlgoPreview: "OWL ALGO Preview",
      badgeLiquidity: "Multi-Asset Liquidity",
      badgeExecution: "High Precision Execution",
      badgeLicensed: "Master IB Licensed",
      statTraders: "Active Traders",
      statTradersSub: "MY & ID Communities",
      statWinrate: "Winrate Benchmark",
      statWinrateSub: "Based on Quant Models",
      statLatency: "Average Order Latency",
      statLatencySub: "ECN Server Infrastructure",
      statVolume: "Rebates & Managed Volume",
      statVolumeSub: "Processed Through MIB",
    },
    about: {
      badge: "ABOUT OWLFX",
      title1: "Revolutionizing Retail Trading Architecture",
      title2: "With Institutional Standards",
      description:
        "OWLFX was established with one steadfast mission: Empower Southeast Asian trading communities with Wall Street-grade trading instruments, quantitative analytics systems, and premier liquidity support — underpinned by a battle-tested MIB ecosystem.",
      pillarsBadge: "3 CORE PILLARS",
      pillar1Title: "Algorithmic Intelligence",
      pillar1Desc:
        "Proprietary OWL ALGO indicator system eliminating emotional bias through smart money footprint tracking and liquidity pool detection.",
      pillar2Title: "MIB Institutional Power",
      pillar2Desc:
        "Elite Master IB partnerships delivering maximum daily self-rebates, agile leverage tiers, and systematic risk management frameworks.",
      pillar3Title: "Financial Literacy & Roadtour",
      pillar3Desc:
        "Physical nationwide roadtour across all 14 Malaysian states and key Indonesian metropolises providing direct hands-on training to our community.",
      metric1Label: "ROADTOUR SESSIONS",
      metric1Desc: "14 States Tour Series",
      metric2Label: "ACCURACY BENCHMARK",
      metric2Desc: "Quant Model v4.2",
      metric3Label: "SUPPORT INFRASTRUCTURE",
      metric3Desc: "24/7 Desk Support",
    },
    vip: {
      badge: "VIP TRADING DESK",
      title1: "High-Precision Signals &",
      title2: "Community Support",
      description:
        "Experience pinpoint daily setup accuracy, live mentor guidance, and seamless account integration with automated self-rebate returns without hidden costs.",
      card1Badge: "ELIMINATE GUESSWORK",
      card1Title: "High-Precision Daily Setups",
      card1Desc:
        "Every setup features defined entry zones, minimum 1:3 Risk-to-Reward ratio, disciplined Stop Loss levels, and multi-tier Take Profit targets.",
      card2Badge: "MULTI-MARKET COVERAGE",
      card2Title: "Multi-Asset Analysis",
      card2Desc:
        "Core specialization on XAUUSD (Gold), FX Majors (EURUSD, GBPUSD, USDJPY), and benchmark global indices (US30, NAS100).",
      card3Badge: "REAL-TIME INTEL",
      card3Title: "Fundamental & Macro News",
      card3Desc:
        "In-depth analysis of high-impact macroeconomic events including NFP, CPI inflation prints, and FOMC policy shifts before market volatility spikes.",
      card4Badge: "ACTIVE ECOSYSTEM",
      card4Title: "24/7 Live Support Desk",
      card4Desc:
        "Exclusive Telegram trading desk with senior quantitative analysts ready to field technical and market execution questions.",
      calcBadge: "TRADER CASH REBATE SIMULATOR",
      calcTitle: "Trading Account Cash Rebate Calculator",
      calcDesc:
        "Calculate potential daily and monthly cash returns credited directly to your trading account based on real execution volume.",
      lotLabel: "Average Daily Lots Traded:",
      daysLabel: "Trading Days Per Month:",
      rateLabel: "Guaranteed Rebate Rate:",
      estMonthUsd: "Estimated Monthly Rebate (USD)",
      estMonthLocal: "Estimated Local Value",
      estYear: "Annual Projected Return",
      disclaimer:
        "Cash rebates are credited automatically into your trader wallet and are available for immediate withdrawal anytime.",
      proofsBadge: "RECENT PERFORMANCE TRACK RECORD",
      proofsTitle: "Verified Setups & Market Records",
      proofsDesc:
        "Transparent community trade history audited with quantitative OWL ALGO algorithmic confirmations.",
    },
    algo: {
      badge: "PROPRIETARY QUANTITATIVE INDICATOR",
      title1: "Indicator System",
      title2: "OWL ALGO",
      description:
        "Engineered specifically for TradingView. Integrates Volume Spread Analysis (VSA), institutional order block mitigation, and false breakout filtering into a single clutter-free display.",
      tvTitle: "LIVE TRADINGVIEW CHART PREVIEW",
      tvSub: "Multi-Timeframe Analysis Engine Simulation",
      metricWinrate: "WIN RATE",
      metricProfitFactor: "PROFIT FACTOR",
      metricAvgRR: "AVERAGE R:R",
      metricDrawdown: "MAX DRAWDOWN",
      accessBadge: "FULL TRADINGVIEW ACCESS",
      accessTitle: "Open an Account with OWLFX to Register",
      accessDesc:
        "The OWL ALGO indicator is provided 100% FREE to all traders who register and verify their accounts under the official OWLFX MIB structure.",
      feature1: "Automated activation within 15 minutes",
      feature2: "Includes VIP Telegram Private Alerts",
      feature3: "Eligible for daily cash self-rebates",
      btnTradingView: "Open Official OWL ALGO Script",
      btnScript: "Open TradingView Script",
      ctaBadge: "FULL TRADINGVIEW ACCESS",
      ctaTitle: "Open an Account with OWLFX to Register",
      ctaDesc:
        "The OWL ALGO indicator is provided 100% FREE to all traders who register and verify their accounts under the official OWLFX MIB structure.",
      ctaFeature1: "Automated activation within 15 minutes",
      ctaFeature2: "Includes VIP Telegram Private Alerts",
      ctaFeature3: "Eligible for daily cash self-rebates",
      ctaButton: "Register Trading Account",
      testimonialsBadge: "COMMUNITY VOICES",
      testimonialsTitle: "Real Trader Feedback & Performance",
    },
    roadtour: {
      badge: "NATIONWIDE PHYSICAL EXPEDITION",
      title1: "OWLFX Community",
      title2: "Nationwide Roadtour",
      description:
        "Covering 14 states across Malaysia. Bringing institutional-grade market education, live chart breakdowns, and community benefits directly to your local state seminar halls.",
      zoneAll: "All",
      zoneEast: "East Coast",
      zoneSouth: "Southern",
      zoneNorth: "Northern",
      zoneCentral: "Central",
      zoneBorneo: "Borneo",
      selectStateLabel: "SELECT STATE TO VIEW EXCLUSIVE ALBUM:",
      statusCompleted: "COMPLETED",
      statusUpcoming: "UPCOMING",
      statusSoon: "COMING SOON",
      attendeesLabel: "Attendees:",
      venueLabel: "Venue:",
      viewAlbumBtn: "View Full Album",
      badgeGallery: "EXCLUSIVE PHOTO GALLERY",
    },
    ib: {
      badge: "STRATEGIC PARTNERSHIP & ACCELERATOR",
      title1: "Agency & Introducing Broker (IB)",
      title2: "Development Program",
      description:
        "The premier financial agency infrastructure in Southeast Asia. Build your trading enterprise with OWLFX technology backing, multi-tier rebate commissions, and sponsored physical seminar venues.",
      tabMY: "Malaysia Region",
      tabID: "Indonesia Region",
      btnRegisterMY: "Register IB Malaysia",
      btnRegisterID: "Register IB Indonesia",
      partnerSupport1: "OWLFX Quantitative Analytics Dashboard",
      partnerSupport2: "Official Marketing & Swag Sponsorship",
      partnerSupport3: "Seminar Venue Grant & Media Production",
      officialUrlLabel: "OFFICIAL URL:",
      supportNote:
        "Express onboarding backed by 24/7 dedicated partner assistance.",
    },
    education: {
      badge: "ACADEMY & FINANCIAL LITERACY",
      title1: "Structured Educational Syllabus",
      title2: "From Fundamentals to Quantitative Mastery",
      description:
        "Step-by-step masterclass framework training traders to think like institutional operators, manage downside variance mathematically, and execute algorithms with conviction.",
      step1Badge: "STEP 01",
      step1Duration: "Duration: ~5 Mins",
      step1Title: "Account Registration",
      step1Desc:
        "Start trading with the official OWLFX link. Enjoy flexible account types to match your style, raw spreads from 0.0 pips, and special perks courtesy of the OWLFX team.",
      step1Perk: "✓ Free Eligibility",
      step1Action: "Open Account",
      step2Badge: "STEP 02",
      step2Duration: "Duration: ~10 Mins",
      step2Title: "Setup OWL ALGO on TradingView",
      step2Desc:
        "Leverage the power of OWL ALGO’s precision zones directly on TradingView. Connect your account today to identify high-probability entries with complete confidence.",
      step2Perk: "✓ Official E-Book",
      step3Badge: "STEP 03",
      step3Duration: "Duration: Ongoing",
      step3Title: "Capital Risk & Lot Sizing",
      step3Desc:
        "Adopt institutional sizing equations, cap risk at 1-2% per position, and enjoy consistent, automated daily cash rebate distributions.",
      step3Perk: "✓ Daily Cash Return",
      playlistTitle: "MASTERCLASS EPISODES",
      btnMasterclass: "Register Free Masterclass",
      masterclassSub: "Follow Step by Step To Understand More",
    },
    footer: {
      badge: "ELITE TRADER COMMUNITY",
      headline1: "Join the OWLFX Trading",
      headline2: "Network Today",
      desc: "Gain access to institutional-precision market setups, agency support infrastructure, and daily cash rebates credited automatically.",
      btnVipCommunity: "Join VIP Community",
      btnWhatsAppAdmin: "WhatsApp Admin",
      socialHeading: "SOCIAL MEDIA & OFFICIAL CARELINE",
      socialSub:
        "Stay updated with daily insights, roadtour schedules, and video tutorials across our verified platforms.",
      securedBy: "Secured By OWLFX Engine",
      ecosystemTag: "OWLFX ECOSYSTEM",
      disclaimer:
        "RISK WARNING: Trading leveraged Foreign Exchange (Forex) and CFDs carries a high level of risk to your capital. Past performance is no guarantee of future results. Please ensure you fully understand the risks involved before executing live transactions.",
    },
  },
};
