import ListLayoutWithTags from "@/layout/ListLayoutWithTags";
import { allBlogs } from "contentlayer/generated";
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";

export default function TagPage({params}:{params:{tag:string}}){
    const tag = decodeURI(params.tag)
    const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
    const filteredPosts = allCoreContent(
        sortPosts(allBlogs.filter((blog)=> blog.tags && blog.tags.map((tag)=> slug(tag)).includes(tag)))
    )
    return <ListLayoutWithTags posts={filteredPosts} title={title}></ListLayoutWithTags>
}