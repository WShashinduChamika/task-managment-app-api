import { Router } from "express";
import * as tasksController from "./task.controller";

const router = Router();

router.post("/", tasksController.createTask);

export default router;
