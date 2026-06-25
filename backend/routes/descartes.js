import express from "express";
import descartesController from "../controllers/descartesController.js";

const router = express.Router();

router.get("/", descartesController.listarTodos);
router.post("/", descartesController.criar);

export default router;
