import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCategories(name: String!, offset: Int!): [Category]
  }
`;
