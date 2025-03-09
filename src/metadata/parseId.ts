import { metadata } from 'jest-metadata';

export const pluginSpace = 'jest-meta-reporter';

/**
 * Splits example: `/home/git/jest-meta-reporter/test/testFile.test.ts:test_0.0.fn`
 * into `test_0.0`
 * @param metaId metadata.id
 * @returns
 */
export const parseId = (metaId?: string): string => {
  const splitId =
    // Used when the reporter is trying to get the id
    metaId?.split(':') ??
    // Used when in tests
    metadata.id.split(':');
  return splitId[splitId.length - 1].replace('.fn', '');
};

export const namespaceId = (): string => `${pluginSpace}.${parseId()}`;
