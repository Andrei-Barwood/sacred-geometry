// ==========================================================================
// CONCORD DED // TV Broadcast Banner & Full Intelligence Pod Suite
// For Sacred Geometry Portal — Comprehensive Implementation
// ==========================================================================

// Initial Historical Archive of Activity Monitor Updates
const HISTORICAL_ARCHIVE = [
  {
    id: "hist-01",
    source: "eve_online",
    time: "HACE 14m",
    timestamp: "2026-10-17T15:10:00Z",
    system: "Villore",
    region: "Essence",
    sec: 0.8,
    ship: "Rattlesnake",
    corp: "Federal Intelligence Office (Black Eagles)",
    faction: "Gallente Federation",
    severity: "BETA",
    ggci: 76,
    cargo: ["Worm Blueprint", "Exile Booster"],
    text: "Fondos reservados del Senado Federal desviados hacia intermediarios de Venal.",
    val: "480,000,000 ISK",
    valNum: 480000000
  },
  {
    id: "hist-02",
    source: "galaxy_conquest",
    time: "HACE 38m",
    timestamp: "2026-10-17T14:46:00Z",
    system: "H-PA29",
    region: "Venal",
    sec: -0.2,
    ship: "Caiman (Dreadnought)",
    corp: "Guristas Production",
    faction: "Guristas Pirates",
    severity: "OMEGA",
    ggci: 94,
    cargo: ["Gecko (Guristas Heavy Drone)", "Rattlesnake Blueprint"],
    text: "Transporte encubierto neutralizado con planos militares de Gila y componentes de salto.",
    val: "1,850,000,000 ISK",
    valNum: 1850000000
  },
  {
    id: "hist-03",
    source: "eve_online",
    time: "HACE 1h",
    timestamp: "2026-10-17T14:24:00Z",
    system: "Tama",
    region: "The Citadel",
    sec: 0.3,
    ship: "Gila",
    corp: "Roden Vanguard Assets",
    faction: "Gallente Federation",
    severity: "BETA",
    ggci: 68,
    cargo: ["Drop Booster", "Genetically Enhanced Livestock"],
    text: "Escaramuza fronteriza con mercenarios Gallente operando bajo bandera de conveniencia pirata.",
    val: "920,000,000 ISK",
    valNum: 920000000
  },
  {
    id: "hist-04",
    source: "eve_echoes",
    time: "HACE 2h",
    timestamp: "2026-10-17T13:24:00Z",
    system: "Nourvukaiken",
    region: "Lonetrek",
    sec: 0.6,
    ship: "Worm",
    corp: "Creodron Echoes Division",
    faction: "Gallente Federation",
    severity: "BETA",
    ggci: 74,
    cargo: ["Drop Booster (140 unidades)", "Crash Booster"],
    text: "Decomiso aduanero de cargamento con estimulantes neuronales prohibidos por CONCORD.",
    val: "310,000,000 ISK",
    valNum: 310000000
  },
  {
    id: "hist-05",
    source: "eve_market",
    time: "HACE 4h",
    timestamp: "2026-10-17T11:24:00Z",
    system: "Dodixie",
    region: "Sinq Laison",
    sec: 0.9,
    ship: "Rattlesnake",
    corp: "Bolsa Comercial de Dodixie",
    faction: "Gallente Federation",
    severity: "OMEGA",
    ggci: 91,
    cargo: ["Licitación de 12x Cascos Rattlesnake"],
    text: "Licitación clandestina detectada en libro de órdenes ESI por cascos de asalto Guristas.",
    val: "2,400,000,000 ISK",
    valNum: 2400000000
  },
  {
    id: "hist-06",
    source: "eve_online",
    time: "HACE 6h",
    timestamp: "2026-10-17T09:24:00Z",
    system: "Nennamaila",
    region: "Black Rise",
    sec: 0.4,
    ship: "Tayra",
    corp: "Duvolle Laboratories",
    faction: "Gallente Federation",
    severity: "ALPHA",
    ggci: 52,
    cargo: ["Componentes de Drones Avanzados"],
    text: "Tránsito de convoy logístico de Duvolle Laboratories en espacio disputado de facciones.",
    val: "160,000,000 ISK",
    valNum: 160000000
  },
  {
    id: "hist-07",
    source: "galaxy_conquest",
    time: "HACE 8h",
    timestamp: "2026-10-17T07:24:00Z",
    system: "Y-4CFK",
    region: "Venal",
    sec: -0.5,
    ship: "Komodo (Titan)",
    corp: "Guristas Production",
    faction: "Guristas Pirates",
    severity: "OMEGA",
    ggci: 98,
    cargo: ["Planos de Clonación Ilegal", "Slaves", "Gecko Super-Drones"],
    text: "Espacio no regulado sin oficinas CONCORD ni presencia de margen de 3s o 19s. Complejo industrial clandestino de Korako 'The Rabbit' Kosakami.",
    val: "8,900,000,000 ISK",
    valNum: 8900000000
  },
  {
    id: "hist-08",
    source: "eve_online",
    time: "HACE 10h",
    timestamp: "2026-10-17T05:24:00Z",
    system: "Ostingele",
    region: "Placid",
    sec: 0.2,
    ship: "Whiptail",
    corp: "Federal Intelligence Office",
    faction: "Gallente Federation",
    severity: "BETA",
    ggci: 69,
    cargo: ["Exile Booster", "Transmisores Clandestinos"],
    text: "Sector de baja seguridad (0.2). CONCORD no mantiene patrullas de persecución activa, permitiendo el trasvase de estimulantes hacia intermediarios piratas.",
    val: "740,000,000 ISK",
    valNum: 740000000
  },
  {
    id: "hist-09",
    source: "eve_market",
    time: "HACE 12h",
    timestamp: "2026-10-17T03:24:00Z",
    system: "Caille",
    region: "Essence",
    sec: 0.9,
    ship: "Megathron",
    corp: "Roden Shipyards",
    faction: "Gallente Federation",
    severity: "ALPHA",
    ggci: 46,
    cargo: ["Drones de Asalto Civil", "Quafe Ultra"],
    text: "Alta seguridad federal con tiempo de respuesta de CONCORD garantizado en 6 segundos. Se detectaron transacciones no declaradas en el Senado.",
    val: "1,250,000,000 ISK",
    valNum: 1250000000
  }
];

// Live Breaking Alert shown during first 5 seconds
const BREAKING_LIVE_ALERT = {
  tag: "ÚLTIMA HORA // ALERTA OMEGA",
  system: "Dodixie (Sinq Laison)",
  text: "Intercepción de cargamento masivo de drones Guristas y estimulantes neuronales. Transferencia clandestina vinculada a filiales de Creodron. GGCI: 94% (Flagrante)."
};

// Procedural Market Orders for ESI Tab
const MARKET_AUDIT_DATA = [
  {
    hub: "Dodixie (Gallente)",
    item: "Gila (Crucero Pirata)",
    type: "Compra (Buy Order)",
    vol: "24 unidades",
    price: "348,000,000 ISK",
    total: "8.35 B ISK",
    status: "SOSPECHOSO // DESVÍO DE FLOTA"
  },
  {
    hub: "Dodixie (Gallente)",
    item: "Gecko (Super-Dron)",
    type: "Compra (Buy Order)",
    vol: "150 unidades",
    price: "185,000,000 ISK",
    total: "27.75 B ISK",
    status: "CRÍTICO // MONOPOLIO NEGRO"
  },
  {
    hub: "Villore (Senado)",
    item: "Drop Booster (Combat Narcotic)",
    type: "Venta (Sell Order)",
    vol: "500 dosis",
    price: "38,500,000 ISK",
    total: "19.25 B ISK",
    status: "ALERTA // CONSUMO OLIGÁRQUICO"
  },
  {
    hub: "Jita 4-4 (Caldari)",
    item: "Rattlesnake (Acorazado)",
    type: "Venta (Sell Order)",
    vol: "8 unidades",
    price: "1,150,000,000 ISK",
    total: "9.20 B ISK",
    status: "MONITOR // TRÁFICO FRONTERIZO"
  }
];

