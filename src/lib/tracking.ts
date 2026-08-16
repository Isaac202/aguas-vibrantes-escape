type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Pushes secondary-conversion events to the dataLayer.
 * IMPORTANT: no purchase event is fired here — Purchase must only be fired
 * server-side / on the payment confirmation page, never on button clicks.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, currency: "BRL", ...params });
}
