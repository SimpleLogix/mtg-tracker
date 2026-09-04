import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isCapacitor = mode === 'capacitor'

  return {
    plugins: [
      react(),

      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'MTG Tracker',
          short_name: 'MTG Tracker',
          description: 'Magic: The Gathering Commander game tracker',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',

          start_url: isCapacitor ? './' : '/mtg-tracker/',
          scope: isCapacitor ? './' : '/mtg-tracker/',

          icons: [
            {
              src: isCapacitor
                ? './mtg-icon-192.png'
                : '/mtg-tracker/mtg-icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: isCapacitor
                ? './mtg-icon-512.png'
                : '/mtg-tracker/mtg-icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],

    base: isCapacitor ? './' : '/mtg-tracker/',
  }
})