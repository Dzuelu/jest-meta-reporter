import { $Set, metadata } from 'jest-metadata';
import { push } from '../src/metadata';

const $Description = (text: string) => {
  $Set('mycompany.description', text);
};

$Description('test 1');
test('multiple 1', () => {
  push({ test: 'multiple 1' });
  console.log('in test multiple 1', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
  expect(true).toBe(true);
});

$Description('test 2');
test('multiple 2', () => {
  push({ test: 'multiple 2' });
  console.log('in test multiple 2', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
  expect(true).toBe(false);
});
