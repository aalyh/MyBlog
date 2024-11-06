/* eslint-disable @typescript-eslint/no-explicit-any */
import siteMetadata from "@/data/siteMetadata";
import { formatDate } from "pliny/utils/formatDate.js";
import Link from "../components/Link";
import Tag from "../components/Tag";
import { Blog } from "contentlayer/generated";
import { CoreContent } from "pliny/utils/contentlayer.js";
import Image from '@/components/Image'
 
const MAX_DISPLAY = 5
interface BlogListProps{
    posts:CoreContent<Blog>[]
}
export default async function BlogList({ posts }:BlogListProps) {
    
    return(
        <>
            <div className=" divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <div className="flex flex-wrap gap-4">
                        <Image src={siteMetadata.avator} width={50} height={50} alt="avatar" className="w-16 h-16 rounded-full"></Image>
                        <h1 className="space-y-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                            {siteMetadata.author}
                        </h1>
                    </div>
                    <div className="block text-lg leading-7 text-gray-500 dark:text-gray-400 sm:flex sm:gap-6">
                        <p>方向：{siteMetadata.occupation}</p>
                        <p>邮箱：{siteMetadata.email}</p>
                    </div>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        {siteMetadata.description}
                    </p>
                </div>
                
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!posts.length && 'No Posts found'}
                    {posts.slice(0,MAX_DISPLAY).map((post:any)=>{
                        const { slug, date, title, summary, tags } = post
                        return (
                            <li key={slug} className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                                            </dd>
                                        </dl>
                                        <div className=" space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className=" text-2xl font-bold leading-8 tracking-tight">
                                                        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">{title}</Link>
                                                    </h2>
                                                    <div className="flex flex-wrap">
                                                        {tags.map((tag:string)=>(
                                                            <Tag key={tag} text={tag}></Tag>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                                            </div>
                                            <div>
                                                <Link href={`/blog/${slug}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label={`Read more: "${title}"`}>read more：</Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div>
                    <Link href="/blog" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="All posts">更多</Link>
                </div>
            )}
        </>
    )
}

