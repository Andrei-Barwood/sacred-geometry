# Modelo de ingeniería — extracción de requisitos

Documento **temporal e interno**. No es interfaz. No es dataset público.

Estado: extracción 2026-09-02. Sin implementación de UI.

## Cómo leer este archivo

Cada dato lleva:

| Campo | Significado |
|---|---|
| Valor | Magnitud extraída o calculada |
| Unidad | SI o la unidad del documento |
| Significado | Qué representa físicamente |
| Fuente | Identificador de lámina/página |
| Clase | `EXTRAIDO` / `INFERIDO` / `NO_EN_FUENTE` / `PROHIBIDO_PRODUCTO` |

Clases:

- **EXTRAIDO** — aparece de forma explícita en un PDF listado.
- **INFERIDO** — aritmética o topología a partir de valores EXTRAIDO. Se muestra la cuenta.
- **NO_EN_FUENTE** — se buscó y no está. No se inventa.
- **PROHIBIDO_PRODUCTO** — existe en la fuente privada y **no** debe pasar a HTML, URLs, comentarios públicos, datasets, metadatos ni cadenas visibles.

No se copian imágenes, bloques de título, nomenclatura interna de plano, ni analogías geográficas ajenas al corredor Mauritania–Tailandia.

## Fuentes

| Id | Qué es | Qué se pudo leer |
|---|---|---|
| `PDF-PV-L1` | Estudio PV oasis, lámina 1, unifilar 33/11 kV | Texto + raster de la página |
| `PDF-PV-L2` | Estudio PV oasis, lámina 2, croquis de emplazamiento | Texto + raster de la página |
| `PDF-6kW-P1` | Estudio de consumo ~6 kW, hoja de referencia | Tablas completas |
| `PDF-6kW-P2` | Idem, detalle por equipo | Tablas completas |
| `PDF-6kW-P3` | Idem, protocolo de pinza | Tablas completas |
| `PDF-6kW-P4` | Idem, resumen comparativo | Tablas completas |
| `REF-TOPO` | Referencia estructural de topología (archivo de plano) | **No leída** — ver §0 |

El PDF-PV es un estudio académico de microred en el oasis de Siwa (Egipto; corredor). Fecha en lámina: 2026-09-02, REV A, estado «en desarrollo». Coordenadas de lugar: 29.20 N, 25.52 E.

El PDF-6kW es un estudio de vivienda-granja, 2 personas, 6 kW instalados, agosto 2026. Sirve como analogía de **diagnóstico de consumo** a 220–230 V monofásico. Operador, tarifa local, calificación profesional y datos personales: `PROHIBIDO_PRODUCTO`.

---

## 0. Referencia estructural de topología — no extraída

Herramientas comprobadas (ninguna convierte de forma segura el original):

| Herramienta | Resultado |
|---|---|
| `dwg2dxf` | no encontrada |
| `dwgread` | no encontrada |
| `ODAFileConverter` | no encontrada |
| `ezdxf` 1.4.2 | presente; **rechaza el original** (`not a DXF file`) |
| instalación global silenciosa | **no realizada** |

No se modificó el original. No se inventa su contenido.

**No extraído de REF-TOPO (lista cerrada):**

- tensiones, MVA, relaciones de transformación;
- lista de barras, alimentadores, protecciones, ajustes;
- N / N+1 / N-1 como criterio de diseño del plano;
- longitudes de vano, secciones de conductor;
- nomenclatura interna, capas, bloques de título;
- cualquier cantidad numérica propia del plano.

`PDF-PV-L1` afirma conservar la **gramática de bloques** (BESS, fusible, transformador con TAP) al redibujar el unifilar del oasis. Eso es un *claim del PDF-PV*, no una verificación independiente del plano. En este modelo esa gramática se toma de `PDF-PV-L1` únicamente.

---

## 1. Convenciones de cálculo usadas en este archivo

Solo se aplican donde el documento no escribe la fórmula y el valor cuadra.

### 1.1 Corriente de régimen resistiva (PDF-6kW)

El documento no escribe \(I=P/V\) en la hoja 1; la hoja 4 sí:

\[
I = \frac{P}{V} \qquad \text{cargas resistivas, } \pm 10\,\%
\]

Tensión de tabla: **230 V**. A 220 V: «incrementar \(I\) un 4,5 %».

Verificación: \(230/220 = 1{,}04545 \approx +4{,}5\,\%\). Clase: `EXTRAIDO` el enunciado; `INFERIDO` la razón 230/220.

