# Arquitetura — Copiloto Corporativo Inteligente

---

## 1. Visão Geral

A solução é uma SPA React + TypeScript sem backend próprio. A lógica de busca e recuperação acontece no navegador e as respostas são geradas por meio da API do Google Gemini.

```text
Usuário → Interface React → Hook useChat → RAG Service → Gemini Service → Resposta + fontes
```

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| UI | React 19 + TypeScript 6 | Componentização e tipagem forte |
| Build | Vite 8 | Desenvolvimento rápido e build leve |
| Estilização | CSS tradicional | Simplicidade para um MVP acadêmico |
| Testes | Vitest + Testing Library | Cobertura de componentes, hooks e serviços |
| LLM | Google Gemini Flash | Integração simples com API key e contexto relevante |
| Deploy | Vercel | Hospedagem simples e compatível com variáveis de ambiente |

---

## 3. Estrutura de Arquivos

```text
copiloto-corporativo/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── test/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── docs/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── spec.md
├── arquitetura.md
└── vite.config.ts
```

---

## 4. Componentes Principais

### 4.1 useChat
Responsável por:
- manter mensagens e draft do input
- persistir o histórico em localStorage
- chamar o serviço de busca e o serviço do Gemini
- controlar o estado de loading

### 4.2 ragService
Implementa a recuperação de documentos com base em tokens e overlap de palavras. O ranking é simples e suficiente para o escopo do projeto.

### 4.3 geminiService
Responsável por montar o prompt com:
- instruções do sistema
- contexto recuperado
- histórico recente da conversa
- mensagem atual do usuário

### 4.4 Componentes de UI
- ChatInput: input controlado e botão de envio
- ChatMessage: renderização das mensagens
- SourceBadge: exibição das fontes utilizadas
- SuggestionChips: sugestões iniciais

---

## 5. Fluxo de Dados

```text
1. O usuário envia uma pergunta
2. O hook useChat chama searchKnowledge
3. Os documentos mais relevantes são recuperados
4. O prompt é montado com contexto e histórico
5. A resposta é exibida na interface e as fontes são mostradas
6. O histórico é salvo em localStorage
```

---

## 6. Gestão da API Key

A chave do Gemini é lida pelo Vite por meio de import.meta.env.VITE_GEMINI_API_KEY e deve ser configurada em um arquivo .env.local localmente, ou nas variáveis de ambiente do ambiente de deploy.

---

## 7. Limitações do MVP

- A API key fica no frontend, o que é aceitável para o escopo acadêmico, mas não é a melhor abordagem para produção.
- A persistência em localStorage é simples e funcional, porém limitada em segurança.
- A base de conhecimento é estática e fictícia.

---

## 8. Estratégia de Testes

Os testes cobrem:
- services (RAG e Gemini)
- hooks (useChat)
- componentes (ChatInput, ChatMessage, SourceBadge)
- integração da tela principal (App)

Comando de execução:

```bash
npm test
```
