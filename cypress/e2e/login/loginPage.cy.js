/// <reference types="cypress"/>

describe("Login tests", () => {
  it.only("test 1", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.url().should("include", "demo");
    cy.get("[data-test='login-button']").click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username is required",
    );
    cy.get("[data-test='error']").should("contain", "Username");
    //cy.get("[data-test='error']").should("include", "Username");
    cy.get("[data-test='error-button']").click();
  });

  it.only("test 2", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').clear();
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get("[data-test='error']").should(
      "have.text",
      "Epic sadface: Username is required",
    );
  });

  // komentari nisu cist kod, prolazi se kroz to, renderue, trea biti restriktivan u pisanju komentara

  it.only("test 3", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').clear();
    cy.get('[data-test="login-button"]').click();
    //cy.get("[data-test='error']").should("have.text", "Epic sadface: Password is required");
    /*cy.get(".error-message-container")*/ // ako kazes tacka onda naziv samo jedne klase
    cy.get('[class="error-message-container error"]') // ako kazes class onda moraju se klase da se navedu inace nece raditi
      .should("have.text", "Epic sadface: Password is required")
      .and("have.css", "background-color", "rgb(226, 35, 26)")
      .and("have.css", "color", "rgb(19, 35, 34)"); // mora space kod r, g, b inace nece raditi ovako r,g,b
  });
});
