import { DzueluTypeScriptProject } from 'dzuelu-projen';

const project = new DzueluTypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'jest-meta-reporter'
});

project.synth();
