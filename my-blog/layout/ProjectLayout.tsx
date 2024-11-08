import Link from "@/components/Link"
import Image from '@/components/Image'
import PageTitle from "@/components/PageTitle"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import SectionContainer from "@/components/SectionContainer"
import { Author, Project } from "contentlayer/generated"
import { CoreContent } from "pliny/utils/contentlayer.js"
import { ReactNode } from "react"

interface ProjectLayoutProps{
    content: CoreContent<Project>
    authorDetails: CoreContent<Author>[] | undefined
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    children: ReactNode
}

export default function ProjectLayout({content, authorDetails, next, prev,children}: ProjectLayoutProps){
    const { title,github } = content

    return (
        <SectionContainer>
            <ScrollTopAndComment></ScrollTopAndComment>
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header className="pt-6 xl:pb-6">
                        <div className="space-y-1 text-center">
                            <div>
                                <PageTitle>{title}</PageTitle>
                            </div>
                        </div>
                    </header>
                    <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 xl:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                        <dl className="pt-6 pb-10 xl:border-b xl:border-gary-200 xl:p-11 xl:dark:border-gray-700">
                            <dt className="sr-only">作者</dt>
                            <dd>
                                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                    {authorDetails?.map((author)=>(
                                        <li key={author.name} className="flex items-center space-x-2">
                                            {author.avatar && (<Image src={author.avatar} width={38} height={38} alt="avatar" className="w-10 h-10 rounded-full"></Image>)}
                                            <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                                                <dt className="sr-only">姓名</dt>
                                                <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                                                <dt className="sr-only">github</dt>
                                                <dd>{author.github && (
                                                    <Link href={author.github} className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">{author.github}</Link>
                                                )}</dd>
                                            </dl>
                                        </li>
                                    ))}
                                    
                                </ul>
                            </dd>
                        </dl>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                            <div className="pt-10 pb-8 prose max-w-none dark:prose-invert">{children}</div>
                            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
                                <Link href={github as string}>View on Github</Link>
                            </div>
                        </div>
                        <footer>
                            <div className="text-sm font-medium leading-5 divide-gray-200 dark:divide-gray-700 xl:row-start-2 xl:divide-y">
                                {(next || prev) && (
                                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                        {prev && prev.path && (
                                            <div>
                                                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">上一篇</h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                    <Link href={`/${prev.path}`}>{prev.title}</Link>
                                                </div>
                                            </div>
                                        )}
                                        {next && next.path && (
                                            <div>
                                                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                                下一篇
                                                </h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                <Link href={`/${next.path}`}>{next.title}</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </footer>
                    </div>
                    
                </div>
            </article>
        </SectionContainer>
    )
}