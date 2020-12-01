module.exports = (app) => {
    // app appliction 跟实例对象 全局只有一个
    let { router, controller, middleware } = app;
    // 注册
    router.post("/register", controller.user.register)
    // 登录
    router.post("/login", controller.user.login)

    // 随便写个接口演示一些
    router.get("/users/:id/:name", middleware.auth(), controller.user.getUser)



    // 创建博客
    router.post("/blog", controller.blog.addBlog)
    // 获取博客
    router.get("/blog", controller.blog.getBlog)
    // 编辑博客  自己做
    router.put('/blog', controller.blog.editBlog)
    // 删除博客
    router.delete("/blog/:id", controller.blog.delBlog)


    // 文章详情
    router.get('/blog/:id', controller.blog.getBlogDetail)

    // 文章评论
    router.post('/comment', controller.blog.comment)
    // 获取评论
    router.get('/comment', controller.blog.getComment)




    // 文章点赞

    // 评论点赞



}


