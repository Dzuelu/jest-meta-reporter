// @ts-ignore
const { set, push } = require('../../dist/src/index');

it('non-destructive with set value', () => {
  set('first set');
  push('second pushed');
  expect(true).toBe(false);
});

it('non-destructive with no value first set', () => {
  push('pushed');
  expect(true).toBe(false);
});
