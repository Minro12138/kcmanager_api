const mongoose = require('../config/conn_mogodb');

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        unique: true
    },
    course_title: {
        type: String,
        unique: true
    },
    course_sub_title: {
        type: String,
        unique: true
    },
    course_teacher: {
        type: String,
        unique: true
    },
    course_serialize_status: {
        type: Number,
        unique: true
    },
    main_category: {
        type: String,
        unique: true
    },
    sub_category: {
        type: String,
        unique: true
    },
    course_intro: {
        type: String,
        unique: true
    },
    course_tag: {
        type: String,
        unique: true
    },
    course_page: {
        type: String,
        unique: true
    },
    course_page_url: {
        type: Object,
        unique: true
    },
    course_manager: {
        type: Array,
        unique: true
    },
})

module.exports = Course = mongoose.model('course', courseSchema);