Comprobación \(P/230\) vs corriente tabulada (desvío de redondeo):

| Equipo | P (W) | P/230 (A) | I tabulada (A) |
|---|---:|---:|---:|
| Nevera | 150 | 0,652 | 0,65 |
| Calefactor 400 | 400 | 1,739 | 1,74 |
| Calefactor 800 | 800 | 3,478 | 3,48 |
| Calefactor 1 200 | 1 200 | 5,217 | 5,22 |
| Horno | 2 200 | 9,565 | 9,6 |
| Lavavajillas calor | 2 000 | 8,696 | 8,7 |
| Lavadora motor | 450 | 1,957 | 2,0 |
| TV LED | 80 | 0,348 | 0,35 |
| Portátil uso | 12 | 0,052 | 0,05 |
| Portátil carga | 30 | 0,130 | 0,13 |
| LED bodega | 80 | 0,348 | 0,35 |

### 1.2 Coste mensual (PDF-6kW)

\[
C_{\mathrm{mes}} = E_{\mathrm{mes}} \times c
\]

con \(c\) = tarifa unitaria **solo energía, sin cargo fijo** del estudio de analogía. Todas las celdas \(\mathrm{kWh}\times c\) coinciden exactas (p. ej. \(32\times c = 8\,064\)).

Valor de \(c\): `PROHIBIDO_PRODUCTO` (operador y moneda locales). En producto público: \(c\) es **entrada del usuario**.

### 1.3 Energía mensual de una carga cíclica (reconstrucción)

El PDF-6kW **no escribe** una fórmula única de kWh. Los controles cuadran, con holgura, con:

\[
E_{\mathrm{mes}} = P_{\mathrm{kW}} \times t_{\mathrm{h/d}} \times N_{\mathrm{d}} \times d
\]

o, equivalente,

\[
E_{\mathrm{mes}} = I_{\mathrm{prom}} \times V \times 24\,\mathrm{h} \times N_{\mathrm{d}} / 1000
\]

\(N_{\mathrm{d}}\) no está escrito; los totales «/mes» y el «$/día» de 346 kWh implican **30 días** (`INFERIDO`: \(346/30 = 11{,}533\,\mathrm{kWh/d}\); \(11{,}533\times c = 2\,906{,}4\), el documento redondea a 2 906/día).

### 1.4 Duración equivalente BESS

\[
t_{\mathrm{h}} = \frac{E_{\mathrm{MWh}}}{P_{\mathrm{MW}}}
\]

No está escrita; se usa solo donde MW y MWh vienen juntos.

---

## A. Potencia instalada

### A.1 Caso vivienda-granja (PDF-6kW)

| Campo | Valor | Unidad | Significado | Fuente | Clase |
|---|---|---|---|---|---|
| Potencia instalada (empalme) | 6 | kW | Capacidad del servicio, no la suma de placas | P1, P4 | EXTRAIDO |
| Tensión | 220–230 | V c.a. | Rango de referencia | P1–P4 | EXTRAIDO |
| Tensión de tabla I | 230 | V | Base de las corrientes publicadas | P2 nota | EXTRAIDO |
| Fases | 1 | — | Monofásico | P1 | EXTRAIDO |
| Usuarios | 2 | personas | Base de duty de frío | P1 | EXTRAIDO |
| Factor de potencia | — | — | **No aparece** (resistivas ⇒ implícito ≈1; motores sin cos φ) | — | NO_EN_FUENTE |
| Fd, Fs, Fdiv nombrados | — | — | **No aparecen** como coeficientes | — | NO_EN_FUENTE |
| Simultaneidad (regla) | no calefactor 1 200 + horno 2 200 + arranque freezer | — | Límite operativo del empalme 6 kW | P4 | EXTRAIDO |
| Corriente de servicio a 230 V | 26,09 | A | \(6000/230\) | — | INFERIDO |
| Corriente de servicio a 220 V | 27,27 | A | \(6000/220\) | — | INFERIDO |

Suma orientativa de placas (si coincidieran todas las resistencias de calor): ≈ 8,7 kW > 6 kW. Explica la regla de simultaneidad. Clase: `INFERIDO`. El documento no llama a esa suma «potencia conectada».

#### Cargas (cantidad = 1 de cada ítem, salvo que se diga)

Horas y duty son las del documento, no inventadas.

