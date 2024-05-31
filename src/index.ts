import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { config as dotenv } from "dotenv";
import express, { Express } from "express";
import http from "http";
import cors from "cors";

import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

dotenv();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (
  app: Express,
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
