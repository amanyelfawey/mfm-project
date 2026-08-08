/**
 * Resolves a public asset path against Vite's base URL so images work both
 * in local dev (base `/`) and when deployed under a subpath such as
 * GitHub Pages (`/mfm-project/`).
 *
 * Accepts a leading-slash path like `/images/hero/1.webp` and returns it
 * prefixed with the current base, e.g. `/mfm-project/images/hero/1.webp`.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\/+/, '')}`
}
