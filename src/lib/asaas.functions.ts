import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2).max(80),
  whatsapp: z.string().min(8).max(30),
  email: z.string().email().max(120).optional().or(z.literal("")),
  passengers: z.number().int().min(1).max(10),
  cupom: z.string().max(20).optional().nullable(),
});

export const createReservationCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["ASAAS_API_KEY"];
    if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

    const isSandbox = apiKey.includes("hmlg") || apiKey.includes("sandbox");
    const baseUrl = isSandbox
      ? "https://api-sandbox.asaas.com/v3"
      : "https://api.asaas.com/v3";

    const unit = 620;
    const desconto = data.cupom?.toUpperCase() === "ASA10" ? 0.9 : 1;
    const value = Math.round(unit * data.passengers * desconto * 100) / 100;

    const res = await fetch(`${baseUrl}/paymentLinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: apiKey,
      },
      body: JSON.stringify({
        name: `Caldas Novas 11-13/09 — ${data.nome} (${data.passengers} pax)`,
        description: `Reserva excursão Caldas Novas Vibrante, 11 a 13/09, saindo de Brasília. ${data.passengers} passageiro(s). Contato: ${data.whatsapp}${data.email ? ` / ${data.email}` : ""}.${data.cupom ? ` Cupom ${data.cupom}.` : ""}`,
        billingType: "UNDEFINED",
        chargeType: "DETACHED",
        value,
        dueDateLimitDays: 3,
        maxInstallmentCount: 6,
        notificationEnabled: true,
      }),
    });

    const json = (await res.json()) as {
      url?: string;
      errors?: { description?: string }[];
    };

    if (!res.ok || !json.url) {
      throw new Error(
        json.errors?.[0]?.description ?? "Não foi possível gerar o link de pagamento",
      );
    }

    return { url: json.url, value };
  });
