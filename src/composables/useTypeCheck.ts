export function useTypeCheck(value: any) {
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) return 'Array'
  return typeof value
}