| Id | Carga | Cant. | P nom. | I @ 230 V | Horas / duty | E control kWh/mes | Fuente |
|---|---|---:|---|---|---|---:|---|
| C1 | Nevera doméstica | 1 | 150 W (compresor) | 0,65 A ON; 0,45–0,80 óptimo; 0,00–0,05 OFF | duty 25–45 % (protocolo 35 %) | 32 (rango 28–38) | P1–P3 |
| C2 | Freezer bodega 1,12 m³ | 1 | 350–450 W; control 400 W | 1,7–2,0 A; óptimo ON 1,3–2,2; OFF 0 | duty sano 30–50 % (control 40 %) | 120 (rango 90–140) | P1–P3 |
| C3 | Calefactor pos. 1 | 1 | 400 W | 1,74 (ópt. 1,65–1,85) | 4–6 h/d invierno; coste P1 a 5 h | — | P1–P2 |
| C4 | Calefactor pos. 2 | 1 | 800 W | 3,48 (ópt. 3,30–3,65) | idem | control conjunto 110 | P1–P2 |
| C5 | Calefactor pos. 3 | 1 | 1 200 W | 5,22 (ópt. 5,00–5,50) | idem; cuidar simultaneidad 6 kW | rango inv. 90–130 | P1–P3 |
| C6 | Horno eléctrico | 1 | 2 200 W | 9,6 (ópt. 8,7–10,5); reposo 0,00–0,10 | 8–12 usos × ~1 h; cicla termostato | 24 (rango 18–30) | P1–P2 |
| C7 | Lavavajillas | 1 | 2 000 W calor; 120–180 W motor | 8,7 calor; 0,5–1,2 lavado | 10–15 ciclos/mes; eco ~1,0 kWh/ciclo | 14 (rango 10–18) | P1–P2 |
| C8 | Lavadora | 1 | 450 W motor; 2 000 W si calienta | 2,0 motor; 1,6–2,4 lavado; 2,5–3,5 spin | 8–12 ciclos/mes | 6–15 | P1–P2 |
| C9 | Televisor LED | 1 | 80 W ON; <1 W stand-by | 0,35; ópt. 0,25–0,45; sb <0,01 | — | 8–15; sb <0,8 | P2 |
| C10 | Portátil (uso / carga 30 W) | 1 | 10–15 W uso; 30 W carga | 0,04–0,07 / 0,13–0,20 | — | 3–7 | P2 |
| C11 | LED + enchufes bodega | 1 circuito | 60–100 W LED; 80 W típ. | 0,26–0,43 LED; 0,30–0,45 circuito ON; noche 0,00–0,10 | luces 3–4 h + residual | 15 (rango 10–25) | P1–P2 |
| C12 | Motor portón (sin soft-starter) | 1 | 400–550 W; control 500 W | 2,0–3,2 régimen; control 2,4 | 10–20 s/maniobra; 2–6 kWh/mes | 4 | P1–P3 |
| C13 | Reserva «otras no listadas» | — | — | — | — | 15–40 | P1 |
| C14 | Herramientas puntuales | — | según máquina | picos de uso | no base | no base | P2 |

Arranques (no suman kWh; vigilar I pico y duración):

| Equipo | I arranque | Duración | Fuente | Clase |
|---|---|---|---|---|
| Portón DOL | 12–20 A pico (control 15 A) | 0,2–0,8 s | P1, P3 | EXTRAIDO |
| Freezer LRA | 8–14 A (protocolo 11 A) | 0,1–0,4 s | P1, P3 | EXTRAIDO |
| Nevera LRA | 4–7 A (protocolo 5,5 A) | <0,3 s | P1, P3 | EXTRAIDO |
| Lavadora DOL | 6–10 A | — | P2 | EXTRAIDO |
| Bomba lavavajillas | 2–4 A breve | — | P2 | EXTRAIDO |
| Horno (resistivo) | pico <1,1× | no aplica inrush | P2 | EXTRAIDO |

Criterios de pinza (P1, P3, P4):

| Criterio | Umbral | Clase |
|---|---|---|
| I régimen vs In | ±10 % = normal | EXTRAIDO |
| Resistiva, desviación | >15 % revisar elemento; I estable | EXTRAIDO |
| Resistiva explícita P4 | \(I=P/V \pm 10\,\%\) | EXTRAIDO |
| Compresores | deben cortar; 100 % ON = falla | EXTRAIDO |
| Nevera duty 30–60 min | 25–45 %; si >60 % revisar | EXTRAIDO |
| Freezer duty | 30–50 %; >70 % anomalía | EXTRAIDO |
| Freezer sospecha | I > 2,4 A continua o no cicla en 45–60 min; >180 kWh/mes | EXTRAIDO |
| Motor DOL | I arranque 5–8× In; >10× o >1 s = anomalía | EXTRAIDO |
| Portón anomalía | I régimen >4 A, zumbido o térmico | EXTRAIDO |
| Bodega noche | I > 0,8 A continua = carga oculta | EXTRAIDO |
| Lectura de régimen | 30–60 s, no el pico | EXTRAIDO |
| Instrumento | pinza True RMS + inrush, en fase | EXTRAIDO |

