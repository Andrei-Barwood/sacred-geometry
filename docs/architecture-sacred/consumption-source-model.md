# Arquitectura Sagrada — modelo fuente de consumo

Capa de **consumo / diagnóstico**. No es interfaz. No es unifilar. No es generación.

El estudio de ~6 kW gobierna esta capa. Generación, PV, BESS, barras y microred quedan fuera (estudio oasis, fase posterior). La referencia estructural de topología no se lee ni se menciona en producto público.

Estado: 2026-09-03. Sin calculadora visual.

Clases de dato:

| Clase | Significado |
|---|---|
| `DOC` | Literal en el PDF de 6 kW |
| `DOC_RANGE` | Rango empírico publicado |
| `RECON` | Cuenta que reproduce un valor publicado; no lo sustituye |
| `SOFT` | Generalización de software para reutilizar el modelo a otras escalas |
| `OMIT` | Presente en el PDF y prohibido en producto (PII, operador, tarifa local) |

---

## 1. Metodología encontrada

El documento no es un estudio de empalme normativo. Es un **protocolo de pinza True RMS** más una tabla de **valores óptimos de referencia** para una vivienda-granja.

### 1.1 Instalación descrita (`DOC`)

| Campo | Valor |
|---|---|
| Tensión | 220–230 V c.a. |
| Tensión de tabla de corrientes | 230 V |
| Fases | 1 (monofásico) |
| Potencia instalada / límite de servicio | 6 kW |
| Ocupantes de referencia | 2 personas |
| Instrumento | pinza True RMS + función inrush |
| Punto de medida | fase de cada circuito |
| Régimen | leer a los 30–60 s; **no** el pico de arranque |
| Economía | \(C = E \times c\), solo energía, sin cargo fijo |

`c` (tarifa unitaria del analog) es `OMIT`. En software, `energyTariffPerKWh` es **entrada**.

### 1.2 Qué mide el documento

Tres capas distintas, nunca mezcladas:

1. **Placa / nominal** — W del equipo (no es kWh).
2. **Régimen** — A True RMS en marcha, tras 30–60 s.
3. **Energía** — kWh/mes empíricos (rangos + un valor de control).

El arranque (LRA / DOL) es una **cuarta capa**. El PDF lo dice explícito: *«No suman kWh · vigilar I pico y duración»*.

### 1.3 Cómo se relacionan las cifras

- Casi todas las I de régimen resistivas cumplen \(I \approx P/230\) con redondeo de 2 decimales.
- A 220 V el propio PDF pide **incrementar I un 4,5 %**. \(230/220 = 1{,}04545\).
- Todas las celdas \(\mathrm{kWh} \times c\) coinciden exactas. Eso valida \(C = E \times c\), no valida una tarifa pública.
- Los kWh/mes **no** se derivan de una sola fórmula escrita. Hay rangos empíricos y un «valor de control». Cuando rango y reconstrucción discrepan, **gana el rango publicado**.

### 1.4 Agrupación del PDF (no es el modelo de software)

| Grupo P1 | kWh/mes | Notas |
|---|---|---|
| Frío permanente | 120–180 | nevera + freezer |
| Térmicas / ciclo / electrónica (invierno) | 130–200 | calefactor + horno + lavado + TV + notebook |
| Bodega (sin herramientas) | 10–25 | LED + enchufes |
| Arranques | 0 kWh | solo diagnóstico |
| Resumen térmicas (calefactor + horno) | 100–160 invierno | recorte del grupo 2 |
| Resumen ciclo y electrónica | 25–50 | lavado, TV, notebook |
| Bodega + portón | 12–30 | |
| Reserva no listada | 15–40 | no es un equipo |
| **Invierno** | **270–420** | |
| **Verano (sin calefactor)** | **170–260** | |
| Control invierno | **346** | |
| Control verano | **236** | |

El freezer es el «sospechoso principal»: ≈ 30–45 % del total (P1) y ≈ 1/3 (P4).

---

## 2. Modelo de datos

Campos opcionales. Ausencia ≠ cero.

### 2.1 Rango

