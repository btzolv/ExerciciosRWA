const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL onde o RWA roda localmente
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});