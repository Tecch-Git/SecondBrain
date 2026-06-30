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

### `csharp-nunit`

Best Practices für NUnit-Unit-Tests in C#: Projekt-Setup, Teststruktur,
datengetriebene Tests, Assertions, Mocking mit NSubstitute/Moq.

```text
Write NUnit tests for the GetById method in UserService, including a null-input case.
```
```text
Create data-driven tests using [TestCase] for the PriceCalculation validation logic.
```

### `ef-core`

Best Practices für Entity Framework Core: DbContext-Design,
Entity-Modellierung, Migrationen, Querying, Change Tracking.

```text
Review this DbContext and entity configuration for EF Core best practices.
```
```text
Identify potential N+1 query problems in the following repository method.
```

### `acquire-codebase-knowledge`

Erzeugt sieben strukturierte Doku-Dateien (`STACK.md`, `STRUCTURE.md`,
`ARCHITECTURE.md`, `CONVENTIONS.md`, `INTEGRATIONS.md`, `TESTING.md`,
`CONCERNS.md`) unter `docs/codebase/`. Dokumentiert nur, was aus Dateien oder
Terminal-Output verifizierbar ist.

```text
Map this codebase and create full documentation in docs/codebase/.
```
```text
Onboard me to this repo, focusing on the architecture and concerns sections.
```

### `security-review`

Argumentiert wie ein menschlicher Security-Researcher: verfolgt Datenflüsse
über Dateigrenzen hinweg, führt Dependency-Audits durch, scannt nach
Secrets/hardcoded Credentials und vergibt Severity-Ratings
(CRITICAL/HIGH/MEDIUM/LOW/INFO). Wendet Patches **nie** automatisch an — alle
Findings erfordern menschliches Review.

```text
/security-review src/auth/
```
```text
Review the TokenService and its callers for authentication vulnerabilities.
```

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

### `context-map`

Analysiert vor jeder Implementierung die Codebase und erzeugt eine Tabelle
aus zu ändernden Dateien, direkten Abhängigkeiten, betroffenen Testdateien
und Referenz-Patterns inkl. Risk-Assessment — beginnt erst nach Review der
Map.

```text
Create a context map for adding a new filter type to the filter system.
```
```text
Before fixing this bug, map all files involved in the user authentication flow.
```

### `what-context-needed`

Listet vor der Beantwortung einer Frage genau auf, welche Dateien Copilot
sehen muss — kategorisiert als "must see", "should see", "already have".

```text
What context do you need to help me add a new endpoint following the existing VSA pattern?
```

### `create-implementation-plan`

Erzeugt eine strukturierte, maschinenlesbare Implementation-Plan-Datei unter
`/plan/` mit Phasen, Task-Tabellen, Dependency-Deklarationen und
Risk-Assessments — für autonome Ausführung durch KI-Agenten oder Menschen.

```text
Create an implementation plan for adding role-based access control to the API.
```

### `tiny-stepping`

Treibt die Implementierung in kleinsten sinnvollen Inkrementen voran. Nach
jedem Schritt reviewed der Agent ungestagte Änderungen mit dem Entwickler und
fragt nach Bestätigung der Richtung, bevor er fortfährt.

```text
Use tiny stepping to implement the new export endpoint -- one concern at a time.
```

### `review-and-refactor`

Liest zuerst alle Coding-Guidelines aus `.github/instructions/*.md` und
`.github/copilot-instructions.md` und nutzt sie als Review-Baseline — führt
gezieltes Refactoring durch und verifiziert, dass Tests weiterhin
durchlaufen. Besonders wirksam in Repos mit detaillierten Instruction-Dateien.

```text
Review the changes I made in this feature and refactor where needed.
```
```text
Review this new endpoint implementation against the project conventions.
```

### `dotnet-best-practices`

Reviewed C#/.NET-Code umfassend: Dokumentation, Design Patterns, Dependency
Injection, Async/Await, Error Handling, Logging, Security, SOLID-Prinzipien.

```text
Ensure this service implementation meets .NET best practices for the solution.
```

### `dotnet-design-pattern-review`

Reviewed C#/.NET-Code auf Design-Pattern-Implementierungsqualität und
-Konsistenz; markiert Abweichungen von bereits etablierten Patterns in der
Codebase.

```text
Check whether this service implementation follows the existing repository pattern correctly.
```

## Tools & Ressourcen

- **Awesome Copilot Skills Browser** — https://awesome-copilot.github.com/skills/
- **Awesome Copilot GitHub Repository** — https://github.com/github/awesome-copilot
- **VS Code Copilot Customization Docs** — https://code.visualstudio.com/docs/copilot/copilot-customization
