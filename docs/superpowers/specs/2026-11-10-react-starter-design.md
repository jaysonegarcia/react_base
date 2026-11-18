# React starter design

## Approved scope

A reusable, general-purpose React starter, with no domain-specific application logic. The user approved the following scope in chat:

- Latest stable React, TypeScript, and Vite.
- Tailwind CSS v4 and shadcn/ui.
- React Router with Home, About, Contact, and 404 pages.
- Shared responsive header, footer, and page layout.
- Folders for `app`, `pages`, `components/ui`, `components/layout`, `lib`, and `config`.
- ESLint, Prettier, consistent two-space indentation, and type-check commands.
- Editable `vercel.json` supporting direct links to client-side routes.
- README for setup, customization, adding components, and deployment.
- A single site configuration file for project name, navigation, and contact details.
- Contact form with explicitly labeled demo behavior until connected to a service.

## Implementation choices

These are builder defaults, not additional user requirements: npm with a committed lockfile; light, neutral styling with a restrained accent; mobile-first navigation; local shadcn source components; no authentication, database, or backend. Resolve stable package versions from the registry at implementation time rather than assuming version numbers. Keep dependencies small and compatible with the current stable tooling. Document the actual Node engine requirement.

Use ordinary named page components and a single route definition. Centralize reusable site copy and navigation in `src/config/site.ts`. Keep input labels, focus styles, keyboard access, and narrow screens usable. Do not simulate a successful message delivery in the demo contact form.

## Delivery criteria

A fresh `npm ci` supports development, linting, formatting checks, type checking, and production builds. All four pages are accessible through routing, navigation works at mobile width, and direct nested URLs work with the deployment configuration. README explains copying the template, changing package/site metadata, adding a route, adding shadcn components, and deploying to Vercel. No actual deployment is requested.
