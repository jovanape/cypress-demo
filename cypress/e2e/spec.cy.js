/// <reference types="cypress"/>

describe("template spec", () => {
  it("test 1", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("form").children().eq(0).type("Joavna");
  });

  it.only("test 2", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test='username']").parent().parent();
    cy.get("form").children().first();
    cy.get("form").children().last();
    cy.get('[data-test="username"]').type("Jovana");
    cy.get("form").find("input");
  });
});
