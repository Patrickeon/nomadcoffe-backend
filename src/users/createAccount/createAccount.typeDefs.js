import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      name: String!
      username: String!
      email: String!
      location: String
      avatar: String
      githubUsername: String
      password: String!
    ): MutationResponse
  }
`;
