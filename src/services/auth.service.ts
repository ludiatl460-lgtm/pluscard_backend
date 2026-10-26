import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_pluscard";

export interface LoginInput {
  username: string;
  password: string;
}

export const AuthService = {
  loginService: async (data: LoginInput) => {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new Error("ຊື່ຜູ້ໃຊ້ (Username) ບໍ່ຖືກຕ້ອງ");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("ລະຫັດຜ່ານ (Password) ບໍ່ຖືກຕ້ອງ");
    }
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      gender: user.gender,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    const { password, ...userWithoutPassword } = user;

    return {
      message: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
      token,
      user: userWithoutPassword,
    };
  },
};