import express from "express";
import produtosController from "../controllers/produtosController.js";

const router = express.Router();

router.get("/", produtosController.listarTodos);
router.post("/", produtosController.criar);

export default router;