require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(({ url }) => console.log(`🚀 Server is running on ${url} ✅`));
