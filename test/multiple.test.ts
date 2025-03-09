import { $Set, metadata } from 'jest-metadata';

const $Description = (text: string) => {
  $Set('mycompany.description', text);
};

$Description('test 1');
test('multiple 1', () => {
  metadata.push('jest-meta-reporter.test_0.0', [{ test: 'multiple 1' }]);
  console.log('in test multiple 1', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
  expect(true).toBe(true);
});

$Description('test 2');
test('multiple 2', () => {
  metadata.push('jest-meta-reporter.test_1.0', [{ test: 'multiple 2' }]);
  console.log('in test multiple 2', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
  expect(true).toBe(false);
});
