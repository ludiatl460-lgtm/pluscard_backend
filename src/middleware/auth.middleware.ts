import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_pluscard";
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "ບໍ່ພົບ Token, ກະລຸນາเข้าສູ່ລະບົບກ່ອນ",
    });
  }


  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token ບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸແລ້ວ",
      });
    }
    req.user = user;
    next();
  });
};