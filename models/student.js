const mongoose = require('../config/conn_mogodb');

const studentSchema = new mongoose.Schema({
    reg_account: {
        type: String,
        unique: true
    },
    user_name: {
        type: String,
        unique: true
    },
    user_age: {
        type: Number,
        unique: true
    },
    user_sex: {
        type: String,
        unique: true
    },
    area: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    points: {
        type: Number,
        unique: true
    },
    reg_time: {
        type: Date,
        unique: true
    },
    last_login_time: {
        type: Date,
        unique: true
    },
});

module.exports = Student = mongoose.model('student', studentSchema);