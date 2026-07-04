import { knowledgeBase } from '../data/knowledge-base'
import type { KnowledgeDoc } from '../types'
import { calculateOverlapScore, tokenize } from '../utils/tfidf'

export interface SearchResult {
  doc: KnowledgeDoc
  score: number
}

export function searchKnowledge(query: string): SearchResult[] {
  const queryTokens = tokenize(query)

  if (queryTokens.length === 0) {
    return []
  }

  const scoredDocs = knowledgeBase
    .map((doc) => {
      const titleTokens = tokenize(doc.titulo)
      const tagTokens = tokenize(doc.tags.join(' '))
      const contentTokens = tokenize(doc.conteudo)

      const titleMatches = queryTokens.filter((token) => titleTokens.includes(token)).length
      const tagMatches = queryTokens.filter((token) => tagTokens.includes(token)).length
      const contentMatches = queryTokens.filter((token) => contentTokens.includes(token)).length
      const contentOverlap = calculateOverlapScore(queryTokens, contentTokens)

      const score = titleMatches * 1.2 + tagMatches * 0.8 + contentOverlap * 0.35 + contentMatches * 0.05

      return { doc, score }
    })
    .filter((item) => item.score >= 0.3)
    .sort((a, b) => b.score - a.score)

  return scoredDocs.slice(0, 3)
}
