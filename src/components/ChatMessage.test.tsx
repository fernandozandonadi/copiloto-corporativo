import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ChatMessage from './ChatMessage'

describe('ChatMessage', () => {
  it('renderiza o conteúdo de uma mensagem de usuário e da assistente', () => {
    const userMessage = {
      id: 'u1',
      role: 'user' as const,
      content: 'Quero saber sobre férias',
      timestamp: Date.parse('2025-01-01T10:00:00Z'),
    }

    const assistantMessage = {
      id: 'a1',
      role: 'assistant' as const,
      content: 'Você pode solicitar férias pelo portal RH.',
      timestamp: Date.parse('2025-01-01T10:01:00Z'),
    }

    const { rerender } = render(<ChatMessage message={userMessage} />)
    expect(screen.getByText('Quero saber sobre férias')).toBeInTheDocument()

    rerender(<ChatMessage message={assistantMessage} />)
    expect(screen.getByText('Você pode solicitar férias pelo portal RH.')).toBeInTheDocument()
  })
})
