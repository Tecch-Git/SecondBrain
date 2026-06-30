# ECC Skill-Discovery: ecc-guide, skill-scout, agent-sort

**Quelle:** https://github.com/affaan-m/ECC — lokal installiert als
Plugin-Marketplace, analysiert direkt aus den installierten `SKILL.md`-Dateien
unter `~/.claude/plugins/marketplaces/ecc/skills/{ecc-guide,skill-scout,agent-sort}/SKILL.md`
**Thema:** Drei Skills aus dem "Everything Claude Code" (ECC) Plugin-Marketplace,
die beim Finden/Auswählen des richtigen Claude-Code-Skills für eine konkrete
Aufgabe helfen — Anlass war die Frage, ob SecondBrain einen eigenen neuen Skill
für diesen Zweck braucht.
**Datum:** 01.07.2026

---

## Zusammenfassung

ECC ist ein Plugin-Marketplace mit einem sehr großen Katalog an Skills,
Agents und Commands für Claude Code. Bei der Frage "welcher Skill passt für
meine aktuelle Aufgabe?" überschneiden sich drei bereits vorhandene
ECC-Skills, die unterschiedliche Phasen desselben Grundproblems abdecken:
`ecc-guide` beantwortet "was nutze ich für Aufgabe X?" über den gesamten
Katalog, `skill-scout` prüft vor dem Bau eines neuen Skills, ob es schon
etwas Passendes gibt, und `agent-sort` entscheidet einmalig pro Repository,
welche ECC-Komponenten standardmäßig geladen werden sollen. Ergebnis der
Recherche: ein neuer, eigener SecondBrain-Skill für die Skill-Suche ist
nicht nötig, da `ecc-guide` den ursprünglich beschriebenen Anwendungsfall
(z. B. "welcher Skill hilft mir, ein .NET-Feature zu planen?") bereits
abdeckt.

## Kernkonzepte

### Gemeinsamer Kontext

- **Plugin-Marketplace, kein Claude-Core-Feature** — alle drei Skills kommen
  ausschließlich über das ECC-Plugin (`~/.claude/plugins/marketplaces/ecc/`),
  nicht nativ mit Claude Code. Ohne installiertes ECC-Plugin sind sie nicht
  verfügbar.
- **`origin`-Frontmatter-Feld** — unterscheidet nur, *wer innerhalb von ECC*
  beigetragen hat: `community` (externer Beitrag per PR) vs. `ECC`
  (Kernteam-gepflegt). Keine der beiden Varianten ist "mehr" oder "weniger"
  offiziell installiert — beide sind Teil desselben Marketplace-Installs.

### `ecc-guide`

- **Frontmatter:** `name: ecc-guide`, `origin: community`.
- **Beschreibung:** "Guide users through ECC's current agents, skills,
  commands, hooks, rules, install profiles, and project onboarding by
  reading the live repository surface before answering."
- **Wann nutzen:** User fragt, was ECC enthält, sucht einen Skill/Command/
  Agent/Hook/Rule/Install-Profile, ist neu im Repo, fragt "wie mache ich X
  mit ECC?", fragt welche ECC-Komponenten zu einem Projekt passen, oder ist
  bei Install-Pfaden verwirrt.
- **Core Principle:** "Answer from current files, not memory." ECC ändert
  sich schnell — Kataloggrößen, Feature-Listen und Install-Anleitungen
  veralten schnell, deshalb werden relevante Dateien live geprüft statt aus
  dem Gedächtnis beantwortet (`node scripts/ci/catalog.js --json`,
  `find skills -maxdepth 2 -name SKILL.md`, etc.).
- **Repository Map:** README.md (Install/Uninstall/FAQ), AGENTS.md
  (Contributor-Guidance), `commands/` (Slash-Command-Shims), `skills/*/SKILL.md`
  (Workflows), `agents/*.md` (Subagent-Rollen), `rules/`, `hooks/`,
  `manifests/install-*.json`, `docs/`.
