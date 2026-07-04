# Evidências de Uso de IA no Desenvolvimento
## Copiloto Corporativo Inteligente — UniFECAF 2025/2026

> Registro das interações com GitHub Copilot CLI durante o desenvolvimento.
> Organizado por agente conforme definido no planejamento do projeto.

---

## Agente Frontend Dev

### Sessão: Criação dos Componentes de UI

**Prompt:**
> Crie o componente ChatMessage.tsx que exibe mensagens do user (azul, direita) e do assistente (cinza, esquerda), com suporte a markdown simples e exiba na tela

**Ações realizadas pelo Copilot:**
- Leu a estrutura existente em `src/components/`, `src/App.tsx` e `package.json`
- Criou `src/components/ChatMessage.tsx` (componente completo com 194 linhas)
- Atualizou `src/App.tsx` e `src/App.css` para integrar o componente
- Rodou `npm run build` para validar a compilação

**Resultado:** ✅ Build concluída sem erros

---

**Prompt:**
> pode seguir com a implementação da interface

**Ações realizadas pelo Copilot:**
- Criou `src/types/index.ts` com as interfaces do projeto
- Criou `src/components/ChatInput.tsx`
- Criou `src/components/SuggestionChips.tsx`
- Criou `src/components/LoadingDots.tsx`
- Criou `src/components/SourceBadge.tsx`
- Expandiu `src/App.tsx` de 194 para 418 linhas com fluxo completo
- Identificou e corrigiu 2 erros de TypeScript autonomamente
- Rodou `npm run build` para validar

**Resultado:** ✅ Build concluída sem erros

---

**Prompt:**
> antes implemente o hook useChat.ts que gerencia estado das mensagens, isLoading, e persiste no localStorage

**Ações realizadas pelo Copilot:**
- Criou `src/hooks/useChat.ts` com gerenciamento de estado e persistência
- Refatorou `src/App.tsx` para usar o hook (reduziu de 134 para 76 linhas)
- Corrigiu detalhe de estado do hook para histórico recente
- Rodou `npm run build` para validar

**Resultado:** ✅ Build concluída sem erros

---

**Prompt (cross-agent — referenciando memória do Arquiteto):**
> Baseado na conversa com o Arquiteto em outro chat busque na memória e implemente o item 2 do P1

**Ações realizadas pelo Copilot:**
- Consultou a memória persistida em `memories/repo/seguranca-decisoes.md`
- Leu `src/components/ChatMessage.tsx` e `src/components/SourceBadge.tsx`
- Buscou ocorrências de `dangerouslySetInnerHTML` e `innerHTML` no projeto
- Aplicou hardening de sanitização nos dois componentes
- Rodou `npm run build` para validar

**Resultado:** ✅ XSS mitigado, build concluída sem erros

---

## Agente RAG Dev

### Sessão: Base de Conhecimento e Motor de Busca

**Prompt:**
> Crie o arquivo knowledge-base.ts completo com pelo menos 15 documentos realistas da TechNova Solutions

**Ações realizadas pelo Copilot:**
- Leu `src/types/index.ts` para respeitar as interfaces definidas
- Verificou a pasta `src/data/` (estava vazia)
- Criou `src/data/knowledge-base.ts` com 15 documentos corporativos fictícios cobrindo as 6 categorias

**Resultado:** ✅ Base criada com linguagem corporativa, valores realistas e tags para busca

---

**Prompt:**
> sim siga com a criação do serviço

**Ações realizadas pelo Copilot:**
- Verificou `src/services/`, `src/utils/`, `tsconfig.app.json` e `src/hooks/useChat.ts`
- Criou `src/utils/tfidf.ts` — tokenização e scoring
- Criou `src/services/ragService.ts` — busca TF-IDF com boost de título e tags
- Criou `src/services/geminiService.ts` — integração com Gemini API
- Conectou o hook `useChat.ts` aos novos serviços
- Rodou `npm run build` para validar

**Resultado:** ✅ Fluxo RAG completo — respostas reais substituem texto estático

---

**Prompt (cross-agent — referenciando memória do Arquiteto):**
> Baseado na conversa com o Arquiteto em outro chat busque na memória e implemente o item 3 do P1

**Ação:** Copilot buscou a memória mas interpretou incorretamente como sendo sobre prompt injection. Usuário corrigiu:

