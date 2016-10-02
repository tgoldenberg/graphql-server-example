import express from 'express';
import { apolloServer } from 'apollo-server';
import schema from './data/schema.graphql';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';
const GRAPHQL_PORT = 8080;

const graphQLServer = express();
graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: [schema],
  // mocks: Mocks,
  resolvers: Resolvers,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
