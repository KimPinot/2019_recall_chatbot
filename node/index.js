const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = "root";
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4001, () => {
  console.log("[KOA] Running In 4001")
});

router.use('/api', api.routes());