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
  initMiniCalc();
});

function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and contents
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Add active to clicked tab and corresponding content
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
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

function formatScientific(num) {
  if (num === 0) return "0";
  return num.toExponential(4).replace('e', ' × 10^').replace('+', '');
}

function formatEngineering(num) {
  if (num === 0) return "0";
  let exp = Math.floor(Math.log10(Math.abs(num)));
  // Adjust exponent to be a multiple of 3
  let engExp = Math.floor(exp / 3) * 3;
  let mantissa = num / Math.pow(10, engExp);
  
  // Format precisely to avoid float rounding artifacts
  let formattedMantissa = Number(mantissa.toPrecision(5)).toString();
  return `${formattedMantissa} × 10^${engExp}`;
}

// --- Section 1.6: Potencias de Diez ---
function initSec1_6() {
  const btnConvert = document.getElementById('btn-convert-1-6');
  if (btnConvert) {
    btnConvert.addEventListener('click', () => {
      try {
        const val = parseNumberInput(document.getElementById('num-1-6').value);
        document.getElementById('sci-1-6').innerText = formatScientific(val);
        document.getElementById('eng-1-6').innerText = formatEngineering(val);
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
        let proc = `${formatScientific(op1)} ${operator} ${formatScientific(op2)}\n`;

        if (operator === '+') {
          res = op1 + op2;
          proc += `Suma directa de valores: ${op1} + ${op2} = ${res}`;
        } else if (operator === '-') {
          res = op1 - op2;
          proc += `Resta directa de valores: ${op1} - ${op2} = ${res}`;
        } else if (operator === '*') {
          res = op1 * op2;
          const exp1 = Math.floor(Math.log10(Math.abs(op1||1)));
          const exp2 = Math.floor(Math.log10(Math.abs(op2||1)));
          proc += `Multiplicación: Se multiplican las bases y se suman los exponentes.\n(aprox) 10^${exp1} * 10^${exp2} -> exponentes: ${exp1} + ${exp2}`;
        } else if (operator === '/') {
          if (op2 === 0) throw new Error("Indeterminado (División por cero)");
          res = op1 / op2;
          const exp1 = Math.floor(Math.log10(Math.abs(op1||1)));
          const exp2 = Math.floor(Math.log10(Math.abs(op2||1)));
          proc += `División: Se dividen las bases y se restan los exponentes.\n(aprox) 10^${exp1} / 10^${exp2} -> exponentes: ${exp1} - (${exp2})`;
        }
        
        document.getElementById('proc-1-6').innerText = proc;
        document.getElementById('final-1-6').innerText = formatEngineering(res);
      } catch (e) {
        document.getElementById('proc-1-6').innerText = e.message;
        document.getElementById('final-1-6').innerText = "-";
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
        
        document.getElementById('res-1-7').innerText = `${formatWithSeparators(res)} (×10^${expTo})`;
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
      document.getElementById('res-1-8').innerText = `${formatWithSeparators(res)} ${to}`;
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
        proc = `Incógnita: Distancia (d)\nFórmula: d = v * t\nCálculo: ${v} * ${t} = ${d}`;
        document.getElementById('kin-d').value = d;
      } else if (isNaN(v) && !isNaN(d) && !isNaN(t)) {
        if (t === 0) { proc = "Indeterminado (t=0)"; }
        else {
          v = d / t;
          proc = `Incógnita: Velocidad (v)\nFórmula: v = d / t\nCálculo: ${d} / ${t} = ${v}`;
          document.getElementById('kin-v').value = v;
        }
      } else if (isNaN(t) && !isNaN(d) && !isNaN(v)) {
        if (v === 0) { proc = "Indeterminado (v=0)"; }
        else {
          t = d / v;
          proc = `Incógnita: Tiempo (t)\nFórmula: t = d / v\nCálculo: ${d} / ${v} = ${t}`;
          document.getElementById('kin-t').value = t;
        }
      } else {
        proc = "Por favor, deja exactamente una incógnita (campo vacío).";
      }
      
      document.getElementById('proc-kin').innerText = proc;
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
      
      document.getElementById('res-1-10').innerText = `${formatWithSeparators(res)} ${unit}`;
    });
  }
}

