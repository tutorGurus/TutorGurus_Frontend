export default defineNuxtConfig({
    serverMiddleware: [
        { path: '/api', handler: '~/middleware/proxy.js' },
      ],
    css: [
        'vuetify/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css'
    ],
    build: {
        transpile: ['vuetify']
    },
})

