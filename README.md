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
