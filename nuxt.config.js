module.exports = {
  head: {
    title: 'Gradual Improvement',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Personal blog for Caleb' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  build: {
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: true,
    vendor: [
      'vuetify'
    ]
  },
  modules: [
    'nuxtent',
    '@nuxtjs/font-awesome'
  ],
  plugins: [
    '~/plugins/vuetify.js'
  ],
  css: [
    '~/assets/style/app.styl',
    'prismjs/themes/prism-okaidia.css'
  ],
  loading: { color: '#3B8070' }
}
