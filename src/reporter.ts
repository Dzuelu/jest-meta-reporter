import {
  AggregatedResult,
  Config,
  DefaultReporter,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
  utils
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

      const hook = (testPath: string, result: TestResult) => {
        result.testResults.forEach(assertion => {
          if (assertion.status === 'failed') this.printMeta(testPath, assertion);
        });
      };
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.defaultReporter.printTestFileFailureMessage = function (testPath: string, _config: Config.ProjectConfig, result: TestResult) {
        // Unchanged from DefaultReporter.printTestFileFailureMessage except for hook call to get as close as possible to failure output
        if (result.failureMessage) {
          this.log(result.failureMessage);
          hook(testPath, result);
        }
        const didUpdate = this._globalConfig.updateSnapshot === 'all';
        const snapshotStatuses = utils.getSnapshotStatus(result.snapshot, didUpdate);
        for (const status of snapshotStatuses) this.log(status);
      };
    }
  }

  log(message: string): void {
    process.stderr.write(`${message}\n`);
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
    if (testCaseResult.status !== 'failed') return;
    if (this.defaultReporter == null) this.printMeta(test.path, testCaseResult);
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

  printMeta(testPath: string, testCaseResult: TestCaseResult) {
    // JS is single threaded so when we get the lastTestEntry, it should be the
    // same as the test case result for this function.
    const fileMetadata = state.getTestFileMetadata(testPath);
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
    this.log(`${testCaseResult.fullName} metadata:`);
    this.log(JSON.stringify(meta, undefined, 2));
  }
}
