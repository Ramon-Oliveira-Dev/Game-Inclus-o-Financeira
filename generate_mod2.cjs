const fs = require('fs');

const m2f4 = [
  {
    id: "M2F4C1", icone: "⚖️", tipo: "URGENCIA_JUDICIAL",
    titulo: "Prazo de 72h para dispositivo de CAA",
    descricao: "Família obtém liminar exigindo dispositivo de Comunicação Aumentativa e Alternativa para aluno com TEA não verbal. Custo: R$28.000. Prazo judicial: 72 horas. Sem previsão orçamentária.",
    prazoHoras: 72,
    baseConceitual: "LBI Art. 3 III — CAA como Tecnologia Assistiva. CPC Art. 536 §1 — multa coercitiva por descumprimento.",
    perguntaDebriefing: "Qual é o custo-benefício real de recorrer de uma liminar de direito à educação especial quando comparado com o custo de cumpri-la?",
    opcoes: {
      A: {
        id: "A", texto: "Adquirir o equipamento por dispensa de licitação emergencial",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Dispensa de licitação por urgência é prevista em lei. Descumprir liminar gera multa diária superior ao custo do próprio equipamento.",
        baseJuridica: "Lei 8.666/93 Art. 24 IV — dispensa por urgência. Lei 14.133/2021 Art. 75 VIII.",
        qual: 10, sust: -6, sc: 130, budgetCost: 28000,
        axisEtico: 10, axisFiscal: 3, axisLegal: 15, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Recorrer da liminar e solicitar prazo adicional ao juiz",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Recurso é direito da administração, mas raramente suspendem liminares de direito à educação. A multa começa imediatamente.",
        baseJuridica: "CPC Art. 1.012 — efeito suspensivo de recurso",
        qual: -5, sust: -2, sc: 40, budgetCost: 0,
        axisEtico: 3, axisFiscal: 5, axisLegal: 8, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Aguardar próxima licitação regular para adquirir o equipamento",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Descumprir liminar em 72h gera multa diária automática. Uma semana de descumprimento equivale ao custo do próprio equipamento.",
        baseJuridica: "CPC Art. 536 §1 — multa coercitiva",
        qual: -15, sust: -12, sc: 10, budgetCost: 3500,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true, consequenciaLateral: "CI_05"
      }
    }
  },
  {
    id: "M2F4C2", icone: "🔴", tipo: "URGENCIA_JUDICIAL",
    titulo: "Multa diária acumulando há 12 dias",
    descricao: "A secretaria descumpriu liminar de intérprete de LIBRAS. Multa de R$500/dia acumula há 12 dias: R$6.000 devidos. O advogado diz para aguardar o julgamento do recurso. O pedagógico diz para cumprir imediatamente.",
    prazoHoras: 48,
    baseConceitual: "Decreto 5.626/2005 — obrigatoriedade do intérprete de LIBRAS. CPC Art. 536 — execução de obrigação de fazer.",
    perguntaDebriefing: "Em que momento o custo do descumprimento supera o custo do cumprimento de uma liminar?",
    opcoes: {
      A: {
        id: "A", texto: "Cumprir imediatamente: contratar intérprete e comunicar ao juiz",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Cumprir e comunicar ao juiz interrompe a multa e demonstra boa-fé. O recurso pode continuar em paralelo.",
        baseJuridica: "CPC Art. 536 §1 — cessação da multa com cumprimento. Decreto 5.626/2005 Art. 14.",
        qual: 12, sust: -4, sc: 140, budgetCost: 6000,
        axisEtico: 12, axisFiscal: 3, axisLegal: 15, axisPedagogico: 8
      },
      B: {
        id: "B", texto: "Seguir orientação jurídica e aguardar o julgamento do recurso",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "O advogado pode ter razão processualmente, mas cada dia aumenta o débito. Se o recurso for negado, o município deve os R$6k mais os dias adicionais.",
        baseJuridica: "CPC Art. 1.012 — efeito suspensivo não automático",
        qual: -8, sust: -8, sc: 30, budgetCost: 3000,
        axisEtico: 3, axisFiscal: 3, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Negociar parcelamento da multa com a família diretamente",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Negociar diretamente com a parte contrária sem anuência do juiz é irregularidade processual. Não resolve o fundo: aluno continua sem intérprete.",
        baseJuridica: "CPC Art. 190 — negociação processual requer homologação judicial",
        qual: -10, sust: -5, sc: 15, budgetCost: 1000,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0,
        consequenciaLateral: "CI_06"
      }
    }
  },
  {
    id: "M2F4C3", icone: "⚖️", tipo: "URGENCIA_JUDICIAL",
    titulo: "Cinco liminares simultâneas",
    descricao: "Cinco famílias obtiveram liminares diferentes na mesma semana: (1) cadeira motorizada R$22k, (2) software CAA R$15k, (3) intérprete LIBRAS R$18k/mês, (4) transporte adaptado R$12k, (5) profissional de apoio R$8k/mês. Total: R$75k. Reserva: R$30k.",
    prazoHoras: 96,
    baseConceitual: "LBI Art. 28 — deveres múltiplos do Estado. CF Art. 208. Gestão de passivo judicial em Educação Especial.",
    perguntaDebriefing: "Como um fundo de contingência pré-criado mudaria completamente a gestão deste cenário?",
    opcoes: {
      A: {
        id: "A", texto: "Cumprir as 3 liminares de menor custo e pedir prazo nas outras 2",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Priorização pragmática, mas todas têm igual força legal. Comunicar ao juiz com justificativa orçamentária fundamentada é essencial.",
        baseJuridica: "CPC Art. 536 — execução progressiva em impossibilidade fundamentada",
        qual: 5, sust: -8, sc: 65, budgetCost: 35000,
        axisEtico: 8, axisFiscal: 5, axisLegal: 8, axisPedagogico: 3
      },
      B: {
        id: "B", texto: "Pedir consolidação das 5 liminares com plano de cumprimento escalonado",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Estratégia jurídica sofisticada e legítima. Muitos juízes aceitam planos escalonados quando o município apresenta restrição orçamentária comprovada.",
        baseJuridica: "CPC Art. 536 §1 — poder geral de efetivação. Precedentes STJ.",
        qual: 8, sust: -5, sc: 150, budgetCost: 45000,
        axisEtico: 10, axisFiscal: 8, axisLegal: 15, axisPedagogico: 5,
        flagOpcaoCriativa: true
      },
      C: {
        id: "C", texto: "Não cumprir nenhuma e aguardar julgamento unificado dos recursos",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Cinco multas diárias simultâneas. Em 30 dias o passivo pode chegar a R$75k extras além do valor original. Contumácia grave.",
        baseJuridica: "CPC Art. 536 §1 — multas cumulativas por ordem judicial",
        qual: -20, sust: -18, sc: 5, budgetCost: 0,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0,
        flagOmissao: true, consequenciaLateral: "CI_07"
      }
    }
  },
  {
    id: "M2F4C4", icone: "🔴", tipo: "URGENCIA_JUDICIAL",
    titulo: "Recurso negado — 48h para cumprir",
    descricao: "O TJ negou o recurso municipal. Prazo: 48h. Equipamento exigido (órtese especial): R$19.000. Agravante: orçamento temporariamente congelado por auditoria do TCE.",
    prazoHoras: 48,
    baseConceitual: "CPC Art. 1.021 — agravo interno. Lei 4.320/64 Art. 43 — suplementação orçamentária.",
    perguntaDebriefing: "Qual a importância de ter um fundo de contingência específico para passivos judiciais no orçamento anual?",
    opcoes: {
      A: {
        id: "A", texto: "Acionar reserva de outra secretaria com autorização do prefeito",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Interfederativo e legítimo. O prefeito pode autorizar uso emergencial de outra secretaria quando a alternativa é descumprir ordem judicial.",
        baseJuridica: "Lei 4.320/64 Art. 43 — suplementação com autorização do executivo",
        qual: 9, sust: -4, sc: 120, budgetCost: 19000,
        axisEtico: 10, axisFiscal: 5, axisLegal: 12, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Solicitar ao juiz prazo adicional pelo congelamento do TCE",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Argumento de impossibilidade temporária pode ser aceito se documentado. Comunicar ANTES do vencimento do prazo com documentos do TCE.",
        baseJuridica: "CPC Art. 536 §1 — impossibilidade temporária de cumprimento",
        qual: -3, sust: -1, sc: 50, budgetCost: 0,
        axisEtico: 5, axisFiscal: 5, axisLegal: 10, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Interpor novo recurso ao STJ para ganhar mais tempo",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Recurso ao STJ sem hipótese de cabimento é estratégia protelatória que o juiz pode penalizar com majoração da multa.",
        baseJuridica: "CPC Art. 1.029 — requisitos do recurso especial",
        qual: -8, sust: -6, sc: 15, budgetCost: 2000,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0,
        consequenciaLateral: "CI_08"
      }
    }
  },
  {
    id: "M2F4C5", icone: "📄", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Família propõe acordo extrajudicial",
    descricao: "Família propõe cumprir extrajudicialmente se o município fornecer laudo técnico oficial e cronograma contratual de entrega assinado. Jurídico diz que não substitui a ordem judicial. Pedagógico diz que é oportunidade.",
    prazoHoras: 120,
    baseConceitual: "Lei 13.140/2015 — mediação entre particulares e administração pública. CPC Art. 515 III — acordo homologado como título executivo.",
    perguntaDebriefing: "Quais instrumentos de mediação a administração pública pode usar antes da judicialização de conflitos em Educação Especial?",
    opcoes: {
      A: {
        id: "A", texto: "Aceitar o acordo, emitir laudo e assinar cronograma",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Solução consensual com custo zero imediato. O laudo é obrigação da secretaria de qualquer forma. Solicitar homologação judicial para segurança.",
        baseJuridica: "Lei 13.140/2015 Art. 3 §2 — mediação em direitos disponíveis",
        qual: 8, sust: 5, sc: 130, budgetCost: 0,
        axisEtico: 10, axisFiscal: 10, axisLegal: 12, axisPedagogico: 5,
        flagOpcaoCriativa: true
      },
      B: {
        id: "B", texto: "Aceitar parcialmente: emitir laudo mas não assinar cronograma",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Recusar o cronograma pode ser interpretado como falta de compromisso e desfazer o acordo. Risco de a família desistir da negociação.",
        baseJuridica: "Lei 13.140/2015",
        qual: 3, sust: 2, sc: 50, budgetCost: 0,
        axisEtico: 5, axisFiscal: 5, axisLegal: 5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Recusar o acordo: seguir exclusivamente pela via judicial",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Recusar solução consensual gratuita para seguir processo custoso é má gestão de conflito. A jurisprudência incentiva acordos em casos de direitos de PcD.",
        baseJuridica: "Lei 13.140/2015 Art. 32",
        qual: -6, sust: -4, sc: 20, budgetCost: 5000,
        axisEtico: 0, axisFiscal: 0, axisLegal: 3, axisPedagogico: 0
      }
    }
  }
];

