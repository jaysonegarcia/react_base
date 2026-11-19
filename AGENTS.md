# React Starter: project instructions

## Purpose and stack

This is a reusable React SPA boilerplate, not a finished product. Keep examples
easy to understand and dependencies focused. Use React, TypeScript, Vite,
React Router, Tailwind CSS v4, and shadcn/ui with Radix primitives.
Check `package.json` and its lockfile for installed versions.

## Setup and commands

- Use npm and Node.js matching `package.json` engines (22.22+ on 22.x or 24+).
  `.nvmrc` selects Node 22; use `nvm install` and `nvm use` if available.
- Install the locked dependencies with `npm ci`.
- Start development with `npm run dev`.
- Run `npm run format` after editing source or documentation.
- Run `npm run check` for code changes: it checks ESLint, Prettier, TypeScript,
  and the production build. `npm run typecheck` is available separately.
- Use `npm run build` then `npm run preview` to inspect production output.
- No automated test framework is installed. Do not claim tests ran when only
  lint/build checks ran. Verify affected browser flows for behavior changes.

## Structure and conventions

### UI design skills

- Before designing, building, or restyling UI, load both `frontend-design` and
  `ui-ux-pro-max`. Project copies live in `.opencode/skills/`; this rule also
  applies when adapting the starter to WordPress, Laravel, or Next.js.
- If the assistant cannot discover those skills, read their local `SKILL.md`
  files directly. If a file is unavailable, report that and use available guidance.
- The UI/UX skill's plugin-specific `${CLAUDE_PLUGIN_ROOT}` command examples
  must be adapted to this project's layout. Run its search script at
  `.opencode/skills/ui-ux-pro-max/scripts/search.py` from the repository root,
  or use that file's absolute path. Python 3 is required for these searches.
- See `.opencode/README.md` for discovery, review-agent usage, and maintenance.

### Code layout

- `src/app/app.tsx`: route definitions inside the shared site layout.
- `src/pages/`: route-level page components.
- Each reusable component has a PascalCase folder and matching filename:
  `src/components/ui/Badge/Badge.tsx` or
  `src/components/layout/SiteHeader/SiteHeader.tsx`.
- Keep related primitives together, such as `CardTitle` in `Card/Card.tsx`.
- Use named exports and `@/` imports for files under `src/`.
- `src/config/site.ts`: site identity, navigation, and contact details.
- `src/hooks/`: hooks such as `useHomeContent.ts` and `useNews.ts`.
- `src/lib/`: shared helpers and fetching/validation code.
- Use two spaces, single quotes, and no semicolons, as configured in Prettier.
- Use Tailwind v4 theme tokens in `src/index.css` and existing shadcn components.
  There is no Tailwind JavaScript configuration file.
- shadcn CLI generates flat lowercase files. Move newly generated components
  into the PascalCase folder convention and update their imports. Reuse existing
  dependencies rather than leaving duplicate flat components behind. Preserve
  customizations when updating generated components.

## Content and fetching example

- Home content lives in `public/data/home.json`, served at `/data/home.json`.
- `src/lib/home-content.ts` defines response types, runtime validation, and fetch.
- `src/hooks/useHomeContent.ts` owns loading, error, retry, and request cleanup.
- Keep response types and runtime validation aligned when changing JSON fields.
  TypeScript alone does not validate network responses.
- Check HTTP status and handle malformed responses; cancel stale requests when
  leaving the page. Keep navigation usable during loading and errors.
- Store icon identifiers in JSON and map them to React components in the UI.
- `public/` is committed source content copied into the build. It is publicly
  accessible, so it must not contain credentials or private data.

### News example

- Articles live in `public/data/news.json` as `{ "articles": [...] }`. Each article
  has `slug`, `title`, `excerpt`, `category`, `publishedAt` (`YYYY-MM-DD`), and
  `body` (paragraph array).
- `src/lib/news.ts` owns article types, runtime validation, sorting, year
  filtering, date formatting, and the fetch. `src/hooks/useNews.ts` owns list and
  single-article loading, error, retry, and request cleanup.
- `/news` renders the list with a year filter; `/news/:slug` renders one article
  and shows a not-found view for unknown slugs. Home shows the three latest from
  the same endpoint with a **View all news** link.
- The year filter is URL state (`/news?year=2026`) built from links with
  `aria-current`, not client-only state. Derive years from loaded articles and
  treat an unknown year as **All** so a stale link still renders.
- Format dates in UTC; parsing `YYYY-MM-DD` as local time can shift the day.
- Keep home news copy (`newsTitle`, `newsDescription`, `newsViewAllLabel`) in
  `home.json`, and update the `HomeContent` type and validator with it.

## Behavior and future features

- Preserve accessible labels, keyboard focus, skip navigation, and mobile layout.
- Contact is explicitly a demo: it does not send or store messages. Do not claim
  successful delivery without implementing and verifying an actual integration.
- For a future store/cart with shared client state, prefer Redux Toolkit and
  React Redux. Consider RTK Query for server-data fetching and caching.
- Keep component-only UI state local. Add Redux when the feature needs it,
  rather than installing it preemptively. Backend prices, stock, and checkout
  totals remain authoritative.

## Deployment and documentation

- `vercel.json` defines the Vite build, `dist` output, and SPA fallback. Preserve
  direct access to nested page URLs when changing routing or deployment config.
- Update README when setup, folder conventions, commands, or examples change.
- Keep shared `AGENTS.md`, `CLAUDE.md`, OpenCode configuration, and
  `docs/superpowers/` trackable. Local caches and generated output stay ignored.
- Keep these project conventions in `AGENTS.md`; `CLAUDE.md` imports this file
  so the two tools receive the same guidance without maintaining duplicate rules.
