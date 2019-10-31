const router = require('koa-router')();
const passport = require('koa-passport');

const Course = require('../models/course');

//获取所有课程
router.get('/courselist', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    await Course.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            ctx.response.body = {
                status_code: 400,
                msg: '查询失败！'
            }
        }

        ctx.response.body = {
            status_code: 200,
            result: docs
        }
    })
})

//增加课程
router.post('/addcourse', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
})

module.exports = router.routes();