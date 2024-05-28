import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

import { ApolloServer } from "apollo-server";

const app = new ApolloServer({ typeDefs, resolvers });

app.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

export default app;