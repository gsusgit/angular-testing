import { UsersService } from '@ab/data/users.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TOKEN } from 'tests/assets/token';
import { NotificationStore } from './notification.store';
import { SecurityService } from './security.service';
import { SecurityStore } from './security.store';

describe('SecurityService', () => {
  let service: SecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
fdescribe('GIVEN the SecurityService isolated', () => {
  let service: SecurityService;
  let spyRouter: Router;
  let fakeSecurityStore: SecurityStore;
  let fakeUsersService: UsersService;
  let inputUnauthorized: boolean;
  let inputUserId: string | undefined;
  beforeEach(() => {
    inputUserId = 'world_admin';
    spyRouter = jasmine.createSpyObj('Router', {
      navigate: jasmine.createSpy('navigate'),
    });
    fakeUsersService = {
      getUserById$: (x: string) => of(x),
    } as unknown as UsersService;
  });
  describe('WHEN security says unauthorized', () => {
    beforeEach(() => {
      inputUnauthorized = true;
      fakeSecurityStore = {
        select$: () => of(inputUnauthorized),
      } as unknown as SecurityStore;
      TestBed.configureTestingModule({
        providers: [
          { provide: UsersService, useValue: fakeUsersService },
          { provide: SecurityStore, useValue: fakeSecurityStore },
          { provide: NotificationStore, useValue: {} },
          { provide: Router, useValue: spyRouter },
        ],
      });
      service = TestBed.inject(SecurityService);
    });
    it('THEN should navigate to login', () => {
      expect(spyRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
  describe('WHEN security emits a userId', () => {
    beforeEach(() => {
      fakeSecurityStore = {
        select$: () => of(inputUserId),
      } as unknown as SecurityStore;
      TestBed.configureTestingModule({
        providers: [
          { provide: UsersService, useValue: fakeUsersService },
          { provide: SecurityStore, useValue: fakeSecurityStore },
          { provide: NotificationStore, useValue: {} },
          { provide: Router, useValue: spyRouter },
        ],
      });
      service = TestBed.inject(SecurityService);
    });
    it('THEN user$ should receive something', () => {
      service.user$.subscribe(actual => expect(actual).toBeDefined());
    });
  });
  describe('WHEN call loginWithCredentials', () => {
    const inputToken = TOKEN;
    let spySecurityStore: jasmine.SpyObj<SecurityStore>;
    let spyUsers: jasmine.SpyObj<UsersService>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let spyOnGetUserFromToken: jasmine.Spy<any>;
    beforeEach(() => {
      spySecurityStore = jasmine.createSpyObj('SecurityStore', {
        select$: of(inputUserId),
        getUserFromToken: inputUserId,
        setLoggedIn: undefined,
      });
      spyUsers = jasmine.createSpyObj('UsersService', {
        getUserById$: of(''),
        getTokenByCredentials$: of(inputToken),
      });
      TestBed.configureTestingModule({
        providers: [
          { provide: UsersService, useValue: spyUsers },
          { provide: SecurityStore, useValue: spySecurityStore },
          { provide: NotificationStore, useValue: { showNotification: () => {} } },
          { provide: Router, useValue: spyRouter },
        ],
      });
      service = TestBed.inject(SecurityService);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOnGetUserFromToken = spyOn<any>(service, 'getUserFromToken');
      service.loginWithCredentials({ email: '', password: '' });
    });
    it('THEN users.getTokenByCredentials$ should be called', () => {
      expect(spyUsers.getTokenByCredentials$).toHaveBeenCalled();
    });
    it('AND THEN should get the user from the token', () => {
      expect(spyOnGetUserFromToken).toHaveBeenCalledOnceWith(inputToken);
    });
    it('AND THEN should sets the user as logged in', () => {
      expect(spySecurityStore.setLoggedIn).toHaveBeenCalled();
    });
  });
});
