import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffes.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldCoffeShop = await client.coffeeShop.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            categorys: {
              select: {
                name: true,
              },
            },
            coffeShopPhotos: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!oldCoffeShop) {
          return {
            ok: false,
            error: "등록된 커피샵이 없습니다.",
          };
        }

        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: oldCoffeShop.categorys,
              connectOrCreate: processCategories(categories),
            },
          },
        });
      }
    ),
  },
};
