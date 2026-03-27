/// <reference types="cypress"/>

describe("Test 1", () => {
  let article_number;
  before(() => {
    // TODO Should we put login in before all?
  });

  it("test-1", () => {
    const credentials = {
      user: { email: "jovana@gmail.com", password: "jovana1234" },
    };

    cy.request({
      method: "POST",
      url: "https://conduit-api.bondaracademy.com/api/users/login",
      body: credentials,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.user.token;

      // Add new article - Title must be unique!
      const article = {
        article: {
          title: "QA testing 33", // TODO Unique!
          description: "about QA testing",
          body: "text text text text text",
          tagList: ["QA article, text"],
        },
      };
      cy.request({
        method: "POST",
        url: "https://conduit-api.bondaracademy.com/api/articles/",
        headers: { authorization: "Token " + token },
        body: article,
      }).then((res) => {
        console.log(res);
        console.log(res.body.article.slug);
        const slug = res.body.article.slug;
        console.log("SLUG: " + slug);

        // Get just added article by slug
        cy.request({
          method: "GET",
          url: `https://conduit-api.bondaracademy.com/api/articles/${slug}`,
          headers: { Authorization: `Token ${token}` },
        }).then((res) => {
          expect(res.status).to.eq(200);
          console.log(res);
        });

        // PUT - change current
        const article_put_data = {
          article: {
            title: "QA testing 109", // TODO Unique!
            description: "about QA testing",
            body: "1234",
            tagList: ["QA article, text"],
          },
        };

        cy.request({
          method: "PUT",
          url: `https://conduit-api.bondaracademy.com/api/articles/${slug}`,
          headers: { Authorization: "Token " + token },
          body: article_put_data,
        }).then((res) => {
          console.log(res);
          expect(res.body.article.title).to.include("QA testing");
          // expect(res.body.article.title).to.equal("QA testing 104");
          // Don't use eq with strings!
          // expect(res.body.article.title).to.eq("QA testing 100");
          const new_slug = res.body.article.slug;
          console.log("SLUG after PUT: " + new_slug);
          // SLUG: QA-testing-30-49967
          // SLUG after PUT: QA-testing-106-49967

          cy.request({
            method: "DELETE",
            url: `https://conduit-api.bondaracademy.com/api/articles/${new_slug}`,
            headers: { Authorization: "Token " + token },
          }).then((res) => {
            console.log(res);
            // A 204 Code DELETE means that a DELETE request has been
            // successfully processed, but the server does not return any content.
            // This status code is typically used when the resource is successfully
            // deleted, and there is no need for a response body,
            // confirming the deletion without additional information.
            expect(res.status).to.eq(204);
            cy.request({
              method: "GET",
              url: "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
              headers: { Authorization: "Token " + token },
            }).then((res) => {
              console.log(res);
              expect(res.body.articles[0].title).not.to.equal("QA Testing 109");
            });
          });
        });
      });
    });

    const list_example = [
      { id: 1, name: "Milica", id: 2, name: "Vesna", id: 3, name: "Pera" },
    ];

    const item = list_example.find((obj) => obj.name === "Pera");
    console.log(item);
    if (item) {
      console.log("It exists");
    } else {
      console.log("It doesn't exist");
    }
  });
});
