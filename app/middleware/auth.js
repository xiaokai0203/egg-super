const jwt = require('jsonwebtoken')
module.exports = () => {
    return async function auth(ctx, next) {
        // 我是一个网管，我要看看你有没有带身份证
        let { authorization } = ctx.request.headers; // 从header里取出来
        console.log(authorization, 1)
        if (authorization) {
            // 看看你身份证的真假
            let token = authorization.replace("Bearer ", '')
            console.log(token, 2)
            try {
                // 使用try 一旦报错会被捕获
                // app 这里没有app
                // app 还存在 于ctx上
                let user = jwt.verify(token, ctx.app.config.keys) // 一旦token为假或者过期 都会报错
                console.log(user, 3)
                await next();// next 是异步所以加await
            } catch (err) {
                // 报错会被捕获
                ctx.status = 401;
                ctx.body = err.message
            }
        } else {
            ctx.status = 401;
            ctx.body = '滚特么一边去'
        }
    }
}