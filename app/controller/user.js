const Controller = require('egg').Controller;
const { md5 } = require('utility')
const jwt = require('jsonwebtoken')
class UserController extends Controller {
    async register() {
        // ctx => 请求体 响应体
        // app => app.mysql app.config.keys
        let { ctx, app } = this
        // 注册流程
        // 1. 获取数据
        let { username, password, nickname } = ctx.request.body;
        // 2. 判断username 有没有重复
        let haveUser = await app.mysql.query(`select * from users where username="${username}"`)
        if (haveUser.length) {
            ctx.body = {
                success: false,
                message: '账号已存在'
            }
        } else {
            let res = await app.mysql.query(`insert into users(nickname,username,password) values("${nickname}","${username}","${md5(String(password))}")`)
            ctx.body = {
                success: true,
                message: "注册成功"
            }
        }
    }
    async login() {
        let { ctx, app } = this
        let { username, password } = ctx.request.body;
        // 去数据库比对
        let res = await app.mysql.query(`select * from users where username="${username}" and password="${md5(String(password))}"`)
        if (res.length) {
            ctx.body = {
                success: true,
                message: "登录成功",
                data: {
                    token: jwt.sign({ id: res[0].id }, app.config.keys)// 判断是否登录 判断你是谁
                }
            }
        } else {
            ctx.body = {
                success: false,
                message: "登录失败"
            }
        }
    }
    async getUser() {
        console.log(this.ctx.params)
        this.ctx.body = await this.app.mysql.query('select * from users')
    }
}

module.exports = UserController