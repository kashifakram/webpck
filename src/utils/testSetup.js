// Register babel to transpile before tests run
require('@babel/register')();

// Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function () { };