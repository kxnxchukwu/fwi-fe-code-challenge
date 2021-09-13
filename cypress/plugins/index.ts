/// <reference types="cypress" />

export default function plugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): void | Cypress.ConfigOptions | Promise<Cypress.ConfigOptions> {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config;
}
