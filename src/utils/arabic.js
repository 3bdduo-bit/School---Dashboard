/**
 * Normalizes Arabic text for smarter searching.
 * Treats أ, إ, آ as ا
 * Treats ة as ه
 * Removes Arabic diacritics (Tashkeel)
 */
export const normalizeArabic = (text) => {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
    .toLowerCase()
    .trim();
};
