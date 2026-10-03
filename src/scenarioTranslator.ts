import { Scenario, Language } from "./types";
import { translations } from "./dataTranslations";
import { cardTranslations } from "./allScenarioTranslations";

// Generic translator helper for any scenario
export function translateScenario(ptScenario: Scenario, lang: Language): Scenario {
  if (lang === "pt") return ptScenario;

  const cardId = ptScenario.id;
  const translationOverride = cardTranslations[cardId]?.[lang];

  // Try to find translated scenario from translations object
  const langScenarios = (translations[lang]?.scenarios || []) as any[][];
  let matchedScen: any = null;
  if (langScenarios && langScenarios.length > 0) {
    for (const phaseArr of langScenarios) {
      if (Array.isArray(phaseArr)) {
        const found = phaseArr.find((s: any) => s.id === cardId);
        if (found) {
          matchedScen = found;
          break;
        }
      }
    }
  }

  const badgeMap: Record<string, { en: string; es: string }> = {
    "DECISAO ESTRATEGICA": { en: "STRATEGIC DECISION", es: "DECISIÓN ESTRATÉGICA" },
    "DESAFIO FINANCEIRO": { en: "FINANCIAL CHALLENGE", es: "DESAFÍO FINANCIERO" },
    "URGENCIA JUDICIAL": { en: "JUDICIAL URGENCY", es: "URGENCIA JUDICIAL" },
    "PRESSAO POLITICA": { en: "POLITICAL PRESSURE", es: "PRESIÓN POLÍTICA" },
    "FORMACAO E AEE": { en: "TRAINING & AEE", es: "CAPACITACIÓN Y AEE" },
    "POLITICA PUBLICA": { en: "PUBLIC POLICY", es: "POLÍTICA PÚBLICA" },
    "ACESSIVEL E TA": { en: "ACCESSIBILITY & TA", es: "ACCESIBILIDAD Y TA" },
    "DESAFIO FEDERATIVO": { en: "FEDERATIVE CHALLENGE", es: "DESAFÍO FEDERATIVO" }
  };

  const badge = translationOverride?.badge || matchedScen?.badge || badgeMap[ptScenario.badge]?.[lang] || ptScenario.badge;
  const title = translationOverride?.title || matchedScen?.title || ptScenario.title;
  const sub = translationOverride?.sub || matchedScen?.sub || ptScenario.sub;
  const body = translationOverride?.body || matchedScen?.body || ptScenario.body;
  const perguntaDebriefing = translationOverride?.debrief?.question || translationOverride?.perguntaDebriefing || matchedScen?.perguntaDebriefing || ptScenario.perguntaDebriefing;

  const opts = ptScenario.opts.map((ptOpt, i) => {
    const overrideOpt = translationOverride?.opts?.[i];
    const matchOpt = matchedScen?.opts?.[i];

    const tagMap: Record<string, { en: string; es: string }> = {
      "ARRISCADO": { en: "RISKY", es: "ARRIESGADO" },
      "ÓTIMO": { en: "OPTIMAL", es: "ÓPTIMO" },
      "EQUÍVOCO": { en: "MISTAKE", es: "EQUÍVOCO" },
      "HUMANISTA": { en: "HUMANIST", es: "HUMANISTA" },
      "EQUILIBRADO": { en: "BALANCED", es: "EQUILIBRADO" },
      "CONSERVADOR": { en: "CONSERVATIVE", es: "CONSERVADOR" },
    };

    const optTag = overrideOpt?.tag || matchOpt?.tag || tagMap[ptOpt.tag]?.[lang] || ptOpt.tag;
    const optTxt = overrideOpt?.txt || matchOpt?.txt || ptOpt.txt;
    const fiTitle = overrideOpt?.fi?.t || matchOpt?.fi?.t || tagMap[ptOpt.fi?.t || ""]?.[lang] || ptOpt.fi?.t || optTag;
    const fiBody = overrideOpt?.fb || overrideOpt?.fi?.b || matchOpt?.fi?.b || ptOpt.fi?.b || "";
    const fiBase = overrideOpt?.fi?.baseJuridica || matchOpt?.fi?.baseJuridica || ptOpt.fi?.baseJuridica || "";

    return {
      ...ptOpt,
      txt: optTxt,
      tag: optTag,
      fi: ptOpt.fi ? {
        ...ptOpt.fi,
        t: fiTitle,
        b: fiBody,
        baseJuridica: fiBase,
      } : {
        t: fiTitle,
        b: fiBody,
        baseJuridica: fiBase,
        icon: "Check",
        cls: "good" as const,
        qual: "+0",
        sust: "+0",
        pts: "+0",
      }
    };
  });

  return {
    ...ptScenario,
    badge,
    title,
    sub,
    body,
    perguntaDebriefing,
    opts,
  };
}
