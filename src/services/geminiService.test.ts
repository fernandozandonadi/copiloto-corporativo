import { beforeEach, describe, expect, it, vi } from 'vitest'
import { askCopilot } from './geminiService'
import type { KnowledgeDoc, Message } from '../types'

describe('askCopilot', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key')
  })

  it('retorna uma resposta do modelo quando a API responde com sucesso', async () => {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Resposta gerada' }] } }],
      }),
    } as Response)

    const docs: KnowledgeDoc[] = [
      {
        id: '1',
        categoria: 'rh',
        titulo: 'Política de Férias',
        tags: ['ferias'],
        conteudo: 'Férias podem ser solicitadas com antecedência.',
        atualizadoEm: '2025-01-01',
      },
    ]

    const history: Message[] = [{ id: 'h1', role: 'user', content: 'Olá', timestamp: 1 }]

    const response = await askCopilot('Como solicitar férias?', docs, history)

    expect(response).toBe('Resposta gerada')
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('retorna uma mensagem de fallback quando não há contexto', async () => {
    const response = await askCopilot('Como funciona isso?', [], [])

    expect(response).toContain('Não encontrei')
  })
})
