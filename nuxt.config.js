export default defineNuxtConfig({
    imports: {
        "dirs": ['stores']
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                'autoImports': ['defineStore', 'acceptHMRUpdate'],
            },
        ]
    ], 
    serverMiddleware: [
        { path: '/api', handler: '~/middleware/proxy.js' },
    ],
    css: [
        'vuetify/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css',
        '@vueup/vue-quill/dist/vue-quill.snow.css'
    ],
    build: {
        transpile: ['vuetify']
    },
    server: {
    port: process.env.PORT || 3000, // 设置端口号
    },
    plugins: [
        {
            src:'@/plugins/v-calendar', mode: 'client'
        },
        { 
            src: '~/plugins/vueQuill.js', mode: 'client'
        }
    ],
})

