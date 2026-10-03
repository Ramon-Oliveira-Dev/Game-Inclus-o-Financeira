export type Language = "pt" | "en" | "es";

export interface Phase {
  name: string;
  icon: string;
  desc: string;
  budget: number;
}

export interface ScenarioFeedback {
  icon: string;
  t: string;
  b: string;
  cls: "good" | "mid" | "bad";
  qual: string;
  sust: string;
  pts: string;
  baseJuridica?: string;
}

export interface ScenarioOption {
  l: string;
  txt: string;
  tag: string;
  type: "good" | "mid" | "bad";
  qual: number;
  sust: number;
  sc: number;
  fi: ScenarioFeedback;
  budgetCost?: number;
  axisEtico?: number;
  axisFiscal?: number;
  axisLegal?: number;
  axisPedagogico?: number;
  flagReservaCriada?: boolean;
  flagOpcaoCriativa?: boolean;
  flagOmissao?: boolean;
  flagRecusaPolitica?: boolean;
  consequenciaLateral?: string | null;
}

export interface Scenario {
  id?: string;
  tipo?: string;
  icon: string;
  color: string;
  badge: string;
  badgeColor: string;
  badgeTxt: string;
  title: string;
  sub: string;
  body: string;
  prazoHoras?: number;
  custoQSD?: number;
  baseConceitual?: string;
  consequenciaLateral?: string;
  perguntaDebriefing?: string;
  opts: ScenarioOption[];
}

export interface GameState {
  ph: number;
  sc: number;
  score: number;
  qual: number;
  sust: number;
  budget: number;
  combo: number;
  maxCombo: number;
  rights: number;
  fast: number;
  answered: boolean;
  timerSec: number;
  diff: "facil" | "medio" | "dificil";
  player: string;
  lang: Language;
  unlockedAchievements: string[];
  decisionHistory: string[];
  activeTriggers: string[];
  isPausedForEvent: boolean;
  needsSync: boolean;
  axisEtico?: number;
  axisFiscal?: number;
  axisLegal?: number;
  axisPedagogico?: number;
  reservaCriada?: boolean;
  pressaoPoliticaRecusada?: number;
  omissaoUrgencia?: number;
  opcaoCriativa?: number;
  combosAtivados?: number;
  totalEquivoco?: number;
}

export interface RankEntry {
  name: string;
  score: number;
  tag: string;
  av: string;
  you?: boolean;
}

export interface Achievement {
  icon: string;
  name: string;
  desc: string;
  cond: (s: GameState) => boolean;
}

export interface LearningTrack {
  id: string;
  title: string;
  icon_name: string;
  required_level: number;
}

export interface Quiz {
  id: string;
  track_id: string;
  question_text: string;
  explanation: string;
  xp_reward: number;
}

export interface QuizOption {
  id: string;
  quiz_id: string;
  option_text: string;
  is_correct: boolean;
}

export interface UserQuizProgress {
  user_id: string;
  quiz_id: string;
  is_completed: boolean;
}
