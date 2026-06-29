import { Router } from "express";
import * as usersController from "./user.controller";

const router = Router();

// Only Admins can list users
router.get("/", usersController.getUsersList);

export default router;
