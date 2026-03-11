import type { PlanType, PlanFields } from "./types";

export type RestaurantCategory =
  | "ristorante"
  | "pizzeria"
  | "agriturismo"
  | "caseificio"
  | "cantina"
  | "pasticceria"
  | "altro";

export interface GalleryImage {
  src: string;
  alt: string;
  layout: "square" | "wide" | "overlay";
}

export interface SignatureDish {
  icon: string;
  name: string;
  description: string;
}

export interface Service {
  icon: string;
  label: string;
}

export interface Hours {
  day: string;
  time: string;
}

export interface Review {
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

export interface Restaurant extends PlanFields {
  slug: string;
  name: string;
  category: RestaurantCategory;
  location: string;
  description: string;
  cuisine: string;
  badge?: string;
  badgeStyle?: string;
  image: string;
  phone?: string;
  website?: string;
  socialLinks?: { platform: string; url: string }[];
  menuLink?: string;
  bookingLink?: string;
  // Premium-only fields (optional for basic entries)
  heroImage?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  priceLabel?: string;
  openTime?: string;
  philosophy?: string;
  galleryImages?: GalleryImage[];
  dishes?: SignatureDish[];
  services?: Service[];
  hours?: Hours[];
  reviews?: Review[];
  contact?: { email: string; website: string };
  mapImage?: string;
  featured?: boolean;
}

export const restaurants: Restaurant[] = [
  {
    slug: "la-dispensa-di-san-salvatore",
    name: "La Dispensa di San Salvatore",
    category: "ristorante",
    location: "Paestum, Campania",
    description: "Cucina Tradizionale & Caseificio",
    cuisine: "Cucina Cilentana Tradizionale",
    badge: "Premium",
    badgeStyle: "bg-white/90 backdrop-blur text-emerald-900",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 1,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCIzWJuRfMbRDrHetzmCGaEWJf5SW-MBK7rvE2LFn_96T8aXMcog7UIicLiTgrgH7M0q0eisa6LdQr8a3Bla8w_RNFaFdwpSfBkvV-rlqQICmGmPDTP_z51NQqTopSD6BWBb8raXwkqkAsNx3FU_vWG-_hhgfdU8obpmDPcljPgBxLSbQPFjqXrPfD1WqAdmdqDYsTaBc3eF-jw5TjndNatLrIxhAAdwvZ4LLUkPLhQ9k9mKaaaZnVUpY1I8tHbxOhzK6a51tqoRuV",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNzsawD_laLLp2VTmZFfFI_OGM7wiSJ6SAxHvNMUgfriHjXgaUrIW7jgHbDd475taZR6ztBuq0opb3xSSQOseSzUHTBfC-hwJ4Cm8kwev_cfqFC0Ib-0Frxw5rm-LNBUJD1E8f3DG8T4SFLoXcdPb_usXDVpVDe_WoFQ-e29haKq9ZItdltVlf_a9d_RQjRKqlfbdFmdDEP3DkGiWSs7z-1kdOiN1lTuT7uaR4NZvBqCaUsbblAsx3BdtAVXmfu6t8bTI9wy5lGbv",
    rating: 4.8,
    reviewCount: 120,
    priceRange: "€€€",
    priceLabel: "Fascia Alta",
    openTime: "19:30 - 23:00",
    philosophy:
      "Nel cuore pulsante del Cilento, La Dispensa di San Salvatore nasce come un omaggio alla terra. La nostra cucina celebra il concetto di \"farm-to-table\" autentico, portando in tavola solo ingredienti biologici coltivati direttamente nelle nostre tenute. Ogni piatto racconta la storia di un territorio generoso, dove la tradizione si fonde con una visione moderna della gastronomia mediterranea.",
    galleryImages: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4e6gyjQEVcIAfcJNzX1_BQLUVkgeyZN-hLxyroXxvir7bF2RvYez6YsO0uDalb-TuDVEH1Zjy4rfVb9rJepo8wkNP6iKp4t7_DrJIwsgbUOEfkCYpoZcoS09Nf5ME1sG-lnOgga75VXa_6Sejo1LywuQ3PuLkgI0ZCCq4ddZFUkpXrG1sNyktxPyHBd0uonyS_WSx6ASiH_nE3bbC5IHMY9oJDqDJSbFciSQsXDV1kA34MX5gCq_8nawPL0ihni8Mx1ZmsJ2fYb0O",
        alt: "Mozzarella di bufala fresca",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYIsXBzDFK4K3PMms8BpvwDCoLSzJYN0EMEjE8aPZ1CGYDhosbkm69EkhhHoOHdg-8EH5Nwlm6jjBgpyYUV45HXmOQXQACjcggZ6e9zVGy5f2H0TIAj_wREdLVeENifdHh6N4PxlRdwzMKY_72oQnBtw8LcMiGalg8kz77l11d3mTC2gaALC3ztazHv-2bmQgt9vjJ_DH_gn2RCDBwvfSd5KCcWYYEPKtvbc0GXtt5FYdjozdQ_fm3QmYj6XuI6d5EJhsaS4fWLAI",
        alt: "Pasta fatta in casa con pomodoro",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8yQnXPHhQP3voq6WbNmsLd6QL2Llv41HcB3eoaNQlNFGFOz8EDGl6igy2-SnOOA1IjYDqNxmLRyrAjZ4VVT1rsSjL_90aLOJuI3fWlDERXho99W75DhS_RX0WS4bPNFf8nrGVBYj7DLvmXnLH9AcWTTh1Pvq5p447nb9_5vc3fwzWd4WW4cbYMr6V4Q3bu90GHEjaXtaVMOqj2Jn_D-AqSq-4Yq5ujj94DU72mm6oXulLZfZ2GHQBRG9aX2Hx6EZxgFF8sehzxulj",
        alt: "Costolette d'agnello alle erbe",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8u8DYcRpj5y-6ClzGRDLf1vhQTYR6tjre9S7m-Yl3AY1CSem92mqhxjYxm2T1pLVW2n7-qG-DjC8NAzcKOM7eqnh0ChRruhSzo3LWp-kHHJ7owCOMVR0jy4G3w0JJnUpfhdFfY2On9CdBOLjrgxOpr2WeOHG-M336QjIDu55F1G_2UPeG4YKC_PMDM_3gMOLh5l7eT4AjBEXv3jtHfW_KS98cMoXUw7spwH6ymb0GsUOy-xRMTU39taTbT9KEWrAn-uiEJcoKOTqO",
        alt: "Sala ristorante elegante",
        layout: "wide",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkcBPV9M0p1-1tDO9uQXg4amqJ70s6KRefsbMAgSOb1BOMUtxFXSygoOmJTT8mwSGPAx786-FjYldg0Z9dKUMpx4Z05EmP4P75aJaUUSCpmvcxN-WuG2eptr2iPyJK7pnR3nCLDvaPdA2juPr8czO6COuyXYfLNNfs0Ldb7QeeZHUeIsWypLajof20xwr5L-bsktT5vdYTsIjUSm49x-T5V9XQl3ooXyksFmAyOlIhHJYQm6XY7LJteblszbiCFBKprsrK6rRg0aCV",
        alt: "Barman prepara un cocktail",
        layout: "overlay",
      },
    ],
    dishes: [
      {
        icon: "restaurant",
        name: "Mozzarella di Bufala DOP",
        description:
          "Produzione propria, servita con olio extravergine bio.",
      },
      {
        icon: "dinner_dining",
        name: "Fusilli Cilentani",
        description:
          "Pasta fatta a mano con ragù di castrato tradizionale.",
      },
      {
        icon: "set_meal",
        name: "Costolette d'Agnello",
        description: "Al timo selvatico, scottate su pietra lavica.",
      },
    ],
    services: [
      { icon: "wifi", label: "WiFi Gratuito" },
      { icon: "local_parking", label: "Parcheggio Privato" },
      { icon: "air", label: "Aria Condizionata" },
    ],
    hours: [
      { day: "Lunedì", time: "Chiuso" },
      { day: "Mar - Dom", time: "12:30 - 15:00 / 19:30 - 23:00" },
    ],
    reviews: [
      {
        name: "Marco Rossini",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJw9kkQl3SYSO0XzFKSOKWD9lgd8VnKRIJWWNuHHilmeVx6j7D187fbWsBCkxLg3nXzSpsWv2_UKjjex25px8M_OiEKcYV-nPQJnCF6r7pt4SnAqx1SsezmSiu3xGveFZ18g9dmgX-mj7Hn47QBXZHZhHcOj4_VW5RSWaiI-8uYCfFoM3NUKLyGXyFGIhak6zIXNMUiCWcJuJug8pIEvCK5OlARavqZAZy4iDu43jZcE8VUHlp0vieuGlZvz4CXeBxuhqdqCnGO71I",
        date: "14 Ottobre 2023",
        rating: 5,
        text: "Un'esperienza indimenticabile. La mozzarella di bufala è la migliore che abbia mai assaggiato. Personale gentilissimo e location mozzafiato.",
      },
      {
        name: "Elena Bianchi",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBbIm96hKEKEW3IAZaIDyeh6eBgfUblnTXtJRzaHt8wQd2xa6NB3i_JM6ul_wAhPtwe68xyhNwtH8N8kTI7rbRHUfq0FdEQ9KgdoraTwagyoHLV4V-2sS1Konb1FllsGC8kSU1Yij3eB_zH9rKhJ2wYmWPpLhPXEOm3RdF-zc14DsqbP2cKOUoKigq30-rIJyHq1ynGOg5eBk0zlMY2U-dRTy9aLDmYasE0QxMAhZMFuRJkafYvSfTV6tEWzmgcMzTSHlOuimo7OygX",
        date: "28 Settembre 2023",
        rating: 4,
        text: "Posto incantevole tra gli ulivi. Piatti curati e materie prime d'eccellenza. Consiglio vivamente i fusilli.",
      },
    ],
    contact: {
      email: "info@ladispensa.it",
      website: "www.ladispensa.it",
    },
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxKJaXkGZzasBlsVCfCZBM6iv5Nr0FryQV8vTScdag_XsXLqPp3fO0INpdpDj3GXRkEDfSHbOjtaj84DwI6-3oSmxbiJj67xF1G2ZQ938SDhY7Hg6089brsMo9JrvovKRNgrKNv5dsV6m0P3GRdDnOZ5bwauDzmL8MTYtkjPFCx8r52B8wXJuVk-WUebMFgCK7eR8buXCvQSLy-tftif3JfMp-coUg9IxYa0_ooQCHIYUl-y7xeMjbciuWUAKARHRKXBEz8LDyvq",
  },
  {
    slug: "le-trabe",
    name: "Le Trabe",
    category: "ristorante",
    location: "Paestum, Campania",
    description: "Gourmet & Fine Dining",
    cuisine: "Alta Cucina Mediterranea",
    badge: "Stella Michelin",
    badgeStyle: "bg-primary text-white",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 2,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCiVNxSrBm3_loyFeuvoFOGDMFUup0uvn0CXrjgzgjEFgOasrKmOBEh-BRSvOGACBjN6UbdWLj-yeVbr3q87k4JL73jC2vSNBYgUEKRLwnq-zhOJTqcIZiNKPDEttPyC_I8jFEoO8Appfml_izxtyWq9KOnCNNdBHXLOeVynpzwExAsFVRXWdGS7_rDTbzkq5PUMpcLZ6Ltvaz5xNBhe3SDUhppDXOthalXmZTh4PL5Hj4uQXhPwaBr791MI9VQ5EOPk1a2XI8ggMn",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLP3XiNJbEhDR1U7doj0EXcxdN6Nlfkj3ETN4PBfWJMe3u9y3mXC2hHrkvP-D39MhqKkv1c3ZkXYGDqbfpqJk1RNcjkXOGx5Skq9oE8PpBm6DwS9eyVU5XaAGzaiS6pmtaUbi-gVziL4gbPWl7BsxSboXwQlQm84MGg3hQg2k81DUe4IH7LbbaZKkFO81cvhMc0YmyKSUrS4wgpPk1HS4tSSw3lkiULC6LBTc75oFCVPlZMdR8UvHo_xetDMkhTBbQPK9bWsyK4YQi",
    rating: 4.9,
    reviewCount: 85,
    priceRange: "€€€€",
    priceLabel: "Fine Dining",
    openTime: "19:30 - 22:30",
    philosophy:
      "Le Trabe è un ristorante stellato Michelin immerso nella campagna di Paestum. Lo chef propone un viaggio sensoriale attraverso i sapori del Cilento, con tecniche d'avanguardia che esaltano la purezza delle materie prime locali. Ogni portata è un'opera d'arte che celebra il legame profondo tra terra e mare.",
    galleryImages: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCiVNxSrBm3_loyFeuvoFOGDMFUup0uvn0CXrjgzgjEFgOasrKmOBEh-BRSvOGACBjN6UbdWLj-yeVbr3q87k4JL73jC2vSNBYgUEKRLwnq-zhOJTqcIZiNKPDEttPyC_I8jFEoO8Appfml_izxtyWq9KOnCNNdBHXLOeVynpzwExAsFVRXWdGS7_rDTbzkq5PUMpcLZ6Ltvaz5xNBhe3SDUhppDXOthalXmZTh4PL5Hj4uQXhPwaBr791MI9VQ5EOPk1a2XI8ggMn",
        alt: "Piatto gourmet stellato",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLCxM9lGm4xn3TX4vIpN7_AqGibL3YLZaviPB5JWzeGMJANPMN-8cMLDtZKhrfdSSr_dkC8ZK1nEc2jehF3UsKM-vZQqTIZcp--_A5C_0wja52Qxw0XGvnZABCaMiDlC0hnp0ibN8eNpPuhjwM3WEKMYXGqIeyaMWU0PGDHMkz42PCOEQ4WdCfQIWPfs1lj_7MNyoFd5yUrVhSZdyIG_jE0BFCcfC8F3XuqNNtD0u5ISZx1o18YJIsEZ4nzM-lwdelRMqpImZObWnj",
        alt: "Dessert artistico",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM68Wv0gCyxZnu5MTcZ8StCCx-riNU4tdfI31IAC-9PeHN0VCsZnj4Cqy9GrIjHfObFSE0OZ0MzDYUh-r8aHLaG4P9SSR7E99z96Vkmyrg1Q469zm4WH_bTbELRdkczViYJmh0DtEEqDvr_X7gct9uhP1qsA8YLs7Zw31DHMkkr7dVg3oqKEPk8Dzhzc4jZ91KFgTbowFBmzFxl6AP9iryADFlpHUS9yeAj51sirwHMO-1uenYL6pwiKJ3Ml_N9tMPYzYYibAypdCh",
        alt: "Terrazza panoramica",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8u8DYcRpj5y-6ClzGRDLf1vhQTYR6tjre9S7m-Yl3AY1CSem92mqhxjYxm2T1pLVW2n7-qG-DjC8NAzcKOM7eqnh0ChRruhSzo3LWp-kHHJ7owCOMVR0jy4G3w0JJnUpfhdFfY2On9CdBOLjrgxOpr2WeOHG-M336QjIDu55F1G_2UPeG4YKC_PMDM_3gMOLh5l7eT4AjBEXv3jtHfW_KS98cMoXUw7spwH6ymb0GsUOy-xRMTU39taTbT9KEWrAn-uiEJcoKOTqO",
        alt: "Sala interna raffinata",
        layout: "wide",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkcBPV9M0p1-1tDO9uQXg4amqJ70s6KRefsbMAgSOb1BOMUtxFXSygoOmJTT8mwSGPAx786-FjYldg0Z9dKUMpx4Z05EmP4P75aJaUUSCpmvcxN-WuG2eptr2iPyJK7pnR3nCLDvaPdA2juPr8czO6COuyXYfLNNfs0Ldb7QeeZHUeIsWypLajof20xwr5L-bsktT5vdYTsIjUSm49x-T5V9XQl3ooXyksFmAyOlIhHJYQm6XY7LJteblszbiCFBKprsrK6rRg0aCV",
        alt: "Cantina vini pregiati",
        layout: "overlay",
      },
    ],
    dishes: [
      {
        icon: "set_meal",
        name: "Crudo di Mare Cilentano",
        description: "Selezione di pesce crudo locale con agrumi e olio EVO.",
      },
      {
        icon: "dinner_dining",
        name: "Ravioli di Ricotta di Bufala",
        description: "Con fonduta di Provolone del Monaco e tartufo nero.",
      },
      {
        icon: "restaurant",
        name: "Filetto di Dentice",
        description: "Su crema di ceci di Cicerale e polvere di olive.",
      },
    ],
    services: [
      { icon: "wifi", label: "WiFi Gratuito" },
      { icon: "local_parking", label: "Parcheggio Privato" },
      { icon: "air", label: "Aria Condizionata" },
    ],
    hours: [
      { day: "Lunedì - Martedì", time: "Chiuso" },
      { day: "Mer - Dom", time: "19:30 - 22:30" },
    ],
    reviews: [
      {
        name: "Giulia Ferraro",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBbIm96hKEKEW3IAZaIDyeh6eBgfUblnTXtJRzaHt8wQd2xa6NB3i_JM6ul_wAhPtwe68xyhNwtH8N8kTI7rbRHUfq0FdEQ9KgdoraTwagyoHLV4V-2sS1Konb1FllsGC8kSU1Yij3eB_zH9rKhJ2wYmWPpLhPXEOm3RdF-zc14DsqbP2cKOUoKigq30-rIJyHq1ynGOg5eBk0zlMY2U-dRTy9aLDmYasE0QxMAhZMFuRJkafYvSfTV6tEWzmgcMzTSHlOuimo7OygX",
        date: "5 Novembre 2023",
        rating: 5,
        text: "Esperienza gastronomica sublime. Ogni piatto è un capolavoro di sapori e presentazione. La stella Michelin è più che meritata.",
      },
      {
        name: "Roberto Amato",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJw9kkQl3SYSO0XzFKSOKWD9lgd8VnKRIJWWNuHHilmeVx6j7D187fbWsBCkxLg3nXzSpsWv2_UKjjex25px8M_OiEKcYV-nPQJnCF6r7pt4SnAqx1SsezmSiu3xGveFZ18g9dmgX-mj7Hn47QBXZHZhHcOj4_VW5RSWaiI-8uYCfFoM3NUKLyGXyFGIhak6zIXNMUiCWcJuJug8pIEvCK5OlARavqZAZy4iDu43jZcE8VUHlp0vieuGlZvz4CXeBxuhqdqCnGO71I",
        date: "20 Ottobre 2023",
        rating: 5,
        text: "Il menu degustazione è un viaggio incredibile nei sapori del Cilento. Servizio impeccabile e atmosfera magica.",
      },
    ],
    contact: {
      email: "info@letrabe.it",
      website: "www.letrabe.it",
    },
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxKJaXkGZzasBlsVCfCZBM6iv5Nr0FryQV8vTScdag_XsXLqPp3fO0INpdpDj3GXRkEDfSHbOjtaj84DwI6-3oSmxbiJj67xF1G2ZQ938SDhY7Hg6089brsMo9JrvovKRNgrKNv5dsV6m0P3GRdDnOZ5bwauDzmL8MTYtkjPFCx8r52B8wXJuVk-WUebMFgCK7eR8buXCvQSLy-tftif3JfMp-coUg9IxYa0_ooQCHIYUl-y7xeMjbciuWUAKARHRKXBEz8LDyvq",
  },
  {
    slug: "il-granato",
    name: "Il Granato",
    category: "caseificio",
    location: "Capaccio, Campania",
    description: "Caseificio & Bistrò",
    cuisine: "Bistrò con Caseificio Artigianale",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 3,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxBhqi0QWEmR85UJU0A00EIwbl_4sLybMN2Oyoky0TU7MslVx0eGPHEthy58rMcn2rU-G7BS9NlYLnw3ULdggrbhqrCOF4JKVhe_WdaE7LRF6YUW9y9cp44QCiT3JJFO1ZQXyKlvFEDtmKr8TQI553DeoAlNRC7ZTGlG1CwS0QLuDwjaLdd3YBwUJdGXWhvgNzP-jECA54lT4xP5oUr4dsP7QB2rWaQJUzQFgX9CppkSnoCo5lLM4-ms0aKOq7Yzs5vRyhJrJ6h_hk",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM68Wv0gCyxZnu5MTcZ8StCCx-riNU4tdfI31IAC-9PeHN0VCsZnj4Cqy9GrIjHfObFSE0OZ0MzDYUh-r8aHLaG4P9SSR7E99z96Vkmyrg1Q469zm4WH_bTbELRdkczViYJmh0DtEEqDvr_X7gct9uhP1qsA8YLs7Zw31DHMkkr7dVg3oqKEPk8Dzhzc4jZ91KFgTbowFBmzFxl6AP9iryADFlpHUS9yeAj51sirwHMO-1uenYL6pwiKJ3Ml_N9tMPYzYYibAypdCh",
    rating: 4.6,
    reviewCount: 78,
    priceRange: "€€",
    priceLabel: "Fascia Media",
    openTime: "10:00 - 22:00",
    philosophy:
      "Il Granato unisce la tradizione casearia di Capaccio con la creatività di un bistrò moderno. Ogni giorno produciamo mozzarella, ricotta e formaggi freschi che diventano i protagonisti dei nostri piatti. Un'esperienza che parte dal laboratorio e arriva in tavola, dove i sapori autentici incontrano presentazioni contemporanee.",
    galleryImages: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxBhqi0QWEmR85UJU0A00EIwbl_4sLybMN2Oyoky0TU7MslVx0eGPHEthy58rMcn2rU-G7BS9NlYLnw3ULdggrbhqrCOF4JKVhe_WdaE7LRF6YUW9y9cp44QCiT3JJFO1ZQXyKlvFEDtmKr8TQI553DeoAlNRC7ZTGlG1CwS0QLuDwjaLdd3YBwUJdGXWhvgNzP-jECA54lT4xP5oUr4dsP7QB2rWaQJUzQFgX9CppkSnoCo5lLM4-ms0aKOq7Yzs5vRyhJrJ6h_hk",
        alt: "Laboratorio caseario",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4e6gyjQEVcIAfcJNzX1_BQLUVkgeyZN-hLxyroXxvir7bF2RvYez6YsO0uDalb-TuDVEH1Zjy4rfVb9rJepo8wkNP6iKp4t7_DrJIwsgbUOEfkCYpoZcoS09Nf5ME1sG-lnOgga75VXa_6Sejo1LywuQ3PuLkgI0ZCCq4ddZFUkpXrG1sNyktxPyHBd0uonyS_WSx6ASiH_nE3bbC5IHMY9oJDqDJSbFciSQsXDV1kA34MX5gCq_8nawPL0ihni8Mx1ZmsJ2fYb0O",
        alt: "Mozzarella fresca appena fatta",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYIsXBzDFK4K3PMms8BpvwDCoLSzJYN0EMEjE8aPZ1CGYDhosbkm69EkhhHoOHdg-8EH5Nwlm6jjBgpyYUV45HXmOQXQACjcggZ6e9zVGy5f2H0TIAj_wREdLVeENifdHh6N4PxlRdwzMKY_72oQnBtw8LcMiGalg8kz77l11d3mTC2gaALC3ztazHv-2bmQgt9vjJ_DH_gn2RCDBwvfSd5KCcWYYEPKtvbc0GXtt5FYdjozdQ_fm3QmYj6XuI6d5EJhsaS4fWLAI",
        alt: "Piatto del bistrò",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNzsawD_laLLp2VTmZFfFI_OGM7wiSJ6SAxHvNMUgfriHjXgaUrIW7jgHbDd475taZR6ztBuq0opb3xSSQOseSzUHTBfC-hwJ4Cm8kwev_cfqFC0Ib-0Frxw5rm-LNBUJD1E8f3DG8T4SFLoXcdPb_usXDVpVDe_WoFQ-e29haKq9ZItdltVlf_a9d_RQjRKqlfbdFmdDEP3DkGiWSs7z-1kdOiN1lTuT7uaR4NZvBqCaUsbblAsx3BdtAVXmfu6t8bTI9wy5lGbv",
        alt: "Tavoli all'aperto",
        layout: "wide",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8yQnXPHhQP3voq6WbNmsLd6QL2Llv41HcB3eoaNQlNFGFOz8EDGl6igy2-SnOOA1IjYDqNxmLRyrAjZ4VVT1rsSjL_90aLOJuI3fWlDERXho99W75DhS_RX0WS4bPNFf8nrGVBYj7DLvmXnLH9AcWTTh1Pvq5p447nb9_5vc3fwzWd4WW4cbYMr6V4Q3bu90GHEjaXtaVMOqj2Jn_D-AqSq-4Yq5ujj94DU72mm6oXulLZfZ2GHQBRG9aX2Hx6EZxgFF8sehzxulj",
        alt: "Degustazione formaggi",
        layout: "overlay",
      },
    ],
    dishes: [
      {
        icon: "restaurant",
        name: "Treccia di Mozzarella",
        description: "Appena filata, con pomodorini del piennolo e basilico.",
      },
      {
        icon: "dinner_dining",
        name: "Paccheri alla Sorrentina",
        description: "Con mozzarella filante e salsa di pomodoro San Marzano.",
      },
      {
        icon: "set_meal",
        name: "Tagliere del Casaro",
        description: "Selezione di formaggi freschi e stagionati con miele locale.",
      },
    ],
    services: [
      { icon: "local_parking", label: "Parcheggio Privato" },
      { icon: "child_care", label: "Area Bambini" },
      { icon: "deck", label: "Terrazza Esterna" },
    ],
    hours: [
      { day: "Lunedì", time: "Chiuso" },
      { day: "Mar - Dom", time: "10:00 - 15:00 / 18:00 - 22:00" },
    ],
    reviews: [
      {
        name: "Lucia Marino",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBbIm96hKEKEW3IAZaIDyeh6eBgfUblnTXtJRzaHt8wQd2xa6NB3i_JM6ul_wAhPtwe68xyhNwtH8N8kTI7rbRHUfq0FdEQ9KgdoraTwagyoHLV4V-2sS1Konb1FllsGC8kSU1Yij3eB_zH9rKhJ2wYmWPpLhPXEOm3RdF-zc14DsqbP2cKOUoKigq30-rIJyHq1ynGOg5eBk0zlMY2U-dRTy9aLDmYasE0QxMAhZMFuRJkafYvSfTV6tEWzmgcMzTSHlOuimo7OygX",
        date: "12 Novembre 2023",
        rating: 5,
        text: "La mozzarella più buona della zona! Poter vedere la produzione e poi degustarla è un'esperienza unica.",
      },
      {
        name: "Andrea Conti",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJw9kkQl3SYSO0XzFKSOKWD9lgd8VnKRIJWWNuHHilmeVx6j7D187fbWsBCkxLg3nXzSpsWv2_UKjjex25px8M_OiEKcYV-nPQJnCF6r7pt4SnAqx1SsezmSiu3xGveFZ18g9dmgX-mj7Hn47QBXZHZhHcOj4_VW5RSWaiI-8uYCfFoM3NUKLyGXyFGIhak6zIXNMUiCWcJuJug8pIEvCK5OlARavqZAZy4iDu43jZcE8VUHlp0vieuGlZvz4CXeBxuhqdqCnGO71I",
        date: "3 Ottobre 2023",
        rating: 4,
        text: "Ottimo rapporto qualità-prezzo. Ambiente informale ma curato. I paccheri sono da provare assolutamente.",
      },
    ],
    contact: {
      email: "info@ilgranato.it",
      website: "www.ilgranato.it",
    },
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxKJaXkGZzasBlsVCfCZBM6iv5Nr0FryQV8vTScdag_XsXLqPp3fO0INpdpDj3GXRkEDfSHbOjtaj84DwI6-3oSmxbiJj67xF1G2ZQ938SDhY7Hg6089brsMo9JrvovKRNgrKNv5dsV6m0P3GRdDnOZ5bwauDzmL8MTYtkjPFCx8r52B8wXJuVk-WUebMFgCK7eR8buXCvQSLy-tftif3JfMp-coUg9IxYa0_ooQCHIYUl-y7xeMjbciuWUAKARHRKXBEz8LDyvq",
  },
  {
    slug: "barlotti",
    name: "Barlotti",
    category: "ristorante",
    location: "Battipaglia, Campania",
    description: "Specialità Bufalina",
    cuisine: "Specialità di Bufala Campana",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 4,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTPWP6CDCmB9tkllAdcH_qIVY0SI-tQ-ukR0vGOrv5y6wfGQLEVgONCXFxTwUmEKw1OTgpPMtqOnLXZL6luYQHe3ojNvtAMLmAkBhJZrZ9kc7BlBrNB2V2jPJN0fNYfr_fH3cyQYyjZLZnKc_1NWtgpSPH-cDmnonJeuzCfvo86EqzgzBPoqkjquIF1j8iU3o0qQgw17X2BLwvZ53R-7THwo7QlmIjBap8k8gtVB-5R82DZwzShV-89jTwdC8DZ4a_bpl6QAJhjaF",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEvc5IyZbRNgFxO3MedUfOycyO5lB63OnsO488LA11wE08idIkFjAjzTYWV5CsqK05jMy_nlUqIYiKH39ecb9i1KWCy6CROpQlUadjVfy3Edi3CKH3lT75EkuyP2PF9sTINYX_BBx5F333k4hkA_qXmBnGpeNUfoSmKE8k6tPZuP-4SPjjfL7H-zzMe4zOj_nrIW28NdaWd_BdHDY-5Ny8DFQynb3Vq19ht_TapR0TQ4LEGfIZmWQUOqbi2t3D51VKv8Jcq4TwGXt3",
    rating: 4.5,
    reviewCount: 95,
    priceRange: "€€",
    priceLabel: "Fascia Media",
    openTime: "12:00 - 23:00",
    philosophy:
      "Barlotti è il tempio della bufala a Battipaglia, la capitale della mozzarella. Da tre generazioni la famiglia Barlotti seleziona il miglior latte di bufala per creare prodotti di eccellenza. Il ristorante nasce come naturale estensione del caseificio, dove ogni piatto celebra la versatilità di questo ingrediente straordinario.",
    galleryImages: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTPWP6CDCmB9tkllAdcH_qIVY0SI-tQ-ukR0vGOrv5y6wfGQLEVgONCXFxTwUmEKw1OTgpPMtqOnLXZL6luYQHe3ojNvtAMLmAkBhJZrZ9kc7BlBrNB2V2jPJN0fNYfr_fH3cyQYyjZLZnKc_1NWtgpSPH-cDmnonJeuzCfvo86EqzgzBPoqkjquIF1j8iU3o0qQgw17X2BLwvZ53R-7THwo7QlmIjBap8k8gtVB-5R82DZwzShV-89jTwdC8DZ4a_bpl6QAJhjaF",
        alt: "Bufala e mozzarella",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4e6gyjQEVcIAfcJNzX1_BQLUVkgeyZN-hLxyroXxvir7bF2RvYez6YsO0uDalb-TuDVEH1Zjy4rfVb9rJepo8wkNP6iKp4t7_DrJIwsgbUOEfkCYpoZcoS09Nf5ME1sG-lnOgga75VXa_6Sejo1LywuQ3PuLkgI0ZCCq4ddZFUkpXrG1sNyktxPyHBd0uonyS_WSx6ASiH_nE3bbC5IHMY9oJDqDJSbFciSQsXDV1kA34MX5gCq_8nawPL0ihni8Mx1ZmsJ2fYb0O",
        alt: "Piatti a base di bufala",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8yQnXPHhQP3voq6WbNmsLd6QL2Llv41HcB3eoaNQlNFGFOz8EDGl6igy2-SnOOA1IjYDqNxmLRyrAjZ4VVT1rsSjL_90aLOJuI3fWlDERXho99W75DhS_RX0WS4bPNFf8nrGVBYj7DLvmXnLH9AcWTTh1Pvq5p447nb9_5vc3fwzWd4WW4cbYMr6V4Q3bu90GHEjaXtaVMOqj2Jn_D-AqSq-4Yq5ujj94DU72mm6oXulLZfZ2GHQBRG9aX2Hx6EZxgFF8sehzxulj",
        alt: "Preparazione artigianale",
        layout: "square",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8u8DYcRpj5y-6ClzGRDLf1vhQTYR6tjre9S7m-Yl3AY1CSem92mqhxjYxm2T1pLVW2n7-qG-DjC8NAzcKOM7eqnh0ChRruhSzo3LWp-kHHJ7owCOMVR0jy4G3w0JJnUpfhdFfY2On9CdBOLjrgxOpr2WeOHG-M336QjIDu55F1G_2UPeG4YKC_PMDM_3gMOLh5l7eT4AjBEXv3jtHfW_KS98cMoXUw7spwH6ymb0GsUOy-xRMTU39taTbT9KEWrAn-uiEJcoKOTqO",
        alt: "Sala del ristorante",
        layout: "wide",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkcBPV9M0p1-1tDO9uQXg4amqJ70s6KRefsbMAgSOb1BOMUtxFXSygoOmJTT8mwSGPAx786-FjYldg0Z9dKUMpx4Z05EmP4P75aJaUUSCpmvcxN-WuG2eptr2iPyJK7pnR3nCLDvaPdA2juPr8czO6COuyXYfLNNfs0Ldb7QeeZHUeIsWypLajof20xwr5L-bsktT5vdYTsIjUSm49x-T5V9XQl3ooXyksFmAyOlIhHJYQm6XY7LJteblszbiCFBKprsrK6rRg0aCV",
        alt: "Area esterna panoramica",
        layout: "overlay",
      },
    ],
    dishes: [
      {
        icon: "restaurant",
        name: "Burrata di Bufala",
        description: "Cremosa e delicata, con cuore di stracciatella.",
      },
      {
        icon: "dinner_dining",
        name: "Pizza Margherita DOC",
        description: "Con mozzarella di bufala DOP e pomodoro San Marzano.",
      },
      {
        icon: "set_meal",
        name: "Carpaccio di Bufala",
        description: "Affumicato con rucola selvatica e riduzione di balsamico.",
      },
    ],
    services: [
      { icon: "local_parking", label: "Parcheggio Gratuito" },
      { icon: "wifi", label: "WiFi Gratuito" },
      { icon: "groups", label: "Sale per Eventi" },
    ],
    hours: [
      { day: "Mercoledì", time: "Chiuso" },
      { day: "Lun - Mar, Gio - Dom", time: "12:00 - 15:00 / 18:30 - 23:00" },
    ],
    reviews: [
      {
        name: "Fabio D'Amico",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJw9kkQl3SYSO0XzFKSOKWD9lgd8VnKRIJWWNuHHilmeVx6j7D187fbWsBCkxLg3nXzSpsWv2_UKjjex25px8M_OiEKcYV-nPQJnCF6r7pt4SnAqx1SsezmSiu3xGveFZ18g9dmgX-mj7Hn47QBXZHZhHcOj4_VW5RSWaiI-8uYCfFoM3NUKLyGXyFGIhak6zIXNMUiCWcJuJug8pIEvCK5OlARavqZAZy4iDu43jZcE8VUHlp0vieuGlZvz4CXeBxuhqdqCnGO71I",
        date: "8 Dicembre 2023",
        rating: 4,
        text: "La mozzarella è freschissima e si sente. Ambiente accogliente e personale cordiale. Torneremo sicuramente.",
      },
      {
        name: "Valentina Russo",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBbIm96hKEKEW3IAZaIDyeh6eBgfUblnTXtJRzaHt8wQd2xa6NB3i_JM6ul_wAhPtwe68xyhNwtH8N8kTI7rbRHUfq0FdEQ9KgdoraTwagyoHLV4V-2sS1Konb1FllsGC8kSU1Yij3eB_zH9rKhJ2wYmWPpLhPXEOm3RdF-zc14DsqbP2cKOUoKigq30-rIJyHq1ynGOg5eBk0zlMY2U-dRTy9aLDmYasE0QxMAhZMFuRJkafYvSfTV6tEWzmgcMzTSHlOuimo7OygX",
        date: "22 Novembre 2023",
        rating: 5,
        text: "Il miglior posto per mangiare bufala a Battipaglia. La burrata è celestiale! Prezzi onesti per la qualità offerta.",
      },
    ],
    contact: {
      email: "info@barlotti.it",
      website: "www.barlotti.it",
    },
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxKJaXkGZzasBlsVCfCZBM6iv5Nr0FryQV8vTScdag_XsXLqPp3fO0INpdpDj3GXRkEDfSHbOjtaj84DwI6-3oSmxbiJj67xF1G2ZQ938SDhY7Hg6089brsMo9JrvovKRNgrKNv5dsV6m0P3GRdDnOZ5bwauDzmL8MTYtkjPFCx8r52B8wXJuVk-WUebMFgCK7eR8buXCvQSLy-tftif3JfMp-coUg9IxYa0_ooQCHIYUl-y7xeMjbciuWUAKARHRKXBEz8LDyvq",
  },
  // ── Basic Plan Entries ──────────────────────────────────────────────
  {
    slug: "trattoria-da-maria",
    name: "Trattoria da Maria",
    category: "ristorante",
    location: "Eboli, Campania",
    description: "Cucina casalinga della tradizione",
    cuisine: "Trattoria Tradizionale",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4e6gyjQEVcIAfcJNzX1_BQLUVkgeyZN-hLxyroXxvir7bF2RvYez6YsO0uDalb-TuDVEH1Zjy4rfVb9rJepo8wkNP6iKp4t7_DrJIwsgbUOEfkCYpoZcoS09Nf5ME1sG-lnOgga75VXa_6Sejo1LywuQ3PuLkgI0ZCCq4ddZFUkpXrG1sNyktxPyHBd0uonyS_WSx6ASiH_nE3bbC5IHMY9oJDqDJSbFciSQsXDV1kA34MX5gCq_8nawPL0ihni8Mx1ZmsJ2fYb0O",
    phone: "+39 089 123 4567",
    website: "https://example.com",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 10,
  },
  {
    slug: "pizzeria-vesuvio",
    name: "Pizzeria Vesuvio",
    category: "pizzeria",
    location: "Battipaglia, Campania",
    description: "Pizza napoletana dal 1985",
    cuisine: "Pizzeria Napoletana",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYIsXBzDFK4K3PMms8BpvwDCoLSzJYN0EMEjE8aPZ1CGYDhosbkm69EkhhHoOHdg-8EH5Nwlm6jjBgpyYUV45HXmOQXQACjcggZ6e9zVGy5f2H0TIAj_wREdLVeENifdHh6N4PxlRdwzMKY_72oQnBtw8LcMiGalg8kz77l11d3mTC2gaALC3ztazHv-2bmQgt9vjJ_DH_gn2RCDBwvfSd5KCcWYYEPKtvbc0GXtt5FYdjozdQ_fm3QmYj6XuI6d5EJhsaS4fWLAI",
    phone: "+39 089 234 5678",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 11,
  },
  {
    slug: "masseria-del-cilento",
    name: "Masseria del Cilento",
    category: "agriturismo",
    location: "Capaccio, Campania",
    description: "Cucina contadina e ospitalità autentica",
    cuisine: "Agriturismo con Cucina Contadina",
    badge: "Consigliato",
    badgeStyle: "bg-white/90 backdrop-blur text-emerald-900",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Of56ZpLIjFT7KfqoYyRU9HVpJdy4OUeIdLu0WDnTSXpknfQsFSZ2wA1775zyWuySkjEGJfuqBT0PgKqkHQALavJmwKSExZZBcBKkka7S0LLtBMJcHqM3R2vpOKOlOtNKC--Ph5EL8wLNXxyZDPu-2XPjrOUf-s4hD3USQWhBiUvbH-IxrJqTnNTJvG2kUS9ANwQGGfe-Xctzc6bwV0Xl1duywKbHrZjyPwEoH48oA11dz5GkxgvkSLloUCFb3oFfZj6k9-2JOQD3",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Of56ZpLIjFT7KfqoYyRU9HVpJdy4OUeIdLu0WDnTSXpknfQsFSZ2wA1775zyWuySkjEGJfuqBT0PgKqkHQALavJmwKSExZZBcBKkka7S0LLtBMJcHqM3R2vpOKOlOtNKC--Ph5EL8wLNXxyZDPu-2XPjrOUf-s4hD3USQWhBiUvbH-IxrJqTnNTJvG2kUS9ANwQGGfe-Xctzc6bwV0Xl1duywKbHrZjyPwEoH48oA11dz5GkxgvkSLloUCFb3oFfZj6k9-2JOQD3",
    rating: 4.7,
    reviewCount: 62,
    priceRange: "€€",
    priceLabel: "Fascia Media",
    openTime: "12:00 - 22:00",
    philosophy:
      "La Masseria del Cilento è un agriturismo immerso nelle campagne di Capaccio. Qui si pratica ancora l'agricoltura tradizionale, e ogni piatto nasce dai prodotti dell'orto, del frutteto e dell'allevamento. Un'esperienza genuina, lontana dai ritmi della città.",
    phone: "+39 089 345 1234",
    website: "https://example.com",
    galleryImages: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Of56ZpLIjFT7KfqoYyRU9HVpJdy4OUeIdLu0WDnTSXpknfQsFSZ2wA1775zyWuySkjEGJfuqBT0PgKqkHQALavJmwKSExZZBcBKkka7S0LLtBMJcHqM3R2vpOKOlOtNKC--Ph5EL8wLNXxyZDPu-2XPjrOUf-s4hD3USQWhBiUvbH-IxrJqTnNTJvG2kUS9ANwQGGfe-Xctzc6bwV0Xl1duywKbHrZjyPwEoH48oA11dz5GkxgvkSLloUCFb3oFfZj6k9-2JOQD3",
        alt: "Terrazza con vista campagna",
        layout: "wide",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFdy4HmF5k4g2qPb_Zpv_fNdjxUDk3wLRscW2g8EPnuittz6-MjvL0kDAlaKwIbxeKFk7aDrShdEaz2BvHeXZnlCg3C1P3_6r82RF5RLQ8RS3p6dgOozYdVo24GPHU6lUhNUDfA4OHunWFMF4g-hBz2tz02jO07M66IqKcpQXiupkfiyTa2U2KPk_5oFWjoaE1HCvI5LIfZ7UKTzpp-ZqRRuEKYSggQziHGioDtu1T4aEsbd-iZICQ7JP1_zOR1ZO7SmFXTTepmADG",
        alt: "Prodotti dell'orto",
        layout: "square",
      },
    ],
    dishes: [
      { icon: "restaurant", name: "Cavatelli al Ragù", description: "Pasta fatta a mano con ragù di maiale nero cilentano." },
      { icon: "set_meal", name: "Frittura dell'Orto", description: "Verdure di stagione in pastella leggera." },
    ],
    services: [
      { icon: "local_parking", label: "Parcheggio Privato" },
      { icon: "deck", label: "Terrazza Panoramica" },
      { icon: "child_care", label: "Area Bambini" },
    ],
    hours: [
      { day: "Lunedì", time: "Chiuso" },
      { day: "Mar - Dom", time: "12:00 - 15:00 / 19:00 - 22:00" },
    ],
    reviews: [],
    contact: { email: "info@masseriacilento.it", website: "www.masseriacilento.it" },
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpxKJaXkGZzasBlsVCfCZBM6iv5Nr0FryQV8vTScdag_XsXLqPp3fO0INpdpDj3GXRkEDfSHbOjtaj84DwI6-3oSmxbiJj67xF1G2ZQ938SDhY7Hg6089brsMo9JrvovKRNgrKNv5dsV6m0P3GRdDnOZ5bwauDzmL8MTYtkjPFCx8r52B8wXJuVk-WUebMFgCK7eR8buXCvQSLy-tftif3JfMp-coUg9IxYa0_ooQCHIYUl-y7xeMjbciuWUAKARHRKXBEz8LDyvq",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: false,
    displayPriority: 5,
    featured: true,
  },
  {
    slug: "agriturismo-le-colline",
    name: "Agriturismo Le Colline",
    category: "agriturismo",
    location: "Capaccio, Campania",
    description: "Ospitalità rurale e prodotti tipici",
    cuisine: "Agriturismo con Cucina Tipica",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8yQnXPHhQP3voq6WbNmsLd6QL2Llv41HcB3eoaNQlNFGFOz8EDGl6igy2-SnOOA1IjYDqNxmLRyrAjZ4VVT1rsSjL_90aLOJuI3fWlDERXho99W75DhS_RX0WS4bPNFf8nrGVBYj7DLvmXnLH9AcWTTh1Pvq5p447nb9_5vc3fwzWd4WW4cbYMr6V4Q3bu90GHEjaXtaVMOqj2Jn_D-AqSq-4Yq5ujj94DU72mm6oXulLZfZ2GHQBRG9aX2Hx6EZxgFF8sehzxulj",
    phone: "+39 089 345 6789",
    website: "https://example.com",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 12,
  },
  {
    slug: "agriturismo-terra-madre",
    name: "Agriturismo Terra Madre",
    category: "agriturismo",
    location: "Eboli, Campania",
    description: "Fattoria didattica e cucina biologica",
    cuisine: "Agriturismo Biologico",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAkYSVFg_aNxZfjfmFOXaDGn6a7UIdyC0FCVDbMGciwiefXWu3ul2ODiWLnkhrdDE73f7ltgrI3Qn5obYHrlzN75S2Dbyi4Dr90M2FpnlWsDiCgOc967fcZsA_ivmAue8rBFFMiB7lonMHXQDXT3raxKxch2ckEBUgxNQ4VIhJor60dqTUOVPvB-Op4xfmFhm7OX640ccgsNXKCzRLkNAov7h6PUBp3WJGDEgQ27xw0i4cWMcLEOgbDnomcJKUe36oKogRs4mRK6NR",
    phone: "+39 089 345 9876",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: false,
    displayPriority: 16,
  },
  {
    slug: "caseificio-la-perla",
    name: "Caseificio La Perla",
    category: "caseificio",
    location: "Paestum, Campania",
    description: "Mozzarella di bufala artigianale",
    cuisine: "Caseificio Artigianale",
    phone: "+39 089 456 7890",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8u8DYcRpj5y-6ClzGRDLf1vhQTYR6tjre9S7m-Yl3AY1CSem92mqhxjYxm2T1pLVW2n7-qG-DjC8NAzcKOM7eqnh0ChRruhSzo3LWp-kHHJ7owCOMVR0jy4G3w0JJnUpfhdFfY2On9CdBOLjrgxOpr2WeOHG-M336QjIDu55F1G_2UPeG4YKC_PMDM_3gMOLh5l7eT4AjBEXv3jtHfW_KS98cMoXUw7spwH6ymb0GsUOy-xRMTU39taTbT9KEWrAn-uiEJcoKOTqO",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 13,
  },
  {
    slug: "cantina-del-sele",
    name: "Cantina del Sele",
    category: "cantina",
    location: "Eboli, Campania",
    description: "Vini locali e degustazioni",
    cuisine: "Cantina Vinicola",
    phone: "+39 089 567 8901",
    website: "https://example.com",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkcBPV9M0p1-1tDO9uQXg4amqJ70s6KRefsbMAgSOb1BOMUtxFXSygoOmJTT8mwSGPAx786-FjYldg0Z9dKUMpx4Z05EmP4P75aJaUUSCpmvcxN-WuG2eptr2iPyJK7pnR3nCLDvaPdA2juPr8czO6COuyXYfLNNfs0Ldb7QeeZHUeIsWypLajof20xwr5L-bsktT5vdYTsIjUSm49x-T5V9XQl3ooXyksFmAyOlIhHJYQm6XY7LJteblszbiCFBKprsrK6rRg0aCV",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 14,
  },
  {
    slug: "pasticceria-dolce-vita",
    name: "Pasticceria Dolce Vita",
    category: "pasticceria",
    location: "Salerno, Campania",
    description: "Dolci della tradizione campana",
    cuisine: "Pasticceria Artigianale",
    phone: "+39 089 678 9012",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLP3XiNJbEhDR1U7doj0EXcxdN6Nlfkj3ETN4PBfWJMe3u9y3mXC2hHrkvP-D39MhqKkv1c3ZkXYGDqbfpqJk1RNcjkXOGx5Skq9oE8PpBm6DwS9eyVU5XaAGzaiS6pmtaUbi-gVziL4gbPWl7BsxSboXwQlQm84MGg3hQg2k81DUe4IH7LbbaZKkFO81cvhMc0YmyKSUrS4wgpPk1HS4tSSw3lkiULC6LBTc75oFCVPlZMdR8UvHo_xetDMkhTBbQPK9bWsyK4YQi",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 15,
  },
];
