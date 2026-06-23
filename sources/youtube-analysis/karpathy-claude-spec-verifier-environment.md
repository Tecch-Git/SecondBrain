# Karpathys 3-Schichten-Methode für besseres Prompting mit Claude (Spec, Verifier, Environment)

**Quelle:** https://www.youtube.com/watch?v=7zZy1QTvokM
**Thema:** Andrej Karpathys Methode, Claude über drei Schichten – Spec, Verifier und Environment – systematisch und 10x effektiver einzusetzen.
**Datum:** 23.06.2026

---

## Zusammenfassung
Das Video stellt Andrej Karpathys Methode vor, mit der man Claude (bzw. KI-Agenten generell) deutlich effektiver einsetzen kann, vorgestellt auf der AISN-2026-Konferenz. Die Methode gliedert sich in drei Schichten: die **Spec** (wie man sein Verständnis der Aufgabe an die KI überträgt), den **Verifier** (wie man Qualität messbar macht, da KI nur auf Basis von Signalen handeln kann) und das **Environment** (wie man die Arbeitsumgebung von Claude – claude.md, Wissensbasis, Skills, Guardrails – strukturiert). Kernbotschaft: Man kann das Denken an die KI auslagern, aber nicht das Verständnis der größeren Zusammenhänge.

## Kernkonzepte

- **Die drei Schichten (Spec, Verifier, Environment):** Grundgerüst der Methode – Spec liefert Verständnis, Verifier liefert Qualitätssignal, Environment liefert Kontext/Struktur.
- **Spec statt Plan Mode:** Karpathy hält Claudes Plan Mode für zu hochlevelig. Stattdessen sollte man gemeinsam mit dem Agenten eine detaillierte Spezifikation erarbeiten.
- **Goal uncovering:** Das eigentliche Ziel (die Entscheidung/Konklusion, die der Report treiben soll) kann KI nicht selbst bestimmen – Claude soll es per Interview erfragen.
- **Agile statt Waterfall:** Statt eine große Aufgabe komplett durchzuziehen und erst am Ende zu zeigen (Waterfall), soll die Aufgabe in kleine, überprüfbare Häppchen zerlegt werden (Agile), um Zwischenergebnisse zu sehen.
- **Präzision & explizite Verifikation:** Jede Annahme, die die KI trifft, ist eine Chance für Drift. Entscheidungen sollen explizit verifiziert werden, nicht implizit angenommen.
- **Robot-Librarian-Mentalmodell:** KI ist wie ein Bibliothekar ohne das passende Buch – sie kann nicht helfen und erfindet stattdessen selbstbewusst etwas. Verdeutlicht, dass KI "statistische Simulationsschaltkreise" sind, die kein nicht-messbares Verständnis haben.
- **Verification Lever statt menschlicher Interaktion:** "Mach das besser" funktioniert nicht – der einzige wirksame Hebel ist, Evaluationskriterien vorab präzise festzulegen.
- **Zweites KI-Modell als Kritiker:** Bei komplexen Builds das Ergebnis durch ein zweites Modell (z. B. Codex) gegenprüfen lassen, um Übereinstimmung sicherzustellen.
- **Externes Signal / Feedback-Loop:** Wo möglich, die Claude-Session mit dem realen System verbinden oder historische Reports als Referenz einbringen. Laut Boris Cherny (Erfinder von Claude Code) verbessert ein Feedback-Loop die Qualität um das 2- bis 3-Fache.
- **claude.md-Datei:** Wird automatisch von Claude eingelesen und ist das Erste, was Claude liest, um sein Verhalten zu bestimmen.
- **LLM-Wissensbasis ("Your data is your moat"):** Ein eigenes Ordnersystem mit eigenen Trainingsdaten aufbauen, damit Claude weiß, wo welche Information liegt.
- **Custom Skills:** Für wiederkehrende Aufgaben eigene Skills erstellen ("Der beste Weg, ein Leck in einem Schlauch zu finden, ist Wasser durchlaufen zu lassen").
- **Tool-Level-Guardrails statt Prompt-Level-Regeln:** Regeln, was die KI bearbeiten darf, sollen auf Tool-Ebene erzwungen werden (z. B. via Pre-Tool-Use-Hook), nicht nur im Prompt formuliert. Einteilung in drei Kategorien: *Always do*, *Ask first*, *Never do*.

## Prompt-Vorlagen & Beispiele

**Spec erstellen (Layer 1):**
```
Create a detailed, tightly scoped specification for the goal we discussed.
Interview me to uncover the core goal, bias toward a modular and agile
approach, and force me to explicitly verify key decisions.
```

**Evaluationskriterien festlegen (Layer 2):**
```
For the upcoming task, outline the precise evaluation criteria you will
use to verify the quality of the output. If the build becomes complex,
suggest running the final output through a secondary model or external
check to ensure alignment.
```

**Environment-Audit & Setup (Layer 3):**
```
Audit our current system and workflow. Help me structure an optimized
environment for Claude, including guidelines for a claude.md file,
organization for an LLM knowledge base, definition of custom repeatable
skills, and tool-level guardrails categorized into always do, ask first,
and never do.
```

**Pre-Tool-Hook-Beispiel (gezeigt im Video, sinngemäß, JS/TS):**
```js
function preToolUseHook(targetPath) {
  if (targetPath.startsWith('important_dont_edit/')) {
    throw new Error('Tool execution blocked: path is protected.');
  }
}
```

**claude.md-Struktur (gezeigt im Video):**
```
# Repository Structure & Context
# Custom Skills & Routing
# Knowledge & Training Data Architecture
# Core Operating Rules
```

## Schritt-für-Schritt Anleitungen

1. **Spec-Phase:** Claude bitten, dich zu interviewen, um das eigentliche Ziel herauszuarbeiten. Auf einen modularen, agilen Zuschnitt der Aufgabe bestehen. Dich selbst zwingen, Schlüsselentscheidungen explizit zu verifizieren.
2. **Verifier-Phase:** Vor Beginn der eigentlichen Arbeit präzise Evaluationskriterien definieren. Bei komplexen Builds ein zweites Modell (z. B. Codex) als Kritiker hinzuziehen. Wo möglich, externe/reale Signale (laufendes System, historische Reports) als Feedback-Loop einbinden.
3. **Environment-Phase:** Eine claude.md-Datei mit klarer Struktur (Repo-Kontext, Skills & Routing, Wissensbasis-Architektur, Kernregeln) anlegen. Eine eigene LLM-Wissensbasis als Ordnerstruktur aufbauen. Wiederkehrende Aufgaben als Custom Skills definieren. Tool-Level-Guardrails (z. B. Pre-Tool-Use-Hooks) einrichten und Regeln in *Always do / Ask first / Never do* einteilen.

## Tools & Ressourcen

- **Claude / Claude Code** – zentrales Werkzeug der Methode
- **Codex (Plugin)** – als zweites Modell zur Kritik/Verifikation
- **Gemini, Groq, ChatGPT** – im Video erwähnte weitere Tools
- **Andrej Karpathy** – Urheber der Methode, Vortrag auf der AISN-2026-Konferenz
- **Boris Cherny** – Creator von Claude Code, zitiert zum Effekt von Feedback-Loops
- Twitter/X-Referenz auf Karpathys viral gegangenes "LLM knowledge base"-Konzept

## Meine Notizen / Nächste Schritte

---
*Quelle: YouTube-Video, analysiert mit Gemini + Claude*
