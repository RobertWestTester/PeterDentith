// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-ntlm-auth/dist/commands";

Cypress.Commands.add('launchWebsite', ()=>{
    cy.fixture('survey.json').then((data) =>{
        // Visit SuperSurvey website
        cy.visit('/')
    
         // Verify SuperSurvey website is opened
          cy.url().should('eq', data.url);
    
        // Navigate to Survey Tab | Confirm active and click
        cy.contains(data.surveyTab).should('have.class', 'active').click();
    })
});