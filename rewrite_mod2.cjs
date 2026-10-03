const fs = require('fs');

const ptNew = `      [
        {
          id: "M2F4C1",
          tipo: "URGÊNCIA_JUDICIAL",
          icon: "⚖️",
          color: "#0B1120",
          badge: "URGÊNCIA JUDICIAL",
          badgeColor: "#EF4444",
          badgeTxt: "#FFFFFF",
          title: "Prazo de 72h para dispositivo de CAA",
          sub: "A Liminar",
          body: "Uma família obteve liminar judicial exigindo fornecimento imediato de dispositivo de Comunicação Aumentativa e Alternativa (CAA) para aluno com TEA não verbal. Custo do equipamento: R$28.000. Prazo judicial: 72 horas. Não há previsão orçamentária para este item.",
          prazoHoras: 72,
          custoQSD: 28000,
          baseConceitual: "LBI Art. 3 III — Tecnologia Assistiva como recurso de acessibilidade. Res. CNE/CEB 4/2009 Art. 3 — recursos de comunicação alternativa.",
          consequenciaLateral: "Se ignorado, CENÁRIO IMPREVISTO 'Multa diária acumulada' é disparado, comprometendo o orçamento em dobro.",
          perguntaDebriefing: "Qual é o custo-benefício real de recorrer de uma liminar de direito à educação especial em comparação a uma solução célere e definitiva?",
          opts: [
            {
              l: "A",
              txt: "Adquirir o equipamento por dispensa de licitação emergencial",
              tag: "ÓTIMO",
              type: "good",
              qual: 10,
              sust: -6,
              sc: 130,
              fi: {
                icon: "✅",
                t: "ÓTIMO",
                b: "Dispensa de licitação por urgência é plenamente aplicável aqui. Descumprir liminar gera multa diária superior ao custo do equipamento.",
                baseJuridica: "Lei 8.666/1993 Art. 24 IV — dispensa por urgência. Lei 14.133/2021 Art. 75 VIII.",
                cls: "good",
                qual: "+10%",
                sust: "-6%",
                pts: "+130",
              }
            },
            {
              l: "B",
              txt: "Recorrer da liminar por falta de orçamento",
              tag: "ARRISCADO",
              type: "mid",
              qual: -5,
              sust: 2,
              sc: 35,
              fi: {
                icon: "⚡",
                t: "Risco alto",
                b: "Recorrer sem base técnica consistente aumenta a exposição judicial do gestor e agrava o litígio.",
                baseJuridica: "Art. 5º, § 1º, LDB e CF/88 Art. 208 - O dever do Estado com a educação efetiva-se mediante garantia de acesso.",
                cls: "mid",
                qual: "-5%",
                sust: "+2%",
                pts: "+35",
              }
            },
            {
              l: "C",
              txt: "Aguardar a próxima reunião de orçamento",
              tag: "GRAVE ERRO",
              type: "bad",
              qual: -20,
              sust: -8,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "Erro grave!",
                b: "Ignorar ordem judicial caracteriza crime de desobediência e gera multa pessoal além de agravar a liminar.",
                baseJuridica: "Código Penal Art. 330 (Crime de Desobediência); Lei de Improbidade Administrativa Art. 11, II.",
                cls: "bad",
                qual: "-20%",
                sust: "-8%",
                pts: "+0",
              }
            }
          ]
        },
        {
          id: "M2F4C2",
          tipo: "INFRAESTRUTURA_E_LEI",
          icon: "🏫",
          color: "#1a1a3a",
          badge: "ACESSIBILIDADE",
          badgeColor: "#0d0d2a",
          badgeTxt: "#9b59b6",
          title: "Rampas de acessibilidade",
          sub: "3 escolas irregulares",
          body: "Custo total: R$45k. Disponível no orçamento: R$30k. As escolas receberam notificação do Ministério Público para adequação imediata.",
          prazoHoras: 240,
          custoQSD: 45000,
          baseConceitual: "Decreto 5.296/2004 (Desenho Universal) e LBI Art. 24 (Acessibilidade nas edificações públicas).",
          consequenciaLateral: "Se usar Fundeb incorretamente, o Tribunal de Contas pode reprovar as contas e bloquear repasses no Módulo 3.",
          perguntaDebriefing: "Quando o orçamento é insuficiente, como comprovar ao MP que a gestão está agindo de boa-fé e não sendo omissa?",
          opts: [
            {
              l: "A",
              txt: "Executar urgências com 30k e buscar emenda pro resto",
              tag: "PLANEJADO",
              type: "good",
              qual: 8,
              sust: 5,
              sc: 85,
              fi: {
                icon: "✅",
                t: "Gestão estratégica!",
                b: "Priorizar por gravidade demonstra ação ao MP, evitando dolo e ganhando tempo para o restante.",
                baseJuridica: "Princípio da Reserva do Possível mitigado (STF) - é preciso demonstrar planejamento progressivo.",
                cls: "good",
                qual: "+8%",
                sust: "+5%",
                pts: "+85",
              }
            },
            {
              l: "B",
              txt: "Remanejar do Fundeb para cobrir tudo",
              tag: "CUIDADO",
              type: "mid",
              qual: 10,
              sust: -10,
              sc: 45,
              fi: {
                icon: "⚠️",
                t: "Cuidado jurídico",
                b: "Usar Fundeb para infraestrutura básica requer muita cautela. Sem parecer técnico, o TCE glosará as contas.",
                baseJuridica: "Lei 14.113/2020 (Novo Fundeb) - Despesas de manutenção e desenvolvimento do ensino (Art. 70 e 71 LDB).",
                cls: "mid",
                qual: "+10%",
                sust: "-10%",
                pts: "+45",
              }
            },
            {
              l: "C",
              txt: "Aguardar próximo ano",
              tag: "OMISSÃO",
              type: "bad",
              qual: -12,
              sust: 3,
              sc: 15,
              fi: {
                icon: "❌",
                t: "Omissão",
                b: "Manter barreiras frente a uma notificação é violação direta, passível de Termo de Ajustamento de Conduta forçado.",
                baseJuridica: "LBI Art. 88 (Crime: obstar acesso a qualquer prédio por motivo de deficiência).",
                cls: "bad",
                qual: "-12%",
                sust: "+3%",
                pts: "+15",
              }
            }
          ]
        },
        {
          id: "M2F5C1",
          tipo: "PRESSÃO_POLÍTICA",
          icon: "🗳️",
          color: "#0B1120",
          badge: "PRESSÃO POLÍTICA",
          badgeColor: "#F59E0B",
          badgeTxt: "#FFFFFF",
          title: "Vereador e a lista de espera",
          sub: "Dilema Ético",
          body: "O vereador da base aliada do prefeito liga pessoalmente pedindo que o filho de um eleitor importante seja incluído na lista de atendimento de Tecnologia Assistiva — pulando 14 alunos que aguardam há mais tempo. Você tem 24h para responder.",
          prazoHoras: 24,
          custoQSD: 0,
          baseConceitual: "Gestão pública orientada pelos princípios constitucionais da Administração (LIMPE) e Política Nacional de Educação Especial.",
          consequenciaLateral: "Ceder à pressão reduz o indicador de sustentabilidade institucional permanente; MP pode investigar denúncia anônima.",
          perguntaDebriefing: "A quem pertence a escola pública e como proteger a equipe técnica da ingerência político-partidária?",
          opts: [
            {
              l: "A",
              txt: "Recusar: informar que a lista segue critério técnico e não admite exceções",
              tag: "ÓTIMO",
              type: "good",
              qual: 6,
              sust: 4,
              sc: 150,
              fi: {
                icon: "✅",
                t: "ÓTIMO",
                b: "Decisão ética e correta. Documente a recusa e o critério usado. A lista técnica protege a gestão contra acusações de favorecimento.",
                baseJuridica: "CF/88 Art. 37 (Princípio da Impessoalidade e Moralidade).",
                cls: "good",
                qual: "+6%",
                sust: "+4%",
                pts: "+150",
              }
            },
            {
              l: "B",
              txt: "Atender o pedido para evitar atritos políticos",
              tag: "GRAVE ERRO",
              type: "bad",
              qual: -20,
              sust: -10,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "Improbidade Administrativa!",
                b: "Pular a fila fere a impessoalidade e pode gerar processos graves e representações no Ministério Público.",
                baseJuridica: "Lei 8.429/1992 (Lei de Improbidade Administrativa) Art. 11.",
                cls: "bad",
                qual: "-20%",
                sust: "-10%",
                pts: "+0",
              }
            },
            {
              l: "C",
              txt: "Oferecer um equipamento provisório fora da fila",
              tag: "ARRISCADO",
              type: "mid",
              qual: -5,
              sust: -8,
              sc: 30,
              fi: {
                icon: "⚠️",
                t: "Favorecimento disfarçado",
                b: "Mesmo sendo provisório, caracteriza tratamento privilegiado por motivo não técnico, incorrendo nos mesmos riscos legais.",
                baseJuridica: "LBI Art. 4 e CF/88 Art. 37 - Uso da máquina pública para fins privados.",
                cls: "mid",
                qual: "-5%",
                sust: "-8%",
                pts: "+30",
              }
            }
          ]
        }
      ]
    ],`;

