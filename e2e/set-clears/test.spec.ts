const { Meta } = require('../../dist/src/index');

it('multiple-sets', () => {
  Meta.set('first set');
  Meta.set('last set');
  expect(true).toBe(false);
});

it('push-then-set', () => {
  Meta.push('push');
  Meta.set('set');
  expect(true).toBe(false);
});
