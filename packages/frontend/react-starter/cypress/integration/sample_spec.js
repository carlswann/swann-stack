describe('My first tests', () => {
  it('Loads the login form', () => {
    cy.visit('/');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Validation is working', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('form > .sc-bdvvtL > div > .MuiButtonBase-root-KjFju').click();
    cy.get('#standard-weight-helper-text-email-login').should('be.visible');
    cy.get('#standard-weight-helper-text-email-login').should('have.text', 'Email Address is required');
    cy.get('#standard-weight-helper-text-password-login').should('be.visible');
    cy.get('#standard-weight-helper-text-password-login').should('have.text', 'Password is required');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Validate email address', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('#outlined-adornment-email-login').clear();
    cy.get('#outlined-adornment-email-login').type('test@test');
    cy.get('.gPJmRt').click();
    cy.get('#standard-weight-helper-text-email-login').should('be.visible');
    cy.get('#standard-weight-helper-text-email-login').should('have.text', 'Email Address must be a valid email');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Something else', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('#outlined-adornment-email-login').clear();
    cy.get('#outlined-adornment-email-login').type('test@test.com');
    cy.get('#outlined-adornment-password-login').clear();
    cy.get('#outlined-adornment-password-login').type('testing');
    cy.get('form > .sc-bdvvtL > div > .MuiButtonBase-root-KjFju').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Email invalid', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('#outlined-adornment-email-login').click();
    cy.get('.gPJmRt').click();
    cy.get('#standard-weight-helper-text-email-login').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Changes to french', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.iLdyET > .MuiStack-root-fLuFxz > :nth-child(2)').click();
    cy.get('.sc-bdvvtL > .MuiTypography-root-bWKFam').click();
    cy.get('.sc-bdvvtL > .MuiTypography-root-bWKFam').should('have.text', 'Connectez-vous avec une adresse courriel');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('It works', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[style="transform: none;"] > .MuiButtonBase-root-KjFju').click();
    cy.get('#outlined-adornment-email-login').click();
    cy.get('.gPJmRt').click();
    cy.get('#standard-weight-helper-text-email-login').should('have.text', 'Email Address is required');
    /* ==== End Cypress Studio ==== */
  });
});
