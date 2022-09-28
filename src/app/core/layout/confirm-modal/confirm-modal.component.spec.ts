import { ConfirmStore } from '@ab/global/confirm.store';
import { ConfirmModalComponent } from './confirm-modal.component';

fdescribe('GIVEN: a ConfirmModalComponent with a ConfirmStore', () => {
  let sut: ConfirmModalComponent;
  let doc: ConfirmStore;
  beforeEach(() => {
    // Arrange
    doc = jasmine.createSpyObj('ConfirmStore', ['confirm', 'getState$']); // doble del ConfirmStore
    sut = new ConfirmModalComponent(doc);
  });
  describe('WHEN call the "onConfirmClick" method', () => {
    beforeEach(() => {
      // Act
      sut.onConfirmClick();
    });
    it('THEN should call store.confirm method', () => {
      // Assert
      expect(doc.confirm).toHaveBeenCalled();
    });
  });
});
