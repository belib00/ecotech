import express from "express";
import pontosController from "../controllers/pontosController.js";

const router = express.Router();

router.get("/", pontosController.listarTodos);
router.post("/", pontosController.criar);

export default router;