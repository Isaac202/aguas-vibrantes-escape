import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BusFront,
  CalendarDays,
  Check,
  CreditCard,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Waves,
  X,
} from "lucide-react";
import heroImg from "@/assets/hero-caldas.jpg";
import busImg from "@/assets/bus-dd.jpg";
import hotelImg from "@/assets/hotel-suite.jpg";
import poolImg from "@/assets/thermal-pool.jpg";
import { PACKAGE, faq, incluido, naoIncluido, roteiro } from "@/lib/lp-data";
import { track } from "@/lib/tracking";

const TITLE = "Caldas Novas 3 Dias Saindo de Brasília | R$ 620 por Pessoa";
const DESCRIPTION =
  "Excursão para Caldas Novas de 11 a 13/09/2026 saindo de Brasília. R$ 620 por pessoa com ônibus Double Decker, 2 noites em hotel da rede diRoma e águas termais. Reserve online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function whatsappUrl(msg: string) {
  return `https://wa.me/${PACKAGE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function LandingPage() {
  const [pax, setPax] = useState(1);
  const total = pax * PACKAGE.precoNumero;

  const startCheckout = () => {
    track("begin_checkout", { value: total, passengers: pax, items: [PACKAGE.destino] });
    window.location.href = whatsappUrl(
      `Olá! Quero reservar a excursão ${PACKAGE.destino} (${PACKAGE.datasLabel}) saindo de Brasília para ${pax} passageiro(s). Total R$ ${total},00.`,
    );
  };

  const whatsappClick = (origin: string) => track("whatsapp_click", { origin });

  return (
    <main>
      {/* HERO */}
      <header className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Piscinas termais de Caldas Novas ao amanhecer, com vapor natural e coqueiros"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-thermal-gradient opacity-85" />
        <div className="relative mx-auto w-full max-w-5xl px-5 py-16 text-thermal-foreground md:py-24">
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold tracking-wide">
            <Waves className="size-5" />
            {PACKAGE.empresa}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">
              <MapPin className="mr-1 size-3" /> Saída de {PACKAGE.origem}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              <CalendarDays className="mr-1 size-3" /> {PACKAGE.datasLabel}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              <Thermometer className="mr-1 size-3" /> Águas de 37°C a 57°C
            </Badge>
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] md:text-6xl">
            Caldas Novas — 3 dias e 2 noites saindo de Brasília
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-90 md:text-lg">
            Ônibus executivo Double Decker, hospedagem na rede diRoma com piscinas termais e dois
            dias livres para descansar. Ideal para quem trabalha muito e tem pouco tempo.
          </p>

          <div className="mt-8 grid gap-4 rounded-3xl bg-card/95 p-6 text-card-foreground shadow-lift md:max-w-lg">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Por pessoa, em apto triplo
                </p>
                <p className="font-display text-4xl">{PACKAGE.preco}</p>
                <p className="text-sm text-muted-foreground">{PACKAGE.parcelas}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Ida {PACKAGE.ida}</p>
                <p>Volta {PACKAGE.volta}</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
              <span className="text-sm font-medium">Passageiros</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Remover passageiro"
                  onClick={() => setPax((p) => Math.max(1, p - 1))}
                >
                  <Minus />
                </Button>
                <span className="w-6 text-center font-semibold">{pax}</span>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Adicionar passageiro"
                  onClick={() => setPax((p) => Math.min(10, p + 1))}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <Button variant="cta" size="xl" className="w-full" onClick={startCheckout}>
              Reservar por R$ {total},00
            </Button>
            <a
              href={whatsappUrl(`Olá! Tenho dúvidas sobre a excursão ${PACKAGE.destino}.`)}
              onClick={() => whatsappClick("hero")}
              className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Falar com um consultor no WhatsApp
            </a>
          </div>

          <ul className="mt-8 grid gap-2 text-sm opacity-90 sm:grid-cols-2">
            {[
              "Transporte ida e volta incluído",
              "2 noites com café da manhã",
              "Piscinas termais no hotel",
              "Seguro de viagem incluído",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="size-4" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </header>




      {/* PRÓXIMA SAÍDA */}
      <Section className="bg-sand">
        <SectionTitle eyebrow="Próximas saídas" title="Data confirmada de embarque" />
        <div className="flex flex-col gap-6 rounded-3xl border bg-card p-6 shadow-soft md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-display text-2xl">11 a 13 de setembro de 2026</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sexta a domingo · 3 dias e 2 noites · embarque em Brasília às 07h00
            </p>
          </div>
          <Button
            variant="thermal"
            size="lg"
            onClick={() => {
              track("select_date", { date: "2026-09-11" });
              startCheckout();
            }}
          >
            Garantir minha vaga
          </Button>
        </div>
      </Section>

      {/* ROTEIRO */}
      <Section id="roteiro" className="bg-background">
        <SectionTitle eyebrow="Roteiro" title="Como são os seus 3 dias" />
        <div className="grid gap-6">
          {roteiro.map((dia) => (
            <article key={dia.dia} className="rounded-3xl border bg-card p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {dia.dia}
              </p>
              <h3 className="mt-2 text-xl">{dia.titulo}</h3>
              <ul className="mt-5 grid gap-3">
                {dia.itens.map((it) => (
                  <li key={it.hora + it.texto} className="flex flex-col gap-1 border-t pt-3 sm:flex-row sm:gap-6">
                    <span className="w-40 shrink-0 text-sm font-semibold">{it.hora}</span>
                    <span className="text-sm text-muted-foreground">{it.texto}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* FOTOS / ATRATIVOS */}
      <Section className="bg-sand">
        <SectionTitle eyebrow="Atrativos" title="Águas termais, descanso e boa companhia" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { src: poolImg, alt: "Grupo relaxando em piscina de água termal ao anoitecer" },
            { src: busImg, alt: "Ônibus executivo Double Decker DD em rodovia ao amanhecer" },
            { src: hotelImg, alt: "Apartamento triplo em hotel de Caldas Novas com vista para as piscinas" },
          ].map((img) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={1200}
              height={800}
              className="h-44 w-full rounded-3xl object-cover shadow-soft"
            />
          ))}
        </div>
      </Section>


      {/* HOSPEDAGEM E TRANSPORTE */}
      <Section className="bg-background">
        <SectionTitle eyebrow="Hospedagem e transporte" title="Onde você dorme e como você viaja" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 text-lg">
              <Waves className="size-5 text-primary" /> Hotel Boulevard Suítes
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ou unidade equivalente da rede diRoma. Apartamento triplo compartilhado, café da manhã
              incluído e acesso às piscinas termais da estrutura.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {[
                "Apartamento triplo com ar-condicionado e TV",
                "Piscinas termais na própria estrutura",
                "Café da manhã incluído nas 2 manhãs",
                "Localização com acesso fácil ao complexo diRoma",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <h3 className="flex items-center gap-2 text-lg">
              <BusFront className="size-5 text-primary" /> Ônibus Double Decker DD
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Conforto premium para as cerca de 5 horas de viagem entre Brasília e Caldas Novas.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {[
                "Poltronas reclináveis executivas",
                "Dois andares com visão panorâmica",
                "Ar-condicionado, banheiro e TV a bordo",
                "Seguro total e motorista credenciado",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      {/* INCLUSÕES */}
      <Section className="bg-sand">
        <SectionTitle eyebrow="Inclusões" title="O que está e o que não está incluído" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg">Está incluído</h3>
            <ul className="mt-4 grid gap-3 text-sm">
              {incluido.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <h3 className="text-lg">Não está incluído</h3>
            <ul className="mt-4 grid gap-3 text-sm">
              {naoIncluido.map((i) => (
                <li key={i} className="flex gap-2">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" /> {i}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      {/* PAGAMENTO, EMBARQUE, CANCELAMENTO */}
      <Section className="bg-background">
        <SectionTitle eyebrow="Condições" title="Pagamento, embarque e cancelamento" />
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <CreditCard className="size-6 text-primary" />
            <h3 className="mt-4 text-lg">Formas de pagamento</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>PIX à vista com confirmação imediata</li>
              <li>Cartão de crédito em até 6x</li>
              <li>Reserva confirmada só após pagamento aprovado</li>
              <li>Comprovante e voucher enviados por e-mail</li>
            </ul>
          </article>
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <MapPin className="size-6 text-primary" />
            <h3 className="mt-4 text-lg">Embarque</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>Brasília - DF, dia 11/09/2026</li>
              <li>Chegada ao ponto às 07h00, saída às 07h30</li>
              <li>Endereço exato enviado até 48h antes</li>
              <li>Documento oficial com foto obrigatório</li>
            </ul>
          </article>
          <article className="rounded-3xl border bg-card p-6 shadow-soft">
            <ShieldCheck className="size-6 text-primary" />
            <h3 className="mt-4 text-lg">Cancelamento</h3>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>+30 dias: reembolso de 100% menos 10% administrativo</li>
              <li>30 a 15 dias: reembolso de 50%</li>
              <li>-15 dias: sem reembolso, com transferência de vaga gratuita</li>
            </ul>
          </article>
        </div>
      </Section>

      {/* LEAD FORM + CONFIANÇA */}
      <Section id="contato" className="bg-sand">
        <div className="grid gap-8 rounded-3xl border bg-card p-6 shadow-soft md:grid-cols-2 md:p-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Fale com a Asa Turismo
            </p>
            <h2 className="text-2xl leading-tight md:text-3xl">
              Receba o roteiro completo e reserve sua vaga
            </h2>
            <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
              {[
                "Ônibus e motorista credenciados, com seguro de viagem",
                "Equipe de apoio por WhatsApp antes e durante a viagem",
                "Voucher nominal de hospedagem enviado por e-mail",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm origin="secao_contato" />
        </div>
      </Section>


      {/* FAQ */}
      <Section className="bg-background">
        <SectionTitle eyebrow="Dúvidas frequentes" title="Perguntas antes de reservar" />
        <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6 shadow-soft">
          {faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA FINAL */}
      <section id="reservar" className="relative isolate overflow-hidden px-5 py-20 md:py-28">
        <div className="absolute inset-0 bg-thermal-gradient" />
        <div className="relative mx-auto w-full max-w-3xl text-center text-thermal-foreground">
          <h2 className="text-3xl md:text-5xl">Sua vaga em Caldas Novas por {PACKAGE.preco}</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            3 dias e 2 noites, de 11 a 13/09/2026, saindo de Brasília. Transporte, hospedagem e café
            da manhã incluídos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="cta" size="xl" onClick={startCheckout}>
              Reservar agora — R$ {total},00
            </Button>
            <Button variant="onHero" size="xl" asChild>
              <a
                href={whatsappUrl(`Olá! Quero informações sobre a excursão ${PACKAGE.destino}.`)}
                onClick={() => whatsappClick("cta_final")}
              >
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            {PACKAGE.empresa} · {PACKAGE.whatsappLabel} · {PACKAGE.email}
          </p>
        </div>
      </section>

      <footer className="border-t bg-card px-5 py-8 text-center text-xs text-muted-foreground">
        <p>
          {PACKAGE.empresa} — excursões saindo de Brasília. Valores por pessoa em apartamento triplo
          compartilhado, sujeitos a disponibilidade de vagas.
        </p>
      </footer>

      {/* Barra fixa mobile */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t bg-card/95 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="text-xs text-muted-foreground">por pessoa</p>
          <p className="font-display text-lg leading-none">{PACKAGE.preco}</p>
        </div>
        <Button variant="cta" size="lg" onClick={startCheckout}>
          Reservar agora
        </Button>
      </div>
      <div className="h-20 md:hidden" />
    </main>
  );
}