**Prompt de correção:**
> não era isso, quero que você Valide/limpe documentos na base de conhecimento knowledge-base.ts para garantir que nenhum doc tem HTML/JavaScript

**Ações realizadas pelo Copilot:**
- Leu `src/data/knowledge-base.ts` completo
- Adicionou camada de sanitização na exportação dos documentos
- Remove: tags HTML, blocos de script, protocolo `javascript:`, atributos de evento, caracteres de controle

**Resultado:** ✅ Base de conhecimento sanitizada

---

## Agente Engenheiro de Prompts

### Sessão: Ajuste de Relevância e Segurança do Prompt

**Prompt:**
> A busca por VPN está retornando fonte Gympass para Colaboradores • BENEFICIOS além das corretas quando solicito sobre "O que faço se ficar doente?" ele responde com a resposta padrão sem mencionar licença médica ou solicitar mais contexto, como ajustar esses pontos?

**Ações realizadas pelo Copilot:**
- Leu `src/utils/tfidf.ts`, `src/data/knowledge-base.ts` e `src/services/ragService.ts`
- Identificou que o scoring não penalizava correspondências fracas entre categorias distintas
- Ajustou `src/services/ragService.ts`: pontuação mais rígida para termos específicos
- Ajustou `src/services/geminiService.ts`: fallback especializado para perguntas de saúde
- Adicionou documento "Licença Médica e Afastamentos" em `src/data/knowledge-base.ts`
- Rodou `npm run build` para validar

**Resultado:** ✅ Busca por VPN não retorna mais Gympass. Perguntas sobre saúde têm resposta contextualizada.

---

**Prompt:**
> O que podemos melhorar em relação à segurança seguindo o relatório da OWASP? planeje antes.

**Resposta do Copilot — Plano gerado:**

| Prioridade | Item | Esforço |
|-----------|------|---------|
| Alta | Mover chamada ao Gemini para proxy no servidor | Alto |
| Alta | Reduzir risco de XSS e injection | Baixo |
| Alta | Headers de segurança (CSP, X-Frame-Options) | Médio |
| Média | Auditoria de dependências (`npm audit`) | Baixo |
| Média | Privacidade de dados no localStorage | Baixo |
| Média | Checklist de segurança por release | Baixo |

---

**Prompt:**
> e sobre Injeção de prompt? crie um documento com esses pontos para o Arquiteto antes revisar.

**Ações realizadas pelo Copilot:**
- Criou `docs/seguranca-owasp-llm.md` com análise completa incluindo prompt injection

---

**Prompt:**
> a parte do prompt injection você já pode aplicar no sistema

**Ações realizadas pelo Copilot:**
- Atualizou o `SYSTEM_PROMPT` em `src/services/geminiService.ts`
- Adicionou instrução explícita para tratar conteúdo como dados, não instruções
- Adicionou regra para ignorar tentativas de sobrescrever comportamento

**Resultado:** ✅ Resistência a prompt injection implementada no system prompt

---

## Agente Arquiteto

### Sessão: Análise de Segurança e Documentação

**Prompt:**
> analise o documento de segurança, veja o que vale a pena implementar para esse trabalho e o que não

**Resposta do Copilot — Decisão gerada:**

| Categoria | Itens |
|-----------|-------|
| ✅ Crítico (implementar) | Prompt injection no system prompt, sanitização XSS em componentes, limpeza da knowledge-base |
| ⚠️ Se sobrar tempo | Seção "Segurança" no README, `npm audit` |
| ❌ Não fazer | Backend proxy (viola restrição sem-backend), DOMPurify (React já faz), autenticação, CI/CD completo |

**Citação gerada pelo Copilot para a apresentação:**
> "Avaliamos os riscos OWASP e de LLMs. Priorizamos: (1) Prompt Injection — instrução clara no system prompt; (2) XSS — revisar renderização React; (3) Exposição de segredos — documentado como melhoria futura para produção com backend. Dados fictícios eliminam riscos de LGPD."

---

**Prompt:**
> não, apenas documente e salve nossa decisão em memória

**Ação:** Copilot salvou a decisão em memória persistente entre sessões (`memories/repo/seguranca-decisoes.md`).

---

**Prompt:**
> inclua também na documentação do projeto nos arquivos spec.md, arquitetura.md ou README conforme for necessário

