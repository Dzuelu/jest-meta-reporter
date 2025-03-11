// @ts-ignore
const { Meta } = require('../../dist/src/index');

it('non-destructive with set value', () => {
  Meta.set('first set');
  Meta.push('second pushed');
  expect(true).toBe(false);
});

it('non-destructive with no value first set', () => {
  Meta.push('pushed');
  expect(true).toBe(false);
});
