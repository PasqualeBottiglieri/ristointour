import type { PlanType, PlanFields } from "./types";

export type ArtistType = "cantante" | "band" | "dj" | "musicista" | "performer";

export interface ArtistVideo {
  title: string;
  embedUrl: string;
  type: "performance" | "interview" | "musicvideo";
}

export interface ArtistSocial {
  platform: "instagram" | "facebook" | "youtube" | "spotify" | "tiktok" | "website";
  url: string;
}

export interface Artist extends PlanFields {
  slug: string;
  name: string;
  artistType?: ArtistType;
  genre: string;
  location: string;
  shortDescription: string;
  image: string;
  eventTypes: string[];
  featured: boolean;
  badge?: string;
  badgeStyle?: string;
  phone?: string;
  website?: string;
  // Premium-only fields (optional for basic entries)
  biography?: string;
  musicStyle?: string;
  fullDescription?: string;
  galleryImages?: string[];
  videos?: ArtistVideo[];
  socials?: ArtistSocial[];
  videoEmbeds?: string[];
  socialLinks?: { platform: string; url: string }[];
}

export const artists: Artist[] = [
  {
    slug: "marco-russo",
    name: "Marco Russo",
    artistType: "cantante",
    genre: "Jazz & Soul",
    location: "Paestum",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 1,
    shortDescription:
      "Vocalist jazz con oltre 15 anni di esperienza in eventi esclusivi nella Piana del Sele.",
    biography:
      "Marco Russo è un vocalist jazz nato e cresciuto a Paestum. Dopo gli studi al Conservatorio di Salerno, ha affinato il suo stile esibendosi nei club jazz di tutta Italia. La sua voce calda e avvolgente lo ha reso uno degli artisti più richiesti per matrimoni ed eventi di alto livello nella Piana del Sele. Collabora regolarmente con musicisti internazionali e ha all'attivo due album di brani originali ispirati alla tradizione musicale campana rivisitata in chiave jazz.",
    musicStyle:
      "Un blend sofisticato di jazz classico, soul e influenze della musica mediterranea. Repertorio che spazia da Frank Sinatra a Michael Bublé, passando per brani originali.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlve7VM-C__4ama0CZ1w06m-q1GuDL61eYrChAEfkz2sc-yEdQwjBJbdLeiAvfba48fP2DNqGRlcHXCJFpQCeTAuABNWJF4fTnvId6WGc7j0UmbNiRysfcKrgeflsuNr9yu7iKeBJ74mC9oQ_I5LWRtW3HOAINOmvBsRa14wZ5wlRbVZaKOT6Tq42E8Jvyw088_kQoRVJaULOCSydL9j9oRvOiexxrAliubLi6Q-T2xTUcFe3N-8Bf9iiqcr8kXXudu7JBh8HUGsm",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCiVNxSrBm3_loyFeuvoFOGDMFUup0uvn0CXrjgzgjEFgOasrKmOBEh-BRSvOGACBjN6UbdWLj-yeVbr3q87k4JL73jC2vSNBYgUEKRLwnq-zhOJTqcIZiNKPDEttPyC_I8jFEoO8Appfml_izxtyWq9KOnCNNdBHXLOeVynpzwExAsFVRXWdGS7_rDTbzkq5PUMpcLZ6Ltvaz5xNBhe3SDUhppDXOthalXmZTh4PL5Hj4uQXhPwaBr791MI9VQ5EOPk1a2XI8ggMn",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxBhqi0QWEmR85UJU0A00EIwbl_4sLybMN2Oyoky0TU7MslVx0eGPHEthy58rMcn2rU-G7BS9NlYLnw3ULdggrbhqrCOF4JKVhe_WdaE7LRF6YUW9y9cp44QCiT3JJFO1ZQXyKlvFEDtmKr8TQI553DeoAlNRC7ZTGlG1CwS0QLuDwjaLdd3YBwUJdGXWhvgNzP-jECA54lT4xP5oUr4dsP7QB2rWaQJUzQFgX9CppkSnoCo5lLM4-ms0aKOq7Yzs5vRyhJrJ6h_hk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTPWP6CDCmB9tkllAdcH_qIVY0SI-tQ-ukR0vGOrv5y6wfGQLEVgONCXFxTwUmEKw1OTgpPMtqOnLXZL6luYQHe3ojNvtAMLmAkBhJZrZ9kc7BlBrNB2V2jPJN0fNYfr_fH3cyQYyjZLZnKc_1NWtgpSPH-cDmnonJeuzCfvo86EqzgzBPoqkjquIF1j8iU3o0qQgw17X2BLwvZ53R-7THwo7QlmIjBap8k8gtVB-5R82DZwzShV-89jTwdC8DZ4a_bpl6QAJhjaF",
    ],
    videos: [
      {
        title: "Live al Jazz Club Salerno",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
      {
        title: "Fly Me to the Moon - Cover",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "musicvideo",
      },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "spotify", url: "https://spotify.com" },
    ],
    eventTypes: ["Matrimoni", "Cene Private", "Aperitivi"],
    featured: true,
    badge: "Top Artist",
    badgeStyle: "bg-primary text-white",
  },
  {
    slug: "anna-esposito",
    name: "Anna Esposito",
    artistType: "cantante",
    genre: "Musica Napoletana",
    location: "Salerno",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 2,
    shortDescription:
      "Interprete appassionata della grande tradizione musicale napoletana, perfetta per eventi autentici.",
    biography:
      "Anna Esposito porta avanti con orgoglio la tradizione della musica napoletana. Cresciuta tra le melodie dei grandi classici, ha studiato canto lirico prima di dedicarsi completamente alla musica popolare. Le sue interpretazioni di brani storici, da 'O Sole Mio a Napule è, emozionano il pubblico di ogni età. Ha partecipato a numerosi festival e sagre in tutta la Campania.",
    musicStyle:
      "Musica napoletana classica e contemporanea. Repertorio che include i grandi classici di Murolo, Carosone e De André napoletano, fino alle hit moderne di Pino Daniele e Gigi D'Alessio.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFdy4HmF5k4g2qPb_Zpv_fNdjxUDk3wLRscW2g8EPnuittz6-MjvL0kDAlaKwIbxeKFk7aDrShdEaz2BvHeXZnlCg3C1P3_6r82RF5RLQ8RS3p6dgOozYdVo24GPHU6lUhNUDfA4OHunWFMF4g-hBz2tz02jO07M66IqKcpQXiupkfiyTa2U2KPk_5oFWjoaE1HCvI5LIfZ7UKTzpp-ZqRRuEKYSggQziHGioDtu1T4aEsbd-iZICQ7JP1_zOR1ZO7SmFXTTepmADG",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAkYSVFg_aNxZfjfmFOXaDGn6a7UIdyC0FCVDbMGciwiefXWu3ul2ODiWLnkhrdDE73f7ltgrI3Qn5obYHrlzN75S2Dbyi4Dr90M2FpnlWsDiCgOc967fcZsA_ivmAue8rBFFMiB7lonMHXQDXT3raxKxch2ckEBUgxNQ4VIhJor60dqTUOVPvB-Op4xfmFhm7OX640ccgsNXKCzRLkNAov7h6PUBp3WJGDEgQ27xw0i4cWMcLEOgbDnomcJKUe36oKogRs4mRK6NR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Of56ZpLIjFT7KfqoYyRU9HVpJdy4OUeIdLu0WDnTSXpknfQsFSZ2wA1775zyWuySkjEGJfuqBT0PgKqkHQALavJmwKSExZZBcBKkka7S0LLtBMJcHqM3R2vpOKOlOtNKC--Ph5EL8wLNXxyZDPu-2XPjrOUf-s4hD3USQWhBiUvbH-IxrJqTnNTJvG2kUS9ANwQGGfe-Xctzc6bwV0Xl1duywKbHrZjyPwEoH48oA11dz5GkxgvkSLloUCFb3oFfZj6k9-2JOQD3",
    ],
    videos: [
      {
        title: "O Sole Mio - Live Performance",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube", url: "https://youtube.com" },
    ],
    eventTypes: ["Matrimoni", "Sagre & Festival", "Cene Private"],
    featured: true,
    badge: "Tradizione",
    badgeStyle: "bg-white/90 backdrop-blur text-emerald-900",
  },
  {
    slug: "luca-de-luca",
    name: "Luca De Luca",
    artistType: "band",
    genre: "Pop & Rock",
    location: "Battipaglia",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 3,
    shortDescription:
      "Band leader versatile, dalle cover rock agli ultimi successi pop italiani e internazionali.",
    biography:
      "Luca De Luca è il frontman della band più richiesta della Piana del Sele. Con la sua energia contagiosa e un repertorio vastissimo, trasforma ogni evento in una festa indimenticabile. Ha suonato in centinaia di eventi tra matrimoni, feste aziendali e concerti live. La sua band è composta da 5 musicisti professionisti che garantiscono un sound pieno e coinvolgente.",
    musicStyle:
      "Pop, rock e dance music italiana e internazionale. Dai classici di Vasco Rossi e Ligabue ai successi di Ed Sheeran e Bruno Mars, con incursioni nella disco anni '80 e '90.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1A0AYFljePFn_7qZIP9P-X9Tfx5P8JywPHELjDxyMSXrk9trPp8nxNrbuT0CJtJLmuQ_KDpnf3dg7g8BRAUnC9ctvPfMIt0dn6do0NYcN5cLpY7k0L8wsi9maMbwaNV8ZxKLp3Ggs1Cz7OEIjub-yFOk18IGwtdBiNqZlKp7yEOpfKu8I932qbm7EUN0ooGF4fNKu7VmlW3SFWZvF3nTAN-Lnhjm_XcFwec55U5AqvdeGTsKogwlIZ4A1bwDCe9D30_rexj_k4z9x",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWHPUcA09DRK0n2vIGECnxe_vMlqYVJi6UKMFjU74UEX2sZqt4GA02ycCkOfpER33PY7Cm-aK11ZdQvD653-tDXUqLgpjomGthPTOSJR3hMr0WnX9RGdLBQIQqMlmguEn-o1miCj3uMTEJIWdbwNavC1ikEUW5jaCSOarN9wFMQGLF6auhkUa9Lgh0IkzYeekX71zSjbooNl5Jf7larekcdg4mTqFfDCrVykVuFVZmURRTMP76wwhF7Hyfh7r0gGkYdFNxO3MXz6Jx",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyRAg0wANgrpOyBs8dhEuS7SmL0J8t2VtNDX8DNYJWQHbAtRdOd0esgLIzql22_vmsizvW0E7fX2IuB4mSRM5jW3zC3l9tRQaXthRbFaxsM1FKO_8tnNsEyel1GHJ6ZhCkKw4-bVgU0sKnSR9q6HTKMVOSxXbKcpY1J50bY5oxePlqI87zSRaY_9RzN_Pz8zM6e--T5CO2y0lbOpqR9lsno8b-bzmuQzmy80_7CtSpalT5ul9xSpbUR4sDzv3r-HpDirGmW8nqZExN",
    ],
    videos: [
      {
        title: "Medley Rock Italiano - Live",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
      {
        title: "Wedding Highlight Reel",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "youtube", url: "https://youtube.com" },
      { platform: "tiktok", url: "https://tiktok.com" },
    ],
    eventTypes: ["Matrimoni", "Feste Aziendali", "Eventi all'Aperto"],
    featured: true,
  },
  {
    slug: "dj-salvatore",
    name: "DJ Salvatore",
    artistType: "dj",
    genre: "DJ Set",
    location: "Eboli",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: true,
    displayPriority: 4,
    shortDescription:
      "DJ professionista specializzato in set per aperitivi, feste private e serate danzanti.",
    biography:
      "DJ Salvatore è il punto di riferimento per la musica elettronica nella Piana del Sele. Con oltre 10 anni di esperienza, è specializzato in set personalizzati che si adattano perfettamente all'atmosfera di ogni evento. Dai lounge set per aperitivi eleganti ai set energici per feste danzanti, il suo stile versatile lo rende perfetto per ogni occasione.",
    musicStyle:
      "Deep house, lounge, disco e commercial dance. Set personalizzati per ogni tipo di evento, dalla musica sottofondo per cene eleganti ai set danzanti per feste notturne.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfzZRETVO7NFS4aS_O496ZeR1Ad50cGC6U_lIfP7eiflXht-yewEJ7yd6tbpTM-I6BSMxBdVq_e_S-i0_if9MZI466tS4zL5bEdB-iHmsRdGyJjvu1TBtSNB4Yew_Yp09hsyVYBlJhfkwrS8IrUHiTG5Zwlf3nQii81iOfDMDk0q9MydNbD5fn7bHoC5Pg9f1Ot6LuReewolnJaAahKLyVV-Pm_yYouIJGbRWV0cl9IUDmrFvtF2d4WwrI7PEQzn-VPnvDUdfzOtR",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnSaOr6CNBFQKRdi-IW6KLoRvItzBuo5hrgumXlpv2Adm-OKAJcAAK92gtVY4-jDgvnLz4x7NPPekpfu4DyICelyGsQQsK1wbeqgeTJtOLFBfmTlcUC3qNb2qGktbvkR8nNlB0baX58aYBzCCYZOn3QmMNtgFmn_EPZuF83z7bksDXgNcmFdZCi12VGP-a_upnGNnQWiLbIr2Ou5BGxG0AQe5664fK_Q2zVNPqsT5aeym_CTU---UX6slTEGU82XuidACXtLZiHRbx",
    ],
    videos: [
      {
        title: "Summer Sunset Set - Paestum Beach",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "spotify", url: "https://spotify.com" },
    ],
    eventTypes: ["Aperitivi", "Feste Aziendali", "Eventi all'Aperto"],
    featured: true,
    badge: "Popolare",
    badgeStyle: "bg-primary text-white",
  },
  {
    slug: "elena-ferrara",
    name: "Elena Ferrara",
    artistType: "musicista",
    genre: "Musica Classica",
    location: "Capaccio",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: false,
    displayPriority: 5,
    shortDescription:
      "Violinista classica di formazione, porta eleganza raffinata a cerimonie e ricevimenti.",
    biography:
      "Elena Ferrara è una violinista di talento formatasi al Conservatorio San Pietro a Majella di Napoli. Dopo anni di esperienza in orchestre sinfoniche, ha scelto di dedicarsi alla musica per eventi, portando la raffinatezza della musica classica in contesti esclusivi. Il suo repertorio spazia da Bach a Einaudi, con arrangiamenti originali che creano atmosfere indimenticabili.",
    musicStyle:
      "Musica classica, colonne sonore e crossover. Repertorio che include Bach, Vivaldi, Einaudi, Morricone e arrangiamenti moderni di brani pop per violino solo o ensemble.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmmiRpr1i2UTs-WirR9CDVE_z52V_jf2WuDzXHH5U6KoI3DNnQXIFisXszsmw9HPhiEl_2MW-WQuT79aarLEpnhLjDz_AHUaWEDUEgxUjprCpdOnGfWxNgkVHLpilg8s1jeA9H-Vgjm_qGDLwx1ITTb69OKkdRDtQUons_C8my3vVK1B5IM75ik9wBSQznqTaagtJZrEyY6Wir2WtoVi_NePZ6ZrFYYkcQ-zLd659NJHNrJhtrGr34l_6bqDLmxV5YW5UQx1al0JfD",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlve7VM-C__4ama0CZ1w06m-q1GuDL61eYrChAEfkz2sc-yEdQwjBJbdLeiAvfba48fP2DNqGRlcHXCJFpQCeTAuABNWJF4fTnvId6WGc7j0UmbNiRysfcKrgeflsuNr9yu7iKeBJ74mC9oQ_I5LWRtW3HOAINOmvBsRa14wZ5wlRbVZaKOT6Tq42E8Jvyw088_kQoRVJaULOCSydL9j9oRvOiexxrAliubLi6Q-T2xTUcFe3N-8Bf9iiqcr8kXXudu7JBh8HUGsm",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCiVNxSrBm3_loyFeuvoFOGDMFUup0uvn0CXrjgzgjEFgOasrKmOBEh-BRSvOGACBjN6UbdWLj-yeVbr3q87k4JL73jC2vSNBYgUEKRLwnq-zhOJTqcIZiNKPDEttPyC_I8jFEoO8Appfml_izxtyWq9KOnCNNdBHXLOeVynpzwExAsFVRXWdGS7_rDTbzkq5PUMpcLZ6Ltvaz5xNBhe3SDUhppDXOthalXmZTh4PL5Hj4uQXhPwaBr791MI9VQ5EOPk1a2XI8ggMn",
    ],
    videos: [
      {
        title: "Concerto per Violino - Cerimonia",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube", url: "https://youtube.com" },
      { platform: "website", url: "https://example.com" },
    ],
    eventTypes: ["Matrimoni", "Cene Private", "Aperitivi"],
    featured: false,
  },
  {
    slug: "tony-cilento",
    name: "Tony Cilento",
    artistType: "musicista",
    genre: "Folk & Tradizionale",
    location: "Agropoli",
    planType: "premium",
    hasDetailPage: true,
    showOnHomepage: false,
    displayPriority: 6,
    shortDescription:
      "Musicista folk che celebra le tradizioni musicali del Cilento con tamburello e chitarra battente.",
    biography:
      "Tony Cilento è un musicista folk che ha dedicato la sua vita alla preservazione della tradizione musicale cilentana. Suona chitarra battente, tamburello e organetto, strumenti tipici della musica popolare del sud Italia. Le sue esibizioni sono un viaggio nella cultura contadina del Cilento, tra tarantelle, villanelle e canti di lavoro. Collabora con gruppi folkloristici e partecipa alle principali sagre della regione.",
    musicStyle:
      "Musica folk cilentana e del sud Italia. Tarantelle, pizziche, villanelle e canti della tradizione contadina, con strumenti tradizionali come tamburello, chitarra battente e organetto.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCIzWJuRfMbRDrHetzmCGaEWJf5SW-MBK7rvE2LFn_96T8aXMcog7UIicLiTgrgH7M0q0eisa6LdQr8a3Bla8w_RNFaFdwpSfBkvV-rlqQICmGmPDTP_z51NQqTopSD6BWBb8raXwkqkAsNx3FU_vWG-_hhgfdU8obpmDPcljPgBxLSbQPFjqXrPfD1WqAdmdqDYsTaBc3eF-jw5TjndNatLrIxhAAdwvZ4LLUkPLhQ9k9mKaaaZnVUpY1I8tHbxOhzK6a51tqoRuV",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFdy4HmF5k4g2qPb_Zpv_fNdjxUDk3wLRscW2g8EPnuittz6-MjvL0kDAlaKwIbxeKFk7aDrShdEaz2BvHeXZnlCg3C1P3_6r82RF5RLQ8RS3p6dgOozYdVo24GPHU6lUhNUDfA4OHunWFMF4g-hBz2tz02jO07M66IqKcpQXiupkfiyTa2U2KPk_5oFWjoaE1HCvI5LIfZ7UKTzpp-ZqRRuEKYSggQziHGioDtu1T4aEsbd-iZICQ7JP1_zOR1ZO7SmFXTTepmADG",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Of56ZpLIjFT7KfqoYyRU9HVpJdy4OUeIdLu0WDnTSXpknfQsFSZ2wA1775zyWuySkjEGJfuqBT0PgKqkHQALavJmwKSExZZBcBKkka7S0LLtBMJcHqM3R2vpOKOlOtNKC--Ph5EL8wLNXxyZDPu-2XPjrOUf-s4hD3USQWhBiUvbH-IxrJqTnNTJvG2kUS9ANwQGGfe-Xctzc6bwV0Xl1duywKbHrZjyPwEoH48oA11dz5GkxgvkSLloUCFb3oFfZj6k9-2JOQD3",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1A0AYFljePFn_7qZIP9P-X9Tfx5P8JywPHELjDxyMSXrk9trPp8nxNrbuT0CJtJLmuQ_KDpnf3dg7g8BRAUnC9ctvPfMIt0dn6do0NYcN5cLpY7k0L8wsi9maMbwaNV8ZxKLp3Ggs1Cz7OEIjub-yFOk18IGwtdBiNqZlKp7yEOpfKu8I932qbm7EUN0ooGF4fNKu7VmlW3SFWZvF3nTAN-Lnhjm_XcFwec55U5AqvdeGTsKogwlIZ4A1bwDCe9D30_rexj_k4z9x",
    ],
    videos: [
      {
        title: "Tarantella Cilentana - Sagra del Fico",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "performance",
      },
      {
        title: "Intervista - Tradizioni Musicali",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "interview",
      },
    ],
    socials: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "youtube", url: "https://youtube.com" },
    ],
    eventTypes: ["Sagre & Festival", "Eventi all'Aperto", "Matrimoni"],
    featured: false,
    badge: "Tradizione",
    badgeStyle: "bg-white/90 backdrop-blur text-emerald-900",
  },
  // ── Basic Plan Entries ──────────────────────────────────────────────
  {
    slug: "duo-acoustic-sele",
    name: "Duo Acoustic Sele",
    artistType: "band",
    genre: "Pop & Rock",
    location: "Salerno",
    shortDescription:
      "Duo acustico per aperitivi e cene eleganti. Chitarra e voce con repertorio italiano e internazionale.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWHPUcA09DRK0n2vIGECnxe_vMlqYVJi6UKMFjU74UEX2sZqt4GA02ycCkOfpER33PY7Cm-aK11ZdQvD653-tDXUqLgpjomGthPTOSJR3hMr0WnX9RGdLBQIQqMlmguEn-o1miCj3uMTEJIWdbwNavC1ikEUW5jaCSOarN9wFMQGLF6auhkUa9Lgh0IkzYeekX71zSjbooNl5Jf7larekcdg4mTqFfDCrVykVuFVZmURRTMP76wwhF7Hyfh7r0gGkYdFNxO3MXz6Jx",
    eventTypes: ["Aperitivi", "Cene Private"],
    featured: false,
    phone: "+39 333 123 4567",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 10,
  },
  {
    slug: "dj-niko",
    name: "DJ Niko",
    artistType: "dj",
    genre: "DJ Set",
    location: "Battipaglia",
    shortDescription:
      "DJ per feste private e eventi aziendali. Specializzato in musica anni 80-90 e commercial.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyRAg0wANgrpOyBs8dhEuS7SmL0J8t2VtNDX8DNYJWQHbAtRdOd0esgLIzql22_vmsizvW0E7fX2IuB4mSRM5jW3zC3l9tRQaXthRbFaxsM1FKO_8tnNsEyel1GHJ6ZhCkKw4-bVgU0sKnSR9q6HTKMVOSxXbKcpY1J50bY5oxePlqI87zSRaY_9RzN_Pz8zM6e--T5CO2y0lbOpqR9lsno8b-bzmuQzmy80_7CtSpalT5ul9xSpbUR4sDzv3r-HpDirGmW8nqZExN",
    eventTypes: ["Feste Aziendali", "Aperitivi", "Eventi all'Aperto"],
    featured: false,
    phone: "+39 333 234 5678",
    website: "https://example.com",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 11,
  },
  {
    slug: "carmen-vocalist",
    name: "Carmen Vocalist",
    artistType: "cantante",
    genre: "Musica Napoletana",
    location: "Eboli",
    shortDescription:
      "Cantante per cerimonie e ricevimenti. Repertorio classico napoletano e italiano.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfzZRETVO7NFS4aS_O496ZeR1Ad50cGC6U_lIfP7eiflXht-yewEJ7yd6tbpTM-I6BSMxBdVq_e_S-i0_if9MZI466tS4zL5bEdB-iHmsRdGyJjvu1TBtSNB4Yew_Yp09hsyVYBlJhfkwrS8IrUHiTG5Zwlf3nQii81iOfDMDk0q9MydNbD5fn7bHoC5Pg9f1Ot6LuReewolnJaAahKLyVV-Pm_yYouIJGbRWV0cl9IUDmrFvtF2d4WwrI7PEQzn-VPnvDUdfzOtR",
    eventTypes: ["Matrimoni", "Cene Private", "Sagre & Festival"],
    featured: false,
    phone: "+39 333 345 6789",
    planType: "basic",
    hasDetailPage: false,
    showOnHomepage: true,
    displayPriority: 12,
  },
];
