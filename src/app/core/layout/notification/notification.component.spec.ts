import { NotificationStore } from '@ab/global/notification.store';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificationComponent } from './notification.component';

fdescribe('GIVEN the NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  describe('WHEN the store sends a notification', () => {
    beforeEach(async () => {
      // Arrange
      await TestBed.configureTestingModule({
        declarations: [NotificationComponent, FakeSatusPipe],
        providers: [
          {
            provide: NotificationStore,
            useValue: {
              getState$: () =>
                of({
                  caption: 'test',
                  status: 'success',
                }),
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NotificationComponent);
      component = fixture.componentInstance;
    });

    it('THEN should display the notification', () => {
      // Act
      fixture.detectChanges();
      const actual = getTextContent(fixture, '#caption');
      // Assert
      const expected = 'test';
      expect(actual).toEqual(expected);
    });

    it('AND THEN should call the close method after 3 seconds', fakeAsync(() => {
      // Arrange
      spyOn(component, 'close');
      // Act
      fixture.detectChanges();
      // Assert
      expect(component.close).not.toHaveBeenCalled();
      tick(10000);
      expect(component.close).toHaveBeenCalled();
    }));
  });
});

@Pipe({
  name: 'status',
})
class FakeSatusPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
  constructor() {}
}
export function findNativeEl<T>(
  fixture: ComponentFixture<T>,
  selector: string
): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}
export function getTextContent<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = findNativeEl(fixture, selector);
  if (nativeElement) {
    return nativeElement.textContent;
  }
  return null;
}

fdescribe('GIVEN the NotificationComponent with a notification', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  beforeEach(async () => {
    // Arrange
    const inputNotification = {
      caption: 'test',
      status: 'success',
    };
    const fakeNotificationStore: NotificationStore = {
      getState$: () => of(inputNotification),
    } as unknown as NotificationStore;

    await TestBed.configureTestingModule({
      declarations: [NotificationComponent, FakeSatusPipe],
      providers: [{ provide: NotificationStore, useValue: fakeNotificationStore }],
    }).compileComponents();
  });
  describe('WHEN the user clicks close', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NotificationComponent);
      component = fixture.componentInstance;
      spyOn(component, 'close');
      fixture.detectChanges();
      // Act
      findNativeEl(fixture, '#close')?.click();
    });
    it('THEN should call the close method  ', () => {
      // Assert
      expect(component.close).toHaveBeenCalled();
    });
  });
});
