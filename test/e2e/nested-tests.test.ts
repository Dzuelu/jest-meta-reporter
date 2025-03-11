import { e2eJest } from './e2eJest';

it('set overrides any previous value', () => {
  const result = e2eJest('nested-tests');
  expect(result.stderr).toStrictEqual(['describe 1 > describe 2 > it 1 metadata:', '"some_string"'].join('\n'));
});
