const router = require('koa-router')();

const user = require('./user')
const home = require('./home')
const student = require('./student')
const course = require('./course')
const categorys = require('./categorys')
const sowings = require('./sowing')

router.use('/user', user);
router.use('/home', home);
router.use('/student', student);
router.use('/course', course);
router.use('/categorys', categorys);
router.use('/sowing',sowings)

module.exports = router.routes();