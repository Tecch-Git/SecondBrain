---
name: shortcut-capture
description: "Use this skill whenever the user asks how a keyboard/terminal/browser shortcut works, what a shortcut is called, or otherwise looks up a shortcut (e.g. 'wie heißt der Shortcut für X', 'wie geht der Shortcut um Y zu tun', 'gibt es einen Shortcut für Z'). Triggers automatically on shortcut lookup questions in this repo. Answers the question normally AND stages the shortcut in sources/shortcuts-inbox.md for later review — never touches the published docs under site/docs-shortcuts/ directly."
---

# Shortcut erfassen

Leichtgewichtiger Begleit-Skill: beantwortet Shortcut-Nachschlage-Fragen wie
gewohnt und merkt sich den Shortcut zusätzlich in einer Inbox zur späteren
Prüfung. Verändert **niemals** die veröffentlichte Doku unter
`site/docs-shortcuts/` — das ist exklusiv Aufgabe von `shortcut-curate`.

## Ablauf

### 1. Frage normal beantworten

Die eigentliche Nutzerfrage (wie funktioniert/heißt der Shortcut) zuerst wie
gewohnt beantworten — das hier ist ein Zusatzschritt, kein Ersatz.

### 2. Vorhandene Kategorien live ermitteln

`site/docs-shortcuts/` scannen (Unterordner + `_category_.json`-Label/
Description je Ordner). Das ist immer aktuell, keine separate Pflege eines
Kategorie-Verzeichnisses nötig.

### 3. Duplikate vermeiden

Prüfen, ob der Shortcut schon in `sources/shortcuts-inbox.md` (offene
Einträge) oder bereits in einer veröffentlichten Seite unter
`site/docs-shortcuts/` steht. Falls ja: keinen neuen Eintrag anlegen, in der
Chat-Antwort kurz erwähnen, dass er schon bekannt/dokumentiert ist.

### 4. Kategorie vorschlagen

- Passt der Shortcut eindeutig zu einer bestehenden Kategorie → diese
  Kategorie (Slug) vermerken.
- Passt er zu keiner → einen kurzen, sprechenden Kategorie-Vorschlag
  formulieren (z. B. "Windows-Fensterverwaltung"), als "neu?" markieren.

### 5. Eintrag in die Inbox anhängen

In `sources/shortcuts-inbox.md` unter "## Offene Einträge" eine neue Zeile
im dort dokumentierten Format ergänzen (Shortcut, Tool/OS, Beschreibung,
vermutete Kategorie, Datum). Den Platzhalter "_Noch keine Einträge._"
entfernen, falls es der erste Eintrag ist.

### 6. Kurze Bestätigung, kein Commit

Eine knappe Ein-Zeilen-Notiz reicht ("→ in Shortcuts-Inbox aufgenommen").
**Kein Commit/Push** — die Inbox-Datei wird nur lokal geändert. Git-Aktionen
(`repo-publish-flow`) laufen ausschließlich, wenn der User das explizit
verlangt (z. B. "committe/pushe die Inbox jetzt") oder über `shortcut-curate`.

## Nicht tun

- Keine Datei unter `site/docs-shortcuts/` anlegen oder ändern.
- Keinen Commit/Push ohne explizite Aufforderung des Users.
- Keine Duplikate in die Inbox schreiben.
- Diesen Skill nicht für allgemeine "wie mache ich X"-Fragen triggern, die
  kein Tastatur-/Commandline-/Browser-Shortcut sind.
