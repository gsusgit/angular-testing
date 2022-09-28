import { NEW_PROJECT } from 'tests/assets/new-project';
import { PROJECTS } from 'tests/assets/projects';
import { ProjectsAddPage } from '../support/pages/projects-add.page';

describe('GIVEN the dashboard on the "home" page', () => {
  beforeEach(() => {});
  context('WHEN get projects loaded from the API', () => {
    beforeEach(() => {
      // Arrange
      // intercepts the request to get projects and responds with a predefined data
      cy.intercept(
        'GET', // method
        Cypress.env('apiUrl') + 'projects', // url
        { body: { data: PROJECTS } } // static response
      );
      // Act
      cy.visit('/');
    });
    it('THEN should display those projects', () => {
      // Assert
      cy.get('ab-projects ab-card').should('have.length', PROJECTS.length);
    });
  });
});

describe('GIVEN the "Add new project" page, connected to a teapot', () => {
  const projectsAddPage: ProjectsAddPage = new ProjectsAddPage();
  beforeEach(() => {
    // Arrange
    projectsAddPage.visit();
    // intercept of post request and responds with an error
    cy.intercept(
      'POST', // method
      Cypress.env('apiUrl') + 'projects', // url
      {
        statusCode: 418, // forced error response (teapot)
        body: { data: {} }, // empty response
      }
    ).as('postProject'); // alias for the request
  });
  context('WHEN fill the form and submit to the teapot', () => {
    beforeEach(() => {
      // Act
      projectsAddPage.addProject(NEW_PROJECT);
    });
    it('THEN data should be posted ', () => {
      // Assert
      cy.wait('@postProject') // wait for the request to be done and assert with a function
        .then(intercepted => {
          // check that the project was posted
          expect(intercepted.request.body.name) // assert using the intercepted request
            .to.deep.eq(NEW_PROJECT.name); // check the request body
        });
    });
  });
});
