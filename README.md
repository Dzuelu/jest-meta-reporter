# jest-meta-reporter

Are you frustrated with constantly adding console.log statements to your tests in order to debug failed cases,
only to have to go back and remove them afterward so they don't clog up the cli when running passing tests?
If so, jest-meta-reporter is the perfect solution for streamlining your testing process!

With jest-meta-reporter, you can easily set or push custom metadata into your tests, and it will only output when a test fails.
This eliminates the clutter of unnecessary logs during successful test runs, helping you keep your testing environment clean and focused.
Say goodbye to the hassle of manual cleanup and hello to more efficient debugging!

## How to setup

If you're running tests in a **Node.js** environment, add the following lines to your Jest config:

```diff
{
+  "testEnvironment": "jest-metadata/environment-node",
+  "reporters": [
-    "default"
+    "jest-meta-reporter"
+  ]
}
```

If you need a **JSDOM** environment, you need to change the above test environment to:

```diff
{
+  "testEnvironment": "jest-metadata/environment-jsdom",
}
```

Available exports are `get`, `set`, or `push`.
The default is the Reporter for jest which you will not need for normal tests.

```typescript
import { push, set } from 'jest-meta-reporter';

describe('When the world', () => {
  it('should expect the impossible', () => {
    const id: string = someRandomId();
    set(id);

    const someOtherId: string = someRandomId();
    push({ someOtherId });

    expect(true).toBe(false);
  });
});
```

Running your test, the failure output should look similar to this

```sh
 FAIL  test/single.test.ts run...
  ● When the world › should expect the impossible

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

      13 |     Meta.push({ someOtherId });
      14 |
    > 15 |     expect(true).toBe(false);
         |                  ^
      16 |   });
      17 | });
      18 |

      at Object.<anonymous> (test/single.test.ts:15:18)

When the world > should expect the impossible metadata:
[
  "random_123"
  {
    "someOtherId": "random_456"
  }
]
```

## Options

### outputDefault: boolean
Builds a DefaultReporter and attempts to output metadata as close to the failing test as possible.
Note that if multiple tests fail in the same test file, the test default reporter will output all
failed tests and then jest-meta-reporter will output any failed test metadata.
Default `true`.
```json
{
  "reporters": [
    "default",
    ["jest-meta-reporter", { "outputDefault": true }]
  ]
}
```

## Development
Repo is managed with projen, any config besides eslint (currently) should be changed in the `.projenrc.ts` file.
Setup dependencies with `yarn install` first.
Lint with `yarn eslint` or `npx projen eslint`.
Test with `yarn test` or `npx projen test`.
The build script will lint, test, and bundle.
Released when merged to main branch.
