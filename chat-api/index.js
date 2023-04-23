import express from 'express'
import sql from './sql/sql.js'
import tools from "./tools/tools.js";
import multer from 'multer'
import fs from 'fs'

const app = express()
import bodyParser from 'body-parser'

import Room from "./sql/room/room.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')

    next();
});

app.get("/", (request, response) => {
    response.send(`系统正在升级请稍后再试！`)
})
// 添加反馈
app.post('/add', (request, response) => {

    response.json({
        code: 502,
        errMsg: "系统内部错误",
        data: res,
    })
})
// 查列表
app.get('/select', (request, response) => {

})

app.post('/login', (request, response) => {
    sql(`SELECT passwd,nickName,id from user where user = '${request.body.user}'`).then(res => {
        if (res[0]?.passwd === request.body.passwd) {
            console.log(res)
            response.json({
                code: 'success',
                msg: "登录成功",
                data: {key: 'thepasswordisreal', user: res[0].nickName, id: res[0].id}
            })
        } else {
            response.json({
                code: 'noSuccess',
                msg: "密码错误"
            })
        }
    }).catch(res => {
        console.log(res)
        response.json({
            code: 502,
            errMsg: "系统内部错误"
        })
    })

})

app.post('/register', (request, response) => {
    sql(`SELECT user from user where user = '${request.body.user}'`).then(res => {
        if (res[0]?.user) {
            response.json({
                code: 'error',
                msg: "userIsRegistered",
            })
        } else {
            sql(`INSERT INTO user (nickName,user, passwd,creatTime) 
VALUES ('${request.body.nickName}','${request.body.user}', '${request.body.passwd}','${tools.formatDate((new Date()).getTime())}')`).then(res => {
                console.log(res)
                response.json({
                    code: 'success',
                    msg: "注册成功",
                })
            }).catch(err => {
                console.log(err)
                response.json({
                    code: 'error',
                    errMsg: "系统内部错误"
                })
            })
        }
    }).catch(res => {
        console.log(res)
        response.json({
            code: 'error',
            errMsg: "系统内部错误"
        })
    })
})

/**
 * 创建或加入房间
 * flag:1创建，2加入
 * name:创建房间的名称
 * roomId:加入房间的id
 */
app.post('/creatAddRoom', (request, response) => {
    switch (request.body.flag) {
        case 0:
            Room.createRoom({name: request.body.name, userId: request.body.id}).then(res => {
                response.json({
                    code: 'success',
                    data: {
                        roomId: res[0].roomId,
                        roomName: res[0].roomName
                    }
                })
            }).catch(res => {
                console.warn(res)
                response.json({
                    code: 'noSuccess',
                })
            })
            break
        case 1:
            Room.joinRoom({name: request.body.name, id: request.body.id}).then(res => {
                response.json({
                    code: 'success',
                    msg: '加入成功',
                    data: res
                })
            }).catch((e) => {
                console.log(e)
                response.json({
                    code: 'noSuccess',
                    msg: '房间不存在'
                })
            })
            break
    }
})

app.get('/getRoomList', (request, response) => {
    Room.getRoomList(request.query).then(res => {
        console.log(res)
        response.json({
            code: 'success',
            data: {
                res
            }
        })
    }).catch(err => {
        response.json({
            code: 'noSuccess',
            data: {
                err
            }
        })
    })
})


app.listen(8001, () => {
    console.log("服务已经启动，8001端口监听中...")
})

