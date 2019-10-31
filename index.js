const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const static = require('koa-static')
const path = require('path');

const routes = require('./routes/router')

require('./config/conn_mogodb');
const app = new Koa();

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
console.log(__dirname);
app.use(static(path.join(__dirname + '/public/upload')));
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

require('./config/passport')(passport);

router.get('/', async (ctx) => {
    ctx.body = '服务器运行中！'
})

router.use(routes);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`服务器已启动，端口为${port}`);
})