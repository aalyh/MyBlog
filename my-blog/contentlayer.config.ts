/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import siteMetadata from './data/siteMetadata'
import readingTime from 'reading-time'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import { extractTocHeadings, remarkCodeTitles, remarkExtractFrontmatter, remarkImgToJsx } from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePresetMinify from 'rehype-preset-minify'
import path from 'path'
import { slug } from 'github-slugger'

const root = process.cwd()
// const isProduction = process.env.NODE_ENV === 'production'
const isProduction = true;

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

// function createTagCount(allBlogs: any[]){
//   const tagCount: Record<string, number> = {};
//   allBlogs.forEach((file)=>{
//     if(file.tags && (!isProduction || file.draft !== true)){
//       file.tags.forEach((tag: string)=>{
//         const formattedTag = slug(tag);
//         if (formattedTag in tagCount) {
//           tagCount[formattedTag] += 1
//         } else {
//           tagCount[formattedTag] = 1
//         }
//       })
//     }
//   })
// }

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {type: 'list', of:{type:'string'}, default:[]},
    lastmod:{type:'date'},
    draft:{type:'boolean'},
    summary:{type:'string'},
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    description:{type:'string'},
    canonicalUrl:{type:'string'},
    layout: { type: 'string' },
    bibliography: { type: 'string' }
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/data/blog/${post._raw.flattenedPath}` },
    ...computedFields,
    // structuredData:{
    //     type:'json',
    //     resolve: (doc) => ({
    //         '@context': 'https://schema.org',
    //         '@type': 'BlogPosting',
    //         headline: doc.title,
    //         datePublished: doc.date,
    //         dateModified: doc.lastmod || doc.date,
    //         description: doc.summary,
    //         image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
    //         url:`${siteMetadata.siteUrl}/posts/${doc._raw.flattenedPath}`
    //     })
    // }
  },
}))

export const Author = defineDocumentType(()=>({
  name: 'Author',
  filePathPattern: 'author/*.mdx',
  contentType: 'mdx',
  fields:{
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },

    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields:{
    ...computedFields,
  }
}))

export const Person = defineDocumentType(()=>(
  {
    name:'Person',
    filePathPattern: 'info/*.mdx',
    contentType: 'mdx',
    fields:{
      name: { type: 'string', required: true },
      avatar: { type: 'string' },
      occupation: { type: 'string' },
      company: { type: 'string' },
      email: { type: 'string' },
      github: { type: 'string' },
      layout: { type: 'string' },
    },
    computedFields:{
      ...computedFields,
    }
  }
))

export const Project = defineDocumentType(()=>({
  name:'Project',
  filePathPattern: 'project/*.mdx',
  contentType: 'mdx',
  fields:{
    title:{type:'string', required: true},
    description:{type:'string',required:true},
    imgSrc:{type:'json'},
    github:{type: 'string'},
    authors:{type:'list',of: { type: 'string' }},
    video:{type:'json'}
  },
  computedFields: {
    ...computedFields,
  },
}))

export default makeSource({ 
  contentDirPath: 'data', 
  documentTypes: [Blog,Author,Person,Project],
  // mdx: {
  //   remarkPlugins: [remarkGfm],
  //   rehypePlugins: [[rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],],
  // }
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      // remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
        },
      ],
      // rehypeKatex,
      // [rehypeCitation, { path: path.join(root, 'data') }],
      // [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      // rehypePresetMinify,
    ],
  },
  // onSuccess: async (importData) => {
  //   const { allBlogs } = await importData()
  //   createTagCount(allBlogs)
  //   createSearchIndex(allBlogs)
  // },
})