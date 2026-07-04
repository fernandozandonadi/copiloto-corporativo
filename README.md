# 🤖 Copiloto Corporativo Inteligente

> Projeto desenvolvido para a disciplina IA Generativa Aplicada ao Desenvolvimento — UniFECAF 2025/2026

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat&logo=vitest)](https://vitest.dev)
[![Gemini](https://img.shields.io/badge/Gemini_Flash-API-4285F4?style=flat&logo=google)](https://aistudio.google.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

---

## 🎯 Sobre o Projeto

O Copiloto Corporativo é um assistente inteligente para a empresa fictícia TechNova Solutions. Ele permite consultar políticas internas, benefícios, procedimentos de TI e outros documentos corporativos por meio de perguntas em linguagem natural, sem precisar navegar por pastas ou interromper colegas.

A solução usa RAG (Retrieval-Augmented Generation) no frontend: antes de gerar a resposta, o sistema recupera os documentos mais relevantes da base de conhecimento e os injeta como contexto no prompt do modelo.

---

## 🚀 Demo

A aplicação foi implementada como uma SPA React e pode ser executada localmente. O deploy público pode ser configurado no Vercel a partir do repositório.

---

## 📸 Screenshots

As capturas serão adicionadas na entrega final com imagens reais da interface.

---

## ✨ Funcionalidades

- 💬 Chat em linguagem natural em português
- 🔎 Busca semântica por relevância com TF-IDF simplificado
- 📄 Exibição de fontes utilizadas em cada resposta
- 🕐 Histórico de conversa persistido no navegador
- ⏳ Estado de carregamento durante a resposta do modelo
- 🛟 Fallback seguro quando não há contexto relevante
- 💡 Sugestões de perguntas iniciais
- ✅ Testes automatizados com Vitest e Testing Library

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19 | Framework UI |
| TypeScript | 6 | Tipagem e qualidade de código |
| Vite | 8 | Build tool e servidor de desenvolvimento |
| Vitest | 4 | Testes automatizados |
| Testing Library | latest | Testes de componentes e hooks |
| Google Gemini Flash | API | Geração de respostas com contexto |
| Vercel | — | Hospedagem e deploy |
| GitHub | — | Versionamento e repositório |

---

## 🤖 Ferramentas de IA Utilizadas

### Durante o Desenvolvimento

| Ferramenta | Como foi utilizada |
|-----------|-------------------|
| GitHub Copilot | Auxílio na implementação de componentes, hooks e testes |
| Google AI Studio | Refinamento do prompt e validação da integração com o Gemini |

### Na Aplicação

| Componente | IA envolvida |
|-----------|-------------|
| Busca de documentos relevantes | TF-IDF implementado manualmente |
| Geração de respostas | Google Gemini via API |
| Prompt engineering | System prompt com restrições de segurança e contexto |

---

## 🗂️ Base de Conhecimento

A aplicação inclui 16 documentos corporativos fictícios da TechNova Solutions, cobrindo:

- 📋 RH — férias, home office, banco de horas, licença médica
- 💊 Benefícios — plano de saúde, vale refeição/transporte, Gympass
- 💻 TI — VPN, troca de equipamento, política de senha
- 🚀 Onboarding — primeiro dia e ferramentas internas
- 📊 Processos — abertura de chamados e reembolso de despesas
- 🎓 Treinamentos — trilha de desenvolvimento e cursos obrigatórios

---

## ⚙️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- npm
- API Key gratuita do Google Gemini

### Instalação

```bash
git clone <url-do-repositorio>
cd copiloto-corporativo
npm install
cp .env.example .env.local
```

Edite o arquivo .env.local e informe sua chave:

```bash
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### Comandos úteis

```bash
npm run dev
npm test
npm run build
npm run preview
```

Acesse: http://localhost:5173

---

## 🌐 Deploy

O projeto pode ser publicado no Vercel com a variável de ambiente VITE_GEMINI_API_KEY configurada no painel do projeto. O fluxo de deploy é compatível com GitHub + Vercel.

---

## 🔐 Segurança e Conformidade

O projeto foi pensado como MVP acadêmico e já contempla mitigação básica de riscos:

- Prompt Injection: o system prompt instrui o modelo a tratar o contexto como dados e a ignorar tentativas de sobrescrita.
- XSS: a renderização usa React e evita conteúdo inseguro.
- Segredos: a chave da API é lida via import.meta.env e não é armazenada no repositório.
- Privacidade: o histórico é salvo localmente e pode ser limpo pelo usuário.

Mais detalhes podem ser vistos em docs/seguranca-owasp-llm.md.

---

## 🏗️ Arquitetura

A arquitetura completa está descrita em arquitetura.md. Em resumo, o fluxo é:

```text
Usuário → Interface React → Hook useChat → RAG Service → Gemini Service → Resposta + fontes
```

---

## 📁 Estrutura do Projeto

```text
src/
├── components/
├── data/
├── hooks/
├── services/
├── test/
├── types/
└── utils/
```

---

## 🧭 Status do MVP

- [x] Chat com linguagem natural
- [x] Busca de documentos relevantes
- [x] Fontes exibidas por resposta
- [x] Histórico de conversa persistido
- [x] Estado de carregamento e fallback
- [x] Testes automatizados
- [ ] Backend proxy para proteger a API key em produção
- [ ] Upload de documentos pelo usuário

---

## 📝 Aspectos Éticos e Governança

- Transparência: as fontes usadas estão visíveis ao usuário.
- Prevenção de alucinação: o modelo é instruído a responder apenas com base no contexto fornecido.
- Privacidade: nenhum dado pessoal real é usado na base de conhecimento.
- LGPD: o projeto é fictício e não coleta informações sensíveis em produção.

---

## 👨‍💻 Autor

Fernando  
Estudante de Desenvolvimento Web Low-Code — UniFECAF

---

## 📄 Licença

Este projeto está disponível sob a licença MIT.
