/**
 * Tests del motor de consumo. Ejecutar:
 *   node js/architecture/calculator.test.js
 */

import assert from "node:assert/strict";
import {
  calculateResistiveCurrent,
  calculateSinglePhaseCurrent,
  scaleCurrentForVoltage,
  compareCurrentsAtVoltages,
  calculateContinuousEnergy,
  calculateDutyCycleEnergy,
  calculateCycleEnergy,
  calculateCycleEnergyFromPower,
  calculateStandbyEnergy,
  calculateLoadEnergy,
  compareEnergyToReference,
  calculateSeason,
  connectedPower,
  serviceMarginKW,
  evaluateScenario,
  evaluateTransientEvent,
  calculateDutyCycle,
  evaluateDutyCycle,
  evaluateCycling,
  calculateInrushRatio,
  evaluateInrush,
  compareCurrentToReference,
  summarizeInstallation,
  LOAD_STATES,
  SERVICE_STATUS,
  ENERGY_COMPARE,
  CURRENT_BAND,
  selectLoads,
} from "./calculator.js";
import {
  installationProfile,
  referenceLoads,
  getLoadById,
} from "./reference-loads.js";

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    failures.push({ name, message: err.message });
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

function approx(actual, expected, eps, label) {
  assert.ok(
    Math.abs(actual - expected) <= eps,
    `${label}: expected ${expected} ± ${eps}, got ${actual}`
  );
}

function isFiniteResult(result, label) {
  assert.equal(result.ok, true, `${label} should succeed`);
  const v = result.value;
  const nums = typeof v === "number" ? [v] : [];
  if (v && typeof v === "object") {
    for (const x of Object.values(v)) {
      if (typeof x === "number") nums.push(x);
    }
  }
  for (const n of nums) {
    assert.ok(Number.isFinite(n), `${label} leaked non-finite ${n}`);
  }
}

// --- A nevera ---
test("A fridge duty-cycle energy is 37.8 kWh, within 28–38", () => {
  const e = calculateDutyCycleEnergy({
    powerW: 150,
    hoursPerDay: 24,
    daysPerMonth: 30,
    dutyCycle: 0.35,
  });
  isFiniteResult(e, "fridge energy");
  approx(e.value.energyMonthKWh, 37.8, 1e-9, "fridge month");
  const cmp = compareEnergyToReference(e.value.energyMonthKWh, {
    min: 28,
    reference: 32,
    max: 38,
  });
  assert.equal(cmp.value.status, ENERGY_COMPARE.WITHIN);
  const naive = 0.15 * 24 * 30;
  assert.ok(naive > 100, "naive 24h must not be used as monthly energy");
  assert.ok(Math.abs(naive - e.value.energyMonthKWh) > 50);
});

test("A fridge preset uses duty cycle, not 24 h full load", () => {
  const fridge = getLoadById("fridge-domestic");
  const row = calculateLoadEnergy(fridge, { daysPerMonth: 30 });
  assert.equal(row.ok, true);
  assert.equal(row.value.method, "dutyCycle");
  approx(row.value.calculated.energyMonthKWh, 37.8, 1e-9, "preset fridge");
  assert.equal(row.value.comparison.status, ENERGY_COMPARE.WITHIN);
  assert.equal(row.value.reference.reference, 32);
});

// --- B freezer ---
test("B freezer 400 W × 24 × 30 × 0.40 = 115.2 kWh within 90–140", () => {
  const e = calculateDutyCycleEnergy({
    powerW: 400,
    hoursPerDay: 24,
    daysPerMonth: 30,
    dutyCycle: 0.4,
  });
  approx(e.value.energyMonthKWh, 115.2, 1e-9, "freezer");
  const cmp = compareEnergyToReference(115.2, { min: 90, reference: 120, max: 140 });
  assert.equal(cmp.value.status, ENERGY_COMPARE.WITHIN);
});

