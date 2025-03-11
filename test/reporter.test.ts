import { MetaReporter } from '../src/reporter';
import { Config } from '@jest/reporters';

jest.mock('jest-metadata');
jest.mock('@jest/reporters');

const globalConfig: Config.GlobalConfig = {} as unknown as Config.GlobalConfig;

describe('reporter', () => {
  it('creates defaultReporter if outputDefault is true', () => {
    const reporter = new MetaReporter(globalConfig, { outputDefault: true });
    expect(reporter.defaultReporter).not.toBeUndefined();
  });

  it('defaults outputDefault to true', () => {
    const reporter = new MetaReporter(globalConfig);
    expect(reporter.defaultReporter).not.toBeUndefined();
  });

  it('defaults outputDefault to true', () => {
    const reporter = new MetaReporter(globalConfig, { outputDefault: false });
    expect(reporter.defaultReporter).toBeUndefined();
  });
});
