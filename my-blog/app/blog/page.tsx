import ListLayoutWithTags from "@/layout/ListLayoutWithTags";
import { allBlogs } from "contentlayer/generated";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";

const POSTS_PER_PAGE = 5
export default function BlogPage(){
    const posts = allCoreContent(sortPosts(allBlogs))
    const pageNumber = 1
    const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber -1), POSTS_PER_PAGE * pageNumber)
    const pagination = {
        currentPage:pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
    }

    return (
        <ListLayoutWithTags posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} title="All Blogs"></ListLayoutWithTags>
    )
}