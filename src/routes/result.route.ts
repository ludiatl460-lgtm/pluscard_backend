import { Router } from "express";
import { ResultController } from "../controllers/result.controller"; 
import { authenticateToken } from "../middleware/auth.middleware";
const router = Router();

router.get("/results",authenticateToken, ResultController.getAllResults);
router.get("/results/:id",authenticateToken, ResultController.getResultById);
router.post("/results",authenticateToken, ResultController.createResult);
router.put("/results/:id",authenticateToken, ResultController.updateResult);
router.delete("/results/:id",authenticateToken, ResultController.deleteResult);

export default router;