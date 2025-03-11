import { e2eJest } from './e2eJest';

it('outputs nothing when test is successful', () => {
  const result = e2eJest('success');
  expect(result.stderr).toStrictEqual('');
  expect(result.failed).toStrictEqual(false);
});
