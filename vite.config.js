import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.loca.lt'],
  },
  preview: {
    host: true,
    allowedHosts: ['.loca.lt'],
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#0157FE': 'currentColor',
          '#000000': 'currentColor',
          '#000': 'currentColor',
          black: 'currentColor',
        },
      },
    }),
  ],
})
