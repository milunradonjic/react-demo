import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-boost';

import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const cache = new InMemoryCache();

// persist in local storage
(async () =>
  await persistCache({
    cache,
    storage: window.localStorage,
  }))();

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  data: {
    counter: 0,
  },
});

export default client;
