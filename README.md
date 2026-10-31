# Northern Virginia Tree Help

Source and Netlify deployment configuration for the Northern Virginia Tree Help website.

## Website source bundle

The app source is supplied in `site-source.zip`. It contains the React and TanStack Start project, site pages, form/privacy updates, and optimized images.

Upload `site-source.zip` to the **root of this repository**. Do not extract it first. The root `netlify.toml` automatically unpacks it, installs the project's dependencies, and runs the production build.

## Deployment

Connect this repository to the existing Netlify project. Netlify reads the root `netlify.toml` file:
- Build command: extracts the source archive, installs dependencies, and runs `vite build`.
- Publish directory: `tree-source/dist/client`.
- Node.js: 24.

The live site is not updated until the source archive is added and Netlify completes a successful deployment.
