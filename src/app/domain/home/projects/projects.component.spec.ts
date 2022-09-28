import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PROJECTS_VIEWS } from 'tests/assets/projects-views';
import { ProjectsComponent } from './projects.component';

fdescribe('GIVEN ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent, FakeSatusPipe, FakePendingPipe, FakeCompletedPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // avoid fake creation
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN there are no projects', () => {
    beforeEach(() => {
      // Act
      component.projects = [];
      fixture.detectChanges();
    });
    it('THEN should display no data yet component', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-no-data-yet');
      expect(actual).toBeTruthy();
    });
  });
  describe('WHEN there are 2 projects', () => {
    beforeEach(() => {
      // Act
      component.projects = PROJECTS_VIEWS;
      // fixture.detectChanges();
      const cdr = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
      cdr.detectChanges();
    });
    it('THEN should not display the no_data_yet component', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(fixture, 'ab-no-data-yet');
      expect(actual).toBeFalsy();
    });
    it('THEN should display the projects count on the title', () => {
      // Assert
      const actual: string | null = getTextContent(fixture, '.title');
      const expected = '2';
      expect(actual).toContain(expected);
    });
    it('THEN should render the 2 projects in 2 cards', () => {
      // Assert
      const actual = queryAll(fixture, 'ab-card').length;
      const expected = 2;
      expect(actual).toBe(expected);
    });
  });
});

function queryAll<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
  const nativeElement = fixture.debugElement.queryAll(By.css(selector));
  return nativeElement;
}

function getTextContent<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = findNativeEl(fixture, selector);
  return nativeElement ? nativeElement.textContent : null;
}

function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}

class FakePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
  constructor() {}
}

@Pipe({
  name: 'projectStatus',
})
class FakeSatusPipe extends FakePipe {}
@Pipe({
  name: 'pending',
})
class FakePendingPipe extends FakePipe {}
@Pipe({
  name: 'completed',
})
class FakeCompletedPipe extends FakePipe {}
