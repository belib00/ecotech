import express from "express";
import contactMessagesController from "../controllers/contactMessagesController.js";

const router = express.Router();

router.get("/", contactMessagesController.listarTodos);
router.post("/", contactMessagesController.criar);

export default router;