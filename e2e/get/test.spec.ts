// @ts-ignore
const { Meta } = require('../../dist/src/index');

// no output is good output

it('string', () => {
  Meta.set('some_string');
  expect(Meta.get()).toStrictEqual('some_string');
});

it('number', () => {
  Meta.set(123);
  expect(Meta.get()).toStrictEqual(123);
});

it('boolean:true', () => {
  Meta.set(true);
  expect(Meta.get()).toStrictEqual(true);
});

it('boolean:false', () => {
  Meta.set(false);
  expect(Meta.get()).toStrictEqual(false);
});

it('array', () => {
  const arr = [1, 2, 3];
  Meta.set(arr);
  expect(Meta.get()).toEqual(expect.arrayContaining(arr));
});

it('object', () => {
  const obj = { string: 'obj', num: 3, bool: true };
  Meta.set(obj);
  expect(Meta.get()).toMatchObject(obj);
});
