import { GraphQLServer } from 'graphql-yoga';

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({
  typeDefs: 'src/application/queries/schema.graphql',
  resolvers,
});

const options = {
  port: 8000,
  endpoint: '/graphql',
  playground: '/playground',
};

server.start(options, ({ port }) => console.log(
  `Server started, listening on port ${port} for incoming requests.`,
));
