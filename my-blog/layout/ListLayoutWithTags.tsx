'use client'

import { Blog } from "contentlayer/generated"
import { CoreContent } from "pliny/utils/contentlayer.js"
import Link from '@/components/Link'
import { usePathname } from 'next/navigation'
import tagData from 'app/tag-data.json'
import { slug } from 'github-slugger'
import { formatDate } from "pliny/utils/formatDate.js"
import siteMetadata from "@/data/siteMetadata"
import Tag from "@/components/Tag"

interface PaginationProps {
    totalPages: number
    currentPage: number
  }

interface ListLayoutWithTagsProps{
    posts: CoreContent<Blog>[]
    title: string
    initialDisplayPosts?: CoreContent<Blog>[]
    pagination?: PaginationProps
}

export default function ListLayoutWithTags({
    posts,
    title,
    initialDisplayPosts = [],
    pagination,
}: ListLayoutWithTagsProps){
    const pathname = usePathname()
    const tagCounts = tagData as Record<string, number>
    const tagKeys = Object.keys(tagCounts)
    const sortedTags = tagKeys.sort((a,b)=>tagCounts[b] - tagCounts[a])

    const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
    return (
        <>
            <div>
                <div className="pb-6 pt-6">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">{title}</h1>
                </div>
                <div className="flex sm:space-x-24">
                    <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
                        <div className="px-6 py-4">
                            {pathname.startsWith('/blog') ? (
                                <h3 className="font-bold uppercase text-primary-500">ALL Blogs</h3>
                            ) : (
                                <Link href={`/blog`} className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500">
                                    All Blogs
                                </Link>
                            )}
                            <ul>
                                {sortedTags.map((tag)=>{
                                    return (
                                        <li key={tag} className="my-3">
                                            {decodeURI(pathname.split('/tags/')[1]) === slug(tag) ? (
                                                <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                                                    {`${tag}(${tagCounts[tag]})`}
                                                </h3>
                                            ):(
                                                <Link
                                                    href={`/tags/${slug(tag)}`}
                                                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                                                    aria-label={`View posts tagged ${tag}`}
                                                >{`${tag}(${tagCounts[tag]})`}</Link>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        
                    </div>
                    <div>
                        <ul>
                            {displayPosts.map((post)=>{
                                const { path, date, title, summary, tags } = post
                                return(
                                    <li key={path} className="py-5 divide-gray-200 dark:divide-gray-700">
                                        <article className="flex flex-col space-y-2 xl:space-y-0">
                                            <dl>
                                                <dt className="sr-only">Published on</dt>
                                                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                    <time dateTime={date} suppressHydrationWarning>
                                                        {formatDate(date, siteMetadata.locale)}
                                                    </time>
                                                </dd>
                                            </dl>
                                            <div>
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">{title}</Link>
                                                    </h2>
                                                    <div>
                                                        {tags && tags.map((tag)=><Tag key={tag} text={tag}></Tag>)}
                                                    </div>
                                                </div>
                                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                    {summary}
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}