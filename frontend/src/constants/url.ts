const url = {
    client : {
        getTag: "/api/server/v1/tag",
        signIn: "/api/server/v1/auth/sign-in",
        signUp: "/api/server/v1/auth/sign-up",
        GetLike: "/api/server/v1/global/blog/like/", // one parameter : blog_id
        GetLikeStatus: "/api/server/v1/blog/like/status?", // two query parameter : username , blogId
        DeleteLike: "api/server/v1/blog/like/", // one parameter : blog_id
        CreateLike: "api/server/v1/blog/like/", // one parameter : blog_id
        CreateBlog: "/api/server/v1/blog",
        UpdateBlog: "/api/server/v1/blog/",
        GetBlogById: "/api/server/v1/global/blog/" // one parameter : blog_id
    }, 
    server : {
        getUser: "http://localhost:7070/v1/user",
        getTag: "http://localhost:7070/v1/tag",
        getBlog: "http://localhost:7070/v1/global/blog?", // 2 query parameter : username, tag_id
        getUserBlogs: "http://localhost:7070/v1/global/blog",
        GetBlogById: "http://localhost:7070/v1/global/blog/", // one parameter : blog_id
        DeleteBlogById: "http://localhost:7070/v1/blog/" // one parameter : blog_id
    }
}

export default url