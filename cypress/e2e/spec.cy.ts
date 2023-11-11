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

describe('Profile', () => {
  it('Menu opening and closing', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Profile').click();

    cy.contains('User profile');
    cy.contains('Edit profile');
    cy.contains('Settings');
    cy.contains('Log out');

    cy.get('[data-cy="close-menu"]').click();
    cy.contains('User profile').should('not.exist');
  });

  it('Profile editing', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Profile').click();
    cy.contains('Edit profile').click();

    cy.contains('Please, enter new profile information:');

    cy.get('input[placeholder="Enter your gender"]').type('FEMALE');
    cy.contains('Save').click();

    cy.contains('FEMALE').should('exist');

    cy.contains('Edit profile').click();

    cy.get('input[placeholder="Enter your gender"]').type('MALE');
    cy.contains('Save').click();

    cy.contains('FEMALE').should('not.exist');
    cy.contains('MALE').should('exist');
  });

  it('Settings opening', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Profile').click();
    cy.contains('Settings').click();

    cy.contains('Choose settings:').should('exist');
  });

  it('Logging out', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Profile').click();
    cy.contains('Log out').click();

    cy.contains('Profile').should('not.exist');
    cy.contains('Sign up').should('exist');
    cy.contains('Sign in').should('exist');
  });
});

describe('Bookings page', () => {
  it('Render', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.contains('Bookings').click();

    cy.contains('Bookings').should('have.css', 'color', 'rgb(217, 134, 57)');
    cy.contains('Home').should('have.css', 'color', 'rgb(255, 255, 255)');
  });
});

describe('Film page', () => {
  it('Render', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.get('img[alt="poster"]').click();

    cy.url().should('include', '/film');
    cy.contains('Move to the next movie');
    cy.contains('Release year');
    cy.contains('Country');
    cy.contains('Genre');
    cy.contains('Author');
    cy.contains('Actors');
    cy.get('img[alt="poster"]').should('exist');
    cy.contains('Watch trailer online!');

    cy.get('[data-cy="play-preview"]').click();
    cy.get('video').should('exist');
    cy.get('[data-cy="close"]').click();

    cy.contains('Review').should('exist');
    cy.contains('read more');
  });

  it('Next button click', () => {
    cy.visit('/signin');

    cy.get('input[placeholder="Enter your email"]').type('stets119@gmail.com');
    cy.get('input[placeholder="Enter strong password"]').type('30102002');
    cy.contains('Send').click();

    cy.get('img[alt="poster"]').click();

    cy.url().then((url) => {
      cy.contains('Move to the next movie').click({ force: true });

      cy.url().should('not.eq', url);
    });
  });
});
