const fs = require("fs");
const path = require("path");
const docx = require("docx");

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  ShadingType,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  PageBreak
} = docx;

// Color Palette Constants
const PRIMARY_BLUE = "1E3A8A";
const ACCENT_TEAL = "0D9488";
const DARK_TEXT = "1F2937";
const MUTED_TEXT = "4B5563";
const BG_LIGHT = "F8FAFC";
const BG_SUCCESS = "ECFDF5";
const BG_WARNING = "FFFBEB";
const BG_DANGER = "FEF2F2";
const BORDER_COLOR = "CBD5E1";
const SUCCESS_COLOR = "059669";
const DANGER_COLOR = "DC2626";
const WARNING_COLOR = "D97706";

// Helper styles
function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
    run: {
      color: PRIMARY_BLUE,
      bold: true,
      size: 32, // 16pt
      font: "Calibri"
    }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    run: {
      color: ACCENT_TEAL,
      bold: true,
      size: 26, // 13pt
      font: "Calibri"
    }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    run: {
      color: PRIMARY_BLUE,
      bold: true,
      size: 22, // 11pt
      font: "Calibri"
    }
  });
}

function createBodyParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: options.before || 60, after: options.after || 60 },
    children: [
      new TextRun({
        text: text,
        size: options.size || 22, // 11pt
        font: "Calibri",
        color: options.color || DARK_TEXT,
        bold: options.bold || false,
        italics: options.italics || false
      })
    ]
  });
}

function createCalloutBox(title, contentLines, type = "info") {
  let bgColor = BG_LIGHT;
  let borderColor = PRIMARY_BLUE;
  
  if (type === "success") {
    bgColor = BG_SUCCESS;
    borderColor = SUCCESS_COLOR;
  } else if (type === "warning") {
    bgColor = BG_WARNING;
    borderColor = WARNING_COLOR;
  } else if (type === "danger") {
    bgColor = BG_DANGER;
    borderColor = DANGER_COLOR;
  }

  const paragraphs = [
    new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: borderColor,
          size: 22,
          font: "Calibri"
        })
      ]
    })
  ];

  contentLines.forEach(line => {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        children: [
          new TextRun({
            text: line,
            color: DARK_TEXT,
            size: 20,
            font: "Calibri"
          })
        ]
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
              left: { style: BorderStyle.SINGLE, size: 6, color: borderColor },
              right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: paragraphs
          })
        ]
      })
    ]
  });
}

// Load data directly from dataTranslations and LearningDashboard
const dt = require("../src/dataTranslations.ts");
const rawPhases = dt.translations.pt.phases;
const rawScenarios = dt.translations.pt.scenarios;

