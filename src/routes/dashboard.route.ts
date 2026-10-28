import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();
router.get("/reports", authenticateToken, DashboardController.getAllDashboardReport);

export default router;