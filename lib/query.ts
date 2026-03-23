function toStringValue(value: unknown) {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  return null
}

export function parsePage(value: unknown, fallback = 1) {
  const stringValue = toStringValue(value)
  if (!stringValue) return fallback
  const parsed = Number.parseInt(stringValue, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function parseQuery(value: unknown) {
  const stringValue = toStringValue(value)
  if (!stringValue) return ''
  return stringValue.trim()
}

export type ArabicPreference = {
  enabled: boolean
  param: 'include' | 'exclude'
}

export function parseArabicDiacritics(value: unknown): ArabicPreference {
  const stringValue = toStringValue(value)
  if (stringValue && stringValue.toLowerCase() === 'include') {
    return { enabled: true, param: 'include' }
  }
  return { enabled: false, param: 'exclude' }
}
