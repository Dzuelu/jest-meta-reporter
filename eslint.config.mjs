import { defaultLint, ignores } from 'dzuelu-projen/dist/src/lint.js';

// todo find a better way
ignores.ignores.push('e2e');

export default defaultLint;
