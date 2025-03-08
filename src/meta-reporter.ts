// import { Reporter, Test } from '@jest/reporters';
// import { Circus } from '@jest/types';
import { TestCaseResult } from '@jest/test-result';
import { JestMetadataReporter } from 'jest-metadata/reporter';
import { Test } from 'jest-runner';

export class JestMetaReporter extends JestMetadataReporter {
  // // onTestCaseStart(test, testCaseStartInfo): Promise<void> | void {}
  // // onTestCaseStart?: (test: Test, testCaseStartInfo: { ancestorTitles: Array<string>; fullName: string; mode: void | 'skip' | 'only' | 'todo'; title: string; startedAt?: number | null; }) => Promise<void> | void | undefined = {
  // //   return undefined;
  // // };
  // onTestCaseStart(test: Test, testCaseStartInfo: Circus.TestCaseStartInfo): Promise<void> | void {
  //   // console.log(test, testCaseStartInfo);
  //   // test.context.
  //   // return;
  // }
  onTestCaseResult(test: Test, testCaseResult: TestCaseResult): void {
    super.onTestCaseResult(test, testCaseResult);
    console.log(`Result for ${testCaseResult.title}`);
  }
}
