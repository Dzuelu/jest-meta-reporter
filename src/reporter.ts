/* eslint-disable */
import { Test, TestCaseResult } from '@jest/test-result';
import { state } from 'jest-metadata';
import JestMetadataReporter from 'jest-metadata/reporter';

export interface MetaReporterParams {
  /**
   * Output default Jest output for tests with meta after.
   * Default: true
   */
  outputDefault?: boolean;
}

export class MetaReporter extends JestMetadataReporter {
  override onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    super.onTestCaseResult(test, testCaseResult);

    const getIds = (iterator: Iterable<unknown>) => Array.from(iterator).flatMap((x: any) => x.id);
    const fileMeta = state.getTestFileMetadata(test.path);

    console.log(`onTestCaseResult`, {
      current: testCaseResult.fullName,
      // currentMetadataId: state.currentMetadata.id,
      // currentId: state.getTestFileMetadata(test.path).current.value()?.id,
      // ids
      // allDescribeBlocks: getIds(fileMeta.allDescribeBlocks()),
      // allInvocations: getIds(fileMeta.allInvocations()),
      // allTestEntries: getIds(fileMeta.allTestEntries()),
      allTestInvocations: getIds(fileMeta.allTestInvocations()),
      meta: JSON.stringify(Array.from(fileMeta.allTestInvocations())[0].fn?.get(), undefined, 2)
    });
  }
}
