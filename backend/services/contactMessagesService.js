import contactMessagesRepository from "../repositories/contactMessagesRepository.js";
import emailTransporter from "../config/email.js";

async function listarTodos() {
  return await contactMessagesRepository.listarTodos();
}

async function criar(dados) {
  const { nome, email, mensagem } = dados;

  if (!nome || !email || !mensagem) {
    throw new Error("Nome, email e mensagem são obrigatórios.");
  }

  // 1. Salva no banco de dados para manter o histórico local
  const novaMensagem = await contactMessagesRepository.criar(dados);

  // 2. Prepara e envia o e-mail de notificação em segundo plano
  const opcoesEmail = {
    from: '"EcoTech Fale Conosco" <no-reply@ecotech.com>', 
    to: "seu-email-de-administrador@gmail.com", // Coloque aqui o e-mail que vai RECEBER os contatos
    subject: `Nova mensagem de contato de ${nome}`,
    html: `
      <h2>Nova mensagem recebida no EcoTech</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Mensagem:</strong> ${mensagem}</p>
    `,
  };

  // Dispara o e-mail
  emailTransporter.sendMail(opcoesEmail, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
    } else {
      console.log("E-mail enviado com sucesso: %s", info.messageId);
    }
  });

  // Retorna a mensagem criada para o controller dar a resposta ao frontend
  return novaMensagem;
}

export default {
  listarTodos,
  criar,
};