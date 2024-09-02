import dotenv from "dotenv";
import express from "express";
import{ ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import cors from "cors";
import { PubSub } from 'graphql-subscriptions';
import pkg from "pg";
import typeDefs  from "./src/graphql/schema.js";
import resolvers  from "./src/graphql/resolvers.js";

//load environment variables
dotenv.config();

const app = express();

//Middleware
app.use(cors());

//Port configuration
// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000;

const { Pool } = pkg;
//PostgreSQL Pool configuration
const pool = new Pool({
    // eslint-disable-next-line no-undef
    user: process.env.PGUSER,
    // eslint-disable-next-line no-undef
    host: process.env.PGHOST,
    // eslint-disable-next-line no-undef
    database: process.env.PGDATABASE,
    // eslint-disable-next-line no-undef
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: process.env.NODE_ENV === "production" },
});

//Create schema and pubsub instance
const schema = makeExecutableSchema({ typeDefs, resolvers });
const pubsub = new PubSub();

//Create Apollo Server
const server = new ApolloServer({
  schema,
  context: () => ({ pool, pubsub }),
});

//Start Apollo Server
await server.start();
server.applyMiddleware({ app });

//Create HTTP server and set up WebSocket subscriptions
const httpServer = createServer(app);

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: server.graphqlPath,
  }
);

httpServer.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`);
});