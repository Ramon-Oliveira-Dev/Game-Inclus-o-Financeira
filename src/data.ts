import { Phase, Scenario, RankEntry, Achievement, Language } from "./types";
import { translations } from "./dataTranslations";
import { translateScenario } from "./scenarioTranslator";

export const getPhases = (lang: Language): Phase[] => {
  const phases = translations[lang]?.phases;
  return phases && phases.length > 0 ? phases : translations["pt"].phases;
};

export const getScenarios = (lang: Language): Scenario[][] => {
  const ptScenarios = translations["pt"].scenarios as Scenario[][];
  if (!ptScenarios || ptScenarios.length === 0) return [];
  if (lang === "pt") return ptScenarios;

  return ptScenarios.map((phaseArr) =>
    phaseArr.map((ptScen) => translateScenario(ptScen, lang))
  );
};

export const getMockRank = (lang: Language): RankEntry[] => {
  const rank = translations[lang]?.mockRank;
  return rank && rank.length > 0 ? rank : translations["pt"].mockRank;
};

const getAchTranslations = (lang: Language) => {
  const ach = translations[lang]?.achievements;
  return ach && ach.length >= 6 ? ach : translations["pt"].achievements;
};

export const getAllAch = (lang: Language): Achievement[] => {
  const achTexts = getAchTranslations(lang);
  return [
  {
    icon: "🏆",
    name: achTexts[0]?.name || "Conquista 1",
    desc: achTexts[0]?.desc || "Descrição 1",
    cond: (s) => s.rights >= 8,
  },
  {
    icon: "♿",
    name: achTexts[1]?.name || "Conquista 2",
    desc: achTexts[1]?.desc || "Descrição 2",
    cond: (s) => s.qual >= 85,
  },
  {
    icon: "💎",
    name: achTexts[2]?.name || "Conquista 3",
    desc: achTexts[2]?.desc || "Descrição 3",
    cond: (s) => s.sust >= 80,
  },
  {
    icon: "⚡",
    name: achTexts[3]?.name || "Conquista 4",
    desc: achTexts[3]?.desc || "Descrição 4",
    cond: (s) => s.fast >= 3,
  },
  {
    icon: "🔥",
    name: achTexts[4]?.name || "Conquista 5",
    desc: achTexts[4]?.desc || "Descrição 5",
    cond: (s) => s.maxCombo >= 3,
  },
  {
    icon: "⭐",
    name: achTexts[5]?.name || "Conquista 6",
    desc: achTexts[5]?.desc || "Descrição 6",
    cond: (s) => s.score >= 1200,
  },
];
};
