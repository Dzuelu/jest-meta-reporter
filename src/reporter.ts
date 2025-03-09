import {
  AggregatedResult,
  Config,
  DefaultReporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult
} from '@jest/reporters';
import { state } from 'jest-metadata';
// eslint-disable-next-line import/no-named-as-default
import JestMetadataReporter from 'jest-metadata/reporter';
import { parseId, pluginSpace } from './metadata/parseId';
// eslint-disable-next-line perfectionist/sort-imports
import { Data } from 'jest-metadata/dist/metadata';

export interface MetaReporterParams {
  /**
   * Output default Jest output for tests with meta after.
   * Default: true
   */
  outputDefault?: boolean;
}

export class MetaReporter extends JestMetadataReporter {
  defaultReporter?: DefaultReporter;

  constructor(globalConfig: Config.GlobalConfig, options?: MetaReporterParams) {
    super(globalConfig);

    if (options?.outputDefault !== false) {
      this.defaultReporter = new DefaultReporter(globalConfig);
    }
  }

  override async onRunComplete(testContexts: Set<TestContext>, aggregatedResult: AggregatedResult): Promise<void> {
    await super.onRunComplete(testContexts, aggregatedResult);
    this.defaultReporter?.onRunComplete();
  }

  override async onRunStart(results: AggregatedResult, options: ReporterOnStartOptions): Promise<void> {
    await super.onRunStart(results, options);
    this.defaultReporter?.onRunStart(results, options);
  }

  override onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);
    this.defaultReporter?.onTestCaseResult(test, testCaseResult);
    // if (testCaseResult.status !== 'failed') return;

    // JS is single threaded so when we get the lastTestEntry, it should be the
    // same as the test case result for this function.
    const fileMetadata = state.getTestFileMetadata(test.path);
    if (fileMetadata.lastTestEntry == null) return;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const invocationId = `${fileMetadata.lastTestEntry.id}.${(testCaseResult.invocations ?? 1) - 1}`;
    const allTestInvocations = Array.from(fileMetadata.allTestInvocations());
    const invocation = allTestInvocations.find(i => i.id === invocationId);
    if (invocation?.fn == null) return;
    const meta = [pluginSpace, ...parseId(invocationId).split('.')].reduce<Data | undefined>((obj, key) => {
      return obj?.[key] as Data | undefined;
    }, invocation.fn.get());

    if (meta == null) return;
    console.log(`${testCaseResult.fullName} metadata:`);
    console.log(meta);
  }

  override onTestCaseStart(test: Test, testCaseStartInfo: unknown): void {
    super.onTestCaseStart(test, testCaseStartInfo);
  }

  override onTestFileResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult): void {
    super.onTestFileResult(test, testResult, aggregatedResult);
    this.defaultReporter?.onTestResult(test, testResult, aggregatedResult);
  }

  override onTestFileStart(test: Test): void {
    super.onTestFileStart(test);
    this.defaultReporter?.onTestStart(test);
  }
}
