import { UsersService } from '@ab/data/users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SecurityStore } from './security.store';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

fdescribe('GIVEN the TokenInterceptor with a fake security service', () => {
  let service: UsersService;
  let controller: HttpTestingController;
  let testRequest: TestRequest;
  const inputBaseUrl = 'https://proton-angular-builders.herokuapp.com/v1/users/';
  beforeEach(() => {
    // Arrange
    const fakeSecurityStore = { getToken: () => 'token' };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: SecurityStore, useValue: fakeSecurityStore },
      ],
    });
    service = TestBed.inject(UsersService);
    controller = TestBed.inject(HttpTestingController);
  });

  describe('WHEN calling getUserById$', () => {
    beforeEach(() => {
      // Act
      service.getUserById$('').subscribe();
      testRequest = controller.expectOne(inputBaseUrl);
    });

    it('THEN should send the token', () => {
      // Assert
      const expected = 'Bearer token';
      const actual = testRequest.request.headers.get('Authorization');
      expect(actual).toBe(expected);
    });
  });
});
