import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { track } from "@/lib/tracking";

const KEY = "asa-cupom-10-visto";
const CUPOM = "ASA10";

export function DiscountPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const show = () => {
      setOpen(true);
      localStorage.setItem(KEY, "1");
      track("view_promotion", { promotion: CUPOM, discount: 0.1 });
      window.removeEventListener("mouseout", onLeave);
    };
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 0) show();
    };
    const t = setTimeout(show, 12000);
    window.addEventListener("mouseout", onLeave);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">10% de desconto na sua vaga</DialogTitle>
          <DialogDescription>
            Deixe seus dados e receba o cupom <strong>{CUPOM}</strong> — 10% de desconto no pacote
            Caldas Novas saindo de Brasília, válido para reservas confirmadas por PIX.
          </DialogDescription>
        </DialogHeader>
        <LeadForm origin="popup_desconto" cupom={CUPOM} compact />
      </DialogContent>
    </Dialog>
  );
}
