// ==========================================================================
// AEGIS-9: CYBERBRAIN EDR // AUTONOMOUS SENTINEL DRONE & MULTI-FALLBACK ENGINE
// Bridges CONCORD DED Intelligence Pod, Official EVE Online ESI API,
// and the Native Swift 6 Binary (bin/Aegis9CyberbrainEDR on 127.0.0.1:9909)
// Multi-Empire & Multi-Faction Regional Intelligence (EVE Online, Echoes, Galaxy Conquest)
// ==========================================================================

export const EMPIRES_METADATA = {
  "all": { id: "all", name: "Todos los Imperios", color: "#57C4DD", icon: "🌌" },
  "gallente": { id: "gallente", name: "Gallente Federation", color: "#57C4DD", icon: "🏛️" },
  "caldari": { id: "caldari", name: "Caldari State", color: "#4D8FAC", icon: "🏢" },
  "amarr": { id: "amarr", name: "Amarr Empire", color: "#F3C64F", icon: "👑" },
  "minmatar": { id: "minmatar", name: "Minmatar Republic", color: "#E25A38", icon: "⚙️" },
  "nullsec": { id: "nullsec", name: "Espacio Pirata & Soberano", color: "#EA428B", icon: "☠️" }
};

export const FACTIONS_METADATA = {
  "all": { id: "all", name: "Todas las Facciones" },
  "guristas": { id: "guristas", name: "Guristas Pirates", type: "pirate", empire: "caldari", color: "#EA428B" },
  "blood_raiders": { id: "blood_raiders", name: "Blood Raiders Covenant", type: "pirate", empire: "amarr", color: "#FF2A6D" },
  "angel_cartel": { id: "angel_cartel", name: "Angel Cartel", type: "pirate", empire: "minmatar", color: "#9B51E0" },
  "sansha": { id: "sansha", name: "Sansha's Nation", type: "pirate", empire: "amarr", color: "#00E5FF" },
  "serpentis": { id: "serpentis", name: "Serpentis Corporation", type: "pirate", empire: "gallente", color: "#00F5D4" },
  "triglavian": { id: "triglavian", name: "Triglavian Collective", type: "special", empire: "nullsec", color: "#FF0055" },
  "edencom": { id: "edencom", name: "EDENCOM Interstellar Defense", type: "law", empire: "all", color: "#FFE600" },
  "gallente_fed": { id: "gallente_fed", name: "Gallente Navy / FIO", type: "empire", empire: "gallente", color: "#57C4DD" },
  "caldari_state": { id: "caldari_state", name: "Caldari State / Lai Dai", type: "empire", empire: "caldari", color: "#4D8FAC" },
  "amarr_empire": { id: "amarr_empire", name: "Amarr Imperial Navy", type: "empire", empire: "amarr", color: "#F3C64F" },
  "minmatar_republic": { id: "minmatar_republic", name: "Minmatar Republic Fleet", type: "empire", empire: "minmatar", color: "#E25A38" }
};

export const CONCORD_PRESENCE_METADATA = {
  "all": { id: "all", name: "Todos los Niveles de Presencia" },
  "high": { id: "high", name: "Presencia Total (1.0 - 0.5 // Despacho DED 3s–19s)", tier: "High-Sec", color: "#57C4DD" },
  "low": { id: "low", name: "Presencia Parcial (0.4 - 0.1 // Sin escolta policial · Solo Gate Guns)", tier: "Low-Sec", color: "#E5A93C" },
  "null": { id: "null", name: "Sin Presencia CONCORD (≤ 0.0 // Soberanía Anárquica)", tier: "Null-Sec", color: "#EA428B" }
};

export const GAME_LAYERS_METADATA = {
  "eve_online": { id: "eve_online", name: "EVE Online (Tranquility)", icon: "🛰️", desc: "Clúster oficial MMORPG de CCP Games" },
  "eve_echoes": { id: "eve_echoes", name: "EVE Echoes (Red Móvil)", icon: "📱", desc: "Red de soberanía y anomalías planetarias NetEase" },
  "eve_galaxy_conquest": { id: "eve_galaxy_conquest", name: "EVE Galaxy Conquest (4X)", icon: "⚔️", desc: "Teatro de conquista territorial 4X y fortalezas" }
};

