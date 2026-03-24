/// <reference types="cypress"/>
import { loginPageElements } from "../../support/POM/login/loginPageElements";
//we can import how many variales we want
import {
  inventoryPageElements,
  colors,
} from "../../support/POM/inventory/inventoryPageElements";

describe("inventory spec", () => {
  it.only("test 4", () => {
    // cy.visit("https://www.saucedemo.com/");
    // cy.get(loginPageElements.username).type("standard_user");
    // cy.get(loginPageElements.password).type("secret_sauce");
    // cy.get(loginPageElements.login_button).click();
    cy.login("standard_user", "secret_sauce");

    cy.url().should("include", "https://www.saucedemo.com/inventory.html");
    cy.get(inventoryPageElements.inventory_list)
      .children()
      .should("have.length", 6);
    cy.contains(inventoryPageElements.inventory_item, "Bike Light")
      .find(inventoryPageElements.inventory_item_price)
      .contains("$9");
    cy.contains(inventoryPageElements.inventory_item, "Bike Light")
      .find(inventoryPageElements.inventory_item_desc)
      .contains("A red light");
    cy.get("[data-test='add-to-cart-sauce-labs-bike-light']").click();

    cy.contains(inventoryPageElements.inventory_item, "Backpack")
      .find("button")
      .should("have.text", "Add to cart")
      .and("have.css", "background-color", colors.white_color)
      .click();

    cy.contains(inventoryPageElements.inventory_item, "Backpack")
      .find("button")
      .should("have.text", "Remove")
      .and("have.css", "color", colors.red_color)
      .click();
  });

  it.only("test 5", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get(loginPageElements.username).type("standard_user");
    cy.get(loginPageElements.password).type("secret_sauce");
    cy.get(loginPageElements.login_button).click();
    cy.url().should("include", "https://www.saucedemo.com/inventory.html");
    cy.get(".inventory_item_price").each(($el) => {
      cy.wrap($el).should("contain.text", "$");
    });
  });
});
