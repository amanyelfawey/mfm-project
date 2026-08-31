/**
 * Resolves a public asset path against Vite's base URL so images work in dev
 * and production (custom domain or subpath deploys via VITE_BASE_PATH).
 */
export function asset(path: string): string {
  // If it's already an absolute URL or a Vite-resolved asset path (starts with /assets/ or /src/), return it as is
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/assets/') || path.startsWith('/src/')) {
    return path
  }
  
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\/+/, '')}`
}
