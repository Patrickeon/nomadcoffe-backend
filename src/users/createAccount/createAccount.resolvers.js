import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { name, username, email, password, location, avatar, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }, { githubUsername }] },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 존재하는 회원입니다.",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            password: uglyPassword,
            location,
            avatar,
            githubUsername,
          },
        });
        return {
          ok: true,
          error: "",
        };
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};