### A.2 Caso microred oasis (PDF-PV)

No hay listado de kW por cliente. Cargas son **nodos de barra**, no equipos.

| Nodo | Rol | Tensión | Notas | Fuente | Clase |
|---|---|---|---|---|---|
| Al-Maraqi | carga O (oeste) | 33 kV | extremo oeste de columna | L1 | EXTRAIDO |
| Bahi El-Din | carga O | 33 kV | | L1 | EXTRAIDO |
| S/E Siwa | cabecera / barra 33 kV | 33 kV | nudo central | L1 | EXTRAIDO |
| Aghurmi | carga E | 33 kV | | L1 | EXTRAIDO |
| Abu Shrouf | carga E | 33 kV | | L1 | EXTRAIDO |
| El-Zeitun | carga E | 33 kV | extremo este | L1 | EXTRAIDO |
| Qara | carga aislada / off-grid | 33 kV (si se tiende) | ~75 km NE; radial o microred autónoma; trazo discontinuo | L1, L2 | EXTRAIDO |
| Siwa / Shali | carga urbana | 11 kV | bajo barra Shali | L1 | EXTRAIDO |
| Servicios | pozos / turismo | 11 kV | bajo barra Shali | L1 | EXTRAIDO |
| Distribución existente | ~13 600 clientes | 11 kV | **sin kW/cliente** | L1 | EXTRAIDO |

| Campo | Valor | Unidad | Fuente | Clase |
|---|---|---|---|---|
| Demanda MW de la microred | — | MW | — | NO_EN_FUENTE |
| Factor de demanda red | — | — | — | NO_EN_FUENTE |
| cos φ de la red | — | — | — | NO_EN_FUENTE |
| Horas de utilización de carga | — | h | — | NO_EN_FUENTE |

---

## B. Energía

### B.1 Vivienda-granja (PDF-6kW)

| Concepto | kWh/mes | Fuente | Clase |
|---|---|---|---|
| Frío (nevera + freezer) | 120–180 | P1, P4 | EXTRAIDO |
| Térmicas (calefactor + horno) invierno | 100–160 | P1 | EXTRAIDO |
| Ciclo y electrónica (lavado, TV, notebook) | 25–50 | P1 | EXTRAIDO |
| Bodega + portón | 12–30 | P1, P4 | EXTRAIDO |
| Reserva no listada | 15–40 | P1 | EXTRAIDO |
| **Invierno esperado** | **270–420** | P1, P4 | EXTRAIDO |
| **Verano (sin calefactor)** | **170–260** | P1, P4 | EXTRAIDO |
| Referencia de control invierno | **346** | P4 | EXTRAIDO |
| Referencia de control verano | **236** | P4 | EXTRAIDO |
| Subtotal cargas principales invierno | 240–370 | P4 | EXTRAIDO |
| Subtotal accesorios | 23–53 | P4 | EXTRAIDO |
| Freezer fracción del total | ≈ 30–45 % (P1); ≈ 1/3 (P4) | P1, P4 | EXTRAIDO |

| Magnitud | Valor | Unidad | Cuenta | Clase |
|---|---|---|---|---|
| kWh/día invierno (ref. 346, 30 d) | 11,533 | kWh/d | 346/30 | INFERIDO |
| kWh/día verano (ref. 236, 30 d) | 7,867 | kWh/d | 236/30 | INFERIDO |
| kWh/año | 3 272 | kWh/a | coste anual del P4 / c | INFERIDO |
| Mezcla estacional que cuadra 3 272 | 4 meses @ 346 + 8 @ 236 | — | 346×4 + 236×8 = 3 272 | INFERIDO |
| Mezcla 6+6 | 3 492 | kWh/a | no coincide con el anual del P4 | INFERIDO (descartada) |

El documento **no declara** cuántos meses son invierno. La mezcla 4+8 es la única que reproduce el anual publicado; queda como inferencia, no como dato de diseño rígido.

Fórmulas que el documento **sí** usa o enuncia:

