import { RoadtourStateData, IBRegionData, SetupProofItem, TraderTestimonial, CommunityLinks, AlgoMetric, LiveEventAlertData } from '../types';

export const INITIAL_LIVE_EVENT_ALERTS: LiveEventAlertData[] = [
  {
    id: "alert-default-1",
    eventName: "Class Masterkey Price Zone",
    state: "Selangor",
    location: "Hotel Marriott, Putrajaya",
    date: "19/09/2026",
    quota: "5 Left",
    isActive: true,
  }
];

export const INITIAL_LIVE_EVENT_ALERT: LiveEventAlertData = INITIAL_LIVE_EVENT_ALERTS[0];

export const INITIAL_COMMUNITY_LINKS: CommunityLinks = {
  telegramVip: "https://t.me/OWLfxPublicChannel",
  whatsAppCareline: "http://wasap.my/+60102263677/(Website)Hai,%20saya%20nak%20tahu%20lebih%20mendalam%20tentang%20OWLFX",
  tiktok: "https://www.tiktok.com/@wan.owlfx",
  youtube: "https://www.youtube.com/@owlfx.official",
  instagram: "https://www.instagram.com/wan.owlfx"
};

export const INITIAL_ROADTOUR_STATES: RoadtourStateData[] = [
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    code: "KUL",
    zone: "Tengah",
    hotel: "Grand Ballroom, Mandarin Oriental Kuala Lumpur",
    date: "01 - 02 Mac 2026",
    attendees: "300+ Pedagang",
    status: "completed",
    highlight: "Sesi Tertutup Pembiayaan Akaun Institusi & Pelancaran Modul IB Platinum",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-23_at_09.55.27.jpg?v=1781330207&width=900",
    gallery: [
      {
        url: "https://i.imgur.com/DQ5zaFU.jpg",
        caption: "Majlis gilang-gemilang di Mandarin Oriental KL bersama rakan pelaburan."
      },
      {
        url: "https://i.imgur.com/Whq4Ltz.jpg",
        caption: "Sesi menandatangani memorandum persefahaman IB bersama institusi antarabangsa."
      },
      {
        url: "https://i.imgur.com/aCQ6hLX.jpg",
        caption: "300+ pedagang elit menghadiri sesi penerangan strategi kuantitatif."
      }
    ]
  },
  {
    id: "selangor",
    name: "Selangor",
    code: "SGR",
    zone: "Tengah",
    hotel: "Grand Lagoon Ballroom, Sunway Resort Hotel",
    date: "22 - 23 Februari 2026",
    attendees: "80+ Pedagang",
    status: "completed",
    highlight: "Konvensyen Tahunan Quantitative Trading Summit & IB Recognition Gala",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.57_2_280706c2-5d7d-4286-9bc2-e3a8d8b6e18f.jpg?v=1778819928&width=900",
    gallery: [
      {
        url: "https://i.imgur.com/DQ5zaFU.jpg",
        caption: "680+ peserta memenuhi auditorium Sunway Resort Hotel."
      },
      {
        url: "https://i.imgur.com/Whq4Ltz.jpg",
        caption: "Tayangan algoritma multi-timeframe live latency under 12ms."
      },
      {
        url: "https://i.imgur.com/aCQ6hLX.jpg",
        caption: "Sesi 'Breakout Rooms' bersama Master IB OWLFX."
      }
    ]
  },
  {
    id: "johor",
    name: "Johor",
    code: "JHR",
    zone: "Selatan",
    hotel: "Royal Ballroom, Thistle Hotel Johor Bahru",
    date: "28 - 29 Januari 2026",
    attendees: "100+ Pedagang",
    status: "completed",
    highlight: "Sesi Masterclass Institutional Order Flow & Algorithmic Scalping",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.58_2_1d2b6890-d74d-4eed-a575-06d8bf5a5559.jpg?v=1778819895&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
        caption: "Dewan utama Thistle JB bergema dengan kehadiran 410+ komuniti selatan."
      },
      {
        url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1000&q=80",
        caption: "Demonstrasi setup Order Block & Liquidity Pool pada carta TradingView."
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
        caption: "Pemberian rebat tunai eksklusif dan cabutan bertuah trading capital."
      }
    ]
  },
  {
    id: "pulau-pinang",
    name: "Pulau Pinang",
    code: "PNG",
    zone: "Utara",
    hotel: "Grand Ballroom, Eastern & Oriental (E&O) Hotel Penang",
    date: "10 - 11 Februari 2026",
    attendees: "40+ Pedagang",
    status: "completed",
    highlight: "Pelancaran Valetax MIB Node & Sistem Pengagihan Rebat Automatik",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.58_ef864d9e-f6a5-4956-88e4-6850fe995626.jpg?v=1778819877&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
        caption: "Majlis Makan Malam Berprestij & Roadtour Wilayah Utara di E&O Penang."
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
        caption: "Perbincangan meja bulat antara IB terkemuka zon Utara bersama Founder."
      },
      {
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
        caption: "Sesi foto rasmi delegasi pedagang kuantitatif Pulau Pinang."
      }
    ]
  },
  {
    id: "perak",
    name: "Perak",
    code: "PRK",
    zone: "Utara",
    hotel: "The Grand Ballroom, WEIL Hotel Ipoh",
    date: "03 Mei 2026",
    attendees: "40+ Pedagang",
    status: "completed",
    highlight: "Bengkel Algoritma Lanjutan & Transformasi IB Tempatan Menjadi Agensi Global",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-23_at_09.55.25.jpg?v=1781329626&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
        caption: "Dewan WEIL Hotel Ipoh dipenuhi barisan pemimpin komuniti Perak."
      }
    ]
  },
  {
    id: "kedah",
    name: "Kedah",
    code: "KDH",
    zone: "Utara",
    hotel: "Grand Ballroom, Grand Alora Hotel Alor Setar",
    date: "17 Mei 2026",
    attendees: "30+ Pedagang",
    status: "completed",
    highlight: "Sesi Pemantapan Mentaliti Pedagang Kuantitatif & Disiplin Execution",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.59.jpg?v=1778818652&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1000&q=80",
        caption: "Perkongsian berwibawa di Grand Alora Hotel Alor Setar."
      }
    ]
  },
  {
    id: "melaka",
    name: "Melaka",
    code: "MLK",
    zone: "Selatan",
    hotel: "Grand Ballroom, Hatten Hotel Melaka",
    date: "08 April 2026",
    attendees: "60+ Pedagang",
    status: "completed",
    highlight: "Sinergi Komuniti Pedagang Bersepadu Zon Selatan & Agihan Rebat Harian",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.59_3.jpg?v=1778818540&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        caption: "Hatten Hotel Melaka mengumpulkan ratusan pedagang pelbagai latar belakang."
      }
    ]
  },
  {
    id: "negeri-sembilan",
    name: "Negeri Sembilan",
    code: "NSE",
    zone: "Selatan",
    hotel: "Seremban Grand Hall, Royale Chulan Seremban",
    date: "19 April 2026",
    attendees: "30+ Pedagang",
    status: "completed",
    highlight: "Sesi Praktikal OWL ALGO Live Scanner & Pemilihan Pair Volatiliti Tinggi",
    coverImage: "https://owlfx.online/cdn/shop/files/photo_2026-06-17_09.51.21.jpg?v=1781661132&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
        caption: "Sesi bimbingan 1-on-1 bersama jurulatih teknikal Seremban."
      }
    ]
  },
  {
    id: "pahang",
    name: "Pahang",
    code: "PHG",
    zone: "Pantai Timur",
    hotel: "Grand Ballroom, The Zenith Hotel Kuantan",
    date: "25 Mac 2026",
    attendees: "40+ Pedagang",
    status: "completed",
    highlight: "Bedah Analisis Struktur Pasaran Pasca-NFP & Pengoptimuman Lot",
    coverImage: "https://i.imgur.com/mPkSU5x.jpeg",
    gallery: [
      {
        url: "https://i.imgur.com/Whq4Ltz.jpeg",
        caption: "Peserta Pahang tekun meneliti carta unjuran volatiliti pasaran."
      }
    ]
  },
  {
    id: "terengganu",
    name: "Terengganu",
    code: "TRG",
    zone: "Pantai Timur",
    hotel: "Convention Hall, Duyong Marina & Resort Kuala Terengganu",
    date: "15 Mac 2026",
    attendees: "30+ Pedagang",
    status: "completed",
    highlight: "Bengkel Formula Pengurusan Modal Kuantitatif & Sistem Rebat Pantas",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.57.jpg?v=1778819909&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
        caption: "Suasana Duyong Marina Resort dipenuhi usahawan dagangan Terengganu."
      },
      {
        url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1000&q=80",
        caption: "Pemberian kit eksklusif pedagang dan perkongsian rahsia lot sizing."
      }
    ]
  },
  {
    id: "kelantan",
    name: "Kelantan",
    code: "KEL",
    zone: "Pantai Timur",
    hotel: "Grand Ballroom, Hotel Perdana Kota Bharu",
    date: "14 - 15 Januari 2026",
    attendees: "30+ Pedagang",
    status: "completed",
    highlight: "Pelancaran Kod Kuantitatif OWL ALGO 4.2 & Sesi Live Analysis Gold",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.57_3.jpg?v=1778818675&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        caption: "Suasana Grand Ballroom Hotel Perdana dipenuhi 340+ peserta dari seluruh Kelantan."
      },
      {
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
        caption: "Sesi pembentangan Quantitative Risk Engine oleh Senior Lead Analyst."
      },
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
        caption: "Sesi Q&A intensif & bedah setup live market XAUUSD bersama komuniti."
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
        caption: "Penyerahan cenderahati rasmi OWLFX Gold Pin & sijil pentauliahan peserta."
      }
    ]
  },
  {
    id: "perlis",
    name: "Perlis",
    code: "PLS",
    zone: "Utara",
    hotel: "Putra Ballroom, Putra Regency Hotel Kangar",
    date: "28 Mei 2026",
    attendees: "30+ Pedagang",
    status: "completed",
    highlight: "Meraikan Komuniti Utara & Penyusunan Struktur Akaun Trading Berskala",
    coverImage: "https://i.imgur.com/BcZZ0rU.jpeg",
    gallery: [
      {
        url: "https://i.imgur.com/aCQ6hLX.jpeg?auto=format&fit=crop&w=1000&q=80",
        caption: "Komuniti Perlis menyambut mesra ketibaan delegasi rasmi OWLFX."
      }
    ]
  },
  {
    id: "sabah",
    name: "Sabah",
    code: "SBH",
    zone: "Borneo",
    hotel: "Grand Ballroom, Le Méridien Kota Kinabalu",
    date: "12 - 13 Jun 2026",
    attendees: "Sasaran 400 Peserta (Pendaftaran Dibuka)",
    status: "upcoming",
    highlight: "Borneo Institutional Trading Symposium & Pelancaran Hub Komuniti Sabah",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-11_at_01.06.56_ceacde49-47b1-4183-97f5-0a81e8020125.jpg?v=1778818388&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        caption: "Pratonton venue rasmi Le Méridien Kota Kinabalu bagi acara Jun 2026."
      }
    ]
  },
  {
    id: "sarawak",
    name: "Sarawak",
    code: "SWK",
    zone: "Borneo",
    hotel: "Colosseum Ballroom, Pullman Hotel Kuching",
    date: "26 - 27 Jun 2026",
    attendees: "Sasaran 450 Peserta (Pendaftaran Dibuka)",
    status: "upcoming",
    highlight: "Siri Kemuncak Jelajah Borneo & Pengumuman Dana Padanan IB Wilayah",
    coverImage: "https://owlfx.online/cdn/shop/files/WhatsApp_Image_2026-05-23_at_09.55.24.jpg?v=1781328629&width=900",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        caption: "Pratonton venue Pullman Kuching yang bakal menempatkan 450 usahawan dagangan."
      }
    ]
  }
];