**Ações realizadas pelo Copilot:**
- Adicionou seção `🔒 Segurança e Conformidade` no `README.md`
- Adicionou seção `9. Segurança e Mitigação de Riscos` no `spec.md`
- Adicionou seção `11. Estratégia de Mitigação` no `arquitetura.md`

---

**Prompt:**
> Revise a estrutura de pastas atual do projeto e compare com o spec.md. Identifique o que falta criar.

**Resultado da análise:**

| Diretório | Status |
|-----------|--------|
| `src/components/` | ✅ 5/5 componentes |
| `src/services/` | ✅ 2/2 serviços |
| `src/hooks/` | ✅ 1/1 hook |
| `src/data/` | ✅ knowledge-base com 20 docs |
| `src/types/` | ✅ interfaces completas |
| `src/utils/` | ✅ TF-IDF implementado |
| `docs/` | ✅ segurança + evidências |

**Gaps identificados:** testes para `SuggestionChips` e `LoadingDots` (baixa prioridade), ausência de `constants.ts` (média prioridade, não impacta MVP).

**Conformidade com RF:** 9/10 requisitos funcionais ✅ | 4/5 requisitos não-funcionais ✅

---

## Agente QA + Docs

### Sessão: Testes Automatizados e Revisão Final

**Prompt:**
> crie testes para o sistema

**Ações realizadas pelo Copilot:**
- Instalou `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
- Criou `src/test/setup.ts`
- Criou `src/services/ragService.test.ts`
- Criou `src/services/geminiService.test.ts`
- Criou `src/hooks/useChat.test.tsx`
- Configurou Vitest em `vite.config.ts` e `package.json`
- Identificou e corrigiu falha de expectativa no teste do hook

**Resultado:** ✅ 3 arquivos de teste | 6 testes aprovados

---

**Prompt:**
> siga com o próximo passo com os testes de componentes

**Ações realizadas pelo Copilot:**
- Criou `src/components/ChatInput.test.tsx`
- Criou `src/components/ChatMessage.test.tsx`
- Criou `src/components/SourceBadge.test.tsx`
- Identificou e corrigiu falha no teste de input controlado

**Resultado:** ✅ 6 arquivos de teste | 9 testes aprovados

---

**Prompt:**
> pode seguir com o teste

**Ações realizadas pelo Copilot:**
- Criou `src/App.test.tsx` com teste de integração da tela principal
- Mockando `useChat` para simular estado
- Corrigiu mock para refletir o fluxo real de input controlado

**Resultado:** ✅ 7 arquivos de teste | 10 testes aprovados

---

**Prompt:**
> Revisar todo o código

**Ações realizadas pelo Copilot:**
- Buscou padrões críticos no código: `console.log`, `any`, `localStorage`, `useEffect`, `fetch`, `import.meta.env`
- Rodou `npm run build` para identificar erros reais
- Corrigiu issues em `src/hooks/useChat.ts` e `vite.config.ts`
- Criou `.env.example`

**Resultado:**
```
✅ 7 arquivos de teste | 10 testes aprovados
✅ Build de produção concluída sem erros
```

---

**Prompt:**
> siga com a revisão do README e demais documentos

**Ações realizadas pelo Copilot:**
- Revisou e alinhou `README.md`, `arquitetura.md`, `spec.md` e `docs/seguranca-owasp-llm.md`
- Reduziu de 950 para 509 linhas totais removendo redundâncias

**Resultado:** ✅ Documentação consistente com o estado real do projeto

---

## Resumo de Uso da IA

| Agente | Arquivos criados | Arquivos modificados | Testes gerados |
|--------|-----------------|---------------------|---------------|
| Frontend Dev | 6 | 3 | 3 |
| RAG Dev | 3 | 2 | 0 |
| Eng. Prompts | 1 | 2 | 0 |
| Arquiteto | 0 | 3 | 0 |
| QA + Docs | 7 | 3 | 7 |
| **Total** | **17** | **13** | **10** |

**Padrão observado:** o Copilot leu os arquivos existentes antes de criar novos em 100% das sessões, garantindo consistência de estilo e tipagem. Em 4 ocasiões identificou e corrigiu erros autonomamente sem prompt adicional. Em 1 ocasião interpretou incorretamente o objetivo — necessitou correção manual do usuário.