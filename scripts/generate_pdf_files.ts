import fs from "fs";
import path from "path";
import pdfMake from "pdfmake";
import { translations } from "../src/dataTranslations";

// Setting up standard PDF fonts (Helvetica) to avoid external TTF dependencies
pdfMake.setFonts({
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique"
  }
});

const PRIMARY_BLUE = "#38BDF8"; // sky-400
const ACCENT_TEAL = "#22D3EE"; // cyan-400
const DARK_TEXT = "#F8FAFC"; // slate-50 (now light text for dark mode)
const MUTED_TEXT = "#94A3B8"; // slate-400
const SUCCESS_COLOR = "#10B981"; // emerald-500
const DANGER_COLOR = "#EF4444"; // red-500
const WARNING_COLOR = "#F59E0B"; // amber-500

const BG_PAGE = "#0F172A"; // slate-900
const BG_SUCCESS = "#064E3B"; // emerald-900
const BG_WARNING = "#78350F"; // amber-900
const BG_DANGER = "#7F1D1D"; // red-900
const BG_TABLE_HEADER = "#1E293B"; // slate-800
const BG_CALLOUT = "#1E293B"; // slate-800
const BORDER_COLOR = "#334155"; // slate-700

const rawPhases = translations.pt.phases;
const rawScenarios = translations.pt.scenarios;

// Questions Data (same as before)
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

function buildContent(includeQuestions: boolean) {
  const content: any[] = [
    // Splash Screen Cover Page
    { text: "\n\n\n\n\n\n\n\n", style: "p" }, // Spacing down
    {
      canvas: [
        // A simple abstract brain/book shape to represent the logo
        { type: "rect", x: 200, y: 0, w: 100, h: 100, r: 25, color: "#1E293B", lineColor: "#22D3EE", lineWidth: 2 },
        { type: "rect", x: 220, y: 20, w: 60, h: 60, r: 15, color: "#38BDF8", fillOpacity: 0.2 },
        { type: "line", x1: 250, y1: 30, x2: 250, y2: 70, lineColor: "#22D3EE", lineWidth: 3 },
        { type: "line", x1: 230, y1: 50, x2: 270, y2: 50, lineColor: "#22D3EE", lineWidth: 3 }
      ],
      alignment: "center",
      margin: [0, 0, 0, 30]
    },
    { text: "INCLUSÃO FINANCEIRA", style: "splashTitle" },
    { text: "O DESAFIO DA EDUCAÇÃO ESPECIAL.", style: "splashSubtitle" },
    
    { text: includeQuestions ? "COMPILADO COMPLETO (ADMIN): CENÁRIOS E QUESTÕES" : "MANUAL DO JOGADOR: CENÁRIOS DECISÓRIOS", style: "splashDesc" },
    { text: "", pageBreak: "after" }, // End of Splash Screen

    // Normal Document Start
    {
      style: "calloutInfo",
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: [
                { text: "📌 Apresentação do Documento\n", bold: true, fontSize: 13, color: ACCENT_TEAL },
                `Este arquivo consolida os conteúdos técnicos, legislativos e pedagógicos do Simulador de Gestão Pública em Educação Especial e Inclusiva.\n\n`,
                `Parte 1: 4 Módulos Estruturantes, 10 Fases de Gestão e 50 Cenários com Enunciados, Fundamentação Legal, Opções de Tomada de Decisão (A, B e C) e Feedbacks formativos.\n`,
                includeQuestions ? `Parte 2: 11 Trilhas de Capacitação e 22 Questões de Múltipla Escolha com Gabarito Comentado e Base Teórica.` : ``
              ]
            }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => BORDER_COLOR,
        vLineColor: () => BORDER_COLOR,
      }
    },
    { text: "PARTE 1: MÓDULOS E FASES DA SIMULAÇÃO DE GESTÃO", style: "h1" },
    { text: "Abaixo estão organizados todos os 50 cenários de tomada de decisão divididos em 10 Fases com seu respectivo orçamento, base legal e matriz de opções formativas.", style: "p" }
  ];

  rawPhases.forEach((phase: any, pIdx: number) => {
    const phaseScenarios = rawScenarios[pIdx] || [];
    
    content.push({ text: `${phase.name}: ${phase.desc} (Orçamento: R$ ${phase.budget}.000)`, style: "h2" });

    phaseScenarios.forEach((scen: any, sIdx: number) => {
      content.push({ text: `Cenário ${sIdx + 1}: ${scen.title}`, style: "h3" });

      const contextText = scen.body || scen.sub || "";
      if (contextText) {
        content.push({
          text: [
            { text: "• Contexto da Situação: ", bold: true, color: PRIMARY_BLUE },
            { text: contextText, color: DARK_TEXT }
          ],
          style: "p"
        });
      }

      const legalText = scen.baseConceitual || "";
      if (legalText) {
        content.push({
          text: [
            { text: "• Fundamentação Legal / Técnica: ", bold: true, color: ACCENT_TEAL },
            { text: legalText, italics: true, color: MUTED_TEXT }
          ],
          style: "p"
        });
      }

      const tableBody: any[] = [
        [
          { text: "Opção / Classificação", style: "tableHeader" },
          { text: "Ação Proposta & Análise Técnica / Feedback", style: "tableHeader" }
        ]
      ];

      const opts = scen.opts || [];
      opts.forEach((opt: any, cIdx: number) => {
        const letter = opt.l || (cIdx === 0 ? "A" : cIdx === 1 ? "B" : "C");
        const type = opt.type || (opt.sc >= 100 ? "good" : opt.sc < 50 ? "bad" : "mid");
        const isOptimal = type === "good";
        const isBad = type === "bad";
        const tag = isOptimal ? " [Ótimo]" : (isBad ? " [Equívoco]" : " [Regular / Arriscado]");
        
        const feedbackText = (opt.fi && opt.fi.b) ? opt.fi.b : "";
        const specificLegal = (opt.fi && opt.fi.baseJuridica) ? ` (${opt.fi.baseJuridica})` : "";

        tableBody.push([
          {
            text: `Opção ${letter}${tag}`,
            bold: true,
            color: isOptimal ? SUCCESS_COLOR : (isBad ? DANGER_COLOR : WARNING_COLOR),
            fillColor: isOptimal ? BG_SUCCESS : (isBad ? BG_DANGER : BG_WARNING),
            margin: [5, 5, 5, 5]
          },
          {
            text: [
              { text: opt.txt + "\n\n", bold: true, color: DARK_TEXT },
              { text: "Feedback Formativo: ", bold: true, color: PRIMARY_BLUE, fontSize: 10 },
              { text: feedbackText + specificLegal, italics: true, color: DARK_TEXT, fontSize: 10 }
            ],
            fillColor: BG_PAGE,
            margin: [5, 5, 5, 5]
          }
        ]);
      });

      content.push({
        table: {
          headerRows: 1,
          widths: ["30%", "70%"],
          body: tableBody
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => BORDER_COLOR,
          vLineColor: () => BORDER_COLOR,
        },
        margin: [0, 10, 0, 15]
      });
    });
  });

  if (includeQuestions) {
    content.push({ text: "PARTE 2: TRILHAS DE CAPACITAÇÃO PEDAGÓGICA", style: "h1", pageBreak: "before" });
    content.push({ text: "Abaixo constam as 11 Trilhas com suas 22 questões de avaliação técnica, alternativas e gabarito comentado fundamentado na legislação.", style: "p" });

    tracksData.forEach((track) => {
      content.push({ text: `Trilha ${track.trackNum}: ${track.title} (Nível ${track.level} • Recompensa: ${track.reward})`, style: "h2" });

      track.questions.forEach((q) => {
        content.push({ text: `Questão ${q.num}: ${q.q}`, style: "h3" });

        q.options.forEach((opt) => {
          content.push({
            text: `${opt.text} ${opt.correct ? " [GABARITO CORRETO]" : ""}`,
            bold: opt.correct,
            color: opt.correct ? SUCCESS_COLOR : DARK_TEXT,
            margin: [0, 5, 0, 5]
          });
        });

        content.push({
          style: "calloutSuccess",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  text: [
                    { text: "💡 Explicação Técnica e Fundamentação:\n", bold: true, fontSize: 11, color: SUCCESS_COLOR },
                    { text: q.explanation, color: DARK_TEXT }
                  ]
                }
              ]
            ]
          },
          layout: {
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => BORDER_COLOR,
            vLineColor: () => BORDER_COLOR,
          },
          margin: [0, 10, 0, 15]
        });
      });
    });
  }

  return content;
}

