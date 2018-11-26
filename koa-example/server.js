/**
File: server.js
Author: Tyler Moon
Purpose: A simple Koa server for rendering a Todo List web application
**/
// Require needed Node.js packages
const render = require('./render.js');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

// Initalize a Koa app
const Koa = require('koa');
const app = new Koa();

// In memory "database"
const todoList = [];

// Tell koa to use our logger for displaying all inbound and outbound request
app.use(logger());

// Use our render module in _render.js_ for rendering html with swig
app.use(render);

// Use koaBody to parse body parameters from post request
app.use(koaBody());

// Setup routes to async functions
router.get('/', list)
  .get('/todo/new', add)
  .get('/todo/:id', show)
  .post('/todo', create);

// Tell koa to use our router
app.use(router.routes());

// response functions
// list all todo items
async function list(ctx) {
  await ctx.render('list', { todoList: todoList });
}

// show creation form
async function add(ctx) {
  await ctx.render('new');
}

// show a specific item
async function show(ctx) {
  const id = ctx.params.id;
  const todo = todoList[id];
  if (!todo) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { todo: todo });
}

// create new item
async function create(ctx) {
  const item = ctx.request.body;
  const id = todoList.push(item) - 1;
  item.created_at = new Date();
  item.id = id;
  ctx.redirect('/');
}

// Listen to port 3000 for request
//app.listen(3000);
module.exports = app.callback()
