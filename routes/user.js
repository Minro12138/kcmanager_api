const router = require('koa-router')();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');

const confin_keys = require("../config/key")

const koaBody = require('koa-body')({
    multipart: true, // 允许上传多个文件
    formidable: {
        // uploadDir: 'public/images/headImage',// 上传的文件存储的路径 
        keepExtensions: true //  保存图片的扩展名
    }
});

const User = require('../models/user');
const keys = require('../config/key')

router.post('/login', async ctx => {
    console.log('请求' + new Date());

    let userInfo = ctx.request.body;

    //从数据库中获取用户账号密码以验证
    let result = await User.find({
        reg_account: ctx.request.body.user_name
    });
    if (result.length > 0) {

        //验证密码
        let verification = await bcrypt.compareSync(userInfo.password, result[0].password);

        if (verification) {

            //返回token
            const payload = {
                id: result[0].id,
                name: result[0].user_name
            };

            const token = jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 60 * 60 * 24 * 7
            });

            let lastdata = new Date();
            lastdata.setMinutes(lastdata.getMinutes() - lastdata.getTimezoneOffset());

            //将最后登录时间更新到数据库
            await User.findByIdAndUpdate(result[0].id, {
                lastdata: lastdata.toISOString()
            }, {
                seFindAndModify: true
            }, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                ctx.status = 200;
                ctx.body = {
                    status_code: 200,
                    msg: '登录成功！',
                    success: true,
                    token: 'Bearer ' + token,
                    "sex": result[0].sex,
                    "_id": result[0]._id,
                    "reg_account": result[0].reg_account,
                    "user_name": result[0].user_name,
                    "real_name": result[0].real_name,
                    "phone": result[0].phone,
                    "e_mail": result[0].e_mail,
                    "lastdata": result[0].lastdata,
                    "join_time": result[0].join_time,
                    "intro_self": result[0].intro_self,
                    "icon_url": result[0].icon_url
                }
            });
        } else {
            ctx.status = 400;
            ctx.body = {
                status_code: 400,
                msg: '密码错误！'
            }
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            status_code: 404,
            msg: '用户不存在！'
        }
    }
})

router.post('/current', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    ctx.body = {
        "sex": ctx.state.user.sex,
        "_id": ctx.state.user._id,
        "reg_account": ctx.state.user.reg_account,
        "user_name": ctx.state.user.user_name,
        "real_name": ctx.state.user.real_name,
        "phone": ctx.state.user.phone,
        "e_mail": ctx.state.user.e_mail,
        "lastdata": ctx.state.user.lastdata,
    }
})

router.post('/edit', koaBody, passport.authenticate('jwt', {
    session: false
}), async ctx => {
    console.log('修改个人信息：', ctx.request.body);
    let user_info = ctx.request.body;
    console.log('文件：', ctx.request.files)
    // const form = formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.parse(ctx.request, await
    //     function (err, fields, files) {
    //         console.log(fields);
    //         console.log(err);
    //     })
    const file = ctx.request.files.icon_url; // 获取上传文件
    // 创建可读流
    console.log('file：', file)
    console.log(process.cwd());
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(process.cwd(), '/public/upload/') + `${file.name}`;
    // 创建可写流
    console.log('头像在：', filePath);
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    await User.update({
        user_name: user_info.user_name
    }, {
        real_name: user_info.real_name,
        sex: user_info.sex,
        e_mail: user_info.e_mail,
        intro_self: user_info.intro_self,
        icon_url: confin_keys.img_url+ file.name
    }, (err, res) => {
        if (err) {
            console.log('错误', err);
            ctx.status = 401;
            ctx.body = {
                status_code: 401,
                msg: '保存失败！'
            }
            return;
        }
        ctx.status = 200;
        ctx.body = {
            status_code: 200,
            msg: '保存成功！'
        }
    })
})

module.exports = router.routes();