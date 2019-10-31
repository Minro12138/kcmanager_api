const router = require('koa-router')();
const passport = require('koa-passport');

const Home = require('../models/home');

router.get('/homelist', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    console.time('time');
    await Home.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            ctx.response.body = {
                status_code: 400,
                msg: '查询失败！'
            }
        }
        ctx.response.body = {
            status_code: 200,
            result: docs[0]
        }
        console.timeEnd('time');
    });

})

module.exports = router.routes();