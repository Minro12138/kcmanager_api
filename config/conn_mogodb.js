const mongoose = require('mongoose');
const config = require('./key');

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接成功!')
}).catch(err => {
    console.log(err);
})

module.exports = mongoose;