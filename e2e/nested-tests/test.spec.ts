// @ts-ignore
const { Meta } = require('../../dist/src/index');

describe('describe 1', () => {
  describe('describe 2', () => {
    it('it 1', () => {
      Meta.set('some_string');
      expect(true).toBe(false);
    });
  });
});
