# Aronix -- Claude Code Context

See AGENTS.md for full project context, schema, and architecture.

## Absolute rules (enforced every turn)
- CSS: all colour/spacing values from --ax-* variables only. Never hardcode hex.
- Tailwind: layout and spacing only. Brand tokens use CSS variables.
- Imports: @/* throughout (maps to src/*)
- Exports: named exports only. Default exports only in Next.js page/layout files.
- Components: server by default. "use client" only for state/effects/events.
- Types: no `any`. Strict TypeScript.
- No console.log in committed code.
- No em dashes in code, comments, or content.
- No emoji.
- WCAG AAA contrast minimum (7:1).
- Lucide icons only.
- Supabase: all calls through src/lib/supabase/. Server client in RSC/server actions. Browser client in client components only.
- Mobile-first responsive design.
- UK spelling: optimise, organise, colour.

## Where things live
- Rules: .claude/rules/ (scoped to their directories)
- Skills: .claude/skills/ (templates -- read before writing)
- Agents: .claude/agents/
- Commands: .claude/commands/
- Styles: src/styles/colors_and_type.css (design tokens), src/styles/app.css (base)
- Supabase lib: src/lib/supabase/
- Types: src/types/

## Do not read unless working in that area
- node_modules/ -- never
- .next/ -- never
- src/styles/colors_and_type.css -- only when adding/checking design tokens
