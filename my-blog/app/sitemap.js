import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(){
    const siteUrl = siteMetadata.siteUrl

    const blogRoutes = allBlogs.map((post)=>({
        url:`${siteUrl}${post.url}`,
        lastModified: post.lastmod || post.date,
    }))

    const routes = ['', 'posts'].map((route) => ({
        url:`${siteUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogRoutes]
}