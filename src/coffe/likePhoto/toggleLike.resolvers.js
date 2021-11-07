import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const coffeShop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
      });
      if (!coffeShop) {
        return {
          ok: false,
          error: "coffeShop not found",
        };
      }
      const likeWhere = {
        shopId_userId: {
          userId: loggedInUser.id,
          shopId: id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            coffeeShop: {
              connect: {
                id: coffeShop.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
