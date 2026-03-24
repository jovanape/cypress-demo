const loginPageElements = {
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  login_button: '[data-test="login-button"]',
};

/*
We can have multiple dirs inside POM:
- inventory that contains file/s with selectors for inventory page
- login that contains file/s with selectors for login page
*/

// URL treba da bude u config fajlu, ne ovde! Postoji razlika!

export { loginPageElements };
