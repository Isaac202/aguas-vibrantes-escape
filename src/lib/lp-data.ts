export const PACKAGE = {
  destino: "Caldas Novas Vibrante",
  origem: "Brasília - DF",
  duracao: "3 dias e 2 noites",
  precoNumero: 620,
  preco: "R$ 620",
  ida: "11/09/2026",
  volta: "13/09/2026",
  datasLabel: "11 a 13 de setembro de 2026",
  parcelas: "ou 6x de R$ 103,33 no cartão",
  whatsapp: "5561999999999",
  whatsappLabel: "(61) 99999-9999",
  email: "contato@asaturismo.com.br",
  empresa: "Asa Turismo",
  checkoutUrl: "#reservar",
};

export const roteiro = [
  {
    dia: "Dia 1 — 11/09 (sexta-feira)",
    titulo: "Saída de Brasília e chegada em Caldas Novas",
    itens: [
      { hora: "07h00", texto: "Embarque em Brasília — ponto de encontro confirmado por WhatsApp" },
      { hora: "07h30", texto: "Saída em ônibus executivo Double Decker DD" },
      { hora: "07h30 – 12h30", texto: "Viagem com parada técnica para café e banheiro" },
      { hora: "12h30", texto: "Check-in no hotel da rede diRoma, com piscinas termais" },
      { hora: "13h00 – 14h30", texto: "Tempo livre para almoço (por conta do passageiro)" },
      { hora: "A partir das 15h00", texto: "Tarde livre nas piscinas termais do complexo" },
    ],
  },
  {
    dia: "Dia 2 — 12/09 (sábado)",
    titulo: "Dia inteiro livre para lazer nas águas termais",
    itens: [
      { hora: "Manhã", texto: "Piscinas termais e estrutura de lazer do complexo diRoma" },
      { hora: "Tarde", texto: "Livre para parques aquáticos, spa ou centro da cidade" },
      { hora: "Noite", texto: "Livre — sugestões de gastronomia e lazer com a equipe" },
    ],
  },
  {
    dia: "Dia 3 — 13/09 (domingo)",
    titulo: "Último banho termal e retorno",
    itens: [
      { hora: "Manhã", texto: "Café da manhã no hotel e tempo livre" },
      { hora: "12h00", texto: "Check-out (bagagens no guarda-volumes do hotel)" },
      { hora: "15h00", texto: "Embarque de retorno para Brasília" },
    ],
  },
];

export const incluido = [
  "Transporte ida e volta em ônibus executivo Double Decker DD, saindo de Brasília",
  "2 noites de hospedagem em apartamento triplo compartilhado",
  "Hotel Boulevard Suítes ou unidade equivalente da rede diRoma",
  "Café da manhã incluído no hotel",
  "Acesso às piscinas termais da estrutura do hotel",
  "Seguro de viagem e motorista credenciado",
  "Acompanhamento de equipe da Asa Turismo durante todo o roteiro",
];

export const naoIncluido = [
  "Almoços e jantares",
  "Ingressos de parques aquáticos externos (Water Park, Lagoa Termas, diRoma Acqua Park)",
  "Passeios opcionais e city tour",
  "Bebidas, frigobar e despesas pessoais",
  "Taxas extras de hotel para quarto individual ou duplo (consulte upgrade)",
];

export const faq = [
  {
    q: "De onde sai o ônibus e a que horas?",
    a: "A saída é de Brasília - DF, com embarque às 07h00 e partida às 07h30 do dia 11/09/2026. O ponto exato de encontro é confirmado por WhatsApp e e-mail até 48h antes da viagem.",
  },
  {
    q: "O preço de R$ 620 é por pessoa?",
    a: "Sim. R$ 620 por pessoa em apartamento triplo compartilhado, incluindo transporte ida e volta, 2 noites de hospedagem com café da manhã e seguro de viagem.",
  },
  {
    q: "Posso viajar sozinho?",
    a: "Sim. Quem viaja sozinho é alocado em apartamento triplo com outros passageiros do mesmo gênero. Se preferir quarto individual ou duplo, consulte o valor do upgrade.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "PIX à vista, cartão de crédito em até 6x ou parcelamento combinado com a equipe. A reserva só é confirmada após o pagamento aprovado.",
  },
  {
    q: "As águas termais são naturais?",
    a: "Sim. Caldas Novas é a maior estância hidrotermal do mundo, com águas que brotam naturalmente entre 37°C e 57°C, sem aquecimento artificial.",
  },
  {
    q: "Crianças pagam?",
    a: "Crianças a partir de 5 anos pagam o valor integral por ocuparem assento no ônibus e leito no hotel. Menores de 18 anos precisam viajar acompanhados dos responsáveis ou com autorização.",
  },
  {
    q: "E se eu precisar cancelar?",
    a: "Cancelamentos com mais de 30 dias de antecedência têm reembolso de 100% menos taxa administrativa de 10%. Entre 30 e 15 dias, reembolso de 50%. Com menos de 15 dias não há reembolso, mas a vaga pode ser transferida para outra pessoa sem custo.",
  },
];
