const mongoose = require('../config/conn_mogodb');

const categorysSchema = new mongoose.Schema({
    'main_title': {
        type: String,
        unique: true
    },
    'main_total_count': {
        type: Number,
        unique: true
    },
    'main_is_show': {
        type: Number,
        unique: true
    },
    'main_sort': {
        type: Number,
        unique: true
    },
    'sub_course': {
        type: Array,
        unique: true
    }
})

module.exports = Categorys = mongoose.model('categorys', categorysSchema);