```text
Range = {
  reference?: number,  // valor de control o de placa
  min?: number,
  max?: number
}
```

Un escalar del PDF se guarda como `{ reference }`. Un rango «0,45–0,80 A» como `{ min, max }`. Si hay ambos (nevera: 0,65 y 0,45–0,80), se llenan los tres.

Duty interno: fracción `0.40` = 40 %. El PDF habla en %.

### 2.2 Carga (`LoadPreset`)

```text
LoadPreset = {
  id: string,
  name: string,                 // genérico, sin marcas
  category: LoadCategory,
  quantity: number,             // default 1; SOFT

  nominalPowerW?: number | Range,
  voltageV: number,             // tensión de tabla; default 230
  phases: 1 | 3,                // default 1

  runCurrentA?: Range,
  offCurrentA?: Range,          // reposo / termostato abierto
  standbyCurrentA?: Range,      // electrónica de control
  inrushCurrentA?: Range,
  inrushDurationSeconds?: Range,

  dutyCycle?: Range,            // 0–1
  usage?: {
    hoursPerDay?: Range,
    hoursPerMonth?: Range,
    cyclesPerMonth?: Range,
    energyPerCycleKWh?: Range,
    cycleDurationSeconds?: Range
  },

  monthlyEnergyKWh?: Range,     // empírico; prioridad sobre E calculada
  season: "summer" | "winter" | "allYear" | "custom",
  seasonalEnergyKWh?: {         // solo si el PDF lo dice
    winter?: Range,
    summer?: Range
  },

  modes?: LoadPreset[],         // subestados (lavado/calor, uso/carga)
  mutuallyExclusiveGroup?: string,

  contributesToEnergy: boolean, // false para inrush-only
  contributesToSteadyDemand: boolean,
  contributesToTransientDemand: boolean,

  diagnostics: string[],        // ids de reglas
  assumptions: string[]
}
```

### 2.3 Categorías (`SOFT`, con anclaje `DOC`)

| category | Qué representa | Anclaje en el PDF |
|---|---|---|
| `resistive` | I estable ≈ P/V | calefactor, horno ON |
| `compressor` | cicla; LRA; duty | nevera, freezer |
| `motor` | DOL 5–8× In | portón, lavadora motor |
| `electronic` | I baja, stand-by | TV, notebook |
| `lighting` | horas/día | LED bodega |
| `thermalCycle` | resistencia + termostato | horno |
| `mixedCycle` | motor + resistencia por fases | lavavajillas, lavadora con calor |
| `standby` | residual de control | stand-by portón, enchufes vacío |
| `other` | reserva, herramientas | «otras no listadas» |

La categoría elige **qué ecuación de energía y qué familia de diagnóstico** se aplican. No cambia el schema.

### 2.4 Perfil de instalación (`SOFT` + valores `DOC` del caso 6 kW)

```text
InstallationProfile = {
  id: string,
  voltageNominalV,
  voltageMinV,
  voltageMaxV,
  phases,
  installedPowerKW,     // placa / contratada
  serviceLimitKW,       // techo de simultaneidad
  occupancy,            // opcional
  energyTariffPerKWh,   // entrada; nunca constante de analog
  daysPerMonth,         // default 30 (RECON del PDF)
  tableVoltageV         // 230 = base de las I publicadas
}
```

`serviceLimitKW ≈ 6` en **este** preset. El campo es un número libre: 10 kW, 100 kW, 1 MW, 25 MW, 100 MVA no exigen otro schema. La capa de red (MVA, barras) vendrá del estudio oasis, no de aquí.

### 2.5 Demanda: dos sumas, nunca una

```text
steadyStateDemandW  = Σ (loads ON en régimen, sin inrush)
transientDemandW    = steadyStateDemandW + Σ (inrush de los que arrancan ahora)
```

`sum(all nameplates)` no es demanda. `sum(inrush)` no es kWh.

---

## 3. Cargas (presets de referencia)

Nombres genéricos. Sin marcas. `quantity = 1` salvo que se diga. `voltageV = 230`, `phases = 1`.

