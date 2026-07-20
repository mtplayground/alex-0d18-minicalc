# MiniCalc

Frontend scaffold for MiniCalc built with Vite, React, TypeScript, and Tailwind CSS.

## Scripts

- `npm run dev` starts the local Vite dev server.
- `npm run build` type-checks and creates the production build.
- `npm run preview` serves the production build locally.
- `npm run serve:dist` serves the optimized `dist` directory for a static-host smoke test.
- `npm run test:unit` runs the Vitest unit/component suite.
- `npm run test:e2e` runs the Playwright browser smoke test.

## Static Deployment

Run `npm run build` to create the optimized static site in `dist/`. The build uses relative asset paths, so the `dist` directory can be copied as-is to a basic static file host.

For a local production smoke test, run `npm run serve:dist` after building and open the printed local URL.
