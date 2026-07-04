import { describe, expect, it } from 'vitest'
import { searchKnowledge } from './ragService'

describe('searchKnowledge', () => {
  it('retorna documentos relevantes para uma consulta sobre férias', () => {
    const results = searchKnowledge('como solicitar férias')

    expect(results.length).toBeGreaterThan(0)
    expect(results[0].doc.titulo).toContain('Férias')
  })

  it('retorna uma lista vazia para uma consulta sem termos úteis', () => {
    const results = searchKnowledge('asdf qwer zxcv')

    expect(results).toEqual([])
  })
})
