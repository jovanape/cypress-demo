/// <reference types="cypress"/>

describe("Test 1", () => {
  it("test-1", () => {
    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    ).as("articles");
    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/articles/Title-example-2-49967",
    ).as("article");

    cy.visit("https://conduit.bondaracademy.com/login");
    cy.get('[placeholder="Email"]').type("jovana@gmail.com");
    cy.get('[placeholder="Password"]').type("jovana1234");
    cy.get('[type="submit"]').click();

    cy.wait("@articles");
    cy.contains("Discover").click();

    // Delete existing
    // cy.contains("Home").click();
    // cy.contains("Global Feed").click();
    // cy.contains("Title - example 1", { timeout: 0 }).then(($elem) => {
    //   if ($elem.length) {
    //     cy.wrap($elem).click();
    //     cy.contains("Delete Article").click();
    //   }
    // });

    cy.contains("Home").click();
    cy.contains("Global Feed").click();

    // Add new article
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type("Title - example 2");
    cy.get('[placeholder="What\'s this article about?"]').type(
      "About article - example 1 text text text text",
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      "article text text text text text",
    );
    cy.get('[placeholder="Enter tags"]').type("article, text");
    cy.contains(" Publish Article ").click();
    // TODO
    // 200 OK means the request succeeded and returns the requested data,
    // but does not necessarily create a new entity.
    // 201 Created signals that a new resource now exists at the request URI,
    // or another forwarding address provided in the Location header.
    cy.wait("@article").then((elem) => {
      console.log("LOG: " + elem);
      cy.log(elem);
      expect(elem.response.statusCode).to.equal(200);
      expect(elem.response.body.article.title).to.equal("Title - example 2");
    });

    //cy.contains("Title - example 1").should("exist");
  });

  // Mocking
  //const newTags = {
  //tags: ["Test", "Blog", "Git", "YouTube", "JOVANA", "QA"],
  //};

  const newTags = {
    tags: [],
  };

  it("test-2", () => {
    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/tags",
      newTags,
    ).as("tags");

    cy.intercept(
      "GET",
      "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
      { fixture: "articles.json" },
    ).as("articles");

    cy.visit("https://conduit.bondaracademy.com/login");
    cy.get('[placeholder="Email"]').type("jovana@gmail.com");
    cy.get('[placeholder="Password"]').type("jovana1234");
    cy.get('[type="submit"]').click();

    cy.wait("@tags");
    cy.contains(" No tags are here... yet. ");
    cy.wait("@articles");
    cy.contains(" No articles");
  });
});
