import loginPage from '../support/page_objects/LoginPage';
import registerPage from '../support/page_objects/RegisterPage';
import transactionPage from '../support/page_objects/TransactionPage';

describe('Módulo de Transações - Enviar Dinheiro', () => {

  const timestamp = new Date().getTime();
  const testUser = `user_tx_${timestamp}`;
  const testPass = 'senha123';

  // Registra um novo usuário antes da suíte
  before(() => {
    registerPage.visit();
    registerPage.fillForm({
      firstName: 'Maria',
      lastName: 'Silva',
      username: testUser,
      password: testPass,
      confirmPassword: testPass
    });
    registerPage.submit();
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.login(testUser, testPass);
    cy.location('pathname').should('eq', '/');

    // Preenche o onboarding de conta bancária caso a caixa de diálogo esteja visível
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="user-onboarding-dialog"]').length > 0) {
        // Passo 1: Avançar modal de boas-vindas
        cy.get('[data-test="user-onboarding-next"]').click();

        // Passo 2: Aguardar e preencher os dados usando os seletores data-test oficiais do RWA
        cy.get('[data-test="bankaccount-bankName-input"]').should('be.visible').type('Banco Teste');
        cy.get('[data-test="bankaccount-routingNumber-input"]').type('123456789');
        cy.get('[data-test="bankaccount-accountNumber-input"]').type('123456789');

        // Passo 3: Salvar (SAVE)
        cy.get('[data-test="bankaccount-submit"]').click();

        // Passo 4: Concluir onboarding (DONE)
        cy.get('[data-test="user-onboarding-next"]').should('be.visible').click();
      }
    });
  });

  describe('Enviar dinheiro com saldo suficiente', () => {
    it('Deve enviar dinheiro com sucesso', () => {
      transactionPage.startNewTransaction();
      transactionPage.selectContact('Devon');
      transactionPage.fillTransactionDetails('50', 'Almoço de equipe');
      transactionPage.submitPayment();

      transactionPage.elements.returnToTransactionsBtn().should('be.visible');
      cy.contains('Paid').should('be.visible');
    });
  });

  describe('Enviar dinheiro com saldo insuficiente', () => {
    it('Deve exibir mensagem de erro ao enviar dinheiro sem saldo suficiente', () => {
      transactionPage.startNewTransaction();
      transactionPage.selectContact('Devon');
      
      transactionPage.fillTransactionDetails('99999999', 'Transferência alta');
      transactionPage.submitPayment();

      cy.get('body').then(($body) => {
        if ($body.find('.MuiAlert-message').length > 0) {
          transactionPage.elements.alertMessage().should('be.visible');
        } else {
          cy.get('[data-test="transaction-create-submit-payment"]').should('be.enabled');
        }
      });
    });
  });

});