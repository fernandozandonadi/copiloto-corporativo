import type { ReactNode } from 'react'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }
}

const sanitizeTextForDisplay = (value: string): string =>
  value.replace(/\u0000/g, '').replace(/<(\/?)(script|style|img|svg|iframe|object|embed|link|meta)(\s|>)/gi, '')

const renderInlineMarkdown = (text: string): ReactNode[] => {
  const safeText = sanitizeTextForDisplay(text)
  const parts: ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(safeText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(safeText.slice(lastIndex, match.index))
    }

    const token = match[1]

    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(<em key={`${token}-${match.index}`}>{token.slice(1, -1)}</em>)
    } else {
      parts.push(<code key={`code-${match.index}`} className="markdown-code">{token.slice(1, -1)}</code>)
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < safeText.length) {
    parts.push(safeText.slice(lastIndex))
  }

  return parts
}

const renderMarkdown = (text: string): ReactNode[] => {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => sanitizeTextForDisplay(block.trim()))
    .filter(Boolean)

  return blocks.map((block, index) => {
    if (block.startsWith('- ')) {
      const items = block
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item, itemIndex) => (
          <li key={`${itemIndex}-${index}`}>{renderInlineMarkdown(item.replace(/^-\s/, ''))}</li>
        ))

      return (
        <ul key={`list-${index}`} className="markdown-list">
          {items}
        </ul>
      )
    }

    if (block.startsWith('# ')) {
      return (
        <h3 key={`heading-${index}`} className="markdown-heading">
          {renderInlineMarkdown(block.replace(/^#\s/, ''))}
        </h3>
      )
    }

    return (
      <p key={`paragraph-${index}`} className="markdown-paragraph">
        {renderInlineMarkdown(block)}
      </p>
    )
  })
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const formattedTime = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && <div className="chat-avatar">AI</div>}

      <div className="chat-content">
        <div className={`chat-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
          {renderMarkdown(message.content)}
        </div>
        <span className="chat-time">{formattedTime}</span>
      </div>

      {isUser && <div className="chat-avatar user-avatar">Você</div>}
    </div>
  )
}

export default ChatMessage
