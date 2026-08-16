export const GOOGLE_ADS_ID = "AW-18294112878";
export const PURCHASE_CONVERSION_LABEL = "U83sCNrTqeIcEO6EqJNE";

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { gtag?: Gtag };
  return w.gtag ?? null;
}

/**
 * Dispara a conversão de Compra do Google Ads.
 * SOMENTE deve ser chamada na página de pagamento CONFIRMADO pelo Asaas.
 * Deduplicação: transaction_id único + guarda em localStorage.
 */
export function firePurchaseConversion(opts: {
  value: number;
  transactionId: string;
}) {
  const g = gtag();
  if (!g || !opts.transactionId) return false;
  const key = `asa_purchase_sent_${opts.transactionId}`;
  try {
    if (window.localStorage.getItem(key)) return false;
    window.localStorage.setItem(key, "1");
  } catch {
    /* ignore */
  }
  g("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${PURCHASE_CONVERSION_LABEL}`,
    value: opts.value,
    currency: "BRL",
    transaction_id: opts.transactionId,
  });
  return true;
}
