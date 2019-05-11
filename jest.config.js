module.exports = {
  "cacheDirectory": ".jest/cache",
  "collectCoverage": true,
  "collectCoverageFrom": [ "src/app/**/*.ts" ],
  "coverageDirectory": ".jest/coverage",
  "moduleFileExtensions": [ "js", "json", "svelte", "ts" ],
  "roots": [ "src/app" ],
  "transform": {
    "\\.svelte$": "svelte-jest",
    "\\.ts$": "ts-jest",
  },
};
