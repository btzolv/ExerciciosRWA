class transactionPage {
  elements = {
    newTransactionBtn: () => cy.get('[data-test="nav-top-new-transaction"]'),
    userItem: (username) => cy.contains(username),
    amountInput: () => cy.get('#amount'),
    descriptionInput: () => cy.get('#transaction-create-description-input'),
    submitPaymentBtn: () => cy.get('[data-test="transaction-create-submit-payment"]'),
    returnToTransactionsBtn: () => cy.get('[data-test="new-transaction-return-to-transactions"]')
  };

  startNewTransaction() {
    this.elements.newTransactionBtn().click();
  }

  selectContact(name) {
    this.elements.userItem(name).click();
  }

  fillTransactionDetails(amount, description) {
    this.elements.amountInput().type(amount);
    this.elements.descriptionInput().type(description);
  }

  submitPayment() {
    this.elements.submitPaymentBtn().click();
  }

  returnToMainFeed() {
    this.elements.returnToTransactionsBtn().click();
  }
}

export default new transactionPage();