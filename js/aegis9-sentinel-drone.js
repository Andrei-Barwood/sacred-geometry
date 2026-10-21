// ==========================================================================
// AEGIS-9: CYBERBRAIN EDR // AUTONOMOUS SENTINEL DRONE & MULTI-FALLBACK ENGINE
// Bridges CONCORD DED Intelligence Pod, Official EVE Online ESI API,
// and the Native Swift 6 Binary (bin/Aegis9CyberbrainEDR on 127.0.0.1:9909)
// ==========================================================================

const EVE_SOLAR_SYSTEM_IDS = {
  "Ostingele":    { id: 30003837, regionId: 10000048, region: "Placid",      sec: 0.2 },
  "Dodixie":      { id: 30002659, regionId: 10000032, region: "Sinq Laison", sec: 0.9 },
  "Villore":      { id: 30005008, regionId: 10000064, region: "Essence",     sec: 0.8 },
  "Caille":       { id: 30005014, regionId: 10000064, region: "Essence",     sec: 0.9 },
  "Tama":         { id: 30002813, regionId: 10000033, region: "The Citadel", sec: 0.3 },
  "Nennamaila":   { id: 30004984, regionId: 10000069, region: "Black Rise",  sec: 0.4 },
  "Nourvukaiken": { id: 30001401, regionId: 10000016, region: "Lonetrek",    sec: 0.6 },
  "H-PA29":       { id: 30001269, regionId: 10000015, region: "Venal",       sec: -0.2 },
  "Y-4CFK":       { id: 30001290, regionId: 10000015, region: "Venal",       sec: -0.5 },
  "6NJ8-V":       { id: 30001283, regionId: 10000015, region: "Venal",       sec: -0.4 },
  "Jita":         { id: 30000142, regionId: 10000002, region: "The Forge",   sec: 0.9 }
};

export class Aegis9SentinelDrone {
  constructor(concordWidget) {
    this.widget = concordWidget;

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

    // Resolver todos los casos iniciales del Pod de Inteligencia (priorizando Ostingele hist-07)
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

    // Lectura inicial inmediata
    setTimeout(() => processHeadlineChange(), 150);
  }

