import { loginPageElements } from "./POM/login/loginPageElements";
Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://www.saucedemo.com/");
  cy.get(loginPageElements.username).type(username);
  cy.get(loginPageElements.password).type(password);
  cy.get(loginPageElements.login_button).click();
});

// cy.login() gde god pozoveo u kodu on ce odraditi ovaj kod
// imamo parcice naseg koda
// cilj da imamo puzzle i samo sklopimo onako kako nam treba
