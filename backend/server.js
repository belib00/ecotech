import express from "express";
import cors from "cors";
import "./database/initDatabase.js";

import env from "./config/env.js";
import usuariosRoutes from "./routes/usuarios.js";
import produtosRoutes from "./routes/produtos.js";
import pontosRoutes from "./routes/pontos.js";
import descartesRoutes from "./routes/descartes.js";
import feedbacksRoutes from "./routes/feedbacks.js";
import mensagensRoutes from "./routes/contactMessages.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/usuarios", usuariosRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pontos", pontosRoutes);
app.use("/descartes", descartesRoutes);
app.use("/feedbacks", feedbacksRoutes);
app.use("/mensagens", mensagensRoutes);

// Rota de verificação de saúde da API
app.get("/", (req, res) => {
  res.json({ mensagem: "API EcoTech funcionando!" });
});

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});
