// @ts-ignore
const { get, set } = require('../../dist/src/index');

// no output is good output

it('string', () => {
  set('some_string');
  expect(get()).toStrictEqual('some_string');
});

it('number', () => {
  set(123);
  expect(get()).toStrictEqual(123);
});

it('boolean:true', () => {
  set(true);
  expect(get()).toStrictEqual(true);
});

it('boolean:false', () => {
  set(false);
  expect(get()).toStrictEqual(false);
});

it('array', () => {
  const arr = [1, 2, 3];
  set(arr);
  expect(get()).toEqual(expect.arrayContaining(arr));
});

it('object', () => {
  const obj = { string: 'obj', num: 3, bool: true };
  set(obj);
  expect(get()).toMatchObject(obj);
});
