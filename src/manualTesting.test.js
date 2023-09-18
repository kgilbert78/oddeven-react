import { testIsFoolsDay } from "./manualTesting";

describe('test fools day function in manualTesting.js', () => {
  it('should return false on even final days of the month', () => {
    const mockDateObject = new Date('2023-09-30T11:42:16.652Z');
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = testIsFoolsDay();
    spy.mockRestore();
    expect(testFoolsDay).toEqual(false);
  })
})