import { $Set, metadata } from 'jest-metadata';
import { Meta } from '../src/index';

// Write your own DSL for attaching metadata to test entities
// Try to namespace your metadata to avoid collisions with other libraries
const $Description = (text: string) => {
  $Set('mycompany.description', text);
};

$Description('This is a sample test suite.');
describe('Login flow', () => {
  $Description('This is a login test.');
  it('should login', () => {
    // ...
    // metadata.set('mycompany.attachements', [{ filePath: '/path/to/screenshot.png', name: 'screenshot', type: 'image/png' }]);
    Meta.set({ filePath: '/path/to/screenshot.png', name: 'screenshot', type: 'image/png' });
    console.log('in test', { id: metadata.id, 'jest-metadata.get': metadata.get(), metadata, metaGet: Meta.get() });
    // ...
  });
});
