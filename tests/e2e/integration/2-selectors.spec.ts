describe('The Angular Budget homepage', () => {
  beforeEach(() => {
    cy.visit('/'); // uses baseUrl set in cypress.json
  });
  it('should display the application name', () => {
    cy.contains('Angular Budget'); // queries and asserts for elements with the expected text
  });
  it('should have the app name on the title', () => {
    cy.title() // queries for the title of the page
      .should('contain', 'Angular Budget'); // and asserts that it contains the expected text
  });
  it('should display the app name on an anchor', () => {
    // A selector based on the element, may be too general
    cy.get('a').should('contain', 'Angular Budget');
  });
  it('should display the app name with a given style class', () => {
    // A selector based on the class, may be too general or not available
    cy.get('.navbar-brand').should('contain', 'Angular Budget');
  });
  it('should display the app name on a precise identifier', () => {
    // A selector based on the id, may be not available
    cy.get('#app-name').should('contain', 'Angular Budget');
  });
  it('should display the app name on something acting as banner', () => {
    // A selector based on a useful attribute: role, name, placeholder etc.
    cy.get('[role=banner]').should('contain', 'Angular Budget');
  });
  it('should display the app name on a precise node', () => {
    // A selector precise, but code intrusive
    cy.get('[data-test-id="app-name"]').should('contain', 'Angular Budget');
  });
});

// ✅ Considere use a more readable tests suite
// Applying the Given, When, Then pattern
// Inspired from Behavior Driven Development
describe('GIVEN the Angular Budget app', () => {
  context('WHEN I visit the home page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('THEN should have a correct title', () => {
      cy.title().should('contain', 'Angular Budget');
    });
    it('THEN should display the app name on a styled anchor', () => {
      cy.get('.navbar-brand > a').should('contain', 'Angular Budget');
    });
  });
});

// ❌ Avoid test jargon
// sut, input, actual, expected
// Too formal for cypress
