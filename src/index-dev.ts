import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

import { ApolloServer } from "apollo-server";

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return {
      token,
    };
  },
});

app.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

export default app;
