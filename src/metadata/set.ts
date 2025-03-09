import { metadata } from 'jest-metadata';
import { namespaceId } from './parseId';

/**
 * Clear any previous metadata and set the current value
 * @param value Metadata value
 */
export const set = (value: unknown): void => {
  metadata.set(namespaceId(), value);
};
