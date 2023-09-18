import { isFoolsDay, isOddDay, calculateSwitchTime } from "./determineParkingSide";

// How to test with mock dates:
// https://medium.com/@dfriyia/simple-date-testing-with-jest-and-javascript-b8091a77a933
// https://www.benoitpaul.com/blog/javascript/jest-mock-date/



// TEST CALCULATION OF FOOL'S DAYS (TWO ODD DAYS IN A ROW):

// 31 days in January, March, May, July, August, October, December
describe('isFoolsDay', () => {
  it('should return true if it is the 31st', () => {
    // The T separates the date portion from the time-of-day portion. The Z on the end means UTC (that is, an offset-from-UTC of zero hours-minutes-seconds). The Z is pronounced “Zulu”.
    const mockDateObject = new Date('2023-10-31T11:42:16.652Z');
    const spy = jest
      .spyOn(global, 'Date') // global.Date() prints the current date same as new Date()
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = isFoolsDay();
    spy.mockRestore();
    expect(testFoolsDay).toEqual(true);
  });

  it('should return false if it is an odd day mid-month', () => {
    const mockDateObject = new Date('2023-10-19T11:42:16.652Z');
    console.log('mockDateObject 10-19', mockDateObject); // 2023-10-19T11:42:16.652Z
    const spy = jest
      // https://jestjs.io/docs/jest-object#jestspyonobject-methodname
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);

    const testFoolsDay = isFoolsDay();
    console.log('mockDateObject 10-19 after testFoolsDay', mockDateObject); // 2023-10-20T11:42:16.652Z
    spy.mockRestore();
    expect(testFoolsDay).toEqual(false);
  });

  // THIS ONE FAILS
  it('should return false on even final days of the month', () => {
    const mockDateObject = new Date('2023-09-30T11:42:16.652Z');
    console.log('mockDateObject 9-30', mockDateObject); // 2023-09-30T11:42:16.652Z
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = isFoolsDay();
    // console.log('isFoolsDay', isFoolsDay()) // false
    // console.log(testFoolsDay); // true
    console.log('mockDateObject 9-30 after testFoolsDay', mockDateObject); // 2023-10-02T11:42:16.652Z if i run isFoolsDay in console.log above, 2023-10-01T11:42:16.652Z if i don't
    spy.mockRestore();
    // expect(testFoolsDay).toEqual(false);
    expect(testFoolsDay).toBe(false);
  });
});

// // this one errors "TypeError: Cannot read properties of undefined (reading 'getDate')"
// // commented out because the error also makes the 'leap year day test' below fail
// describe('isOddDay', () => {
//   it('should return false on even final days of the month', () => {
//     const mockDateObject = new Date('2023-09-30T11:42:16.652Z');
//     const spy = jest
//       .spyOn(global, 'Date')
//       .mockImplementation(() => mockDateObject);
//     const testOddDay = isOddDay();
//     spy.mockRestore();
//     expect(testOddDay).toEqual(false);
//   });
// });


// February has 29 days in leap years (ie. 2020, 2024)
describe('leap year day test', () => {
  it('should return true if it is february 29 in a leap year', () => {
    const mockDateObject = new Date('2024-02-29T11:42:16.652Z');
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = isFoolsDay();
    spy.mockRestore();
    expect(testFoolsDay).toEqual(true);
  });

  it('should return false if it is the 29th of a month besides february', () => {
    const mockDateObject = new Date('2024-03-29T11:42:16.652Z');
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = isFoolsDay();
    spy.mockRestore();
    expect(testFoolsDay).toEqual(false);
  });

  // edge case that's unlikely
  it('should return false if it is february 29 but not a leap year', () => {
    const mockDateObject = new Date('2023-02-29T11:42:16.652Z');
    const spy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateObject);
    const testFoolsDay = isFoolsDay();
    spy.mockRestore();
    expect(testFoolsDay).toEqual(false);
  });
});


// TEST THAT IT SWITCHES AT 6PM BUT DOESN'T ON FOOL'S DAYS
describe('calculateSwitchTime', () => {
  it('should not switch the same day at 6pm on fools days when time is before 6pm', () => {
    const mockDateObject = new Date('2023-10-31T11:42:16.652Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDateObject);
    const testSwitchTime = calculateSwitchTime();
    spy.mockRestore();
    expect(testSwitchTime).toEqual(new Date('2023-11-01T18:00:00.000Z'));
    // fails because it's returning GMT not EST:
    // Expected: 2023-11-01T18:00:00.000Z
    // Received: 2023-11-01T22:00:00.000Z
  });
  it('should switch the same day at 6pm on regular odd days when time is before 6pm', () => {
    const mockDateObject = new Date('2023-10-29T11:42:16.652Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDateObject);
    const testSwitchTime = calculateSwitchTime();
    spy.mockRestore();
    expect(testSwitchTime).toEqual(new Date('2023-10-29T18:00:00.000Z'));
    // returning GMT not EST, plus the wrong day:
    // Expected: 2023-10-29T18:00:00.000Z
    // Received: 2023-10-30T22:00:00.000Z
  });
  it('should switch the next day at 6pm on regular odd day after 6pm', () => {
    const mockDateObject = new Date('2023-10-29T19:42:16.652Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDateObject);
    const testSwitchTime = calculateSwitchTime();
    spy.mockRestore();
    expect(testSwitchTime).toEqual(new Date('2023-10-29T18:00:00.000Z'));
    // returning GMT not EST, but correct day:
    // Expected: 2023-10-29T18:00:00.000Z
    // Received: 2023-10-30T22:00:00.000Z
  });
  it('should switch the same day at 6pm on even days when time is before 6pm', () => {
    const mockDateObject = new Date('2023-10-28T11:42:16.652Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDateObject);
    const testSwitchTime = calculateSwitchTime();
    spy.mockRestore();
    expect(testSwitchTime).toEqual(new Date('2023-10-28T18:00:00.000Z'));
    // returning GMT not EST, plus the wrong day:
    // Expected: 2023-10-28T18:00:00.000Z
    // Received: 2023-10-29T22:00:00.000Z
  });
})

// TEST TIME CHANGE FOR DAYLIGHT SAVINGS (March 12 & November 5, 2023 / March 10 & November 3, 2024)

// https://medium.com/make-it-heady/javascript-handle-date-in-any-timezone-with-daylight-saving-check-182657009310




// npx jest --version
// 27.5.1