Leyenda de columnas de corriente: ref / min–max, en A.

### 3.1 Nevera doméstica — `fridge-domestic`

| Campo | Valor | Clase |
|---|---|---|
| category | `compressor` | SOFT |
| nominalPowerW | 150 (compresor) | DOC |
| runCurrentA | 0,65 / 0,45–0,80 | DOC |
| offCurrentA | 0,02 / 0,00–0,05 | DOC (P3 medible 0,02; P2 rango 0,00–0,05) |
| inrushCurrentA | 5,5 / 4–7 | DOC |
| inrushDurationSeconds | — / 0–0,3 | DOC «<0,3 s» |
| dutyCycle | 0,35 / 0,25–0,45 | DOC (P3 35 %; P2 25–45 %) |
| monthlyEnergyKWh | 32 / 28–38 | DOC |
| I promedio mensual | — / 0,20–0,30 | DOC |
| season | `allYear` | DOC (no la apaga en verano) |
| inrush → kWh | no | DOC |

Diagnóstico DOC: normal si cicla; sospechoso si I > 1,0 A continua o no corta; duty 30–60 min > 60 % → revisar.

### 3.2 Freezer de bodega — `freezer-storage`

| Campo | Valor | Clase |
|---|---|---|
| category | `compressor` | SOFT |
| nominalPowerW | 400 (rango 350–450) | DOC |
| volumen | ≈ 1,12 m³ | DOC (geometría, no marca) |
| runCurrentA | 1,8 / 1,3–2,2 (P3); placa 1,7–2,0 | DOC |
| offCurrentA | 0 / 0–0 | DOC «debe cortar» |
| I promedio 60 min | 0,75 / 0,50–1,00 | DOC |
| inrushCurrentA | 11 / 8–14 | DOC |
| inrushDurationSeconds | — / 0,1–0,4 | DOC |
| dutyCycle | 0,40 / 0,30–0,50 | DOC; >0,70 anomalía |
| monthlyEnergyKWh | 120 / 90–140; alerta >180 | DOC |
| season | `allYear` | DOC |
| ciclos/h típ. | 3–8 en 60 min | DOC |

Principal sospechoso. Medir ciclo 60 min y °C de bodega. Goma, hielo y carga interna suben I y duty.

### 3.3 Calefactor 400 / 800 / 1 200 W

Un aparato de **tres posiciones** en el PDF. En software: tres presets en `mutuallyExclusiveGroup: "space-heater"`. No sumar las tres a la vez.

Horas: 4–6 h/d invierno, posición media. P1 costea **5 h**. Verano: **0** (el resumen lo dice: «sin calefactor»).

Régimen óptimo resistivo **±5 %** (P2), distinto del ±10 % genérico de pinza (P1/P4). El diagnóstico de equipo usa ±5 %; el criterio transversal de pinza, ±10 %.

#### `heater-400`

| Campo | Valor |
|---|---|
| category | `resistive` |
| nominalPowerW | 400 |
| runCurrentA | 1,74 / 1,65–1,85 |
| season | `winter` |
| usage.hoursPerDay | 5 / 4–6 |
| monthlyEnergyKWh (si se usara 5 h) | RECON 0,4×5×30 = 60; el PDF no publica kWh suelto de pos. 1 |
| coste P1 a 5 h | sí (economía analog `OMIT`) |

#### `heater-800`

| Campo | Valor |
|---|---|
| nominalPowerW | 800 |
| runCurrentA | 3,48 / 3,30–3,65 |
| season | `winter` |
| usage.hoursPerDay | 5 / 4–6 |
| monthlyEnergyKWh control conjunto | 110 / 90–130 (el control 110 es del calefactor, pos. media) |

RECON: \(0{,}8 \times t \times 30 = 110\) ⇒ \(t = 4{,}58\) h/d. P1 a 5 h daría 120 kWh. Ambigüedad: ver §12.

#### `heater-1200`

