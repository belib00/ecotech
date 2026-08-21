import express from "express";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.js";
import produtosRoutes from "./routes/produtos.js";
import pontosRoutes from "./routes/pontos.js";
import descartesRoutes from "./routes/descartes.js";
import feedbacksRoutes from "./routes/feedbacks.js";
import mensagensRoutes from "./routes/contactMessages.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pontos", pontosRoutes);
app.use("/descartes", descartesRoutes);
app.use("/feedbacks", feedbacksRoutes);
app.use("/mensagens", mensagensRoutes);

app.get("/", (req, res) => {
  res.json({ mensagem: "API EcoTech funcionando!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});