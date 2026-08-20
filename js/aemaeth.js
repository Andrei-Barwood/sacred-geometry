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
  },
  "4-1": {
    p1: { fields: { "ohm4-v": "", "ohm4-i": "2.5", "ohm4-r": "6", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 1 — Dump load de un aerogenerador de 6 Ω con 2.5 A (eólica, no convencional).\nV = I R = 2.5 · 6 = 15 V.\nP = I²R = 6.25 · 6 = 37.5 W.\nEl enunciado original dice «caída de potencia»: la ley de Ohm da el voltaje; I²R es el calor que el ballast tiene que tirar al aire. En 2026 ese resistor está en el chopper de un aerogenerador o en el ballast de una mini-hidro cuando la red no absorbe." },
    p2: { fields: { "ohm4-v": "12", "ohm4-i": "", "ohm4-r": "72", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 2 — Resistencia de 72 Ω a 12 V: ignitor de un quemador de biomasa o resistencia auxiliar de un colector solar térmico (convencional).\nI = V / R = 12 / 72 = 0.1667 A = 166.7 mA." },
    p3: { fields: { "ohm4-v": "6", "ohm4-i": "1.5", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "0.001", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 3 — Limitar a 1.5 mA un piranómetro de silicio o el LED de un tracker con 6 V de caída (FV, no convencional).\nR = V / I = 6 / 0.0015 = 4000 Ω = 4 kΩ." },
    p4: { fields: { "ohm4-v": "12", "ohm4-i": "", "ohm4-r": "0.056", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 4 — Arranque desde un banco auxiliar de 12 V. R = 0.056 Ω: motor de yaw de un aerogenerador o servomotor de compuerta de una mini-hidro.\nI = 12 / 0.056 = 214.3 A.\nEs la corriente de inrush: el cable y el fusible se dimensionan a ese pico, no al I nominal." },
    p5: { fields: { "ohm4-v": "", "ohm4-i": "3.6", "ohm4-r": "0.02", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1e-6", "ohm4-r-u": "1e6" }, click: "btn-ohm-4-1",
      desc: "Prob. 5 — Aislamiento de un string FV (0.02 MΩ = 20 kΩ) con 3.6 µA de fuga.\nV = I R = 3.6e-6 · 2.0e4 = 0.072 V = 72 mV.\nUn megaóhmetro de planta a 1000–1500 Vcc vería megaohmios, no 20 kΩ: 20 kΩ ya es un aislamiento degradado (humedad en la caja de combinadores)." },
    p6: { fields: { "ohm4-v": "62", "ohm4-i": "", "ohm4-r": "15", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "0.001", "ohm4-r-u": "1e3" }, click: "btn-ohm-4-1",
      desc: "Prob. 6 — Canal de voltímetro del PPC / SCADA, Ri = 15 kΩ, leyendo 62 V (toma de un divisor del bus).\nI = 62 / 15 000 = 4.133 mA.\nEl instrumento 2026 tiene Ri de megaohmios; 15 kΩ es el modelo de laboratorio del libro, útil para ver que el medidor también consume." },
    p7: { fields: { "ohm4-v": "120", "ohm4-i": "2.2", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 7 — Frigorífico de una cabaña híbrida (FV + mini-hidro) a 2.2 A / 120 V.\nR = 120 / 2.2 = 54.55 Ω.\nEs la R equivalente de la carga, no un resistor de carbón: el compresor es un motor." },
    p8: { fields: { "ohm4-v": "120", "ohm4-i": "", "ohm4-r": "7.5", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "0.001", "ohm4-r-u": "1e3" }, click: "btn-ohm-4-1",
      desc: "Prob. 8 — RTU / logger de recurso (eólico o FV) con Ri = 7.5 kΩ a 120 V de auxiliares.\nI = 120 / 7500 = 16.00 mA.\nP = 1.92 W: es la electrónica que el UPS de planta tiene que sostener si cae la red." },
    p9: { fields: { "ohm4-v": "120", "ohm4-i": "4.2", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 9 — Bomba de calor geotérmica (convencional) clasificada 4.2 A a 120 V.\nR = 120 / 4.2 = 28.57 Ω.\nP = 504 W: el COP mueve más calor que esos 504 W eléctricos; la ley de Ohm solo ve el lado eléctrico." },
    p10: { fields: { "ohm4-v": "120", "ohm4-i": "0.76", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 10 — Trace heating de una línea de biodiesel / biogás (biomasa, convencional) a 0.76 A / 120 V.\nR = 120 / 0.76 = 157.9 Ω.\nP = 91.2 W por tramo: es el orden de un cable autorregulante en un tanque." },
    p11: { fields: { "ohm4-v": "24", "ohm4-i": "20", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "0.001", "ohm4-i-u": "1e-6", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 11 — Entrada de un driver de SiC (inversor string / convertidor eólico): 20 µA a 24 mV.\nR = V / I = 0.024 / 20e-6 = 1200 Ω.\nNo es el R_DS(on) (miliohmios): es la R de entrada del control. El MOSFET de potencia conduce amperes; su puerta, microamperes." },
    p12: { fields: { "ohm4-v": "", "ohm4-i": "15", "ohm4-r": "0.5", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 12 — Resistencia interna de un generador hidroeléctrico o de un rack de BESS: 0.5 Ω a 15 A.\nV = I R = 7.50 V de caída interna.\nA 15 A se pierden 112.5 W en calor: por eso el busbar 2026 se especifica en miliohmios, no en medios ohmios." },
    p13a: { fields: { "ohm4-v": "120", "ohm4-i": "9.5", "ohm4-r": "", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1" }, click: "btn-ohm-4-1",
      desc: "Prob. 13.a — Ballast resistivo de un aerogenerador (o carga de una mini-hidro aislada) a 9.5 A / 120 V.\nR = 120 / 9.5 = 12.63 Ω.\nP = 1140 W: es un calefactor de 1.14 kW disfrazado de «resistor»." },
    p13b: { fields: { "ohm4-v": "120", "ohm4-i": "9.5", "ohm4-r": "", "ohm4-t": "1" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "1", "ohm4-r-u": "1", "ohm4-t-u": "3600" }, click: "btn-ohm-4-1",
      desc: "Prob. 13.b — Energía en 1 h, con W = V I t (cap. 2).\nP = 1140 W. W = 1140 · 3600 = 4.104×10⁶ J = 1.140 kWh.\nEn una hora el ballast convirtió 1.14 kWh de viento (o de agua) en calor. El medidor del PCC lo habría inyectado a la red si el chopper no lo hubiera disipado." }
  },
  "4-2": {
    p14: { fields: { "lin-r1": "100", "lin-r2": "0.5", "lin-vmax": "10" },
      selects: { "lin-i-u": "1" }, click: "btn-lin-4-2",
      desc: "Prob. 14 — Rectas de 100 Ω (shunt / bleeder de BESS) y 0.5 Ω (dump load eólico o ballast hidro) sobre la fig. 4.6.\nI = V / R. A 10 V: 100 Ω → 0.100 A; 0.5 Ω → 20 A.\nLa de 0.5 Ω no cabe en un eje de 1 A: hay que reproducir la gráfica. Pendiente 1/R: el dump load es casi vertical; el bleeder, casi horizontal." },
    p15: { fields: { "pw-r1": "20", "pw-v1": "10", "pw-r2": "2", "pw-v2": "", "pw-r3": "", "pw-probe": "10 12" },
      click: "btn-pw-4-2",
      desc: "Prob. 15 — Precharge de un BESS o de un enlace de cd eólico: 20 Ω de 0 a 10 V y 2 Ω para voltajes mayores (el contactor ya cerró).\nHasta 10 V: I = V / 20 → a 10 V, 0.50 A.\nDespués: I = 0.50 + (V − 10) / 2. A 12 V, I = 1.50 A.\nNo es un ohmio único: es la característica de un dispositivo que cambia de régimen. El fusible se dimensiona al tramo de 2 Ω." },
    p16: { fields: { "lin-r1": "2000", "lin-r2": "50000", "lin-vmax": "20" },
      selects: { "lin-i-u": "1000" }, click: "btn-lin-4-2",
      desc: "Prob. 16 — 2 kΩ (divisor del bus de 1500 Vcc, escala de laboratorio 0–20 V) y 50 kΩ (monitor de aislamiento ISO).\nEje horizontal 0–20 V, vertical en mA.\nA 20 V: 2 kΩ → 10.0 mA; 50 kΩ → 0.40 mA.\nLas dos son rectas; la de 50 kΩ casi se confunde con el eje V." },
    p17: { fields: { "ohm4-v": "", "ohm4-i": "400", "ohm4-r": "2", "ohm4-t": "" },
      selects: { "ohm4-v-u": "1", "ohm4-i-u": "0.001", "ohm4-r-u": "1e3" }, click: "btn-ohm-4-1",
      desc: "Prob. 17 — ΔV en 2 kΩ (sensor de un string o bleeder) con ΔI = 400 mA.\nΔV = ΔI · R = 0.400 · 2000 = 800 V.\nUn cambio de 400 mA a través de 2 kΩ no es un shunt: es un evento de arco o un error de escala. Un shunt de string 2026 es de miliohmios y ΔV de milivoltios." },
    p18a: { fields: { "pw-r1": "500", "pw-v1": "1", "pw-r2": "50", "pw-v2": "2", "pw-r3": "-20", "pw-probe": "" },
      click: "btn-pw-4-2",
      desc: "Prob. 18.a — Característica tipo diodo túnel (Esaki): 500 Ω de 0 a 1 V, 50 Ω de 1 a 2 V, −20 Ω por encima.\nLa R negativa es diferencial (pendiente dV/dI), no un ohmio que genere potencia. En 2026 el análogo de planta es el foldback de un inversor grid-forming y el pliegue N de algunas uniones tándem de laboratorio; no se usa un túnel como componente de potencia." },
    p18b: { fields: { "pw-r1": "500", "pw-v1": "1", "pw-r2": "50", "pw-v2": "2", "pw-r3": "-20", "pw-probe": "0.7 1.5 2.5" },
      click: "btn-pw-4-2",
      desc: "Prob. 18.b — Corrientes en la característica del 18.a (R incremental).\n0.7 V (tramo 500 Ω): I = 0.7 / 500 = 1.40 mA.\n1.5 V: I(1 V) = 2.00 mA; ΔI = 0.5 / 50 = 10 mA → I = 12.0 mA.\n2.5 V: I(2 V) = 22.0 mA; ΔI = 0.5 / (−20) = −25 mA → I = −3.00 mA.\nEl tramo negativo cruza I = 0: es la firma del túnel / del foldback, no de un resistor de dump load." }
  },
  "4-3": {
    p19: { fields: { "pow-v": "", "pow-i": "", "pow-r": "", "pow-p": "", "pow-t": "7", "pow-w": "420" },
      selects: { "pow-t-u": "60", "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 19 — 420 J absorbidos por un dump load (eólico) o por un ballast hidro en 7 min.\nP = W / t = 420 / 420 = 1.00 W.\nUn julio por segundo, sostenido 7 minutos: es el calor de un resistor de laboratorio, no de un parque, pero la fórmula es la misma que usa el EMS." },
    p20: { fields: { "pow-v": "", "pow-i": "", "pow-r": "", "pow-p": "40", "pow-t": "", "pow-w": "640" },
      selects: { "pow-p-u": "1", "pow-t-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 20 — Auxiliar de inversor a 40 J/s (40 W). Tiempo para entregar 640 J.\nt = W / P = 640 / 40 = 16.0 s." },
    p21a: { fields: { "pow-v": "", "pow-i": "", "pow-r": "", "pow-p": "2", "pow-t": "8", "pow-w": "" },
      selects: { "pow-p-u": "1", "pow-t-u": "3600" }, click: "btn-pow-4-3",
      desc: "Prob. 21.a — Baliza LED de 2 W en una torre eólica o en una chimenea de biomasa, 8 h de noche.\nW = P t = 2 · 8 · 3600 = 57 600 J." },
    p21b: { fields: { "pow-v": "", "pow-i": "", "pow-r": "", "pow-p": "2", "pow-t": "8", "pow-w": "" },
      selects: { "pow-p-u": "1", "pow-t-u": "3600" }, click: "btn-pow-4-3",
      desc: "Prob. 21.b — Misma baliza en kWh: 2 W · 8 h = 16 Wh = 0.016 kWh.\nEl medidor de auxiliares de planta registra kWh, no julios." },
    p22: { fields: { "pow-v": "", "pow-i": "5", "pow-r": "10", "pow-p": "", "pow-t": "1", "pow-w": "" },
      selects: { "pow-r-u": "1", "pow-i-u": "1", "pow-t-u": "60" }, click: "btn-pow-4-3",
      desc: "Prob. 22 — 10 Ω (interconexión de un BESS o dump) con 300 C/min.\nI = 300 C / 60 s = 5.00 A. P = I²R = 25 · 10 = 250 W.\nV = I R = 50 V. En un minuto pasaron 300 C y se disiparon 15 kJ." },
    p23: { fields: { "pow-v": "3", "pow-i": "2", "pow-r": "", "pow-p": "", "pow-t": "", "pow-w": "12" },
      selects: { "pow-i-u": "1", "pow-t-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 23 — Calefactor de una celda LFP (BESS, no convencional): 2 A a 3 V para disipar 12 J.\nP = V I = 6 W. t = W / P = 12 / 6 = 2.00 s.\nEl pad de la celda no se deja 2 A fijos: el BMS lo modula. La cuenta es la misma." },
    p24: { fields: { "pow-v": "6", "pow-i": "0.8", "pow-r": "", "pow-p": "", "pow-t": "1", "pow-w": "" },
      selects: { "pow-i-u": "1", "pow-t-u": "60" }, click: "btn-pow-4-3",
      desc: "Prob. 24 — Batería de 6 V de un tracker agrovoltaico. Carga a 48 C/min.\nI = 48 / 60 = 0.800 A. P = V I = 6 · 0.8 = 4.80 W." },
    p25: { fields: { "pow-v": "", "pow-i": "7", "pow-r": "4", "pow-p": "", "pow-t": "", "pow-w": "" },
      selects: { "pow-i-u": "0.001", "pow-r-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 25 — Sensor de 4 Ω a 7 mA (shunt de un string piloto o NTC polarizado).\nP = I²R = (0.007)² · 4 = 1.96×10⁻⁴ W = 0.196 mW." },
    p26: { fields: { "pow-v": "9", "pow-i": "", "pow-r": "3", "pow-p": "", "pow-t": "", "pow-w": "" },
      selects: { "pow-v-u": "0.001", "pow-r-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 26 — Caída de 9 mV en 3 Ω: shunt de un ramal de BESS o de un string.\nPon 9 mV = 0.009 V. I = 0.009 / 3 = 3.00 mA. P = 27.0 µW.\nUn shunt de planta real cae 50–100 mV a I nominal, no 9 mV a 3 mA; la fórmula no cambia." },
    p27: { fields: { "pow-v": "", "pow-i": "", "pow-r": "4", "pow-p": "64", "pow-t": "", "pow-w": "" },
      selects: { "pow-r-u": "1", "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 27 — Dump load de 4 Ω que disipa 64 W (eólica / mini-hidro).\nI = √(P / R) = √(64 / 4) = 4.00 A. V = 16.0 V." },
    p28: { fields: { "pow-v": "", "pow-i": "", "pow-r": "1000", "pow-p": "0.5", "pow-t": "", "pow-w": "" },
      selects: { "pow-r-u": "1", "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 28 — Bleeder de 1000 Ω / ½ W en el bus de cd de un microinversor.\nI_máx = √(P / R) = √(0.5 / 1000) = 22.36 mA.\nV_máx = √(P R) = 22.36 V. Superar ½ W cocina el resistor y deja el bus sin descarga." },
    p29: { fields: { "pow-v": "", "pow-i": "", "pow-r": "2.2", "pow-p": "42", "pow-t": "", "pow-w": "" },
      selects: { "pow-r-u": "1e3", "pow-p-u": "0.001" }, click: "btn-pow-4-3",
      desc: "Prob. 29 — 2.2 kΩ en el rack de comunicaciones de planta disipa 42 mW.\nV = √(P R) = √(0.042 · 2200) = 9.612 V." },
    p30: { fields: { "pow-v": "9", "pow-i": "45", "pow-r": "", "pow-p": "", "pow-t": "", "pow-w": "" },
      selects: { "pow-i-u": "0.001" }, click: "btn-pow-4-3",
      desc: "Prob. 30 — Nodo IoT / logger de 9 V, 45 mA (recurso eólico o piranómetro).\nP = V I = 9 · 0.045 = 0.405 W. Es el valor nominal de potencia de la ficha." },
    p31: { fields: { "pow-v": "120", "pow-i": "", "pow-r": "", "pow-p": "100", "pow-t": "", "pow-w": "" },
      selects: { "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 31 — Lámpara / calefactor de 100 W a 120 V (emergencia de subestación o hopper de biomasa).\nR_caliente = V² / P = 14 400 / 100 = 144 Ω.\nI = P / V = 0.833 A.\nEl tungsteno (o el NiCr) tiene R_frío menor: el inrush es mayor que 0.833 A." },
    p32: { fields: { "pow-v": "", "pow-i": "3.75", "pow-r": "", "pow-p": "450", "pow-t": "", "pow-w": "" },
      selects: { "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 32 — Bomba de calor / auxiliar geotérmico de 450 W a 3.75 A.\nV = P / I = 450 / 3.75 = 120 V. R = V / I = 32.0 Ω." },
    p33a: { fields: { "pow-v": "3", "pow-i": "", "pow-r": "", "pow-p": "0.4", "pow-t": "", "pow-w": "" },
      selects: { "pow-p-u": "0.001" }, click: "btn-pow-4-3",
      desc: "Prob. 33.a — Logger / IV-tracer de bolsillo a 3 V, 0.4 mW.\nI = P / V = 4.0e-4 / 3 = 1.333×10⁻⁴ A = 0.133 mA." },
    p33b: { fields: { "pow-v": "3", "pow-i": "", "pow-r": "", "pow-p": "0.4", "pow-t": "500", "pow-w": "" },
      selects: { "pow-p-u": "0.001", "pow-t-u": "3600" }, click: "btn-pow-4-3",
      desc: "Prob. 33.b — 500 h con la misma pila de 3 V.\nAh = I t = 1.333e-4 A · 500 h = 0.0667 Ah.\nUna celda de botón de 200 mAh sobra; el dato útil es el ampere-hora, no el julio." },
    p34: { fields: { "pow-v": "", "pow-i": "", "pow-r": "20", "pow-p": "100", "pow-t": "", "pow-w": "" },
      selects: { "pow-r-u": "1e3", "pow-p-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 34 — Bleeder de 20 kΩ / 100 W en un bus de 1500 Vcc.\nI_máx = √(P / R) = √(100 / 20 000) = 70.71 mA.\nV_máx = √(P R) = 1414 V.\nA 1500 Vcc este resistor ya está fuera de placa: o se sube P, o se pone una cadena." },
    p35a: { fields: { "pi-r": "100", "pi-imax": "100", "pi-pmark": "" },
      selects: { "pi-i-u": "0.001", "pi-p-u": "1" }, click: "btn-pi-4-3",
      desc: "Prob. 35.a — P(I) para 100 Ω, P de 0 a 1 W, I de 0 a 100 mA.\nP = I²R = 100 I². A 100 mA, P = 1.00 W. Es la curva de un bleeder o de un dump pequeño." },
    p35b: {
      desc: "Prob. 35.b — No es lineal. P ∝ I²: es una parábola. Duplicar I cuadruplica el calor. Por eso un string al doble de Imp no «se calienta el doble» en el cable: se calienta cuatro veces (si R es fija)." },
    p35c: { fields: { "pi-r": "100", "pi-imax": "100", "pi-pmark": "500" },
      selects: { "pi-i-u": "0.001", "pi-p-u": "0.001" }, click: "btn-pi-4-3",
      desc: "Prob. 35.c — 500 mW en 100 Ω.\nI = √(P / R) = √(0.5 / 100) = 70.71 mA.\nSe lee en la gráfica: no está a mitad de 100 mA, porque la curva no es una recta." },
    p36a: { fields: { "pow-v": "9", "pow-i": "0.455", "pow-r": "", "pow-p": "", "pow-t": "", "pow-w": "" },
      selects: { "pow-i-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 36.a — HMI portátil / tablet de SCADA a 0.455 A / 9 V (sala de control de un parque).\nP = 9 · 0.455 = 4.095 W." },
    p36b: { fields: { "pow-v": "9", "pow-i": "0.455", "pow-r": "", "pow-p": "", "pow-t": "", "pow-w": "" },
      selects: { "pow-i-u": "1" }, click: "btn-pow-4-3",
      desc: "Prob. 36.b — R interna equivalente: R = V / I = 9 / 0.455 = 19.78 Ω." },
    p36c: { fields: { "pow-v": "9", "pow-i": "0.455", "pow-r": "", "pow-p": "", "pow-t": "6", "pow-w": "" },
      selects: { "pow-i-u": "1", "pow-t-u": "3600" }, click: "btn-pow-4-3",
      desc: "Prob. 36.c — Energía en 6 h de turno.\nW = 4.095 · 6 · 3600 = 8.845×10⁴ J = 0.02457 kWh.\nLa batería interna tiene que guardar al menos eso (más DoD y rendimiento)." },
    p37a: { fields: { "pcc-v": "120", "pcc-i": "100" }, click: "btn-pcc-4-3",
      desc: "Prob. 37.a — Acometida / PCC de una microred rural 120 V, 100 A (FV + mini-hidro + BESS detrás del medidor).\nP_máx = V I = 120 · 100 = 12.00 kW." },
    p37b: { fields: { "pcc-v": "120", "pcc-i": "100", "pcc-l1h": "5", "pcc-l1p": "", "pcc-l1n": "Motor de molino (biomasa)",
        "pcc-l2p": "3000", "pcc-l2h": "", "pcc-l2n": "Secador de biomasa",
        "pcc-l3p": "2400", "pcc-l3h": "", "pcc-l3n": "Estufa / caldera aux.",
        "pcc-l4p": "1000", "pcc-l4h": "", "pcc-l4n": "Resistencia / plancha" },
      click: "btn-pcc-4-3",
      desc: "Prob. 37.b — Cargas simultáneas: motor 5 hp, secador 3000 W, estufa 2400 W, resistencia 1000 W.\n5 hp = 3730 W. Suma = 10 130 W < 12 000 W. Sí cabe, con 1.87 kW de margen.\nEl motor de molino es biomasa (convencional); el PCC puede estar alimentado por FV y eólica (no convencionales). El interruptor no distingue el origen: distingue kW." }
  },
  "4-5": {
    p38: { fields: { "eta-out": "0.5", "eta-in": "450", "eta-n": "", "eta-v": "" },
      selects: { "eta-out-u": "746", "eta-in-u": "1" }, click: "btn-eta-4-5",
      desc: "Prob. 38 — Micro-hidro o bomba geotérmica: 0.5 hp de salida, 450 W de entrada.\nP_sal = 0.5 · 746 = 373 W. η = 373 / 450 = 82.89 %." },
    p39: { fields: { "eta-out": "1.8", "eta-in": "", "eta-n": "68.5", "eta-v": "120" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 39 — Astilladora de biomasa, 68.5 % de eficiencia, 1.8 hp de corte, red 120 V.\nP_sal = 1.8 · 746 = 1343 W. P_ent = 1343 / 0.685 = 1960 W. I = 1960 / 120 = 16.34 A." },
    p40: { fields: { "eta-out": "1", "eta-in": "", "eta-n": "", "eta-v": "220", "eta-i": "4" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 40 — Motor de 1 hp, 4 A a 220 V (ventilador de ciclo binario geotérmico o secador de biomasa).\nP_sal = 746 W. P_ent = 4 · 220 = 880 W. η = 746 / 880 = 84.77 %." },
    p41a: { fields: { "eta-out": "50", "eta-in": "", "eta-n": "", "eta-v": "120", "eta-i": "2.4" },
      selects: { "eta-out-u": "1" }, click: "btn-eta-4-5",
      desc: "Prob. 41.a — Rack de audio / comms de planta: 2.4 A a 120 V, 50 W útiles.\nP_ent = 2.4 · 120 = 288 W. Pérdida = 288 − 50 = 238 W en calor." },
    p41b: { fields: { "eta-out": "50", "eta-in": "288", "eta-n": "", "eta-v": "120" },
      selects: { "eta-out-u": "1", "eta-in-u": "1" }, click: "btn-eta-4-5",
      desc: "Prob. 41.b — η = 50 / 288 = 17.36 %. Un amplificador clásico; un inversor SiC 2026 ronda el 98 %. Misma fórmula, otro eslabón." },
    p42: { fields: { "eta-out": "3.6", "eta-in": "", "eta-n": "87", "eta-v": "220" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 42 — Motor / generador al 87 %, 3.6 hp, 220 V (Pelton + generador, o yaw de un aerogenerador grande).\nP_sal = 2686 W. P_ent = 3087 W. I = 14.03 A." },
    p43a: { fields: { "eta-out": "2", "eta-in": "", "eta-n": "90", "eta-v": "110" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 43.a — Bomba de riego FV de 2 hp, 90 %, 110 V.\nP_sal = 1492 W. P_ent = 1658 W extraídos de la línea (o del inversor de bomba)." },
    p43b: { fields: { "eta-out": "2", "eta-in": "", "eta-n": "90", "eta-v": "110" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 43.b — I = 1658 / 110 = 15.07 A a 90 %." },
    p43c: { fields: { "eta-out": "2", "eta-in": "", "eta-n": "70", "eta-v": "110" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 43.c — Al 70 % (máquina vieja, sin VFD): P_ent = 2131 W. I = 19.38 A.\nBajar 20 puntos de η sube 4.3 A: el cable y el inversor de bomba se dimensionan al peor rendimiento, no al de catálogo." },
    p44: { fields: { "eta-out": "15", "eta-in": "", "eta-n": "90", "eta-v": "220" },
      selects: { "eta-out-u": "746" }, click: "btn-eta-4-5",
      desc: "Prob. 44 — Ascensor de torre eólica o de presa hidroeléctrica, 15 hp, 90 %, 220 V.\nP_sal = 11 190 W. P_ent = 12 433 W. I = 56.52 A." },
    p45: { fields: { "cas-1": "87", "cas-2": "75", "cas-3": "", "cas-nt": "", "cas-e": "", "cas-pin": "", "cas-pout": "" },
      checks: { "cas-double": false }, click: "btn-cas-4-5",
      desc: "Prob. 45 — Motor de 2 hp al 87 % y correa de un molino de biomasa al 75 % por deslizamiento.\nη_t = 0.87 · 0.75 = 0.6525 = 65.25 %.\nEl eslabón mecánico se come más que el eléctrico. Un acoplamiento directo o un VFD 2026 recupera esos puntos." },
    p46: { fields: { "cas-1": "80", "cas-2": "80", "cas-3": "", "cas-nt": "", "cas-e": "60", "cas-pin": "", "cas-pout": "" },
      checks: { "cas-double": false }, click: "btn-cas-4-5",
      desc: "Prob. 46 — Dos etapas al 80 % (p. ej. convertidor de una mini-hidro + transformador, o FV + inversor en un ejemplo didáctico) con 60 J de entrada.\nW_sal = 60 · 0.80 · 0.80 = 38.4 J." },
    p47: { fields: { "cas-1": "90", "cas-2": "", "cas-3": "", "cas-nt": "72", "cas-e": "", "cas-pin": "", "cas-pout": "" },
      checks: { "cas-double": false }, click: "btn-cas-4-5",
      desc: "Prob. 47 — η_t = 72 %, una etapa 0.90 (inversor). La otra: η₂ = 0.72 / 0.90 = 0.80 = 80 %.\nEs el transformador, el cable o el MPPT. El solucionador necesita las dos etas conocidas o Pin/Pout; aquí η₂ = η_t / η₁." },
    p48: { fields: { "cas-1": "", "cas-2": "", "cas-3": "", "cas-nt": "", "cas-e": "", "cas-pin": "400", "cas-pout": "128" },
      checks: { "cas-double": true }, click: "btn-cas-4-5",
      desc: "Prob. 48 — 400 W de entrada, 128 W de salida, una etapa el doble de eficiente que la otra.\nη_t = 128 / 400 = 0.32. Con η₂ = 2 η₁: 2 η₁² = 0.32 → η₁ = 40 %, η₂ = 80 %.\nMarca la casilla «una el doble de la otra» y pulsa calcular." },
    p49a: { fields: { "cas-1": "98", "cas-2": "87", "cas-3": "21", "cas-nt": "", "cas-e": "", "cas-pin": "", "cas-pout": "" },
      checks: { "cas-double": false }, click: "btn-cas-4-5",
      desc: "Prob. 49.a — Tres eslabones: transformador 98 %, generador / motor 87 %, rectificador de tiristores 21 % (un front-end viejo de un parque o un electrolizador ineficiente).\nη_t = 0.98 · 0.87 · 0.21 = 17.90 %." },
    p49b: { fields: { "cas-1": "98", "cas-2": "87", "cas-3": "90", "cas-nt": "", "cas-e": "", "cas-pin": "", "cas-pout": "" },
      checks: { "cas-double": false }, click: "btn-cas-4-5",
      desc: "Prob. 49.b — Se sustituye el 21 % por un convertidor SiC al 90 %.\nη_t = 0.98 · 0.87 · 0.90 = 76.73 %.\nIncremento: 76.73 − 17.90 = 58.83 puntos porcentuales (relativo: ×4.29).\nEl eslabón flojo era el 21 %: cambiarlo vale más que retocar el 98 %." },
    p50a: {
      desc: "Prob. 50.a — Conversiones.\n1 Wh = 3600 J.\n1 kWh = 3.6×10⁶ J.\nEl medidor del PCC cuenta kWh; el pad de una celda LFP, julios. Mismo W = P t." },
    p50b: {
      desc: "Prob. 50.b — Wh (o J) para un logger, un pad de BESS, un sensor, un microinversor en standby. kWh (o MWh) para la factura, el LCOE, la producción diaria de un parque FV o eólico y el RTE de un BESS de horas. Usar kWh en un pad de 12 J es teatro; usar julios en un parque de 100 MW, también." }
  },
  "4-6": {
    p51a: { fields: { "ohm4-v": "15", "ohm4-i": "", "ohm4-r": "10", "ohm4-t": "1" },
      selects: { "ohm4-v-u": "1", "ohm4-r-u": "1", "ohm4-t-u": "60" }, click: "btn-ohm-4-1",
      desc: "Prob. 51.a — 10 Ω sobre un banco de 15 V (BESS auxiliar o mini-hidro aislada), 1 min.\nI = 1.50 A. P = 22.5 W. W = 22.5 · 60 = 1350 J = 3.75×10⁻⁴ kWh." },
    p51b: {
      desc: "Prob. 51.b — A 2 min la energía se duplica (2700 J). La potencia no: sigue en 22.5 W.\nW ∝ t; P no. Un string dos minutos a Imp entrega el doble de julios, no «se calienta el doble» en el sentido de I²R (eso depende de I, no de t). El calor acumulado sí crece con t si no hay refrigeración." },
    p52: { fields: { "en-p": "230", "en-t": "", "en-hweek": "12", "en-months": "5", "en-w": "", "en-kwh": "", "en-rate": "9", "en-budget": "", "en-v": "", "en-eta": "" },
      selects: { "en-p-u": "1" }, click: "btn-en-4-6",
      desc: "Prob. 52 — Motor de 230 W (tracker agrovoltaico o bomba geotérmica) 12 h/semana, 5 meses. 4/3 semanas = 1 mes.\nt = 12 · 5 · (4/3) = 80 h. W = 230 · 80 = 18 400 Wh = 18.4 kWh." },
    p53: { fields: { "en-p": "1500", "en-t": "", "en-hweek": "", "en-months": "", "en-w": "", "en-kwh": "10", "en-rate": "9", "en-budget": "", "en-v": "", "en-eta": "" },
      selects: { "en-p-u": "1" }, click: "btn-en-4-6",
      desc: "Prob. 53 — Calefactor / dump load de 1500 W hasta 10 kWh.\nEl solucionador necesita W = 10 kWh = 3.6e7 J, o bien P y W. t = 10 kWh / 1.5 kW = 6.667 h = 6 h 40 min." },
    p54: { fields: { "en-p": "30", "en-t": "3", "en-hweek": "", "en-months": "", "en-w": "", "en-kwh": "", "en-rate": "9", "en-budget": "", "en-v": "", "en-eta": "" },
      selects: { "en-p-u": "1", "en-t-u": "3600" }, click: "btn-en-4-6",
      desc: "Prob. 54 — Logger / radio de planta de 30 W, 3 h, 9 ¢/kWh (tarifa residencial ilustrativa 2026).\nE = 0.090 kWh. Costo = 0.090 · 0.09 = $0.0081 (0.81 ¢)." },
    p55a: { fields: { "en-p": "", "en-t": "10", "en-hweek": "", "en-months": "", "en-w": "", "en-kwh": "500", "en-rate": "9", "en-budget": "", "en-v": "", "en-eta": "" },
      selects: { "en-t-u": "3600" }, click: "btn-en-4-6",
      desc: "Prob. 55.a — Una mini-hidro o un bloque FV convierte 500 kWh en 10 h.\nP = 500 kWh / 10 h = 50.0 kW.\nEscribe 500 en kWh vía W = 500 · 3.6e6 J, o usa 50 kW de potencia. El dato del libro es la energía eléctrica convertida (a calor de proceso o a red)." },
    p55b: { fields: { "en-p": "50", "en-t": "10", "en-hweek": "", "en-months": "", "en-w": "", "en-rate": "9", "en-budget": "", "en-v": "208", "en-eta": "" },
      selects: { "en-p-u": "1000", "en-t-u": "3600" }, click: "btn-en-4-6",
      desc: "Prob. 55.b — A 208 V (acometida trifásica de planta, línea a línea de un auxiliar).\nI = P / V = 50 000 / 208 = 240.4 A.\nEso es un alimentador de auxiliares, no un string." },
    p55c: { fields: { "en-p": "50", "en-t": "10", "en-hweek": "", "en-months": "", "en-w": "", "en-rate": "9", "en-budget": "", "en-v": "208", "en-eta": "82" },
      selects: { "en-p-u": "1000", "en-t-u": "3600" }, click: "btn-en-4-6",
      desc: "Prob. 55.c — η = 82 % (ciclo geotérmico binario, o un tren viejo FV+inversor+trafo).\nSi 500 kWh es la energía procesada, se pierde 18 % → 90 kWh en 10 h (9 kW térmicos continuos)." },
    p56a: { fields: { "en-p": "250", "en-t": "", "en-hweek": "", "en-months": "", "en-w": "", "en-kwh": "", "en-rate": "9", "en-budget": "1", "en-v": "", "en-eta": "" },
      selects: { "en-p-u": "1" }, click: "btn-en-4-6",
      desc: "Prob. 56.a — HMI / videowall de 250 W con $1 a 9 ¢/kWh.\n$1 compra 1 / 0.09 = 11.11 kWh. t = 11.11 / 0.250 = 44.44 h." },
    p56b: { fields: { "en-p": "4.8", "en-t": "", "en-hweek": "", "en-months": "", "en-w": "", "en-kwh": "", "en-rate": "9", "en-budget": "1", "en-v": "", "en-eta": "" },
      selects: { "en-p-u": "1000" }, click: "btn-en-4-6",
      desc: "Prob. 56.b — Secador de biomasa de 4.8 kW con $1.\nt = 11.11 kWh / 4.8 kW = 2.315 h ≈ 2 h 19 min." },
    p56c: {
      desc: "Prob. 56.c — El mismo dólar dura 44 h en un HMI de 250 W y 2.3 h en un secador de 4.8 kW. El costo por hora es proporcional a P. El LCOE de un parque FV 2026 (decenas de USD/MWh) es otra escala: aquí 9 ¢/kWh es tarifa residencial ilustrativa, no el costo de generar." },
    p57: { fields: { "cost-rate": "9", "c6-n1": "HVAC sala de inversores", "c6-p1": "860", "c6-t1": "24",
        "c6-n2": "Secador de biomasa", "c6-p2": "4800", "c6-t2": "0.5",
        "c6-n3": "Bomba de lavado / geo", "c6-p3": "400", "c6-t3": "1",
        "c6-n4": "Lavado de módulos / CIP", "c6-p4": "1200", "c6-t4": "0.75" },
      click: "btn-cost-4-6",
      desc: "Prob. 57 — Auxiliares de una planta híbrida, 9 ¢/kWh.\nHVAC inversores 860 W × 24 h = 20.64 kWh\nSecador biomasa 4800 W × 0.5 h = 2.40 kWh\nBomba 400 W × 1 h = 0.40 kWh\nLavado módulos 1200 W × 0.75 h = 0.90 kWh\nTotal 24.34 kWh × 0.09 $/kWh = $2.191." },
    p58: { fields: { "cost-rate": "9", "c6-n1": "Tracker / yaw", "c6-p1": "110", "c6-t1": "4",
        "c6-n2": "Proyector de sala", "c6-p2": "1200", "c6-t2": "0.333",
        "c6-n3": "Grabadora / NAS de planta", "c6-p3": "60", "c6-t3": "1.5",
        "c6-n4": "HMI color", "c6-p4": "150", "c6-t4": "3.75" },
      click: "btn-cost-4-6",
      desc: "Prob. 58 — Sala de control, 9 ¢/kWh.\nYaw/tracker 110 W × 4 h = 0.440 kWh\nProyector 1200 W × 20 min = 0.400 kWh\nNAS 60 W × 1.5 h = 0.090 kWh\nHMI 150 W × 3 h 45 min = 0.5625 kWh\nTotal 1.4925 kWh × 0.09 = $0.1343." }
  },
  "4-9": {
    p59: { fields: { "sp-e": "400", "sp-r": "0.04", "sp-i": "", "sp-t": "1" },
      selects: { "sp-e-u": "0.001", "sp-r-u": "1e6", "sp-t-u": "1" },
      checks: { "sp-invert": false }, click: "btn-sp-4-9",
      desc: "Prob. 59 — Figura 4.29 con E = 400 mV, R = 0.04 MΩ = 40 kΩ (canal de un shunt de BESS o de un piranómetro).\nI = 0.400 / 40 000 = 10.00 µA. P = 4.00 µW. W (1 s) = 4.00 µJ." },
    p60: { fields: { "sp-e": "0.02", "sp-r": "240", "sp-i": "", "sp-t": "1" },
      selects: { "sp-e-u": "1", "sp-r-u": "1", "sp-t-u": "1" },
      checks: { "sp-invert": true }, click: "btn-sp-4-9",
      desc: "Prob. 60 — Polaridad invertida, E = 0.02 V, R = 240 Ω (offset de un sensor de recurso).\nI = 0.02 / 240 = 83.33 µA, sentido opuesto. P = 1.667 µW.\nMarca «invertir polaridad»: las magnitudes no cambian, solo el signo de I." },
    p61: { fields: { "c9-rate": "9",
        "c9-n1": "Logger / RTU", "c9-p1": "30", "c9-t1": "3",
        "c9-n2": "HMI SCADA", "c9-p2": "250", "c9-t2": "8",
        "c9-n3": "Tracker (yaw)", "c9-p3": "110", "c9-t3": "4",
        "c9-n4": "Proyector de sala", "c9-p4": "1200", "c9-t4": "0.333",
        "c9-n5": "Servidor de planta", "c9-p5": "150", "c9-t5": "3.75" },
      click: "btn-c9-4-9",
      desc: "Prob. 61 — Cinco aparatos a 9 ¢/kWh (el «programa» del libro, en el navegador).\nLogger 30 W × 3 h, HMI 250 W × 8 h, yaw 110 W × 4 h, proyector 1200 W × 20 min, servidor 150 W × 3.75 h." },
    p62: { fields: { "sp-e": "", "sp-r": "10", "sp-i": "2", "sp-t": "2" },
      selects: { "sp-r-u": "1", "sp-i-u": "1", "sp-t-u": "1" },
      checks: { "sp-invert": false }, click: "btn-sp-4-9",
      desc: "Prob. 62 — Dados I, R y t, salen V, P y W.\nEjemplo: I = 2 A, R = 10 Ω, t = 2 s (celda LFP + dump).\nV = I R = 20 V. P = I²R = 40 W. W = 80 J.\nEl ejercicio original pide imprimir con unidades: el recuadro lo hace." }
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
  initSec4();
  initSec5();
  initSec6();
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
      } else if (String(section).startsWith('3-') || String(section).startsWith('4-') || String(section).startsWith('5-') || String(section).startsWith('6-')) {
        applyPresetFields(data);
      }
    });
  });
}

function applyPresetFields(data) {
  if (!data) return;
  if (data.clearSources) {
    for (let i = 1; i <= 4; i++) {
      setField(`s53-e${i}`, "");
      setField(`s53-r${i}`, "");
      setField(`s53-v${i}`, "");
      setField(`s53-p${i}`, "");
      const ru = document.getElementById(`s53-ru${i}`);
      if (ru) ru.value = "1";
      const eu = document.getElementById(`s53-eu${i}`);
      if (eu) eu.value = "1";
    }
    setField("s53-i", "");
    const iu = document.getElementById("s53-iu");
    if (iu) iu.value = "0.001";
  }
  if (data.clearDivider) {
    for (let i = 1; i <= 6; i++) {
      setField(`s56-n${i}`, `R${i}`);
      setField(`s56-r${i}`, "");
      const ru = document.getElementById(`s56-ru${i}`);
      if (ru) ru.value = "1";
    }
    setField("s56-e", "");
    setField("s56-from", "");
    setField("s56-to", "");
    setField("s56-vab", "");
    const eu = document.getElementById("s56-e-u");
    if (eu) eu.value = "1";
  }
  if (data.clearSeries) {
    clearSeriesPrefix(data.clearSeries.prefix, data.clearSeries.n || 8);
  }
  if (data.series) {
    const { prefix, rows } = data.series;
    clearSeriesPrefix(prefix, 8);
    rows.forEach((row, idx) => {
      const i = idx + 1;
      if (row.name != null) setField(`${prefix}-n${i}`, row.name);
      if (row.r != null) setField(`${prefix}-r${i}`, row.r);
      if (row.v != null) setField(`${prefix}-v${i}`, row.v);
      if (row.p != null) setField(`${prefix}-p${i}`, row.p);
      const ru = document.getElementById(`${prefix}-ru${i}`);
      if (ru && row.ru != null) ru.value = String(row.ru);
      const st = document.getElementById(`${prefix}-st${i}`);
      if (st && row.st) st.value = row.st;
    });
  }
  if (data.clearParallel) {
    clearParallelPrefix(data.clearParallel.prefix, data.clearParallel.n || 6);
  }
  if (data.parallel) {
    const { prefix, rows } = data.parallel;
    clearParallelPrefix(prefix, 6);
    rows.forEach((row, idx) => {
      const i = idx + 1;
      if (row.name != null) setField(`${prefix}-n${i}`, row.name);
      if (row.r != null) setField(`${prefix}-r${i}`, row.r);
      if (row.rs != null) setField(`${prefix}-rs${i}`, row.rs);
      if (row.i != null) setField(`${prefix}-ix${i}`, row.i);
      if (row.p != null) setField(`${prefix}-p${i}`, row.p);
      if (row.n != null) setField(`${prefix}-copies${i}`, row.n);
      const ru = document.getElementById(`${prefix}-ru${i}`);
      if (ru && row.ru != null) ru.value = String(row.ru);
      const rsu = document.getElementById(`${prefix}-rsu${i}`);
      if (rsu && row.rsu != null) rsu.value = String(row.rsu);
      const st = document.getElementById(`${prefix}-st${i}`);
      if (st && row.st) st.value = row.st;
    });
  }
  if (data.fields) {
    Object.entries(data.fields).forEach(([id, v]) => setField(id, v));
  }
  if (data.selects) {
    Object.entries(data.selects).forEach(([id, v]) => {
      const el = document.getElementById(id);
      if (el) el.value = v;
    });
  }
  if (data.checks) {
    Object.entries(data.checks).forEach(([id, v]) => {
      const el = document.getElementById(id);
      if (el) el.checked = !!v;
    });
  }
  if (data.click) {
    const btn = document.getElementById(data.click);
    if (btn) btn.click();
  }
}

const HP_W = 746;
const J_PER_KWH = 3.6e6;
const J_PER_WH = 3600;
const MONTH_S = 806400; // 4/3 semanas

function writeQtyField(id, unitId, si) {
  const u = unitId ? readUnit(unitId) : 1;
  if (!u) {
    setField(id, si);
    return;
  }
  setField(id, si / u);
}

function readEtaFrac(id) {
  const v = readOptionalNumber(id);
  if (v === null) return null;
  if (v > 1) return v / 100;
  return v;
}

function formatEta(frac) {
  return `${formatQtyPlain(frac * 100)} %`;
}

function initSec4() {
  initSec4_1();
  initSec4_2();
  initSec4_3();
  initSec4_5();
  initSec4_6();
  initSec4_9();
}

function initSec4_1() {
  const btn = document.getElementById("btn-ohm-4-1");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-4-1");
    try {
      let V = readOptionalNumber("ohm4-v");
      let I = readOptionalNumber("ohm4-i");
      let R = readOptionalNumber("ohm4-r");
      let t = readOptionalNumber("ohm4-t");
      if (V !== null) V *= readUnit("ohm4-v-u");
      if (I !== null) I *= readUnit("ohm4-i-u");
      if (R !== null) R *= readUnit("ohm4-r-u");
      if (t !== null) t *= readUnit("ohm4-t-u");
      const known = [V, I, R].filter((v) => v !== null).length;
      if (known < 2) throw new Error("Indica dos de V, I, R (o las tres para comprobar).");
      let proc = `${mj("V = I R")}.\n`;
      if (V === null) {
        if (R === 0) throw new Error("R = 0 no define V (cortocircuito).");
        V = I * R;
        writeQtyField("ohm4-v", "ohm4-v-u", V);
        proc += `${mj(`V = (${texQtyBody(I, "A")})(${texQtyBody(R, "\\Omega")}) = ${texQtyBody(V, "V")}`)}.\n`;
      } else if (I === null) {
        if (R === 0) throw new Error("R = 0: corriente no definida por Ohm sola.");
        I = V / R;
        writeQtyField("ohm4-i", "ohm4-i-u", I);
        proc += `${mj(`I = V / R = ${texQtyBody(V, "V")} / ${texQtyBody(R, "\\Omega")} = ${texQtyBody(I, "A")}`)}.\n`;
      } else if (R === null) {
        if (I === 0) throw new Error("I = 0 no define R.");
        R = V / I;
        writeQtyField("ohm4-r", "ohm4-r-u", R);
        proc += `${mj(`R = V / I = ${texQtyBody(V, "V")} / ${texQtyBody(I, "A")} = ${texQtyBody(R, "\\Omega")}`)}.\n`;
      } else {
        const Vcalc = I * R;
        proc += `Comprobación: ${mj(`IR = ${texQtyBody(Vcalc, "V")}`)} (ingresado ${formatQty(V, "V")}).\n`;
        if (Math.abs(Vcalc - V) / Math.max(Math.abs(Vcalc), 1e-30) > 0.02) {
          proc += "Los tres datos no cuadran: revisa unidades o deja uno vacío.\n";
        }
      }
      const P = V * I;
      proc += `${mj("P = V I = I^{2} R = V^{2} / R")}.\n`;
      proc += `${mj(`P = ${texQtyBody(P, "W")}`)}`;
      if (Math.abs(P) >= 1000) proc += ` = ${mj(texQtyBody(P / 1000, "kW"))}`;
      proc += ".\n";
      if (t !== null) {
        const W = P * t;
        proc += `${mj("W = P t")}. ${mj(`W = ${texQtyBody(W, "J")} = ${texQtyBody(W / J_PER_KWH, "kWh")}`)}`;
        proc += ` en ${formatQty(t, "s")}.`;
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function drawXYPlot(svg, cfg) {
  const W = 640, H = 320, L = 62, R = 20, T = 20, B = 46;
  const plotW = W - L - R, plotH = H - T - B;
  const xMin = cfg.xMin, xMax = cfg.xMax;
  const yMin = cfg.yMin, yMax = cfg.yMax;
  const xOf = (x) => L + ((x - xMin) / (xMax - xMin)) * plotW;
  const yOf = (y) => T + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
  const xTicks = cfg.xTicks || [];
  const yTicks = cfg.yTicks || [];
  const gridX = xTicks.map((x) => {
    const px = xOf(x);
    return `<line x1="${px}" y1="${T}" x2="${px}" y2="${T + plotH}" stroke="currentColor" opacity="0.12"/>
      <text x="${px}" y="${H - 18}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`;
  }).join("");
  const gridY = yTicks.map((y) => {
    const py = yOf(y);
    return `<line x1="${L}" y1="${py}" x2="${W - R}" y2="${py}" stroke="currentColor" opacity="0.12"/>
      <text x="${L - 6}" y="${py + 4}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>`;
  }).join("");
  const zero = (yMin < 0 && yMax > 0)
    ? `<line x1="${L}" y1="${yOf(0)}" x2="${W - R}" y2="${yOf(0)}" stroke="currentColor" stroke-width="1" opacity="0.45"/>`
    : "";
  const polylines = (cfg.series || []).map((s) => {
    const pts = s.pts.map((p) => `${xOf(p.x).toFixed(1)},${yOf(p.y).toFixed(1)}`).join(" ");
    return `<polyline fill="none" stroke="${s.color}" stroke-width="2.4" points="${pts}"/>`;
  }).join("");
  const marks = (cfg.marks || []).map((m) =>
    `<circle cx="${xOf(m.x)}" cy="${yOf(m.y)}" r="4.2" fill="${m.color || "#c0392b"}" />`
  ).join("");
  svg.innerHTML = `
    <rect x="0" y="0" width="${W}" height="${H}" fill="transparent"/>
    ${gridX}${gridY}${zero}
    <line x1="${L}" y1="${T}" x2="${L}" y2="${T + plotH}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${L}" y1="${T + plotH}" x2="${W - R}" y2="${T + plotH}" stroke="currentColor" stroke-width="1.4"/>
    ${polylines}${marks}
    <text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="currentColor">${cfg.xLabel || ""}</text>
    <text x="16" y="${T + plotH / 2}" text-anchor="middle" font-size="12" fill="currentColor" transform="rotate(-90 16 ${T + plotH / 2})">${cfg.yLabel || ""}</text>
  `;
}

function niceTicks(min, max, n = 5) {
  if (max === min) max = min + 1;
  const span = max - min;
  const step0 = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const resid = step0 / mag;
  const step = resid >= 5 ? 5 * mag : resid >= 2 ? 2 * mag : mag;
  const start = Math.ceil(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 1e-9; v += step) {
    ticks.push(Number(v.toPrecision(6)));
  }
  if (!ticks.includes(min) && Math.abs(min) < step * 1e-6) ticks.unshift(0);
  return ticks;
}

function initSec4_2() {
  const btnLin = document.getElementById("btn-lin-4-2");
  if (btnLin) {
    btnLin.addEventListener("click", () => {
      const out = document.getElementById("proc-4-2-lin");
      try {
        const r1 = readOptionalNumber("lin-r1");
        const r2 = readOptionalNumber("lin-r2");
        const vmax = readOptionalNumber("lin-vmax") ?? 10;
        const iScale = readUnit("lin-i-u");
        if (r1 === null || r2 === null) throw new Error("Indica R₁ y R₂.");
        if (r1 === 0 || r2 === 0) throw new Error("R = 0 no se traza (corriente infinita).");
        const i1 = vmax / r1;
        const i2 = vmax / r2;
        const iMax = Math.max(i1, i2);
        const yUnit = iScale === 1000 ? "mA" : "A";
        const yMax = iScale === 1000 ? iMax * 1000 : iMax;
        const scaleY = (i) => (iScale === 1000 ? i * 1000 : i);
        const mk = (R) => {
          const pts = [];
          for (let k = 0; k <= 40; k++) {
            const V = vmax * (k / 40);
            pts.push({ x: V, y: scaleY(V / R) });
          }
          return pts;
        };
        const wrap = document.getElementById("plot-4-2-lin-wrap");
        wrap.hidden = false;
        drawXYPlot(document.getElementById("plot-4-2-lin"), {
          xMin: 0, xMax: vmax, yMin: 0, yMax: yMax * 1.05,
          xTicks: niceTicks(0, vmax, 5),
          yTicks: niceTicks(0, yMax * 1.05, 5),
          xLabel: "V (V)", yLabel: `I (${yUnit})`,
          series: [
            { pts: mk(r1), color: "#1a6b4a" },
            { pts: mk(r2), color: "#c0392b" }
          ]
        });
        document.getElementById("legend-4-2-lin").innerHTML =
          `<span><i class="plot-swatch" style="background:#1a6b4a"></i>R₁ = ${formatQtyPlain(r1)} Ω → I(${formatQtyPlain(vmax)} V) = ${formatQtyPlain(scaleY(i1))} ${yUnit}</span>
           <span><i class="plot-swatch" style="background:#c0392b"></i>R₂ = ${formatQtyPlain(r2)} Ω → I(${formatQtyPlain(vmax)} V) = ${formatQtyPlain(scaleY(i2))} ${yUnit}</span>`;
        let proc = `${mj("I = V / R")} (recta por el origen, pendiente ${mj("1/R")}).\n`;
        proc += `R₁ = ${formatQty(r1, "\\Omega")}: a ${formatQty(vmax, "V")}, I = ${formatQty(i1, "A")} = ${formatQty(i1 * 1000, "mA")}.\n`;
        proc += `R₂ = ${formatQty(r2, "\\Omega")}: a ${formatQty(vmax, "V")}, I = ${formatQty(i2, "A")} = ${formatQty(i2 * 1000, "mA")}.\n`;
        proc += "Un ohmio pequeño es casi vertical (dump load, ballast). Un kΩ es casi horizontal (divisor, ISO).";
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnPw = document.getElementById("btn-pw-4-2");
  if (btnPw) {
    btnPw.addEventListener("click", () => {
      const out = document.getElementById("proc-4-2-pw");
      try {
        const r1 = readOptionalNumber("pw-r1");
        const v1 = readOptionalNumber("pw-v1");
        const r2 = readOptionalNumber("pw-r2");
        const v2 = readOptionalNumber("pw-v2");
        const r3 = readOptionalNumber("pw-r3");
        const probeRaw = (document.getElementById("pw-probe")?.value || "").trim();
        if (r1 === null || v1 === null || r2 === null) throw new Error("Indica R₁, V₁ y R₂.");
        const Iof = (V) => {
          if (V <= v1) return V / r1;
          const I1 = v1 / r1;
          if (v2 === null || r3 === null || V <= v2) return I1 + (V - v1) / r2;
          const I2 = I1 + (v2 - v1) / r2;
          return I2 + (V - v2) / r3;
        };
        const vmax = v2 !== null && r3 !== null ? v2 * 1.4 : v1 * 1.6;
        const probes = probeRaw
          ? probeRaw.split(/[,\s]+/).map((s) => parseNumberInput(s)).filter((n) => !isNaN(n))
          : [];
        const xs = [0];
        for (let k = 1; k <= 80; k++) xs.push(vmax * (k / 80));
        probes.forEach((p) => xs.push(p));
        xs.sort((a, b) => a - b);
        const pts = xs.map((x) => ({ x, y: Iof(x) }));
        const ys = pts.map((p) => p.y);
        let yMin = Math.min(0, ...ys);
        let yMax = Math.max(0, ...ys);
        if (yMin === yMax) { yMax = 1; yMin = 0; }
        const pad = (yMax - yMin) * 0.08;
        yMin -= pad; yMax += pad;
        const wrap = document.getElementById("plot-4-2-pw-wrap");
        wrap.hidden = false;
        drawXYPlot(document.getElementById("plot-4-2-pw"), {
          xMin: 0, xMax: Math.max(vmax, ...probes, 1),
          yMin, yMax,
          xTicks: niceTicks(0, Math.max(vmax, ...probes, 1), 5),
          yTicks: niceTicks(yMin, yMax, 5),
          xLabel: "V (V)", yLabel: "I (A)",
          series: [{ pts, color: "#2471a3" }],
          marks: probes.map((V) => ({ x: V, y: Iof(V), color: "#c0392b" }))
        });
        let proc = "R incremental por tramos (dV/dI), no un ohmio único desde el origen.\n";
        proc += `0 a ${formatQty(v1, "V")}: R = ${formatQty(r1, "\\Omega")}, I = V / R₁.\n`;
        proc += `A ${formatQty(v1, "V")}: I = ${formatQty(v1 / r1, "A")} = ${formatQty((v1 / r1) * 1000, "mA")}.\n`;
        if (v2 === null || r3 === null) {
          proc += `V > ${formatQty(v1, "V")}: R = ${formatQty(r2, "\\Omega")} incremental.\n`;
          proc += `${mj(`I = I(V_1) + (V - V_1)/R_2`)}.\n`;
        } else {
          const I2 = v1 / r1 + (v2 - v1) / r2;
          proc += `${formatQty(v1, "V")} a ${formatQty(v2, "V")}: R = ${formatQty(r2, "\\Omega")}. I(${formatQty(v2, "V")}) = ${formatQty(I2, "A")} = ${formatQty(I2 * 1000, "mA")}.\n`;
          proc += `V > ${formatQty(v2, "V")}: R = ${formatQty(r3, "\\Omega")} (negativa = NDR / foldback).\n`;
        }
        probes.forEach((V) => {
          const I = Iof(V);
          proc += `Sonda ${formatQty(V, "V")}: I = ${formatQty(I, "A")} = ${formatQty(I * 1000, "mA")}.\n`;
        });
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec4_3() {
  const btn = document.getElementById("btn-pow-4-3");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-4-3");
      try {
        let V = readOptionalNumber("pow-v");
        let I = readOptionalNumber("pow-i");
        let R = readOptionalNumber("pow-r");
        let P = readOptionalNumber("pow-p");
        let t = readOptionalNumber("pow-t");
        let W = readOptionalNumber("pow-w");
        if (V !== null) V *= readUnit("pow-v-u");
        if (I !== null) I *= readUnit("pow-i-u");
        if (R !== null) R *= readUnit("pow-r-u");
        if (P !== null) P *= readUnit("pow-p-u");
        if (t !== null) t *= readUnit("pow-t-u");
        if (W !== null && P === null && t !== null) P = W / t;
        else if (W !== null && t === null && P !== null) t = W / P;
        else if (P !== null && t !== null && W === null) W = P * t;

        if (V !== null && I !== null && R === null) R = I !== 0 ? V / I : null;
        if (V !== null && R !== null && I === null) I = R !== 0 ? V / R : null;
        if (I !== null && R !== null && V === null) V = I * R;

        if (P === null) {
          if (V !== null && I !== null) P = V * I;
          else if (I !== null && R !== null) P = I * I * R;
          else if (V !== null && R !== null) P = (V * V) / R;
        }
        if (P !== null) {
          if (V !== null && I === null) I = V !== 0 ? P / V : null;
          if (I !== null && V === null) V = I !== 0 ? P / I : null;
          if (R === null && I !== null && I !== 0) R = P / (I * I);
          if (R === null && V !== null && P !== 0) R = (V * V) / P;
          if (V === null && R !== null) V = Math.sqrt(Math.abs(P * R)) * (P < 0 ? -1 : 1);
          if (I === null && R !== null && R !== 0) I = Math.sqrt(Math.abs(P / R)) * (P < 0 ? -1 : 1);
        }
        if (t !== null && P !== null && W === null) W = P * t;
        if (W !== null && t !== null && P === null) P = W / t;
        if (W !== null && P !== null && t === null) t = W / P;

        if (P === null && V === null && I === null && R === null && W === null) {
          throw new Error("Faltan datos. Completa dos de V, I, R o P, o bien W y t.");
        }
        let proc = `${mj("P = V I = I^{2} R = V^{2} / R = W / t")}.\n`;
        if (V !== null) proc += `${mj(`V = ${texQtyBody(V, "V")}`)}  `;
        if (I !== null) proc += `${mj(`I = ${texQtyBody(I, "A")}`)}  `;
        if (R !== null) proc += `${mj(`R = ${texQtyBody(R, "\\Omega")}`)}  `;
        proc += "\n";
        if (P !== null) {
          proc += `${mj(`P = ${texQtyBody(P, "W")}`)}`;
          if (Math.abs(P) >= 1000) proc += ` = ${mj(texQtyBody(P / 1000, "kW"))}`;
          proc += ` = ${mj(texQtyBody(P / HP_W, "hp"))}.\n`;
        }
        if (t !== null) proc += `${mj(`t = ${texQtyBody(t, "s")}`)} = ${formatQtyPlain(t / 3600)} h.\n`;
        if (W !== null) {
          proc += `${mj(`W = ${texQtyBody(W, "J")}`)} = ${mj(texQtyBody(W / J_PER_WH, "Wh"))} = ${mj(texQtyBody(W / J_PER_KWH, "kWh"))}.`;
        }
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnPi = document.getElementById("btn-pi-4-3");
  if (btnPi) {
    btnPi.addEventListener("click", () => {
      const out = document.getElementById("proc-4-3-pi");
      try {
        const R = readOptionalNumber("pi-r");
        let imax = readOptionalNumber("pi-imax");
        let pmark = readOptionalNumber("pi-pmark");
        if (R === null || imax === null) throw new Error("Indica R e I máx.");
        imax *= readUnit("pi-i-u");
        if (pmark !== null) pmark *= readUnit("pi-p-u");
        const pMax = imax * imax * R;
        const pts = [];
        for (let k = 0; k <= 50; k++) {
          const I = imax * (k / 50);
          pts.push({ x: I * (readUnit("pi-i-u") === 0.001 ? 1000 : 1), y: I * I * R });
        }
        const xMax = readUnit("pi-i-u") === 0.001 ? imax * 1000 : imax;
        const marks = [];
        let Istar = null;
        if (pmark !== null) {
          Istar = Math.sqrt(pmark / R);
          marks.push({
            x: Istar * (readUnit("pi-i-u") === 0.001 ? 1000 : 1),
            y: pmark,
            color: "#c0392b"
          });
        }
        const wrap = document.getElementById("plot-4-3-wrap");
        wrap.hidden = false;
        drawXYPlot(document.getElementById("plot-4-3"), {
          xMin: 0, xMax: xMax, yMin: 0, yMax: Math.max(pMax, pmark || 0) * 1.05,
          xTicks: niceTicks(0, xMax, 5),
          yTicks: niceTicks(0, Math.max(pMax, pmark || 0) * 1.05, 5),
          xLabel: readUnit("pi-i-u") === 0.001 ? "I (mA)" : "I (A)",
          yLabel: "P (W)",
          series: [{ pts, color: "#1a6b4a" }],
          marks
        });
        let proc = `${mj("P = I^{2} R")} con R = ${formatQty(R, "\\Omega")}. Es una parábola, no una recta.\n`;
        proc += `A I = ${formatQty(imax, "A")} (${formatQty(imax * 1000, "mA")}), P = ${formatQty(pMax, "W")}.\n`;
        proc += "Duplicar I cuadruplica P. Un string al doble de Imp no calienta el cable el doble: lo calienta cuatro veces.\n";
        if (Istar !== null) {
          proc += `Para P = ${formatQty(pmark, "W")}: ${mj(`I = \\sqrt{P/R} = ${texQtyBody(Istar, "A")}`)} = ${formatQty(Istar * 1000, "mA")}.`;
        }
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnPcc = document.getElementById("btn-pcc-4-3");
  if (btnPcc) {
    btnPcc.addEventListener("click", () => {
      const out = document.getElementById("proc-4-3-pcc");
      try {
        const V = readOptionalNumber("pcc-v");
        const I = readOptionalNumber("pcc-i");
        if (V === null || I === null) throw new Error("Indica V e I máx de la acometida.");
        const cap = V * I;
        let proc = `${mj(`P_{\\mathrm{máx}} = V I = ${texQtyBody(V, "V")} \\cdot ${texQtyBody(I, "A")} = ${texQtyBody(cap, "W")} = ${texQtyBody(cap / 1000, "kW")}`)}.\n`;
        let sum = 0;
        for (let n = 1; n <= 4; n++) {
          const name = (document.getElementById(`pcc-l${n}n`)?.value || `Carga ${n}`).trim() || `Carga ${n}`;
          const pW = readOptionalNumber(`pcc-l${n}p`);
          const hp = readOptionalNumber(`pcc-l${n}h`);
          let P = 0;
          if (hp !== null) P += hp * HP_W;
          if (pW !== null) P += pW;
          if (P === 0 && hp === null && pW === null) continue;
          sum += P;
          proc += `${name}: ${formatQty(P, "W")}`;
          if (hp !== null) proc += ` (${formatQtyPlain(hp)} hp × 746 W)`;
          proc += ".\n";
        }
        proc += `Suma = ${formatQty(sum, "W")} = ${formatQty(sum / 1000, "kW")}.\n`;
        if (sum <= cap) {
          proc += `Cabe: margen ${formatQty(cap - sum, "W")} (${formatQtyPlain(100 * (1 - sum / cap))} % libre).`;
        } else {
          proc += `No cabe: exceso ${formatQty(sum - cap, "W")}. Hay que deslastrar, subir el PCC o desplazar cargas.`;
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec4_5() {
  const btn = document.getElementById("btn-eta-4-5");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-4-5");
      try {
        let Pout = readOptionalNumber("eta-out");
        let Pin = readOptionalNumber("eta-in");
        let eta = readEtaFrac("eta-n");
        const V = readOptionalNumber("eta-v");
        const Iin = readOptionalNumber("eta-i");
        if (Pout !== null) Pout *= readUnit("eta-out-u");
        if (Pin !== null) Pin *= readUnit("eta-in-u");
        if (Pin === null && V !== null && Iin !== null) Pin = V * Iin;
        if (Pout !== null && Pin !== null && eta === null) eta = Pout / Pin;
        else if (Pout !== null && eta !== null && Pin === null) Pin = Pout / eta;
        else if (Pin !== null && eta !== null && Pout === null) Pout = eta * Pin;
        if (Pout === null || Pin === null || eta === null) {
          throw new Error("Indica dos de P_sal, P_ent y η (V e I de entrada sustituyen a P_ent).");
        }
        let proc = `${mj("\\eta = P_{\\mathrm{sal}} / P_{\\mathrm{ent}}")}.  ${mj("1\\,\\mathrm{hp} = 746\\,\\mathrm{W}")}.\n`;
        proc += `${mj(`P_{\\mathrm{sal}} = ${texQtyBody(Pout, "W")} = ${texQtyBody(Pout / HP_W, "hp")}`)}.\n`;
        proc += `${mj(`P_{\\mathrm{ent}} = ${texQtyBody(Pin, "W")}`)}.\n`;
        proc += `${mj(`\\eta = ${texQtyBody(eta * 100)}\\,\\%`)}.\n`;
        proc += `Pérdida = ${formatQty(Pin - Pout, "W")} (${formatEta(1 - eta)}).\n`;
        if (V !== null) {
          const I = Pin / V;
          proc += `${mj(`I_{\\mathrm{ent}} = P_{\\mathrm{ent}} / V = ${texQtyBody(I, "A")}`)}.`;
        }
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnCas = document.getElementById("btn-cas-4-5");
  if (btnCas) {
    btnCas.addEventListener("click", () => {
      const out = document.getElementById("proc-4-5-cas");
      try {
        let e1 = readEtaFrac("cas-1");
        let e2 = readEtaFrac("cas-2");
        let e3 = readEtaFrac("cas-3");
        let et = readEtaFrac("cas-nt");
        const Ein = readOptionalNumber("cas-e");
        const Pin = readOptionalNumber("cas-pin");
        const Pout = readOptionalNumber("cas-pout");
        const dbl = !!document.getElementById("cas-double")?.checked;
        if (Pin !== null && Pout !== null && et === null) et = Pout / Pin;
        if (dbl) {
          if (et === null) throw new Error("Para «una el doble de la otra» indica P_ent y P_sal (o η total).");
          e1 = Math.sqrt(et / 2);
          e2 = 2 * e1;
          e3 = null;
        } else if (et !== null) {
          const given = [e1, e2, e3].filter((v) => v !== null);
          if (given.length === 1) {
            e2 = et / given[0];
          } else if (given.length === 2) {
            const prod2 = given[0] * given[1];
            if (Math.abs(prod2 - et) / Math.max(et, 1e-12) > 0.02) {
              e3 = et / prod2;
            }
          }
        }
        const stages = [e1, e2, e3].filter((v) => v !== null);
        if (!stages.length && et === null) throw new Error("Indica al menos una eficiencia o Pin y Pout.");
        const prod = stages.reduce((a, b) => a * b, 1);
        const etaT = et !== null && !dbl && stages.length === 0 ? et : prod;
        let proc = `${mj("\\eta_{\\mathrm{t}} = \\eta_1 \\eta_2 \\eta_3")}. Las etapas en serie se multiplican.\n`;
        stages.forEach((e, i) => {
          proc += `η${i + 1} = ${formatEta(e)}.\n`;
        });
        if (dbl) {
          proc += `η_t = ${formatEta(et)}. Con η₂ = 2 η₁: 2 η₁² = η_t → η₁ = ${formatEta(e1)}, η₂ = ${formatEta(e2)}.\n`;
        }
        proc += `η_t = ${formatEta(etaT)}.\n`;
        if (Ein !== null) proc += `E_sal = ${formatQty(Ein * etaT, "J")} (entrada ${formatQty(Ein, "J")}).\n`;
        if (Pin !== null) {
          proc += `P_sal = ${formatQty(Pin * etaT, "W")} (entrada ${formatQty(Pin, "W")}).\n`;
        }
        if (Pout !== null && Pin !== null) {
          proc += `Comprobación P_sal / P_ent = ${formatEta(Pout / Pin)}.`;
        }
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec4_6() {
  const btn = document.getElementById("btn-en-4-6");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-4-6");
      try {
        let P = readOptionalNumber("en-p");
        let t = readOptionalNumber("en-t");
        let W = readOptionalNumber("en-w");
        const kwhIn = readOptionalNumber("en-kwh");
        const hweek = readOptionalNumber("en-hweek");
        const months = readOptionalNumber("en-months");
        const rateC = readOptionalNumber("en-rate");
        const budget = readOptionalNumber("en-budget");
        const V = readOptionalNumber("en-v");
        const eta = readEtaFrac("en-eta");
        if (P !== null) P *= readUnit("en-p-u");
        if (t !== null) t *= readUnit("en-t-u");
        if (kwhIn !== null && W === null) W = kwhIn * J_PER_KWH;
        if (hweek !== null && months !== null) {
          const hours = hweek * months * (4 / 3);
          t = hours * 3600;
        }
        const rate = rateC !== null ? rateC / 100 : null;
        if (budget !== null && P !== null && t === null && W === null) {
          if (!rate) throw new Error("Indica la tarifa en ¢/kWh.");
          const kwhBuy = budget / rate;
          t = (kwhBuy * 1000 / P) * 3600;
          W = P * t;
        }
        if (P !== null && t !== null && W === null) W = P * t;
        else if (W !== null && t !== null && P === null) P = W / t;
        else if (W !== null && P !== null && t === null) t = W / P;
        if (W === null && P === null) throw new Error("Indica P y t, o la energía (J o kWh), o P y un presupuesto.");
        const kWh = W / J_PER_KWH;
        let proc = `${mj("W = P t")}.  ${mj("1\\,\\mathrm{kWh} = 3.6\\times 10^{6}\\,\\mathrm{J}")}.\n`;
        if (hweek !== null && months !== null) {
          proc += `Mes del libro = 4/3 semanas. t = ${formatQtyPlain(hweek)} h/sem × ${formatQtyPlain(months)} meses × 4/3 = ${formatQtyPlain(hweek * months * 4 / 3)} h.\n`;
        }
        if (P !== null) proc += `${mj(`P = ${texQtyBody(P, "W")} = ${texQtyBody(P / 1000, "kW")}`)}.\n`;
        if (t !== null) proc += `${mj(`t = ${texQtyBody(t, "s")}`)} = ${formatQtyPlain(t / 3600)} h.\n`;
        proc += `${mj(`W = ${texQtyBody(W, "J")} = ${texQtyBody(kWh, "kWh")}`)}.\n`;
        if (rate !== null) {
          const cost = kWh * rate;
          proc += `Tarifa ${formatQtyPlain(rateC)} ¢/kWh = ${formatQtyPlain(rate)} $/kWh. Costo = ${formatQtyPlain(cost)} $.\n`;
        }
        if (budget !== null && P !== null) {
          proc += `Con ${formatQtyPlain(budget)} $ a esa tarifa: ${formatQtyPlain(budget / rate)} kWh → t = ${formatQtyPlain(t / 3600)} h.\n`;
        }
        if (V !== null && P !== null) {
          proc += `${mj(`I = P / V = ${texQtyBody(P / V, "A")}`)} a ${formatQty(V, "V")}.\n`;
        }
        if (eta !== null) {
          proc += `η = ${formatEta(eta)}. Energía perdida o no aprovechada = ${formatQty(kWh * (1 - eta), "kWh")} (${formatQty(W * (1 - eta), "J")}).`;
        }
        setMathText(out, proc.trim());
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnCost = document.getElementById("btn-cost-4-6");
  if (btnCost) {
    btnCost.addEventListener("click", () => {
      const out = document.getElementById("proc-4-6-cost");
      try {
        setMathText(out, tallyCostRows("cost-rate", 4, "c6"));
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function tallyCostRows(rateId, n, prefix) {
  const rateC = readOptionalNumber(rateId);
  if (rateC === null) throw new Error("Indica la tarifa en ¢/kWh.");
  const rate = rateC / 100;
  let proc = `Tarifa ${formatQtyPlain(rateC)} ¢/kWh = ${formatQtyPlain(rate)} $/kWh.\n`;
  let kTot = 0;
  for (let i = 1; i <= n; i++) {
    const name = (document.getElementById(`${prefix}-n${i}`)?.value || `Aparato ${i}`).trim();
    const P = readOptionalNumber(`${prefix}-p${i}`);
    const t = readOptionalNumber(`${prefix}-t${i}`);
    if (P === null || t === null) continue;
    const kWh = (P / 1000) * t;
    const cost = kWh * rate;
    kTot += kWh;
    proc += `${name}: ${formatQtyPlain(P)} W × ${formatQtyPlain(t)} h = ${formatQtyPlain(kWh)} kWh → ${formatQtyPlain(cost)} $.\n`;
  }
  proc += `Total ${formatQtyPlain(kTot)} kWh × ${formatQtyPlain(rate)} $/kWh = ${formatQtyPlain(kTot * rate)} $.`;
  return proc;
}

function initSec4_9() {
  const btn = document.getElementById("btn-sp-4-9");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-4-9");
      try {
        let E = readOptionalNumber("sp-e");
        let R = readOptionalNumber("sp-r");
        let I = readOptionalNumber("sp-i");
        let t = readOptionalNumber("sp-t");
        if (E !== null) E *= readUnit("sp-e-u");
        if (R !== null) R *= readUnit("sp-r-u");
        if (I !== null) I *= readUnit("sp-i-u");
        if (t !== null) t *= readUnit("sp-t-u");
        else t = 1;
        const invert = !!document.getElementById("sp-invert")?.checked;
        if (E === null && I !== null && R !== null) E = I * R;
        if (I === null && E !== null && R !== null) {
          if (R === 0) throw new Error("R = 0: cortocircuito.");
          I = E / R;
        }
        if (R === null && E !== null && I !== null) {
          if (I === 0) throw new Error("I = 0 no define R.");
          R = E / I;
        }
        if (E === null || I === null || R === null) throw new Error("Indica E y R, o I y R (ejercicio 62).");
        const sign = invert ? -1 : 1;
        const Isigned = sign * I;
        const P = Math.abs(E * I);
        const W = P * t;
        let proc = `${mj("I = E / R")}, ${mj("P = E I = I^{2} R")}, ${mj("W = P t")}.\n`;
        proc += `${mj(`E = ${texQtyBody(E, "V")}`)}, ${mj(`R = ${texQtyBody(R, "\\Omega")}`)}`;
        proc += invert ? " (polaridad invertida).\n" : ".\n";
        proc += `${mj(`I = ${texQtyBody(Isigned, "A")} = ${texQtyBody(Isigned * 1e6, "\\mu A")}`)}`;
        proc += invert ? " (sentido opuesto al de la fig. 4.29).\n" : ".\n";
        proc += `${mj(`P = ${texQtyBody(P, "W")}`)}.\n`;
        proc += `${mj(`W = ${texQtyBody(W, "J")}`)} en ${formatQty(t, "s")}.`;
        const plus = document.getElementById("fig-4-29-plus");
        const minus = document.getElementById("fig-4-29-minus");
        if (plus && minus) {
          plus.textContent = invert ? "−" : "+";
          minus.textContent = invert ? "+" : "−";
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }

  const btnC = document.getElementById("btn-c9-4-9");
  if (btnC) {
    btnC.addEventListener("click", () => {
      const out = document.getElementById("proc-4-9-cost");
      try {
        setMathText(out, tallyCostRows("c9-rate", 5, "c9"));
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}
function clearSeriesPrefix(prefix, n) {
  for (let i = 1; i <= n; i++) {
    setField(`${prefix}-n${i}`, `R${i}`);
    setField(`${prefix}-r${i}`, "");
    setField(`${prefix}-v${i}`, "");
    setField(`${prefix}-p${i}`, "");
    const ru = document.getElementById(`${prefix}-ru${i}`);
    if (ru) ru.value = "1";
    const st = document.getElementById(`${prefix}-st${i}`);
    if (st) st.value = "series";
  }
  const e = document.getElementById(`${prefix}-e`);
  const i = document.getElementById(`${prefix}-i`);
  const rt = document.getElementById(`${prefix}-rt`);
  if (e) e.value = "";
  if (i) i.value = "";
  if (rt) rt.value = "";
}

function readSeriesRows(prefix, n) {
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const nameEl = document.getElementById(`${prefix}-n${i}`);
    if (!nameEl) continue;
    const name = (nameEl.value || `R${i}`).trim() || `R${i}`;
    const st = document.getElementById(`${prefix}-st${i}`)?.value || "series";
    const ru = Number(document.getElementById(`${prefix}-ru${i}`)?.value || 1);
    const rRaw = (document.getElementById(`${prefix}-r${i}`)?.value || "").trim();
    const vRaw = (document.getElementById(`${prefix}-v${i}`)?.value || "").trim();
    const pRaw = (document.getElementById(`${prefix}-p${i}`)?.value || "").trim();
    const r = rRaw === "" ? null : parseNumberInput(rRaw) * ru;
    const v = vRaw === "" ? null : parseNumberInput(vRaw);
    const p = pRaw === "" ? null : parseNumberInput(pRaw);
    if (st === "series" && r === null && v === null && p === null && rRaw === "" && name === `R${i}`) {
      continue;
    }
    rows.push({ i, name, st, r, v, p, ru });
  }
  return rows;
}

function recommendWatt(p) {
  const abs = Math.abs(p);
  if (abs <= 0.5) return "½ W";
  if (abs <= 1) return "1 W";
  if (abs <= 2) return "2 W";
  const ceil = Math.ceil(abs);
  return `${ceil} W (fuera de ½/1/2; escala de planta)`;
}

function solveRfromPE(E, R0, P) {
  const a = P;
  const b = 2 * P * R0 - E * E;
  const c = P * R0 * R0;
  const disc = b * b - 4 * a * c;
  if (a === 0) throw new Error("P = 0 no fija R.");
  if (disc < -1e-9) throw new Error("Sin R real para esa P y E.");
  const s = Math.sqrt(Math.max(disc, 0));
  const r1 = (-b + s) / (2 * a);
  const r2 = (-b - s) / (2 * a);
  const pos = [r1, r2].filter((r) => r > 1e-12);
  if (!pos.length) throw new Error("R resultante no es positiva.");
  pos.sort((x, y) => x - y);
  return pos[0];
}

function analyzeSeries({ E, I, RT, rows, wantWatt }) {
  const items = rows.map((row) => ({ ...row }));
  let proc = `${mj("R_T = \\sum R")}, ${mj("I = E / R_T")}, ${mj("V_x = I R_x")}.\n`;

  items.forEach((el) => {
    if (el.st === "short") {
      el.r = 0;
      el.v = 0;
      el.p = 0;
      proc += `${el.name}: cortocircuito (bypass / jumper) → no suma a ${mj("R_T")}.\n`;
    } else if (el.st === "open") {
      proc += `${el.name}: abierto (fusible / MC4 / filamento) → fuera del lazo.\n`;
    }
  });

  const loop = items.filter((el) => el.st !== "open");
  if (!loop.length) throw new Error("El lazo está abierto: no hay trayectoria.");

  if (I == null) {
    for (const el of loop) {
      if (el.r != null && el.r > 0 && el.v != null) {
        I = el.v / el.r;
        proc += `${mj("I = V / R")} en ${el.name}: ${formatQty(I, "A")}.\n`;
        break;
      }
      if (el.r != null && el.r > 0 && el.p != null) {
        I = Math.sqrt(Math.abs(el.p / el.r)) * (el.p < 0 ? -1 : 1);
        proc += `${mj("I = \\sqrt{P / R}")} en ${el.name}: ${formatQty(I, "A")}.\n`;
        break;
      }
      if (el.v != null && el.p != null && el.v !== 0) {
        I = el.p / el.v;
        proc += `${mj("I = P / V")} en ${el.name}: ${formatQty(I, "A")}.\n`;
        break;
      }
    }
  }

  if (I != null && I !== 0) {
    loop.forEach((el) => {
      if (el.st !== "series" || el.r != null) return;
      if (el.v != null) {
        el.r = el.v / I;
        proc += `${el.name}: ${mj(`R = V / I = ${texQtyBody(el.r, "\\Omega")}`)}.\n`;
      } else if (el.p != null) {
        el.r = el.p / (I * I);
        proc += `${el.name}: ${mj(`R = P / I^{2} = ${texQtyBody(el.r, "\\Omega")}`)}.\n`;
      }
    });
  }

  let still2 = loop.filter((el) => el.st === "series" && el.r === null);
  if (still2.length === 1 && E != null && still2[0].p != null && I == null) {
    const el = still2[0];
    const R0 = loop.reduce((s, x) => s + (x === el || x.r == null ? 0 : x.r), 0);
    el.r = solveRfromPE(E, R0, el.p);
    proc += `${el.name}: ${mj("P = E^{2} R / (R_0 + R)^{2}")} → ${formatQty(el.r, "\\Omega")}.\n`;
  }
  still2 = loop.filter((el) => el.st === "series" && el.r === null);
  if (still2.length === 1 && E != null && still2[0].v != null && I == null) {
    const el = still2[0];
    const R0 = loop.reduce((s, x) => s + (x === el || x.r == null ? 0 : x.r), 0);
    if (Math.abs(E - el.v) < 1e-12) throw new Error("V = E no deja R0 en el lazo.");
    el.r = (el.v * R0) / (E - el.v);
    proc += `${el.name}: divisor ${mj("V = E R / (R_0 + R)")} → ${formatQty(el.r, "\\Omega")}.\n`;
  }

  const unknownR = loop.filter((el) => el.st === "series" && el.r === null);
  const knownRsum = loop.reduce((s, el) => s + (el.r == null ? 0 : el.r), 0);
  if (RT != null && unknownR.length === 1) {
    unknownR[0].r = RT - knownRsum;
    if (unknownR[0].r < -1e-9) throw new Error("RT menor que la suma de R conocidas.");
    proc += `${unknownR[0].name}: ${mj(`R = R_T - \\sum R_{\\mathrm{conocidas}} = ${texQtyBody(unknownR[0].r, "\\Omega")}`)}.\n`;
  } else if (RT != null && unknownR.length > 1) {
    const remain = RT - knownRsum;
    if (remain < -1e-9) throw new Error("RT menor que la suma de R conocidas.");
    const each = remain / unknownR.length;
    unknownR.forEach((el) => { el.r = each; });
    proc += `Dos o más R vacías con ${mj("R_T")} conocido: se suponen iguales (p. ej. ${mj("R_1 = R_2")}). Cada una ${formatQty(each, "\\Omega")}.\n`;
  }

  if (loop.some((el) => el.st === "series" && el.r == null)) {
    throw new Error("Falta una R (o un dato V/P/RT/E que la fije).");
  }

  const RTcalc = loop.reduce((s, el) => s + el.r, 0);
  if (RT == null) RT = RTcalc;
  else if (Math.abs(RT - RTcalc) / Math.max(Math.abs(RT), 1e-12) > 0.02) {
    proc += `Aviso: RT ingresado ${formatQty(RT, "\\Omega")} vs suma ${formatQty(RTcalc, "\\Omega")}.\n`;
  }
  proc += `${mj(`R_T = ${texQtyBody(RTcalc, "\\Omega")}`)}.\n`;

  if (I == null) {
    if (E == null) throw new Error("Indica E o I (o V/P en un elemento).");
    if (RTcalc === 0) throw new Error("Lazo en cortocircuito: I no está definida por Ohm.");
    I = E / RTcalc;
    proc += `${mj(`I = E / R_T = ${texQtyBody(I, "A")}`)}.\n`;
  } else if (E == null) {
    E = I * RTcalc;
    proc += `${mj(`E = I R_T = ${texQtyBody(E, "V")}`)}.\n`;
  } else {
    const Icheck = RTcalc === 0 ? null : E / RTcalc;
    if (Icheck != null && Math.abs(Icheck - I) / Math.max(Math.abs(I), 1e-12) > 0.03) {
      proc += `Aviso: I ingresada ${formatQty(I, "A")} vs ${mj("E/R_T")} = ${formatQty(Icheck, "A")}. Se usa la ingresada.\n`;
    }
  }

  const dir = I >= 0 ? "horaria (sale del + neto)" : "antihoraria (el equivalente invierte E)";
  proc += `Sentido de I (convención): ${dir}.\n`;

  let sumV = 0;
  let sumP = 0;
  loop.forEach((el) => {
    el.v = I * el.r;
    el.p = I * I * el.r;
    sumV += el.v;
    sumP += el.p;
    proc += `${el.name}: ${mj(`V = ${texQtyBody(el.v, "V")}`)}, ${mj(`P = ${texQtyBody(el.p, "W")}`)}`;
    if (wantWatt) proc += ` → wattaje mín. ${recommendWatt(el.p)}`;
    proc += ".\n";
  });

  proc += `KVL: ${mj(`\\sum V = ${texQtyBody(sumV, "V")}`)} vs ${mj(`E = ${texQtyBody(E, "V")}`)}`;
  proc += Math.abs(sumV - E) / Math.max(Math.abs(E), 1e-12) < 0.02 ? " — se cumple.\n" : " — revisar polaridades.\n";
  const psrc = E * I;
  proc += `Potencia: ${mj(`\\sum P = ${texQtyBody(sumP, "W")}`)} vs ${mj(`E I = ${texQtyBody(psrc, "W")}`)}`;
  proc += Math.abs(sumP - psrc) / Math.max(Math.abs(psrc), 1e-12) < 0.02 ? " — entregada = disipada." : " — revisar.";
  return { proc, E, I, RT: RTcalc, items: loop, opens: items.filter((el) => el.st === "open") };
}

function setSvgMarkup(svg, markup) {
  if (!svg) return;
  const parsed = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`,
    "image/svg+xml"
  );
  const root = parsed.documentElement;
  if (!root || root.querySelector("parsererror")) {
    svg.innerHTML = markup;
    return;
  }
  svg.replaceChildren();
  Array.from(root.childNodes).forEach((node) => {
    svg.appendChild(document.importNode(node, true));
  });
}

function defaultSeriesLoopModel() {
  return {
    items: [
      { i: 1, name: "R1", st: "series" },
      { i: 2, name: "R2", st: "series" },
      { i: 3, name: "R3", st: "series" }
    ],
    opens: []
  };
}

function formatOhmLabel(r) {
  const a = Math.abs(r);
  if (a >= 1e6) return `${Number((r / 1e6).toPrecision(3))} MΩ`;
  if (a >= 1e3) return `${Number((r / 1e3).toPrecision(3))} kΩ`;
  if (a > 0 && a < 1) return `${Number((r * 1e3).toPrecision(3))} mΩ`;
  return `${Number(r.toPrecision(4))} Ω`;
}

function drawSeriesLoop(svg, model) {
  if (!svg) return;
  const src = model || defaultSeriesLoopModel();
  const shown = [...(src.items || []), ...(src.opens || [])]
    .sort((a, b) => (a.i || 0) - (b.i || 0));
  const elements = shown.length ? shown : defaultSeriesLoopModel().items;
  const n = elements.length;
  const x0 = 80, x1 = 560, yTop = 50, yBot = 170;
  const padL = 54, padR = 16;
  const slot = (x1 - x0 - padL - padR) / n;
  const rw = Math.min(78, Math.max(36, slot * 0.62));
  const fs = n > 4 ? 10 : 12;
  let res = "";
  res += `<line x1="${x0}" y1="${yTop}" x2="${x0}" y2="${yBot}" stroke="currentColor" stroke-width="2"/>`;
  res += `<line x1="${x0 - 16}" y1="${yTop + 22}" x2="${x0 + 16}" y2="${yTop + 22}" stroke="currentColor" stroke-width="2.4"/>`;
  res += `<line x1="${x0 - 10}" y1="${yBot - 22}" x2="${x0 + 10}" y2="${yBot - 22}" stroke="currentColor" stroke-width="2"/>`;
  res += `<text x="${x0 - 44}" y="${yTop + 26}" font-size="13" fill="#1e8449">+</text>`;
  res += `<text x="${x0 - 42}" y="${yBot - 16}" font-size="13" fill="#c0392b">−</text>`;
  res += `<text x="${x0 - 48}" y="${(yTop + yBot) / 2 + 5}" font-size="15" fill="currentColor">E</text>`;
  if (src.E != null) {
    res += `<text x="${x0 - 54}" y="${(yTop + yBot) / 2 + 22}" font-size="11" fill="currentColor">${Number(src.E.toPrecision(4))} V</text>`;
  }
  let cursor = x0;
  elements.forEach((el, k) => {
    const cx = x0 + padL + slot * (k + 0.5);
    const left = cx - rw / 2;
    const right = cx + rw / 2;
    res += `<line x1="${cursor}" y1="${yTop}" x2="${left}" y2="${yTop}" stroke="currentColor" stroke-width="2"/>`;
    if (el.st === "open") {
      res += `<circle cx="${left}" cy="${yTop}" r="3.2" fill="none" stroke="#c0392b" stroke-width="2"/>`;
      res += `<circle cx="${right}" cy="${yTop}" r="3.2" fill="none" stroke="#c0392b" stroke-width="2"/>`;
      res += `<line x1="${left + 6}" y1="${yTop - 10}" x2="${right - 6}" y2="${yTop + 10}" stroke="#c0392b" stroke-width="1.6"/>`;
      res += `<text x="${cx}" y="${yTop - 16}" text-anchor="middle" font-size="${fs}" fill="#c0392b">${el.name}</text>`;
      res += `<text x="${cx}" y="${yTop + 28}" text-anchor="middle" font-size="10" fill="#c0392b">abierto</text>`;
    } else if (el.st === "short") {
      res += `<rect x="${left}" y="${yTop - 12}" width="${rw}" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 3"/>`;
      res += `<line x1="${left}" y1="${yTop}" x2="${right}" y2="${yTop}" stroke="#2471a3" stroke-width="3"/>`;
      res += `<text x="${cx}" y="${yTop - 16}" text-anchor="middle" font-size="${fs}" fill="currentColor">${el.name}</text>`;
      res += `<text x="${cx}" y="${yTop + 32}" text-anchor="middle" font-size="10" fill="#2471a3">corto</text>`;
    } else {
      res += `<rect x="${left}" y="${yTop - 12}" width="${rw}" height="24" fill="none" stroke="currentColor" stroke-width="2"/>`;
      res += `<text x="${cx}" y="${yTop - 16}" text-anchor="middle" font-size="${fs}" fill="currentColor">${el.name}</text>`;
      if (el.r != null) {
        res += `<text x="${cx}" y="${yTop + 38}" text-anchor="middle" font-size="11" fill="currentColor">${formatOhmLabel(el.r)}</text>`;
      }
    }
    cursor = right;
  });
  res += `<line x1="${cursor}" y1="${yTop}" x2="${x1}" y2="${yTop}" stroke="currentColor" stroke-width="2"/>`;
  res += `<line x1="${x1}" y1="${yTop}" x2="${x1}" y2="${yBot}" stroke="currentColor" stroke-width="2"/>`;
  res += `<line x1="${x1}" y1="${yBot}" x2="${x0}" y2="${yBot}" stroke="currentColor" stroke-width="2"/>`;
  const idir = (src.I || 0) >= 0 ? 1 : -1;
  const ax = idir > 0 ? x0 + 28 : x1 - 28;
  if (idir > 0) {
    res += `<polygon points="${ax + 14},${yTop} ${ax},${yTop - 6} ${ax},${yTop + 6}" fill="#2471a3"/>`;
    res += `<text x="${ax + 7}" y="${yTop - 12}" text-anchor="middle" font-size="13" fill="#2471a3">I</text>`;
  } else {
    res += `<polygon points="${ax - 14},${yTop} ${ax},${yTop + 6} ${ax},${yTop - 6}" fill="#2471a3"/>`;
    res += `<text x="${ax - 7}" y="${yTop - 12}" text-anchor="middle" font-size="13" fill="#2471a3">I</text>`;
  }
  if (src.I != null) {
    res += `<text x="${ax + (idir > 0 ? 7 : -7)}" y="${yTop + 28}" text-anchor="middle" font-size="11" fill="#2471a3">${Number(src.I.toPrecision(3))} A</text>`;
  }
  setSvgMarkup(svg, res);
}

function initSec5() {
  initSec5_2();
  initSec5_3();
  initSec5_4();
  initSec5_6();
  initSec5_7();
  initSec5_8();
  initSec5_12();
}

function initSec5_2() {
  const svg = document.getElementById("svg-s52");
  drawSeriesLoop(svg, defaultSeriesLoopModel());
  const btn = document.getElementById("btn-s52");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-5-2");
    try {
      let E = readOptionalNumber("s52-e");
      let I = readOptionalNumber("s52-i");
      let RT = readOptionalNumber("s52-rt");
      if (E != null) E *= readUnit("s52-e-u");
      if (I != null) I *= readUnit("s52-i-u");
      if (RT != null) RT *= readUnit("s52-rt-u");
      const model = analyzeSeries({ E, I, RT, rows: readSeriesRows("s52", 8), wantWatt: false });
      setMathText(out, model.proc);
      drawSeriesLoop(svg, model);
    } catch (e) {
      setMathText(out, e.message);
      drawSeriesLoop(svg, defaultSeriesLoopModel());
    }
  });
}

function initSec5_3() {
  const btn = document.getElementById("btn-s53");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-5-3");
    try {
      const sources = [];
      for (let i = 1; i <= 4; i++) {
        const raw = (document.getElementById(`s53-e${i}`)?.value || "").trim();
        if (raw === "") continue;
        const mag = parseNumberInput(raw) * readUnit(`s53-eu${i}`);
        const pol = Number(document.getElementById(`s53-pol${i}`)?.value || 1);
        const name = (document.getElementById(`s53-en${i}`)?.value || `E${i}`).trim();
        sources.push({ name, signed: pol * mag, mag, pol });
      }
      const rows = [];
      for (let i = 1; i <= 4; i++) {
        const rRaw = (document.getElementById(`s53-r${i}`)?.value || "").trim();
        const vRaw = (document.getElementById(`s53-v${i}`)?.value || "").trim();
        const pRaw = (document.getElementById(`s53-p${i}`)?.value || "").trim();
        if (rRaw === "" && vRaw === "" && pRaw === "") continue;
        const ru = Number(document.getElementById(`s53-ru${i}`)?.value || 1);
        rows.push({
          i,
          name: (document.getElementById(`s53-rn${i}`)?.value || `R${i}`).trim(),
          st: "series",
          r: rRaw === "" ? null : parseNumberInput(rRaw) * ru,
          v: vRaw === "" ? null : parseNumberInput(vRaw),
          p: pRaw === "" ? null : parseNumberInput(pRaw)
        });
      }
      let I = readOptionalNumber("s53-i");
      if (I != null) I *= readUnit("s53-iu");
      let Eknown = sources.reduce((s, src) => s + src.signed, 0);
      const unknownSrc = sources.length < 4 && (document.getElementById("s53-e4")?.value || "").trim() === ""
        ? null : null;
      let proc = "Redibujo: una sola fuente neta (horario = positivo).\n";
      sources.forEach((src) => {
        proc += `${src.name}: ${formatQty(src.mag, "V")} ${src.pol > 0 ? "a favor" : "en contra"} → ${formatQty(src.signed, "V")}.\n`;
      });

      if (I == null) {
        for (const el of rows) {
          if (el.r != null && el.r > 0 && el.v != null) { I = el.v / el.r; break; }
          if (el.r != null && el.r > 0 && el.p != null) { I = Math.sqrt(Math.abs(el.p / el.r)); break; }
        }
      }
      rows.forEach((el) => {
        if (el.r == null && I != null && I !== 0) {
          if (el.v != null) el.r = el.v / I;
          else if (el.p != null) el.r = el.p / (I * I);
        }
      });
      if (rows.some((el) => el.r == null)) throw new Error("Falta una R (o V/P/I que la fije).");
      const RT = rows.reduce((s, el) => s + el.r, 0);
      proc += `${mj(`R_T = ${texQtyBody(RT, "\\Omega")}`)}.\n`;

      const emptyE = [];
      for (let i = 1; i <= 4; i++) {
        const raw = (document.getElementById(`s53-e${i}`)?.value || "").trim();
        const name = (document.getElementById(`s53-en${i}`)?.value || `E${i}`).trim();
        const pol = Number(document.getElementById(`s53-pol${i}`)?.value || 1);
        if (raw === "" && name && (i === 1 || (document.getElementById(`s53-en${i}`)?.value || "") !== `E${i}` || i <= sources.length + 1)) {
          if (i <= 4 && (document.getElementById(`s53-en${i}`).value || "") && raw === "") {
            emptyE.push({ i, name, pol });
          }
        }
      }
      const eFieldsEmpty = [];
      for (let i = 1; i <= 4; i++) {
        const raw = (document.getElementById(`s53-e${i}`)?.value || "").trim();
        const named = (document.getElementById(`s53-en${i}`)?.value || "").trim();
        if (raw === "" && named && named !== `E${i}`) {
          eFieldsEmpty.push({ i, name: named, pol: Number(document.getElementById(`s53-pol${i}`)?.value || 1) });
        }
      }
      if (I == null) {
        if (RT === 0) throw new Error("RT = 0.");
        I = Eknown / RT;
        proc += `${mj(`E_{\\mathrm{neto}} = ${texQtyBody(Eknown, "V")}`)}.\n`;
        proc += `${mj(`I = E_{\\mathrm{neto}} / R_T = ${texQtyBody(I, "A")}`)}.\n`;
      } else {
        const Eneed = I * RT;
        proc += `${mj(`E_{\\mathrm{neto,\,necesario}} = I R_T = ${texQtyBody(Eneed, "V")}`)}.\n`;
        if (eFieldsEmpty.length === 1) {
          const miss = eFieldsEmpty[0];
          const rest = Eknown;
          const signed = Eneed - rest;
          const mag = signed / miss.pol;
          proc += `${miss.name}: ${formatQty(mag, "V")} (${miss.pol > 0 ? "a favor" : "en contra"} horario). `;
          if (mag < 0) proc += `El signo negativo invierte la polaridad dibujada (|E| = ${formatQty(Math.abs(mag), "V")}).\n`;
          else proc += "\n";
          Eknown = Eneed;
        } else {
          proc += `Fuentes conocidas suman ${formatQty(Eknown, "V")}. `;
          proc += Math.abs(Eknown - Eneed) / Math.max(Math.abs(Eneed), 1e-12) < 0.03
            ? "Cuadran con I.\n"
            : `No cuadran con I·RT = ${formatQty(Eneed, "V")}: falta una E o una polaridad.\n`;
        }
      }
      const dir = I >= 0 ? "horaria" : "antihoraria";
      proc += `I = ${formatQty(Math.abs(I), "A")} ${dir}. Redibujado: una fuente de ${formatQty(Math.abs(I * RT), "V")} con ese sentido.\n`;
      rows.forEach((el) => {
        const v = I * el.r;
        const p = I * I * el.r;
        proc += `${el.name}: ${mj(`V = ${texQtyBody(v, "V")}`)}, ${mj(`P = ${texQtyBody(p, "W")}`)}.\n`;
      });
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec5_4() {
  const btnK = document.getElementById("btn-s54k");
  if (btnK) {
    btnK.addEventListener("click", () => {
      const out = document.getElementById("proc-5-4-kvl");
      try {
        const vals = [];
        let empty = -1;
        for (let i = 1; i <= 6; i++) {
          const raw = (document.getElementById(`s54k-v${i}`)?.value || "").trim();
          if (raw === "") {
            if (empty < 0) empty = i;
            continue;
          }
          vals.push({ i, v: parseNumberInput(raw) });
        }
        const sum = vals.reduce((s, x) => s + x.v, 0);
        let proc = `${mj("\\sum_{\\circlearrowright} V = 0")} (lazo) o ${mj("V_{ab} = \\sum V")} (camino).\n`;
        vals.forEach((x) => { proc += `Tramo ${x.i}: ${formatQty(x.v, "V")}.\n`; });
        if (empty > 0 && vals.length) {
          const unk = -sum;
          proc += `Tramo ${empty} (incógnita, lazo cerrado): ${formatQty(unk, "V")}.\n`;
          proc += `Comprobación: suma = ${formatQty(sum + unk, "V")}.`;
        } else {
          proc += `${mj(`V_{ab} = ${texQtyBody(sum, "V")}`)}. `;
          proc += sum >= 0 ? "a es positivo respecto de b." : "b es positivo respecto de a (Vab negativo).";
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btn = document.getElementById("btn-s54");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-5-4");
    try {
      let E = readOptionalNumber("s54-e");
      let I = readOptionalNumber("s54-i");
      let RT = readOptionalNumber("s54-rt");
      if (E != null) E *= readUnit("s54-e-u");
      if (I != null) I *= readUnit("s54-i-u");
      if (RT != null) RT *= readUnit("s54-rt-u");
      const wantWatt = !!document.getElementById("s54-watt")?.checked;
      const model = analyzeSeries({ E, I, RT, rows: readSeriesRows("s54", 8), wantWatt });
      setMathText(out, model.proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function readDividerRs() {
  const rs = [];
  for (let i = 1; i <= 6; i++) {
    const raw = (document.getElementById(`s56-r${i}`)?.value || "").trim();
    const name = (document.getElementById(`s56-n${i}`)?.value || `R${i}`).trim();
    const ru = Number(document.getElementById(`s56-ru${i}`)?.value || 1);
    if (raw === "") {
      rs.push({ i, name, r: null, ru });
    } else {
      rs.push({ i, name, r: parseNumberInput(raw) * ru, ru });
    }
  }
  while (rs.length && rs[rs.length - 1].r == null && rs[rs.length - 1].name === `R${rs[rs.length - 1].i}`) {
    rs.pop();
  }
  return rs.filter((el, idx, arr) => el.r != null || idx < arr.findLastIndex((x) => x.r != null || x.name !== `R${x.i}`) + 1);
}

function initSec5_6() {
  const btn = document.getElementById("btn-s56");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-5-6");
      try {
        let E = readOptionalNumber("s56-e");
        if (E != null) E *= readUnit("s56-e-u");
        if (E == null) throw new Error("Indica E.");
        let from = readOptionalNumber("s56-from") ?? 1;
        let to = readOptionalNumber("s56-to") ?? 1;
        from = Math.round(from);
        to = Math.round(to);
        let Vab = readOptionalNumber("s56-vab");
        if (Vab != null) Vab *= readUnit("s56-vab-u");
        const rs = [];
        for (let i = 1; i <= 6; i++) {
          const raw = (document.getElementById(`s56-r${i}`)?.value || "").trim();
          const name = (document.getElementById(`s56-n${i}`)?.value || `R${i}`).trim();
          const ru = Number(document.getElementById(`s56-ru${i}`)?.value || 1);
          if (raw === "" && name === `R${i}`) continue;
          rs.push({ i, name, r: raw === "" ? null : parseNumberInput(raw) * ru });
        }
        if (!rs.length) throw new Error("Indica al menos una R.");
        const unknowns = rs.filter((el) => el.r == null);
        if (unknowns.length > 1) throw new Error("Como mucho una R vacía.");
        if (unknowns.length === 1) {
          if (Vab == null) throw new Error("Con R vacía indica Vab del tramo.");
          const el = unknowns[0];
          const others = rs.filter((x) => x !== el);
          const RT0 = others.reduce((s, x) => s + x.r, 0);
          const inside = el.i >= from && el.i <= to;
          const tap0 = others.filter((x) => x.i >= from && x.i <= to).reduce((s, x) => s + x.r, 0);
          if (inside) {
            if (Math.abs(E - Vab) < 1e-12) throw new Error("Vab = E no deja R fuera del tramo.");
            el.r = (Vab * RT0 - E * tap0) / (E - Vab);
          } else {
            if (Math.abs(Vab) < 1e-12) throw new Error("Vab = 0 no fija la R fuera del tramo.");
            el.r = (E * tap0 - Vab * RT0) / Vab;
          }
          if (el.r < 0) throw new Error("R resultante negativa: revisa desde/hasta o Vab.");
          out; // keep
        }
        const RT = rs.reduce((s, x) => s + x.r, 0);
        const tap = rs.filter((x) => x.i >= from && x.i <= to);
        const Rtap = tap.reduce((s, x) => s + x.r, 0);
        const Vx = E * Rtap / RT;
        const I = E / RT;
        let proc = `${mj("V_x = E R_x / R_T")}.\n`;
        proc += `${mj(`R_T = ${texQtyBody(RT, "\\Omega")}`)}, ${mj(`I = ${texQtyBody(I, "A")}`)}.\n`;
        rs.forEach((el) => {
          const v = I * el.r;
          proc += `${el.name}: ${formatQty(el.r, "\\Omega")} → ${formatQty(v, "V")}.\n`;
        });
        const names = tap.map((x) => x.name).join(" + ") || "(tramo vacío)";
        proc += `${mj(`V_{ab}`)} en ${names}: ${formatQty(Vx, "V")}. `;
        proc += Vx >= 0 ? "a (inicio del tramo) es + respecto de b." : "polaridad invertida.";
        if (Vab != null && Math.abs(Vab - Vx) / Math.max(Math.abs(Vx), 1e-12) > 0.02) {
          proc += `\nAviso: Vab ingresado ${formatQty(Vab, "V")} vs calculado ${formatQty(Vx, "V")}.`;
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnD = document.getElementById("btn-s56d");
  if (!btnD) return;
  btnD.addEventListener("click", () => {
    const out = document.getElementById("proc-5-6-d");
    const rail = document.getElementById("tap-rail-5-6");
    try {
      let E = readOptionalNumber("s56d-e");
      let I = readOptionalNumber("s56d-i");
      if (E != null) E *= readUnit("s56d-e-u");
      if (I != null) I *= readUnit("s56d-i-u");
      const taps = (document.getElementById("s56d-taps")?.value || "")
        .split(/[;,]/).map((s) => s.trim()).filter(Boolean).map((s) => parseNumberInput(s));
      if (taps.length < 2) throw new Error("Indica al menos dos nodos (p. ej. 12, 8, 0).");
      if (I == null || I === 0) throw new Error("Indica I de diseño.");
      const span = taps[0] - taps[taps.length - 1];
      let proc = `Nodos de más + a más −. ΔV total = ${formatQty(span, "V")}`;
      if (E != null) proc += ` (E ingresado ${formatQty(E, "V")})`;
      proc += ".\n";
      if (E != null && Math.abs(span - E) / Math.max(Math.abs(E), 1e-12) > 0.03) {
        proc += "Aviso: E no coincide con primer nodo − último. Se usan los nodos.\n";
      }
      let html = "";
      const Rs = [];
      for (let i = 0; i < taps.length - 1; i++) {
        const dv = taps[i] - taps[i + 1];
        const R = dv / I;
        const P = dv * I;
        Rs.push({ i: i + 1, dv, R, P });
        proc += `${mj(`R_${i + 1}`)} entre ${formatQty(taps[i], "V")} y ${formatQty(taps[i + 1], "V")}: `;
        proc += `${formatQty(R, "\\Omega")}, ${formatQty(P, "W")} → ${recommendWatt(P)}.\n`;
        html += `<div class="tap-node"><span>${taps[i]} V</span><span></span><span></span></div>`;
        html += `<div class="tap-seg"><span></span><div class="tap-bar">R${i + 1} = ${Number(R.toPrecision(4))} Ω</div><span>${Number(dv.toPrecision(4))} V</span></div>`;
      }
      html += `<div class="tap-node"><span>${taps[taps.length - 1]} V</span><span></span><span></span></div>`;
      if (taps[taps.length - 1] === 0 || taps.includes(0)) {
        html += `<div class="tap-gnd"></div>`;
      }
      const RT = Rs.reduce((s, x) => s + x.R, 0);
      proc += `${mj(`R_T = ${texQtyBody(RT, "\\Omega")}`)}, ${mj(`I = ${texQtyBody(I, "A")}`)}.`;
      if (rail) rail.innerHTML = html;
      setMathText(out, proc);
    } catch (e) {
      if (rail) rail.innerHTML = "";
      setMathText(out, e.message);
    }
  });
}

function parseCsvNumbers(id) {
  const raw = (document.getElementById(id)?.value || "").trim();
  if (!raw) return [];
  return raw.split(/[;,]/).map((s) => s.trim()).filter(Boolean).map((s) => parseNumberInput(s));
}

function initSec5_7() {
  const btn = document.getElementById("btn-s57");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-5-7");
      try {
        const src = parseCsvNumbers("s57-src");
        if (!src.length) throw new Error("Indica las fuentes (V_izq − V_der), separadas por coma.");
        let gnd = readOptionalNumber("s57-gnd");
        const nNodes = src.length + 1;
        if (gnd == null) gnd = nNodes;
        gnd = Math.round(gnd);
        if (gnd < 1 || gnd > nNodes) throw new Error(`Nodo tierra entre 1 y ${nNodes}.`);
        let ia = readOptionalNumber("s57-va");
        let ib = readOptionalNumber("s57-vb");
        ia = ia == null ? 1 : Math.round(ia);
        ib = ib == null ? nNodes : Math.round(ib);
        if (ia < 1 || ia > nNodes || ib < 1 || ib > nNodes) {
          throw new Error(`Nodos Va/Vb entre 1 y ${nNodes}.`);
        }
        const V = new Array(nNodes).fill(0);
        const gi = gnd - 1;
        V[gi] = 0;
        for (let i = gi; i < src.length; i++) V[i + 1] = V[i] - src[i];
        for (let i = gi - 1; i >= 0; i--) V[i] = V[i + 1] + src[i];
        const Va = V[ia - 1];
        const Vb = V[ib - 1];
        const Vab = Va - Vb;
        let proc = `Cada fuente es ${mj("V_{\\mathrm{izq}} - V_{\\mathrm{der}}")} (+ si el + mira a la izquierda).\n`;
        proc += `Tierra en el nodo ${gnd} de ${nNodes}.\n`;
        V.forEach((v, i) => {
          const tags = [];
          if (i === ia - 1) tags.push("Va");
          if (i === ib - 1) tags.push("Vb");
          if (i === gi) tags.push("tierra");
          proc += `Nodo ${i + 1}: ${formatQty(v, "V")}${tags.length ? " = " + tags.join(", ") : ""}.\n`;
        });
        proc += `${mj(`V_{ab} = V_a - V_b = ${texQtyBody(Vab, "V")}`)}.`;
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnIc = document.getElementById("btn-s57ic");
  if (!btnIc) return;
  btnIc.addEventListener("click", () => {
    const out = document.getElementById("proc-5-7-ic");
    try {
      const pins = [];
      for (let i = 0; i <= 7; i++) {
        const v = readOptionalNumber(`s57ic-v${i}`);
        pins[i] = v;
      }
      let proc = "Pines respecto de tierra (V0 suele ser 0).\n";
      pins.forEach((v, i) => {
        if (v == null) return;
        proc += `${mj(`V_${i} = ${texQtyBody(v, "V")}`)}.\n`;
      });
      const pairsRaw = (document.getElementById("s57ic-pairs")?.value || "").trim();
      if (pairsRaw) {
        pairsRaw.split(/[;,]/).map((s) => s.trim()).filter(Boolean).forEach((p) => {
          const m = p.match(/^(\d)(\d)$/);
          if (!m) return;
          const i = Number(m[1]);
          const j = Number(m[2]);
          if (pins[i] == null || pins[j] == null) return;
          const v = pins[i] - pins[j];
          proc += `${mj(`V_{${i}${j}} = V_${i} - V_${j} = ${texQtyBody(v, "V")}`)}.\n`;
        });
      }
      const ir = (document.getElementById("s57ic-ir")?.value || "").trim();
      if (ir) {
        const parts = ir.split(/[;,]/).map((s) => s.trim());
        if (parts.length >= 3) {
          const i = Number(parts[0]);
          const j = Number(parts[1]);
          const R = parseNumberInput(parts[2]);
          if (pins[i] != null && pins[j] != null && R) {
            const dv = pins[i] - pins[j];
            const I = dv / R;
            proc += `Entre pines ${i} y ${j}, R = ${formatQty(R, "\\Omega")}: `;
            proc += `${mj(`I = ${texQtyBody(I, "A")}`)}`;
            proc += I >= 0 ? ` (de ${i} hacia ${j}).` : ` (de ${j} hacia ${i}).`;
          }
        }
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec5_8() {
  const btn = document.getElementById("btn-s58");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-5-8");
    try {
      let E = readOptionalNumber("s58-e");
      let VL = readOptionalNumber("s58-vl");
      let I = readOptionalNumber("s58-i");
      let RL = readOptionalNumber("s58-rl");
      let Ri = readOptionalNumber("s58-rint");
      if (E != null) E *= readUnit("s58-e-u");
      if (VL != null) VL *= readUnit("s58-vl-u");
      if (I != null) I *= readUnit("s58-i-u");
      if (RL != null) RL *= readUnit("s58-rl-u");
      if (Ri != null) Ri *= readUnit("s58-rint-u");

      if (VL == null && I != null && RL != null) VL = I * RL;
      if (I == null && VL != null && RL != null && RL !== 0) I = VL / RL;
      if (RL == null && VL != null && I != null && I !== 0) RL = VL / I;
      if (E == null && VL != null && I != null && Ri != null) E = VL + I * Ri;
      if (Ri == null && E != null && VL != null && I != null && I !== 0) Ri = (E - VL) / I;
      if (I == null && E != null && Ri != null && RL != null) {
        const den = Ri + RL;
        if (den === 0) throw new Error("Ri + RL = 0.");
        I = E / den;
        VL = I * RL;
      }
      if (E == null || VL == null) throw new Error("Faltan datos: indica E (vacío) y carga (VL o I y RL), o Ri.");
      if (I == null && RL != null && RL !== 0) I = VL / RL;
      if (Ri == null && I != null && I !== 0) Ri = (E - VL) / I;
      const Pint = I != null && Ri != null ? I * I * Ri : null;
      const VR = VL !== 0 ? ((E - VL) / VL) * 100 : null;
      let proc = `Vacío: ${mj(`V_{\\mathrm{nl}} = E = ${texQtyBody(E, "V")}`)}.\n`;
      if (VL != null) proc += `Carga: ${mj(`V_L = ${texQtyBody(VL, "V")}`)}.\n`;
      if (I != null) proc += `${mj(`I = ${texQtyBody(I, "A")}`)}.\n`;
      if (RL != null) proc += `${mj(`R_L = ${texQtyBody(RL, "\\Omega")}`)}.\n`;
      if (Ri != null) proc += `${mj(`R_{\\mathrm{int}} = (E - V_L) / I = ${texQtyBody(Ri, "\\Omega")}`)}.\n`;
      if (Pint != null) proc += `Pérdida en Ri: ${formatQty(Pint, "W")}.\n`;
      if (VR != null) {
        proc += `${mj("\\%\\mathrm{VR} = (V_{\\mathrm{nl}} - V_{\\mathrm{fl}}) / V_{\\mathrm{fl}} \\times 100\\%")} = ${formatQtyPlain(VR)} %.`;
        if (Math.abs(VR) < 2) proc += " Típico de un rack LFP / grid-forming 2026.";
        else if (Math.abs(VR) < 8) proc += " Aceptable en auxiliar de 12 V / arranque.";
        else proc += " Alta: la fuente se cae mucho con carga (Ri grande frente a RL).";
      }
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec5_12() {
  const btn = document.getElementById("btn-s512");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-5-12");
    const wrap = document.getElementById("wrap-5-12");
    const tbody = document.querySelector("#table-5-12 tbody");
    try {
      let E = readOptionalNumber("s512-e");
      let Rs = readOptionalNumber("s512-rs");
      if (E != null) E *= readUnit("s512-e-u");
      if (Rs != null) Rs *= readUnit("s512-rs-u");
      const rmin = parseNumberInput(document.getElementById("s512-rmin")?.value || "1");
      const rmax = parseNumberInput(document.getElementById("s512-rmax")?.value || "20");
      const step = parseNumberInput(document.getElementById("s512-step")?.value || "1");
      if (E == null || Rs == null) throw new Error("Indica E y Rs.");
      if (step <= 0) throw new Error("Paso debe ser positivo.");
      const rows = [];
      let best = null;
      for (let r = rmin; r <= rmax + 1e-9; r += step) {
        const I = E / (Rs + r);
        const VL = I * r;
        const P = I * I * r;
        const row = { r, I, VL, P };
        rows.push(row);
        if (!best || P > best.P) best = row;
      }
      const Pmatch = (E * E) / (4 * Rs);
      let proc = `${mj("P_L = E^{2} R_L / (R_s + R_L)^{2}")}. Máximo cuando ${mj("R_L = R_s")} (máxima transferencia; no es el MPPT de un módulo FV).\n`;
      proc += `Con ${mj(`R_L = R_s = ${texQtyBody(Rs, "\\Omega")}`)}: ${mj(`P_{\\max} = E^{2} / 4 R_s = ${texQtyBody(Pmatch, "W")}`)}.\n`;
      if (best) proc += `En el barrido, el pico está en RL = ${formatQty(best.r, "\\Omega")}, PL = ${formatQty(best.P, "W")}.`;
      if (tbody) {
        tbody.innerHTML = rows.map((row) => {
          const hit = best && Math.abs(row.r - best.r) < 1e-9;
          return `<tr class="${hit ? "rl-max is-hit" : ""}"><td>${Number(row.r.toPrecision(4))}</td><td>${Number(row.I.toPrecision(4))}</td><td>${Number(row.VL.toPrecision(4))}</td><td>${Number(row.P.toPrecision(4))}</td></tr>`;
        }).join("");
      }
      if (wrap) wrap.style.display = "block";
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

Object.assign(presetsData, {
  "5-2": {
    p1a: {
      series: { prefix: "s52", rows: [
        { name: "dump 2 Ω", r: "2" }, { name: "dump 6 Ω", r: "6" }, { name: "dump 12 Ω", r: "12" }
      ] },
      fields: { "s52-e": "60", "s52-i": "", "s52-rt": "" },
      click: "btn-s52",
      desc: "Prob. 1.a — Tres resistencias de un dump eólico / ballast hidro a 60 V: 2+6+12 Ω.\nRT = 20 Ω. I = 60/20 = 3.00 A.\nV = 6, 18 y 36 V. P = 18, 54 y 108 W. El de 12 Ω pide un wattaje de planta, no ½ W."
    },
    p1b: {
      series: { prefix: "s52", rows: [
        { name: "200 kΩ", r: "200", ru: "1e3" }, { name: "1 MΩ", r: "1", ru: "1e6" },
        { name: "330 kΩ", r: "330", ru: "1e3" }, { name: "0.1 MΩ", r: "0.1", ru: "1e6" }
      ] },
      fields: { "s52-e": "10", "s52-i": "", "s52-rt": "" },
      click: "btn-s52",
      desc: "Prob. 1.b — Divisor / bleeder de un bus de sensor de 10 V (piranómetro, ISO).\n200 k + 1 M + 330 k + 0.1 M = 1.63 MΩ.\nI = 10/1.63e6 = 6.135 µA. Caídas en kV no: 1.23, 6.13, 2.02 y 0.61 V."
    },
    p1c: {
      series: { prefix: "s52", rows: [
        { name: "15 Ω", r: "15" }, { name: "10 Ω", r: "10" },
        { name: "25 Ω bypass", r: "25", st: "short" }, { name: "25 Ω bypass", r: "25", st: "short" },
        { name: "25 Ω", r: "25" }, { name: "10 Ω", r: "10" }
      ] },
      fields: { "s52-e": "35", "s52-i": "", "s52-rt": "" },
      click: "btn-s52",
      desc: "Prob. 1.c — String 35 V con dos elementos puentados (diodo bypass de celda sombreada, o jumper de precarga).\nLos 25 Ω en corto no suman. RT = 15+10+25+10 = 60 Ω. I = 35/60 = 0.583 A."
    },
    p1d: {
      series: { prefix: "s52", rows: [
        { name: "1.2 kΩ", r: "1.2", ru: "1e3" }, { name: "4.5 kΩ", r: "4.5", ru: "1e3" },
        { name: "3 kΩ", r: "3", ru: "1e3" }, { name: "1.3 kΩ", r: "1.3", ru: "1e3" },
        { name: "2.2 kΩ abierto", r: "2.2", ru: "1e3", st: "open" }
      ] },
      fields: { "s52-e": "120", "s52-i": "", "s52-rt": "" },
      click: "btn-s52",
      desc: "Prob. 1.d — 120 V. El 2.2 kΩ cuelga de un nodo a un terminal abierto (ramal de medida no cerrado, o MC4 suelto que no está en el lazo).\nRT = 1.2+4.5+3+1.3 = 10 kΩ. I = 120/10k = 12.0 mA."
    },
    p2a: {
      series: { prefix: "s52", rows: [
        { name: "10 Ω", r: "10" }, { name: "12 Ω", r: "12" }, { name: "R ballast", r: "" }
      ] },
      fields: { "s52-e": "30", "s52-i": "", "s52-rt": "30" },
      click: "btn-s52",
      desc: "Prob. 2.a — RT = 30 Ω a 30 V (calefacción auxiliar / dump).\nR = 30−10−12 = 8.00 Ω. I = 1.00 A."
    },
    p2b: {
      series: { prefix: "s52", rows: [
        { name: "12.6 kΩ", r: "12.6", ru: "1e3" }, { name: "R", r: "" },
        { name: "45 kΩ", r: "45", ru: "1e3" }, { name: "0.4 kΩ", r: "0.4", ru: "1e3" }
      ] },
      fields: { "s52-e": "60", "s52-i": "", "s52-rt": "60", "s52-rt-u": "1e3" },
      selects: { "s52-rt-u": "1e3" },
      click: "btn-s52",
      desc: "Prob. 2.b — Divisor de 60 V, RT = 60 kΩ.\nR = 60−12.6−45−0.4 = 2.00 kΩ. I = 1.00 mA."
    },
    p2c: {
      series: { prefix: "s52", rows: [
        { name: "50 Ω", r: "50" }, { name: "R1", r: "" }, { name: "60 Ω", r: "60" },
        { name: "R2=R1", r: "" }, { name: "10 Ω", r: "10" }
      ] },
      fields: { "s52-e": "120", "s52-i": "", "s52-rt": "220" },
      click: "btn-s52",
      desc: "Prob. 2.c — RT = 220 Ω, R2 = R1 (dos tramos iguales de un string de lastre).\n50+60+10+2 R1 = 220 → R1 = R2 = 50.0 Ω. I = 120/220 = 0.545 A."
    },
    p2d: {
      series: { prefix: "s52", rows: [
        { name: "100 kΩ", r: "100", ru: "1e3" }, { name: "0.2 MΩ", r: "0.2", ru: "1e6" },
        { name: "R bleeder", r: "" }, { name: "56 kΩ", r: "56", ru: "1e3" }
      ] },
      fields: { "s52-e": "50", "s52-i": "", "s52-rt": "1.6", "s52-rt-u": "1e6" },
      selects: { "s52-rt-u": "1e6" },
      click: "btn-s52",
      desc: "Prob. 2.d — Bleeder / monitor ISO, RT = 1.6 MΩ, E = 50 V.\nR = 1.6 M − 0.1 M − 0.2 M − 0.056 M = 1.244 MΩ.\nI = 50/1.6e6 = 31.25 µA."
    },
    p3a: {
      series: { prefix: "s52", rows: [
        { name: "60 Ω", r: "60" }, { name: "1.2 kΩ", r: "1.2", ru: "1e3" }, { name: "2.74 kΩ", r: "2.74", ru: "1e3" }
      ] },
      fields: { "s52-e": "", "s52-i": "4", "s52-rt": "" },
      selects: { "s52-i-u": "0.001" },
      click: "btn-s52",
      desc: "Prob. 3.a — Logger / RTU a 4 mA. RT = 60+1200+2740 = 4.00 kΩ.\nE = I RT = 16.0 V (rail auxiliar de 24 V con margen, o dos celdas LFP en serie no bastan: aquí 16 V)."
    },
    p3b: {
      series: { prefix: "s52", rows: [
        { name: "1.2 Ω", r: "1.2" }, { name: "8.2 Ω", r: "8.2" }, { name: "4.7 Ω", r: "4.7" }, { name: "2.7 Ω", r: "2.7" }
      ] },
      fields: { "s52-e": "", "s52-i": "250", "s52-rt": "" },
      selects: { "s52-i-u": "0.001" },
      click: "btn-s52",
      desc: "Prob. 3.b — 250 mA en un shunt / dump pequeño. RT = 16.8 Ω. E = 4.20 V (una celda LFP a 3.2 V no llega; un módulo de 6 V de riego sí)."
    },
    p4a: {
      series: { prefix: "s52", rows: [
        { name: "5 Ω", r: "5" }, { name: "2 Ω", r: "2", v: "12" }, { name: "R", r: "" }
      ] },
      fields: { "s52-e": "", "s52-i": "", "s52-rt": "16" },
      click: "btn-s52",
      desc: "Prob. 4.a — 12 V en 2 Ω (caída de un ramal medido) y RT = 16 Ω.\nI = 12/2 = 6.00 A. R = 16−7 = 9.00 Ω. E = 96.0 V. V5 = 30 V, VR = 54 V."
    },
    p4b: {
      series: { prefix: "s52", rows: [
        { name: "3.3 kΩ", r: "3.3", ru: "1e3" }, { name: "R", r: "", v: "9" },
        { name: "2.2 kΩ", r: "2.2", ru: "1e3", p: "0.0792" }
      ] },
      fields: { "s52-e": "", "s52-i": "", "s52-rt": "" },
      click: "btn-s52",
      desc: "Prob. 4.b — 79.2 mW en 2.2 kΩ (driver / divisor) y 9 V en R.\nI = √(0.0792/2200) = 6.00 mA. R = 9/0.006 = 1.50 kΩ.\nRT = 7.00 kΩ. E = 42.0 V. V3.3 = 19.8 V, V2.2 = 13.2 V."
    }
  },
  "5-3": {
    p5a: {
      clearSources: true,
      fields: {
        "s53-en1": "rack 8 V", "s53-e1": "8", "s53-en2": "rack 16 V", "s53-e2": "16",
        "s53-en3": "rack 4 V", "s53-e3": "4", "s53-en4": "E4", "s53-e4": "",
        "s53-rn1": "4.7 Ω", "s53-r1": "4.7", "s53-v1": "", "s53-p1": "",
        "s53-rn2": "5.6 Ω", "s53-r2": "5.6", "s53-v2": "", "s53-p2": "",
        "s53-rn3": "R3", "s53-r3": "", "s53-v3": "", "s53-p3": "",
        "s53-rn4": "R4", "s53-r4": "", "s53-v4": "", "s53-p4": "",
        "s53-i": ""
      },
      selects: { "s53-pol1": "1", "s53-pol2": "-1", "s53-pol3": "-1", "s53-pol4": "1" },
      click: "btn-s53",
      desc: "Prob. 5.a — Tres racks / módulos 8 V (a favor horario), 16 V y 4 V (en contra).\nEneto = 8−16−4 = −12 V. RT = 10.3 Ω.\nI = 1.165 A antihoraria. Equivalente: 12 V con I saliendo del + hacia las R por el camino antihorario."
    },
    p5b: {
      clearSources: true,
      fields: {
        "s53-en1": "4 V", "s53-e1": "4", "s53-en2": "18 V", "s53-e2": "18",
        "s53-en3": "10 V", "s53-e3": "10", "s53-en4": "E4", "s53-e4": "",
        "s53-rn1": "4.7 Ω", "s53-r1": "4.7", "s53-rn2": "1.2 Ω", "s53-r2": "1.2",
        "s53-rn3": "5.6 Ω", "s53-r3": "5.6", "s53-rn4": "R4", "s53-r4": "",
        "s53-v1": "", "s53-p1": "", "s53-v2": "", "s53-p2": "", "s53-v3": "", "s53-p3": "",
        "s53-v4": "", "s53-p4": "", "s53-i": ""
      },
      selects: { "s53-pol1": "1", "s53-pol2": "-1", "s53-pol3": "-1" },
      click: "btn-s53",
      desc: "Prob. 5.b — 4 V a favor horario; 18 V y 10 V en contra (string mixto / auxiliar).\nRT = 4.7+1.2+5.6 = 11.5 Ω. Eneto = 4−18−10 = −24 V.\nI = 2.087 A antihoraria."
    },
    p6a: {
      clearSources: true,
      fields: {
        "s53-en1": "E desconocida", "s53-e1": "", "s53-en2": "20 V", "s53-e2": "20",
        "s53-en3": "E3", "s53-e3": "", "s53-en4": "E4", "s53-e4": "",
        "s53-rn1": "5 kΩ", "s53-r1": "5", "s53-ru1": "1e3",
        "s53-rn2": "R (100 mW)", "s53-r2": "", "s53-p2": "0.1",
        "s53-rn3": "R3", "s53-r3": "", "s53-rn4": "R4", "s53-r4": "",
        "s53-i": "5", "s53-v1": "", "s53-p1": "", "s53-v2": "", "s53-v3": "", "s53-p3": "",
        "s53-v4": "", "s53-p4": ""
      },
      selects: { "s53-pol1": "1", "s53-pol2": "1", "s53-iu": "0.001", "s53-ru1": "1e3" },
      click: "btn-s53",
      desc: "Prob. 6.a — I = 5 mA, P = 100 mW en R, 5 kΩ y fuente de 20 V (ambas a favor).\nR = P/I² = 4.00 kΩ. RT = 9.00 kΩ. Eneto = 45 V = E+20 → E = 25.0 V.\nI horaria (sale del + de E hacia 5 kΩ)."
    },
    p6b: {
      clearSources: true,
      fields: {
        "s53-en1": "6 V", "s53-e1": "6", "s53-en2": "8 V", "s53-e2": "8",
        "s53-en3": "E desconocida", "s53-e3": "", "s53-en4": "E4", "s53-e4": "",
        "s53-rn1": "2 kΩ", "s53-r1": "2", "s53-v1": "16",
        "s53-rn2": "R", "s53-r2": "", "s53-v2": "12",
        "s53-rn3": "R3", "s53-r3": "", "s53-rn4": "R4", "s53-r4": "",
        "s53-i": "", "s53-p1": "", "s53-p2": "", "s53-v3": "", "s53-p3": "", "s53-v4": "", "s53-p4": ""
      },
      selects: { "s53-pol1": "-1", "s53-pol2": "1", "s53-pol3": "1", "s53-ru1": "1e3" },
      click: "btn-s53",
      desc: "Prob. 6.b — 16 V en 2 kΩ → I = 8.00 mA. 12 V en R → R = 1.50 kΩ.\nRT = 3.50 kΩ. Eneto = 28 V. Con 6 V en contra y 8 V a favor: E = 26.0 V a favor.\nSi el dibujo tenía E al revés, se invierte la polaridad."
    }
  },
  "5-4": {
    p7a: {
      fields: { "s54k-v1": "10", "s54k-v2": "-2", "s54k-v3": "-3", "s54k-v4": "", "s54k-v5": "", "s54k-v6": "" },
      click: "btn-s54k",
      desc: "Prob. 7.a — Cajas 10 V, 2 V y 3 V. Camino b→a: +10 −2 −3.\nVab = 5.00 V, a positivo respecto de b. Es el KVL de tres celdas / tres pines de un driver."
    },
    p7b: {
      fields: { "s54k-v1": "60", "s54k-v2": "20", "s54k-v3": "-10", "s54k-v4": "", "s54k-v5": "", "s54k-v6": "" },
      click: "btn-s54k",
      desc: "Prob. 7.b — Circuito abierto (VR = 0). 60 V + 20 V − 10 V.\nVab = 70.0 V, a positivo. El abierto es un seccionador: no hay I, las fuentes sí fijan Vab."
    },
    p8a: {
      fields: { "s54k-v1": "10", "s54k-v2": "-6", "s54k-v3": "", "s54k-v4": "", "s54k-v5": "", "s54k-v6": "" },
      click: "btn-s54k",
      desc: "Prob. 8.a — No es serie pura: KVL en el lazo exterior 10 V − 6 V − V1 = 0 → V1 = 4.00 V.\nLa diagonal ve los 10 V: V2 = 10.0 V. Puente de medida / bypass de un módulo."
    },
    p8b: {
      fields: { "s54k-v1": "10", "s54k-v2": "-6", "s54k-v3": "", "s54k-v4": "", "s54k-v5": "", "s54k-v6": "" },
      click: "btn-s54k",
      desc: "Prob. 8.b — Lazo superior: 10 − V2 − 6 = 0 → V2 = 4.00 V (en 5.6 kΩ, I2 = 0.714 mA).\nR1 = 2.2 kΩ está a 24 V (la fuente): V1 = 24.0 V. Dos lazos, no un solo string."
    },
    p9: {
      series: { prefix: "s54", rows: [
        { name: "2.2 kΩ (V1)", r: "2.2", ru: "1e3" }, { name: "1.2 kΩ", r: "1.2", ru: "1e3" }, { name: "0.56 kΩ", r: "0.56", ru: "1e3" }
      ] },
      fields: { "s54-e": "13", "s54-i": "", "s54-rt": "" },
      click: "btn-s54",
      desc: "Prob. 9 — 27 V a favor, 9 V y 5 V en contra (string LFP + auxiliar).\nEneto = 13 V. RT = 3.96 kΩ. I = 3.283 mA (horaria, sale del + de 27 V hacia 2.2 kΩ).\nV1 = 7.22 V."
    },
    p10: {
      series: { prefix: "s54", rows: [
        { name: "3 kΩ", r: "3", ru: "1e3" }, { name: "1 kΩ", r: "1", ru: "1e3" }, { name: "2 kΩ", r: "2", ru: "1e3" }
      ] },
      fields: { "s54-e": "120", "s54-i": "", "s54-rt": "" },
      checks: { "s54-watt": true },
      click: "btn-s54",
      desc: "Prob. 10 — Divisor / lastre 120 V: 3+1+2 kΩ. RT = 6 kΩ, I = 20.0 mA.\nV = 60, 20, 40 V. KVL: 120 = 120.\nP = 1.20, 0.40, 0.80 W → wattaje: 2 W, ½ W y 1 W. Pentregada = 2.40 W = ΣP."
    },
    p11: {
      series: { prefix: "s54", rows: [
        { name: "22 Ω", r: "22" }, { name: "10 Ω", r: "10" }, { name: "5.6 Ω", r: "5.6" }, { name: "33 Ω", r: "33" }
      ] },
      fields: { "s54-e": "6", "s54-i": "", "s54-rt": "" },
      checks: { "s54-watt": true },
      click: "btn-s54",
      desc: "Prob. 11 — Celda LFP 6 V y dump 22+10+5.6+33 Ω. RT = 70.6 Ω, I = 85.0 mA.\nV = 1.87, 0.850, 0.476, 2.80 V. P < 0.25 W: todas caben en ½ W.\nΣP = E I ≈ 0.510 W."
    },
    p12a: {
      series: { prefix: "s54", rows: [
        { name: "20 Ω", r: "20" }, { name: "R", r: "", v: "80" }
      ] },
      fields: { "s54-e": "120", "s54-i": "", "s54-rt": "" },
      click: "btn-s54",
      desc: "Prob. 12.a — 120 V, 80 V en R (caída medida). V20 = 40 V → I = 2.00 A, R = 40.0 Ω.\nP20 = 80 W, PR = 160 W (dump, no ½ W)."
    },
    p12b: {
      series: { prefix: "s54", rows: [
        { name: "2.2 Ω", r: "2.2", v: "8" }, { name: "4.7 Ω (V1)", r: "4.7" }, { name: "6.8 Ω (V2)", r: "6.8" }
      ] },
      fields: { "s54-e": "", "s54-i": "", "s54-rt": "" },
      click: "btn-s54",
      desc: "Prob. 12.b — 8 V en 2.2 Ω → I = 3.64 A. V1 = 17.1 V, V2 = 24.7 V.\nE = 49.8 V (un string de ~16 celdas LFP, o un módulo de 50 V)."
    },
    p12c: {
      series: { prefix: "s54", rows: [
        { name: "2 Ω", r: "2" }, { name: "1 Ω", r: "1" }, { name: "R", r: "", p: "21" }
      ] },
      fields: { "s54-e": "", "s54-i": "1", "s54-rt": "" },
      click: "btn-s54",
      desc: "Prob. 12.c — I = 1 A, P = 21 W en R. R = 21.0 Ω, V3 = 21 V, V1 = 2 V, V2 = 1 V.\nE = 24.0 V (auxiliar de contenedor / dos bancos de 12 V)."
    },
    p12d: {
      series: { prefix: "s54", rows: [
        { name: "R1", r: "" }, { name: "R2 (8 W)", r: "", p: "8" }, { name: "1 Ω (4 W)", r: "1", p: "4" }
      ] },
      fields: { "s54-e": "", "s54-i": "", "s54-rt": "16" },
      click: "btn-s54",
      desc: "Prob. 12.d — RT = 16 Ω, 4 W en 1 Ω → I = 2.00 A, E = 32.0 V.\n8 W en R2 → R2 = 2.00 Ω. R1 = 13.0 Ω, P1 = 52 W."
    },
    p13: {
      series: { prefix: "s54", rows: [
        { name: "LED 1", r: "28.125" }, { name: "LED 2", r: "28.125" }, { name: "LED 3", r: "28.125" },
        { name: "LED 4", r: "28.125" }, { name: "LED 5", r: "28.125" }, { name: "LED 6", r: "28.125" },
        { name: "LED 7", r: "28.125" }, { name: "LED 8", r: "28.125" }
      ] },
      fields: { "s54-e": "120", "s54-i": "", "s54-rt": "" },
      checks: { "s54-watt": true },
      click: "btn-s54",
      desc: "Prob. 13 — Ocho luminarias LED de alumbrado auxiliar de planta en serie a 120 V, 28⅛ Ω cada una (el «árbol» del libro, en 2026).\na) RT = 225 Ω, I = 0.533 A.\nb) P = 8.00 W por foco.\nc) V = 15.0 V por foco.\nd) Si un filamento abre, se apagan las ocho: una sola trayectoria. En un substring FV el diodo bypass evita eso a nivel de celda; a nivel de string, un gPV abierto apaga el string entero."
    },
    p14: {
      series: { prefix: "s54", rows: [
        { name: "R1 2 Ω", r: "2" }, { name: "R2 4 Ω", r: "4" }, { name: "R dump 24 W", r: "", p: "24" }
      ] },
      fields: { "s54-e": "24", "s54-i": "", "s54-rt": "" },
      click: "btn-s54",
      desc: "Prob. 14 — 24 V (auxiliar), 2 Ω + 4 Ω + R con P = 24 W.\nP = E² R / (6+R)² → R = 6.00 Ω (raíz doble). I = 2.00 A. P1 = 8 W, P2 = 16 W, total 48 W = E I."
    }
  },
  "5-6": {
    p15a: {
      clearDivider: true,
      fields: { "s56-e": "100", "s56-from": "2", "s56-to": "2", "s56-vab": "",
        "s56-n1": "25 Ω", "s56-r1": "25", "s56-n2": "50 Ω", "s56-r2": "50",
        "s56-r3": "", "s56-r4": "", "s56-r5": "", "s56-r6": "" },
      click: "btn-s56",
      desc: "Prob. 15.a — 100 V, Vab en 50 Ω. Vab = 100·50/75 = 66.7 V, a positivo (arriba del 50 Ω)."
    },
    p15b: {
      clearDivider: true,
      fields: { "s56-e": "80", "s56-from": "3", "s56-to": "3", "s56-vab": "",
        "s56-n1": "20 Ω", "s56-r1": "20", "s56-n2": "10 Ω", "s56-r2": "10",
        "s56-n3": "4 Ω", "s56-r3": "4", "s56-n4": "6 Ω", "s56-r4": "6",
        "s56-r5": "", "s56-r6": "" },
      click: "btn-s56",
      desc: "Prob. 15.b — 80 V, Vab en 4 Ω. RT = 40 Ω. Vab = 8.00 V, a positivo (el corriente entra por a)."
    },
    p15c: {
      clearDivider: true,
      fields: { "s56-e": "40", "s56-from": "3", "s56-to": "4", "s56-vab": "",
        "s56-n1": "4 kΩ", "s56-r1": "4", "s56-n2": "1 kΩ", "s56-r2": "1",
        "s56-n3": "2 kΩ", "s56-r3": "2", "s56-n4": "3 kΩ", "s56-r4": "3",
        "s56-r5": "", "s56-r6": "" },
      selects: { "s56-ru1": "1e3", "s56-ru2": "1e3", "s56-ru3": "1e3", "s56-ru4": "1e3" },
      click: "btn-s56",
      desc: "Prob. 15.c — 40 V, Vab en 2 kΩ+3 kΩ. RT = 10 kΩ. Vab = 20.0 V, a positivo."
    },
    p15d: {
      clearDivider: true,
      fields: { "s56-e": "0.36", "s56-from": "2", "s56-to": "4", "s56-vab": "",
        "s56-n1": "2.5 Ω", "s56-r1": "2.5", "s56-n2": "1.5 Ω", "s56-r2": "1.5",
        "s56-n3": "0.6 Ω", "s56-r3": "0.6", "s56-n4": "0.9 Ω", "s56-r4": "0.9",
        "s56-n5": "0.5 Ω", "s56-r5": "0.5", "s56-r6": "" },
      click: "btn-s56",
      desc: "Prob. 15.d — Shunt / sensor 0.36 V. RT = 6.00 Ω, I = 60.0 mA.\nVab entre el nodo tras 2.5 Ω y el nodo tras 0.9 Ω (tramo 1.5+0.6+0.9): 0.180 V, a positivo."
    },
    p16a: {
      clearDivider: true,
      fields: { "s56-e": "20", "s56-from": "3", "s56-to": "3", "s56-vab": "4",
        "s56-n1": "2 kΩ", "s56-r1": "2", "s56-n2": "6 kΩ", "s56-r2": "6",
        "s56-n3": "R", "s56-r3": "", "s56-r4": "", "s56-r5": "", "s56-r6": "" },
      selects: { "s56-ru1": "1e3", "s56-ru2": "1e3" },
      click: "btn-s56",
      desc: "Prob. 16.a — 4 V en R, E = 20 V, 2 kΩ+6 kΩ. R = 2.00 kΩ."
    },
    p16b: {
      clearDivider: true,
      fields: { "s56-e": "200", "s56-from": "2", "s56-to": "3", "s56-vab": "140",
        "s56-n1": "3 Ω", "s56-r1": "3", "s56-n2": "6 Ω", "s56-r2": "6",
        "s56-n3": "R", "s56-r3": "", "s56-r4": "", "s56-r5": "", "s56-r6": "" },
      click: "btn-s56",
      desc: "Prob. 16.b — 140 V en el tramo 6 Ω+R, E = 200 V, 3 Ω delante.\nR = 1.00 Ω. I = 20.0 A (bus de baja tensión / dump)."
    },
    p17: {
      fields: { "s56d-e": "40", "s56d-i": "0.4", "s56d-taps": "40, 16, 4, 0" },
      selects: { "s56d-i-u": "1" },
      click: "btn-s56d",
      desc: "Prob. 17 — Cadena a tierra 40 V. R2 = 3 R1 y V1 = 4 V en 10 Ω → I = 0.4 A.\na) V2 = 12 V. b) V3 = 24 V. c) R3 = 60 Ω por inspección (V3 = 6 V1). e) R3 = V3/I = 60 Ω, coincide."
    },
    p18: {
      fields: { "s56d-e": "20", "s56d-i": "1", "s56d-taps": "12, 4, -4, -8" },
      selects: { "s56d-i-u": "1" },
      click: "btn-s56d",
      desc: "Prob. 18 — Rail auxiliar +12 / +4 / −4 / −8 V (BESS / inversor).\nR2 = 8 Ω lleva 8 V → I = 1.00 A. R1 = 8.00 Ω, R3 = 4.00 Ω."
    },
    p19: {
      fields: { "s56d-e": "12", "s56d-i": "50", "s56d-taps": "12, 8, 0" },
      selects: { "s56d-i-u": "0.001" },
      click: "btn-s56d",
      desc: "Prob. 19 — Faro LED / baliza 8 V, 50 mA en el rail de 12 V de un híbrido, EV o contenedor BESS.\nR_drop = 80 Ω, R_faro = 160 Ω. P_drop = 0.200 W → mínimo ¼ W (con margen, ½ W)."
    },
    p20: {
      fields: { "s56d-e": "100", "s56d-i": "16", "s56d-taps": "80, 48, 12, 0, -20" },
      selects: { "s56d-i-u": "0.001" },
      click: "btn-s56d",
      desc: "Prob. 20 — E = 100 V, I = 16 mA, taps +48 / +12 / 0 / −20 (el top es +80 V).\nR1 = 2.00 kΩ, R2 = 2.25 kΩ, R3 = 750 Ω, R4 = 1.25 kΩ."
    },
    p21: {
      fields: { "s56d-e": "72", "s56d-i": "4", "s56d-taps": "72, 60, 0" },
      selects: { "s56d-i-u": "0.001" },
      click: "btn-s56d",
      desc: "Prob. 21 — VR1 = (1/5) VR2, 72 V, I = 4 mA. VR2 = 60 V, VR1 = 12 V.\nR1 = 3.00 kΩ, R2 = 15.0 kΩ."
    },
    p22: {
      clearDivider: true,
      fields: { "s56-e": "60", "s56-from": "1", "s56-to": "1", "s56-vab": "",
        "s56-n1": "R1=2 R3", "s56-r1": "2", "s56-n2": "R2=7 R3", "s56-r2": "7",
        "s56-n3": "R3", "s56-r3": "1", "s56-r4": "", "s56-r5": "", "s56-r6": "" },
      click: "btn-s56",
      desc: "Prob. 22 — R1 = 2 R3, R2 = 7 R3, E = 60 V a tierra. Las razones bastan: RT = 10 R3.\nV1 = 12 V, V2 = 42 V, V3 = 6 V (independiente de I)."
    },
    p23a: {
      fields: { "s56d-e": "64", "s56d-i": "10", "s56d-taps": "64, 60, 48, 0" },
      selects: { "s56d-i-u": "0.001" },
      click: "btn-s56d",
      desc: "Prob. 23.a — VR2 = 3 VR1, VR3 = 4 VR2, E = 64 V, I = 10 mA.\nVR1 = 4 V, VR2 = 12 V, VR3 = 48 V. R1 = 400 Ω, R2 = 1.20 kΩ, R3 = 4.80 kΩ."
    },
    p23b: {
      fields: { "s56d-e": "64", "s56d-i": "10", "s56d-taps": "64, 60, 48, 0" },
      selects: { "s56d-i-u": "1e-6" },
      click: "btn-s56d",
      desc: "Prob. 23.b — Misma razón de voltajes, I = 10 µA (consumo de un divisor de medida 2026).\nR1 = 400 kΩ, R2 = 1.20 MΩ, R3 = 4.80 MΩ: mil veces las del 23.a. Las tensiones no cambian."
    }
  },
  "5-7": {
    p24a: {
      fields: { "s57-src": "12, 8", "s57-gnd": "3", "s57-va": "1", "s57-vb": "2" },
      click: "btn-s57",
      desc: "Prob. 24.a — 12 V con + hacia Va, 8 V de Vb a tierra (+ en Vb).\nTierra = nodo 3. Va = 20.0 V, Vb = 8.00 V, Vab = 12.0 V."
    },
    p24b: {
      fields: { "s57-src": "20, 6, -4", "s57-gnd": "3" },
      click: "btn-s57",
      desc: "Prob. 24.b — 20 V y 6 V a la izquierda de tierra (+ hacia Va); 4 V a la derecha (+ hacia Vb → fuente −4 V izq−der).\nVa = 26.0 V, Vb = 4.00 V, Vab = 22.0 V."
    },
    p24c: {
      fields: { "s57-src": "21, 8", "s57-gnd": "3", "s57-va": "1", "s57-vb": "2" },
      click: "btn-s57",
      desc: "Prob. 24.c — 21 V con + hacia Va, 8 V de Vb a tierra. Va = 29.0 V, Vb = 8.00 V, Vab = 21.0 V.\nEl +10 V y el 3 V a la izquierda de Va fijan otro terminal (p. ej. 32 V) que no es Vb."
    },
    p25a: {
      fields: { "s57-src": "40, 20", "s57-gnd": "3" },
      click: "btn-s57",
      desc: "Prob. 25.a — Rails 120 V y 60 V con 6 Ω y 3 Ω en serie (Eneto = 60 V).\nI = 60/9 = 6.67 A del rail 120 V hacia el 60 V. V en 3 Ω = 20.0 V (+ en el nudo)."
    },
    p25b: {
      fields: { "s57-src": "10, 20, 30", "s57-gnd": "1" },
      click: "btn-s57",
      desc: "Prob. 25.b — De −10 V a −70 V: 10+20+30 Ω. I = 1.00 A hacia −70 V.\nEl nodo V (tras 10 Ω) está a −20.0 V."
    },
    p26a: {
      fields: { "s57-src": "16, -8", "s57-gnd": "2" },
      click: "btn-s57",
      desc: "Prob. 26.a — 16 V a tierra, 8 V en contra, 10 Ω + 20 Ω.\nI = 8/30 = 0.267 A. Va (tras 10 Ω) = 13.3 V. V1 (20 Ω) = 5.33 V."
    },
    p26b: {
      fields: { "s57-src": "12, 10, 8", "s57-gnd": "1" },
      click: "btn-s57",
      desc: "Prob. 26.b — De +12 V a −8 V, 10 V a favor en el centro, 2.2 kΩ + 3.3 kΩ.\nEneto = 30 V, I = 5.45 mA. V1 = 12.0 V, Va = 10.0 V."
    },
    p27: {
      fields: { "s57-src": "20, 14.889, 22.333, -47, 29.778", "s57-gnd": "6" },
      click: "btn-s57",
      desc: "Prob. 27 — 20 V en a a tierra, 2 kΩ, 3 kΩ, 47 V (+ en d), 4 kΩ a tierra.\nI = (20+47)/9 kΩ = 7.44 mA (a→e).\nVa = 20 V, Vb = 5.11 V, Vc = −17.2 V, Vd = 29.8 V, Ve = 0.\nVab = 14.9 V, Vdc = 47 V, Vcb = −22.3 V, Vac = 37.2 V, Vdb = 24.7 V."
    },
    p28: {
      fields: { "s57-src": "44, 10.667, 21.333, 32", "s57-gnd": "1" },
      click: "btn-s57",
      desc: "Prob. 28 — 44 V sobre tierra, 20 V bajo tierra (Vd = −20 V), cadena 2+4+6 kΩ.\nI = 64 V / 12 kΩ = 5.33 mA (a→d).\nVa = 44 V, Vb = 33.3 V, Vc = 12.0 V, Vd = −20 V.\nVab = 10.7 V, Vcb = −21.3 V, Vcd = 32 V, Vad = 64 V, Vca = −32 V."
    },
    p29: {
      fields: {
        "s57ic-v0": "0", "s57ic-v1": "20", "s57ic-v2": "-2", "s57ic-v3": "-8",
        "s57ic-v4": "10", "s57ic-v5": "-2", "s57ic-v6": "4", "s57ic-v7": "4",
        "s57ic-pairs": "10,23,30,67,56", "s57ic-ir": "2,3,4"
      },
      click: "btn-s57ic",
      desc: "Prob. 29 — Driver / ASIC de planta. V0 = 0, V4 = 10 V (6 mA·2 kΩ sobre V5 = −2 V), V7 = V6 = 4 V.\nV10 = 20 V, V23 = 6 V, V30 = −8 V, V67 = 0, V56 = −6 V.\nI (4 Ω entre 2 y 3) = 1.50 A, del pin 2 (−2 V) al 3 (−8 V)."
    },
    p30: {
      fields: {
        "s57ic-v0": "0", "s57ic-v1": "20", "s57ic-v2": "8", "s57ic-v3": "0",
        "s57ic-v4": "", "s57ic-v5": "", "s57ic-v6": "", "s57ic-v7": "",
        "s57ic-pairs": "03,23,12", "s57ic-ir": "2,0,4000"
      },
      click: "btn-s57ic",
      desc: "Prob. 30 — CI con E = 20 V. 2 mA salen del pin 2 por 3 kΩ+1 kΩ → V2 = 8.00 V. Pin 3 a tierra, V3 = 0.\nV0 = 0, V03 = 0, V23 = 8 V, V12 = 12 V. Ii = 5 mA (retorno de la fuente de 20 V)."
    }
  },
  "5-8": {
    p31: {
      fields: { "s58-e": "60", "s58-vl": "", "s58-i": "2", "s58-rl": "28", "s58-rint": "" },
      click: "btn-s58",
      desc: "Prob. 31 — Banco / rack a 60 V en vacío, 2 A a 28 Ω (dump o carga de ensayo).\nVL = 56.0 V. Rint = (60−56)/2 = 2.00 Ω."
    },
    p32: {
      fields: { "s58-e": "12", "s58-vl": "", "s58-i": "", "s58-rl": "3.3", "s58-rint": "0.05" },
      click: "btn-s58",
      desc: "Prob. 32 — Auxiliar 12 V, Rint = 0.05 Ω, RL = 3.3 Ω (faro / contactor).\nI = 3.58 A, VL = 11.82 V, Pint = 0.641 W."
    },
    p33: {
      fields: { "s58-e": "6", "s58-vl": "", "s58-i": "10", "s58-rl": "0.5", "s58-rint": "" },
      selects: { "s58-i-u": "0.001", "s58-rl-u": "1e3" },
      click: "btn-s58",
      desc: "Prob. 33 — Celda / banco 6 V en vacío, 10 mA a 0.5 kΩ (logger).\nVL = 5.00 V. Rint = 100 Ω."
    },
    p34: {
      fields: { "s58-e": "60", "s58-vl": "", "s58-i": "2", "s58-rl": "28", "s58-rint": "" },
      click: "btn-s58",
      desc: "Prob. 34 — %VR del 31: (60−56)/56 × 100 % = 7.14 %. Aceptable en auxiliar; alto para un rack LFP 2026 (se busca < 2 %)."
    },
    p35: {
      fields: { "s58-e": "12", "s58-vl": "", "s58-i": "", "s58-rl": "3.3", "s58-rint": "0.05" },
      click: "btn-s58",
      desc: "Prob. 35 — %VR de la fig. 5.100: (12−11.82)/11.82 × 100 % = 1.52 %. Rango de un bus auxiliar bien dimensionado."
    }
  },
  "5-12": {
    p36: {
      desc: "Prob. 36 — Mismo lazo que 1.a (el «PSpice» del libro es el solucionador 5.2).\nI = 3.00 A. V2 = 6 V, V6 = 18 V, V12 = 36 V. Abre Sec 5.2 / Prob 1.a."
    },
    p37: {
      desc: "Prob. 37 — Vab del divisor 5.85.d = 0.180 V (Sec 5.6 / Prob 15.d). El esquema del libro se sustituye por el divisor del navegador."
    },
    p38: {
      desc: "Prob. 38 — «Programa» que suma N resistencias en serie: es el solucionador 5.2 (hasta 8 elementos, cortos y abiertos incluidos)."
    },
    p39: {
      desc: "Prob. 39 — «Programa» de la regla del divisor: solucionador 5.6, una fuente y las R que quieras, Vx en un tramo."
    },
    p40: {
      fields: { "s512-e": "12", "s512-rs": "8", "s512-rmin": "1", "s512-rmax": "20", "s512-step": "1" },
      click: "btn-s512",
      desc: "Prob. 40 — E = 12 V, Rs = 8 Ω, RL de 1 a 20 Ω (dump / lastre).\nPmax cuando RL = Rs = 8 Ω: I = 0.750 A, Pmax = 4.50 W.\nNo es el MPPT de un módulo 2026 (ese sigue el codo de la I–V); sí es máxima transferencia de un Thevenin lineal."
    }
  }
});

function recommendWattPlant(p) {
  const abs = Math.abs(p);
  if (abs <= 0.5) return "½ W";
  if (abs <= 1) return "1 W";
  if (abs <= 2) return "2 W";
  if (abs <= 50) return "50 W";
  const ceil = Math.ceil(abs);
  return `${ceil} W (escala de planta)`;
}

function ohmUnitSelect(id, selected) {
  const s = String(selected || "1");
  const opts = [
    ["1", "Ω"],
    ["1e3", "kΩ"],
    ["1e6", "MΩ"],
    ["0.001", "mΩ"]
  ];
  return `<select id="${id}">${opts.map(([v, lab]) =>
    `<option value="${v}"${v === s ? " selected" : ""}>${lab}</option>`).join("")}</select>`;
}

function clearParallelPrefix(prefix, n) {
  for (let i = 1; i <= n; i++) {
    setField(`${prefix}-n${i}`, `R${i}`);
    setField(`${prefix}-r${i}`, "");
    setField(`${prefix}-rs${i}`, "");
    setField(`${prefix}-ix${i}`, "");
    setField(`${prefix}-p${i}`, "");
    setField(`${prefix}-copies${i}`, "1");
    const ru = document.getElementById(`${prefix}-ru${i}`);
    if (ru) ru.value = "1";
    const rsu = document.getElementById(`${prefix}-rsu${i}`);
    if (rsu) rsu.value = "1";
    const st = document.getElementById(`${prefix}-st${i}`);
    if (st) st.value = "parallel";
  }
  ["e", "i", "rt", "gt"].forEach((k) => {
    const el = document.getElementById(`${prefix}-${k}`);
    if (el) el.value = "";
  });
}

function fillParallelRows(prefix, n, extras) {
  const tbody = document.getElementById(`${prefix}-tbody`);
  if (!tbody) return;
  const showI = extras && extras.showI;
  let html = "";
  for (let i = 1; i <= n; i++) {
    html += `<tr>
      <td><input type="text" id="${prefix}-n${i}" value="R${i}" /></td>
      <td><input type="text" id="${prefix}-r${i}" placeholder="—" /></td>
      <td>${ohmUnitSelect(`${prefix}-ru${i}`)}</td>
      <td><input type="text" id="${prefix}-rs${i}" placeholder="—" /></td>
      <td>${ohmUnitSelect(`${prefix}-rsu${i}`)}</td>
      <td><input type="text" id="${prefix}-copies${i}" value="1" /></td>
      <td>
        <select id="${prefix}-st${i}">
          <option value="parallel" selected>paralelo</option>
          <option value="open">abierto</option>
          <option value="short">cortocircuito</option>
        </select>
      </td>
      ${showI ? `<td><input type="text" id="${prefix}-ix${i}" placeholder="A" /></td>
      <td><input type="text" id="${prefix}-p${i}" placeholder="W" /></td>` : ""}
    </tr>`;
  }
  tbody.innerHTML = html;
}

function readParallelRows(prefix, n) {
  const raw = [];
  for (let i = 1; i <= n; i++) {
    const nameEl = document.getElementById(`${prefix}-n${i}`);
    if (!nameEl) continue;
    const name = (nameEl.value || `R${i}`).trim() || `R${i}`;
    const st = document.getElementById(`${prefix}-st${i}`)?.value || "parallel";
    const ru = Number(document.getElementById(`${prefix}-ru${i}`)?.value || 1);
    const rsu = Number(document.getElementById(`${prefix}-rsu${i}`)?.value || 1);
    const rRaw = (document.getElementById(`${prefix}-r${i}`)?.value || "").trim();
    const rsRaw = (document.getElementById(`${prefix}-rs${i}`)?.value || "").trim();
    const iRaw = (document.getElementById(`${prefix}-ix${i}`)?.value || "").trim();
    const pRaw = (document.getElementById(`${prefix}-p${i}`)?.value || "").trim();
    const nRaw = (document.getElementById(`${prefix}-copies${i}`)?.value || "").trim();
    const r = rRaw === "" ? null : parseNumberInput(rRaw) * ru;
    const rs = rsRaw === "" ? 0 : parseNumberInput(rsRaw) * rsu;
    const ix = iRaw === "" ? null : parseNumberInput(iRaw);
    const p = pRaw === "" ? null : parseNumberInput(pRaw);
    const copies = nRaw === "" ? 1 : parseNumberInput(nRaw);
    const unused = st === "parallel" && r === null && ix === null && p === null
      && rsRaw === "" && name === `R${i}` && (nRaw === "" || copies === 1);
    raw.push({ i, name, st, r, rs, ix, p, copies: copies > 0 ? copies : 1, ru, rsu, unused });
  }
  let last = -1;
  raw.forEach((row, idx) => { if (!row.unused) last = idx; });
  return raw.filter((_, idx) => idx <= last).map(({ unused, ...row }) => row);
}

function branchReff(el) {
  if (el.st === "short") return 0;
  if (el.st === "open") return Infinity;
  if (el.r == null) return null;
  const series = el.r + (el.rs || 0);
  if (series === 0) return 0;
  return series / (el.copies || 1);
}

function analyzeParallel({ E, I, RT, GT, rows, wantWatt, ratios }) {
  const items = rows.map((row) => ({ ...row }));
  let proc = `${mj("G_T = \\sum G_x")}, ${mj("R_T = 1 / G_T")}, ${mj("I_x = E / R_x")}, ${mj("I_s = E / R_T")}.\n`;

  if (ratios && ratios.r2of1 != null && ratios.r3of1 != null) {
    const targetRT = RT;
    if (targetRT == null || targetRT <= 0) throw new Error("Indica RT para fijar las razones.");
    const k2 = ratios.r2of1;
    const k3 = ratios.r3of1;
    const R1 = targetRT * (1 + 1 / (k2 + k3));
    items[0].r = R1;
    items[0].rs = 0;
    if (items[1]) {
      items[1].r = k2 * R1;
      items[1].rs = k3 * R1;
    } else {
      items.push({
        i: 2, name: "R2+R3", st: "parallel", r: k2 * R1, rs: k3 * R1, copies: 1
      });
    }
    proc += `Razones: ${mj(`R_2 = ${texQtyBody(k2)} R_1`)}, ${mj(`R_3 = ${texQtyBody(k3)} R_1`)}.\n`;
    proc += `${mj("R_1 \\parallel (R_2 + R_3) = R_T")} → `;
    proc += `${mj(`R_1 = ${texQtyBody(R1, "\\Omega")}`)}, ${mj(`R_2 = ${texQtyBody(k2 * R1, "\\Omega")}`)}, ${mj(`R_3 = ${texQtyBody(k3 * R1, "\\Omega")}`)}.\n`;
  }

  items.forEach((el) => {
    if (el.st === "short") proc += `${el.name}: cortocircuito en el bus (falla DC / SPD que conduce) → ${mj("R_T = 0")}.\n`;
    else if (el.st === "open") proc += `${el.name}: abierto (fusible gPV / string fuera) → no suma a ${mj("G_T")}.\n`;
  });

  const live = items.filter((el) => el.st !== "open");
  if (!items.length) throw new Error("Indica al menos una rama.");
  if (!live.length) throw new Error("Todas las ramas están abiertas: no hay trayectoria.");
  if (live.some((el) => el.st === "short")) {
    const shorts = live.filter((el) => el.st === "short");
    proc += `Corto en ${shorts.map((s) => s.name).join(", ")}: el bus se va a 0 V. `;
    proc += `La fuente ve un fallo; ${mj("I_s")} no está definida por Ohm (solo por la Icc de la fuente / del rack).\n`;
    return { proc, E, I, RT: 0, GT: Infinity, items: live };
  }

  if (E == null) {
    for (const el of live) {
      const re = el.r != null ? branchReff(el) : null;
      if (re != null && el.ix != null) {
        E = el.ix * re;
        proc += `${mj("E = I_x R")} en ${el.name}: ${formatQty(E, "V")}.\n`;
        break;
      }
      if (el.p != null && el.ix != null && el.ix !== 0) {
        E = el.p / el.ix;
        proc += `${mj("E = P / I")} en ${el.name}: ${formatQty(E, "V")}.\n`;
        break;
      }
      if (el.p != null && re != null && re > 0) {
        E = Math.sqrt(Math.abs(el.p * re));
        proc += `${mj("E = \\sqrt{P R}")} en ${el.name}: ${formatQty(E, "V")}.\n`;
        break;
      }
    }
  }

  if (E != null) {
    live.forEach((el) => {
      if (el.r != null) return;
      if (el.ix != null && el.ix !== 0) {
        const seriesExtra = el.rs || 0;
        const copies = el.copies || 1;
        el.r = (E / el.ix) * copies - seriesExtra;
        proc += `${el.name}: ${mj(`R = E / I_x = ${texQtyBody(el.r, "\\Omega")}`)}.\n`;
      } else if (el.p != null && el.p !== 0) {
        const copies = el.copies || 1;
        const reff = (E * E) / el.p;
        el.r = reff * copies - (el.rs || 0);
        proc += `${el.name}: ${mj(`R = E^{2} / P = ${texQtyBody(el.r, "\\Omega")}`)}.\n`;
      }
    });
  }

  let unknown = live.filter((el) => el.r == null);
  const knownG = live.reduce((s, el) => {
    if (el.r == null) return s;
    const re = branchReff(el);
    return s + (re > 0 ? 1 / re : 0);
  }, 0);

  let GTtarget = GT;
  if (GTtarget == null && RT != null && RT !== 0) GTtarget = 1 / RT;
  if (GTtarget == null && E != null && I != null && E !== 0) GTtarget = I / E;

  if (unknown.length === 1 && GTtarget != null) {
    const gNeed = GTtarget - knownG;
    if (gNeed <= 1e-15) throw new Error("GT/RT no deja conductancia positiva para la R vacía.");
    const reff = 1 / gNeed;
    const el = unknown[0];
    el.r = reff * (el.copies || 1) - (el.rs || 0);
    proc += `${el.name}: ${mj(`G = G_T - \\sum G_{\\mathrm{conocidas}} = ${texQtyBody(gNeed, "S")}`)} → `;
    proc += `${mj(`R = ${texQtyBody(el.r, "\\Omega")}`)}.\n`;
    unknown = [];
  } else if (unknown.length > 1 && GTtarget != null) {
    const gNeed = GTtarget - knownG;
    if (gNeed <= 1e-15) throw new Error("GT/RT no deja conductancia para las R vacías.");
    const eachG = gNeed / unknown.length;
    unknown.forEach((el) => {
      const reff = 1 / eachG;
      el.r = reff * (el.copies || 1) - (el.rs || 0);
    });
    proc += `Varias R vacías con ${mj("G_T")} / ${mj("R_T")} conocido: se suponen iguales (p. ej. ${mj("R_1 = R_2")}). Cada una ${formatQty(unknown[0].r, "\\Omega")}.\n`;
    unknown = [];
  }

  if (live.some((el) => el.r == null)) {
    throw new Error("Falta una R (o un dato E/I/P/RT/GT que la fije).");
  }

  const GTcalc = live.reduce((s, el) => s + 1 / branchReff(el), 0);
  const RTcalc = GTcalc === 0 ? Infinity : 1 / GTcalc;
  if (GT == null) GT = GTcalc;
  if (RT == null) RT = RTcalc;
  proc += `${mj(`G_T = ${texQtyBody(GTcalc, "S")}`)}, ${mj(`R_T = ${texQtyBody(RTcalc, "\\Omega")}`)}.\n`;

  if (I == null && E != null) {
    I = E * GTcalc;
    proc += `${mj(`I_s = E G_T = E / R_T = ${texQtyBody(I, "A")}`)}.\n`;
  } else if (E == null && I != null) {
    E = I * RTcalc;
    proc += `${mj(`E = I_s R_T = ${texQtyBody(E, "V")}`)}.\n`;
  }

  let sumI = 0;
  let sumP = 0;
  live.forEach((el) => {
    const re = branchReff(el);
    el.reff = re;
    if (E != null) {
      el.ix = E / re;
      el.p = (E * E) / re;
      el.v = E;
    } else if (I != null) {
      el.ix = I * (RTcalc / re);
      el.p = el.ix * el.ix * re;
      el.v = el.ix * re;
    }
    sumI += el.ix || 0;
    sumP += el.p || 0;
    const extra = (el.rs || 0) > 0 ? ` (rama ${formatQty(el.r, "\\Omega")}+${formatQty(el.rs, "\\Omega")})` : "";
    const copies = (el.copies || 1) > 1 ? ` ×${el.copies}` : "";
    proc += `${el.name}${copies}${extra}: ${mj(`R_{\\mathrm{eq}} = ${texQtyBody(re, "\\Omega")}`)}`;
    if (el.ix != null) proc += `, ${mj(`I = ${texQtyBody(el.ix, "A")}`)}`;
    if (el.p != null) {
      proc += `, ${mj(`P = ${texQtyBody(el.p, "W")}`)}`;
      if (wantWatt) proc += ` → wattaje mín. ${recommendWattPlant(el.p)}`;
    }
    proc += ".\n";
  });

  if (E != null && I != null) {
    proc += `LCK: ${mj(`\\sum I_x = ${texQtyBody(sumI, "A")}`)} vs ${mj(`I_s = ${texQtyBody(I, "A")}`)}`;
    proc += Math.abs(sumI - I) / Math.max(Math.abs(I), 1e-12) < 0.02 ? " — se cumple.\n" : " — revisar.\n";
    const psrc = E * I;
    proc += `Potencia: ${mj(`\\sum P = ${texQtyBody(sumP, "W")}`)} vs ${mj(`E I_s = ${texQtyBody(psrc, "W")}`)}`;
    proc += Math.abs(sumP - psrc) / Math.max(Math.abs(psrc), 1e-12) < 0.02 ? " — entregada = disipada." : " — revisar.";
  }
  return { proc, E, I, RT: RTcalc, GT: GTcalc, items: live };
}

function drawParallelNetwork(svg, model) {
  if (!svg) return;
  const items = (model && model.items && model.items.length)
    ? model.items
    : [{ name: "R1" }, { name: "R2" }, { name: "R3" }];
  const asCurrent = !!(model && model.asCurrent);
  const n = items.length;
  const y0 = 36, y1 = 168, x0 = asCurrent ? 88 : 70, x1 = 560;
  const usable = x1 - x0 - 80;
  const slot = usable / Math.max(n, 1);
  const midY = (y0 + y1) / 2;
  let res = "";
  if (asCurrent) {
    const cr = 18;
    res += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${midY - cr}" stroke="currentColor" stroke-width="2"/>`;
    res += `<circle cx="${x0}" cy="${midY}" r="${cr}" fill="none" stroke="currentColor" stroke-width="2"/>`;
    res += `<line x1="${x0}" y1="${midY + 8}" x2="${x0}" y2="${midY - 4}" stroke="#2471a3" stroke-width="2"/>`;
    res += `<polygon points="${x0},${midY - 12} ${x0 - 5},${midY - 2} ${x0 + 5},${midY - 2}" fill="#2471a3"/>`;
    res += `<line x1="${x0}" y1="${midY + cr}" x2="${x0}" y2="${y1}" stroke="currentColor" stroke-width="2"/>`;
    res += `<text x="${x0 - 24}" y="${midY - 4}" text-anchor="end" font-size="14" fill="#2471a3">IT</text>`;
    if (model && model.I != null) {
      res += `<text x="${x0 - 24}" y="${midY + 12}" text-anchor="end" font-size="11" fill="#2471a3">${Number(model.I.toPrecision(3))} A</text>`;
    }
  } else {
    res += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="currentColor" stroke-width="2"/>`;
    res += `<line x1="${x0 - 16}" y1="${y0 + 22}" x2="${x0 + 16}" y2="${y0 + 22}" stroke="currentColor" stroke-width="2.4"/>`;
    res += `<line x1="${x0 - 10}" y1="${y1 - 22}" x2="${x0 + 10}" y2="${y1 - 22}" stroke="currentColor" stroke-width="2"/>`;
    res += `<text x="${x0 - 48}" y="${midY + 5}" font-size="15" fill="currentColor">E</text>`;
    if (model && model.E != null) {
      res += `<text x="${x0 - 52}" y="${midY + 22}" font-size="11" fill="currentColor">${Number(model.E.toPrecision(4))} V</text>`;
    }
  }
  res += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="currentColor" stroke-width="2"/>`;
  res += `<line x1="${x0}" y1="${y1}" x2="${x1}" y2="${y1}" stroke="currentColor" stroke-width="2"/>`;
  items.forEach((el, k) => {
    const cx = x0 + 50 + slot * (k + 0.5);
    const top = y0 + 18;
    const bot = y1 - 18;
    const h = bot - top;
    res += `<line x1="${cx}" y1="${y0}" x2="${cx}" y2="${top}" stroke="currentColor" stroke-width="2"/>`;
    res += `<line x1="${cx}" y1="${bot}" x2="${cx}" y2="${y1}" stroke="currentColor" stroke-width="2"/>`;
    if (el.st === "open") {
      res += `<circle cx="${cx}" cy="${top + 8}" r="3.2" fill="none" stroke="#c0392b" stroke-width="2"/>`;
      res += `<circle cx="${cx}" cy="${bot - 8}" r="3.2" fill="none" stroke="#c0392b" stroke-width="2"/>`;
      res += `<text x="${cx}" y="${(top + bot) / 2}" text-anchor="middle" font-size="11" fill="#c0392b">${el.name}</text>`;
    } else if (el.st === "short") {
      res += `<line x1="${cx}" y1="${top}" x2="${cx}" y2="${bot}" stroke="#2471a3" stroke-width="3"/>`;
      res += `<text x="${cx + 8}" y="${(top + bot) / 2}" font-size="11" fill="#2471a3">${el.name} corto</text>`;
    } else {
      const hasSeries = (el.rs || 0) > 0;
      if (hasSeries) {
        const mid = (top + bot) / 2;
        res += `<rect x="${cx - 16}" y="${top}" width="32" height="${h / 2 - 6}" fill="none" stroke="currentColor" stroke-width="2"/>`;
        res += `<rect x="${cx - 16}" y="${mid + 6}" width="32" height="${h / 2 - 6}" fill="none" stroke="currentColor" stroke-width="2"/>`;
        res += `<text x="${cx + 20}" y="${top + 16}" font-size="11" fill="currentColor">${el.name}</text>`;
        if (el.r != null) res += `<text x="${cx + 20}" y="${top + 30}" font-size="10" fill="currentColor">${formatOhmLabel(el.r)}</text>`;
        if (el.rs) res += `<text x="${cx + 20}" y="${mid + 22}" font-size="10" fill="currentColor">${formatOhmLabel(el.rs)}</text>`;
      } else {
        res += `<rect x="${cx - 16}" y="${top}" width="32" height="${h}" fill="none" stroke="currentColor" stroke-width="2"/>`;
        res += `<text x="${cx + 22}" y="${(top + bot) / 2 - 4}" font-size="12" fill="currentColor">${el.name}</text>`;
        if (el.r != null) {
          res += `<text x="${cx + 22}" y="${(top + bot) / 2 + 12}" font-size="11" fill="currentColor">${formatOhmLabel(el.reff != null ? el.reff : el.r)}</text>`;
        }
      }
    }
    if (asCurrent || el.ix != null) {
      res += `<polygon points="${cx},${y0 + 8} ${cx - 5},${y0 + 18} ${cx + 5},${y0 + 18}" fill="#2471a3"/>`;
    }
    if (asCurrent) {
      const iLabel = el.ix != null ? `${Number(el.ix.toPrecision(3))} A` : `I${k + 1}`;
      res += `<text x="${cx + 8}" y="${y0 + 16}" font-size="10" fill="#2471a3">${iLabel}</text>`;
    }
  });
  if (asCurrent || (model && model.I != null)) {
    const iTag = asCurrent ? "IT" : "Is";
    const iVal = (model && model.I != null) ? ` ${Number(model.I.toPrecision(3))} A` : "";
    res += `<polygon points="${x0 + 28},${y0} ${x0 + 14},${y0 - 6} ${x0 + 14},${y0 + 6}" fill="#2471a3"/>`;
    res += `<text x="${x0 + 34}" y="${y0 - 10}" font-size="12" fill="#2471a3">${iTag}${iVal}</text>`;
  }
  setSvgMarkup(svg, res);
}

function runParallelFromPrefix(prefix, outId, svgId, extras) {
  const out = document.getElementById(outId);
  try {
    let E = readOptionalNumber(`${prefix}-e`);
    let I = readOptionalNumber(`${prefix}-i`);
    let RT = readOptionalNumber(`${prefix}-rt`);
    let GT = readOptionalNumber(`${prefix}-gt`);
    if (E != null) E *= readUnit(`${prefix}-e-u`);
    if (I != null) I *= readUnit(`${prefix}-i-u`);
    if (RT != null) RT *= readUnit(`${prefix}-rt-u`);
    if (GT != null) GT *= readUnit(`${prefix}-gt-u`);
    const wantWatt = !!document.getElementById(`${prefix}-watt`)?.checked;
    const r2of1 = readOptionalNumber(`${prefix}-k2`);
    const r3of1 = readOptionalNumber(`${prefix}-k3`);
    const ratios = (r2of1 != null && r3of1 != null) ? { r2of1, r3of1 } : null;
    const model = analyzeParallel({
      E, I, RT, GT,
      rows: readParallelRows(prefix, 6),
      wantWatt,
      ratios
    });
    setMathText(out, model.proc);
    drawParallelNetwork(document.getElementById(svgId), model);
    return model;
  } catch (e) {
    setMathText(out, e.message);
    return null;
  }
}

function initSec6() {
  fillParallelRows("s63", 6, { showI: false });
  fillParallelRows("s64", 6, { showI: true });
  fillParallelRows("s66", 6, { showI: true });
  fillKclRows();
  drawParallelNetwork(document.getElementById("svg-s63"));
  drawParallelNetwork(document.getElementById("svg-s64"));
  drawParallelNetwork(document.getElementById("svg-s66"), { asCurrent: true });
  initSec6_2();
  initSec6_3();
  initSec6_4();
  initSec6_5();
  initSec6_6();
  initSec6_7();
  initSec6_8();
  initSec6_12();
}

function initSec6_2() {
  const sel = document.getElementById("s62-fig");
  const btn = document.getElementById("btn-s62");
  const run = () => {
    const out = document.getElementById("proc-6-2");
    const key = sel ? sel.value : "a";
    const texts = {
      a: "Fig. 6.67.a — Combiner de tres strings.\nEl fusible / seccionador 1 está en serie con el paralelo de 2, 3 y 4.\n2, 3 y 4 son strings (o dump loads) en paralelo: comparten los dos nudos del bus.\n1 no es paralelo: su corriente es la suma de las tres ramas.\nEn 2026: gPV de un combiner 1500 Vcc delante de tres strings TOPCon.",
      b: "Fig. 6.67.b — Feeder y dos MPPT.\n1 está en serie con el paralelo de 2 y 3.\n2 y 3 comparten el nudo de la derecha y el retorno: son paralelo.\n1 es el cable DC / Ri del bus; no comparte ambos nudos con 2 ni con 3.\nEn 2026: un tramo de busbar alimentando dos entradas MPPT de un híbrido.",
      c: "Fig. 6.67.c — Tres ramas en el mismo bus.\n1, (2+3) y 4 están en paralelo (tres caminos entre los dos nudos).\n2 y 3 están en serie (un solo punto común, misma I).\nEn 2026: string 1 || (dos módulos en serie) || string 4, todos al mismo combiner.",
      d: "Fig. 6.68 — Bus DC de una planta híbrida 2026.\nE: rack BESS / grid-forming. R1: feeder. R3: shunt / retorno.\nEn paralelo: R2 con la red de la derecha (R4 + [R5 || (R6+R7)]).\nEn paralelo: R5 con (R6+R7). En serie: R6 con R7; R4 con ese paralelo; R1 y R3 con todo el resto.\nRamas en paralelo: la de R2 frente a (R4–R5–R6–R7); la de R5 frente a (R6+R7).\nNo hay R1 || R2: R1 no comparte ambos nudos con R2."
    };
    setMathText(out, texts[key] || texts.a);
    const svg = document.getElementById("svg-s62");
    if (!svg) return;
    if (key === "a") {
      setSvgMarkup(svg, `
        <line x1="40" y1="40" x2="40" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="40" y1="40" x2="150" y2="40" stroke="currentColor" stroke-width="2"/>
        <rect x="70" y="28" width="50" height="24" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="88" y="45" font-size="13">1</text>
        <line x1="150" y1="40" x2="230" y2="40" stroke="currentColor" stroke-width="2"/>
        <line x1="230" y1="40" x2="230" y2="70" stroke="currentColor" stroke-width="2"/>
        <line x1="310" y1="40" x2="310" y2="70" stroke="currentColor" stroke-width="2"/>
        <line x1="390" y1="40" x2="390" y2="70" stroke="currentColor" stroke-width="2"/>
        <line x1="230" y1="40" x2="390" y2="40" stroke="currentColor" stroke-width="2"/>
        <rect x="214" y="70" width="32" height="48" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <rect x="294" y="70" width="32" height="48" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <rect x="374" y="70" width="32" height="48" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="224" y="98" font-size="13">2</text>
        <text x="304" y="98" font-size="13">3</text>
        <text x="384" y="98" font-size="13">4</text>
        <line x1="230" y1="118" x2="230" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="310" y1="118" x2="310" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="390" y1="118" x2="390" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="40" y1="160" x2="390" y2="160" stroke="currentColor" stroke-width="2"/>
        <text x="60" y="22" font-size="12" fill="#1e8449">gPV / feeder</text>
        <text x="250" y="178" font-size="12" fill="#1a5276">tres strings en paralelo</text>`);
    } else if (key === "b") {
      setSvgMarkup(svg, `
        <line x1="40" y1="50" x2="40" y2="150" stroke="currentColor" stroke-width="2"/>
        <rect x="70" y="38" width="50" height="24" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="88" y="55" font-size="13">1</text>
        <line x1="40" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/>
        <line x1="120" y1="50" x2="200" y2="50" stroke="currentColor" stroke-width="2"/>
        <line x1="200" y1="50" x2="280" y2="50" stroke="currentColor" stroke-width="2"/>
        <rect x="248" y="38" width="50" height="24" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="266" y="55" font-size="13">3</text>
        <line x1="298" y1="50" x2="360" y2="50" stroke="currentColor" stroke-width="2"/>
        <line x1="360" y1="50" x2="360" y2="150" stroke="currentColor" stroke-width="2"/>
        <line x1="200" y1="50" x2="200" y2="80" stroke="currentColor" stroke-width="2"/>
        <rect x="184" y="80" width="32" height="44" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="194" y="106" font-size="13">2</text>
        <line x1="200" y1="124" x2="200" y2="150" stroke="currentColor" stroke-width="2"/>
        <line x1="40" y1="150" x2="360" y2="150" stroke="currentColor" stroke-width="2"/>
        <text x="64" y="28" font-size="12" fill="#1e8449">feeder</text>
        <text x="168" y="176" font-size="12" fill="#1a5276">2 || 3 (dos MPPT)</text>`);
    } else if (key === "c") {
      setSvgMarkup(svg, `
        <line x1="50" y1="36" x2="400" y2="36" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="170" x2="400" y2="170" stroke="currentColor" stroke-width="2"/>
        <line x1="90" y1="36" x2="90" y2="60" stroke="currentColor" stroke-width="2"/>
        <rect x="74" y="60" width="32" height="80" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="84" y="104" font-size="13">1</text>
        <line x1="90" y1="140" x2="90" y2="170" stroke="currentColor" stroke-width="2"/>
        <line x1="210" y1="36" x2="210" y2="52" stroke="currentColor" stroke-width="2"/>
        <rect x="194" y="52" width="32" height="36" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="204" y="75" font-size="13">2</text>
        <rect x="194" y="112" width="32" height="36" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="204" y="135" font-size="13">3</text>
        <line x1="210" y1="88" x2="210" y2="112" stroke="currentColor" stroke-width="2"/>
        <line x1="210" y1="148" x2="210" y2="170" stroke="currentColor" stroke-width="2"/>
        <line x1="330" y1="36" x2="330" y2="60" stroke="currentColor" stroke-width="2"/>
        <rect x="314" y="60" width="32" height="80" fill="#d6eaf8" stroke="currentColor" stroke-width="2"/>
        <text x="324" y="104" font-size="13">4</text>
        <line x1="330" y1="140" x2="330" y2="170" stroke="currentColor" stroke-width="2"/>
        <text x="70" y="190" font-size="12" fill="#1a5276">1 || (2+3) || 4  — tres ramas al bus</text>`);
    } else {
      setSvgMarkup(svg, `
        <line x1="36" y1="50" x2="36" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="22" y1="66" x2="50" y2="66" stroke="currentColor" stroke-width="2.4"/>
        <line x1="26" y1="144" x2="46" y2="144" stroke="currentColor" stroke-width="2"/>
        <text x="8" y="110" font-size="13">E</text>
        <line x1="36" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>
        <rect x="80" y="40" width="44" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="90" y="35" font-size="11">R1</text>
        <line x1="124" y1="50" x2="200" y2="50" stroke="currentColor" stroke-width="2"/>
        <rect x="200" y="40" width="44" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="210" y="35" font-size="11">R4</text>
        <line x1="244" y1="50" x2="320" y2="50" stroke="currentColor" stroke-width="2"/>
        <rect x="320" y="40" width="44" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="330" y="35" font-size="11">R6</text>
        <line x1="364" y1="50" x2="420" y2="50" stroke="currentColor" stroke-width="2"/>
        <line x1="148" y1="50" x2="148" y2="80" stroke="currentColor" stroke-width="2"/>
        <rect x="132" y="80" width="32" height="36" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="138" y="102" font-size="11">R2</text>
        <line x1="268" y1="50" x2="268" y2="80" stroke="currentColor" stroke-width="2"/>
        <rect x="252" y="80" width="32" height="36" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="258" y="102" font-size="11">R5</text>
        <line x1="420" y1="50" x2="420" y2="80" stroke="currentColor" stroke-width="2"/>
        <rect x="404" y="80" width="32" height="36" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="410" y="102" font-size="11">R7</text>
        <line x1="148" y1="116" x2="148" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="268" y1="116" x2="268" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="420" y1="116" x2="420" y2="160" stroke="currentColor" stroke-width="2"/>
        <line x1="36" y1="160" x2="80" y2="160" stroke="currentColor" stroke-width="2"/>
        <rect x="80" y="150" width="44" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="90" y="184" font-size="11">R3</text>
        <line x1="124" y1="160" x2="420" y2="160" stroke="currentColor" stroke-width="2"/>
        <text x="70" y="200" font-size="11" fill="#1a5276">BESS — feeder — PV || (tie + rack || electro)</text>`);
    }
  };
  if (btn) btn.addEventListener("click", run);
  if (sel) sel.addEventListener("change", run);
  run();
}

function initSec6_3() {
  const btn = document.getElementById("btn-s63");
  if (btn) btn.addEventListener("click", () => runParallelFromPrefix("s63", "proc-6-3", "svg-s63"));
}

function initSec6_4() {
  const btn = document.getElementById("btn-s64");
  if (btn) btn.addEventListener("click", () => runParallelFromPrefix("s64", "proc-6-4", "svg-s64", { watt: true }));
  const btnLoad = document.getElementById("btn-s64load");
  if (btnLoad) {
    btnLoad.addEventListener("click", () => {
      const out = document.getElementById("proc-6-4-load");
      try {
        const E = (readOptionalNumber("s64l-e") ?? 0) * readUnit("s64l-e-u");
        if (!E) throw new Error("Indica el voltaje del servicio.");
        const rows = [];
        for (let i = 1; i <= 4; i++) {
          const name = (document.getElementById(`s64l-n${i}`)?.value || `Carga ${i}`).trim();
          const pRaw = (document.getElementById(`s64l-p${i}`)?.value || "").trim();
          const nRaw = (document.getElementById(`s64l-c${i}`)?.value || "1").trim();
          if (pRaw === "") continue;
          const pEach = parseNumberInput(pRaw);
          const copies = parseNumberInput(nRaw);
          rows.push({ name, pEach, copies, p: pEach * copies });
        }
        if (!rows.length) throw new Error("Indica al menos una carga (W).");
        const breaker = readOptionalNumber("s64l-br");
        let proc = `Servicio ${formatQty(E, "V")}. Cada rama: ${mj("I = P / V")}.\n`;
        let sumI = 0, sumP = 0;
        rows.forEach((r) => {
          const iEach = r.pEach / E;
          const iTot = r.p / E;
          sumI += iTot;
          sumP += r.p;
          proc += `${r.name}: ${r.copies} × ${formatQty(r.pEach, "W")} → ${formatQty(iEach, "A")} por unidad, ${formatQty(iTot, "A")} la rama.\n`;
        });
        const RT = E / sumI;
        proc += `${mj(`I_s = ${texQtyBody(sumI, "A")}`)}, ${mj(`R_T = E / I_s = ${texQtyBody(RT, "\\Omega")}`)}.\n`;
        proc += `Fuente: ${mj(`P = E I_s = ${texQtyBody(E * sumI, "W")}`)} vs ΣP = ${formatQty(sumP, "W")}.\n`;
        if (breaker != null) {
          proc += `Interruptor ${formatQty(breaker, "A")}: `;
          proc += sumI > breaker
            ? `se desconecta (${formatQty(sumI, "A")} > ${formatQty(breaker, "A")}).`
            : `aguanta (${formatQty(sumI, "A")} < ${formatQty(breaker, "A")}).`;
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnNodal = document.getElementById("btn-s64n");
  if (btnNodal) {
    btnNodal.addEventListener("click", () => {
      const out = document.getElementById("proc-6-4-n");
      try {
        const va = readOptionalNumber("s64n-va");
        const vb = readOptionalNumber("s64n-vb");
        const rab = readOptionalNumber("s64n-rab");
        const rac = readOptionalNumber("s64n-rac");
        const rbc = readOptionalNumber("s64n-rbc");
        if (va == null || vb == null || rab == null || rac == null || rbc == null) {
          throw new Error("Indica VA, VB y las tres R del triángulo.");
        }
        const vc = (va / rac + vb / rbc) / (1 / rac + 1 / rbc);
        const iab = (va - vb) / rab;
        const iac = (va - vc) / rac;
        const ibc = (vc - vb) / rbc;
        const i1 = iab + iac;
        const i2 = iab + ibc;
        const pab = iab * iab * rab;
        let proc = `Nudo C flotante: ${mj("V_C (1/R_{AC} + 1/R_{BC}) = V_A / R_{AC} + V_B / R_{BC}")}.\n`;
        proc += `${mj(`V_C = ${texQtyBody(vc, "V")}`)}.\n`;
        proc += `${mj(`I_{AB} = (V_A - V_B)/R_{AB} = ${texQtyBody(iab, "A")}`)}.\n`;
        proc += `${mj(`I_{AC} = ${texQtyBody(iac, "A")}`)}, ${mj(`I_{CB} = ${texQtyBody(ibc, "A")}`)}.\n`;
        proc += `${mj(`I_1`)} (sale de A) = ${formatQty(i1, "A")}. ${mj("I_2")} (entra a B) = ${formatQty(i2, "A")}.\n`;
        proc += `Potencia en ${mj("R_{AB}")}: ${formatQty(pab, "W")}.`;
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function fillKclRows() {
  ["A", "B"].forEach((node) => {
    const tbody = document.getElementById(`s65${node}-tbody`);
    if (!tbody) return;
    let html = "";
    for (let i = 1; i <= 6; i++) {
      html += `<tr>
        <td><input type="text" id="s65${node}-n${i}" placeholder="I${i}" /></td>
        <td><input type="text" id="s65${node}-i${i}" placeholder="—" /></td>
        <td>
          <select id="s65${node}-u${i}">
            <option value="1" selected>A</option>
            <option value="0.001">mA</option>
            <option value="1e-6">µA</option>
          </select>
        </td>
        <td>
          <select id="s65${node}-d${i}">
            <option value="1" selected>entra (+)</option>
            <option value="-1">sale (−)</option>
          </select>
        </td>
      </tr>`;
    }
    tbody.innerHTML = html;
  });
}

function initSec6_5() {
  fillKclRows();
  const btn = document.getElementById("btn-s65");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-6-5");
      try {
        const nodes = ["A", "B"];
        let proc = `${mj("\\sum I_{\\mathrm{entran}} = \\sum I_{\\mathrm{salen}}")} en cada nudo (LCK).\n`;
        const found = {};
        const writeNamed = (label, magAmpere) => {
          found[label] = magAmpere;
          nodes.forEach((n) => {
            for (let i = 1; i <= 6; i++) {
              const nm = (document.getElementById(`s65${n}-n${i}`)?.value || "").trim();
              if (nm === label) {
                const u = Number(document.getElementById(`s65${n}-u${i}`)?.value || 1) || 1;
                setField(`s65${n}-i${i}`, magAmpere / u);
              }
            }
          });
        };
        let guard = 0;
        let progressed = true;
        while (progressed && guard < 8) {
          progressed = false;
          guard += 1;
          nodes.forEach((node) => {
            const known = [];
            const unknown = [];
            for (let i = 1; i <= 6; i++) {
              const name = (document.getElementById(`s65${node}-n${i}`)?.value || "").trim();
              const raw = (document.getElementById(`s65${node}-i${i}`)?.value || "").trim();
              const dir = Number(document.getElementById(`s65${node}-d${i}`)?.value || 1);
              const u = Number(document.getElementById(`s65${node}-u${i}`)?.value || 1);
              if (raw === "" && !name) continue;
              const label = name || `I${i}`;
              if (raw === "") unknown.push({ label, dir, i, node, u });
              else known.push({ label, val: parseNumberInput(raw) * u * dir });
            }
            const sumK = known.reduce((s, c) => s + c.val, 0);
            if (unknown.length === 1) {
              const u = unknown[0];
              const mag = (-sumK) / u.dir;
              proc += `Nudo ${node}: ${u.label} = ${formatQty(mag, "A")} (flecha ${u.dir > 0 ? "entra" : "sale"}`;
              proc += mag < 0 ? "; el signo negativo invierte la flecha).\n" : ").\n";
              writeNamed(u.label, mag);
              progressed = true;
            } else if (unknown.length === 0 && known.length) {
              proc += `Nudo ${node}: ${mj(`\\sum = ${texQtyBody(sumK, "A")}`)}`;
              proc += Math.abs(sumK) < 1e-8 ? " — LCK se cumple.\n" : " — residuo; revisa signos.\n";
            }
          });
        }
        if (!Object.keys(found).length) proc += "Falta un dato: un nudo debe tener una sola incógnita.";
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec6_6() {
  const btn = document.getElementById("btn-s66");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-6-6");
      try {
        let IT = readOptionalNumber("s66-i");
        if (IT != null) IT *= readUnit("s66-i-u");
        const knownI = [];
        const rows = readParallelRows("s66", 6);
        if (!rows.length) throw new Error("Indica las R de las ramas.");
        rows.forEach((el) => {
          if (el.ix != null) knownI.push(el);
        });
        if (IT == null && knownI.length) {
          const el = knownI[0];
          if (el.r == null) throw new Error("La rama con I conocida necesita R.");
          const re = branchReff(el);
          const E = el.ix * re;
          const tmp = analyzeParallel({ E, rows, wantWatt: false });
          IT = tmp.I;
          setMathText(out, `Con ${el.name} = ${formatQty(el.ix, "A")} se fija ${mj("E")} y el resto.\n` + tmp.proc);
          drawParallelNetwork(document.getElementById("svg-s66"), { ...tmp, asCurrent: true });
          return;
        }
        if (IT == null) throw new Error("Indica IT o la corriente de una rama.");
        const model = analyzeParallel({ I: IT, rows, wantWatt: false });
        let extra = `Regla del divisor: ${mj("I_x = I_T R_T / R_x = I_T G_x / G_T")}.\n`;
        extra += `La rama más pequeña se lleva la mayor parte (string de menor R / más módulos en paralelo).\n`;
        setMathText(out, extra + model.proc);
        drawParallelNetwork(document.getElementById("svg-s66"), { ...model, asCurrent: true });
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnD = document.getElementById("btn-s66d");
  if (btnD) {
    btnD.addEventListener("click", () => {
      const out = document.getElementById("proc-6-6d");
      try {
        const E = (readOptionalNumber("s66d-e") ?? 0) * readUnit("s66d-e-u");
        const IT = (readOptionalNumber("s66d-i") ?? 0) * readUnit("s66d-i-u");
        const a = readOptionalNumber("s66d-a");
        const b = readOptionalNumber("s66d-b");
        if (!E || !IT || a == null || b == null) throw new Error("Indica E, IT e I2/I1, I3/I2.");
        const i1 = IT / (1 + a + a * b);
        const i2 = a * i1;
        const i3 = b * i2;
        const r1 = E / i1, r2 = E / i2, r3 = E / i3;
        let proc = `Diseño de tres ramas: ${mj("I_2 = a I_1")}, ${mj("I_3 = b I_2")}.\n`;
        proc += `${mj(`I_1 + a I_1 + a b I_1 = I_T`)} → ${mj(`I_1 = ${texQtyBody(i1, "A")}`)}, `;
        proc += `${mj(`I_2 = ${texQtyBody(i2, "A")}`)}, ${mj(`I_3 = ${texQtyBody(i3, "A")}`)}.\n`;
        proc += `${mj(`R_1 = E / I_1 = ${texQtyBody(r1, "\\Omega")}`)}, `;
        proc += `${mj(`R_2 = ${texQtyBody(r2, "\\Omega")}`)}, ${mj(`R_3 = ${texQtyBody(r3, "\\Omega")}`)}.`;
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec6_7() {
  const btn = document.getElementById("btn-s67");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-6-7");
    try {
      const E = (readOptionalNumber("s67-e") ?? 0) * readUnit("s67-e-u");
      const nSrc = readOptionalNumber("s67-n") ?? 2;
      const r1 = readOptionalNumber("s67-r1");
      const r2 = readOptionalNumber("s67-r2");
      let IT = readOptionalNumber("s67-it");
      if (IT != null) IT *= readUnit("s67-it-u");
      if (!E) throw new Error("Indica E (fuentes idénticas).");
      const loads = [r1, r2].filter((v) => v != null && v > 0);
      if (!loads.length && IT == null) throw new Error("Indica al menos una R de carga o IT.");
      const GT = loads.reduce((s, r) => s + 1 / r, 0);
      const RT = GT > 0 ? 1 / GT : (IT ? E / IT : null);
      if (IT == null) IT = E * GT;
      const each = IT / nSrc;
      let proc = `Fuentes idénticas en paralelo (racks BESS / inversores grid-forming del mismo firmware):\n`;
      proc += `comparten ${mj("I_T")} a partes iguales. No se paralelizan fuentes de E distinto.\n`;
      if (RT != null) proc += `${mj(`R_T^{\\mathrm{cargas}} = ${texQtyBody(RT, "\\Omega")}`)}.\n`;
      proc += `${mj(`I_T = E / R_T = ${texQtyBody(IT, "A")}`)}.\n`;
      proc += `${mj(`I_{\\mathrm{fuente}} = I_T / N = ${texQtyBody(each, "A")}`)} (${nSrc} fuentes).\n`;
      loads.forEach((r, i) => {
        proc += `Carga ${i + 1}: ${mj(`I = E / R = ${texQtyBody(E / r, "A")}`)}.\n`;
      });
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

function initSec6_8() {
  const btn = document.getElementById("btn-s68");
  if (btn) {
    btn.addEventListener("click", () => {
      const out = document.getElementById("proc-6-8");
      try {
        const E = (readOptionalNumber("s68-e") ?? 0) * readUnit("s68-e-u");
        const rs = (readOptionalNumber("s68-rs") ?? 0) * readUnit("s68-rs-u");
        const rl = (readOptionalNumber("s68-rl") ?? 0) * readUnit("s68-rl-u");
        const mode = document.getElementById("s68-mode")?.value || "normal";
        if (!E) throw new Error("Indica E.");
        let proc = "";
        if (mode === "normal") {
          if (!rs && !rl) throw new Error("Indica Rs y RL.");
          const I = E / (rs + rl);
          const VL = I * rl;
          proc += `Servicio normal: ${mj(`I_s = E / (R_s + R_L) = ${texQtyBody(I, "A")}`)}.\n`;
          proc += `${mj(`V_L = I R_L = ${texQtyBody(VL, "V")}`)}.`;
        } else if (mode === "short") {
          if (!rs) throw new Error("Indica Rs (el corto anula RL).");
          const I = E / rs;
          proc += `RL en cortocircuito (falla DC en el ramal de carga): ${mj("V_L = 0")}.\n`;
          proc += `${mj(`I_s = E / R_s = ${texQtyBody(I, "A")}`)} — la Icc la fija el feeder / Ri.`;
        } else {
          proc += `RL abierto (seccionador / MC4 / filamento): ${mj("I_s = 0")}.\n`;
          proc += `${mj(`V_L = E = ${texQtyBody(E, "V")}`)} (no hay caída en Rs).`;
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnV = document.getElementById("btn-s69");
  if (btnV) {
    btnV.addEventListener("click", () => {
      const out = document.getElementById("proc-6-9");
      try {
        const E = (readOptionalNumber("s69-e") ?? 0) * readUnit("s69-e-u");
        const r1 = (readOptionalNumber("s69-r1") ?? 0) * readUnit("s69-r1-u");
        const r2 = (readOptionalNumber("s69-r2") ?? 0) * readUnit("s69-r2-u");
        const rm = readOptionalNumber("s69-rm");
        const ohv = readOptionalNumber("s69-ohv");
        const scale = readOptionalNumber("s69-sc");
        if (!E || !r1 || !r2) throw new Error("Indica E, R1 y R2.");
        const vIdeal = E * r2 / (r1 + r2);
        let proc = `Sin medidor: ${mj(`V_2 = E R_2 / (R_1 + R_2) = ${texQtyBody(vIdeal, "V")}`)}.\n`;
        const meters = [];
        if (rm != null && rm > 0) meters.push({ name: "DMM", Rm: rm });
        if (ohv != null && scale != null) meters.push({ name: "VOM", Rm: ohv * scale });
        meters.forEach((m) => {
          const rp = 1 / (1 / r2 + 1 / m.Rm);
          const v = E * rp / (r1 + rp);
          const err = (v - vIdeal) / vIdeal * 100;
          proc += `${m.name} (${formatQty(m.Rm, "\\Omega")}): ${mj(`R_2 \\parallel R_m = ${texQtyBody(rp, "\\Omega")}`)}, `;
          proc += `${mj(`V_2 = ${texQtyBody(v, "V")}`)} (${formatQtyPlain(err)} % frente al ideal).\n`;
        });
        if (!meters.length) proc += "Indica Rm del DMM y/o Ω/V y escala del VOM para ver el efecto de carga.";
        else proc += "Conclusión: el DMM de MΩ no carga un divisor de kΩ; el VOM de 20 kΩ/V sí, y peor si R1 y R2 suben a 100/200 kΩ.";
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btnT = document.getElementById("btn-s610");
  if (btnT) {
    btnT.addEventListener("click", () => {
      const out = document.getElementById("proc-6-10");
      try {
        const E = (readOptionalNumber("s610-e") ?? 0);
        const im = (readOptionalNumber("s610-im") ?? 0) * 0.001;
        const vm = readOptionalNumber("s610-vm");
        const r1 = readOptionalNumber("s610-r1");
        const r2 = readOptionalNumber("s610-r2");
        const r3 = readOptionalNumber("s610-r3");
        if (!E || !im || !r1 || !r2 || !r3) throw new Error("Indica E, I medida y las tres R.");
        const branches = [r1 * 1e3, r2 * 1e3, r3 * 1e3];
        const names = [
          document.getElementById("s610-n1")?.value || "R1",
          document.getElementById("s610-n2")?.value || "R2",
          document.getElementById("s610-n3")?.value || "R3"
        ];
        const GT = branches.reduce((s, r) => s + 1 / r, 0);
        const Iexp = E * GT;
        let proc = `Esperado: ${mj(`I_s = E \\sum 1/R = ${texQtyBody(Iexp, "A")}`)} (${formatQty(Iexp * 1000, "mA")}).\n`;
        proc += `Medido: ${formatQty(im, "A")}`;
        if (vm != null) proc += `, V = ${formatQty(vm, "V")}`;
        proc += ".\n";
        if (vm != null && Math.abs(vm - E) / E > 0.05) {
          proc += "El voltímetro no ve E: hay caída en el feeder o el medidor está mal pinzado.\n";
        }
        const rel = Math.abs(im - Iexp) / Iexp;
        if (rel < 0.04) {
          proc += "La red opera: I medida ≈ I esperada.";
        } else {
          proc += "No opera. Prueba abriendo una rama:\n";
          branches.forEach((r, idx) => {
            const g = GT - 1 / r;
            const i = E * g;
            const hit = Math.abs(i - im) / Math.max(im, 1e-12) < 0.04;
            proc += `  si ${names[idx]} abierto: I = ${formatQty(i, "A")}${hit ? " ← coincide con la medida" : ""}.\n`;
          });
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
  const btn2s = document.getElementById("btn-s611");
  if (btn2s) {
    btn2s.addEventListener("click", () => {
      const out = document.getElementById("proc-6-11");
      try {
        const vl = readOptionalNumber("s611-vl");
        const vr = readOptionalNumber("s611-vr");
        const rl = (readOptionalNumber("s611-rl") ?? 0) * readUnit("s611-rl-u");
        const rr = (readOptionalNumber("s611-rr") ?? 0) * readUnit("s611-rr-u");
        const vaM = readOptionalNumber("s611-va");
        if (vl == null || vr == null || !rl || !rr) throw new Error("Indica los dos E y las dos R.");
        const va = (vl * rr + vr * rl) / (rl + rr);
        const i = (vl - vr) / (rl + rr);
        let proc = `Dos fuentes a tierra y un nudo a: ${mj("V_a = (E_L R_R + E_R R_L) / (R_L + R_R)")}.\n`;
        proc += `${mj(`V_a = ${texQtyBody(va, "V")}`)}, ${mj(`I = (E_L - E_R)/(R_L + R_R) = ${texQtyBody(i, "A")}`)}.\n`;
        if (vaM != null) {
          const err = Math.abs(vaM - va);
          if (err < 0.05 * Math.max(Math.abs(va), 1)) {
            proc += `La lectura ${formatQty(vaM, "V")} es correcta.`;
          } else {
            const vaFlipR = (vl * rr + (-vr) * rl) / (rl + rr);
            const vaFlipL = ((-vl) * rr + vr * rl) / (rl + rr);
            proc += `La lectura ${formatQty(vaM, "V")} no es ${formatQty(va, "V")}.\n`;
            if (Math.abs(vaM - vaFlipR) < 0.08 * Math.max(Math.abs(vaFlipR), 1)) {
              proc += `Coincide con la fuente de la derecha invertida (${formatQty(vaFlipR, "V")}): polaridad al revés.`;
            } else if (Math.abs(vaM - vaFlipL) < 0.08 * Math.max(Math.abs(vaFlipL), 1)) {
              proc += `Coincide con la fuente de la izquierda invertida (${formatQty(vaFlipL, "V")}).`;
            } else if (Math.abs(vaM - vl) < 0.05 * Math.max(Math.abs(vl), 1)) {
              proc += "Va = EL: el camino a la derecha está abierto (string / R de la derecha fuera).";
            } else {
              proc += "Revisa polaridad de las fuentes o un abierto en una R.";
            }
          }
        }
        setMathText(out, proc);
      } catch (e) {
        setMathText(out, e.message);
      }
    });
  }
}

function initSec6_12() {
  const btn = document.getElementById("btn-s612");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const out = document.getElementById("proc-6-12");
    const wrap = document.getElementById("wrap-6-12");
    const tbody = document.querySelector("#table-6-12 tbody");
    try {
      const E = (readOptionalNumber("s612-e") ?? 0) * readUnit("s612-e-u");
      const r = (readOptionalNumber("s612-r") ?? 0) * readUnit("s612-r-u");
      const nmin = parseNumberInput(document.getElementById("s612-nmin")?.value || "1");
      const nmax = parseNumberInput(document.getElementById("s612-nmax")?.value || "12");
      if (!E || !r) throw new Error("Indica E y R de un string.");
      const rows = [];
      for (let n = nmin; n <= nmax + 1e-9; n += 1) {
        const RT = r / n;
        const Is = E / RT;
        const Ix = E / r;
        const P = E * Is;
        rows.push({ n, RT, Is, Ix, P });
      }
      if (tbody) {
        tbody.innerHTML = rows.map((row) =>
          `<tr><td>${row.n}</td><td>${Number(row.RT.toPrecision(4))}</td><td>${Number(row.Is.toPrecision(4))}</td><td>${Number(row.Ix.toPrecision(4))}</td><td>${Number(row.P.toPrecision(4))}</td></tr>`
        ).join("");
      }
      if (wrap) wrap.style.display = "block";
      let proc = `N strings idénticos en un combiner: ${mj("R_T = R / N")}, ${mj("I_s = N I_x")}, ${mj("V")} no cambia.\n`;
      proc += `Un string abierto (fusible) baja N en 1: el resto sigue a ${formatQty(E, "V")} e ${formatQty(E / r, "A")}.\n`;
      proc += `Eso es la ventaja del paralelo frente al string serie del cap. 5.`;
      setMathText(out, proc);
    } catch (e) {
      setMathText(out, e.message);
    }
  });
}

Object.assign(presetsData, {
  "6-2": {
    p1a: {
      selects: { "s62-fig": "a" },
      click: "btn-s62",
      desc: "Prob. 1.a — Combiner de tres strings (fig. 6.67.a).\n1 (gPV / feeder) en serie con el paralelo de 2, 3 y 4.\n2, 3 y 4 en paralelo (tres strings TOPCon al mismo bus)."
    },
    p1b: {
      selects: { "s62-fig": "b" },
      click: "btn-s62",
      desc: "Prob. 1.b — Feeder y dos MPPT (fig. 6.67.b).\n1 en serie con (2 || 3). 2 y 3 en paralelo."
    },
    p1c: {
      selects: { "s62-fig": "c" },
      click: "btn-s62",
      desc: "Prob. 1.c — Tres ramas al bus (fig. 6.67.c).\n2 y 3 en serie. 1, (2+3) y 4 en paralelo."
    },
    p2: {
      selects: { "s62-fig": "d" },
      click: "btn-s62",
      desc: "Prob. 2 — Bus DC de planta híbrida (fig. 6.68).\na) Paralelo: R2 con (R4+[R5||(R6+R7)]); R5 con (R6+R7).\nb) Serie: R6 con R7; R4 con ese paralelo; R1 y R3 con el resto.\nc) Ramas en paralelo: R2 frente al lazo derecho; R5 frente a (R6+R7)."
    }
  },
  "6-3": {
    p3a: {
      parallel: { prefix: "s63", rows: [
        { name: "dump 9 Ω", r: "9" }, { name: "dump 18 Ω", r: "18" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.a — Dos dump eólicos / lastres hidro 9 Ω || 18 Ω.\nGT = 1/9+1/18 = 0.1667 S. RT = 6.00 Ω."
    },
    p3b: {
      parallel: { prefix: "s63", rows: [
        { name: "string 3 kΩ", r: "3", ru: "1e3" },
        { name: "string 2 kΩ", r: "2", ru: "1e3" },
        { name: "string 6 kΩ", r: "6", ru: "1e3" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.b — Tres bleeder / strings de medida 3 || 2 || 6 kΩ.\nGT = 1.00 mS. RT = 1.00 kΩ."
    },
    p3c: {
      parallel: { prefix: "s63", rows: [
        { name: "3.3 kΩ std", r: "3.3", ru: "1e3" },
        { name: "5.6 kΩ std", r: "5.6", ru: "1e3" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.c — Valores estándar E24 (divisor / NTC de un logger).\n3.3 k || 5.6 k = 2.08 kΩ. GT = 0.482 mS."
    },
    p3d: {
      parallel: { prefix: "s63", rows: [
        { name: "4 Ω", r: "4" }, { name: "8 Ω", r: "8" },
        { name: "4 Ω", r: "4" }, { name: "8 Ω", r: "8" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.d — Cuatro lastres de un Pelton / dump: 4 || 8 || 4 || 8 Ω.\nGT = 0.750 S. RT = 1.33 Ω."
    },
    p3e: {
      parallel: { prefix: "s63", rows: [
        { name: "shunt 10 Ω", r: "10" },
        { name: "2 kΩ", r: "2", ru: "1e3" },
        { name: "40 kΩ ISO", r: "40", ru: "1e3" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.e — Shunt 10 Ω || 2 kΩ || 40 kΩ (monitor ISO).\nLa de 10 Ω domina: RT = 9.95 Ω. GT = 0.101 S."
    },
    p3f: {
      parallel: { prefix: "s63", rows: [
        { name: "9.1 Ω", r: "9.1" }, { name: "9.1 Ω", r: "9.1" },
        { name: "2.2 Ω", r: "2.2" }, { name: "9.1 Ω", r: "9.1" },
        { name: "2.2 Ω", r: "2.2" }, { name: "4.7 Ω", r: "4.7" }
      ] },
      click: "btn-s63",
      desc: "Prob. 3.f — Seis valores E24 de un banco de lastre.\nGT = 1.45 S. RT = 0.689 Ω."
    },
    p4a: {
      parallel: { prefix: "s63", rows: [
        { name: "4 Ω", r: "4" }, { name: "R", r: "" }, { name: "6 Ω", r: "6" }
      ] },
      fields: { "s63-gt": "0.55" },
      click: "btn-s63",
      desc: "Prob. 4.a — GT = 0.55 S (tres ramas de un dump). 1/4+1/6 = 0.4167 S.\nGR = 0.1333 S → R = 7.50 Ω."
    },
    p4b: {
      parallel: { prefix: "s63", rows: [
        { name: "5 kΩ", r: "5", ru: "1e3" },
        { name: "8 kΩ", r: "8", ru: "1e3" },
        { name: "R bleeder", r: "" }
      ] },
      fields: { "s63-gt": "0.45" },
      selects: { "s63-gt-u": "0.001" },
      click: "btn-s63",
      desc: "Prob. 4.b — GT = 0.45 mS, 5 k || 8 k || R (ISO / bleeder).\nG5+G8 = 0.325 mS → GR = 0.125 mS → R = 8.00 kΩ."
    },
    p5a: {
      parallel: { prefix: "s63", rows: [
        { name: "18 Ω", r: "18" }, { name: "R", r: "" }, { name: "18 Ω", r: "18" }
      ] },
      fields: { "s63-rt": "6" },
      click: "btn-s63",
      desc: "Prob. 5.a — RT = 6 Ω, dos lastres de 18 Ω y R.\n1/6 = 1/18+1/R+1/18 → R = 18.0 Ω."
    },
    p5b: {
      parallel: { prefix: "s63", rows: [
        { name: "R1", r: "" }, { name: "9 Ω", r: "9" },
        { name: "R2=R1", r: "" }, { name: "18 Ω", r: "18" }
      ] },
      fields: { "s63-rt": "4" },
      click: "btn-s63",
      desc: "Prob. 5.b — RT = 4 Ω, R1 || 9 || R1 || 18 (dos strings iguales).\n2/R1 + 1/9 + 1/18 = 1/4 → R1 = R2 = 24.0 Ω."
    },
    p6: {
      parallel: { prefix: "s63", rows: [
        { name: "R1 string", r: "" },
        { name: "R2+R3 (serie)", r: "", rs: "" }
      ] },
      fields: { "s63-rt": "20", "s63-k2": "5", "s63-k3": "0.5" },
      click: "btn-s63",
      desc: "Prob. 6 — RT = 20 Ω, R2 = 5 R1, R3 = ½ R1. R1 || (R2+R3).\nR1 || 5.5 R1 = 20 → R1 = 23.6 Ω, R2 = 118 Ω, R3 = 11.8 Ω.\nEn 2026: un string equivalente en paralelo con dos tramos de cable/dump en serie."
    },
    p7: {
      parallel: { prefix: "s63", rows: [
        { name: "R1", r: "" },
        { name: "24+24 Ω", r: "24", rs: "24" },
        { name: "120 Ω", r: "120" }
      ] },
      fields: { "s63-rt": "10" },
      click: "btn-s63",
      desc: "Prob. 7 — RT = 10 Ω. R1 || (24+24) || 120 (puente / diamond de medida).\n48 || 120 = 34.3 Ω. 1/10 = 1/R1 + 1/34.3 → R1 = 14.1 Ω."
    }
  },
  "6-4": {
    p8: {
      parallel: { prefix: "s64", rows: [
        { name: "R1 8 kΩ", r: "8", ru: "1e3" },
        { name: "R2 24 kΩ", r: "24", ru: "1e3" }
      ] },
      fields: { "s64-e": "48" },
      checks: { "s64-watt": true },
      click: "btn-s64",
      desc: "Prob. 8 — Auxiliar 48 V de un contenedor BESS, 8 kΩ || 24 kΩ (bleeder / LED).\na) GT = 0.1667 mS, RT = 6.00 kΩ.\nb) Is = 8.00 mA, I1 = 6.00 mA, I2 = 2.00 mA.\nc) 6+2 = 8 mA.\nd) P1 = 0.288 W, P2 = 0.096 W, Pent = 0.384 W.\ne) Ambas caben en ½ W."
    },
    p9: {
      parallel: { prefix: "s64", rows: [
        { name: "R1 3 Ω", r: "3" }, { name: "R2 6 Ω", r: "6" }, { name: "R3 1.5 Ω", r: "1.5" }
      ] },
      fields: { "s64-e": "0.9" },
      checks: { "s64-watt": true },
      click: "btn-s64",
      desc: "Prob. 9 — Celda / shunt de 0.9 V y tres lastres 3 || 6 || 1.5 Ω.\nRT = 0.857 Ω, Is = 1.05 A. I = 0.300, 0.150, 0.600 A.\nP = 0.270, 0.135, 0.540 W → ½ W, ½ W, 1 W."
    },
    p10: {
      parallel: { prefix: "s64", rows: [
        { name: "2.2 kΩ", r: "2.2", ru: "1e3" },
        { name: "4.7 kΩ", r: "4.7", ru: "1e3" },
        { name: "6.8 kΩ", r: "6.8", ru: "1e3" }
      ] },
      fields: { "s64-e": "12" },
      checks: { "s64-watt": true },
      click: "btn-s64",
      desc: "Prob. 10 — Rail 12 V de un híbrido, valores E24 2.2 || 4.7 || 6.8 kΩ.\nGT = 0.814 mS, RT = 1.23 kΩ, Is = 9.77 mA.\nI = 5.45, 2.55, 1.76 mA. P < 0.07 W: las tres en ½ W."
    },
    p11: {
      parallel: { prefix: "s64", rows: [
        { name: "foco LED", r: "1.8", ru: "1e3", n: "8" }
      ] },
      fields: { "s64-e": "120" },
      checks: { "s64-watt": true },
      click: "btn-s64",
      desc: "Prob. 11 — Ocho focos LED de alumbrado de planta en paralelo a 120 V, 1.8 kΩ cada uno.\na) I = 120/1800 = 66.7 mA por foco.\nb) RT = 225 Ω.\nc) P = 8.00 W por foco.\nd) Si uno abre, los otros siguen a 120 V e 66.7 mA (ventaja frente al serie del 5.13).\ne) Paralelo: un fallo no apaga el resto; pide más cobre en el feeder. Serie: un gPV / filamento apaga todo."
    },
    p12: {
      fields: {
        "s64l-e": "120", "s64l-br": "20",
        "s64l-n1": "focos 60 W", "s64l-p1": "60", "s64l-c1": "10",
        "s64l-n2": "lavadora", "s64l-p2": "400", "s64l-c2": "1",
        "s64l-n3": "televisor", "s64l-p3": "360", "s64l-c3": "1",
        "s64l-n4": "", "s64l-p4": "", "s64l-c4": "1"
      },
      click: "btn-s64load",
      desc: "Prob. 12 — Servicio residencial / campamento de O&M a 120 V, interruptor 20 A.\nDiez focos 60 W (0.500 A c/u, 5.00 A), lavadora 400 W (3.33 A), TV 360 W (3.00 A).\nIs = 11.3 A < 20 A: no desconecta. RT = 10.6 Ω. Pfuente = 1360 W = ΣP."
    },
    p13a: {
      parallel: { prefix: "s64", rows: [
        { name: "20 Ω", r: "20" }, { name: "5 Ω", r: "5" }
      ] },
      fields: { "s64-e": "30" },
      click: "btn-s64",
      desc: "Prob. 13.a — Bus 30 V, 20 Ω || 5 Ω (dos lastres).\nI1 (20 Ω) = 1.50 A. Is = 7.50 A."
    },
    p13b: {
      parallel: { prefix: "s64", rows: [
        { name: "10 kΩ", r: "10", ru: "1e3" },
        { name: "1 kΩ", r: "1", ru: "1e3" },
        { name: "10 kΩ", r: "10", ru: "1e3" }
      ] },
      fields: { "s64-e": "-8" },
      click: "btn-s64",
      desc: "Prob. 13.b — Rail de −8 V (auxiliar bipolar / referencia de un driver).\nI1 en 10 kΩ = −0.800 mA (hacia el rail negativo). Is = −8.80 mA."
    },
    p14: {
      parallel: { prefix: "s64", rows: [
        { name: "R1", r: "" }, { name: "R2 6 Ω", r: "6" }
      ] },
      fields: { "s64-e": "12", "s64-i": "6" },
      click: "btn-s64",
      desc: "Prob. 14 — 12 V, Is = 6 A, 6 Ω en una rama (carga auxiliar / faro).\nI2 = 2.00 A → I1 = 4.00 A → R1 = 3.00 Ω."
    },
    p15: {
      parallel: { prefix: "s64", rows: [
        { name: "5 Ω feeder", r: "5" },
        { name: "10 Ω dump", r: "10" },
        { name: "20 Ω stack", r: "20" }
      ] },
      fields: { "s64-e": "60" },
      click: "btn-s64",
      desc: "Prob. 15 — Rack 60 V, 5 || 10 || 20 Ω (feeder de medida, dump, stack de electrolizador).\nLas tres ven 60 V. Is = 21.0 A. P = 1260 W = E Is."
    },
    p16: {
      fields: { "s64n-va": "24", "s64n-vb": "-8", "s64n-rab": "4", "s64n-rac": "8", "s64n-rbc": "12" },
      click: "btn-s64n",
      desc: "Prob. 16 — Rails +24 V y −8 V (auxiliar bipolar de un contenedor), 8 Ω / 4 Ω / 12 Ω.\nVC = 11.2 V. I1 = 9.60 A, I4Ω = 8.00 A, P4Ω = 256 W, I2 = 9.60 A."
    },
    p17: {
      fields: { "s64n-va": "24", "s64n-vb": "8", "s64n-rab": "4000", "s64n-rac": "10000", "s64n-rbc": "1e12" },
      click: "btn-s64n",
      desc: "Prob. 17 — Nudo +24 V: 10 kΩ a 0, 4 kΩ a +8 V, 2 kΩ a 0.\nI (4 kΩ) = (24−8)/4k = 4.00 mA.\nV (2 kΩ) = 24 V. Is = 24/10k + 4 mA + 24/2k = 18.4 mA."
    }
  },
  "6-5": {
    p18a: {
      fields: {
        "s65A-n1": "12 A", "s65A-i1": "12", "s65A-d1": "1",
        "s65A-n2": "9 A", "s65A-i2": "9", "s65A-d2": "1",
        "s65A-n3": "4 A", "s65A-i3": "4", "s65A-d3": "1",
        "s65A-n4": "I1", "s65A-i4": "", "s65A-d4": "-1",
        "s65A-n5": "", "s65A-i5": "", "s65B-n1": "I1", "s65B-i1": "", "s65B-d1": "1",
        "s65B-n2": "4 A", "s65B-i2": "4", "s65B-d2": "1",
        "s65B-n3": "6 A", "s65B-i3": "6", "s65B-d3": "-1",
        "s65B-n4": "I2", "s65B-i4": "", "s65B-d4": "-1"
      },
      click: "btn-s65",
      desc: "Prob. 18.a — Caja de combinadores / nudos de un busbar.\nNudo izquierdo: 12+9+4 = I1 → I1 = 25.0 A hacia R1.\nNudo derecho: 25+4 = 6+I2 → I2 = 23.0 A.\nNudo de R2: 23 = 3+I3 → I3 = 20.0 A."
    },
    p18b: {
      fields: {
        "s65A-n1": "20 A", "s65A-i1": "20", "s65A-d1": "1",
        "s65A-n2": "9 A", "s65A-i2": "9", "s65A-d2": "-1",
        "s65A-n3": "I1", "s65A-i3": "", "s65A-d3": "-1",
        "s65A-n4": "", "s65A-i4": "",
        "s65B-n1": "I1", "s65B-i1": "11", "s65B-d1": "1",
        "s65B-n2": "5 A", "s65B-i2": "5", "s65B-d2": "-1",
        "s65B-n3": "I2", "s65B-i3": "", "s65B-d3": "-1",
        "s65B-n4": ""
      },
      click: "btn-s65",
      desc: "Prob. 18.b — Cadena de nudos (feeder → tie → rack).\nI1 = 20−9 = 11.0 A. I2 = 11−5 = 6.00 A.\nI3 = 6+8 = 14.0 A. I4 = 14−4 = 10.0 A."
    },
    p19a: {
      fields: {
        "s65A-n1": "5 mA", "s65A-i1": "5", "s65A-d1": "1",
        "s65A-n2": "4 mA", "s65A-i2": "4", "s65A-d2": "-1",
        "s65A-n3": "I2", "s65A-i3": "", "s65A-d3": "-1",
        "s65B-n1": "I1", "s65B-i1": "", "s65B-d1": "1",
        "s65B-n2": "I2", "s65B-i2": "1", "s65B-d2": "1",
        "s65B-n3": "8 mA", "s65B-i3": "8", "s65B-d3": "-1",
        "s65B-n4": "", "s65B-i4": ""
      },
      selects: {
        "s65A-u1": "0.001", "s65A-u2": "0.001", "s65A-u3": "0.001",
        "s65B-u1": "0.001", "s65B-u2": "0.001", "s65B-u3": "0.001", "s65B-u4": "0.001"
      },
      click: "btn-s65",
      desc: "Prob. 19.a — Sensores / RTU en mA.\nI2 = 5−4 = 1.00 mA. I1 = 8−1 = 7.00 mA. I3 = 7−1.5 = 5.50 mA."
    },
    p19b: {
      fields: {
        "s65A-n1": "6 µA", "s65A-i1": "6", "s65A-d1": "1",
        "s65A-n2": "2 µA", "s65A-i2": "2", "s65A-d2": "-1",
        "s65A-n3": "I2", "s65A-i3": "", "s65A-d3": "-1",
        "s65B-n1": "2 µA", "s65B-i1": "2", "s65B-d1": "1",
        "s65B-n2": "0.5 µA", "s65B-i2": "0.5", "s65B-d2": "-1",
        "s65B-n3": "I3", "s65B-i3": "", "s65B-d3": "1"
      },
      selects: {
        "s65A-u1": "1e-6", "s65A-u2": "1e-6", "s65A-u3": "1e-6",
        "s65B-u1": "1e-6", "s65B-u2": "1e-6", "s65B-u3": "1e-6"
      },
      click: "btn-s65",
      desc: "Prob. 19.b — Puente de piranómetro / nA–µA.\nI2 = 6−2 = 4.00 µA. I3 = 0.50−2 = −1.50 µA (1.50 µA hacia la izquierda).\nI4 = 4−(−1.5) = 5.50 µA. I1 = 6.00 µA (sale lo que entra)."
    },
    p20: {
      parallel: { prefix: "s64", rows: [
        { name: "R1", r: "" }, { name: "R2 4 kΩ", r: "4", ru: "1e3" }, { name: "R3 faltante", r: "" }
      ] },
      fields: { "s64-i": "9" },
      selects: { "s64-i-u": "0.001" },
      desc: "Prob. 20 — 9 mA de un rack, 5 mA tras R1, 2 mA tras R2 = 4 kΩ.\nIR1 = 4 mA, IR2 = 3 mA, IR3 = 2 mA.\nE = 3 mA · 4 kΩ = 12.0 V. R1 = 3.00 kΩ, R3 = 6.00 kΩ, RT = 1.33 kΩ.\nAbre Sec 6.4 y carga R2 = 4 kΩ, E = 12 V para ver el paralelo."
    },
    p21a: {
      parallel: { prefix: "s64", rows: [
        { name: "R1", r: "", i: "2" }, { name: "R2 faltante", r: "" }
      ] },
      fields: { "s64-e": "10", "s64-i": "3" },
      click: "btn-s64",
      desc: "Prob. 21.a — 10 V, Is = 3 A, 2 A por R1 (el resto por R2).\nR1 = 5.00 Ω, R2 = 10.0 Ω."
    },
    p21b: {
      parallel: { prefix: "s64", rows: [
        { name: "6 Ω", r: "6", i: "2" }, { name: "9 Ω", r: "9" }, { name: "R (12 W)", r: "", p: "12" }
      ] },
      fields: { "s64-e": "" },
      click: "btn-s64",
      desc: "Prob. 21.b — 2 A en 6 Ω → E = 12 V. I9 = 1.33 A. P = 12 W → IR = 1.00 A, R = 12.0 Ω.\nIT = 4.33 A, RT = 2.77 Ω."
    },
    p21c: {
      parallel: { prefix: "s64", rows: [
        { name: "1 kΩ", r: "1", ru: "1e3" }, { name: "R", r: "" }, { name: "4 kΩ", r: "4", ru: "1e3" }
      ] },
      fields: { "s64-e": "64", "s64-i": "100" },
      selects: { "s64-i-u": "0.001" },
      click: "btn-s64",
      desc: "Prob. 21.c — 64 V, Is = 100 mA (inversores / tres ramas).\nI1 = 64 mA, I3 = 16 mA, IR = 20 mA → R = 3.20 kΩ."
    },
    p21d: {
      parallel: { prefix: "s64", rows: [
        { name: "30 Ω (30 W)", r: "30", p: "30" },
        { name: "R2", r: "" },
        { name: "R3=R2", r: "" }
      ] },
      fields: { "s64-i": "2" },
      click: "btn-s64",
      desc: "Prob. 21.d — 30 W en 30 Ω → I1 = 1.00 A, E = 30 V. Quedan 1 A para R2 = R3 → 0.500 A c/u.\nR2 = R3 = 60.0 Ω, PR2 = 15.0 W."
    }
  },
  "6-6": {
    p22: {
      parallel: { prefix: "s66", rows: [
        { name: "4 Ω", r: "4", i: "6" }, { name: "12 Ω", r: "12" },
        { name: "2 Ω", r: "2" }, { name: "40 Ω", r: "40" }
      ] },
      click: "btn-s66",
      desc: "Prob. 22 — Divisor por razones (cuatro lastres).\nI1/I2 = 12/4 = 3 → I2 = 2.00 A. I3 = 12.0 A. I4 = 0.600 A.\nIT = 20.6 A. V = 24.0 V."
    },
    p23a: {
      parallel: { prefix: "s66", rows: [
        { name: "6 Ω", r: "6" }, { name: "3 Ω", r: "3" }
      ] },
      fields: { "s66-i": "12" },
      click: "btn-s66",
      desc: "Prob. 23.a — 12 A a 6 Ω || 3 Ω (dos strings / dos dumps).\nI1 = 12·3/9 = 4.00 A. I2 = 8.00 A."
    },
    p23b: {
      parallel: { prefix: "s66", rows: [
        { name: "8||8", r: "4" }, { name: "6||6||6", r: "2" }
      ] },
      fields: { "s66-i": "6" },
      click: "btn-s66",
      desc: "Prob. 23.b — 6 A a (8||8) frente a (6||6||6).\nReq izq = 4 Ω, der = 2 Ω. I1 = 2.00 A (1.00 A por cada 8 Ω). I2 = 4.00 A (1.33 A por cada 6 Ω)."
    },
    p23c: {
      parallel: { prefix: "s66", rows: [
        { name: "1 Ω", r: "1" }, { name: "2||3", r: "1.2" }
      ] },
      fields: { "s66-i": "500" },
      selects: { "s66-i-u": "0.001" },
      click: "btn-s66",
      desc: "Prob. 23.c — 500 mA, 1 Ω || (2||3 = 1.2 Ω).\nI1 = 273 mA. I(2||3) = 227 mA → I2 = 136 mA, I3 = 90.9 mA. I4 = 500 mA."
    },
    p23d: {
      desc: "Prob. 23.d — Puente 4 Ω / 12 Ω / 18 Ω con I1 = 4 A en la rama inferior derecha.\nSin la cuarta R el puente no cierra en números; con LCK en el nudo derecho I3 = I12Ω + 4 A.\nSi el puente está equilibrado (4/12 = 18/R) entonces R = 54 Ω y la diagonal no lleva corriente."
    },
    p24: {
      parallel: { prefix: "s66", rows: [
        { name: "1 Ω", r: "1" }, { name: "10 Ω", r: "10" },
        { name: "1 kΩ", r: "1", ru: "1e3" }, { name: "100 kΩ", r: "100", ru: "1e3" }
      ] },
      fields: { "s66-i": "10" },
      click: "btn-s66",
      desc: "Prob. 24 — 10 A a 1 || 10 || 1 k || 100 kΩ (un string grueso y tres bleeder).\na) I1 ≈ 10 A (la de 1 Ω se lleva casi todo).\nb) I1/I2 = 10, I3/I4 = 100.\nc) I2/I3 = 100, I1/I4 = 100000.\nd) I1 = 9.09 A (cerca de 10).\ne) I4 = 90.9 µA; I1/I4 = 1.00×10^5, coincide con (c)."
    },
    p25a: {
      parallel: { prefix: "s66", rows: [
        { name: "2 Ω", r: "2" }, { name: "6 Ω", r: "6", i: "1" }
      ] },
      click: "btn-s66",
      desc: "Prob. 25.a — 1 A en 6 Ω → V = 6 V, I1 = 3.00 A, I = I2 = 4.00 A."
    },
    p25b: {
      parallel: { prefix: "s66", rows: [
        { name: "2+9 Ω", r: "2", rs: "9" }, { name: "R", r: "" }, { name: "9 Ω", r: "9" }
      ] },
      fields: { "s66-i": "6" },
      selects: { "s66-i-u": "1e-6" },
      desc: "Prob. 25.b — 6 µA, 2 µA por la rama 2+9 Ω.\nV = 2 µA · 11 Ω = 22 µV. I9 = 2.44 µA. I_R = 1.56 µA → R = 14.1 Ω."
    },
    p26: {
      parallel: { prefix: "s66", rows: [
        { name: "2.2 kΩ", r: "2.2", ru: "1e3" }, { name: "R", r: "" }
      ] },
      fields: { "s66-i": "60" },
      selects: { "s66-i-u": "0.001" },
      desc: "Prob. 26 — 60 mA, I1 = 3 I2, 2.2 kΩ || R.\nI2 = 15 mA, I1 = 45 mA. R = 3·2.2 kΩ = 6.60 kΩ (la de más R lleva menos I)."
    },
    p27: {
      fields: { "s66d-e": "24", "s66d-i": "68", "s66d-a": "4", "s66d-b": "3" },
      selects: { "s66d-i-u": "0.001" },
      click: "btn-s66d",
      desc: "Prob. 27 — Diseñar 24 V, 68 mA, I2 = 4 I1, I3 = 3 I2.\nI1 = 4.00 mA, I2 = 16.0 mA, I3 = 48.0 mA.\nR1 = 6.00 kΩ, R2 = 1.50 kΩ, R3 = 500 Ω."
    }
  },
  "6-7": {
    p28: {
      fields: { "s67-e": "12", "s67-n": "2", "s67-r1": "8", "s67-r2": "56" },
      click: "btn-s67",
      desc: "Prob. 28 — Dos racks / bancos de 12 V idénticos, 8 Ω || 56 Ω.\nRT = 7.00 Ω, IT = 1.71 A. Cada fuente 0.857 A. I2 (al lastre) = 1.71 A."
    },
    p29: {
      fields: { "s67-e": "16", "s67-n": "2", "s67-r1": "8", "s67-r2": "", "s67-it": "10" },
      click: "btn-s67",
      desc: "Prob. 29 — Dos fuentes 16 V idénticas, 5 A cada una (IT = 10 A), 8 Ω || R.\nI8 = 2.00 A → IR = 8.00 A → R = 2.00 Ω. I (por R, hacia la izquierda) = 8.00 A."
    }
  },
  "6-8": {
    p30a: {
      fields: { "s68-e": "12", "s68-rs": "100", "s68-rl": "10" },
      selects: { "s68-mode": "normal", "s68-rl-u": "1e3" },
      click: "btn-s68",
      desc: "Prob. 30.a — 12 V, Rs = 100 Ω (feeder), RL = 10 kΩ (logger).\nIs = 1.19 mA, VL = 11.9 V."
    },
    p30b: {
      fields: { "s68-e": "12", "s68-rs": "100", "s68-rl": "10" },
      selects: { "s68-mode": "short", "s68-rl-u": "1e3" },
      click: "btn-s68",
      desc: "Prob. 30.b — RL en corto (falla en el ramal).\nIs = 12/100 = 120 mA. VL = 0."
    },
    p30c: {
      fields: { "s68-e": "12", "s68-rs": "100", "s68-rl": "10" },
      selects: { "s68-mode": "open", "s68-rl-u": "1e3" },
      click: "btn-s68",
      desc: "Prob. 30.c — RL abierto (MC4 / seccionador).\nIs = 0, VL = 12.0 V."
    },
    p31a: {
      desc: "Prob. 31.a — 9 V, 2.2 kΩ serie, 4.7 kΩ shunt, 3.3 kΩ hacia VL abierto.\nI(3.3 k) = 0. VL = 9·4.7/(2.2+4.7) = 6.13 V."
    },
    p31b: {
      desc: "Prob. 31.b — El 2.2 kΩ en corto: el shunt ve 9 V. VL (abierto) = 9.00 V."
    },
    p31c: {
      desc: "Prob. 31.c — 4.7 kΩ abierto: no hay corriente. VL = 9.00 V (el 3.3 kΩ cuelga, sin I)."
    },
    p32: {
      desc: "Prob. 32 — 20 V, 6 Ω en corto (I1), 4 Ω serie a la izquierda; 10 Ω en corto (I2), 5 Ω de retorno.\nI1 = 20/4 = 5.00 A, V1 = 0. I2 = 20/5 = 4.00 A, V2 = 0.\nIs = 5+4 = 9.00 A (falla doble en un bus de 20 V: Icc de planta)."
    },
    p33a: {
      fields: { "s69-e": "6", "s69-r1": "10", "s69-r2": "20" },
      selects: { "s69-r1-u": "1e3", "s69-r2-u": "1e3" },
      click: "btn-s69",
      desc: "Prob. 33.a — Divisor 6 V, 10 k || 20 k (tap de un rail de sensor). V2 = 4.00 V."
    },
    p33b: {
      fields: { "s69-e": "6", "s69-r1": "10", "s69-r2": "20", "s69-rm": "11e6" },
      selects: { "s69-r1-u": "1e3", "s69-r2-u": "1e3" },
      click: "btn-s69",
      desc: "Prob. 33.b — DMM de 11 MΩ. V2 = 4.00 V (carga despreciable)."
    },
    p33c: {
      fields: { "s69-e": "6", "s69-r1": "10", "s69-r2": "20", "s69-ohv": "20000", "s69-sc": "10" },
      selects: { "s69-r1-u": "1e3", "s69-r2-u": "1e3" },
      click: "btn-s69",
      desc: "Prob. 33.c — VOM 20 kΩ/V, escala 10 V → Rm = 200 kΩ. V2 = 3.87 V."
    },
    p33d: {
      fields: { "s69-e": "6", "s69-r1": "100", "s69-r2": "200", "s69-rm": "11e6", "s69-ohv": "20000", "s69-sc": "10" },
      selects: { "s69-r1-u": "1e3", "s69-r2-u": "1e3" },
      click: "btn-s69",
      desc: "Prob. 33.d — R1 = 100 kΩ, R2 = 200 kΩ. DMM: 3.98 V. VOM: 3.00 V (carga grave)."
    },
    p33e: {
      desc: "Prob. 33.e — Un voltímetro de baja Rm carga el divisor (peor si las R de planta son altas: bleeder ISO, PT de 1500 Vcc). En 2026 se usa DMM / sonda de 10 MΩ o más, nunca un VOM de 20 kΩ/V en un rail de medida."
    },
    p34: {
      fields: {
        "s610-e": "6", "s610-im": "3.5", "s610-vm": "6",
        "s610-n1": "6 kΩ", "s610-r1": "6",
        "s610-n2": "3 kΩ", "s610-r2": "3",
        "s610-n3": "4 kΩ", "s610-r3": "4"
      },
      click: "btn-s610",
      desc: "Prob. 34 — 6 V, 6 || 3 || 4 kΩ. I esperada = 4.50 mA; medida 3.50 mA; V = 6 V.\nCoincide con el 6 kΩ abierto (3k||4k = 1.71 kΩ → 3.50 mA). El string / bleeder de 6 kΩ está fuera."
    },
    p35: {
      fields: { "s611-vl": "12", "s611-vr": "4", "s611-rl": "1", "s611-rr": "4", "s611-va": "8.8" },
      selects: { "s611-rl-u": "1e3", "s611-rr-u": "1e3" },
      click: "btn-s611",
      desc: "Prob. 35 — 12 V — 1 kΩ — a — 4 kΩ — 4 V. Va correcto = 10.4 V, no 8.8 V.\n8.8 V es el nudo con la fuente de 4 V invertida. El banco / módulo de 4 V está al revés."
    },
    p36a: {
      fields: { "s611-vl": "20", "s611-vr": "-4", "s611-rl": "7", "s611-rr": "1", "s611-va": "20" },
      selects: { "s611-rl-u": "1e3", "s611-rr-u": "1e3" },
      click: "btn-s611",
      desc: "Prob. 36.a — +20 V — 4k+3k — a — 1 kΩ — (−4 V). Va sano = −1.00 V.\nSi salta a +20 V, el camino a −4 V abrió (1 kΩ / conector / fusible): a se queda en el rail de +20 V."
    },
    p36b: {
      fields: { "s611-vl": "20", "s611-vr": "4", "s611-rl": "7", "s611-rr": "1", "s611-va": "6" },
      selects: { "s611-rl-u": "1e3", "s611-rr-u": "1e3" },
      click: "btn-s611",
      desc: "Prob. 36.b — Va = 6 V en vez de −1 V. Cuadra con la fuente de −4 V invertida (ahora +4 V):\nVa = (20·1 + 4·7)/8 = 6.00 V."
    }
  },
  "6-12": {
    p37: {
      desc: "Prob. 37 — Corrientes de la fig. 6.78 (el «PSpice» es el solucionador 6.4 / cargas).\nFocos 5.00 A, lavadora 3.33 A, TV 3.00 A, Is = 11.3 A."
    },
    p38: {
      desc: "Prob. 38 — Incógnitas de la fig. 6.84: solucionador 6.5 / LCK.\nI1 = 25 A, I2 = 23 A, I3 = 20 A (18.a); I1 = 11 A, I2 = 6 A, I3 = 14 A, I4 = 10 A (18.b)."
    },
    p39: {
      desc: "Prob. 39 — «Programa» de RT y GT de N ramas: es el solucionador 6.3 (hasta 6 ramas, N copias, serie dentro de la rama)."
    },
    p40: {
      fields: { "s612-e": "6", "s612-r": "20", "s612-nmin": "1", "s612-nmax": "12" },
      selects: { "s612-r-u": "1e3" },
      click: "btn-s612",
      desc: "Prob. 40 — Barrido del VOM: aquí, N strings de 20 kΩ a 6 V (el efecto de carga del 33 al tabular).\nAl subir N, RT baja y Is sube lineal; cada string sigue a 0.300 mA. El VOM de 200 kΩ deja de ser «invisible» cuando RT se acerca a Rm."
    }
  }
});