| Campo | Valor |
|---|---|
| nominalPowerW | 1 200 |
| runCurrentA | 5,22 / 5,00–5,50 |
| season | `winter` |
| nota | «cuidar simultaneidad 6 kW» |
| monthlyEnergyKWh | el rango 90–130 es del calefactor en pos. media, no de 1 200 W a 5 h (eso sería 180 kWh, no publicado como control) |

I baja respecto de la posición ⇒ elemento abierto (`DOC`).

### 3.4 Horno eléctrico — `oven-electric`

| Campo | Valor | Clase |
|---|---|---|
| category | `thermalCycle` | SOFT |
| nominalPowerW | 2 200 | DOC |
| runCurrentA | 9,6 / 8,7–10,5 | DOC |
| offCurrentA | — / 0,00–0,10 | DOC |
| inrush | no aplica; pico <1,1× | DOC |
| usage.cyclesPerMonth | — / 8–12 | DOC |
| cycleDuration | ~1 h | DOC |
| monthlyEnergyKWh | 24 / 18–30 | DOC |
| season | `allYear` | no lo apaga en verano |

Cicla termostato. Sospechoso si I > 11 A o no corta.

### 3.5 Lavavajillas — `dishwasher`

| Campo | Valor |
|---|---|
| category | `mixedCycle` |
| modes | `heat` (2 000 W, 8,7 A, ópt. 8,0–9,6) y `wash` (120–180 W, 0,5–1,2 A; P3 0,8 A) |
| inrushCurrentA (bomba) | — / 2–4 |
| usage.cyclesPerMonth | — / 10–15 |
| energyPerCycleKWh | eco ~1,0 | DOC |
| monthlyEnergyKWh | 14 / 10–18 |
| season | `allYear` |

I alta **solo** en calentamiento. Sospechoso si ~9 A todo el ciclo.

### 3.6 Lavadora — `washer`

| Campo | Valor |
|---|---|
| category | `mixedCycle` (motor; resistencia opcional) |
| nominalPowerW motor | 450 |
| runCurrentA lavado | 2,0 / 1,6–2,4 |
| runCurrentA spin | — / 2,5–3,5 |
| resistencia si calienta | 2 000 W, 8,7 A |
| inrushCurrentA | — / 6–10 DOL |
| usage.cyclesPerMonth | — / 8–12 |
| monthlyEnergyKWh | — / 6–15 (frío / con calor) |
| season | `allYear` |

I > 3,5 A en lavado o bloqueo = anomalía mecánica.

### 3.7 Televisor LED — `tv-led`

| Campo | Valor |
|---|---|
| category | `electronic` |
| nominalPowerW | 80 ON; <1 stand-by |
| runCurrentA | 0,35 / 0,25–0,45 |
| standbyCurrentA | — / 0–0,01 |
| monthlyEnergyKWh | — / 8–15; stand-by <0,8 |
| season | `allYear` |

Sospechoso: I > 0,60 A ON o stand-by > 0,05 A.

### 3.8 Notebook / cargador — `notebook-charger`

Sin nombre comercial.

| Campo | Valor |
|---|---|
| category | `electronic` |
| modes | `use` 10–15 W, 0,04–0,07 A; `charge` 30 W, 0,13–0,20 A (ópt. 0,10–0,22) |
| monthlyEnergyKWh | — / 3–7 (uso + carga) |
| season | `allYear` |

P3 resume 0,05 / 0,18 A. Sospechoso: I > 0,35 A en carga.

TV + notebook simultáneos (P3): 0,50 A medible, ópt. 0,30–0,70 A. Es una **coincidencia de régimen**, no un preset extra.

### 3.9 Iluminación bodega — `storage-lighting`

| Campo | Valor |
|---|---|
| category | `lighting` |
| nominalPowerW | 80 típ. / 60–100 |
| runCurrentA | 0,35 / 0,26–0,43 (P2 LED); circuito ON 0,30–0,45 |
| usage.hoursPerDay | — / 3–4 |
| monthlyEnergyKWh | 15 / 10–25 (este rango, en P1, incluye residual; ver 3.10) |
| season | `allYear` |

### 3.10 Enchufes / residual — `storage-outlets-residual`

Separado porque el usuario lo pidió y P2 lo desglosa. P1 los funde con LED.

