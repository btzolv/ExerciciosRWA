class TransactionPage {
  elements = {
    newTransactionBtn: () => cy.get('[data-test="nav-top-new-transaction"]'),
    userSearchInput: () => cy.get('[data-test="user-list-search-input"]'),
    userListItem: () => cy.get('[data-test^="user-list-item"]').first(),
    amountInput: () => cy.get('#amount'),
    noteInput: () => cy.get('#transaction-create-description-input'),
    payBtn: () => cy.get('[data-test="transaction-create-submit-payment"]'),
    returnToTransactionsBtn: () => cy.get('[data-test="new-transaction-return-to-transactions"]'),
    alertMessage: () => cy.get('.MuiAlert-message')
  };

  startNewTransaction() {
    this.elements.newTransactionBtn().click();
  }

  selectContact(name) {
    if (name) {
      this.elements.userSearchInput().scrollIntoView().type(name, { force : true });
    }
    this.elements.userListItem().click( { force : true } );
  }

  fillTransactionDetails(amount, note) {
    this.elements.amountInput().type(amount);
    this.elements.noteInput().type(note);
  }

  submitPayment() {
    this.elements.payBtn().click();
  }
}

export default new TransactionPage();