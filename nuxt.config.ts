import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    components: true,
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
