import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type Mutation {
    IncrementCounter: Int!
  }
`;

// read from cache
const COUNTER = gql`
  {
    counter @client
  }
`;

export const resolvers = {
  Mutation: {
    incrementCounter: (_root, _args, { cache }, _info) => {
      const { counter } = cache.readQuery({
        query: COUNTER,
      });

      const newCounter = counter + 1;

      cache.writeQuery({
        query: COUNTER,
        data: { counter: newCounter },
      });

      return newCounter;
    },
  },
};
