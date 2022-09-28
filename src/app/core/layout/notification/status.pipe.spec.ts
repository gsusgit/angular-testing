import { NotificationStatus, StatusClass } from '@ab/util/valueToCSS';
import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });
});

fdescribe('GIVEN an implemented PipeTransform', () => {
  let sut: StatusPipe;

  beforeEach(() => {
    sut = new StatusPipe();
  });

  describe('WHEN the pipe is called with a status of "info" ', () => {
    let actual: StatusClass;

    beforeEach(() => {
      const input: NotificationStatus = 'info';
      actual = sut.transform(input);
    });

    it('THEN the result is "is-info"', () => {
      const expected: StatusClass = 'is-info';
      expect(actual).toEqual(expected);
    });
  });

  it('WHEN the pipe is called with a status of "info" THEN the result is "is-info"', () => {
    const input: NotificationStatus = 'info';
    const actual: StatusClass = sut.transform(input);
    const expected: StatusClass = 'is-info';
    expect(actual).toEqual(expected);
  });
});

fdescribe('GIVEN: a Pipe using an external "transformer"', () => {
  let sut: StatusPipe;
  let spy: jasmine.Spy;

  beforeEach(() => {
    // Arrange
    sut = new StatusPipe();
    spy = spyOn(sut, 'transformer');
  });
  describe('WHEN the pipe is called with a status of "info" ', () => {
    beforeEach(() => {
      // Act
      const input: NotificationStatus = 'info';
      sut.transform(input);
    });
    it('THEN should call the "transformer" with status "info" ', () => {
      // Assert
      const expected = 'info';
      expect(spy).toHaveBeenCalledOnceWith(expected);
    });
  });
  describe('WHEN the the transformer returns "is-info" ', () => {
    beforeEach(() => {
      spy.and.returnValue('is-info');
    });
    it('THEN should returns "is-info"', () => {
      const input: NotificationStatus = 'danger';
      const actual: StatusClass = sut.transform(input);
      const expected: StatusClass = 'is-info';
      expect(actual).toEqual(expected);
    });
  });
});