  /**
   * Extrae un caso estructurado directamente del DOM del banner `#tv-headline-content`
   * (ej. "[HACE 2 DÍAS (15 OCT) // ARCHIVO DED] Ostingele [BETA · GGCI 69%]: Sector fronterizo... (740,000,000 ISK)")
   * y lo cruza con la base de incidentes del Pod de Inteligencia.
   */
  parseBannerDOMIntoCase(headlineEl, rawText) {
    const highlightEl = headlineEl.querySelector(".tv-highlight");
    const detectedSystemRaw = highlightEl ? highlightEl.innerText.replace(":", "").trim() : "Ostingele";
    const systemKey = Object.keys(EVE_SOLAR_SYSTEM_IDS).find((k) => detectedSystemRaw.includes(k)) || "Ostingele";

    // Buscar coincidencia exacta en el pool de incidentes del Pod
    const allIncidents = this.widget?.incidents || [];
    const matchedIncident = allIncidents.find(
      (inc) => inc.system === systemKey && rawText.includes(inc.text.slice(0, 28))
    ) || allIncidents.find((inc) => inc.system === systemKey);

    if (matchedIncident) {
      return matchedIncident;
    }

    // Fallback de parseo directo desde el DOM si es una alerta nueva en el banner
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
      corp: "Federal Intelligence Office",
      faction: "Gallente Federation",
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
      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectedCaseId = resolution.caseId;
        this.widget.openPodModal();
        this.widget.switchTab("sentinel");
      });
      rightContainer.insertBefore(badge, rightContainer.firstChild);
    }

    const tierLabel = `FALLBACK T${resolution.activeFallbackTier}`;
    badge.innerHTML = `
      <span class="sentinel-pulse-dot"></span>
      <span class="tv-btn-text-full">🛡️ AEGIS-9 [${resolution.system.toUpperCase()} · ${tierLabel}]</span>
      <span class="tv-btn-text-short">🛡️ T${resolution.activeFallbackTier}</span>
    `;
  }

  updateBannerSentinelPillForCurrentHeadline() {
    const ostingeleRes = this.caseResolutions.get("hist-07");
    if (ostingeleRes) {
      this.renderBannerSentinelBadge(ostingeleRes);
    }
  }

  // ==========================================================================
  // 2. CONECTOR A LA API OFICIAL DE EVE ONLINE (ESI) CON CASCADA DE FALLBACKS
  // ==========================================================================
  async syncOfficialEveESIWithFallback() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      // 1. Consultar estado oficial del cluster Tranquility en EVE ESI
      const statusRes = await fetch("https://esi.evetech.net/latest/status/?datasource=tranquility", {
        signal: controller.signal,
        headers: { "Accept": "application/json" }
      });

      if (!statusRes.ok) throw new Error(`ESI HTTP ${statusRes.status}`);
      const statusData = await statusRes.json();

      // 2. Consultar kills y saltos por sistema solar en EVE ESI
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
        localStorage.setItem("aegis9_esi_cache_v1", JSON.stringify(this.esiState));
      } catch {}
    } catch {
      // FALLBACK ESI NIVEL 2: Caché local persistente de última sesión válida
      let restoredCache = null;
      try {
        const raw = localStorage.getItem("aegis9_esi_cache_v1");
        if (raw) restoredCache = JSON.parse(raw);
      } catch {}

      if (restoredCache && restoredCache.systemTelemetry) {
        this.esiState = {
          ...restoredCache,
          status: "CACHED_FALLBACK"
        };
      } else {
        // FALLBACK ESI NIVEL 3: Telemetría determinista de respaldo CONCORD DED
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
      "Ostingele":    { systemId: 30003837, shipKills: 34, podKills: 11, npcKills: 185, shipJumps: 940,  source: "DED_SYNTHETIC_FALLBACK" },
      "Dodixie":      { systemId: 30002659, shipKills: 12, podKills: 3,  npcKills: 45,  shipJumps: 4820, source: "DED_SYNTHETIC_FALLBACK" },
      "Villore":      { systemId: 30005008, shipKills: 6,  podKills: 1,  npcKills: 92,  shipJumps: 1890, source: "DED_SYNTHETIC_FALLBACK" },
      "Tama":         { systemId: 30002813, shipKills: 89, podKills: 42, npcKills: 110, shipJumps: 2150, source: "DED_SYNTHETIC_FALLBACK" },
      "H-PA29":       { systemId: 30001269, shipKills: 28, podKills: 14, npcKills: 640, shipJumps: 410,  source: "DED_SYNTHETIC_FALLBACK" },
      "Y-4CFK":       { systemId: 30001290, shipKills: 19, podKills: 9,  npcKills: 820, shipJumps: 275,  source: "DED_SYNTHETIC_FALLBACK" },
      "Nourvukaiken": { systemId: 30001401, shipKills: 15, podKills: 4,  npcKills: 130, shipJumps: 1620, source: "DED_SYNTHETIC_FALLBACK" },
      "Nennamaila":   { systemId: 30004984, shipKills: 61, podKills: 24, npcKills: 95,  shipJumps: 1340, source: "DED_SYNTHETIC_FALLBACK" },
      "Caille":       { systemId: 30005014, shipKills: 4,  podKills: 0,  npcKills: 60,  shipJumps: 1120, source: "DED_SYNTHETIC_FALLBACK" },
      "Jita":         { systemId: 30000142, shipKills: 47, podKills: 18, npcKills: 20,  shipJumps: 14900, source: "DED_SYNTHETIC_FALLBACK" }
    };
    return presets[systemName] || presets["Ostingele"];
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
      // Fallback automático a motor WebCrypto en navegador
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
    // Fallback determinista puro JS si WebCrypto no estuviera disponible
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
  // 4. MOTOR DE RESOLUCIÓN MULTI-FALLBACK PARA CADA CASO DEL POD DE INTELIGENCIA
  // ==========================================================================
  async resolveAllPodCases() {
    const incidents = this.widget?.incidents || [];
    for (const inc of incidents) {
      await this.resolvePodCase(inc);
    }
  }

  /**
   * Analiza un caso del Pod de Inteligencia (como Ostingele `hist-07`), mapea las tácticas
   * MITRE ATT&CK de Aegis9, genera las 3 Opciones de Solución Táctica y ejecuta la cadena
   * de 4 Fallbacks resilientes.
   */
  async resolvePodCase(incident) {
    const sec = parseFloat(incident.sec ?? 0.2);
    const sysName = incident.system || "Ostingele";
    const esiMetrics = this.esiState.systemTelemetry[sysName] || this.defaultSyntheticMetrics(sysName);
    const cargoList = incident.cargo || [];
    const cargoJoined = cargoList.join(" ").toLowerCase();
    const textLower = (incident.text || "").toLowerCase();

    // 1. Mapeo MITRE ATT&CK (Aegis9 Cyberbrain EDR)
    const mitreMappings = [];
    if (cargoJoined.includes("booster") || textLower.includes("estimulantes") || textLower.includes("narcóticos")) {
      mitreMappings.push({
        code: "T1565.002",
        name: "Data Manipulation: Transmitted Data",
        subsystem: "SynapticDataGuard (HMAC-SHA256)",
        reason: "Adulteración neuroquímica/sensorial por trasvase de estimulantes ilegales (Exile/Drop Booster)."
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
        reason: `Uso del corredor ${sysName} (${sec} Sec) como nodo intermedio hacia espacio pirata Guristas.`
      });
    }
    mitreMappings.push({
      code: "T1070",
      name: "Indicator Removal / ChronoSync",
      subsystem: "ImmutableMemoryLedger + ChronoSync",
      reason: "intento de ocultamiento temporal en archivo histórico de 48h; requiere sello criptográfico inmutable."
    });

    // 2. Construir las 3 Opciones de Solución del Dron Sentinela para este caso
    const solutionOptions = {
      kinetic_airgap: {
        id: "kinetic_airgap",
        title: "OPCIÓN A // INTERDICCIÓN DE PUERTA & CORTAFUEGOS NEURAL (T1210 / T1090)",
        badge: "CONTENCIÓN SUBESPACIAL",
        summary: `Acoplar el Dron Sentinela Aegis-9 a la matriz de sensores de ${sysName}, bloquear los transmisores clandestinos de ${incident.ship || "la nave"} y activar interdicción de salto.`,
        technicalAction: `NeuralNetworkFirewall.blockEndpoint(system: "${sysName}") + Pulso Warp Scrambler sobre casco ${incident.ship} (${incident.val}).`
      },
      synaptic_hmac: {
        id: "synaptic_hmac",
        title: "OPCIÓN B // TRAZADO ISOTÓPICO HMAC-SHA256 & CONTRAMEDIDA DE CARGA (T1565.002 / T1195)",
        badge: "NEUTRALIZACIÓN DE CARGA",
        summary: `Inyectar firma de rastreo criptográfico HMAC-SHA256 sobre el lote de [${cargoList.join(", ") || "carga clandestina"}] para inutilizar los estimulantes/planos antes de su entrega a piratas.`,
        technicalAction: `SynapticDataGuard.validateAndForward() -> Envenenamiento criptográfico de ${cargoList.length || 2} contenedores valorados en ${incident.val}.`
      },
      ghost_lock_esi: {
        id: "ghost_lock_esi",
        title: "OPCIÓN C // PROTOCOLO 'GHOST LOCK' & EMBARGO BURSÁTIL ESI (T1070 / T1499)",
        badge: "EMBARGO TOTAL & LEDGER",
        summary: `Congelar instantáneamente las cuentas colaterales de '${incident.corp}' en las plazas de Dodixie y Villore, sellando el expediente judicial en la Blockchain de Aegis-9.`,
        technicalAction: `GhostLockOrchestrator.engageFullGhostLock() + ImmutableMemoryLedger.appendEvent(#${incident.id}).`
      }
    };

    // Selección de estrategia (automática inteligente según seguridad o elegida por el usuario)
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

    // 4. Sellar en la cadena de bloques (nativa Swift 6 si está conectada, o WebCrypto local)
    const prevBlock = this.ledgerChain[this.ledgerChain.length - 1];
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

  /**
   * Construye la escalera de 4 niveles de Fallback para un caso del Pod, teniendo en cuenta:
   * - Jurisdicción CONCORD según `sec` (`>= 0.5` High-Sec, `0.1..0.4` Low-Sec como Ostingele, `<= 0.0` Null-Sec como Venal).
   * - Simulaciones manuales de fallo (`this.simulatedFailureTiers`) activadas por el usuario en la UI.
   */
  evaluateFallbackLadder(incident, sec, esiMetrics, chosenSolution) {
    const tier1ForcedFail = this.simulatedFailureTiers.has(1);
    const tier2ForcedFail = this.simulatedFailureTiers.has(2);
    const tier3ForcedFail = this.simulatedFailureTiers.has(3);

    // Nivel 1: Patrulla Policial CONCORD DED (Solo disponible si sec >= 0.5 y no forzado a fallar)
    const tier1Available = sec >= 0.5 && !tier1ForcedFail;
    const tier1Reason = !tier1Available
      ? (sec < 0.5
          ? `FALLO JURISDICCIONAL: ${incident.system} [${sec} Sec] carece de patrullas CONCORD activas (sector fronterizo/anárquico).`
          : `FALLO SIMULADO: Retraso de despacho CONCORD por interferencia subespacial.`)
      : `EJECUTADO: Escuadrón CONCORD DED desplegado en ${incident.system} (${sec} Sec) en ${sec >= 0.8 ? "6 segundos" : "14 segundos"}.`;

    // Nivel 2: Dron Sentinela Aegis-9 + Cañones de Puerta (Gate Guns) & Bloqueo de Transmisores (Disponible si sec >= 0.1)
    const tier2Available = !tier1Available && sec >= 0.1 && !tier2ForcedFail;
    let tier2Status = "STANDBY_READY";
    let tier2Detail = `En reserva táctica: Red de Cañones Centinela de Puerta Estelar + Cortafuegos Neural Aegis-9 (T1210).`;
    if (!tier1Available) {
      if (sec >= 0.1 && !tier2ForcedFail) {
        tier2Status = "ACTIVE_EXECUTED";
        tier2Detail = `ACTIVADO POR FALLBACK T1 → Dron Sentinela acoplado a Gate Guns en ${incident.system} [${sec}]. Transmisores clandestinos de ${incident.ship} bloqueados (${esiMetrics.shipJumps} saltos ESI monitoreados).`;
      } else {
        tier2Status = "BYPASSED_FAILED";
        tier2Detail = sec < 0.1
          ? `FALLO DE INFRAESTRUCTURA: ${incident.system} [${sec} Null-Sec] no posee cañones de puerta de CONCORD.`
          : `FALLO SIMULADO: Cañones de puerta neutralizados por hackers Guristas; escalando a Tier 3.`;
      }
    }

    // Nivel 3: Guerra Cibernética Aegis-9 (Ghost Lock Remoto + Trazado Sináptico HMAC-SHA256 sobre Carga)
    const tier1And2Failed = !tier1Available && !tier2Available;
    const tier3Available = tier1And2Failed && !tier3ForcedFail;
    let tier3Status = "STANDBY_READY";
    let tier3Detail = `En reserva: Inyección de contramedida '${chosenSolution.badge}' y marcador isotópico HMAC-SHA256 sobre ${incident.val}.`;
    if (tier1And2Failed) {
      if (!tier3ForcedFail) {
        tier3Status = "ACTIVE_EXECUTED";
        tier3Detail = `ACTIVADO POR FALLBACK T2 → Protocolo Aegis-9 '${chosenSolution.badge}' inyectado en los subsistemas de ${incident.ship}. Lote de [${(incident.cargo || []).join(", ")}] marcado con HMAC-SHA256.`;
      } else {
        tier3Status = "BYPASSED_FAILED";
        tier3Detail = `FALLO SIMULADO: Blindaje electromagnético en casco hostil; activando Fallback Final Inmutable (Tier 4).`;
      }
    }

    // Nivel 4: Garantía Última Inmutable (Sellado Blockchain Curve25519 + Embargo Diferido en Mercados ESI Dodixie/Jita)
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
        detail: `SIEMPRE ACTIVO: Expediente #${incident.id} (${incident.val}) sellado con SHA-256 + Curve25519 y orden de embargo diferido enviada a los hubs de Dodixie y Jita 4-4.`
      }
    ];
  }

  // ==========================================================================
  // 5. ACCIONES INTERACTIVAS DESDE LA UI DEL POD DE INTELIGENCIA
  // ==========================================================================
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
        <!-- Barra Superior de Estado de Conectores y Telemetría Oficial EVE ESI -->
        <div class="sentinel-top-bar">
          <div class="sentinel-top-title">
            <span style="color: #00F5D4; font-weight: 800; letter-spacing: 0.08em;">🛡️ AEGIS-9: CYBERBRAIN EDR // DRON SENTINELA DE RESPUESTA TÁCTICA</span>
            <span style="font-size: 0.72rem; color: #B1E8F2;">Lectura automática del Pod de Inteligencia DED + Escalera de 4 Fallbacks + Sellado Blockchain T1070</span>
          </div>
          <div class="sentinel-connectors-row">
            ${esiStatusBadge}
            ${bridgeStatusBadge}
            <button class="pod-subpoena-trigger" onclick="window.concordWidget.sentinelDrone.syncOfficialEveESIWithFallback().then(() => window.concordWidget.sentinelDrone.renderSentinelTabPane())">
              ↻ RE-SINCRONIZAR ESI / BRIDGE
            </button>
          </div>
        </div>

        <div class="sentinel-main-grid">
          <!-- Columna Izquierda: Selector de Casos Leídos del Pod de Inteligencia -->
          <div class="sentinel-cases-col">
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

          <!-- Columna Derecha: Informe Detallado de Solución, Opciones y Escalera de Fallbacks -->
          <div class="sentinel-detail-col">
            <!-- 1. Cabecera Forense del Caso Seleccionado (ej. Ostingele 740M ISK) -->
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

            <!-- 2. Mapeo MITRE ATT&CK de Aegis-9 -->
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

            <!-- 3. Selector de Opciones de Solución del Dron Sentinela -->
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

            <!-- 4. Escalera de 4 Fallbacks Resilientes (con Simulador de Fallos en Vivo) -->
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

            <!-- 5. Sello Criptográfico en ImmutableMemoryLedger -->
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