- **Feature-Discovery-Workflow** (genau der gesuchte Anwendungsfall): für
  "was sollte ich für X benutzen?" zuerst `skills/`, `commands/`, `agents/`
  durchsuchen, Skills als primäre Workflow-Oberfläche bevorzugen, Commands
  nur als gepflegten Kompatibilitäts-Shim nennen, Agents bei Delegation
  erwähnen.
- **Response-Style:** Antwort zuerst (was nutzen, warum, exakte Datei/
  Command, eine nächste Aktion), keine vollständige Katalog-Auflistung als
  Standard.
- **Output-Templates:** "Short Recommendation" (Skill + Begründung + Datei +
  Verify-Befehl + nächster Schritt), "Search Results" (Liste mit
  Begründung + Empfehlung), "Install Plan Summary".
- **Verwandte Surfaces:** `/project-init`, `/harness-audit`, `/skill-health`,
  `/skill-create`, `/security-scan`.

### `skill-scout`

- **Frontmatter:** `name: skill-scout`, `origin: community` (laut SKILL.md
  "salvaged from stale community PR #1232 by `redminwang`").
- **Beschreibung:** "Search existing local, marketplace, GitHub, and web
  skill sources before creating a new skill. Use when the user wants to
  create, build, fork, or find a skill for a workflow."
- **Wann nutzen:** "create a skill", "build a skill", "make a skill", "new
  skill", "is there a skill for X?", "does a skill exist that does Y?", vor
  dem Vorschlag, einen neuen Skill zu bauen, oder beim Forken/Erweitern
  eines bestehenden Skills. Bei explizitem "skip search"/"create from
  scratch" wird die Suche übersprungen.
- **6-Schritt-Workflow:**
  1. **Capture Intent** — Aufgabe, Trigger-Bedingungen, Domäne/Tools/
     Frameworks, 3–5 Suchbegriffe + Synonyme extrahieren.
  2. **Search Local Sources** — zuerst `~/.claude/skills` und
     `~/.claude/plugins/marketplaces` (lokal bevorzugt, da bereits Teil der
     Umgebung), per `find`/`grep` über Namen und Frontmatter-Beschreibungen.
  3. **Search Remote Sources** — `gh search repos`/`gh search code`, plus
     maximal drei gezielte Websuchen (`"claude code skill" keyword`,
     `"SKILL.md" keyword`, `"everything-claude-code" keyword`).
  4. **Vet External Matches** — Frontmatter/Instructions lesen, auf
     unerwartete Shell-Commands/Datei-Writes/Netzwerk-Calls/Credential-
     Handling/Paket-Installs prüfen, Maintenance-Status checken, externe
     Skills in einen Branch kopieren statt Marketplace-Originale zu editieren.
  5. **Rank Results** — Reihenfolge: exakter Name-Match → Beschreibung-Match
     → lokale/Marketplace-Quelle → gepflegte GitHub-Quelle → reine
     Web-Erwähnung. Maximal 10 Ergebnisse.
  6. **Present Decision Options** — Tabelle mit drei Optionen: "Use
     existing", "Fork or extend", "Create fresh". Ein neuer Skill wird erst
     gebaut, wenn der User diese Option wählt oder keine Nahübereinstimmung
     gefunden wurde.
- **Anti-Patterns:** nicht direkt zur Neuerstellung springen, externe Skills
  nicht ungelesen installieren, keine lange unranked Liste schwacher
  Treffer, Web-only-Erwähnungen nicht als vertrauenswürdig behandeln,
  installierte Marketplace-Originale nicht direkt editieren.
- **Verwandte Skills:** `search-first` (allgemeines Search-before-Building),
  `skill-stocktake` (Audit installierter Skills), `agent-sort`.

### `agent-sort`

