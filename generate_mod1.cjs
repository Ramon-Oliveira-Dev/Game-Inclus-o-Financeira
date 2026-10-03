const fs = require('fs');

const m1f1 = [
  {
    id: "M1F1C1", icone: "♿", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Solicitações de cadeiras de rodas",
    descricao: "A Secretaria recebeu 8 solicitações de cadeiras de rodas adaptadas. O orçamento permite atender 5 alunos agora. A lista inclui casos de urgência médica comprovada.",
    prazoHoras: null,
    baseConceitual: "LBI Art. 28 III — Tecnologia Assistiva como direito. Fundeb Art. 36 — critérios de aplicação.",
    perguntaDebriefing: "Qual critério objetivo você usaria para definir os 5 casos prioritários de forma juridicamente defensável?",
    opcoes: {
      A: {
        id: "A", texto: "Atender os 8 usando Fundeb emergencialmente",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Usar Fundeb exige enquadramento legal. Os alunos foram atendidos, mas o risco fiscal é real. Consulte a área jurídica antes de executar.",
        baseJuridica: "Fundeb Art. 36 — vedação de uso para finalidade diversa sem parecer",
        qual: 8, sust: -12, sc: 60, budgetCost: 80000,
        axisEtico: 5, axisFiscal: 0, axisLegal: 0, axisPedagogico: 5,
        consequenciaLateral: null
      },
      B: {
        id: "B", texto: "Atender os 5 casos mais urgentes e abrir processo licitatório",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Decisão equilibrada: atende a urgência imediata com critério técnico e garante processo legal para os demais. Demonstra planejamento e conformidade.",
        baseJuridica: "Lei 8.666/1993 Art. 24 IV — dispensa de licitação por urgência. LBI Art. 28.",
        qual: 5, sust: 2, sc: 100, budgetCost: 50000,
        axisEtico: 8, axisFiscal: 8, axisLegal: 10, axisPedagogico: 5
      },
      C: {
        id: "C", texto: "Aguardar o próximo ciclo orçamentário para atender todos",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Omissão diante de urgência médica comprovada viola o dever do Estado. Alto risco de ação judicial com multa diária. Crianças com deficiência não podem esperar.",
        baseJuridica: "CF/88 Art. 208 — dever do Estado com Educação Especial. LBI Art. 28.",
        qual: -15, sust: 8, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: 5, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true, consequenciaLateral: "CI_02"
      }
    }
  },
  {
    id: "M1F1C2", icone: "📚", tipo: "FORMACAO",
    titulo: "Capacitação AEE gratuita",
    descricao: "Uma universidade pública oferece formação em AEE para 20 professores. Custo: apenas R$12k em diárias e transporte. A turma começa em 2 semanas.",
    prazoHoras: 336,
    baseConceitual: "LDB Art. 59-A — formação continuada como dever do Estado. Fundeb Art. 36 §3 — formação profissional vinculada.",
    perguntaDebriefing: "Como planejar a substituição dos professores em sala durante o período de formação sem prejudicar as turmas?",
    opcoes: {
      A: {
        id: "A", texto: "Liberar os 20 professores e custear as diárias",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Cumpre o dever legal de formação continuada. Investimento mínimo, retorno pedagógico alto e multiplicado por anos de atuação.",
        baseJuridica: "LDB Art. 59-A, Fundeb Art. 36 §3",
        qual: 10, sust: -3, sc: 120, budgetCost: 12000,
        axisEtico: 5, axisFiscal: 0, axisLegal: 10, axisPedagogico: 15
      },
      B: {
        id: "B", texto: "Liberar 10 professores por restrição operacional",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Atende parcialmente. Metade das turmas continuará sem profissional capacitado. Registre formalmente a restrição operacional.",
        baseJuridica: "LDB Art. 59-A",
        qual: 5, sust: -1, sc: 60, budgetCost: 6000,
        axisEtico: 3, axisFiscal: 3, axisLegal: 5, axisPedagogico: 8
      },
      C: {
        id: "C", texto: "Recusar: professores são necessários em sala",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Recusar formação gratuita por motivos operacionais indica falta de planejamento. A lei exige qualificação do AEE.",
        baseJuridica: "LDB Art. 59-A — dever do Estado com formação docente",
        qual: -8, sust: 1, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: 2, axisLegal: 0, axisPedagogico: 0,
        consequenciaLateral: "CI_03"
      }
    }
  },
  {
    id: "M1F1C3", icone: "🏫", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Escola sem rampa de acesso",
    descricao: "3 alunos em cadeiras de rodas frequentam escola com degraus em todas as entradas. Custo estimado de adaptação: R$35k. Não há previsão orçamentária.",
    prazoHoras: null,
    baseConceitual: "Lei 10.098/2000 Art. 11 — acessibilidade arquitetônica obrigatória. CF Art. 208. Decreto 5.296/2004.",
    perguntaDebriefing: "Como criar um programa plurianual de acessibilidade arquitetônica que evite chegar a esta situação?",
    opcoes: {
      A: {
        id: "A", texto: "Contratar obra de acessibilidade com remanejamento de verba",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Acesso físico é direito constitucional. O remanejamento dentro do Fundeb para manutenção é legalmente enquadrável.",
        baseJuridica: "Lei 10.098/2000, CF Art. 208, Fundeb Art. 36 I",
        qual: 12, sust: -7, sc: 130, budgetCost: 35000,
        axisEtico: 10, axisFiscal: 0, axisLegal: 10, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Transferir os alunos para escola adaptada enquanto aguarda verba",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Transferência compulsória sem anuência das famílias pode ser questionada. Documente a decisão e consulte as famílias.",
        baseJuridica: "LBI Art. 28 IV — escola de qualidade próxima à residência",
        qual: -3, sust: 4, sc: 45, budgetCost: 0,
        axisEtico: 3, axisFiscal: 5, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Aguardar próximo exercício orçamentário",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Manter alunos com deficiência inacessíveis à escola por meses é omissão grave. Alta probabilidade de ação judicial.",
        baseJuridica: "CF Art. 208, Lei 10.098/2000 Art. 20",
        qual: -18, sust: 6, sc: 5, budgetCost: 0,
        axisEtico: 0, axisFiscal: 3, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true, consequenciaLateral: "CI_01"
      }
    }
  },
  {
    id: "M1F1C4", icone: "📋", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Relatório semestral ao Conselho Municipal",
    descricao: "O Conselho Municipal de Educação solicita o primeiro relatório semestral de indicadores de inclusão. Sua equipe tem dados incompletos sobre 23% dos alunos com deficiência matriculados.",
    prazoHoras: 168,
    baseConceitual: "LAI (Lei 12.527/2011) — transparência ativa. LDB Art. 9 VI — avaliação da educação especial.",
    perguntaDebriefing: "Que sistema de coleta de dados contínua eliminaria este risco no próximo semestre?",
    opcoes: {
      A: {
        id: "A", texto: "Apresentar dados disponíveis sinalizando as lacunas com cronograma",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Transparência com o Conselho gera credibilidade. Reconhecer limitações com plano de correção é boa gestão pública.",
        baseJuridica: "LAI Art. 7 IV — divulgação de informação de interesse coletivo",
        qual: 4, sust: 0, sc: 90, budgetCost: 0,
        axisEtico: 10, axisFiscal: 5, axisLegal: 10, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Solicitar prorrogação de 30 dias para completar os dados",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Atraso pode ser interpretado como ocultação. Registre formalmente com justificativa técnica e cronograma.",
        baseJuridica: "LAI Art. 11 §2 — prorrogação justificada",
        qual: 0, sust: 0, sc: 35, budgetCost: 0,
        axisEtico: 5, axisFiscal: 3, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Estimar os dados faltantes para completar o relatório",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Dados estimados sem metodologia declarada em documento oficial é irregularidade grave. Pode configurar falsidade ideológica.",
        baseJuridica: "Lei 12.527/2011 Art. 32 — responsabilidade por informação falsa",
        qual: 2, sust: -5, sc: 15, budgetCost: 0,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0,
        consequenciaLateral: "CI_04"
      }
    }
  },
  {
    id: "M1F1C5", icone: "📖", tipo: "DILEMA_ETICO",
    titulo: "Material didático: adaptado ou universal?",
    descricao: "O orçamento permite comprar material adaptado (Braille, alto contraste, audiodescrição) para 18 alunos com deficiência visual, OU material comum para os 240 alunos da escola. Não há verba para os dois.",
    prazoHoras: null,
    baseConceitual: "LBI Art. 28 XI — currículo acessível. Convenção da ONU sobre PcD Art. 24 — educação inclusiva. Conceito de equidade vs igualdade.",
    perguntaDebriefing: "Como o conceito de equidade difere de igualdade neste contexto? Qual princípio deve guiar a alocação de recursos em Educação Especial?",
    opcoes: {
      A: {
        id: "A", texto: "Priorizar material adaptado para os 18 alunos com deficiência",
        rotulo: "HUMANISTA", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Decisão alinhada ao princípio da equidade: quem mais precisa recebe mais. Os 222 alunos ficarão sem material novo, o que exige comunicação transparente às famílias.",
        baseJuridica: "LBI Art. 28 XI, Convenção ONU sobre PcD Art. 24",
        qual: 10, sust: -8, sc: 80, budgetCost: 28000,
        axisEtico: 15, axisFiscal: 0, axisLegal: 10, axisPedagogico: 10
      },
      B: {
        id: "B", texto: "Dividir a verba: material básico para todos + versão simplificada adaptada",
        rotulo: "EQUILIBRADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Solução criativa, mas o material adaptado simplificado pode não atender plenamente as necessidades pedagógicas específicas.",
        baseJuridica: "LDB Art. 59 — recursos para atender especificidades dos alunos",
        qual: 4, sust: -5, sc: 70, budgetCost: 20000,
        axisEtico: 8, axisFiscal: 3, axisLegal: 5, axisPedagogico: 8,
        flagOpcaoCriativa: true
      },
      C: {
        id: "C", texto: "Comprar material comum para todos, incluindo alunos com deficiência",
        rotulo: "CONSERVADOR", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Incluir alunos com deficiência visual em material sem adaptação é exclusão mascarada de inclusão. Viola o direito ao currículo acessível.",
        baseJuridica: "LBI Art. 28 XI",
        qual: -12, sust: 3, sc: 20, budgetCost: 15000,
        axisEtico: 0, axisFiscal: 8, axisLegal: 0, axisPedagogico: 0
      }
    }
  }
];

