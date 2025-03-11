import { defaultLint, ignores, jest } from 'dzuelu-projen/dist/src/lint.js';

// todo find a better way
ignores.ignores.push('e2e');
jest.files.push('test/**/*.ts'); // todo, fix in dzuelu-projen

export default defaultLint;