- **Frontmatter:** `name: agent-sort`, `origin: ECC`.
- **Beschreibung:** "Build an evidence-backed ECC install plan for a
  specific repo by sorting skills, commands, rules, hooks, and extras into
  DAILY vs LIBRARY buckets using parallel repo-aware review passes. Use
  when ECC should be trimmed to what a project actually needs instead of
  loading the full bundle."
- **Wann nutzen:** ein Repo braucht nur eine Teilmenge von ECC, Voll-Installs
  sind zu unübersichtlich, ein Team will eine wiederholbare, evidenzbasierte
  Install-Entscheidung statt Meinung, oder ein Repo ist in falsche Sprache/
  Regeln/Hooks "verdriftet".
- **Non-Negotiable Rules:** aktuelles Repo als Source of Truth (keine
  generischen Präferenzen), jede DAILY-Entscheidung braucht konkrete
  Repo-Evidenz, LIBRARY heißt "behalten, aber nicht standardmäßig laden"
  (nicht löschen), keine inkompatiblen Hooks/Rules/Scripts installieren,
  ECC-native Surfaces bevorzugen statt ein zweites Install-System
  einzuführen.
- **Zwei-Buckets-Modell:** `DAILY` (jede Session laden, stark zum Stack/
  Workflow passend) vs. `LIBRARY` (nützlich, aber nicht standardmäßig
  geladen — erreichbar über Suche/Router/manuelle Nutzung).
- **Evidenzquellen:** Dateiendungen, Package-Manager/Lockfiles, Framework-
  Configs, CI/Hook-Configs, Build/Test-Scripts, Imports/Dependency-
  Manifeste, Repo-Doku.
- **6-Schritt-Workflow:** Repo lesen (Stack ermitteln) → Evidenz-Tabelle
  bauen (Komponente, Typ, Bucket, Evidenz, Begründung) → DAILY/LIBRARY
  entscheiden → Install-Plan ableiten → optionalen `skill-library`-Router
  anlegen → Ergebnis verifizieren (alle DAILY-Dateien vorhanden, keine
  veralteten Sprach-Regeln aktiv, keine inkompatiblen Hooks installiert).
- **Output-Format:** STACK / DAILY / LIBRARY / INSTALL PLAN / VERIFICATION.
- **Handoffs:** `configure-ecc` (interaktive Installation/Reparatur),
  `skill-stocktake` (Overlap-Cleanup), `strategic-compact` (breiteres
  Context-Trimming).

## Schritt-für-Schritt: welchen Skill wann nutzen

1. **Konkrete Einzelaufgabe vor mir** (z. B. ".NET-Feature planen, bevor ich
   Code schreibe") → `ecc-guide` fragen, was ECC dafür anbietet.
2. **Ich will einen neuen Custom Skill bauen** → zuerst `skill-scout`
   laufen lassen, um Duplikate zu vermeiden; erst danach neu bauen, wenn
   kein Match gefunden wurde oder der User das explizit will.
3. **Neues Repo/Projekt einrichten** → einmalig `agent-sort`, um zu
   entscheiden, welche ECC-Komponenten standardmäßig geladen werden sollen;
   danach nur bei größeren Stack-Änderungen erneut.

## Tools & Ressourcen

- **ECC (Everything Claude Code)** — Plugin-Marketplace,
  https://github.com/affaan-m/ECC, lokal installiert unter
  `~/.claude/plugins/marketplaces/ecc/`.
- **`gh`-CLI** — für `skill-scout`s Remote-Suche (Schritt 3) optional, aber
  empfohlen.
- **`node scripts/ci/catalog.js` / `scripts/install-plan.js`** — von
  `ecc-guide` genutzte Hilfsskripte innerhalb des ECC-Repos zur
  Live-Auskunft über Katalog und Install-Profile.

## Meine Notizen / Nächste Schritte

---
*Quelle: lokal installierte `SKILL.md`-Dateien aus dem ECC-Plugin
(github.com/affaan-m/ECC), analysiert mit Claude*