const m1f2 = [
  {
    id: "M1F2C1", icone: "💡", tipo: "OPORTUNIDADE",
    titulo: "Verba federal com contrapartida obrigatória",
    descricao: "O MEC anuncia R$80k de verba extra para Educação Especial condicionada a contrapartida municipal de R$20k. Prazo de adesão: 15 dias. O município tem os R$20k, mas estão comprometidos com outro contrato.",
    prazoHoras: 360,
    baseConceitual: "Fundeb Art. 16 — transferências voluntárias. Lei 8.666/93 Art. 65 II — alteração contratual.",
    perguntaDebriefing: "Que rotina de monitoramento de editais federais garantiria não perder estas oportunidades?",
    opcoes: {
      A: {
        id: "A", texto: "Aderir remanejando os R$20k e renegociando o contrato existente",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Resultado líquido de +R$60k. Renegociação de contrato é instrumento legítimo de gestão. Multiplica 4x o investimento municipal.",
        baseJuridica: "Fundeb Art. 16, Lei 8.666/93 Art. 65 II",
        qual: 8, sust: 5, sc: 140, budgetCost: -60000,
        axisEtico: 5, axisFiscal: 10, axisLegal: 10, axisPedagogico: 8
      },
      B: {
        id: "B", texto: "Solicitar prazo adicional ao MEC para reorganizar as finanças",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "MEC raramente prorroga editais. Risco real de perder a oportunidade. Vale tentar com justificativa técnica sólida.",
        baseJuridica: "Portaria MEC sobre transferências voluntárias",
        qual: 2, sust: 0, sc: 40, budgetCost: 0,
        axisEtico: 3, axisFiscal: 3, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Declinar: risco de endividamento não justifica",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Recusar multiplicação de 4x do investimento por conservadorismo excessivo é má gestão. O remanejamento era viável e legítimo.",
        baseJuridica: "—",
        qual: -5, sust: 2, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: 5, axisLegal: 0, axisPedagogico: 0
      }
    }
  },
  {
    id: "M1F2C2", icone: "👩‍🏫", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Contratação de professor especialista AEE",
    descricao: "A Secretaria precisa de um professor especialista em AEE para a Sala Multifuncional Tipo 2. Três caminhos possíveis, cada um com custo e risco diferentes.",
    prazoHoras: null,
    baseConceitual: "CF Art. 37 II — concurso público. Res. CNE/CEB 4/2009 Art. 13 — perfil do professor AEE.",
    perguntaDebriefing: "Como equilibrar a necessidade imediata de cobertura da sala com a necessidade de regularidade jurídica na contratação?",
    opcoes: {
      A: {
        id: "A", texto: "Abrir concurso público para professor AEE",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Concurso garante isonomia, qualidade e vínculo permanente. Prazo médio: 8 meses. Solução definitiva e juridicamente segura.",
        baseJuridica: "CF Art. 37 II — acesso por concurso público",
        qual: 6, sust: -4, sc: 110, budgetCost: 45000,
        axisEtico: 5, axisFiscal: 3, axisLegal: 15, axisPedagogico: 10
      },
      B: {
        id: "B", texto: "Designar professor da rede com formação em Educação Especial",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Solução imediata, mas pode gerar desvio de função se o professor não tiver cargo de especialista. Consultar a PGM antes.",
        baseJuridica: "Res. CNE/CEB 4/2009 Art. 13",
        qual: 4, sust: 2, sc: 55, budgetCost: 0,
        axisEtico: 3, axisFiscal: 8, axisLegal: 5, axisPedagogico: 5
      },
      C: {
        id: "C", texto: "Contrato por prazo determinado via processo seletivo simplificado",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Válido como medida emergencial enquanto o concurso não ocorre. Risco de descontinuidade pedagógica na troca de contratados.",
        baseJuridica: "Lei 9.394/96 Art. 67 — valorização profissional docente",
        qual: 3, sust: -2, sc: 50, budgetCost: 20000,
        axisEtico: 3, axisFiscal: 5, axisLegal: 5, axisPedagogico: 5
      }
    }
  },
  {
    id: "M1F2C3", icone: "⚖️", tipo: "DILEMA_ETICO",
    titulo: "TA vs formação: dois editais, um orçamento",
    descricao: "Dois editais chegam simultaneamente: (1) equipamentos de Tecnologia Assistiva por R$60k para 12 alunos; (2) pós-graduação em AEE para 4 professores por R$56k. Orçamento disponível: R$65k.",
    prazoHoras: 240,
    baseConceitual: "LBI Art. 3 III — Tecnologia Assistiva. Res. CNE/CEB 4/2009 — formação para AEE. Teoria de Elias: interdependência entre recurso e capital humano.",
    perguntaDebriefing: "Sem professores capacitados, a TA tem impacto real? Sem TA, a formação do professor serve a quê? Como planejar os dois no próximo ciclo?",
    opcoes: {
      A: {
        id: "A", texto: "Priorizar os equipamentos de Tecnologia Assistiva",
        rotulo: "HUMANISTA", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Alunos recebem recursos que ampliam funcionalidade hoje. Porém, sem professores capacitados para usar a TA, o impacto real é reduzido.",
        baseJuridica: "LBI Art. 3 III",
        qual: 8, sust: -9, sc: 75, budgetCost: 60000,
        axisEtico: 12, axisFiscal: 0, axisLegal: 8, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Priorizar a formação dos professores",
        rotulo: "HUMANISTA", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Professores capacitados multiplicam o atendimento por anos. Mas alunos continuam sem os equipamentos necessários agora.",
        baseJuridica: "Res. CNE/CEB 4/2009",
        qual: 6, sust: -8, sc: 70, budgetCost: 56000,
        axisEtico: 8, axisFiscal: 0, axisLegal: 8, axisPedagogico: 15
      },
      C: {
        id: "C", texto: "Negociar desconto em um dos editais para viabilizar os dois",
        rotulo: "EQUILIBRADO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Criatividade na gestão pública. Se o fornecedor aceitar, solução ideal. Exige esforço adicional de negociação.",
        baseJuridica: "Lei 8.666/93 Art. 15 — compras vantajosas para a Administração",
        qual: 10, sust: -6, sc: 120, budgetCost: 55000,
        axisEtico: 10, axisFiscal: 5, axisLegal: 8, axisPedagogico: 12,
        flagOpcaoCriativa: true
      }
    }
  },
  {
    id: "M1F2C4", icone: "🏦", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Criar reserva orçamentária para liminares",
    descricao: "O assessor jurídico sugere reservar R$30k como fundo de contingência para responder liminares judiciais inesperadas. Isso reduziria o orçamento disponível para programas planejados.",
    prazoHoras: null,
    baseConceitual: "Lei 4.320/64 Art. 91 — reserva de contingência. LRF Art. 42 — vedação de novos compromissos sem cobertura.",
    perguntaDebriefing: "Qual percentual do orçamento anual de Educação Especial deveria compor a reserva de contingência judicial?",
    opcoes: {
      A: {
        id: "A", texto: "Criar a reserva de R$30k conforme sugerido",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Gestão previsional. Municípios sem reserva sofrem mais com liminares porque precisam remanejar verbas de programas em andamento.",
        baseJuridica: "Lei 4.320/64 Art. 91 — reserva de contingência orçamentária",
        qual: 2, sust: 8, sc: 100, budgetCost: 30000,
        axisEtico: 5, axisFiscal: 15, axisLegal: 10, axisPedagogico: 0,
        flagReservaCriada: true
      },
      B: {
        id: "B", texto: "Criar reserva menor de R$15k como meio-termo",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Reserva insuficiente para liminares mais custosas (TA acima de R$20k). Melhor que nada, mas pode não resolver crises maiores.",
        baseJuridica: "Lei 4.320/64 Art. 91",
        qual: 1, sust: 4, sc: 55, budgetCost: 15000,
        axisEtico: 3, axisFiscal: 8, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Não criar reserva: usar o orçamento integralmente nos programas",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Gestão imediatista. Na chegada da primeira liminar, o remanejamento causará paralisação de programas em execução.",
        baseJuridica: "LRF Art. 42",
        qual: 5, sust: -3, sc: 30, budgetCost: 0,
        axisEtico: 0, axisFiscal: 3, axisLegal: 0, axisPedagogico: 0,
        consequenciaLateral: "CI_02"
      }
    }
  },
  {
    id: "M1F2C5", icone: "🏗️", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Acessibilidade: uma escola completa ou três parciais",
    descricao: "R$120k disponíveis para acessibilidade arquitetônica. Opção 1: reforma completa de 1 escola. Opção 2: adaptações básicas em 3 escolas. 14 alunos com deficiência motora divididos entre as 3 escolas.",
    prazoHoras: null,
    baseConceitual: "Lei 10.098/2000 Art. 11. Decreto 5.296/2004 Art. 24 — padrões mínimos de acessibilidade.",
    perguntaDebriefing: "Como criar um plano plurianual de acessibilidade que evolua progressivamente cada escola para o padrão completo?",
    opcoes: {
      A: {
        id: "A", texto: "Reforma completa na escola com maior concentração de alunos",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Escola modelo é estratégica, mas os alunos nas outras 2 escolas continuam sem acesso adequado. Documente o critério de priorização.",
        baseJuridica: "Lei 10.098/2000, Decreto 5.296/2004",
        qual: 7, sust: -15, sc: 65, budgetCost: 120000,
        axisEtico: 5, axisFiscal: 3, axisLegal: 5, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Adaptações básicas em 3 escolas simultaneamente",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Alcança todos os 14 alunos com o mínimo necessário. Planeje as melhorias progressivas para os próximos exercícios.",
        baseJuridica: "Lei 10.098/2000, Decreto 5.296/2004 Art. 24",
        qual: 10, sust: -15, sc: 120, budgetCost: 120000,
        axisEtico: 10, axisFiscal: 3, axisLegal: 10, axisPedagogico: 5
      },
      C: {
        id: "C", texto: "Aguardar verba federal para fazer as 3 escolas com qualidade",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Não existe garantia de verba federal futura. Alunos ficam inacessíveis. Omissão documentada pode resultar em ação civil pública.",
        baseJuridica: "CF Art. 208, Lei 10.098/2000",
        qual: -10, sust: 15, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: 8, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true
      }
    }
  }
];

