import type { WeeklyHours } from "@/lib/opening-hours";

export type CollectionPoint = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  /** Horário em texto livre, exibido ao usuário. */
  hours?: string;
  notes?: string;
  lat: number;
  lng: number;
  /** Tipos de lixo eletrônico que o ponto recebe (valores de `wasteTypes`). */
  accepts: string[];
  /** Horário estruturado, usado para calcular o selo "Aberto agora". */
  weeklyHours?: WeeklyHours;
};

/** Tipos de lixo eletrônico disponíveis no filtro. */
export const wasteTypes = [
  "Computadores",
  "Tablets",
  "Monitores",
  "Teclados",
  "Impressoras",
  "Câmeras Fotográficas",
  "Aparelhos de Som",
  "Lâmpadas Eletrônicas",
  "Televisores",
  "Geladeira",
  "Fogão",
  "Micro-ondas",
  "Rádios",
  "Telefones",
  "Celulares",
  "Carregadores",
  "Baterias",
  "Pilhas",
  "Fios",
];

/**
 * Pontos de coleta de Montenegro/RS.
 *
 * ATENÇÃO: os campos `accepts` e `weeklyHours` abaixo são estimativas
 * baseadas na descrição de cada ponto — confirme com cada local antes
 * de publicar o site, para não orientar o usuário errado.
 */
export const collectionPoints: CollectionPoint[] = [
  {
    id: "ecopila",
    name: "EcoPila",
    address: "Rua Capitão Cruz, Centro - Montenegro/RS",
    hours: "Quintas-feiras, 07:00 às 12:00",
    notes:
      "Ponto de troca aceita alguns recicláveis. Confirme se o item gera crédito na moeda social no momento da entrega.",
    lat: -29.6810776,
    lng: -51.4624438,
    accepts: ["Pilhas", "Baterias", "Celulares", "Carregadores", "Telefones", "Fios"],
    weeklyHours: { days: [4], opens: "07:00", closes: "12:00" },
  },
  {
    id: "telemonte",
    name: "Telemonte Coleta e Transporte",
    description: "Ponto oficial fixo (parceria com a Prefeitura).",
    address: "Estrada Maurício Cardoso (RS-287), nº 8351 - Bairro Estação/Senai",
    phone: "(51) 3649-3200",
    hours: "Segunda a sexta, 08:00 às 18:00",
    lat: -29.6938,
    lng: -51.4338,
    accepts: [
      "Computadores",
      "Monitores",
      "Teclados",
      "Impressoras",
      "Aparelhos de Som",
      "Televisores",
      "Geladeira",
      "Fogão",
      "Micro-ondas",
      "Fios",
    ],
    weeklyHours: { days: [1, 2, 3, 4, 5], opens: "08:00", closes: "18:00" },
  },
  {
    id: "montepel",
    name: "Montepel",
    description: "Recebe diversos materiais para reciclagem, incluindo eletrônicos e pilhas.",
    address: "Rua Hortêncio R. Machado, 40 - Bairro Municipal",
    hours: "Segunda a sexta, 08:00 às 17:30",
    lat: -29.6852,
    lng: -51.4598,
    accepts: [
      "Computadores",
      "Tablets",
      "Monitores",
      "Teclados",
      "Impressoras",
      "Aparelhos de Som",
      "Televisores",
      "Rádios",
      "Telefones",
      "Celulares",
      "Carregadores",
      "Baterias",
      "Pilhas",
      "Fios",
    ],
    weeklyHours: { days: [1, 2, 3, 4, 5], opens: "08:00", closes: "17:30" },
  },
  {
    id: "smartcom",
    name: "SmartCom Assistência Técnica",
    description: "Aceita descarte de baterias e eletrônicos.",
    address: "Rua Dr. Bruno de Andrade, 1340 - Timbaúva",
    hours: "Segunda a sexta, 09:00 às 18:00",
    lat: -29.6755,
    lng: -51.4502,
    accepts: [
      "Celulares",
      "Tablets",
      "Telefones",
      "Carregadores",
      "Baterias",
      "Pilhas",
      "Computadores",
      "Câmeras Fotográficas",
    ],
    weeklyHours: { days: [1, 2, 3, 4, 5], opens: "09:00", closes: "18:00" },
  },
  {
    id: "praca-rui-barbosa",
    name: "Dia do Descarte Correto - Praça Rui Barbosa",
    description:
      "Evento periódico da Secretaria Municipal de Meio Ambiente (SMMA). Recebimento gratuito de eletrônicos, óleo de cozinha e lâmpadas.",
    address: "Praça Rui Barbosa - Centro, Montenegro/RS",
    notes: "Evento periódico — acompanhe a agenda da SMMA para a próxima data.",
    lat: -29.6878,
    lng: -51.4612,
    accepts: [
      "Computadores",
      "Tablets",
      "Monitores",
      "Teclados",
      "Impressoras",
      "Câmeras Fotográficas",
      "Aparelhos de Som",
      "Lâmpadas Eletrônicas",
      "Televisores",
      "Micro-ondas",
      "Rádios",
      "Telefones",
      "Celulares",
      "Carregadores",
      "Baterias",
      "Pilhas",
      "Fios",
    ],
  },
  {
    id: "estacao-cultura",
    name: "Dia do Descarte Correto - Estação da Cultura",
    description:
      "Evento periódico da SMMA. Recebimento gratuito de eletrônicos, óleo de cozinha e lâmpadas.",
    address: "Rua Osvaldo Aranha - Montenegro/RS",
    notes: "Evento periódico — acompanhe a agenda da SMMA para a próxima data.",
    lat: -29.6864,
    lng: -51.4639,
    accepts: [
      "Computadores",
      "Tablets",
      "Monitores",
      "Teclados",
      "Impressoras",
      "Câmeras Fotográficas",
      "Aparelhos de Som",
      "Lâmpadas Eletrônicas",
      "Televisores",
      "Micro-ondas",
      "Rádios",
      "Telefones",
      "Celulares",
      "Carregadores",
      "Baterias",
      "Pilhas",
      "Fios",
    ],
  },
];