// --- C calefactor 1200 W ---
test("C heater 1200 W / 230 V ≈ 5.22 A", () => {
  const i = calculateResistiveCurrent(1200, 230);
  isFiniteResult(i, "heater I");
  approx(i.value, 1200 / 230, 1e-12, "exact");
  approx(i.value, 5.22, 0.005, "document 5.22");
});

// --- D horno ---
test("D oven 2200 W / 230 V ≈ 9.57 A", () => {
  const i = calculateResistiveCurrent(2200, 230);
  approx(i.value, 9.565217, 0.001, "9.57");
  approx(i.value, 9.6, 0.04, "document 9.6");
});

// --- 220 / 230 ---
test("voltage correction is P/V, not a hardcoded 4.5%", () => {
  const pair = compareCurrentsAtVoltages(1200, 230, 220);
  assert.equal(pair.ok, true);
  approx(pair.value.currentAtA, 1200 / 230, 1e-12, "230");
  approx(pair.value.currentAtB, 1200 / 220, 1e-12, "220");
  approx(pair.value.percentDifference, (230 / 220 - 1) * 100, 1e-9, "pct");
  const scaled = scaleCurrentForVoltage(1200 / 230, 230, 220);
  approx(scaled.value, 1200 / 220, 1e-12, "scale");
});

// --- E F G instalación ---
test("G winter central reference 346 kWh is preserved on the profile", () => {
  assert.equal(installationProfile.seasonalEnergyKWh.winter.reference, 346);
  assert.equal(installationProfile.seasonalEnergyKWh.winter.min, 270);
  assert.equal(installationProfile.seasonalEnergyKWh.winter.max, 420);
  assert.equal(installationProfile.seasonalEnergyKWh.summer.reference, 236);
  assert.equal(installationProfile.seasonalEnergyKWh.summer.min, 170);
  assert.equal(installationProfile.seasonalEnergyKWh.summer.max, 260);
});

test("E winter calculated sum falls in 270–420 kWh empirical range", () => {
  const sum = summarizeInstallation({
    loads: referenceLoads,
    installation: installationProfile,
    season: "winter",
    voltageV: 230,
  });
  assert.equal(sum.ok, true);
  const calc = sum.value.monthlyEnergyKWh.calculated;
  assert.ok(calc >= 270 && calc <= 420, `winter calc ${calc} outside 270–420`);
  assert.equal(sum.value.monthlyEnergyKWh.reference.reference, 346);
  assert.ok(!sum.value.loadsConsidered.includes("heater-400"));
  assert.ok(!sum.value.loadsConsidered.includes("heater-1200"));
  assert.ok(sum.value.loadsConsidered.includes("heater-800"));
});

test("F summer calculated sum falls in 170–260 and heater is zero", () => {
  const sum = summarizeInstallation({
    loads: referenceLoads,
    installation: installationProfile,
    season: "summer",
    voltageV: 230,
  });
  assert.equal(sum.ok, true);
  const calc = sum.value.monthlyEnergyKWh.calculated;
  assert.ok(calc >= 170 && calc <= 260, `summer calc ${calc} outside 170–260`);
  const heater = sum.value.energyRows.find((r) => r.loadId === "heater-800");
  assert.equal(heater.calculated.energyMonthKWh, 0);
  assert.ok(
    calc <
      summarizeInstallation({
        loads: referenceLoads,
        installation: installationProfile,
        season: "winter",
        voltageV: 230,
      }).value.monthlyEnergyKWh.calculated
  );
});

test("season is never inferred from the calendar", () => {
  const s = calculateSeason("winter");
  assert.equal(s.value.inferredFromCalendar, false);
  const bad = calculateSeason("july");
  assert.equal(bad.ok, false);
});

// --- connected power ---
test("connected power does not duty-cycle and collapses heater positions", () => {
  const raw = connectedPower(referenceLoads, { collapseExclusive: false });
  const collapsed = connectedPower(referenceLoads, {
    collapseExclusive: true,
    exclusiveSelection: { "space-heater": "heater-800" },
  });
  assert.ok(raw.value.connectedPowerW > collapsed.value.connectedPowerW);
  assert.ok(collapsed.value.connectedPowerKW > 6);
  const heaters = selectLoads(referenceLoads, { "space-heater": "heater-1200" });
  assert.equal(heaters.filter((l) => l.mutuallyExclusiveGroup === "space-heater").length, 1);
  assert.equal(heaters.find((l) => l.mutuallyExclusiveGroup === "space-heater").id, "heater-1200");
});

