const Controller = require('egg').Controller;
class HomeController extends Controller {
    async addBlog() {
        // 添加
        let { ctx, app, service } = this;
        let res = await service.blog.addBlog()
        // affectedRows 受影响的行数
        if (res.affectedRows >= 1) {
            this.ctx.body = {
                success: true,
                message: "新建成功"
            }
        } else {
            this.ctx.body = {
                success: false,
                message: "新建失败"
            }
        }

    }
    async getBlog() {
        // 获取
        let { ctx, app, service } = this;
        let res = await service.blog.getBlog()
        ctx.body = {
            success: true,
            message: "成功",
            data: res
        };
    }
    // 编辑博客
    async editBlog() {
        let { ctx, app, service } = this;
        let res = await service.blog.editBlog()
        if (res.affectedRows >= 1) {
            this.ctx.body = {
                success: true,
                message: "编辑成功"
            }
        } else {
            this.ctx.body = {
                success: false,
                message: "编辑失败"
            }
        }
    }
    // 删除博客
    async delBlog() {
        let { ctx, app, service } = this;
        let res = await service.blog.editBlog()
        if (res.affectedRows >= 1) {
            this.ctx.body = {
                success: true,
                message: "删除成功"
            }
        } else {
            this.ctx.body = {
                success: false,
                message: "删除失败"
            }
        }
    }
    async getBlogDetail() {
        let { ctx, app } = this;
        let { id } = ctx.params;
        let res = await app.mysql.get('blogs', { id })
        // let res = await app.mysql.query(`select * from blogs where id=${id}`)
        ctx.body = {
            success: true,
            data: res
        }
    }
    async comment() {
        let { ctx, app, service } = this;
        let res = await service.blog.comment()
        if (res.affectedRows >= 1) {
            ctx.body = {
                success: true,
                message: "评论成功"
            }
        } else {
            ctx.body = {
                success: false,
                message: "评论失败"
            }
        }
    }
    async getComment() {
        let { ctx, app, service } = this;
        let res = await service.blog.getComment()
        ctx.body = {
            success: true,
            message: "获取评论成功",
            data: res,
        }
    }

}

module.exports = HomeController