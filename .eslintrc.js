module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
  ],
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
    "import",
    "svelte3",
  ],
  "rules": {
    /* Possible Errors */
    "no-await-in-loop": 1,
    "no-template-curly-in-string": 1,

    /* Best Practices */
    "array-callback-return": 1,
    "block-scoped-var": 1,
    "class-methods-use-this": 1,
    "complexity": [ "error", 20 ],
    "consistent-return": 1,
    "guard-for-in": 1,
    "max-classes-per-file": [ "error", 1 ],
    "no-alert": 1,
    "no-caller": 1,
    "no-empty-function": 1,
    "no-eq-null": 1,
    "no-eval": 1,
    "no-extend-native": 1,
    "no-extra-bind": 1,
    "no-extra-label": 1,
    "no-floating-decimal": 1,
    "no-implicit-globals": 1,
    "no-implied-eval": 1,
    "no-invalid-this": 1,
    "no-iterator": 1,
    "no-lone-blocks": 1,
    "no-loop-func": 1,
    "no-multi-spaces": 1,

    "@typescript-eslint/indent": [ "error", 2 ],
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "extensions": [ ".svelte", ".ts", ".mjs", ".js", ".json" ],
            "modules": [
              "src/app",
              "node_modules"
            ],
          },
        },
      },
    },
  }
};
