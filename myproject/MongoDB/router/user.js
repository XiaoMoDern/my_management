const express = require('express');
const Router = express.Router();
const {
    insert,
    remove,
    find,
    update
} = require("../db/mongo");
const {
    formatData,
    token
} = require("../utils");

//增加:注册
Router.post("/reg", (req, res) => {

    let {
        username,
        password
    } = req.body;
    try {
        insert("user", {
            username,
            password
        });

        res.send(formatData());
    } catch (err) {
        res.send(formatData({
            code: 0
        }));
    }
})
//删除
Router.delete("/:username", (req, res) => {
    let {
        username
    } = req.params;
    try {
        remove("user", {
            username
        });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({
            code: 0
        }));
    }
})

//查找：登录
Router.post("/login", async (req, res) => {
    let {
        username,
        password
    } = req.body;
    try {
        // 查看
        let data = await find("user", {
            username,
            password
        });
        data = data[0];
        //生成token 返回前端
        let authorization = token.create(username);
        if (data) {
            res.send(formatData({
                data: {
                    username,
                    loginStatus: 1,
                    authorization
                }
            }));
        } else {
            res.send(formatData({
                data: {
                    username,
                    loginStatus: 0
                }
            }));
        }
    } catch {
        res.send(formatData({
            code: 0
        }));
    }
})

//注册查找：用户名是否存在
Router.get("/check", async (req, res) => {

    let {
        username
    } = req.query;
    try {
        let data = await find("user", {
            username
        });
        if (data) {
            return res.send(formatData({
                code: 0
            }));
        } else {
            res.send(formatData({
                data
            }));
        }
        // res.send(formatData({
        //     data
        // }));
    } catch (err) {
        res.send(formatData({
            code: 0
        }));
    }
})


//修改
Router.patch("/", async (req, res) => {
    let {
        username,
        password
    } = req.body;

    try {
        let data = await update("user", {
            username
        }, {
            password
        });

        res.send(formatData({
            data
        }));
    } catch (err) {
        res.send(formatData({
            code: 0
        }));
    }
})

//鉴权
Router.get("/verify", (req, res) => {
    let authorization = req.header("Authorization");
    let result = token.verify(authorization);
    if (result) {
        res.send(formatData({
            data: {
                authorization: true
            }
        }))
    } else {
        res.send(formatData({
            code: 0,
            data: {
                authorization: false
            }
        }))
    }
})
module.exports = Router;