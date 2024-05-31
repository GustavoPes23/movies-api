import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { config as dotenv } from "dotenv";
import express from 'express';
import http from 'http';
import cors from 'cors';

import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

dotenv();

const app = express();
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const start = async () => {
  await apolloServer.start();
  app.use(express.json());
  app.use('/graphql', expressMiddleware(apolloServer));
  
  app.use(cors({ origin: [process.env.ORIGIN_SSR, 'https://studio.apollographql.com'] }))
  // const handler = apolloServer.createHandler({ path: "/api/graphql" });
  

  return app;
};

// export default start();
start().then(() => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  httpServer.listen({ port: 4000 })
});
export default app;
// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

