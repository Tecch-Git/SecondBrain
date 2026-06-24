# Don't Build Agents, Build Skills Instead

**Quelle:** https://youtu.be/qOvc9IUKEIc?si=vEplwOaDNSyKGCNE
**Thema:** Vier Regeln von Anthropic-Mitarbeitern Barry Zhang und Mahesh Murag zum effektiven Einsatz von Claude/Agent Skills statt One-off-Prompts oder komplexer Agenten.
**Datum:** 24.06.2026

---

## Zusammenfassung

Der Talk "Don't Build Agents, Build Skills Instead" von Barry Zhang und Mahesh
Murag (beide Member of Technical Staff bei Anthropic), gehalten auf dem AI Code
Summit, stellt vier Regeln für den Umgang mit Claude Skills vor. Kernbotschaft:
Statt für wiederkehrende Aufgaben immer neue, komplexe Prompts zu schreiben
oder gleich vollständige Agenten zu bauen, sollten Nutzer Claude Skills
einsetzen — organisierte Sammlungen von Dateien, die komposierbares,
prozedurales Wissen für Agenten bereitstellen. Skills sollen klein, fokussiert
und kombinierbar sein, deterministischen Code statt KI-Tokens für
wiederholbare Schritte nutzen, über Flags wie `user_invocable` und
`disable_model_invocation` gesteuert werden und sich über Sessions hinweg
durch Korrekturen kontinuierlich verbessern.

## Kernkonzepte

- **Agent Skills** — organisierte Sammlungen von Dateien, die komposierbares,
  prozedurales Wissen für Agenten verpacken. Beispielstruktur: Ordner
  `anthropic_brand/` mit `SKILL.md`, `docs.md`, `slide-decks.md`,
  `apply_template.py`.
- **Drei Schichten eines Skills:**
  - **Description** — wird von Claude geprüft, um zu entscheiden, wann der
    Skill genutzt werden soll.
  - **Instructions** — das Schritt-für-Schritt-Playbook zur Aufgabenerfüllung.
  - **Tools** — Code-Skripte, API-Calls, Referenzdateien.
- **Skills prompten statt Claude prompten (Regel 1)** — statt komplexer
  Prompts kurze Slash-Commands wie `/draft-email` nutzen, die auf einen Skill
  verweisen.
- **Layer-Modell des Stacks** — Layer 1: Models (Processors), Layer 2: Agents
  (Operating Systems), Layer 3: Skills (Applications).
- **Skills sind mehr als Prompts (Regel 2)** — Anthropic-Ingenieure fokussieren
  sich auf robuste Tools statt auf detaillierte Prompts.
- **Progressive Disclosure / 3-Stufen-Ladekosten:**
  - **Level 1 (Metadata):** immer beim Start geladen, ~100 Tokens pro Skill,
    Inhalt: `name` und `description` aus dem YAML-Frontmatter.
  - **Level 2 (Instructions):** geladen, wenn der Skill ausgelöst wird, unter
    5k Tokens, Inhalt: SKILL.md-Body mit Anleitung.
  - **Level 3+ (Resources):** bei Bedarf geladen, effektiv unbegrenzt, Inhalt:
    gebündelte Dateien, die per Bash ausgeführt werden, ohne ihren Inhalt in
    den Kontext zu laden.
  - Dadurch belegt zu jedem Zeitpunkt nur relevanter Inhalt das Kontextfenster.
- **Komposierbare statt monolithische Skills (Regel 3)** — viele kleine,
  fokussierte Skills statt einzelner riesiger Custom-Skills. Komposierbare
  Skills arbeiten automatisch zusammen, machen Probleme leichter erkennbar,
  verstärken Verbesserungen (compounding) und ermöglichen Wiederverwendung.
- **Skripte in Skills speichern** — erlaubt Claude, deterministischen Code
  erneut auszuführen statt ihn neu zu schreiben; tauscht KI-Tokens gegen
  günstigeres, schnelleres, wiederholbares Code-Compute.
- **Control-Flags:**
  - `user_invocable` — steuert, ob der Skill im User-Slash-Menü sichtbar ist.
  - `disable_model_invocation` — nur der User kann den Skill ausführen, das
    Modell selbst nicht; verhindert, dass das Modell riskante Deployment- oder
    Messaging-Aufgaben eigenständig auslöst.
