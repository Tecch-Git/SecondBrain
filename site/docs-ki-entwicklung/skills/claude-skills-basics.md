---
sidebar_position: 1
---

# Don't Build Agents, Build Skills Instead

Vier Regeln von Barry Zhang und Mahesh Murag (beide Anthropic) für den
effektiven Einsatz von Claude/Agent Skills statt One-off-Prompts oder
vollständiger Agenten — vorgestellt auf dem AI Code Summit.

:::info Quelle
[YouTube-Video](https://youtu.be/qOvc9IUKEIc?si=vEplwOaDNSyKGCNE), analysiert
mit Gemini + Claude. Volle Rohanalyse:
[`sources/analysis/claude-skills-basics.md`](https://github.com/Tecch-Git/SecondBrain/blob/main/sources/analysis/claude-skills-basics.md)
:::

## Kernidee

Statt für wiederkehrende Aufgaben immer neue Prompts zu schreiben oder gleich
vollständige Agenten zu bauen, sollten Nutzer **Claude Skills** einsetzen —
organisierte Sammlungen von Dateien, die komposierbares, prozedurales Wissen
für Agenten bereitstellen. Layer-Modell des Stacks: Models (Processors) →
Agents (Operating Systems) → **Skills (Applications)**.

Ein Skill besteht aus drei Schichten:

1. **Description** — wird von Claude geprüft, um zu entscheiden, *wann* der
   Skill genutzt werden soll.
2. **Instructions** — das Schritt-für-Schritt-Playbook zur Aufgabenerfüllung.
3. **Tools** — Code-Skripte, API-Calls, Referenzdateien.

## Die vier Regeln

### Regel 1 — Skills prompten, nicht Claude

Statt komplexer Prompts kurze Slash-Commands wie `/email-draft` nutzen, die
auf einen Skill verweisen. Wiederkehrende Aufgaben lassen sich erkennen, indem
man Claude bittet, die eigenen Sessions zu analysieren:

```text
Based on my recent sessions, what tasks am I doing repeatedly that should
be skills instead of one-off prompts? For each one, suggest a skill name
and what context it would need.
```

### Regel 2 — Skills sind mehr als Prompts

Anthropic-Ingenieure fokussieren sich auf robuste Tools statt auf detaillierte
Prompts. Skills laden Inhalte **progressiv** (Progressive Disclosure), damit
nur relevanter Inhalt das Kontextfenster belegt:

| Stufe | Wann geladen | Tokenkosten | Inhalt |
|---|---|---|---|
| Level 1: Metadata | immer, beim Start | ~100 Tokens pro Skill | `name` + `description` aus YAML-Frontmatter |
| Level 2: Instructions | wenn Skill getriggert wird | unter 5k Tokens | SKILL.md-Body mit Anleitung |
| Level 3+: Resources | bei Bedarf | effektiv unbegrenzt | gebündelte Dateien, per Bash ausgeführt, ohne Inhalt in den Kontext zu laden |

Claude kann einen Skill direkt selbst bauen lassen:

```text
build me a skill for email drafting
```

### Regel 3 — Komposierbare statt Custom-Skills bauen

Viele kleine, fokussierte Skills statt einzelner riesiger Custom-Skills.
Komposierbare Skills

- arbeiten automatisch zusammen,
- machen Probleme leichter erkennbar,
- verstärken Verbesserungen (compounding),
- ermöglichen Wiederverwendung.

**Skripte in Skills speichern** lässt Claude deterministischen Code erneut
ausführen statt ihn neu zu schreiben — tauscht KI-Tokens gegen günstigeres,
schnelleres, wiederholbares Code-Compute.

**Control-Flags:**

- `user_invocable` — steuert, ob der Skill im User-Slash-Menü sichtbar ist.
- `disable_model_invocation` — nur der User kann den Skill ausführen, nicht
  das Modell selbst; verhindert, dass das Modell riskante Deployment- oder
  Messaging-Aufgaben eigenständig auslöst.

### Regel 4 — Prompts werden jede Session schlauer

Entspricht die Ausgabe nicht exakt dem Gewünschten, kann man den Skill um die
fehlende Regel/das Beispiel ergänzen:

```text
Review the back and forth I just had after using this skill — can we
enhance the skill so this is handled automatically or we don't make the
same mistake again?
```

Das erzeugt einen **Compounding-Loop**: Claude startet in der nächsten Session
bereits schlauer.

## Tools & Ressourcen

- **Claude Code** — zentrales Werkzeug zum Bauen von Skills.
- **Barry Zhang** und **Mahesh Murag** — Member of Technical Staff bei
  Anthropic, Speaker des Talks.
- **Boris Cherny** — Creator von Claude Code, im Talk erwähnt.
- **AI Code Summit** — Konferenz, auf der der Talk gehalten wurde.
