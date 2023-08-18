import { prisma } from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
}

class UpdateUserService {
  async execute({ user_id, name }: UserRequest) {
    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not exist!");
      }

      const userUpdate = await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
        },
        select: {
          name: true,
          email: true,
        },
      });

      return userUpdate;
    } catch (err) {
      console.log(err);
      throw new Error("Error trying update the user!");
    }
  }
}

export { UpdateUserService };
