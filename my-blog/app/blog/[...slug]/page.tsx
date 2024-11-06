import PostLayout from "@/layout/PostLayout"
import { allBlogs, Blog, allAuthors, Author } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { MDXLayoutRenderer } from "pliny/mdx-components.js"
import { coreContent,allCoreContent, sortPosts } from "pliny/utils/contentlayer.js"
export default async function Page({params}: {params:{slug: string[]}}){
    const slug = decodeURI(params.slug.join('/'))

    const sortedCoreContents = allCoreContent(sortPosts(allBlogs));
    const postIndex = sortedCoreContents.findIndex((p)=>p.slug === slug);
    if (postIndex === -1) {
        return notFound()
    }

    const prev = sortedCoreContents[postIndex - 1];
    const next = sortedCoreContents[postIndex + 1];
    const post = allBlogs.find((p) => p.slug === slug) as Blog
    const mainContent = coreContent(post)
    const authorList = post?.authors;
    const authorDetails = authorList && authorList.map((author) => {
        const result = allAuthors.find((p) => p.slug === author)
        return coreContent(result as Author)
    })
    return(
        <>
            <PostLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
                <MDXLayoutRenderer code={post.body.code}></MDXLayoutRenderer>
            </PostLayout>
        </>
    )
}