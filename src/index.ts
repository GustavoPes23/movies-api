import { ApolloServer } from "apollo-server-micro";
import microCors from "micro-cors";
import { config as dotenv } from "dotenv";

import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

dotenv();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const start = async () => {
  await apolloServer.start();
  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  const cors = microCors({
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.ORIGIN_SSR,
  });

  return cors(handler);
};

export default start();
