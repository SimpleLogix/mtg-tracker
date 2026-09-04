import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.simplelogix.app',
  appName: 'MTG Tracker',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      hidden: true,
      insetsHandling: 'css',
    },
  },
};

export default config;
