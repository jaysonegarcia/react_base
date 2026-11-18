# React Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an understandable, reusable React boilerplate with example pages and Vercel deployment configuration.

**Architecture:** Vite builds a TypeScript React SPA. React Router renders pages inside a shared layout; local shadcn/ui components use Tailwind v4 and centralized site configuration.

**Tech Stack:** Latest stable React, TypeScript, Vite, React Router, Tailwind CSS v4, shadcn/ui, ESLint, Prettier, npm.

**Spec:** `docs/superpowers/specs/2026-11-10-react-starter-design.md`

## Global Constraints

- Latest stable React, TypeScript, and Vite; resolve current versions during implementation.
- Tailwind CSS v4 and shadcn/ui.
- Consistent two-space indentation.
- Contact form is explicitly a demo and never claims message delivery.
- No backend, authentication, or actual deployment.
- Workspace started empty and is not a Git repository; do not make commits unless a repository is initialized at the user's request.

## Review Focus

- Direct `/about` and `/contact` requests must render the SPA on deployment.
- Unknown routes must render a useful 404 with a Home link.
- Navigation must remain keyboard-accessible and fit a narrow screen.
- Contact validation must reject invalid fields and valid submission must disclose demo-only behavior.
- A fresh install must reproduce the checked build without local-only dependencies.

---

### Task 1: Tooling and reusable UI foundation

**Files:** `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `.editorconfig`, `.gitignore`, `components.json`, `src/main.tsx`, `src/index.css`, `src/lib/utils.ts`, `src/components/ui/*`.

**Interfaces:** `@/*` resolves to `src/*`; `cn(...inputs: ClassValue[]): string` combines classes; local shadcn components expose their standard typed props. Scripts expose `dev`, `build`, `preview`, `lint`, `typecheck`, `format`, `format:check`, and aggregate `check`.

- [ ] Resolve package versions and Node requirements; consult shadcn and frontend-design skills before implementation.
- [ ] Create Vite/TypeScript setup with aligned aliases, Tailwind v4 Vite integration, and npm lockfile.
- [ ] Configure ESLint flat config, Prettier, editor settings, and generated-file ignores.
- [ ] Initialize shadcn and add only the components used by the example pages.
- [ ] Run `npm run typecheck` and `npm run lint`; expect exit code 0 after the entry app exists.

### Task 2: Site configuration, layout, and example pages

**Files:** `src/config/site.ts`, `src/app/app.tsx`, `src/components/layout/site-layout.tsx`, `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`, `src/pages/home.tsx`, `src/pages/about.tsx`, `src/pages/contact.tsx`, `src/pages/not-found.tsx`.

**Interfaces:** `siteConfig` exports `name`, `description`, `email`, and `nav` entries containing `label` and `href`. `App(): React.JSX.Element` owns the router. Named page components render under `SiteLayout` using its outlet.

- [ ] Implement site configuration, route definitions for `/`, `/about`, `/contact`, and `*`, and shared layout.
- [ ] Build a polished but restrained Home page, explanatory About page, accessible demo Contact form, and useful 404.
- [ ] Add responsive navigation with active-link styling and visible focus treatment.
- [ ] Run the app and use browser verification: visit all routes, navigate with links, check 375px width, test keyboard navigation, and confirm the 404 Home link works.
- [ ] In the browser, submit invalid contact data and confirm native validation; submit valid data and confirm explicitly demo-only feedback without a network delivery request.

### Task 3: Deployment, onboarding, and final verification

**Files:** `vercel.json`, `README.md`; adjust package scripts if checks reveal integration issues.

**Interfaces:** Vercel uses Vite, `npm run build`, and `dist`; SPA rewrites preserve direct nested-route navigation. README commands match installed tooling.

- [ ] Add Vercel schema/configuration and SPA fallback; document editable settings and Vercel import/CLI deployment steps.
- [ ] Write concise setup, folder map, scripts, new-project copy/reset guidance, site customization, route creation, shadcn CLI usage, and demo Contact limitations.
- [ ] Run `npm ci`, `npm run format`, and `npm run check`; ensure lint, formatting, types, and production build all succeed.
- [ ] Verify production preview renders direct nested URLs and unknown-route UI; inspect Vercel configuration against current routing guidance. Distinguish preview verification from an actual Vercel deployment.
- [ ] Review requirements against delivered files, record verified results, and provide quick-start commands.

## Execution choice

Native execution was approved by the user and completed. Verification and implementation decisions are recorded in `.superpowers/sdd/react-starter/progress.md`. A fresh-context review found no critical or important issues; its two documentation notes were addressed.
