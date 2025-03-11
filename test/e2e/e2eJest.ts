import { sync } from 'execa';
import path from 'path';

const JEST_PATH = path.resolve(__dirname, '../../node_modules/jest-cli/bin/jest.js');

export const e2eJest = (dir: string, args?: string[]) => {
  const cwd = path.resolve(__dirname, '../../e2e/', dir);
  const spawnArgs = [JEST_PATH, ...(args ?? [])];
  const env = {
    ...process.env,
    FORCE_COLOR: '0',
    NO_COLOR: '1'
  };

  return sync(process.execPath, spawnArgs, {
    cwd,
    env,
    reject: false,
    // stripFinalNewline: true,
    timeout: 30_000
  });
};
