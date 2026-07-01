---
name: repo-publish-flow
description: "Geteilter Git-Ablauf (Sync, Branch-Entscheidung, Build-Check, Commit, Push, PR) für Skills in diesem Repo, die Doku-Änderungen unter /site veröffentlichen — aktuell genutzt von add-source und shortcut-curate. Wird i.d.R. von anderen Skills referenziert, nicht direkt vom User aufgerufen. Direkter Trigger nur falls der User explizit 'committe/pushe/erstelle PR' für bereits vorbereitete Doku-Änderungen sagt."
---

# Repo-Publish-Flow

Gemeinsamer Schlussteil für Skills, die Inhalte unter `site/docs-*` verändern und
das Ergebnis als PR bereitstellen wollen. Wird von einem aufrufenden Skill
referenziert (z. B. "führe jetzt den in `repo-publish-flow/SKILL.md`
beschriebenen Ablauf aus"), nicht eigenständig per Skill-Tool verschachtelt
aufgerufen — diese Datei einfach lesen und befolgen.

Der aufrufende Skill liefert dabei:
- **Dateien**, die committed werden sollen.
- **Commit-Message** (1-2 Sätze, Fokus auf das Warum).
- **PR-Titel**, **Summary-Bullets**, **Test-Plan-Bullets**.
- Einen **Branch-Namens-Vorschlag** für den Fall, dass ein neuer Branch nötig ist
  (z. B. `claude/shortcuts-<thema>`).

## Ablauf

### 1. Mit Remote synchronisieren (immer zuerst)

- `git fetch origin`.
- Aktueller Branch ist `main` → `git pull origin main` (fast-forward), damit ein
  neuer Branch garantiert vom aktuellen `main` abzweigt.
- Aktueller Branch ist ein bestehender Topic-Branch mit Remote-Tracking → `git
  pull` auf diesem Branch, um lokale und entfernte Stände (z. B. aus einer
  anderen Session/einem anderen Gerät) zu syncen, **bevor** neue Commits
  entstehen.
- Bei Konflikten beim Pull: **nicht automatisch auflösen** — dem User den
  Konflikt melden und auf Anweisung warten.

### 2. Branch-Entscheidung (Default: nur neuer Branch wenn nötig)

- **Immer alle Branches prüfen**, nicht nur den aktuellen: lokale Branches
  (`git branch`) und Remote-Branches (`git branch -r` bzw. offene PRs via
  GitHub-MCP/`gh pr list`) auflisten.
- Für jeden gefundenen Branch/PR sinngemäß (Name, Titel, Beschreibung,
  bisherige Commits/Dateien) prüfen, ob die aktuelle Anforderung/Änderung
  inhaltlich dazu passt — nicht nur beim aktuellen Branch, sondern über alle
  hinweg.
- Passender bestehender Branch gefunden → **als Vorschlag nennen**, unabhängig
  davon ob es der aktuelle Branch ist oder ein anderer (z. B. "Passt inhaltlich
  zu Branch X — dort weiterarbeiten oder neuen Branch erstellen?"). Nicht
  stillschweigend übernehmen — finale Entscheidung trifft der User.
- Kein inhaltlich passender Branch vorhanden → ein neuer Branch ist nötig.
  **Kurz als Empfehlung nennen** (mit dem vom aufrufenden Skill gelieferten
  Namensvorschlag), nicht stillschweigend erstellen — finale Entscheidung
  trifft der User.
- Entscheidet sich der User für einen anderen als den aktuellen Branch, erst
  dorthin wechseln (`git checkout`/`git switch`) und ggf. wie in Schritt 1
  syncen, bevor es weitergeht.
- Neuer Branch zweigt vom aktuellen Arbeits-Branch ab (nach dem Sync aus
  Schritt 1), nicht zwingend von `main`.

### 3. Build-Check (Pflicht-Vorbedingung)

- `npm run build` in `site/` muss erfolgreich durchlaufen, **bevor** committed
  wird. Bei Fehlern: beheben (z. B. Broken Links durch `onBrokenLinks:
  'throw'`), erneut bauen, erst danach weiter.

### 4. Commit

- Nur die vom aufrufenden Skill benannten Dateien stagen (kein `git add -A`).
- Commit-Message wie geliefert verwenden.

### 5. Push

- Branch zum Remote pushen (`-u` falls neuer Branch).

### 6. PR erstellen oder aktualisieren

- Base immer `main`.
- Neuer Branch → PR mit geliefertem Titel/Summary/Test-Plan erstellen.
- Bestehender Branch/PR → Titel/Beschreibung aktualisieren (z. B. um die neue
  Änderung ergänzen), falls inhaltlich sinnvoll.
- Tool je nach Umgebung (GitHub-MCP-Server oder `gh`-CLI).
- Format:
  ```
  Titel: <vom aufrufenden Skill geliefert>

  ## Summary
  <Bullets vom aufrufenden Skill>

  ## Test plan
  - [x] `npm run build` in `site/` erfolgreich
  - [ ] Preview-Link prüfen, Inhalt gegenlesen
  ```

### 7. Nicht automatisch mergen

- Das Erstellen/Aktualisieren des PR ist das definierte Ende des Ablaufs. Der
  bestehende `pr-preview`-Workflow kommentiert automatisch mit der
  Live-Vorschau-URL (siehe `CLAUDE.md` → "Deploy & PR-Previews"); der User
  prüft die Preview und merged selbst.

## Nicht tun

- Nicht ohne vorherigen Sync (Schritt 1) einen neuen Branch erstellen.
- Branch-Wahl (neu vs. bestehend) nicht selbst entscheiden, nur empfehlen.
- Keine ungefragten Dateien mitcommitten.
- Konflikte beim Pull nicht automatisch auflösen.
- Nicht automatisch mergen.
