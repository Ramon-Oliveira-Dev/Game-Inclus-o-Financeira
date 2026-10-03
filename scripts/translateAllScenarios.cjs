const fs = require('fs');

let file = fs.readFileSync('src/dataTranslations.ts', 'utf8');
file = file.replace(/import .*/, '');
file = file.replace('export const translations: any =', 'global.translations =');
eval(file);

const pt = global.translations.pt;

const badgeMap = {
  'DECISAO ESTRATEGICA': { en: 'STRATEGIC DECISION', es: 'DECISIÓN ESTRATÉGICA' },
  'FORMACAO': { en: 'TRAINING & CAPACITY', es: 'CAPACITACIÓN' },
  'DILEMA ETICO': { en: 'ETHICAL DILEMMA', es: 'DILEMA ÉTICO' },
  'OPORTUNIDADE': { en: 'OPPORTUNITY', es: 'OPORTUNIDAD' },
  'CRISE ORCAMENTARIA': { en: 'BUDGET CRISIS', es: 'CRISIS PRESUPUESTARIA' },
  'URGENCIA JUDICIAL': { en: 'JUDICIAL URGENCIES', es: 'URGENCIA JUDICIAL' },
  'PRESSAO POLITICA': { en: 'POLITICAL PRESSURE', es: 'PRESIÓN POLÍTICA' },
  'TECNOLOGIA ASSISTIVA': { en: 'ASSISTIVE TECH', es: 'TECNOLOGÍA ASISTIVA' },
  'INOVACAO': { en: 'INNOVATION', es: 'INNOVACIÓN' }
};

const tagMap = {
  'ARRISCADO': { en: 'RISKY', es: 'ARRIESGADO' },
  'ÓTIMO': { en: 'OPTIMAL', es: 'ÓPTIMO' },
  'EQUÍVOCO': { en: 'MISSTEP', es: 'EQUÍVOCO' },
  'HUMANISTA': { en: 'HUMANISTIC', es: 'HUMANISTA' },
  'EQUILIBRADO': { en: 'BALANCED', es: 'EQUILIBRADO' },
  'CONSERVADOR': { en: 'CONSERVATIVE', es: 'CONSERVADOR' }
};

const phasesEN = [
  { name: "Module 1 - Phase 1", desc: "Initial Accessibility" },
  { name: "Module 1 - Phase 2", desc: "Universal Design" },
  { name: "Module 1 - Phase 3", desc: "Partnerships" },
  { name: "Module 2 - Phase 4", desc: "Judicial Urgencies" },
  { name: "Module 2 - Phase 5", desc: "Political Pressures" },
  { name: "Module 2 - Phase 6", desc: "Cash Crisis" },
  { name: "Module 3 - Phase 7", desc: "Strategy & Assistive Tech" },
  { name: "Module 3 - Phase 8", desc: "Training & Capacity" },
  { name: "Module 3 - Phase 9", desc: "Public Policies" },
  { name: "Module 4 - Phase 10", desc: "Inter-federative Challenges" }
];

const phasesES = [
  { name: "Módulo 1 - Fase 1", desc: "Accesibilidad Inicial" },
  { name: "Módulo 1 - Fase 2", desc: "Diseño Universal" },
  { name: "Módulo 1 - Fase 3", desc: "Alianzas y Asociaciones" },
  { name: "Módulo 2 - Fase 4", desc: "Urgencias Judiciales" },
  { name: "Módulo 2 - Fase 5", desc: "Presiones Políticas" },
  { name: "Módulo 2 - Fase 6", desc: "Crisis de Caja" },
  { name: "Módulo 3 - Fase 7", desc: "Estrategia y TA" },
  { name: "Módulo 3 - Fase 8", desc: "Capacitación" },
  { name: "Módulo 3 - Fase 9", desc: "Políticas Públicas" },
  { name: "Módulo 4 - Fase 10", desc: "Desafíos Interfederativos" }
];

const achievementsEN = [
  { name: "Accessibility Leader", desc: "Solve 8 demands correctly" },
  { name: "Inclusion Hero", desc: "Achieve an inclusion quality higher than 80%" },
  { name: "Fiscal Balance", desc: "Finish with sustainable cash above 80%" },
  { name: "Quick Decision", desc: "Make 3 fast and efficient choices" },
  { name: "Relentless Manager", desc: "Reach a combo of 3 correct choices in a row" },
  { name: "Master Manager", desc: "Reach the maximum score of 1200 points" }
];

const achievementsES = [
  { name: "Líder de Accesibilidad", desc: "Resuelva 8 demandas correctamente" },
  { name: "Héroe de la Inclusión", desc: "Logre una calidad de inclusión superior al 80%" },
  { name: "Equilibrio Fiscal", desc: "Termine con caja sostenible por encima del 80%" },
  { name: "Decisión Rápida", desc: "Tome 3 decisiones rápidas y eficientes" },
  { name: "Gestor Implacable", desc: "Alcance un combo de 3 aciertos seguidos" },
  { name: "Maestro de Gestión", desc: "Alcance la puntuación máxima de 1200 puntos" }
];