class ConcordWidgetSuite {
  constructor() {
    this.historyIndex = 0;
    this.isHistoryMode = false;
    this.audioEnabled = false;
    this.audioCtx = null;
    this.currentMode = 'concord'; // 'concord', 'scope', 'guristas'
    this.activeTab = 'general';   // 'general', 'telemetry', 'radar', 'wires', 'history', 'market'
    this.currentSourceFilter = 'all';
    this.currentSecurityFilter = 'all'; // 'all', 'high', 'low', 'null'
    this.timer = null;
    this.liveStreamTimer = null;
    this.radar = null;

    // In-memory incidents pool
    this.incidents = [...HISTORICAL_ARCHIVE];
    const totalIsk = HISTORICAL_ARCHIVE.reduce((acc, h) => acc + (h.valNum || 0), 0);
    const omegaCount = HISTORICAL_ARCHIVE.filter(h => h.severity === 'OMEGA').length;
    const ggciSum = HISTORICAL_ARCHIVE.reduce((acc, h) => acc + (h.ggci || 50), 0);
    this.metrics = {
      totalIsk: totalIsk,
      omegaCount: omegaCount,
      totalCount: HISTORICAL_ARCHIVE.length,
      ggciSum: ggciSum
    };

    this.init();
  }

  init() {
    this.renderTVBanner();
    this.setupTVTimeline();
    this.setupAudio();
    this.setupModalTrigger();
    this.startBackgroundStream();
  }

  // ========================================================================
  // 1. TV Broadcast Banner (Home Page Integration)
  // ========================================================================
  renderTVBanner() {
    const pill = document.getElementById('tv-status-pill');
    const badgeText = document.getElementById('tv-badge-mode');
    const content = document.getElementById('tv-headline-content');

    if (pill && badgeText && content) {
      pill.className = "tv-badge tv-badge--live";
      badgeText.innerText = "EN VIVO";
      content.innerHTML = `<span class="tv-alert-tag">[${BREAKING_LIVE_ALERT.tag}]</span> <span class="tv-highlight">${BREAKING_LIVE_ALERT.system}:</span> ${BREAKING_LIVE_ALERT.text}`;
    }
  }

  setupTVTimeline() {
    // 5 SECONDS EXACT TIMELINE: Switches to past activity updates
    setTimeout(() => {
      this.switchToHistoryBanner();

      // Rotates past activity logs every 5 seconds
      this.timer = setInterval(() => {
        this.nextHistoricalUpdate();
      }, 5000);
    }, 5000);
  }

  switchToHistoryBanner() {
    this.isHistoryMode = true;
    const pill = document.getElementById('tv-status-pill');
    const badgeText = document.getElementById('tv-badge-mode');

    if (pill && badgeText) {
      pill.className = "tv-badge tv-badge--history";
      badgeText.innerText = "REGISTRO HISTÓRICO";
    }

    this.displayHistoricalUpdate(0);
  }

  nextHistoricalUpdate() {
    this.historyIndex = (this.historyIndex + 1) % HISTORICAL_ARCHIVE.length;
    this.displayHistoricalUpdate(this.historyIndex);
  }

  displayHistoricalUpdate(idx) {
    const content = document.getElementById('tv-headline-content');
    if (!content) return;

    const item = HISTORICAL_ARCHIVE[idx];
    content.classList.add('transitioning');

    setTimeout(() => {
      content.innerHTML = `
        <span class="tv-time-tag">[${item.time} // ARCHIVO DED]</span>
        <span class="tv-highlight">${item.system}</span> 
        <span style="color: #EA428B; font-weight: 600;">[${item.severity} · GGCI ${item.ggci}%]:</span> 
        ${item.text} 
        <span style="color: #57C4DD; opacity: 0.9;">(${item.val})</span>
      `;
      content.classList.remove('transitioning');

      if (this.audioEnabled) this.playTone('ping');
      if (this.radar) this.radar.ping(item.system, item.severity);
    }, 380);
  }

