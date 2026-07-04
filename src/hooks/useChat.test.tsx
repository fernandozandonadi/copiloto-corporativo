import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useChat from './useChat'

vi.mock('../services/geminiService', () => ({
  askCopilot: vi.fn().mockResolvedValue('Resposta simulada'),
}))

vi.mock('../services/ragService', () => ({
  searchKnowledge: vi.fn().mockReturnValue([{ doc: { id: '1', categoria: 'rh', titulo: 'Política', tags: ['teste'], conteudo: 'conteúdo', atualizadoEm: '2025-01-01' }, score: 1 }]),
}))

describe('useChat', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.clearAllMocks()
  })

  it('envia uma mensagem e adiciona a resposta do assistente', async () => {
    const { result } = renderHook(() => useChat())

    await act(async () => {
      await result.current.sendMessage('Quero saber sobre férias')
    })

    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[1].role).toBe('user')
    expect(result.current.messages[2]?.role).toBe('assistant')
    expect(result.current.messages[2]?.content).toBe('Resposta simulada')
  })

  it('limpa o histórico e remove o storage', () => {
    const { result } = renderHook(() => useChat())

    act(() => {
      result.current.clearHistory()
    })

    expect(result.current.messages[0].content).toContain('Olá!')
    expect(window.localStorage.getItem('copiloto-chat-history')).toBeNull()
  })
})
