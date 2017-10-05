const Prism = require('prismjs')

module.exports = {
  content: [
    [
      'blog',
      {
        permalink: '/blog/:slug',
        page: '/blog/_blog',
        generate: ['get', 'getAll']
      }
    ], [
      'essays',
      {
        permalink: '/essays/:slug',
        page: '/essays/_essay',
        generate: ['get', 'getAll']
      }
    ], [
      'projects',
      {
        permalink: '/projects/:slug',
        page: '/projects/_project',
        generate: ['get', 'getAll'],
        isPost: false
      }
    ]
  ],

  api: {
    baseURL: process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:3000'
  },

  parsers: {
    md: {
      highlight: (code, lang) => {
        return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)}</code></pre>`
      }
    }
  }
}
