const express = require('express');
const Router = express.Router();
const { insert, remove, find, update } = require("../db/mongo");
const { formatData } = require("../utils");

//增加:商品
Router.post("/", (req, res) => {

    let { name, price, classify } = req.body;
    if (price) {
        price = Number(price);
    }
    try {
        insert("goods", { name, price, classify });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
})
//删除
Router.delete("/:id", (req, res) => {
    let { id } = req.params;
    try {
        remove("goods", { _id: id });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
})

//查询
Router.get("/select", async (req, res) => {
    let { _id, classify, searchtext } = req.query;

    if (_id) {
        
        try {
            let data = await find("goods", { _id }, {});
            res.send(formatData({ data }));
        } catch{
            res.send(formatData({ code: 0 }));
        }
    } else if (classify) {
        try {
            let data = await find("goods", { classify }, {});
            res.send(formatData({ data }));
        } catch{
            res.send(formatData({ code: 0 }));
        }
    } else if (searchtext) {    //选择性查询
        try {
            let data = await find("goods", { "name": searchtext }, {});
            res.send(formatData({ data }));
        } catch{
            res.send(formatData({ code: 0 }));
        }
    } else {
        res.send(formatData({ code: 0 }));
    }
})


//修改
Router.patch("/", async (req, res) => {
    let { _id, name, price, classify } = req.body;
    if (price) {
        price = Number(price);
    }
    // console.log("--------------", [{ _id, name, price, classify }]);

    try {
        let data = await update("goods", { _id }, { name, price, classify });
        res.send(formatData({ data }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
})
module.exports = Router;