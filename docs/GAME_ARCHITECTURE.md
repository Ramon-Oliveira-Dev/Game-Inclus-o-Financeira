# Arquitetura e Lógica do Jogo - Educação Especial

Este documento detalha o funcionamento interno, o fluxo de dados e as regras de negócio implementadas no simulador de gestão pública de Educação Especial.

## 1. Arquitetura de Estado (State Management)
O estado principal do jogo é gerido pelo hook `useState` na raiz da aplicação (`App.tsx`), consolidado no objeto `gameState`, e persistido localmente via `localStorage`.

### Estrutura do Estado (`GameState`)
```typescript
interface GameState {
  ph: number;           // Phase (Módulo) atual
  sc: number;           // Scenario (Cenário) atual dentro do módulo
  score: number;        // Pontuação atual da partida
  qual: number;         // Porcentagem de Qualidade Pedagógica (0-100)
  sust: number;         // Porcentagem de Sustentabilidade Fiscal (0-100)
  budget: number;       // Orçamento disponível (QSD)
  combo: number;        // Sequência de acertos seguidos
  timerSec: number;     // Contador regressivo do cenário atual
  diff: string;         // Dificuldade ("facil", "medio", "dificil")
  unlockedAchievements: string[]; // Conquistas desbloqueadas na sessão
  // ... outros atributos auxiliares
}
```

### Persistência Front-end
A cada alteração (como responder a um cenário ou mudar de módulo), um `useEffect` no `App.tsx` serializa o estado `gameState` e a aba atual da UI (`currentTab`) em um objeto JSON sob a chave `game_state_data` no `localStorage`. Isso permite que o jogador feche a aba, recarregue a página, e retorne exatamente no mesmo ponto e cenário em que estava, mantendo seus atributos e módulos salvos de maneira "Offline-First".

---

## 2. Fluxo do Core Game Loop (GameScreen)

O ciclo de vida de um cenário é orquestrado no componente `GameScreen.tsx`.

1. **Renderização Inicial**: 
   - Baseado nos índices `ph` e `sc`, os dados do cenário e suas opções são puxados de `data.ts`.
   - O cronômetro (`timerSec`) é iniciado em 30s (ou outro valor dependendo da dificuldade) utilizando um `useEffect` com `setInterval`.
2. **Decisão do Usuário (`handleChoose`)**:
   - O timer pausa. Os áudios de clique e feedback (acerto/erro) são disparados.
   - **Cálculo de Status**: Os atributos `qual` e `sust` são atualizados somando os impactos predefinidos da opção (`opt.qual` e `opt.sust`).
   - **Cálculo de Score**: A pontuação (`opt.sc`) é multiplicada pela dificuldade atual e pelo multiplicador de combo (se aplicável).
   - **Custo Orçamentário**: O custo-base é deduzido de `budget`.
3. **Feedback Visual**: 
   - A UI injeta dinamicamente o painel de *Inline Feedback* imediatamente abaixo da opção clicada. A opção ganha bordas iluminadas (Verde/Bom, Vermelho/Ruim, Amarelo/Neutro) baseadas no impacto. As demais opções ficam cinzas (grayscale).
4. **Avanço (`handleNext`)**: 
   - O botão flutuante "Continuar Jornada" aparece. Ao clicar, o `sc` é incrementado. Se o limite de cenários do módulo for atingido, o `ph` (Módulo) aumenta. O timer reseta e a nova carta sofre a animação de entrada.

---

## 3. Modelagem de Dados (Supabase/DB)

Atualmente, o banco de dados remoto (Supabase) atua de forma leve, focando na Autenticação e Perfil de Ranking global, deixando a mecânica bruta da partida no lado do cliente para zero-latência.

### Tabela `profiles` (Armazenamento Nuvem)
O `AuthContext.tsx` gerencia a tabela `profiles`, sincronizando a pontuação acumulada total:
* `id` (UUID): Chave primária ligada à Auth.
* `nome` (text): Nome do gestor público.
* `municipio` (text): Cidade para representação no Ranking.
* `score_acumulado` (numeric): O XP total somando todas as vitórias passadas.
* `avatar_url` (text): Ícone visual.

O jogo utiliza um padrão "Optimistic Local UI": salva no `localStorage` sob a chave `profile_{id}` primeiro, e realiza um `upsert` silencioso no Supabase via `updateProfile()`.

---

## 4. Gatilhos e Mecânicas Especiais

O código-fonte (principalmente `GameScreen.tsx`) já abriga várias "regras invisíveis" que afetam a partida dinamicamente:

### 1. Cenários Imprevistos
Eventos aleatórios ou roteirizados disparam no início de um módulo. Implementado via `useEffect`:
- **Regra**: Se `timerSec` está cheio e o módulo for > 0, o sistema exibe um Modal de Overaly Crítico ("Corte de FUNDEB", "Liminar").
- **Mecânica**: O jogador é forçado a clicar em "Assumir Consequência", resultando na redução instantânea de caixa (QSD) antes mesmo de ler a carta atual.

### 2. Efeito Cascata (Lógica Eliasiana / Penalidade Fiscal)
Implementada na função `handleChoose`:
- **Regra**: Se a Sustentabilidade Fiscal do jogador estiver em estado Crítico (abaixo de 30%) e ele selecionar uma opção que gaste recursos (`opt.sust < 0`), uma penalidade é acionada.
- **Mecânica**: O custo em Orçamento (`budgetCost`) sofre um multiplicador automático de `1.5x` (a dívida fica mais cara devido ao risco administrativo).

### 3. Timer Regressivo Punitive
- **Mecânica**: Se o tempo acabar antes da resposta (chegar a 0), um gatilho obriga o sistema a auto-selecionar a opção de **pior pontuação** daquele cenário (`minSc`), forçando o jogador a pensar rápido. Além disso, as cores da UI e pulsação mudam progressivamente (azul -> amarelo -> vermelho intermitente).

### 4. Sistema de Conquistas em Tempo Real
- **Mecânica**: Um loop oculto (Listener `useEffect`) avalia as condições booleanas no array `getAllAch()`. Ex: Se `gameState.qual >= 90`, o sistema automaticamente empurra a badge para o estado `unlockedAchievements` e exibe o popup em tela.
