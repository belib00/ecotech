import express from "express";
import usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", usuariosController.listarTodos);
router.post("/", usuariosController.criar);
router.get("/usuarios/:id", usuariosController.buscarPorId); 
router.put("/usuarios/:id", usuariosController.atualizar);   
router.delete("/usuarios/:id", usuariosController.deletar);

export default router;
