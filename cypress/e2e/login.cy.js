/**
 * - Login spec
 * - should display login page correctly
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when email and password are wrong
 * - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5178/login');
  });


  it('should display login page correctly', () => {
    // Skenario 1:
    cy.get('h1').should('contain', 'Login ke Akun Anda');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    // Skenario 3:
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // Skenario 4:
    cy.get('input[name="email"]').type('user-yang-salah@example.com');
    cy.get('input[name="password"]').type('password-salah');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {

    const validEmail = 'shandy@gmail.com';
    const validPassword = 'shandy1234';

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should('equal', 'http://localhost:5178/');
    cy.get('button').should('contain', 'Logout');
  });

  /**
   * Skenario 2 : Menguji jika email kosong
   */
  it('should display alert when email is empty', () => {
    // Arrange: Isi password saja
    cy.get('input[name="password"]').type('password123');

    // Act: Klik login
    cy.get('button[type="submit"]').click();

    // Assert: Tangkap alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
});