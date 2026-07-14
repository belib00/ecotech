import "dotenv/config";

/**
 * Centraliza as variáveis de ambiente do backend.
 * A porta pode ser sobrescrita via variável PORT; o padrão continua 3000.
 */
const env = {
  port: process.env.PORT || 3000,
};

export default env;
