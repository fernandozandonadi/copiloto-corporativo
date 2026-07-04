import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { askCopilot } from '../services/geminiService'
import { searchKnowledge } from '../services/ragService'
import type { Message } from '../types'

const STORAGE_KEY = 'copiloto-chat-history'

interface UseChatResult {
  messages: Message[]
  isLoading: boolean
  draft: string
  setDraft: (value: string) => void
  sendMessage: (content: string) => Promise<void>
  clearHistory: () => void
}

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Olá! Como posso ajudar com políticas, benefícios ou processos da TechNova?',
    timestamp: Date.now(),
  },
]

function readStoredMessages(): Message[] {
  if (typeof window === 'undefined') {
    return initialMessages
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return initialMessages
    }

    const parsed = JSON.parse(raw) as Message[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialMessages
  } catch {
    return initialMessages
  }
}

function persistMessages(messages: Message[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch {
    // Ignora falhas de storage em modo privado ou ambientes restritos.
  }
}

function clearStoredMessages(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignora falhas de storage em modo privado ou ambientes restritos.
  }
}

function useChat(): UseChatResult {
  const [messages, setMessages] = useState<Message[]>(() => readStoredMessages())
  const messagesRef = useRef<Message[]>(messages)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    messagesRef.current = messages
    persistMessages(messages)
  }, [messages])

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed) {
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }

    setMessages((current) => [...current, userMessage])
    setDraft('')
    setIsLoading(true)

    try {
      messagesRef.current = [...messagesRef.current, userMessage]

      const relevantDocs = searchKnowledge(trimmed)
      const sources = relevantDocs.map((item) => item.doc)
      const response = await askCopilot(trimmed, sources, messagesRef.current)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        sources,
        timestamp: Date.now(),
      }

      setMessages((current) => [...current, assistantMessage])
    } catch {
      const fallbackMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Não consegui processar sua mensagem neste momento. Tente novamente em instantes.',
        timestamp: Date.now(),
      }

      setMessages((current) => [...current, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearHistory = useCallback(() => {
    setMessages(initialMessages)
    setDraft('')
    setIsLoading(false)
    clearStoredMessages()
  }, [])

  return useMemo(
    () => ({
      messages,
      isLoading,
      draft,
      setDraft,
      sendMessage,
      clearHistory,
    }),
    [messages, isLoading, draft, sendMessage, clearHistory],
  )
}

export default useChat
