/* eslint-disable @typescript-eslint/no-unused-vars */
import { Blog } from "contentlayer/generated"
import { CoreContent } from "pliny/utils/contentlayer.js"

interface PaginationProps {
    totalPages: number
    currentPage: number
}
interface ListLayoutProps {
    posts: CoreContent<Blog>[]
    title: string
    initialDisplayPosts?: CoreContent<Blog>[]
    pagination?: PaginationProps
}

export default function ListLayout({posts,title,initialDisplayPosts = [], pagination}:ListLayoutProps){
    return(
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="spase-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">{title}</h1>
                </div>
            </div>
        </>
    )
}