// Questions data
const tracksData = [
  {
    trackNum: 1,
    title: "Dominando o FUNDEB",
    level: 1,
    reward: "15 XP",
    questions: [
      {
        num: "1.1",
        q: "Qual é a principal fonte de recursos que compõem o FUNDEB?",
        options: [
          { text: "A) Impostos estaduais e municipais e complementação da União", correct: true },
          { text: "B) Apenas doações privadas e recursos de loterias federais", correct: false },
          { text: "C) Contribuições exclusivas das escolas particulares", correct: false }
        ],
        explanation: "O FUNDEB é composto por uma cesta de impostos estaduais e municipais combinados com a complementação obrigatória da União (VAAF, VAAT e VAAR)."
      },
      {
        num: "1.2",
        q: "Qual o percentual mínimo do FUNDEB que deve ser destinado ao pagamento dos profissionais do magistério?",
        options: [
          { text: "A) 50%", correct: false },
          { text: "B) 70%", correct: true },
          { text: "C) 25%", correct: false }
        ],
        explanation: "Pela Emenda Constitucional 108/2020 e Lei 14.113/2020, no mínimo 70% dos recursos totais do FUNDEB devem ser destinados ao pagamento da remuneração dos profissionais da educação básica ativa."
      }
    ]
  },
  {
    trackNum: 2,
    title: "Marcos Legais da Educação Especial",
    level: 1,
    reward: "20 XP (+20% Combo Legal)",
    questions: [
      {
        num: "2.1",
        q: "Qual lei é conhecida formalmente como a Lei Brasileira de Inclusão (LBI)?",
        options: [
          { text: "A) Lei nº 9.394/1996", correct: false },
          { text: "B) Lei nº 13.146/2015", correct: true },
          { text: "C) Lei nº 8.069/1990", correct: false }
        ],
        explanation: "A Lei nº 13.146/2015 institui o Estatuto da Pessoa com Deficiência (Lei Brasileira de Inclusão), consolidando garantias fundamentais de acessibilidade e educação."
      },
      {
        num: "2.2",
        q: "O que a LBI estabelece como crime em relação à matrícula de estudantes com deficiência?",
        options: [
          { text: "A) Não fornecer uniforme gratuito no primeiro dia de aula", correct: false },
          { text: "B) Recusar, suspender ou cancelar matrícula em razão da deficiência", correct: true },
          { text: "C) Exigir a apresentação de carteira de vacinação atualizada", correct: false }
        ],
        explanation: "O Art. 88 da LBI estabelece pena de reclusão de 2 a 5 anos e multa para quem recusar, adiar, cancelar ou cobrar valores adicionais para matricular estudantes com deficiência."
      }
    ]
  },
  {
    trackNum: 3,
    title: "Pedagogia Inclusiva e DUA",
    level: 1,
    reward: "15 XP",
    questions: [
      {
        num: "3.1",
        q: "O que é o Desenho Universal para a Aprendizagem (DUA)?",
        options: [
          { text: "A) Abordagem pedagógica que projeta currículos acessíveis a todos desde a concepção", correct: true },
          { text: "B) Um modelo de avaliação focado em reprovar alunos com baixo rendimento", correct: false },
          { text: "C) Um método exclusivo para ensinar artes e desenho técnico nas escolas", correct: false }
        ],
        explanation: "O DUA oferece múltiplos meios de representação, engajamento e expressão para que o currículo atenda à diversidade de todos os estudantes sem exigir adaptações segregadas."
      },
      {
        num: "3.2",
        q: "Qual o principal objetivo do Plano de Atendimento Educacional Especializado (PAEE/PEI)?",
        options: [
          { text: "A) Idênticas às de todos, sem flexibilidade", correct: false },
          { text: "B) Adaptadas às potencialidades do estudante", correct: true },
          { text: "C) Opcionais e baseadas apenas em comportamento", correct: false }
        ],
        explanation: "O PAEE/PEI define metas pedagógicas, recursos de acessibilidade e estratégias individualizadas que valorizam as potencialidades de cada estudante laudado."
      }
    ]
  },
  {
    trackNum: 4,
    title: "Acessibilidade Universal e NBR 9050",
    level: 2,
    reward: "15 XP (Requer Módulo 1)",
    questions: [
      {
        num: "4.1",
        q: "O que caracteriza a acessibilidade arquitetônica plena em escolas?",
        options: [
          { text: "A) Rampas, elevadores, banheiros adaptados e sinalização tátil", correct: true },
          { text: "B) Instalação de ar condicionado em todos os setores", correct: false },
          { text: "C) Apenas pinturas coloridas em salas de aula", correct: false }
        ],
        explanation: "A norma ABNT NBR 9050 estabelece parâmetros para rotas acessíveis contínuas, sanitários adaptados, barras de apoio e pisos podotáteis."
      },
      {
        num: "4.2",
        q: "Qual é o principal requisito de acessibilidade digital em plataformas educacionais?",
        options: [
          { text: "A) Usar apenas textos em formato de imagem estática", correct: false },
          { text: "B) Compatibilidade com leitores de tela e atalhos de teclado", correct: true },
          { text: "C) Carregar animações de áudio sem opção de pausa", correct: false }
        ],
        explanation: "Padrões WCAG e e-MAG exigem código semântico, textos alternativos para imagens e navegabilidade completa por teclado para permitir o uso autônomo por pessoas cegas ou com deficiência motora."
      }
    ]
  },
  {
    trackNum: 5,
    title: "Contratos, Licitações e Lei 14.133/21",
    level: 2,
    reward: "15 XP (Requer Módulo 1)",
    questions: [
      {
        num: "5.1",
        q: "O que é 'dispensa de licitação por valor' em obras e serviços segundo a Nova Lei de Licitações (Lei 14.133/21)?",
        options: [
          { text: "A) Contratação direta autorizada para pequenos montantes abaixo do limite legal", correct: true },
          { text: "B) Processo aberto e sem limite de teto orçamentário", correct: false },
          { text: "C) Contratação de parentes diretos sem edital", correct: false }
        ],
        explanation: "O Art. 75 da Lei 14.133/21 autoriza a contratação direta por dispensa para compras, serviços e obras de pequeno valor, agilizando compras de pequeno porte."
      },
      {
        num: "5.2",
        q: "Qual a importância do Termo de Referência (TR) em compras públicas de Tecnologia Assistiva?",
        options: [
          { text: "A) Servir apenas de protocolo opcional sem valor jurídico", correct: false },
          { text: "B) Estipular escopo, obrigações, prazos e aceitação técnica", correct: true },
          { text: "C) Apenas registrar o orçamento e saldo bancário da escola", correct: false }
        ],
        explanation: "O TR define precisamente as especificações do objeto, requisitos de compatibilidade, garantias e critérios de aceitação para assegurar compras públicas eficazes."
      }
    ]
  },
  {
    trackNum: 6,
    title: "Educação Tecnológica e Tecnologia Assistiva",
    level: 3,
    reward: "25 XP (Requer Módulo 2)",
    questions: [
      {
        num: "6.1",
        q: "O que caracteriza a Tecnologia Assistiva (TA) na educação?",
        options: [
          { text: "A) Recursos que promovem autonomia e capacidade funcional de pessoas com deficiência", correct: true },
          { text: "B) Computadores genéricos comprados no varejo", correct: false },
          { text: "C) Aparelhos de ar condicionado comandados por voz", correct: false }
        ],
        explanation: "A TA abrange produtos, equipamentos, dispositivos e serviços voltados a ampliar a autonomia, comunicação e participação ativa de pessoas com deficiência."
      },
      {
        num: "6.2",
        q: "Qual o benefício de softwares leitores de tela em avaliações digitais?",
        options: [
          { text: "A) Impedir que outros alunos colem nas provas", correct: false },
          { text: "B) Fornecer áudio descrição para navegação e leitura autônoma", correct: true },
          { text: "C) Corrigir os erros ortográficos do aluno durante a prova", correct: false }
        ],
        explanation: "Softwares leitores de tela (NVDA, JAWS, TalkBack) convertem elementos textuais em síntese de voz audível, permitindo que estudantes cegos façam avaliações com total independência."
      }
    ]
  },
  {
    trackNum: 7,
    title: "Formação de Equipes AEE e Apoio Escolar",
    level: 3,
    reward: "25 XP (Requer Módulo 2)",
    questions: [
      {
        num: "7.1",
        q: "Qual é o perfil profissional do professor do AEE (Atendimento Educacional Especializado)?",
        options: [
          { text: "A) Licenciatura com especialização em Educação Especial", correct: true },
          { text: "B) Qualquer formação técnica de nível médio", correct: false },
          { text: "C) Curso de informática básica ou libras", correct: false }
        ],
        explanation: "Conforme a Resolução CNE/CEB nº 4/2009, o professor de AEE deve possuir formação inicial em licenciatura complementada por pós-graduação/especialização específica em Educação Especial."
      },
      {
        num: "7.2",
        q: "Qual a função principal do profissional de apoio escolar (cuidador/mediador)?",
        options: [
          { text: "A) Apenas aplicar as notas do diário oficial", correct: false },
          { text: "B) Apoiar em alimentação, higiene e locomoção do aluno", correct: true },
          { text: "C) Ministrar o conteúdo curricular das disciplinas regulares", correct: false }
        ],
        explanation: "A LBI define que o profissional de apoio escolar atua nas atividades de autocuidado (alimentação, higiene, locomoção) e suporte social do estudante com dependência física ou funcional."
      }
    ]
  },
  {
    trackNum: 8,
    title: "Sustentabilidade Sistêmica e Gestão Financeira",
    level: 3,
    reward: "25 XP (Requer Módulo 2)",
    questions: [
      {
        num: "8.1",
        q: "O que caracteriza a sustentabilidade financeira na gestão da Educação Especial?",
        options: [
          { text: "A) Garantir a manutenção contínua de ações sem gerar déficit orçamentário", correct: true },
          { text: "B) Depender de empréstimos bancários rotativos", correct: false },
          { text: "C) Gastar toda a verba anual já no primeiro mês", correct: false }
        ],
        explanation: "Consiste em planejar a alocação de receitas com base em fluxos perenes (Fundeb, MDE) assegurando que programas de inclusão não sofram descontinuidade no meio do ano letivo."
      },
      {
        num: "8.2",
        q: "Por que a coparticipação social fortalece a sustentabilidade das políticas inclusivas?",
        options: [
          { text: "A) Para terceirizar serviços públicos para voluntários", correct: false },
          { text: "B) Cria pertencimento, transparência e cuidado mútuo", correct: true },
          { text: "C) Apenas para reduzir impostos dos pais de alunos", correct: false }
        ],
        explanation: "O controle social e o engajamento comunitário geram corresponsabilidade, fiscalizam a qualidade dos serviços e blindam as políticas de inclusão contra retrocessos governamentais."
      }
    ]
  },
  {
    trackNum: 9,
    title: "Gestão de Crises Sistêmicas e Judiciais",
    level: 4,
    reward: "50 XP (Requer Módulo 3)",
    questions: [
      {
        num: "9.1",
        q: "Qual deve ser a postura do gestor diante de uma crise no atendimento do AEE?",
        options: [
          { text: "A) Agir rápido, realocar recursos e dialogar abertamente com a comunidade", correct: true },
          { text: "B) Abafar as reclamações para proteger a reputação do setor", correct: false },
          { text: "C) Suspender as matrículas do AEE temporariamente", correct: false }
        ],
        explanation: "Gestão de crise de alto impacto exige apuração imediata dos fatos, transparência com os órgãos de controle e replanejamento célere para não deixar estudantes desamparados."
      },
      {
        num: "9.2",
        q: "Qual a importância do plano de mitigação de riscos na educação inclusiva?",
        options: [
          { text: "A) Apenas protocolar documentos sem intenção prática", correct: false },
          { text: "B) Prevenir falhas pedagógicas e passivos jurídicos/judiciais", correct: true },
          { text: "C) Substituir a necessidade de contratar fiscais de obra", correct: false }
        ],
        explanation: "O mapeamento preventivo de riscos fiscais e jurídicos evita o acúmulo de multas diárias (astreintes), bloqueios de contas bancárias e colapsos na rede de apoio."
      }
    ]
  },
  {
    trackNum: 10,
    title: "Diálogo Federativo e Regime de Colaboração",
    level: 4,
    reward: "50 XP (Requer Módulo 3)",
    questions: [
      {
        num: "10.1",
        q: "Como o regime de colaboração federativa beneficia os municípios na Educação Especial?",
        options: [
          { text: "A) Por meio do cofinanciamento e partilha de soluções técnicas", correct: true },
          { text: "B) Retirando verbas do município para o governo federal", correct: false },
          { text: "C) Exigindo aprovação do senado para contratar professores", correct: false }
        ],
        explanation: "O Art. 211 da CF/88 estabelece a cooperação mútua entre União, Estados e Municípios para equalizar oportunidades educacionais e transferir recursos e apoio técnico."
      },
      {
        num: "10.2",
        q: "O que é o PAR (Plano de Ações Articuladas)?",
        options: [
          { text: "A) Um regulamento interno dos servidores públicos estaduais", correct: false },
          { text: "B) Instrumento estratégico de planejamento e assistência técnica do MEC", correct: true },
          { text: "C) Um sistema de notas geradas para aprovação de alunos", correct: false }
        ],
        explanation: "O PAR é a ferramenta do Ministério da Educação que permite aos municípios diagnosticar suas necessidades e receber apoio financeiro e técnico direto do Governo Federal."
      }
    ]
  },
  {
    trackNum: 11,
    title: "Legado Institucional e Prestação de Contas",
    level: 4,
    reward: "50 XP (Requer Módulo 3)",
    questions: [
      {
        num: "11.1",
        q: "Qual a finalidade principal da prestação de contas na educação pública?",
        options: [
          { text: "A) Comprovar aplicação ética, lícita e transparente perante o Tribunal de Contas", correct: true },
          { text: "B) Reduzir o quadro de professores efetivos na rede", correct: false },
          { text: "C) Esconder notas fiscais para evitar taxação tributária", correct: false }
        ],
        explanation: "A prestação de contas cumpre o dever constitucional de transparência, comprovando a conformidade dos gastos públicos com as finalidades e metas aprovadas em lei."
      },
      {
        num: "11.2",
        q: "O que representa o legado inclusivo para as próximas gerações de uma rede de ensino?",
        options: [
          { text: "A) Dívidas financeiras acumuladas sem utilidade prática", correct: false },
          { text: "B) Infraestrutura acessível, profissionais qualificados e equidade permanente", correct: true },
          { text: "C) Apenas uma placa de homenagem vazia no prédio da prefeitura", correct: false }
        ],
        explanation: "Uma política inclusiva sustentável deixa uma rede equipada, com salas de recursos ativas, cultura institucional anti-capacitista e garantia de direitos para todos os estudantes."
      }
    ]
  }
];

