# React Starter

A small, ready-to-customize React + TypeScript starter with Home, About, Contact,
and 404 pages. Built with Vite, Tailwind CSS v4, shadcn/ui, and React Router.

## Quick start

Use **Node.js 22.22+ (22.x) or Node.js 24+** and npm. If you use nvm:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open the local URL printed by Vite. No environment variables or accounts are
required. `npm ci` installs the exact versions in `package-lock.json`.

### Start a new project from this template

1. Put this starter in a Git repository. On GitHub, enable **Settings → Template
   repository**, then choose **Use this template → Create a new repository** for
   each new project. You can also download the repository ZIP into a new folder.
2. In the new project, rename the package:
   ```bash
   npm pkg set name="my-new-project"
   npm install --package-lock-only
   ```
3. Update `src/config/site.ts`, `index.html`, and `public/favicon.svg`.
4. Replace the example page content and this README with your project details.
5. Run `npm ci` and `npm run dev`.

For a local copy, copy the source and configuration files into a fresh folder,
including dotfiles. Exclude `node_modules`, `dist`, `.git`, `.vercel`, and ignored
AI-tool files. Then initialize a new Git repository there if desired.

## Commands

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Start the local development server                       |
| `npm run build`        | Type-check and build to `dist/`                          |
| `npm run preview`      | Preview the production build locally                     |
| `npm run lint`         | Run ESLint with zero warnings allowed                    |
| `npm run typecheck`    | Check app and Vite configuration types                   |
| `npm run format`       | Format files and sort Tailwind classes                   |
| `npm run format:check` | Verify formatting without changing files                 |
| `npm run check`        | Run lint, formatting checks, types, and production build |

Formatting uses two spaces, single quotes, and no semicolons. EditorConfig makes
indentation consistent across editors. There is no test framework installed;
add one when your project needs automated behavior tests.

## Project structure

```text
public/                     Static files copied into the build
src/
  app/app.tsx               Route definitions
  components/
    layout/
      SiteHeader/SiteHeader.tsx
      SiteFooter/SiteFooter.tsx
      SiteLayout/SiteLayout.tsx
    ui/
      Badge/Badge.tsx
      Button/Button.tsx
      Card/Card.tsx
      Input/Input.tsx
      Label/Label.tsx
      Textarea/Textarea.tsx
    PageHeading/PageHeading.tsx
  config/site.ts            Site name, description, navigation, and email
  lib/utils.ts              Shared class-name helper
  pages/                    Home, About, Contact, and Not Found
  index.css                 Tailwind imports and theme tokens
  main.tsx                  React entry point
components.json             shadcn CLI settings and import aliases
vercel.json                 Vercel build settings and SPA routing
vite.config.ts              React, Tailwind, and @/ alias configuration
```

Each component has a **PascalCase folder and matching `.tsx` filename**. Keep
related styles or future tests beside its component. Group related primitives,
such as `CardTitle` and `CardContent`, in the parent component's file.

Use `@/` for imports from `src/`, such as `@/components/ui/Badge/Badge`.

## Customize the starter

### Site details and appearance

- Edit `src/config/site.ts` for the shared name, navigation, and email.
- Edit each page's `PageHeading` props for its title and description. React sets
  the document metadata when that route renders. Update the static fallback
  metadata in `index.html` as well.
- Change colors and radius in the `:root` tokens in `src/index.css`. Tailwind v4
  uses CSS configuration; no `tailwind.config.js` is needed.
- Geist is bundled locally, so fonts need no external runtime request.
- The starter uses light mode. Generated dark tokens are available for a future
  theme switcher; no theme switching state is included.

### Add a page

Create `src/pages/projects.tsx`:

```tsx
import { PageHeading } from '@/components/PageHeading/PageHeading'

export function ProjectsPage() {
  return (
    <PageHeading
      title="Projects"
      description="A collection of things we’re building."
    />
  )
}
```

Import it in `src/app/app.tsx` and add a child route inside `SiteLayout`:

```tsx
<Route path="projects" element={<ProjectsPage />} />
```

Add `{ label: 'Projects', href: '/projects' }` to `siteConfig.nav`. The layout is
shared automatically. On small screens, the header moves the navigation onto
its own row; consider a mobile menu if your project grows beyond a few links.

### Add shadcn/ui components

```bash
npx shadcn@latest add dialog
```

The CLI reads `components.json` and adds editable source to `src/components/ui`.
shadcn generates lowercase, flat filenames by default. After adding a component,
move it into this project's PascalCase convention—for example,
`src/components/ui/dialog.tsx` → `src/components/ui/Dialog/Dialog.tsx`—and update
its imports and any imports in other generated components. Map kebab-case names
like `alert-dialog.tsx` to `AlertDialog/AlertDialog.tsx`.

If the CLI generates dependencies you already have (such as `button.tsx`), use
the existing `Button/Button.tsx` and update the new component's imports rather
than keeping a duplicate. For updates, compare generated code with your existing
component before replacing customized code. Finish with `npm run format` and
`npm run check`.

Installed examples include Button, Card, Input, Textarea, Label, and Badge.
The current CLI uses the `cn` package; `src/lib/utils.ts` re-exports that helper
for app code. The shadcn package is a development dependency for its CLI and CSS.

### Connect the Contact form

The form deliberately says **Demo only**. Native browser validation checks the
required inputs. Submission displays local preview feedback; it does not send
requests, store messages, or claim delivery. Replace `handleSubmit` in
`src/pages/contact.tsx` with your service integration, add loading/error/success
states, and update the labels only after delivery works. The email address is
also a placeholder.

## Deploy to Vercel

### Git integration (recommended)

1. Push your project to a Git provider.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Use the **Vite** framework preset and the repository root directory.
4. Select Node.js **22.x** (latest patch) or **24.x** in project settings.
5. Deploy. `vercel.json` already sets `npm ci`, `npm run build`, and `dist`.

No project ID, account name, or environment variables need to be hard-coded.
Vercel connects those when you import the repository.

### CLI

```bash
npm run check
npx vercel           # Link the project and create a preview deployment
npx vercel --prod    # Deploy to production when ready
```

Edit `vercel.json` if you change the build command or output directory. Its SPA
rewrite allows refreshes and direct links to `/about` and `/contact`. The 404
page is client-rendered; unknown routes still receive the SPA's HTTP 200 response.
If you later add API routes, revisit routing rules for that backend.

The starter includes deployment configuration; it has not been deployed to an
account on your behalf. For background, see [Vercel's Vite documentation](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).

## Git hygiene

`.gitignore` excludes dependencies, build output, local environment files,
Vercel state, common AI assistant instructions/settings/caches, and browser
automation output. This includes case variants of `CLAUDE.md`, `AGENTS.md`,
`GEMINI.md`, OMO, `.serena`, `.playwright`, Claude, Codex, OpenCode, Cursor,
Windsurf, Copilot instruction files, and Superpowers planning notes.

Authored Playwright tests and configuration, normal application code, the lockfile,
and GitHub workflows remain trackable. Add rules for any new tools you adopt.
Ignore rules do not remove files already tracked by Git.

## Version notes

React **19.3.1**, Vite **8.3.7**, Tailwind CSS **4.3.5**, and React Router **8.5.1**
were the latest stable versions resolved for this starter. TypeScript is pinned
to **6.0.x** because the current typescript-eslint release supports `<6.1.0`,
not TypeScript 7. The lockfile records the complete reproducible dependency set.
