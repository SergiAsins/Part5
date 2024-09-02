import { defineConfig } from 'cypress';
import setupPlugins from './cypress/plugins/index.js';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configura eventos de Node usando el módulo importado
      return setupPlugins(on, config);
    },
  },
});
