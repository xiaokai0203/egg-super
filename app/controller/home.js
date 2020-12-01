const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index() {
        this.ctx.response.body = 'hello'
    }
}

module.exports = HomeController


// 用法
// queryString 怎么取  ?id=1&name=kkk
// console.log(this.ctx.query)
// let { id, name } = this.ctx.query;

// params   /1/kkk   /:id/:name
// console.log(this.ctx.params)

// body 
// ctx.request 请求头 嫁妆
// ctx.response 响应头
// console.log(this.ctx.request.body)



// 应用场景
// query 一般应用在 get中 用来请求数据 可以放一些不敏感或者比较短的数据   url有长度限制
// params   一般需要指向特定资源的时候 用params
// body   比较大的数据 或者比较私密的数据  它比较安全

// get => query or params
// post => body
// put => body
// delete =>  params