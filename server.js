import express from 'express';
import { apolloServer, apolloExpress, graphiqlExpress } from 'apollo-server';
import { createServer } from 'http';
import schema from './data/schema.graphql';
import cors from 'cors';
import Mocks from './data/mocks';
import bodyParser from 'body-parser';
import Resolvers from './data/resolvers';
import { makeExecutableSchema } from 'graphql-tools';
const GRAPHQL_PORT = 8080;

const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: Resolvers
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', apolloExpress((req) => {
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    throw new Error('Query too large.');
  }
  return {
    schema: executableSchema,
  }
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
    users {
      email
    }
  }`
}));

// app.use('/graphql', apolloServer({
//   graphiql: true,
//   pretty: true,
//   schema: [schema],
//   // mocks: Mocks,
//   resolvers: Resolvers,
// }));

// app.use('*', cors());

app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
