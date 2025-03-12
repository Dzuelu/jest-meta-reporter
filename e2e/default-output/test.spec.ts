// @ts-ignore
const { set } = require('../../dist/src/index');

it('string', () => {
  set('some_string_metadata');
  expect(true).toBe(false);
});