| Campo | Valor |
|---|---|
| category | `standby` |
| nominalPowerW | <10 vacío |
| runCurrentA / standby | <0,05 |
| nightCurrentA | 0,05 / 0,00–0,10 (P3 bodega vacío) |
| monthlyEnergyKWh | no publicado suelto; entra en 10–25 del tablero |
| season | `allYear` |

Carga oculta: I > 0,8 A continua de noche.

### 3.11 Motor de portón — `gate-motor`

| Campo | Valor |
|---|---|
| category | `motor` |
| nominalPowerW | 500 control / 400–550 |
| runCurrentA | 2,4 / 2,0–3,2 |
| inrushCurrentA | 15 / 12–20 (DOL, sin soft-starter) |
| inrushDurationSeconds | — / 0,2–0,8 |
| usage.cycleDurationSeconds | — / 10–20 por maniobra |
| monthlyEnergyKWh | 4 / 2–6 |
| season | `allYear` |
| inrush → kWh | no | DOC |

I régimen > 4 A, zumbido o térmico = fricción / condensador / fin de carrera.

### 3.12 Stand-by del control del portón — `gate-standby`

| Campo | Valor |
|---|---|
| category | `standby` |
| nominalPowerW | — / 2–8 W |
| standbyCurrentA | 0,02 / 0,01–0,04 |
| monthlyEnergyKWh | no publicado suelto |
| season | `allYear` |

Fotoceldas / control. No es el motor.

### 3.13 Reserva no listada — `unlisted-reserve` (cubo de energía, no equipo)

| Campo | Valor |
|---|---|
| category | `other` |
| monthlyEnergyKWh | — / 15–40 |
| contributesToSteadyDemand | false (no hay I) |

Herramientas puntuales: «picos de uso, no base». No son preset de energía.

---

## 4. Rangos — instalación y totales

### 4.1 Perfil 6 kW (`DOC` salvo `daysPerMonth`)

| Campo | Valor |
|---|---|
| voltageMinV | 220 |
| voltageNominalV | 230 |
| voltageMaxV | 230 |
| tableVoltageV | 230 |
| phases | 1 |
| installedPowerKW | 6 |
| serviceLimitKW | 6 |
| occupancy | 2 |
| daysPerMonth | 30 (`RECON`: 346 kWh y 2 906/día) |

### 4.2 Totales de energía (`DOC`)

| Estación | min | reference | max | kWh/día RECON (÷30) |
|---|---:|---:|---:|---:|
| invierno | 270 | 346 | 420 | 11,53 |
| verano | 170 | 236 | 260 | 7,87 |
| anual publicado vía coste | — | 3 272 | — | ver §9 |

Subtotales P4:

| Grupo | kWh/mes |
|---|---|
| Cargas principales invierno | 240–370 |
| Accesorios | 23–53 |

---

## 5. Ecuaciones

Evaluación posterior (no hay UI ahora). Prioridad: **rango empírico publicado > ecuación**.

### 5.1 Corriente de régimen resistiva (`DOC` P4)

\[
I = \frac{P}{V}
\]

Normal si \(|I_{\mathrm{med}}-I_n|/I_n \le 0{,}10\). Revisar si \(> 0{,}15\). Calefactor, además, banda ±5 % (`DOC` P2).

### 5.2 Cambio de tensión de tabla (`DOC` P2 + `SOFT`)

\[
I(V) = I_{230}\times\frac{230}{V}
\]

A 220 V: ×1,045. Medir en fase.

### 5.3 Energía mensual — familias

**A. Compresor (duty)** — `RECON`, el PDF no la escribe:

\[
E_{\mathrm{mes}} = P_{\mathrm{kW}}\times 24\times N_{\mathrm{d}}\times d
\]

o

\[
E_{\mathrm{mes}} = I_{\mathrm{prom}}\times V\times 24\times N_{\mathrm{d}}/1000
\]

Nevera control 32 kWh ⇒ \(d \approx 0{,}296\) si P = 150 W y \(N_d=30\). El protocolo publica 35 % (37,8 kWh). No se «arregla» el PDF: se conservan ambos y se documenta la holgura.

