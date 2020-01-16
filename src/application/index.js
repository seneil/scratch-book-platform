import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import graphqlServer from 'application/graphql-server';

const { APPLICATION_SECRET } = process.env;

const options = {
  port: 8000,
  endpoint: '/graphql',
  playground: '/playground',
};

graphqlServer.express.use(cookieParser());

graphqlServer.express.use((request, resolve, next) => {
  const { token } = request.cookies;

  if (token) {
    const { userId } = jwt.verify(token, APPLICATION_SECRET);

    request.userId = userId;
  }

  next();
});

graphqlServer.start(options, ({ port }) => {
  console.log(`Server started, listening on port ${port} for incoming requests.`);
  if (process.send) process.send('ready');
});
