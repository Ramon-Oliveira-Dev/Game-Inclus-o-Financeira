const fs = require('fs');

const m4f10 = [
  {
    id: "M4F10C1", icone: "👩‍⚖️", tipo: "URGENCIA_JUDICIAL",
    titulo: "Processo contra a União: Quem paga o piso?",
    descricao: "O novo piso salarial dos profissionais de apoio esgotou o orçamento municipal. Você processou a União pelo repasse não enviado, mas o juiz local negou liminar.",
    prazoHoras: 48,
    baseConceitual: "Piso salarial nacional (STF ADI 4167). Responsabilidade solidária da União.",
    perguntaDebriefing: "Quando o ente federal falha, o município deve arcar com 100% ou dividir a conta via judicialização federativa?",
    opcoes: {
      A: {
        id: "A", texto: "Agravar ao TRF alegando periculum in mora e risco à folha",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "A via recursal no Tribunal Regional Federal é o caminho adequado para cobrar solidariedade da União.",
        baseJuridica: "CF/88 Art. 211 - Regime de colaboração",
        qual: 10, sust: 5, sc: 140, budgetCost: 2000,
        axisEtico: 10, axisFiscal: 15, axisLegal: 15, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Desistir do processo e tirar verba da merenda",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Desistir de cobrar a União e cortar verba vinculada (merenda) é crime de responsabilidade.",
        baseJuridica: "Lei 4.320/64",
        qual: -20, sust: -15, sc: -40, budgetCost: 0,
        axisEtico: -20, axisFiscal: -10, axisLegal: -20, axisPedagogico: -15,
        consequenciaLateral: "CI_08"
      },
      C: {
        id: "C", texto: "Suspender o pagamento do piso até o fim do processo",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Piso estabelecido em lei federal é de aplicação imediata. Suspender gera greve imediata.",
        baseJuridica: "Súmula Vinculante 16",
        qual: -5, sust: 10, sc: 10, budgetCost: 0,
        axisEtico: -10, axisFiscal: 10, axisLegal: -5, axisPedagogico: -15
      }
    }
  },
  {
    id: "M4F10C2", icone: "🌐", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Aliança Nacional de Dirigentes",
    descricao: "Prefeitos de 50 cidades convidaram você para liderar uma ADPF no STF contra portaria do MEC que limita matrículas no AEE.",
    prazoHoras: 240,
    baseConceitual: "ADPF. Locus standi de associações.",
    perguntaDebriefing: "A força política de associações nacionais tem mais peso no STF do que ações isoladas?",
    opcoes: {
      A: {
        id: "A", texto: "Aceitar a liderança e assinar junto ao instituto técnico especializado",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Ação de alto nível estratégico. Liderança nacional e robustez técnica no STF.",
        baseJuridica: "CF/88 Art. 103 (ADPF)",
        qual: 15, sust: 10, sc: 150, budgetCost: 15000,
        axisEtico: 15, axisFiscal: 5, axisLegal: 15, axisPedagogico: 10,
        flagOpcaoCriativa: true
      },
      B: {
        id: "B", texto: "Apoiar nos bastidores, mas não assinar por medo de retaliação",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Seguro, mas covarde. O município fica à mercê da decisão sem poder influenciá-la formalmente.",
        baseJuridica: "Política Pública",
        qual: 2, sust: 5, sc: 50, budgetCost: 0,
        axisEtico: -5, axisFiscal: 5, axisLegal: 0, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Processar o MEC sozinho em 1ª instância",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Uma liminar isolada é facilmente cassada pela União em tribunais superiores. Perda de tempo e dinheiro.",
        baseJuridica: "Lei 8.437/92 (Suspensão de Segurança)",
        qual: -10, sust: -5, sc: 20, budgetCost: 8000,
        axisEtico: 0, axisFiscal: -5, axisLegal: -5, axisPedagogico: 0
      }
    }
  },
  {
    id: "M4F10C3", icone: "📋", tipo: "INOVACAO",
    titulo: "IA para auditar gastos com TA",
    descricao: "Você pode aprovar o uso de um software de IA (custa R$50k) que audita notas fiscais de empresas de Saúde e TA e cruza com a tabela SUS, buscando sobrepreço.",
    prazoHoras: 720,
    baseConceitual: "Eficiência e tecnologia no controle interno.",
    perguntaDebriefing: "Automatizar a fiscalização pode gerar mais economia do que o custo do próprio sistema?",
    opcoes: {
      A: {
        id: "A", texto: "Contratar o sistema: investimento em controle interno",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "O sistema detectará fraudes e sobrepreços, pagando seu custo em poucos meses.",
        baseJuridica: "Princípio da Eficiência",
        qual: 12, sust: 15, sc: 140, budgetCost: 50000,
        axisEtico: 15, axisFiscal: 15, axisLegal: 10, axisPedagogico: 5
      },
      B: {
        id: "B", texto: "Fazer a auditoria manual com estagiários",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Auditoria manual em milhares de notas falha, demora e não cruza dados complexos.",
        baseJuridica: "Controle Interno",
        qual: 0, sust: -5, sc: 40, budgetCost: 10000,
        axisEtico: 5, axisFiscal: -5, axisLegal: 0, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Não auditar e focar apenas na entrega final",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Falta de auditoria abre porta para cartéis e superfaturamento massivo.",
        baseJuridica: "Improbidade Art. 10",
        qual: -15, sust: -15, sc: -10, budgetCost: 0,
        axisEtico: -15, axisFiscal: -15, axisLegal: -10, axisPedagogico: -5,
        flagOmissao: true, consequenciaLateral: "CI_10"
      }
    }
  },
  {
    id: "M4F10C4", icone: "🏛️", tipo: "PRESSAO_POLITICA",
    titulo: "CPI da Educação Especial",
    descricao: "A Câmara de Vereadores instaura uma CPI focada nos aditivos de contratos de cuidadores. A oposição quer faturar nas eleições. Documentos estão em dia.",
    prazoHoras: 24,
    baseConceitual: "CPIs Municipais e defesa institucional. Transparência.",
    perguntaDebriefing: "Quando o ataque é político, a defesa deve ser política ou estritamente técnica?",
    opcoes: {
      A: {
        id: "A", texto: "Abrir o sistema e fazer uma defesa 100% técnica e documental na CPI",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "A técnica vence a política se houver transparência. Documentos em dia blindam a gestão.",
        baseJuridica: "LAI",
        qual: 10, sust: 5, sc: 130, budgetCost: 0,
        axisEtico: 15, axisFiscal: 5, axisLegal: 15, axisPedagogico: 5,
        flagRecusaPolitica: true
      },
      B: {
        id: "B", texto: "Contra-atacar a oposição na mídia com denúncias paralelas",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Desvia o foco da educação e rebaixa a gestão ao jogo sujo. A CPI ganha mais força midiática.",
        baseJuridica: "Moralidade",
        qual: -5, sust: -5, sc: 30, budgetCost: 5000,
        axisEtico: -10, axisFiscal: -5, axisLegal: -5, axisPedagogico: -5
      },
      C: {
        id: "C", texto: "Esconder documentos alegando 'sigilo estratégico'",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Não existe sigilo sobre gastos públicos correntes. Ocultar documento gera mandado de busca e apreensão.",
        baseJuridica: "Lei 12.527/2011",
        qual: -20, sust: -10, sc: -30, budgetCost: 0,
        axisEtico: -20, axisFiscal: -10, axisLegal: -20, axisPedagogico: -5
      }
    }
  },
  {
    id: "M4F10C5", icone: "🌍", tipo: "DECISAO_ESTRATEGICA",
    titulo: "Prêmio Internacional da ONU",
    descricao: "O seu município foi indicado para um prêmio da ONU por sua política pública estruturada de Inclusão. O prefeito quer que você vá a Genebra receber.",
    prazoHoras: 720,
    baseConceitual: "Reconhecimento internacional e consolidação de políticas de Estado.",
    perguntaDebriefing: "Um prêmio internacional é vaidade ou ferramenta de blindagem de política pública contra retrocessos?",
    opcoes: {
      A: {
        id: "A", texto: "Ir, mas levar também um professor da base e assinar pacto de continuidade",
        rotulo: "ÓTIMO", iconeRotulo: "✅", corRotulo: "#1D9E75",
        feedback: "Consagra a política como mérito da rede. O pacto blinda a EE de cortes em mandatos futuros.",
        baseJuridica: "CF/88 Art. 205",
        qual: 15, sust: 10, sc: 150, budgetCost: 15000,
        axisEtico: 15, axisFiscal: 0, axisLegal: 5, axisPedagogico: 15
      },
      B: {
        id: "B", texto: "Ir sozinho e usar o evento para networking de carreira privada",
        rotulo: "ARRISCADO", iconeRotulo: "⚡", corRotulo: "#BA7517",
        feedback: "Antiético. A conquista é da rede municipal, não do ego do secretário.",
        baseJuridica: "Impessoalidade",
        qual: 2, sust: 2, sc: 60, budgetCost: 15000,
        axisEtico: -10, axisFiscal: 0, axisLegal: 0, axisPedagogico: 0
      },
      C: {
        id: "C", texto: "Recusar a viagem por medo de críticas aos custos da passagem",
        rotulo: "EQUÍVOCO", iconeRotulo: "✗", corRotulo: "#993C1D",
        feedback: "Covardia institucional. Perde-se a chance histórica de blindar a política municipal de retrocessos com uma chancela internacional.",
        baseJuridica: "Eficiência",
        qual: -5, sust: -5, sc: 10, budgetCost: 0,
        axisEtico: 0, axisFiscal: 5, axisLegal: 0, axisPedagogico: -5
      }
    }
  }
];

fs.writeFileSync('src/data/mod4.json', JSON.stringify(m4f10, null, 2));
console.log('mod4 done');
