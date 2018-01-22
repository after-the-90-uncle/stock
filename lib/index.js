'use strict';

import koa from 'koa';
var app=new koa();

app.keys = ['project main-site secret', 'stronger the song', 'stronger the role'];
var bodyParser = require('koa-bodyparser')
app.use(bodyParser({
    "formLimit" : "50mb",
    "jsonLimit":"50mb",
    "textLimit":"50mb"
}));
app.use(require('koa-logger')());

import route from './route';
require('./middleware').default(app);
require('./api').default(app);
app.use(route.routes()).use(route.allowedMethods());

require('./view').default(app);

process.on('uncaughtException', function(err) {
  console.log('连接后端出问题:',err);
});
export default app;

