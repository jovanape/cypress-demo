/// <reference types="cypress"/>

describe("Test 1", () => {
  it("test-1", () => {
    const credentials = {
      user: { email: "jovana@gmail.com", password: "jovana1234" },
    };

    cy.request(
      "POST",
      "https://conduit-api.bondaracademy.com/api/users/login",
      credentials,
    )
      // .its can be used only with object keys like body or body.user etc, not response
      // .its("body.user.email")
      // .then((response) => {
      // console.log(response);
      // });
      .then((response) => {
        expect(response.status).to.eq(200);
        console.log(response);
        const user = response.body.user;
        // TODO We have to use onBeforeLoad() with win
        // window.localStorage.setItem("user", JSON.stringify(user));

        cy.visit("https://conduit.bondaracademy.com/", {
          onBeforeLoad(win) {
            win.localStorage.setItem("jwtToken", user.token);
          },
        });

        cy.window().then((win) => {
          console.log(win.localStorage);
          expect(win.localStorage.getItem("jwtToken")).to.exist;
        });
      });
  });
});
