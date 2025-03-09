/* eslint-disable @typescript-eslint/no-confusing-void-expression, @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Test, TestCaseResult } from '@jest/test-result';
import { state } from 'jest-metadata';
// eslint-disable-next-line import/no-named-as-default
import JestMetadataReporter from 'jest-metadata/reporter';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MetaReporterParams {
  // /**
  //  * Output default Jest output for tests with meta after.
  //  * Default: true
  //  */
  // outputDefault?: boolean;
}

export class MetaReporter extends JestMetadataReporter {
  override async onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    await super.onTestCaseResult(test, testCaseResult);
    // if (testCaseResult.status !== 'failed') return;

    const fileMeta = state.getTestFileMetadata(test.path);
    const allTestInvocations = Array.from(fileMeta.allTestInvocations());

    console.log(`onTestCaseResult`, {
      allTestInvocationsDefinition: allTestInvocations.map(i => i.definition),
      allTestInvocationsFnGet: allTestInvocations.map(i => JSON.stringify(i.fn?.get())),
      allTestInvocationsGet: allTestInvocations.map(i => JSON.stringify(i.get())),
      allTestInvocationsIds: allTestInvocations.map(i => i.id),
      current: testCaseResult.fullName
      // firstMeta: JSON.stringify(Array.from(fileMeta.allTestInvocations())[0].fn?.get(), undefined, 2),
      // secondMeta: JSON.stringify(Array.from(fileMeta.allTestInvocations())[1]?.fn?.get() ?? {}, undefined, 2)
    });
  }
}
