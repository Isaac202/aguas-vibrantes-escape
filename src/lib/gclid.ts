const KEY = "asa_gclid";

/** Persiste o gclid da URL em localStorage (first-party) para sobreviver ao redirect do Asaas. */
export function captureGclid() {
  if (typeof window === "undefined") return;
  const gclid = new URLSearchParams(window.location.search).get("gclid");
  if (gclid) {
    try {
      window.localStorage.setItem(KEY, gclid);
      document.cookie = `${KEY}=${encodeURIComponent(gclid)}; path=/; max-age=7776000; SameSite=Lax`;
    } catch {
      /* ignore */
    }
  }
}

export function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  const fromUrl = new URLSearchParams(window.location.search).get("gclid");
  if (fromUrl) return fromUrl;
  try {
    const ls = window.localStorage.getItem(KEY);
    if (ls) return ls;
  } catch {
    /* ignore */
  }
  const m = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}
