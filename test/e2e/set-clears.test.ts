import { e2eJest } from './e2eJest';

it('set overrides any previous value', () => {
  const result = e2eJest('set-clears');
  expect(result.stderr).toStrictEqual(['multiple-sets metadata:', '"last set"', 'push-then-set metadata:', '"set"'].join('\n'));
});
