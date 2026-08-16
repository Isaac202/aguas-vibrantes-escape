import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACKAGE } from "@/lib/lp-data";
import { getPaymentStatus } from "@/lib/asaas.functions";
import { firePurchaseConversion } from "@/lib/gtag";

export const Route = createFileRoute("/confirmacao")({
  head: () => ({
    meta: [{ title: "Pagamento confirmado | Caldas Novas Escape" }],
  }),
  component: ConfirmacaoPage,
});

type Status = "checking" | "confirmed" | "not_confirmed";

function ConfirmacaoPage() {
  const consultarStatus = useServerFn(getPaymentStatus);
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const tid = new URLSearchParams(window.location.search).get("tid");
    if (!tid) {
      setStatus("not_confirmed");
      return;
    }
    let cancelled = false;
    consultarStatus({ data: { transactionId: tid } })
      .then((result) => {
        if (cancelled) return;
        if (result.confirmed) {
          firePurchaseConversion({ value: result.value, transactionId: tid });
          setStatus("confirmed");
        } else {
          setStatus("not_confirmed");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("not_confirmed");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {status === "checking" && (
          <>
            <Loader2 className="mx-auto size-10 animate-spin text-primary" />
            <h1 className="mt-4 text-xl font-semibold text-foreground">
              Confirmando seu pagamento...
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Isso leva só alguns segundos.</p>
          </>
        )}

        {status === "confirmed" && (
          <>
            <CheckCircle2 className="mx-auto size-10 text-primary" />
            <h1 className="mt-4 text-xl font-semibold text-foreground">Reserva confirmada!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Recebemos seu pagamento. O voucher e os detalhes do embarque para {PACKAGE.destino}{" "}
              chegam por e-mail e WhatsApp em breve.
            </p>
          </>
        )}

        {status === "not_confirmed" && (
          <>
            <XCircle className="mx-auto size-10 text-muted-foreground" />
            <h1 className="mt-4 text-xl font-semibold text-foreground">
              Ainda não identificamos seu pagamento
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Se você já pagou, pode levar alguns instantes para confirmar. Se precisar de ajuda,
              fale com a gente no WhatsApp.
            </p>
            <Button variant="cta" size="lg" className="mt-6" asChild>
              <a
                href={`https://wa.me/${PACKAGE.whatsapp}?text=${encodeURIComponent(
                  "Olá! Fiz o pagamento da excursão Caldas Novas e quero confirmar minha reserva.",
                )}`}
              >
                <MessageCircle /> Falar no WhatsApp
              </a>
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
