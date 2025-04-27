const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ziasyz',
  e2e: {
    setupNodeEvents(on, config) {
      return config; // Adicione esta linha por boas práticas
    },
    baseUrl: "http://localhost:3000",
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/mochawesome",
        overwrite: false,
        html: true,
        json: true,
        timestamp: "mmddyyyy_HHMMss"
      }
    }
  },
  video: false,
  screenshotOnRunFailure: true
});


