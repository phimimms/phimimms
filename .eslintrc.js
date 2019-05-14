module.exports = {
  "env": {
    "browser": true,
    "jest": true,
  },
  "extends": [ "plugin:@typescript-eslint/recommended" ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
    },
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "rules": {
    "@typescript-eslint/indent": [ "error", 2 ],
  }
};
