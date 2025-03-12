// @ts-ignore
const { set, push } = require('../../dist/src/index');

it('multiple-sets', () => {
  set('first set');
  set('last set');
  expect(true).toBe(false);
});

it('push-then-set', () => {
  push('push');
  set('set');
  expect(true).toBe(false);
});
