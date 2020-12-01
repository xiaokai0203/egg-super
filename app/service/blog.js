const Service = require('egg').Service;

class BlogService extends Service {
    async addBlog() {
        let { ctx, app } = this;
        let { blog_title, blog_content, author, author_id } = ctx.request.body;
        // 直接执行sql
        let sql = `insert into blogs(blog_title,blog_content,author,author_id,create_time) values("${blog_title}", "${blog_content}","${author}","${author_id}","${Date.now()}")`
        let res = await app.mysql.query(sql);
        // 使用egg-mysql 提供的crud语句
        // let res  = await app.mysql.insert("blogs", { ...ctx.request.body, create_time: Date.now() })
        return res;
    }
    async getBlog() {
        let { ctx, app } = this;
        // 功能分页 模糊搜索 条件查询
        let { pageIndex, pageSize, keyword, author_id } = ctx.query;
        let sql = `select * from blogs where 1 `
        // 模糊查询
        if (keyword) {
            sql += `and blog_title like "%${keyword}%" `
        }
        // 条件查询
        if (author_id) {
            sql += `and author_id="${author_id}" `
        }
        if (pageIndex && pageSize) {
            sql += `limit ${(pageIndex - 1) * pageSize},${pageSize} `
        }
        let res = await app.mysql.query(sql)
        // 获取总数的sql
        let totalSql = `select count(id) as total from blogs`
        // 执行sql获取 数据库blgos里的总条数
        let totalRes = await app.mysql.query(totalSql);
        return {
            list: res,
            total: totalRes[0].total, // 提供给前端分页器 计算总页数（数量除以每页条数）
        }
        // 为什么这里不用crud语句
        // 因为select只支持 and 和 in 不支持模糊查询和or语法
        // 具体详见官网
    }
    // 编辑博客
    async editBlog() {
        let { ctx, app } = this;
        let { id, blog_title, blog_content } = ctx.request.body;
        let sql = `update blogs set blog_title="${blog_title}",blog_content="${blog_content}" where id=${id}`
        let res = await app.mysql.query(sql)
        return res
    }
    // 删除博客
    async delBlog() {
        let { ctx, app } = this;
        let { id } = ctx.params

        // let sql = `delete from blogs where id=${id}`
        // let res = await app.mysql.query(sql)

        let res = await app.mysql.delete("blogs", { id: id, })
        return res
    }
    // 评论博客
    async comment() {
        let { ctx, app } = this;
        let { article_id, user_id, com_content, parent_id, com_reply } = ctx.request.body;
        let res = await app.mysql.insert("comments", {
            article_id,
            user_id,
            com_content,
            parent_id,
            com_reply,
            com_create_time: Date.now(),
            com_like_count: 0
        })
        return res;
    }
    // 获取文章评论
    async getComment() {
        let { ctx, app } = this;
        let { article_id } = ctx.query;
        let res = await app.mysql.select('comments', { article_id })
        // 循环创建promise
        let pList = res.map((item, index) => {
            return new Promise(async (reslove, reject) => {
                let { nickname } = await app.mysql.get('users', { id: item.user_id })
                res[index]['nickname'] = nickname
                reslove(nickname)
            })
        })
        // 等prmoise全部执行完毕后再return 
        await Promise.all(pList)
        return res
    }
}

module.exports = BlogService;
