import { ApolloServer } from "apollo-server-micro";
import microCors from "micro-cors";

import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const start = async () => {
  await apolloServer.start();
  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  const cors = microCors();

  return cors(handler);
};

export default start();