const m2f5 = [
  {
    id: "M2F5C1", icone: "🗳️", tipo: "PRESSAO_POLITICA",
    titulo: "Vereador e a lista de espera",
    descricao: "O vereador da base aliada do prefeito liga pedindo que o filho de um eleitor importante seja incluído na lista de atendimento de Tecnologia Assistiva — pulando 14 alunos.",
    prazoHoras: 24,
    baseConceitual: "Gestão pública orientada pelos princípios constitucionais da Administração (LIMPE).",
    perguntaDebriefing: "A quem pertence a escola pública e como proteger a equipe técnica da ingerência político-partidária?",
    opcoes: {
      A: {
        id: "A", texto: "Recusar: informar que a lista segue critério técnico",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Decisão ética e correta. A lista técnica protege a gestão contra acusações de favorecimento e improbidade.",
        baseJuridica: "CF/88 Art. 37 (Princípio da Impessoalidade e Moralidade).",
        qual: 6, sust: 4, sc: 150, budgetCost: 0,
        axisEtico: 15, axisFiscal: 0, axisLegal: 15, axisPedagogico: 5,
        flagRecusaPolitica: true
      },
      B: {
        id: "B", texto: "Atender o pedido para evitar atritos políticos",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Pular a fila fere a impessoalidade e pode gerar processos graves e representações no Ministério Público.",
        baseJuridica: "Lei 8.429/1992 (Lei de Improbidade Administrativa) Art. 11.",
        qual: -20, sust: -10, sc: -10, budgetCost: 0,
        axisEtico: -20, axisFiscal: 0, axisLegal: -20, axisPedagogico: -5
      },
      C: {
        id: "C", texto: "Criar uma vaga extra temporária sem alterar a lista",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Embora não prejudique os 14 da lista diretamente, criar gasto extra por pressão política é ilegal e insustentável.",
        baseJuridica: "CF/88 Art. 37",
        qual: 2, sust: -10, sc: 30, budgetCost: 8000,
        axisEtico: -10, axisFiscal: -8, axisLegal: -10, axisPedagogico: 0,
        consequenciaLateral: "CI_04"
      }
    }
  },
  {
    id: "M2F5C2", icone: "📈", tipo: "PRESSAO_POLITICA",
    titulo: "Dados superestimados para eleição",
    descricao: "O gabinete do prefeito exige que os relatórios de inclusão mostrem 100% de acessibilidade nas escolas para a campanha eleitoral, mesmo sabendo que o índice real é 65%.",
    prazoHoras: 48,
    baseConceitual: "Lei 12.527/2011 (LAI). Responsabilidade do agente público pelas informações prestadas.",
    perguntaDebriefing: "Quais as consequências jurídicas para o gestor que assina documentos oficiais com dados falsos?",
    opcoes: {
      A: {
        id: "A", texto: "Recusar a alteração e publicar os dados reais (65%) com metas de melhoria",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Manter a integridade dos dados oficiais é dever do gestor, evitando falsidade ideológica e protegendo o município.",
        baseJuridica: "CP Art. 299 (Falsidade Ideológica)",
        qual: 5, sust: 5, sc: 140, budgetCost: 0,
        axisEtico: 15, axisFiscal: 0, axisLegal: 15, axisPedagogico: 0,
        flagRecusaPolitica: true
      },
      B: {
        id: "B", texto: "Publicar relatórios omitindo o índice de acessibilidade",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "A omissão evita a mentira direta, mas contraria a LAI e gera suspeitas no controle social.",
        baseJuridica: "Lei 12.527/2011",
        qual: -5, sust: 0, sc: 40, budgetCost: 0,
        axisEtico: -5, axisFiscal: 0, axisLegal: -5, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Acabar cedendo e assinar o relatório com 100%",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Assinar documento falso é crime. O gestor responde pessoalmente e o município pode ser investigado pela Justiça Eleitoral.",
        baseJuridica: "CP Art. 299",
        qual: -15, sust: -10, sc: -30, budgetCost: 0,
        axisEtico: -20, axisFiscal: 0, axisLegal: -20, axisPedagogico: -5,
        consequenciaLateral: "CI_09"
      }
    }
  },
  {
    id: "M2F5C3", icone: "🗞️", tipo: "PRESSAO_POLITICA",
    titulo: "Reportagem sobre inacessibilidade",
    descricao: "Jornal local pública denúncia com fotos de alunos PcD sendo carregados em escadas. A pressão midiática exige cabeças. O prefeito quer demitir o diretor da escola, que não tem culpa pela falta de verbas.",
    prazoHoras: 12,
    baseConceitual: "Responsabilidade objetiva do Estado x Responsabilidade subjetiva do servidor.",
    perguntaDebriefing: "Como a comunicação transparente da falta de recursos pode evitar bodes expiatórios?",
    opcoes: {
      A: {
        id: "A", texto: "Assumir a responsabilidade institucional e defender o diretor publicamente",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Liderança exemplar. Protege a equipe técnica e expõe o problema estrutural de falta de verbas.",
        baseJuridica: "CF/88 Art. 37 §6º",
        qual: 10, sust: 2, sc: 130, budgetCost: 0,
        axisEtico: 15, axisFiscal: 0, axisLegal: 10, axisPedagogico: 10,
        flagRecusaPolitica: true
      },
      B: {
        id: "B", texto: "Silenciar e iniciar obras emergenciais sem planejamento",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Obras sem planejamento por pressão midiática geram superfaturamento e soluções paliativas que logo apresentarão defeito.",
        baseJuridica: "Lei 8.666/93 Art. 7º",
        qual: 2, sust: -12, sc: 50, budgetCost: 40000,
        axisEtico: 0, axisFiscal: -10, axisLegal: -5, axisPedagogico: 2
      },
      C: {
        id: "C", texto: "Acatar a demissão do diretor para abafar o caso",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Afastar um servidor inocente destrói a confiança da rede e não resolve o problema de acessibilidade.",
        baseJuridica: "Lei 8.112/90 (Estatuto do Servidor)",
        qual: -18, sust: 0, sc: -10, budgetCost: 0,
        axisEtico: -20, axisFiscal: 0, axisLegal: -10, axisPedagogico: -15
      }
    }
  },
  {
    id: "M2F5C4", icone: "📨", tipo: "PRESSAO_POLITICA",
    titulo: "Denúncia anônima ao MP",
    descricao: "O MP notifica a Secretaria sobre denúncia anônima (provavelmente de opositores políticos) alegando desvio de verba na compra de materiais em Braille. Os processos estão regulares, mas o pedido de informações é volumoso.",
    prazoHoras: 120,
    baseConceitual: "Transparência pública e controle externo (MP e TCE).",
    perguntaDebriefing: "Por que uma gestão documental impecável é a maior defesa do gestor público?",
    opcoes: {
      A: {
        id: "A", texto: "Fornecer cópia integral e proativa de todos os processos licitatórios",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "A transparência total desmonta denúncias políticas infundadas e estabelece relação de confiança com o Ministério Público.",
        baseJuridica: "Lei 12.527/2011 (LAI)",
        qual: 5, sust: 5, sc: 140, budgetCost: 0,
        axisEtico: 15, axisFiscal: 5, axisLegal: 15, axisPedagogico: 0,
        flagRecusaPolitica: true
      },
      B: {
        id: "B", texto: "Responder apenas o mínimo perguntado, atrasando a entrega de anexos",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Sonegar informação passa a impressão de culpa. O MP pode solicitar mandado de busca e apreensão na secretaria.",
        baseJuridica: "LACP (Lei 7.347/85)",
        qual: -5, sust: -2, sc: 30, budgetCost: 0,
        axisEtico: -5, axisFiscal: 0, axisLegal: -10, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Ignorar a notificação alegando ser denúncia anônima sem provas",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Ignorar o MP configura crime de desobediência e ato de improbidade administrativa. O inquérito civil será instaurado compulsoriamente.",
        baseJuridica: "Lei 8.429/1992 Art. 11",
        qual: -15, sust: -10, sc: -40, budgetCost: 0,
        axisEtico: -15, axisFiscal: 0, axisLegal: -20, axisPedagogico: 0,
        consequenciaLateral: "CI_10"
      }
    }
  },
  {
    id: "M2F5C5", icone: "🎤", tipo: "DILEMA_ETICO",
    titulo: "Audiência pública com dados mistos",
    descricao: "Em audiência na Câmara, você deve apresentar os resultados anuais. As matrículas subiram (positivo), mas as avaliações de aprendizagem dos alunos com deficiência caíram (negativo). O líder do governo pede para ocultar a queda.",
    prazoHoras: 24,
    baseConceitual: "Accountability na educação pública e transparência de resultados pedagógicos.",
    perguntaDebriefing: "Ocultar dados pedagógicos ruins protege a gestão ou perpetua a falha no atendimento aos alunos?",
    opcoes: {
      A: {
        id: "A", texto: "Apresentar todos os dados e propor um plano de ação para a aprendizagem",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Transparência total e proatividade. Reconhecer a falha com plano de correção demonstra maturidade da gestão.",
        baseJuridica: "CF/88 Art. 37 (Publicidade) e ECA",
        qual: 12, sust: 2, sc: 145, budgetCost: 5000,
        axisEtico: 15, axisFiscal: 0, axisLegal: 10, axisPedagogico: 15
      },
      B: {
        id: "B", texto: "Destacar os pontos positivos e responder sobre os negativos apenas se perguntado",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Tática política comum, mas não resolve o problema pedagógico de fundo e quebra a confiança se os dados vierem a público por outras fontes.",
        baseJuridica: "LAI",
        qual: -2, sust: 2, sc: 60, budgetCost: 0,
        axisEtico: 0, axisFiscal: 0, axisLegal: 0, axisPedagogico: -5
      },
      C: {
        id: "C", texto: "Ocultar completamente os dados negativos conforme pedido",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Falsificar a percepção pública impede que recursos sejam direcionados para resolver o déficit de aprendizagem.",
        baseJuridica: "Lei 12.527/2011",
        qual: -15, sust: -5, sc: -10, budgetCost: 0,
        axisEtico: -15, axisFiscal: 0, axisLegal: -10, axisPedagogico: -15
      }
    }
  }
];

