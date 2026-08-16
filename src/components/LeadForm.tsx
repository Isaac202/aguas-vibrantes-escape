import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { PACKAGE } from "@/lib/lp-data";
import { track } from "@/lib/tracking";

export function LeadForm({
  origin,
  cupom,
  compact = false,
  onDone,
}: {
  origin: string;
  cupom?: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cupom) localStorage.setItem("asa-cupom", cupom);
    track("generate_lead", { origin, cupom: cupom ?? null, value: PACKAGE.precoNumero });
    setSent(true);
    onDone?.();
    const msg = `Olá! Sou ${nome} (${whats}${email ? `, ${email}` : ""}). Quero informações sobre a excursão ${PACKAGE.destino} — ${PACKAGE.datasLabel}, saindo de Brasília.${cupom ? ` Cupom ${cupom} (10% de desconto).` : ""}`;
    window.open(
      `https://wa.me/${PACKAGE.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener",
    );
  };

  if (sent) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 text-sm">
        <Check className="size-5 text-primary" />
        <p>
          Recebemos seus dados{cupom ? ` e o cupom ${cupom} está reservado` : ""}. Um consultor da{" "}
          {PACKAGE.empresa} vai falar com você pelo WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      <div className="grid gap-1.5">
        <Label htmlFor={`nome-${origin}`}>Nome</Label>
        <Input
          id={`nome-${origin}`}
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={`whats-${origin}`}>WhatsApp</Label>
        <Input
          id={`whats-${origin}`}
          required
          inputMode="tel"
          value={whats}
          onChange={(e) => setWhats(e.target.value)}
          placeholder="(61) 99999-9999"
        />
      </div>
      <div className={`grid gap-1.5 ${compact ? "" : "sm:col-span-2"}`}>
        <Label htmlFor={`email-${origin}`}>E-mail</Label>
        <Input
          id={`email-${origin}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
        />
      </div>
      <Button
        type="submit"
        variant="cta"
        size="lg"
        className={compact ? "w-full" : "sm:col-span-2"}
      >
        {cupom ? "Quero meu cupom de 10%" : "Quero receber as informações"}
      </Button>
      <p className={`text-xs text-muted-foreground ${compact ? "" : "sm:col-span-2"}`}>
        Seus dados são usados apenas para o atendimento desta viagem.
      </p>
    </form>
  );
}
