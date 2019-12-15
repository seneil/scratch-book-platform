import { GraphQLServer } from 'graphql-yoga';

let sampleItems = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' },
  { id: 4, name: 'Melon' },
];

const typeDefs = `
  type Query {
    items: [Item!]!
    item(id: Int!): Item!
  }

  type Mutation {
    createItem(name: String!): Item!
  }

  type Item {
    id: ID!
    name: String!
    virtual: String!
  }
`;

const resolvers = {
  Query: {
    items: () => sampleItems,
    item: (parent, { id }) => sampleItems.find(item => item.id === id),
  },
  Mutation: {
    createItem: (parent, { name }) => {
      const nextId = Math.max(...sampleItems.map(item => item.id)) + 1;
      const nextItem = { id: nextId, name };

      sampleItems = [...sampleItems, nextItem];

      return nextItem;
    },
  },
  Item: {
    virtual: parent => `${parent.name} fruit`,
  },
};

const server = new GraphQLServer({
  typeDefs,
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
