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

describe('Settings', () => {
  it('Language changing', () => {
    cy.visit('/');

    cy.get('[data-cy="settings"]').click();

    cy.contains('Russian').click();
    cy.contains('Apply').click();

    cy.contains('Главная');
    cy.contains('Билеты');
    cy.contains('Регистрация');
    cy.contains('Вход');
  });

  it('Theme changing', () => {
    cy.visit('/');

    cy.get('[data-cy="settings"]').click();

    cy.contains('Light').click();
    cy.contains('Apply').click();

    cy.get('[data-cy="theme-wrapper"]').should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
  });
});

describe('Auth forms', () => {
  it('System sign in', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Profile');
  });

  it('Go to sign up from sign in page', () => {
    cy.visit('/signin');

    cy.contains('Sign up please.').click();

    cy.url().should('include', '/signup');
  });

  it('Go to sign in from sign up page', () => {
    cy.visit('/signup');

    cy.contains('Login please.').click();

    cy.url().should('include', '/signin');
  });
});
