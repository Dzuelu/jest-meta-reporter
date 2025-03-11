// @ts-ignore
const { Meta } = require('../../dist/src/index');

it('string', () => {
  Meta.set('some_string');
  expect(true).toBe(false);
});

it('number', () => {
  Meta.set(123456);
  expect(true).toBe(false);
});

it('boolean:true', () => {
  Meta.set(true);
  expect(true).toBe(false);
});

it('boolean:false', () => {
  Meta.set(false);
  expect(true).toBe(false);
});

it('object', () => {
  Meta.set({
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
  Meta.set([1, '2', 3, '4', 5]);
  expect(true).toBe(false);
});

it('null', () => {
  Meta.set(null);
  expect(true).toBe(false);
});

it('undefined', () => {
  Meta.set(undefined);
  expect(true).toBe(false);
});

it('NaN', () => {
  Meta.set(NaN);
  expect(true).toBe(false);
});
