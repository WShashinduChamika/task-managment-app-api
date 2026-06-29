import { Router } from "express";
import * as usersController from "./user.controller";

const router = Router();

router.get("/active", usersController.getActiveUsers);

router.get("/", usersController.getUsersList);

export default router;