**B. Horas (`DOC` calefactor, LED)**

\[
E_{\mathrm{mes}} = P_{\mathrm{kW}}\times h_{\mathrm{d}}\times N_{\mathrm{d}}
\]

**C. Ciclos (`DOC` lavavajillas eco)**

\[
E_{\mathrm{mes}} = e_{\mathrm{ciclo}}\times n_{\mathrm{ciclos}}
\]

**D. Economía**

\[
C_{\mathrm{mes}} = E_{\mathrm{mes}}\times c \qquad c=\texttt{energyTariffPerKWh}
\]

**E. Inrush** — no hay término en E. Solo entra en `transientDemand`.

### 5.4 Demanda (`SOFT` sobre reglas `DOC`)

\[
P_{\mathrm{ss}} = \sum_i S_i\, V\, I_{\mathrm{run},i}
\]

\[
P_{\mathrm{tr}} = P_{\mathrm{ss}} + \sum_{j \in \mathrm{arrancando}} V\, I_{\mathrm{inrush},j}
\]

\(S_i\in\{0,1\}\) es el estado ON de régimen (duty ya aplicado o coincidencia explícita). Para resistivas, \(V I \approx P\).

Límite:

\[
P_{\mathrm{ss}} \le P_{\mathrm{service}} \quad\text{y}\quad P_{\mathrm{tr}} \lesssim P_{\mathrm{service}}
\]

El PDF no escribe estas sumas; escribe la coincidencia prohibida (calefactor 1 200 + horno 2 200 + arranque freezer).

### 5.5 Comprobaciones `RECON` de I = P/230

| P (W) | P/230 | I publicada |
|---:|---:|---:|
| 150 | 0,652 | 0,65 |
| 400 | 1,739 | 1,74 |
| 800 | 3,478 | 3,48 |
| 1 200 | 5,217 | 5,22 |
| 2 200 | 9,565 | 9,6 |
| 2 000 | 8,696 | 8,7 |
| 450 | 1,957 | 2,0 |
| 80 | 0,348 | 0,35 |
| 30 | 0,130 | 0,13 |

---

## 6. Duty cycles

Interno 0–1. Solo donde el PDF cicla de verdad.

| Carga | ref | min | max | Alerta DOC |
|---|---:|---:|---:|---|
| Nevera | 0,35 | 0,25 | 0,45 | >0,60 revisar (ventana 30–60 min) |
| Freezer | 0,40 | 0,30 | 0,50 | >0,70 anomalía; 100 % ON = falla |
| Horno | no publicado como % | — | — | «cicla termostato» durante ~1 h de uso |
| Calefactor | 1,0 mientras está en posición | — | — | no es duty de compresor; son horas/día |
| LED | horas 3–4, no duty | — | — | |

`100 % ON` de compresor = falla (`DOC`). Eso es diagnóstico, no un duty válido.

---

## 7. Inrush

Capa propia. `contributesToEnergy = false`.

| Equipo | I ref (A) | I min–max (A) | t (s) | Tipo |
|---|---:|---|---|---|
| Nevera | 5,5 | 4–7 | <0,3 | LRA compresor |
| Freezer | 11 | 8–14 | 0,1–0,4 | LRA hermético |
| Portón | 15 | 12–20 | 0,2–0,8 | DOL sin soft-starter |
| Lavadora | — | 6–10 | — | DOL |
| Bomba lavavajillas | — | 2–4 | breve | |
| Horno | — | <1,1× In | — | resistivo; casi no hay inrush |

Regla transversal DOL (`DOC`): \(I_{\mathrm{arr}} = 5\)–\(8\times I_n\); anomalía si \(>10\times\) **o** \(t>1\,\mathrm{s}\).

Verificación portón: \(I_n \approx 2{,}4\) A; 5–8× = 12–19,2 A; publicado 12–20 A. Cuadra.

Nevera: 5–8× de 0,65 = 3,3–5,2 A; publicado 4–7 A (LRA de hermético, no exactamente la regla DOL del portón). No forzar una sola fórmula para compresor y motor.