  // ========================================================================
  // 2. Audio Synthesizer (Web Audio API with 3 Sci-Fi Tones)
  // ========================================================================
  setupAudio() {
    const btn = document.getElementById('tv-audio-toggle');
    const icon = document.getElementById('tv-audio-icon');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleAudio();
        if (icon) icon.innerText = this.audioEnabled ? "🔊" : "🔇";
      });
    }
  }

  toggleAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.audioEnabled = !this.audioEnabled;

    const podAudioBtn = document.getElementById('pod-audio-btn');
    if (podAudioBtn) {
      podAudioBtn.innerHTML = this.audioEnabled 
        ? `<span class="pod-audio-long">[ 🔊 AUDIO: ACTIVO ]</span><span class="pod-audio-short">🔊 ON</span>`
        : `<span class="pod-audio-long">[ 🔇 AUDIO: OFF ]</span><span class="pod-audio-short">🔇 OFF</span>`;
    }

    if (this.audioEnabled) {
      this.playTone('ping');
    }
    return this.audioEnabled;
  }

  playTone(type) {
    if (!this.audioEnabled || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    if (type === 'omega') {
      // Urgent Dual-Tone Alarm for OMEGA alerts
      this._synthTone(550, now, 0.14, 'sawtooth', 0.12);
      this._synthTone(440, now + 0.15, 0.18, 'sawtooth', 0.12);
    } else if (type === 'casino' || this.currentMode === 'guristas') {
      // 8-bit retro casino chime for Rabbit's Den
      this._synthTone(987.77, now, 0.08, 'square', 0.08);
      this._synthTone(1318.51, now + 0.09, 0.16, 'square', 0.1);
    } else {
      // Tactical Sonar Ping
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    }
  }

  _synthTone(freq, start, dur, wave = 'sine', maxVol = 0.1) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(maxVol, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(start);
    osc.stop(start + dur);
  }

  // ========================================================================
  // 3. Background Simulated Stream Engine
  // ========================================================================
  startBackgroundStream() {
    const scenarios = [
      {
        source: "eve_online",
        system: "Dodixie",
        region: "Sinq Laison",
        sec: 0.9,
        ship: "Gila",
        corp: "Creodron R&D Outpost",
        faction: "Gallente Federation",
        cargo: ["Gecko (Guristas Heavy Drone)", "Drop Booster"],
        val: 940000000,
        text: "Desvío de componentes de drones interceptado en aduana de Dodixie. Tiempo de respuesta DED: 6s."
      },
      {
        source: "eve_market",
        system: "Villore",
        region: "Essence",
        sec: 0.8,
        ship: "Worm",
        corp: "Comisión Senatorial de Abastecimiento",
        faction: "Gallente Federation",
        cargo: ["Licitación de 30x Planos de Worm"],
        val: 520000000,
        text: "Orden de compra sin registrar canalizada por testaferros federales bajo amparo legal."
      },
      {
        source: "eve_online",
        system: "Caille",
        region: "Essence",
        sec: 0.9,
        ship: "Megathron",
        corp: "Roden Shipyards",
        faction: "Gallente Federation",
        cargo: ["Micro-drones de Vigilancia", "Quafe Ultra"],
        val: 1400000000,
        text: "Patrulla CONCORD interviene en 6 segundos ante intento de abordaje pirata en plaza central."
      },
      {
        source: "eve_echoes",
        system: "Nourvukaiken",
        region: "Lonetrek",
        sec: 0.6,
        ship: "Tayra",
        corp: "Creodron Echoes Division",
        faction: "Gallente Federation",
        cargo: ["Exile Booster", "Crash Booster"],
        val: 380000000,
        text: "Retención aduanera en espacio 0.6. CONCORD despacha unidades de intervención en 14 segundos."
      },
      {
        source: "galaxy_conquest",
        system: "Tama",
        region: "The Citadel",
        sec: 0.3,
        ship: "Komodo (Titan)",
        corp: "Federal Intelligence Office",
        faction: "Gallente Federation",
        cargo: ["Federation Starbase Fuel", "Crash Booster"],
        val: 14500000000,
        text: "Asalto a convoy logístico en baja seguridad (0.3). CONCORD no tiene patrullas activas."
      },
      {
        source: "eve_online",
        system: "Nennamaila",
        region: "Black Rise",
        sec: 0.4,
        ship: "Tayra",
        corp: "Duvolle Laboratories",
        faction: "Gallente Federation",
        cargo: ["Componentes de Drones Avanzados"],
        val: 680000000,
        text: "Escaramuza en sector disputado de baja seguridad (0.4) sin asistencia policial directa."
      },
      {
        source: "eve_echoes",
        system: "Ostingele",
        region: "Placid",
        sec: 0.2,
        ship: "Worm",
        corp: "Creodron Echoes Division",
        faction: "Gallente Federation",
        cargo: ["Crash Booster", "Drop Booster"],
        val: 450000000,
        text: "Transbordo en baja seguridad (0.2). Cañones de puerta neutralizados por hackers Guristas."
      },
      {
        source: "eve_echoes",
        system: "H-PA29",
        region: "Venal",
        sec: -0.2,
        ship: "Rattlesnake",
        corp: "Guristas Syndicate",
        faction: "Guristas Pirates",
        cargo: ["Slaves", "Exile Booster"],
        val: 2100000000,
        text: "Entrega de bienes suntuarios en el casino orbital de Venal. Zona sin oficinas ni cobertura DED."
      },
      {
        source: "galaxy_conquest",
        system: "Y-4CFK",
        region: "Venal",
        sec: -0.5,
        ship: "Caiman (Dreadnought)",
        corp: "Guristas Production",
        faction: "Guristas Pirates",
        cargo: ["Planos Militares", "Gecko Super-Drones"],
        val: 3800000000,
        text: "Despliegue clandestino en espacio Null-sec (-0.5). Sin presencia de CONCORD ni margen de respuesta."
      },
      {
        source: "eve_online",
        system: "6NJ8-V",
        region: "Venal",
        sec: -0.4,
        ship: "Loggerhead (Force Auxiliary)",
        corp: "Guristas Pirates",
        faction: "Guristas Pirates",
        cargo: ["Cápsulas Criogénicas", "Blueprint Rattlesnake"],
        val: 4900000000,
        text: "Base oculta de The Rabbit. Espacio anárquico fuera del tratado de fiscalización de CONCORD."
      }
    ];

    this.liveStreamTimer = setInterval(() => {
      const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
      const isOmega = sc.val > 1000000000 || sc.sec >= 0.8;
      const score = Math.min(99, 50 + Math.floor(sc.val / 200000000) + (sc.sec >= 0.5 ? 20 : 0));
      const sev = score >= 75 ? "OMEGA" : (score >= 45 ? "BETA" : "ALPHA");

      const newInc = {
        id: `inc-${Date.now().toString(36)}`,
        source: sc.source,
        time: "AHORA",
        timestamp: new Date().toISOString(),
        system: sc.system,
        region: sc.region,
        sec: sc.sec,
        ship: sc.ship,
        corp: sc.corp,
        faction: sc.faction,
        severity: sev,
        ggci: score,
        cargo: sc.cargo,
        text: sc.text,
        val: `${(sc.val / 1000000).toFixed(0)}M ISK`,
        valNum: sc.val
      };

      this.incidents.unshift(newInc);
      if (this.incidents.length > 50) this.incidents.pop();

      // Update metrics
      this.metrics.totalCount++;
      this.metrics.totalIsk += sc.val;
      if (sev === "OMEGA") this.metrics.omegaCount++;
      this.metrics.ggciSum += score;

      // Update active UI
      this.updatePodMetricsUI();
      this.renderCurrentTab();

      if (this.radar) this.radar.ping(sc.system, sev);
      if (this.audioEnabled) {
        sev === "OMEGA" ? this.playTone('omega') : this.playTone('ping');
      }
    }, 7000);
  }

  matchesFilters(inc) {
    if (this.currentSourceFilter !== 'all' && inc.source !== this.currentSourceFilter) {
      return false;
    }

    const sec = parseFloat(inc.sec);
    if (this.currentSecurityFilter === 'high') {
      // 1.0 hasta 0.4 (Jurisdicción CONCORD con respuesta rápida de 3s a 19s)
      return sec >= 0.4 && sec <= 1.0;
    } else if (this.currentSecurityFilter === 'low') {
      // 0.4 hasta 0.1 (Baja seguridad / Low-sec)
      return sec >= 0.1 && sec <= 0.4;
    } else if (this.currentSecurityFilter === 'null') {
      // Sistemas donde CONCORD no tiene oficinas o presencia de margen de 3s o 19s (Null-sec / Venal <= 0.0)
      return sec < 0.1;
    }

    return true;
  }

  updatePodMetricsUI() {
    const filtered = this.incidents.filter(inc => this.matchesFilters(inc));
    const count = filtered.length;
    const totalIsk = filtered.reduce((acc, i) => acc + (i.valNum || 0), 0);
    const omegaCount = filtered.filter(i => i.severity === 'OMEGA').length;
    const avgGgci = count > 0 
      ? (filtered.reduce((acc, i) => acc + (i.ggci || 50), 0) / count).toFixed(1) 
      : "0.0";
    const iskB = (totalIsk / 1000000000).toFixed(2);

    const ggciEl = document.getElementById('pod-metric-ggci');
    const ggciBar = document.getElementById('pod-ggci-bar');
    const iskEl = document.getElementById('pod-metric-isk');
    const omegaEl = document.getElementById('pod-metric-omega');
    const totalEl = document.getElementById('pod-metric-total');

    if (ggciEl) ggciEl.innerText = `${avgGgci}%`;
    if (ggciBar) ggciBar.style.width = `${Math.min(parseFloat(avgGgci), 100)}%`;
    if (iskEl) iskEl.innerText = `${iskB} B`;
    if (omegaEl) omegaEl.innerText = `${omegaCount} Flagrantes`;
    if (totalEl) totalEl.innerText = `${count} Registros`;
  }

  // ========================================================================
  // 4. Modal and Comprehensive Intelligence Pod UI
  // ========================================================================
  setupModalTrigger() {
    const btn = document.getElementById('tv-open-pod-btn');
    const banner = document.getElementById('concord-tv-banner');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openPodModal();
      });
    }

    if (banner) {
      banner.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          this.openPodModal();
        }
      });
    }
  }

  openPodModal() {
    let modal = document.getElementById('concord-pod-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'concord-pod-modal';
      modal.className = 'concord-pod-modal';
      document.body.appendChild(modal);

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closePodModal();
      });
    }

    modal.innerHTML = this.buildPodHTML();

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    this.updatePodMetricsUI();
    this.initRadar('pod-radar-canvas');
    setTimeout(() => this.radar?.resize?.(), 120);
    this.renderCurrentTab();
  }

  closePodModal() {
    const modal = document.getElementById('concord-pod-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  buildPodHTML() {
    return `
      <div class="concord-pod-window mode-${this.currentMode}" id="concord-pod-window">
        <!-- Top Header -->
        <header class="pod-header">
          <div class="pod-header-left">
            <div class="pod-led"></div>
            <div class="pod-title-block">
              <h2>CONCORD DED // CLASSIFIED WATCHDOG</h2>
              <p>FISCALIZACIÓN SUBESPACIAL // EJE GALLENTE-GURISTAS // OPERATION HYDRA-SCALE</p>
            </div>
          </div>

          <div class="pod-header-controls">
            <button id="pod-audio-btn" class="pod-mode-btn pod-audio-mode-btn" onclick="window.concordWidget.toggleAudio()">
              ${this.audioEnabled 
                ? `<span class="pod-audio-long">[ 🔊 AUDIO: ACTIVO ]</span><span class="pod-audio-short">🔊 ON</span>` 
                : `<span class="pod-audio-long">[ 🔇 AUDIO: OFF ]</span><span class="pod-audio-short">🔇 OFF</span>`}
            </button>

            <div class="pod-modes">
              <span class="pod-modes-label">VISOR:</span>
              <button class="pod-mode-btn active" id="btn-pod-concord" onclick="window.concordWidget.setPodMode('concord')"><span class="pod-mode-btn-long">[ CONCORD DED ]</span><span class="pod-mode-btn-short">DED</span></button>
              <button class="pod-mode-btn" id="btn-pod-scope" onclick="window.concordWidget.setPodMode('scope')"><span class="pod-mode-btn-long">[ THE SCOPE ]</span><span class="pod-mode-btn-short">SCOPE</span></button>
              <button class="pod-mode-btn" id="btn-pod-guristas" onclick="window.concordWidget.setPodMode('guristas')"><span class="pod-mode-btn-long">[ RABBIT'S DEN ]</span><span class="pod-mode-btn-short">RABBIT</span></button>
            </div>
          </div>

          <button class="pod-close-btn" onclick="window.concordWidget.closePodModal()" aria-label="Cerrar modal">[ ✕ CERRAR ]</button>
        </header>

        <!-- Metrics KPIs Bar -->
        <section class="pod-metrics-bar">
          <div class="pod-metric-box">
            <div class="pod-metric-label">ÍNDICE DE COLUSIÓN (GGCI)</div>
            <div class="pod-metric-val" id="pod-metric-ggci">78.4%</div>
            <div class="pod-progress-bar"><div class="pod-progress-fill" id="pod-ggci-bar" style="width: 78%;"></div></div>
          </div>
          <div class="pod-metric-box">
            <div class="pod-metric-label">TOTAL ISK DEFRAUDADO / EN DESVÍO</div>
            <div class="pod-metric-val" id="pod-metric-isk">6.12 B</div>
          </div>
          <div class="pod-metric-box">
            <div class="pod-metric-label">ALERTAS OMEGA (FLAGRANTES)</div>
            <div class="pod-metric-val accent" id="pod-metric-omega">2 Flagrantes</div>
          </div>
          <div class="pod-metric-box">
            <div class="pod-metric-label">INTERCEPCIONES EN VIVO</div>
            <div class="pod-metric-val" id="pod-metric-total">6 Registros</div>
          </div>
        </section>

        <!-- Navigation Tabs Bar -->
        <nav class="pod-tabs-bar">
          <button class="pod-tab-btn active" id="tab-btn-general" onclick="window.concordWidget.switchTab('general')">
            <span class="tab-icon">⊞</span> <span class="tab-label-full">VISTA GENERAL (3 COLUMNAS)</span><span class="tab-label-short">GENERAL</span>
          </button>
          <button class="pod-tab-btn" id="tab-btn-telemetry" onclick="window.concordWidget.switchTab('telemetry')">
            <span class="tab-icon">⚡</span> <span class="tab-label-full">TELEMETRÍA EN VIVO</span><span class="tab-label-short">TELEMETRÍA</span>
          </button>
          <button class="pod-tab-btn" id="tab-btn-radar" onclick="window.concordWidget.switchTab('radar')">
            <span class="tab-icon">⌖</span> <span class="tab-label-full">RADAR TÁCTICO 360°</span><span class="tab-label-short">RADAR</span>
          </button>
          <button class="pod-tab-btn" id="tab-btn-wires" onclick="window.concordWidget.switchTab('wires')">
            <span class="tab-icon">📡</span> <span class="tab-label-full">CABLES E INTELIGENCIA</span><span class="tab-label-short">CABLES</span>
          </button>
          <button class="pod-tab-btn" id="tab-btn-history" onclick="window.concordWidget.switchTab('history')">
            <span class="tab-icon">📜</span> <span class="tab-label-full">ARCHIVO HISTÓRICO</span><span class="tab-label-short">HISTORIAL</span>
          </button>
          <button class="pod-tab-btn" id="tab-btn-market" onclick="window.concordWidget.switchTab('market')">
            <span class="tab-icon">⚖</span> <span class="tab-label-full">MERCADO ESI (DODIXIE)</span><span class="tab-label-short">MERCADO</span>
          </button>
        </nav>

        <!-- Security Sector & Source Filter Bar -->
        <div class="pod-filter-bar">
          <!-- Row 1: Security Level Selector -->
          <div class="pod-filter-row">
            <div class="pod-filter-group pod-sec-filter-group">
              <span class="pod-filter-label">
                <span class="pod-filter-label-full">ESTATUS DE SEGURIDAD (CONCORD):</span>
                <span class="pod-filter-label-short">SEGURIDAD:</span>
              </span>
              <button class="pod-chip-btn pod-sec-btn ${this.currentSecurityFilter === 'all' ? 'active' : ''}" id="sec-btn-all" onclick="window.concordWidget.filterSecurity('all')">
                TODAS LAS ÁREAS
              </button>
              <button class="pod-chip-btn pod-sec-btn sec-high ${this.currentSecurityFilter === 'high' ? 'active' : ''}" id="sec-btn-high" onclick="window.concordWidget.filterSecurity('high')" title="Sistemas con respuesta de CONCORD entre 3s y 19s">
                <span class="sec-dot sec-dot-high"></span>
                <span class="sec-label-full">1.0 a 0.4 // JURISDICCIÓN ACTIVA (3s - 19s)</span>
                <span class="sec-label-short">1.0 - 0.4 (HIGH)</span>
              </button>
              <button class="pod-chip-btn pod-sec-btn sec-low ${this.currentSecurityFilter === 'low' ? 'active' : ''}" id="sec-btn-low" onclick="window.concordWidget.filterSecurity('low')" title="Sistemas de baja seguridad sin escolta directa de CONCORD">
                <span class="sec-dot sec-dot-low"></span>
                <span class="sec-label-full">0.4 a 0.1 // BAJA SEGURIDAD (LOW-SEC)</span>
                <span class="sec-label-short">0.4 - 0.1 (LOW)</span>
              </button>
              <button class="pod-chip-btn pod-sec-btn sec-null ${this.currentSecurityFilter === 'null' ? 'active' : ''}" id="sec-btn-null" onclick="window.concordWidget.filterSecurity('null')" title="Sistemas donde CONCORD no tiene oficinas ni presencia de margen de 3s o 19s">
                <span class="sec-dot sec-dot-null"></span>
                <span class="sec-label-full">≤ 0.0 // SIN OFICINAS CONCORD (NULL-SEC / VENAL)</span>
                <span class="sec-label-short">≤ 0.0 (SIN CONCORD)</span>
              </button>
            </div>
          </div>

          <!-- Row 2: Signal Source Filter -->
          <div class="pod-filter-row">
            <div class="pod-filter-group pod-src-filter-group">
              <span class="pod-filter-label">
                <span class="pod-filter-label-full">ORIGEN DE SEÑAL:</span>
                <span class="pod-filter-label-short">ORIGEN:</span>
              </span>
              <button class="pod-chip-btn pod-src-btn ${this.currentSourceFilter === 'all' ? 'active' : ''}" id="src-btn-all" onclick="window.concordWidget.filterSource('all')">TODOS</button>
              <button class="pod-chip-btn pod-src-btn ${this.currentSourceFilter === 'eve_online' ? 'active' : ''}" id="src-btn-eve_online" onclick="window.concordWidget.filterSource('eve_online')">EVE ONLINE (ZKB)</button>
              <button class="pod-chip-btn pod-src-btn ${this.currentSourceFilter === 'eve_market' ? 'active' : ''}" id="src-btn-eve_market" onclick="window.concordWidget.filterSource('eve_market')">MERCADO ESI (DODIXIE)</button>
              <button class="pod-chip-btn pod-src-btn ${this.currentSourceFilter === 'eve_echoes' ? 'active' : ''}" id="src-btn-eve_echoes" onclick="window.concordWidget.filterSource('eve_echoes')">EVE ECHOES (SUBRED)</button>
              <button class="pod-chip-btn pod-src-btn ${this.currentSourceFilter === 'galaxy_conquest' ? 'active' : ''}" id="src-btn-galaxy_conquest" onclick="window.concordWidget.filterSource('galaxy_conquest')">GALAXY CONQUEST (4X)</button>
            </div>
            <span class="pod-filter-status">RESPUESTA CONCORD: <strong id="pod-concord-eta">${this.getConcordEtaText()}</strong></span>
          </div>
        </div>

        <!-- Main View Container for Tab Panes -->
        <main class="pod-view-container">
          <!-- Pane 1: Overview 3-Columns -->
          <div class="pod-tab-pane active" id="pane-general">
            <div class="pod-body-grid">
              <!-- Col 1: Telemetry Waterfall -->
              <div class="pod-col">
                <div class="pod-col-header">
                  <span>TELEMETRÍA DE INCIDENTES EN TIEMPO REAL</span>
                  <span style="color: #57C4DD;">● LIVE FEED</span>
                </div>
                <div class="pod-col-scroll" id="overview-waterfall-feed"></div>
              </div>

              <!-- Col 2: Tactical Radar -->
              <div class="pod-col">
                <div class="pod-col-header">
                  <span>RADAR TÁCTICO // DISPERSIÓN DE SISTEMAS</span>
                  <span style="color: #57C4DD;">SUBESPACIO 360°</span>
                </div>
                <div class="pod-radar-wrapper">
                  <canvas id="pod-radar-canvas" class="pod-radar-canvas"></canvas>
                  <div class="pod-radar-stats">
                    <div class="pod-legend-item"><span class="pod-legend-dot dot-gallente"></span> Gallente (Dodixie/Villore)</div>
                    <div class="pod-legend-item"><span class="pod-legend-dot dot-border"></span> Frontera FW (Tama/Nourvukaiken)</div>
                    <div class="pod-legend-item"><span class="pod-legend-dot dot-guristas"></span> Venal HQ (H-PA29/Y-4CFK)</div>
                  </div>
                </div>
              </div>

              <!-- Col 3: Intelligence Wires -->
              <div class="pod-col">
                <div class="pod-col-header">
                  <span id="overview-wire-title">CABLES DED Y TRANSMISIONES</span>
                  <span>CANAL DECIFRADO</span>
                </div>
                <div class="pod-col-scroll" id="overview-wires-feed"></div>
              </div>
            </div>
          </div>

          <!-- Pane 2: Full Telemetry Table -->
          <div class="pod-tab-pane" id="pane-telemetry">
            <div class="pod-full-table-view">
              <h3 style="color: #57C4DD; margin: 0 0 8px 0; font-size: 1.1rem;">REGISTRO COMPLETO DE TELEMETRÍA (FEED EN VIVO)</h3>
              <div style="overflow-x: auto;">
                <table class="pod-table" id="full-telemetry-table">
                  <thead>
                    <tr>
                      <th>Severidad / GGCI</th>
                      <th>Fuente</th>
                      <th>Sistema Solar</th>
                      <th>Nave / Casco</th>
                      <th>Entidad Implicada</th>
                      <th>Carga Sospechosa</th>
                      <th>Valor ISK</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody id="telemetry-table-body"></tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pane 3: Tactical Radar Full View -->
          <div class="pod-tab-pane" id="pane-radar">
            <div class="pod-radar-wrapper" style="width: 100%; height: 100%; padding: 20px;">
              <h3 style="color: #57C4DD; margin: 0 0 10px 0;">MATRIZ DE DISPERSIÓN DE COLUSIÓN INTERESTELAR</h3>
              <canvas id="pod-radar-canvas-expanded" style="width: 100%; height: 420px; background: rgba(17,27,38,0.9); border: 1px solid #57C4DD; border-radius: 6px;"></canvas>
              <p style="font-size: 0.76rem; color: #B1E8F2; margin-top: 10px;">
                Los pulsos representan incidentes de contrabando, desvío de planos militares de Creodron y descargas ilegales de estimulantes neuronales en las fronteras de la Federación Gallente y el espacio de los Piratas Guristas.
              </p>
            </div>
          </div>

          <!-- Pane 4: Wires & Cables Feed -->
          <div class="pod-tab-pane" id="pane-wires">
            <div class="pod-full-table-view">
              <h3 style="color: #57C4DD; margin: 0 0 8px 0; font-size: 1.1rem;">TRANSMISIONES Y CABLES DE INTELIGENCIA CLASIFICADOS</h3>
              <div id="full-wires-container" style="display: flex; flex-direction: column; gap: 12px;"></div>
            </div>
          </div>

          <!-- Pane 5: Historical Archive -->
          <div class="pod-tab-pane" id="pane-history">
            <div class="pod-full-table-view">
              <h3 style="color: #57C4DD; margin: 0 0 8px 0; font-size: 1.1rem;">EXPEDIENTES HISTÓRICOS DE CORRUPCIÓN EN NEW EDEN</h3>
              <div style="overflow-x: auto;">
                <table class="pod-table">
                  <thead>
                    <tr>
                      <th>Registro</th>
                      <th>Sistema</th>
                      <th>Severidad</th>
                      <th>Incidente Documentado</th>
                      <th>Pérdida/Desvío</th>
                      <th>Expediente</th>
                    </tr>
                  </thead>
                  <tbody id="history-table-body">
                    ${this.buildHistoryTableRowsHTML()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pane 6: ESI Market Audit -->
          <div class="pod-tab-pane" id="pane-market">
            <div class="pod-market-grid">
              <div class="pod-market-box">
                <h3>AUDITORÍA DE COMPRAS EN PLAZA FEDERAL (DODIXIE) <span style="font-size: 0.72rem; color: #EA428B;">ALTO RIESGO</span></h3>
                <p style="font-size: 0.76rem; color: #B1E8F2;">
                  Monitoreo de órdenes de compra anómalas en Sinq Laison por cascos militares y drones no autorizados por la Armada Federal.
                </p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${MARKET_AUDIT_DATA.filter(m => m.hub.includes("Dodixie") || m.hub.includes("Villore")).map(m => `
                    <div style="background: rgba(16,28,47,0.8); border: 1px solid rgba(87,196,221,0.25); border-left: 3px solid #57C4DD; padding: 10px; border-radius: 4px;">
                      <div style="display: flex; justify-content: space-between; font-weight: 600; color: #57C4DD;">
                        <span>${m.item}</span>
                        <span style="color: #EA428B;">${m.total}</span>
                      </div>
                      <div style="font-size: 0.72rem; color: #B1E8F2; margin-top: 3px;">${m.type} · ${m.vol} @ ${m.price}</div>
                      <div style="font-size: 0.68rem; color: #EA428B; margin-top: 4px; font-weight: 700;">${m.status}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pod-market-box">
                <h3>CONTRASTE CON MEGACORPORACIONES CALDARI (JITA 4-4) <span style="font-size: 0.72rem; color: #57C4DD;">REFERENCIA SPOT</span></h3>
                <p style="font-size: 0.76rem; color: #B1E8F2;">
                  Rastreo de activos de contrabando salientes de The Forge con destino probable a rutas de evasión en Black Rise y Venal.
                </p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${MARKET_AUDIT_DATA.map(m => `
                    <div style="background: rgba(16,28,47,0.8); border: 1px solid rgba(87,196,221,0.25); border-left: 3px solid #E5A93C; padding: 10px; border-radius: 4px;">
                      <div style="display: flex; justify-content: space-between; font-weight: 600; color: #E5A93C;">
                        <span>${m.item} [${m.hub}]</span>
                        <span style="color: #F1F1F1;">${m.total}</span>
                      </div>
                      <div style="font-size: 0.72rem; color: #B1E8F2; margin-top: 3px;">${m.type} · ${m.vol} @ ${m.price}</div>
                      <div style="font-size: 0.68rem; color: #B1E8F2; margin-top: 4px;">${m.status}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Subpoena Inspector Modal Layer -->
        <div id="pod-subpoena-inspector" class="pod-subpoena-modal" style="display: none;">
          <div class="pod-subpoena-paper">
            <div class="pod-subpoena-header">
              <span style="font-weight: 700; color: #57C4DD; font-size: 0.85rem;">[ EXPEDIENTE JUDICIAL CONCORD DED // ORDEN DE INTERVENCIÓN ]</span>
              <button class="pod-close-btn" style="padding: 2px 8px;" onclick="window.concordWidget.closeSubpoenaInspector()">✕ CERRAR</button>
            </div>
            <pre class="pod-subpoena-content" id="pod-subpoena-body"></pre>
            <div class="pod-subpoena-footer">
              <button class="tv-btn tv-expand-btn" onclick="window.concordWidget.copyCurrentSubpoena()">COPIAR CITACIÓN AL PORTAPAPELES</button>
              <button class="tv-btn" onclick="window.concordWidget.printCurrentSubpoena()">IMPRIMIR / EXPORTAR</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================================
  // 5. Tabs and Filter Handlers
  // ========================================================================
  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.pod-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.pod-tab-pane').forEach(pane => pane.classList.remove('active'));

    const activeBtn = document.getElementById(`tab-btn-${tabName}`);
    const activePane = document.getElementById(`pane-${tabName}`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePane) activePane.classList.add('active');

    if (tabName === 'radar') {
      setTimeout(() => {
        this.initRadar('pod-radar-canvas-expanded');
        this.radar?.resize?.();
      }, 100);
    } else if (tabName === 'general') {
      setTimeout(() => {
        this.initRadar('pod-radar-canvas');
        this.radar?.resize?.();
      }, 100);
    }

    this.renderCurrentTab();
  }

  filterSecurity(secTier) {
    this.currentSecurityFilter = secTier;
    document.querySelectorAll('.pod-sec-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`sec-btn-${secTier}`);
    if (btn) btn.classList.add('active');

    const etaEl = document.getElementById('pod-concord-eta');
    if (etaEl) {
      etaEl.innerHTML = this.getConcordEtaText();
    }

    this.playTone('ping');
    this.renderCurrentTab();
    this.updatePodMetricsUI();
    if (this.radar && this.radar.setSecurityFilter) {
      this.radar.setSecurityFilter(secTier);
    }
  }

  filterSource(source) {
    this.currentSourceFilter = source;
    document.querySelectorAll('.pod-src-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`src-btn-${source}`);
    if (btn) btn.classList.add('active');

    this.playTone('ping');
    this.renderCurrentTab();
    this.updatePodMetricsUI();
  }

  getConcordEtaText() {
    if (this.currentSecurityFilter === 'high') return '<span style="color: #57C4DD; font-weight: 700;">3s - 19s // ALTA PRIORIDAD DED</span>';
    if (this.currentSecurityFilter === 'low') return '<span style="color: #E5A93C; font-weight: 700;">SIN PATRULLAS (SÓLO CAÑONES DE SALTO)</span>';
    if (this.currentSecurityFilter === 'null') return '<span style="color: #EA428B; font-weight: 700;">NULA // SIN OFICINAS NI COBERTURA DED</span>';
    return '3s - 19s / VARIABLE';
  }

  setPodMode(mode) {
    this.currentMode = mode;
    const win = document.getElementById('concord-pod-window');
    if (win) {
      win.className = `concord-pod-window mode-${mode}`;
    }

    document.querySelectorAll('.pod-mode-btn').forEach(b => {
      if (!b.id.includes('audio')) b.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-pod-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    this.playTone(mode === 'guristas' ? 'casino' : 'ping');
    this.renderCurrentTab();
  }

  // ========================================================================
  // 6. View Renderers
  // ========================================================================
  renderCurrentTab() {
    const filtered = this.incidents.filter(inc => this.matchesFilters(inc));

    // 1. Overview Waterfall & Wires
    const waterfallEl = document.getElementById('overview-waterfall-feed');
    if (waterfallEl) {
      waterfallEl.innerHTML = filtered.length > 0
        ? filtered.slice(0, 15).map(inc => this.buildIncidentCardHTML(inc)).join('')
        : `<div style="padding: 24px; text-align: center; color: #B1E8F2; font-size: 0.8rem;">No hay incidentes registrados en este sector de seguridad.</div>`;
    }

    const wiresEl = document.getElementById('overview-wires-feed');
    const wireTitleEl = document.getElementById('overview-wire-title');
    if (wiresEl) {
      if (wireTitleEl) {
        if (this.currentMode === 'concord') wireTitleEl.innerText = "CABLES DE INTELIGENCIA CONCORD DED";
        if (this.currentMode === 'scope') wireTitleEl.innerText = "THE SCOPE // BOLETÍN FEDERAL";
        if (this.currentMode === 'guristas') wireTitleEl.innerText = "RABBIT'S NET // FRECUENCIAS DE VENAL";
      }

      wiresEl.innerHTML = filtered.length > 0
        ? filtered.slice(0, 12).map(inc => this.buildWireCardHTML(inc)).join('')
        : `<div style="padding: 24px; text-align: center; color: #B1E8F2; font-size: 0.8rem;">Sin transmisiones interceptadas en este cuadrante.</div>`;
    }

    // 2. Full Telemetry Table
    const tableBody = document.getElementById('telemetry-table-body');
    if (tableBody) {
      tableBody.innerHTML = filtered.length > 0 ? filtered.map(inc => {
        const secVal = parseFloat(inc.sec);
        const secColor = secVal >= 0.4 ? '#57C4DD' : (secVal >= 0.1 ? '#E5A93C' : '#EA428B');
        const secLabel = secVal >= 0.4 ? 'CONCORD 3s-19s' : (secVal >= 0.1 ? 'Low-Sec / Sin escolta' : 'Sin presencia CONCORD');

        return `
          <tr>
            <td><span class="pod-badge ${inc.severity === 'OMEGA' ? 'pod-badge-omega' : 'pod-badge-beta'}">${inc.severity} (${inc.ggci}%)</span></td>
            <td><span class="pod-badge pod-badge-source">${inc.source.toUpperCase()}</span></td>
            <td style="color: ${secColor}; font-weight: 600;">
              ${inc.system} [${inc.sec}]
              <span style="font-size: 0.62rem; display: block; opacity: 0.85;">${secLabel}</span>
            </td>
            <td><strong>${inc.ship}</strong></td>
            <td>${inc.corp}</td>
            <td style="color: #B1E8F2;">${inc.cargo ? inc.cargo.join(', ') : 'Sin carga'}</td>
            <td style="color: #EA428B; font-weight: 600;">${inc.val}</td>
            <td><button class="pod-subpoena-trigger" onclick="window.concordWidget.openSubpoenaInspector('${inc.id}')">CITACIÓN</button></td>
          </tr>
        `;
      }).join('') : `<tr><td colspan="8" style="text-align: center; color: #B1E8F2; padding: 24px;">No se encontraron registros de telemetría en este rango de seguridad.</td></tr>`;
    }

    // 3. Full Wires Feed Tab
    const fullWiresEl = document.getElementById('full-wires-container');
    if (fullWiresEl) {
      fullWiresEl.innerHTML = filtered.length > 0
        ? filtered.map(inc => this.buildWireCardHTML(inc)).join('')
        : `<div style="padding: 24px; text-align: center; color: #B1E8F2;">Sin cables interceptados en este sector.</div>`;
    }

    // 4. Historical Archive Table
    const histBody = document.getElementById('history-table-body');
    if (histBody) {
      histBody.innerHTML = this.buildHistoryTableRowsHTML();
    }
  }

  buildHistoryTableRowsHTML() {
    const histFiltered = HISTORICAL_ARCHIVE.filter(h => this.matchesFilters(h));
    if (histFiltered.length === 0) {
      return `<tr><td colspan="6" style="text-align: center; color: #B1E8F2; padding: 24px;">No hay registros históricos en este sector de seguridad.</td></tr>`;
    }
    return histFiltered.map(h => {
      const secVal = parseFloat(h.sec);
      const secColor = secVal >= 0.4 ? '#57C4DD' : (secVal >= 0.1 ? '#E5A93C' : '#EA428B');
      const secLabel = secVal >= 0.4 ? 'CONCORD 3s-19s' : (secVal >= 0.1 ? 'Low-Sec / Sin escolta' : 'Sin oficinas CONCORD');

      return `
        <tr>
          <td><strong>${h.time}</strong></td>
          <td style="color: ${secColor}; font-weight: 600;">
            ${h.system} (${h.region}) [${h.sec}]
            <span style="font-size: 0.65rem; display: block; opacity: 0.85; color: ${secColor};">${secLabel}</span>
          </td>
          <td><span class="pod-badge ${h.severity === 'OMEGA' ? 'pod-badge-omega' : 'pod-badge-beta'}">${h.severity} (${h.ggci}%)</span></td>
          <td>${h.text}</td>
          <td style="color: #EA428B; font-weight: 600;">${h.val}</td>
          <td><button class="pod-subpoena-trigger" onclick="window.concordWidget.openSubpoenaInspector('${h.id}')">VER CITACIÓN</button></td>
        </tr>
      `;
    }).join('');
  }

  buildIncidentCardHTML(inc) {
    const secVal = parseFloat(inc.sec);
    const secColor = secVal >= 0.4 ? '#57C4DD' : (secVal >= 0.1 ? '#E5A93C' : '#EA428B');
    const secTag = secVal >= 0.4 ? 'CONCORD 3s-19s' : (secVal >= 0.1 ? 'LOW-SEC' : 'SIN CONCORD');

    return `
      <div class="pod-incident-card sev-${inc.severity}">
        <div class="pod-card-header">
          <div>
            <span class="pod-badge ${inc.severity === 'OMEGA' ? 'pod-badge-omega' : 'pod-badge-beta'}">${inc.severity} (${inc.ggci}%)</span>
            <span class="pod-badge pod-badge-source">${inc.source.toUpperCase()}</span>
          </div>
          <span style="font-size: 0.68rem; color: ${secColor}; font-weight: 600;">
            ${inc.system} [${inc.sec}] <span style="font-size: 0.62rem; opacity: 0.9;">(${secTag})</span>
          </span>
        </div>
        <div class="pod-card-body">
          <div><strong>Nave:</strong> ${inc.ship} <span style="color: #EA428B;">(${inc.val})</span></div>
          <div><strong>Entidad:</strong> ${inc.corp}</div>
          ${inc.cargo && inc.cargo.length ? `<div style="color: #57C4DD;"><strong>Carga Clandestina:</strong> ${inc.cargo.join(', ')}</div>` : ''}
          <div style="font-size: 0.72rem; color: #B1E8F2; margin-top: 3px;">${inc.text}</div>
        </div>
        <div class="pod-card-actions">
          <button class="pod-subpoena-trigger" onclick="window.concordWidget.openSubpoenaInspector('${inc.id}')">[CITACIÓN DED]</button>
        </div>
      </div>
    `;
  }

  buildWireCardHTML(inc) {
    let narrative = "";
    if (this.currentMode === 'concord') {
      narrative = `[CONCORD DED CABLE // REF: ${inc.id}]
ALERTA INTERPOL-CONCORD // SEVERIDAD ${inc.severity}
LOCALIZACIÓN: ${inc.system} (${inc.region})
NAVE: ${inc.ship} (${inc.val})
DICTAMEN: Se confirma violación flagrante de directivas interestelares. Se ordena la intervención inmediata de activos de ${inc.corp}.`;
    } else if (this.currentMode === 'scope') {
      narrative = `THE SCOPE // BOLETÍN FEDERAL:
Portavoces de ${inc.corp} desmienten cualquier acuerdo con piratas en ${inc.system} y aseguran que los drones detectados eran parte de un "ensayo de exploración comercial independiente".`;
    } else if (this.currentMode === 'guristas') {
      narrative = `[TRANSMISIÓN VENAL - RABBIT-SIX]:
"Díganle a los senadores en Villore que si CONCORD les confisca las naves en ${inc.system}, nosotros no hacemos devoluciones. ¡Gracias por el ISK, federales!"`;
    }

    return `
      <div class="pod-wire-card">
        <div class="pod-wire-meta">
          <span>[${inc.time}] // ID #${inc.id}</span>
          <span style="color: #57C4DD;">${inc.system}</span>
        </div>
        <div style="white-space: pre-wrap;">${narrative}</div>
      </div>
    `;
  }

  // ========================================================================
  // 7. Subpoena Inspector (Full Judicial Document)
  // ========================================================================
  openSubpoenaInspector(id) {
    const inc = this.incidents.find(i => i.id === id) || HISTORICAL_ARCHIVE[0];
    const inspector = document.getElementById('pod-subpoena-inspector');
    const body = document.getElementById('pod-subpoena-body');

    const doc = `
================================================================================
  CONCORD DIRECTIVE ENFORCEMENT DIVISION // SUBPOENA OF INQUIRY #SUB-${inc.id}
  CLASSIFICATION: CLANDESTINE CROSS-FACTION COLLUSION // PRIORITY ${inc.severity}
================================================================================

FECHA ESTELAR: ${inc.timestamp}
LOCALIZACIÓN: Sistema Solar ${inc.system} (${inc.region || 'Frontera'})
ESTATUS DE SEGURIDAD: ${inc.sec} Sec
FUENTE DE TELEMETRÍA: ${inc.source.toUpperCase()}

ENTIDADES CITADAS A DECLARAR:
- ENTIDAD IMPLICADA: ${inc.corp}
- FACCIÓN ASOCIADA: ${inc.faction || 'Gallente Federation'}
- NEXOS CON GURISTAS SYNDICATE: Confirmados por firma IFF y balance comercial.

EVIDENCIA MATERIAL INCAUTADA/DESTRUIDA:
- Casco / Nave: ${inc.ship}
- Valor Estimado de Daños/Soborno: ${inc.val}
- Cargamento Clandestino: ${inc.cargo ? inc.cargo.join(', ') : 'Tecnología de Drones'}

DICTAMEN TÉCNICO DED:
${inc.text} (Índice de Colusión GGCI: ${inc.ggci}%)

FUNDAMENTO LEGAL:
Se imputa transgresión directa del Código Penal Interestelar CONCORD, Artículo 884-B 
(Prohibición de transferencia de propiedad militar a carteles piratas bajo pretexto comercial).

MEDIDA CAUTELAR:
SE ORDENA EL CONGELAMIENTO INMEDIATO DE FONDOS Y LA RETENCIÓN DE ACTIVOS EN DODIXIE Y JITA.
POR LA DIRECTIVA SUPREMA DE CONCORD.
================================================================================
    `.trim();

    this.currentSubpoenaText = doc;
    if (body) body.innerText = doc;
    if (inspector) inspector.style.display = 'flex';
  }

  closeSubpoenaInspector() {
    const inspector = document.getElementById('pod-subpoena-inspector');
    if (inspector) inspector.style.display = 'none';
  }

  copyCurrentSubpoena() {
    if (!this.currentSubpoenaText) return;
    navigator.clipboard.writeText(this.currentSubpoenaText).then(() => {
      alert("¡Citación judicial formal de CONCORD copiada al portapapeles!");
    });
  }

  printCurrentSubpoena() {
    const w = window.open('', '_blank');
    w.document.write(`<pre style="font-family: monospace; padding: 24px; color: #101C2F; background: #FFF;">${this.currentSubpoenaText}</pre>`);
    w.print();
  }

  // ========================================================================
  // 8. Canvas Tactical Radar Engine (360° Sweep & Real-time Pings)
  // ========================================================================
  initRadar(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      w = rect.width;
      h = rect.height;
      cx = w / 2;
      cy = h / 2;
      radius = Math.max(10, Math.min(cx, cy) - 15);
    };

    resize();
    if (this._radarResizeHandler) {
      window.removeEventListener('resize', this._radarResizeHandler);
    }
    this._radarResizeHandler = resize;
    window.addEventListener('resize', this._radarResizeHandler);

    let angle = 0;
    const pulses = [];

    const nodes = {
      'Dodixie':      { x: -0.45, y: 0.35,  sec: 0.9,  color: '#57C4DD', count: 0 },
      'Villore':      { x: -0.65, y: 0.15,  sec: 0.8,  color: '#57C4DD', count: 0 },
      'Caille':       { x: -0.35, y: 0.55,  sec: 0.9,  color: '#57C4DD', count: 0 },
      'Tama':         { x: 0.10,  y: 0.05,  sec: 0.3,  color: '#E5A93C', count: 0 },
      'Nennamaila':   { x: -0.20, y: -0.25, sec: 0.4,  color: '#E5A93C', count: 0 },
      'Ostingele':    { x: -0.15, y: 0.40,  sec: 0.2,  color: '#E5A93C', count: 0 },
      'Nourvukaiken': { x: 0.35,  y: -0.15, sec: 0.6,  color: '#57C4DD', count: 0 },
      'H-PA29':       { x: 0.45,  y: -0.65, sec: -0.2, color: '#EA428B', count: 0 },
      'Y-4CFK':       { x: 0.60,  y: -0.75, sec: -0.5, color: '#EA428B', count: 0 },
      'Jita':         { x: 0.50,  y: 0.20,  sec: 0.9,  color: '#57C4DD', count: 0 }
    };

    const radarObj = {
      resize: resize,
      activeSecFilter: this.currentSecurityFilter || 'all',
      setSecurityFilter: (secTier) => {
        radarObj.activeSecFilter = secTier;
      },
      ping: (systemName, severity) => {
        const sysKey = Object.keys(nodes).find(k => systemName.includes(k));
        const node = nodes[sysKey];
        if (node) {
          node.count++;
          pulses.push({
            x: node.x,
            y: node.y,
            radius: 3,
            maxRadius: severity === 'OMEGA' ? 42 : 24,
            color: severity === 'OMEGA' ? '#EA428B' : (node.sec < 0.1 ? '#EA428B' : (node.sec <= 0.4 ? '#E5A93C' : '#57C4DD')),
            alpha: 1.0
          });
        }
      }
    };
    this.radar = radarObj;

    const isNodeActive = (node) => {
      const f = radarObj.activeSecFilter;
      if (f === 'high') return node.sec >= 0.4 && node.sec <= 1.0;
      if (f === 'low') return node.sec >= 0.1 && node.sec <= 0.4;
      if (f === 'null') return node.sec < 0.1;
      return true;
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, w, h);

      // Radar concentric rings in sacred cyan
      ctx.strokeStyle = 'rgba(87, 196, 221, 0.2)';
      ctx.lineWidth = 1;
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweep gradient line
      angle += 0.03;
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;

      const grad = ctx.createLinearGradient(cx, cy, sweepX, sweepY);
      grad.addColorStop(0, 'rgba(87, 196, 221, 0.35)');
      grad.addColorStop(1, 'rgba(87, 196, 221, 0.0)');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.3, angle);
      ctx.fillStyle = grad;
      ctx.fill();

      // Nodes
      for (const [name, node] of Object.entries(nodes)) {
        const nx = cx + node.x * (radius * 0.85);
        const ny = cy + node.y * (radius * 0.85);
        const active = isNodeActive(node);

        ctx.save();
        if (!active) {
          ctx.globalAlpha = 0.20;
        }

        // Tactical target ring if highlighted by security filter
        if (active && radarObj.activeSecFilter !== 'all') {
          ctx.beginPath();
          ctx.arc(nx, ny, 7.5, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = active ? '#F1F1F1' : 'rgba(241, 241, 241, 0.35)';
        ctx.font = '9px "Inter", sans-serif';
        ctx.fillText(`${name} [${node.sec}] (${node.count})`, nx + 6, ny + 3);
        ctx.restore();
      }

      // Expanding pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const px = cx + p.x * (radius * 0.85);
        const py = cy + p.y * (radius * 0.85);

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        p.radius += 0.8;
        p.alpha -= 0.025;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.concordWidget = new ConcordWidgetSuite();
});
