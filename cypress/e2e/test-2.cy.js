/// <reference types = "cypress"/>
import { cartPageElements } from "../support/POM/cart/cartPageElements";

describe("e-2-e tests", () => {
  // Hooks

  // U before stavimo stanje app koje zelimo a sve testove
  // Ne mozemo ovde log-in da stavimo, jer ako bismo imali 2 ili vise testa,
  // samo bi se prvi izvrsio i drugi bi vec pao jer zahteva logovoanje,
  // a logovanje se vrsi samo jednom na pocetku pre svih testova

  // Znaci logovanje mora u beforeEach

  // session state - logovanje - cypress session pass
  // cypress io
  // Sesija sluzi da cuvamom stanje nakon logovanja - dobijemo token
  // nakon logovanja na app
  // token je sifra da smo to mi
  // na backendu validiraju da smo to mi i dozvoljavaju/daju transfer podataka
  // ne moramo stalno da se logujemo
  // kada nemamo token, nas app izloguje
  // token cuvamo u lockage storage-u? - radicemo tek

  // Funkcije se ne pisu unutar describe-a
  // mozemo da definisemo unutar describe-a varijablu koja je funkcija
  // koja nam sluzi bas za te testove koje pisemo unutar tog describe-a
  // Ali generalno pisemo funkcije u zasebnom folderu

  before(() => {
    cy.log("Before all tests");
    // testovi koji sluze sa situaciju da se obrisu neki objekti koji se
    // nalaze u aplikaciij
    // kod se nece izvrsiti ako padne test, zato ovo ne radimo na kraju testa
    // ako postoje ti objekti obrisi ih, ako ne postoje nastavi samo testove

    // U before radimo ovo - primer:
    // Ako zelimo da stranica bude prazna bez i jednog itema, da bismo testirali
    // poruku koja se javlja u tom slucaju ili testiranje kreiranja prvog objekta
    // onda cemo da obrisemo sve iteme - kartice
  });
  // TODO: Da li ce ovo biti prikazano u nekom primeru?
  // U praksi se mnogo cesce koriste before i before each nego after i after each
  // Kada se logujemo preko API-ja, necemo prolaziti kroz celu putanju do poslednje stranice recimo,
  // nego samo pravo odemo na tu stranicu

  // Kada ispisemo testove za login, ne treba vise da to koristimo,
  // login i kreiranje objekata onda preko API-ja koristimo
  // UI - skupo i podlozno greskama, vremenski zahtevno
  // Treba da imamo sto vise testova koji ce se izvrsiti za krace vreme

  // Mi mozemo da mesamo API i UI - assertujemo tacno ono sto hocemom,
  // a dodjemo do toga preko API-ja

  // Napravicemo funkcije za kreiranje, brisanje
  beforeEach(() => {
    cy.log("Before each test");
    cy.visit("https://www.saucedemo.com/");
    cy.url().should("include", "www.saucedemo.com");
    cy.get("[data-test='username']").type("standard_user");
    cy.get("[data-test='password']").type("secret_sauce");
    cy.get("[data-test='login-button']").click();
    cy.url().should("include", "com/inventory.html");
  });

  after(() => {
    cy.log("After all tests");
  });

  afterEach(() => {
    cy.log("After each test");
  });

  it("test 1", () => {
    // cy.get('[data-test="primary-header"]').should("have.text", "Swag Labs");
    /* primary-header points to this container (it has all these captions inside - can't use have.text):
    <divclass="primary_header">
        Open Menu
        All Items
        About
        Logout
        Reset App State
        Close Menu
        Swag Labs</div>
    */
    cy.get('[data-test="primary-header"]').contains("Swag Labs");
    // We have to use exist or be.visible after find!
    // If the element doesn't exist, Cypress simply returns an empty jQuery collection. No test failure yet.
    cy.get('[data-test="primary-header"]')
      .find('[id="react-burger-menu-btn"]')
      .should("exist");
    cy.get('[data-test="primary-header"]')
      .find('[id="react-burger-menu-btn"]')
      .should("be.visible");
    // be.visible is slightly stronger than exist.
    // sort items
    // Not like this - click cannot be called on select!
    /*
    cy.get('[data-test="product-sort-container"]')
      .click()
      .find('[value="hilo"]')
      .click();
      */
    // This is correct way:
    cy.get('[data-test="product-sort-container"]').select("hilo");
    // Or by index
    cy.get('[data-test="product-sort-container"]').select(0);
    // add item to cart
    cy.get('[data-test="inventory-list"]')
      .children()
      .last()
      .find("button", "Add to cart")
      .click();
    // Go to cart
    // There is red circle - badge (span element) inside <a> tag: shopping-cart-badge
    // We can click on it as well
    /*
    Ali u praksi je bolje kliknuti na link (.shopping_cart_link),
    jer badge je samo vizuelni element, a klik na njega zapravo delegira klik na roditeljski link.
    Klik na badge radi, ali ako ga nema (npr. korpa je prazna), ovaj element ne postoji i test bi pao.
    */
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "https://www.saucedemo.com/cart.html");
    // Check quantity is 1
    // And increase it to 3
    cy.get(cartPageElements.item_quantity).should("have.text", "1");
    // It is not possible to change value in div
    // cy.get("[data-test='item-quantity']").type("3");
    // Click on Checkout
    cy.get(cartPageElements.checkout_button).click();
    cy.url().should(
      "include",
      "https://www.saucedemo.com/checkout-step-one.html",
    );
    cy.get('[data-test="firstName"]').type("Jovana");
    cy.get('[data-test="lastName"]').type("Pe");
    cy.get('[data-test="postalCode"]').type("11000");
    cy.get('[data-test="continue"]').click();
    cy.url().should(
      "include",
      "https://www.saucedemo.com/checkout-step-two.html",
    );

    cy.get('[data-test="payment-info-value"]').should("be.visible");
    cy.get('[data-test="subtotal-label"]').contains("15.99");
    // fails because Cypress is literally looking for a newline character \n in the text,
    // which doesn’t exist.
    // Test full text like a single string
    cy.get('[data-test="tax-label"]').contains("Tax: $1.28");
    // Click on Finish button
    cy.get('[data-test="finish"]').should("be.visible").click();
    // Check link
    cy.url().should(
      "include",
      "https://www.saucedemo.com/checkout-complete.html",
    );
    // Check img
    // We can use visual testing to test img too - https://www.browserstack.com
    cy.get('[data-test="pony-express"]').should("be.visible");
    // Check img source
    cy.get('[data-test="pony-express"]')
      .should("have.attr", "src")
      .and(
        "contain",
        "iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw",
      );
    // Check src is a base4 PNG
    cy.get('[data-test="pony-express"]')
      .invoke("attr", "src")
      .should("match", /^data:image\/png;base64,/);
    cy.get('[data-test="complete-text"]').should("exist");
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("include", "https://www.saucedemo.com/inventory.html");
  });
});
