import express from "express";

import {
  listarItens,
  buscarItemPorId,
  criarItem,
  atualizarItem,
  deletarItem,
} from "../controllers/itensController.js";

const router = express.Router();

router.get("/", listarItens);
router.get("/:id", buscarItemPorId);

router.post("/", criarItem);

router.put("/:id", atualizarItem);

router.delete("/:id", deletarItem);

export default router;