test("0 W connected and current", () => {
  const p = connectedPower([{ id: "x", nominalPowerW: 0, quantity: 1 }]);
  assert.equal(p.value.connectedPowerW, 0);
  const i = calculateResistiveCurrent(0, 230);
  assert.equal(i.value, 0);
});

test("6 kW service margin arithmetic", () => {
  const m = serviceMarginKW(6, 3.4);
  approx(m.value.serviceMarginKW, 2.6, 1e-12, "margin");
  approx(m.value.serviceUsagePercent, 3.4 / 6 * 100, 1e-9, "usage");
  assert.equal(m.value.status, SERVICE_STATUS.OK);
  assert.equal(m.value.protectionTripClaimed, false);
  const over = serviceMarginKW(6, 6.2);
  assert.equal(over.value.status, SERVICE_STATUS.OVERLOAD);
  assert.equal(over.value.protectionTripClaimed, false);
});

// --- inrush not energy ---
test("inrush ratio and DOL band; inrush is not kWh", () => {
  const ratio = calculateInrushRatio(15, 2.4);
  approx(ratio.value, 15 / 2.4, 1e-12, "gate ratio");
  const ev = evaluateInrush(ratio.value, { durationSeconds: 0.5 });
  assert.equal(ev.value.band, CURRENT_BAND.NORMAL);
  assert.equal(ev.value.protectionTripClaimed, false);
  const high = evaluateInrush(12, { durationSeconds: 1.5 });
  assert.equal(high.value.band, CURRENT_BAND.HIGH);
  assert.equal(high.value.durationBand, CURRENT_BAND.WARNING);
  const evt = evaluateTransientEvent({
    voltageV: 230,
    serviceLimitKW: 6,
    running: [
      { load: getLoadById("heater-1200") },
      { load: getLoadById("oven-electric") },
    ],
    starting: [{ load: getLoadById("freezer-storage") }],
  });
  assert.equal(evt.ok, true);
  assert.equal(evt.value.inrushConvertedToMonthlyKWh, 0);
  assert.ok(evt.value.transientCurrentA > evt.value.baseRunningCurrentA);
  assert.equal(evt.value.protectionTripClaimed, false);
});

test("simultaneity snapshot heater+oven running, freezer starting", () => {
  const sc = evaluateScenario({
    loads: referenceLoads,
    voltageV: 230,
    serviceLimitKW: 6,
    exclusiveSelection: { "space-heater": "heater-1200" },
    states: {
      "heater-1200": LOAD_STATES.RUNNING,
      "oven-electric": LOAD_STATES.RUNNING,
      "freezer-storage": LOAD_STATES.STARTING,
    },
  });
  assert.equal(sc.ok, true);
  assert.ok(sc.value.steadyStatePowerKW > 3);
  assert.ok(sc.value.steadyStatePowerKW < 4);
  assert.ok(sc.value.peakTransientCurrentA > sc.value.steadyStateCurrentA);
  assert.ok(sc.value.remainingServiceMarginKW > 0);
});

// --- diagnostics ---
test("current deviation ±10 % / ±15 %", () => {
  const n = compareCurrentToReference({
    measuredA: 5.22,
    expectedA: 1200 / 230,
    documentRange: { min: 5.0, max: 5.5 },
  });
  assert.equal(n.value.status, CURRENT_BAND.NORMAL);
  const w = compareCurrentToReference({
    measuredA: 1.74 * 1.12,
    expectedA: 1.74,
    documentRange: { min: 1.65, max: 1.85 },
    options: { normalPercent: 10, warningPercent: 15 },
  });
  assert.ok(
    w.value.status === CURRENT_BAND.WARNING || w.value.status === CURRENT_BAND.HIGH
  );
});

