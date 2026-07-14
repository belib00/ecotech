import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes condicionais (clsx) e resolve conflitos
 * de utilitários Tailwind (tailwind-merge).
 * Usada pelos componentes de UI (select, toast, tooltip).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