export const IB_REGIONS_DATA: Record<'MY' | 'ID', IBRegionData> = {
  MY: {
    id: 'MY',
    region: 'MY',
    title: "Program Pembangunan IB Wilayah Malaysia",
    badge: "🇲🇾 Rasmi Malaysia Ecosystem",
    description: "Infrastruktur sokongan Introducing Broker (IB) paling komprehensif di Malaysia. Akses kepada sistem agihan komisen berbilang lapisan, rebat tunai automatik, sistem CRM pedagang, dan bantuan latihan fizikal di 14 negeri.",
    coverImage: "https://i.imgur.com/aCQ6hLX.jpg",
    registrationUrl: "/my/ib_development",
    registerLink: "/my/ib_development",
    buttonText: "Daftar IB Malaysia",
    stats: {
      activeIB: "420+ Master & Sub-IB",
      totalVolume: "$18.4M+ Lot Sebulan",
      monthlyRebate: "RM 1,250,000+",
      tierCommission: "Hingga $15 / Lot"
    },
    albumImages: [
      {
        id: "my-act-1",
        url: "https://i.imgur.com/dz1wYRT.jpg",
        caption: "Bengkel Pemantapan Kepimpinan IB Kebangsaan — KLCC"
      },
      {
        id: "my-act-2",
        url: "https://i.imgur.com/Zne4BXm.jpg",
        caption: "Dinner Pengiktirafan IB Platinum & Diamond — Grand Hyatt KL"
      },
      {
        id: "my-act-3",
        url: "https://i.imgur.com/WR4jSzv.jpg",
        caption: "Kit Rasmi & Merchandise Korporat OWLFX Exclusive — HQ Bangsar South"
      },
      {
        id: "my-act-4",
        url: "https://i.imgur.com/kICBFpB.jpg",
        caption: "Sesi Inkubator IB Wilayah & Geran Pemasaran — Cyberjaya Hub"
      }
    ],
    activities: [
      {
        id: "my-act-1",
        title: "Bengkel Pemantapan Kepimpinan IB Kebangsaan",
        date: "Februari 2026",
        location: "Kuala Lumpur Convention Centre (KLCC)",
        category: "Workshop",
        imageUrl: "https://i.imgur.com/dz1wYRT.jpg",
        url: "https://i.imgur.com/dz1wYRT.jpg",
        caption: "Bengkel Pemantapan Kepimpinan IB Kebangsaan — KLCC",
        description: "Latihan intensif pembinaan rangkaian pedagang, pematuhan pengawalseliaan, dan strategi pengoptimuman saluran rebat terus."
      },
      {
        id: "my-act-2",
        title: "Dinner Pengiktirafan IB Platinum & Diamond",
        date: "Mac 2026",
        location: "Grand Hyatt Kuala Lumpur",
        category: "Dinner",
        imageUrl: "https://i.imgur.com/WR4jSzv.jpg",
        url: "https://i.imgur.com/WR4jSzv.jpg",
        caption: "Dinner Pengiktirafan IB Platinum & Diamond — Grand Hyatt KL",
        description: "Malam anugerah gilang-gemilang meraikan pencapaian cemerlang IB bernilai jutaan dolar berserta trofi bersadur emas."
      },
      {
        id: "my-act-3",
        title: "Kit Rasmi & Merchandise Korporat OWLFX Exclusive",
        date: "Sepanjang Musim 2026",
        location: "Ibu Pejabat OWLFX Bangsar South",
        category: "Merchandise",
        imageUrl: "https://i.imgur.com/kICBFpB.jpg",
        url: "https://i.imgur.com/kICBFpB.jpg",
        caption: "Kit Rasmi & Merchandise Korporat OWLFX Exclusive — HQ Bangsar South",
        description: "Set merchandise premium terdiri daripada Exclusive Polo Embroidery, Gold Metal Card, Leather Portfolio, dan Custom Cold Ledger."
      },
      {
        id: "my-act-4",
        title: "Sesi Inkubator IB Wilayah & Geran Pemasaran",
        date: "Januari 2026",
        location: "Cyberjaya Innovation Hub",
        category: "Leadership",
        imageUrl: "https://i.imgur.com/kICBFpB.jpg",
        url: "https://i.imgur.com/kICBFpB.jpg",
        caption: "Sesi Inkubator IB Wilayah & Geran Pemasaran — Cyberjaya Hub",
        description: "Peruntukan geran pemasaran berstruktur dan penyediaan fasiliti dewan seminar secara percuma untuk IB aktif."
      }
    ]
  },
  ID: {
    id: 'ID',
    region: 'ID',
    title: "Program Pengembangan IB Wilayah Indonesia",
    badge: "🇮🇩 Resmi Indonesia Ecosystem",
    description: "Inisiatif strategis ekspansi pasar Nusantara untuk para Introducing Broker dan pengelola komunitas trading di Indonesia. Didukung oleh integrasi deposit lokal kilat, komisi tertinggi, dan program edukasi terstruktur.",
    coverImage: "https://i.imgur.com/gjUvrHK.jpeg",
    registrationUrl: "/id/ib_development",
    registerLink: "/id/ib_development",
    buttonText: "Daftar IB Indonesia",
    stats: {
      activeIB: "280+ Mitra IB Nusantara",
      totalVolume: "$12.8M+ Volume Bulanan",
      monthlyRebate: "Rp 3.8 Miliar+",
      tierCommission: "Hingga $16 / Lot"
    },
    albumImages: [
      {
        id: "id-act-1",
        url: "https://i.imgur.com/2dlBSD2.jpeg",
        caption: "Workshop Master IB & Edukasi Finansial Jakarta — The Ritz-Carlton Jakarta, Mega Kuningan"
      },
      {
        id: "id-act-2",
        url: "https://i.imgur.com/C9ZbrMs.jpeg",
        caption: "Pelajari Teknik Trading Sebenar — Vasa Hotel Surabaya"
      },
      {
        id: "id-act-3",
        url: "https://i.imgur.com/FAgoayr.jpeg",
        caption: "Official Swag Bag & Welcome Kit Garuda Trader — Jakarta Hub & Bali Branch"
      },
      {
        id: "id-act-4",
        url: "https://i.imgur.com/gjUvrHK.jpeg",
        caption: "Roadshow Edukasi Finansial Bandung & Medan — Grand Mercure Bandung Setiabudi"
      }
    ],
    activities: [
      {
        id: "id-act-1",
        title: "Workshop Master IB & Edukasi Finansial Jakarta",
        date: "Januari 2026",
        location: "The Ritz-Carlton Jakarta, Mega Kuningan",
        category: "Workshop",
        imageUrl: "https://i.imgur.com/2dlBSD2.jpeg",
        url: "https://i.imgur.com/2dlBSD2.jpeg",
        caption: "Workshop Master IB & Edukasi Finansial Jakarta — The Ritz-Carlton Mega Kuningan",
        description: "Pelatihan pembentukan agensi IB profesional dan pemanfaatan sistem dashboard analitik Valetax MIB."
      },
      {
        id: "id-act-2",
        title: "Pelajari Teknik Trading Sebenar",
        date: "Februari 2026",
        location: "Vasa Hotel Surabaya",
        category: "Student",
        imageUrl: "https://i.imgur.com/C9ZbrMs.jpeg",
        url: "https://i.imgur.com/C9ZbrMs.jpeg",
        caption: "Pelajari Teknik Trading Sebenar — Vasa Hotel Surabaya",
        description: "Perayaan pencapaian likuiditas trading dan penyerahan penghargaan IB Teladan Indonesia 2026."
      },
      {
        id: "id-act-3",
        title: "Official Swag Bag & Welcome Kit Garuda Trader",
        date: "Sepanjang Musim 2026",
        location: "Jakarta Hub & Bali Branch",
        category: "Merchandise",
        imageUrl: "https://i.imgur.com/FAgoayr.jpeg",
        url: "https://i.imgur.com/FAgoayr.jpeg",
        caption: "Official Swag Bag & Welcome Kit Garuda Trader — Jakarta Hub & Bali Branch",
        description: "Paket selamat datang eksklusif berupa Jaket Bomber Eksklusif OWLFX, Pin Emas 24K, dan Hard Drive materi analitik."
      },
      {
        id: "id-act-4",
        title: "Roadshow Edukasi Finansial Bandung & Medan",
        date: "Maret 2026",
        location: "Grand Mercure Bandung Setiabudi",
        category: "Leadership",
        imageUrl: "https://i.imgur.com/gjUvrHK.jpeg",
        url: "https://i.imgur.com/gjUvrHK.jpeg",
        caption: "Roadshow Edukasi Finansial Bandung & Medan — Grand Mercure Bandung Setiabudi",
        description: "Penyelarasan strategi mitigasi risiko bagi komunitas trader ritel agar bertumbuh secara berkesinambungan."
      }
    ]
  }
};

