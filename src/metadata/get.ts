/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { metadata } from 'jest-metadata';
import { namespaceId } from './namespaceId';

/**
 * Returns any currently set metadata for the currently running test.
 * @returns Current set for this test
 */
export const get = <T>(fallbackValue?: unknown): T => {
  return metadata.get(namespaceId(), fallbackValue) as T;
};
