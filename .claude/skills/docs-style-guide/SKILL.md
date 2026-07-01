---
name: docs-style-guide
description: "Geteilte Stil- und Terminologie-Regeln für alle Skills, die Inhalte unter site/docs-* schreiben (aktuell shortcut-curate, potenziell add-source). Wird von einem aufrufenden Skill referenziert, nicht direkt vom User aufgerufen. Definiert Tonalität, Fachbegriff-Normalisierung, Shortcut-vs-Befehl-Unterscheidung und das Tabellenformat für Shortcut-/Befehl-Übersichten."
---

# Doku-Stil & Terminologie

Gemeinsame Stilregeln für veröffentlichte Doku-Inhalte unter `site/docs-*`.
Wird von einem aufrufenden Skill referenziert (z. B. "wende die Regeln aus
`docs-style-guide/SKILL.md` an"), nicht eigenständig per Skill-Tool
aufgerufen.

## Tonalität

- Professionell, technisch, knapp. Kein Chat-Ton, keine Füllwörter, keine
  Wiederholung von Kontext, der aus Tabellen-Kopf/Kategorie bereits
  hervorgeht.
- Tabellenzellen: prägnante Fragmente statt vollständiger Sätze. Fließtext
  (z. B. auf Prosa-Seiten von `add-source`) darf vollständige Sätze nutzen,
  bleibt aber ebenso knapp und sachlich.

## Fachbegriff-Normalisierung

- Etablierte Fachbegriffe verwenden, unabhängig davon, welche Formulierung
  der User im Prompt benutzt hat. Beispiel: User sagt "Eingabe leeren" →
  Doku-Text nutzt den Standardbegriff "Eingabezeile löschen".
- Bei uneindeutigen/umgangssprachlichen Begriffen die in der jeweiligen
  Tool-Dokumentation etablierte Bezeichnung bevorzugen (z. B. offizielle
  Microsoft-/Docusaurus-/Browser-Terminologie).
- Deutsch als Grundsprache der Doku; gängige englische Fachbegriffe (z. B.
  "Shortcut", "Prompt", "Branch") bleiben unübersetzt, wenn sie im
  deutschsprachigen technischen Kontext üblich sind.

## Shortcut vs. Befehl

- **Shortcut**: einzelner Tastendruck oder eine Tastenkombination (z. B.
  `Esc`, `Strg+C`), löst die Wirkung unmittelbar beim Drücken aus.
- **Befehl**: getippte Eingabe, die erst mit Enter bestätigt werden muss
  (z. B. `cls`, `git status`).
- Automatisch aus der Beschreibung des Eintrags ableiten (Tastendruck vs.
  Eingabe+Enter). Nur bei echter Uneindeutigkeit mit dem User klären.
- Beide Arten können in derselben Kategorie vorkommen, werden dort aber in
  getrennten Tabellen geführt (siehe Tabellenformat unten sowie die
  Struktur-Konvention in `shortcut-curate/SKILL.md`).

## Tabellenformat für Shortcut-/Befehl-Übersichten

- Spalte 1 (`Shortcut`/`Befehl`): exakte Tastenkombination bzw. exakter
  Befehlstext, in Backticks.
- Spalte `Wirkung`: ein kurzer, prägnanter Fragment-Satz, was der Eintrag
  bewirkt — keine Zusatzinfos, keine Wiederholung von Tool/OS (steht schon
  in Kategorie/Tabellentitel). Beispiel: "Aktuelle Eingabezeile löschen".
- Spalte `Notizen`: Zusatzinfos, Optionen, Plattform-Varianten,
  Abgrenzungen — nur befüllen, wenn es tatsächlich etwas Relevantes zu
  ergänzen gibt, sonst leer lassen.

## Nicht tun

- Keine Marketing-/Blog-Sprache ("cool", "super einfach", Ausrufezeichen).
- Keine langen Fließtext-Erklärungen in Tabellenzellen — Details gehören in
  die Notizen-Spalte oder auf eine verlinkte Unterseite.
- Prompt-Formulierungen des Users nicht 1:1 übernehmen, wenn ein etablierter
  Fachbegriff existiert.
