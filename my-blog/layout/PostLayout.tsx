import { Author, Blog } from "contentlayer/generated";
import { CoreContent } from "pliny/utils/contentlayer.js";
import { ReactNode } from "react";
import SectionContainer from '../app/components/SectionContainer'
import PageTitle from '../app/components/PageTitle'
import siteMetadata from "@/data/siteMetadata";
import Link from "@/app/components/Link";
import Image from "next/image";


interface LayoutProps{
    content: CoreContent<Blog>
    authorDetails: CoreContent<Author>[] | undefined
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}
const postDateTemplate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
export default function PostLayout({content, next, prev, children,authorDetails}:LayoutProps){
    const { filePath, path, slug, date, title, tags } = content
    return (
        <SectionContainer>
            {/* 评论 回到顶部悬浮按钮 */}
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header>
                        <div className="space-y-1 text-center">
                            <dl>
                                <div>
                                    {/* sr-only 屏幕阅读器能够读取到这些被隐藏的元素 */}
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                        <time dateTime={date}>{new Date(date).toLocaleDateString(siteMetadata.locale,postDateTemplate)}</time>
                                    </dd>
                                </div>
                            </dl>
                            <div>
                                <PageTitle>{title}</PageTitle>
                            </div>
                        </div>
                    </header>
                    <div>
                        <dl>
                            <dt className="sr-only">Anthors</dt>
                        </dl>
                        <dd>
                            <ul className="flex flex-wrap gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                {authorDetails && authorDetails.map((author)=>(
                                    <li key={author.name} className="flex items-center space-x-2">
                                        {
                                            author.avatar && (
                                                <Image src={author.avatar} width={38} height={38} alt="avatar" className="h-10 w-10 rounded-full"></Image>
                                            )
                                        }
                                        <dl className=" whitespace-nowrap text-sm font-medium leading-5">
                                            <dt className="sr-only">Name</dt>
                                            <dd>{author.name}</dd>
                                            <dt className="sr-only">github</dt>
                                            <dd>
                                                {
                                                    author.github && (<Link href={author.github} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">{author.github}</Link>)
                                                }
                                            </dd>
                                        </dl>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </div>
            </article>
        </SectionContainer>
    )
}