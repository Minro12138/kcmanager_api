const router = require('koa-router')();
const passport = require('koa-passport');

const Sowings = require('../models/sowings');

router.get('/sowinglist', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    await Sowings.find({}, function (err, docs) {
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