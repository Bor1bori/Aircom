// const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // Either absolute or relative path. If relative it's resolved to current working directory.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: {
    '@src/*': ['./src/*']
  }
});
// When path registration is no longer needed
// cleanup();
