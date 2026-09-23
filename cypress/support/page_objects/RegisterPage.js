class RegisterPage {
  get firstNameInput() { return cy.get('#firstName'); }
  get lastNameInput() { return cy.get('#lastName'); }
  get usernameInput() { return cy.get('#username'); }
  get passwordInput() { return cy.get('#password'); }
  get confirmPasswordInput() { return cy.get('#confirmPassword'); }
  get submitButton() { return cy.get('[data-test="signup-submit"]'); }

  get firstNameError() { return cy.get('#firstName-helper-text'); }
  get lastNameError() { return cy.get('#lastName-helper-text'); }
  get usernameError() { return cy.get('#username-helper-text'); }
  get passwordError() { return cy.get('#password-helper-text'); }
  get confirmPasswordError() { return cy.get('#confirmPassword-helper-text'); }

  visit() {
    cy.visit('/signup');
  }

  fillForm({ firstName, lastName, username, password, confirmPassword }) {
    if (firstName) this.firstNameInput.type(firstName);
    if (lastName) this.lastNameInput.type(lastName);
    if (username) this.usernameInput.type(username);
    if (password) this.passwordInput.type(password);
    if (confirmPassword) this.confirmPasswordInput.type(confirmPassword);
  }

  triggerValidationOnAllFields() {
    this.firstNameInput.focus().blur();
    this.lastNameInput.focus().blur();
    this.usernameInput.focus().blur();
    this.passwordInput.focus().blur();
    this.confirmPasswordInput.focus().blur();
  }

  submit() {
    this.submitButton.click();
  }
}

export default new RegisterPage();