const siteMetadata = {
    siteUrl: 'http://localhost:3000/',
    title: 'sulli的技术博客',
    description: 'sulli的技术博客，分享技术、个人成长等内容',
    author:'sulli',
    locale:'zh-CN',
    socialBanner: 'https://cdna.artstation.com/p/assets/images/images/028/138/058/large/z-w-gu-bandageb5f.jpg?1593594749',
    theme:'light',
    search: {
      provider: 'kbar', // kbar or algolia
      kbarConfig: {
        searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
      },
      // provider: 'algolia',
      // algoliaConfig: {
      //   // The application ID provided by Algolia
      //   appId: 'R2IYF7ETH7',
      //   // Public API key: it is safe to commit it
      //   apiKey: '599cec31baffa4868cae4e79f180729b',
      //   indexName: 'docsearch',
      // },
    },
  }
  
  export default siteMetadata