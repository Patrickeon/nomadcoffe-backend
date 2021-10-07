require("dotenv").config();
import http from "http";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ctx => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(graphqlUploadExpress());
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

const PORT = process.env.PORT;

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});

// server
//   .listen(PORT)
//   .then(({ url }) => console.log(`🚀 Server is running on ${url} ✅`));
