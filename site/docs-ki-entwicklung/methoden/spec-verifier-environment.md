---
sidebar_position: 1
---

# Spec, Verifier, Environment

Andrej Karpathys 3-Schichten-Methode, mit der sich Claude (bzw. KI-Agenten
generell) deutlich effektiver einsetzen lässt — vorgestellt auf der
AISN-2026-Konferenz.

:::info Quelle
[YouTube-Video](https://www.youtube.com/watch?v=7zZy1QTvokM), analysiert mit
Gemini + Claude. Volle Rohanalyse:
[`sources/youtube-analysis/karpathy-claude-spec-verifier-environment.md`](https://github.com/Tecch-Git/SecondBrain/blob/main/sources/youtube-analysis/karpathy-claude-spec-verifier-environment.md)
:::

## Kernidee

Die Methode gliedert sich in drei Schichten:

1. **Spec** — wie man sein Verständnis der Aufgabe an die KI überträgt.
2. **Verifier** — wie man Qualität messbar macht, da KI nur auf Basis von
   Signalen handeln kann.
3. **Environment** — wie man die Arbeitsumgebung von Claude (`claude.md`,
   Wissensbasis, Skills, Guardrails) strukturiert.

Kernbotschaft: Man kann das *Denken* an die KI auslagern, aber nicht das
*Verständnis der größeren Zusammenhänge*.

## Kernkonzepte

- **Spec statt Plan Mode** — Claudes Plan Mode ist oft zu hochlevelig.
  Stattdessen gemeinsam mit dem Agenten eine detaillierte Spezifikation
  erarbeiten.
- **Goal uncovering** — das eigentliche Ziel kann die KI nicht selbst
  bestimmen; Claude soll es per Interview erfragen.
- **Agile statt Waterfall** — die Aufgabe in kleine, überprüfbare Häppchen
  zerlegen, statt sie komplett durchzuziehen und erst am Ende zu zeigen.
- **Präzision & explizite Verifikation** — jede Annahme der KI ist eine
  Chance für Drift. Entscheidungen explizit verifizieren statt implizit
  anzunehmen.
- **Robot-Librarian-Mentalmodell** — die KI ist wie ein Bibliothekar ohne das
  passende Buch: Ohne Kontext erfindet sie selbstbewusst etwas, statt zu
  sagen "ich weiß es nicht". LLMs sind "statistische Simulationsschaltkreise"
  ohne nicht-messbares Verständnis.
- **Verification Lever statt menschlicher Interaktion** — "Mach das besser"
  funktioniert nicht. Der wirksame Hebel ist, Evaluationskriterien *vorab*
  präzise festzulegen.
- **Zweites KI-Modell als Kritiker** — bei komplexen Builds das Ergebnis durch
  ein zweites Modell (z. B. Codex) gegenprüfen lassen.
- **Externer Feedback-Loop** — die Session wo möglich mit dem realen System
  verbinden oder historische Reports als Referenz einbringen. Laut Boris
  Cherny (Erfinder von Claude Code) verbessert ein Feedback-Loop die Qualität
  um das 2- bis 3-Fache.
- **`claude.md`-Datei** — wird automatisch von Claude eingelesen; das Erste,
  was Claude liest, um sein Verhalten zu bestimmen.
- **LLM-Wissensbasis ("Your data is your moat")** — ein eigenes Ordnersystem
  mit eigenen Trainingsdaten aufbauen, damit Claude weiß, wo welche
  Information liegt.
- **Custom Skills** — für wiederkehrende Aufgaben eigene Skills erstellen.
- **Tool-Level-Guardrails statt Prompt-Level-Regeln** — Regeln, was die KI
  bearbeiten darf, auf Tool-Ebene erzwingen (z. B. via Pre-Tool-Use-Hook),
  nicht nur im Prompt formulieren. Einteilung in *Always do*, *Ask first*,
  *Never do*.

## Schritt-für-Schritt

1. **Spec-Phase** — Claude bitten, dich zu interviewen, um das eigentliche
   Ziel herauszuarbeiten. Auf einen modularen, agilen Zuschnitt bestehen.
   Schlüsselentscheidungen explizit verifizieren.
2. **Verifier-Phase** — vor Beginn der Arbeit präzise Evaluationskriterien
   definieren. Bei komplexen Builds ein zweites Modell als Kritiker
   hinzuziehen. Wo möglich externe/reale Signale als Feedback-Loop einbinden.
3. **Environment-Phase** — eine `claude.md`-Datei mit klarer Struktur
   anlegen (Repo-Kontext, Skills & Routing, Wissensbasis-Architektur,
   Kernregeln), eine eigene LLM-Wissensbasis als Ordnerstruktur aufbauen,
   wiederkehrende Aufgaben als Custom Skills definieren, Tool-Level-Guardrails
   einrichten.

## Prompt-Vorlagen

**Spec erstellen (Layer 1):**

```text
Create a detailed, tightly scoped specification for the goal we discussed.
Interview me to uncover the core goal, bias toward a modular and agile
approach, and force me to explicitly verify key decisions.
```

**Evaluationskriterien festlegen (Layer 2):**

```text
For the upcoming task, outline the precise evaluation criteria you will
use to verify the quality of the output. If the build becomes complex,
suggest running the final output through a secondary model or external
check to ensure alignment.
```

**Environment-Audit & Setup (Layer 3):**

```text
Audit our current system and workflow. Help me structure an optimized
environment for Claude, including guidelines for a claude.md file,
organization for an LLM knowledge base, definition of custom repeatable
skills, and tool-level guardrails categorized into always do, ask first,
and never do.
```

**`claude.md`-Struktur:**

```text
# Repository Structure & Context
# Custom Skills & Routing
# Knowledge & Training Data Architecture
# Core Operating Rules
```

**Pre-Tool-Hook-Beispiel (sinngemäß, JS/TS):**

```js
function preToolUseHook(targetPath) {
  if (targetPath.startsWith('important_dont_edit/')) {
    throw new Error('Tool execution blocked: path is protected.');
  }
}
```

## Tools & Ressourcen

- **Claude / Claude Code** — zentrales Werkzeug der Methode
- **Codex** (Plugin) — als zweites Modell zur Kritik/Verifikation
- **Gemini, Groq, ChatGPT** — im Video erwähnte weitere Tools
- **Andrej Karpathy** — Urheber der Methode, Vortrag auf der AISN-2026-Konferenz
- **Boris Cherny** — Creator von Claude Code, zitiert zum Effekt von
  Feedback-Loops
