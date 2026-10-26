import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "ກະລຸນາປ້ອນ username ແລະ password ໃຫ້ຄົບຖ້ວນ",
        });
      }

      const result = await AuthService.loginService({ username, password });

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ",
        error: error.message,
      });
    }
  },
};