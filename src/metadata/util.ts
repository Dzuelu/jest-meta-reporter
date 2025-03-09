import { metadata } from 'jest-metadata';

export const pluginSpace = 'jest-meta-reporter';

/**
 * Splits example: `/home/git/jest-meta-reporter/test/testFile.test.ts:test_0.0.fn`
 * into `test_0.0`
 * @param metaId metadata.id
 * @returns
 */
export const parseId = (): string => {
  return metadata.id.split(':')[-1].replace('.fn', '').replace('.', '-');
};
