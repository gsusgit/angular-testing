/*
 * @alias
 */

import { NEW_PROJECT } from 'tests/assets/new-project';
import { ProjectsAddPage } from '../support/pages/projects-add.page';

describe('GIVEN the "about" link on the "home" page', () => {
  // a weird Cypress type
  // let linkElement: Cypress.Chainable;
  beforeEach(() => {
    // Arrange
    cy.visit('/'); // visit home page
    // ❌ This way is not recommended
    // linkElement = cy.get('a[href$=about]')
    // ✅ Instead, we can save the query for later use
    cy.get('a[href$=about]').as('aboutLink');
  });
  context('WHEN I click "about" link on the "home" page', () => {
    beforeEach(() => {
      // Act
      // For sure, we could chain a command to the element
      // linkElement.click();
      // But this way is more readable
      cy.get('@aboutLink') // executes the query with @alias
        .click(); // Acts on the selected element
    });
    it('THEN should display "About" as the title ', () => {
      // Assert
      cy.get('.title').should('contain', 'About');
    });
  });
});

/*
 * Page Object
 */

describe('GIVEN the "Add new project" page', () => {
  const projectsAddPage: ProjectsAddPage = new ProjectsAddPage();
  beforeEach(() => {
    // Arrange
    projectsAddPage.visit();
  });
  context('WHEN fill the form and click on submit', () => {
    beforeEach(() => {
      // Act
      projectsAddPage.addProject(NEW_PROJECT);
    });
    it('THEN holy smoke, we need a server!', () => {
      // Assert
      projectsAddPage.shoulShowServerErrorMessage();
    });
  });
});

describe('The "Add new project" page', () => {
  const projectsAddPage: ProjectsAddPage = new ProjectsAddPage();
  it('Should do a lot!', () => {
    projectsAddPage.visit().addProject(NEW_PROJECT).shoulShowServerErrorMessage();
  });
});

/*
 * Try to use the AAA pattern
 */

describe('GIVEN the "About" page', () => {
  beforeEach(() => {
    // Arrange
    // optional configuration from env variables
    cy.visit('/about', {
      failOnStatusCode: Cypress.env('failOnStatusCode'), // ng on gitHubPages 404
    });
  });
  context('WHEN look for "source code" link', () => {
    it('THEN should display a "source code" link to GitHub', () => {
      // Act and Assert
      // the commands can be chained
      cy.contains('source code') // a element with text 'source code'
        .should('have.attr', 'href') // the element must have an attribute 'href'
        .and('equal', 'https://github.com/angularbuilders/angular-budget'); // assertion
    });
  });
  context('WHEN look for "pre" element', () => {
    beforeEach(() => {
      // Act
      cy.get('pre').as('pre');
    });
    it('THEN should have a specific color ', () => {
      // Assert
      cy.get('@pre').should('have.css', 'color', 'rgb(59, 66, 82)');
    });
  });
});
