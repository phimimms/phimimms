module.exports = {
  "cacheDirectory": ".jest/cache",
  "collectCoverage": true,
  "collectCoverageFrom": [ "src/app/**/*.ts" ],
  "coverageDirectory": ".jest/coverage",
  "moduleFileExtensions": [ "js", "json", "svelte", "ts" ],
  "roots": [ "src/app" ],
  "transform": {
    "\\.ts$": "ts-jest",
  },
};
