class HistoryPage {
  elements = {
    personalTab: () => cy.get('[data-test="nav-personal-tab"]'),
    transactionItems: () => cy.get('[data-test^="transaction-item"]'),
    emptyStateList: () => cy.get('[data-test="empty-list-header"]')
  };

  goToPersonalHistory() {
    this.elements.personalTab().click();
  }
}

export default new HistoryPage();