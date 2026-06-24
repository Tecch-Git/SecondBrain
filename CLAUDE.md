# CLAUDE.md — SecondBrain

Kontext für Claude Code (und andere Sessions/Tools), die an diesem Repo arbeiten.

## Projektziel

Privates, KI-gestützt entwickeltes Wissens-Wiki ("Second Brain"), ausgeliefert als
statische Website über GitHub Pages. Zweck:

- Von überall (Arbeit/privat) abrufbar, kostenlos gehostet.
- Lesen zur eigenen Erinnerung.
- Templates/Snippets per Copy-Button herauskopierbar, zur Weiterverwendung in anderen
  Tools (z. B. GitHub Copilot, Claude bei der Arbeit).
- Erster inhaltlicher Bereich: "KI-gestützte Entwicklung" (Claude Code & Copilot
  Workflows, Prompting-Patterns), mit der Spec/Verifier/Environment-Methode als ein
  Kapitel darunter (nicht als alleiniger Fokus).
- Später weitere, unabhängige Dokubereiche geplant (z. B. Tastatur-Shortcuts-Library).

## Repo-Struktur

```
/SecondBrain
  /site/        Docusaurus-Frontend (Site-Generator). Noch nicht gescaffoldet.
                 Enthält künftig docusaurus.config, eigene /docs pro Dokubereich,
                 /static, etc. Build-Artefakte (node_modules, build/) sind ignoriert.
  /sources/      Rohmaterial und Vorlagen — nicht selbst die Website, sondern die
                 Grundlage, aus der Doku-Inhalte entstehen oder die eigenständig
                 weiterverwendet werden.
    /prompt-templates/   Eigene Prompt-Vorlagen, direkt nutzbar UND später ggf.
                          zusätzlich über die Website abrufbar/kopierbar gemacht.
    /youtube-analysis/   Analysen externer Quellen (z. B. Karpathys "Spec, Verifier,
                          Environment"-Methode). Dient als Quelle für einzelne
                          Doku-Kapitel.
  CLAUDE.md      Diese Datei.
```

`SESSION-CONTEXT.md` (falls vorhanden) ist reiner Übergabe-Kontext zwischen
Tool-Wechseln (z. B. VS Code → Claude Code) und wird nicht committed (siehe
`.gitignore`).

## Site-Generator: Docusaurus

Begründung der Wahl: native Multi-Instance-Docs für mehrere wählbare Dokubereiche,
Code-Blöcke mit Copy-Button out of the box, lokale Volltextsuche ohne Server,
aufklappbare Sidebar-Kategorien, spätere Migration auf VPS unproblematisch (Standard
React/Node-Build).

Geplante Konfiguration:
- `baseUrl: /SecondBrain/`
- `organizationName: Tecch-Git`
- `projectName: SecondBrain`
- Deployment via GitHub Pages (gh-pages-Branch oder GitHub Actions)
- Lokale Volltextsuche, z. B. über `@easyops-cn/docusaurus-search-local`

## Hosting-Strategie

Aktuell: GitHub Pages, rein statisch, kostenlos. Später denkbar (kein aktuelles Ziel,
nur bewusst offengehalten): Umzug auf VPS + eigene Domain für mehr Funktionalität
(Datenbank, dynamische Features).

## Arbeitsweise für dieses Projekt

Bei der Entwicklung dieses Projekts selbst (Wissensbasis-Inhalte **und**
Frontend/Docusaurus-Aufbau) gilt die Methodik aus
`sources/youtube-analysis/karpathy-claude-spec-verifier-environment.md`
("Spec, Verifier, Environment"), soweit sinnvoll anwendbar:

- **Spec-Phase per Interview statt Plan Mode**: Architektur- und Strukturentscheidungen
  (z. B. Ordnerlayout, Tooling-Wahl) werden mit dem User per Rückfrage abgestimmt,
  nicht implizit angenommen.
- **Agiler/modularer Zuschnitt** in überprüfbare Häppchen statt Waterfall.
- **Explizite Verifikation** von Annahmen/Entscheidungen statt impliziter Annahme.
- **Präzise Evaluationskriterien** vor Beginn der Arbeit festlegen.
- **Environment-Layer** pflegen: diese CLAUDE.md, die Wissensbasis-Struktur, ggf.
  Custom Skills, Tool-Level-Guardrails (Always do / Ask first / Never do).

## Deploy & PR-Previews

CI/CD läuft über zwei GitHub-Actions-Workflows, beide deployen auf den
`gh-pages`-Branch (Pages-Settings: "Deploy from branch: `gh-pages` / `(root)`"):

- **`.github/workflows/deploy.yml`** — bei Push auf `main`: baut die Site und
  deployt sie nach `gh-pages:/` (Root) via `peaceiris/actions-gh-pages`
  (`keep_files: true`, damit aktive PR-Previews nicht überschrieben werden).
  Live unter `https://tecch-git.github.io/SecondBrain/`.
- **`.github/workflows/pr-preview.yml`** — bei jedem PR mit Änderungen in
  `site/**`: baut die Site mit überschriebener `baseUrl`
  (`DOCUSAURUS_BASE_URL=/SecondBrain/pr-preview/pr-<n>/`, siehe
  `site/docusaurus.config.js`) und deployt sie via `rossjrw/pr-preview-action`
  nach `gh-pages:/pr-preview/pr-<n>/`. Die Action **kommentiert den PR
  automatisch mit dem Link zur Live-Vorschau** — so lässt sich jede
  Doku-Änderung vor dem Merge in der fertigen Oberfläche reviewen. Beim
  Schließen/Mergen des PR wird der Preview-Unterordner automatisch entfernt.

## Git

- Standardbranch: `main`.
- Remote: `https://github.com/Tecch-Git/SecondBrain.git` (privates Repo).
- Klassische `git`-Befehle (init/remote/push); kein `gh`-CLI-Tool.
- Der `add-source`-Skill (`.claude/skills/add-source/`) committet/pusht seine
  Änderungen selbst und erstellt/aktualisiert dafür automatisch einen PR
  (Details siehe dort) — das ist die einzige bewusste Ausnahme vom Prinzip
  "User committet selbst". Gemerged wird ausschließlich manuell durch den
  User, nach Prüfung der PR-Preview.
