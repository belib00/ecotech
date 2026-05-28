export type Product = {
  id: string;
  title: string;
  shortDescription: string;
  price: string;
  condition: string;
  images: string[];
  features: string[];
  fullDescription: string;
  seller: {
    name: string;
    phone: string; // formato internacional sem símbolos para WhatsApp, ex: 5551996866939
    email: string;
    location: string;
  };
};

const placeholder = "/placeholder.svg";

export const products: Product[] = [
  {
    id: "notebook",
    title: "Notebook Lenovo - Recondicionado",
    shortDescription:
      "Retirado de empresa. SSD novo, bateria nova. Garantia de 3 meses.",
    price: "R$ 800,00",
    condition: "Recondicionado",
    images: [placeholder, placeholder, placeholder],
    features: [
      "Processador Intel Core i5",
      "8 GB de memória RAM DDR4",
      "SSD 240 GB (novo)",
      "Bateria nova com autonomia de até 4h",
      "Tela 14\" HD",
      "Acompanha carregador original",
    ],
    fullDescription:
      "Notebook Lenovo recondicionado, ideal para uso em escritório, estudos e tarefas do dia a dia. Passou por revisão técnica completa, formatação e instalação de Windows. Garantia de 3 meses cobrindo defeitos de fabricação.",
    seller: {
      name: "EcoTech",
      phone: "5551996866939",
      email: "administracao.ecotech@gmail.com",
      location: "Montenegro/RS",
    },
  },
  {
    id: "monitor",
    title: 'Monitor Samsung 21" - Seminovo',
    shortDescription: "Perfeito para segunda tela. Sem riscos ou manchas.",
    price: "R$ 250,00",
    condition: "Seminovo",
    images: [placeholder, placeholder],
    features: [
      "Tela LCD 21 polegadas",
      "Resolução Full HD 1920x1080",
      "Entradas HDMI e VGA",
      "Sem pixels mortos",
      "Acompanha cabo de força",
    ],
    fullDescription:
      "Monitor Samsung em ótimo estado de conservação. Excelente opção para uso como segunda tela em home office ou para montagem de setup econômico.",
    seller: {
      name: "EcoTech",
      phone: "5551996866939",
      email: "administracao.ecotech@gmail.com",
      location: "Montenegro/RS",
    },
  },
  {
    id: "kitpc",
    title: "Kit de Peças: HD + Fonte + Memória",
    shortDescription:
      "Componentes testados e funcionando. Ideal para manutenção de PCs antigos.",
    price: "R$ 150,00",
    condition: "Usado - Funcionando",
    images: [placeholder, placeholder],
    features: [
      "HD SATA 500 GB",
      "Fonte ATX 500W",
      "2x Memória DDR3 4 GB",
      "Todas as peças testadas",
      "Ideal para upgrade ou reparo",
    ],
    fullDescription:
      "Kit completo de componentes para manutenção ou montagem de PCs antigos. Todas as peças foram testadas individualmente e estão em pleno funcionamento.",
    seller: {
      name: "EcoTech",
      phone: "5551996866939",
      email: "administracao.ecotech@gmail.com",
      location: "Montenegro/RS",
    },
  },
  {
    id: "moto-g7",
    title: "Celular Moto G7 Play - Defeito",
    shortDescription:
      "Placa queimada, ideal para retirada de peças. Carcaça em ótimo estado.",
    price: "R$ 70,00",
    condition: "Com defeito",
    images: [placeholder],
    features: [
      "Tela sem trincos",
      "Carcaça em ótimo estado",
      "Bateria funcional",
      "Câmera traseira intacta",
      "Placa-mãe com defeito",
    ],
    fullDescription:
      "Aparelho com defeito na placa-mãe, vendido para retirada de peças. Ótimo para quem trabalha com manutenção de celulares ou precisa de peças de reposição.",
    seller: {
      name: "EcoTech",
      phone: "5551996866939",
      email: "administracao.ecotech@gmail.com",
      location: "Montenegro/RS",
    },
  },
  {
    id: "impressora-hp",
    title: "Impressora HP Deskjet - Com defeito",
    shortDescription:
      "Apresenta erro no cartucho. Boa para aproveitamento de peças ou reparo.",
    price: "R$ 40,00",
    condition: "Com defeito",
    images: [placeholder],
    features: [
      "Modelo HP Deskjet",
      "Estrutura íntegra",
      "Motor funcional",
      "Erro de leitura no cartucho",
      "Acompanha cabo de força",
    ],
    fullDescription:
      "Impressora HP Deskjet apresentando erro de leitura no cartucho. Ideal para reparo técnico ou aproveitamento de peças mecânicas e eletrônicas.",
    seller: {
      name: "EcoTech",
      phone: "5551996866939",
      email: "administracao.ecotech@gmail.com",
      location: "Montenegro/RS",
    },
  },
];

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);
