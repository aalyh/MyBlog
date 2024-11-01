/* eslint-disable @typescript-eslint/no-explicit-any */
// app/layout.js
import React from 'react'
import './globals.css'
import siteMetadata from '@/data/siteMetadata'
import Nav from '../components/nav/nav'
import { SearchConfig, SearchProvider } from 'pliny/search/index.js'
import SectionContainer from '../components/SectionContainer'

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title:{
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  openGraph:{
    title: siteMetadata.title,
    description: siteMetadata.description,
    url:'./',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale:'zn_CN',
    type:'website'
  },
  alternates:{
    canonical:'./',
    types:{
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    }
  },
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  twitter:{
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  }
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang={siteMetadata.locale}>
      <body>
        <SectionContainer>
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <Nav></Nav>
            <main>{children}</main>
          </SearchProvider>
        </SectionContainer>
      </body>
    </html>
  )
}
export default RootLayout;