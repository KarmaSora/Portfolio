import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the base path for the app (handles GitHub Pages subpath deployment)
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

/**
 * Prefix a path with the base path (for assets like images, PDFs)
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
}
