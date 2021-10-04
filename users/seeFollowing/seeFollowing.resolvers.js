import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      // 회원 체크
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};
