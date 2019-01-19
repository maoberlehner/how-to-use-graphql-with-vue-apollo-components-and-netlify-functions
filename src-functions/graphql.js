
import { ApolloServer, gql } from 'apollo-server-lambda';

import articles from '../data/articles.json';

const typeDefs = gql`
  type Article {
    body: String
    id: Int
    image: String
    title: String
  }

  type Query {
    articles: [Article]
  }
`;

const resolvers = {
  Query: {
    articles: () => articles,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
