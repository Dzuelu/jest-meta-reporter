import { defaultLint, ignores, jest } from 'dzuelu-projen/dist/src/lint.js';

// todo find a better way
ignores.ignores.push('e2e');
// jest.languageOptions.parserOptions.projectService.allowDefaultProject = ['test/*/*.ts'];

export default defaultLint;
