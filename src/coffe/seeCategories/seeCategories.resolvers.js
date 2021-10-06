import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffes.utils";

export default {
  Query: {
    seeCategories: protectedResolver((_, { name, offset }, { loggedInUser }) =>
      client.category.findMany({
        take: 10,
        skip: offset,
        where: {
          name,
        },
      })
    ),
  },
};