const m2f6 = [
  {
    id: "M2F6C1", icone: "📉", tipo: "CRISE_ORCAMENTARIA",
    titulo: "Repasse Fundeb atrasado 45 dias",
    descricao: "O repasse federal atrasou. A folha de pagamento dos cuidadores e os pagamentos de fornecedores de TA estão ameaçados. Sem ação, o serviço para na próxima semana.",
    prazoHoras: 96,
    baseConceitual: "Lei 4.320/64 e LRF Art. 38 (Antecipação de Receita Orçamentária). Continuidade do serviço público.",
    perguntaDebriefing: "Quais os limites legais para uso de recursos próprios do tesouro municipal para cobrir atrasos de repasses federais vinculados?",
    opcoes: {
      A: {
        id: "A", texto: "Solicitar adiantamento do Tesouro Municipal com restituição programada",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Ação de tesouraria legítima para manter serviço essencial operando. Protege a folha e os alunos.",
        baseJuridica: "LRF Art. 38 (ARO) e princípio da continuidade",
        qual: 8, sust: -2, sc: 130, budgetCost: 55000,
        axisEtico: 10, axisFiscal: 10, axisLegal: 15, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Suspender temporariamente os pagamentos de fornecedores e priorizar a folha",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Garante os salários, mas fornecedores podem suspender entregas de TA, paralisando a inclusão de vários alunos.",
        baseJuridica: "Lei 8.666/93 Art. 78 XV (suspensão por atraso)",
        qual: -5, sust: 5, sc: 50, budgetCost: 22000,
        axisEtico: 0, axisFiscal: 8, axisLegal: 5, axisPedagogico: -5
      },
      C: {
        id: "C", texto: "Reduzir a jornada de cuidadores pela metade para economizar",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Cortar jornada de apoio significa inviabilizar a permanência do aluno com deficiência na escola. Gera judicialização imediata.",
        baseJuridica: "LBI Art. 28 e CF/88 Art. 208",
        qual: -20, sust: -5, sc: -10, budgetCost: 0,
        axisEtico: -15, axisFiscal: -5, axisLegal: -15, axisPedagogico: -15
      }
    }
  },
  {
    id: "M2F6C2", icone: "⚠️", tipo: "CRISE_ORCAMENTARIA",
    titulo: "Fornecedor ameaça suspender TA",
    descricao: "Um fornecedor exclusivo de um software de CAA ameaça cortar o acesso de 50 alunos amanhã, por conta de uma fatura de R$20.000 não paga há 3 meses devido à burocracia do empenho.",
    prazoHoras: 24,
    baseConceitual: "Lei 8.666/93 Art. 78 XV — exceção de contrato não cumprido pela Administração. Prioridade absoluta da PcD.",
    perguntaDebriefing: "Como a burocracia interna da secretaria pode violar indiretamente direitos fundamentais?",
    opcoes: {
      A: {
        id: "A", texto: "Priorizar o pagamento emergencial da fatura e notificar a controladoria",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Desbloqueia o serviço e resolve o passivo. A controladoria ajuda a evitar que a falha burocrática se repita.",
        baseJuridica: "Lei 4.320/64 — ordem cronológica de pagamentos e suas exceções",
        qual: 5, sust: -5, sc: 120, budgetCost: 20000,
        axisEtico: 10, axisFiscal: 5, axisLegal: 10, axisPedagogico: 10
      },
      B: {
        id: "B", texto: "Notificar extrajudicialmente a empresa exigindo a manutenção do serviço",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "O atraso superior a 90 dias dá direito ao fornecedor de suspender. A notificação pode não surtir efeito legal.",
        baseJuridica: "Lei 8.666/93 Art. 78 XV",
        qual: -8, sust: 2, sc: 40, budgetCost: 0,
        axisEtico: 0, axisFiscal: 5, axisLegal: -5, axisPedagogico: -10
      },
      C: {
        id: "C", texto: "Deixar o software ser cortado e buscar outra alternativa gratuita",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Trocar TA no meio do processo quebra a rotina dos alunos com TEA e desorganiza a pedagogia. Má gestão contratual.",
        baseJuridica: "LBI Art. 28",
        qual: -15, sust: -10, sc: 0, budgetCost: 0,
        axisEtico: -10, axisFiscal: -5, axisLegal: -5, axisPedagogico: -15
      }
    }
  },
  {
    id: "M2F6C3", icone: "🚪", tipo: "CRISE_ORCAMENTARIA",
    titulo: "Especialistas AEE pedem demissão",
    descricao: "Com os salários congelados, 4 especialistas de AEE altamente qualificados pediram demissão do contrato temporário. O atendimento de 80 alunos está comprometido a partir de segunda-feira.",
    prazoHoras: 120,
    baseConceitual: "Gestão de pessoas no setor público. Valorização docente (LDB Art. 67). Impacto pedagógico da descontinuidade.",
    perguntaDebriefing: "O custo fiscal de um reajuste é maior ou menor que o custo de paralisação e formação de novos profissionais?",
    opcoes: {
      A: {
        id: "A", texto: "Autorizar aditivo salarial de urgência justificado pela alta especialização",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Manter o capital humano especializado é crucial. O aditivo custa menos que o dano da perda do profissional.",
        baseJuridica: "LDB Art. 67 — valorização profissional",
        qual: 10, sust: -8, sc: 130, budgetCost: 24000,
        axisEtico: 10, axisFiscal: 2, axisLegal: 8, axisPedagogico: 15
      },
      B: {
        id: "B", texto: "Iniciar contratação imediata de substitutos aceitando currículos iniciantes",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Resolve a presença em sala, mas a qualidade do atendimento despenca. Curva de aprendizado prejudicará os alunos.",
        baseJuridica: "Resolução CNE/CEB 4/2009",
        qual: -10, sust: -2, sc: 50, budgetCost: 25000,
        axisEtico: 0, axisFiscal: 5, axisLegal: 5, axisPedagogico: -10
      },
      C: {
        id: "C", texto: "Redistribuir os 80 alunos entre os professores restantes",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Sobrecarga extrema gera burnout nos professores restantes, resultando em mais demissões e colapso do sistema.",
        baseJuridica: "CF/88 Art. 206 — padrão de qualidade",
        qual: -20, sust: 5, sc: -20, budgetCost: 0,
        axisEtico: -10, axisFiscal: 10, axisLegal: -5, axisPedagogico: -20
      }
    }
  },
  {
    id: "M2F6C4", icone: "⏰", tipo: "CRISE_ORCAMENTARIA",
    titulo: "Contratos de apoio escolar vencendo",
    descricao: "O contrato terceirizado dos profissionais de apoio escolar vence em 30 dias. A nova licitação atrasou. O setor financeiro informa que não há saldo para um aditivo de prorrogação.",
    prazoHoras: 720,
    baseConceitual: "Lei 8.666/93 Art. 57 (Prorrogação de contratos de serviços contínuos). Princípio da continuidade.",
    perguntaDebriefing: "Como o planejamento antecipado de licitações evita a criação de crises fiscais artificiais?",
    opcoes: {
      A: {
        id: "A", texto: "Remanejar rubricas do orçamento geral para garantir o aditivo",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Serviço contínuo não pode parar. O remanejamento evita o colapso do atendimento e ações judiciais massivas.",
        baseJuridica: "Lei 8.666/93 Art. 57 II e Lei 4.320/64 Art. 43",
        qual: 5, sust: -6, sc: 110, budgetCost: 36000,
        axisEtico: 10, axisFiscal: 5, axisLegal: 12, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Fazer contrato emergencial reduzindo o número de cuidadores",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "A redução de postos deixará alunos desatendidos. Custo financeiro empatado com o aditivo, mas com alto custo social.",
        baseJuridica: "Lei 8.666/93 Art. 24 IV",
        qual: -8, sust: -5, sc: 40, budgetCost: 36000,
        axisEtico: -5, axisFiscal: 2, axisLegal: 5, axisPedagogico: -10
      },
      C: {
        id: "C", texto: "Deixar o contrato vencer e solicitar apoio de voluntários",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Ilegal e irresponsável. Voluntários não têm vínculo nem qualificação técnica para atuar como profissionais de apoio.",
        baseJuridica: "LBI Art. 28 e CF/88 Art. 37",
        qual: -25, sust: 10, sc: -30, budgetCost: 0,
        axisEtico: -20, axisFiscal: 10, axisLegal: -20, axisPedagogico: -20
      }
    }
  },
  {
    id: "M2F6C5", icone: "🏦", tipo: "DILEMA_ETICO",
    titulo: "Reserva de contingência zerada",
    descricao: "O ano ainda está no oitavo mês e a reserva de contingência esgotou devido a duas grandes liminares. Chega agora uma nova liminar exigindo um cirurgião dentista especializado na escola.",
    prazoHoras: 120,
    baseConceitual: "Limites da atuação do Estado na escola: saúde vs educação. Articulação intersetorial.",
    perguntaDebriefing: "Quando uma demanda judicial ultrapassa a função educacional e invade a função da saúde, como agir institucionalmente?",
    opcoes: {
      A: {
        id: "A", texto: "Contestar judicialmente que a demanda é de Saúde, não de Educação",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Correto. Escola não é hospital. É preciso defender o orçamento da Educação contra judicialização em saúde.",
        baseJuridica: "CF/88 Art. 208 (Educação) x Art. 196 (Saúde). Lei 8.080/90.",
        qual: 2, sust: 5, sc: 140, budgetCost: 0,
        axisEtico: 10, axisFiscal: 15, axisLegal: 15, axisPedagogico: 2
      },
      B: {
        id: "B", texto: "Ratear o custo e contratar o profissional usando verbas de outras escolas",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Atende à liminar, mas consagra um desvio de função (Educação pagando Saúde) e sacrifica o coletivo.",
        baseJuridica: "LDB — vinculação de recursos",
        qual: -5, sust: -10, sc: 40, budgetCost: 12000,
        axisEtico: 0, axisFiscal: -5, axisLegal: -5, axisPedagogico: -5
      },
      C: {
        id: "C", texto: "Ignorar a liminar e focar nos problemas internos",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Não se ignora ordem judicial. Se o mérito está errado, deve-se recorrer imediatamente. A inércia gera multas.",
        baseJuridica: "CPC Art. 536",
        qual: -10, sust: -15, sc: -10, budgetCost: 0,
        axisEtico: -5, axisFiscal: -5, axisLegal: -15, axisPedagogico: 0,
        flagOmissao: true, consequenciaLateral: "CI_05"
      }
    }
  }
];

fs.writeFileSync('src/data/mod2.json', JSON.stringify([...m2f4, ...m2f5, ...m2f6], null, 2));
console.log('mod2 done');
