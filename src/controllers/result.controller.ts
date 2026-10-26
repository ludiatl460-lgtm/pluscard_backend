import { Request, Response } from "express";
import { ResultService } from "../services/result.service"; // ປັບ Path service ຕາມໂຄງສ້າງຂອງທ່ານ

export const ResultController = {
  getAllResults: async (req: Request, res: Response) => {
    try {
      const results = await ResultService.findAllResultService();
      return res.status(200).json({
        success: true,
        message: "ດຶງຂໍ້ມູນ Result ທັງໝົດສຳເລັດ",
        data: results,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "ເກີດຂໍ້ຜິດພາດໃນລະບົບ",
        error: error.message,
      });
    }
  },


  getResultById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await ResultService.findResultByIdService(String(id));

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "ບໍ່ພົບຂໍ້ມູນ Result ນີ້",
        });
      }

      return res.status(200).json({
        success: true,
        message: "ດຶງຂໍ້ມູນ Result ສຳເລັດ",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "ເກີດຂໍ້ຜິດພາດໃນລະບົບ",
        error: error.message,
      });
    }
  },

  createResult: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      if (!data.manageBy || !data.items) {
        return res.status(400).json({
          success: false,
          message: "ກະລຸນາສົ່ງຂໍ້ມູນ manageBy ແລະ items ให้ครบຖ້ວນ",
        });
      }

      const newResult = await ResultService.createResultService(data);
      return res.status(201).json({
        success: true,
        message: "ສ້າງ Result ໃໝ່ສຳເລັດ",
        data: newResult,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດສ້າງ Result ໄດ້",
        error: error.message,
      });
    }
  },

  updateResult: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedResult = await ResultService.updateResultService(String(id), data);
      return res.status(200).json({
        success: true,
        message: "ອັບເດດຂໍ້ມູນ Result ສຳເລັດ",
        data: updatedResult,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດອັບເດດ Result ໄດ້ (ອາດບໍ່ພົບ ID ນີ້)",
        error: error.message,
      });
    }
  },

  deleteResult: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedResult = await ResultService.deleteResultService(String(id));

      return res.status(200).json({
        success: true,
        message: "ລຶບ Result ສຳເລັດ",
        data: deletedResult,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "ບໍ່ສາມາດລຶບ Result ໄດ້ (ອາດບໍ່ພົບ ID ນີ້)",
        error: error.message,
      });
    }
  },
  deleteOldResults: async (req: Request, res: Response) => {
  try {
    const result = await ResultService.deleteOldResultsService();
    return res.status(200).json({
      success: true,
      message: `ລຶບຂໍ້ມູນ Result ທີ່ເກົ່າກວ່າ 90 ວັນສຳເລັດ`,
      deletedCount: result.count, 
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "ເກີດຂໍ້ຜິດພາດໃນການລຶບຂໍ້ມູນເກົ່າ",
      error: error.message,
    });
  }
}
};