test("duty cycle 0, 1, and observation neverStops", () => {
  const z = calculateDutyCycle(0, 3600);
  assert.equal(z.value, 0);
  const one = calculateDutyCycle(3600, 3600);
  assert.equal(one.value, 1);
  const ev = evaluateDutyCycle(0.4, { min: 0.3, max: 0.5 });
  assert.equal(ev.value.status, CURRENT_BAND.NORMAL);
  const stuck = evaluateDutyCycle(1, { min: 0.3, max: 0.5 }, { alwaysOnIsFailure: true });
  assert.equal(stuck.value.reason, "neverStops");
  const cyc = evaluateCycling({
    onTime: 3600,
    offTime: 0,
    observationPeriod: 3600,
    neverStopsAfterSeconds: 45 * 60,
  });
  assert.equal(cyc.value.neverStops, true);
});

test("standby energy from V·I·t", () => {
  const e = calculateStandbyEnergy({
    voltageV: 230,
    currentA: 0.02,
    hours: 24 * 30,
    daysPerMonth: 30,
  });
  approx(e.value.energyMonthKWh, (230 * 0.02 * 24 * 30) / 1000, 1e-9, "gate standby");
});

test("dishwasher cycle energy uses kWh/cycle, not inrush", () => {
  const e = calculateCycleEnergy({
    cyclesPerMonth: 14,
    energyPerCycleKWh: 1.0,
  });
  assert.equal(e.value.energyMonthKWh, 14);
  const blocked = calculateCycleEnergyFromPower({
    powerW: 2200,
    cycleDurationHours: 1,
    cyclesPerMonth: 10,
    enabled: false,
  });
  assert.equal(blocked.ok, false);
  const oven = calculateCycleEnergyFromPower({
    powerW: 2200,
    cycleDurationHours: 1,
    cyclesPerMonth: 10,
    enabled: true,
  });
  approx(oven.value.energyMonthKWh, 22, 1e-9, "oven approx");
});

test("continuous lighting energy", () => {
  const e = calculateContinuousEnergy({
    powerW: 80,
    hoursPerDay: 4,
    daysPerMonth: 30,
  });
  approx(e.value.energyMonthKWh, 9.6, 1e-9, "LED 4 h");
});

// --- invalid inputs never yield NaN ---
test("rejects negative, NaN, undefined, PF=0, PF>1, duty>1", () => {
  const cases = [
    calculateResistiveCurrent(-10, 230),
    calculateResistiveCurrent(NaN, 230),
    calculateResistiveCurrent(undefined, 230),
    calculateResistiveCurrent(1000, 0),
    calculateSinglePhaseCurrent(1000, 230, 0),
    calculateSinglePhaseCurrent(1000, 230, 1.2),
    calculateSinglePhaseCurrent(1000, 230, undefined),
    calculateDutyCycleEnergy({ powerW: 400, dutyCycle: 1.2, daysPerMonth: 30 }),
    calculateDutyCycleEnergy({ powerW: 400, dutyCycle: -0.1, daysPerMonth: 30 }),
    calculateInrushRatio(10, 0),
    serviceMarginKW(6, NaN),
    scaleCurrentForVoltage(1, 230, 0),
  ];
  for (const r of cases) {
    assert.equal(r.ok, false, `expected failure, got ${JSON.stringify(r)}`);
    assert.equal(r.value, null);
    assert.ok(r.error && r.error.code);
  }
});

test("Infinity is rejected", () => {
  const r = calculateResistiveCurrent(Infinity, 230);
  assert.equal(r.ok, false);
  assert.equal(r.value, null);
});

test("single-phase with PF=1 matches resistive", () => {
  const a = calculateResistiveCurrent(2200, 230);
  const b = calculateSinglePhaseCurrent(2200, 230, 1);
  approx(a.value, b.value, 1e-12, "PF=1");
});

console.log(
  `\n${passed} passed, ${failed} failed, ${passed + failed} total`
);
if (failures.length) {
  process.exitCode = 1;
}
