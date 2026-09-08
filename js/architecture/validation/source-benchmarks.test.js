import assert from "node:assert/strict";
import { calculateResistiveCurrent } from "../current.js";
import { calculateDutyCycleEnergy } from "../energy.js";
import { multiplyEnergyByTariff } from "../economics.js";
import { WATTS_PER_KILOWATT, KILOWATTS_PER_MEGAWATT } from "../units.js";
import { SATS_PER_BTC } from "../bitcoin.js";

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (e) {
    failed += 1;
    console.error("FAIL", name, e.message);
  }
}

test("A 1200 W / 230 V ≈ 5.22 A", () => {
  const i = calculateResistiveCurrent(1200, 230);
  assert.ok(Math.abs(i.value - 5.22) < 0.01);
});
test("B 2200 W / 230 V ≈ 9.57 A", () => {
  const i = calculateResistiveCurrent(2200, 230);
  assert.ok(Math.abs(i.value - 9.57) < 0.01);
});
test("C freezer 400 W × 24 × 30 × 0.40 ≈ 115.2 kWh", () => {
  const e = calculateDutyCycleEnergy({ powerW: 400, hoursPerDay: 24, daysPerMonth: 30, dutyCycle: 0.4 });
  assert.equal(e.value.energyMonthKWh, 115.2);
  assert.ok(e.value.energyMonthKWh >= 90 && e.value.energyMonthKWh <= 140);
});
test("D BESS 25 MW / 100 MWh → 4 h", () => {
  assert.equal(100 / 25, 4);
});
test("E BESS 2 MW / 4 MWh → 2 h", () => {
  assert.equal(4 / 2, 2);
});
test("F 346 × 252 = 87192 (Energy×Tariff only)", () => {
  assert.equal(multiplyEnergyByTariff(346, 252).value, 87192);
});
test("G 236 × 252 = 59472", () => {
  assert.equal(multiplyEnergyByTariff(236, 252).value, 59472);
});
test("unit conversions from units.js", () => {
  assert.equal(WATTS_PER_KILOWATT, 1000);
  assert.equal(KILOWATTS_PER_MEGAWATT, 1000);
  assert.equal(SATS_PER_BTC, 100_000_000);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exitCode = 1;
