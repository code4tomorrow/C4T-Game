import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    components: true,
    app: {
        head: {
            title: 'C4T Game',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            ],
            link: [
                {
                    rel: 'stylesheet',
                    media: 'screen',
                    href: 'https://fontlibrary.org//face/glacial-indifference',
                    type: 'text/css',
                }
            ],
            script: [],
        },
    },
    css: ['@/assets/css/main.css'],
    vue: {
        compilerOptions: {
            comments: false,
        },
    },
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],
    tailwindcss: {
        configPath: 'tailwind.config.js',
        cssPath: '~/assets/css/tailwind.css',
    },
})
