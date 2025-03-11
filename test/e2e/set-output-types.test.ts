import { e2eJest } from './e2eJest';

it("sets and outputs types correctly (or doesn't and is called out)", () => {
  const result = e2eJest('set-output-types');
  expect(result.stderr).toStrictEqual(
    [
      'string metadata:',
      '"some_string"',
      'number metadata:',
      '123456',
      'boolean:true metadata:',
      'true',
      'boolean:false metadata:',
      'false',
      'object metadata:',
      '{',
      '  "root": {',
      '    "child1": {',
      '      "child2": {',
      '        "child3": {',
      '          "child4": {',
      '            "child5": {',
      '              "value": "hi"',
      '            }',
      '          }',
      '        }',
      '      }',
      '    }',
      '  }',
      '}',
      'array metadata:',
      '[',
      '  1,',
      '  "2",',
      '  3,',
      '  "4",',
      '  5',
      ']'
      // 'null metadata:', // does not output
      // 'null',
      // 'undefined metadata:', // does not output
      // 'undefined'
      // 'NaN metadata:', // does not output
      // 'NaN'
    ].join('\n')
  );
});
