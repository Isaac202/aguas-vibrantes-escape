import { gtag } from "./gtag";

/**
 * Sends secondary-conversion events to GA4 (and Google Ads, same gtag.js load).
 * IMPORTANT: no purchase event is fired here — Purchase must only be fired
 * server-side / on the payment confirmation page, never on button clicks.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  const g = gtag();
  if (!g) return;
  g("event", event, { currency: "BRL", ...params });
}
