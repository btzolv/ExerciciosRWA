import loginPage from '../support/page_objects/LoginPage';
import registerPage from '../support/page_objects/RegisterPage';
import transactionPage from '../support/page_objects/TransactionPage';
import historyPage from 'cypress\support\page_objects\HistoryPage.js'

const handleOnboarding = () => {
  cy.get('[data-test="user-onboarding-dialog"]').should('be.visible');
  cy.get('[data-test="user-onboarding-next"]').click();
  cy.get('[data-test="bankaccount-bankName-input"]').should('be.visible').type('Banco Teste');
  cy.get('[data-test="bankaccount-routingNumber-input"]').type('123456789');
  cy.get('[data-test="bankaccount-accountNumber-input"]').type('123456789');
  cy.get('[data-test="bankaccount-submit"]').click();
  cy.get('[data-test="user-onboarding-next"]').should('be.visible').click();
};

describe('Módulo de Histórico de Transações', () => {

  describe('Visualizar histórico de transações com sucesso', () => {
    const timestamp = new Date().getTime();
    const userWithHistory = `user_hist_${timestamp}`;
    const testPass = 'senha123';

    it('Deve exibir o histórico de transações de um usuário corretamente', () => {

      registerPage.visit();
      registerPage.fillForm({
        firstName: 'Carlos',
        lastName: 'Eduardo',
        username: userWithHistory,
        password: testPass,
        confirmPassword: testPass
      });
      registerPage.submit();

      loginPage.visit();
      loginPage.login(userWithHistory, testPass);
      handleOnboarding();

      transactionPage.startNewTransaction();
      transactionPage.selectContact('Devon');
      transactionPage.fillTransactionDetails('25', 'Pagamento de teste');
      transactionPage.submitPayment();

      cy.get('[data-test="new-transaction-return-to-transactions"]').click();

      historyPage.goToPersonalHistory();
      historyPage.elements.transactionItems().should('have.length.at.least', 1);
    });
  });

  describe('Tentar visualizar o histórico de transações sem transações anteriores', () => {
    const timestamp = new Date().getTime();
    const userWithoutHistory = `user_empty_${timestamp}`;
    const testPass = 'senha123';

    it('Deve exibir uma mensagem indicando que o usuário não possui transações anteriores', () => {
      registerPage.visit();
      registerPage.fillForm({
        firstName: 'Lucas',
        lastName: 'SemTransacao',
        username: userWithoutHistory,
        password: testPass,
        confirmPassword: testPass
      });
      registerPage.submit();

      loginPage.visit();
      loginPage.login(userWithoutHistory, testPass);
      handleOnboarding();

      historyPage.goToPersonalHistory();
      historyPage.elements.emptyStateList().should('be.visible');
      historyPage.elements.emptyStateList().should('contain', 'No Transactions');
    });
  });

});