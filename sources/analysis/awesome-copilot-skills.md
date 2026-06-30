# Awesome Copilot Skills Reference

**Quelle:** https://awesome-copilot.github.com/skills/ (Community-Sammlung,
zugehöriges Repo: https://github.com/github/awesome-copilot)
**Thema:** Übersicht über GitHub Copilot Skills aus der Awesome-Copilot-Sammlung —
was Skills sind, wie man sie installiert, und eine kuratierte Auswahl an
Best-Practice- und Workflow-Skills.
**Datum:** 24.06.2026

---

## Zusammenfassung

Skills sind self-contained Instruction-Bundles, die GitHub Copilot um
domänenspezifisches Wissen und strukturierte Workflows erweitern. Jeder Skill
besteht aus einer `SKILL.md`-Datei (plus optionalen gebündelten Assets), die
Copilot bei Bedarf lädt. Aktiviert werden Skills über natürliche Sprache oder
explizite Slash-Commands in Copilot Chat. Verteilt werden sie als Plugins über
den Awesome-Copilot-Marketplace (`copilot plugin install <skill-name>@awesome-copilot`).
Die Sammlung gliedert sich grob in fachspezifische Best-Practice-Skills
(z. B. C#/NUnit, EF Core) und Workflow-Skills, die generelle
Entwicklungsabläufe (Planung, Kontext-Analyse, Review, inkrementelle
Implementierung) unterstützen.

## Kernkonzepte

- **Skills (Definition)** — self-contained Instruction-Bundles, bestehend aus
  einer `SKILL.md` (plus optionalen Assets), die Copilot domänenspezifisches
  Wissen und strukturierte Workflows on demand bereitstellen.
- **Aktivierung** — über natürliche Sprache (Trigger-Phrasen) oder explizite
  Slash-Commands in Copilot Chat.
- **Distribution als Plugins** — Skills werden über den Awesome-Copilot-Marketplace
  verteilt und per `copilot plugin install <skill-name>@awesome-copilot`
  installiert.

## Installation

```bash
# Marktplatz ist in aktuellen Copilot-CLI-Versionen vorregistriert
copilot plugin install <skill-name>@awesome-copilot

# Falls der Marketplace noch nicht registriert ist
copilot plugin marketplace add github/awesome-copilot
copilot plugin install <skill-name>@awesome-copilot
```

## Selected Skills (fachspezifische Best-Practice-Skills)

### `csharp-nunit`

Best Practices für NUnit-Unit-Tests in C#: Projekt-Setup, Teststruktur,
datengetriebene Tests, Assertions, Mocking mit NSubstitute/Moq,
Testorganisation.

**When to use:** neue Unit-Tests/Test-Fixtures schreiben; bestehende Tests auf
Qualität/Coverage prüfen; neues Testprojekt aufsetzen; moderne NUnit-Patterns
lernen (`Assert.That`, `[TestCase]`, `[TestCaseSource]`).

**Install:** `copilot plugin install csharp-nunit@awesome-copilot`

**Usage examples:**
```
Write NUnit tests for the GetById method in UserService, including a null-input case.
```
```
Review these test methods and suggest improvements based on NUnit best practices.
```
```
Create data-driven tests using [TestCase] for the PriceCalculation validation logic.
```

### `ef-core`

Best Practices für Entity Framework Core: DbContext-Design,
Entity-Modellierung, Migrationen, Queries, Change Tracking, Concurrency,
Security.

**When to use:** `DbContext`/Entity-Modell entwerfen oder reviewen; N+1-Query-
Probleme oder fehlendes `AsNoTracking()` identifizieren; Migrations-Strategien
und Seeding reviewen; Specification Pattern oder Projection Queries
implementieren.

**Install:** `copilot plugin install ef-core@awesome-copilot`

**Usage examples:**
```
Review this DbContext and entity configuration for EF Core best practices.
```
```
Identify potential N+1 query problems in the following repository method.
```
```
Suggest the best approach for implementing pagination with EF Core in this query.
```

### `acquire-codebase-knowledge`

Erzeugt sieben strukturierte Doku-Dateien (`STACK.md`, `STRUCTURE.md`,
`ARCHITECTURE.md`, `CONVENTIONS.md`, `INTEGRATIONS.md`, `TESTING.md`,
`CONCERNS.md`) unter `docs/codebase/`. Dokumentiert nur, was aus Dateien oder
Terminal-Output verifizierbar ist. Benötigt Python 3.8+ für das gebündelte
Scan-Skript.

**When to use:** neues Teammitglied in bestehendes Repo einarbeiten;
Baseline-Architektur-Doku vor größerem Refactoring erstellen; unbekannte
Codebase auf Tech-Debt und Integrationspunkte auditieren; maschinenlesbare
Wissensbasis für KI-gestützte Entwicklung generieren.

**Trigger phrases:** "map this codebase", "document this architecture",
"onboard me to this repo", "create codebase docs"

**Install:** `copilot plugin install acquire-codebase-knowledge@awesome-copilot`

**Usage examples:**
```
Map this codebase and create full documentation in docs/codebase/.
```
```
Document the architecture and integrations only -- skip testing and conventions.
```
```
Onboard me to this repo, focusing on the architecture and concerns sections.
```

### `security-review`

KI-gestützter Security-Scanner, der wie ein menschlicher Security-Researcher
argumentiert: verfolgt Datenflüsse über Dateigrenzen hinweg, führt
Dependency-Audits durch, scannt nach Secrets/hardcoded Credentials und führt
eine siebenstufige Vulnerability-Analyse aus. Vergibt Severity-Ratings
CRITICAL/HIGH/MEDIUM/LOW/INFO. Wendet Patches **nie** automatisch an — alle
Findings erfordern menschliches Review.

**Coverage:** Injection-Schwachstellen (SQL, XSS, Command), Auth-Bugs,
Secrets-Exposure, schwache Kryptografie, unsichere Dependencies,
Business-Logic-Probleme.

**When to use:** vor dem Merge eines PR, der Auth, Datenzugriff oder externe
APIs berührt; nach neuer Integration oder neuem öffentlichem Endpoint;
periodischer Full-Codebase-Security-Audit; spezifische Datei/Modul auf
Schwachstellen prüfen.

**Trigger phrases:** "is my code secure?", "scan this file", "review for
security issues", "audit this codebase", `/security-review`,
`/security-review <path>`

**Install:** `copilot plugin install security-review@awesome-copilot`

**Usage examples:**
```
/security-review src/auth/
```
```
Review the TokenService and its callers for authentication vulnerabilities.
```
```
Scan this API endpoint for SQL injection and access control issues.
```

## Workflow Skills

Skills, die Feature-Entwicklung, Erweiterung bestehender Funktionalität und
Bugfixing unterstützen.

### `context-map`

Analysiert vor jeder Implementierung die Codebase und erzeugt eine
strukturierte Tabelle aus zu ändernden Dateien, direkten Abhängigkeiten,
betroffenen Testdateien und Referenz-Patterns. Enthält eine
Risk-Assessment-Checkliste. Beginnt die Implementierung erst, wenn die Map
reviewed wurde.

**When to use:** vor jedem Multi-File-Feature/Bugfix; wenn unklar ist, welche
Dateien von einer Änderung betroffen sind; um Breaking-Change-Risiko vor einem
Refactoring zu identifizieren.

**Install:** `copilot plugin install context-map@awesome-copilot`

**Usage examples:**
```
Create a context map for adding a new filter type to the filter system.
```
```
Before fixing this bug, map all files involved in the user authentication flow.
```

### `what-context-needed`

Listet vor der Beantwortung einer Frage genau auf, welche Dateien Copilot
sehen muss — kategorisiert als "must see", "should see", "already have".
Eliminiert Rätselraten und unvollständige Antworten durch fehlenden Kontext.

**When to use:** zu Beginn einer neuen Copilot-Chat-Session zu einer
spezifischen Aufgabe; wenn Copilot vage oder unvollständige Antworten gibt;
bei der Arbeit in einer großen Multi-Project-Solution.

**Install:** `copilot plugin install what-context-needed@awesome-copilot`

**Usage examples:**
```
What context do you need to help me add a new endpoint following the existing VSA pattern?
```
```
Before I describe this bug, what files should I share with you?
```

### `create-implementation-plan`

Erzeugt eine strukturierte, maschinenlesbare Implementation-Plan-Datei unter
`/plan/`. Pläne bestehen aus diskreten Phasen mit messbaren
Completion-Kriterien, Task-Tabellen, Dependency-Deklarationen,
Risk-Assessments und Testing-Anforderungen. Für autonome Ausführung durch
KI-Agenten oder menschliche Entwickler konzipiert.

**When to use:** neues Feature planen, bevor Code geschrieben wird;
Refactoring-Aufgabe scopen, die mehrere Dateien/Layer umfasst; geteilten
Implementation-Contract erstellen, bevor ein Team eine Story übernimmt.

**Install:** `copilot plugin install create-implementation-plan@awesome-copilot`

**Usage examples:**
```
Create an implementation plan for adding role-based access control to the API.
```
```
Create an implementation plan for migrating the filter storage from in-memory to the database.
```

### `tiny-stepping`

Treibt die Implementierung in kleinstmöglichen, sinnvollen Inkrementen voran.
Nach jedem Schritt reviewed der Agent ungestagte Änderungen mit dem Entwickler
und fragt nach Bestätigung der Richtung, bevor er fortfährt. Reduziert das
Risiko, in die falsche Richtung zu laufen, und hält Änderungen reviewbar.

**When to use:** Feature in einem Layer mit komplexen Seiteneffekten
implementieren (UI, Auth, Persistenz); wenn der Scope einer Änderung unklar
ist und frühe Kurskorrektur wichtig ist; bei Arbeit in einem unbekannten
Bereich der Codebase.

**Install:** `copilot plugin install tiny-stepping@awesome-copilot`

**Usage examples:**
```
Use tiny stepping to implement the new export endpoint -- one concern at a time.
```
```
Apply the tiny stepping workflow to refactor this service method.
```

### `dotnet-design-pattern-review`

Reviewed C#/.NET-Code auf Design-Pattern-Implementierungsqualität und
-Konsistenz. Identifiziert fehlangewendete Patterns, schlägt Verbesserungen
vor und markiert Abweichungen von bereits etablierten Patterns in der
Codebase.

**When to use:** während/nach Implementierung eines neuen Features zur
Prüfung der Pattern-Konsistenz; beim Review eines PR, der eine neue
Abstraktion einführt; Prüfung, ob eine refactorte Klasse noch dem
beabsichtigten Pattern entspricht.

**Install:** `copilot plugin install dotnet-design-pattern-review@awesome-copilot`

**Usage examples:**
```
Review this handler for design pattern consistency with the rest of the feature layer.
```
```
Check whether this service implementation follows the existing repository pattern correctly.
```

### `review-and-refactor`

Agiert als Senior-Software-Engineer, der zunächst alle Coding-Guidelines aus
`.github/instructions/*.md` und `.github/copilot-instructions.md` liest, dann
den bereitgestellten Code gegen diese Standards reviewed. Führt gezieltes
Refactoring durch, wo nötig. Splittet keine Dateien. Verifiziert, dass Tests
nach Änderungen weiterhin durchlaufen.

Dieser Skill ist **besonders effektiv in Repos mit detaillierten
Instruction-Dateien**, da er diese als Review-Baseline nutzt — er erkennt
Abweichungen von den eigenen dokumentierten Konventionen des Projekts, nicht
nur generische Best Practices.

**When to use:** Feature-Branch-Änderungen vor PR-Erstellung reviewen;
sicherstellen, dass eine neue Implementierung zur dokumentierten Architektur
und den Konventionen passt; Refactoring-Vorschlag erhalten, der die eigenen
Projektregeln kennt.

**Install:** `copilot plugin install review-and-refactor@awesome-copilot`

**Usage examples:**
```
Review the changes I made in this feature and refactor where needed.
```
```
Review this new endpoint implementation against the project conventions.
```

**Tipp: Aktuelle Branch-Änderungen reviewen** — `git diff main..HEAD` (oder
`git diff origin/main`) im Terminal ausführen, um den vollen Diff des
Feature-Branches zu erhalten. Relevante geänderte Dateien in Copilot Chat
einfügen und diesen Skill triggern. Für einen Security-fokussierten Pass mit
`security-review`, auf dieselben Dateien skopiert, kombinieren.

### `dotnet-best-practices`

Reviewed C#/.NET-Code umfassend auf Best Practices über Dokumentation,
Design Patterns, Dependency Injection, Async/Await, Error Handling, Logging,
Security und SOLID-Prinzipien.

**When to use:** finaler Check vor Merge eines Features; Review einer
größeren Änderung über mehrere Concerns hinweg (neuer Service, neuer
Endpoint, neue Entity); Verifikation, dass .NET-10-Idiome und moderne
C#-Patterns korrekt genutzt werden.

**Install:** `copilot plugin install dotnet-best-practices@awesome-copilot`

**Usage examples:**
```
Ensure this service implementation meets .NET best practices for the solution.
```
```
Review this code for SOLID violations, async patterns, and structured logging usage.
```

## Quick Reference

| Skill | Slug | Primary Use Case |
|---|---|---|
| NUnit Best Practices | `csharp-nunit` | Writing and reviewing unit tests |
| EF Core Best Practices | `ef-core` | DbContext design, queries, migrations |
| Acquire Codebase Knowledge | `acquire-codebase-knowledge` | Codebase onboarding and documentation |
| Security Review | `security-review` | Vulnerability scanning and security audit |
| Context Map | `context-map` | Pre-implementation impact analysis |
| What Context Needed | `what-context-needed` | Pre-session context checklist |
| Create Implementation Plan | `create-implementation-plan` | Feature and refactoring planning |
| Tiny Stepping | `tiny-stepping` | Incremental, reviewable implementation |
| Review and Refactor | `review-and-refactor` | Branch/PR review against project conventions |
| .NET Best Practices | `dotnet-best-practices` | Comprehensive .NET/C# best practice check |
| .NET Design Pattern Review | `dotnet-design-pattern-review` | Pattern consistency review |

## Tools & Ressourcen

- **Awesome Copilot Skills Browser** — https://awesome-copilot.github.com/skills/
- **Awesome Copilot GitHub Repository** — https://github.com/github/awesome-copilot
- **VS Code Copilot Customization Docs** — https://code.visualstudio.com/docs/copilot/copilot-customization

## Meine Notizen / Nächste Schritte

---
*Quelle: selbst geschriebenes Markdown des Users, basierend auf der
Awesome-Copilot-Skills-Sammlung*