1. \(I = P/V\) resistivas, ±10 % (P4).
2. \(C = E \times c\) con c tarifa solo energía (todas las hojas; c `PROHIBIDO_PRODUCTO`).
3. Corrección 220 V: \(I_{220} = I_{230}\times 1{,}045\) (P2: «+4,5 %»).
4. Eco lavavajillas ≈ 1,0 kWh/ciclo × 10–15 ciclos (P2) → 10–15 kWh; el rango publicado es 10–18.
5. Duty cycle de compresor = fracción de tiempo ON; E proporcional al duty si P_ON es constante (`INFERIDO` de los rangos 25–45 % y 30–50 %).

Reconstrucción de controles (no sustituye al valor publicado):

| Control | Cuenta | Publicado | Nota |
|---|---|---|---|
| Nevera 32 kWh | \(0{,}150\times 24\times 30\times d = 32\) ⇒ \(d \approx 29{,}6\,\%\) | 32; protocolo 35 % | 35 % daría 37,8 kWh — holgura |
| Freezer 120 kWh | \(0{,}400\times 24\times 30\times 0{,}40 = 115{,}2\) | 120 | holgura de redondeo / 400 W vs 350–450 |
| Calefactor 110 kWh | \(0{,}800\times t\times 30 = 110\) ⇒ \(t = 4{,}58\,\mathrm{h/d}\) | 110; texto 4–6 h pos. media | P1 costea pos. 2 a 5 h (=120 kWh) |
| Horno 24 kWh | \(2{,}2\times n \approx 24\) ⇒ \(n \approx 11\) usos de 1 h | 24; texto 8–12 × ~1 h | cuadra |
| Portón 4 kWh | no desglosado | 4 | NO_EN_FUENTE la cuenta |

### B.2 Microred oasis (PDF-PV)

| Magnitud | Valor | Unidad | Fuente | Clase |
|---|---|---|---|---|
| Consumo kWh de los 13 600 clientes | — | — | — | NO_EN_FUENTE |
| Energía anual de la red 11 kV | — | — | — | NO_EN_FUENTE |
| Yield Sitio A | 1 890 | kWh/kWp·año | L2, «fijo 29°» | EXTRAIDO |
| Energía anual Sitio A si 25 MWp al yield fijo | 47 250 | MWh/año | 25×1 890 | INFERIDO |
| Yield con tracker | — | — | L2 da el 1 890 **fijo**, no tracker | NO_EN_FUENTE (inconsistencia: el Sitio A se dibuja con tracker) |

---

## C. Generación

### C.1 Potencia FV

| Sitio | DC | AC | Tecnología | Estado | Fuente | Clase |
|---|---|---|---|---|---|---|
| A · meseta SEW | 25 MWp | NO_EN_FUENTE | tracker 1 eje N–S, bifacial | recomendado | L1, L2 | EXTRAIDO |
| B · planta existente | 10 MW | 10 MW (se publica como MW, no MWp) | existente 2015, 17,5 ha | fase 0 | L1, L2 | EXTRAIDO |
| B · ampliación | +8,2 MWp | NO_EN_FUENTE | tracker/bifacial a validar | fase 0 / plan de utilidad local | L1, L2 | EXTRAIDO |
| C · este Zeitun | 15 MWp | NO_EN_FUENTE | tracker + bifacial | futuro / fase 2 | L1, L2 | EXTRAIDO |
| Objetivo suma | ~58 MWp | — | nota L1: 25+18+15 | — | L1 | EXTRAIDO |
| Suma exacta 25+10+8,2+15 | 58,2 | MWp-eq | 18 vs 18,2 | — | — | INFERIDO |

La nota 1 de L1 usa **18** (no 18,2) para B. Tratar 58 MWp como cifra de estudio, no como 58,2.

### C.2 Inversores

| Campo | Valor | Clase |
|---|---|---|
| Modelo, n.º, kVA, cos φ | — | NO_EN_FUENTE |
| Relación DC/AC | — | NO_EN_FUENTE |
| Tensión de salida inversor | 0,8 kV aparece en el lado de baja de los trafo de sitio A y B | EXTRAIDO el 0,8 kV; NO_EN_FUENTE que sea exactamente la salida de cada inversor |

Topología dibujada en A y B: bloque PV y bloque BESS convergen a un nudo, fusible, transformador 0,8/33 kV, interruptor, barra 33 kV. Eso implica **acopio en 0,8 kV** (`INFERIDO` de L1).

### C.3 Transformadores de generación

