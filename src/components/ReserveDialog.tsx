import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { PACKAGE } from "@/lib/lp-data";
import { track } from "@/lib/tracking";
import { createReservationCheckout } from "@/lib/asaas.functions";
import { sendLeadEmail } from "@/lib/leads.functions";
import { getGclid } from "@/lib/gclid";

export function ReserveDialog({
  open,
  onOpenChange,
  passengers,
  cupom,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  passengers: number;
  cupom?: string | null;
}) {
  const criarCheckout = useServerFn(createReservationCheckout);
  const enviarLead = useServerFn(sendLeadEmail);
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const total = passengers * PACKAGE.precoNumero;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    track("generate_lead", { origin: "reserva", value: total, cupom: cupom ?? null });
    void enviarLead({
      data: {
        nome,
        whatsapp: whats,
        email: email || null,
        origem: "solicitar_reserva",
        cupom: cupom ?? null,
        passengers,
        observacao: `Total estimado R$ ${total},00`,
      },
    }).catch(() => {});
    try {
      const { url } = await criarCheckout({
        data: {
          nome,
          whatsapp: whats,
          email,
          passengers,
          cupom: cupom ?? null,
          gclid: getGclid(),
        },
      });
      track("begin_checkout", { value: total, passengers, items: [PACKAGE.destino] });
      window.location.href = url;
    } catch {
      setErro(
        "Não conseguimos gerar o link de pagamento agora. Fale com a gente no WhatsApp que garantimos sua vaga.",
      );
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar reserva</DialogTitle>
          <DialogDescription>
            {passengers} passageiro(s) · {PACKAGE.datasLabel} · total R$ {total},00
            {cupom ? ` (cupom ${cupom} aplicado no pagamento)` : ""}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="res-nome">Nome completo</Label>
            <Input
              id="res-nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="res-whats">WhatsApp</Label>
            <Input
              id="res-whats"
              required
              inputMode="tel"
              value={whats}
              onChange={(e) => setWhats(e.target.value)}
              placeholder="(61) 99999-9999"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="res-email">E-mail</Label>
            <Input
              id="res-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
            />
          </div>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <Button type="submit" variant="cta" size="lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null}
            {loading ? "Gerando pagamento..." : "Ir para o pagamento"}
          </Button>
          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Pagamento seguro via Asaas — PIX, boleto ou cartão
            em até 6x
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
