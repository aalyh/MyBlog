import { allBlogs } from 'contentlayer/generated';
import BlogList from '../layout/list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
export default async function Home(){
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <BlogList posts={posts}></BlogList>
    </>
  )
}