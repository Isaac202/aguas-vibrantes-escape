import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2).max(80),
  whatsapp: z.string().min(8).max(30),
  email: z.string().max(120).optional().nullable(),
  origem: z.string().max(60),
  cupom: z.string().max(20).optional().nullable(),
  passengers: z.number().int().min(1).max(20).optional().nullable(),
  observacao: z.string().max(500).optional().nullable(),
});

export const sendLeadEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["EMAIL_FROM"] ?? "no-reply@corretordobairro.com";
    const to = process.env["LEADS_TO_EMAIL"] ?? "edvarddf2030@gmail.com";
    if (!apiKey) throw new Error("RESEND_API_KEY não configurada");

    const linhas: [string, string][] = [
      ["Nome", data.nome],
      ["WhatsApp", data.whatsapp],
      ["E-mail", data.email || "-"],
      ["Origem do lead", data.origem],
      ["Cupom", data.cupom || "-"],
      ["Passageiros", data.passengers ? String(data.passengers) : "-"],
      ["Observação", data.observacao || "-"],
      ["Recebido em", new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })],
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111">
        <h2 style="margin:0 0 12px">Novo lead — Caldas Novas Vibrante</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
          ${linhas
            .map(
              ([k, v]) =>
                `<tr><td style="background:#f4f6f8;font-weight:bold">${k}</td><td>${String(v).replace(/</g, "&lt;")}</td></tr>`,
            )
            .join("")}
        </table>
        <p style="font-size:13px;color:#555">Excursão Caldas Novas Vibrante — 11 a 13/09, saindo de Brasília.</p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `Novo lead: ${data.nome} — ${data.origem}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend failed [${res.status}]: ${body}`);
      throw new Error(`Falha ao enviar o lead [${res.status}]: ${body}`);
    }

    return { ok: true };
  });
