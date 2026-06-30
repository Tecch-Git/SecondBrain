---
sidebar_position: 2
---

# Den richtigen ECC-Skill finden

"Everything Claude Code" (ECC) ist ein **Plugin-Marketplace** mit hunderten
Skills, Agents und Commands für Claude Code — nicht Teil von Claude Code
selbst. Wer ECC installiert, hat plötzlich Zugriff auf einen riesigen
Katalog, in dem es schwerfällt, den passenden Skill für eine konkrete
Aufgabe zu finden. Drei bereits vorhandene ECC-Skills decken genau das ab.

:::info[Quelle]
[github.com/affaan-m/ECC](https://github.com/affaan-m/ECC), lokal installiert
unter `~/.claude/plugins/marketplaces/ecc/`. Volle Rohanalyse:
[`sources/analysis/ecc-skill-discovery.md`](https://github.com/Tecch-Git/SecondBrain/blob/main/sources/analysis/ecc-skill-discovery.md)
:::

## Wichtig: keiner dieser Skills ist "von Claude vorinstalliert"

Alle drei unten beschriebenen Skills kommen **ausschließlich über das
ECC-Plugin** — sie sind kein nativer Bestandteil von Claude Code. Das
Frontmatter-Feld `origin` im jeweiligen `SKILL.md` unterscheidet nur, *wer
innerhalb von ECC* den Skill beigesteuert hat:

- `origin: community` — von einem externen Community-Mitglied per PR
  beigetragen (z. B. `skill-scout`, `ecc-guide`).
- `origin: ECC` — vom ECC-Kernteam selbst gepflegt (z. B. `agent-sort`).

Voraussetzung für alle drei: das ECC-Plugin muss installiert sein. Ohne ECC
sind diese Skills nicht verfügbar.

## Die drei Skills im Überblick

| Skill | Zweck | Herkunft | Wann nutzen |
| --- | --- | --- | --- |
| **`ecc-guide`** | Beantwortet "welcher Skill/Agent/Command passt für Aufgabe X?" über den *gesamten* ECC-Katalog | community | Laufende Arbeit: ich habe eine konkrete Aufgabe und will wissen, was ECC dafür anbietet |
| **`skill-scout`** | Prüft *vor dem Bau eines neuen Skills*, ob lokal, im Marketplace oder auf GitHub schon etwas Passendes existiert | community | Bevor ein neuer Custom Skill erstellt wird — Duplikate vermeiden |
| **`agent-sort`** | Klassifiziert den *gesamten* ECC-Katalog für ein bestimmtes Repo in „täglich laden" (DAILY) vs. „nur bei Bedarf" (LIBRARY) | ECC (Kernteam) | Einmalige Repo-Einrichtung: welche ECC-Komponenten sollen in diesem Projekt standardmäßig geladen sein |

Die Abgrenzung in einem Satz: **`ecc-guide`** beantwortet *"was nutze ich
gerade für diese eine Aufgabe?"*, **`skill-scout`** beantwortet *"gibt es
das schon, bevor ich etwas Neues baue?"*, **`agent-sort`** beantwortet
*"was soll in diesem Repo dauerhaft mitgeladen werden?"*.

## `ecc-guide` — der Skill-Finder für laufende Aufgaben

Für eine konkrete Aufgabe (z. B. "ich will für ein .NET-Backend ein Feature
planen, bevor ich es umsetze") durchsucht `ecc-guide` live `skills/`,
`commands/` und `agents/` im ECC-Katalog und empfiehlt die passende(n)
Komponente(n) — mit Begründung und konkretem Pfad/Befehl, nicht aus dem
Gedächtnis, sondern direkt aus den aktuellen Dateien.

**Trigger:** "was sollte ich für X benutzen?", "gibt es einen Skill/Agent
für Y?", generelle Fragen "wie mache ich X mit ECC?", Verwirrung bei
Install-Pfaden.

**Voraussetzung:** ECC-Plugin installiert; für volle Treffsicherheit Zugriff
auf die lokalen Marketplace-/Cache-Dateien (vorhanden, sobald ECC
installiert ist).

**Aufruf:** entweder implizit (Claude erkennt die Formulierung und ruft den
Skill selbst auf) oder explizit per `/ecc-guide` im Prompt.

**Beispiel-Prompt:**

```text
Ich will in unserem .NET-Backend ein neues Feature umsetzen und zuerst die
Anforderungen klären, bevor ich Code schreibe. Welcher ECC-Skill (oder
welche Kombination) passt dafür am besten?
```

`ecc-guide` antwortet dann mit einer kurzen, begründeten Empfehlung statt
einer langen Liste — z. B. `feature-dev` oder `plan-prd` plus den
passenden `csharp-reviewer`-Agent für die spätere Review-Phase.

## `skill-scout` — Dubletten-Check vor dem Skill-Bau

Bevor ein neuer Custom Skill erstellt wird, sucht `skill-scout` zuerst
lokal installierte Skills, dann den ECC-Marketplace, dann GitHub/Web — und
gibt erst danach grünes Licht für eine Neuentwicklung (oder schlägt vor,
einen bestehenden Skill zu forken/erweitern).

**Trigger:** "erstelle einen Skill", "baue einen Skill für …", "gibt es
einen Skill, der …?" kurz bevor eine Neuentwicklung vorgeschlagen wird.

**Voraussetzung:** ECC-Plugin installiert; für Schritt 3 (Remote-Suche)
idealerweise `gh`-CLI mit Login sowie Web-Suche verfügbar — sonst nur
lokale Suche, mit ehrlichem Hinweis auf das Fehlen der Remote-Quellen.

**Aufruf:** implizit bei "Skill erstellen"-Anfragen, oder explizit per
`/skill-scout`.

**Ergebnis:** eine geordnete Tabelle mit Kandidaten (Treffer, Quelle,
Warum-Match, Lücke) und drei Optionen: bestehenden Skill nutzen, forken/
erweitern, oder neu bauen.

## `agent-sort` — Repo-weite Install-Kuratierung

Anders als die beiden anderen geht es hier nicht um eine einzelne Aufgabe,
sondern um eine einmalige (oder gelegentliche) Entscheidung pro Repository:
welche ECC-Skills, -Agents, -Rules und -Hooks sollen in *diesem* Projekt
standardmäßig geladen werden, und welche bleiben nur auf Abruf verfügbar?
Das Ergebnis ist evidenzbasiert (Dateiendungen, Lockfiles, Configs im Repo),
nicht aus Bauchgefühl.

**Trigger:** ein Repo soll von der ECC-Vollinstallation auf einen
projektspezifischen Ausschnitt reduziert werden; das Repo hat sich
"verdriftet" (falsche Sprache/Regeln/Hooks aktiv).

**Voraussetzung:** ECC-Plugin installiert; wird *innerhalb* des Zielrepos
ausgeführt, da es dessen Dateien (package.json, pyproject.toml, Cargo.toml,
…) als Beweis durchsucht.

**Aufruf:** explizit per `/agent-sort`, typischerweise einmal pro Projekt
bei der Einrichtung, danach nur bei größeren Stack-Änderungen erneut.

## Fazit für SecondBrain

Ein eigener neuer Skill für die Skill-Suche war nicht nötig — `ecc-guide`
deckt genau diesen Anwendungsfall bereits ab. Diese Seite dient als
Spickzettel, **welcher der drei vorhandenen Skills wofür greift**, damit
die Auswahl beim nächsten Mal nicht erneut recherchiert werden muss.
