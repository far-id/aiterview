import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeConversationText(raw: string): string {
  return raw
    .replace(/\\n\s*\+?\s*/g, '\n') // Ganti \n + spasi jadi newline
    .replace(/^['"`]\s*|\s*['"`]$/g, '') // Hapus kutip awal/akhir jika ada
    .replace(/\s*['"`]\s*\+\s*['"`]/g, '') // Gabungkan antar string
    .trim(); // Hapus spasi ekstra di awal/akhir
}
