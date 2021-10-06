import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffes.utils";
import { uploadToS3 } from "../../shared/shard.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        let photosLast = [];
        let categoriesObj = [];
        // 이미지 중복선택시 처리
        const photoDataSeting = () => {
          let endS3Count = 0;
          return new Promise((resolve, rehect) => {
            const doneCount = photos.length;
            photos.map(async image => {
              const url = await uploadToS3(image, loggedInUser.id, "uploads");
              photosLast({
                where: { url },
                create: { url },
              });
              endS3Count++;
              if (doneCount === endS3Count) resolve("All Done");
            });
          });
        };

        if (categories) {
          categoriesObj = processCategories(categories);
        }

        await photoDataSeting();

        return client.coffeeShop.create({
          data: {
            ...(photosLast.length > 0 && {
              coffeShopPhotos: {
                connectOrCreate: photosLast,
              },
            }),
            ...(categoriesObj.length > 0 && {
              categorys: {
                connectOrCreate: categoriesObj,
              },
            }),
            name,
            latitude,
            longitude,
          },
        });
      }
    ),
  },
};
