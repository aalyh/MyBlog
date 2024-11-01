/* eslint-disable @typescript-eslint/no-explicit-any */
import siteMetadata from "@/data/siteMetadata";
import { formatDate } from "pliny/utils/formatDate.js";
import Link from "../Link";
import Tag from "../Tag";

const MAX_DISPLAY = 5
export default async function BlogList({ posts }) {
    return(
        <>
        <div className=" divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="space-y-2 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Latest
                </h1>
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
                                            <Link href={`/blog/${slug}`} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label={`Read more: "${title}"`}></Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}
