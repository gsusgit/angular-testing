export class ProjectsAddPage {
  public visit(): ProjectsAddPage {
    cy.visit('/projects/add', {
      failOnStatusCode: Cypress.env('failOnStatusCode'),
    });
    return this;
  }

  public addProject(newProject: Record<string, unknown>): ProjectsAddPage {
    this.fillForm(newProject);
    cy.get('button[type=submit]').click();
    return this;
  }

  public shoulShowServerErrorMessage(): ProjectsAddPage {
    cy.get('aside').should('be.visible');
    return this;
  }

  private fillForm(newProject: Record<string, unknown>): ProjectsAddPage {
    this.fillControl('input[name=name]', newProject['name'])
      .fillControl('input[name=budget]', newProject['budget'])
      .fillControl('input[name=startDate]', newProject['startDate'])
      .fillControl('textarea[name=description]', newProject['description']);

    return this;
  }

  private fillControl(controlName: string, value: unknown): ProjectsAddPage {
    cy.get(controlName)
      .clear()
      .type(value as string);
    return this;
  }
}
