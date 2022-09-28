import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Tag, TagComponent } from './tag.component';

fdescribe('GIVEN the TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  beforeEach(async () => {
    // arrange
    await TestBed.configureTestingModule({
      declarations: [TagComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    // arrange
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  describe('WHEN initialized without input', () => {
    beforeEach(() => {
      // act
      fixture.detectChanges();
    });
    it('THEN should not have content', () => {
      // assert
      const actual = fixture.nativeElement.querySelector('span');
      expect(actual).toBeNull();
    });
  });
  describe('WHEN loaded with tag info', () => {
    beforeEach(() => {
      // act
      const input: Tag = {
        caption: 'Test',
        value: 42,
        units: 'units',
      };
      component.tag = input;
      fixture.detectChanges();
    });
    it('THEN should show the caption', () => {
      const actual = fixture.nativeElement.querySelector('span')?.textContent;
      const expected = 'Test';
      expect(actual).toBe(expected);
    });
    it('THEN should show the value', () => {
      const actual = fixture.debugElement.query(By.css('label'))?.nativeElement.textContent;
      const expected = '42';
      expect(actual).toBe(expected);
    });
    it('THEN should show the units', () => {
      const actual = getTextContent(fixture, '.is-pulled-right');
      const expected = 'units';
      expect(actual).toContain(expected);
    });
  });
});

function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}
function getTextContent<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = findNativeEl(fixture, selector);
  if (nativeElement) {
    return nativeElement.textContent;
  }
  return null;
}
