import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SITE_URL } from "./lp-data";

function asaasBase(apiKey: string) {
  const isSandbox = apiKey.includes("hmlg") || apiKey.includes("sandbox");
  return isSandbox ? "https://api-sandbox.asaas.com/v3" : "https://api.asaas.com/v3";
}

const checkoutSchema = z.object({
  nome: z.string().min(2).max(80),
  whatsapp: z.string().min(8).max(30),
  email: z.string().email().max(120).optional().or(z.literal("")),
  passengers: z.number().int().min(1).max(10),
  cupom: z.string().max(20).optional().nullable(),
  gclid: z.string().max(200).optional().nullable(),
});

export const createReservationCheckout = createServerFn({ method: "POST" })
  .inputValidator((input) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["ASAAS_API_KEY"];
    if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

    const baseUrl = asaasBase(apiKey);

    const unit = 620;
    const desconto = data.cupom?.toUpperCase() === "ASA10" ? 0.9 : 1;
    const value = Math.round(unit * data.passengers * desconto * 100) / 100;

    // Nosso próprio identificador de transação: usado para deduplicar a conversão do
    // Google Ads e para checar o status do pagamento na página de confirmação, já que
    // o Asaas não garante parâmetros próprios na URL de retorno.
    const transactionId = crypto.randomUUID();

    const successUrl = new URL("/confirmacao", SITE_URL);
    successUrl.searchParams.set("tid", transactionId);
    if (data.gclid) successUrl.searchParams.set("gclid", data.gclid);

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
        externalReference: transactionId,
        callback: { successUrl: successUrl.toString(), autoRedirect: true },
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

    return { url: json.url, value, transactionId };
  });

const CONFIRMED_STATUSES = new Set(["RECEIVED", "CONFIRMED", "RECEIVED_IN_CASH"]);

const statusSchema = z.object({ transactionId: z.string().min(1).max(100) });

/**
 * Confere no Asaas se algum pagamento associado a essa transação já foi confirmado.
 * Nunca confie no status vindo da URL de retorno — sempre valide contra a API.
 */
export const getPaymentStatus = createServerFn({ method: "GET" })
  .inputValidator((input) => statusSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["ASAAS_API_KEY"];
    if (!apiKey) throw new Error("ASAAS_API_KEY não configurada");

    const baseUrl = asaasBase(apiKey);
    const res = await fetch(
      `${baseUrl}/payments?externalReference=${encodeURIComponent(data.transactionId)}`,
      { headers: { access_token: apiKey } },
    );
    if (!res.ok) return { confirmed: false as const };

    const json = (await res.json()) as {
      data?: { status?: string; value?: number }[];
    };
    const confirmedPayment = json.data?.find(
      (p) => typeof p.status === "string" && CONFIRMED_STATUSES.has(p.status),
    );
    if (!confirmedPayment || typeof confirmedPayment.value !== "number") {
      return { confirmed: false as const };
    }
    return { confirmed: true as const, value: confirmedPayment.value };
  });
