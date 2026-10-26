import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/users",authenticateToken, UserController.getAllUsers);
router.get("/users/:id",authenticateToken, UserController.getUserById);
router.post("/users",authenticateToken, UserController.createUser);
router.put("/users/:id",authenticateToken, UserController.updateUser);
router.delete("/users/:id",authenticateToken, UserController.deleteUser);

export default router;