const url = {
  client: {
    getTag: "/api/v1/tag",
    signIn: "/api/v1/auth/sign-in",
    signUp: "/api/v1/auth/sign-up",
    signOut: "/api/v1/auth/sign-out",
    GetLike: "/api/v1/global/blog/like/", // one parameter : blog_id
    GetLikeStatus: "/api/v1/blog/like/status?", // two query parameter : username , blogId // need auth
    DeleteLike: "/api/v1/blog/like/", // one parameter : blog_id // need auth
    CreateLike: "/api/v1/blog/like/", // one parameter : blog_id // need auth
    CreateBlog: "/api/v1/blog", // need auth
    UpdateBlog: "/api/v1/blog/", // need auth
    GetBlogById: "/api/v1/global/blog/", // one parameter : blog_id
    GetUsers: "/api/v1/global/users",
  },
  server: {
    getUser: "http://localhost:7070/v1/user", // need auth
    getTag: "http://localhost:7070/v1/tag",
    getBlog: "http://localhost:7070/v1/global/blog?", // 2 query parameter : username, tag_id
    getUserBlogs: "http://localhost:7070/v1/global/blog",
    GetBlogById: "http://localhost:7070/v1/global/blog/", // one parameter : blog_id
    DeleteBlogById: "http://localhost:7070/v1/blog/", // one parameter : blog_id
    GetBlogByLike: "http://localhost:7070/v1/blog/like", // need auth
  },
};

export default url;
