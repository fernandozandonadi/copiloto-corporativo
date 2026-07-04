import type { FormEvent } from 'react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  disabled?: boolean
}

function ChatInput({ value, onChange, onSubmit, disabled = false }: ChatInputProps) {
  return (
    <form className="chat-input-form" onSubmit={onSubmit}>
      <input
        className="chat-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pergunte sobre políticas, benefícios ou processos..."
        disabled={disabled}
      />
      <button className="chat-send-button" type="submit" disabled={disabled || !value.trim()}>
        Enviar
      </button>
    </form>
  )
}

export default ChatInput
