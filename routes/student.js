const router = require('koa-router')();
const passport = require('koa-passport');

const Student = require('../models/student');


//查询学生列表
router.get('/studentlist', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    await Student.find({}, function (err, docs) {
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

module.exports = router.routes();