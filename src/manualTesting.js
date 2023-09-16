const testIsFoolsDay = (datestring) => {
  const today = new Date(datestring);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  console.log('today:', today, typeof today);

  // These 2 retain values from 1st run (9/29 & 10/1) for all 30th dates. 
  // With June 26 they change to 9/25 & 9/27 (still September but June numbers) !!!
  console.log('yesterday:', yesterday, typeof yesterday);
  console.log('tomorrow:', tomorrow, typeof yesterday);

  const isOddDay = (date) => date.getDate() % 2 === 1;

  // const isFoolsDay = isOddDay(today) && isOddDay(yesterday);
  const isFoolsDay = isOddDay(today) && isOddDay(tomorrow);


  console.log('today odd?', isOddDay(today));
  console.log('today % 2 =', today.getDate() % 2);
  console.log('yesterday odd?', isOddDay(yesterday));
  console.log('yesterday % 2 =', yesterday.getDate() % 2);
  console.log('tomorrow odd?', isOddDay(tomorrow));
  console.log('tomorrow % 2 =', today.getDate() % 2);

  return isFoolsDay;
};

const testSept30 = testIsFoolsDay('2023-09-30T11:42:16.652Z');
console.log('Sept 30 fools day?', testSept30);

console.log('NEXT DATE:')

const testApril30 = testIsFoolsDay('2023-04-30T11:42:16.652Z');
console.log('April 30 fools day?', testApril30);

console.log('NEXT DATE:')

const testJune30 = testIsFoolsDay('2023-06-30T11:42:16.652Z');
console.log('June 30 fools day?', testJune30);

const testJune26 = testIsFoolsDay('2023-06-26T11:42:16.652Z');
console.log('June 26 fools day?', testJune26);


// ALSO FAILS
// import { testIsFoolsDay } from "./manualTesting";

// describe('test fools day function in manualTesting.js', () => {
//   it('should return false on even final days of the month', () => {
//     const mockDateObject = new Date('2023-09-30T11:42:16.652Z');
//     const spy = jest
//       .spyOn(global, 'Date')
//       .mockImplementation(() => mockDateObject);
//     const testFoolsDay = testIsFoolsDay();
//     spy.mockRestore();
//     expect(testFoolsDay).toEqual(false);
//   })
// })