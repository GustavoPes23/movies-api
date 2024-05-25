import express from "express";

import userRoute from "./infrastructure/api/routes/userRoute";

import { typeDefs, resolvers } from "./infrastructure/user/graphql/graphql";

import { ApolloServer } from "apollo-server";

const app = new ApolloServer({ typeDefs, resolvers });

app.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use("/user", userRoute);

// app.use("/graphql", graphql);

// app.get("/", (_, res) => {
//   res.send("Hello Movies API!");
// });

// export const server = app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

export default app;
