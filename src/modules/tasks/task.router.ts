import { Router } from "express";
import * as tasksController from "./task.controller";

const router = Router();

router.post("/", tasksController.createTask);

router.get("/", tasksController.getTasksList);

export default router;
