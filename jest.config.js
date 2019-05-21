module.exports = {
  cacheDirectory: '.jest/cache',
  collectCoverage: true,
  collectCoverageFrom: [ 'src/app/**/*.ts' ],
  coverageDirectory: '.jest/coverage',
  moduleFileExtensions: [ 'ts', 'mjs', 'svelte', 'js', 'json' ],
  roots: [ 'src/app' ],
  transform: {
    '\\.ts$': 'ts-jest',
  },
};