export const INITIAL_SETUP_PROOFS: SetupProofItem[] = [
  {
    id: "setup-1",
    pair: "XAUUSD (GOLD)",
    type: "BUY",
    gainPips: "+480 Pips",
    rrRatio: "1 : 4.8",
    date: "03 Mac 2026",
    imageUrl: "https://i.imgur.com/nmDGV9c.png",
    chartDescription: "Liquidity Sweep di bawah zon H4 Order Block 2845.00 diikuti pengesahan volum kuantitatif OWL ALGO."
  },
  {
    id: "setup-2",
    pair: "XAUUSD (GOLD)",
    type: "SELL",
    gainPips: "+135 Pips",
    rrRatio: "1 : 3.6",
    date: "28 Februari 2026",
    imageUrl: "https://i.imgur.com/wTnZnSl.jpeg",
    chartDescription: "Bearish Fair Value Gap mitigation pada pembukaan London Session, sasaran Liquidity Low tercapai tepat."
  },
  {
    id: "setup-3",
    pair: "BTCUSD",
    type: "BUY",
    gainPips: "+4,200 Pips",
    rrRatio: "1 : 5.2",
    date: "25 Februari 2026",
    imageUrl: "https://i.imgur.com/5D8fnft.png",
    chartDescription: "Break of Structure (BOS) berserta petunjuk Bullish Confirmation Matrix dari algoritma OWL FX."
  },
  {
    id: "setup-4",
    pair: "NAS100 (US TECH)",
    type: "SELL",
    gainPips: "+320 Pips",
    rrRatio: "1 : 3.8",
    date: "21 Februari 2026",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=900&q=80",
    chartDescription: "Rejection di premium zone harian semasa pengumuman data CPI, TP3 cecah sasaran dalam tempoh 4 jam."
  }
];

