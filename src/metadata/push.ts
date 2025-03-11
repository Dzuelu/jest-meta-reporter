import { metadata } from 'jest-metadata';
import { namespaceId } from './parseId';
import { get } from './get';

/**
 * Appends items to metadata.
 * Non-destructive if current metadata is not array.
 * @param items Metadata items
 */
export const push = (...items: unknown[]): void => {
  const currentMeta = get();
  if (currentMeta != null && !Array.isArray(currentMeta)) metadata.set(namespaceId(), [currentMeta]);
  metadata.push(namespaceId(), items);
};
