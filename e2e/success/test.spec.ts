// @ts-ignore
const { set } = require('../../dist/src/index');

it('string', () => {
  set('AAAAAAHHHHHHH!!!!');
  expect(true).toBe(true);
});
