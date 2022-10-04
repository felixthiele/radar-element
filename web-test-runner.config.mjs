import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default ({
  browsers: [puppeteerLauncher()],
  files: 'dist/test/**/*.test.js',
  nodeResolve: true
});
