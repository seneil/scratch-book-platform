import { GraphQLServer } from 'graphql-yoga';

import db from 'application/prisma-client';
import { Query, Mutation } from 'application/resolvers';

const graphqlServer = new GraphQLServer({
  typeDefs: 'src/scratch-book-schema.graphql',
  resolvers: {
    Query,
    Mutation,
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: request => ({ ...request, db }),
});

export default graphqlServer;
