export interface KnowledgeDoc {
  id: string
  categoria: string
  titulo: string
  tags: string[]
  conteudo: string
  atualizadoEm: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: KnowledgeDoc[]
  timestamp: number
}