export const NEW_EDEN_REGIONS = [
  // Gallente Federation
  {
    id: "essence",
    name: "Essence",
    empire: "gallente",
    empireName: "Gallente Federation",
    faction: "gallente_fed",
    factionName: "Gallente Federation / FIO",
    hostileFaction: "guristas",
    hostileFactionName: "Guristas Pirates",
    sec: 0.8,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "6s - 12s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Villore",
    systems: [
      { name: "Villore", sec: 0.8, id: 30005008 },
      { name: "Caille", sec: 0.9, id: 30005014 }
    ],
    x: 0.28, y: 0.42,
    description: "Corazón político del Senado Federal. Desvío de fondos reservados e intrigas de la Federal Intelligence Office."
  },
  {
    id: "sinq_laison",
    name: "Sinq Laison",
    empire: "gallente",
    empireName: "Gallente Federation",
    faction: "gallente_fed",
    factionName: "Creodron & Bolsa Federal",
    hostileFaction: "serpentis",
    hostileFactionName: "Serpentis Corporation",
    sec: 0.9,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "6s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Dodixie",
    systems: [
      { name: "Dodixie", sec: 0.9, id: 30002659 },
      { name: "Algogille", sec: 0.9, id: 30002660 }
    ],
    x: 0.23, y: 0.52,
    description: "Nodo financiero de New Eden en Dodixie. Monopolio de licitaciones de acorazados y contratos clandestinos."
  },
  {
    id: "placid",
    name: "Placid",
    empire: "gallente",
    empireName: "Gallente Federation",
    faction: "gallente_fed",
    factionName: "Federal Defense Vanguard",
    hostileFaction: "serpentis",
    hostileFactionName: "Serpentis Corporation",
    sec: 0.2,
    secTier: "low",
    concordPresence: "PARCIAL",
    concordResponse: "Sin escolta policial // Gate Guns",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Ostingele",
    systems: [
      { name: "Ostingele", sec: 0.2, id: 30003837 },
      { name: "Stacmon", sec: 0.6, id: 30003838 }
    ],
    x: 0.20, y: 0.34,
    description: "Corredor fronterizo agreste. Narcóticos sintéticos Booster y contrabando cruzado hacia bases piratas."
  },
  // Caldari State
  {
    id: "the_forge",
    name: "The Forge",
    empire: "caldari",
    empireName: "Caldari State",
    faction: "caldari_state",
    factionName: "Caldari State / Lai Dai",
    hostileFaction: "guristas",
    hostileFactionName: "Guristas Pirates",
    sec: 0.9,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "6s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Jita",
    systems: [
      { name: "Jita", sec: 0.9, id: 30000142 },
      { name: "Kimotoro", sec: 0.8, id: 30000144 }
    ],
    x: 0.68, y: 0.32,
    description: "El mayor emporio bursátil interestelar (Jita 4-4). Especulación de megacorporaciones y desvío de planos militares."
  },
  {
    id: "the_citadel",
    name: "The Citadel",
    empire: "caldari",
    empireName: "Caldari State",
    faction: "caldari_state",
    factionName: "State Peacekeepers",
    hostileFaction: "guristas",
    hostileFactionName: "Guristas Pirates",
    sec: 0.3,
    secTier: "low",
    concordPresence: "PARCIAL",
    concordResponse: "Sin escolta policial // Gate Guns",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Tama",
    systems: [
      { name: "Tama", sec: 0.3, id: 30002813 }
    ],
    x: 0.60, y: 0.40,
    description: "Foco de combate de guerra faccional en Tama. Asaltos constantes de piratas Guristas a convoyes logísticos."
  },
  {
    id: "black_rise",
    name: "Black Rise",
    empire: "caldari",
    empireName: "Caldari State",
    faction: "caldari_state",
    factionName: "State Protectorate Militia",
    hostileFaction: "gallente_fed",
    hostileFactionName: "Federal Defense Union",
    sec: 0.4,
    secTier: "low",
    concordPresence: "PARCIAL",
    concordResponse: "Sin escolta policial // Gate Guns",
    games: ["eve_online", "eve_galaxy_conquest"],
    capitalSystem: "Nennamaila",
    systems: [
      { name: "Nennamaila", sec: 0.4, id: 30004984 },
      { name: "Akidagi", sec: 0.3, id: 30004985 }
    ],
    x: 0.45, y: 0.28,
    description: "Teatro de guerra abierta faccional Caldari-Gallente. Complejos de combate fuertemente disputados."
  },
  {
    id: "lonetrek",
    name: "Lonetrek",
    empire: "caldari",
    empireName: "Caldari State",
    faction: "caldari_state",
    factionName: "Ishukone Watch",
    hostileFaction: "guristas",
    hostileFactionName: "Guristas Pirates",
    sec: 0.6,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "14s",
    games: ["eve_online", "eve_echoes"],
    capitalSystem: "Nourvukaiken",
    systems: [
      { name: "Nourvukaiken", sec: 0.6, id: 30001401 }
    ],
    x: 0.58, y: 0.22,
    description: "Corredor septentrional del Estado Caldari. Rutas de transporte pesado y fábricas de naves de asalto."
  },
  // Amarr Empire
  {
    id: "domain",
    name: "Domain",
    empire: "amarr",
    empireName: "Amarr Empire",
    faction: "amarr_empire",
    factionName: "Imperial Navy / House Sarum",
    hostileFaction: "blood_raiders",
    hostileFactionName: "Blood Raiders Covenant",
    sec: 0.9,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "6s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Amarr Prime",
    systems: [
      { name: "Amarr Prime", sec: 1.0, id: 30002187 },
      { name: "Sarum Prime", sec: 0.9, id: 30002188 }
    ],
    x: 0.38, y: 0.74,
    description: "Cuna del Sagrado Imperio Amarriano. Catedrales orbitales doradas y presencia abrumadora de la Armada Imperial."
  },
  {
    id: "bleak_lands",
    name: "Bleak Lands",
    empire: "amarr",
    empireName: "Amarr Empire",
    faction: "amarr_empire",
    factionName: "24th Imperial Crusade",
    hostileFaction: "blood_raiders",
    hostileFactionName: "Blood Raiders Covenant",
    sec: 0.3,
    secTier: "low",
    concordPresence: "PARCIAL",
    concordResponse: "Sin escolta policial // Gate Guns",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Kamela",
    systems: [
      { name: "Kamela", sec: 0.3, id: 30003068 },
      { name: "Sosala", sec: 0.4, id: 30003069 }
    ],
    x: 0.48, y: 0.65,
    description: "Zona fronteriza sangrienta asediada por los Blood Raiders. Secuestro de tripulaciones y naves diezmadas por rayos Nosferatu."
  },
  {
    id: "tash_murkon",
    name: "Tash-Murkon",
    empire: "amarr",
    empireName: "Amarr Empire",
    faction: "amarr_empire",
    factionName: "Familia Tash-Murkon",
    hostileFaction: "sansha",
    hostileFactionName: "Sansha's Nation",
    sec: 0.8,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "8s",
    games: ["eve_online", "eve_echoes"],
    capitalSystem: "Tash-Murkon Prime",
    systems: [
      { name: "Tash-Murkon Prime", sec: 0.9, id: 30001974 }
    ],
    x: 0.32, y: 0.82,
    description: "Centro comercial más opulento del Imperio Amarr. Rutas de intercambio financiero y flotas mercantes pesadas."
  },
  // Minmatar Republic
  {
    id: "metropolis",
    name: "Metropolis",
    empire: "minmatar",
    empireName: "Minmatar Republic",
    faction: "minmatar_republic",
    factionName: "Republic Fleet / Sebiestor",
    hostileFaction: "angel_cartel",
    hostileFactionName: "Angel Cartel",
    sec: 0.6,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "14s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Hek",
    systems: [
      { name: "Hek", sec: 0.5, id: 30002053 },
      { name: "Eram", sec: 0.6, id: 30002054 }
    ],
    x: 0.76, y: 0.68,
    description: "Gran metrópolis republicana y centro de comercio de Hek. Fuerte tráfico de cañones de artillería pesada y blindaje reactivo."
  },
  {
    id: "heimatar",
    name: "Heimatar",
    empire: "minmatar",
    empireName: "Minmatar Republic",
    faction: "minmatar_republic",
    factionName: "Tribal Council / Brutor",
    hostileFaction: "angel_cartel",
    hostileFactionName: "Angel Cartel",
    sec: 0.9,
    secTier: "high",
    concordPresence: "TOTAL",
    concordResponse: "6s",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "Pator",
    systems: [
      { name: "Pator", sec: 1.0, id: 30002505 },
      { name: "Rens", sec: 0.9, id: 30002510 }
    ],
    x: 0.82, y: 0.58,
    description: "El mundo natal de los Minmatar (Pator) y el polo bursátil de Rens. Eje neurálgico de la resistencia tribal."
  },
  {
    id: "molden_heath",
    name: "Molden Heath",
    empire: "minmatar",
    empireName: "Minmatar Republic",
    faction: "minmatar_republic",
    factionName: "Tribu Krusual",
    hostileFaction: "angel_cartel",
    hostileFactionName: "Angel Cartel",
    sec: 0.2,
    secTier: "low",
    concordPresence: "PARCIAL",
    concordResponse: "Sin escolta policial // Gate Guns",
    games: ["eve_online", "eve_echoes"],
    capitalSystem: "Bosboger",
    systems: [
      { name: "Bosboger", sec: 0.2, id: 30002718 }
    ],
    x: 0.88, y: 0.76,
    description: "Sector agreste y montañoso estelar. Cavernas de asteroides empleadas como bases de hiperpropulsores MWD ilegales."
  },
  // Piratas & Null-Sec Soberano
  {
    id: "venal",
    name: "Venal",
    empire: "nullsec",
    empireName: "Espacio Pirata / Anarquía",
    faction: "guristas",
    factionName: "Guristas Pirates",
    hostileFaction: "caldari_state",
    hostileFactionName: "Caldari Navy Strike Force",
    sec: -0.4,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (0.00)",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "6NJ8-V",
    systems: [
      { name: "H-PA29", sec: -0.2, id: 30001269 },
      { name: "Y-4CFK", sec: -0.5, id: 30001290 },
      { name: "6NJ8-V", sec: -0.4, id: 30001283 }
    ],
    x: 0.52, y: 0.08,
    description: "Sede de los Piratas Guristas. Sin ley ni presencia CONCORD; cuna de los temidos cruceros Gila y superdrones Gecko."
  },
  {
    id: "delve",
    name: "Delve",
    empire: "nullsec",
    empireName: "Espacio Pirata / Anarquía",
    faction: "blood_raiders",
    factionName: "Blood Raiders Covenant",
    hostileFaction: "amarr_empire",
    hostileFactionName: "Amarr Crusade",
    sec: -0.8,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (0.00)",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "1-SMEB",
    systems: [
      { name: "1-SMEB", sec: -0.8, id: 30004938 },
      { name: "PR-8CA", sec: -0.7, id: 30004939 }
    ],
    x: 0.16, y: 0.86,
    description: "Fortaleza de los Blood Raiders y coaliciones soberanas. Modificación clandestina de acorazados Bhaalgorn."
  },
  {
    id: "curse",
    name: "Curse",
    empire: "nullsec",
    empireName: "Espacio Pirata / Anarquía",
    faction: "angel_cartel",
    factionName: "Angel Cartel / Dominations",
    hostileFaction: "minmatar_republic",
    hostileFactionName: "Republic Fleet",
    sec: -0.6,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (0.00)",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "G-0Q86",
    systems: [
      { name: "G-0Q86", sec: -0.6, id: 30000856 },
      { name: "Heaven", sec: -0.7, id: 30000857 }
    ],
    x: 0.88, y: 0.48,
    description: "Dominio absoluto del Angel Cartel. Fabricación de naves Machariel ultrarrápidas y centros de distribución de contrabando."
  },
  {
    id: "stain",
    name: "Stain",
    empire: "nullsec",
    empireName: "Espacio Pirata / Anarquía",
    faction: "sansha",
    factionName: "Sansha's Nation",
    hostileFaction: "edencom",
    hostileFactionName: "EDENCOM Task Force",
    sec: -0.7,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (0.00)",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "LGK-VP",
    systems: [
      { name: "LGK-VP", sec: -0.7, id: 30001850 }
    ],
    x: 0.62, y: 0.90,
    description: "Territorio de Master Kuvakei. Colmenas cibernéticas y naves Nightmare armadas con lásers de pulso devastadores."
  },
  {
    id: "fountain",
    name: "Fountain",
    empire: "nullsec",
    empireName: "Espacio Pirata / Anarquía",
    faction: "serpentis",
    factionName: "Serpentis Corporation",
    hostileFaction: "gallente_fed",
    hostileFactionName: "Gallente Black Eagles",
    sec: -0.5,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (0.00)",
    games: ["eve_online", "eve_echoes", "eve_galaxy_conquest"],
    capitalSystem: "PNQY-Y",
    systems: [
      { name: "PNQY-Y", sec: -0.5, id: 30004598 }
    ],
    x: 0.08, y: 0.44,
    description: "Complejo industrial y laboratorios biológicos de Serpentis. Refinamiento masivo de estimulantes Drop y Exile."
  },
  {
    id: "pochven",
    name: "Pochven",
    empire: "nullsec",
    empireName: "Espacio Trascendente Kybernaut",
    faction: "triglavian",
    factionName: "Triglavian Collective",
    hostileFaction: "edencom",
    hostileFactionName: "EDENCOM Interstellar Defense",
    sec: -1.0,
    secTier: "null",
    concordPresence: "NULA",
    concordResponse: "Sin presencia CONCORD (Espacio Desconectado)",
    games: ["eve_online", "eve_galaxy_conquest"],
    capitalSystem: "Raravoss",
    systems: [
      { name: "Raravoss", sec: -1.0, id: 30000001 }
    ],
    x: 0.50, y: 0.50,
    description: "27 sistemas solares arrancados de New Eden por los Transmutadores Estelares Triglavianos. Guerra dimensional permanente."
  }
];

