# Caldas Novas Escape

Landing page da excursão "Caldas Novas Vibrante" (Asa Turismo), saindo de Brasília.

- **Destino**: Caldas Novas, GO
- **Preço**: R$ 620,00 por pessoa
- **Datas**: 11 a 13/09/2026

## Roteiro

**Dia 1 – 11/09 (sexta-feira): chegada em Caldas Novas**

| Horário | Atividade | Detalhes |
| --- | --- | --- |
| 07h00 | Embarque | Brasília — ponto de encontro definido |
| 07h30 | Saída | Ônibus executivo Double Decker DD |
| 07h30–12h30 | Viagem | Com parada técnica para café/banheiro |
| 12h30 | Check-in | Hotel Boulevard Suítes (rede diRoma), piscinas termais |
| 13h00–14h30 | Livre | Almoço |
| 15h00 | Livre | Piscinas termais do complexo |

**Dia 2 – 12/09 (sábado)**: dia livre para lazer.

**Dia 3 – 13/09 (domingo)**: retorno para Brasília às 15h.

Hospedagem em apartamento triplo compartilhado no Hotel Boulevard Suítes (ou unidade
equivalente da rede diRoma). Transporte em ônibus executivo Double Decker DD, com poltronas
reclináveis, dois andares, ar-condicionado, banheiro e TV a bordo, seguro total e motorista
credenciado.

## Desenvolvimento

Stack: TanStack Start + React + Tailwind CSS, rodando sobre Bun.

```sh
bun install
bun run dev
```

Outros comandos:

```sh
bun run build      # build de produção
bun run preview    # servir o build de produção localmente
bun run lint        # eslint
bun run format      # prettier --write
```

### Variáveis de ambiente

- `ASAAS_API_KEY` — chave de API do Asaas usada para gerar os links de pagamento (`src/lib/asaas.functions.ts`). Use uma chave `sandbox`/`hmlg` em desenvolvimento.

### Rastreamento de conversão (Google Ads)

O evento de conversão "Compra" (`AW-18294112878/U83sCNrTqeIcEO6EqJNE`) só é disparado depois
que o Asaas confirma o pagamento, na página `/confirmacao`, e nunca no clique de "Comprar" ou
na geração do PIX/boleto. Ver `src/lib/gtag.ts`, `src/lib/gclid.ts` e `src/routes/confirmacao.tsx`.
