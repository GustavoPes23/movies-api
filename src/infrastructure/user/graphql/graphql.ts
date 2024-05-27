import { gql } from "apollo-server";

import type { UserCreateInputDto } from "../../../domain/user/usecase/create/UserCreateDto";
import type { UserUpdateInputDto } from "../../../domain/user/usecase/update/UserUpdateDto";

import UserFactory from "../../../domain/user/factory/UserFactory";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    login: String!
    createdAt: String!
  }

  input UserInputCreate {
    name: String!
    login: String!
    password: String!
  }

  input UserInputUpdate {
    id: ID!
    name: String
    login: String
    password: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    create(input: UserInputCreate): User
    update(input: UserInputUpdate): User
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
    update: async(_: any, { input }: { input: UserUpdateInputDto }) => {
      const useCase = UserFactory.updateUsecase();
      return await useCase.execute(input);
    }
  }
};

export { typeDefs, resolvers }