export const EVE_SOLAR_SYSTEM_IDS = {
  // Gallente
  "Ostingele":        { id: 30003837, regionId: 10000048, region: "Placid",      sec: 0.2, empire: "gallente", faction: "gallente_fed" },
  "Dodixie":          { id: 30002659, regionId: 10000032, region: "Sinq Laison", sec: 0.9, empire: "gallente", faction: "gallente_fed" },
  "Villore":          { id: 30005008, regionId: 10000064, region: "Essence",     sec: 0.8, empire: "gallente", faction: "gallente_fed" },
  "Caille":           { id: 30005014, regionId: 10000064, region: "Essence",     sec: 0.9, empire: "gallente", faction: "gallente_fed" },
  "Algogille":        { id: 30002660, regionId: 10000032, region: "Sinq Laison", sec: 0.9, empire: "gallente", faction: "gallente_fed" },
  "Stacmon":          { id: 30003838, regionId: 10000048, region: "Placid",      sec: 0.6, empire: "gallente", faction: "gallente_fed" },
  // Caldari
  "Jita":             { id: 30000142, regionId: 10000002, region: "The Forge",   sec: 0.9, empire: "caldari", faction: "caldari_state" },
  "Kimotoro":         { id: 30000144, regionId: 10000002, region: "The Forge",   sec: 0.8, empire: "caldari", faction: "caldari_state" },
  "Tama":             { id: 30002813, regionId: 10000033, region: "The Citadel", sec: 0.3, empire: "caldari", faction: "caldari_state" },
  "Nennamaila":       { id: 30004984, regionId: 10000069, region: "Black Rise",  sec: 0.4, empire: "caldari", faction: "caldari_state" },
  "Nourvukaiken":     { id: 30001401, regionId: 10000016, region: "Lonetrek",    sec: 0.6, empire: "caldari", faction: "caldari_state" },
  "Akidagi":          { id: 30004985, regionId: 10000069, region: "Black Rise",  sec: 0.3, empire: "caldari", faction: "caldari_state" },
  // Amarr
  "Amarr Prime":      { id: 30002187, regionId: 10000043, region: "Domain",      sec: 1.0, empire: "amarr", faction: "amarr_empire" },
  "Sarum Prime":      { id: 30002188, regionId: 10000043, region: "Domain",      sec: 0.9, empire: "amarr", faction: "amarr_empire" },
  "Kamela":           { id: 30003068, regionId: 10000038, region: "Bleak Lands", sec: 0.3, empire: "amarr", faction: "blood_raiders" },
  "Sosala":           { id: 30003069, regionId: 10000038, region: "Bleak Lands", sec: 0.4, empire: "amarr", faction: "blood_raiders" },
  "Tash-Murkon Prime":{ id: 30001974, regionId: 10000020, region: "Tash-Murkon",sec: 0.9, empire: "amarr", faction: "amarr_empire" },
  // Minmatar
  "Hek":              { id: 30002053, regionId: 10000042, region: "Metropolis",  sec: 0.5, empire: "minmatar", faction: "minmatar_republic" },
  "Eram":             { id: 30002054, regionId: 10000042, region: "Metropolis",  sec: 0.6, empire: "minmatar", faction: "minmatar_republic" },
  "Pator":            { id: 30002505, regionId: 10000030, region: "Heimatar",    sec: 1.0, empire: "minmatar", faction: "minmatar_republic" },
  "Rens":             { id: 30002510, regionId: 10000030, region: "Heimatar",    sec: 0.9, empire: "minmatar", faction: "minmatar_republic" },
  "Bosboger":         { id: 30002718, regionId: 10000028, region: "Molden Heath",sec: 0.2, empire: "minmatar", faction: "angel_cartel" },
  // Pirate / Null-Sec
  "H-PA29":           { id: 30001269, regionId: 10000015, region: "Venal",       sec: -0.2, empire: "nullsec", faction: "guristas" },
  "Y-4CFK":           { id: 30001290, regionId: 10000015, region: "Venal",       sec: -0.5, empire: "nullsec", faction: "guristas" },
  "6NJ8-V":           { id: 30001283, regionId: 10000015, region: "Venal",       sec: -0.4, empire: "nullsec", faction: "guristas" },
  "1-SMEB":           { id: 30004938, regionId: 10000060, region: "Delve",       sec: -0.8, empire: "nullsec", faction: "blood_raiders" },
  "PR-8CA":           { id: 30004939, regionId: 10000060, region: "Delve",       sec: -0.7, empire: "nullsec", faction: "blood_raiders" },
  "G-0Q86":           { id: 30000856, regionId: 10000011, region: "Curse",       sec: -0.6, empire: "nullsec", faction: "angel_cartel" },
  "Heaven":           { id: 30000857, regionId: 10000011, region: "Curse",       sec: -0.7, empire: "nullsec", faction: "angel_cartel" },
  "LGK-VP":           { id: 30001850, regionId: 10000023, region: "Stain",       sec: -0.7, empire: "nullsec", faction: "sansha" },
  "PNQY-Y":           { id: 30004598, regionId: 10000058, region: "Fountain",    sec: -0.5, empire: "nullsec", faction: "serpentis" },
  "Raravoss":         { id: 30000001, regionId: 10000070, region: "Pochven",     sec: -1.0, empire: "nullsec", faction: "triglavian" }
};

export class Aegis9SentinelDrone {
  constructor(concordWidget) {
    this.widget = concordWidget;

    // Estado regional y de mapa galáctico
    this.activeRegionId = "placid";
    this.activeGameMode = "eve_online"; // 'eve_online' | 'eve_echoes' | 'eve_galaxy_conquest'
    this.activeEmpireFilter = "all";
    this.activeFactionFilter = "all";
    this.activeConcordFilter = "all";

    // Estado de conectores y fallbacks de telemetría
    this.esiState = {
      status: "PROBING", // 'ONLINE' | 'CACHED_FALLBACK' | 'OFFLINE_SYNTHETIC'
      playersOnline: 24810,
      serverVersion: "Tranquility-ESI",
      lastSync: null,
      systemTelemetry: {} // { [systemName]: { shipKills, podKills, npcKills, shipJumps } }
    };

    this.nativeBridgeState = {
      status: "PROBING", // 'CONNECTED_NATIVE_SWIFT6' | 'WEBCRYPTO_FALLBACK'
      endpoint: "http://127.0.0.1:9909",
      binaryPath: "bin/Aegis9CyberbrainEDR",
      ghostSyncScore: 100.0,
      ledgerBlocksCount: 1
    };

    // Cadena de bloques local de resoluciones del Dron Sentinela
    this.ledgerChain = [];
    this.caseResolutions = new Map(); // caseId -> resolutionObject
    this.selectedCaseId = "hist-07";  // Por defecto: Caso Ostingele [BETA · GGCI 69%] (740,000,000 ISK)
    this.selectedStrategyOption = "auto"; // 'auto' | 'kinetic_airgap' | 'synaptic_hmac' | 'ghost_lock_esi'
    this.simulatedFailureTiers = new Set(); // Permite probar en vivo qué pasa si falla un nivel de fallback

    this.headlineObserver = null;
    this.lastObservedBannerHeadline = "";

    this.init();
  }

  async init() {
    await this.initializeGenesisBlock();
    this.setupBannerMutationObserver();
    await this.probeNativeSwiftBinaryBridge();
    await this.syncOfficialEveESIWithFallback();

    // Resolver todos los casos iniciales del Pod de Inteligencia
    await this.resolveAllPodCases();

    // Actualizar la píldora del banner TV con el caso actual
    this.updateBannerSentinelPillForCurrentHeadline();
  }

  // ==========================================================================
  // 1. OBSERVADOR REACTIVO DEL BANNER TV Y POD DE INTELIGENCIA (`MutationObserver`)
  // ==========================================================================
  setupBannerMutationObserver() {
    const headlineEl = document.getElementById("tv-headline-content");
    if (!headlineEl) return;

    const processHeadlineChange = () => {
      const rawText = (headlineEl.innerText || "").trim();
      if (!rawText || rawText === this.lastObservedBannerHeadline) return;
      this.lastObservedBannerHeadline = rawText;

      const parsedCase = this.parseBannerDOMIntoCase(headlineEl, rawText);
      if (parsedCase) {
        this.resolvePodCase(parsedCase).then((resolution) => {
          this.renderBannerSentinelBadge(resolution);
        });
      }
    };

    this.headlineObserver = new MutationObserver(() => {
      processHeadlineChange();
    });

    this.headlineObserver.observe(headlineEl, {
      childList: true,
      subtree: true,
      characterData: true
    });

    setTimeout(() => processHeadlineChange(), 150);
  }

  /**
   * Extrae un caso estructurado directamente del DOM del banner o de la base de datos
   */
  parseBannerDOMIntoCase(headlineEl, rawText) {
    const highlightEl = headlineEl.querySelector(".tv-highlight");
    const detectedSystemRaw = highlightEl ? highlightEl.innerText.replace(":", "").trim() : "Ostingele";
    const systemKey = Object.keys(EVE_SOLAR_SYSTEM_IDS).find((k) => detectedSystemRaw.includes(k)) || "Ostingele";

    const allIncidents = this.widget?.incidents || [];
    const matchedIncident = allIncidents.find(
      (inc) => inc.system === systemKey && rawText.includes(inc.text.slice(0, 24))
    ) || allIncidents.find((inc) => inc.system === systemKey);

    if (matchedIncident) {
      return matchedIncident;
    }

    const ggciMatch = rawText.match(/GGCI[:\s]+(\d+)%/i);
    const sevMatch = rawText.match(/\b(OMEGA|BETA|ALPHA)\b/i);
    const iskMatch = rawText.match(/\(([\d,\.]+\s*(?:M|B)?\s*ISK)\)/i);
    const sysMeta = EVE_SOLAR_SYSTEM_IDS[systemKey] || EVE_SOLAR_SYSTEM_IDS["Ostingele"];

    return {
      id: `dom-${systemKey.toLowerCase()}`,
      source: "eve_online",
      time: "LECTURA DOM EN VIVO",
      timestamp: new Date().toISOString(),
      system: systemKey,
      region: sysMeta.region,
      sec: sysMeta.sec,
      ship: "Whiptail / Interceptor Clandestino",
      corp: sysMeta.empire === "amarr" ? "Imperial Task Force" : (sysMeta.empire === "caldari" ? "State Peacekeepers" : (sysMeta.empire === "minmatar" ? "Brutor Vanguard" : "Federal Intelligence Office")),
      faction: sysMeta.empire === "amarr" ? "Amarr Empire" : (sysMeta.empire === "caldari" ? "Caldari State" : (sysMeta.empire === "minmatar" ? "Minmatar Republic" : "Gallente Federation")),
      severity: sevMatch ? sevMatch[1].toUpperCase() : "BETA",
      ggci: ggciMatch ? parseInt(ggciMatch[1], 10) : 69,
      cargo: ["Exile Booster", "Transmisores Clandestinos"],
      text: rawText,
      val: iskMatch ? iskMatch[1] : "740,000,000 ISK",
      valNum: 740000000
    };
  }