const mockRankEN = [
  { name: "Carlos", role: "Manager", score: 480 },
  { name: "Ana", role: "Coordinator", score: 420 },
  { name: "João", role: "Director", score: 380 },
  { name: "You", role: "Your Profile", score: 0 }
];

const mockRankES = [
  { name: "Carlos", role: "Gestor(a)", score: 480 },
  { name: "Ana", role: "Coordinador(a)", score: 420 },
  { name: "João", role: "Director(a)", score: 380 },
  { name: "Tú", role: "Tu Perfil", score: 0 }
];

function translateString(str, lang) {
  if (!str) return str;
  let text = str;

  if (lang === 'en') {
    text = text
      .replace(/Solicitações de cadeiras de rodas/g, "Wheelchair Requests")
      .replace(/Capacitação AEE gratuita/g, "Free AEE Training")
      .replace(/Reforma de Acessibilidade/g, "Accessibility Renovation")
      .replace(/Acessibilidade pedagógica/g, "Pedagogical Accessibility")
      .replace(/Tecnologia Assistiva/g, "Assistive Technology")
      .replace(/Atendimento Educacional Especializado/g, "Specialized Educational Assistance")
      .replace(/Educação Especial/g, "Special Education")
      .replace(/Ministério Público/g, "Public Prosecutor's Office")
      .replace(/Tribunal de Contas/g, "Court of Accounts")
      .replace(/Ação Judicial/g, "Lawsuit / Judicial Injunction")
      .replace(/Ação da Promotoria/g, "Prosecutor Action")
      .replace(/Ação Popular/g, "Popular Action Lawsuit")
      .replace(/Liminar/g, "Injunction")
      .replace(/Corte de Repasse/g, "Transfer Cut")
      .replace(/Corte de Verba/g, "Budget Cut")
      .replace(/Pressão da Câmara/g, "City Council Pressure")
      .replace(/Demanda da Comunidade/g, "Community Demand")
      .replace(/Atender os 8 usando Fundeb emergencialmente/g, "Cover all 8 using FUNDEB on an emergency basis")
      .replace(/Atender os 5 casos mais urgentes e abrir processo licitatório/g, "Provide for the 5 most urgent cases and initiate a public bidding process")
      .replace(/Aguardar o próximo ciclo orçamentário para atender todos/g, "Wait for the next budget cycle to cover everyone")
      .replace(/Usar Fundeb exige enquadramento legal/g, "Using FUNDEB requires legal framework justification")
      .replace(/Decisão equilibrada: atende a urgência imediata/g, "Balanced decision: addresses immediate urgency with technical criteria")
      .replace(/Omissão diante de urgência médica comprovada/g, "Omission in the face of proven medical urgency violates state duty")
      .replace(/Qual critério objetivo você usaria para definir/g, "What objective criteria would you use to define")
      .replace(/para definir os 5 casos prioritários de forma juridicamente defensável\?/g, "the 5 priority cases in a legally defensible manner?")
      .replace(/Secretaria/g, "Department of Education")
      .replace(/Prefeitura/g, "City Hall")
      .replace(/alunos com deficiência/g, "students with disabilities")
      .replace(/aluno com deficiência/g, "student with disabilities")
      .replace(/crianças com deficiência/g, "children with disabilities")
      .replace(/professores/g, "teachers")
      .replace(/escolas/g, "schools")
      .replace(/orçamento/g, "budget")
      .replace(/recursos/g, "resources")
      .replace(/vedação de uso para finalidade diversa sem parecer/g, "prohibition of use for other purposes without legal opinion")
      .replace(/dispensa de licitação por urgência/g, "exemption from bidding due to urgency")
      .replace(/dever do Estado com Educação Especial/g, "State duty regarding Special Education");
  } else if (lang === 'es') {
    text = text
      .replace(/Solicitações de cadeiras de rodas/g, "Solicitudes de sillas de ruedas")
      .replace(/Capacitação AEE gratuita/g, "Capacitación AEE gratuita")
      .replace(/Reforma de Acessibilidade/g, "Reforma de Accesibilidad")
      .replace(/Acessibilidade pedagógica/g, "Accesibilidad pedagógica")
      .replace(/Tecnologia Assistiva/g, "Tecnología Asistiva")
      .replace(/Atendimento Educacional Especializado/g, "Atención Educativa Especializada")
      .replace(/Educação Especial/g, "Educación Especial")
      .replace(/Ministério Público/g, "Ministerio Público")
      .replace(/Tribunal de Contas/g, "Tribunal de Cuentas")
      .replace(/Ação Judicial/g, "Acción Judicial / Medida Cautelar")
      .replace(/Ação da Promotoria/g, "Acción de la Fiscalía")
      .replace(/Ação Popular/g, "Acción Popular")
      .replace(/Liminar/g, "Medida Cautelar")
      .replace(/Corte de Repasse/g, "Corte de Transferencia")
      .replace(/Corte de Verba/g, "Corte de Presupuesto")
      .replace(/Pressão da Câmara/g, "Presión del Concejo")
      .replace(/Demanda da Comunidade/g, "Demanda de la Comunidad")
      .replace(/Atender os 8 usando Fundeb emergencialmente/g, "Atender a los 8 usando FUNDEB de forma emergencial")
      .replace(/Atender os 5 casos mais urgentes e abrir processo licitatório/g, "Atender los 5 casos más urgentes y abrir proceso de licitación")
      .replace(/Aguardar o próximo ciclo orçamentário para atender todos/g, "Esperar el próximo ciclo presupuestario para atender a todos")
      .replace(/Usar Fundeb exige enquadramento legal/g, "Usar FUNDEB exige encuadre legal. Los estudiantes fueron atendidos pero existe riesgo fiscal")
      .replace(/Decisão equilibrada: atende a urgência imediata/g, "Decisión equilibrada: atiende la urgencia inmediata con criterio técnico")
      .replace(/Omissão diante de urgência médica comprovada/g, "Omisión ante urgencia médica comprobada viola el deber del Estado")
      .replace(/Qual critério objetivo você usaria para definir/g, "¿Qué criterio objetivo usaría para definir")
      .replace(/para definir os 5 casos prioritários de forma juridicamente defensável\?/g, "los 5 casos prioritarios de forma legalmente defendible?")
      .replace(/Secretaria/g, "Secretaría de Educación")
      .replace(/Prefeitura/g, "Alcaldía")
      .replace(/alunos com deficiência/g, "estudiantes con discapacidad")
      .replace(/aluno com deficiência/g, "estudiante con discapacidad")
      .replace(/crianças com deficiência/g, "niños con discapacidad")
      .replace(/professores/g, "docentes")
      .replace(/escolas/g, "escuelas")
      .replace(/orçamento/g, "presupuesto")
      .replace(/recursos/g, "recursos")
      .replace(/vedação de uso para finalidade diversa sem parecer/g, "prohibición de uso para otra finalidad sin dictamen")
      .replace(/dispensa de licitação por urgência/g, "exención de licitación por urgencia")
      .replace(/dever do Estado com Educação Especial/g, "deber del Estado con la Educación Especial");
  }

  return text;
}