| Sitio | Relación | TAP | MVA | Fuente | Clase |
|---|---|---|---|---|---|
| A (SIW-A-001) | 0,8 / 33 kV | no dibujado | — | L1 | EXTRAIDO relación; NO_EN_FUENTE MVA |
| B (SIW-B-002) | 0,8 / 33 kV | no dibujado | — | L1 | idem |
| C (SIW-C-003) | no hay trafo dibujado | — | — | L1, trazo futuro a barra El-Zeitun | EXTRAIDO ausencia |

### C.4 Tracker / fixed / pérdidas / planta

| Campo | Valor | Fuente | Clase |
|---|---|---|---|
| Tracker Sitio A | 1 eje N–S, bifacial | L1 | EXTRAIDO |
| Tracker Sitio C | tracker + bifacial | L1 | EXTRAIDO |
| Yield publicado Sitio A | 1 890 kWh/kWp·año **fijo 29°** | L2 | EXTRAIDO |
| Factor de planta Sitio A (fijo) | 1 890/8 760 ≈ 0,216 | — | INFERIDO |
| Pérdidas (% soiling, cable, inversor, IAM, temperatura) | no cuantificadas | — | NO_EN_FUENTE |
| Limpieza | en seco; rocío salino cementa | L1 nota 3 | EXTRAIDO (cualitativo) |
| Recurso tracker | no publicado | L2 solo fijo 29° | NO_EN_FUENTE |

Inconsistencia a conservar: **tecnología tracker vs yield de fijo**. No resolverla inventando un yield de tracker.

---

## D. BESS

| Unidad | MW | MWh | t = E/P | Química | DoD | η / RTE | Acoplamiento | Estado | Fuente | Clase |
|---|---|---|---|---|---|---|---|---|---|---|
| BESS A | 25 | 100 | 4,00 h | — | — | — | nudo 0,8 kV con PV A | recomendado | L1 | EXTRAIDO MW/MWh; INFERIDO 4 h (además L1 nota «BESS 4 h») |
| BESS B | 2 | 4 | 2,00 h | — | — | — | nudo 0,8 kV con PV B | plan utilidad; «estudio 8 MWh» | L1 | EXTRAIDO |
| BESS B alt. estudio | 2 | 8 | 4,00 h | — | — | — | idem | estudio | L1 | EXTRAIDO 8 MWh; INFERIDO 4 h |
| BESS C | 15 | 60 | 4,00 h | — | — | — | no hay trafo; enlace futuro | fase 2, opcional, solo si hay demanda este / export | L1 | EXTRAIDO MW/MWh; INFERIDO 4 h |

La nota 1 de L1 («microgrid 33 kV con ~58 MWp + BESS 4 h») fija **4 h** como duración de estudio. BESS B dibujado a 4 MWh es **2 h**; el propio L1 apunta «estudio 8 MWh» para alinear a 4 h.

| Campo | Valor | Clase |
|---|---|---|
| DoD | — | NO_EN_FUENTE |
| RTE / eficiencia de ida y vuelta | — | NO_EN_FUENTE |
| C-rate explícito | — | NO_EN_FUENTE (sigue de t = 4 h ⇒ 0,25 C si se infiere; no usar sin marcar) |
| PCS kVA | — | NO_EN_FUENTE |
| Química LFP | no legible en el raster de L1 | NO_EN_FUENTE en el PDF entregado |

---

## E. Subestación

| Campo | Valor | Unidad | Fuente | Clase |
|---|---|---|---|---|
| Barra alta | 33 kV | V | L1 | EXTRAIDO |
| Barra baja | 11 kV Shali | V | L1 | EXTRAIDO |
| Trafo cabecera | 33 / 11 kV | — | L1 | EXTRAIDO |
| TAP | sí, en el trafo 33/11 | — | L1 (símbolo TAP) | EXTRAIDO presencia; NO_EN_FUENTE ±% ni n.º de posiciones |
| MVA del trafo | — | MVA | — | NO_EN_FUENTE |
| Fusible | en la caída 33 kV → trafo | — | L1 | EXTRAIDO símbolo; NO_EN_FUENTE calibre |
| Interruptor 11 kV | entre trafo y barra Shali | — | L1 | EXTRAIDO |
| Clientes 11 kV | ~13 600 | — | L1 | EXTRAIDO |
| Topología 33 kV | columna oeste→este, un CB entre barras consecutivas | — | L1 | EXTRAIDO |
| Anillo | no dibujado | — | L1 | EXTRAIDO (ausencia) |
| Radial | sí, backbone lineal + derivaciones | — | L1 | EXTRAIDO / INFERIDO |
| N, N+1, N-1 | no escritos | — | — | NO_EN_FUENTE |
| Inferencia de redundancia | un solo trafo 33/11; un solo backbone: **N**, sin N-1 | — | L1 | INFERIDO (no elevar a criterio de norma) |
| Identificadores de acople | SIW-A-001, SIW-B-002, SIW-C-003 FUTURO | — | L1 | EXTRAIDO (uso interno del estudio; no son capas de plano) |

