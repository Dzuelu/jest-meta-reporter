import { metadata } from 'jest-metadata';
import { parseId, pluginSpace } from './util';

/**
 * Appends items to metadata
 * @param items Metadata items
 */
export const push = (...items: never[]): void => {
  metadata.push(`${pluginSpace}.${parseId()}`, items);
};