async function generateDocx() {
  const docSections = [];

  // Title Page & Introductory Content
  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 800, after: 200 },
      children: [
        new TextRun({
          text: "MINISTÉRIO DA EDUCAÇÃO / GESTÃO PÚBLICA INCLUSIVA",
          size: 20,
          bold: true,
          color: ACCENT_TEAL,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      children: [
        new TextRun({
          text: "EDUCAÇÃO ESPECIAL E INCLUSIVA",
          size: 48, // 24pt
          bold: true,
          color: PRIMARY_BLUE,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 400 },
      children: [
        new TextRun({
          text: "Guia Oficial de Cenários Decisórios, Fases da Simulação e Trilhas Pedagógicas com Gabarito",
          size: 26, // 13pt
          color: MUTED_TEXT,
          italics: true,
          font: "Calibri"
        })
      ]
    }),

    createCalloutBox(
      "📌 Sobre este Documento",
      [
        "Este manual reúne todos os 50 cenários de tomada de decisão divididos em 10 Fases e 4 Módulos de Gestão Pública, além das 11 Trilhas de Capacitação com suas respectivas 22 questões gabaritadas e comentadas.",
        "Projetado como material de referência técnica para Secretários de Educação, Dirigentes Municipais, Coordenadores Pedagógicos de AEE e Membros de Conselhos de Educação."
      ],
      "info"
    ),

    new Paragraph({
      spacing: { before: 300, after: 100 },
      children: [new PageBreak()]
    }),

    createHeading1("PARTE 1: MÓDULOS E FASES DA SIMULAÇÃO DE GESTÃO"),
    createBodyParagraph("Abaixo estão detalhados os 50 cenários decisórios com contexto prático, base legal e as 3 opções de ação (Ótima, Arriscada/Regular e Equívoco) com seus respectivos feedbacks.")
  ];

  // Process all phases and scenarios
  rawPhases.forEach((phase, pIdx) => {
    const phaseScenarios = rawScenarios[pIdx] || [];
    
    children.push(createHeading2(`${phase.name}: ${phase.desc} (Orçamento: R$ ${phase.budget}.000)`));

    phaseScenarios.forEach((scen, sIdx) => {
      children.push(
        createHeading3(`Cenário ${sIdx + 1}: ${scen.title}`)
      );

      // Context
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({ text: "• Contexto: ", bold: true, color: PRIMARY_BLUE, font: "Calibri" }),
            new TextRun({ text: scen.desc, font: "Calibri", color: DARK_TEXT })
          ]
        })
      );

      // Base legal / Conceitual
      if (scen.legalBase) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 80 },
            children: [
              new TextRun({ text: "• Base Legal / Conceito: ", bold: true, color: ACCENT_TEAL, font: "Calibri" }),
              new TextRun({ text: scen.legalBase, font: "Calibri", italics: true, color: DARK_TEXT })
            ]
          })
        );
      }

      // Options Table
      const optionRows = [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: PRIMARY_BLUE, type: ShadingType.CLEAR },
              width: { size: 25, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: "Opção", bold: true, color: "FFFFFF", font: "Calibri", size: 20 })] })]
            }),
            new TableCell({
              shading: { fill: PRIMARY_BLUE, type: ShadingType.CLEAR },
              width: { size: 75, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: "Decisão & Feedback de Gestão", bold: true, color: "FFFFFF", font: "Calibri", size: 20 })] })]
            })
          ]
        })
      ];

      scen.choices.forEach((choice, cIdx) => {
        const letter = choice.label || (cIdx === 0 ? "A" : cIdx === 1 ? "B" : "C");
        const isOptimal = choice.score >= 100 || (choice.impact && choice.impact.rights > 0 && choice.impact.qual > 0);
        const tag = isOptimal ? " [Ótimo ✅]" : (choice.score < 50 ? " [Equívoco ❌]" : " [Regular/Arriscado ⚠️]");
        
        optionRows.push(
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: isOptimal ? BG_SUCCESS : (choice.score < 50 ? BG_DANGER : BG_WARNING), type: ShadingType.CLEAR },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  left: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Opção ${letter}${tag}`,
                        bold: true,
                        color: isOptimal ? SUCCESS_COLOR : (choice.score < 50 ? DANGER_COLOR : WARNING_COLOR),
                        font: "Calibri",
                        size: 20
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  left: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
                  right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
                },
                children: [
                  new Paragraph({
                    spacing: { before: 40, after: 40 },
                    children: [
                      new TextRun({ text: choice.text, bold: true, color: DARK_TEXT, font: "Calibri", size: 20 })
                    ]
                  }),
                  new Paragraph({
                    spacing: { before: 20, after: 40 },
                    children: [
                      new TextRun({ text: "Feedback: ", bold: true, color: MUTED_TEXT, font: "Calibri", size: 18 }),
                      new TextRun({ text: choice.feedback, italics: true, color: DARK_TEXT, font: "Calibri", size: 18 })
                    ]
                  })
                ]
              })
            ]
          })
        );
      });

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: optionRows
        })
      );

      children.push(new Paragraph({ spacing: { before: 80, after: 80 } }));
    });
  });

  // Section 2: Learning Tracks & Questions
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(createHeading1("PARTE 2: TRILHAS DE CAPACITAÇÃO PEDAGÓGICA"));
  children.push(createBodyParagraph("Abaixo constam as 11 Trilhas com suas 22 questões de avaliação técnica, alternativas e gabarito comentado fundamentado na legislação."));

  tracksData.forEach((track) => {
    children.push(createHeading2(`Trilha ${track.trackNum}: ${track.title} (Nível ${track.level} • Recompensa: ${track.reward})`));

    track.questions.forEach((q) => {
      children.push(createHeading3(`Questão ${q.num}: ${q.q}`));

      q.options.forEach((opt) => {
        children.push(
          new Paragraph({
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: `${opt.text} ${opt.correct ? " [GABARITO CORRETO ✅]" : ""}`,
                bold: opt.correct,
                color: opt.correct ? SUCCESS_COLOR : DARK_TEXT,
                font: "Calibri",
                size: 20
              })
            ]
          })
        );
      });

      children.push(
        createCalloutBox(
          "💡 Explicação Técnica e Fundamentação:",
          [q.explanation],
          "success"
        )
      );

      children.push(new Paragraph({ spacing: { before: 60, after: 60 } }));
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Simulador de Gestão — Educação Especial e Inclusiva",
                    size: 16,
                    color: MUTED_TEXT,
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Página ", size: 16, font: "Calibri", color: MUTED_TEXT }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Calibri", color: MUTED_TEXT }),
                  new TextRun({ text: " de ", size: 16, font: "Calibri", color: MUTED_TEXT }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, font: "Calibri", color: MUTED_TEXT })
                ]
              })
            ]
          })
        },
        children: children
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Save in public folder for direct client download and in workspace root
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicFilePath = path.join(publicDir, "perguntas_e_trilhas_de_capacitacao.docx");
  const rootFilePath = path.join(process.cwd(), "perguntas_e_trilhas_de_capacitacao.docx");

  fs.writeFileSync(publicFilePath, buffer);
  fs.writeFileSync(rootFilePath, buffer);

  console.log(`Document generated successfully!`);
  console.log(`Public path: ${publicFilePath}`);
  console.log(`Root path: ${rootFilePath}`);
  console.log(`File size: ${(buffer.length / 1024).toFixed(2)} KB`);
}

generateDocx().catch(err => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
