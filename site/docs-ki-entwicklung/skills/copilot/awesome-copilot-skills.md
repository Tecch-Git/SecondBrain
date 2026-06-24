---
sidebar_position: 1
---

# Awesome Copilot Skills Reference

Übersicht über GitHub Copilot Skills aus der
[Awesome Copilot](https://awesome-copilot.github.com/skills/)-Community-Sammlung
— was Skills sind, wie man sie installiert, und eine kuratierte Auswahl an
Best-Practice- und Workflow-Skills.

:::info[Quelle]
[Awesome Copilot Skills Browser](https://awesome-copilot.github.com/skills/),
zugehöriges Repo [github/awesome-copilot](https://github.com/github/awesome-copilot).
Volle Rohanalyse:
[`sources/analysis/awesome-copilot-skills.md`](https://github.com/Tecch-Git/SecondBrain/blob/main/sources/analysis/awesome-copilot-skills.md)
:::

## Was sind Skills?

Skills sind self-contained Instruction-Bundles, die GitHub Copilot um
domänenspezifisches Wissen und strukturierte Workflows erweitern. Jeder Skill
besteht aus einer `SKILL.md`-Datei (plus optionalen gebündelten Assets), die
Copilot bei Bedarf lädt. Aktiviert werden Skills über natürliche Sprache oder
explizite Slash-Commands in Copilot Chat.

## Installation

Skills werden als Plugins über den Awesome-Copilot-Marketplace verteilt:

```bash
# Marketplace ist in aktuellen Copilot-CLI-Versionen vorregistriert
copilot plugin install <skill-name>@awesome-copilot

# Falls der Marketplace noch nicht registriert ist
copilot plugin marketplace add github/awesome-copilot
copilot plugin install <skill-name>@awesome-copilot
```

## Fachspezifische Best-Practice-Skills

| Skill | Slug | Wofür |
|---|---|---|
| NUnit Best Practices | `csharp-nunit` | Unit-Tests in C# schreiben & reviewen |
| EF Core Best Practices | `ef-core` | DbContext-Design, Queries, Migrationen |
| Acquire Codebase Knowledge | `acquire-codebase-knowledge` | Codebase-Onboarding & Architektur-Doku |
| Security Review | `security-review` | Vulnerability-Scan & Security-Audit |

`acquire-codebase-knowledge` erzeugt sieben strukturierte Doku-Dateien
(`STACK.md`, `STRUCTURE.md`, `ARCHITECTURE.md`, `CONVENTIONS.md`,
`INTEGRATIONS.md`, `TESTING.md`, `CONCERNS.md`) unter `docs/codebase/` und
dokumentiert nur, was aus Dateien/Terminal-Output verifizierbar ist.

`security-review` argumentiert wie ein menschlicher Security-Researcher:
verfolgt Datenflüsse über Dateigrenzen, führt Dependency-Audits durch, scannt
nach Secrets und vergibt Severity-Ratings (CRITICAL/HIGH/MEDIUM/LOW/INFO).
Wendet Patches **nie** automatisch an.

## Workflow-Skills

| Skill | Slug | Wofür |
|---|---|---|
| Context Map | `context-map` | Pre-Implementation Impact-Analyse |
| What Context Needed | `what-context-needed` | Pre-Session Context-Checkliste |
| Create Implementation Plan | `create-implementation-plan` | Feature- & Refactoring-Planung |
| Tiny Stepping | `tiny-stepping` | Inkrementelle, reviewbare Implementierung |
| Review and Refactor | `review-and-refactor` | Branch/PR-Review gegen Projekt-Konventionen |
| .NET Best Practices | `dotnet-best-practices` | Umfassender .NET/C#-Best-Practice-Check |
| .NET Design Pattern Review | `dotnet-design-pattern-review` | Pattern-Konsistenz-Review |

Bemerkenswerte Patterns:

- **`context-map`** analysiert vor jeder Implementierung die Codebase und
  erzeugt eine Tabelle aus zu ändernden Dateien, Abhängigkeiten und
  betroffenen Tests inkl. Risk-Assessment — beginnt erst nach Review der Map.
- **`tiny-stepping`** treibt Implementierung in kleinsten Inkrementen voran;
  nach jedem Schritt fragt der Agent nach Bestätigung der Richtung, bevor er
  weitermacht.
- **`review-and-refactor`** liest zuerst alle Coding-Guidelines aus
  `.github/instructions/*.md` und `.github/copilot-instructions.md` und
  nutzt sie als Review-Baseline — besonders wirksam in Repos mit
  detaillierten Instruction-Dateien.

## Beispiel-Prompts

```text
Map this codebase and create full documentation in docs/codebase/.
```

```text
Create a context map for adding a new filter type to the filter system.
```

```text
Review the changes I made in this feature and refactor where needed.
```

```text
/security-review src/auth/
```

## Tools & Ressourcen

- **Awesome Copilot Skills Browser** — https://awesome-copilot.github.com/skills/
- **Awesome Copilot GitHub Repository** — https://github.com/github/awesome-copilot
- **VS Code Copilot Customization Docs** — https://code.visualstudio.com/docs/copilot/copilot-customization
