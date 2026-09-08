import assert from "node:assert/strict";
import { architectureTemplates } from "./templates.js";
import { COUNTRIES, ENVIRONMENTS, FAMILIES, ARCHETYPES } from "./template-constants.js";
import { validateTemplateViability } from "./template-viability.js";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${name}\n      ${err.message}`);
  }
}

const FORBIDDEN = /snocomm|autocad|\.dwg|\/users\/|andreibarwood|saesa|\bsec\b|calama|parinacota/i;

test("templates.length >= 96", () => {
  assert.ok(architectureTemplates.length >= 96, String(architectureTemplates.length));
});

test("all IDs unique, ASCII, no spaces", () => {
  const ids = architectureTemplates.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    assert.match(id, /^[A-Z0-9-]+$/);
  }
});

test("all conceptual === true", () => {
  for (const t of architectureTemplates) assert.equal(t.conceptual, true);
});

test("family, archetype, country, environment valid", () => {
  for (const t of architectureTemplates) {
    assert.ok(FAMILIES.includes(t.family), t.id);
    assert.ok(ARCHETYPES[t.archetype], t.id);
    assert.ok(COUNTRIES[t.country], t.id);
    assert.ok(ENVIRONMENTS[t.environment.code], t.id);
  }
});

test("economics.btcPerKWh === null", () => {
  for (const t of architectureTemplates) {
    assert.equal(t.economics.btcPerKWh, null, t.id);
  }
});

test("no negative power/energy; PF, efficiency, factors in range", () => {
  for (const t of architectureTemplates) {
    const lp = t.loadProfile;
    assert.ok(lp.peakLoadMW >= 0, t.id);
    assert.ok(lp.loadFactor >= 0 && lp.loadFactor <= 1, t.id);
    if (t.generation.pv) {
      assert.ok(t.generation.pv.dcMWp >= 0, t.id);
      assert.ok(t.generation.pv.acMW >= 0, t.id);
      assert.ok(t.generation.pv.acMW <= t.generation.pv.dcMWp + 1e-9, t.id);
      if (t.generation.pv.capacityFactor != null) {
        assert.ok(t.generation.pv.capacityFactor >= 0 && t.generation.pv.capacityFactor <= 1, t.id);
      }
    }
    if (t.bess.enabled) {
      assert.ok(t.bess.powerMW > 0, t.id);
      assert.ok(t.bess.energyMWh >= 0, t.id);
      const d = t.bess.energyMWh / t.bess.powerMW;
      assert.ok(Math.abs(d - t.bess.durationHours) < 0.06, t.id);
      assert.ok(t.bess.roundTripEfficiency > 0 && t.bess.roundTripEfficiency <= 1, t.id);
    }
    if (t.substation.enabled && t.substation.powerFactor != null) {
      assert.ok(t.substation.powerFactor > 0 && t.substation.powerFactor <= 1, t.id);
    }
    if (t.substation.redundancyMode === "N-1") {
      assert.ok(t.substation.transformerCount >= 2, t.id);
    }
  }
});

test("viability engine accepts every stored template", () => {
  for (const t of architectureTemplates) {
    const v = validateTemplateViability(t);
    assert.equal(v.ok, true, `${t.id} ${JSON.stringify(v.errors)}`);
  }
});

test("privacy: no forbidden tokens in templates", () => {
  const blob = JSON.stringify(architectureTemplates);
  assert.equal(FORBIDDEN.test(blob), false);
});

test("families each have at least 32", () => {
  const g = architectureTemplates.filter((t) => t.family === "G").length;
  const s = architectureTemplates.filter((t) => t.family === "S").length;
  const h = architectureTemplates.filter((t) => t.family === "H").length;
  assert.ok(g >= 32, `G ${g}`);
  assert.ok(s >= 32, `S ${s}`);
  assert.ok(h >= 32, `H ${h}`);
});

test("no country monopolizes the set", () => {
  const counts = {};
  for (const t of architectureTemplates) counts[t.country] = (counts[t.country] || 0) + 1;
  const max = Math.max(...Object.values(counts));
  assert.ok(max <= 12, `max country count ${max}`);
  assert.ok(Object.keys(counts).length >= 20, "too few countries");
});

test("featured between 12 and 16 inclusive is preferred but at least 12", () => {
  const n = architectureTemplates.filter((t) => t.featured).length;
  assert.ok(n >= 12, `featured ${n}`);
});

test("24 common-case starters exist, unique, viable, kW-to-low-MW", () => {
  const common = architectureTemplates.filter((t) => t.commonCase === true);
  assert.equal(common.length, 24);
  const ids = new Set(common.map((t) => t.id));
  assert.equal(ids.size, 24);
  for (const t of common) {
    assert.match(t.id, /-C\d{2}$/);
    assert.equal(t.conceptual, true);
    assert.equal(t.featured, false);
    assert.ok(t.loadProfile.peakLoadMW <= 0.5, t.id);
    const v = validateTemplateViability(t);
    assert.equal(v.ok, true, `${t.id} ${JSON.stringify(v.errors)}`);
  }
});

test("scale diversity", () => {
  const bands = new Set(architectureTemplates.map((t) => t.loadProfile.scaleBand));
  assert.ok(bands.size >= 5, [...bands].join(","));
});

console.log(`\n${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed) process.exitCode = 1;
