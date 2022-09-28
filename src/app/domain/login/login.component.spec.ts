import { SecurityService } from '@ab/global/security.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

fdescribe('GIVEN the LoginComponent form', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  type loginMethod = { loginWithCredentials: void };
  let securityServiceSpy: jasmine.SpyObj<loginMethod>;

  // input data
  const inputEmail = 'admin@world.org';
  const inputPassword = 'S3cr3t';
  const inputBadEmail = 'not an email';
  const inputEmpty = '';
  // selectors
  const emailSelector = 'input[name="email"]';
  const passwordSelector = 'input[name="password"]';
  const submitSelector = 'button[type="submit"]';
  const resetSelector = 'button[type="reset"]';

  beforeEach(async () => {
    // Arrange
    securityServiceSpy = jasmine.createSpyObj<loginMethod>('SecurityService', {
      loginWithCredentials: () => {},
    });
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: SecurityService, useValue: securityServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('WHEN starts with empty fields', () => {
    beforeEach(() => {
      // Act
    });
    it('THEN should not allow submit', () => {
      // Assert
      const submitButton = findNativeEl(fixture, submitSelector);
      const actual = submitButton?.getAttribute('disabled');
      expect(actual).toBe('');
    });
  });
  describe('WHEN user fills correctly the fields', () => {
    beforeEach(() => {
      // Act
      setValue(fixture, emailSelector, inputEmail);
      setValue(fixture, passwordSelector, inputPassword);
      fixture.detectChanges();
    });
    it('THEN should allow submit', () => {
      // Assert
      const submitButton = findNativeEl(fixture, submitSelector);
      const actual = submitButton?.getAttribute('disabled');
      expect(actual).toBeNull();
    });
  });
  describe('WHEN user fills incorrectly the fields', () => {
    beforeEach(() => {
      // Act
      setValue(fixture, emailSelector, inputBadEmail);
      setValue(fixture, passwordSelector, inputEmpty);
      fixture.detectChanges();
    });
    it('THEN should not allow submit', () => {
      // Assert
      const submitButton = findNativeEl(fixture, submitSelector);
      const actual = submitButton?.getAttribute('disabled');
      expect(actual).toBe('');
    });
    it('THEN should display the errors', () => {
      // Assert
      const errorMessages = queryAll(fixture, 'p.help');
      const actual = errorMessages.length;
      expect(actual).toBe(2);
    });
  });
  describe('WHEN user resets the form after fill it', () => {
    beforeEach(() => {
      // Act
      setValue(fixture, emailSelector, inputBadEmail);
      setValue(fixture, passwordSelector, inputEmpty);
      const resetButton = findNativeEl(fixture, resetSelector);
      resetButton?.click();
      fixture.detectChanges();
    });
    it('THEN should clear the form value', () => {
      // Assert
      const actual = component.form.value;
      const expected = { email: null, password: null };
      expect(actual).toEqual(expected);
    });
  });
  describe('WHEN user submits the form after fill it', () => {
    beforeEach(() => {
      // Act
      setValue(fixture, emailSelector, inputEmail);
      setValue(fixture, passwordSelector, inputPassword);
      const form = findNativeEl(fixture, 'form') as HTMLFormElement;
      form?.dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    });
    it('THEN should call the loginWithCredentials method', () => {
      // Assert
      const expected = { email: inputEmail, password: inputPassword };
      expect(securityServiceSpy.loginWithCredentials).toHaveBeenCalledOnceWith(expected);
    });
  });
});

function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}

function setValue<T>(fixture: ComponentFixture<T>, selector: string, value: string): void {
  const nativeElement = findNativeEl(fixture, selector) as HTMLInputElement;
  if (nativeElement) {
    nativeElement.value = value;
    nativeElement.dispatchEvent(new Event('input'));
  }
}
function queryAll<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
  const nativeElement = fixture.debugElement.queryAll(By.css(selector));
  return nativeElement;
}
