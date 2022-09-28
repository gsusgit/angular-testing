import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card, CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  template: '<ab-card [card]="card" (actionClick)="onActionClick($event)" ></ab-card>',
})
class CardHostComponent {
  public card!: Card;
  constructor() {}
  public onActionClick(action: string) {}
}

fdescribe('GIVEN the CardComponent on a Host component', () => {
  let hostComponent: CardHostComponent;
  let hostFixture: ComponentFixture<CardHostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, CardHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(CardHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe('WHEN receives an input card', () => {
    beforeEach(() => {
      // Act
      hostComponent.card = { title: 'title', actions: [] };
      hostFixture.detectChanges();
    });
    it('THEN should display the caption', () => {
      // Assert
      const actual = hostFixture.nativeElement.querySelector('.card-header-title').textContent;
      const expected = hostComponent.card.title;
      expect(actual).toEqual(expected);
    });
  });
  describe('WHEN users clicks on a button', () => {
    beforeEach(() => {
      // Arrange
      spyOn(hostComponent, 'onActionClick');
      hostComponent.card = {
        title: 'title',
        actions: [{ caption: 'Click Me', command: 'clickCommand' }],
      };
      hostFixture.detectChanges();
      // Act
      hostFixture.nativeElement.querySelector('[data-testid="command-button"]').click();
    });
    it('THEN should emit the event', () => {
      // Assert
      expect(hostComponent.onActionClick).toHaveBeenCalled();
    });
  });
});
