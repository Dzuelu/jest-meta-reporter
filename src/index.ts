import * as Reporter from './reporter';
import * as Metadata from './metadata';

export * from './metadata';
export const Meta = {
  get: Metadata.get,
  push: Metadata.push,
  set: Metadata.set
};

export * from './reporter';

export default Reporter.MetaReporter;
