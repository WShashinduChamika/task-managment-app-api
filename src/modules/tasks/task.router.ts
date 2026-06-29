import { Router } from "express";
import * as tasksController from "./task.controller";

const router = Router();

router.post("/", tasksController.createTask);

router.get("/", tasksController.getTasksList);

router.get("/:id", tasksController.getTaskById);

router.patch("/:id", tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

export default router;