const enNew = `      [
        {
          id: "M2F4C1",
          tipo: "JUDICIAL_URGENCY",
          icon: "⚖️",
          color: "#0B1120",
          badge: "JUDICIAL URGENCY",
          badgeColor: "#EF4444",
          badgeTxt: "#FFFFFF",
          title: "72h Deadline for AAC device",
          sub: "The Injunction",
          body: "A family obtained a court injunction demanding immediate provision of an Augmentative and Alternative Communication (AAC) device for a non-verbal ASD student. Equipment cost: $28,000. Judicial deadline: 72 hours. There is no budget forecast for this item.",
          prazoHoras: 72,
          custoQSD: 28000,
          baseConceitual: "LBI Art. 3 III — Assistive Technology as an accessibility resource. Res. CNE/CEB 4/2009 Art. 3.",
          consequenciaLateral: "If ignored, UNFORESEEN SCENARIO 'Accumulated daily fine' is triggered, compromising the budget doubly.",
          perguntaDebriefing: "What is the real cost-benefit of appealing a special education rights injunction compared to a swift resolution?",
          opts: [
            {
              l: "A",
              txt: "Acquire the equipment through emergency bidding waiver",
              tag: "OPTIMAL",
              type: "good",
              qual: 10,
              sust: -6,
              sc: 130,
              fi: {
                icon: "✅",
                t: "OPTIMAL",
                b: "Emergency bidding waiver is fully applicable here. Failing to comply with the injunction generates a daily fine.",
                baseJuridica: "Law 8.666/1993 Art. 24 IV — emergency waiver. Law 14.133/2021 Art. 75 VIII.",
                cls: "good",
                qual: "+10%",
                sust: "-6%",
                pts: "+130",
              }
            },
            {
              l: "B",
              txt: "Appeal the injunction due to lack of budget",
              tag: "RISKY",
              type: "mid",
              qual: -5,
              sust: 2,
              sc: 35,
              fi: {
                icon: "⚡",
                t: "High Risk",
                b: "Appealing without solid technical ground increases judicial exposure and worsens the dispute.",
                baseJuridica: "Art. 5º, § 1º, LDB and CF/88 Art. 208 - State duty with education implies guaranteed access.",
                cls: "mid",
                qual: "-5%",
                sust: "+2%",
                pts: "+35",
              }
            },
            {
              l: "C",
              txt: "Wait for the next school year to include it in the planning",
              tag: "GRAVE MISTAKE",
              type: "bad",
              qual: -20,
              sust: -8,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "Grave Mistake!",
                b: "Ignoring a court order is a crime of disobedience and generates a personal fine.",
                baseJuridica: "Penal Code Art. 330 (Crime of Disobedience); Administrative Improbity Law Art. 11, II.",
                cls: "bad",
                qual: "-20%",
                sust: "-8%",
                pts: "+0",
              }
            }
          ]
        },
        {
          id: "M2F4C2",
          tipo: "INFRASTRUCTURE_AND_LAW",
          icon: "🏫",
          color: "#1a1a3a",
          badge: "ACCESSIBILITY",
          badgeColor: "#0d0d2a",
          badgeTxt: "#9b59b6",
          title: "Ramps Installation",
          sub: "3 irregular schools",
          body: "Total cost: $45k. Available budget: $30k. The schools received a notification from the Public Ministry for immediate adjustment.",
          prazoHoras: 240,
          custoQSD: 45000,
          baseConceitual: "Decree 5.296/2004 (Universal Design) and LBI Art. 24 (Accessibility in public buildings).",
          consequenciaLateral: "If Fundeb is used incorrectly, the Court of Accounts may reject the accounts and block transfers in Module 3.",
          perguntaDebriefing: "When the budget is insufficient, how do you prove to the PM that management is acting in good faith?",
          opts: [
            {
              l: "A",
              txt: "Do urgent ones with 30k, seek amendments",
              tag: "PLANNED",
              type: "good",
              qual: 8,
              sust: 5,
              sc: 85,
              fi: {
                icon: "✅",
                t: "Strategic!",
                b: "Prioritizing by severity demonstrates action to the PM, avoiding malice and buying time.",
                baseJuridica: "Principle of the Reserve of the Possible mitigated (STF) - requires demonstrating progressive planning.",
                cls: "good",
                qual: "+8%",
                sust: "+5%",
                pts: "+85",
              }
            },
            {
              l: "B",
              txt: "Reallocate funds to cover all",
              tag: "CAREFUL",
              type: "mid",
              qual: 10,
              sust: -10,
              sc: 45,
              fi: {
                icon: "⚠️",
                t: "Legal care",
                b: "Using basic funds for infrastructure requires caution. Without a technical report, it triggers audits.",
                baseJuridica: "Law 14.113/2020 (New Fundeb) - Maintenance and development of education expenses (Art. 70 LDB).",
                cls: "mid",
                qual: "+10%",
                sust: "-10%",
                pts: "+45",
              }
            },
            {
              l: "C",
              txt: "Wait for next year",
              tag: "OMISSION",
              type: "bad",
              qual: -12,
              sust: 3,
              sc: 15,
              fi: {
                icon: "❌",
                t: "Omission",
                b: "Maintaining barriers after a notification is a direct violation.",
                baseJuridica: "LBI Art. 88 (Crime: obstructing access to any building due to disability).",
                cls: "bad",
                qual: "-12%",
                sust: "+3%",
                pts: "+15",
              }
            }
          ]
        },
        {
          id: "M2F5C1",
          tipo: "POLITICAL_PRESSURE",
          icon: "🗳️",
          color: "#0B1120",
          badge: "POLITICAL PRESSURE",
          badgeColor: "#F59E0B",
          badgeTxt: "#FFFFFF",
          title: "Councilor and the waitlist",
          sub: "Ethical Dilemma",
          body: "A city councilor calls personally asking that the child of an important constituent be included in the Assistive Technology list — skipping 14 students. You have 24h to respond.",
          prazoHoras: 24,
          custoQSD: 0,
          baseConceitual: "Public management guided by the constitutional principles of Administration (LIMPE).",
          consequenciaLateral: "Yielding to pressure reduces institutional sustainability; PM may investigate anonymous complaints.",
          perguntaDebriefing: "Who does the public school belong to and how do you protect the technical team from political interference?",
          opts: [
            {
              l: "A",
              txt: "Refuse: inform that the list follows technical criteria and allows no exceptions",
              tag: "OPTIMAL",
              type: "good",
              qual: 6,
              sust: 4,
              sc: 150,
              fi: {
                icon: "✅",
                t: "OPTIMAL",
                b: "Ethical and legally correct decision. The technical list protects the manager from future accusations.",
                baseJuridica: "CF/88 Art. 37 (Principle of Impartiality and Morality).",
                cls: "good",
                qual: "+6%",
                sust: "+4%",
                pts: "+150",
              }
            },
            {
              l: "B",
              txt: "Fulfill the request to avoid political friction",
              tag: "GRAVE MISTAKE",
              type: "bad",
              qual: -20,
              sust: -10,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "Administrative Misconduct!",
                b: "Skipping the queue violates the principle of impartiality and can generate serious processes.",
                baseJuridica: "Law 8.429/1992 (Administrative Improbity Law) Art. 11.",
                cls: "bad",
                qual: "-20%",
                sust: "-10%",
                pts: "+0",
              }
            },
            {
              l: "C",
              txt: "Offer temporary equipment outside the waitlist",
              tag: "RISKY",
              type: "mid",
              qual: -5,
              sust: -8,
              sc: 30,
              fi: {
                icon: "⚠️",
                t: "Disguised favoritism",
                b: "Even if it is temporary, it still characterizes privileged treatment.",
                baseJuridica: "LBI Art. 4 and CF/88 Art. 37 - Use of public machinery for private ends.",
                cls: "mid",
                qual: "-5%",
                sust: "-8%",
                pts: "+30",
              }
            }
          ]
        }
      ]
    ],`;

