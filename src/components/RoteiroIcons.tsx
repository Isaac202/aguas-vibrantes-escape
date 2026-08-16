import { useState } from "react";
import { BusFront, Sunrise, Waves } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { roteiro } from "@/lib/lp-data";

const icons = [BusFront, Waves, Sunrise];

export function RoteiroIcons() {
  const [open, setOpen] = useState<number | null>(null);
  const dia = open === null ? null : roteiro[open];

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
        {roteiro.map((d, i) => {
          const Icon = icons[i] ?? BusFront;
          return (
            <button
              key={d.dia}
              type="button"
              onClick={() => setOpen(i)}
              className="group flex items-center gap-4 rounded-3xl border bg-card p-4 text-left shadow-soft transition hover:shadow-lift sm:flex-col sm:items-center sm:p-5 sm:text-center"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground sm:size-14">
                <Icon className="size-6 sm:size-7" />
              </span>
              <span className="min-w-0 sm:flex sm:flex-col sm:gap-2">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {d.dia}
                </span>
                <span className="block text-sm leading-snug">{d.titulo}</span>
                <span className="block text-xs text-muted-foreground underline">ver detalhes</span>
              </span>
            </button>
          );
        })}
      </div>


      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogDescription className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {dia?.dia}
            </DialogDescription>
            <DialogTitle className="text-left text-xl leading-snug">{dia?.titulo}</DialogTitle>
          </DialogHeader>
          <ul className="grid gap-2">
            {dia?.itens.map((it) => (
              <li key={it.hora + it.texto} className="border-t pt-2 text-sm">
                <span className="font-semibold">{it.hora}</span>{" "}
                <span className="text-muted-foreground">{it.texto}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
