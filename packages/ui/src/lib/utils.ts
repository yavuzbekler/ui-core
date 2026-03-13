// Yardımcı fonksiyonlar
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import slugifyLib from 'slugify';

/** Tailwind CSS sınıflarını birleştir (clsx + tailwind-merge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Para birimi formatla: 1234.56 → "₺1.234,56" */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Tarih formatla: "2026-02-25T10:30:00Z" → "25 Şub 2026" */
export function formatDate(date: string): string {
  return format(parseISO(date), 'd MMM yyyy', { locale: tr });
}

/** Tarih + saat formatla: "2026-02-25T10:30:00Z" → "25 Şub 2026 14:30" */
export function formatDateTime(date: string): string {
  return format(parseISO(date), 'd MMM yyyy HH:mm', { locale: tr });
}

/** Göreli tarih: "2026-02-25T10:30:00Z" → "2 saat önce" */
export function formatRelativeDate(date: string): string {
  return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: tr });
}

/** Türkçe karakter desteğiyle slug oluştur */
export function generateSlug(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    locale: 'tr',
  });
}

/** Metni belirtilen uzunlukta kes */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/** İsimden baş harfleri al: "Ahmet Yılmaz" → "AY" */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