export const INITIAL_TESTIMONIALS: TraderTestimonial[] = [
  {
    id: "test-1",
    name: "Mr Cepris.",
    role: "Full-Time Trader & IB Lead",
    location: "Kuala Lumpur, MY",
    rating: 5,
    avatar: "https://brocepris.com/cdn/shop/files/photo_2026-07-17_23.20.10.jpg?v=1784301644&width=1200",
    profit: "Private",
    comment: "Sistem self-rebate OWLFX sangat telus. Setiap pusingan lot yang saya dan anak buah dagangkan terus dikreditkan tanpa sebarang kelewatan. Ditambah pula dengan ketepatan zon OWL ALGO yang mengurangkan 'emotional trading'.",
    verifiedBadge: true
  },
  {
    id: "test-2",
    name: "Bambang Wicaksono",
    role: "Komunitas Trader Garuda",
    location: "Surabaya, ID",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    profit: "Private",
    comment: "Sebagai IB yang mengelola ratusan member di Jawa Timur, dukungan material workshop dan kecepatan penarikan rebat dari Valetax di bawah naungan OWLFX adalah yang terbaik yang pernah saya rasakan.",
    verifiedBadge: true
  },
  {
    id: "test-3",
    name: "Dr. Azlan Shah",
    role: "Part-time Swing Trader",
    location: "Kelantan, MY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    profit: "+$18,900 YTD",
    comment: "Saya hadir ke Roadtour Kota Bharu di Hotel Perdana bulan lepas. Penerangan risk management blueprint betul-betul membuka mata. Drawdown akaun saya kini terkawal di bawah 5%!",
    verifiedBadge: true
  },
  {
    id: "test-4",
    name: "Hj. Razif Harun",
    role: "Senior Algorithmic Trader",
    location: "Pulau Pinang, MY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    profit: "+$42,100 YTD",
    comment: "Gabungan indicator TradingView OWL ALGO dengan disiplin stop-loss institusi membolehkan saya mengekalkan winrate purata 82% untuk 6 bulan berturut-turut.",
    verifiedBadge: true
  }
];

export const ALGO_BACKTEST_METRICS: AlgoMetric[] = [
  {
    pair: "XAUUSD (GOLD)",
    timeframe: "H1",
    winrate: "84.2%",
    profitFactor: "2.86",
    avgRR: "1 : 3.4",
    maxDrawdown: "4.1%",
    totalTrades: "520"
  },
  {
    pair: "EURUSD",
    timeframe: "M15",
    winrate: "81.8%",
    profitFactor: "2.45",
    avgRR: "1 : 2.9",
    maxDrawdown: "3.2%",
    totalTrades: "430"
  },
  {
    pair: "NAS100",
    timeframe: "H1",
    winrate: "83.5%",
    profitFactor: "3.12",
    avgRR: "1 : 3.8",
    maxDrawdown: "5.4%",
    totalTrades: "290"
  },
  {
    pair: "GBPUSD",
    timeframe: "H4",
    winrate: "80.4%",
    profitFactor: "2.38",
    avgRR: "1 : 3.1",
    maxDrawdown: "3.8%",
    totalTrades: "180"
  }
];