- **Prompts werden jede Session schlauer (Regel 4)** — entspricht die Ausgabe
  nicht exakt dem Gewünschten, kann man den Skill um die fehlende Regel/das
  Beispiel ergänzen. Das erzeugt einen Compounding-Loop: Claude startet in der
  nächsten Session bereits schlauer.

## Prompt-Vorlagen & Beispiele

**Email-Draft-Skill per Slash-Command aufrufen [01:16]:**
```
/email-draft Answer this email: [email]
```

**Skill per Claude Code bauen lassen [02:22]:**
```
build me a skill for email drafting
```

**Repetitive Tasks als Skill-Kandidaten identifizieren [01:48]:**
```
Based on my recent sessions, what tasks am I doing repeatedly that should
be skills instead of one-off prompts? For each one, suggest a skill name
and what context it would need.
```

**Setup per Screenshot auditieren lassen [08:17]:**
```
[Screenshot des eigenen Setups senden, mit der Bitte, es zu auditieren
und Verbesserungen anzuwenden]
```

**Skill nach Fehler verbessern lassen [10:11]:**
```
Review the back and forth I just had after using this skill — can we
enhance the skill so this is handled automatically or we don't make the
same mistake again?
```

**Email-Draft-Prompt-Template (im Video gezeigt, sinngemäß) [01:10]:**
```
[Langer Formatierungs-Guide für E-Mail-Entwürfe im Namen von Austin
Marchese: Kontext, Ziel, Tonlage, Kadenz, Rhythmus, Signaturphrasen und
Regeln zur Zahlengenauigkeit.]
```

## Schritt-für-Schritt Anleitungen

1. **Wiederkehrende Aufgaben identifizieren** — eigene Sessions daraufhin
   prüfen, welche Aufgaben sich wiederholen und als Skill statt als
   One-off-Prompt sinnvoller wären.
2. **Skill anlegen** — Claude bitten, einen Skill für die jeweilige Aufgabe zu
   bauen (z. B. `build me a skill for email drafting`), statt selbst einen
   Prompt von Hand zu schreiben.
3. **Skill strukturieren** — Description (Trigger-Bedingung), Instructions
   (Playbook) und Tools (Skripte/Referenzdateien) klar trennen; deterministische
   Schritte als Skripte statt als Prompt-Text ablegen.
4. **Klein und komposierbar halten** — statt eines großen Skills mehrere
   kleine, fokussierte Skills bauen, die zusammenarbeiten.
5. **Flags setzen** — `user_invocable` und `disable_model_invocation` je nach
   Risiko/Sichtbarkeit des Skills konfigurieren.
6. **Skill iterativ verbessern** — nach unpassenden Ergebnissen den Skill um
   die fehlende Regel/das Beispiel ergänzen, damit der Fehler nicht erneut
   auftritt.

## Tools & Ressourcen

- **Claude Code** — v2.1.138 im Talk gezeigt, zentrales Werkzeug zum Bauen von
  Skills.
- **Claude skills / Agent skills** — das zentrale Konzept des Talks.
- **Barry Zhang** — Member of Technical Staff bei Anthropic, Co-Speaker.
- **Mahesh Murag** — Member of Technical Staff bei Anthropic, Co-Speaker.
- **Erik Schluntz** — Anthropic Engineer, im Talk erwähnt.
- **Boris Cherny** — Creator von Claude Code, im Talk erwähnt.
- **Austin Marchese** — YouTube-Kanal, dessen Email-Beispiel im Talk als
  Anwendungsfall gezeigt wird.
- **AI Code Summit** — Konferenz, auf der der Talk gehalten wurde.

## Struktur / Kapitel (Video)

- 00:00 Einführung und Regel 1: Skills prompten statt Claude
- 02:04 Regel 2: Skills sind mehr als Prompts
- 04:36 Regel 3: Komposierbare statt Custom-Skills bauen
- 06:25 Technische Patterns: Skripte speichern und Flags nutzen
- 08:52 Regel 4: Prompts werden jede Session schlauer und Fazit

## Meine Notizen / Nächste Schritte

---
*Quelle: YouTube-Video, analysiert mit Gemini + Claude*
