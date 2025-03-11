import { DzueluTypeScriptProject } from 'dzuelu-projen';
// import { JestReporter } from 'projen/lib/javascript';

const project = new DzueluTypeScriptProject({
  defaultReleaseBranch: 'main',
  eslintOptions: {
    devdirs: ['test', 'e2e'],
    dirs: ['src']
  },
  name: 'jest-meta-reporter',
  releaseToNpm: true
});

project.addDevDeps('execa@5');
project.addDeps('jest-metadata');
project.addPeerDeps('jest');

// compile the reporter so we can use it in this project
project.testTask.prependExec('projen compile');
project.testTask.prependExec('rm -rf ./dist', {
  // Don't clean dist folder when in pipeline (was already clean)
  condition: 'node -e "if (process.env.GITHUB_ENV) process.exit(1)"'
});

project.tsconfig?.addInclude('e2e/**/*.ts');
project.tsconfig?.addInclude('test/**/*.ts');

project.synth();
