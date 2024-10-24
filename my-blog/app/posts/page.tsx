import Link from "next/link";
import {allBlogs} from 'contentlayer/generated';
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostCard(post:any){
    return (
        <div className="mb-8">
            <h2 className="mb-1 text-xl">
                <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
                {post.title}
                </Link>
            </h2>
            <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
                {dayjs(post.date).format('DD/MM/YYYY')}
            </time>
        </div>
    )
}
export default function Home(){
    return(
        <div className="mx-auto max-w-xl py-8">
            <h1 className="mb-8 text-center text-2xl font-black">My Blog List</h1>
            {allBlogs.map((post, idx) => (
            <PostCard key={idx} {...post} />
            ))}
        </div>
    )
}
export const generateMetadata = ({ params }) => {
    return { 
      title: "博客列表",
      description: "这是博客列表页面",
      openGraph: {
        title: '博客列表',
        description: '这是博客列表页面'
      }
    }
  }