const m1f3 = [
  {
    id: "M1F3C1", icone: "📉", tipo: "CRISE_ORCAMENTARIA",
    titulo: "Corte orçamentário de 15% no meio do exercício",
    descricao: "Devido à queda na arrecadação municipal, a Secretaria da Fazenda bloqueou 15% do orçamento da Educação Especial de forma linear e imediata. Contratos já empenhados não podem ser desfeitos, restando apenas cortar novos investimentos ou projetos de expansão.",
    prazoHoras: 72,
    baseConceitual: "LC 101/2000 (LRF) Art. 9 — contingenciamento de despesas. CF/88 Art. 212 — mínimos constitucionais.",
    perguntaDebriefing: "Cortar de forma linear atende ao princípio da equidade? Quais serviços da educação especial jamais deveriam sofrer contingenciamento?",
    opcoes: {
      A: {
        id: "A", texto: "Suspender a compra de equipamentos de TA planejada e cortar materiais",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "A decisão resolve o fluxo de caixa, mas prejudica diretamente o direito ao currículo acessível dos alunos no ano em curso.",
        baseJuridica: "LBI Art. 28",
        qual: -8, sust: 10, sc: 40, budgetCost: 0,
        axisEtico: 2, axisFiscal: 10, axisLegal: 5, axisPedagogico: -5
      },
      B: {
        id: "B", texto: "Priorizar serviços essenciais e tentar remanejar verbas de publicidade/eventos",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Uma gestão responsável blinda o Atendimento Educacional Especializado (AEE) de cortes buscando eficiência em áreas meio.",
        baseJuridica: "LRF Art. 9",
        qual: 5, sust: 5, sc: 110, budgetCost: 0,
        axisEtico: 12, axisFiscal: 8, axisLegal: 8, axisPedagogico: 10
      },
      C: {
        id: "C", texto: "Desobedecer ao decreto e continuar empenhando despesas normais",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Incorrer em despesas sem lastro orçamentário é infração gravíssima à LRF, sujeitando o gestor à rejeição de contas.",
        baseJuridica: "LRF Art. 42",
        qual: 0, sust: -15, sc: -10, budgetCost: 20000,
        axisEtico: 0, axisFiscal: -10, axisLegal: -15, axisPedagogico: 5,
        consequenciaLateral: "CI_04"
      }
    }
  },
  {
    id: "M1F3C2", icone: "📈", tipo: "OPORTUNIDADE",
    titulo: "Saldo positivo de R$30k: redistribuir estrategicamente",
    descricao: "Ao revisar contratos do semestre, identificou-se uma sobra de R$30k. O recurso deve ser empenhado até o fim do mês, caso contrário retornará ao caixa único do município.",
    prazoHoras: 240,
    baseConceitual: "Lei 4.320/64 — princípio da anualidade e uso eficiente dos recursos públicos. Planejamento estratégico educacional.",
    perguntaDebriefing: "Qual destinação traz maior retorno de longo prazo para a rede de educação inclusiva com um recurso pontual?",
    opcoes: {
      A: {
        id: "A", texto: "Investir em capacitação avançada para a equipe técnica e coordenadores",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Capacitar os formadores da rede tem efeito multiplicador e não gera despesas continuadas nos próximos anos.",
        baseJuridica: "LDB Art. 59-A",
        qual: 8, sust: 2, sc: 120, budgetCost: 30000,
        axisEtico: 8, axisFiscal: 5, axisLegal: 5, axisPedagogico: 15
      },
      B: {
        id: "B", texto: "Comprar mais Tecnologia Assistiva sob demanda para as escolas",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Equipamentos são bem-vindos, mas compras apressadas de fim de ano frequentemente resultam em materiais parados por falta de planejamento de uso.",
        baseJuridica: "LBI Art. 28",
        qual: 4, sust: -2, sc: 60, budgetCost: 30000,
        axisEtico: 5, axisFiscal: 2, axisLegal: 5, axisPedagogico: 5
      },
      C: {
        id: "C", texto: "Deixar o recurso retornar ao caixa do tesouro municipal",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Omissão na execução orçamentária prejudica o avanço das políticas de inclusão. Recursos conquistados não devem ser perdidos.",
        baseJuridica: "CF/88 Art. 37 — eficiência",
        qual: -5, sust: -5, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: -5, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true
      }
    }
  },
  {
    id: "M1F3C3", icone: "🕵️", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Auditoria identifica R$18k questionáveis da gestão anterior",
    descricao: "O controle interno apontou pagamentos suspeitos de R$18.000 em serviços não comprovados realizados na gestão passada. O relatório pede providências da atual secretaria.",
    prazoHoras: 168,
    baseConceitual: "Lei 8.429/1992 — dever de comunicação de improbidade. Súmulas do TCE sobre responsabilização solidária.",
    perguntaDebriefing: "A omissão do gestor atual em investigar atos da gestão anterior pode torná-lo corresponsável perante o Tribunal de Contas?",
    opcoes: {
      A: {
        id: "A", texto: "Instaurar sindicância interna e comunicar formalmente o Ministério Público",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Agir com transparência e seguir o devido processo legal blinda a gestão atual de responsabilidade solidária pelos danos.",
        baseJuridica: "Lei 8.429/1992 e Lei 8.112/1990 (ou estatuto municipal equivalente)",
        qual: 0, sust: 5, sc: 100, budgetCost: 0,
        axisEtico: 15, axisFiscal: 10, axisLegal: 15, axisPedagogico: 0
      },
      B: {
        id: "B", texto: "Apenas arquivar o relatório, já que ocorreu em outra gestão",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "A omissão dolosa diante de irregularidade transforma o gestor atual em conivente. O TCE pode responsabilizá-lo solidariamente.",
        baseJuridica: "Lei 8.429/1992 Art. 11 — omissão de dever funcional",
        qual: -5, sust: -10, sc: -20, budgetCost: 0,
        axisEtico: -15, axisFiscal: 0, axisLegal: -15, axisPedagogico: 0,
        consequenciaLateral: "CI_04"
      },
      C: {
        id: "C", texto: "Tentar resolver informalmente com o ex-gestor para evitar escândalos",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Tentativas informais podem soar como acobertamento ou chantagem. Problemas com erário público exigem ritos formais.",
        baseJuridica: "CF/88 Art. 37 — impessoalidade",
        qual: 0, sust: -2, sc: 30, budgetCost: 0,
        axisEtico: -5, axisFiscal: 2, axisLegal: 0, axisPedagogico: 0
      }
    }
  },
  {
    id: "M1F3C4", icone: "📊", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Déficit de 12% nas metas de matrícula especial",
    descricao: "O censo semestral mostra que a rede não atingiu a meta do Plano Municipal de Educação (PME) para a inserção de crianças com deficiência, ficando 12% abaixo da expectativa. É preciso apresentar um plano corretivo.",
    prazoHoras: 240,
    baseConceitual: "PNE (Lei 13.005/2014) — monitoramento e avaliação de metas. LBI — direito de matrícula prioritária.",
    perguntaDebriefing: "Por que as famílias podem estar deixando de matricular essas crianças? A escola está preparada para recebê-las de forma acolhedora?",
    opcoes: {
      A: {
        id: "A", texto: "Lançar busca ativa em parceria com a Secretaria de Saúde e Assistência Social",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Ação intersetorial eficaz. Identificar onde estão as crianças e garantir seu direito à educação é obrigação constitucional.",
        baseJuridica: "LBI Art. 27; ECA Art. 53 e 54",
        qual: 10, sust: -3, sc: 130, budgetCost: 15000,
        axisEtico: 12, axisFiscal: 2, axisLegal: 10, axisPedagogico: 10
      },
      B: {
        id: "B", texto: "Prorrogar os prazos no conselho municipal alegando dificuldades logísticas",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Empurrar o problema não resolve a exclusão escolar. Sem ações proativas, as metas continuarão defasadas no próximo semestre.",
        baseJuridica: "PNE Art. 5º",
        qual: -3, sust: 2, sc: 40, budgetCost: 0,
        axisEtico: 2, axisFiscal: 5, axisLegal: 0, axisPedagogico: -2
      },
      C: {
        id: "C", texto: "Culpar as famílias pela não matrícula em audiência pública",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Responsabilizar as famílias sem entender as barreiras (transporte, laudos, medo de discriminação) afasta a comunidade e gera desgaste extremo.",
        baseJuridica: "CF/88 Art. 208 — dever do Estado",
        qual: -12, sust: 0, sc: 10, budgetCost: 0,
        axisEtico: -10, axisFiscal: 0, axisLegal: -5, axisPedagogico: -10
      }
    }
  },
  {
    id: "M1F3C5", icone: "🗺️", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Planejamento anual: dados ou política?",
    descricao: "Inicia-se a elaboração da LOA (Lei Orçamentária Anual). Você pode estruturar o pedido orçamentário baseado no histórico estatístico real ou seguir a orientação política de reduzir o orçamento em 10% para agradar o gabinete do prefeito.",
    prazoHoras: 120,
    baseConceitual: "Lei 4.320/64 — elaboração da LOA. Fundeb — previsão de impacto financeiro por aluno especial.",
    perguntaDebriefing: "Ceder pressões políticas no planejamento orçamentário prejudica mais o gestor atual ou os alunos da rede?",
    opcoes: {
      A: {
        id: "A", texto: "Apresentar orçamento rigorosamente baseado no censo e demandas mapeadas",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "O orçamento é peça técnica. Defender os recursos necessários com base em dados fortalece a política pública, mesmo que desagrade politicamente.",
        baseJuridica: "Lei 4.320/64 e LRF Art. 5º",
        qual: 8, sust: 5, sc: 140, budgetCost: 0,
        axisEtico: 15, axisFiscal: 10, axisLegal: 10, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Aceitar a redução de 10% para demonstrar alinhamento com o executivo",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Cortar orçamento técnico por conveniência política garantirá uma crise de caixa no próximo ano, quando as liminares chegarem.",
        baseJuridica: "ECA Art. 4º — prioridade absoluta",
        qual: -6, sust: 8, sc: 50, budgetCost: -25000,
        axisEtico: -5, axisFiscal: -5, axisLegal: 0, axisPedagogico: -5,
        flagRecusaPolitica: false
      },
      C: {
        id: "C", texto: "Superestimar o orçamento em 30% prevendo que haverá cortes depois",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Peças orçamentárias fictícias tiram a credibilidade técnica da secretaria e frequentemente são vetadas integralmente pelas comissões.",
        baseJuridica: "LRF — princípio da veracidade do orçamento",
        qual: 2, sust: -8, sc: 20, budgetCost: 0,
        axisEtico: -8, axisFiscal: -10, axisLegal: -5, axisPedagogico: 0
      }
    }
  }
];

fs.writeFileSync('src/data/mod1.json', JSON.stringify([...m1f1, ...m1f2, ...m1f3], null, 2));
console.log('mod1 done');