// --- Section 1.11: Calculadoras ---
function initSec1_11() {
  const dictionaryData = {
    electricidad: [
      { name: "Ley de Ohm (Corriente)", expr: "12 / 100", desc: "I = V / R (Ej: V=12V, R=100Ω)" },
      { name: "Potencia Eléctrica", expr: "12^2 / 100", desc: "P = V^2 / R (Ej: V=12V, R=100Ω)" },
      { name: "Reactancia Inductiva", expr: "2 * pi * 60 * 0.1", desc: "X_L = 2πfL (Ej: f=60Hz, L=0.1H)" },
      { name: "Reactancia Capacitiva", expr: "1 / (2 * pi * 60 * 10^-6)", desc: "X_C = 1 / (2πfC) (Ej: f=60Hz, C=1µF)" },
      { name: "Impedancia RLC", expr: "sqrt(50^2 + (100 - 40)^2)", desc: "Z = √(R^2 + (X_L - X_C)^2)" },
      { name: "Frecuencia de Resonancia", expr: "1 / (2 * pi * sqrt(0.1 * 10^-6))", desc: "f_r = 1 / (2π√(LC))" }
    ],
    matematicas: [
      { name: "Raíz Cuadrada Básica", expr: "sqrt(144)", desc: "√x" },
      { name: "Logaritmo Base 10", expr: "log10(1000)", desc: "log_10(x)" },
      { name: "Ecuación Cuadrática (+)", expr: "(-5 + sqrt(5^2 - 4*1*6)) / (2*1)", desc: "(-b + √(b^2 - 4ac)) / 2a" },
      { name: "Interpolación Lineal", expr: "10 + (20 - 10) * ((15 - 10) / (20 - 10))", desc: "y = y1 + (y2 - y1) * ((x - x1) / (x2 - x1))" }
    ],
    finanzas: [
      { name: "Interés Compuesto", expr: "1000 * (1 + 0.05)^10", desc: "A = P(1 + r)^t (Ej: P=1000, r=5%, t=10)" },
      { name: "Valor Presente", expr: "1500 / (1 + 0.05)^5", desc: "PV = FV / (1 + r)^t" },
      { name: "Cuota de Préstamo (PMT)", expr: "(10000 * 0.05/12) / (1 - (1 + 0.05/12)^-60)", desc: "Cuota mensual (Ej: $10k, 5%, 60m)" }
    ],
    trigonometria: [
      { name: "Teorema de Pitágoras", expr: "sqrt(3^2 + 4^2)", desc: "c = √(a^2 + b^2)" },
      { name: "Seno de un Ángulo (Rad)", expr: "sin(pi / 4)", desc: "sin(θ)" },
      { name: "Coseno de un Ángulo (Rad)", expr: "cos(pi / 3)", desc: "cos(θ)" },
      { name: "Ángulo (Rad a Grados)", expr: "atan(4/3) * (180/pi)", desc: "θ = atan(op / ady) * (180/π)" },
      { name: "Área de un Círculo", expr: "pi * 5^2", desc: "A = πr^2" }
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
        
        document.getElementById('res-1-11').innerText = formatWithSeparators(res);
      } catch (e) {
        document.getElementById('res-1-11').innerText = "Error en la expresión: " + e.message;
      }
    });
  }
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
        
        document.getElementById('mc-res-val').innerText = formatEngineering(res);
      } catch (e) {
        document.getElementById('mc-res-val').innerText = e.message;
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
      const data = presetsData[section][val];
      if (!data) return;
      
      const descEl = document.getElementById(`desc-preset-${section}`);
      if (descEl) {
        descEl.innerText = data.desc;
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
      }
    });
  });
}
