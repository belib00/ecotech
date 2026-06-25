import express from "express";
import feedbacksController from "../controllers/feedbacksController.js";

const router = express.Router();

router.get("/", feedbacksController.listarTodos);
router.post("/", feedbacksController.criar);

export default router;