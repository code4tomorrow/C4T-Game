import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable";

export default defineNuxtPlugin((nuxtApp) => {
    const { graphqlApiURL } = useRuntimeConfig();

    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        uri: graphqlApiURL,
        connectToDevTools: process.env.NODE_ENV === "development"
    })
    nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})

