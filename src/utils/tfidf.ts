const STOPWORDS_PT_BR = [
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'em', 'no', 'na', 'para', 'com', 'por', 'que', 'se', 'é', 'são', 'ter', 'como', 'qual', 'quando', 'eu', 'você', 'ele', 'ela', 'meu', 'seu', 'nos', 'nas', 'dos', 'das', 'ao', 'aos', 'este', 'esta', 'estes', 'estas', 'isso', 'aquilo', 'mais', 'menos', 'muito', 'muita', 'muitos', 'muitas', 'pelo', 'pela', 'pelos', 'pelas'
]

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !STOPWORDS_PT_BR.includes(token))
}

export function calculateOverlapScore(queryTokens: string[], documentTokens: string[]): number {
  if (queryTokens.length === 0) {
    return 0
  }

  const documentSet = new Set(documentTokens)
  const matches = queryTokens.filter((token) => documentSet.has(token)).length

  return matches / queryTokens.length
}
