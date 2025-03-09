import { metadata } from 'jest-metadata';
import { parseId, pluginSpace } from './util';

/**
 * Clear any previous metadata and set the current value
 * @param value Metadata value
 */
export const set = (value: unknown): void => {
  metadata.set(`${pluginSpace}.${parseId()}`, value);
};
