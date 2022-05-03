import urql, { cacheExchange, fetchExchange } from "@urql/vue";

export default defineNuxtPlugin((nuxtApp) => {
    const { graphqlApiURL } = useRuntimeConfig();

    const exchanges = [ fetchExchange, cacheExchange ];

    nuxtApp.vueApp.use(urql, {
        url: graphqlApiURL,
        exchanges
    })
})

