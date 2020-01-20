const { Prisma } = require('prisma-binding');

const { PRISMA_ENDPOINT, PRISMA_MANAGEMENT_API_SECRET } = process.env;

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_MANAGEMENT_API_SECRET,
  debug: true,
});

export default prisma;
