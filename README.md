# Northern Virginia Tree Help

This repository contains the source bundle and Netlify deployment configuration for the Northern Virginia Tree Help website.

## Deployment

The app source is stored in `site-source.zip` and extracts into the `tree-source/` directory. Netlify uses `tree-source` as its build base, extracts the source bundle there, installs the dependencies, and runs the TanStack Start production build.

The Netlify Vite plugin must run after the TanStack Start Vite plugin. The build command applies that ordering before building.

Netlify publishes `dist/client` and the TanStack Start server output as Netlify Functions. The site is only considered working after a successful production deployment with the expected server function and a working homepage.
