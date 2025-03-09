import { DzueluTypeScriptProject } from 'dzuelu-projen';
import { JestReporter } from 'projen/lib/javascript';

const project = new DzueluTypeScriptProject({
  defaultReleaseBranch: 'main',
  jestOptions: {
    jestConfig: {
      testEnvironment: 'jest-metadata/environment-node'
    },
    preserveDefaultReporters: false
  },
  name: 'jest-meta-reporter'
});

project.addDeps('jest-metadata');
project.addPeerDeps('jest');

// compile the reporter so we can use it in this project
project.testTask.prependExec('projen compile');
project.testTask.prependExec('rm -rf ./dist');

project.jest?.addReporter(new JestReporter('./dist/src/index.js'));

project.synth();
