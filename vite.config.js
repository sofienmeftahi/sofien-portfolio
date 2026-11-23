import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        -> normal site in dist/ (to deploy on sofienmeftahi.studio)
// `npm run build:single` -> one self-contained index.html in dist-single/
export default defineConfig(({ mode }) => {
  // base './' keeps every path relative, so the site works on any host or sub-folder
  const single = mode === 'single'
  return {
    base: './',
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      assetsInlineLimit: single ? 100_000_000 : 4096,
      chunkSizeWarningLimit: 2000,
    },
  }
})
