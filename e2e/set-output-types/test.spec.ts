// @ts-ignore
const { set } = require('../../dist/src/index');

it('string', () => {
  set('some_string');
  expect(true).toBe(false);
});

it('number', () => {
  set(123456);
  expect(true).toBe(false);
});

it('boolean:true', () => {
  set(true);
  expect(true).toBe(false);
});

it('boolean:false', () => {
  set(false);
  expect(true).toBe(false);
});

it('object', () => {
  set({
    root: {
      child1: {
        child2: {
          child3: {
            child4: {
              child5: {
                value: 'hi'
              }
            }
          }
        }
      }
    }
  });
  expect(true).toBe(false);
});

it('array', () => {
  set([1, '2', null, undefined, NaN]);
  expect(true).toBe(false);
});

it('null', () => {
  set(null);
  expect(true).toBe(false);
});

it('undefined', () => {
  set(undefined);
  expect(true).toBe(false);
});

it('NaN', () => {
  set(NaN);
  expect(true).toBe(false);
});
