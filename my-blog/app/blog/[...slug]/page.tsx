import PostLayout from "@/layout/PostLayout"
import { allBlogs, Blog, allAuthors, Author } from "contentlayer/generated"
import { MDXLayoutRenderer } from "pliny/mdx-components.js"
import { coreContent } from "pliny/utils/contentlayer.js"
export default async function Page({params}: {params:{slug: string[]}}){
    const slug = decodeURI(params.slug.join('/'))
    const post = allBlogs.find((p) => p.slug === slug) as Blog
    const mainContent = coreContent(post)
    const authorList = post?.authors;
    const authorDetails = authorList && authorList.map((author) => {
        const result = allAuthors.find((p) => p.slug === author)
        return coreContent(result as Author)
    })
    return(
        <>
            <PostLayout content={mainContent} authorDetails={authorDetails}>
                <MDXLayoutRenderer code={post.body.code}></MDXLayoutRenderer>
            </PostLayout>
        </>
    )
}