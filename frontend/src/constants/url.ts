const url = {
    client : {
        getTag: "/api/server/v1/tag",
        signIn: "/api/server/v1/auth/sign-in",
        signUp: "/api/server/v1/auth/sign-up",
        GetLike: "/api/server/v1/blog/like/", // one parameter : blog_id
        GetLikeStatus: "/api/server/v1/blog/like/status", // two query parameter : username , blogId
        CreateBlog: "/api/server/v1/blog"
    }, 
    server : {
        getUser: "http://localhost:7070/v1/user",
        getTag: "http://localhost:7070/v1/tag",
        getBlog: "http://localhost:7070/v1/blog",
        getUserBlogs: "http://localhost:7070/v1/blog"
    }
}

export default url