Alimentadores 33 kV: los vanos Al-Maraqi — Bahi El-Din — S/E Siwa — Aghurmi — Abu Shrouf — El-Zeitun, cada uno con seccionador/interruptor de vano.

Alimentadores 11 kV dibujados: urbano Shali y servicios (pozos/turismo). Resto de la distribución existente: no desglosada.

---

## F. Respaldo

| Recurso | Dónde | Función | Magnitud | Fuente | Clase |
|---|---|---|---|---|---|
| Diésel existente | barra 11 kV Shali | respaldo de microgrid 11 kV | MW no publicado | L1 | EXTRAIDO existencia; NO_EN_FUENTE potencia |
| BESS A, B, (C) | 0,8 kV sitios / 33 kV vía trafo | almacenamiento 4 h de estudio | ver §D | L1 | EXTRAIDO |
| Red exterior | no hay nudo de importación dibujado a otra red | oasis tratado como microred | — | L1 | INFERIDO |
| Qara | off-grid | 33 kV radial ~75 km **o** microred autónoma | — | L1, L2 | EXTRAIDO (alternativa abierta) |
| Sitio B | acople a planta existente | fase 0 | 10 MW ya en servicio | L1, L2 | EXTRAIDO |

No hay grupo diésel en 33 kV. El G está en 11 kV.

---

## G. Topología

Cadena extraída de L1 (sitios A y B):

```
PV (MWp) ──┐
           ├── nudo 0,8 kV ── fusible ── trafo 0,8/33 kV ── interruptor ── barra 33 kV
BESS (MW/MWh) ─┘                                                      │
                                                                      ▼
                    …carga O… ── CB ── S/E SIWA (barra 33 kV) ── CB ── …carga E…
                                      │
                                      fusible
                                      │
                                      trafo 33/11 kV + TAP
                                      │
                                      interruptor
                                      │
                                      barra 11 kV SHALI
                                      ├── carga urbana
                                      ├── servicios (pozos / turismo)
                                      └── G diésel (respaldo)
```

Relaciones:

| Relación | Tipo | Fuente |
|---|---|---|
| Columna 33 kV O→E | backbone radial con CB de vano | L1 |
| Sitio A → S/E | línea 33 kV ~15 km (meseta → S/E) | L1, L2 |
| Sitio B → columna | acople en vano S/E–Aghurmi (planta existente) | L1 |
| Sitio C → El-Zeitun | enlace **débil / futuro** (discontinuo, sin trafo) | L1 |
| Qara → Aghurmi | enlace **débil / futuro** (discontinuo), ~75 km | L1 |
| 33 kV → 11 kV | un solo trafo TAP en cabecera | L1 |
| PV ∥ BESS en 0,8 kV | paralelo en nudo de sitio, un trafo común | L1 |

Expansión futura (L1, L2):

- Fase 0: ampliar B (10 MW + 8,2 MWp + BESS).
- Recomendado: abrir A (25 MWp + BESS 25/100).
- Fase 2: C solo si hay demanda este o export (15 MWp; BESS 15/60 opcional).
- Qara: no resuelto entre radial 33 kV y microred autónoma.

---

## H. Restricciones territoriales

Todas `EXTRAIDO` de L1 notas y L2 clave / tarjetas. Aplican al caso oasis.

