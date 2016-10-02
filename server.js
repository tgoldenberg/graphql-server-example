import express from 'express';
import { apolloServer, apolloExpress, graphiqlExpress } from 'apollo-server';
import { createServer } from 'http';
import schema from './data/schema';
import Mocks from './data/mocks';
import bodyParser from 'body-parser';
import Resolvers from './data/resolvers';
import { makeExecutableSchema } from 'graphql-tools';
const GRAPHQL_PORT = 8080;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: Resolvers
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ApolloOptions = {
  schema: executableSchema,
  formatError: (err) => console.log('SERVER ERROR:', err),
  debug: true,
};


app.use('/graphql', bodyParser.json(), apolloExpress(req => {
  console.log('QUERY', req.body, req.query);
  return ApolloOptions;
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
