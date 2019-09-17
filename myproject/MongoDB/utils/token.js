// 第三方工具
const jwt = require('jsonwebtoken');
const secret = "data";

// token 创建
function create(data, expiresIn = 60 * 60 * 24) {
    let token = jwt.sign({
        data
    }, secret, {
        // secret加密的密钥
        // data加密的数据
        // expiresIn：有效期(单位：s)
        expiresIn
    });
    return token;
}

// token 校验
function verify(token) {
    let res = false;
    try {
        res = jwt.verify(token, secret);

    } catch (err) {
        res = false
    }
    return res;
}
module.exports = {
    create,
    verify
}