import express from "express";
import usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", usuariosController.listarTodos);
router.post("/", usuariosController.criar);

export default router;