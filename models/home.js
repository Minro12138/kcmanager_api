const mongoose = require('../config/conn_mogodb');

const homeSchema = new mongoose.Schema({
    // 登录用户数
    login_user: {
        type: Number,
        required: true
    },
    // 新增注册数
    new_register: {
        type: Number,
        required: true
    },
    // 课程新增学员
    new_stu_course: {
        type: Number,
        required: true
    },
    // 班级新增学员
    new_stu_classes: {
        type: Number,
        required: true
    },
    // 新增会员
    new_member: {
        type: Number,
        required: true
    },
    // 未回复问答
    not_reply: {
        type: Number,
        required: true
    },
    // 订单统计
    order_counter: {
        type: Object,
        require: true
    },
    // 当前编辑的时间
    c_time: {
        type: Date,
        default: Date.now
    },
    // 最后编辑时间
    l_time: {
        type: Date,
        default: Date.now
    },
});

const Home = mongoose.model('home', homeSchema, 'home');
module.exports = Home;