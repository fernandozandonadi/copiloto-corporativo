# Documento de Segurança para Revisão do Arquiteto

## Contexto
Este documento consolida os principais pontos de segurança da aplicação Copiloto Corporativo com foco em OWASP e em riscos específicos de integrações com LLMs.

## Escopo
- SPA React + TypeScript + Vite
- Busca local em base de conhecimento
- Integração com Google Gemini via frontend
- Persistência de histórico em localStorage

---

## 1. Riscos principais identificados

### 1.1 Exposição de segredos
A aplicação depende de uma chave de API do Gemini no frontend. Isso representa um risco em produção porque a chave pode ser exposta no bundle ou em ferramentas de inspeção do navegador.

Mitigação atual:
- a chave é lida via import.meta.env.VITE_GEMINI_API_KEY
- o arquivo .env.local não é versionado
- o repositório usa .gitignore para impedir o envio do arquivo local

Recomendação:
- em uma próxima evolução, mover a chamada para um backend ou serverless proxy para reduzir a exposição da chave.

### 1.2 Prompt Injection
O sistema injeta contexto, histórico e mensagem do usuário no prompt do modelo. Isso exige cuidado para evitar que instruções maliciosas influenciem o comportamento do assistente.

Mitigação atual:
- o system prompt instrui o modelo a tratar o contexto como dados e a ignorar tentativas de sobrescrita
- o conteúdo da base de conhecimento é tratado como fonte confiável e não como instrução executável

### 1.3 XSS e renderização insegura
Se o conteúdo de mensagens ou documentos for renderizado de forma insegura, existe risco de execução de HTML/JavaScript malicioso.

Mitigação atual:
- a interface renderiza texto de forma segura no React
- o projeto evita o uso de dangerouslySetInnerHTML
- os documentos da base de conhecimento são tratados como strings simples

### 1.4 Privacidade e persistência local
O histórico é salvo em localStorage, o que é funcional para um MVP, mas pode expor dados em ambientes compartilhados.

Mitigação atual:
- o usuário pode limpar o histórico a qualquer momento
- o conteúdo é fictício e não usa dados reais de colaboradores

### 1.5 Dependências e supply chain
Aplicações React/Vite dependem de diversas bibliotecas externas, o que exige atenção contínua.

Mitigação atual:
- o projeto usa dependências versionadas no package.json
- testes e build são executados regularmente para validar a integridade da aplicação

---

## 2. Recomendações de melhoria

1. Mover a chamada ao Gemini para um backend seguro em produção.
2. Reduzir o uso de localStorage para dados sensíveis.
3. Adicionar headers de segurança no deploy.
4. Manter uma rotina de auditoria de dependências.

---

## 3. Conclusão
A arquitetura atual é adequada para um MVP acadêmico, com boas práticas básicas de segurança e um sistema de prompt que reduz o risco de sobrescrita do comportamento do modelo. Para produção, a recomendação mais importante é proteger a chave da API por meio de um backend proxy.
