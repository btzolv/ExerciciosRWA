class LoginPage {
  get usernameInput() { return cy.get('#username'); }
  get passwordInput() { return cy.get('#password'); }
  get submitButton() { return cy.get('[data-test="signin-submit"]'); }
  get errorMessage() { return cy.get('[data-test="signin-error"]'); }

  visit() {
    cy.visit('/signin');
  }

  login(username, password) {
    this.visit();
    if (username) this.usernameInput.clear().type(username);
    if (password) this.passwordInput.clear().type(password);
    this.submitButton.click();
  }
}

export default new LoginPage();