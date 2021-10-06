import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeCategory: protectedResolver((_, { name, offset }, { loggedInUser }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: offset,
        where: {
          categorys: {
            some: {
              name,
            },
          },
        },
      })
    ),
  },
};
