/**
 * This file is written in ES5 since it's not transpiled by Babel
 *
 * This file does the following:
 * 1. Sets Node environment variable
 * 2. Registers Babel for transpiling our code for testing
 * 3. Disables Webpack-specific features that Mocha doesn't understand
 * 4. Requires jsdom to setup an in-memory DOM in Node
 * 5. Sets up global variables to mimic a browser environment
 */

/* eslint-disable no-var*/

/**
 * Assures the .babelrc dev config doesn't apply hot module reloading  for tests
 *
 * We don't want to set it to production for two reasons:
 * 1. You won't see any PropType validation warnings when code is running in production mode
 * 2. Tests will not display detailed error messages when running against production version code
 */
process.env.NODE_ENV = 'test';

/**
 * Register babel so that it will transpile ES6 to ES5 before our tests run
 */
require('babel-register')();

/**
 * Disable Webpack-specific features for tests since Mocha doesn't know what to do with them
 */
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};

/**
 * Configure JSDOM and set global variables to simulate a browser environment for tests
 */
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;  //eslint-disable-line no-undef
