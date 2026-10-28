import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export const DashboardController = {
   getAllDashboardReport: async (req: Request, res: Response) => {
       try {
         const results = await DashboardService.dashboardReport();
         return res.status(200).json({
           success: true,
           message: "ດຶງຂໍ້ມູນ Report ທັງໝົດສຳເລັດ",
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
}