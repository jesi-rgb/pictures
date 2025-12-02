# Agent Guidelines for paytest

## Commands

- Build: `pnpm build`
- Dev: `pnpm dev` (or `pnpm devsafe` to clear .next cache)
- Lint: `pnpm lint`
- Test all: `pnpm test` (runs integration + e2e)
- Test integration: `pnpm test:int` (single test: `vitest run path/to/file.int.spec.ts`)
- Test e2e: `pnpm test:e2e` (single test: `pnpm exec playwright test path/to/file.e2e.spec.ts`)
- Generate types: `pnpm generate:types`

## Code Style

- **Formatting**: Prettier with single quotes, no semicolons, 100 char width, trailing commas
- **Imports**: Use `@/` alias for src imports (e.g., `@/payload.config`), Next.js imports end with `.js` extension
- **Types**: TypeScript strict mode enabled, use proper types (avoid `any`), generate Payload types with `pnpm generate:types`
- **Naming**: Unused vars/args prefix with `_`, use camelCase for variables, PascalCase for components
- **React**: Use async server components by default, functional components with TypeScript
- **Error handling**: Prefix caught errors with `_` or `ignore` if unused per ESLint config
- **Collections**: Place in `src/collections/`, export as `CollectionConfig` type
- **Tests**: Integration tests in `tests/int/*.int.spec.ts`, e2e in `tests/e2e/*.e2e.spec.ts`

## Tech Stack

Next.js 15 (App Router) + React 19 + Payload CMS 3 + PostgreSQL + TypeScript + Tailwind CSS + DaisyUI