---

## 8. Simultaneidad

No hay \(F_d\), \(F_s\) ni \(F_{\mathrm{div}}\) nombrados. Hay **una coincidencia crítica** y un techo de 6 kW.

### 8.1 Coincidencia prohibida (`DOC` P4)

No simultáneos:

1. calefactor posición 1 200 W (régimen 5,22 A, ~1,2 kW)
2. horno 2 200 W (régimen 9,6 A, ~2,2 kW)
3. arranque del freezer (8–14 A pico)

Capa steady de (1)+(2): ≈ 3,4 kW.  
Capa transient: + \(V\times I_{\mathrm{LRA}}\) ≈ 1,8–3,2 kW.  
Total transient ≈ 5,2–6,6 kW → roza o supera `serviceLimitKW = 6`.

### 8.2 Otras coincidencias publicadas (no prohibidas)

- TV + notebook: 0,50 A conjunto (P3).
- Calefactor 1 200 W: «cuidar simultaneidad 6 kW» ya en régimen, sin horno.

### 8.3 Modelo `SOFT`

```text
SimultaneityConstraint = {
  id,
  kind: "forbidden" | "caution",
  members: [{ loadId, mode, layer: "steady" | "transient" }],
  appliesWhenSeason?: "winter" | "summer" | "allYear",
  serviceLimitField: "serviceLimitKW"
}
```

Evaluación futura: si todos los `members` están activos en su `layer`, emitir diagnóstico. No es curva de diversidad IEC.

---

## 9. Estacionalidad

Solo lo que el PDF marca.

| Carga | Invierno | Verano | Clase |
|---|---|---|---|
| Calefactor (cualquier posición) | 90–130 kWh/mes (pos. media); horas 4–6 | **0** («sin calefactor») | DOC |
| Resto de presets | incluidos en ambos totales | incluidos | DOC implícito |
| Total instalación | 270–420 (ref. 346) | 170–260 (ref. 236) | DOC |

No se inventa un duty de nevera distinto en verano. No se inventan meses de estación.

Anual (`RECON`): coste anual / c = 3 272 kWh. La única mezcla que cuadra: **4 meses @ 346 + 8 @ 236**. El PDF no declara esa mezcla. Software: `seasonMix` es entrada, no constante.

---

## 10. Diagnóstico

Criterios del estudio, **no** protección normativa. `severity`: `info` | `warning` | `alert`.

Reglas transversales:

| id | metric | op | threshold | aplica a | severity | mensaje (sentido DOC) |
|---|---|---|---|---|---|---|
| `run-within-10` | `runCurrentA` vs In | abs rel ≤ | 0,10 | todas | info | régimen normal |
| `run-over-15` | `runCurrentA` vs In | abs rel > | 0,15 | `resistive` | warning | revisar elemento |
| `resistive-unstable` | I no estable | — | — | `resistive` | warning | I debe ser estable |
| `heater-band-5` | `runCurrentA` vs In | abs rel > | 0,05 | calefactores | warning | fuera de ±5 % |
| `heater-open-element` | `runCurrentA` | < banda pos. | — | calefactores | warning | I baja ⇒ elemento abierto |
| `compressor-must-cycle` | duty / offCurrent | == 1.0 ON | — | `compressor` | alert | 100 % ON = falla |
| `fridge-no-cut` | offCurrentA / cycle | no corta | I>1,0 A continua | nevera | warning | no cicla |
| `fridge-duty-high` | dutyCycle | > | 0,60 | nevera | warning | duty >60 % en 30–60 min |
| `freezer-no-cut` | offCurrentA | no 0 periódico | — | freezer | alert | principal sospechoso |
| `freezer-run-high` | runCurrentA continua | > | 2,4 A | freezer | alert | I>2,4 A fijas |
| `freezer-energy-high` | monthlyEnergyKWh | > | 180 | freezer | alert | >180 kWh/mes |
| `freezer-duty-high` | dutyCycle | > | 0,70 | freezer | warning | >70 % |
| `oven-overcurrent` | runCurrentA | > | 11 A | horno | warning | I>11 A |
| `oven-no-cut` | offCurrentA | no corta | — | horno | warning | termostato no corta |
| `dishwasher-heat-stuck` | runCurrentA todo el ciclo | ≈ | 9 A | lavavajillas | warning | calor todo el ciclo |
| `washer-mech` | runCurrentA lavado | > | 3,5 A | lavadora | warning | bloqueo / anomalía |
| `tv-on-high` | runCurrentA | > | 0,60 A | TV | warning | fuente anómala |
| `tv-standby-high` | standbyCurrentA | > | 0,05 A | TV | warning | stand-by alto |
| `notebook-charge-high` | runCurrentA modo charge | > | 0,35 A | notebook | warning | cargador distinto o falla |
| `hidden-night-load` | nightCurrentA | > | 0,80 A | bodega | alert | carga oculta |
| `gate-run-high` | runCurrentA | > | 4 A | portón | warning | fricción / condensador / fin de carrera |
| `dol-inrush-ratio` | inrush/In | > | 10 | `motor` DOL | warning | inrush excesivo |
| `dol-inrush-time` | inrushDurationSeconds | > | 1 | `motor` DOL | warning | arranque >1 s |
| `sim-heater-oven-freezer` | coincidencia | activa | — | instalación | alert | simultaneidad 6 kW |
| `read-after-30s` | protocolo | — | — | todas | info | no usar el pico como régimen |

