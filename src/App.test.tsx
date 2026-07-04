import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import type { Message } from './types'

const sendMessage = vi.fn()
const clearHistory = vi.fn()

vi.mock('./hooks/useChat', async () => {
  const React = await import('react')

  return {
    default: () => {
      const [messages, setMessages] = React.useState<Message[]>([
        {
          id: 'welcome',
          role: 'assistant' as const,
          content: 'Olá! Como posso ajudar?',
          timestamp: Date.now(),
        },
      ])
      const [draft, setDraft] = React.useState('')
      const [isLoading] = React.useState(false)

      const handleSendMessage = React.useCallback(async (content: string) => {
        sendMessage(content)
        setMessages((current) => [...current, { id: 'user-1', role: 'user' as const, content, timestamp: Date.now() }])
        setDraft('')
      }, [])

      return {
        messages,
        isLoading,
        draft,
        setDraft,
        sendMessage: handleSendMessage,
        clearHistory,
      }
    },
  }
})

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza o título e permite enviar uma mensagem', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByRole('heading', { name: /copiloto corporativo inteligente/i })).toBeInTheDocument()
    expect(screen.getByText(/conecte perguntas/i)).toBeInTheDocument()

    const input = screen.getByPlaceholderText(/pergunte sobre políticas/i)
    await user.type(input, 'Quero saber sobre férias')

    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(sendMessage).toHaveBeenCalledWith('Quero saber sobre férias')
  })
})
