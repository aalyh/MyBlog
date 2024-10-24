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

const root = process.cwd()
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

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {type: 'list', of:{type:'string'}, default:[]},
    lastmod:{type:'date'},
    draft:{type:'boolean'},
    summary:{type:'boolean'},
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    description:{type:'string'},
    canonicalUrl:{type:'string'},
    layout: { type: 'string' },
    bibliography: { type: 'string' }
  },
  computedFields: {
    ...computedFields,
    structuredData:{
        type:'json',
        resolve: (doc) => ({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: doc.title,
            datePublished: doc.date,
            dateModified: doc.lastmod || doc.date,
            description: doc.summary,
            image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
            url:`${siteMetadata.siteUrl}/posts/${doc._raw.flattenedPath}`
        })
    }
  },
}))

export default makeSource({ 
  contentDirPath: 'data', 
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],],
  }
  // mdx: {
  //   cwd: process.cwd(),
  //   remarkPlugins: [
  //     // remarkExtractFrontmatter,
  //     remarkGfm,
  //     remarkCodeTitles,
  //     remarkMath,
  //     remarkImgToJsx,
  //     remarkAlert,
  //   ],
  //   rehypePlugins: [
  //     rehypeSlug,
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         behavior: 'prepend',
  //         headingProperties: {
  //           className: ['content-header'],
  //         },
  //       },
  //     ],
  //     // rehypeKatex,
  //     // [rehypeCitation, { path: path.join(root, 'data') }],
  //     // [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
  //     // rehypePresetMinify,
  //   ],
  // },
  // onSuccess: async (importData) => {
  //   const { allBlogs } = await importData()
  //   createTagCount(allBlogs)
  //   createSearchIndex(allBlogs)
  // },
})