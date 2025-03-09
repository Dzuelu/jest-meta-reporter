import { metadata } from 'jest-metadata';
import { namespaceId } from './namespaceId';

/**
 * Appends items to metadata
 * @param items Metadata items
 */
export const push = (...items: unknown[]): void => {
  metadata.push(namespaceId(), items);
};
