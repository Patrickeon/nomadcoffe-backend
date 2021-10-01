import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstname: String!
    lastName: String
    username: String!
    email: String!
    location: String!
    avatar: String!
    githubUsername: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createAccount(
      firstname: String!
      lastName: String
      username: String!
      email: String!
      location: String!
      avatar: String!
      githubUsername: String!
      password: String!
    ): MutationResponse
  }
`;
