import ProjectLayout from "@/layout/ProjectLayout"
import { allProjects, Project, allAuthors, Author } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { MDXLayoutRenderer } from "pliny/mdx-components.js"
import { coreContent,allCoreContent, sortPosts } from "pliny/utils/contentlayer.js"

export default async function Page({params}: {params:{slug: string[]}}){
    const slug = decodeURI(params.slug.join('/'))

    const CoreContents = allCoreContent(allProjects);
    const postIndex = CoreContents.findIndex((p)=>p.slug === slug);
    if (postIndex === -1) {
        return notFound()
    }

    const prev = CoreContents[postIndex - 1];
    const next = CoreContents[postIndex + 1];
    const post = allProjects.find((p) => p.slug === slug) as Project
    const mainContent = coreContent(post)
    const authorList = post?.authors;
    const authorDetails = authorList && authorList.map((author) => {
        const result = allAuthors.find((p) => p.slug === author)
        return coreContent(result as Author)
    })
    return(
        <>
            <ProjectLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
                <MDXLayoutRenderer code={post.body.code}></MDXLayoutRenderer>
            </ProjectLayout>
        </>
    )
}