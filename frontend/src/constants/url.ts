const url = {
    client : {
        getTag: "/api/v1/tag",
        signIn: "/api/v1/auth/sign-in",
        signUp: "/api/v1/auth/sign-up",
        GetLike: "/api/v1/global/blog/like/", // one parameter : blog_id
        GetLikeStatus: "/api/v1/blog/like/status?", // two query parameter : username , blogId
        DeleteLike: "api/v1/blog/like/", // one parameter : blog_id
        CreateLike: "api/v1/blog/like/", // one parameter : blog_id
        CreateBlog: "/api/v1/blog",
        UpdateBlog: "/api/v1/blog/",
        GetBlogById: "/api/v1/global/blog/" // one parameter : blog_id
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