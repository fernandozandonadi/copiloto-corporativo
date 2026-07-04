import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import ChatInput from './ChatInput'

function ChatInputHarness({ onSubmit }: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [value, setValue] = useState('')

  return <ChatInput value={value} onChange={setValue} onSubmit={onSubmit} />
}

describe('ChatInput', () => {
  it('renderiza o campo de entrada e envia o valor ao submeter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault())

    render(<ChatInputHarness onSubmit={onSubmit} />)

    const input = screen.getByPlaceholderText('Pergunte sobre políticas, benefícios ou processos...')
    await user.type(input, 'Como solicitar férias?')

    const button = screen.getByRole('button', { name: /enviar/i })
    await user.click(button)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
