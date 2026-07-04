import type { KnowledgeDoc } from '../types'

function sanitizeText(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\b(?:javascript|vbscript):[^\s"']*/gi, ' ')
    .replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeDoc(doc: KnowledgeDoc): KnowledgeDoc {
  return {
    ...doc,
    titulo: sanitizeText(doc.titulo),
    tags: doc.tags.map((tag) => sanitizeText(tag)),
    conteudo: sanitizeText(doc.conteudo),
  }
}

const rawKnowledgeBase: KnowledgeDoc[] = [
  {
    id: 'rh-001',
    categoria: 'rh',
    titulo: 'Política de Férias',
    tags: ['férias', 'folga', 'descanso', 'recesso', '30 dias'],
    conteudo: `Os colaboradores da TechNova Solutions têm direito a 30 dias corridos de férias após 12 meses de trabalho contínuo, sendo preferencialmente concedidas no período de janeiro a março, conforme disponibilidade operacional. A solicitação deve ser feita com no mínimo 45 dias de antecedência por meio do portal RH, onde o colaborador informa os períodos desejados e acompanha a análise do gestor. Em caso de férias vencidas, o prazo máximo para utilização é de até 12 meses após o direito adquirido, salvo situações excepcionais previamente aprovadas pela área de Recursos Humanos. A empresa recomenda que a solicitação seja alinhada com o planejamento do time para evitar impactos na operação. Em situações de desligamento, as férias já acumuladas devem ser quitadas conforme a legislação aplicável e as regras internas.`,
    atualizadoEm: '2025-03-15'
  },
  {
    id: 'rh-002',
    categoria: 'rh',
    titulo: 'Regulamento de Home Office',
    tags: ['home office', 'remoto', 'presencial', '3 dias', 'trabalho remoto'],
    conteudo: `O modelo de home office da TechNova Solutions é adotado de forma híbrida, com até 3 dias por semana para funções que permitem autonomia e uso seguro das ferramentas corporativas. A aprovação é definida pelo gestor, levando em conta metas, disponibilidade de infraestrutura e necessidade de presença presencial para integração e alinhamento com o time. Colaboradores que atuarem em regime remoto devem manter rotina de trabalho previsível, estar disponíveis durante o horário comercial e seguir as boas práticas de comunicação no Slack e no Jira. O ambiente doméstico precisa oferecer privacidade suficiente para chamadas e acesso a informações internas. Quando houver necessidade, a empresa pode solicitar retorno parcial ao escritório para atividades específicas, sempre com antecedência e justificativa formal.`,
    atualizadoEm: '2025-04-02'
  },
  {
    id: 'rh-003',
    categoria: 'rh',
    titulo: 'Banco de Horas',
    tags: ['banco de horas', 'horas extras', 'compensação', 'plantão', 'folga'],
    conteudo: `O Banco de Horas é um mecanismo de compensação utilizado quando há necessidade de horas adicionais em determinados períodos, como encerramento de projetos, demandas críticas ou eventos corporativos. As horas excedentes podem ser compensadas por folga ou convertidas em abono, conforme a política aprovada pelo gestor e pela área de RH. O registro é realizado no sistema de ponto eletrônico até o quinto dia útil do mês seguinte, e qualquer divergência deve ser corrigida imediatamente. Para que a compensação seja válida, é necessário que o colaborador tenha o aceite do supervisor e que as horas estejam devidamente registradas. A empresa orienta que o uso do banco de horas seja planejado para não comprometer a capacidade operacional da equipe nem a carga de trabalho do colaborador.`,
    atualizadoEm: '2025-02-20'
  },
  {
    id: 'rh-004',
    categoria: 'rh',
    titulo: 'Licença Médica e Afastamentos',
    tags: ['licença médica', 'licenca medica', 'atestado', 'afastamento', 'doença', 'doente', 'saúde', 'saude'],
    conteudo: `Em caso de doença ou necessidade de atendimento médico, o colaborador deve informar o gestor e a área de RH o mais rápido possível. Para afastamentos curtos, a empresa orienta a apresentação de atestado ou documentação exigida conforme a política vigente. Em situações de licença médica, o colaborador deve seguir os procedimentos internos, manter comunicação com o gestor e acompanhar a atualização do status junto à área de RH. Para dúvidas específicas sobre afastamento, atestado ou retorno ao trabalho, o canal adequado é RH ou Benefícios.`,
    atualizadoEm: '2025-06-01'
  },
  {
    id: 'beneficios-001',
    categoria: 'beneficios',
    titulo: 'Plano de Saúde Unimed',
    tags: ['plano de saúde', 'unimed', 'benefício', 'médico', 'hospital'],
    conteudo: `A TechNova Solutions oferece plano de saúde da Unimed para colaboradores e dependentes elegíveis, com cobertura para consultas, exames, internações e atendimento ambulatorial. A adesão é automática para colaboradores efetivos após o período inicial de 90 dias, e dependentes podem ser incluídos mediante cadastro no portal de benefícios até o prazo definido pela operadora. O reembolso de procedimentos não cobertos segue as regras da tabela vigente, com análise prévia e documentação comprobatória. Em caso de alteração cadastral, o colaborador deve atualizar os dados no portal para evitar atrasos no atendimento. A empresa também disponibiliza suporte da equipe de benefícios para dúvidas sobre rede credenciada, carência e procedimentos administrativos.`,
    atualizadoEm: '2025-05-10'
  },
  {
    id: 'beneficios-002',
    categoria: 'beneficios',
    titulo: 'Vale Refeição e Vale Transporte',
    tags: ['vr', 'vale refeição', 'vale transporte', 'alimentação', 'transporte'],
    conteudo: `Os benefícios de vale refeição e vale transporte são concedidos mensalmente aos colaboradores elegíveis de acordo com a regra de contratação e a categoria funcional. O valor de vale refeição é de R$ 35 por dia trabalhado, limitado ao número de dias efetivamente laborados no mês, e o vale transporte é calculado com base no deslocamento diário e na jornada de trabalho. Os créditos são carregados automaticamente na forma de cartão eletrônico, com atualização até o segundo dia útil do mês seguinte. Para solicitar alteração de dados cadastrais, o colaborador deve acessar o portal de benefícios e anexar a documentação exigida. Em caso de uso indevido ou perda do cartão, a comunicação deve ser feita imediatamente para evitar bloqueio e possíveis inconsistências.`,
    atualizadoEm: '2025-04-18'
  },
  {
    id: 'beneficios-003',
    categoria: 'beneficios',
    titulo: 'Gympass para Colaboradores',
    tags: ['gympass', 'academia', 'bem estar', 'saúde', 'atividade física'],
    conteudo: `A TechNova Solutions oferece acesso ao Gympass como benefício de bem-estar para colaboradores ativos, permitindo o uso de academias e centros de treino em redes credenciadas. A assinatura é renovada mensalmente e pode ser utilizada por colaboradores com contrato vigente e cadastro completo no portal de benefícios. O benefício é destinado à promoção da saúde e do equilíbrio entre vida pessoal e profissional, sendo uma vantagem opcional e sem custo adicional ao colaborador. Para ativação, basta acessar o aplicativo ou site do Gympass com o e-mail corporativo e concluir o cadastro. Em caso de dúvidas sobre rede, cancelamento ou cobrança, a equipe de benefícios pode auxiliar diretamente no processo.`,
    atualizadoEm: '2025-03-28'
  },
  {
    id: 'ti-001',
    categoria: 'ti',
    titulo: 'Acesso VPN Cisco',
    tags: ['vpn', 'cisco', 'acesso remoto', 'rede', 'segurança'],
    conteudo: `O acesso remoto à rede corporativa é realizado por meio da VPN Cisco, disponível apenas para colaboradores com necessidade operacional de trabalhar fora da sede ou em viagens. Para solicitar o cadastro, é necessário abrir um chamado no ServiceNow informando o motivo do acesso, o gestor responsável e o período previsto de uso. A aprovação é feita pela equipe de TI, que valida o perfil do usuário e o alinhamento com as políticas de segurança. O acesso é concedido com autenticação multifator e deve ser usado exclusivamente para fins corporativos. Em caso de perda de dispositivo ou suspeita de comprometimento, o usuário deve desativar a conexão imediatamente e abrir um chamado para bloqueio de credenciais.`,
    atualizadoEm: '2025-05-01'
  },
  {
    id: 'ti-002',
    categoria: 'ti',
    titulo: 'Troca de Equipamento',
    tags: ['equipamento', 'notebook', 'troca', 'tecnologia', 'manutenção'],
    conteudo: `A troca de equipamentos da TechNova Solutions segue um fluxo definido para garantir continuidade operacional e rastreabilidade. Quando um notebook, monitor ou periférico apresenta defeito ou se torna incompatível com as demandas do trabalho, o colaborador deve abrir um chamado no ServiceNow e informar a descrição do problema, o tempo de uso e a necessidade de substituição. A equipe de TI avalia a condição do item, confirma se a troca é adequada e agenda a entrega de um novo dispositivo, quando disponível. Equipamentos danificados por uso indevido ou mau manuseio podem ser reprocessados conforme a política interna, sem direito automático a substituição imediata. A devolução do equipamento antigo deve ser realizada no prazo informado pela área tecnológica.`,
    atualizadoEm: '2025-04-11'
  },
  {
    id: 'ti-003',
    categoria: 'ti',
    titulo: 'Política de Senha Corporativa',
    tags: ['senha', 'segurança', 'autenticação', 'mfa', 'credencial'],
    conteudo: `As senhas corporativas da TechNova Solutions devem ser únicas, complexas e alteradas a cada 90 dias, com mínimo de 12 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos. A reutilização de senhas antigas é proibida e o compartilhamento de credenciais com terceiros é considerado infração disciplinar. O acesso aos sistemas internos exige autenticação multifator, que deve ser configurada no primeiro acesso e mantida ativa em todos os dispositivos corporativos. Caso o colaborador suspeite de vazamento, deve trocar a senha imediatamente e registrar ocorrência por meio do canal de suporte de TI. A equipe de segurança monitora tentativas de acesso não autorizadas e pode bloquear contas temporariamente para proteção dos dados da empresa.`,
    atualizadoEm: '2025-03-07'
  },
  {
    id: 'onboarding-001',
    categoria: 'onboarding',
    titulo: 'Primeiro Dia na TechNova',
    tags: ['primeiro dia', 'onboarding', 'integração', 'bem-vindo', 'colaborador'],
    conteudo: `No primeiro dia, o novo colaborador recebe boas-vindas da equipe de People Operations e é apresentado ao ambiente, à cultura e às ferramentas de trabalho. O processo inclui confirmação de documentos, envio de dados cadastrais, configuração de e-mail corporativo e acesso ao Slack, Jira e Notion. A agenda inicial contempla uma conversa com o gestor, apresentação da organização e uma orientação sobre políticas internas, segurança da informação e canais de comunicação. O onboarding é estruturado para reduzir barreiras na entrada e promover uma integração ágil com o time. Para qualquer dúvida, o novo colaborador pode recorrer ao canal de onboarding ou ao gestor designado na primeira semana.`,
    atualizadoEm: '2025-05-06'
  },
  {
    id: 'onboarding-002',
    categoria: 'onboarding',
    titulo: 'Ferramentas Internas e Padrões de Uso',
    tags: ['slack', 'jira', 'notion', 'ferramentas', 'colaboração'],
    conteudo: `A TechNova Solutions utiliza Slack para comunicação rápida, Jira para gestão de tarefas e Notion como base de conhecimento colaborativa. Todos os colaboradores devem manter os canais organizados, responder mensagens em até 24 horas e utilizar etiquetas adequadas para separar temas e prioridades. No Jira, cada atividade precisa ter descrição clara, responsável, prazo estimado e status atualizado. O Notion é utilizado para manter procedimentos, decisões e documentação operacional, devendo ser revisado periodicamente para evitar informações desatualizadas. O uso inadequado dessas ferramentas pode impactar a produtividade do time e a qualidade da informação compartilhada.`,
    atualizadoEm: '2025-04-24'
  },
  {
    id: 'processos-001',
    categoria: 'processos',
    titulo: 'Abertura de Chamados no ServiceNow',
    tags: ['servicenow', 'chamado', 'suporte', 'ti', 'incidente'],
    conteudo: `Todos os pedidos de suporte interno devem ser registrados no ServiceNow, que é a ferramenta oficial da TechNova Solutions para abertura de chamados. O colaborador precisa descrever a demanda com objetividade, informar o impacto no trabalho, anexar evidências quando aplicável e indicar a prioridade do pedido. Chamados de infraestrutura, acesso, equipamento ou sistema devem seguir a classificação padrão para facilitar o encaminhamento. O acompanhamento é feito por meio do próprio ticket, que pode ser atualizado pelo solicitante e pela equipe responsável. Em caso de urgência operacional, pode ser necessário acionar o canal de emergência da TI para garantir resposta mais rápida.`,
    atualizadoEm: '2025-04-08'
  },
  {
    id: 'processos-002',
    categoria: 'processos',
    titulo: 'Reembolso de Despesas',
    tags: ['despesa', 'reembolso', 'comprovante', 'gasto', 'financeiro'],
    conteudo: `O reembolso de despesas da TechNova Solutions deve ser solicitado dentro do prazo de até 15 dias após o gasto, com apresentação de comprovantes originais, notas fiscais ou recibos legíveis. Itens como transporte, alimentação e hospedagem só são reembolsados quando estiverem relacionados a viagens corporativas ou atividades aprovadas previamente pelo gestor. O envio é realizado pelo portal financeiro, com anexação da documentação e indicação do centro de custo. Solicitações incompletas ou sem comprovação podem ser devolvidas para correção. A aprovação depende do alinhamento com a política vigente e da validação do gestor responsável, que também verifica se o valor está dentro do limite autorizado.`,
    atualizadoEm: '2025-03-21'
  },
  {
    id: 'treinamentos-001',
    categoria: 'treinamentos',
    titulo: 'Trilha de Desenvolvimento',
    tags: ['treinamento', 'carreira', 'plano', 'desenvolvimento', 'capacitação'],
    conteudo: `A TechNova Solutions mantém uma trilha de desenvolvimento voltada ao crescimento técnico e comportamental dos colaboradores, com foco em evolução de carreira, autonomia e maturidade profissional. Os planos são definidos anualmente em conjunto com o gestor, considerando objetivos de negócio, perfil do colaborador e demandas futuras da área. A trilha inclui mentorias, treinamentos internos, participação em projetos estratégicos e acesso a conteúdos externos. Colaboradores em fase inicial podem receber apoio para construção de base sólida, enquanto perfis mais experientes têm oportunidade de atuar como líderes técnicos ou tutores de novos membros. O acompanhamento é feito em reuniões periódicas para revisar progresso e ajustar prioridades.`,
    atualizadoEm: '2025-05-09'
  },
  {
    id: 'treinamentos-002',
    categoria: 'treinamentos',
    titulo: 'Cursos Obrigatórios de LGPD e Segurança',
    tags: ['lgpd', 'segurança', 'curso obrigatório', 'treinamento', 'privacidade'],
    conteudo: `Todos os colaboradores da TechNova Solutions devem concluir, no prazo de 30 dias após a contratação, os cursos obrigatórios de LGPD e segurança da informação. Esses treinamentos abordam uso adequado de dados, proteção de informações internas, boas práticas de navegação, prevenção a phishing e procedimentos em caso de incidente. O cumprimento é monitorado pela área de Compliance e pode ser exigido novamente em caso de atualização das políticas. A conclusão do curso é registrada no sistema de aprendizagem e pode impactar a liberação de acesso a determinados ambientes digitais. A empresa reforça que o não cumprimento das obrigações de treinamento pode gerar limitações operacionais e medidas disciplinares conforme a gravidade da situação.`,
    atualizadoEm: '2025-04-28'
  }
]

export const knowledgeBase: KnowledgeDoc[] = rawKnowledgeBase.map(sanitizeDoc)
