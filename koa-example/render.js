/**
File: server.js
Author: Tyler Moon
Purpose: Provide a module for rendering views using the swig template engine
**/
// Require needed Node packages
const views = require('koa-views');
const path = require('path');

// setup mapping the .html views to the swig template engine
module.exports = views(path.join(__dirname, './views'), {
  map: { html: 'swig' }
});
