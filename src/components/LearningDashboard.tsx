import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../hooks/useSound";
import { Language, Quiz, QuizOption, GameState } from "../types";
import { TrackCard, Track } from "./TrackCard";
import { QuizModal } from "./QuizModal";
import { useAuth } from "../contexts/AuthContext";

interface LearningDashboardProps {
  lang: Language;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const tracksData: Track[] = [
  // Nível 1
  {
    id: "1",
    title: "Dominando o FUNDEB",
    level: 1,
    progress: 0,
    isLocked: false,
    unlockRequirementText: "",
    xpReward: 15,
    iconName: "Key"
  },
  {
    id: "2",
    title: "Marcos Legais",
    level: 1,
    progress: 0,
    isLocked: false,
    unlockRequirementText: "",
    xpReward: 20,
    iconName: "Scale",
    bonusTag: "Ideia 3: +20% Combo Legal"
  },
  {
    id: "3",
    title: "Pedagogia Inclusiva",
    level: 1,
    progress: 0,
    isLocked: false,
    unlockRequirementText: "",
    xpReward: 15,
    iconName: "Brain"
  },
  // Nível 2
  {
    id: "4",
    title: "Acessibilidade Universal",
    level: 2,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 1",
    xpReward: 15,
    iconName: "Shield"
  },
  {
    id: "5",
    title: "Contratos e Licitações",
    level: 2,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 1",
    xpReward: 15,
    iconName: "Code"
  },
  // Nível 3
  {
    id: "6",
    title: "Educação Tecnológica",
    level: 3,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 2",
    xpReward: 25,
    iconName: "Cpu"
  },
  {
    id: "7",
    title: "Formação de Equipes AEE",
    level: 3,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 2",
    xpReward: 25,
    iconName: "Users"
  },
  {
    id: "8",
    title: "Sustentabilidade Sistêmica",
    level: 3,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 2",
    xpReward: 25,
    iconName: "Globe"
  },
  // Nível 4
  {
    id: "9",
    title: "Gestão de Crises Sistêmicas",
    level: 4,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 3",
    xpReward: 50,
    iconName: "AlertTriangle"
  },
  {
    id: "10",
    title: "Diálogo Federativo",
    level: 4,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 3",
    xpReward: 50,
    iconName: "Building"
  },
  {
    id: "11",
    title: "Legado e Prestação de Contas",
    level: 4,
    progress: 0,
    isLocked: true,
    unlockRequirementText: "REQUER MÓDULO 3",
    xpReward: 50,
    iconName: "Award"
  }
];

const trackTitles: Record<string, Record<Language, string>> = {
  "1": { pt: "Dominando o FUNDEB", en: "FUNDEB Mastery", es: "Dominando el FUNDEB" },
  "2": { pt: "Marcos Legais", en: "Legal Frameworks", es: "Marcos Legales" },
  "3": { pt: "Pedagogia Inclusiva", en: "Inclusive Pedagogy", es: "Pedagogía Inclusiva" },
  "4": { pt: "Acessibilidade Universal", en: "Universal Accessibility", es: "Accesibilidad Universal" },
  "5": { pt: "Contratos e Licitações", en: "Contracts & Bidding", es: "Contratos y Licitaciones" },
  "6": { pt: "Educação Tecnológica", en: "Educational Technology", es: "Educación Tecnológica" },
  "7": { pt: "Formação de Equipes AEE", en: "AEE Team Training", es: "Formación de Equipos AEE" },
  "8": { pt: "Sustentabilidade Sistêmica", en: "Systemic Sustainability", es: "Sustentabilidad Sistémica" },
  "9": { pt: "Gestão de Crises Sistêmicas", en: "Systemic Crisis Management", es: "Gestión de Crisis Sistémicas" },
  "10": { pt: "Diálogo Federativo", en: "Federative Dialogue", es: "Diálogo Federativo" },
  "11": { pt: "Legado e Prestação de Contas", en: "Legacy & Accountability", es: "Legado y Rendición de Cuentas" }
};

const quizDataByTrack: Record<string, {
  questions: {
    id: string;
    question_text: Record<Language, string>;
    explanation: Record<Language, string>;
    xp_reward: number;
    options: {
      id: string;
      option_text: Record<Language, string>;
      is_correct: boolean;
    }[];
  }[];
}> = {
  "1": {
    questions: [
      {
        id: "1_q1",
        question_text: {
          pt: "Qual é a principal fonte de recursos que compõem o FUNDEB?",
          en: "What is the main source of resources that make up FUNDEB?",
          es: "¿Cuál es la principal fuente de recursos que componen el FUNDEB?"
        },
        explanation: {
          pt: "O FUNDEB é composto por impostos estaduais e municipais combinados com uma complementação da União.",
          en: "FUNDEB is composed of state and municipal taxes combined with federal complementation.",
          es: "FUNDEB se compone de impuestos estatales y municipales combinados con una complementación de la Unión."
        },
        xp_reward: 15,
        options: [
          {
            id: "1_o1",
            option_text: {
              pt: "Impostos estaduais e municipais e complementação da União",
              en: "State and municipal taxes and federal complementation",
              es: "Impuestos estatales y municipales y complementación de la Unión"
            },
            is_correct: true
          },
          {
            id: "1_o2",
            option_text: {
              pt: "Apenas doações privadas e recursos de loterias federais",
              en: "Only private donations and federal lottery resources",
              es: "Solo donaciones privadas y recursos de loterías federales"
            },
            is_correct: false
          },
          {
            id: "1_o3",
            option_text: {
              pt: "Contribuições exclusivas das escolas particulares",
              en: "Exclusive contributions from private schools",
              es: "Contribuciones exclusivas de las escuelas privadas"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "1_q2",
        question_text: {
          pt: "Qual o percentual mínimo do FUNDEB que deve ser destinado ao pagamento dos profissionais do magistério?",
          en: "What is the minimum percentage of FUNDEB that must be allocated to the payment of teachers?",
          es: "¿Cuál es el porcentaje mínimo del FUNDEB que debe destinarse al pago de los profesores?"
        },
        explanation: {
          pt: "Pela legislação atual, no mínimo 70% dos recursos do FUNDEB devem ser destinados ao pagamento dos profissionais da educação básica ativa.",
          en: "By current legislation, at least 70% of FUNDEB resources must be allocated to the payment of active basic education professionals.",
          es: "Según la legislación actual, al menos el 70% de los recursos del FUNDEB deben destinarse al pago de los profesionales de la educación básica activos."
        },
        xp_reward: 15,
        options: [
          {
            id: "1_o4",
            option_text: { pt: "50%", en: "50%", es: "50%" },
            is_correct: false
          },
          {
            id: "1_o5",
            option_text: { pt: "70%", en: "70%", es: "70%" },
            is_correct: true
          },
          {
            id: "1_o6",
            option_text: { pt: "90%", en: "90%", es: "90%" },
            is_correct: false
          }
        ]
      }
    ]
  },
  "2": {
    questions: [
      {
        id: "2_q1",
        question_text: {
          pt: "Qual é a principal lei que rege a inclusão educacional no Brasil atualmente?",
          en: "What is the main law governing educational inclusion in Brazil today?",
          es: "¿Cuál es la principal ley que rige la inclusión educativa en Brasil actualmente?"
        },
        explanation: {
          pt: "A LBI (Lei Brasileira de Inclusão), também conhecida como Estatuto da Pessoa com Deficiência, é o principal marco de direitos.",
          en: "The LBI (Brazilian Inclusion Law), also known as the Statute of Persons with Disabilities, is the main framework of rights.",
          es: "La LBI (Ley Brasileña de Inclusión), también conocida como Estatuto de la Persona con Discapacidad, es el principal marco de derechos."
        },
        xp_reward: 20,
        options: [
          {
            id: "2_o1",
            option_text: {
              pt: "Lei de Diretrizes e Bases (LDB)",
              en: "Guidelines and Bases Law (LDB)",
              es: "Ley de Directrices y Bases (LDB)"
            },
            is_correct: false
          },
          {
            id: "2_o2",
            option_text: {
              pt: "Lei Brasileira de Inclusão (LBI)",
              en: "Brazilian Inclusion Law (LBI)",
              es: "Ley Brasileña de Inclusión (LBI)"
            },
            is_correct: true
          },
          {
            id: "2_o3",
            option_text: {
              pt: "Estatuto da Criança e do Adolescente (ECA)",
              en: "Child and Adolescent Statute (ECA)",
              es: "Estatuto del Niño y del Adolescente (ECA)"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "2_q2",
        question_text: {
          pt: "O que é o AEE (Atendimento Educacional Especializado)?",
          en: "What is AEE (Specialized Educational Service)?",
          es: "¿Qué es el AEE (Atención Educativa Especializada)?"
        },
        explanation: {
          pt: "O AEE é um serviço complementar ou suplementar ao ensino regular, realizado preferencialmente no contraturno escolar em salas de recursos multifuncionais.",
          en: "AEE is a complementary or supplementary service to regular teaching, preferably performed in the opposite shift in multifunctional resource rooms.",
          es: "El AEE es un servicio complementario o suplementario a la enseñanza regular, realizado preferentemente en el turno opuesto en salas de recursos multifuncionales."
        },
        xp_reward: 20,
        options: [
          {
            id: "2_o4",
            option_text: {
              pt: "Uma escola especial isolada",
              en: "An isolated special school",
              es: "Una escuela especial aislada"
            },
            is_correct: false
          },
          {
            id: "2_o5",
            option_text: {
              pt: "Serviço de apoio e acessibilidade no contraturno",
              en: "Support and accessibility service in the opposite shift",
              es: "Servicio de apoyo y accesibilidad en el turno opuesto"
            },
            is_correct: true
          },
          {
            id: "2_o6",
            option_text: {
              pt: "Um teste padronizado de aptidão",
              en: "A standardized aptitude test",
              es: "Una prueba de aptitud estandarizada"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "3": {
    questions: [
      {
        id: "3_q1",
        question_text: {
          pt: "Qual o foco principal do Desenho Universal para a Aprendizagem (DUA)?",
          en: "What is the main focus of Universal Design for Learning (UDL)?",
          es: "¿Cuál es el enfoque principal del Diseño Universal para el Aprendizaje (DUA)?"
        },
        explanation: {
          pt: "O DUA visa oferecer múltiplos meios de representação, expressão e engajamento para abranger todos os estilos e necessidades de aprendizagem.",
          en: "UDL aims to provide multiple means of representation, expression, and engagement to cover all learning styles and needs.",
          es: "El DUA busca ofrecer múltiples medios de representación, expresión y compromiso para abarcar todos los estilos y necesidades de aprendizaje."
        },
        xp_reward: 15,
        options: [
          {
            id: "3_o1",
            option_text: {
              pt: "Oferecer currículos flexíveis que atendam a todos",
              en: "Provide flexible curricula that meet everyone",
              es: "Ofrecer currículos flexibles que atiendan a todos"
            },
            is_correct: true
          },
          {
            id: "3_o2",
            option_text: {
              pt: "Padronizar carteiras escolares físicas",
              en: "Standardize physical school desks",
              es: "Estandarizar pupitres escolares físicos"
            },
            is_correct: false
          },
          {
            id: "3_o3",
            option_text: {
              pt: "Desenvolver uma prova única de nível nacional",
              en: "Develop a single national-level test",
              es: "Desarrollar una prueba única a nivel nacional"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "3_q2",
        question_text: {
          pt: "Como devem ser as avaliações na perspectiva inclusiva?",
          en: "How should assessments be from an inclusive perspective?",
          es: "¿Cómo deben ser las evaluaciones desde la perspectiva inclusiva?"
        },
        explanation: {
          pt: "As avaliações devem ser formativas, processuais e adaptadas para garantir a equidade nas formas de manifestação do conhecimento.",
          en: "Assessments must be formative, procedural, and adapted to ensure equity in ways of manifesting knowledge.",
          es: "Las evaluaciones deben ser formativas, procesales y adaptadas para garantizar la equidad en las formas de manifestación del conocimiento."
        },
        xp_reward: 15,
        options: [
          {
            id: "3_o4",
            option_text: {
              pt: "Idênticas às de todos, sem flexibilidade",
              en: "Identical to everyone, without flexibility",
              es: "Idénticas a las de todos, sin flexibilidad"
            },
            is_correct: false
          },
          {
            id: "3_o5",
            option_text: {
              pt: "Adaptadas às potencialidades do estudante",
              en: "Adapted to the student's potentials",
              es: "Adaptadas a las potencialidades del estudiante"
            },
            is_correct: true
          },
          {
            id: "3_o6",
            option_text: {
              pt: "Opcionais e baseadas apenas em comportamento",
              en: "Optional and based only on behavior",
              es: "Opcionales y basadas únicamente en el comportamiento"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "4": {
    questions: [
      {
        id: "4_q1",
        question_text: {
          pt: "O que caracteriza a acessibilidade arquitetônica plena em escolas?",
          en: "What characterizes full architectural accessibility in schools?",
          es: "¿Qué caracteriza la accesibilidade arquitectónica plena en las escuelas?"
        },
        explanation: {
          pt: "Rampas, banheiros acessíveis, elevadores e sinalização tátil formam o conjunto de soluções físicas de acessibilidade.",
          en: "Ramps, accessible bathrooms, elevators, and tactile signage form the set of physical accessibility solutions.",
          es: "Rampas, baños accesibles, ascensores y señalización táctil forman el conjunto de soluciones físicas de accesibilidad."
        },
        xp_reward: 15,
        options: [
          {
            id: "4_o1",
            option_text: {
              pt: "Rampas, elevadores, banheiros adaptados e sinalização",
              en: "Ramps, elevators, adapted bathrooms, and signage",
              es: "Rampas, ascensores, baños adaptados y señalización"
            },
            is_correct: true
          },
          {
            id: "4_o2",
            option_text: {
              pt: "Instalação de ar condicionado em todos os setores",
              en: "Air conditioning installation in all sectors",
              es: "Instalación de aire acondicionado en todos los sectores"
            },
            is_correct: false
          },
          {
            id: "4_o3",
            option_text: {
              pt: "Apenas pinturas coloridas em salas de aula",
              en: "Only colorful paint in classrooms",
              es: "Solo pinturas coloridas en las aulas"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "4_q2",
        question_text: {
          pt: "Qual é o principal requisito de acessibilidade digital?",
          en: "What is the main requirement of digital accessibility?",
          es: "¿Cuál es el requisito principal de accesibilidad digital?"
        },
        explanation: {
          pt: "Garantir a compatibilidade com leitores de tela e comandos de teclado permite que pessoas cegas ou com restrição motora naveguem de forma autônoma.",
          en: "Ensuring compatibility with screen readers and keyboard commands allows blind or motor-restricted people to navigate autonomously.",
          es: "Garantizar la compatibilidad con lectores de pantalla y comandos de teclado permite que personas ciegas o con restricción motora naveguen de forma autónoma."
        },
        xp_reward: 15,
        options: [
          {
            id: "4_o4",
            option_text: {
              pt: "Usar apenas textos em formato de imagem estática",
              en: "Use only texts in static image format",
              es: "Usar solo textos en formato de imagen estática"
            },
            is_correct: false
          },
          {
            id: "4_o5",
            option_text: {
              pt: "Compatibilidade com leitores de tela e atalhos de teclado",
              en: "Compatibility with screen readers and keyboard shortcuts",
              es: "Compatibilidad con lectores de pantalla y atajos de teclado"
            },
            is_correct: true
          },
          {
            id: "4_o6",
            option_text: {
              pt: "Carregar animações de áudio sem opção de pausa",
              en: "Load audio animations with no option to pause",
              es: "Cargar animaciones de audio sin opción de pausa"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "5": {
    questions: [
      {
        id: "5_q1",
        question_text: {
          pt: "O que é 'dispensa de licitação por valor' em obras e serviços?",
          en: "What is 'bidding waiver by value' in works and services?",
          es: "¿Qué es la 'dispensa de licitación por valor' en obras y servicios?"
        },
        explanation: {
          pt: "É a possibilidade legal de contratar diretamente fornecedores quando o montante está abaixo do limite legal.",
          en: "It is the legal possibility to directly hire suppliers when the amount is below the legal limit.",
          es: "Es la posibilidad legal de contratar directamente a proveedores cuando el monto está por debajo del límite legal."
        },
        xp_reward: 15,
        options: [
          {
            id: "5_o1",
            option_text: {
              pt: "Contratação direta autorizada para pequenos montantes",
              en: "Direct hiring authorized for small amounts",
              es: "Contratación directa autorizada para pequeños montos"
            },
            is_correct: true
          },
          {
            id: "5_o2",
            option_text: {
              pt: "Processo aberto e sem limite de teto orçamentário",
              en: "Open process with no budget cap limit",
              es: "Proceso abierto y sin límite de tope presupuestario"
            },
            is_correct: false
          },
          {
            id: "5_o3",
            option_text: {
              pt: "Contratação de parentes diretos sem edital",
              en: "Hiring of direct relatives without notice",
              es: "Contratación de familiares directos sin convocatoria"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "5_q2",
        question_text: {
          pt: "Qual a importância do Termo de Referência (TR) em compras públicas?",
          en: "What is the importance of the Term of Reference (TR) in public procurement?",
          es: "¿Cuál es la importancia del Término de Referencia (TR) en compras públicas?"
        },
        explanation: {
          pt: "O TR estabelece o escopo exato do objeto, as exigências de habilitação, critérios de julgamento e metas de entrega.",
          en: "The TR establishes the exact scope of the object, qualification requirements, judging criteria, and delivery goals.",
          es: "El TR establece el alcance exacto del objeto, los requisitos de habilitación, criterios de evaluación y metas de entrega."
        },
        xp_reward: 15,
        options: [
          {
            id: "5_o4",
            option_text: {
              pt: "Servir apenas de protocolo opcional sem valor jurídico",
              en: "Serve only as an optional protocol with no legal value",
              es: "Servir solo como protocolo opcional sin valor jurídico"
            },
            is_correct: false
          },
          {
            id: "5_o5",
            option_text: {
              pt: "Estipular escopo, obrigações, prazos e aceitação",
              en: "Stipulate scope, obligations, deadlines, and acceptance",
              es: "Estipular alcance, obligaciones, plazos y aceptación"
            },
            is_correct: true
          },
          {
            id: "5_o6",
            option_text: {
              pt: "Apenas registrar o orçamento e saldo bancário da escola",
              en: "Only register the school's budget and bank balance",
              es: "Solo registrar el presupuesto y saldo bancario de la escuela"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "6": {
    questions: [
      {
        id: "6_q1",
        question_text: {
          pt: "O que caracteriza a Tecnologia Assistiva (TA) na educação?",
          en: "What characterizes Assistive Technology (AT) in education?",
          es: "¿Qué caracteriza a la Tecnología Asistencial (TA) en la educación?"
        },
        explanation: {
          pt: "A TA engloba qualquer recurso, serviço ou equipamento que promova a autonomia e habilidades funcionais de pessoas com deficiência.",
          en: "AT encompasses any resource, service, or equipment that promotes autonomy and functional abilities of people with disabilities.",
          es: "La TA engloba cualquier recurso, servicio o equipo que promueva la autonomía y habilidades funcionales de personas con discapacidad."
        },
        xp_reward: 25,
        options: [
          {
            id: "6_o1",
            option_text: {
              pt: "Recursos que promovem autonomia e capacidade funcional",
              en: "Resources that promote autonomy and functional capacity",
              es: "Recursos que promueven autonomía y capacidad funcional"
            },
            is_correct: true
          },
          {
            id: "6_o2",
            option_text: {
              pt: "Computadores genéricos comprados no varejo",
              en: "Generic computers purchased in retail",
              es: "Computadoras genéricas compradas al por menor"
            },
            is_correct: false
          },
          {
            id: "6_o3",
            option_text: {
              pt: "Aparelhos de ar condicionado comandados por voz",
              en: "Voice-controlled air conditioners",
              es: "Aparatos de aire acondicionado controlados por voz"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "6_q2",
        question_text: {
          pt: "Qual o benefício de softwares leitores de tela em avaliações digitais?",
          en: "What is the benefit of screen readers in digital assessments?",
          es: "¿Cuál es el beneficio de los softwares lectores de pantalla en evaluaciones digitales?"
        },
        explanation: {
          pt: "Eles convertem textos escritos em áudio sintetizado, permitindo autonomia para estudantes cegos realizarem exames.",
          en: "They convert written text to synthesized audio, allowing autonomy for blind students to take exams.",
          es: "Convierten textos escritos en audio sintetizado, permitiendo autonomía para estudiantes ciegos al realizar exámenes."
        },
        xp_reward: 25,
        options: [
          {
            id: "6_o4",
            option_text: {
              pt: "Impedir que outros alunos colem nas provas",
              en: "Prevent other students from cheating on exams",
              es: "Evitar que otros alumnos se copien en los exámenes"
            },
            is_correct: false
          },
          {
            id: "6_o5",
            option_text: {
              pt: "Fornecer áudio descrição para navegação e leitura autônoma",
              en: "Provide audio description for autonomous navigation and reading",
              es: "Proporcionar descripción de audio para navegación y lectura autónoma"
            },
            is_correct: true
          },
          {
            id: "6_o6",
            option_text: {
              pt: "Corrigir os erros ortográficos do aluno durante a prova",
              en: "Correct spelling mistakes of the student during the exam",
              es: "Corregir los errores ortográficos del alumno durante el examen"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "7": {
    questions: [
      {
        id: "7_q1",
        question_text: {
          pt: "Qual é o perfil profissional do professor do AEE?",
          en: "What is the professional profile of the AEE teacher?",
          es: "¿Cuál es el perfil profesional del maestro del AEE?"
        },
        explanation: {
          pt: "O professor de AEE deve possuir pedagogia ou outra licenciatura complementada por especialização em Educação Especial.",
          en: "The AEE teacher must have pedagogy or another degree complemented by special education specialization.",
          es: "El maestro de AEE debe poseer pedagogía u otra licenciatura complementada con especialización en Educación Especial."
        },
        xp_reward: 25,
        options: [
          {
            id: "7_o1",
            option_text: {
              pt: "Licenciatura com especialização em Educação Especial",
              en: "Degree with specialization in Special Education",
              es: "Licenciatura con especialización en Educación Especial"
            },
            is_correct: true
          },
          {
            id: "7_o2",
            option_text: {
              pt: "Qualquer formação técnica de nível médio",
              en: "Any technical secondary training",
              es: "Cualquier formación técnica de nivel medio"
            },
            is_correct: false
          },
          {
            id: "7_o3",
            option_text: {
              pt: "Curso de informática básica ou libras",
              en: "Basic computer or sign language course",
              es: "Curso de informática básica o lenguaje de señas"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "7_q2",
        question_text: {
          pt: "Qual a função do profissional de apoio escolar (cuidador/mediador)?",
          en: "What is the function of the school support professional (caregiver/mediator)?",
          es: "¿Cuál es la función del profesional de apoyo escolar (cuidador/mediador)?"
        },
        explanation: {
          pt: "Ele apoia atividades de alimentação, locomoção e higiene para estudantes com severas limitações físicas ou cognitivas.",
          en: "He supports feeding, mobility, and hygiene activities for students with severe physical or cognitive limitations.",
          es: "Apoya actividades de alimentación, locomoción e higiene para estudiantes con severas limitaciones físicas o cognitivas."
        },
        xp_reward: 25,
        options: [
          {
            id: "7_o4",
            option_text: {
              pt: "Apenas aplicar as notas do diário oficial",
              en: "Only apply grades and official records",
              es: "Solo aplicar notas y registros del diario oficial"
            },
            is_correct: false
          },
          {
            id: "7_o5",
            option_text: {
              pt: "Apoiar em alimentação, higiene e locomoção do aluno",
              en: "Support in feeding, hygiene, and mobility of the student",
              es: "Apoyar en alimentación, higiene y locomoción del alumno"
            },
            is_correct: true
          },
          {
            id: "7_o6",
            option_text: {
              pt: "Ministrar o conteúdo curricular das disciplinas regulares",
              en: "Teach curricular content of regular subjects",
              es: "Impartir el contenido curricular de las materias regulares"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "8": {
    questions: [
      {
        id: "8_q1",
        question_text: {
          pt: "O que caracteriza a sustentabilidade financeira na escola?",
          en: "What characterizes financial sustainability in school?",
          es: "¿Qué caracteriza a la sustentabilidad financiera en la escuela?"
        },
        explanation: {
          pt: "Gerenciar receitas e despesas de forma a assegurar a manutenção contínua das ações educativas sem gerar endividamento.",
          en: "Managing revenue and expenses in order to ensure the continuous maintenance of educational actions without generating debt.",
          es: "Gestionar ingresos y gastos de manera que se asegure el mantenimiento continuo de las acciones educativas sin generar deudas."
        },
        xp_reward: 25,
        options: [
          {
            id: "8_o1",
            option_text: {
              pt: "Garantir a manutenção de ações sem gerar déficit",
              en: "Ensure maintenance of actions without generating a deficit",
              es: "Garantizar el mantenimiento de acciones sin generar déficit"
            },
            is_correct: true
          },
          {
            id: "8_o2",
            option_text: {
              pt: "Depender de empréstimos bancários rotativos",
              en: "Relying on rotating bank loans",
              es: "Depender de préstamos bancarios rotativos"
            },
            is_correct: false
          },
          {
            id: "8_o3",
            option_text: {
              pt: "Gastar toda a verba anual já no primeiro mês",
              en: "Spending all annual funds in the first month",
              es: "Gastar todo el presupuesto anual en el primer mes"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "8_q2",
        question_text: {
          pt: "Por que a coparticipação social fortalece a sustentabilidade?",
          en: "Why does social co-participation strengthen sustainability?",
          es: "¿Por qué la coparticipación social fortalece la sustentabilidad?"
        },
        explanation: {
          pt: "O engajamento comunitário zela pela integridade do patrimônio público e apoia a transparência na destinação dos fundos.",
          en: "Community engagement guards the integrity of public heritage and supports transparency in the allocation of funds.",
          es: "El compromiso comunitario vela por la integridad del patrimonio público y apoya la transparencia en la asignación de fondos."
        },
        xp_reward: 25,
        options: [
          {
            id: "8_o4",
            option_text: {
              pt: "Para terceirizar serviços públicos para voluntários",
              en: "To outsource public services to volunteers",
              es: "Para subcontratar servicios públicos a voluntarios"
            },
            is_correct: false
          },
          {
            id: "8_o5",
            option_text: {
              pt: "Cria pertencimento, transparência e cuidado mútuo",
              en: "Creates belonging, transparency, and mutual care",
              es: "Crea pertenencia, transparencia y cuidado mutuo"
            },
            is_correct: true
          },
          {
            id: "8_o6",
            option_text: {
              pt: "Apenas para reduzir impostos dos pais de alunos",
              en: "Only to reduce taxes of student parents",
              es: "Solo para reducir impuestos de los padres de alumnos"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "9": {
    questions: [
      {
        id: "9_q1",
        question_text: {
          pt: "Qual deve ser a postura do gestor diante de uma crise no AEE?",
          en: "What should be the manager's posture in an AEE crisis?",
          es: "¿Cuál debe ser la postura del gestor ante una crisis en el AEE?"
        },
        explanation: {
          pt: "O gestor deve instaurar apuração ágil de fatos, traçar diagnósticos técnicos, realocar orçamentos e emitir relatórios transparentes.",
          en: "The manager must rapidly investigate facts, draw technical diagnoses, relocate budgets, and issue transparent reports.",
          es: "El gestor debe iniciar una investigación ágil de los hechos, elaborar diagnósticos técnicos, reasignar presupuestos y emitir informes transparentes."
        },
        xp_reward: 50,
        options: [
          {
            id: "9_o1",
            option_text: {
              pt: "Agir rápido, realocar recursos e dialogar abertamente",
              en: "Act fast, relocate resources, and dialogue openly",
              es: "Actuar rápido, reasignar recursos y dialogar abiertamente"
            },
            is_correct: true
          },
          {
            id: "9_o2",
            option_text: {
              pt: "Abafar as reclamações para proteger a reputação do setor",
              en: "Stifle complaints to protect the sector's reputation",
              es: "Sofocar las quejas para proteger la reputación del sector"
            },
            is_correct: false
          },
          {
            id: "9_o3",
            option_text: {
              pt: "Suspender as matrículas do AEE temporariamente",
              en: "Suspend AEE registrations temporarily",
              es: "Como suspender las inscripciones del AEE temporalmente"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "9_q2",
        question_text: {
          pt: "Qual a importância do plano de mitigação de riscos na educação?",
          en: "What is the importance of the risk mitigation plan in education?",
          es: "¿Cuál es la importancia del plan de mitigación de riesgos en la educación?"
        },
        explanation: {
          pt: "Mapear previamente riscos fiscais, judiciais e pedagógicos previne multas e perda de qualidade de atendimento.",
          en: "Previously mapping fiscal, judicial, and pedagogical risks prevents fines and loss of service quality.",
          es: "Mapear previamente riesgos fiscales, judiciales y pedagógicos previene multas y la pérdida de calidad del servicio."
        },
        xp_reward: 50,
        options: [
          {
            id: "9_o4",
            option_text: {
              pt: "Apenas protocolar documentos sem intenção prática",
              en: "Only submit documents with no practical intent",
              es: "Solo registrar documentos sin intención práctica"
            },
            is_correct: false
          },
          {
            id: "9_o5",
            option_text: {
              pt: "Prevenir falhas pedagógicas e processos judiciais",
              en: "Prevent pedagogical failures and lawsuits",
              es: "Prevenir fallas pedagógicas y demandas judiciales"
            },
            is_correct: true
          },
          {
            id: "9_o6",
            option_text: {
              pt: "Substituir a necessidade de contratar fiscais de obra",
              en: "Replace the need to hire construction inspectors",
              es: "Reemplazar la necesidad de contratar inspectores de obra"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "10": {
    questions: [
      {
        id: "10_q1",
        question_text: {
          pt: "Como o regime de colaboração federativa beneficia os municípios?",
          en: "How does the federative collaboration regime benefit municipalities?",
          es: "¿Cómo beneficia el régimen de colaboración federativa a los municipios?"
        },
        explanation: {
          pt: "Ele integra recursos da União, Estados e Municípios para financiamento conjunto e intercâmbio de soluções técnicas de educação especial.",
          en: "It integrates Union, State, and Municipal resources for joint funding and exchange of technical special education solutions.",
          es: "Integra recursos de la Unión, Estados y Municipios para el financiamiento conjunto y el intercambio de soluciones técnicas de educación especial."
        },
        xp_reward: 50,
        options: [
          {
            id: "10_o1",
            option_text: {
              pt: "Por meio do cofinanciamento e partilha de soluções técnicas",
              en: "Through co-financing and sharing of technical solutions",
              es: "A través del cofinanciamiento y el intercambio de soluciones técnicas"
            },
            is_correct: true
          },
          {
            id: "10_o2",
            option_text: {
              pt: "Retirando verbas do município para o governo federal",
              en: "Removing municipal funds for the federal government",
              es: "Retirando fondos del municipio para el gobierno federal"
            },
            is_correct: false
          },
          {
            id: "10_o3",
            option_text: {
              pt: "Exigindo aprovação do senado para contratar professores",
              en: "Requiring senate approval to hire teachers",
              es: "Exigiendo la aprobación del senado para contratar maestros"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "10_q2",
        question_text: {
          pt: "O que é o PAR (Plano de Ações Articuladas)?",
          en: "What is the PAR (Articulated Action Plan)?",
          es: "¿Qué es el PAR (Plan de Acciones Articuladas)?"
        },
        explanation: {
          pt: "É um planejamento estratégico plurianual do município para angariar verbas de convênio do Ministério da Educação.",
          en: "It is a multi-year strategic planning of the municipality to raise agreement funds from the Ministry of Education.",
          es: "Es una planificación estratégica plurianual del municipio para captar fondos de convenios del Ministerio de Educación."
        },
        xp_reward: 50,
        options: [
          {
            id: "10_o4",
            option_text: {
              pt: "Um regulamento interno dos servidores públicos estaduais",
              en: "An internal regulation of state public servants",
              es: "Un reglamento interno de los servidores públicos estatales"
            },
            is_correct: false
          },
          {
            id: "10_o5",
            option_text: {
              pt: "Instrumento estratégico de planejamento e assistência técnica",
              en: "Strategic instrument for planning and technical assistance",
              es: "Instrumento estratégico de planificación y asistencia técnica"
            },
            is_correct: true
          },
          {
            id: "10_o6",
            option_text: {
              pt: "Um sistema de notas geradas para aprovação de alunos",
              en: "A grading system generated for student approval",
              es: "Un sistema de calificaciones generado para la aprobación de alumnos"
            },
            is_correct: false
          }
        ]
      }
    ]
  },
  "11": {
    questions: [
      {
        id: "11_q1",
        question_text: {
          pt: "Qual a finalidade principal da prestação de contas na educação?",
          en: "What is the main purpose of accountability in education?",
          es: "¿Cuál es el propósito principal de la rendición de cuentas en la educación?"
        },
        explanation: {
          pt: "Demonstrar o cumprimento integral do edital, uso ético do dinheiro público e assegurar a adimplência com órgãos de controle (TCE).",
          en: "Demonstrate full compliance with the bid, ethical use of public money, and ensure compliance with control bodies (TCE).",
          es: "Demostrar el cumplimiento integral de la convocatoria, el uso ético del dinero público y asegurar la conformidad con los órganos de control (TCE)."
        },
        xp_reward: 50,
        options: [
          {
            id: "11_o1",
            option_text: {
              pt: "Comprovar aplicação ética, lícita e transparente",
              en: "Prove ethical, lawful, and transparent application",
              es: "Demostrar aplicación ética, lícita y transparente"
            },
            is_correct: true
          },
          {
            id: "11_o2",
            option_text: {
              pt: "Reduzir o quadro de professores efetivos na rede",
              en: "Reduce the number of permanent teachers in the network",
              es: "Reducir la plantilla de maestros permanentes en la red"
            },
            is_correct: false
          },
          {
            id: "11_o3",
            option_text: {
              pt: "Esconder notas fiscais para evitar taxação tributária",
              en: "Hide invoices to avoid tax assessment",
              es: "Ocultar facturas para evitar la evaluación de impuestos"
            },
            is_correct: false
          }
        ]
      },
      {
        id: "11_q2",
        question_text: {
          pt: "O que representa o legado inclusivo para as próximas gerações?",
          en: "What does the inclusive legacy represent for next generations?",
          es: "¿Qué representa el legado inclusivo para las próximas generaciones?"
        },
        explanation: {
          pt: "Um legado inclusivo bem gerido garante infraestrutura física, professores capacitados e igualdade de oportunidades permanente.",
          en: "A well-managed inclusive legacy ensures physical infrastructure, trained teachers, and permanent equal opportunities.",
          es: "Un legado inclusivo bien gestionado garantiza infraestructura física, maestros capacitados e igualdad de oportunidades permanente."
        },
        xp_reward: 50,
        options: [
          {
            id: "11_o4",
            option_text: {
              pt: "Dívidas financeiras acumuladas sem utilidade prática",
              en: "Accumulated financial debts of no practical use",
              es: "Deudas financieras acumuladas sin utilidad práctica"
            },
            is_correct: false
          },
          {
            id: "11_o5",
            option_text: {
              pt: "Infraestrutura acessível, profissionais qualificados e equidade",
              en: "Accessible infrastructure, qualified professionals, and equity",
              es: "Infraestructura accesible, profesionales calificados y equidad"
            },
            is_correct: true
          },
          {
            id: "11_o6",
            option_text: {
              pt: "Apenas uma placa de homenagem vazia no prédio da prefeitura",
              en: "Only an empty tribute plaque in the town hall building",
              es: "Solo una placa de homenaje vacía en el edificio del ayuntamiento"
            },
            is_correct: false
          }
        ]
      }
    ]
  }
};

export function LearningDashboard({ lang, gameState, setGameState }: LearningDashboardProps) {
  const { playClick, playTick, playFinish } = useSound();
  const { profile } = useAuth();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const [completedTracks, setCompletedTracks] = useState<Record<string, number>>(() => {
    try {
      const uId = profile?.id || "guest";
      const saved = localStorage.getItem(`rs_track_progress_${uId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const uId = profile?.id || "guest";
    try {
      const saved = localStorage.getItem(`rs_track_progress_${uId}`);
      if (saved) {
        setCompletedTracks(JSON.parse(saved));
      } else {
        setCompletedTracks({});
      }
    } catch (e) {
      console.error("Error loading track progress", e);
    }
  }, [profile?.id]);

  const handleOpenQuiz = (track: Track) => {
    if (track.isLocked) return;
    playClick();
    setSelectedTrack(track);
  };

  const handleCompleteQuiz = (trackId: string, xpReward: number) => {
    playFinish();
    
    const wasAlreadyCompleted = completedTracks[trackId] === 100;
    
    const nextProgress = {
      ...completedTracks,
      [trackId]: 100
    };

    setCompletedTracks(nextProgress);
    const uId = profile?.id || "guest";
    try {
      localStorage.setItem(`rs_track_progress_${uId}`, JSON.stringify(nextProgress));
    } catch (e) {
      console.error("Error saving track progress", e);
    }

    // Award XP globally if not previously completed
    if (!wasAlreadyCompleted) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + xpReward,
        needsSync: true
      }));
    }
  };

  const getLocalizedQuizzesAndOptions = (trackId: string) => {
    const trackData = quizDataByTrack[trackId];
    if (!trackData) return { quizzes: [], options: {} };

    const quizzes: Quiz[] = trackData.questions.map(q => ({
      id: q.id,
      track_id: trackId,
      question_text: q.question_text[lang] || q.question_text["pt"],
      explanation: q.explanation[lang] || q.explanation["pt"],
      xp_reward: q.xp_reward
    }));

    const options: Record<string, QuizOption[]> = {};
    trackData.questions.forEach(q => {
      options[q.id] = q.options.map(o => ({
        id: o.id,
        quiz_id: q.id,
        option_text: o.option_text[lang] || o.option_text["pt"],
        is_correct: o.is_correct
      }));
    });

    return { quizzes, options };
  };

  // Build tracks with localized titles and dynamic unlock states
  const tracks = tracksData.map(track => {
    const progress = completedTracks[track.id] || 0;
    const title = trackTitles[track.id]?.[lang] || track.title;
    
    // Dynamic unlock logic
    let isLocked = true;
    if (track.level === 1) {
      isLocked = false;
    } else if (gameState && gameState.ph + 1 >= track.level) {
      isLocked = false;
    } else {
      // Unlocks if previous level's tracks are all completed
      const prevLevelTracks = tracksData.filter(t => t.level === track.level - 1);
      const allPrevCompleted = prevLevelTracks.length > 0 && prevLevelTracks.every(t => (completedTracks[t.id] || 0) === 100);
      isLocked = !allPrevCompleted;
    }

    const unlockText = isLocked 
      ? (lang === "pt" 
          ? `REQUER NÍVEL ${track.level - 1} OU FASE ${track.level}` 
          : lang === "es" 
          ? `REFIERE NIVEL ${track.level - 1} O FASE ${track.level}` 
          : `REQUIRES LEVEL ${track.level - 1} OR PHASE ${track.level}`)
      : "";

    return {
      ...track,
      title,
      progress,
      isLocked,
      unlockRequirementText: unlockText
    };
  });

  const level1 = tracks.filter(t => t.level === 1);
  const level2 = tracks.filter(t => t.level === 2);
  const level3 = tracks.filter(t => t.level === 3);
  const level4 = tracks.filter(t => t.level === 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const toLearningTrack = (track: Track) => ({
    id: track.id,
    title: track.title,
    icon_name: track.iconName,
    required_level: track.level
  });

  const quizAndOptions = selectedTrack ? getLocalizedQuizzesAndOptions(selectedTrack.id) : { quizzes: [], options: {} };

  return (
    <div className="w-full min-h-full bg-[#0B1120] p-4 sm:p-6 lg:p-8 font-sans text-slate-100 pb-36 md:pb-16 relative overflow-y-auto">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-5xl mx-auto relative z-10 mt-10 md:mt-0">
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {lang === "pt" ? "APRENDER" : lang === "es" ? "APRENDER" : "LEARN"}
          </h1>
          <h2 className="text-xs md:text-sm text-cyan-400 font-bold tracking-widest mt-2 uppercase">
            {lang === "pt" 
              ? "Trilhas de Capacitação em Educação Especial" 
              : lang === "es" 
              ? "Trilhas de Capacitación en Educación Especial" 
              : "Special Education Training Tracks"
            }
          </h2>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 relative"
        >
          {/* Connector Line running down the middle */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-cyan-500/30 transform -translate-x-1/2 z-0"></div>

          {/* Level 1 */}
          <div className="w-full flex flex-col items-center relative">
            <h3 className="bg-[#0B1120] px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6 z-10 text-center">
              {lang === "pt" ? "Nível 1: Fundamentos" : lang === "es" ? "Nivel 1: Fundamentos" : "Level 1: Fundamentals"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
              {level1.map((track) => (
                <div key={track.id} className="h-[235px]">
                  <TrackCard 
                    track={track} 
                    onClick={() => handleOpenQuiz(track)} 
                    onHover={playTick} 
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Level 2 */}
          <div className="w-full flex flex-col items-center relative mt-6">
            <h3 className="bg-[#0B1120] px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6 z-10 text-center">
              {lang === "pt" ? "Nível 2: Gestão de Crise" : lang === "es" ? "Nivel 2: Gestión de Crisis" : "Level 2: Crisis Management"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
              {level2.map((track) => (
                <div key={track.id} className="h-[235px]">
                  <TrackCard 
                    track={track} 
                    onClick={() => handleOpenQuiz(track)} 
                    onHover={playTick} 
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 */}
          <div className="w-full flex flex-col items-center relative mt-6">
            <h3 className="bg-[#0B1120] px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6 z-10 text-center">
              {lang === "pt" ? "Nível 3: Inovação" : lang === "es" ? "Nivel 3: Innovación" : "Level 3: Innovation"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
              {level3.map((track) => (
                <div key={track.id} className="w-full h-[235px]">
                  <TrackCard 
                    track={track} 
                    onClick={() => handleOpenQuiz(track)} 
                    onHover={playTick} 
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Level 4 */}
          <div className="w-full flex flex-col items-center relative mt-6">
            <h3 className="bg-[#0B1120] px-4 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6 z-10 text-center">
              {lang === "pt" ? "Nível 4: Gestão Plena e Legado" : lang === "es" ? "Nivel 4: Gestión Plena y Legado" : "Level 4: Full Management & Legacy"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
              {level4.map((track) => (
                <div key={track.id} className="w-full h-[235px]">
                  <TrackCard 
                    track={track} 
                    onClick={() => handleOpenQuiz(track)} 
                    onHover={playTick} 
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {selectedTrack && (
          <QuizModal 
            track={toLearningTrack(selectedTrack)} 
            quizzes={quizAndOptions.quizzes}
            options={quizAndOptions.options}
            onClose={() => setSelectedTrack(null)} 
            onComplete={() => handleCompleteQuiz(selectedTrack.id, selectedTrack.xpReward)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
