import { allBlogs } from 'contentlayer/generated';
import BlogList from './components/blogList/list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
export default async function Home(){
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  
  return <BlogList posts={posts}></BlogList>
}