const esNew = `      [
        {
          id: "M2F4C1",
          tipo: "URGENCIA_JUDICIAL",
          icon: "⚖️",
          color: "#0B1120",
          badge: "URGENCIA JUDICIAL",
          badgeColor: "#EF4444",
          badgeTxt: "#FFFFFF",
          title: "Plazo de 72h para dispositivo de CAA",
          sub: "La Medida Cautelar",
          body: "Una familia obtuvo una medida cautelar exigiendo provisión inmediata de dispositivo de Comunicación Aumentativa y Alternativa (CAA) para alumno con TEA no verbal. Costo: $28,000. Plazo judicial: 72 horas. No hay presupuesto para este ítem.",
          prazoHoras: 72,
          custoQSD: 28000,
          baseConceitual: "LBI Art. 3 III — Tecnología Asistiva como recurso de accesibilidad. Res. CNE/CEB 4/2009 Art. 3.",
          consequenciaLateral: "Si se ignora, ESCENARIO IMPREVISTO 'Multa diaria acumulada' se dispara, comprometiendo el presupuesto doblemente.",
          perguntaDebriefing: "¿Cuál es el costo-beneficio real de apelar una medida de derecho a la educación especial en comparación con una solución rápida?",
          opts: [
            {
              l: "A",
              txt: "Adquirir el equipo por dispensa de licitación de emergencia",
              tag: "ÓPTIMO",
              type: "good",
              qual: 10,
              sust: -6,
              sc: 130,
              fi: {
                icon: "✅",
                t: "ÓPTIMO",
                b: "La dispensa de licitación por urgencia es plenamente aplicable aquí. Incumplir genera multa diaria mayor al costo.",
                baseJuridica: "Ley 8.666/1993 Art. 24 IV — dispensa por urgencia. Ley 14.133/2021 Art. 75 VIII.",
                cls: "good",
                qual: "+10%",
                sust: "-6%",
                pts: "+130",
              }
            },
            {
              l: "B",
              txt: "Apelar la medida cautelar por falta de presupuesto",
              tag: "ARRIESGADO",
              type: "mid",
              qual: -5,
              sust: 2,
              sc: 35,
              fi: {
                icon: "⚡",
                t: "Alto Riesgo",
                b: "Apelar sin base técnica consistente aumenta la exposición judicial del gestor y empeora el litigio.",
                baseJuridica: "Art. 5º, § 1º, LDB y CF/88 Art. 208 - El deber del Estado con la educación implica garantía de acceso.",
                cls: "mid",
                qual: "-5%",
                sust: "+2%",
                pts: "+35",
              }
            },
            {
              l: "C",
              txt: "Esperar al próximo año lectivo para incluir en planeamiento",
              tag: "GRAVE ERROR",
              type: "bad",
              qual: -20,
              sust: -8,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "¡Error grave!",
                b: "Ignorar orden judicial es delito de desobediencia y genera multas personales.",
                baseJuridica: "Código Penal Art. 330 (Delito de Desobediencia); Ley de Improbidad Administrativa Art. 11, II.",
                cls: "bad",
                qual: "-20%",
                sust: "-8%",
                pts: "+0",
              }
            }
          ]
        },
        {
          id: "M2F4C2",
          tipo: "INFRAESTRUCTURA_Y_LEY",
          icon: "🏫",
          color: "#1a1a3a",
          badge: "ACCESIBILIDAD",
          badgeColor: "#0d0d2a",
          badgeTxt: "#9b59b6",
          title: "Rampas de acceso",
          sub: "3 escuelas irregulares",
          body: "Costo total: $45k. Disponible: $30k. Las escuelas recibieron notificación del Ministerio Público para adecuación inmediata.",
          prazoHoras: 240,
          custoQSD: 45000,
          baseConceitual: "Decreto 5.296/2004 (Diseño Universal) y LBI Art. 24 (Accesibilidad en edificios públicos).",
          consequenciaLateral: "Si se usa Fundeb incorrectamente, el Tribunal de Cuentas puede rechazar las cuentas y bloquear fondos.",
          perguntaDebriefing: "Cuando el presupuesto es insuficiente, ¿cómo se demuestra al MP que la gestión actúa de buena fe?",
          opts: [
            {
              l: "A",
              txt: "Hacer urgentes con 30k, buscar enmiendas",
              tag: "PLANEADO",
              type: "good",
              qual: 8,
              sust: 5,
              sc: 85,
              fi: {
                icon: "✅",
                t: "¡Estratégico!",
                b: "Priorizar por gravedad demuestra acción al MP, evitando negligencia y ganando tiempo.",
                baseJuridica: "Principio de la Reserva de lo Posible mitigado (STF) - requiere demostrar planificación progresiva.",
                cls: "good",
                qual: "+8%",
                sust: "+5%",
                pts: "+85",
              }
            },
            {
              l: "B",
              txt: "Reubicar fondos para todas",
              tag: "CUIDADO",
              type: "mid",
              qual: 10,
              sust: -10,
              sc: 45,
              fi: {
                icon: "⚠️",
                t: "Cuidado legal",
                b: "Usar fondos básicos para infraestructura requiere mucha cautela. Sin informe técnico, atrae auditorías.",
                baseJuridica: "Ley 14.113/2020 (Nuevo Fundeb) - Gastos de mantenimiento y desarrollo (Art. 70 LDB).",
                cls: "mid",
                qual: "+10%",
                sust: "-10%",
                pts: "+45",
              }
            },
            {
              l: "C",
              txt: "Aguardar próximo año",
              tag: "OMISIÓN",
              type: "bad",
              qual: -12,
              sust: 3,
              sc: 15,
              fi: {
                icon: "❌",
                t: "Omisión",
                b: "Mantener barreras frente a una notificación es una violación directa.",
                baseJuridica: "LBI Art. 88 (Delito: obstruir el acceso a cualquier edificio por motivo de discapacidad).",
                cls: "bad",
                qual: "-12%",
                sust: "+3%",
                pts: "+15",
              }
            }
          ]
        },
        {
          id: "M2F5C1",
          tipo: "PRESIÓN_POLÍTICA",
          icon: "🗳️",
          color: "#0B1120",
          badge: "PRESIÓN POLÍTICA",
          badgeColor: "#F59E0B",
          badgeTxt: "#FFFFFF",
          title: "El Concejal y la lista de espera",
          sub: "Dilema Ético",
          body: "Un concejal llama personalmente pidiendo que el hijo de un votante importante sea incluido en la lista de atención de Tecnología Asistiva — saltando a 14 alumnos. Tienes 24h para responder.",
          prazoHoras: 24,
          custoQSD: 0,
          baseConceitual: "Gestión pública guiada por los principios constitucionales de Administración (LIMPE).",
          consequenciaLateral: "Ceder a la presión reduce la sostenibilidad institucional; el MP puede investigar denuncias anónimas.",
          perguntaDebriefing: "¿A quién pertenece la escuela pública y cómo proteger al equipo técnico de la injerencia política?",
          opts: [
            {
              l: "A",
              txt: "Rechazar: informar que la lista sigue criterios técnicos y no admite excepciones",
              tag: "ÓPTIMO",
              type: "good",
              qual: 6,
              sust: 4,
              sc: 150,
              fi: {
                icon: "✅",
                t: "ÓPTIMO",
                b: "Decisión ética y correcta. La lista técnica protege al gestor de futuras acusaciones.",
                baseJuridica: "CF/88 Art. 37 (Principio de Imparcialidad y Moralidad).",
                cls: "good",
                qual: "+6%",
                sust: "+4%",
                pts: "+150",
              }
            },
            {
              l: "B",
              txt: "Atender la petición para evitar fricciones políticas",
              tag: "GRAVE ERROR",
              type: "bad",
              qual: -20,
              sust: -10,
              sc: 0,
              fi: {
                icon: "🚨",
                t: "¡Improbidad Administrativa!",
                b: "Saltar la fila viola el principio de imparcialidad y puede generar procesos graves.",
                baseJuridica: "Ley 8.429/1992 (Ley de Improbidad Administrativa) Art. 11.",
                cls: "bad",
                qual: "-20%",
                sust: "-10%",
                pts: "+0",
              }
            },
            {
              l: "C",
              txt: "Ofrecer un equipo provisional fuera de la fila",
              tag: "ARRIESGADO",
              type: "mid",
              qual: -5,
              sust: -8,
              sc: 30,
              fi: {
                icon: "⚠️",
                t: "Favoritismo Disfrazado",
                b: "Aunque sea provisional, sigue caracterizando un trato privilegiado.",
                baseJuridica: "LBI Art. 4 y CF/88 Art. 37 - Uso de la máquina pública para fines privados.",
                cls: "mid",
                qual: "-5%",
                sust: "-8%",
                pts: "+30",
              }
            }
          ]
        }
      ]
    ],`;

