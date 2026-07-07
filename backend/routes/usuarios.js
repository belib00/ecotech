import express from "express";
import usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", usuariosController.listarTodos);
router.get("/:id", usuariosController.buscarPorId);

router.post("/", usuariosController.criar);

router.put("/:id", usuariosController.atualizar);

router.delete("/:id", usuariosController.deletar);

export default router;