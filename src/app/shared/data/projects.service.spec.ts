import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PROJECTS } from 'tests/assets/projects';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('GIVEN the ProjectsService isolated from remote server', () => {
  let service: ProjectsService;
  let controller: HttpTestingController;
  let inputBaseUrl: string;
  beforeEach(() => {
    // Arrange
    inputBaseUrl = 'http://localhost:3000/projects/';
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(ProjectsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('WHEN getProjects$ is called', () => {
    beforeEach(() => {
      // Act
      service.getProjects$().subscribe();
    });
    it('THEN it should call the right url', () => {
      // Assert
      const expected = inputBaseUrl;
      controller.expectOne(expected);
    });
  });
  describe('WHEN getProjectById$ is called', () => {
    let actual: Project | undefined;
    let testRequest: TestRequest;
    beforeEach(() => {
      const input = 'rule_the_world';
      service.getProjectById$(input).subscribe(project => (actual = project));
      testRequest = controller.expectOne(inputBaseUrl + input);
      testRequest.flush({ data: PROJECTS[0] });
    });
    it('THEN it should return a project with correct id', () => {
      const expected = 'rule_the_world';
      // @ts-ignore
      expect(actual.data.id).toBe(expected);
    });
  });
  describe('WHEN postProject$ is called', () => {
    let actual: Project | undefined;
    let testRequest: TestRequest;
    beforeEach(() => {
      const input = { name: 'Verify all the things' } as Project;
      service.postProject$(input).subscribe(project => (actual = project));
      const expectedUrl = inputBaseUrl;
      testRequest = controller.expectOne(expectedUrl);
      testRequest.flush({ data: { id: 'verify_all_the_things' } });
    });
    it('THEN it should emit the saved project', () => {
      expect(testRequest.request.method).toBe('POST');
      const expected = 'verify_all_the_things';
      // @ts-ignore
      expect(actual.data.id).toBe(expected);
    });
  });
  describe('WHEN putProject$ is called', () => {
    let actual: Project | undefined;
    let testRequest: TestRequest;
    beforeEach(() => {
      const input = { id: 'verify_all_the_things', name: 'Verify all the things' } as Project;
      service.putProject$(input).subscribe(project => {
        actual = project;
      });
      const expectedUrl = inputBaseUrl + input.id;
      testRequest = controller.expectOne(expectedUrl);
      controller.verify();
    });
    it('THEN it should send the input project as a body', () => {
      expect(testRequest.request.body).toEqual({
        id: 'verify_all_the_things',
        name: 'Verify all the things',
      });
    });
  });
  describe('WHEN deleteProject$ is called', () => {
    beforeEach(() => {
      const input = 'verify_all_the_things';
      service.deleteProject$(input).subscribe();
    });
    it('THEN it should call with DELETE HTTP method', () => {
      const expectedUrl = inputBaseUrl + 'verify_all_the_things';
      controller.expectOne(request => request.url === expectedUrl && request.method === 'DELETE');
    });
  });
});