  renderBannerSentinelBadge(resolution) {
    if (!resolution) return;
    let badge = document.getElementById("tv-sentinel-status-pill");
    const rightContainer = document.querySelector(".tv-banner-right");
    if (!rightContainer) return;

    if (!badge) {
      badge = document.createElement("button");
      badge.id = "tv-sentinel-status-pill";
      badge.className = "tv-btn tv-sentinel-btn";
      badge.title = "Ver cómo el Dron Sentinela Aegis-9 resolvió este caso y su cadena de fallbacks";
      rightContainer.insertBefore(badge, rightContainer.firstChild);
    }

    if (!badge.dataset.boundSentinelClick) {
      badge.dataset.boundSentinelClick = "true";
      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        const activeCaseId = badge.dataset.currentCaseId || this.selectedCaseId || "hist-07";
        this.selectedCaseId = activeCaseId;
        this.widget.openPodModal();
        this.widget.switchTab("sentinel");
      });
    }
    badge.dataset.currentCaseId = resolution.caseId;

    const tierLabel = `FALLBACK T${resolution.activeFallbackTier}`;
    badge.innerHTML = `
      <span class="sentinel-pulse-dot"></span>
      <span class="tv-btn-text-full">🛡️ AEGIS-9 [${resolution.system.toUpperCase()} · ${tierLabel}]</span>
      <span class="tv-btn-text-short">🛡️ T${resolution.activeFallbackTier}</span>
    `;
  }

  updateBannerSentinelPillForCurrentHeadline() {
    const activeRes = this.caseResolutions.get(this.selectedCaseId) || this.caseResolutions.get("hist-07");
    if (activeRes) {
      this.renderBannerSentinelBadge(activeRes);
    }
  }

  // ==========================================================================
  // 2. CONECTOR A LA API OFICIAL DE EVE ONLINE (ESI) CON CASCADA DE FALLBACKS
  // ==========================================================================
  async syncOfficialEveESIWithFallback() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const statusRes = await fetch("https://esi.evetech.net/latest/status/?datasource=tranquility", {
        signal: controller.signal,
        headers: { "Accept": "application/json" }
      });

      if (!statusRes.ok) throw new Error(`ESI HTTP ${statusRes.status}`);
      const statusData = await statusRes.json();

      const [killsRes, jumpsRes] = await Promise.allSettled([
        fetch("https://esi.evetech.net/latest/universe/system_kills/?datasource=tranquility", { signal: controller.signal }),
        fetch("https://esi.evetech.net/latest/universe/system_jumps/?datasource=tranquility", { signal: controller.signal })
      ]);

      let killsArray = [];
      let jumpsArray = [];
      if (killsRes.status === "fulfilled" && killsRes.value.ok) {
        killsArray = await killsRes.value.json();
      }
      if (jumpsRes.status === "fulfilled" && jumpsRes.value.ok) {
        jumpsArray = await jumpsRes.value.json();
      }

      const killsMap = new Map(killsArray.map((k) => [k.system_id, k]));
      const jumpsMap = new Map(jumpsArray.map((j) => [j.system_id, j.ship_jumps || 0]));

      for (const [sysName, meta] of Object.entries(EVE_SOLAR_SYSTEM_IDS)) {
        const k = killsMap.get(meta.id) || {};
        this.esiState.systemTelemetry[sysName] = {
          systemId: meta.id,
          shipKills: k.ship_kills ?? this.defaultSyntheticMetrics(sysName).shipKills,
          podKills: k.pod_kills ?? this.defaultSyntheticMetrics(sysName).podKills,
          npcKills: k.npc_kills ?? this.defaultSyntheticMetrics(sysName).npcKills,
          shipJumps: jumpsMap.get(meta.id) ?? this.defaultSyntheticMetrics(sysName).shipJumps,
          source: "LIVE_ESI_TRANQUILITY"
        };
      }

      this.esiState.status = "ONLINE";
      this.esiState.playersOnline = statusData.players || 26410;
      this.esiState.serverVersion = `Tranquility v${statusData.server_version || "2684912"}`;
      this.esiState.lastSync = new Date().toISOString();

      try {
        localStorage.setItem("aegis9_esi_cache_v2", JSON.stringify(this.esiState));
      } catch {}
    } catch {
      let restoredCache = null;
      try {
        const raw = localStorage.getItem("aegis9_esi_cache_v2");
        if (raw) restoredCache = JSON.parse(raw);
      } catch {}

      if (restoredCache && restoredCache.systemTelemetry) {
        this.esiState = {
          ...restoredCache,
          status: "CACHED_FALLBACK"
        };
      } else {
        for (const sysName of Object.keys(EVE_SOLAR_SYSTEM_IDS)) {
          this.esiState.systemTelemetry[sysName] = this.defaultSyntheticMetrics(sysName);
        }
        this.esiState.status = "OFFLINE_SYNTHETIC";
        this.esiState.lastSync = new Date().toISOString();
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  defaultSyntheticMetrics(systemName) {
    const presets = {
      // Gallente
      "Ostingele":        { systemId: 30003837, shipKills: 34, podKills: 11, npcKills: 185, shipJumps: 940,  source: "DED_SYNTHETIC_FALLBACK" },
      "Dodixie":          { systemId: 30002659, shipKills: 12, podKills: 3,  npcKills: 45,  shipJumps: 4820, source: "DED_SYNTHETIC_FALLBACK" },
      "Villore":          { systemId: 30005008, shipKills: 6,  podKills: 1,  npcKills: 92,  shipJumps: 1890, source: "DED_SYNTHETIC_FALLBACK" },
      "Caille":           { systemId: 30005014, shipKills: 4,  podKills: 0,  npcKills: 60,  shipJumps: 1120, source: "DED_SYNTHETIC_FALLBACK" },
      // Caldari
      "Jita":             { systemId: 30000142, shipKills: 47, podKills: 18, npcKills: 20,  shipJumps: 14900, source: "DED_SYNTHETIC_FALLBACK" },
      "Tama":             { systemId: 30002813, shipKills: 89, podKills: 42, npcKills: 110, shipJumps: 2150, source: "DED_SYNTHETIC_FALLBACK" },
      "Nennamaila":       { systemId: 30004984, shipKills: 61, podKills: 24, npcKills: 95,  shipJumps: 1340, source: "DED_SYNTHETIC_FALLBACK" },
      "Nourvukaiken":     { systemId: 30001401, shipKills: 15, podKills: 4,  npcKills: 130, shipJumps: 1620, source: "DED_SYNTHETIC_FALLBACK" },
      // Amarr
      "Amarr Prime":      { systemId: 30002187, shipKills: 8,  podKills: 2,  npcKills: 40,  shipJumps: 6200, source: "DED_SYNTHETIC_FALLBACK" },
      "Sarum Prime":      { systemId: 30002188, shipKills: 14, podKills: 5,  npcKills: 85,  shipJumps: 2310, source: "DED_SYNTHETIC_FALLBACK" },
      "Kamela":           { systemId: 30003068, shipKills: 72, podKills: 33, npcKills: 240, shipJumps: 1480, source: "DED_SYNTHETIC_FALLBACK" },
      "Tash-Murkon Prime":{ systemId: 30001974, shipKills: 11, podKills: 3,  npcKills: 55,  shipJumps: 3400, source: "DED_SYNTHETIC_FALLBACK" },
      // Minmatar
      "Hek":              { systemId: 30002053, shipKills: 26, podKills: 8,  npcKills: 75,  shipJumps: 4100, source: "DED_SYNTHETIC_FALLBACK" },
      "Pator":            { systemId: 30002505, shipKills: 9,  podKills: 2,  npcKills: 35,  shipJumps: 3100, source: "DED_SYNTHETIC_FALLBACK" },
      "Rens":             { systemId: 30002510, shipKills: 22, podKills: 7,  npcKills: 60,  shipJumps: 5200, source: "DED_SYNTHETIC_FALLBACK" },
      "Bosboger":         { systemId: 30002718, shipKills: 58, podKills: 28, npcKills: 190, shipJumps: 890,  source: "DED_SYNTHETIC_FALLBACK" },
      // Pirate & Null-Sec
      "H-PA29":           { systemId: 30001269, shipKills: 28, podKills: 14, npcKills: 640, shipJumps: 410,  source: "DED_SYNTHETIC_FALLBACK" },
      "Y-4CFK":           { systemId: 30001290, shipKills: 19, podKills: 9,  npcKills: 820, shipJumps: 275,  source: "DED_SYNTHETIC_FALLBACK" },
      "6NJ8-V":           { systemId: 30001283, shipKills: 35, podKills: 16, npcKills: 510, shipJumps: 330,  source: "DED_SYNTHETIC_FALLBACK" },
      "1-SMEB":           { systemId: 30004938, shipKills: 94, podKills: 51, npcKills: 910, shipJumps: 620,  source: "DED_SYNTHETIC_FALLBACK" },
      "G-0Q86":           { systemId: 30000856, shipKills: 68, podKills: 39, npcKills: 740, shipJumps: 490,  source: "DED_SYNTHETIC_FALLBACK" },
      "LGK-VP":           { systemId: 30001850, shipKills: 52, podKills: 27, npcKills: 680, shipJumps: 380,  source: "DED_SYNTHETIC_FALLBACK" },
      "PNQY-Y":           { systemId: 30004598, shipKills: 44, podKills: 21, npcKills: 590, shipJumps: 450,  source: "DED_SYNTHETIC_FALLBACK" },
      "Raravoss":         { systemId: 30000001, shipKills: 112, podKills: 68, npcKills: 1100, shipJumps: 820, source: "DED_SYNTHETIC_FALLBACK" }
    };
    return presets[systemName] || { systemId: 30009999, shipKills: 25, podKills: 10, npcKills: 200, shipJumps: 1000, source: "DED_PROCEDURAL_SYNTHETIC" };
  }

  // ==========================================================================
  // 3. PUENTE AL BINARIO NATIVO `Aegis9CyberbrainEDR` (Swift 6) + FALLBACK WEBCRYPTO
  // ==========================================================================
  async probeNativeSwiftBinaryBridge() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 900);
    try {
      const res = await fetch(`${this.nativeBridgeState.endpoint}/api/aegis9/status`, {
        signal: controller.signal
      });
      if (res.ok) {
        const data = await res.json();
        this.nativeBridgeState.status = "CONNECTED_NATIVE_SWIFT6";
        this.nativeBridgeState.ghostSyncScore = data.ghostSyncScore ?? 100.0;
        this.nativeBridgeState.ledgerBlocksCount = data.ledgerBlocksVerified ?? 1;
        return true;
      }
    } catch {
      // Fallback a WebCrypto en navegador
    } finally {
      clearTimeout(timer);
    }
    this.nativeBridgeState.status = "WEBCRYPTO_FALLBACK";
    return false;
  }

  async initializeGenesisBlock() {
    if (this.ledgerChain.length > 0) return;
    const genesisHash = await this.computeSHA256(
      "IDX:0||GENESIS||AEGIS9_CYBERBRAIN_EDR||SACRED_GEOMETRY_CONCORD_DED_BRIDGE||0000000000000000"
    );
    this.ledgerChain.push({
      index: 0,
      caseId: "GENESIS",
      timestamp: new Date().toISOString(),
      system: "Yulai / Sección 9",
      techniqueCodes: ["T1070"],
      summary: "BLOQUE GÉNESIS // SINCRONIZACIÓN DRON SENTINELA AEGIS-9 CON POD DE INTELIGENCIA DED",
      previousHash: "0".repeat(64),
      currentHash: genesisHash,
      signatureHex: genesisHash.slice(0, 32) + "ed25519aegis9seal"
    });
  }

  async computeSHA256(message) {
    if (globalThis.crypto && globalThis.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    let h1 = 0xdeadbeef ^ message.length;
    let h2 = 0x41c6ce57 ^ message.length;
    for (let i = 0, ch; i < message.length; i++) {
      ch = message.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    return (
      (h1 >>> 0).toString(16).padStart(8, "0") +
      (h2 >>> 0).toString(16).padStart(8, "0")
    ).repeat(4);
  }

  // ==========================================================================
  // 4. MOTOR DE RESOLUCIÓN MULTI-FALLBACK Y REACCIÓN REGIONAL DEL DRON SENTINELA
  // ==========================================================================
  async resolveAllPodCases() {
    const incidents = this.widget?.incidents || [];
    for (const inc of incidents) {
      await this.resolvePodCase(inc);
    }
  }

  /**
   * Resuelve cualquier caso táctico en los 4 Grandes Imperios y todas las facciones.
   */
  async resolvePodCase(incident) {
    const sec = parseFloat(incident.sec ?? 0.2);
    const sysName = incident.system || "Ostingele";
    const esiMetrics = this.esiState.systemTelemetry[sysName] || this.defaultSyntheticMetrics(sysName);
    const cargoList = incident.cargo || [];
    const cargoJoined = cargoList.join(" ").toLowerCase();
    const textLower = (incident.text || "").toLowerCase();
    const faction = (incident.faction || "").toLowerCase();
    const ship = (incident.ship || "").toLowerCase();

    // 1. Mapeo MITRE ATT&CK contextualizado por imperio y facción
    const mitreMappings = [];

    // Facciones piratas y amenazas específicas:
    if (cargoJoined.includes("sangre") || faction.includes("blood") || textLower.includes("blood") || textLower.includes("nosferatu") || textLower.includes("sacrílego")) {
      mitreMappings.push({
        code: "T1565.002",
        name: "Data Manipulation: Neuro-Biometric & Drain",
        subsystem: "SynapticDataGuard (HMAC-SHA256)",
        reason: "Asalto de los Blood Raiders: Drenaje biológico Nosferatu y adulteración de telemetría de cápsula."
      });
      mitreMappings.push({
        code: "T1210",
        name: "Exploitation of Remote Capacitor Links",
        subsystem: "NeuralNetworkFirewall (Airgap)",
        reason: "Inyección de contramedidas energéticas contra acorazados Bhaalgorn en frontera imperial."
      });
    } else if (cargoJoined.includes("booster") || textLower.includes("estimulantes") || textLower.includes("narcóticos") || faction.includes("serpentis")) {
      mitreMappings.push({
        code: "T1565.002",
        name: "Data Manipulation: Transmitted Data",
        subsystem: "SynapticDataGuard (HMAC-SHA256)",
        reason: "Adulteración neuroquímica/sensorial por trasvase de estimulantes ilegales (Exile/Drop Booster)."
      });
    }

    if (cargoJoined.includes("mwd") || faction.includes("angel") || textLower.includes("angel cartel") || ship.includes("machariel")) {
      mitreMappings.push({
        code: "T1195",
        name: "Supply Chain Compromise: Illicit Warp Propulsion",
        subsystem: "ProstheticSignatureValidator (CDHash)",
        reason: "Tecnología de hiperimpulso ilegal del Angel Cartel con firmas de aceleración no homologadas (>5,000 m/s)."
      });
    }

    if (faction.includes("sansha") || textLower.includes("sansha") || ship.includes("nightmare")) {
      mitreMappings.push({
        code: "T1210",
        name: "Exploitation of Slave Cybernetic Nodes",
        subsystem: "NeuralNetworkFirewall (Anti-TrueSansha)",
        reason: "Infección de sub-redes corticales de tripulaciones esclavas por el colectivo cibernético de Kuvakei."
      });
    }

    if (faction.includes("triglavian") || textLower.includes("triglavian") || sysName === "Raravoss") {
      mitreMappings.push({
        code: "T1499",
        name: "Endpoint Denial of Service: Liminal Entropic Rays",
        subsystem: "DimensionalResonanceBarrier",
        reason: "Transmutadores estelares Triglavianos distorsionando los enlaces de hipervías de New Eden."
      });
    }

    if (cargoJoined.includes("transmisores") || textLower.includes("hackers") || textLower.includes("sin patrullas")) {
      mitreMappings.push({
        code: "T1210",
        name: "Exploitation of Remote Services",
        subsystem: "NeuralNetworkFirewall (Airgap Lateral)",
        reason: "Transmisores clandestinos y vectores de Ghost-hacking lateral en sector sin escolta policial."
      });
    }

    if (cargoJoined.includes("planos") || cargoJoined.includes("gecko") || cargoJoined.includes("dron")) {
      mitreMappings.push({
        code: "T1195",
        name: "Supply Chain Compromise",
        subsystem: "ProstheticSignatureValidator (CDHash)",
        reason: "Desvío de planos militares y superdrones con certificados aduaneros adulterados."
      });
    }

    if (sec < 0.5) {
      mitreMappings.push({
        code: "T1090",
        name: "Proxy / Blind Corridor Relay",
        subsystem: "NeuralNetworkFirewall (Anti-C2)",
        reason: `Uso del corredor ${sysName} (${sec} Sec) como nodo ciego hacia espacio soberano/anárquico.`
      });
    }

    mitreMappings.push({
      code: "T1070",
      name: "Indicator Removal / ChronoSync",
      subsystem: "ImmutableMemoryLedger + ChronoSync",
      reason: "Garantía de inmutabilidad: sellado criptográfico del incidente en el Ledger distribuido de Aegis-9."
    });

    // 2. Construir las 3 Opciones de Solución Táctica del Dron Sentinela adaptadas al entorno
    const solutionOptions = {
      kinetic_airgap: {
        id: "kinetic_airgap",
        title: "OPCIÓN A // INTERDICCIÓN CINÉTICA & CORTAFUEGOS NEURAL (T1210 / T1090)",
        badge: "CONTENCIÓN SUBESPACIAL",
        summary: `Acoplar el Dron Sentinela Aegis-9 a los sensores de ${sysName}, bloquear enlaces clandestinos de ${incident.ship || "la nave sospechosa"} y activar interdicción de puerta.`,
        technicalAction: `NeuralNetworkFirewall.blockEndpoint(system: "${sysName}") + Warp Scrambler sobre ${incident.ship || "casco"} (${incident.val}).`
      },
      synaptic_hmac: {
        id: "synaptic_hmac",
        title: "OPCIÓN B // TRAZADO ISOTÓPICO HMAC-SHA256 & DESACTIVACIÓN DE CARGA (T1565.002 / T1195)",
        badge: "NEUTRALIZACIÓN DE CARGA",
        summary: `Inyectar firma criptográfica HMAC-SHA256 sobre el lote de [${cargoList.join(", ") || "carga clandestina"}] inutilizando los activos antes de su transbordo hostil.`,
        technicalAction: `SynapticDataGuard.validateAndForward() -> Envenenamiento de firmas sobre ${cargoList.length || 2} contenedores valorados en ${incident.val}.`
      },
      ghost_lock_esi: {
        id: "ghost_lock_esi",
        title: "OPCIÓN C // PROTOCOLO 'GHOST LOCK' & EMBARGO BURSÁTIL ESI (T1070 / T1499)",
        badge: "EMBARGO TOTAL & LEDGER",
        summary: `Congelar preventivamente las cuentas colaterales de '${incident.corp}' en los mercados de Jita, Dodixie, Amarr y Rens, anclando el caso en la Blockchain Aegis-9.`,
        technicalAction: `GhostLockOrchestrator.engageFullGhostLock() + ImmutableMemoryLedger.appendEvent(#${incident.id}).`
      }
    };

    let activeOptionKey = this.selectedStrategyOption;
    if (activeOptionKey === "auto") {
      if (sec >= 0.5) activeOptionKey = "ghost_lock_esi";
      else if (sec >= 0.1) activeOptionKey = "kinetic_airgap";
      else activeOptionKey = "synaptic_hmac";
    }
    const chosenSolution = solutionOptions[activeOptionKey] || solutionOptions.kinetic_airgap;

    // 3. Evaluar la Escalera de 4 Fallbacks del Dron Sentinela
    const fallbackChain = this.evaluateFallbackLadder(incident, sec, esiMetrics, chosenSolution);
    const activeTierObj = fallbackChain.find((f) => f.state === "ACTIVE_EXECUTED") || fallbackChain[fallbackChain.length - 1];

    // 4. Sellar en la cadena de bloques
    const prevBlock = this.ledgerChain[this.ledgerChain.length - 1] || { currentHash: "0".repeat(64) };
    const canonicalPayload = [
      `CASE:${incident.id}`,
      `SYS:${sysName}`,
      `SEC:${sec}`,
      `GGCI:${incident.ggci}`,
      `OPT:${chosenSolution.id}`,
      `TIER:${activeTierObj.tier}`,
      `PREV:${prevBlock.currentHash}`
    ].join("||");

    const blockHash = await this.computeSHA256(canonicalPayload);
    const existingRes = this.caseResolutions.get(incident.id);
    let blockIndex = existingRes ? existingRes.ledgerBlockIndex : this.ledgerChain.length;

    if (!existingRes) {
      this.ledgerChain.push({
        index: blockIndex,
        caseId: incident.id,
        timestamp: new Date().toISOString(),
        system: sysName,
        techniqueCodes: mitreMappings.map((m) => m.code),
        summary: `[${sysName.toUpperCase()} · ${incident.severity}] ${chosenSolution.badge} via Fallback Tier ${activeTierObj.tier}`,
        previousHash: prevBlock.currentHash,
        currentHash: blockHash,
        signatureHex: blockHash.slice(0, 40) + "aegis9curve25519"
      });
    }

    const resolution = {
      caseId: incident.id,
      incident,
      system: sysName,
      sec,
      esiMetrics,
      mitreMappings,
      solutionOptions,
      chosenSolution,
      fallbackChain,
      activeFallbackTier: activeTierObj.tier,
      activeFallbackTitle: activeTierObj.name,
      ledgerBlockIndex: blockIndex,
      ledgerBlockHash: blockHash,
      resolvedAt: new Date().toLocaleTimeString("es-ES", { hour12: false })
    };

    this.caseResolutions.set(incident.id, resolution);
    return resolution;
  }

  evaluateFallbackLadder(incident, sec, esiMetrics, chosenSolution) {
    const tier1ForcedFail = this.simulatedFailureTiers.has(1);
    const tier2ForcedFail = this.simulatedFailureTiers.has(2);
    const tier3ForcedFail = this.simulatedFailureTiers.has(3);

    // Nivel 1: CONCORD DED Policial (Disponible solo si sec >= 0.5)
    const tier1Available = sec >= 0.5 && !tier1ForcedFail;
    const tier1Reason = !tier1Available
      ? (sec < 0.5
          ? `FALLO JURISDICCIONAL: ${incident.system} [${sec} Sec] carece de patrullas CONCORD activas (sector fronterizo o anárquico).`
          : `FALLO SIMULADO: Retraso de despacho CONCORD por interferencia subespacial en el cuadrante.`)
      : `EJECUTADO: Escuadrón CONCORD DED desplegado en ${incident.system} (${sec} Sec) en ${sec >= 0.8 ? "6 segundos" : "14 segundos"}.`;

    // Nivel 2: Dron Sentinela Aegis-9 + Gate Guns & Cortafuegos (Disponible si sec >= 0.1)
    const tier2Available = !tier1Available && sec >= 0.1 && !tier2ForcedFail;
    let tier2Status = "STANDBY_READY";
    let tier2Detail = `En reserva táctica: Red de Cañones Centinela de Puerta Estelar + Cortafuegos Neural Aegis-9 (T1210).`;
    if (!tier1Available) {
      if (sec >= 0.1 && !tier2ForcedFail) {
        tier2Status = "ACTIVE_EXECUTED";
        tier2Detail = `ACTIVADO POR FALLBACK T1 → Dron Sentinela acoplado a Gate Guns en ${incident.system} [${sec} Sec]. Transmisores de ${incident.ship || "la nave hostil"} bloqueados (${esiMetrics.shipJumps} saltos monitoreados).`;
      } else {
        tier2Status = "BYPASSED_FAILED";
        tier2Detail = sec < 0.1
          ? `FALLO DE INFRAESTRUCTURA: ${incident.system} [${sec} Null-Sec] no posee cañones de puerta de CONCORD.`
          : `FALLO SIMULADO: Cañones de puerta saboteados; escalando a Guerra Cibernética (Tier 3).`;
      }
    }

    // Nivel 3: Guerra Cibernética Aegis-9 (Ghost Lock + Trazado Sináptico HMAC-SHA256)
    const tier1And2Failed = !tier1Available && !tier2Available;
    const tier3Available = tier1And2Failed && !tier3ForcedFail;
    let tier3Status = "STANDBY_READY";
    let tier3Detail = `En reserva: Inyección de contramedida '${chosenSolution.badge}' y marcador isotópico HMAC-SHA256 sobre ${incident.val}.`;
    if (tier1And2Failed) {
      if (!tier3ForcedFail) {
        tier3Status = "ACTIVE_EXECUTED";
        tier3Detail = `ACTIVADO POR FALLBACK T2 → Protocolo Aegis-9 '${chosenSolution.badge}' inyectado en los subsistemas de ${incident.ship || "la nave"}. Carga marcada con HMAC-SHA256.`;
      } else {
        tier3Status = "BYPASSED_FAILED";
        tier3Detail = `FALLO SIMULADO: Blindaje electromagnético en nave enemiga; activando Fallback Final Inmutable (Tier 4).`;
      }
    }

    // Nivel 4: Garantía Última Inmutable (Sellado Blockchain Curve25519 + Embargo ESI en los 4 Hubs de New Eden)
    const tier4IsPrimaryActive = tier1And2Failed && tier3ForcedFail;

    return [
      {
        tier: 1,
        name: "NIVEL 1 (PRIMARIO) // INTERDICCIÓN POLICIAL CONCORD DED (3s–19s)",
        state: tier1Available ? "ACTIVE_EXECUTED" : "BYPASSED_FAILED",
        detail: tier1Reason
      },
      {
        tier: 2,
        name: "NIVEL 2 (FALLBACK 1) // DRON SENTINELA AEGIS-9 + GATE GUNS & CORTAFUEGOS (T1210)",
        state: tier2Status,
        detail: tier2Detail
      },
      {
        tier: 3,
        name: "NIVEL 3 (FALLBACK 2) // CONTRAMEDIDA SINÁPTICA HMAC-SHA256 & GHOST LOCK REMOTO (T1565.002)",
        state: tier3Status,
        detail: tier3Detail
      },
      {
        tier: 4,
        name: "NIVEL 4 (FALLBACK FINAL GARANTIZADO) // SELLO BLOCKCHAIN LEDGER (T1070) & EMBARGO BURSÁTIL ESI",
        state: tier4IsPrimaryActive ? "ACTIVE_EXECUTED" : "SEALED_ANCHOR",
        detail: `SIEMPRE ACTIVO: Expediente #${incident.id} (${incident.val}) sellado con SHA-256 + Curve25519 y orden de embargo enviada a los hubs de Jita 4-4, Dodixie, Amarr y Rens.`
      }
    ];
  }

  // ==========================================================================
  // 5. DESPLIEGUE VERSÁTIL DEL DRON SENTINELA OBSERVANDO EL MAPA
  // ==========================================================================
  /**
   * Despliega y adapta el Dron Sentinela a cualquier región seleccionada en el mapa,
   * adaptándose a los 4 grandes imperios, todas las facciones y los 3 juegos (Online, Echoes, Galaxy Conquest).
   */
  async deploySentinelToRegion(regionId, targetSystemName = null) {
    const reg = NEW_EDEN_REGIONS.find((r) => r.id === regionId) || NEW_EDEN_REGIONS[0];
    this.activeRegionId = reg.id;

    const chosenSystem = targetSystemName
      ? reg.systems.find((s) => s.name.toLowerCase() === targetSystemName.toLowerCase()) || reg.systems[0]
      : reg.systems[0];

    const sysName = chosenSystem.name;
    const secVal = chosenSystem.sec;

    // Generar incidente táctico hipercontextualizado para este entorno
    let incidentShip = "Caimán (Dreadnought)";
    let incidentCargo = ["Planos Militares", "Componentes Avanzados"];
    let incidentCorp = reg.factionName;
    let incidentVal = "1,850,000,000 ISK";
    let incidentValNum = 1850000000;
    let incidentText = "";

    if (reg.empire === "amarr" || reg.hostileFaction === "blood_raiders") {
      incidentShip = "Bhaalgorn (Acorazado Pirata Blood Raider)";
      incidentCargo = ["Cápsulas Criogénicas de Sangre", "Nosferatu Militar"];
      incidentCorp = "Blood Raiders Covenant";
      incidentVal = "2,350,000,000 ISK";
      incidentValNum = 2350000000;
      incidentText = `Asalto de secta pirata Blood Raider sobre convoy de la Armada Imperial en ${sysName}. Drenaje de energía Nosferatu e intento de profanación de clérigos.`;
    } else if (reg.empire === "minmatar" || reg.hostileFaction === "angel_cartel") {
      incidentShip = "Machariel (Acorazado de Asalto Angel Cartel)";
      incidentCargo = ["Hiperpropulsores MWD Ilegales", "Crash Booster Concentrado"];
      incidentCorp = "Angel Cartel / Dominations";
      incidentVal = "2,100,000,000 ISK";
      incidentValNum = 2100000000;
      incidentText = `Crucero del Angel Cartel interceptado a 5,400 m/s en corredor de asteroides de ${sysName}. Transporte clandestino de armamento hacia grupos insurgentes.`;
    } else if (reg.empire === "caldari" || reg.hostileFaction === "guristas") {
      incidentShip = "Gila (Crucero de Asalto Pirata Guristas)";
      incidentCargo = ["Superdrones Gecko", "Planos de Circuitería Kaalakiota"];
      incidentCorp = "Guristas Production";
      incidentVal = "1,420,000,000 ISK";
      incidentValNum = 1420000000;
      incidentText = `Fuga de prototipos de microelectrónica y superdrones Gecko desviados desde factorías de ${sysName} hacia territorio anárquico de Venal.`;
    } else if (reg.id === "pochven" || reg.faction === "triglavian") {
      incidentShip = "Drekavac (Crucero de Batalla Triglaviano)";
      incidentCargo = ["Transmutador Liminal de Entropía", "Mutaplasmids"];
      incidentCorp = "Triglavian Collective";
      incidentVal = "3,950,000,000 ISK";
      incidentValNum = 3950000000;
      incidentText = `Despliegue de rayo extractor entálpico Triglaviano en ${sysName}. Espacio distorsionado sin presencia ni respuesta de CONCORD.`;
    } else if (reg.empire === "gallente" || reg.hostileFaction === "serpentis") {
      incidentShip = "Vindicator (Acorazado de Asalto Serpentis)";
      incidentCargo = ["Exile Booster Concentrado", "Matriz Neural Ilícita"];
      incidentCorp = "Serpentis Biogenics";
      incidentVal = "2,680,000,000 ISK";
      incidentValNum = 2680000000;
      incidentText = `Laboratorio móvil de narcóticos sintéticos detectado en ${sysName}. Lavado de activos vinculado a testaferros de la Federación.`;
    } else {
      incidentShip = "Komodo (Titán Anárquico)";
      incidentCargo = ["Superdrones Gecko", "Planos Militares Clasificados"];
      incidentCorp = reg.factionName;
      incidentVal = "8,400,000,000 ISK";
      incidentValNum = 8400000000;
      incidentText = `Avistamiento de flota de conquista soberana en el cuadrante de ${sysName} [${secVal}]. Soberanía anárquica sin fiscalización de CONCORD.`;
    }

    const sevScore = secVal < 0.1 || incidentValNum > 2000000000 ? "OMEGA" : (secVal < 0.5 ? "BETA" : "ALPHA");
    const ggciScore = Math.min(99, 60 + Math.floor(incidentValNum / 250000000) + (secVal >= 0.5 ? 15 : 0));

    const newIncident = {
      id: `sentinel-${reg.id}-${Date.now().toString(36)}`,
      source: this.activeGameMode,
      time: "PATRULLA EN VIVO",
      timestamp: new Date().toISOString(),
      system: sysName,
      region: reg.name,
      sec: secVal,
      ship: incidentShip,
      corp: incidentCorp,
      faction: reg.empireName,
      severity: sevScore,
      ggci: ggciScore,
      cargo: incidentCargo,
      text: incidentText,
      val: incidentVal,
      valNum: incidentValNum
    };

    // Agregar al pool de incidentes del Pod
    if (this.widget?.incidents) {
      this.widget.incidents.unshift(newIncident);
      if (this.widget.incidents.length > 60) this.widget.incidents.pop();
    }

    // Resolver caso con la cascada táctica del Sentinela
    this.selectedCaseId = newIncident.id;
    const resolution = await this.resolvePodCase(newIncident);

    // Actualizar Banner TV
    this.renderBannerSentinelBadge(resolution);

    const headlineEl = document.getElementById("tv-headline-content");
    if (headlineEl) {
      headlineEl.innerHTML = `
        <span class="tv-alert-tag">[PATRULLA AEGIS-9 // ${reg.name.toUpperCase()}]</span>
        <span class="tv-highlight">${sysName}</span> [${secVal} Sec · ${reg.concordPresence} CONCORD]:
        ${incidentText} 
        <span style="color: #00F5D4; font-weight: 700;">(FALLBACK T${resolution.activeFallbackTier})</span>
      `;
    }

    if (this.widget?.audioEnabled) {
      this.widget.playTone(sevScore === "OMEGA" ? "omega" : "ping");
    }

    // Re-renderizar Vistas
    this.renderSentinelTabPane();
    if (this.widget?.renderCurrentTab) this.widget.renderCurrentTab();
    if (this.widget?.updatePodMetricsUI) this.widget.updatePodMetricsUI();

    return resolution;
  }

  setGameMode(gameMode) {
    this.activeGameMode = gameMode;
    this.renderSentinelTabPane();
  }

  async selectCaseAndInspect(caseId) {
    this.selectedCaseId = caseId;
    const allIncidents = this.widget?.incidents || [];
    const targetInc = allIncidents.find((i) => i.id === caseId);
    if (targetInc) {
      const res = await this.resolvePodCase(targetInc);
      this.renderBannerSentinelBadge(res);
    }
    this.renderSentinelTabPane();
  }

  async setStrategyOption(optionKey) {
    this.selectedStrategyOption = optionKey;
    const allIncidents = this.widget?.incidents || [];
    const targetInc = allIncidents.find((i) => i.id === this.selectedCaseId) || allIncidents[0];
    if (targetInc) {
      const res = await this.resolvePodCase(targetInc);
      this.renderBannerSentinelBadge(res);
    }
    if (this.widget?.audioEnabled) this.widget.playTone("ping");
    this.renderSentinelTabPane();
  }

  async toggleSimulatedTierFailure(tierNumber) {
    if (this.simulatedFailureTiers.has(tierNumber)) {
      this.simulatedFailureTiers.delete(tierNumber);
    } else {
      this.simulatedFailureTiers.add(tierNumber);
    }
    const allIncidents = this.widget?.incidents || [];
    const targetInc = allIncidents.find((i) => i.id === this.selectedCaseId) || allIncidents[0];
    if (targetInc) {
      const res = await this.resolvePodCase(targetInc);
      this.renderBannerSentinelBadge(res);
    }
    if (this.widget?.audioEnabled) this.widget.playTone("omega");
    this.renderSentinelTabPane();
  }

  // ==========================================================================
  // 6. RENDERIZADO DE LA PESTAÑA "🛡️ SENTINELA AEGIS-9 (EDR)" EN EL POD
  // ==========================================================================
  renderSentinelTabPane() {
    const container = document.getElementById("aegis9-sentinel-root");
    if (!container) return;

    const allIncidents = this.widget?.incidents || [];
    const currentRes =
      this.caseResolutions.get(this.selectedCaseId) ||
      this.caseResolutions.get("hist-07") ||
      Array.from(this.caseResolutions.values())[0];

    if (!currentRes) {
      container.innerHTML = `<div style="padding: 24px; color: #B1E8F2;">Inicializando Dron Sentinela Aegis-9...</div>`;
      return;
    }

    const inc = currentRes.incident;
    const esi = currentRes.esiMetrics;
    const currentRegion = NEW_EDEN_REGIONS.find((r) => r.name.toLowerCase() === (inc.region || "").toLowerCase() || r.id === this.activeRegionId) || NEW_EDEN_REGIONS[0];
    const empireMeta = EMPIRES_METADATA[currentRegion.empire] || EMPIRES_METADATA["gallente"];

    const esiStatusBadge =
      this.esiState.status === "ONLINE"
        ? `<span class="sentinel-status-pill pill-online">● API EVE ESI: ONLINE (${this.esiState.playersOnline.toLocaleString()} PILOTOS EN TRANQUILITY)</span>`
        : `<span class="sentinel-status-pill pill-fallback">● API EVE ESI: MODO FALLBACK RESILIENTE (${this.esiState.status})</span>`;

    const bridgeStatusBadge =
      this.nativeBridgeState.status === "CONNECTED_NATIVE_SWIFT6"
        ? `<span class="sentinel-status-pill pill-online">● BINARIO SWIFT 6 (bin/Aegis9CyberbrainEDR :9909): CONECTADO</span>`
        : `<span class="sentinel-status-pill pill-cyan">● MOTOR CRIPTOGRÁFICO: WEBCRYPTO SHA-256 + FALLBACK LOCAL (bin/Aegis9CyberbrainEDR INTEGRADO)</span>`;

    container.innerHTML = `
      <div class="sentinel-workspace">
        <!-- Barra Superior de Estado y Telemetría -->
        <div class="sentinel-top-bar">
          <div class="sentinel-top-title">
            <span style="color: #00F5D4; font-weight: 800; letter-spacing: 0.08em;">🛡️ AEGIS-9: CYBERBRAIN EDR // DRON SENTINELA VERSÁTIL MULTI-REGIÓN</span>
            <span style="font-size: 0.72rem; color: #B1E8F2;">Monitoreo activo de los 4 Grandes Imperios, todas las facciones y los 3 Clústeres (EVE Online, Echoes, Galaxy Conquest)</span>
          </div>
          <div class="sentinel-connectors-row">
            ${esiStatusBadge}
            ${bridgeStatusBadge}
            <button class="pod-subpoena-trigger" onclick="window.concordWidget.sentinelDrone.syncOfficialEveESIWithFallback().then(() => window.concordWidget.sentinelDrone.renderSentinelTabPane())">
              ↻ RE-SINCRONIZAR ESI / BRIDGE
            </button>
            <button class="pod-subpoena-trigger sentinel-map-jump-btn" onclick="window.concordWidget.switchTab('map')">
              🗺️ ABRIR MAPA GALÁCTICO COMPLETO 360°
            </button>
          </div>
        </div>

        <div class="sentinel-main-grid">
          <!-- Columna Izquierda: Casos & Selector Rápido de Región -->
          <div class="sentinel-cases-col">
            <!-- Despliegue Rápido a los 4 Grandes Imperios -->
            <div class="sentinel-section-card" style="margin-bottom: 12px; padding: 10px;">
              <div style="font-size: 0.72rem; font-weight: 800; color: #57C4DD; margin-bottom: 6px; display: flex; justify-content: space-between;">
                <span>DESPLEGAR SENTINELA A IMPERIO / REGIÓN</span>
                <span style="color: #00F5D4;">🗺️ 4 IMPERIOS</span>
              </div>
              <div class="sentinel-empire-quick-grid">
                <button class="sentinel-quick-chip chip-gallente" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('essence', 'Villore')">
                  🏛️ Gallente (Essence)
                </button>
                <button class="sentinel-quick-chip chip-caldari" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('the_forge', 'Jita')">
                  🏢 Caldari (Jita 4-4)
                </button>
                <button class="sentinel-quick-chip chip-amarr" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('domain', 'Amarr Prime')">
                  👑 Amarr (Domain)
                </button>
                <button class="sentinel-quick-chip chip-minmatar" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('metropolis', 'Hek')">
                  ⚙️ Minmatar (Hek)
                </button>
                <button class="sentinel-quick-chip chip-pirate" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('venal', '6NJ8-V')">
                  ☠️ Guristas (Venal)
                </button>
                <button class="sentinel-quick-chip chip-blood" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('delve', '1-SMEB')">
                  🩸 Blood Raiders (Delve)
                </button>
                <button class="sentinel-quick-chip chip-angel" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('curse', 'G-0Q86')">
                  ⚡ Angel Cartel (Curse)
                </button>
                <button class="sentinel-quick-chip chip-triglavian" onclick="window.concordWidget.sentinelDrone.deploySentinelToRegion('pochven', 'Raravoss')">
                  🔺 Pochven (Triglavian)
                </button>
              </div>
            </div>

            <div class="pod-col-header">
              <span>CASOS REPORTADOS POR EL POD (${allIncidents.length})</span>
              <span style="color: #00F5D4;">DOM + ESI</span>
            </div>
            <div class="sentinel-cases-list">
              ${allIncidents.slice(0, 14).map((item) => {
                const res = this.caseResolutions.get(item.id);
                const isSelected = item.id === currentRes.caseId;
                const tierNum = res ? res.activeFallbackTier : (item.sec < 0.5 ? 2 : 1);
                const secColor = item.sec >= 0.5 ? "#57C4DD" : (item.sec >= 0.1 ? "#E5A93C" : "#EA428B");
                return `
                  <div class="sentinel-case-item ${isSelected ? "active" : ""}" onclick="window.concordWidget.sentinelDrone.selectCaseAndInspect('${item.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="color: ${secColor}; font-size: 0.8rem;">${item.system} [${item.sec}]</strong>
                      <span class="pod-badge ${item.severity === "OMEGA" ? "pod-badge-omega" : "pod-badge-beta"}">${item.severity} · GGCI ${item.ggci}%</span>
                    </div>
                    <div style="font-size: 0.72rem; color: #F1F1F1; margin-top: 4px; line-height: 1.3;">
                      ${item.text}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 0.68rem;">
                      <span style="color: #57C4DD; font-weight: 700;">${item.val}</span>
                      <span style="color: #00F5D4; background: rgba(0,245,212,0.12); border: 1px solid rgba(0,245,212,0.35); padding: 1px 6px; border-radius: 3px;">
                        ✓ RESUELTO (FALLBACK T${tierNum})
                      </span>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Columna Derecha: Diagnóstico Forense y Táctico -->
          <div class="sentinel-detail-col">
            <!-- 1. Visor Regional del Dron Sentinela -->
            <div class="sentinel-region-status-card">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="sentinel-beacon-dot"></span>
                  <strong style="color: #00F5D4; font-size: 0.88rem;">📍 PATRULLA SENTINELA EN: ${currentRegion.name.toUpperCase()} // SISTEMA ${inc.system.toUpperCase()}</strong>
                </div>
                <div style="display: flex; gap: 6px;">
                  <span class="pod-badge" style="background: rgba(87,196,221,0.2); color: ${empireMeta.color}; border: 1px solid ${empireMeta.color};">
                    ${empireMeta.icon} ${currentRegion.empireName}
                  </span>
                  <span class="pod-badge" style="background: rgba(229,169,60,0.2); color: #E5A93C; border: 1px solid #E5A93C;">
                    CONCORD: ${currentRegion.concordPresence} (${currentRegion.concordResponse})
                  </span>
                </div>
              </div>
              <div style="font-size: 0.73rem; color: #B1E8F2; margin-top: 6px;">
                <strong>Diagnóstico de Entorno:</strong> ${currentRegion.description} — <strong>Facción Local:</strong> ${currentRegion.factionName} vs <strong>Amenaza Hostil:</strong> <span style="color: #EA428B;">${currentRegion.hostileFactionName}</span>.
              </div>
            </div>

            <!-- 2. Cabecera Forense del Caso Seleccionado -->
            <div class="sentinel-case-banner">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span class="pod-badge ${inc.severity === "OMEGA" ? "pod-badge-omega" : "pod-badge-beta"}">${inc.severity} · GGCI ${inc.ggci}%</span>
                  <h3 style="margin: 0; color: #F1F1F1; font-size: 1.05rem;">
                    SISTEMA ${inc.system.toUpperCase()} (${inc.region || "Frontera"}) // SEGURIDAD: ${inc.sec}
                  </h3>
                  <span style="color: #57C4DD; font-weight: 700; font-size: 0.9rem;">(${inc.val})</span>
                </div>
                <p style="margin: 6px 0 0 0; font-size: 0.8rem; color: #B1E8F2; line-height: 1.4;">
                  <strong>Reporte del Pod:</strong> "${inc.text}" — <strong>Nave:</strong> ${inc.ship || "No identificada"} · <strong>Entidad:</strong> ${inc.corp || "Desconocida"} · <strong>Carga:</strong> ${(inc.cargo || []).join(", ") || "N/A"}
                </p>
              </div>
              <div class="sentinel-esi-mini-box">
                <div style="font-size: 0.64rem; color: #57C4DD; font-weight: 700;">TELEMETRÍA OFICIAL EVE ESI (${esi.source})</div>
                <div style="font-size: 0.74rem; color: #F1F1F1; margin-top: 3px;">
                  ID Sistema: <strong>${esi.systemId}</strong> · Saltos (1h): <strong>${esi.shipJumps}</strong>
                </div>
                <div style="font-size: 0.72rem; color: #EA428B;">
                  Bajas Naves: <strong>${esi.shipKills}</strong> · Pods: <strong>${esi.podKills}</strong> · Piratas NPC: <strong>${esi.npcKills}</strong>
                </div>
              </div>
            </div>

            <!-- 3. Mapeo MITRE ATT&CK de Aegis-9 -->
            <div class="sentinel-section-card">
              <div class="sentinel-section-title">
                <span>1. TRADUCCIÓN TÁCTICA EVE DED → MATRIZ MITRE ATT&CK (AEGIS-9 CYBERBRAIN EDR)</span>
                <span style="color: #00F5D4;">${currentRes.mitreMappings.length} VECTORES ACTIVADOS</span>
              </div>
              <div class="sentinel-mitre-chips">
                ${currentRes.mitreMappings.map((m) => `
                  <div class="sentinel-mitre-chip">
                    <div style="display: flex; justify-content: space-between; gap: 6px;">
                      <strong style="color: #00F5D4;">[${m.code}] ${m.name}</strong>
                      <span style="font-size: 0.65rem; color: #57C4DD;">${m.subsystem}</span>
                    </div>
                    <div style="font-size: 0.7rem; color: #B1E8F2; margin-top: 3px;">${m.reason}</div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- 4. Selector de Opciones de Solución Táctica -->
            <div class="sentinel-section-card">
              <div class="sentinel-section-title">
                <span>2. OPCIONES DE SOLUCIÓN TÁCTICA DEL DRON SENTINELA (SELECCIONA ESTRATEGIA)</span>
                <button class="pod-chip-btn ${this.selectedStrategyOption === "auto" ? "active" : ""}" onclick="window.concordWidget.sentinelDrone.setStrategyOption('auto')">
                  MODO AUTOMÁTICO IA (${this.selectedStrategyOption === "auto" ? "ACTIVO" : "ACTIVAR"})
                </button>
              </div>
              <div class="sentinel-options-grid">
                ${Object.values(currentRes.solutionOptions).map((opt) => {
                  const isChosen = currentRes.chosenSolution.id === opt.id;
                  return `
                    <div class="sentinel-option-card ${isChosen ? "chosen" : ""}" onclick="window.concordWidget.sentinelDrone.setStrategyOption('${opt.id}')">
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="sentinel-opt-badge">${opt.badge}</span>
                        ${isChosen ? `<span style="color: #00F5D4; font-size: 0.68rem; font-weight: 800;">● SOLUCIÓN APLICADA</span>` : `<span style="color: #B1E8F2; font-size: 0.65rem;">APLICAR →</span>`}
                      </div>
                      <div style="font-weight: 700; color: #F1F1F1; font-size: 0.76rem; margin-top: 5px;">${opt.title}</div>
                      <div style="font-size: 0.7rem; color: #B1E8F2; margin-top: 4px; line-height: 1.35;">${opt.summary}</div>
                      <div style="font-family: monospace; font-size: 0.66rem; color: #57C4DD; margin-top: 6px; padding-top: 4px; border-top: 1px dashed rgba(87,196,221,0.2);">
                        &gt; ${opt.technicalAction}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- 5. Escalera de 4 Fallbacks Resilientes -->
            <div class="sentinel-section-card">
              <div class="sentinel-section-title">
                <span>3. CADENA DE MÚLTIPLES FALLBACKS DEL SENTINELA (HAZ CLIC PARA SIMULAR CAÍDA DE UN NIVEL)</span>
                <span style="color: #E5A93C;">NIVEL ACTIVO: TIER ${currentRes.activeFallbackTier}</span>
              </div>
              <div class="sentinel-fallback-ladder">
                ${currentRes.fallbackChain.map((fb) => {
                  const isForcedFail = this.simulatedFailureTiers.has(fb.tier);
                  const stateClass =
                    fb.state === "ACTIVE_EXECUTED"
                      ? "fb-active"
                      : fb.state === "BYPASSED_FAILED"
                      ? "fb-failed"
                      : fb.state === "SEALED_ANCHOR"
                      ? "fb-sealed"
                      : "fb-standby";
                  const stateLabel =
                    fb.state === "ACTIVE_EXECUTED"
                      ? "✓ EJECUTADO CON ÉXITO"
                      : fb.state === "BYPASSED_FAILED"
                      ? "✕ OMITIDO / FALLBACK ACTIVADO"
                      : fb.state === "SEALED_ANCHOR"
                      ? "🔒 ANCLA INMUTABLE ACTIVA"
                      : "● EN RESERVA";

                  return `
                    <div class="sentinel-fallback-step ${stateClass}">
                      <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <div style="font-weight: 700; font-size: 0.76rem; color: #F1F1F1;">${fb.name}</div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span class="sentinel-fb-badge">${stateLabel}</span>
                          ${fb.tier <= 3 ? `
                            <button class="pod-subpoena-trigger" style="font-size: 0.62rem; padding: 2px 6px;" onclick="window.concordWidget.sentinelDrone.toggleSimulatedTierFailure(${fb.tier})">
                              ${isForcedFail ? "RESTAURAR NIVEL " + fb.tier : "SIMULAR FALLO T" + fb.tier}
                            </button>
                          ` : ""}
                        </div>
                      </div>
                      <div style="font-size: 0.72rem; color: #B1E8F2; margin-top: 4px;">${fb.detail}</div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- 6. Sello Criptográfico en ImmutableMemoryLedger -->
            <div class="sentinel-ledger-footer">
              <div>
                <span style="color: #00F5D4; font-weight: 700;">BLOQUE LEDGER #000${currentRes.ledgerBlockIndex} SELLADO (T1070)</span> ·
                <span style="font-family: monospace; color: #B1E8F2;">SHA-256: ${currentRes.ledgerBlockHash.slice(0, 36)}...</span>
              </div>
              <button class="pod-subpoena-trigger" onclick="window.concordWidget.openSubpoenaInspector('${inc.id}')">
                [ABRIR EXPEDIENTE Y CITACIÓN DED COMPLETA]
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
