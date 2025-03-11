import { e2eJest } from './e2eJest';

it('outputs nothing when test is successful', () => {
  const result = e2eJest('get');
  expect(result.stderr).toStrictEqual('');
  expect(result.failed).toStrictEqual(false);
});
