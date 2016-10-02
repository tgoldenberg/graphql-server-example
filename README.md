
# graphql-server-example
Simple setup for graphql server with MongoDB

1. Define a simple Schema
  * ex.

  ```
    type User {
      id: String
      email: String
    }
    type Query {
      users: [User]
    }
    schema {
      query: Query
    }
  ```
  * Here it is important to establish a *data model*, which is our *User*. The User model has an *id* and an *email*, both of which are strings. Our main query that our API exposes is the query *users*. Right now, this query does not accept any arguments, and returns an array of *User* objects. We finally set our *schema* by setting *query* to our Query object.

2. Create Mock functions to test out the functionality

  * To start, we can just mock out every *String* with a phrase. Ex.

  ```javascript
    const Mocks = {
      String: "Hello World!"
    };

    export default Mocks;
  ```

  * We then declare our *mocks* in our *server.js* file, like so:

  ```javascript
    graphQLServer.use('/graphql', apolloServer({
      graphiql: true,
      pretty: true,
      schema: [schema],
      mocks: Mocks,
      // resolvers: Resolvers,
    }));
  ```

  * Now when we query the API in *localhost:8080/graphql*, we will receive the mocked string result.

  #### QUERY
  ```
  {
    users {
      email
    }
  }
  ```
  #### RESULT
  ```
  {
    data: {
      users: [
        {
          email: "Hello World!"
        },
        {
          email: "Hello World!"
        }
      ]
    }
  }
  ```
3. Sync to MongoDB and insert data
  * First we want to create a local MongoDB instance (*test*), and ensure that we have read/write access.

    * Install MongoDB locally [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
    * Make sure to create the data directory - `mkdir -p /data/db`
    * Create a user for the db and give *readWrite* access- [link](https://docs.mongodb.com/manual/reference/method/db.createUser/)
    * Install *MongoHub* and set the connection equal to your local mongo instance
      ```
      Name: 'ANYTHING'
      Server: Standalone
      Address: 127.0.0.1 : 27017
      User: YOUR_USERNAME
      Password: YOUR_PASSWORD
      Database: test
      ```
    * Now you will want to right-click in the database instance and add the collection *users*

  * Now in the file *data/connectors.js*, sync to MongoDB and create seed data. Make sure to correctly define the data schema with Mongoose. [mongoose](http://mongoosejs.com/docs/)

4. Setup Resolvers to provide real data

  * In the file *data/resolvers.js*, you will want to define your API queries and what they should resolve to. Here, you will want to import the database models you created with Mongoose in the *connectors.js* file. Ex.

  ```javascript
  import { User } from './connectors';

  const Resolvers = {
    Query: {
      users(root, args){
        return User.find({})
          .then(users => users);
      }
    }
  };

  export default Resolvers;
  ```
  * Now if we comment out our *Mocks* reference in *server.js*, our API should return real data

5. Create Mutations for the data
