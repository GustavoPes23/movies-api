import { gql } from "apollo-server";

import { UserCreateInputDto } from "../../../domain/user/usecase/create/UserCreateDto";

import UserFactory from "../../../domain/user/factory/UserFactory";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    login: String!
    createdAt: String!
  }

  input UserInput {
    name: String!
    login: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    create(input: UserInput): User
  }
`;

const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }) => {
      const useCase = UserFactory.findByIdUsecase();
      return await useCase.execute({ id });
    },
    users: async () => {
      const useCase = UserFactory.findAllUsecase();
      return await useCase.execute();
    },
  },
  Mutation: {
    create: async (_: any, { input }: { input: UserCreateInputDto }) => {
      const useCase = UserFactory.createUsecase();
      return await useCase.execute(input);
    },
  }
};

export { typeDefs, resolvers }