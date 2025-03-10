# jest-meta-reporter

Are you tired of having to put `console.log` statements into your tests to debug when they fail, and then clean them out afterwords?
Then `jest-meta-reporter` might be just the thing you need for your tests!

`jest-meta-reporter` allows you to set or push metadata into your tests and will only output when the test fails.

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

If you need a **JSDOM** environment, you need change the test environment to:

```diff
{
+  "testEnvironment": "jest-metadata/environment-jsdom",
}
```

Use the `Meta` export and you can call `get`, `set`, or `push` to get or set the meta data.

```typescript
import { Meta } from 'jest-meta-reporter';

describe('description', () => {
  it('should', () => {
    const id: string = someRandomId();
    Meta.set(id);

    const someOtherId: string = someRandomId();
    Meta.push({ someOtherId });

    expect(true).toBe(false);
  });
});
```

Running your test, the failure output should look similar to this

```sh
 FAIL  test/single.test.ts run...
  ● description › should

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

description should metadata:
[
  "random_123"
  {
    "someOtherId": "random_123"
  }
]
``` 

## Options

### outputDefault: boolean
Builds a DefaultReporter and attempts to output metadata as close to the
failing test as possible. 
Default `true`.
```json
{
  "reporters": [
    "default",
    ["jest-meta-reporter", { "outputDefault": false }]
  ]
}
```

