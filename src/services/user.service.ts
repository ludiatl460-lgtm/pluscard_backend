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
    const { id: _idToIgnore, _id, createdAt, updatedAt, ...safeData } = data as any;
    let updateData: any = { ...safeData };

    if (typeof updateData.gender === "string") {
      updateData.gender = updateData.gender.toUpperCase();
    }

    if (updateData.password !== undefined && String(updateData.password).trim() === "") {
      delete updateData.password;
    }

    if (updateData.password && updateData.password.trim() !== "") {
      updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
    } else {
      delete updateData.password;
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