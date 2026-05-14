export const AUTH_VALUES = ['No', 'apiKey', 'OAuth', 'User-Agent', 'X-Mashape-Key', 'unknown'] as const;
export const CORS_VALUES = ['yes', 'no', 'unknown'] as const;
export const PRICING_VALUES = ['free', 'free_tier', 'paid', 'unknown'] as const;
export const STATUS_VALUES = ['trusted', 'needs_review', 'rejected'] as const;
export const CONSUMER_PROFILES = ['frontend-only', 'backend-required', 'prototype', 'production', 'mobile-app', 'dashboard', 'automation'] as const;
export const FIT_KEYS = ['frontend', 'backend', 'prototype', 'production', 'mobile', 'dashboard', 'automation'] as const;
export const CANONICAL_CATEGORIES = [
  'entertainment', 'weather', 'finance', 'maps', 'jobs', 'news', 'ai',
  'productivity', 'government', 'health', 'education', 'sports', 'games',
  'developer-tools', 'images', 'text', 'data',
] as const;
export function currentDate(override?: string): string {
  return override ?? new Date().toISOString().slice(0, 10);
}
export const DEFAULT_FRESHNESS_DAYS = 90;
