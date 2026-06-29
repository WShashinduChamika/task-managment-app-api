import { Router } from "express";
import * as tasksController from "./task.controller";

const router = Router();

router.post("/", tasksController.createTask);

router.get("/", tasksController.getTasksList);

router.patch("/:id", tasksController.updateTask);

export default router;

