/// <reference types="cypress" />

import { config } from "chai"

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
export default function setupPlugins(on, config) {
    // Aquí puedes configurar los eventos de Node.js personalizados
    // Ejemplo: definir tareas personalizadas
    // on('task', {
    //   myTask() {
    //     return null;
    //   }
    // });
  
    return config; // Asegúrate de devolver el objeto config
  }