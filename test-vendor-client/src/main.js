import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fragmentMatcher from './fragmentMatcher'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/',
})

// Cache implementation
const cache = new InMemoryCache({
  fragmentMatcher
})

// Create the apollo client
const apolloClient = new ApolloClient({
  //fragmentMatcher,
  link: httpLink,
  cache,
})

Vue.config.productionTip = false
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
