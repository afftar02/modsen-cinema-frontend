describe('Home Page', () => {
  it('Buttons and links', () => {
    cy.visit('/');

    cy.contains('Home').should('have.css', 'color', 'rgb(217, 134, 57)');
    cy.contains('Bookings').should('have.css', 'color', 'rgb(255, 255, 255)');

    cy.contains('Bookings').click();
    cy.url().should('include', '/signin');
    cy.get('[data-cy="close"]').click();

    cy.contains('Sign up').click();
    cy.url().should('include', '/signup');
    cy.get('[data-cy="close"]').click();

    cy.contains('Sign in').click();
    cy.url().should('include', '/signin');
    cy.get('[data-cy="close"]').click();

    cy.get('[data-cy="settings"]').click();
    cy.contains('Choose settings:');
    cy.get('[data-cy="close"]').click();

    cy.get('[data-cy="play-preview"]').click();
    cy.get('video').should('exist');
    cy.get('[data-cy="close"]').click();
  });
});
// cy.get('.action-email').type('fake@email.com');
//
// cy.get('.action-email').should('have.value', 'fake@email.com');
