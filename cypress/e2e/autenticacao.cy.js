import loginPage from '../support/page_objects/LoginPage';
import registerPage from '../support/page_objects/RegisterPage';

describe('Módulo de Autenticação e Registro', () => {

  const timestamp = new Date().getTime();
  const testUser = `user_${timestamp}`;
  const testPass = 'senha123';

  before(() => {
    registerPage.visit();
    registerPage.fillForm({
      firstName: 'Usuario',
      lastName: 'Teste',
      username: testUser,
      password: testPass,
      confirmPassword: testPass
    });
    registerPage.submit();
  });

  describe('Login com sucesso', () => {
    it('Deve fazer login com um usuário válido', () => {
      loginPage.visit();
      loginPage.login(testUser, testPass);

      cy.location('pathname').should('eq', '/');
      cy.get('[data-test="sidenav"]').should('be.visible');
    });
  });

  describe('Login com falha', () => {
    it('Deve exibir mensagem de erro com credenciais inválidas', () => {
      loginPage.visit();
      loginPage.login('usuario_invalido', 'senha_incorreta');

      cy.get('[data-test="signin-error"]')
        .should('be.visible')
        .and('contain', 'invalid');
    });
  });

  describe('Registro de usuário', () => {
    it('Deve registrar um novo usuário com sucesso', () => {
      const newUser = `novo_${new Date().getTime()}`;

      registerPage.visit();
      registerPage.fillForm({
        firstName: 'Ana',
        lastName: 'Silva',
        username: newUser,
        password: 'password123',
        confirmPassword: 'password123'
      });
      registerPage.submit();

      cy.location('pathname').should('eq', '/signin');
    });

    it('Deve exibir erro ao tentar registrar sem preencher campos obrigatórios', () => {
      registerPage.visit();

      cy.get('#firstName').focus().blur();
      cy.get('#lastName').focus().blur();
      cy.get('#username').focus().blur();
      cy.get('#password').focus().blur();
      cy.get('#confirmPassword').focus().blur();
      
      cy.get('[data-test="signup-submit"]').should('be.disabled');
    });
  });

});