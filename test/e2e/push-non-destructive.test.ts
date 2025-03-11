import { e2eJest } from './e2eJest';

it("set overrides any previous value", () => {
  const result = e2eJest('push-non-destructive');
  expect(result.stderr).toStrictEqual(
    [
      'non-destructive with set value metadata:',
      '[',
      '  "first set",',
      '  "second pushed"',
      ']',
      'non-destructive with no value first set metadata:',
      '[',
      '  "pushed"',
      ']'
    ].join('\n')
  );
});
