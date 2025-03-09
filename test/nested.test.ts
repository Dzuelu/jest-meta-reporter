import { metadata } from 'jest-metadata';
import { push, set } from '../src/metadata';

jest.retryTimes(1);

describe('nested >', () => {
  test('nested 1', () => {
    push({ myId: metadata.id, test: 'multiple 1' });
    // console.log('in test multiple 1', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
    expect(true).toBe(true);
  });

  test('nested 2', () => {
    push({ myId: metadata.id, test: 'multiple 2' });
    push({ another: 'test' });
    set('set');
    push({ different: 'test' });
    // console.log('in test multiple 2', { id: metadata.id, metaGet: JSON.stringify(metadata.get()) });
    expect(true).toBe(false);
  });
});