function translateScenario(sc, lang) {
  const newSc = JSON.parse(JSON.stringify(sc));

  if (sc.badge && badgeMap[sc.badge]) {
    newSc.badge = badgeMap[sc.badge][lang];
  }

  newSc.title = translateString(sc.title, lang);
  newSc.sub = translateString(sc.sub, lang);
  newSc.body = translateString(sc.body, lang);
  if (sc.perguntaDebriefing) {
    newSc.perguntaDebriefing = translateString(sc.perguntaDebriefing, lang);
  }

  newSc.opts = sc.opts.map(opt => {
    const newOpt = JSON.parse(JSON.stringify(opt));
    newOpt.txt = translateString(opt.txt, lang);

    if (opt.tag && tagMap[opt.tag]) {
      newOpt.tag = tagMap[opt.tag][lang];
    }

    if (opt.fi) {
      if (opt.fi.t && tagMap[opt.fi.t]) {
        newOpt.fi.t = tagMap[opt.fi.t][lang];
      }
      newOpt.fi.b = translateString(opt.fi.b, lang);
      if (opt.fi.baseJuridica) {
        newOpt.fi.baseJuridica = translateString(opt.fi.baseJuridica, lang);
      }
    }

    return newOpt;
  });

  return newSc;
}

const enScenarios = pt.scenarios.map(mod => mod.map(sc => translateScenario(sc, 'en')));
const esScenarios = pt.scenarios.map(mod => mod.map(sc => translateScenario(sc, 'es')));

const fileContent = `// Auto-generated full translations for English and Spanish
export const enTranslations = {
  phases: ${JSON.stringify(phasesEN, null, 2)},
  scenarios: ${JSON.stringify(enScenarios, null, 2)},
  mockRank: ${JSON.stringify(mockRankEN, null, 2)},
  achievements: ${JSON.stringify(achievementsEN, null, 2)}
};

export const esTranslations = {
  phases: ${JSON.stringify(phasesES, null, 2)},
  scenarios: ${JSON.stringify(esScenarios, null, 2)},
  mockRank: ${JSON.stringify(mockRankES, null, 2)},
  achievements: ${JSON.stringify(achievementsES, null, 2)}
};
`;

fs.writeFileSync('src/dataTranslationsEnEs.ts', fileContent);
console.log("Successfully written src/dataTranslationsEnEs.ts!");

