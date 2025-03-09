/* eslint-disable @typescript-eslint/no-confusing-void-expression, @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Test, TestCaseResult } from '@jest/test-result';
import { state } from 'jest-metadata';
// eslint-disable-next-line import/no-named-as-default
import JestMetadataReporter from 'jest-metadata/reporter';
import { parseId, pluginSpace } from './metadata/parseId';
// eslint-disable-next-line perfectionist/sort-imports
import { Data } from 'jest-metadata/dist/metadata';

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

    // JS is single threaded so when we get the lastTestEntry, it should be the
    // same as the test case result for this function.
    const fileMetadata = state.getTestFileMetadata(test.path);
    if (fileMetadata.lastTestEntry == null) return;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const invocationId = `${fileMetadata.lastTestEntry.id}.${(testCaseResult.invocations ?? 1) - 1}`;
    const allTestInvocations = Array.from(fileMetadata.allTestInvocations());
    const invocation = allTestInvocations.find(i => i.id === invocationId);
    if (invocation?.fn == null) return;
    const parsed = parseId(invocationId);
    const meta = [pluginSpace, ...parsed.split('.')].reduce<Readonly<Data>>((obj, key) => {
      if (!Object.hasOwn(obj, key)) console.log('TypeError incoming...', { invocationId, key, obj, parsed });
      return obj[key] as Readonly<Data>;
    }, invocation.fn.get());

    console.log(`onTestCaseResult`, {
      meta,
      // // allTestInvocationsGet: allTestInvocations.map(i => JSON.stringify(i.get())),
      // allTestInvocationsIds: allTestInvocations.map(i => i.id),
      // // test,
      // // allTestInvocationsDefinition: allTestInvocations.map(i => i.definition),
      // // invocation,
      // meta,
      // metaId: invocationId,
      // // testCaseResult,
      // title: testCaseResult.title
      // // firstMeta: JSON.stringify(Array.from(fileMeta.allTestInvocations())[0].fn?.get(), undefined, 2),
      // // secondMeta: JSON.stringify(Array.from(fileMeta.allTestInvocations())[1]?.fn?.get() ?? {}, undefined, 2)
      rawMeta: invocation.fn.get()
    });
  }
}
