module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "extends": [ "plugin:@typescript-eslint/recommended" ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true,
    },
    "ecmaVersion": 2019,
    "sourceType": "module",
  },
  "plugins": [
    "@typescript-eslint",
    "svelte3",
  ],
  "rules": {
    "@typescript-eslint/indent": [ "error", 2 ],
  }
};