let code = fs.readFileSync('src/dataTranslations.ts', 'utf8');
let lines = code.split('\n');

function replaceModule2(startMarker, newText) {
    let startIdx = -1;
    let endIdx = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(startMarker)) {
            // Find the starting bracket for this module
            for (let j = i; j >= 0; j--) {
                if (lines[j].trim() === '[') {
                    startIdx = j;
                    break;
                }
            }
            break;
        }
    }
    
    if (startIdx !== -1) {
        // Find the ending bracket
        for (let i = startIdx + 1; i < lines.length; i++) {
            if (lines[i].includes('mockRank: [')) {
                endIdx = i - 1; // The `    ],` line
                break;
            }
        }
    }
    
    if (startIdx !== -1 && endIdx !== -1) {
        lines.splice(startIdx, endIdx - startIdx + 1, newText.replace(/\n$/, ''));
        console.log("Replaced successfully for marker: " + startMarker);
    } else {
        console.log("Failed to find bounds for marker: " + startMarker);
    }
}

replaceModule2('badge: "URGÊNCIA JUDICIAL"', ptNew);
replaceModule2('badge: "JUDICIAL URGENCY"', enNew);
replaceModule2('badge: "URGENCIA JUDICIAL"', esNew);

fs.writeFileSync('src/dataTranslations.ts', lines.join('\n'));
