import { e2eJest } from './e2eJest';

it('outputs nothing when test is successful', () => {
  const result = e2eJest('default-output');
  expect(result.stderr).toStrictEqual(
    /* eslint-disable */
`FAIL ./test.spec.ts
  ● string

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

      4 | it('string', () => {
      5 |   set('some_string_metadata');
    > 6 |   expect(true).toBe(false);
        |                ^
      7 | });
      8 |

      at Object.toBe (test.spec.ts:6:16)

string metadata:
\"some_string_metadata\"`
    /* eslint-enable */
  );
});
