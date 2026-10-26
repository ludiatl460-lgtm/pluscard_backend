import { Request, Response } from "express";
import { UserService } from "../services/user.service"; 
export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserService.findAllUserService();
      return res.status(200).json({
        success: true,
        message: "ດຶງຂໍ້ມູນ User ທັງໝົດສຳເລັດ",
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "ເກີດຂໍ້ຜິດພາດໃນລະບົບ",
        error: error.message,
      });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await UserService.findUserByIdService(String(id));

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "ບໍ່ພົບຂໍ້ມູນ User ນີ້",
        });
      }

      return res.status(200).json({
        success: true,
        message: "ດຶງຂໍ້ມູນ User ສຳເລັດ",
        data: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "ເກີດຂໍ້ຜິດພາດໃນລະບົບ",
        error: error.message,
      });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const data = req.body;  
      const newUser = await UserService.createUserService(data);
      return res.status(201).json({
        success: true,
        message: "ສ້າງ User ໃໝ່ສຳເລັດ",
        data: newUser,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດສ້າງ User ได้",
        error: error.message,
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedUser = await UserService.updateUserService(String(id), data);
      return res.status(200).json({
        success: true,
        message: "ອັບເດດຂໍ້ມູນ User ສຳເລັດ",
        data: updatedUser,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດອັບເດດຂໍ້ມູນ User ໄດ້",
        error: error.message,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await UserService.deleteUserService(String(id));
      
      return res.status(200).json({
        success: true,
        message: "ລຶບ User ສຳເລັດ",
        data: deletedUser,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດລຶບ User ໄດ້ (ອາດບໍ່ພົບ ID ນี้)",
        error: error.message,
      });
    }
  },
};