| Restricción | Regla | Detalle |
|---|---|---|
| Salinidad / corrosión | no PV en sabkha | lagos y sabkha = inundación + corrosión; rocío salino cementa (limpieza en seco) |
| Arena / polvo / dunas | no PV en Gran Mar de Arena (sur) | hamada de meseta = sí (Sitio A) |
| Inundación | no PV en lagos y sabkha | Lago Al-Maraqi, Lago Siwa, Lago Zeitun / salares |
| Humedales / salares | fuera de salares de Zeitun para C | L2 |
| Patrimonio | no PV | Shali, Oráculo, Gebel al-Mawta; círculo de exclusión urbana en L2 |
| Agricultura | no PV | palmeral / olivares (agua + suelo agrícola) |
| Acceso / aeronáutica | no PV en aproximación de pista 16/34 | aeropuerto SEW en L2 |
| Temperatura | no cuantificada | NO_EN_FUENTE °C de diseño |
| Terreno apto | hamada | Sitio A: hamada sobre escarpe, +90 m vs oasis a −15 m; ~15 km a la S/E |
| Huella | símbolos fuera de escala | huella real ~25–45 ha; B existente 17,5 ha; C ~25 ha |
| Sitio C | condicionado | solo si el estudio modela segundo polo y demanda Abu Shrouf / Timeira |

Bbox del croquis: 25.12–25.95 E, 29.05–29.42 N. Escala gráfica 20 km. Coordenadas de lugar 29.20 N, 25.52 E.

Coordenadas de sitio en el PDF entregado:

| Sitio | Coordenadas en L2 | Clase |
|---|---|---|
| B | 29.1784 N, 25.5153 E | EXTRAIDO |
| C | 29.205 N, 25.86 E | EXTRAIDO |
| A | callout de L2 **vacío** en el PDF rasterizado | NO_EN_FUENTE en el PDF entregado |

---

## I. Qué no debe salir al producto público

Aunque aparezcan en las fuentes privadas:

- analogías geográficas ajenas al corredor Mauritania–Tailandia (tabla de traducción de L2: **no transcrita**);
- nombres de operador, tarifa local, moneda y calificación profesional del PDF-6kW;
- datos personales del profesional;
- bloques de título, nomenclatura interna de plano, capas;
- rutas locales de archivos;
- el plano estructural (no leído y no reproducible);
- la etiqueta rígida «Middle East» para Mauritania–Tailandia.

El caso oasis (Siwa, Egipto) **sí** es geografía del corredor. El caso 6 kW se reutiliza como **método de diagnóstico** (I=P/V, duty, inrush, simultaneidad), no como ficha de un empalme ajeno al corredor.

---

## J. Huecos abiertos (prioridad para la UI)

Sin estos datos no se debe calcular, solo mostrar «no publicado»:

1. MVA de todos los transformadores.
2. kW o kWh de los ~13 600 clientes; demanda de la microred.
3. Potencia del diésel.
4. Inversores (n.º, kVA, DC/AC, tensión exacta).
5. Yield de tracker (el 1 890 es fijo 29°).
6. Pérdidas cuantificadas.
7. DoD, RTE, PCS del BESS.
8. Química del BESS en el PDF entregado.
9. TAP (±% y posiciones).
10. Calibres de fusible y ajustes de interruptor.
11. N-1 como requisito (solo se infiere N).
12. Coordenadas del Sitio A en el PDF entregado.
13. Factor de potencia de cargas y de red.
14. Fd / Fs / Fdiv como coeficientes.
15. Contenido de REF-TOPO (sin conversor).
16. Mezcla estacional del anual 6 kW (4+8 es inferencia).

---

## K. Núcleo reutilizable (verificado)

Único conjunto que puede bajar a código **sin inventar**:

**Microred (escala oasis, 33/11 kV)**

- Backbone radial 33 kV, cabecera con trafo TAP 33/11, barra 11 kV, diésel de respaldo en 11 kV.
- Tres polos PV+BESS: existente/ampliación, nuevo en hamada, futuro condicionado.
- Acopio de sitio 0,8 kV → 33 kV; PV y BESS en paralelo en el nudo de baja.
- BESS de estudio a 4 h; excepción B dibujado a 2 h con nota a 8 MWh.
- Objetivo ~58 MWp. Yield único publicado: 1 890 kWh/kWp·año a fijo 29°.
- Exclusiones: palmeral, sabkha/lagos, dunas, patrimonio, aproximación de pista.

**Consumo (escala 6 kW, 220–230 V monofásico)**

- \(I=P/V\) a 230 V; +4,5 % a 220 V.
- Régimen a 30–60 s; inrush aparte.
- Resistiva ±10 % (revisar >15 %).
- Compresor debe ciclar; 100 % ON = falla.
- DOL 5–8× In; anomalía si >10× o >1 s.
- Empalme 6 kW: no juntar calefactor 1 200 + horno 2 200 + arranque de freezer.
- Rangos de energía: invierno 270–420 kWh/mes; verano 170–260; control 346 / 236.
- Tarifa: input de usuario, no constante del analog.

Fin de la extracción. No hay interfaz en este paso.
