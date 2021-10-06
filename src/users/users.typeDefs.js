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
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
