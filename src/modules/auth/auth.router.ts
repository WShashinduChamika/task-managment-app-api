import { Router } from "express";
import * as authController from "./auth.controller";
import { authMiddleware } from "../../core/middleware/auth-middleware";

const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authMiddleware, authController.logout);

export default router;