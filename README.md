# Sofien Meftahi — Portfolio

**Live:** https://sofienmeftahi.github.io/sofien-portfolio/

React + Three.js (react-three-fiber) portfolio.

## Run it
You need Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Edit the content
All text, projects, skills and links are in **`src/data.js`**.
To add a project: copy one object in `projects`, put its screenshots in `src/assets/projects/`, and import them at the top of `data.js`.

## Deploy
Every push to `main` builds and publishes the site to GitHub Pages (`.github/workflows/deploy.yml`).

To host it elsewhere (e.g. sofienmeftahi.studio):
```bash
npm run build      # -> dist/  (upload this folder to Netlify, Vercel, GitHub Pages...)
```
`npm run build:single` makes one self-contained `dist-single/index.html`.

## Live demo
`public/media/` holds the demo videos. The "Explore the map live" step loads the GitHub Pages demo of Tunisia Regional Insight.
The CV button also appears automatically when `public/Sofien_Meftahi_CV.pdf` is served.
