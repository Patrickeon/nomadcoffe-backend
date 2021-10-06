import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCoffeeShop: protectedResolver((_, { id }, { loggedInUser }) =>
      client.coffeeShop.findUnique({
        where: {
          id,
        },
      })
    ),
  },
};