async function generateFiles() {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const styles = {
    splashTitle: { fontSize: 32, bold: true, color: PRIMARY_BLUE, alignment: "center", margin: [0, 20, 0, 10] },
    splashSubtitle: { fontSize: 24, bold: true, color: ACCENT_TEAL, alignment: "center", margin: [0, 0, 0, 20] },
    splashDesc: { fontSize: 14, color: MUTED_TEXT, alignment: "center", margin: [0, 10, 0, 0] },
    h1: { fontSize: 18, bold: true, color: PRIMARY_BLUE, margin: [0, 20, 0, 10] },
    h2: { fontSize: 15, bold: true, color: ACCENT_TEAL, margin: [0, 15, 0, 5] },
    h3: { fontSize: 13, bold: true, color: DARK_TEXT, margin: [0, 10, 0, 5] },
    p: { fontSize: 11, color: DARK_TEXT, margin: [0, 5, 0, 5] },
    tableHeader: { bold: true, fontSize: 12, color: DARK_TEXT, fillColor: BG_TABLE_HEADER, margin: [5, 5, 5, 5] },
    calloutInfo: { margin: [0, 10, 0, 10], fillColor: BG_CALLOUT },
    calloutSuccess: { margin: [0, 10, 0, 10], fillColor: BG_SUCCESS }
  };

  const defaultStyle = {
    font: "Helvetica",
    fontSize: 11,
    color: DARK_TEXT
  };

  // Generate Admin PDF
  const adminDoc = pdfMake.createPdf({
    background: function(currentPage, pageSize) {
      return {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: pageSize.width,
            h: pageSize.height,
            color: BG_PAGE
          }
        ]
      };
    },
    content: buildContent(true),
    styles: styles as any,
    defaultStyle
  });

  const adminPath = path.join(publicDir, "manual_completo_admin.pdf");
  
  await adminDoc.write(adminPath);
  console.log(`Generated Admin PDF: ${adminPath}`);

  // Generate User PDF
  const userDoc = pdfMake.createPdf({
    background: function(currentPage, pageSize) {
      return {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: pageSize.width,
            h: pageSize.height,
            color: BG_PAGE
          }
        ]
      };
    },
    content: buildContent(false),
    styles: styles as any,
    defaultStyle
  });

  const userPath = path.join(publicDir, "manual_do_jogador.pdf");
  
  await userDoc.write(userPath);
  console.log(`Generated User PDF: ${userPath}`);
}

generateFiles().catch(err => {
  console.error("Error generating PDFs:", err);
  process.exit(1);
});
