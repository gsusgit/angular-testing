describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/'); // act
    cy.contains('Angular Budget'); // act assert
    cy.contains('Project Budget dashboard');
    cy.get('a') // act
      .should('contain', 'Angular Budget'); // assert
  });
});
