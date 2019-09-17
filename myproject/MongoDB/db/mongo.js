const mongodb = require("mongodb");
const { DBurl, DBname } = require("../config.json");

//获取客户端信息
const { MongoClient, ObjectId } = mongodb;
const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DBurl, async (err, client) => {
            // client：连接数据库的客户端
            if (err) throw err;
            let db = client.db(DBname);
            resolve({ client, db });
        })
    })
}

//增加
exports.insert = async (colName, data) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);//colName为表名（没有就自动创建）,使用这个表
    let result = await collection.insertOne(data);
    client.close();
    return result;
}

//删除
exports.remove = async (colName, query) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    if (query._id) {
        query._id = ObjectId(query._id);
    }
    collection.deleteMany(query);
    client.close();
}

//查找
exports.find = async (colName, query = {}, { sort, limit, skip, asc } = {}) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);

    if (query._id) {
        query._id = ObjectId(query._id);
    }
    if (query.name) {
        query.name = new RegExp(query.name);
    }

    let result = collection.find(query);//查询到全部的结果
    // console.log("=========", query);

    //筛选
    if (sort) {
        let opt = {};
        opt[sort] = asc ? 1 : -1;
        result = result.sort(opt);
    }
    if (limit) {
        limit = Number(limit);
        result = result.limit(limit);
    }
    if (skip) { //跳过指定的数量
        result = result.skip(skip);
    }
    let data = await result.toArray();

    client.close();
    return data;
}

//修改
exports.update = async (colName, query, data) => {
    let { db, client } = await connect();
    let collection = db.collection(colName);
    if (query._id) {
        query._id = ObjectId(query._id);
    }
    collection.updateMany(query, { $set: data });
    client.close();
}