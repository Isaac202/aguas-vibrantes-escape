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
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {roteiro.map((d, i) => {
          const Icon = icons[i] ?? BusFront;
          return (
            <button
              key={d.dia}
              type="button"
              onClick={() => setOpen(i)}
              className="group flex flex-col items-center gap-3 rounded-3xl border bg-card p-5 text-center shadow-soft transition hover:shadow-lift"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-7" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                {d.dia}
              </span>
              <span className="text-sm leading-snug">{d.titulo}</span>
              <span className="text-xs text-muted-foreground underline">ver detalhes</span>
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
