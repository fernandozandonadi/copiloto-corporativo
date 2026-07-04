# Spec — Copiloto Corporativo Inteligente

---

## 1. Visão Geral

Construir uma SPA que funcione como assistente corporativo inteligente para a empresa fictícia TechNova Solutions. O usuário deve conseguir fazer perguntas em linguagem natural e receber respostas com base em uma base de conhecimento interna.

---

## 2. Problema

Colaboradores frequentemente precisam consultar políticas internas, benefícios e procedimentos operacionais. A solução proposta reduz o tempo de busca e centraliza o acesso à informação corporativa.

---

## 3. Solução

O sistema usa um fluxo simples de RAG no frontend:

1. O usuário escreve uma pergunta em português.
2. O sistema recupera os documentos mais relevantes da base de conhecimento.
3. O contexto é injetado no prompt do modelo Gemini.
4. O assistente responde com base no conteúdo corporativo.
5. As fontes usadas são exibidas ao usuário.

---

## 4. Base de Conhecimento

A base de conhecimento contém documentos fictícios agrupados por categorias, como RH, benefícios, TI, onboarding, processos e treinamentos.

### Estrutura do Documento

```ts
interface KnowledgeDoc {
  id: string;
  categoria: string;
  titulo: string;
  tags: string[];
  conteudo: string;
  atualizadoEm: string;
}
```

---

## 5. Histórias de Usuário

### US-01 — Consulta em Linguagem Natural
Como colaborador, quero digitar uma pergunta em português para receber uma resposta clara sem abrir documentos.

Critérios de aceite:
- a resposta deve ser gerada com base no contexto recuperado
- o sistema deve retornar uma mensagem segura quando não houver contexto relevante

### US-02 — Visualização das Fontes
Como colaborador, quero ver quais documentos foram usados para gerar a resposta.

### US-03 — Histórico de Conversa
Como usuário, quero que o sistema preserve a conversa durante a sessão e permita limpar o histórico.

### US-04 — Sugestões de Perguntas
Como novo colaborador, quero ver perguntas frequentes iniciais para começar a usar o assistente.

---

## 6. Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|-----------|
| RF-01 | Interface de chat com input e histórico de mensagens | Alta |
| RF-02 | Busca na base de conhecimento por relevância | Alta |
| RF-03 | Integração com a API do Google Gemini | Alta |
| RF-04 | Injeção de contexto relevante no prompt | Alta |
| RF-05 | Exibição das fontes usadas na resposta | Alta |
| RF-06 | Sugestões de perguntas na tela inicial | Média |
| RF-07 | Histórico da sessão com localStorage | Média |
| RF-08 | Estado de loading durante a chamada à API | Alta |
| RF-09 | Mensagem de fallback quando não há contexto relevante | Alta |
| RF-10 | Cobertura de testes automatizados | Média |

---

## 7. Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | MVP sem backend próprio |
| RNF-02 | Código em TypeScript com tipagem |
| RNF-03 | API key configurada via variável de ambiente |
| RNF-04 | Testes automatizados para os fluxos principais |
| RNF-05 | Interface responsiva para uso básico em navegador |

---

## 8. Fora de Escopo

- Autenticação de usuários
- Upload de documentos pelo usuário
- Banco de dados persistente
- Backend próprio para proteger a chave da API
- Suporte a múltiplos idiomas

---

## 9. Segurança e Mitigação de Riscos

- O system prompt instrui o modelo a ignorar tentativas de sobrescrita.
- O conteúdo renderizado é tratado como texto e não como código executável.
- A chave do Gemini é lida a partir de variáveis de ambiente.
- O histórico é armazenado localmente de forma simples e pode ser limpo pelo usuário.

---