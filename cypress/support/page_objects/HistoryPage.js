class HistoryPage {
  elements = {
    // A aba "Mine" no RWA possui o seletor nav-personal-tab
    personalTab: () => cy.get('[data-test="nav-personal-tab"]'),
    transactionItems: () => cy.get('[data-test^="transaction-item"]'),
    emptyStateList: () => cy.get('[data-test="empty-list-header"]')
  };

  goToPersonalHistory() {
    this.elements.personalTab().click();
  }
}

export default new HistoryPage();