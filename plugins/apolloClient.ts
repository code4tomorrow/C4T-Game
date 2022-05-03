import urql, { cacheExchange, dedupExchange, fetchExchange, ssrExchange, subscriptionExchange } from "@urql/vue";


export default defineNuxtPlugin((nuxtApp) => {
    const { graphqlApiURL } = useRuntimeConfig();

    const exchanges = [ fetchExchange ];

    nuxtApp.vueApp.use(urql, {
        url: graphqlApiURL,
        exchanges
    })
})

