const Router = require('koa-router');
const api = new Router();
const user = require('./user');

api.use('/user', user.routes());

api.get('/', (ctx, next) => {
    ctx.body = "GET" + ctx.request.path;
});

module.exports = api;