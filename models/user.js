const mongoose = require('../config/conn_mogodb');

const Schema = new mongoose.Schema({
    reg_account: {
        type: String,
        unique: true
    },
    user_name: {
        type: String,
        unique: true
    },
    real_name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    sex: {
        type: String,
        unique: true,
        default: '男'
    },
    phone: {
        type: Number,
        unique: true
    },
    e_mail: {
        type: String,
        unique: true
    },
    lastdata: {
        type: Date,
        unique: true,
    },
    join_time: {
        type: Date,
        unique: true
    },
    intro_self: {
        type: String,
        unique: true
    },
    icon_url: {
        type: String,
        unique: true
    },
})

module.exports = User = mongoose.model('login_admin', Schema, 'login_admin');