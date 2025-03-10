import { DzueluTypeScriptProject } from 'dzuelu-projen';
// import { JestReporter } from 'projen/lib/javascript';

const project = new DzueluTypeScriptProject({
  defaultReleaseBranch: 'main',
  eslintOptions: {
    devdirs: ['test', 'e2e'],
    dirs: ['src']
  },
  jestOptions: {
    jestConfig: {
      // testEnvironment: 'jest-metadata/environment-node'
    },
    preserveDefaultReporters: false
  },
  name: 'jest-meta-reporter',
  releaseToNpm: true
});

project.addDeps('jest-metadata');
project.addPeerDeps('jest');

// compile the reporter so we can use it in this project
project.testTask.prependExec('projen compile');
project.testTask.prependExec('rm -rf ./dist', { condition: 'node -e "if (process.env.GITHUB_ENV) process.exit(1)"' });

// TODO: something like this for e2e tests
// const e2e = project.addTask('e2e', { exec: 'jest --testMatch "<rootDir>/@(e2e)/**/*(*.)@(spec|test).ts?(x)"' });
// project.testTask.spawn(e2e);

// project.jest?.addReporter(new JestReporter('./dist/src/index.js'));

project.synth();
