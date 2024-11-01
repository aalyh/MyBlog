import { Author, Blog } from "contentlayer/generated";
import { CoreContent } from "pliny/utils/contentlayer.js";
import { ReactNode } from "react";
import SectionContainer from '../components/SectionContainer'
import PageTitle from '../components/PageTitle'
import siteMetadata from "@/data/siteMetadata";
import Link from "@/components/Link";
import Image from "next/image";
import Tag from "@/components/Tag";

const editUrl = (path:string) => `${siteMetadata.siteUrl}/blob/main/data/${path}`
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
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header className="py-6">
                        <div className="space-y-1 text-center">
                            <dl className="space-y-10">
                                <div>
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
                </div>
            </article>
            
            
        </SectionContainer>
    )
}