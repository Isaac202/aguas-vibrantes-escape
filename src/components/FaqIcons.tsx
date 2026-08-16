import { useState } from "react";
import {
  Baby,
  Banknote,
  Bus,
  CalendarX,
  Tag,
  Thermometer,
  UserRound,
  HelpCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faq } from "@/lib/lp-data";

const items = [
  { icon: Bus, label: "Embarque" },
  { icon: Tag, label: "Preço" },
  { icon: UserRound, label: "Viajar sozinho" },
  { icon: Banknote, label: "Pagamento" },
  { icon: Thermometer, label: "Águas termais" },
  { icon: Baby, label: "Crianças" },
  { icon: CalendarX, label: "Cancelamento" },
];

export function FaqIcons() {
  const [open, setOpen] = useState<number | null>(null);
  const item = open === null ? null : faq[open];

  return (
    <>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {faq.map((f, i) => {
          const Icon = items[i]?.icon ?? HelpCircle;
          return (
            <button
              key={f.q}
              type="button"
              onClick={() => setOpen(i)}
              className="group flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-center shadow-soft transition hover:shadow-lift"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <span className="text-xs font-medium leading-tight">
                {items[i]?.label ?? "Dúvida"}
              </span>
            </button>
          );
        })}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left text-lg leading-snug">{item?.q}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{item?.a}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
