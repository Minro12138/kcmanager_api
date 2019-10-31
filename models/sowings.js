const mongoose = require('../config/conn_mogodb');

const sowingsSchema = new mongoose.Schema({
    'image_title': {
        type: String,
        unique: true
    },
    'image_url': {
        type: String,
        unique: true
    },
    'image_small_url': {
        type: String,
        unique: true
    },
    'image_link': {
        type: String,
        unique: true
    },
    's_time': {
        type: Date,
        unique: true
    },
    'e_time': {
        type: Date,
        unique: true
    },
    'l_time': {
        type: Date,
        unique: true
    },
})

module.exports = Sowings = mongoose.model('sowing', sowingsSchema);