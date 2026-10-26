import { prisma } from "../config/prisma";
import { CreateUserInput, UpdateUserInput } from "../types/nidex.type";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; 

export const UserService = {
  findAllUserService: () => {
    return prisma.user.findMany({
      omit: { password: true },
    });
  },

  findUserByIdService: (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  },


  createUserService: async (data: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, 
      },
      omit: { password: true }, 
    });
  },

  updateUserService: async (id: string, data: UpdateUserInput) => {
    let updateData: any = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      omit: { password: true },
    });
  },


  deleteUserService: (id: string) => {
    return prisma.user.delete({
      where: { id },
      select: { id: true, username: true, name: true }, 
    });
  },
};