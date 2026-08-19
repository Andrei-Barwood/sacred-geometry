// Aemaeth Interactive Suite - Logic
// Boylestad "Introducción al Análisis de Circuitos" 10ma Ed.

const presetsData = {
  "1-6": {
    p12a: { type: "num", val: "10000", desc: "Prob. 12.a: Expresar 10.000 como potencia de diez.\nCálculo: 10.000 = 10^4" },
    p12b: { type: "num", val: "0.0001", desc: "Prob. 12.b: Expresar 0.0001 como potencia de diez.\nCálculo: 0.0001 = 10^-4" },
    p13a: { type: "num", val: "15000", desc: "Prob. 13.a: Expresar 15.000 en potencias de diez.\nNotación Científica: 1.5 × 10^4\nNotación de Ingeniería: 15 × 10^3" },
    p13d: { type: "num", val: "0.0000068", desc: "Prob. 13.d: Expresar 0.0000068 en potencias de diez.\nNotación Científica: 6.8 × 10^-6\nNotación de Ingeniería: 6.8 × 10^-6" },
    p14a: { type: "op", op1: "4200", op: "+", op2: "6800000", desc: "Prob. 14.a: Suma 4.200 + 6.800.000" },
    p14c: { type: "op", op1: "0.0005", op: "-", op2: "0.00006", desc: "Prob. 14.c: Resta 0.5x10^-3 - 6x10^-5" },
    p15c: { type: "op", op1: "1000", op: "*", op2: "1000000", desc: "Prob. 15.c: Multiplicación 10^3 * 10^6" },
    p16a: { type: "op", op1: "50000", op: "*", op2: "0.0003", desc: "Prob. 16.a: Multiplicación (50.000)(0.0003)" },
    p17a: { type: "op", op1: "100", op: "/", op2: "1000", desc: "Prob. 17.a: División 100 / 1000" },
    p18a: { type: "op", op1: "2000", op: "/", op2: "0.00008", desc: "Prob. 18.a: División 2000 / 0.00008" },
    p20a: { type: "num", val: "10648000000", desc: "Prob. 20.a: Potencia (2.2x10^3)^3\nCálculo: (2.2)^3 * (10^3)^3 = 10.648 * 10^9 = 10.648.000.000" },
    p22a: { type: "op", op1: "90000", op: "*", op2: "0.01", desc: "Prob. 22.a: Op. de Ingeniería (300)^2 * 100 / 10^4\n(300)^2 = 90.000. 100 / 10^4 = 0.01.\nOperación: 90.000 * 0.01" }
  },
  "1-7": {
    p23a: { val: "6", from: "3", to: "6", desc: "Prob. 23.a: Llenar espacio: 6 x 10^3 = ___ x 10^6" },
    p23b: { val: "4", from: "-4", to: "-6", desc: "Prob. 23.b: Llenar espacio: 4 x 10^-4 = ___ x 10^-6" },
    p23c1: { val: "50", from: "5", to: "3", desc: "Prob. 23.c.1: Completar 50x10^5 = ___ x 10^3" },
    p23c2: { val: "50", from: "5", to: "6", desc: "Prob. 23.c.2: Completar 50x10^5 = ___ x 10^6" },
    p23d1: { val: "30", from: "-8", to: "-3", desc: "Prob. 23.d.1: Completar 30x10^-8 = ___ x 10^-3" },
    p23d2: { val: "30", from: "-8", to: "-6", desc: "Prob. 23.d.2: Completar 30x10^-8 = ___ x 10^-6" },
    p24a: { val: "2000", from: "-6", to: "-3", desc: "Prob. 24.a: Convertir 2000 µs a milisegundos." },
    p24b: { val: "0.04", from: "-3", to: "-6", desc: "Prob. 24.b: Convertir 0.04 ms a microsegundos." },
    p24c: { val: "0.06", from: "-6", to: "-9", desc: "Prob. 24.c: Convertir 0.06 µf a nanofarads." },
    p24d: { val: "8400", from: "-12", to: "-6", desc: "Prob. 24.d: Convertir 8400 ps a microsegundos (10^-6 s)." },
    p24e: { val: "0.006", from: "3", to: "-3", desc: "Prob. 24.e: Convertir 0.006 km a milímetros." },
    p24f: { val: "260000", from: "-3", to: "3", desc: "Prob. 24.f: Convertir 260x10^3 mm a kilómetros." }
  },
  "1-8": {
    p25a: { type: "gen", val: "1.5", utype: "time", from: "min", to: "s", desc: "Prob. 25.a: Convertir 1.5 min a segundos." },
    p25b: { type: "gen", val: "0.04", utype: "time", from: "h", to: "s", desc: "Prob. 25.b: Convertir 0.04 h a segundos." },
    p25c: { type: "gen", val: "0.05", utype: "time", from: "s", to: "us", desc: "Prob. 25.c: Convertir 0.05 s a microsegundos." },
    p25d: { type: "gen", val: "0.16", utype: "length", from: "m", to: "mm", desc: "Prob. 25.d: Convertir 0.16 m a milímetros." },
    p26a: { type: "prefix", val: "0.1", from: "-6", to: "-12", desc: "Prob. 26.a: Convertir 0.1 µF a picofarads." },
    p26b: { type: "gen", val: "0.467", utype: "length", from: "km", to: "m", desc: "Prob. 26.b: Convertir 0.467 km a metros." },
    p27a: { type: "gen", val: "100", utype: "length", from: "in", to: "m", desc: "Prob. 27.a: Convertir 100 pulgadas a metros." },
    p27b: { type: "gen", val: "4", utype: "length", from: "ft", to: "m", desc: "Prob. 27.b: Convertir 4 pies a metros." },
    p29: { type: "kin", d: "669600000", v: "", t: "1", desc: "Prob. 29: Calcular velocidad de la luz en millas/hora.\nLa velocidad de la luz es aprox. 186.000 mi/s.\nCálculo: v = 186.000 mi/s * 3600 s/h = 669.600.000 mi/h." },
    p30: { type: "kin", d: "50", v: "", t: "20", desc: "Prob. 30: Calcular velocidad en mi/h de una masa que va a 50 pies en 20 s.\nCálculo: 50 ft / 20 s = 2.5 ft/s. Convertido a mi/h: 2.5 * (3600 / 5280) = 1.7045 mi/h." },
    p31: { type: "kin", d: "300", v: "146.67", t: "", desc: "Prob. 31: Tiempo en segundos para auto a 100 mi/h (146.67 ft/s) recorrer 100 yd (300 ft).\nCálculo: t = d / v = 300 ft / 146.67 ft/s = 2.046 s." },
    p32: { type: "kin", d: "", v: "6", t: "", desc: "Prob. 32: Convertir 6 mi/h a metros por segundo.\nConversión: 6 mi/h = 6 * 1609.344 m / 3600 s = 2.682 m/s." }
  },
  "1-10": {
    p41a: { val: "5", preset: "j_btu", desc: "Prob. 41.a: Determinar BTU en 5 J de energía.\n1 J = 9.478e-4 BTU. 5 J = 0.004739 BTU." },
    p41b: { val: "24", preset: "oz_m3", desc: "Prob. 41.b: Determinar Metros cúbicos en 24 oz de líquido.\n24 oz * 2.957e-5 m³/oz = 0.0007097 m³." },
    p41c: { val: "1.4", preset: "days_s", desc: "Prob. 41.c: Determinar Segundos en 1.4 días.\n1.4 * 86.400 = 120.960 segundos." },
    p41d: { val: "1", preset: "m3_pints", desc: "Prob. 41.d: Determinar Pintas en 1 m³ de líquido.\n1 m³ / 0.000473176 m³/pinta = 2113.38 pintas." },
    preset5: { val: "1000", preset: "j_btu", desc: "Ejerc. 5: BTU en 1000 J de energía." },
    preset6: { val: "128", preset: "oz_m3", desc: "Ejerc. 6: Metros cúbicos en 1 galón (128 oz) de líquido." },
    preset7: { val: "3600", preset: "s_days", desc: "Ejerc. 7: Segundos en 1 hora (3600 s) expresado en días." },
    preset8: { val: "1000", preset: "l_m3", desc: "Ejerc. 8: Litros a metros cúbicos (1000 litros)." },
    preset9: { val: "10", preset: "gal_l", desc: "Ejerc. 9: Galones a litros (10 galones)." },
    preset10: { val: "150", preset: "lb_kg", desc: "Ejerc. 10: Libras a kilogramos (150 libras)." },
    preset11: { val: "100", preset: "mi_km", desc: "Ejerc. 11: Millas a kilómetros (100 millas)." },
    preset12: { val: "5", preset: "hp_w", desc: "Ejerc. 12: Caballos de fuerza (HP) a Watts (5 HP)." }
  },
  "1-11": {
    p42: { expr: "6 * (4 + 8)", desc: "Prob. 42: Evaluar 6(4 + 8)" },
    p43: { expr: "sqrt(3^2 + 4^2)", desc: "Prob. 43: Evaluar sqrt(3^2 + 4^2)" },
    p44: { expr: "atan(4/3)", desc: "Prob. 44: Evaluar atan(4/3) (inversa trigonométrica)" },
    p45: { expr: "sqrt(400) / sqrt(6^2 + 10)", desc: "Prob. 45: Evaluar sqrt(400) / sqrt(6^2 + 10)" },
    preset5: { expr: "sqrt(12^2 + 5^2)", desc: "Ejerc. 5: Impedancia sqrt(12^2 + 5^2)" },
    preset6: { expr: "1 / (2 * 3.14159 * 1000 * 10^-6)", desc: "Ejerc. 6: Reactancia capacitiva Xc = 1 / (2 * pi * f * C)" },
    preset7: { expr: "2 * 3.14159 * 60 * 0.15", desc: "Ejerc. 7: Reactancia inductiva Xl = 2 * pi * f * L" },
    preset8: { expr: "atan(10 / 5) * (180 / 3.14159)", desc: "Ejerc. 8: Ángulo de fase en grados: atan(X/R) * (180 / pi)" },
    preset9: { expr: "120 / sqrt(2)", desc: "Ejerc. 9: Voltaje RMS para Vp = 120V" },
    preset10: { expr: "10 * sin(2 * 3.14159 * 50 * 0.005)", desc: "Ejerc. 10: Voltaje instantáneo v(t) = Vp * sin(2*pi*f*t) en t = 5 ms" },
    preset11: { expr: "sqrt(100^2 + (50 - 20)^2)", desc: "Ejerc. 11: Impedancia RLC sqrt(R^2 + (Xl - Xc)^2)" },
    preset12: { expr: "20 * log10(100 / 10)", desc: "Ejerc. 12: Ganancia en decibelios (dB) = 20 * log10(Vo / Vi)" }
  },
  "2-1": {
    p1: {
      type: "text",
      desc: "Prob. 1 — Aluminio (Z=13) y plata (Z=47).\nAl: 1s² 2s² 2p⁶ 3s² 3p¹. Tres electrones de valencia; el 3p se desprende con poco trabajo. Por eso el Al es el conductor de los cables fotovoltaicos AA-8000 y de las barras de media tensión: ligero, barato y suficientemente conductor.\nAg: [Kr] 4d¹⁰ 5s¹. Un solo electrón 5s, movilidad altísima. Es la pasta de la rejilla frontal de celdas c-Si, TOPCon y HJT: minimiza la resistencia serie del módulo.\nAmbos son buenos conductores porque su última capa está incompleta y cede electrones libres a la red cristalina."
    },
    p2: {
      type: "coulomb",
      q1: "1.6e-19", q1u: "1", q2: "-1.6e-19", q2u: "1", r: "5e-11", ru: "1", f: "",
      desc: "Prob. 2 — Protón y electrón a 5×10⁻¹¹ m (radio de Bohr).\nF = k |Q1 Q2| / r²\nk = 8.99×10⁹, |e| = 1.6×10⁻¹⁹ C\nF = 8.99e9 · (1.6e-19)² / (5e-11)² = 9.206×10⁻⁸ N (atracción).\nEn una celda fotovoltaica esa misma fuerza de Coulomb ata al electrón de valencia del Si hasta que un fotón (Eg ≈ 1.12 eV) lo libera y nace la fotocorriente."
    },
    p3a: {
      type: "coulomb",
      q1: "1", q1u: "1e-6", q2: "-2", q2u: "1e-6", r: "1", ru: "1", f: "",
      desc: "Prob. 3.a — Fig. 2.34: +1 µC y −2 µC a r = 1 m.\nF = 8.99e9 · (1e-6)·(2e-6) / 1² = 1.798×10⁻² N (atracción).\nA 1 m la fuerza ya es pequeña: el ESD peligroso para un driver de SiC ocurre a milímetros, no a metros."
    },
    p3b: {
      type: "coulomb",
      q1: "1", q1u: "1e-6", q2: "-2", q2u: "1e-6", r: "3", ru: "1", f: "",
      desc: "Prob. 3.b — Mismas cargas a r = 3 m.\nF = 1.798×10⁻² / 9 = 1.998×10⁻³ N.\nAl triplicar r la fuerza cae 9 veces (1/r²)."
    },
    p3c: {
      type: "coulomb",
      q1: "1", q1u: "1e-6", q2: "-2", q2u: "1e-6", r: "10", ru: "1", f: "",
      desc: "Prob. 3.c — Mismas cargas a r = 10 m.\nF = 1.798×10⁻² / 100 = 1.798×10⁻⁴ N.\nDe 1 m a 10 m la fuerza cae dos órdenes de magnitud. En un parque solar las cargas estáticas de un módulo no empujan al del siguiente; el riesgo es local (conectores, cajas de conexión)."
    },
    p4a: {
      type: "coulomb",
      q1: "8", q1u: "1e-6", q2: "40", q2u: "1e-6", r: "1", ru: "1609.344", f: "",
      desc: "Prob. 4.a — Fig. 2.35: +8 µC y +40 µC a r = 1 mi = 1609.344 m.\nF = 8.99e9 · 8e-6 · 40e-6 / (1609.344)² = 1.111×10⁻⁶ N (repulsión).\nA escala de un aerogenerador y su vecino la fuerza electrostática es despreciable frente al empuje del viento."
    },
    p4b: {
      type: "coulomb",
      q1: "8", q1u: "1e-6", q2: "40", q2u: "1e-6", r: "0.01", ru: "1", f: "",
      desc: "Prob. 4.b — Mismas cargas a r = 0.01 m.\nF = 2.877×10⁴ N (repulsión).\nA un centímetro la fuerza ya es de toneladas: es el régimen del arco en un seccionador de 1500 Vcc o de una falla en la caja de combinadores."
    },
    p4c: {
      type: "coulomb",
      q1: "8", q1u: "1e-6", q2: "40", q2u: "1e-6", r: "0.0625", ru: "0.0254", f: "",
      desc: "Prob. 4.c — r = 1/16 pulg = 1.5875 mm.\nF = 1.142×10⁶ N (repulsión).\nConfirma que 1/r² dispara la fuerza a distancias de aislamiento típicas de conectores MC4 y bornes de inversor."
    },
    p5: {
      type: "coulomb-plot",
      q1: "2", q1u: "1e-6", q2: "-4", q2u: "1e-6", r: "1", ru: "1", f: "",
      desc: "Prob. 5 — +2 µC y −4 µC. F(r) = 0.07192 / r² (N, r en m).\nr=0.5 m → 0.288 N; r=1 m → 0.0719 N; r=10 m → 7.19×10⁻⁴ N.\nLa curva no es lineal: cualquier magnitud con r² en el denominador cae de prisa al separar las cargas. El polvo sobre un módulo se adhiere fuerte a décimas de milímetro y casi no interactúa entre filas."
    },
    p6: {
      type: "coulomb",
      q1: "20", q1u: "1e-6", q2: "20", q2u: "1e-6", r: "", ru: "1", f: "3.6e4",
      desc: "Prob. 6 — Dos cargas de 20 µC, F = 3.6×10⁴ N.\nr = √(k |Q1 Q2| / F) = √(8.99e9 · 4e-10 / 3.6e4) = 0.0100 m (1.00 cm).\nEs la distancia a la que dos nubes de carga de un banco de condensadores del enlace de cd se repelerían con decenas de kilonewton: el diseño mecánico del busbar debe soportarla en cortocircuito."
    },
    p7a: {
      type: "text",
      desc: "Prob. 7.a — F ∝ 1/r². A 2 m, F=1.8 N; a 10 m:\nF2 = 1.8 · (2/10)² = 1.8 · 0.04 = 0.072 N.\nAlejar cinco veces dos cuerpos cargados (dos racks de BESS, dos strings) reduce la fuerza electrostática 25 veces."
    },
    p7b: {
      type: "text",
      desc: "Prob. 7.b — Q1/Q2 = 1/2 y r = 10 m, con F = 0.072 N (inciso a).\n0.072 = k Q1 (2 Q1) / 10² → Q1² = 4.004×10⁻¹⁰\nQ1 = 20.01 µC, Q2 = 40.02 µC.\nEl producto Q1 Q2 queda fijado por F y r; la razón reparte ese producto entre las dos cargas."
    }
  },
  "2-2": {
    p8: {
      type: "current", i: "", iu: "1", q: "650", qu: "1", n: "", t: "50", tu: "1", fuse: "",
      desc: "Prob. 8 — I = Q/t = 650 C / 50 s = 13 A.\nEs la corriente de un string fotovoltaico de ~13 A (módulo de 500 W a Imp) o la de un microinversor residencial en el lado de cd."
    },
    p9: {
      type: "current", i: "", iu: "1", q: "465", qu: "1", n: "", t: "2.5", tu: "60", fuse: "",
      desc: "Prob. 9 — t = 2.5 min = 150 s. I = 465 / 150 = 3.1 A.\nCorriente típica de un módulo de 400 W cerca de Imp, o de la carga de un logger de recurso."
    },
    p10: {
      type: "current", i: "40", iu: "1", q: "", qu: "1", n: "", t: "1", tu: "60", fuse: "",
      desc: "Prob. 10 — Q = I t = 40 A · 60 s = 2400 C.\nUn inversor string de 40 A en el bus de cd mueve 2400 C cada minuto hacia la red."
    },
    p11: {
      type: "current", i: "750", iu: "0.001", q: "", qu: "1", n: "", t: "2", tu: "60", fuse: "",
      desc: "Prob. 11 — I = 750 mA = 0.75 A, t = 120 s. Q = 90 C.\nEs el orden de la corriente de un sensor o de un string de bajo irradiancia al amanecer."
    },
    p12: {
      type: "current", i: "2", iu: "0.001", q: "4600e-6", qu: "1", n: "", t: "", tu: "1", fuse: "",
      desc: "Prob. 12 — Q = 4600×10⁻⁶ C = 4.6 mC, I = 2 mA.\nt = Q/I = 0.0046 / 0.002 = 2.3 s.\nEn 2.3 s un canal de medición de 2 mA (shunt de un combinador) integra esa carga."
    },
    p13: {
      type: "current", i: "", iu: "1", q: "", qu: "1", n: "21.847e18", t: "7", tu: "1", fuse: "",
      desc: "Prob. 13 — Q = 21.847×10¹⁸ / 6.242×10¹⁸ = 3.500 C.\nI = 3.500 / 7 = 0.500 A.\nMedio ampere: la corriente de un módulo pequeño o de la electrónica de un tracker."
    },
    p14: {
      type: "current", i: "1", iu: "1", q: "", qu: "1", n: "", t: "1", tu: "60", fuse: "",
      desc: "Prob. 14 — Q = 1 A · 60 s = 60 C.\nN = 60 · 6.242×10¹⁸ = 3.745×10²⁰ electrones.\nUn ampere durante un minuto — la corriente de un módulo — mueve ~3.7×10²⁰ portadores por el cable de Al."
    },
    p15: {
      type: "current", i: "", iu: "1", q: "86", qu: "1", n: "", t: "1.2", tu: "60", fuse: "1",
      desc: "Prob. 15 — t = 1.2 min = 72 s. I = 86 / 72 = 1.194 A > 1 A.\nSí: el fusible de 1 A estalla. Un fusible gPV se elige por encima de 1.56·Isc; si la corriente real lo supera de forma sostenida, abre el string y protege la caja de combinadores."
    },
    p16: {
      type: "current", i: "", iu: "1", q: "", qu: "1", n: "0.784e18", t: "643", tu: "0.001", fuse: "",
      desc: "Prob. 16 — Q = 0.784×10¹⁸ / 6.242×10¹⁸ = 0.1256 C.\nt = 643 ms. I = 0.1256 / 0.643 = 0.195 A.\nCasi 200 mA: corriente de un canal de monitoreo o de un string a muy baja irradiancia."
    },
    p17: {
      type: "text",
      desc: "Prob. 17 — Electrones y dinero (misma aritmética que un contador de carga).\na) I=2 mA, t=0.01 ms=10⁻⁵ s → Q=2×10⁻⁸ C → N=1.248×10¹¹ e⁻ → 1.248×10¹¹ centavos = 1.248×10⁹ USD.\nb) I=100 mA, t=1.5 ns → Q=1.5×10⁻¹⁰ C → N=9.363×10⁸ e⁻ → 9.363×10⁸ USD.\nSe prefiere (a): más carga neta, más electrones, más valor. El mismo criterio (integrar I·t) usa el medidor de un BESS para facturar kWh."
    }
  },
  "2-3": {
    p18: {
      type: "voltage", v: "", vu: "1", w: "96", wu: "0.001", q: "", qu: "1", n: "50e18", i: "", iu: "1", t: "", tu: "1",
      desc: "Prob. 18 — Q = 50×10¹⁸ / 6.242×10¹⁸ = 8.010 C. W = 96 mJ = 0.096 J.\nV = W/Q = 0.0120 V (12.0 mV).\nEs la caída de un shunt de medición o de un conector mal crimpado: pequeña, pero I²R calienta el punto caliente del string."
    },
    p19: {
      type: "voltage", v: "42", vu: "1", w: "", wu: "1", q: "6", qu: "1", n: "", i: "", iu: "1", t: "", tu: "1",
      desc: "Prob. 19 — W = V Q = 42 · 6 = 252 J.\nMover 6 C a través de 42 V (cerca del Vmp de un módulo de 72 celdas) exige 252 J, la energía de ese módulo durante una fracción de segundo a 400 W."
    },
    p20: {
      type: "voltage", v: "16", vu: "1", w: "96", wu: "1", q: "", qu: "1", n: "", i: "", iu: "1", t: "", tu: "1",
      desc: "Prob. 20 — Q = W/V = 96 / 16 = 6 C.\nSeis coulombs cruzan 16 V — el orden de una celda LFP en serie con un convertidor de bajo voltaje."
    },
    p21: {
      type: "voltage", v: "22.5", vu: "1", w: "90", wu: "1", q: "", qu: "1", n: "", i: "", iu: "1", t: "", tu: "1",
      desc: "Prob. 21 — Q = 90 / 22.5 = 4 C.\nUna batería de 22.5 V (18 celdas NiMH o un pack auxiliar) entrega 4 C al consumir 90 J."
    },
    p22: {
      type: "voltage", v: "", vu: "1", w: "40", wu: "1", q: "", qu: "1", n: "", i: "200", iu: "0.001", t: "30", tu: "1",
      desc: "Prob. 22 — Q = I t = 0.2 · 30 = 6 C. V = W/Q = 40 / 6 = 6.667 V.\nCaída de 6.67 V en un conductor a 200 mA: en un cable fotovoltaico de 4 mm² sería señal de unión defectuosa, no de resistencia del tramo."
    },
    p23: {
      type: "voltage", v: "", vu: "1", w: "742", wu: "1", q: "", qu: "1", n: "", i: "7", iu: "1", t: "30", tu: "1",
      desc: "Prob. 23 — 420 C/min = 7 A. Q = 7 · 30 = 210 C. V = 742 / 210 = 3.533 V.\n3.53 V a 7 A es la caída de un tramo largo de Al o de un fusible caliente en un combinador."
    },
    p24: {
      type: "voltage", v: "24", vu: "1", w: "0.4", wu: "1", q: "", qu: "1", n: "", i: "", iu: "1", t: "5", tu: "0.001",
      desc: "Prob. 24 — Q = W/V = 0.4 / 24 = 0.01667 C. I = Q/t = 0.01667 / 0.005 = 3.333 A.\nUn bus de 24 V (auxiliares de inversor o tracker) disipa 0.4 J en 5 ms a 3.33 A: un transitorio de conmutación, no la corriente permanente."
    }
  },
  "2-4": {
    p25: {
      type: "ah", ah: "200", i: "", t: "40", tu: "1", v: "",
      desc: "Prob. 25 — I = Ah / t = 200 / 40 = 5 A.\nUn BESS de 200 Ah puede entregar 5 A durante 40 h (C/40). En un rack de 400 V eso son 2 kW continuos: respaldo de auxiliares de planta, no de un inversor central."
    },
    p26: {
      type: "ah", ah: "", i: "0.8", t: "76", tu: "1", v: "",
      desc: "Prob. 26 — Ah = I t = 0.8 · 76 = 60.8 Ah.\nCapacidad de un banco auxiliar de 12–48 V para comunicaciones y protecciones de un parque."
    },
    p27: {
      type: "ah", ah: "32", i: "1.28", t: "", tu: "1", v: "",
      desc: "Prob. 27 — t = Ah / I = 32 / 1.28 = 25 h.\nUn banco de 32 Ah a 1.28 A (C/25) cubre un día de telemetría de un met mast o de un PPC."
    },
    p28: {
      type: "text",
      desc: "Prob. 28 — Recastado a un rack LFP de 51.2 V (el original pedía la figura 2.18 de una BH 500).\nA 25 °C: 50 A durante 2.4 h → 120 Ah (120 000 mAh).\nA 0 °C: 50 A durante 1.85 h → 92.5 Ah (92 500 mAh).\nEl frío recorta ~23 % de la capacidad: el mismo derating que obliga a climatizar o sobredimensionar un BESS de clima continental."
    },
    p29: {
      type: "ah", ah: "120", i: "550", t: "", tu: "1", v: "51.2",
      desc: "Prob. 29 — Rack de 120 Ah descargado a 550 A (arranque de una bomba solar o pico de un inversor híbrido).\nt = 120 / 550 = 0.218 h = 13.1 min.\nEnergía = 51.2 · 120 = 6.144 kWh. A 550 A el C-rate es 4.6 C: solo admisible unos minutos en LFP de alta potencia."
    },
    p30: {
      type: "text",
      desc: "Prob. 30 — Banco de 150 Ah (equivalente renovable de la fig. 2.19).\nA 50 A: t = 150/50 = 3.0 h.\nA 150 A: t = 150/150 = 1.0 h.\nRazón de corrientes 3:1; razón de horas 3:1 si Peukert = 1.\nEn la práctica n≈1.05–1.15 (LFP) y las horas a 150 A bajan de 1 h: más corriente, menos Ah útiles. El EMS limita el C-rate para no comerse esa diferencia."
    },
    p31: {
      type: "text",
      desc: "Prob. 31 — Dos bancos auxiliares de 12 V (arranque de inversor híbrido / backup de planta).\nE = V · Ah · 3600.\n40 Ah → 1.728×10⁶ J = 0.480 kWh.\n60 Ah → 2.592×10⁶ J = 0.720 kWh.\nLa de 60 Ah guarda 50 % más energía y suele entregar más corriente de arranque (CCA). Mismo voltaje, distinta autonomía y distinto pico."
    },
    p32: {
      type: "ah", ah: "2.5", i: "", t: "", tu: "1", v: "3.2",
      desc: "Prob. 32 — Celda LFP 3.2 V, 2.5 Ah (equivalente contemporáneo de la Eveready de la fig. 2.15).\nW = 3.2 · 2.5 · 3600 = 28 800 J = 0.008 kWh.\nUn módulo de 16 celdas en serie (51.2 V) con esa capacidad guarda 128 Wh: un módulo pequeño de BESS residencial."
    },
    p33: {
      type: "ah", ah: "3", i: "", t: "5.5", tu: "1", v: "12",
      desc: "Prob. 33 — Logger de recurso 12 V, 3 Ah, 5.5 h (el original era un televisor portátil).\nI = 3 / 5.5 = 0.545 A.\nW = 12 · 3 · 3600 = 129 600 J = 0.036 kWh.\nEs la autonomía de un datalogger de torre eólica o de una estación solarimétrica entre visitas de O&M."
    },
    p34: {
      type: "text",
      desc: "Prob. 34 — Tres fuentes de cd en una planta renovable.\n1) Batería (celda secundaria): energía química reversible. El BESS LFP/NMC/sodio-ion o de flujo. Voltaje casi plano, Ah finitos, se recarga desde PV, eólica o red.\n2) Rectificación: un puente de diodos o de IGBT convierte la ca del generador eólico/hidro en el bus de cd. No almacena; solo cambia de forma la energía que está pasando.\n3) Generador de cd: históricamente una dinamo. Hoy es el PMSG del aerogenerador más el rectificador, o la propia curva I–V del módulo fotovoltaico.\nSe parecen en que entregan cd. Se diferencian en el almacén (solo la batería), en la primicia (química, mecánica, lumínica) y en si el voltaje o la corriente es lo rígido."
    },
    p35: {
      type: "text",
      desc: "Prob. 35 — Fuente de corriente de cd vs fuente de voltaje de cd.\nVoltaje: impone V; I la fija la carga. BESS, red, bus regulado del inversor.\nCorriente: impone I; V la fija la carga. El módulo FV cerca de Isc; un inversor en modo corriente (grid-following).\nSe parecen: ambas entregan potencia P = V I y pueden ser de cd. Se diferencian en la variable rígida y en el comportamiento en cortocircuito (la de corriente sostiene I; la de voltaje dispara I y debe protegerse).\nUn módulo recorre las dos: corriente cerca de Isc, voltaje cerca de Voc; el MPPT se sienta en el codo."
    }
  },
  "2-5": {
    p36: {
      type: "text",
      desc: "Prob. 36 — Dos propiedades atómicas del cobre que lo hacen conductor.\n1) Configuración [Ar] 3d¹⁰ 4s¹: un único electrón de valencia, débilmente ligado, que se convierte en electrón libre de la red FCC.\n2) Baja energía de ionización y alta densidad de portadores (~8.5×10²⁸ m⁻³) → σ ≈ 5.8×10⁷ S/m.\nPor eso el Cu es pletina de inversor, devanado de transformador de evacuación y conductor de tierra. El Al lo sustituye en cables largos porque pesa y cuesta menos, a costa de más sección."
    },
    p37: {
      type: "text",
      desc: "Prob. 37 — Dos conductores que no suelen aparecer en la tabla 2.1 del libro y sí en renovables.\n1) Plata: pasta de la rejilla frontal de la celda (la menor resistividad de los metales).\n2) Aleaciones de aluminio AA-8000: conductor de los cables fotovoltaicos y de las líneas de media tensión.\nOtros: grafito/grafeno en contactos y bipolares de flujo; cobre estañado en barras de BESS."
    },
    p38: {
      type: "text",
      desc: "Prob. 38 — Aislante: material en el que hace falta un voltaje muy alto para producir un flujo de corriente medible.\nFuerza de ruptura: campo eléctrico (kV/mm) al que el aislante se ioniza y deja de aislar.\nXLPE ≈ 20–40 kV/mm, vidrio solar ≈ 10 kV/mm, aire seco ≈ 3 kV/mm. A 1500 Vcc las distancias de fuga, el creepage del conector MC4 y el espesor del backsheet se dimensionan contra esa cifra, no contra el voltaje nominal."
    },
    p39: {
      type: "text",
      desc: "Prob. 39 — Tres usos de aislantes en renovables (además de los clásicos del libro).\n1) Encapsulante EVA/POE y vidrio del módulo: aíslan las celdas de 60–80 V y del marco puesto a tierra.\n2) XLPE / HEPR de cables de string y de 33 kV: aíslan el conductor de Al del terreno y del agua.\n3) Cerámica o composite de seccionadores y pasatapas del transformador de evacuación: aíslan media tensión a la intemperie.\nBonus: el aire entre filas y el vano de la línea aérea también es aislante de diseño."
    }
  },
  "2-6": {
    p40: {
      type: "text",
      desc: "Prob. 40 — Un semiconductor tiene conductancia entre la de un aislante y la de un conductor. Su conductividad se controla con dopaje, temperatura y luz.\nConductor (Cu): σ ~ 10⁷ S/m, electrones siempre libres.\nAislante (XLPE): σ ~ 10⁻¹⁴ S/m, electrones atados.\nSemiconductor (Si): σ ~ 10⁻³ (puro) a 10²–10⁴ S/m (dopado).\nEsa ventana es la celda fotovoltaica y el interruptor de potencia del inversor."
    },
    p41: {
      type: "text",
      desc: "Prob. 41 — Si, Ge y los de banda ancha en el siglo XXI.\nSilicio: Eg ≈ 1.12 eV, abundante, maduro. Es la celda c-Si (PERC, TOPCon, HJT) y el IGBT de 600–1700 V.\nGermanio: Eg ≈ 0.66 eV, más portadores intrínsecos, peor a temperatura. Fue el primer transistor; hoy es substrato o unión inferior de algunos tándems espaciales, no de planta.\nSiC (Eg ≈ 3.26 eV) y GaN (Eg ≈ 3.4 eV): más campo de ruptura, menos pérdidas de conmutación, más temperatura de unión. Dominan inversores string, centrales y convertidores eólicos de esta década."
    }
  },
  "2-7": {
    p42: {
      type: "text",
      desc: "Prob. 42 — Diferencias de conexión.\nAmperímetro: en SERIE con el elemento. Resistencia interna muy baja para no alterar I. En cd: shunt o Hall en el cable de string, en el BESS o en el inversor. En ca: TC en el punto de conexión.\nVoltímetro: en PARALELO entre los dos puntos. Resistencia interna muy alta para no derivar I. Mide Voc, Vbus, tensión de polo a tierra o tensión de red (TT/TP).\nConfundirlos es el error clásico: un amperímetro en paralelo es un cortocircuito; un voltímetro en serie no deja pasar la corriente de consigna."
    },
    p43: {
      type: "meter", i: "2.5", iu: "1", v: "", t: "4", tu: "60",
      desc: "Prob. 43 — I = 2.5 A, t = 4 min = 240 s.\nQ = I t = 600 C.\nEl sensor de un string o de un ramal de BESS que lee 2.5 A durante 4 min ha dejado pasar 600 C — dato que el EMS integra para el SoC."
    },
    p44: {
      type: "meter", i: "10", iu: "0.001", v: "12.5", t: "20", tu: "1",
      desc: "Prob. 44 — V = 12.5 V, I = 10 mA, t = 20 s.\nQ = 0.01 · 20 = 0.2 C.\nW = V I t = 12.5 · 0.01 · 20 = 2.5 J.\nEs la energía de un canal auxiliar (control de tracker, electrónica de un microinversor en standby) durante 20 s."
    }
  },
  "3-2": {
    p1a: { fields: { "c3-d": "0.5", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 1.a — 0.5 pulg → mils.\n1 pulg = 1000 mils. 0.5 × 1000 = 500 mils.\nEs el orden del diámetro de un AWG 0 (325 mils) o de una pletina redondeada de un seccionador de 1500 Vcc." },
    p1b: { fields: { "c3-d": "0.01", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 1.b — 0.01 pulg = 10 mils. Diámetro de un AWG 10 (≈ 102 mils es diez veces mayor): 10 mils es un alambre de señal, no de string." },
    p1c: { fields: { "c3-d": "0.004", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 1.c — 0.004 pulg = 4 mils. Grosor de un dedo de plata (o cobre 2026) en la rejilla frontal de una celda TOPCon." },
    p1d: { fields: { "c3-d": "1", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 1.d — 1 pulg = 1000 mils. Barra de 1 pulg de diámetro: el orden de un bus de ca de un inversor central o de un cable de tierra de subestación." },
    p1e: { fields: { "c3-d": "0.02", "c3-acm": "" }, selects: { "c3-d-u": "12000" }, click: "btn-mils-3-2",
      desc: "Prob. 1.e — 0.02 pies = 0.24 pulg = 240 mils (AWG 3 ≈ 229 mils). Un conductor de ~100 A." },
    p1f: { fields: { "c3-d": "0.01", "c3-acm": "" }, selects: { "c3-d-u": "393.7007874" }, click: "btn-mils-3-2",
      desc: "Prob. 1.f — 0.01 cm = 0.1 mm = 3.937 mils. Hilo de un sensor o de un bonding de un módulo SiC, no de potencia." },
    p2a: { fields: { "c3-d": "0.050", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 2.a — d = 0.050 pulg = 50 mils. A_CM = d_mils² = 2500 CM." },
    p2b: { fields: { "c3-d": "0.016", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 2.b — 16 mils → A = 256 CM (AWG 28, señal)." },
    p2c: { fields: { "c3-d": "0.30", "c3-acm": "" }, selects: { "c3-d-u": "1000" }, click: "btn-mils-3-2",
      desc: "Prob. 2.c — 300 mils → A = 90 000 CM. Entre AWG 1 (83 690) y 1/0 (105 600): ~130–150 A." },
    p2d: { fields: { "c3-d": "0.1", "c3-acm": "" }, selects: { "c3-d-u": "393.7007874" }, click: "btn-mils-3-2",
      desc: "Prob. 2.d — 0.1 cm = 1 mm ≈ 39.37 mils. A ≈ 1550 CM (cerca de AWG 18, 1624 CM)." },
    p2e: { fields: { "c3-d": "0.003", "c3-acm": "" }, selects: { "c3-d-u": "12000" }, click: "btn-mils-3-2",
      desc: "Prob. 2.e — 0.003 pies = 36 mils. A = 1296 CM." },
    p2f: { fields: { "c3-d": "0.0042", "c3-acm": "" }, selects: { "c3-d-u": "39370.07874" }, click: "btn-mils-3-2",
      desc: "Prob. 2.f — 0.0042 m = 4.2 mm ≈ 165.4 mils. A ≈ 27 340 CM (AWG 6 = 26 250 CM): cable de string de 6 mm²." },
    p3a: { fields: { "c3-d": "", "c3-acm": "1600" }, click: "btn-mils-3-2",
      desc: "Prob. 3.a — A = 1600 CM → d = √1600 = 40 mils = 0.040 pulg." },
    p3b: { fields: { "c3-d": "", "c3-acm": "900" }, click: "btn-mils-3-2",
      desc: "Prob. 3.b — d = 30 mils = 0.030 pulg." },
    p3c: { fields: { "c3-d": "", "c3-acm": "40000" }, click: "btn-mils-3-2",
      desc: "Prob. 3.c — d = 200 mils = 0.200 pulg (AWG 4 ≈ 204 mils, 85 A)." },
    p3d: { fields: { "c3-d": "", "c3-acm": "625" }, click: "btn-mils-3-2",
      desc: "Prob. 3.d — d = 25 mils = 0.025 pulg." },
    p3e: { fields: { "c3-d": "", "c3-acm": "7.75" }, click: "btn-mils-3-2",
      desc: "Prob. 3.e — d = 2.78 mils = 0.00278 pulg. Un bonding, no un string." },
    p3f: { fields: { "c3-d": "", "c3-acm": "81" }, click: "btn-mils-3-2",
      desc: "Prob. 3.f — d = 9 mils = 0.009 pulg." },
    p4: { fields: { "c3-rho": "", "c3-L": "200", "c3-rd": "0.01", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "" },
      selects: { "c3-mat": "cu", "c3-L-u": "1", "c3-rd-u": "1000" }, click: "btn-res-3-2",
      desc: "Prob. 4 — Cobre, L = 200 pies, d = 0.01 pulg, T = 20 °C.\nA = 10² = 100 CM. R = ρ L / A = 10.37 · 200 / 100 = 20.74 Ω.\nUn cable tan fino en 200 pies no sirve de string: un H1Z2Z2-K de 6 mm² en 200 pies queda en miliohmios, no en decenas de ohmios." },
    p5: { fields: { "c3-L": "50", "c3-rd": "0.0045", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "" },
      selects: { "c3-mat": "ag", "c3-L-u": "3", "c3-rd-u": "1000" }, click: "btn-res-3-2",
      desc: "Prob. 5 — Plata, 50 yardas = 150 pies, d = 0.0045 pulg = 4.5 mils.\nA = 20.25 CM. R = 9.9 · 150 / 20.25 = 73.33 Ω.\nLa plata es el metal más conductor, pero 4.5 mils en 150 pies es un hilo de rejilla, no un feeder." },
    p6: { fields: { "c3-L": "80", "c3-rd": "", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "2.5" },
      selects: { "c3-mat": "al", "c3-L-u": "1" }, click: "btn-res-3-2",
      desc: "Prob. 6 — Aluminio, L = 80 pies, R = 2.5 Ω.\nA = ρ L / R = 17 · 80 / 2.5 = 544 CM. d = √544 = 23.32 mils = 0.0233 pulg.\nb) Ese diámetro es un AWG 22: señal, no potencia. Un AA-8000 de string usa 4–10 mm²." },
    p7: { fields: { "c3-L": "", "c3-rd": "0.03125", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "2.2" },
      selects: { "c3-mat": "nichrome", "c3-rd-u": "1000" }, click: "btn-res-3-2",
      desc: "Prob. 7 — Cromoníquel, 2.2 Ω, d = 1/32 pulg = 31.25 mils.\nA = 976.6 CM. L = R A / ρ = 2.2 · 976.6 / 600 = 3.58 pies.\nEl cromoníquel (NiCr) es el alambre de un reóstato o de un banco de carga: ρ ≈ 60 veces la del cobre, así que pocos pies bastan." },
    p8: { fields: { "c3-L": "300", "c3-rd": "", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "2.5" },
      selects: { "c3-mat": "cu", "c3-L-u": "1" }, click: "btn-res-3-2",
      desc: "Prob. 8.a — Cobre, 2.5 Ω, 300 pies. A = 10.37 · 300 / 2.5 = 1244 CM. d = 35.3 mils = 0.0353 pulg.\nb) Sin calcular: el aluminio tiene ρ mayor (17 vs 10.37), así que para el mismo R y L necesita más área.\nc) La plata tiene ρ menor (9.9): necesita un poco menos de área que el cobre." },
    p9: { fields: { "c3-L": "1", "c3-rd": "1", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "" },
      selects: { "c3-mat": "ag", "c3-L-u": "1", "c3-rd-u": "1" }, click: "btn-res-3-2",
      desc: "Prob. 9 — Fig. 3.45, T = 20 °C.\na) Sin números: la plata es un hilo de 1 mil × 1 pie (A = 1 CM). El cobre tiene 100 veces más área y 10 veces más largo (R cae 10 veces). El aluminio tiene 2500 CM y 50 pies. Gana la geometría: la plata, pese a ρ mínima, tiene la mayor R.\nb) Plata: R = 9.9 · 1 / 1 = 9.90 Ω.\nCobre: R = 10.37 · 10 / 100 = 1.037 Ω.\nAluminio: R = 17 · 50 / 2500 = 0.340 Ω.\nEn 2026 la lección es la misma: un finger de plata de 4 mils en la celda puede valer más ohmios que un cable de Al de 10 mm²." },
    p10: { fields: { "c3-L": "1000", "c3-rd": "", "c3-w": "", "c3-th": "", "c3-A": "94", "c3-R": "500" },
      selects: { "c3-mat": "custom", "c3-L-u": "1" }, click: "btn-res-3-2",
      desc: "Prob. 10 — L = 1000 pies, R = 0.5 kΩ = 500 Ω, A = 94 CM, T = 20 °C.\nρ = R A / L = 500 · 94 / 1000 = 47 CM·Ω/pie → níquel.\nEl níquel aparece en aleaciones de termopar, en recubrimientos y en algunos shunts; no es el conductor de un string." },
    p11: { fields: { "c3-L": "4", "c3-rd": "", "c3-w": "3", "c3-th": "0.5", "c3-A": "", "c3-R": "" },
      selects: { "c3-mat": "cu", "c3-L-u": "1", "c3-w-u": "1000", "c3-th-u": "1000" }, click: "btn-res-3-2",
      desc: "Prob. 11 — Placa fig. 3.46: 4 pies × 3 pulg × ½ pulg, T = 20 °C.\nA_CM = (3000 · 500) / (π/4) = 1.910×10⁶ CM.\na) Cobre: R = 10.37 · 4 / 1.910e6 = 2.17×10⁻⁵ Ω.\nb) Aluminio: R = 17 · 4 / 1.910e6 = 3.56×10⁻⁵ Ω, ~1.64 veces el cobre (17/10.37).\nc) Sin números: al crecer L, R crece (R ∝ L). Una pletina más larga entre inversor y transformador pierde más I²R.\nd) Al crecer A, R cae (R ∝ 1/A). Engrosar el busbar o poner pletinas en paralelo baja la caída de tensión." },
    p12: {
      desc: "Prob. 12 — Cobre, R₀ = 0.2 Ω. El área se reduce por 4 (A₂ = A/4) y la longitud se duplica (L₂ = 2L). T constante.\nR ∝ L / A → R₂ / R₁ = (2) / (1/4) = 8.\nR₂ = 1.6 Ω. Incremento = 1.4 Ω.\nEs el accidente de un string mal calibreado (sección 4 veces menor) y de un tendido el doble de largo: las pérdidas I²R se multiplican por 8." },
    p13: { fields: { "c3-L": "100", "c3-rd": "", "c3-w": "", "c3-th": "", "c3-A": "", "c3-R": "" },
      selects: { "c3-mat": "cu", "c3-L-u": "3" },
      desc: "Prob. 13 — Cobre. L: 200 pies → 100 yardas = 300 pies. A: 40 000 CM → 0.04 pulg².\n1 pulg² = 1.2732×10⁶ CM → 0.04 pulg² = 50 930 CM.\nR_orig = 800 mΩ = 0.8 Ω.\nR₂ / R₁ = (L₂/L₁)(A₁/A₂) = (300/200)(40000/50930) = 1.5 × 0.7854 = 1.178.\nR₂ = 0.942 Ω.\nAlargar el tendido sube R; abrir la sección (de 40 000 a 50 930 CM) la baja un poco. Gana el alargamiento." }
  },
  "3-3": {
    p14: { fields: { "awg-L": "450", "awg-Rmax": "", "awg-Imax": "" }, selects: { "awg-pick": "11" }, click: "btn-awg-3-3",
      desc: "Prob. 14 — 450 pies de cobre AWG 11 y 14.\na) R = (Ω/1000 pies) × 0.450.\nAWG 11: 1.260 × 0.45 = 0.567 Ω.\nAWG 14: 2.525 × 0.45 = 1.136 Ω.\nb) R₁₄ / R₁₁ ≈ 2.00. Tres números AWG duplican la resistencia.\nc) A₁₁ / A₁₄ = 8234 / 4107 ≈ 2.00. La misma regla: cada 3 calibres, el área se parte a la mitad." },
    p15: { fields: { "awg-L": "1800" }, selects: { "awg-pick": "8" }, click: "btn-awg-3-3",
      desc: "Prob. 15 — 1800 pies, AWG 8 y 18.\na) R₈ = 0.6282 × 1.8 = 1.131 Ω. R₁₈ = 6.385 × 1.8 = 11.49 Ω.\nb) R₁₈ / R₈ ≈ 10.2 (diez números AWG ≈ 10 veces R).\nc) A₈ / A₁₈ = 16 510 / 1624 ≈ 10.2. El AWG 8 lleva un string o un ramal de BESS; el 18 es señal / control." },
    p16a: { fields: { "awg-L": "30", "awg-Rmax": "0.006", "awg-Imax": "110" }, selects: { "awg-pick": "" }, click: "btn-awg-3-3",
      desc: "Prob. 16.a — Fig. 3.47: cada conductor, L = 30 pies, R ≤ 0.006 Ω, I ≤ 110 A.\nA mín = ρ L / R = 10.37 · 30 / 0.006 = 51 850 CM → AWG 3 (52 620 CM) por resistencia.\nPor ampacidad 110 A: AWG 2 (115 A); AWG 3 solo 100 A.\nHay que usar AWG 2. En un parque es el cable de ca entre un inversor string y el tablero, no el de cd (ese va en mm²)." },
    p16b: { fields: { "awg-L": "30", "awg-Rmax": "0.003", "awg-Imax": "110" }, selects: { "awg-pick": "" }, click: "btn-awg-3-3",
      desc: "Prob. 16.b — R ≤ 0.003 Ω, L = 30 pies, 110 A.\nA mín = 10.37 · 30 / 0.003 = 103 700 CM → AWG 1/0 (105 600 CM, 150 A).\nBajar R a la mitad obliga a subir dos calibres: la caída de tensión, no la ampacidad, manda el calibre en tendidos largos." },
    p17: { fields: { "awg-L": "1000" }, selects: { "awg-pick": "4/0" }, click: "btn-awg-3-3",
      desc: "Prob. 17 — AWG 0000 (4/0): 230 A, 211 600 CM.\na) J = 230 / 211 600 = 1.087×10⁻³ A/CM.\nb) 1 pulg² = 1.2732×10⁶ CM → J = 1384 A/pulg².\nc) Para 5000 A: A = 5000 / 1384 = 3.61 pulg².\nUn inversor central de 5 kA de barras usa pletinas de cobre de varios miles de mm², no un solo 4/0." }
  },
  "3-4": {
    p18: { fields: { "m3-rho": "1.724e-8", "m3-L": "", "m3-d": "0.1", "m3-W": "", "m3-Rs": "", "m3-R": "0.2", "m3-eng": "" },
      selects: { "m3-rho-u": "1", "m3-d-u": "0.0254" }, click: "btn-metric-3-4",
      desc: "Prob. 18 — Cobre, R = 0.2 Ω, d = 1/10 pulg = 2.54 mm. ρ = 1.724×10⁻⁸ Ω·m.\nA = π (1.27×10⁻³)² = 5.067×10⁻⁶ m².\nL = R A / ρ = 0.2 · 5.067e-6 / 1.724e-8 = 58.8 m.\nEn inglés: A = 10 000 CM, L = 0.2 · 10 000 / 10.37 = 192.9 pies = 58.8 m." },
    p19: { fields: { "m3-rho": "1.724e-8", "m3-L": "1.2192", "m3-d": "0.0127", "m3-W": "0.0762", "m3-Rs": "", "m3-R": "", "m3-eng": "10.37" },
      selects: { "m3-rho-u": "1", "m3-L-u": "1", "m3-d-u": "1", "m3-W-u": "1" }, click: "btn-metric-3-4",
      desc: "Prob. 19 — Placa 4 pies × 3 pulg × ½ pulg en SI.\nL = 1.219 m, A = 0.0127 × 0.0762 = 9.677×10⁻⁴ m².\nCobre: R = 1.724e-8 · 1.219 / 9.677e-4 = 2.17×10⁻⁵ Ω (igual que el 11).\nAluminio (ρ = 2.83×10⁻⁸): R = 3.56×10⁻⁵ Ω." },
    p20: { fields: { "m3-rho": "1e-5", "m3-L": "", "m3-d": "", "m3-W": "", "m3-Rs": "100", "m3-R": "", "m3-eng": "" },
      selects: { "m3-rho-u": "1" }, click: "btn-metric-3-4",
      desc: "Prob. 20 — Resistencia laminar de óxido de estaño Rs = 100 Ω/□.\nRs = ρ / d → d = ρ / Rs.\nUn TCO (SnO2/FTO/ITO) de planta o de un módulo de capa fina tiene ρ ~ 10⁻⁵ a 10⁻⁴ Ω·m.\nCon ρ = 10⁻⁵ Ω·m: d = 10⁻⁵ / 100 = 100 nm.\nEs el espesor de la capa transparente del vidrio solar, no el del encapsulante." },
    p21: { fields: { "m3-rho": "", "m3-L": "0.5", "m3-d": "", "m3-W": "", "m3-Rs": "150", "m3-R": "500", "m3-eng": "" },
      selects: { "m3-L-u": "0.0254", "m3-W-u": "0.0254" }, click: "btn-metric-3-4",
      desc: "Prob. 21 — Carbono, Rs = 150 Ω/□, L = 1/2 pulg, R = 500 Ω.\nR = Rs L / W → W = Rs L / R = 150 · 0.5 / 500 = 0.150 pulg.\nUna película de 150 mils de ancho por 500 mils de largo. Es el recorte de un resistor SMD, no de un shunt de BESS." },
    p22: { fields: { "m3-rho": "", "m3-L": "1000", "m3-d": "1", "m3-W": "", "m3-Rs": "", "m3-R": "0.001", "m3-eng": "" },
      selects: { "m3-L-u": "0.3048", "m3-d-u": "0.0254" }, click: "btn-metric-3-4",
      desc: "Prob. 22 — Fig. 3.48: d = 1 pulg, L = 1000 pies, R = 1 mΩ.\na) A = 1000² = 1.00×10⁶ CM. ρ_eng = R A / L = 0.001 · 1e6 / 1000 = 1.00 CM·Ω/pie.\nb) A = π (1.27 cm)² = 5.067 cm², L = 30 480 cm. ρ = 0.001 · 5.067 / 30 480 = 1.662×10⁻⁷ Ω·cm.\nc) k = ρ₂ / ρ₁ = 1.662×10⁻⁷ Ω·cm por cada CM·Ω/pie." }
  },
  "3-5": {
    p23: { fields: { "t3-alpha": "", "t3-R1": "2", "t3-T1": "10", "t3-R2": "", "t3-T2": "60" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 23 — Cobre, 2 Ω a 10 °C → 60 °C.\nT_inf = −234.5 °C. R₂ = 2 · (60+234.5)/(10+234.5) = 2 · 294.5/244.5 = 2.409 Ω.\n+20 % de R en 50 K: un cable de string en el desierto no es el de la ficha a 20 °C." },
    p24: { fields: { "t3-R1": "0.02", "t3-T1": "0", "t3-R2": "", "t3-T2": "100" },
      selects: { "t3-mat": "al", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 24 — Aluminio, 0.02 Ω a 0 °C → 100 °C.\nα20 = 0.00391, T_inf ≈ −235.8 °C.\nR₂ = 0.02 · (100+235.8)/(0+235.8) = 0.0285 Ω.\nUn AA-8000 al sol (módulo a 75–85 °C) pierde más I²R que en la tabla." },
    p25: { fields: { "t3-R1": "4", "t3-T1": "70", "t3-R2": "", "t3-T2": "32" },
      selects: { "t3-mat": "cu", "t3-T1-u": "F", "t3-T2-u": "F" }, click: "btn-temp-3-5",
      desc: "Prob. 25 — Cobre, 4 Ω a 70 °F → 32 °F.\n70 °F = 21.11 °C, 32 °F = 0 °C.\nR₂ = 4 · (0+234.5)/(21.11+234.5) = 3.67 Ω.\nAl enfriar, el cobre conduce mejor: un tendido nocturno en el desierto cae unos pocos por ciento." },
    p26: { fields: { "t3-R1": "0.76", "t3-T1": "30", "t3-R2": "", "t3-T2": "-40" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 26 — Cobre, 0.76 Ω a 30 °C → −40 °C.\nR₂ = 0.76 · (−40+234.5)/(30+234.5) = 0.76 · 194.5/264.5 = 0.559 Ω." },
    p27: { fields: { "t3-R1": "0.04", "t3-T1": "-30", "t3-R2": "", "t3-T2": "0" },
      selects: { "t3-mat": "ag", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 27 — Plata, 0.04 Ω a −30 °C → 0 °C.\nα20 = 0.0038, T_inf ≈ −243.2 °C.\nR₂ = 0.04 · (0+243.2)/(−30+243.2) = 0.0456 Ω.\nLa pasta de la celda también sube R al calentarse; por eso el fill factor cae con la temperatura de módulo." },
    p28: { fields: { "t3-R1": "0.002", "t3-T1": "68", "t3-R2": "", "t3-T2": "32" },
      selects: { "t3-mat": "cu", "t3-T1-u": "F", "t3-T2-u": "F" }, click: "btn-temp-3-5",
      desc: "Prob. 28.a — Cobre 0.002 Ω a 68 °F (20 °C).\n32 °F = 0 °C: R = 0.002 · 234.5/254.5 = 1.843 mΩ.\n212 °F = 100 °C: R = 0.002 · 334.5/254.5 = 2.628 mΩ.\nb) De 68 °F a 212 °F, ΔR = 0.628 mΩ en 144 °F = 14.4 pasos de 10 °F → 43.6 µΩ por cada 10 °F (o 78.5 µΩ por cada 10 °C)." },
    p29: { fields: { "t3-R1": "0.92", "t3-T1": "4", "t3-R2": "1.06", "t3-T2": "" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 29.a — Cobre, 0.92 Ω a 4 °C → 1.06 Ω.\n1.06/0.92 = (T+234.5)/(4+234.5) → T = 40.3 °C.\nb) A 0.15 Ω: 0.15/0.92 = (T+234.5)/238.5 → T = −195.6 °C, ya cerca del nitrógeno líquido, no de una planta." },
    p30: { fields: { "t3-R1": "10", "t3-T1": "20", "t3-R2": "", "t3-T2": "50" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "K" }, click: "btn-temp-3-5",
      desc: "Prob. 30.a — 10 Ω a 20 °C → 50 K = −223.15 °C.\nR = 10 · (−223.15+234.5)/254.5 = 0.446 Ω.\nb) 38.65 K = −234.5 °C = T_inf del cobre → R → 0 en el modelo lineal. La curva real (fig. 3.14) se desvía: el cobre no es superconductor; a 4 K aún tiene R residual.\nc) Cero absoluto: −459.67 °F." },
    p31: { fields: { "t3-R1": "0.8", "t3-T1": "20", "t3-R2": "1", "t3-T2": "" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 31.a — α20 = 1 / (20 − T_inf) = 1 / (20+234.5) = 1/254.5 = 0.003929 ≈ 0.00393. Verificado.\nb) 0.8 Ω a 20 °C → 1 Ω: T = 20 + (1/0.8 − 1)/0.00393 = 83.6 °C.\nUn busbar de inversor a 83 °C ya está en el límite de un XLPE de 90 °C." },
    p32: { fields: { "t3-R1": "0.4", "t3-T1": "20", "t3-R2": "", "t3-T2": "16" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 32 — Cobre, 0.4 Ω a 20 °C → 16 °C.\nR = 0.4 · (16+234.5)/254.5 = 0.394 Ω." },
    p33: { fields: { "t3-R1": "1.588", "t3-T1": "20", "t3-R2": "", "t3-T2": "115" },
      selects: { "t3-mat": "cu", "t3-T1-u": "C", "t3-T2-u": "F" }, click: "btn-temp-3-5",
      desc: "Prob. 33 — 1000 pies AWG 12 de cobre en el desierto a 115 °F.\nR20 = 1.588 Ω/1000 pies. 115 °F = 46.11 °C.\nR = 1.588 · (46.11+234.5)/254.5 = 1.751 Ω.\n+10 % de pérdidas I²R respecto a la ficha: en un parque del Atacama hay que modelar el cable a temperatura de operación, no a 20 °C." },
    p34: { fields: { "t3-alpha": "200", "t3-R1": "22", "t3-T1": "20", "t3-R2": "", "t3-T2": "65" },
      selects: { "t3-mat": "custom", "t3-alpha-u": "1e-6", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 34 — 22 Ω bobinado, +200 PPM/°C, de −10 a +75 °C. A 65 °C (referencia 20 °C):\nα = 200×10⁻⁶. R = 22 [1 + 200e-6 · (65−20)] = 22.198 Ω.\nUn shunt de BESS de 50 ppm se movería 12 veces menos: por eso 2026 especifica ppm, no solo ohmios." },
    p35: { fields: { "t3-alpha": "-500", "t3-R1": "10000", "t3-T1": "20", "t3-R2": "", "t3-T2": "90" },
      selects: { "t3-mat": "carbon", "t3-alpha-u": "1e-6", "t3-T1-u": "C", "t3-T2-u": "C" }, click: "btn-temp-3-5",
      desc: "Prob. 35 — Carbono 10 kΩ (fig. 3.19) a 90 °C. α20 ≈ −0.0005 = −500 PPM/°C.\nR(90) = 10000 [1 − 0.0005 · 70] = 9650 Ω.\nClasificación ≈ −500 PPM/°C (negativa). El carbono no se usa como shunt de planta precisamente por ese coeficiente." }
  },
  "3-6": {
    p36: {
      desc: "Prob. 36 — Cinco materiales con Tc altas, más allá del Hg histórico.\n1) YBCO / REBCO: Tc ≈ 93 K. Cintas comerciales 2026 para imanes de fusión (CFS, ITER TF) y cables HTS urbanos.\n2) BSCCO-2223: Tc ≈ 110 K. Primera generación de cable HTS; se retira en favor de REBCO.\n3) MgB₂: Tc ≈ 39 K. Barato, ligero; líneas piloto y algunos SMES.\n4) Nb₃Sn: Tc ≈ 18 K. Imanes de alto campo (tokamak, NMR).\n5) NbTi: Tc ≈ 9.6 K. El caballo de MRI y de la red de helio. Relativamente «alto» frente a 4 K de operación.\nLa tendencia 2026 es subir Tc y campo a la vez: REBCO a 20 K / 20 T, no volver al mercurio." },
    p37: {
      desc: "Prob. 37 — Superconductividad comercial en 2026.\n• Cables HTS de media tensión en núcleos urbanos (AmpaCity, SuperNode, proyectos de TSO europeos y chinos): más potencia en la misma zanja, casi sin I²R.\n• Generador eólico EcoSwing (3.6 MW, imán HTS): menos tierra rara, menos masa en góndola.\n• Imanes de fusión compacta (REBCO) que persiguen net energy.\n• MRI de NbTi, el mercado más maduro.\n• SMES nicho para huecos de tensión de plantas. El hecho central: el HTS ya no es solo laboratorio; el cuello es el coste del criostato y de la cinta, no la física del par de Cooper." },
    p38: { fields: { "sc-J": "1e6" }, selects: { "sc-J-u": "1", "sc-awg": "12" }, click: "btn-sc-3-6",
      desc: "Prob. 38 — J = 1 MA/cm² (densidad de un IC o de una cinta HTS local) en un AWG 12.\nA_12 ≈ 0.0331 cm². I = 1e6 · 0.0331 ≈ 33 100 A.\nLa tabla 3.2 permite 20 A. Factor ≈ 1650:1.\nPor eso el silicio de un microchip y la cinta REBCO trabajan en micras y en criogenia; el cable de planta, a 2–6 A/mm² en cobre al aire." },
    p39: {
      desc: "Prob. 39 — SQUID (Superconducting Quantum Interference Device).\nUn anillo superconductor con una o dos uniones Josephson convierte un flujo magnético minúsculo en voltaje. Sensibilidad ~ fT.\nOperación: el par de Cooper tunela; el número de interferencia cuántica cuenta cuantos de flujo Φ₀ = h/2e.\nAplicaciones 2026: magnetometría biomédica (MEG), exploración geotérmica y mineral, diagnóstico de imanes de fusión, lectura de qubits superconductores. En el rubro eléctrico es sensor, no conductor de potencia." }
  },
  "3-7": {
    p40: {
      desc: "Prob. 40 — Tamaño vs potencia de un resistor de carbono.\na) 1 W → 2 W: el volumen crece ~1.5–2 veces (más superficie de disipación, no un cubo perfecto).\nb) ½ W → 2 W (×4 en P): el cuerpo crece ~3 veces, no 4. La relación no es estrictamente lineal 2:1.\nc) Sí: más vatios piden más tamaño. No: no es exactamente proporcional. En 2026 un shunt de 50 W de BESS es una pletina con Kelvin, no un carbono gigante: la disipación se diseña por superficie y por ΔT, no por un factor mágico." },
    p41: {
      desc: "Prob. 41 — 10 kΩ de carbono a ambiente (20 °C), α ≈ −0.0005.\n−30 °C: R = 10 000 [1 − 0.0005(−50)] = 10 250 Ω.\n100 °C: R = 10 000 [1 − 0.0005(80)] = 9600 Ω.\nEl divisor de un sensor se desvía varios por ciento entre el arranque en frío y el mediodía: por eso 2026 usa resistores de película metálica de 25–50 ppm, no carbono." },
    p42: {
      desc: "Prob. 42 — El mismo 10 kΩ a 120 °F = 48.9 °C.\nR = 10 000 [1 − 0.0005 · 28.9] = 9856 Ω." },
    p43: { fields: { "pot-rt": "10000", "pot-frac": "", "pot-ra": "3500" }, click: "btn-pot-3-7",
      desc: "Prob. 43 — Potenciómetro lineal 10 kΩ. Brazo a un extremo: 3.5 kΩ.\nAl otro extremo: 10 − 3.5 = 6.5 kΩ.\nEs un divisor 3.5 : 6.5. En un inversor, el análogo es el divisor resistivo que mide el bus de 1500 Vcc." },
    p44: { fields: { "pot-rt": "25000", "pot-frac": "0.25", "pot-ra": "" }, click: "btn-pot-3-7",
      desc: "Prob. 44 — Recorrido a 1/4, R_total = 25 kΩ.\nBrazo–A = 0.25 · 25 = 6.25 kΩ. Brazo–B = 18.75 kΩ." },
    p45: { fields: { "pot-rt": "10000", "pot-frac": "0.4", "pot-ra": "" }, click: "btn-pot-3-7",
      desc: "Prob. 45 — 4 kΩ entre brazo y un extremo, 0 Ω entre brazo y el otro: cablear como reóstato.\nUnir el brazo al terminal A (puente: 0 Ω). Usar A/brazo y B. Colocar el cursor al 40 % desde B (o 60 % desde A) para dejar 4 kΩ en el tramo útil y cortocircuitar los 6 kΩ ociosos.\nAsí no flotan y no captan ruido: la misma razón por la que un divisor de bus se termina y no se deja un extremo abierto." }
  },
  "3-8": {
    p46a: { selects: { "cb-1": "green", "cb-2": "blue", "cb-3": "orange", "cb-4": "gold" }, click: "btn-color-3-8",
      desc: "Prob. 46.a — Verde, azul, anaranjado, oro → 56 × 10³ ± 5 % = 56 kΩ (53.2–58.8 kΩ)." },
    p46b: { selects: { "cb-1": "red", "cb-2": "red", "cb-3": "brown", "cb-4": "silver" }, click: "btn-color-3-8",
      desc: "Prob. 46.b — Rojo, rojo, café, plata → 22 × 10 ± 10 % = 220 Ω (198–242 Ω)." },
    p46c: { selects: { "cb-1": "brown", "cb-2": "black", "cb-3": "black", "cb-4": "none" }, click: "btn-color-3-8",
      desc: "Prob. 46.c — Café, negro, negro, sin 4ª banda → 10 × 1 ± 20 % = 10 Ω (8–12 Ω)." },
    p47a: { selects: { "cb-1": "red", "cb-2": "red", "cb-3": "brown", "cb-4": "silver" }, click: "btn-color-3-8",
      desc: "Prob. 47.a — 220 Ω ± 10 %: rojo, rojo, café, plata." },
    p47b: { selects: { "cb-1": "yellow", "cb-2": "violet", "cb-3": "red", "cb-4": "silver" }, click: "btn-color-3-8",
      desc: "Prob. 47.b — 4700 Ω ± 10 %: amarillo, violeta, rojo, plata." },
    p47c: { selects: { "cb-1": "blue", "cb-2": "gray", "cb-3": "orange", "cb-4": "silver" }, click: "btn-color-3-8",
      desc: "Prob. 47.c — 68 kΩ ± 10 %: azul, gris, anaranjado, plata." },
    p47d: { selects: { "cb-1": "white", "cb-2": "brown", "cb-3": "green", "cb-4": "silver" }, click: "btn-color-3-8",
      desc: "Prob. 47.d — 9.1 MΩ ± 10 %: blanco, café, verde, plata." },
    p48: { fields: { "tol-r1": "10", "tol-r2": "15", "tol-pct": "20" }, click: "btn-tol-3-8",
      desc: "Prob. 48 — 10 Ω ± 20 % = 8–12 Ω. 15 Ω ± 20 % = 12–18 Ω.\nSe tocan en 12 Ω: hay traslape de cobertura (justo en el borde). Un 10 Ω al +20 % y un 15 Ω al −20 % son el mismo valor: por eso la serie E12 al 10 % se diseñó para no solaparse." },
    p49: { fields: { "tol-r1": "10", "tol-r2": "15", "tol-pct": "10" }, click: "btn-tol-3-8",
      desc: "Prob. 49 — 10 Ω ± 10 % = 9–11 Ω. 15 Ω ± 10 % = 13.5–16.5 Ω.\nNo hay traslape (hueco 11–13.5 Ω). La tolerancia del 10 % separa los valores E12." }
  },
  "3-9": {
    p50a: { fields: { "g3-R": "0.086", "g3-G": "", "g3-dA": "", "g3-dL": "" }, click: "btn-g-3-9",
      desc: "Prob. 50.a — G = 1 / 0.086 = 11.63 S. Orden de una unión de busbar o de un seccionador cerrado." },
    p50b: { fields: { "g3-R": "4000", "g3-G": "" }, click: "btn-g-3-9",
      desc: "Prob. 50.b — G = 1 / 4000 = 2.50×10⁻⁴ S. Un resistor de polarización." },
    p50c: { fields: { "g3-R": "2.2e6", "g3-G": "" }, click: "btn-g-3-9",
      desc: "Prob. 50.c — G = 1 / 2.2e6 = 4.55×10⁻⁷ S.\nComparación: 11.6 S vs 2.5×10⁻⁴ vs 4.5×10⁻⁷ — siete órdenes entre un contacto de potencia y un megaohmio. El EMS de un BESS reparte corriente según G de cada rack en paralelo." },
    p51: {
      desc: "Prob. 51 — 1000 pies AWG 18.\na) Cobre: R = 6.385 Ω, G = 0.1566 S.\nb) Aluminio: R = 6.385 · 17/10.37 = 10.47 Ω, G = 0.0955 S.\nc) Hierro: R = 6.385 · 74/10.37 = 45.57 Ω, G = 0.0219 S.\nEl Al queda a ~61 % de G del Cu; el Fe, a ~14 %. Por eso el acero es torre, no conductor de string." },
    p52: { fields: { "g3-R": "", "g3-G": "100", "g3-dA": "2/3", "g3-dL": "-2/3" }, click: "btn-g-3-9",
      desc: "Prob. 52 — G₁ = 100 S. A aumenta en 2/3 → A₂ = (5/3) A. L se reduce en 2/3 → L₂ = (1/3) L. T constante.\nG ∝ A / L → G₂ / G₁ = (5/3) / (1/3) = 5. G₂ = 500 S.\nEngrosar el bus y acortar el tendido es exactamente lo que se hace entre el inversor y el transformador de evacuación." }
  },
  "3-10": {
    p53: {
      desc: "Prob. 53 — Fusible con ohmímetro (circuito DESENERGIZADO, carga aislada).\n1) Quitar el fusible o abrir el seccionador.\n2) Escala baja (mΩ–Ω). Puntas en ambos extremos.\n3) Casi 0 Ω (unos miliohmios): eslabón intacto — como un gPV de string sano.\n4) Infinito / OL: abierto — fusible fundido, seccionador abierto o fusible de un combinador tras un cortocircuito.\n5) R intermedia: contacto sucio o eslabón degradado. En 2026 se confirma con microohmímetro Kelvin, no con el tester de 3 ½ dígitos." },
    p54: {
      desc: "Prob. 54 — Interruptor, circuito desenergizado.\nCerrado (ON): R ≈ 0 entre los polos (miliohmios en un seccionador de 1500 Vcc o en un AC breaker).\nAbierto (OFF): R → ∞.\nUn ON con varios ohmios es un contacto picado: calentamiento I²R, riesgo de arco. El ensayo de resistencia de contacto (µΩ) es rutinario en media tensión 2026." },
    p55: {
      desc: "Prob. 55 — Foco (o string piloto), desenergizado.\nFilamento sano: R baja (unos ohmios en frío; el tungsteno sube R en caliente, PTC).\nAbierto: OL — lámpara fundida.\nEn planta el análogo es el string: un megaóhmetro a 1000 Vcc entre polo y tierra comprueba el aislamiento (no la lámpara); un Isc/Voc en el IV tracer comprueba que el «filamento» fotovoltaico conduce." }
  },
  "3-11": {
    p56a: { fields: { "ntc-r0": "10000", "ntc-t0": "25", "ntc-beta": "3950", "ntc-t": "-50" }, click: "btn-ntc-3-11",
      desc: "Prob. 56.a — Curva logarítmica NTC típica (10 kΩ a 25 °C, β = 3950 K), análoga a la fig. 3.34.\n−50 °C: R ≈ 858 kΩ (muy alta).\n50 °C: R ≈ 3.6 kΩ.\n200 °C: R ≈ 74 Ω.\nEn un rack LFP, esa caída de R es la señal de que la celda se calienta; el BMS la lee en un divisor." },
    p56b: {
      desc: "Prob. 56.b — Coeficiente negativo (NTC): R cae al subir T. Es el sensor de 2026 en el módulo SiC y en la celda LFP. Un PTC haría lo contrario y se usa como protección auto-reseteable, no como termómetro de amplio rango." },
    p56c: {
      desc: "Prob. 56.c — No. α no es constante de −100 °C a 400 °C. La ley es exponencial en 1/T (Steinhart–Hart / β), y en log la pendiente cambia. Por eso el BMS interpola una tabla NTC, no aplica un único PPM." },
    p56d: { fields: { "ntc-r0": "10000", "ntc-t0": "25", "ntc-beta": "3950", "ntc-t": "100" }, click: "btn-ntc-3-11",
      desc: "Prob. 56.d — A 100 °C, R ≈ 700 Ω. dR/dT ≈ −R β / T² ≈ −20 Ω/°C (ρ sigue a R: razón de cambio negativa y aún pronunciada). En log, la curva sigue cayendo, pero más despacio que a −50 °C." }
  },
  "3-12": {
    p57a: { fields: { "pc-r0": "10000", "pc-e0": "10", "pc-g": "0.8", "pc-e": "10" }, click: "btn-pc-3-12",
      desc: "Prob. 57.a — Curva logarítmica típica (fig. 3.36): R₀ = 10 kΩ a 10 fc, γ = 0.8.\n10 pie-candelas: R = 10 kΩ.\n100 pie-candelas: R = 10 kΩ · (10)⁻⁰·⁸ = 1.58 kΩ.\nMás luz, menos R: es la analogía del fotodiodo de irradiancia del inversor, no el piranómetro de termopila con el que se certifica una planta en 2026." },
    p57b: {
      desc: "Prob. 57.b — Coeficiente de iluminación negativo: R disminuye al aumentar la luz. Un coeficiente positivo sería un material que se «apaga» al iluminarse; la CdS y el silicio fotovoltaico hacen lo contrario." },
    p57c: {
      desc: "Prob. 57.c — No. De 0.1 a 1000 pie-candelas la curva es logarítmica (potencia −γ). γ ni siquiera es del todo constante. Por eso el sensor de recurso se calibra en varios puntos y el piranómetro de termopila se prefiere para la clase A." },
    p57d: { fields: { "pc-r0": "10000", "pc-e0": "10", "pc-g": "0.8", "pc-e": "10" }, click: "btn-pc-3-12",
      desc: "Prob. 57.d — A 10 fc, dR/dE = −γ R / E = −0.8 · 10 000 / 10 = −800 Ω por pie-candela. Razón de cambio negativa y grande a baja luz (amanecer, nublado): ahí el tracker barato con LDR más se equivoca, y ahí más se nota un piranómetro bueno." }
  },
  "3-13": {
    p58a: { fields: { "mov-k": "3.355443e-46", "mov-a": "25", "mov-v": "50", "mov-i": "" }, click: "btn-mov-3-13",
      desc: "Prob. 58.a — Varistor ZnO típico de la fig. 3.38(a), α ≈ 25, V ≈ 50 V a 1 mA.\nI = k V^α. Con esa k:\n0.5 mA → V ≈ 48.6 V\n1 mA → V ≈ 50.0 V\n3 mA → V ≈ 52.2 V\n5 mA → V ≈ 53.3 V\nEs la rodilla de un MOV: el voltaje casi no se mueve mientras la corriente crece. En un SPD tipo 2 de combinador, esa rodilla está en cientos de voltios (U_c del string), no en 50 V." },
    p58b: {
      desc: "Prob. 58.b — ΔV ≈ 53.3 − 48.6 = 4.7 V en el intervalo 0.5–5 mA. Un 10 % de V, no un 10×. El varistor sujeta; no se comporta como un ohmio fijo." },
    p58c: {
      desc: "Prob. 58.c — I_máx / I_mín = 5 / 0.5 = 10. V_máx / V_mín ≈ 53.3 / 48.6 ≈ 1.10.\nLa corriente cambia diez veces; el voltaje, un 10 %. Esa asimetría es el SPD: deriva el impulso de rayo y deja el bus de 1500 Vcc donde estaba." },
    p59: {
      desc: "Prob. 59 — Ejemplo 3.3 (R = ρ L / A).\nSe verifica en la pestaña 3.2: elige cobre, ingresa L y d (o A) y deja R vacío. El solucionador reproduce R = ρ L / A en CM·Ω/pie.\nPara escribir la notación (ρ, subíndices, fracciones) usa Archimedes." },
    p60: {
      desc: "Prob. 60 — Ejemplo 3.11 (temperatura).\nSe verifica en la pestaña 3.5: R₂ = R₁ (T₂ − T_inf) / (T₁ − T_inf) con T_inf = −234.5 °C para el cobre, o R₂ = R₁ [1 + α₁ (T₂ − T₁)].\nArchimedes sirve para plantar α₂₀, T_inf y los kelvin sin pelearse con el teclado." }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initPresets();
  initSec1_6();
  initSec1_7();
  initSec1_8();
  initSec1_10();
  initSec1_11();
  initSec2_1();
  initSec2_2();
  initSec2_3();
  initSec2_4();
  initSec2_5();
  initSec2_6();
  initSec2_7();
  initSec3();
  initMiniCalc();
  initChapterFold();
});

function initChapterFold() {
  document.querySelectorAll('.chapter-1-fold').forEach((fold) => {
    fold.addEventListener('toggle', () => {
      if (fold.open) return;
      if (fold.id !== 'capitulo-1') return;
      const stopBtn = document.getElementById('btn-stop-tim');
      if (stopBtn && stopBtn.style.display !== 'none') {
        stopBtn.click();
      }
    });
  });
}

function initTabs() {
  document.querySelectorAll('.aemaeth-tabs').forEach(bar => {
    const root = bar.parentElement;
    const tabs = bar.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        root.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.getAttribute('data-target'));
        if (target) target.classList.add('active');
      });
    });
  });
}

// --- Utilities ---
function parseNumberInput(input) {
  // Handles generic numbers, "10e3", "10x10^3" etc.
  let str = input.replace(/\s+/g, '').toLowerCase();
  str = str.replace(/x10\^/g, 'e');
  const num = Number(str);
  if (isNaN(num)) throw new Error("Entrada inválida");
  return num;
}

function formatWithSeparators(num) {
  if (num === null || num === undefined || isNaN(num)) return "-";
  let str = Number(num.toPrecision(6)).toString();
  
  if (str.includes('e')) {
    return str;
  }
  
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(',');
}

function texSciBody(num, digits = 4) {
  if (num === 0) return "0";
  const [mant, exp] = num.toExponential(digits).split('e');
  return `${mant} \\times 10^{${parseInt(exp, 10)}}`;
}

function texEngBody(num) {
  if (num === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = num / Math.pow(10, engExp);
  const formattedMantissa = Number(mantissa.toPrecision(5)).toString();
  return `${formattedMantissa} \\times 10^{${engExp}}`;
}

function mj(tex) {
  return `\\(${tex}\\)`;
}

function formatScientific(num) {
  return mj(texSciBody(num));
}

function formatEngineering(num) {
  return mj(texEngBody(num));
}

function formatScientificPlain(num) {
  if (num === 0) return "0";
  return num.toExponential(4).replace('e', ' × 10^').replace('+', '');
}

const K_COULOMB = 8.99e9;
const ELECTRONS_PER_C = 6.242e18;

function texQtyBody(num, unit) {
  const abs = Math.abs(num);
  const body = (abs !== 0 && (abs >= 1e6 || abs < 1e-3))
    ? texSciBody(num)
    : Number(num.toPrecision(6)).toString();
  if (!unit) return body;
  const raw = String(unit);
  if (raw.includes("\\")) return `${body}\\,${raw}`;
  const unitTex = raw.replace(/([a-zA-Z]+)/g, '\\mathrm{$1}');
  return `${body}\\,${unitTex}`;
}

function formatQty(num, unit) {
  if (num === null || num === undefined || isNaN(num)) return "-";
  return mj(texQtyBody(num, unit));
}

function formatQtyPlain(num) {
  if (num === null || num === undefined || isNaN(num)) return "-";
  const abs = Math.abs(num);
  if (abs !== 0 && (abs >= 1e6 || abs < 1e-3)) return formatScientificPlain(num);
  return formatWithSeparators(num);
}

function typesetMath(node, attempt = 0) {
  const run = () => {
    if (!window.MathJax || typeof MathJax.typesetPromise !== 'function') return;
    const nodes = node ? [node] : undefined;
    if (nodes && typeof MathJax.typesetClear === 'function') {
      MathJax.typesetClear(nodes);
    }
    return MathJax.typesetPromise(nodes);
  };
  if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
    return MathJax.startup.promise.then(run).catch(() => {});
  }
  if (!window.MathJax) {
    if (attempt > 24) return;
    setTimeout(() => typesetMath(node, attempt + 1), 250);
    return;
  }
  return run();
}

function setMathText(el, text) {
  if (!el) return;
  el.textContent = text == null ? "" : String(text);
  typesetMath(el);
}

const TEX_SUPER = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', 'ⁿ': 'n'
};

function supersToTex(sup) {
  return [...sup].map((c) => TEX_SUPER[c] ?? c).join('');
}

function texifyMath(text) {
  if (!text) return "";
  let s = String(text);
  if (s.includes('\\(')) return s;

  const W = (tex) => `\u0000${tex}\u0000`;

  const named = [
    [/F\s*=\s*k\s*\|Q1\s*Q2\|\s*\/\s*r²/g, W('F = k |Q_1 Q_2| / r^{2}')],
    [/r\s*=\s*√\(k \|Q1 Q2\| \/ F\)/g, W('r = \\sqrt{k |Q_1 Q_2| / F}')],
    [/F\s*∝\s*1\/r²/g, W('F \\propto 1/r^{2}')],
    [/\bI\s*=\s*Q\/t\b/g, W('I = Q/t')],
    [/\bQ\s*=\s*I\s*·\s*t\b/g, W('Q = I \\cdot t')],
    [/\bQ\s*=\s*I t\b/g, W('Q = I t')],
    [/\bV\s*=\s*W\/Q\b/g, W('V = W/Q')],
    [/\bW\s*=\s*V Q\b/g, W('W = V Q')],
    [/\bW\s*=\s*V\s*I\s*t\b/g, W('W = V I t')],
    [/\bP\s*=\s*V I\b/g, W('P = V I')],
    [/\bP\s*=\s*W\/t\b/g, W('P = W/t')],
    [/\bt\s*=\s*Q\/I\b/g, W('t = Q/I')],
    [/\bAh\s*=\s*I t\b/g, W('\\mathrm{Ah} = I t')],
    [/\bI\s*=\s*Ah\s*\/\s*t\b/g, W('I = \\mathrm{Ah}/t')],
    [/\bt\s*=\s*Ah\s*\/\s*I\b/g, W('t = \\mathrm{Ah}/I')],
    [/\bI²R\b/g, W('I^{2}R')],
    [/X_L\s*=\s*2πfL/g, W('X_L = 2\\pi f L')],
    [/X_C\s*=\s*1\s*\/\s*\(2πfC\)/g, W('X_C = 1/(2\\pi f C)')],
    [/Z\s*=\s*√\(R\^2 \+ \(X_L - X_C\)\^2\)/g, W('Z = \\sqrt{R^{2} + (X_L - X_C)^{2}}')],
    [/f_r\s*=\s*1\s*\/\s*\(2π√\(LC\)\)/g, W('f_r = 1/(2\\pi\\sqrt{LC})')],
    [/c\s*=\s*√\(a\^2 \+ b\^2\)/g, W('c = \\sqrt{a^{2} + b^{2}}')],
    [/A\s*=\s*πr\^2/g, W('A = \\pi r^{2}')],
    [/A\s*=\s*P\(1 \+ r\)\^t/g, W('A = P(1 + r)^{t}')],
    [/PV\s*=\s*FV\s*\/\s*\(1 \+ r\)\^t/g, W('PV = FV / (1 + r)^{t}')],
    [/P\s*=\s*V\^2\s*\/\s*R/g, W('P = V^{2} / R')],
    [/I\s*=\s*V\s*\/\s*R/g, W('I = V / R')],
    [/R\s*=\s*ρ L \/ A/g, W('R = \\rho L / A')],
    [/G\s*=\s*1\/R/g, W('G = 1/R')],
    [/A_CM\s*=\s*d_mils²/g, W('A_{\\mathrm{CM}} = d_{\\mathrm{mils}}^{2}')],
    [/R_s\s*=\s*ρ \/ d/g, W('R_{\\mathrm{s}} = \\rho / d')],
    [/R₂\s*=\s*R₁\[1 \+ α₁\(T₂ - T₁\)\]/g, W('R_2 = R_1[1 + \\alpha_1(T_2 - T_1)]')],
    [/I\s*=\s*k V\^α/g, W('I = k V^{\\alpha}')],
  ];
  named.forEach(([re, to]) => { s = s.replace(re, to); });

  s = s.replace(/(\d+(?:[.,]\d+)?)\s*[×x]\s*10(?:\^([+-]?\d+)|([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+))/g,
    (_, n, ascii, uni) => W(`${n.replace(',', '{,}')} \\times 10^{${ascii ?? supersToTex(uni)}}`));

  s = s.replace(/\bx\s*10(?:\^([+-]?\d+)|([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+))/g,
    (_, ascii, uni) => W(`\\times 10^{${ascii ?? supersToTex(uni)}}`));

  s = s.replace(/10(?:\^([+-]?\d+)|([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+))/g,
    (_, ascii, uni) => W(`10^{${ascii ?? supersToTex(uni)}}`));

  s = s.replace(/(\d+(?:\.\d+)?)[eE]([+-]?\d+)/g,
    (_, n, e) => W(`${n} \\times 10^{${parseInt(e, 10)}}`));

  s = s.replace(/\(\u0000([^\u0000]+)\u0000\)([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+)/g,
    (_, tex, uni) => W(`(${tex})^{${supersToTex(uni)}}`));

  s = s.replace(/\(([^()\u0000]+)\)([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+)/g,
    (_, inner, uni) => W(`(${inner})^{${supersToTex(uni)}}`));

  s = s.replace(/\((\d+(?:[.,]\d+)?)\)\^([+-]?\d+)/g,
    (_, n, e) => W(`(${n.replace(',', '{,}')})^{${e}}`));

  s = s.replace(/(\d[spdf])([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+)/g,
    (_, orb, uni) => W(`${orb}^{${supersToTex(uni)}}`));

  s = s.replace(/([A-Za-z]+)([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+)/g,
    (_, base, uni) => W(`${base}^{${supersToTex(uni)}}`));

  s = s.replace(/√\(([^)]+)\)/g, (_, inner) => W(`\\sqrt{${inner}}`));
  s = s.replace(/√([0-9.]+)/g, (_, n) => W(`\\sqrt{${n}}`));

  s = s.replace(/\(\u0000([^\u0000]+)\u0000\)\^([+-]?\d+)/g,
    (_, tex, e) => W(`(${tex})^{${e}}`));

  s = s.replace(/σ\s*[≈~]\s*\u0000([^\u0000]+)\u0000/g,
    (_, tex) => W(`\\sigma \\approx ${tex}`));
  s = s.replace(/Eg\s*≈\s*(\d+(?:[.,]\d+)?)(?:\s*eV)?/g,
    (_, n) => W(`E_g \\approx ${n.replace(',', '{,}')}\\,\\mathrm{eV}`));

  return s.replace(/\u0000([^\u0000]+)\u0000/g, '\\($1\\)');
}

function readOptionalNumber(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const raw = (el.value || "").trim();
  if (raw === "") return null;
  return parseNumberInput(raw);
}

function readUnit(id) {
  const el = document.getElementById(id);
  return el ? Number(el.value) : 1;
}

function setField(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = value === undefined || value === null ? "" : value;
}

// --- Section 1.6: Potencias de Diez ---
function initSec1_6() {
  const btnConvert = document.getElementById('btn-convert-1-6');
  if (btnConvert) {
    btnConvert.addEventListener('click', () => {
      try {
        const val = parseNumberInput(document.getElementById('num-1-6').value);
        setMathText(document.getElementById('sci-1-6'), formatScientific(val));
        setMathText(document.getElementById('eng-1-6'), formatEngineering(val));
      } catch (e) {
        alert(e.message);
      }
    });
  }

  const btnCalc = document.getElementById('btn-calc-1-6');
  if (btnCalc) {
    btnCalc.addEventListener('click', () => {
      try {
        const op1 = parseNumberInput(document.getElementById('op1-1-6').value);
        const op2 = parseNumberInput(document.getElementById('op2-1-6').value);
        const operator = document.getElementById('operator-1-6').value;
        let res = 0;
        const opSym = operator === '*' ? '\\times' : operator === '/' ? '\\div' : operator;
        let proc = `${mj(`${texSciBody(op1)} ${opSym} ${texSciBody(op2)}`)}\n`;

        if (operator === '+') {
          res = op1 + op2;
          proc += `Suma directa de valores: ${mj(`${op1} + ${op2} = ${res}`)}`;
        } else if (operator === '-') {
          res = op1 - op2;
          proc += `Resta directa de valores: ${mj(`${op1} - ${op2} = ${res}`)}`;
        } else if (operator === '*') {
          res = op1 * op2;
          const exp1 = Math.floor(Math.log10(Math.abs(op1||1)));
          const exp2 = Math.floor(Math.log10(Math.abs(op2||1)));
          proc += `Multiplicación: se multiplican las bases y se suman los exponentes.\n${mj(`10^{${exp1}} \\times 10^{${exp2}} \\rightarrow 10^{${exp1}+${exp2}}`)}`;
        } else if (operator === '/') {
          if (op2 === 0) throw new Error("Indeterminado (División por cero)");
          res = op1 / op2;
          const exp1 = Math.floor(Math.log10(Math.abs(op1||1)));
          const exp2 = Math.floor(Math.log10(Math.abs(op2||1)));
          proc += `División: se dividen las bases y se restan los exponentes.\n${mj(`10^{${exp1}} / 10^{${exp2}} \\rightarrow 10^{${exp1}-(${exp2})}`)}`;
        }

        setMathText(document.getElementById('proc-1-6'), proc);
        setMathText(document.getElementById('final-1-6'), formatEngineering(res));
      } catch (e) {
        setMathText(document.getElementById('proc-1-6'), e.message);
        setMathText(document.getElementById('final-1-6'), "-");
      }
    });
  }
}

// --- Section 1.7: Conversiones de Prefijos ---
function initSec1_7() {
  const btn = document.getElementById('btn-convert-1-7');
  if (btn) {
    btn.addEventListener('click', () => {
      try {
        const val = Number(document.getElementById('val-1-7').value);
        const expFrom = Number(document.getElementById('prefix-from-1-7').value);
        const expTo = Number(document.getElementById('prefix-to-1-7').value);
        
        // Value * 10^expFrom = X * 10^expTo
        // X = Value * 10^(expFrom - expTo)
        const expDiff = expFrom - expTo;
        const res = val * Math.pow(10, expDiff);
        
        setMathText(document.getElementById('res-1-7'), `${formatWithSeparators(res)} ${mj(`\\times 10^{${expTo}}`)}`);
      } catch (e) {
        alert(e.message);
      }
    });
  }
}

// --- Section 1.8: Sistemas de Unidades y Cinemática ---
const unitData = {
  length: {
    base: 'm',
    units: { m: 1, cm: 0.01, mm: 0.001, um: 1e-6, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 }
  },
  time: {
    base: 's',
    units: { s: 1, ms: 0.001, us: 0.000001, ns: 1e-9, min: 60, h: 3600, d: 86400 }
  },
  force: {
    base: 'N',
    units: { N: 1, dyn: 1e-5, lb: 4.44822 }
  }
};

function populateUnits1_8() {
  const type = document.getElementById('unit-type-1-8').value;
  const sFrom = document.getElementById('unit-from-1-8');
  const sTo = document.getElementById('unit-to-1-8');
  sFrom.innerHTML = ''; sTo.innerHTML = '';
  
  Object.keys(unitData[type].units).forEach(u => {
    sFrom.add(new Option(u, u));
    sTo.add(new Option(u, u));
  });
}

function initSec1_8() {
  const typeSel = document.getElementById('unit-type-1-8');
  if (typeSel) {
    typeSel.addEventListener('change', populateUnits1_8);
    populateUnits1_8(); // init
    
    document.getElementById('btn-convert-1-8').addEventListener('click', () => {
      const type = typeSel.value;
      const val = Number(document.getElementById('val-1-8').value);
      const from = document.getElementById('unit-from-1-8').value;
      const to = document.getElementById('unit-to-1-8').value;
      
      const factorFrom = unitData[type].units[from];
      const factorTo = unitData[type].units[to];
      
      const res = (val * factorFrom) / factorTo;
      setMathText(document.getElementById('res-1-8'), `${formatWithSeparators(res)} ${to}`);
    });
  }

  const btnKin = document.getElementById('btn-kin-calc');
  if (btnKin) {
    btnKin.addEventListener('click', () => {
      const dStr = document.getElementById('kin-d').value;
      const vStr = document.getElementById('kin-v').value;
      const tStr = document.getElementById('kin-t').value;
      
      let d = parseFloat(dStr);
      let v = parseFloat(vStr);
      let t = parseFloat(tStr);
      
      let proc = "";
      
      if (isNaN(d) && !isNaN(v) && !isNaN(t)) {
        d = v * t;
        proc = `Incógnita: Distancia (${mj('d')})\nFórmula: ${mj('d = v t')}\nCálculo: ${mj(`${v} \\times ${t} = ${d}`)}`;
        document.getElementById('kin-d').value = d;
      } else if (isNaN(v) && !isNaN(d) && !isNaN(t)) {
        if (t === 0) { proc = "Indeterminado (t=0)"; }
        else {
          v = d / t;
          proc = `Incógnita: Velocidad (${mj('v')})\nFórmula: ${mj('v = d / t')}\nCálculo: ${mj(`${d} / ${t} = ${v}`)}`;
          document.getElementById('kin-v').value = v;
        }
      } else if (isNaN(t) && !isNaN(d) && !isNaN(v)) {
        if (v === 0) { proc = "Indeterminado (v=0)"; }
        else {
          t = d / v;
          proc = `Incógnita: Tiempo (${mj('t')})\nFórmula: ${mj('t = d / v')}\nCálculo: ${mj(`${d} / ${v} = ${t}`)}`;
          document.getElementById('kin-t').value = t;
        }
      } else {
        proc = "Por favor, deja exactamente una incógnita (campo vacío).";
      }

      setMathText(document.getElementById('proc-kin'), proc);
    });
  }
}

// --- Section 1.10: Tablas de Conversión ---
function initSec1_10() {
  const btn = document.getElementById('btn-convert-1-10');
  if (btn) {
    btn.addEventListener('click', () => {
      const val = Number(document.getElementById('val-1-10').value);
      const preset = document.getElementById('conv-preset-1-10').value;
      let res = 0; let unit = '';
      
      if (preset === 'btu_j') {
        res = val * 1055.06; unit = 'Joules';
      } else if (preset === 'j_btu') {
        res = val / 1055.06; unit = 'BTU';
      } else if (preset === 'oz_m3') {
        res = val * 2.957e-5; unit = 'm³';
      } else if (preset === 'm3_oz') {
        res = val / 2.957e-5; unit = 'fl oz';
      } else if (preset === 'days_s') {
        res = val * 86400; unit = 's';
      } else if (preset === 's_days') {
        res = val / 86400; unit = 'días';
      } else if (preset === 'pints_m3') {
        res = val * 0.000473176; unit = 'm³';
      } else if (preset === 'm3_pints') {
        res = val / 0.000473176; unit = 'pintas';
      } else if (preset === 'l_m3') {
        res = val * 0.001; unit = 'm³';
      } else if (preset === 'gal_l') {
        res = val * 3.78541; unit = 'L';
      } else if (preset === 'lb_kg') {
        res = val * 0.45359237; unit = 'kg';
      } else if (preset === 'mi_km') {
        res = val * 1.609344; unit = 'km';
      } else if (preset === 'hp_w') {
        res = val * 745.7; unit = 'W';
      }
      
      setMathText(document.getElementById('res-1-10'), `${formatWithSeparators(res)} ${unit}`);
    });
  }
}

// --- Section 1.11: Calculadoras ---
function initSec1_11() {
  const dictionaryData = {
    electricidad: [
      { name: "Ley de Ohm (Corriente)", expr: "12 / 100", desc: "\\(I = V / R\\) (Ej: \\(V=12\\,\\mathrm{V}\\), \\(R=100\\,\\Omega\\))" },
      { name: "Potencia Eléctrica", expr: "12^2 / 100", desc: "\\(P = V^{2} / R\\) (Ej: \\(V=12\\,\\mathrm{V}\\), \\(R=100\\,\\Omega\\))" },
      { name: "Reactancia Inductiva", expr: "2 * pi * 60 * 0.1", desc: "\\(X_L = 2\\pi f L\\) (Ej: \\(f=60\\,\\mathrm{Hz}\\), \\(L=0.1\\,\\mathrm{H}\\))" },
      { name: "Reactancia Capacitiva", expr: "1 / (2 * pi * 60 * 10^-6)", desc: "\\(X_C = 1 / (2\\pi f C)\\) (Ej: \\(f=60\\,\\mathrm{Hz}\\), \\(C=1\\,\\mu\\mathrm{F}\\))" },
      { name: "Impedancia RLC", expr: "sqrt(50^2 + (100 - 40)^2)", desc: "\\(Z = \\sqrt{R^{2} + (X_L - X_C)^{2}}\\)" },
      { name: "Frecuencia de Resonancia", expr: "1 / (2 * pi * sqrt(0.1 * 10^-6))", desc: "\\(f_r = 1 / (2\\pi\\sqrt{LC})\\)" }
    ],
    matematicas: [
      { name: "Raíz Cuadrada Básica", expr: "sqrt(144)", desc: "\\(\\sqrt{x}\\)" },
      { name: "Logaritmo Base 10", expr: "log10(1000)", desc: "\\(\\log_{10}(x)\\)" },
      { name: "Ecuación Cuadrática (+)", expr: "(-5 + sqrt(5^2 - 4*1*6)) / (2*1)", desc: "\\(\\dfrac{-b + \\sqrt{b^{2} - 4ac}}{2a}\\)" },
      { name: "Interpolación Lineal", expr: "10 + (20 - 10) * ((15 - 10) / (20 - 10))", desc: "\\(y = y_1 + (y_2 - y_1)\\dfrac{x - x_1}{x_2 - x_1}\\)" }
    ],
    finanzas: [
      { name: "Interés Compuesto", expr: "1000 * (1 + 0.05)^10", desc: "\\(A = P(1 + r)^{t}\\) (Ej: \\(P=1000\\), \\(r=5\\%\\), \\(t=10\\))" },
      { name: "Valor Presente", expr: "1500 / (1 + 0.05)^5", desc: "\\(PV = FV / (1 + r)^{t}\\)" },
      { name: "Cuota de Préstamo (PMT)", expr: "(10000 * 0.05/12) / (1 - (1 + 0.05/12)^-60)", desc: "Cuota mensual (Ej: $10k, 5%, 60m)" }
    ],
    trigonometria: [
      { name: "Teorema de Pitágoras", expr: "sqrt(3^2 + 4^2)", desc: "\\(c = \\sqrt{a^{2} + b^{2}}\\)" },
      { name: "Seno de un Ángulo (Rad)", expr: "sin(pi / 4)", desc: "\\(\\sin(\\theta)\\)" },
      { name: "Coseno de un Ángulo (Rad)", expr: "cos(pi / 3)", desc: "\\(\\cos(\\theta)\\)" },
      { name: "Ángulo (Rad a Grados)", expr: "atan(4/3) * (180/pi)", desc: "\\(\\theta = \\operatorname{atan}(\\mathrm{op}/\\mathrm{ady})\\cdot(180/\\pi)\\)" },
      { name: "Área de un Círculo", expr: "pi * 5^2", desc: "\\(A = \\pi r^{2}\\)" }
    ]
  };

  const dictSelect = document.getElementById('dict-category');
  const dictContainer = document.getElementById('dict-expressions');

  if (dictSelect && dictContainer) {
    dictSelect.addEventListener('change', (e) => {
      const cat = e.target.value;
      if (!cat || !dictionaryData[cat]) {
        dictContainer.style.display = 'none';
        return;
      }
      
      dictContainer.style.display = 'block';
      let html = `<ul style="list-style: none; padding: 0; margin: 0;">`;
      dictionaryData[cat].forEach((item) => {
        // Escapar comillas si es necesario, aunque en este caso las expresiones son simples
        html += `
          <li style="margin-bottom: 0.8rem; display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <button class="action-btn" style="padding: 0.2rem 0.6rem; font-size: 0.8rem;" onclick="document.getElementById('expr-1-11').value='${item.expr}';">Usar</button>
            <div style="flex: 1;">
              <strong>${item.name}:</strong> <code>${item.expr}</code><br>
              <span style="font-size: 0.85em; opacity: 0.8;">${item.desc}</span>
            </div>
          </li>`;
      });
      html += `</ul>`;
      dictContainer.innerHTML = html;
      typesetMath(dictContainer);
    });
  }

  const btn = document.getElementById('btn-calc-1-11');
  if (btn) {
    btn.addEventListener('click', () => {
      let expr = document.getElementById('expr-1-11').value;
      try {
        // Safe evaluation parser replacers for Math functions
        let parseExpr = expr
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/atan\(/g, 'Math.atan(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/log10\(/g, 'Math.log10(')
          .replace(/\bpi\b/g, 'Math.PI')
          .replace(/\^/g, '**');
        
        // Prevent arbitrary code execution
        if (/[a-zA-Z_]/.test(parseExpr.replace(/Math\.[a-zA-Z0-9]+/g, ''))) {
          throw new Error("Caracteres no permitidos en la expresión.");
        }

        const fn = new Function('"use strict"; return (' + parseExpr + ')');
        let res = fn();
        
        setMathText(document.getElementById('res-1-11'), formatWithSeparators(res));
      } catch (e) {
        setMathText(document.getElementById('res-1-11'), "Error en la expresión: " + e.message);
      }
    });
  }
}

// --- Sección 2.1: Ley de Coulomb ---
function initSec2_1() {
  const btn = document.getElementById('btn-coulomb-2-1');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const out = document.getElementById('proc-2-1');
    try {
      const q1 = readOptionalNumber('c2-q1');
      const q2 = readOptionalNumber('c2-q2');
      const rIn = readOptionalNumber('c2-r');
      const fIn = readOptionalNumber('c2-f');
      const q1C = q1 === null ? null : q1 * readUnit('c2-q1-u');
      const q2C = q2 === null ? null : q2 * readUnit('c2-q2-u');
      const rM = rIn === null ? null : rIn * readUnit('c2-r-u');
      const known = [q1C, q2C, rM, fIn].filter(v => v !== null).length;
      if (q1C === null || q2C === null) {
        throw new Error("Indica Q1 y Q2 (con signo). Deja vacío F o r para despejarlo.");
      }
      const product = Math.abs(q1C * q2C);
      const kind = (q1C * q2C) < 0 ? "atracción" : "repulsión";
      let proc = `${mj('k = 8.99 \\times 10^{9}\\,\\mathrm{N{\\cdot}m^{2}/C^{2}}')}\n`;
      proc += `${mj(`Q_1 = ${texQtyBody(q1C, "C")}`)}, ${mj(`Q_2 = ${texQtyBody(q2C, "C")}`)}\n`;
      proc += `Tipo: ${kind} (signos ${q1C * q2C < 0 ? "opuestos" : "iguales"}).\n`;

      if (rM !== null && fIn === null) {
        if (rM === 0) throw new Error("r no puede ser cero.");
        const f = K_COULOMB * product / (rM * rM);
        proc += `${mj('F = k |Q_1 Q_2| / r^{2}')}\n`;
        proc += `${mj(`F = 8.99\\times 10^{9} \\cdot ${texQtyBody(product)} / (${texQtyBody(rM)})^{2}`)}\n`;
        proc += `${mj(`F = ${texQtyBody(f, "N")}`)} (${kind}).`;
        setField('c2-f', f);
        drawCoulombPlot(q1C, q2C, rM);
      } else if (fIn !== null && rM === null) {
        if (fIn === 0) throw new Error("F = 0 implica r → ∞.");
        const r = Math.sqrt(K_COULOMB * product / Math.abs(fIn));
        proc += `${mj('r = \\sqrt{k |Q_1 Q_2| / F}')}\n`;
        proc += `${mj(`r = \\sqrt{8.99\\times 10^{9} \\cdot ${texQtyBody(product)} / ${texQtyBody(Math.abs(fIn))}}`)}\n`;
        proc += `${mj(`r = ${texQtyBody(r, "m")}`)}.`;
        setField('c2-r', r);
        document.getElementById('c2-r-u').value = "1";
        drawCoulombPlot(q1C, q2C, r);
      } else if (rM !== null && fIn !== null) {
        const fCalc = K_COULOMB * product / (rM * rM);
        proc += `Comprobación: ${mj(`F_{\\mathrm{calc}} = ${texQtyBody(fCalc, "N")}`)}. ${mj(`F_{\\mathrm{ing}} = ${texQtyBody(fIn, "N")}`)}.\n`;
        proc += Math.abs(fCalc - fIn) / Math.max(Math.abs(fCalc), 1e-30) < 0.02
          ? "Los valores son consistentes con la ley de Coulomb."
          : "Los valores no cuadran: revisa unidades o el dato vacío.";
        drawCoulombPlot(q1C, q2C, rM);
      } else {
        throw new Error("Deja vacío F o r (exactamente uno) además de indicar Q1 y Q2.");
      }
      if (known === 4) { /* already handled */ }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function drawCoulombPlot(q1C, q2C, rMark) {
  const svg = document.getElementById('plot-2-1');
  const wrap = document.getElementById('plot-2-1-wrap');
  if (!svg || !wrap) return;
  wrap.hidden = false;
  const W = 640, H = 280, L = 58, R = 18, T = 18, B = 42;
  const plotW = W - L - R, plotH = H - T - B;
  const rMin = 0.5, rMax = 10;
  const product = Math.abs(q1C * q2C);
  const fOf = (r) => K_COULOMB * product / (r * r);
  const fMax = fOf(rMin);
  const xOf = (r) => L + ((r - rMin) / (rMax - rMin)) * plotW;
  const yOf = (f) => T + plotH - (f / fMax) * plotH;
  const pts = [];
  for (let i = 0; i <= 80; i++) {
    const r = rMin + (rMax - rMin) * (i / 80);
    pts.push(`${xOf(r).toFixed(1)},${yOf(fOf(r)).toFixed(1)}`);
  }
  let mark = "";
  if (rMark && rMark >= rMin && rMark <= rMax) {
    const f = fOf(rMark);
    mark = `<circle cx="${xOf(rMark)}" cy="${yOf(f)}" r="4.5" fill="#c0392b" />`;
  }
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(frac => {
    const f = fMax * frac;
    const y = yOf(f);
    return `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="currentColor" opacity="0.12"/>
      <text x="${L - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor">${formatQtyPlain(f)}</text>`;
  }).join("");
  const xTicks = [0.5, 2, 4, 6, 8, 10].map(r => {
    const x = xOf(r);
    return `<line x1="${x}" y1="${T}" x2="${x}" y2="${T + plotH}" stroke="currentColor" opacity="0.12"/>
      <text x="${x}" y="${H - 16}" text-anchor="middle" font-size="11" fill="currentColor">${r}</text>`;
  }).join("");
  svg.innerHTML = `
    <rect x="0" y="0" width="${W}" height="${H}" fill="transparent"/>
    ${yTicks}${xTicks}
    <line x1="${L}" y1="${T}" x2="${L}" y2="${T + plotH}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${L}" y1="${T + plotH}" x2="${W - R}" y2="${T + plotH}" stroke="currentColor" stroke-width="1.4"/>
    <polyline fill="none" stroke="#1a6b4a" stroke-width="2.4" points="${pts.join(" ")}"/>
    ${mark}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="currentColor">r (m)</text>
    <text x="14" y="${T + plotH / 2}" text-anchor="middle" font-size="12" fill="currentColor" transform="rotate(-90 14 ${T + plotH / 2})">F (N)</text>
  `;
}

// --- Sección 2.2: Corriente ---
function initSec2_2() {
  const btn = document.getElementById('btn-current-2-2');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const out = document.getElementById('proc-2-2');
    try {
      let I = readOptionalNumber('c2-i');
      let Q = readOptionalNumber('c2-q');
      const N = readOptionalNumber('c2-n');
      let t = readOptionalNumber('c2-t');
      if (I !== null) I *= readUnit('c2-i-u');
      if (Q !== null) Q *= readUnit('c2-q-u');
      if (t !== null) t *= readUnit('c2-t-u');
      if (N !== null) {
        const qFromN = N / ELECTRONS_PER_C;
        if (Q === null) Q = qFromN;
        else if (Math.abs(Q - qFromN) / Math.max(Math.abs(Q), 1e-30) > 0.02) {
          throw new Error("Q y N no son consistentes. Deja uno vacío.");
        }
      }
      const missing = [I, Q, t].filter(v => v === null).length;
      if (missing !== 1 && !(I !== null && Q !== null && t !== null)) {
        if (missing === 3 && N === null) throw new Error("Indica dos de I, Q (o N) y t.");
        if (missing > 1) throw new Error("Deja vacío exactamente uno de I, Q o t (N puede sustituir a Q).");
      }
      let proc = `${mj('I = Q / t')},   ${mj('Q = N / 6.242\\times 10^{18}')}\n`;
      if (I === null) {
        if (t === 0) throw new Error("t no puede ser cero.");
        I = Q / t;
        proc += `${mj(`I = ${texQtyBody(Q, "C")} / ${texQtyBody(t, "s")} = ${texQtyBody(I, "A")}`)}.`;
        setField('c2-i', I);
        document.getElementById('c2-i-u').value = "1";
      } else if (Q === null) {
        Q = I * t;
        proc += `${mj(`Q = ${texQtyBody(I, "A")} \\cdot ${texQtyBody(t, "s")} = ${texQtyBody(Q, "C")}`)}.`;
        setField('c2-q', Q);
        document.getElementById('c2-q-u').value = "1";
      } else if (t === null) {
        if (I === 0) throw new Error("I = 0 no define un tiempo finito.");
        t = Q / I;
        proc += `${mj(`t = ${texQtyBody(Q, "C")} / ${texQtyBody(I, "A")} = ${texQtyBody(t, "s")}`)}.`;
        setField('c2-t', t);
        document.getElementById('c2-t-u').value = "1";
      } else {
        proc += `Comprobación: ${mj(`I = Q/t = ${texQtyBody(Q / t, "A")}`)} (ingresado ${formatQty(I, "A")}).`;
      }
      const nCalc = (Q !== null) ? Q * ELECTRONS_PER_C : null;
      if (nCalc !== null) {
        proc += `\n${mj(`N = Q \\cdot 6.242\\times 10^{18} = ${texSciBody(nCalc)}`)} electrones.`;
        if (N === null) setField('c2-n', nCalc);
      }
      const fuse = readOptionalNumber('c2-fuse');
      if (fuse !== null && I !== null) {
        proc += I > fuse
          ? `\nFusible ${fuse} A: ${mj(`I = ${texQtyBody(I, "A")}`)} > valor nominal → ESTALLA. En un string gPV esto abre el circuito y protege el combinador.`
          : `\nFusible ${fuse} A: ${mj(`I = ${texQtyBody(I, "A")}`)} ≤ valor nominal → no funde (en régimen permanente).`;
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

// --- Sección 2.3: Voltaje ---
function initSec2_3() {
  const btn = document.getElementById('btn-voltage-2-3');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const out = document.getElementById('proc-2-3');
    try {
      let V = readOptionalNumber('v2-v');
      let W = readOptionalNumber('v2-w');
      let Q = readOptionalNumber('v2-q');
      const N = readOptionalNumber('v2-n');
      let I = readOptionalNumber('v2-i');
      let t = readOptionalNumber('v2-t');
      if (V !== null) V *= readUnit('v2-v-u');
      if (W !== null) W *= readUnit('v2-w-u');
      if (Q !== null) Q *= readUnit('v2-q-u');
      if (I !== null) I *= readUnit('v2-i-u');
      if (t !== null) t *= readUnit('v2-t-u');
      if (N !== null && Q === null) Q = N / ELECTRONS_PER_C;
      if (Q === null && I !== null && t !== null) Q = I * t;
      let proc = `${mj('V = W / Q')},   ${mj('Q = I t')},   ${mj('W = V I t')}\n`;
      if (Q !== null && I !== null && t !== null) {
        proc += `${mj(`Q = I t = ${texQtyBody(I, "A")} \\cdot ${texQtyBody(t, "s")} = ${texQtyBody(I * t, "C")}`)}.\n`;
      } else if (Q !== null && I !== null && t === null) {
        proc += `Q dada; ${mj(`t = Q/I = ${texQtyBody(Q / I, "s")}`)}.\n`;
      }
      const miss = [V, W, Q].filter(v => v === null).length;
      if (miss > 1) throw new Error("Indica dos de V, W y Q (Q puede salir de N o de I y t).");
      if (V === null) {
        if (Q === 0) throw new Error("Q no puede ser cero.");
        V = W / Q;
        proc += `${mj(`V = ${texQtyBody(W, "J")} / ${texQtyBody(Q, "C")} = ${texQtyBody(V, "V")}`)}.`;
        setField('v2-v', V);
        document.getElementById('v2-v-u').value = "1";
      } else if (W === null) {
        W = V * Q;
        proc += `${mj(`W = ${texQtyBody(V, "V")} \\cdot ${texQtyBody(Q, "C")} = ${texQtyBody(W, "J")}`)}.`;
        setField('v2-w', W);
        document.getElementById('v2-w-u').value = "1";
      } else if (Q === null) {
        if (V === 0) throw new Error("V = 0 no define Q.");
        Q = W / V;
        proc += `${mj(`Q = ${texQtyBody(W, "J")} / ${texQtyBody(V, "V")} = ${texQtyBody(Q, "C")}`)}.`;
        setField('v2-q', Q);
        document.getElementById('v2-q-u').value = "1";
      } else {
        proc += `Comprobación: ${mj(`V = W/Q = ${texQtyBody(W / Q, "V")}`)}.`;
      }
      if (I !== null && t !== null && W !== null) {
        proc += `\n${mj(`P = W/t = ${texQtyBody(W / t, "W")}`)}; también ${mj(`P = V I = ${texQtyBody(V * I, "W")}`)}.`;
      }
      if (I === null && Q !== null && t !== null && t !== 0) {
        I = Q / t;
        proc += `\n${mj(`I = Q/t = ${texQtyBody(I, "A")}`)}.`;
        setField('v2-i', I);
        document.getElementById('v2-i-u').value = "1";
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

// --- Sección 2.4: Fuentes CD / Ah ---
function initSec2_4() {
  const btn = document.getElementById('btn-ah-2-4');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const out = document.getElementById('proc-2-4');
    try {
      let Ah = readOptionalNumber('ah-ah');
      let I = readOptionalNumber('ah-i');
      let t = readOptionalNumber('ah-t');
      const V = readOptionalNumber('ah-v');
      if (t !== null) t *= readUnit('ah-t-u');
      const miss = [Ah, I, t].filter(v => v === null).length;
      let proc = `${mj('\\mathrm{Ah} = I\\,(\\mathrm{A}) \\cdot t\\,(\\mathrm{h})')}\n`;
      proc += `${mj('W\\,(\\mathrm{J}) = V \\cdot \\mathrm{Ah} \\cdot 3600')},   ${mj('E\\,(\\mathrm{kWh}) = V \\cdot \\mathrm{Ah} / 1000')}\n`;
      if (miss === 3 && V !== null && Ah === null) {
        throw new Error("Con solo V no hay capacidad. Indica Ah o I y t.");
      }
      if (miss === 1 || miss === 0) {
        if (Ah === null) {
          Ah = I * t;
          proc += `${mj(`\\mathrm{Ah} = ${texQtyBody(I, "A")} \\cdot ${texQtyBody(t, "h")} = ${texQtyBody(Ah, "Ah")}`)}.`;
          setField('ah-ah', Ah);
        } else if (I === null) {
          if (t === 0) throw new Error("t no puede ser cero.");
          I = Ah / t;
          proc += `${mj(`I = ${texQtyBody(Ah, "Ah")} / ${texQtyBody(t, "h")} = ${texQtyBody(I, "A")}`)}.`;
          setField('ah-i', I);
        } else if (t === null) {
          if (I === 0) throw new Error("I = 0 no define un tiempo finito.");
          t = Ah / I;
          proc += `${mj(`t = ${texQtyBody(Ah, "Ah")} / ${texQtyBody(I, "A")} = ${texQtyBody(t, "h")}`)} (${formatQty(t * 60, "min")}).`;
          setField('ah-t', t);
          document.getElementById('ah-t-u').value = "1";
        } else {
          proc += `Comprobación: ${mj(`I \\cdot t = ${texQtyBody(I * t, "Ah")}`)} (ingresado ${formatQty(Ah, "Ah")}).`;
        }
      } else if (Ah !== null) {
        proc += `Capacidad dada: ${formatQty(Ah, "Ah")}.`;
      } else {
        throw new Error("Deja vacío Ah, I o t (exactamente uno) para despejarlo.");
      }
      if (Ah !== null) {
        proc += `\nEquivalente: ${formatQty(Ah * 1000, "mAh")}.`;
      }
      if (V !== null && Ah !== null) {
        const joules = V * Ah * 3600;
        const kwh = V * Ah / 1000;
        proc += `\n${mj(`E = ${texQtyBody(V, "V")} \\cdot ${texQtyBody(Ah, "Ah")} \\cdot 3600 = ${texQtyBody(joules, "J")} = ${texQtyBody(kwh, "kWh")}`)}.`;
        if (I !== null) {
          proc += `\nPotencia instantánea ${mj(`P = V I = ${texQtyBody(V * I, "W")} = ${texQtyBody(V * I / 1000, "kW")}`)}.`;
        }
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

// --- Sección 2.5: materiales ---
function initSec2_5() {
  const data = {
    ag: "Plata — σ ≈ 6.3×10⁷ S/m, el metal más conductor.\nUn electrón 5s muy móvil. En renovables es la pasta de la rejilla frontal de celdas c-Si, TOPCon y HJT: cada miliohmio menos en la cara iluminada es más Imp.",
    cu: "Cobre — σ ≈ 5.8×10⁷ S/m.\nUn electrón 4s y red FCC. Pletinas del inversor, devanados del transformador de evacuación, malla de tierra y barras del BESS.",
    al: "Aluminio — σ ≈ 3.5×10⁷ S/m (≈ 61 % del Cu) y un tercio de la densidad.\nCables fotovoltaicos AA-8000, líneas de media tensión y barras de subestación. Se compensa la menor σ con más sección.",
    au: "Oro — σ ≈ 4.4×10⁷ S/m, no se oxida.\nContactos de conectores de señal, recubrimiento de pines de controladores y sensores de planta. No se usa como conductor de potencia: caro y blando.",
    fe: "Acero / hierro — σ ≈ 1×10⁷ S/m, magnético.\nTorres, tornillería y, en aleación, el núcleo del transformador. Conduce, pero no se elige para llevar la corriente de un string.",
    si: "Silicio dopado — σ ≈ 10² a 10⁴ S/m según el dopaje.\nNi cable ni aislante: es la celda y el IGBT. El dopaje n/p crea el campo interno que separa los pares fotogenerados.",
    xlpe: "XLPE — σ ≈ 10⁻¹⁴ S/m, ruptura ~20–40 kV/mm.\nAislante de cables de string y de 15–36 kV. Soporta 90–105 °C en zanja y en bandeja de un parque solar o eólico.",
    glass: "Vidrio solar — σ ≈ 10⁻¹² S/m, ruptura ~10 kV/mm.\nCara del módulo: aísla las celdas, transmite el espectro útil y aguanta granizo y carga de nieve.",
    air: "Aire seco — ruptura ≈ 3 kV/mm.\nAislante gratuito entre filas, en el vano de la línea y en seccionadores abiertos. A 1500 Vcc impone distancias de fuga y de arco que el diseño de la caja de combinadores no puede recortar."
  };
  const sel = document.getElementById('mat-2-5');
  const out = document.getElementById('mat-2-5-out');
  if (!sel || !out) return;
  sel.addEventListener('change', () => {
    const text = data[sel.value];
    if (!text) {
      out.style.display = 'none';
      return;
    }
    out.style.display = 'block';
    setMathText(out, texifyMath(text));
  });
}

// --- Sección 2.6: semiconductores ---
function initSec2_6() {
  const data = {
    si: "Silicio — Eg ≈ 1.12 eV, indirecto, abundante.\nCelda c-Si (PERC, TOPCon, HJT) y IGBT/MOSFET de 600–1700 V. Es el semiconductor de la transición energética: barato, conocido y reciclable.",
    ge: "Germanio — Eg ≈ 0.66 eV.\nMás portadores intrínsecos, peor con la temperatura. Fue el transistor de los años 50; hoy es substrato o unión inferior de tándems espaciales, no de planta terrestre.",
    sic: "Carburo de silicio — Eg ≈ 3.26 eV, ruptura ~10 veces la del Si.\nMOSFET de 1200–1700 V en inversores string y centrales, y en el convertidor del aerogenerador. Menos pérdidas de conmutación, más densidad y más temperatura de unión.",
    gan: "Nitruro de galio — Eg ≈ 3.4 eV, muy rápido.\nMicroinversores, cargadores y etapas de alta frecuencia. Complementa al SiC: GaN por debajo de ~650 V, SiC por encima.",
    cdte: "Telururo de cadmio — Eg ≈ 1.45 eV, capa fina.\nMódulos de gran formato a bajo coste por vatio. No es el interruptor del inversor; es el absorbedor de otra familia fotovoltaica.",
    perov: "Perovskita / tándem — Eg sintonizable ~1.5–1.8 eV sobre Si.\nLaboratorio y primeras líneas piloto: el tándem busca superar el límite de Shockley–Queisser de una sola unión de silicio. Aún no es el estándar de planta."
  };
  const sel = document.getElementById('sc-2-6');
  const out = document.getElementById('sc-2-6-out');
  if (!sel || !out) return;
  sel.addEventListener('change', () => {
    const text = data[sel.value];
    if (!text) {
      out.style.display = 'none';
      return;
    }
    out.style.display = 'block';
    setMathText(out, texifyMath(text));
  });
}

// --- Sección 2.7: medidores ---
function initSec2_7() {
  const btn = document.getElementById('btn-meter-2-7');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const out = document.getElementById('proc-2-7');
    try {
      let I = readOptionalNumber('m2-i');
      const V = readOptionalNumber('m2-v');
      let t = readOptionalNumber('m2-t');
      if (I !== null) I *= readUnit('m2-i-u');
      if (t !== null) t *= readUnit('m2-t-u');
      if (I === null || t === null) throw new Error("Indica I y t. V es opcional para la energía.");
      const Q = I * t;
      let proc = `Amperímetro en serie: ${mj(`I = ${texQtyBody(I, "A")}`)} durante ${formatQty(t, "s")}.\n${mj(`Q = I t = ${texQtyBody(Q, "C")}`)}.`;
      if (V !== null) {
        const W = V * I * t;
        proc += `\nVoltímetro en paralelo: ${mj(`V = ${texQtyBody(V, "V")}`)}.\n${mj(`W = V I t = ${texQtyBody(W, "J")} = ${texQtyBody(W / 3.6e6, "kWh")}`)}.\n${mj(`P = V I = ${texQtyBody(V * I, "W")}`)}.`;
      } else {
        proc += "\nSin lectura de voltímetro no hay energía, solo carga.";
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

const RHO_CM = {
  ag: 9.9, cu: 10.37, au: 14.7, al: 17.0, w: 33.0, ni: 47.0,
  fe: 74.0, constantan: 295, nichrome: 600, carbon: 22000
};
const ALPHA_20 = {
  ag: 0.0038, cu: 0.00393, au: 0.0034, al: 0.00391, w: 0.0045,
  ni: 0.006, fe: 0.0055, nichrome: 0.0004, constantan: 0.000008, carbon: -0.0005
};
const AWG_TABLE = [
  { id: "4/0", d: 460.0, cm: 211600, ohm: 0.04901, amp: 230 },
  { id: "3/0", d: 409.6, cm: 167800, ohm: 0.06180, amp: 200 },
  { id: "2/0", d: 364.8, cm: 133100, ohm: 0.07793, amp: 175 },
  { id: "1/0", d: 324.9, cm: 105600, ohm: 0.09827, amp: 150 },
  { id: "1", d: 289.3, cm: 83690, ohm: 0.1239, amp: 130 },
  { id: "2", d: 257.6, cm: 66370, ohm: 0.1563, amp: 115 },
  { id: "3", d: 229.4, cm: 52620, ohm: 0.1970, amp: 100 },
  { id: "4", d: 204.3, cm: 41740, ohm: 0.2485, amp: 85 },
  { id: "5", d: 181.9, cm: 33100, ohm: 0.3133, amp: 75 },
  { id: "6", d: 162.0, cm: 26250, ohm: 0.3951, amp: 65 },
  { id: "7", d: 144.3, cm: 20820, ohm: 0.4982, amp: 55 },
  { id: "8", d: 128.5, cm: 16510, ohm: 0.6282, amp: 50 },
  { id: "9", d: 114.4, cm: 13090, ohm: 0.7921, amp: 40 },
  { id: "10", d: 101.9, cm: 10380, ohm: 0.9989, amp: 30 },
  { id: "11", d: 90.74, cm: 8234, ohm: 1.260, amp: 25 },
  { id: "12", d: 80.81, cm: 6530, ohm: 1.588, amp: 20 },
  { id: "13", d: 71.96, cm: 5184, ohm: 2.003, amp: 17 },
  { id: "14", d: 64.08, cm: 4107, ohm: 2.525, amp: 15 },
  { id: "15", d: 57.07, cm: 3257, ohm: 3.184, amp: 12 },
  { id: "16", d: 50.82, cm: 2583, ohm: 4.016, amp: 10 },
  { id: "17", d: 45.26, cm: 2048, ohm: 5.064, amp: 8 },
  { id: "18", d: 40.30, cm: 1624, ohm: 6.385, amp: 6 }
];
const CM_PER_SQIN = 1.2732395447351628e6;
const RHO_CM_TO_OHM_CM = 1.66243e-7;
const COLOR_CODE = {
  black: { digit: 0, mul: 1, label: "negro" },
  brown: { digit: 1, mul: 10, label: "café" },
  red: { digit: 2, mul: 100, label: "rojo" },
  orange: { digit: 3, mul: 1000, label: "anaranjado" },
  yellow: { digit: 4, mul: 1e4, label: "amarillo" },
  green: { digit: 5, mul: 1e5, label: "verde" },
  blue: { digit: 6, mul: 1e6, label: "azul" },
  violet: { digit: 7, mul: 1e7, label: "violeta" },
  gray: { digit: 8, mul: 1e8, label: "gris" },
  white: { digit: 9, mul: 1e9, label: "blanco" },
  gold: { digit: null, mul: 0.1, tol: 0.05, label: "oro" },
  silver: { digit: null, mul: 0.01, tol: 0.1, label: "plata" },
  none: { digit: null, mul: null, tol: 0.2, label: "—" }
};

function readFlexible(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const raw = (el.value || "").trim();
  if (raw === "") return null;
  const frac = raw.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const den = Number(frac[2]);
    if (den === 0) throw new Error("División por cero en " + id);
    return Number(frac[1]) / den;
  }
  return parseNumberInput(raw);
}

function toCelsius(value, unit) {
  if (unit === "F") return (value - 32) * 5 / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function inferredT(alpha, tRef = 20) {
  if (!alpha || alpha === 0) throw new Error("α = 0 no define T_inf.");
  return tRef - 1 / alpha;
}

function fillSelect(sel, items, make) {
  if (!sel) return;
  const keep = sel.value;
  if (!sel.dataset.filled) {
    items.forEach((item) => sel.appendChild(make(item)));
    sel.dataset.filled = "1";
  }
  if (keep) sel.value = keep;
}

function initSec3() {
  initSec3_2();
  initSec3_3();
  initSec3_4();
  initSec3_5();
  initSec3_6();
  initSec3_7();
  initSec3_8();
  initSec3_9();
  initSec3_10();
  initSec3_11();
  initSec3_12();
  initSec3_13();
}

function initSec3_2() {
  const mat = document.getElementById("c3-mat");
  if (mat) {
    mat.addEventListener("change", () => {
      const rho = RHO_CM[mat.value];
      if (rho != null) setField("c3-rho", rho);
    });
  }
  const btnMils = document.getElementById("btn-mils-3-2");
  if (btnMils) {
    btnMils.addEventListener("click", () => {
      const out = document.getElementById("proc-3-2-mils");
      try {
        let d = readOptionalNumber("c3-d");
        let A = readOptionalNumber("c3-acm");
        if (d !== null) d *= readUnit("c3-d-u");
        let proc = `${mj("1\\,\\mathrm{pulg} = 1000\\,\\mathrm{mils}")},\\; ${mj("A_{\\mathrm{CM}} = d_{\\mathrm{mils}}^{2}")}\n`;
        if (d === null && A === null) throw new Error("Indica d o A (CM).");
        if (d === null) {
          if (A < 0) throw new Error("El área no puede ser negativa.");
          d = Math.sqrt(A);
          proc += `${mj(`d = \\sqrt{${texQtyBody(A, "CM")}} = ${texQtyBody(d, "mils")} = ${texQtyBody(d / 1000, "pulg")}`)}.`;
          setField("c3-d", d);
          document.getElementById("c3-d-u").value = "1";
        } else {
          A = d * d;
          proc += `${mj(`d = ${texQtyBody(d, "mils")} = ${texQtyBody(d / 1000, "pulg")}`)}.\n`;
          proc += `${mj(`A = ${texQtyBody(d, "mils")}^{2} = ${texQtyBody(A, "CM")}`)}.`;
          setField("c3-acm", A);
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnR = document.getElementById("btn-res-3-2");
  if (btnR) {
    btnR.addEventListener("click", () => {
      const out = document.getElementById("proc-3-2");
      try {
        const matKey = document.getElementById("c3-mat").value;
        let rho = readOptionalNumber("c3-rho");
        if (rho === null && RHO_CM[matKey] != null) {
          rho = RHO_CM[matKey];
          setField("c3-rho", rho);
        }
        if (rho === null) throw new Error("Indica ρ o un material de la tabla.");
        let L = readOptionalNumber("c3-L");
        if (L !== null) L *= readUnit("c3-L-u");
        let d = readOptionalNumber("c3-rd");
        if (d !== null) d *= readUnit("c3-rd-u");
        const w = readOptionalNumber("c3-w");
        const th = readOptionalNumber("c3-th");
        let A = readOptionalNumber("c3-A");
        let R = readOptionalNumber("c3-R");
        let proc = `${mj("R = \\rho L / A")}\\; (\\rho\\ \\mathrm{en\\ CM{\\cdot}\\Omega/pie},\\ L\\ \\mathrm{en\\ pies},\\ A\\ \\mathrm{en\\ CM})\n`;
        proc += `${mj(`\\rho = ${texQtyBody(rho, "CM{\\cdot}\\Omega/pie")}`)}.\n`;
        if (A === null && w !== null && th !== null) {
          const wMil = w * readUnit("c3-w-u");
          const tMil = th * readUnit("c3-th-u");
          A = (wMil * tMil) / (Math.PI / 4);
          proc += `Placa rectangular: ${mj(`A_{\\mathrm{CM}} = (w t)_{\\mathrm{mils}} / (\\pi/4) = ${texQtyBody(A, "CM")}`)}.\n`;
          setField("c3-A", A);
        } else if (A === null && d !== null) {
          A = d * d;
          proc += `${mj(`d = ${texQtyBody(d, "mils")}`)}, ${mj(`A = d^{2} = ${texQtyBody(A, "CM")}`)}.\n`;
          setField("c3-A", A);
        }
        const miss = [R, L, A].filter((v) => v === null).length;
        if (miss > 1) throw new Error("Deja vacío exactamente uno entre R, L y A (o da d / placa para A).");
        if (miss === 0) {
          const Rc = rho * L / A;
          proc += `Comprobación: ${mj(`R = ${texQtyBody(rho)} \\cdot ${texQtyBody(L, "pies")} / ${texQtyBody(A, "CM")} = ${texQtyBody(Rc, "\\Omega")}`)} (ingresado ${formatQty(R, "\\Omega")}).`;
        } else if (R === null) {
          if (A === 0) throw new Error("A = 0 no define R.");
          R = rho * L / A;
          proc += `${mj(`R = ${texQtyBody(rho)} \\cdot ${texQtyBody(L, "pies")} / ${texQtyBody(A, "CM")} = ${texQtyBody(R, "\\Omega")}`)}.`;
          setField("c3-R", R);
        } else if (L === null) {
          if (rho === 0) throw new Error("ρ = 0 no define L.");
          L = R * A / rho;
          proc += `${mj(`L = R A / \\rho = ${texQtyBody(L, "pies")} = ${texQtyBody(L / 3.280839895, "m")}`)}.`;
          setField("c3-L", L);
          document.getElementById("c3-L-u").value = "1";
        } else {
          if (R === 0) throw new Error("R = 0 no define A.");
          A = rho * L / R;
          proc += `${mj(`A = \\rho L / R = ${texQtyBody(A, "CM")}`)}.\n`;
          const diam = Math.sqrt(A);
          proc += `${mj(`d = \\sqrt{A} = ${texQtyBody(diam, "mils")} = ${texQtyBody(diam / 1000, "pulg")}`)}.`;
          setField("c3-A", A);
          setField("c3-rd", diam);
          document.getElementById("c3-rd-u").value = "1";
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec3_3() {
  const tbody = document.querySelector("#awg-table tbody");
  if (tbody && !tbody.dataset.filled) {
    AWG_TABLE.forEach((row) => {
      const tr = document.createElement("tr");
      tr.dataset.awg = row.id;
      tr.innerHTML = `<td>${row.id}</td><td>${row.d}</td><td>${row.cm.toLocaleString("es-CL")}</td><td>${row.ohm}</td><td>${row.amp}</td>`;
      tbody.appendChild(tr);
    });
    tbody.dataset.filled = "1";
  }
  const pick = document.getElementById("awg-pick");
  fillSelect(pick, AWG_TABLE, (row) => {
    const o = document.createElement("option");
    o.value = row.id;
    o.textContent = `AWG ${row.id}`;
    return o;
  });
  const btn = document.getElementById("btn-awg-3-3");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-3");
    try {
      const L = readOptionalNumber("awg-L");
      const Rmax = readOptionalNumber("awg-Rmax");
      const Imax = readOptionalNumber("awg-Imax");
      const id = document.getElementById("awg-pick").value;
      document.querySelectorAll("#awg-table tbody tr").forEach((tr) => tr.classList.remove("is-hit"));
      let proc = `Cobre a ${mj("20^{\\circ}\\mathrm{C}")}, ${mj("\\rho = 10{,}37\\,\\mathrm{CM{\\cdot}\\Omega/pie}")}.\n`;
      let chosen = id ? AWG_TABLE.find((r) => r.id === id) : null;
      if (L != null && Rmax != null && Rmax > 0) {
        const Amin = 10.37 * L / Rmax;
        proc += `${mj(`A_{\\min} = \\rho L / R_{\\max} = 10{,}37 \\cdot ${texQtyBody(L, "pies")} / ${texQtyBody(Rmax, "\\Omega")} = ${texQtyBody(Amin, "CM")}`)}.\n`;
        const byR = [...AWG_TABLE].reverse().find((r) => r.cm >= Amin);
        if (!byR) throw new Error("Ningún AWG de la tabla cubre esa R.");
        proc += `Por resistencia basta AWG ${byR.id} (${byR.cm.toLocaleString("es-CL")} CM).\n`;
        chosen = byR;
      }
      if (Imax != null) {
        const byI = [...AWG_TABLE].reverse().find((r) => r.amp >= Imax);
        if (!byI) throw new Error("Ningún AWG de la tabla cubre esa corriente.");
        proc += `Por ampacidad ${formatQty(Imax, "A")} hace falta AWG ${byI.id} (${byI.amp} A).\n`;
        if (!chosen || AWG_TABLE.findIndex((r) => r.id === byI.id) < AWG_TABLE.findIndex((r) => r.id === chosen.id)) {
          chosen = byI;
        }
      }
      if (!chosen) throw new Error("Elige un AWG o indica L y R máx / I máx.");
      const tr = document.querySelector(`#awg-table tbody tr[data-awg="${chosen.id}"]`);
      if (tr) tr.classList.add("is-hit");
      proc += `Calibre ${chosen.id}: d = ${chosen.d} mils, A = ${chosen.cm.toLocaleString("es-CL")} CM, ${chosen.ohm} Ω/1000 pies, I máx = ${chosen.amp} A.`;
      if (L != null) {
        const R = chosen.ohm * (L / 1000);
        proc += `\nA ${formatQty(L, "pies")}: ${mj(`R = ${texQtyBody(R, "\\Omega")}`)}, ${mj(`G = ${texQtyBody(1 / R, "S")}`)}.`;
      }
      const Jcm = chosen.amp / chosen.cm;
      const Jin = chosen.amp / (chosen.cm / CM_PER_SQIN);
      proc += `\n${mj(`J = ${texQtyBody(Jcm, "A/CM")} = ${texQtyBody(Jin, "A/pulg^{2}")}`)}.`;
      if (Imax != null && Imax > 0) {
        proc += `\nPara ${formatQty(Imax, "A")} a esa J: ${mj(`A = ${texQtyBody(Imax / Jin, "pulg^{2}")}`)}.`;
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_4() {
  const btn = document.getElementById("btn-metric-3-4");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-4");
    try {
      let rho = readOptionalNumber("m3-rho");
      if (rho !== null) rho *= readUnit("m3-rho-u");
      let L = readOptionalNumber("m3-L");
      if (L !== null) L *= readUnit("m3-L-u");
      let d = readOptionalNumber("m3-d");
      if (d !== null) d *= readUnit("m3-d-u");
      let W = readOptionalNumber("m3-W");
      if (W !== null) W *= readUnit("m3-W-u");
      const Rs = readOptionalNumber("m3-Rs");
      let R = readOptionalNumber("m3-R");
      const eng = readOptionalNumber("m3-eng");
      let proc = `${mj("R = \\rho L / A")}\\ \\mathrm{(SI)},\\quad ${mj("R_{\\mathrm{s}} = \\rho / d")},\\quad ${mj("R = R_{\\mathrm{s}} L / W")}\n`;
      let A = null;
      if (d !== null && W === null) {
        A = Math.PI * (d / 2) ** 2;
        proc += `${mj(`A = \\pi (d/2)^{2} = ${texQtyBody(A, "m^{2}")}`)}.\n`;
      } else if (d !== null && W !== null) {
        A = d * W;
        proc += `Película / placa: ${mj(`A = d W = ${texQtyBody(A, "m^{2}")}`)}.\n`;
      } else if (W !== null && d === null && Rs === null) {
        A = W;
        proc += `Ancho interpretado como área ${formatQty(A, "m^{2}")} (placa, un lado ya en metros).\n`;
      }
      if (rho === null && Rs !== null && d !== null) {
        rho = Rs * d;
        proc += `${mj(`\\rho = R_{\\mathrm{s}} d = ${texQtyBody(rho, "\\Omega{\\cdot}m")}`)}.\n`;
      }
      if (Rs !== null && rho !== null && d === null) {
        if (Rs === 0) throw new Error("Rs = 0 no define espesor.");
        d = rho / Rs;
        proc += `${mj(`d = \\rho / R_{\\mathrm{s}} = ${texQtyBody(d, "m")} = ${texQtyBody(d * 1e9, "nm")}`)}.\n`;
        setField("m3-d", d);
        document.getElementById("m3-d-u").value = "1";
      }
      if (Rs !== null && L !== null && W === null && R !== null) {
        W = Rs * L / R;
        proc += `${mj(`W = R_{\\mathrm{s}} L / R = ${texQtyBody(W, "m")} = ${texQtyBody(W / 0.0254, "pulg")}`)}.\n`;
        setField("m3-W", W / 0.0254);
      } else if (Rs !== null && L !== null && W !== null && R === null) {
        R = Rs * L / W;
        proc += `${mj(`R = R_{\\mathrm{s}} L / W = ${texQtyBody(R, "\\Omega")}`)}.\n`;
        setField("m3-R", R);
      }
      if (R === null && rho !== null && L !== null && A) {
        R = rho * L / A;
        proc += `${mj(`R = ${texQtyBody(rho, "\\Omega{\\cdot}m")} \\cdot ${texQtyBody(L, "m")} / ${texQtyBody(A, "m^{2}")} = ${texQtyBody(R, "\\Omega")}`)}.\n`;
        setField("m3-R", R);
      } else if (L === null && rho !== null && R !== null && A) {
        L = R * A / rho;
        proc += `${mj(`L = R A / \\rho = ${texQtyBody(L, "m")} = ${texQtyBody(L / 0.3048, "pies")}`)}.\n`;
        setField("m3-L", L);
        document.getElementById("m3-L-u").value = "1";
      } else if (rho === null && R !== null && L !== null && A) {
        rho = R * A / L;
        proc += `${mj(`\\rho = R A / L = ${texQtyBody(rho, "\\Omega{\\cdot}m")} = ${texQtyBody(rho * 100, "\\Omega{\\cdot}cm")}`)}.\n`;
        setField("m3-rho", rho);
        document.getElementById("m3-rho-u").value = "1";
      }
      if (eng != null) {
        proc += `${mj(`k = 1{,}662\\times 10^{-7}\\,\\Omega{\\cdot}\\mathrm{cm}\\,/\\,(\\mathrm{CM{\\cdot}\\Omega/pie})`)}.\n`;
        proc += `${mj(`\\rho_{\\Omega{\\cdot}cm} = ${texQtyBody(eng)} \\cdot 1{,}662\\times 10^{-7} = ${texQtyBody(eng * RHO_CM_TO_OHM_CM, "\\Omega{\\cdot}cm")}`)}.`;
      }
      if (rho != null && eng == null && R !== null && L !== null && d !== null && W === null) {
        const dMil = (d / 0.0254) * 1000;
        const Lft = L / 0.3048;
        const Acm = dMil * dMil;
        const engR = R * Acm / Lft;
        proc += `\n${mj(`\\rho_{\\mathrm{eng}} = ${texQtyBody(engR, "CM{\\cdot}\\Omega/pie")}`)}.`;
        proc += `\n${mj(`k = \\rho_{\\Omega{\\cdot}cm} / \\rho_{\\mathrm{eng}} = ${texQtyBody((rho * 100) / engR)}`)}.`;
      }
      if (!R && !rho && !d && Rs == null) {
        throw new Error("Faltan datos: combina ρ, L, d/A, Rs y R.");
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_5() {
  const btn = document.getElementById("btn-temp-3-5");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-5");
    try {
      const matKey = document.getElementById("t3-mat").value;
      let alpha = readOptionalNumber("t3-alpha");
      if (alpha !== null) alpha *= readUnit("t3-alpha-u");
      if (alpha === null && ALPHA_20[matKey] != null) alpha = ALPHA_20[matKey];
      if (alpha === null) throw new Error("Indica α, PPM o un material.");
      const R1 = readOptionalNumber("t3-R1");
      let R2 = readOptionalNumber("t3-R2");
      const T1raw = readOptionalNumber("t3-T1");
      const T2raw = readOptionalNumber("t3-T2");
      if (R1 === null || T1raw === null) throw new Error("Indica R₁ y T₁.");
      const T1 = toCelsius(T1raw, document.getElementById("t3-T1-u").value);
      const tInf = inferredT(alpha, 20);
      let proc = `${mj("R_2 = R_1\\, (T_2 - T_{\\mathrm{inf}}) / (T_1 - T_{\\mathrm{inf}})")},\\quad ${mj("T_{\\mathrm{inf}} = 20 - 1/\\alpha_{20}")}\n`;
      proc += `${mj(`\\alpha_{20} = ${texQtyBody(alpha, "^{\\circ}C^{-1}")} = ${texQtyBody(alpha * 1e6, "PPM/^{\\circ}C")}`)}, ${mj(`T_{\\mathrm{inf}} = ${texQtyBody(tInf, "^{\\circ}C")}`)}.\n`;
      proc += `${mj(`T_1 = ${texQtyBody(T1, "^{\\circ}C")}`)}.\n`;
      if (T2raw === null && R2 === null) throw new Error("Indica R₂ o T₂.");
      if (R2 === null) {
        const T2 = toCelsius(T2raw, document.getElementById("t3-T2-u").value);
        const den = T1 - tInf;
        if (den === 0) throw new Error("T₁ = T_inf.");
        R2 = R1 * (T2 - tInf) / den;
        proc += `${mj(`R_2 = ${texQtyBody(R1, "\\Omega")} \\cdot (${texQtyBody(T2)} - ${texQtyBody(tInf)}) / (${texQtyBody(T1)} - ${texQtyBody(tInf)}) = ${texQtyBody(R2, "\\Omega")}`)}.`;
        const lin = R1 * (1 + alpha * (T2 - T1));
        proc += `\nForma lineal en T₁: ${mj(`R_2 = R_1[1+\\alpha_1(T_2-T_1)] \\approx ${texQtyBody(lin, "\\Omega")}`)} (α₁ se corrige si T₁ ≠ 20 °C).`;
        setField("t3-R2", R2);
      } else {
        const den = T1 - tInf;
        if (den === 0 || R1 === 0) throw new Error("R₁ y (T₁ − T_inf) deben ser no nulos.");
        const T2 = tInf + (R2 / R1) * den;
        proc += `${mj(`T_2 = T_{\\mathrm{inf}} + (R_2/R_1)(T_1 - T_{\\mathrm{inf}}) = ${texQtyBody(T2, "^{\\circ}C")} = ${texQtyBody(T2 + 273.15, "K")} = ${texQtyBody(T2 * 9 / 5 + 32, "^{\\circ}F")}`)}.`;
        setField("t3-T2", T2);
        document.getElementById("t3-T2-u").value = "C";
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_6() {
  const sel = document.getElementById("sc-awg");
  fillSelect(sel, AWG_TABLE, (row) => {
    const o = document.createElement("option");
    o.value = row.id;
    o.textContent = `AWG ${row.id}`;
    return o;
  });
  if (sel && !sel.value) sel.value = "12";
  const btn = document.getElementById("btn-sc-3-6");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-6");
    try {
      let J = readOptionalNumber("sc-J");
      if (J === null) throw new Error("Indica la densidad J.");
      J *= readUnit("sc-J-u");
      const id = document.getElementById("sc-awg").value || "12";
      const row = AWG_TABLE.find((r) => r.id === id);
      const dIn = row.d / 1000;
      const Acm2 = Math.PI * ((dIn * 2.54) / 2) ** 2;
      const I = J * Acm2;
      let proc = `AWG ${row.id}: d = ${row.d} mils = ${formatQty(dIn * 25.4, "mm")}.\n`;
      proc += `${mj(`A = ${texQtyBody(Acm2, "cm^{2}")}`)}.\n`;
      proc += `${mj(`I = J A = ${texQtyBody(J, "A/cm^{2}")} \\cdot ${texQtyBody(Acm2, "cm^{2}")} = ${texQtyBody(I, "A")}`)}.\n`;
      proc += `Ampacidad de la tabla 3.2: ${row.amp} A. Factor ${formatQty(I / row.amp)} : 1.\n`;
      proc += "Un IC o una cinta HTS trabaja a MA/cm² en micras y, si es superconductor, en criogenia. El cable de planta se queda en unos pocos A/mm².";
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_7() {
  const btn = document.getElementById("btn-pot-3-7");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-7");
    try {
      const Rt = readOptionalNumber("pot-rt");
      let frac = readOptionalNumber("pot-frac");
      let Ra = readOptionalNumber("pot-ra");
      if (Rt === null || Rt === 0) throw new Error("Indica R total.");
      let proc = `Potenciómetro lineal ${formatQty(Rt, "\\Omega")}.\n`;
      if (frac === null && Ra !== null) frac = Ra / Rt;
      if (frac === null) throw new Error("Indica la fracción desde A o R (brazo–A).");
      if (frac < 0 || frac > 1) throw new Error("La fracción debe estar entre 0 y 1.");
      Ra = frac * Rt;
      const Rb = Rt - Ra;
      proc += `${mj(`R_{A} = f R_{t} = ${texQtyBody(frac)} \\cdot ${texQtyBody(Rt, "\\Omega")} = ${texQtyBody(Ra, "\\Omega")}`)}.\n`;
      proc += `${mj(`R_{B} = R_{t} - R_{A} = ${texQtyBody(Rb, "\\Omega")}`)}.\n`;
      proc += `Como reóstato: unir el brazo al terminal A (0 Ω entre A y brazo) y usar el tramo B. A f = ${formatQty(frac)} el tramo útil es ${formatQty(Rb, "\\Omega")} desde B, o ${formatQty(Ra, "\\Omega")} si se mide desde A.`;
      setField("pot-frac", frac);
      setField("pot-ra", Ra);
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_8() {
  const digitColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"];
  const mulColors = [...digitColors, "gold", "silver"];
  const tolColors = ["gold", "silver", "none", "brown", "red"];
  const fillBand = (id, keys, def) => {
    const sel = document.getElementById(id);
    if (!sel || sel.dataset.filled) return sel;
    keys.forEach((k) => {
      const o = document.createElement("option");
      o.value = k;
      o.textContent = COLOR_CODE[k].label;
      sel.appendChild(o);
    });
    sel.dataset.filled = "1";
    if (def) sel.value = def;
    return sel;
  };
  const s1 = fillBand("cb-1", digitColors, "brown");
  const s2 = fillBand("cb-2", digitColors, "black");
  const s3 = fillBand("cb-3", mulColors, "red");
  const s4 = fillBand("cb-4", tolColors, "gold");
  const paint = () => {
    [["viz-b1", s1], ["viz-b2", s2], ["viz-b3", s3], ["viz-b4", s4]].forEach(([vid, sel]) => {
      const el = document.getElementById(vid);
      if (!el || !sel) return;
      el.className = `resistor-band band-${sel.value}`;
    });
  };
  [s1, s2, s3, s4].forEach((sel) => sel && sel.addEventListener("change", paint));
  paint();
  const btn = document.getElementById("btn-color-3-8");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-3-8");
      try {
        paint();
        const b1 = COLOR_CODE[s1.value];
        const b2 = COLOR_CODE[s2.value];
        const b3 = COLOR_CODE[s3.value];
        const b4 = COLOR_CODE[s4.value];
        if (b1.digit == null || b2.digit == null || b3.mul == null) throw new Error("Bandas 1–3 inválidas.");
        const R = (b1.digit * 10 + b2.digit) * b3.mul;
        const tol = b4.tol != null ? b4.tol : 0.2;
        const lo = R * (1 - tol);
        const hi = R * (1 + tol);
        let proc = `${b1.label}, ${b2.label}, ${b3.label}, ${b4.label}.\n`;
        proc += `${mj(`R = (${b1.digit}${b2.digit}) \\times ${texQtyBody(b3.mul)} = ${texQtyBody(R, "\\Omega")}`)} `;
        proc += `${mj(`\\pm ${texQtyBody(tol * 100, "\\%")}`)}.\n`;
        proc += `Intervalo: ${formatQty(lo, "\\Omega")} – ${formatQty(hi, "\\Omega")}.`;
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnTol = document.getElementById("btn-tol-3-8");
  if (btnTol) {
    btnTol.addEventListener("click", () => {
      const out = document.getElementById("proc-3-8-tol");
      try {
        const r1 = readOptionalNumber("tol-r1");
        const r2 = readOptionalNumber("tol-r2");
        const pct = readOptionalNumber("tol-pct");
        if (r1 == null || r2 == null || pct == null) throw new Error("Indica R₁, R₂ y la tolerancia.");
        const t = pct / 100;
        const a1 = r1 * (1 - t), b1 = r1 * (1 + t);
        const a2 = r2 * (1 - t), b2 = r2 * (1 + t);
        const lo = Math.max(a1, a2);
        const hi = Math.min(b1, b2);
        const overlap = lo <= hi + 1e-12;
        let proc = `${formatQty(r1, "\\Omega")} ± ${pct} % → ${formatQty(a1, "\\Omega")} – ${formatQty(b1, "\\Omega")}.\n`;
        proc += `${formatQty(r2, "\\Omega")} ± ${pct} % → ${formatQty(a2, "\\Omega")} – ${formatQty(b2, "\\Omega")}.\n`;
        proc += overlap
          ? `Hay traslape: ${formatQty(lo, "\\Omega")} – ${formatQty(hi, "\\Omega")}.`
          : `No hay traslape (hueco ${formatQty(hi, "\\Omega")} – ${formatQty(lo, "\\Omega")}).`;
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec3_9() {
  const btn = document.getElementById("btn-g-3-9");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-9");
    try {
      let R = readOptionalNumber("g3-R");
      let G = readOptionalNumber("g3-G");
      const dA = readFlexible("g3-dA");
      const dL = readFlexible("g3-dL");
      if (R == null && G == null) throw new Error("Indica R o G.");
      if (R == null) {
        if (G === 0) throw new Error("G = 0 no define R.");
        R = 1 / G;
        setField("g3-R", R);
      } else if (G == null) {
        if (R === 0) throw new Error("R = 0 no define G.");
        G = 1 / R;
        setField("g3-G", G);
      }
      let proc = `${mj(`G = 1/R = ${texQtyBody(G, "S")}`)}, ${mj(`R = ${texQtyBody(R, "\\Omega")}`)}.\n`;
      if (dA != null || dL != null) {
        const fA = 1 + (dA || 0);
        const fL = 1 + (dL || 0);
        if (fA <= 0 || fL === 0) throw new Error("La geometría resultante es inválida.");
        const G2 = G * fA / fL;
        proc += `${mj("G \\propto A / L")}. A₂/A₁ = ${formatQty(fA)}, L₂/L₁ = ${formatQty(fL)}.\n`;
        proc += `${mj(`G_2 = G_1 (A_2/A_1)(L_1/L_2) = ${texQtyBody(G2, "S")}`)}.`;
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_10() {
  const btn = document.getElementById("btn-ohm-3-10");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-10");
    try {
      const V = readOptionalNumber("ohm-v");
      let I = readOptionalNumber("ohm-i");
      if (I !== null) I *= readUnit("ohm-i-u");
      let R = readOptionalNumber("ohm-r");
      const kind = document.getElementById("ohm-kind").value;
      if (R == null && V != null && I != null) {
        if (I === 0) throw new Error("I = 0 → R infinita (abierto).");
        R = V / I;
      }
      if (R == null) throw new Error("Indica R, o V e I.");
      let proc = `${mj("R = V / I")}. Lectura ${formatQty(R, "\\Omega")}. Circuito desenergizado.\n`;
      if (kind === "fuse") {
        proc += R < 1
          ? "Casi 0 Ω: fusible / seccionador cerrado e íntegro (gPV, NH o seccionador de 1500 Vcc)."
          : "OL o R alta: abierto. Fusible fundido o cuchilla levantada. Confirmar con microohmímetro Kelvin.";
      } else if (kind === "switch") {
        proc += R < 1
          ? "ON: contacto cerrado. Si R es de ohmios y no de miliohmios, el contacto está picado."
          : "OFF o contacto abierto. Un ON con megaohmios es falla del polo.";
      } else if (kind === "lamp") {
        proc += R < 1e3
          ? "Filamento continuo (foco frío: pocos ohmios; un string se verifica con IV tracer, no con esta R)."
          : "Abierto: lámpara fundida o string interrumpido.";
      } else {
        proc += R < 0.001
          ? "Unión de busbar sana (µΩ–mΩ). Típico de pletina de inversor o de rack LFP."
          : "Unión sucia o floja: I²R local, punto caliente en la termografía 2026.";
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_11() {
  const btn = document.getElementById("btn-ntc-3-11");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-11");
    try {
      const R0 = readOptionalNumber("ntc-r0");
      const T0c = readOptionalNumber("ntc-t0");
      const beta = readOptionalNumber("ntc-beta");
      const Tc = readOptionalNumber("ntc-t");
      if ([R0, T0c, beta, Tc].some((v) => v == null)) throw new Error("Indica R₀, T₀, β y T.");
      const T0 = T0c + 273.15;
      const T = Tc + 273.15;
      const R = R0 * Math.exp(beta * (1 / T - 1 / T0));
      const dRdT = -R * beta / (T * T);
      let proc = `${mj("R = R_0 \\exp[\\beta(1/T - 1/T_0)]")}\\ (T\\ \\mathrm{en\\ K}).\n`;
      proc += `${mj(`R(${texQtyBody(Tc, "^{\\circ}C")}) = ${texQtyBody(R, "\\Omega")}`)}.\n`;
      proc += `${mj(`dR/dT \\approx -R\\beta / T^{2} = ${texQtyBody(dRdT, "\\Omega/^{\\circ}C")}`)}.\n`;
      proc += "α no es constante: la curva es logarítmica. NTC (coeficiente negativo).";
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_12() {
  const btn = document.getElementById("btn-pc-3-12");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-12");
    try {
      const R0 = readOptionalNumber("pc-r0");
      const E0 = readOptionalNumber("pc-e0");
      const g = readOptionalNumber("pc-g");
      const E = readOptionalNumber("pc-e");
      if ([R0, E0, g, E].some((v) => v == null)) throw new Error("Indica R₀, E₀, γ y E.");
      if (E0 === 0 || E <= 0) throw new Error("E y E₀ deben ser > 0.");
      const R = R0 * Math.pow(E / E0, -g);
      const dRdE = -g * R / E;
      let proc = `${mj("R = R_0 (E/E_0)^{-\\gamma}")}.\n`;
      proc += `${mj(`R(${texQtyBody(E, "fc")}) = ${texQtyBody(R, "\\Omega")}`)}.\n`;
      proc += `${mj(`dR/dE = -\\gamma R/E = ${texQtyBody(dRdE, "\\Omega/fc")}`)}.\n`;
      proc += "Coeficiente de iluminación negativo. γ no es fijo en 0.1–1000 fc (escala log).";
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec3_13() {
  const btn = document.getElementById("btn-mov-3-13");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-3-13");
    try {
      const k = readOptionalNumber("mov-k");
      const a = readOptionalNumber("mov-a");
      let V = readOptionalNumber("mov-v");
      let I = readOptionalNumber("mov-i");
      if (k == null || a == null) throw new Error("Indica k y α.");
      if (V == null && I == null) throw new Error("Indica V o I.");
      if (k <= 0 || a === 0) throw new Error("k debe ser > 0 y α ≠ 0.");
      let proc = `${mj("I = k V^{\\alpha}")}.\n`;
      if (I == null) {
        if (V <= 0) throw new Error("V debe ser > 0.");
        I = Math.exp(Math.log(k) + a * Math.log(V));
        proc += `${mj(`I = ${texQtyBody(k)} \\cdot ${texQtyBody(V, "V")}^{${texQtyBody(a)}} = ${texQtyBody(I, "A")} = ${texQtyBody(I * 1000, "mA")}`)}.`;
        setField("mov-i", I);
      } else if (V == null) {
        if (k === 0 || I <= 0) throw new Error("I y k deben ser > 0.");
        V = Math.exp((Math.log(I) - Math.log(k)) / a);
        proc += `${mj(`V = (I/k)^{1/\\alpha} = ${texQtyBody(V, "V")}`)}.`;
        setField("mov-v", V);
      } else {
        const Icalc = Math.exp(Math.log(k) + a * Math.log(V));
        proc += `Comprobación: ${mj(`k V^{\\alpha} = ${texQtyBody(Icalc, "A")}`)} (ingresado ${formatQty(I, "A")}).`;
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

// --- Mini-Calculadora Entrenador ---
function initMiniCalc() {
  const btn = document.getElementById('mc-calc-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      try {
        const v1 = Number(document.getElementById('mc-val1').value || 0);
        const e1 = Number(document.getElementById('mc-exp1').value || 0);
        const v2 = Number(document.getElementById('mc-val2').value || 0);
        const e2 = Number(document.getElementById('mc-exp2').value || 0);
        const op = document.getElementById('mc-op').value;
        
        const num1 = v1 * Math.pow(10, e1);
        const num2 = v2 * Math.pow(10, e2);
        
        let res = 0;
        if (op === '+') res = num1 + num2;
        if (op === '-') res = num1 - num2;
        if (op === '*') res = num1 * num2;
        if (op === '/') {
          if (num2 === 0) throw new Error("Indeterminado");
          res = num1 / num2;
        }
        
        setMathText(document.getElementById('mc-res-val'), formatEngineering(res));
      } catch (e) {
        setMathText(document.getElementById('mc-res-val'), e.message);
      }
    });
  }
}

function initPresets() {
  const selectors = document.querySelectorAll('.book-preset-select');
  selectors.forEach(select => {
    select.addEventListener('change', (e) => {
      const section = select.getAttribute('data-section');
      const val = select.value;
      if (!section || !presetsData[section]) return;
      const data = presetsData[section][val];
      if (!data) return;
      
      const descEl = document.getElementById(`desc-preset-${section}`);
      if (descEl) {
        setMathText(descEl, texifyMath(data.desc));
        descEl.style.display = 'block';
      }
      
      if (section === '1-6') {
        if (data.type === 'num') {
          document.getElementById('num-1-6').value = data.val;
          document.getElementById('btn-convert-1-6').click();
        } else if (data.type === 'op') {
          document.getElementById('op1-1-6').value = data.op1;
          document.getElementById('operator-1-6').value = data.op;
          document.getElementById('op2-1-6').value = data.op2;
          document.getElementById('btn-calc-1-6').click();
        }
      } else if (section === '1-7') {
        document.getElementById('val-1-7').value = data.val;
        document.getElementById('prefix-from-1-7').value = data.from;
        document.getElementById('prefix-to-1-7').value = data.to;
        document.getElementById('btn-convert-1-7').click();
      } else if (section === '1-8') {
        if (data.type === 'gen') {
          document.getElementById('val-1-8').value = data.val;
          document.getElementById('unit-type-1-8').value = data.utype;
          populateUnits1_8();
          document.getElementById('unit-from-1-8').value = data.from;
          document.getElementById('unit-to-1-8').value = data.to;
          document.getElementById('btn-convert-1-8').click();
        } else if (data.type === 'prefix') {
          document.querySelector('[data-target="sec-1-7"]').click();
          document.getElementById('preset-1-7').value = '';
          document.getElementById('val-1-7').value = data.val;
          document.getElementById('prefix-from-1-7').value = data.from;
          document.getElementById('prefix-to-1-7').value = data.to;
          document.getElementById('btn-convert-1-7').click();
        } else if (data.type === 'kin') {
          document.getElementById('kin-d').value = data.d;
          document.getElementById('kin-v').value = data.v;
          document.getElementById('kin-t').value = data.t;
          document.getElementById('btn-kin-calc').click();
        }
      } else if (section === '1-10') {
        document.getElementById('val-1-10').value = data.val;
        document.getElementById('conv-preset-1-10').value = data.preset;
        document.getElementById('btn-convert-1-10').click();
      } else if (section === '1-11') {
        document.getElementById('expr-1-11').value = data.expr;
        document.getElementById('btn-calc-1-11').click();
      } else if (section === '2-1') {
        if (data.type === 'coulomb' || data.type === 'coulomb-plot') {
          setField('c2-q1', data.q1);
          setField('c2-q2', data.q2);
          setField('c2-r', data.r);
          setField('c2-f', data.f);
          document.getElementById('c2-q1-u').value = data.q1u;
          document.getElementById('c2-q2-u').value = data.q2u;
          document.getElementById('c2-r-u').value = data.ru;
          document.getElementById('btn-coulomb-2-1').click();
        }
      } else if (section === '2-2') {
        if (data.type === 'current') {
          setField('c2-i', data.i);
          setField('c2-q', data.q);
          setField('c2-n', data.n);
          setField('c2-t', data.t);
          setField('c2-fuse', data.fuse);
          document.getElementById('c2-i-u').value = data.iu;
          document.getElementById('c2-q-u').value = data.qu;
          document.getElementById('c2-t-u').value = data.tu;
          document.getElementById('btn-current-2-2').click();
        }
      } else if (section === '2-3') {
        if (data.type === 'voltage') {
          setField('v2-v', data.v);
          setField('v2-w', data.w);
          setField('v2-q', data.q);
          setField('v2-n', data.n);
          setField('v2-i', data.i);
          setField('v2-t', data.t);
          document.getElementById('v2-v-u').value = data.vu;
          document.getElementById('v2-w-u').value = data.wu;
          document.getElementById('v2-q-u').value = data.qu;
          document.getElementById('v2-i-u').value = data.iu;
          document.getElementById('v2-t-u').value = data.tu;
          document.getElementById('btn-voltage-2-3').click();
        }
      } else if (section === '2-4') {
        if (data.type === 'ah') {
          setField('ah-ah', data.ah);
          setField('ah-i', data.i);
          setField('ah-t', data.t);
          setField('ah-v', data.v);
          document.getElementById('ah-t-u').value = data.tu;
          document.getElementById('btn-ah-2-4').click();
        }
      } else if (section === '2-7') {
        if (data.type === 'meter') {
          setField('m2-i', data.i);
          setField('m2-v', data.v);
          setField('m2-t', data.t);
          document.getElementById('m2-i-u').value = data.iu;
          document.getElementById('m2-t-u').value = data.tu;
          document.getElementById('btn-meter-2-7').click();
        }
      } else if (String(section).startsWith('3-')) {
        applyPresetFields(data);
      }
    });
  });
}

function applyPresetFields(data) {
  if (!data) return;
  if (data.fields) {
    Object.entries(data.fields).forEach(([id, v]) => setField(id, v));
  }
  if (data.selects) {
    Object.entries(data.selects).forEach(([id, v]) => {
      const el = document.getElementById(id);
      if (el) el.value = v;
    });
  }
  if (data.click) {
    const btn = document.getElementById(data.click);
    if (btn) btn.click();
  }
}
