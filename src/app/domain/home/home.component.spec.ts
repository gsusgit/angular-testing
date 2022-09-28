import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PROJECTS_VIEWS } from 'tests/assets/projects-views';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { ProjectView } from './models/project-view.model';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spyHomeService: HomeService;
  beforeEach(async () => {
    spyHomeService = jasmine.createSpyObj<HomeService>('HomeService', {
      loadProjectViews: undefined,
      deleteProject: undefined,
    });
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: HomeService, useValue: spyHomeService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call "loadProjectViews" on init', () => {
    expect(spyHomeService.loadProjectViews).toHaveBeenCalled();
  });
  it('should call "deleteProject" on delete', () => {
    const input = '1';
    component.onDelete(input);
    const expected = '1';
    expect(spyHomeService.deleteProject).toHaveBeenCalledWith(expected);
  });
});

function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}
function getTextContent<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = findNativeEl(fixture, selector);
  return nativeElement ? nativeElement.textContent : null;
}

fdescribe('GIVEN the Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: HomeService, useValue: { loadProjectViews: () => {} } }],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  describe('WHEN starts', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('SHOULD display the title ?', () => {
      // Avoid white box testing (is an integration test)
      // const actual = getTextContent(fixture, '.title');
    });
    it('SHOULD pass the title to the page component', () => {
      const pageEl: HTMLElement | null = findNativeEl(fixture, 'ab-page');
      const actual = pageEl?.getAttribute('pageTitle');
      const expected = 'Project Budget dashboard';
      expect(actual).toBe(expected);
    });
    it('SHOULD include the ab-loading component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-loading');
      expect(actual).toBeTruthy();
    });
    it('SHOULD not include the ab-error component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-error');
      expect(actual).toBeFalsy();
    });
    it('SHOULD not include the ab-projects component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-projects');
      expect(actual).toBeFalsy();
    });
  });
});

class FakeHomeServiceWithData {
  public projectViews$!: Observable<ProjectView[]>;
  public loading$ = new BehaviorSubject(false);
  public error$ = new BehaviorSubject(false);
  public loadProjectViews() {
    this.loading$.next(false);
    this.error$.next(false);
    this.projectViews$ = of(PROJECTS_VIEWS);
  }
  public deleteProject() {}
}
class FakeHomeServiceWithError {
  public projectViews$!: Observable<ProjectView[]>;
  public loading$ = new BehaviorSubject(false);
  public error$ = new BehaviorSubject(false);
  public loadProjectViews() {
    this.loading$.next(false);
    this.error$.next(true);
  }
  public deleteProject() {}
}

fdescribe('GIVEN the Home component with a fake Service', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  describe('WHEN starts with projects', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [{ provide: HomeService, useClass: FakeHomeServiceWithData }],
        declarations: [HomeComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('SHOULD not include the ab-loading component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-loading');
      expect(actual).toBeFalsy();
    });
    it('SHOULD not include the ab-error component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-error');
      expect(actual).toBeFalsy();
    });
    it('SHOULD include the ab-projects component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-projects');
      expect(actual).toBeTruthy();
    });
  });
  describe('WHEN starts with error', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [{ provide: HomeService, useClass: FakeHomeServiceWithError }],
        declarations: [HomeComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('SHOULD not include the ab-loading component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-loading');
      expect(actual).toBeFalsy();
    });
    it('SHOULD include the ab-error component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-error');
      expect(actual).toBeTruthy();
    });
    it('SHOULD not include the ab-projects component', () => {
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-projects');
      expect(actual).toBeFalsy();
    });
  });
});
