import { useMemo, type FormEvent } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import LoadingDots from './components/LoadingDots'
import SourceBadge from './components/SourceBadge'
import SuggestionChips from './components/SuggestionChips'
import useChat from './hooks/useChat'

const suggestions = ['Como solicitar férias?', 'Quais benefícios tenho direito?', 'Como abrir um chamado de TI?']

function App() {
  const { messages, isLoading, draft, setDraft, sendMessage, clearHistory } = useChat()

  const latestSourceDocs = useMemo(() => {
    return messages
      .filter((message) => message.sources && message.sources.length > 0)
      .flatMap((message) => message.sources ?? [])
  }, [messages])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await sendMessage(draft)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-row">
          <div>
            <h1>Copiloto Corporativo Inteligente</h1>
            <p>Conecte perguntas em linguagem natural à base de conhecimento interna.</p>
          </div>
          <button className="clear-history-button" type="button" onClick={clearHistory}>
            Limpar histórico
          </button>
        </div>
      </header>

      <main className="chat-panel">
        <section className="chat-messages">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="chat-message assistant">
              <div className="chat-avatar">AI</div>
              <div className="chat-content">
                <div className="chat-bubble assistant-bubble">
                  <LoadingDots />
                </div>
              </div>
            </div>
          )}
        </section>

        {messages.length <= 1 && <SuggestionChips suggestions={suggestions} onSelect={setDraft} />}

        <div className="sources-panel">
          <h2>Fontes recentes</h2>
          <div className="sources-list">
            {latestSourceDocs.map((doc) => (
              <SourceBadge key={doc.id} doc={doc} />
            ))}
          </div>
        </div>

        <ChatInput value={draft} onChange={setDraft} onSubmit={handleSubmit} disabled={isLoading} />
      </main>
    </div>
  )
}

export default App