Protocolo de lectura (`DOC`): régimen a 30–60 s; inrush con función dedicada; en fase; anotar °C de bodega para el freezer.

---

## 11. Supuestos (`SOFT` salvo que se marque)

1. `daysPerMonth = 30` reproduce 346 kWh → 2 906/día.
2. Tres posiciones de calefactor = **un** equipo; grupo exclusivo.
3. Verano = calefactor a 0 kWh; el resto no se reescala.
4. `energyTariffPerKWh` es input; jamás la tarifa del analog.
5. Rangos empíricos mandan sobre \(P\times t\times d\).
6. Inrush fuera de kWh (el PDF lo ordena).
7. `serviceLimitKW` es dato de perfil, no constante global.
8. `quantity` existe para reutilizar presets (N neveras); el PDF tiene cantidad 1.
9. Iluminación y residual se separan en software; el P1 los suma.
10. Motor y stand-by del portón se separan; el P1 solo detalla el motor en kWh.
11. Nombres genéricos; sin marcas.
12. Este schema sirve igual a 10 kW o a 100 MVA; cambian los presets, no las claves.
13. No se usa Fd numérico inventado.
14. PII, operador y tarifa local = `OMIT`.

---

## 12. Datos que NO se pueden inferir

No rellenar:

1. Factor de potencia.
2. \(F_d\), \(F_s\), \(F_{\mathrm{div}}\) como coeficientes.
3. Número de meses de invierno/verano (3 272 kWh/a es `RECON`, no calendario).
4. Duty del termostato del horno durante la hora de uso.
5. kWh sueltos de calefactor 400 W y 1 200 W (solo conjunto 90–130 / control 110).
6. Por qué 32 kWh (nevera) ≠ 150 W × 24 × 30 × 0,35.
7. Por qué control calefactor 110 kWh ≠ 800 W × 5 h × 30 d = 120 kWh.
8. Energía mensual del stand-by del portón y de los enchufes vacíos, por separado.
9. Duración de inrush de la lavadora.
10. Curva de diversificación continua (solo una coincidencia crítica).
11. Herramientas: potencia, I, kWh.
12. Desglose de la reserva 15–40 kWh.
13. Si el empalme 6 kW es contratado, interruptor termomagnético o ambos.
14. Conductores, curva de breaker, selectividad — fuera de este PDF.
15. Generación, PV, BESS, trafo, barras — otro documento, otra fase.

---

## 13. Dataset

Tras fijar este schema: `js/architecture/reference-loads.js`.

Solo datos y metadatos de ecuación. Sin DOM, sin Alpine, sin calculadora visual.
