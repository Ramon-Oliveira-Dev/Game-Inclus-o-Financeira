// Auto-generated complete translations for all 50 game scenarios in EN and ES
export interface CardTranslation {
  title: string;
  sub: string;
  body: string;
  badge?: string;
  perguntaDebriefing?: string;
  opts: {
    txt: string;
    tag: string;
    fb: string;
    fi?: {
      t?: string;
      b?: string;
      baseJuridica?: string;
    };
  }[];
  debrief: {
    title: string;
    question: string;
    hint: string;
    legalBase: string;
  };
}

export const cardTranslations: Record<string, { en: CardTranslation; es: CardTranslation }> = {
  "M1F1C1": {
    "en": {
      "title": "Wheelchair Requests",
      "sub": "LBI Art. 3 III — AAC and Mobility as Assistive Technology",
      "body": "Five families request customized wheelchairs for students with cerebral palsy. Total cost: $18,000. Current budget for Assistive Tech: $12,000. Reallocating from general teacher training would cover the deficit.",
      "opts": [
        {
          "txt": "Reallocate budget from general training to purchase all 5 wheelchairs",
          "tag": "OPTIMAL",
          "fb": "Guarantees immediate physical accessibility and rights compliance, prioritizing direct student mobility."
        },
        {
          "txt": "Purchase 3 wheelchairs now and place the remaining 2 on a waitlist",
          "tag": "SUBOPTIMAL",
          "fb": "Partially resolves the issue but leaves two students without essential mobility equipment, exposing the city to legal challenges."
        },
        {
          "txt": "Reject the request citing lack of budget funds",
          "tag": "CRITICAL",
          "fb": "Violates constitutional rights to education and mobility, causing severe pedagogical harm and risk of judicial penalties."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Mobility and Rights",
        "question": "How should a public manager handle Assistive Technology demands when budget limits are reached?",
        "hint": "Consider legal priorities under the Inclusion Law (LBI) and budget flexibility mechanisms.",
        "legalBase": "LBI (Law 13.146/2015) Art. 3 III establishes Assistive Tech as a mandatory right to ensure independence and social inclusion."
      }
    },
    "es": {
      "title": "Solicitudes de Sillas de Ruedas",
      "sub": "LBI Art. 3 III — CAA y Movilidad como Tecnología Asistiva",
      "body": "Cinco familias solicitan sillas de ruedas personalizadas para alumnos con parálisis cerebral. Costo total: $18.000. Presupuesto actual para TA: $12.000. Reasignar fondos de capacitación docente cubriría el déficit.",
      "opts": [
        {
          "txt": "Reasignar presupuesto de capacitación general para comprar las 5 sillas",
          "tag": "ÓPTIMO",
          "fb": "Garantiza la accesibilidad física inmediata y el cumplimiento de derechos, priorizando la movilidad estudiantil directa."
        },
        {
          "txt": "Comprar 3 sillas ahora y poner las 2 restantes en lista de espera",
          "tag": "SUBÓPTIMO",
          "fb": "Resuelve parcialmente el problema pero deja a dos alumnos sin equipo esencial, exponiendo al municipio a demandas."
        },
        {
          "txt": "Rechazar la solicitud alegando falta de previsión presupuestaria",
          "tag": "CRÍTICO",
          "fb": "Viola los derechos constitucionales a la educación y movilidad, causando grave perjuicio pedagógico y riesgo de sanciones."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Movilidad y Derechos",
        "question": "¿Cómo debe actuar el gestor público ante demandas de Tecnología Asistiva cuando se alcanza el límite presupuestario?",
        "hint": "Considere las prioridades legales bajo la Ley de Inclusión (LBI) y los mecanismos de flexibilidad presupuestaria.",
        "legalBase": "LBI (Ley 13.146/2015) Art. 3 III establece la TA como un derecho obligatorio para asegurar la independencia e inclusión social."
      }
    }
  },
  "M1F1C2": {
    "en": {
      "title": "Free Special Education (AEE) Training",
      "sub": "LDB Art. 59 III — Special Education Teacher Qualification",
      "body": "The Federal University offers 40 free spots for Special Education (AEE) specialization. Requires releasing teachers for 4 hours a week during class hours, needing temporary substitutes ($5,000 total).",
      "opts": [
        {
          "txt": "Approve teacher release and fund temporary substitutes",
          "tag": "OPTIMAL",
          "fb": "Invests in long-term specialized teaching quality while maintaining daily classroom continuity."
        },
        {
          "txt": "Authorize only if teachers take the training outside school hours",
          "tag": "SUBOPTIMAL",
          "fb": "Reduces financial costs but decreases teacher enrollment and causes professional burnout."
        },
        {
          "txt": "Decline the partnership to avoid substitute costs",
          "tag": "CRITICAL",
          "fb": "Misses an extraordinary high-return qualification opportunity for municipal education staff."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Professional Qualification",
        "question": "Why is continuous teacher training in Special Education a high-yield investment?",
        "hint": "Reflect on how qualified staff improve overall inclusion outcomes and lower future intervention costs.",
        "legalBase": "LDB Art. 59 III mandates that education systems ensure qualified specialists for inclusive classroom support."
      }
    },
    "es": {
      "title": "Capacitación AEE Gratuita",
      "sub": "LDB Art. 59 III — Cualificación Docente para Educación Especial",
      "body": "La Universidad Federal ofrece 40 cupos gratuitos para especialización en AEE. Requiere liberar docentes 4h/semana en horario de clase, necesitando sustitutos temporales ($5.000 total).",
      "opts": [
        {
          "txt": "Aprobar la liberación docente y financiar sustitutos temporales",
          "tag": "ÓPTIMO",
          "fb": "Invierte en la calidad de la enseñanza especializada a largo plazo garantizando la continuidad en el aula."
        },
        {
          "txt": "Autorizar solo si los docentes se capacitan fuera del horario laboral",
          "tag": "SUBÓPTIMO",
          "fb": "Reduce costos inmediatos pero desmotiva la participación y genera desgaste profesional."
        },
        {
          "txt": "Rechazar la alianza para evitar costos de sustitución",
          "tag": "CRÍTICO",
          "fb": "Desaprovecha una oportunidad extraordinaria de cualificación docente de alto retorno para la red municipal."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Cualificación Profesional",
        "question": "¿Por qué la capacitación continua en Educación Especial es una inversión de alto rendimiento?",
        "hint": "Reflexione sobre cómo el personal calificado mejora los resultados inclusivos y reduce costos de intervención futura.",
        "legalBase": "LDB Art. 59 III exige que los sistemas de enseñanza garanticen profesores con especialización adecuada para AEE."
      }
    }
  },
  "M1F1C3": {
    "en": {
      "title": "School Accessibility Ramp Bidding",
      "sub": "Decree 5.296/2004 — NBR 9050 Architectural Accessibility Standards",
      "body": "Bidding for accessibility ramps in 3 schools came in at $45,000 (budget limit: $30,000). Winning proposal meets all NBR 9050 technical safety standards. Second offer ($28,000) ignores slope guidelines.",
      "opts": [
        {
          "txt": "Request a budget supplement to build fully compliant NBR 9050 ramps",
          "tag": "OPTIMAL",
          "fb": "Ensures structural safety and full compliance with technical accessibility codes, preventing physical injury risks."
        },
        {
          "txt": "Build ramps in only 2 schools following full technical compliance",
          "tag": "SUBOPTIMAL",
          "fb": "Maintains safety standards but leaves one school inaccessible, delaying complete inclusion."
        },
        {
          "txt": "Accept the cheaper non-compliant proposal to fit the current budget",
          "tag": "CRITICAL",
          "fb": "Violates national engineering accessibility codes, putting student safety at risk and inviting legal sanctions."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Physical Accessibility Standards",
        "question": "What are the legal and practical consequences of accepting non-compliant accessibility works?",
        "hint": "Consider structural safety standards and liability under Decree 5.296/2004.",
        "legalBase": "NBR 9050 and Decree 5.296/2004 mandate mandatory slope and width standards for public educational facilities."
      }
    },
    "es": {
      "title": "Licitación de Rampas de Accesibilidad",
      "sub": "Decreto 5.296/2004 — NBR 9050 Normas de Accesibilidad Arquitectónica",
      "body": "La licitación para rampas de accesibilidad en 3 escuelas resultó en $45.000 (límite presupuestario: $30.000). La propuesta ganadora cumple todas las normas de seguridad NBR 9050. La segunda oferta ($28.000) ignora las normas de pendiente.",
      "opts": [
        {
          "txt": "Solicitar un suplemento presupuestario para construir rampas con norma NBR 9050",
          "tag": "ÓPTIMO",
          "fb": "Garantiza la seguridad estructural y el cumplimiento total de los códigos de accesibilidad, evitando riesgos de accidentes."
        },
        {
          "txt": "Construir rampas en solo 2 escuelas siguiendo el cumplimiento técnico completo",
          "tag": "SUBÓPTIMO",
          "fb": "Mantiene los estándares de seguridad pero deja una escuela inaccesible, retrasando la inclusión integral."
        },
        {
          "txt": "Aceptar la propuesta más barata sin cumplimiento para ajustarse al presupuesto",
          "tag": "CRÍTICO",
          "fb": "Viola las normas nacionales de ingeniería y accesibilidad, poniendo en riesgo la seguridad y generando sanciones."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Normas de Accesibilidad Física",
        "question": "¿Cuáles son las consecuencias legales y prácticas de aceptar obras de accesibilidad antirreglamentarias?",
        "hint": "Considere las normas de seguridad estructural y la responsabilidad bajo el Decreto 5.296/2004.",
        "legalBase": "La NBR 9050 y el Decreto 5.296/2004 establecen parámetros obligatorios de pendiente y ancho en edificios públicos."
      }
    }
  },
  "M1F1C4": {
    "en": {
      "title": "Support Professionals (Caregivers)",
      "sub": "LBI Art. 28 XVII — Support Professional for Personal Care & Hygiene",
      "body": "12 students with severe motor disabilities need support professionals for feeding and hygiene. Hiring costs $36,000/year. Current budget allocates only $20,000.",
      "opts": [
        {
          "txt": "Request emergency budget reallocation to contract all required support staff",
          "tag": "OPTIMAL",
          "fb": "Upholds dignity and personal care rights under LBI Art. 28, enabling full school participation."
        },
        {
          "txt": "Hire caregivers for part-time hours across schools",
          "tag": "SUBOPTIMAL",
          "fb": "Provides intermittent assistance that leaves students unattended during critical periods."
        },
        {
          "txt": "Ask student families to provide their own private caregivers at school",
          "tag": "CRITICAL",
          "fb": "Illegally transfers public education responsibility onto families, violating LBI explicit prohibitions."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Support Professionals",
        "question": "When is a support professional legally required, and who bears the cost?",
        "hint": "Analyze the difference between pedagogical support and personal care assistance.",
        "legalBase": "LBI Art. 28 XVII specifies that support staff for hygiene and mobility must be provided free of charge by the public system."
      }
    },
    "es": {
      "title": "Profesionales de Apoyo (Cuidadores)",
      "sub": "LBI Art. 28 XVII — Profesional de Apoyo para Cuidado Personal e Higiene",
      "body": "12 estudiantes con discapacidad motora grave necesitan profesionales de apoyo para alimentación e higiene. La contratación cuesta $36.000/año. El presupuesto actual asigna solo $20.000.",
      "opts": [
        {
          "txt": "Solicitar reasignación presupuestaria de emergencia para contratar todo el personal",
          "tag": "ÓPTIMO",
          "fb": "Defiende la dignidad y los derechos de atención personal bajo la LBI Art. 28, permitiendo la asistencia escolar completa."
        },
        {
          "txt": "Contratar cuidadores a tiempo parcial compartidos entre escuelas",
          "tag": "SUBÓPTIMO",
          "fb": "Ofrece asistencia intermitente que deja a los estudiantes desatendidos durante periodos críticos."
        },
        {
          "txt": "Pedir a las familias que provean sus propios cuidadores privados en la escuela",
          "tag": "CRÍTICO",
          "fb": "Transfiere ilegalmente la responsabilidad de la educación pública a las familias, violando prohibiciones expresas de la LBI."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Profesionales de Apoyo",
        "question": "¿Cuándo es obligatorio un profesional de apoyo y quién debe asumir el costo?",
        "hint": "Analice la diferencia entre apoyo pedagógico y asistencia en el cuidado personal.",
        "legalBase": "El Art. 28 XVII de la LBI especifica que el personal de apoyo para higiene y movilidad debe ser provisto gratuitamente por el estado."
      }
    }
  },
  "M1F1C5": {
    "en": {
      "title": "Didactic Material: Adapted vs. Universal",
      "sub": "LBI Art. 28 III — Universal Design for Learning (UDL)",
      "body": "Choice between buying specific adapted kits for 15 blind students ($15,000) or acquiring Universal Design learning software for all 200 Special Ed students ($35,000).",
      "opts": [
        {
          "txt": "Combine budget to secure accessible materials for all through Universal Design principles",
          "tag": "OPTIMAL",
          "fb": "Fosters systemic inclusion through Universal Design while covering specific individual assistive needs."
        },
        {
          "txt": "Purchase only the adapted kits for blind students",
          "tag": "SUBOPTIMAL",
          "fb": "Solves an urgent individual need but fails to build scalable inclusive infrastructure across the school network."
        },
        {
          "txt": "Postpone purchase until next fiscal year",
          "tag": "CRITICAL",
          "fb": "Deprives students of essential learning materials, harming academic progress."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Universal Design for Learning",
        "question": "How does Universal Design for Learning differ from specific material adaptations?",
        "hint": "Contrast individual retrofitted fixes with inherently accessible educational frameworks.",
        "legalBase": "LBI Art. 28 III promotes Universal Design as the primary standard for educational software and pedagogical resources."
      }
    },
    "es": {
      "title": "Material Didáctico: ¿Adaptado o Universal?",
      "sub": "LBI Art. 28 III — Diseño Universal para el Aprendizaje (DUA)",
      "body": "Elección entre comprar kits adaptados específicos para 15 alumnos ciegos ($15.000) o adquirir software de Diseño Universal para el Aprendizaje para los 200 alumnos de Ed. Especial ($35.000).",
      "opts": [
        {
          "txt": "Combinar fondos para asegurar materiales accesibles para todos mediante el Diseño Universal",
          "tag": "ÓPTIMO",
          "fb": "Promueve la inclusión sistémica mediante el Diseño Universal atendiendo al mismo tiempo necesidades individuales específicas."
        },
        {
          "txt": "Comprar únicamente los kits adaptados para los estudiantes ciegos",
          "tag": "SUBÓPTIMO",
          "fb": "Soluciona una necesidad individual urgente pero no logra construir una infraestructura inclusiva escalable en la red."
        },
        {
          "txt": "Posponer la compra hasta el próximo ejercicio fiscal",
          "tag": "CRÍTICO",
          "fb": "Priva a los estudiantes de materiales de aprendizaje esenciales, perjudicando su progreso académico."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Diseño Universal para el Aprendizaje",
        "question": "¿En qué se diferencia el Diseño Universal para el Aprendizaje de las adaptaciones de material específicas?",
        "hint": "Contraste las soluciones individuales posteriores con marcos educativos inherentemente accesibles.",
        "legalBase": "El Art. 28 III de la LBI promueve el Diseño Universal como el estándar principal para recursos pedagógicos."
      }
    }
  },
  "M1F2C1": {
    "en": {
      "title": "Federal Funding with Mandatory Counterpart",
      "sub": "Fundeb Art. 26 — Minimum 10% Local Counterpart for Federal Grants",
      "body": "Federal grant of $100,000 available for AEE Resource Rooms, requiring a 10% local counterpart ($10,000). Municipal treasury has no unallocated funds.",
      "opts": [
        {
          "txt": "Reallocate $10k from administrative overhead to secure the $100k federal grant",
          "tag": "OPTIMAL",
          "fb": "Leverages a 10x return on investment for municipal inclusive infrastructure."
        },
        {
          "txt": "Request a partial federal waiver for $50k grant requiring $5k counterpart",
          "tag": "SUBOPTIMAL",
          "fb": "Secures some funds but leaves half of the available federal investment on the table."
        },
        {
          "txt": "Decline federal funds due to lack of unallocated treasury funds",
          "tag": "CRITICAL",
          "fb": "Forfeits major federal funding, paralyzing inclusion infrastructure expansion."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Federal Leverage",
        "question": "Why should public managers actively secure federal grant counterparts?",
        "hint": "Consider budgetary leverage and long-term capital investment in local public schools.",
        "legalBase": "Fundeb Art. 26 allows local budget adjustments to guarantee federal co-financing for special education."
      }
    },
    "es": {
      "title": "Fondo Federal con Contrapartida Obligatoria",
      "sub": "Fundeb Art. 26 — Contrapartida Local Mínima del 10% para Fondos Federales",
      "body": "Subvención federal de $100.000 disponible para Salas de Recursos AEE, requiriendo 10% de contrapartida local ($10.000). La tesorería municipal no tiene fondos no asignados.",
      "opts": [
        {
          "txt": "Reasignar $10k del gasto administrativo para asegurar la subvención federal de $100k",
          "tag": "ÓPTIMO",
          "fb": "Aprovecha un retorno de inversión de 10x para la infraestructura inclusiva municipal."
        },
        {
          "txt": "Solicitar una exención parcial para $50k de subvención que requiere $5k de contrapartida",
          "tag": "SUBÓPTIMO",
          "fb": "Asegura algunos fondos pero deja la mitad de la inversión federal disponible sin utilizar."
        },
        {
          "txt": "Rechazar fondos federales por falta de tesorería libre",
          "tag": "CRÍTICO",
          "fb": "Pierde una importante financiación federal, paralizando la expansión de infraestructura inclusiva."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Apalancamiento Federal",
        "question": "¿Por qué los gestores públicos deben asegurar activamente las contrapartidas de subvenciones federales?",
        "hint": "Considere el apalancamiento presupuestario y la inversión de capital a largo plazo en escuelas públicas.",
        "legalBase": "Fundeb Art. 26 permite ajustes presupuestarios locales para garantizar el cofinanciamiento federal."
      }
    }
  },
  "M1F2C2": {
    "en": {
      "title": "Hiring AEE Specialist Teacher",
      "sub": "CF/88 Art. 208 III — Specialized Educational Services Right",
      "body": "Demand surge requires 3 new AEE specialist teachers ($12,000/month total). Budget only allows 1 contract without exceeding the Fiscal Responsibility Law labor ceiling.",
      "opts": [
        {
          "txt": "Hire 1 permanent AEE specialist and contract 2 via temporary emergency public call",
          "tag": "OPTIMAL",
          "fb": "Complies with statutory labor ceilings while ensuring immediate specialist coverage in classrooms."
        },
        {
          "txt": "Hire only 1 specialist teacher and overburden existing staff",
          "tag": "SUBOPTIMAL",
          "fb": "Avoids fiscal risk but causes professional burnout and leaves dozens of students underserved."
        },
        {
          "txt": "Freeze hiring until the next fiscal year",
          "tag": "CRITICAL",
          "fb": "Violates constitutional guarantees to Specialized Educational Services (AEE)."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Fiscal Limits & Service Delivery",
        "question": "How can a city balance Fiscal Responsibility Law ceilings with constitutional education rights?",
        "hint": "Explore temporary contract mechanisms and priority personnel reallocation.",
        "legalBase": "CF/88 Art. 208 III mandates Specialized Educational Services (AEE) preferentially in regular classrooms."
      }
    },
    "es": {
      "title": "Contratación de Profesor Especialista AEE",
      "sub": "CF/88 Art. 208 III — Derecho a Servicios Educativos Especializados",
      "body": "Aumento de demanda requiere 3 nuevos profesores especialistas en AEE ($12.000/mes total). El presupuesto solo permite 1 contrato sin exceder el límite laboral de la Ley de Responsabilidad Fiscal.",
      "opts": [
        {
          "txt": "Contratar 1 especialista permanente y 2 mediante convocatoria pública temporal de emergencia",
          "tag": "ÓPTIMO",
          "fb": "Cumple los límites legales de gasto de personal asegurando cobertura de especialistas en el aula."
        },
        {
          "txt": "Contratar solo 1 docente especialista y sobrecargar al personal existente",
          "tag": "SUBÓPTIMO",
          "fb": "Evita riesgo fiscal pero causa desgaste profesional y deja a decenas de alumnos desatendidos."
        },
        {
          "txt": "Congelar contrataciones hasta el próximo ejercicio fiscal",
          "tag": "CRÍTICO",
          "fb": "Viola las garantías constitucionales de Atención Educativa Especializada (AEE)."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Límites Fiscales y Prestación de Servicios",
        "question": "¿Cómo equilibrar los límites de la Ley de Responsabilidad Fiscal con los derechos educativos constitucionales?",
        "hint": "Explore mecanismos de contratación temporal y reasignación prioritaria de personal.",
        "legalBase": "CF/88 Art. 208 III exige la atención educativa especializada preferentemente en la red regular de enseñanza."
      }
    }
  },
  "M1F2C3": {
    "en": {
      "title": "Assistive Tech vs. Training: Two Bids, One Budget",
      "sub": "LBI Art. 28 V — Assistive Technology and Pedagogical Training Balance",
      "body": "Two pending bids: $25,000 for Assistive Tech devices and $25,000 for continuous teacher training. Available budget: $30,000.",
      "opts": [
        {
          "txt": "Adjust scope to invest $15k in high-impact AT and $15k in essential training",
          "tag": "OPTIMAL",
          "fb": "Balances equipment provision with teacher pedagogy, ensuring devices are effectively utilized."
        },
        {
          "txt": "Execute only the AT procurement bid ($25k)",
          "tag": "SUBOPTIMAL",
          "fb": "Provides equipment but leaves teachers without knowledge on how to integrate devices into instruction."
        },
        {
          "txt": "Cancel both bids to avoid partial execution",
          "tag": "CRITICAL",
          "fb": "Paralyzes inclusion investments, failing both students and teaching staff."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Synergistic Investment",
        "question": "Why must technology acquisition be paired with teacher qualification?",
        "hint": "Equipment without pedagogical training results in unused resources and lost learning opportunities.",
        "legalBase": "LBI Art. 28 V emphasizes both provision of assistive technology and continuous staff development."
      }
    },
    "es": {
      "title": "Tecnología Asistiva vs Capacitación: Dos Licitaciones, Un Presupuesto",
      "sub": "LBI Art. 28 V — Equilibrio entre Tecnología Asistiva y Capacitación Pedagógica",
      "body": "Dos licitaciones pendientes: $25.000 para dispositivos de TA y $25.000 para capacitación docente continua. Presupuesto disponible: $30.000.",
      "opts": [
        {
          "txt": "Ajustar alcance para invertir $15k en TA de alto impacto y $15k en capacitación esencial",
          "tag": "ÓPTIMO",
          "fb": "Equilibra la provisión de equipos con la pedagogía docente, garantizando el uso efectivo de dispositivos."
        },
        {
          "txt": "Ejecutar únicamente la licitación de adquisición de TA ($25k)",
          "tag": "SUBÓPTIMO",
          "fb": "Suministra equipos pero deja a los docentes sin conocimientos para integrarlos en el aula."
        },
        {
          "txt": "Cancelar ambas licitaciones para evitar ejecución parcial",
          "tag": "CRÍTICO",
          "fb": "Paraliza las inversiones en inclusión, perjudicando tanto a estudiantes como a profesores."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Inversión Sinérgica",
        "question": "¿Por qué la adquisición de tecnología debe combinarse con la cualificación docente?",
        "hint": "El equipamiento sin formación pedagógica resulta en recursos inutilizados y pérdida de aprendizaje.",
        "legalBase": "LBI Art. 28 V enfatiza tanto la provisión de tecnología asistiva como el desarrollo continuo del personal."
      }
    }
  },
  "M1F2C4": {
    "en": {
      "title": "Contingency Reserve for Injunctions",
      "sub": "LRF Art. 5 III — Contingency Reserve for Legal Claims",
      "body": "Legal department warns of expected court injunctions demanding costly individual assistive technology ($20,000 estimated). No contingency reserve currently exists.",
      "opts": [
        {
          "txt": "Create a designated contingency line item of $20k in the annual budget",
          "tag": "OPTIMAL",
          "fb": "Prevents sudden budget disruption when court mandates arrive, maintaining operational stability."
        },
        {
          "txt": "Wait for court decisions and reallocate funds on an ad-hoc basis",
          "tag": "SUBOPTIMAL",
          "fb": "Exposes current programs to sudden emergency cuts when injunctions are served."
        },
        {
          "txt": "Ignore legal department warnings",
          "tag": "CRITICAL",
          "fb": "Risks account freezing and severe daily fines for administrative non-compliance."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Preventative Financial Management",
        "question": "How does creating contingency reserves protect municipal education budgets?",
        "hint": "Consider legal risk predictability and avoiding emergency budget cannibalization.",
        "legalBase": "Fiscal Responsibility Law (LRF) Art. 5 III requires financial planning for unforeseen liabilities."
      }
    },
    "es": {
      "title": "Reserva Presupuestaria para Medidas Cautelares",
      "sub": "LRF Art. 5 III — Reserva de Contingencia para Reclamaciones Judiciales",
      "body": "Asesoría jurídica advierte sobre posibles medidas cautelares que exijan tecnología asistiva individual de alto costo ($20.000 estimado). No existe reserva de contingencia actualmente.",
      "opts": [
        {
          "txt": "Crear una línea de contingencia designada de $20k en el presupuesto anual",
          "tag": "ÓPTIMO",
          "fb": "Evita la interrupción presupuestaria imprevista cuando llegan mandatos judiciales, manteniendo estabilidad."
        },
        {
          "txt": "Esperar las decisiones judiciales y reasignar fondos de forma imprevista",
          "tag": "SUBÓPTIMO",
          "fb": "Expone los programas actuales a recortes de emergencia cuando se notifican cautelares."
        },
        {
          "txt": "Ignorar las advertencias del departamento jurídico",
          "tag": "CRÍTICO",
          "fb": "Arriesga congelamiento de cuentas y multas diarias por incumplimiento administrativo."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gestión Financiera Preventiva",
        "question": "¿Cómo protege la creación de reservas de contingencia el presupuesto educativo municipal?",
        "hint": "Considere la previsibilidad del riesgo legal y evite la canibalización presupuestaria de emergencia.",
        "legalBase": "Ley de Responsabilidad Fiscal (LRF) Art. 5 III exige planificación financiera para pasivos imprevistos."
      }
    }
  },
  "M1F2C5": {
    "en": {
      "title": "Accessibility: One Complete School vs. Three Partial",
      "sub": "NBR 9050 / LBI Art. 28 I — Architectural Accessibility Standards",
      "body": "$50,000 budget can either make 1 school 100% accessible with elevators and tactile paving, or install basic ramps in 3 schools leaving bathrooms inaccessible.",
      "opts": [
        {
          "txt": "Make 1 school fully accessible as a regional inclusive hub while planning next phase",
          "tag": "OPTIMAL",
          "fb": "Ensures complete structural compliance and dignity without leaving safety or hygiene gaps."
        },
        {
          "txt": "Perform partial works across 3 schools leaving bathrooms inaccessible",
          "tag": "SUBOPTIMAL",
          "fb": "Creates incomplete accessibility that fails technical compliance standards and leaves barrier traps."
        },
        {
          "txt": "Split budget evenly without technical engineering oversight",
          "tag": "CRITICAL",
          "fb": "Wastes public funds on non-compliant works that will require costly future reconstruction."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Systemic Hub Strategy",
        "question": "Is partial accessibility acceptable in public buildings?",
        "hint": "Evaluate whether half-measures solve real mobility barriers or perpetuate structural exclusion.",
        "legalBase": "NBR 9050 establishes that accessibility must form a continuous, barrier-free chain from entrance to facilities."
      }
    },
    "es": {
      "title": "Accesibilidad: Una Escuela Completa o Tres Parciales",
      "sub": "NBR 9050 / LBI Art. 28 I — Normas de Accesibilidad Arquitectónica",
      "body": "El presupuesto de $50.000 puede hacer 1 escuela 100% accesible con ascensores y piso podotáctil, o instalar rampas básicas en 3 escuelas dejando los baños inaccesibles.",
      "opts": [
        {
          "txt": "Hacer 1 escuela totalmente accesible como centro inclusivo regional mientras se planifica la siguiente fase",
          "tag": "ÓPTIMO",
          "fb": "Garantiza un cumplimiento estructural completo y dignidad sin dejar brechas de seguridad o higiene."
        },
        {
          "txt": "Realizar obras parciales en 3 escuelas dejando los baños inaccesibles",
          "tag": "SUBÓPTIMO",
          "fb": "Crea accesibilidad incompleta que no cumple con las normas técnicas y mantiene barreras."
        },
        {
          "txt": "Dividir el presupuesto por igual sin supervisión técnica de ingeniería",
          "tag": "CRÍTICO",
          "fb": "Desperdicia fondos públicos en obras antirreglamentarias que requerirán costosa reconstrucción futura."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Estrategia de Centros Inclusivos",
        "question": "¿Es aceptable la accesibilidad parcial en edificios públicos?",
        "hint": "Evalúe si las soluciones a medias resuelven las barreras reales de movilidad o perpetúan la exclusión.",
        "legalBase": "La NBR 9050 establece que la accesibilidad debe formar una cadena continua sin barreras."
      }
    }
  },
  "M1F3C1": {
    "en": {
      "title": "15% Mid-Year Budget Cut",
      "sub": "LRF Art. 9 — Revenue Contingency Plan",
      "body": "City decree imposes a mandatory 15% cut on all municipal education budgets ($15,000 reduction in Special Education).",
      "opts": [
        {
          "txt": "Protect essential AEE contracts and reduce administrative software subscriptions",
          "tag": "OPTIMAL",
          "fb": "Shields core classroom support staff while absorbing necessary cuts through overhead efficiency."
        },
        {
          "txt": "Apply linear 15% cuts across all special education services",
          "tag": "SUBOPTIMAL",
          "fb": "Harms direct student services indiscriminately rather than optimizing administrative costs."
        },
        {
          "txt": "Cancel all Assistive Technology support contracts completely",
          "tag": "CRITICAL",
          "fb": "Breaches fundamental accessibility guarantees and exposes the city to legal sanctions."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Fiscal Adjustment Priorities",
        "question": "How should public managers protect essential rights during fiscal austerity cuts?",
        "hint": "Prioritize frontline educational services over administrative overhead.",
        "legalBase": "LRF Art. 9 guides fiscal contingency plans while respecting constitutionally protected rights."
      }
    },
    "es": {
      "title": "Corte Presupuestario del 15% a Mitad de Año",
      "sub": "LRF Art. 9 — Plan de Contingencia de Ingresos",
      "body": "Decreto municipal impone un corte obligatorio del 15% en todos los presupuestos de educación ($15.000 de reducción en Ed. Especial).",
      "opts": [
        {
          "txt": "Proteger contratos esenciales de AEE y reducir suscripciones de software administrativo",
          "tag": "ÓPTIMO",
          "fb": "Protege al personal de apoyo directo reduciendo gastos administrativos generales."
        },
        {
          "txt": "Aplicar recortes lineales del 15% en todos los servicios de educación especial",
          "tag": "SUBÓPTIMO",
          "fb": "Perjudica servicios estudiantiles directos de forma indiscriminada en lugar de optimizar costos."
        },
        {
          "txt": "Cancelar todos los contratos de apoyo de Tecnología Asistiva",
          "tag": "CRÍTICO",
          "fb": "Incumple garantías fundamentales de accesibilidad y expone al municipio a sanciones."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Prioridades de Ajuste Fiscal",
        "question": "¿Cómo deben los gestores públicos proteger los derechos esenciales durante recortes de austeridad?",
        "hint": "Priorice los servicios educativos directos sobre los gastos administrativos generales.",
        "legalBase": "La LRF Art. 9 orienta la contingencia fiscal respetando derechos constitucionalmente protegidos."
      }
    }
  },
  "M1F3C2": {
    "en": {
      "title": "Positive $30k Surplus Redistribution",
      "sub": "Public Finance Law 4.320/64 — Budget Reallocation Rules",
      "body": "Efficiency gains left a positive balance of $30,000 at the end of Q3. Unspent funds will revert to the municipal general fund if not allocated.",
      "opts": [
        {
          "txt": "Reallocate $30k to upgrade Assistive Tech in resource rooms and fund specialized training",
          "tag": "OPTIMAL",
          "fb": "Capitalizes on available funds to build durable inclusive capacity before fiscal year closing."
        },
        {
          "txt": "Transfer funds to general school maintenance",
          "tag": "SUBOPTIMAL",
          "fb": "Uses special education savings for generic repairs instead of strengthening inclusive infrastructure."
        },
        {
          "txt": "Allow funds to expire and revert to the general city treasury",
          "tag": "CRITICAL",
          "fb": "Loses dedicated special education funds that could have transformed classroom access."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Fiscal Year End Execution",
        "question": "What strategies prevent dedicated educational savings from lapsing at year-end?",
        "hint": "Utilize prompt budget reallocations for capital investment in accessibility assets.",
        "legalBase": "Law 4.320/64 governs budgetary execution and authorized supplementary credits."
      }
    },
    "es": {
      "title": "Redistribución Estratégica de Saldo Positivo de $30k",
      "sub": "Ley de Finanzas Públicas 4.320/64 — Normas de Reasignación Presupuestaria",
      "body": "Ganancias de eficiencia dejaron un saldo positivo de $30.000 al final del 3.er trimestre. Los fondos no gastados se devolverán al tesoro municipal si no se asignan.",
      "opts": [
        {
          "txt": "Reasignar $30k para actualizar TA en salas de recursos y financiar capacitación especializada",
          "tag": "ÓPTIMO",
          "fb": "Aprovecha los fondos disponibles para construir capacidad inclusiva duradera antes del cierre fiscal."
        },
        {
          "txt": "Transferir fondos a mantenimiento general de escuelas",
          "tag": "SUBÓPTIMO",
          "fb": "Utiliza ahorros de educación especial para reparaciones genéricas en lugar de fortalecer la inclusión."
        },
        {
          "txt": "Permitir que los fondos expiren y se devuelvan a la tesorería general",
          "tag": "CRÍTICO",
          "fb": "Pierde fondos dedicados a educación especial que habrían transformado el acceso escolar."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Ejecución al Cierre del Ejercicio",
        "question": "¿Qué estrategias evitan que los ahorros dedicados a educación expiren al cierre fiscal?",
        "hint": "Utilice reasignaciones presupuestarias oportunas para inversiones de capital en accesibilidad.",
        "legalBase": "La Ley 4.320/64 rige la ejecución presupuestaria y los créditos suplementarios autorizados."
      }
    }
  },
  "M1F3C3": {
    "en": {
      "title": "Audit Flags $18k Questionable Expenses",
      "sub": "Administrative Improbity Law 8.429/92",
      "body": "Internal audit reveals $18,000 spent on non-functional assistive devices purchased by the previous administration without proper delivery receipts.",
      "opts": [
        {
          "txt": "Initiate administrative inquiry, notify municipal auditor, and recover or repurpose devices",
          "tag": "OPTIMAL",
          "fb": "Upholds transparency and administrative integrity while seeking practical recovery of assets."
        },
        {
          "txt": "Archive audit report without action to avoid political friction",
          "tag": "SUBOPTIMAL",
          "fb": "Leaves administrative irregularities unaddressed, risking personal liability for omission."
        },
        {
          "txt": "Discard non-functional devices silently",
          "tag": "CRITICAL",
          "fb": "Conceals public resource waste, constituting an administrative improbity offense."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Administrative Transparency",
        "question": "How should a manager handle irregularities inherited from prior administrations?",
        "hint": "Follow statutory accountability procedures and inform competent oversight bodies.",
        "legalBase": "Law 8.429/92 establishes penalties for public managers who omit mandatory investigation of resource waste."
      }
    },
    "es": {
      "title": "Auditoría Identifica $18k Cuestionables de Gestión Anterior",
      "sub": "Ley de Improbidad Administrativa 8.429/92",
      "body": "Auditoría interna revela $18.000 gastados en dispositivos asistivos no funcionales comprados por la gestión anterior sin comprobantes de entrega.",
      "opts": [
        {
          "txt": "Iniciar investigación administrativa, notificar a auditoría y recuperar o reutilizar equipos",
          "tag": "ÓPTIMO",
          "fb": "Defiende la transparencia y la integridad administrativa buscando la recuperación práctica de bienes."
        },
        {
          "txt": "Archivar el informe de auditoría para evitar fricciones políticas",
          "tag": "SUBÓPTIMO",
          "fb": "Deja irregularidades sin resolver, arriesgando responsabilidad personal por omisión."
        },
        {
          "txt": "Desechar en silencio los dispositivos no funcionales",
          "tag": "CRÍTICO",
          "fb": "Oculta el desperdicio de recursos públicos, constituyendo un delito de improbidad administrativa."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Transparencia Administrativa",
        "question": "¿Cómo debe un gestor manejar irregularidades heredadas de gestiones anteriores?",
        "hint": "Siga los procedimientos legales de rendición de cuentas e informe a los órganos de control.",
        "legalBase": "La Ley 8.429/92 establece sanciones para gestores públicos que omitan la investigación obligatoria."
      }
    }
  },
  "M1F3C4": {
    "en": {
      "title": "12% Deficit in Special Ed Enrollment Goals",
      "sub": "PNE Goal 4 — Universal Inclusive Schooling",
      "body": "Annual census shows special education enrollment fell 12% short of the PNE Goal 4 target, threatening future Fundeb allocation bonuses.",
      "opts": [
        {
          "txt": "Launch proactive active search campaign with health and social assistance services",
          "tag": "OPTIMAL",
          "fb": "Addresses root causes by actively identifying out-of-school children with disabilities."
        },
        {
          "txt": "Lower official target numbers to match current enrollment",
          "tag": "SUBOPTIMAL",
          "fb": "Masks structural inclusion deficits artificially without solving student exclusion."
        },
        {
          "txt": "Blame families for non-enrollment",
          "tag": "CRITICAL",
          "fb": "Neglects the public system active search duty, violating fundamental PNE directives."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Active Search & Inclusion Goals",
        "question": "Why is intersectoral coordination essential to achieving inclusion enrollment targets?",
        "hint": "Combine efforts across education, health, and social assistance to find out-of-school youth.",
        "legalBase": "National Education Plan (PNE) Goal 4 mandates universal access to basic education for students with disabilities."
      }
    },
    "es": {
      "title": "Déficit del 12% en Metas de Matrícula Especial",
      "sub": "PNE Meta 4 — Escolarización Inclusiva Universal",
      "body": "El censo anual muestra que la matrícula de educación especial quedó un 12% por debajo de la Meta 4 del PNE, amenazando bonificaciones de asignación del Fundeb.",
      "opts": [
        {
          "txt": "Lanzar campaña de búsqueda activa en coordinación con salud y asistencia social",
          "tag": "ÓPTIMO",
          "fb": "Aborda las causas profundas identificando activamente a niños con discapacidad fuera de la escuela."
        },
        {
          "txt": "Reducir metas oficiales para hacerlas coincidir con la matrícula actual",
          "tag": "SUBÓPTIMO",
          "fb": "Oculta déficits estructurales de inclusión sin resolver la exclusión real de los estudiantes."
        },
        {
          "txt": "Culpar a las familias por la falta de matriculación",
          "tag": "CRÍTICO",
          "fb": "Muestra negligencia en la obligación de búsqueda activa, violando directivas del PNE."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Búsqueda Activa y Metas Inclusivas",
        "question": "¿Por qué la articulación intersectorial es esencial para alcanzar las metas de matrícula?",
        "hint": "Combine esfuerzos entre educación, salud y asistencia social para localizar a niños fuera de la escuela.",
        "legalBase": "La Meta 4 del Plan Nacional de Educación (PNE) exige el acceso universal para estudiantes con discapacidad."
      }
    }
  },
  "M1F3C5": {
    "en": {
      "title": "Annual Planning: Data vs. Politics",
      "sub": "LDB Art. 9 — Evidence-Based Public Planning",
      "body": "Data recommends prioritizing AEE teacher training in rural schools, while local politicians push for installing high-profile tech in urban centers.",
      "opts": [
        {
          "txt": "Base annual plan on technical data while creating a transparent multi-year rollout roadmap",
          "tag": "OPTIMAL",
          "fb": "Upholds evidence-based administrative efficiency and equity while addressing political stakeholders clearly."
        },
        {
          "txt": "Yield entirely to political demands and prioritize urban tech display",
          "tag": "SUBOPTIMAL",
          "fb": "Neglects rural schools with highest pedagogical deficit, widening regional educational inequality."
        },
        {
          "txt": "Refuse dialogue with political representatives",
          "tag": "CRITICAL",
          "fb": "Creates legislative friction that risks stalling overall education budget approval."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Technical Governance",
        "question": "How can technical planning resist political pressure while maintaining public dialogue?",
        "hint": "Rely on objective diagnostic data, equity principles, and transparent multi-year planning.",
        "legalBase": "LDB Art. 9 mandates evidence-based management to guarantee educational equity and quality."
      }
    },
    "es": {
      "title": "Planificación Anual: ¿Datos o Política?",
      "sub": "LDB Art. 9 — Planificación Pública Basada en Evidencia",
      "body": "Los datos recomiendan priorizar la capacitación de profesores de AEE en escuelas rurales, mientras los políticos locales presionan para instalar tecnología de alto perfil en centros urbanos.",
      "opts": [
        {
          "txt": "Basar el plan en datos técnicos creando una hoja de ruta plurianual transparente",
          "tag": "ÓPTIMO",
          "fb": "Mantiene la eficiencia administrativa basada en evidencia y equidad dialogando con los actores políticos."
        },
        {
          "txt": "Ceder completamente a demandas políticas y priorizar tecnología urbana",
          "tag": "SUBÓPTIMO",
          "fb": "Desatiende las escuelas rurales con mayor déficit pedagógico, aumentando la desigualdad regional."
        },
        {
          "txt": "Rechazar el diálogo con representantes políticos",
          "tag": "CRÍTICO",
          "fb": "Genera fricción legislativa que arriesga la aprobación del presupuesto educativo general."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gobernanza Técnica",
        "question": "¿Cómo la planificación técnica puede resistir presiones políticas manteniendo el diálogo público?",
        "hint": "Apóyese en datos de diagnóstico objetivos, principios de equidad y hojas de ruta transparentes.",
        "legalBase": "LDB Art. 9 exige gestión basada en evidencia para garantizar equidad y calidad educativa."
      }
    }
  },
  "M2F4C1": {
    "en": {
      "title": "72h Deadline for AAC Device",
      "sub": "LBI Art. 3 III — CAA as Assistive Technology. CPC Art. 536 §1",
      "body": "Family obtains court injunction demanding Augmentative and Alternative Communication device for non-verbal student with ASD. Cost: $28,000. Judicial deadline: 72 hours. No budget provision.",
      "opts": [
        {
          "txt": "Acquire the equipment via emergency bidding waiver",
          "tag": "OPTIMAL",
          "fb": "Complies with court deadline immediately, preventing heavy daily fines and protecting student rights."
        },
        {
          "txt": "Request a 30-day extension from the judge",
          "tag": "SUBOPTIMAL",
          "fb": "Buys administrative time but risks judge refusal and accumulation of personal daily fines."
        },
        {
          "txt": "File an appeal without purchasing the device",
          "tag": "CRITICAL",
          "fb": "Triggers immediate coercive fines and potential arrest warrants for judicial disobedience."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Emergency Judicial Mandates",
        "question": "How should public managers react to urgent 72h court orders for Assistive Tech?",
        "hint": "Utilize emergency bidding waiver clauses under Bidding Law 14.133/21 to meet court orders.",
        "legalBase": "CPC Art. 536 §1 allows coercive measures and emergency procurement to enforce social rights decisions."
      }
    },
    "es": {
      "title": "Plazo de 72h para Dispositivo de CAA",
      "sub": "LBI Art. 3 III — CAA como Tecnología Asistiva. CPC Art. 536 §1",
      "body": "Familia obtiene medida cautelar exigiendo dispositivo de Comunicación Aumentativa y Alternativa para alumno con TEA no verbal. Costo: $28.000. Plazo judicial: 72 horas. Sin previsión presupuestaria.",
      "opts": [
        {
          "txt": "Adquirir el equipo por exención de licitación de emergencia",
          "tag": "ÓPTIMO",
          "fb": "Cumple el plazo judicial de inmediato, evitando multas diarias pesadas y protegiendo derechos."
        },
        {
          "txt": "Solicitar una prórroga de 30 días al juez",
          "tag": "SUBÓPTIMO",
          "fb": "Gana tiempo administrativo pero arriesga rechazo del juez y acumulación de multas personales."
        },
        {
          "txt": "Interponer recurso de apelación sin comprar el dispositivo",
          "tag": "CRÍTICO",
          "fb": "Activa multas coercitivas inmediatas y posibles órdenes de arresto por desobediencia judicial."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Mandatos Judiciales de Emergencia",
        "question": "¿Cómo debe reaccionar el gestor público ante órdenes judiciales urgentes de 72h para Tecnología Asistiva?",
        "hint": "Utilice cláusulas de exención de licitación por emergencia bajo la Ley 14.133/21 para cumplir órdenes.",
        "legalBase": "El CPC Art. 536 §1 permite medidas coercitivas y contratación de emergencia para cumplir decisiones sociales."
      }
    }
  },
  "M2F4C2": {
    "en": {
      "title": "Daily Court Fine Accumulating for 12 Days",
      "sub": "CPC Art. 537 — Coercive Daily Fines for Injunction Delay",
      "body": "Delay in delivering an accessible bus triggered a $1,000/day court fine, currently totaling $12,000. Finance department recommends waiting for the full appeal outcome.",
      "opts": [
        {
          "txt": "Execute immediate provisional contract for accessible transport to halt daily fine growth",
          "tag": "OPTIMAL",
          "fb": "Stops fine accumulation immediately and guarantees student mobility while long-term tender completes."
        },
        {
          "txt": "Negotiate fine waiver directly with prosecutor without securing transport",
          "tag": "SUBOPTIMAL",
          "fb": "Attempts legal negotiation while leaving students stranded and fine counter running."
        },
        {
          "txt": "Wait for final appeal decision while fines accumulate",
          "tag": "CRITICAL",
          "fb": "Causes massive financial hemorrhage that drains public funds without fixing student transport."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Mitigating Coercive Fines",
        "question": "What is the primary objective when managing active daily court fines (astreintes)?",
        "hint": "Stop the harm to the citizen first, which immediately halts fine accumulation.",
        "legalBase": "CPC Art. 537 regulates astreintes, which can be modified if the obligation is satisfied."
      }
    },
    "es": {
      "title": "Multa Diaria Acumulándose hace 12 Días",
      "sub": "CPC Art. 537 — Multas Coercitivas por Retraso Cautelar",
      "body": "Retraso en la entrega de un autobús accesible activó una multa judicial de $1.000/día, sumando actualmente $12.000. Hacienda recomienda esperar el resultado completo de la apelación.",
      "opts": [
        {
          "txt": "Ejecutar contrato provisional inmediato de transporte accesible para frenar la multa",
          "tag": "ÓPTIMO",
          "fb": "Detiene la acumulación de la multa inmediatamente y garantiza la movilidad estudiantil."
        },
        {
          "txt": "Negociar exención de multa directamente con el fiscal sin asegurar el transporte",
          "tag": "SUBÓPTIMO",
          "fb": "Intenta negociación legal dejando a los estudiantes desatendidos y la multa corriendo."
        },
        {
          "txt": "Esperar apelación final mientras las multas se acumulan",
          "tag": "CRÍTICO",
          "fb": "Causa hemorragia financiera masiva que drena fondos públicos sin solucionar el transporte."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Mitigación de Multas Coercitivas",
        "question": "¿Cuál es el objetivo principal al gestionar multas diarias judiciales activas (astreintes)?",
        "hint": "Detenga el perjuicio al ciudadano primero, lo que frena inmediatamente la acumulación de la multa.",
        "legalBase": "El CPC Art. 537 regula las astreintes, que pueden modificarse si se satisface la obligación."
      }
    }
  },
  "M2F4C3": {
    "en": {
      "title": "Five Simultaneous Court Injunctions",
      "sub": "ECA Art. 208 — Judicial Enforcement of Children Rights",
      "body": "Five distinct injunctions served simultaneously demand individual support staff and specialized equipment, exceeding budget by $60,000.",
      "opts": [
        {
          "txt": "Request emergency legislative credit supplement while organizing shared multi-student support",
          "tag": "OPTIMAL",
          "fb": "Combines fiscal expansion with smart resource organization to meet judicial mandates sustainably."
        },
        {
          "txt": "Comply with only 2 injunctions and delay the other 3",
          "tag": "SUBOPTIMAL",
          "fb": "Exposes manager to personal civil liability and fines for the 3 neglected injunctions."
        },
        {
          "txt": "File generic appeal claiming total budget incapacity",
          "tag": "CRITICAL",
          "fb": "Courts consistently reject generic budget incapacity claims for basic fundamental rights."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Managing Judicial Avalanches",
        "question": "Why do courts reject generic 'lack of budget' arguments in special education cases?",
        "hint": "Fundamental rights to basic education and human dignity hold absolute constitutional priority.",
        "legalBase": "ECA Art. 208 mandates priority public budget allocation for child protection and inclusive education."
      }
    },
    "es": {
      "title": "Cinco Medidas Cautelares Simultáneas",
      "sub": "ECA Art. 208 — Exigibilidad Judicial de Derechos de la Infancia",
      "body": "Cinco medidas cautelares distintas notificadas simultáneamente exigen personal de apoyo individual y equipo especializado, superando el presupuesto en $60.000.",
      "opts": [
        {
          "txt": "Solicitar crédito suplementario legislativo de emergencia organizando apoyo compartido",
          "tag": "ÓPTIMO",
          "fb": "Combina expansión fiscal con organización inteligente de recursos para cumplir mandatos judiciales."
        },
        {
          "txt": "Cumplir solo 2 medidas cautelares y retrasar las otras 3",
          "tag": "SUBÓPTIMO",
          "fb": "Expone al gestor a responsabilidad civil personal y multas por las 3 cautelares desatendidas."
        },
        {
          "txt": "Presentar recurso genérico alegando incapacidad presupuestaria total",
          "tag": "CRÍTICO",
          "fb": "Los tribunales rechazan sistemáticamente la incapacidad presupuestaria genérica en derechos fundamentales."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gestión de Avalanchas Judiciales",
        "question": "¿Por qué los tribunales rechazan argumentos genéricos de 'falta de presupuesto' en educación especial?",
        "hint": "Los derechos fundamentales a la educación básica y dignidad humana tienen prioridad constitucional.",
        "legalBase": "ECA Art. 208 exige asignación presupuestaria prioritaria para protección infantil y educación inclusiva."
      }
    }
  },
  "M2F4C4": {
    "en": {
      "title": "Appeal Denied — 48 Hours to Comply",
      "sub": "CPC Art. 1.019 — Suspension Effect Denial",
      "body": "Higher court rejects appeal regarding specialized transport. Secretariat has 48 hours to comply or face personal asset freezing.",
      "opts": [
        {
          "txt": "Reallocate internal operational funds immediately to hire specialized transport within 48h",
          "tag": "OPTIMAL",
          "fb": "Prevents personal asset seizure and ensures immediate student inclusion."
        },
        {
          "txt": "File higher court interlocutory appeal hoping for extended stay",
          "tag": "SUBOPTIMAL",
          "fb": "Risks immediate rejection while 48h clock expires, triggering asset freeze."
        },
        {
          "txt": "Refuse compliance claiming lack of administrative time",
          "tag": "CRITICAL",
          "fb": "Results in immediate personal bank account freezing and charge of contempt of court."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Last-Resort Compliance",
        "question": "What happens when an appeal on a preliminary injunction is definitively denied?",
        "hint": "Executive orders become immediately enforceable under pain of severe personal sanctions.",
        "legalBase": "CPC Art. 1.019 dictates that denial of suspensive effect requires mandatory immediate compliance."
      }
    },
    "es": {
      "title": "Recurso Denegado — 48 Horas para Cumplir",
      "sub": "CPC Art. 1.019 — Denegación de Efecto Suspensivo",
      "body": "Tribunal superior rechaza recurso sobre transporte especializado. La secretaría tiene 48 horas para cumplir o enfrentar embargo de bienes.",
      "opts": [
        {
          "txt": "Reasignar fondos operacionales de inmediato para contratar transporte en 48h",
          "tag": "ÓPTIMO",
          "fb": "Evita el embargo de bienes personales y garantiza la inclusión inmediata del estudiante."
        },
        {
          "txt": "Interponer recurso ante tribunal superior esperando prórroga",
          "tag": "SUBÓPTIMO",
          "fb": "Arriesga rechazo inmediato mientras el plazo de 48h expira, activando el embargo."
        },
        {
          "txt": "Rechazar cumplimiento alegando falta de tiempo administrativo",
          "tag": "CRÍTICO",
          "fb": "Resulta en embargo bancario personal inmediato y cargo por desacato judicial."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Cumplimiento de Última Instancia",
        "question": "¿Qué ocurre cuando se deniega definitivamente un recurso sobre una medida cautelar?",
        "hint": "Las órdenes ejecutivas se vuelven inmediatamente exigibles bajo pena de severas sanciones personales.",
        "legalBase": "El CPC Art. 1.019 dicta que la denegación de efecto suspensivo exige cumplimiento inmediato obligatorio."
      }
    }
  },
  "M2F4C5": {
    "en": {
      "title": "Family Proposes Extrajudicial Settlement",
      "sub": "Code of Civil Procedure Art. 334 — Mediation in Public Admin",
      "body": "Family offers to drop lawsuit if city provides home tutoring and customized AT equipment ($15,000 settlement value).",
      "opts": [
        {
          "txt": "Validate agreement through City Attorney Office to settle lawsuit cleanly for $15k",
          "tag": "OPTIMAL",
          "fb": "Saves significant legal litigation costs while delivering targeted pedagogical support."
        },
        {
          "txt": "Accept agreement verbally without formal legal ratification",
          "tag": "SUBOPTIMAL",
          "fb": "Leaves agreement legally vulnerable and violates administrative formalization rules."
        },
        {
          "txt": "Reject settlement and fight lawsuit to final verdict",
          "tag": "CRITICAL",
          "fb": "Incurs higher litigation expenses and risks losing far more in legal damages."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Extrajudicial Mediation",
        "question": "How can administrative settlements reduce public litigation costs?",
        "hint": "Formalize extrajudicial conciliation via municipal legal counsel to establish binding solutions.",
        "legalBase": "CPC Art. 334 encourages public administration to participate in conciliation and mediation hearings."
      }
    },
    "es": {
      "title": "Familia Propone Acuerdo Extrajudicial",
      "sub": "Código de Procedimiento Civil Art. 334 — Mediación en la Adm. Pública",
      "body": "Familia ofrece retirar demanda si el municipio proporciona tutoría domiciliaria y equipo de TA personalizado ($15.000 valor del acuerdo).",
      "opts": [
        {
          "txt": "Validar acuerdo a través de Procuraduría Municipal para cerrar demanda limpiamente por $15k",
          "tag": "ÓPTIMO",
          "fb": "Ahorra costos de litigio legal entregando apoyo pedagógico enfocado."
        },
        {
          "txt": "Aceptar acuerdo verbalmente sin ratificación legal formal",
          "tag": "SUBÓPTIMO",
          "fb": "Deja el acuerdo vulnerable legalmente e incumple normas de formalización administrativa."
        },
        {
          "txt": "Rechazar acuerdo y litigar la demanda hasta veredicto final",
          "tag": "CRÍTICO",
          "fb": "Incurre en mayores gastos de litigio y arriesga perder sumas superiores por daños."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Mediación Extrajudicial",
        "question": "¿Cómo pueden los acuerdos administrativos reducir costos de litigio público?",
        "hint": "Formalice la conciliación extrajudicial mediante asesoría jurídica municipal para crear soluciones vinculantes.",
        "legalBase": "El CPC Art. 334 fomenta que la administración pública participe en audiencias de conciliación y mediación."
      }
    }
  },
  "M2F5C1": {
    "en": {
      "title": "Council Member Demands Waitlist Priority",
      "sub": "Administrative Improbity Law 8.429/92 — Impersonality Principle",
      "body": "Local city council member demands immediate placement of 5 favored students in AEE Resource Rooms, threatening budget vetoes.",
      "opts": [
        {
          "txt": "Maintain strict technical waitlist criteria while offering a transparent briefing to the council member",
          "tag": "OPTIMAL",
          "fb": "Upholds the constitutional Impersonality Principle while maintaining constructive political communication."
        },
        {
          "txt": "Bypass waitlist for the 5 students to secure budget approval",
          "tag": "SUBOPTIMAL",
          "fb": "Breaches administrative fairness and exposes manager to improbity charges."
        },
        {
          "txt": "Publicly denounce the council member aggressively",
          "tag": "CRITICAL",
          "fb": "Creates political hostility that sabotages total education department budget passage."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Administrative Impersonality",
        "question": "Why must public service waitlists adhere strictly to objective criteria?",
        "hint": "Public managers must treat all citizens equally under Law 8.429/92 without political favoritism.",
        "legalBase": "Constitutional Impersonality Principle (CF/88 Art. 37) prohibits political interference in public resource allocation."
      }
    },
    "es": {
      "title": "Concejal Exige Prioridad en Lista de Espera",
      "sub": "Ley de Improbidad Administrativa 8.429/92 — Principio de Impersonalidad",
      "body": "Concejal local exige ingreso inmediato de 5 estudiantes favorecidos en Salas de Recursos AEE, amenazando con vetar el presupuesto.",
      "opts": [
        {
          "txt": "Mantener criterios técnicos estrictos de lista de espera ofreciendo informe transparente al concejal",
          "tag": "ÓPTIMO",
          "fb": "Defiende el Principio Constitucional de Impersonalidad manteniendo comunicación política constructiva."
        },
        {
          "txt": "Saltarse la lista para los 5 alumnos para asegurar la aprobación presupuestaria",
          "tag": "SUBÓPTIMO",
          "fb": "Incumple la equidad administrativa y expone al gestor a cargos por improbidad."
        },
        {
          "txt": "Denunciar públicamente al concejal de forma agresiva",
          "tag": "CRÍTICO",
          "fb": "Genera hostilidad política que sabotea la aprobación del presupuesto educativo total."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Impersonalidad Administrativa",
        "question": "¿Por qué las listas de espera públicas deben adherirse estrictamente a criterios objetivos?",
        "hint": "Los gestores públicos deben tratar a todos los ciudadanos por igual bajo la Ley 8.429/92 sin favoritismos.",
        "legalBase": "El Principio de Impersonalidad (CF/88 Art. 37) prohíbe interferencias políticas en asignación de recursos."
      }
    }
  },
  "M2F5C2": {
    "en": {
      "title": "Overestimated Data for Election Campaign",
      "sub": "Access to Information Law 12.527/11 — Public Transparency",
      "body": "Press office requests inflating special education enrollment numbers by 30% for campaign materials celebrating '100% Inclusion'.",
      "opts": [
        {
          "txt": "Refuse data inflation and provide verified census metrics showcasing real progress",
          "tag": "OPTIMAL",
          "fb": "Protects public data integrity under Access to Information Law and prevents official falsification charges."
        },
        {
          "txt": "Allow press office to publish estimated projections without official sign-off",
          "tag": "SUBOPTIMAL",
          "fb": "Compromises administrative transparency and creates public confusion regarding real inclusion capacity."
        },
        {
          "txt": "Sign off on inflated numbers to align with campaign messaging",
          "tag": "CRITICAL",
          "fb": "Commits official document falsification and breaches public transparency laws."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Public Data Integrity",
        "question": "How does fake or inflated data harm long-term public policy design?",
        "hint": "Distorted data prevents accurate resource planning and undermines public trust.",
        "legalBase": "Access to Information Law 12.527/11 establishes civil and administrative liability for falsifying public metrics."
      }
    },
    "es": {
      "title": "Datos Sobreestimados para Campaña Electoral",
      "sub": "Ley de Acceso a la Información 12.527/11 — Transparencia Pública",
      "body": "Oficina de prensa solicita inflar números de matrícula especial en 30% para materiales de campaña que celebran '100% Inclusión'.",
      "opts": [
        {
          "txt": "Rechazar inflación de datos y entregar métricas verificadas mostrando avances reales",
          "tag": "ÓPTIMO",
          "fb": "Protege la integridad de datos públicos bajo la Ley de Acceso a la Información evitando falsedades."
        },
        {
          "txt": "Permitir que prensa publique proyecciones estimadas sin firma oficial",
          "tag": "SUBÓPTIMO",
          "fb": "Compromete la transparencia administrativa y crea confusión pública sobre la capacidad real."
        },
        {
          "txt": "Firmar números inflados para alinearse con la campaña",
          "tag": "CRÍTICO",
          "fb": "Comete falsedad en documento público e incumple las leyes de transparencia."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Integridad de Datos Públicos",
        "question": "¿Cómo perjudican los datos falsificados o inflados al diseño de políticas públicas a largo plazo?",
        "hint": "Los datos distorsionados impiden la planificación precisa de recursos y destruyen la confianza pública.",
        "legalBase": "La Ley 12.527/11 de Acceso a la Información establece responsabilidad administrativa por falsificación de datos."
      }
    }
  },
  "M2F5C3": {
    "en": {
      "title": "Investigative Report on Inaccessibility",
      "sub": "Access to Information Law 12.527/11 — Active Transparency",
      "body": "TV network prepares exposure on 4 schools lacking accessible restrooms despite allocated funds.",
      "opts": [
        {
          "txt": "Present transparent corrective action plan with timelines and open construction contracts",
          "tag": "OPTIMAL",
          "fb": "Demonstrates proactive accountability, converting crisis into public commitment for compliance."
        },
        {
          "txt": "Refuse interview and issue brief generic press release",
          "tag": "SUBOPTIMAL",
          "fb": "Escalates public suspicion and leaves impression of administrative negligence."
        },
        {
          "txt": "Deny accessibility problems exist at all",
          "tag": "CRITICAL",
          "fb": "Destroys institutional credibility when broadcast footage confirms non-compliance."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Media & Public Crisis Governance",
        "question": "How should public managers navigate media exposure of infrastructure failures?",
        "hint": "Combine active transparency with concrete, time-bound remediation plans.",
        "legalBase": "Access to Information Law mandates proactive public disclosure of work execution and contracts."
      }
    },
    "es": {
      "title": "Reportaje de Investigación sobre Inaccesibilidad",
      "sub": "Ley de Acceso a la Información 12.527/11 — Transparencia Activa",
      "body": "Cadena de TV prepara reportaje sobre 4 escuelas sin baños accesibles a pesar de los fondos asignados.",
      "opts": [
        {
          "txt": "Presentar plan de acción correctivo transparente con plazos y contratos de obra abiertos",
          "tag": "ÓPTIMO",
          "fb": "Demuestra rendición de cuentas proactiva, convirtiendo la crisis en un compromiso público de cumplimiento."
        },
        {
          "txt": "Rechazar entrevista y emitir un comunicado breve y genérico",
          "tag": "SUBÓPTIMO",
          "fb": "Aumenta la sospecha pública y deja impresión de negligencia administrativa."
        },
        {
          "txt": "Negar rotundamente la existencia de problemas de accesibilidad",
          "tag": "CRÍTICO",
          "fb": "Destruye la credibilidad institucional cuando las imágenes confirmen el incumplimiento."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gobernanza de Crisis en Medios",
        "question": "¿Cómo deben los gestores públicos abordar la cobertura mediática sobre fallas de infraestructura?",
        "hint": "Combine transparencia activa con planes de remediación concretos y con plazos definidos.",
        "legalBase": "La Ley de Acceso a la Información exige divulgación pública proactiva de la ejecución de obras."
      }
    }
  },
  "M2F5C4": {
    "en": {
      "title": "Whistleblower Complaint to Public Prosecutor",
      "sub": "Whistleblower Protection Law 13.608/18",
      "body": "Public Prosecutor Office investigates anonymous complaint regarding delayed Assistive Tech deliveries.",
      "opts": [
        {
          "txt": "Provide complete delivery schedules, contractor audit logs, and penalty notifications immediately",
          "tag": "OPTIMAL",
          "fb": "Cooperates fully with prosecutor oversight, proving diligent management and vendor accountability."
        },
        {
          "txt": "Delay response until formal subpoena is issued",
          "tag": "SUBOPTIMAL",
          "fb": "Creates impression of obstruction, provoking formal administrative inquiry."
        },
        {
          "txt": "Attempt to identify and punish the whistleblower internally",
          "tag": "CRITICAL",
          "fb": "Violates Whistleblower Protection Law 13.608/18, committing severe administrative crime."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — External Oversight Compliance",
        "question": "What is the correct administrative response to Public Prosecutor investigations?",
        "hint": "Provide complete documentation transparently and demonstrate active vendor enforcement.",
        "legalBase": "Law 13.608/18 protects whistleblowers and mandates full institutional cooperation with prosecutors."
      }
    },
    "es": {
      "title": "Denuncia Anónima al Ministerio Público",
      "sub": "Ley de Protección al Denunciante 13.608/18",
      "body": "El Ministerio Público investiga denuncia anónima sobre retrasos en las entregas de Tecnología Asistiva.",
      "opts": [
        {
          "txt": "Entregar registros de entrega completa, auditorías y notificaciones de multa al proveedor",
          "tag": "ÓPTIMO",
          "fb": "Coopera plenamente con el Ministerio Público demostrando gestión diligente y sanción a proveedores."
        },
        {
          "txt": "Retrasar respuesta hasta recibir citación formal",
          "tag": "SUBÓPTIMO",
          "fb": "Genera impresión de obstrucción provocando la apertura de un procedimiento administrativo formal."
        },
        {
          "txt": "Intentar identificar y sancionar internamente al denunciante",
          "tag": "CRÍTICO",
          "fb": "Viola la Ley 13.608/18 de Protección al Denunciante, incurriendo en delito administrativo grave."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Cumplimiento de Control Externo",
        "question": "¿Cuál es la respuesta administrativa correcta ante investigaciones del Ministerio Público?",
        "hint": "Aporte documentación completa con transparencia demostrando fiscalización activa al contratista.",
        "legalBase": "La Ley 13.608/18 protege al denunciante y exige cooperación institucional plena con la fiscalía."
      }
    }
  },
  "M2F5C5": {
    "en": {
      "title": "Public Hearing with Discrepant Data",
      "sub": "Fiscal Responsibility Law 101/2000 Art. 48 — Public Accountability",
      "body": "Public hearing convenes community parents, auditors, and activists highlighting discrepancies in reported inclusion metrics.",
      "opts": [
        {
          "txt": "Acknowledge discrepancies openly, present unified database system, and commit to joint monitoring",
          "tag": "OPTIMAL",
          "fb": "Builds public trust through honest accountability and collaborative monitoring mechanisms."
        },
        {
          "txt": "Defend discrepancy as technical methodology variance without listening to parent feedback",
          "tag": "SUBOPTIMAL",
          "fb": "Alienates civil society and increases community hostility during public session."
        },
        {
          "txt": "Cancel hearing early to avoid public confrontation",
          "tag": "CRITICAL",
          "fb": "Violates mandatory fiscal accountability rules under LRF Art. 48."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Community Democratic Participation",
        "question": "Why are public hearings vital for inclusive policy legitimization?",
        "hint": "Public hearings provide democratic feedback loops that align public management with real user needs.",
        "legalBase": "LRF Art. 48 establishes mandatory public hearings for budgetary and social performance reporting."
      }
    },
    "es": {
      "title": "Audiencia Pública con Datos Discrepantes",
      "sub": "Ley de Responsabilidad Fiscal 101/2000 Art. 48 — Audiencias Públicas",
      "body": "Audiencia pública reúne padres, auditores y activistas señalando discrepancias en las métricas de inclusión reportadas.",
      "opts": [
        {
          "txt": "Reconocer discrepancias, presentar sistema unificado de datos y acordar monitoreo conjunto",
          "tag": "ÓPTIMO",
          "fb": "Construye confianza pública mediante rendición de cuentas honesta y mecanismos colaborativos."
        },
        {
          "txt": "Defender la discrepancia como variación metodológica sin escuchar a las familias",
          "tag": "SUBÓPTIMO",
          "fb": "Dista a la sociedad civil e incrementa la hostilidad comunitaria en la sesión pública."
        },
        {
          "txt": "Cancelar la audiencia tempranamente para evitar confrontaciones",
          "tag": "CRÍTICO",
          "fb": "Incumple las normas de rendición de cuentas fiscales obligatorias según la LRF Art. 48."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Participación Democrática Comunitaria",
        "question": "¿Por qué las audiencias públicas son vitales para la legitimidad de las políticas inclusivas?",
        "hint": "Las audiencias públicas aportan retroalimentación democrática alineando la gestión con necesidades reales.",
        "legalBase": "La LRF Art. 48 establece audiencias públicas obligatorias para la ejecución presupuestaria y social."
      }
    }
  },
  "M2F6C1": {
    "en": {
      "title": "Fundeb Transfer Delayed 45 Days",
      "sub": "Fundeb Law 14.113/20 Art. 25 — Statutory Transfer Timelines",
      "body": "Federal transfer delay leaves payroll for support staff short by $40,000 for the upcoming cycle.",
      "opts": [
        {
          "txt": "Use municipal treasury advance bridge credit line to pay support staff payroll on time",
          "tag": "OPTIMAL",
          "fb": "Ensures continuity of student support staff while awaiting guaranteed federal Fundeb reimbursement."
        },
        {
          "txt": "Delay support staff pay until federal transfers clear",
          "tag": "SUBOPTIMAL",
          "fb": "Causes financial distress to low-income staff, triggering work stoppages."
        },
        {
          "txt": "Cut support staff hours by 50% permanently",
          "tag": "CRITICAL",
          "fb": "Disrupts essential personal care for students with severe disabilities."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Cash Flow Liquidity Management",
        "question": "How can cities manage federal fund delays without disrupting frontline educational services?",
        "hint": "Utilize treasury advances authorized for constitutionally guaranteed educational expenditures.",
        "legalBase": "Fundeb Law 14.113/20 allows municipal treasury bridging mechanisms for mandatory payroll continuity."
      }
    },
    "es": {
      "title": "Transferencia de Fundeb Retrasada 45 Días",
      "sub": "Ley Fundeb 14.113/20 Art. 25 — Plazos Legales de Transferencia",
      "body": "Retraso en transferencia federal deja nómina de personal de apoyo corta por $40.000 para el próximo ciclo.",
      "opts": [
        {
          "txt": "Usar línea de anticipo de tesorería municipal para pagar nómina a tiempo",
          "tag": "ÓPTIMO",
          "fb": "Asegura la continuidad del personal de apoyo mientras se espera el reembolso garantizado del Fundeb."
        },
        {
          "txt": "Retrasar pago del personal de apoyo hasta que se libere la transferencia",
          "tag": "SUBÓPTIMO",
          "fb": "Genera dificultades financieras al personal provocando paros laborales en las escuelas."
        },
        {
          "txt": "Reducir el horario del personal de apoyo en 50% permanentemente",
          "tag": "CRÍTICO",
          "fb": "Interrumpe la atención personal esencial para estudiantes con discapacidad grave."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gestión de Liquidez de Caja",
        "question": "¿Cómo pueden los municipios gestionar retrasos federales sin interrumpir servicios educativos?",
        "hint": "Utilice anticipos de tesorería autorizados para gastos educativos constitucionalmente garantizados.",
        "legalBase": "La Ley Fundeb 14.113/20 permite mecanismos puente de tesorería para la continuidad salarial."
      }
    }
  },
  "M2F6C2": {
    "en": {
      "title": "Supplier Threatens to Suspend AT Services",
      "sub": "Bidding Law 14.133/21 Art. 137 §2 — Contract Execution Rules",
      "body": "Key contractor threatens to halt software maintenance due to 60-day municipal payment delay.",
      "opts": [
        {
          "txt": "Process priority emergency payment voucher and audit contract execution terms",
          "tag": "OPTIMAL",
          "fb": "Restores contractual compliance, preventing software blackouts in special education classrooms."
        },
        {
          "txt": "Negotiate a 30-day payment extension without partial release of funds",
          "tag": "SUBOPTIMAL",
          "fb": "Keeps operational risk high as vendor may still cut service unilaterally."
        },
        {
          "txt": "Threaten vendor with immediate contract termination for breach",
          "tag": "CRITICAL",
          "fb": "Ignores public admin payment default (Art. 137 §2), precipitating immediate system shutdown."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Public Contractor Relations",
        "question": "When can a private contractor legally suspend services to a public administration?",
        "hint": "Under Bidding Law 14.133/21, delays exceeding 2 months allow contractors to suspend execution.",
        "legalBase": "Bidding Law 14.133/21 Art. 137 §2 grants contractors right of suspension after 2 months of payment default."
      }
    },
    "es": {
      "title": "Proveedor Amenaza con Suspender Servicios de TA",
      "sub": "Ley de Licitaciones 14.133/21 Art. 137 §2 — Ejecución Contractual",
      "body": "Contratista principal amenaza con detener mantenimiento de software debido a 60 días de retraso en pagos municipales.",
      "opts": [
        {
          "txt": "Procesar pago de emergencia prioritario y auditar términos de ejecución contractual",
          "tag": "ÓPTIMO",
          "fb": "Restaura el cumplimiento contractual evitando apagones de software en las aulas especiales."
        },
        {
          "txt": "Negociar prórroga de pago por 30 días sin desembolso parcial de fondos",
          "tag": "SUBÓPTIMO",
          "fb": "Mantiene elevado el riesgo operativo ya que el proveedor puede cortar el servicio unilateralmente."
        },
        {
          "txt": "Amenazar al proveedor con rescisión inmediata del contrato por incumplimiento",
          "tag": "CRÍTICO",
          "fb": "Ignora la mora administrativa (Art. 137 §2), precipitando el apagón inmediato del sistema."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Relación con Contratistas Públicos",
        "question": "¿Cuándo puede un contratista privado suspender legalmente servicios a la administración pública?",
        "hint": "Bajo la Ley de Licitaciones 14.133/21, retrasos superiores a 2 meses facultan la suspensión legal.",
        "legalBase": "Ley 14.133/21 Art. 137 §2 otorga derecho de suspensión tras 2 meses de mora en el pago público."
      }
    }
  },
  "M2F6C3": {
    "en": {
      "title": "Mass Resignation of AEE Specialists",
      "sub": "LDB Art. 67 — Career Plan and Working Conditions",
      "body": "Four out of six AEE specialist teachers resign due to excessive workload and lack of specialized material support.",
      "opts": [
        {
          "txt": "Call emergency civil service replacement list, adjust workload ratios, and upgrade equipment",
          "tag": "OPTIMAL",
          "fb": "Addresses systemic retention factors while restoring immediate specialist headcount."
        },
        {
          "txt": "Reassign regular classroom teachers without special education qualification",
          "tag": "SUBOPTIMAL",
          "fb": "Fills slots physically but degrades pedagogical quality for students with complex needs."
        },
        {
          "txt": "Leave vacancies open and distribute remaining students among 2 teachers",
          "tag": "CRITICAL",
          "fb": "Overburdens remaining staff fatally, destroying the municipal AEE support structure."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Specialist Retention & Working Conditions",
        "question": "How can public systems retain specialized education talent?",
        "hint": "Pair fair compensation with manageable student-teacher ratios and proper working tools.",
        "legalBase": "LDB Art. 67 establishes career valuation and adequate working conditions for specialized education professionals."
      }
    },
    "es": {
      "title": "Renuncia Masiva de Especialistas AEE",
      "sub": "LDB Art. 67 — Plan de Carrera y Condiciones de Trabajo",
      "body": "Cuatro de seis profesores especialistas en AEE renuncian debido a sobrecarga laboral y falta de material especializado.",
      "opts": [
        {
          "txt": "Convocar lista de reemplazo de concurso, ajustar ratios y actualizar equipamiento",
          "tag": "ÓPTIMO",
          "fb": "Aborda factores sistémicos de retención mientras restaura de inmediato la nómina de especialistas."
        },
        {
          "txt": "Reasignar docentes regulares de aula sin especialización en educación especial",
          "tag": "SUBÓPTIMO",
          "fb": "Cubre plazas físicamente pero degrada la calidad pedagógica para alumnos con necesidades complejas."
        },
        {
          "txt": "Dejar vacantes abiertas y distribuir alumnos entre los 2 docentes restantes",
          "tag": "CRÍTICO",
          "fb": "Sobrecarga fatalmente al personal restante destruyendo la estructura de apoyo AEE."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Retención de Especialistas y Condiciones",
        "question": "¿Cómo pueden los sistemas públicos retener el talento especializado en educación?",
        "hint": "Combine remuneración justa con ratios alumno-docente manejables y herramientas de trabajo adecuadas.",
        "legalBase": "LDB Art. 67 establece la valorización de la carrera y condiciones de trabajo adecuadas."
      }
    }
  },
  "M2F6C4": {
    "en": {
      "title": "Support Staff Contracts Expiring",
      "sub": "Consolidated Labor Laws (CLT) / Temporary Hiring Regulations",
      "body": "Contracts for 18 support caregivers expire in 15 days without an active replacement tender.",
      "opts": [
        {
          "txt": "Enact temporary emergency contract extension clause while expediting public selection process",
          "tag": "OPTIMAL",
          "fb": "Prevents immediate disruption in student personal care through lawful extension provisions."
        },
        {
          "txt": "Allow contracts to expire and leave classrooms without caregivers for 30 days",
          "tag": "SUBOPTIMAL",
          "fb": "Forces families to keep severely disabled children at home during coverage gap."
        },
        {
          "txt": "Informally keep staff working without active contracts",
          "tag": "CRITICAL",
          "fb": "Violates public labor laws, exposing public administration to severe labor fines."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Contract Transition Continuity",
        "question": "How should managers handle contract expiration transitions for essential caregivers?",
        "hint": "Utilize statutory extension mechanisms in advance to prevent service gaps.",
        "legalBase": "Public Procurement Law permits exceptional short-term contract extensions to protect continuous public services."
      }
    },
    "es": {
      "title": "Contratos de Personal de Apoyo por Vencer",
      "sub": "Leyes Laborales (CLT) / Normativa de Contratación Temporal",
      "body": "Contratos de 18 cuidadores de apoyo vencen en 15 días sin una licitación de reemplazo activa.",
      "opts": [
        {
          "txt": "Activar cláusula de extensión de emergencia aprobando selección pública acelerada",
          "tag": "ÓPTIMO",
          "fb": "Evita la interrupción inmediata del cuidado personal de los alumnos mediante prórrogas legales."
        },
        {
          "txt": "Dejar vencer los contratos dejando las aulas sin cuidadores durante 30 días",
          "tag": "SUBÓPTIMO",
          "fb": "Obliga a las familias a mantener en casa a niños con discapacidad severa durante el vacío."
        },
        {
          "txt": "Mantener al personal trabajando de forma informal sin contrato activo",
          "tag": "CRÍTICO",
          "fb": "Viola leyes laborales públicas exponiendo a la administración a severas multas."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Continuidad en Transición Contractual",
        "question": "¿Cómo abordar las transiciones de vencimiento contractual para cuidadores esenciales?",
        "hint": "Utilice mecanismos de prórroga previstos en la ley con anticipación para evitar vacíos.",
        "legalBase": "La Ley de Contrataciones permite prórrogas excepcionales para salvaguardar servicios continuos."
      }
    }
  },
  "M2F6C5": {
    "en": {
      "title": "Zero Contingency Reserve Remaining",
      "sub": "Fiscal Responsibility Law 101/2000 Art. 5 — Emergency Reallocation",
      "body": "Emergency legal expenses depleted the contingency fund; a new emergency request for $15,000 arrives.",
      "opts": [
        {
          "txt": "Submit urgent executive budget reallocation bill to City Council targeting low-priority funds",
          "tag": "OPTIMAL",
          "fb": "Secures legal funds transparently through proper legislative authorization."
        },
        {
          "txt": "Siphon funds from teacher training budget without legislative authorization",
          "tag": "SUBOPTIMAL",
          "fb": "Bypasses legislative oversight, exposing manager to budget diversion audit penalties."
        },
        {
          "txt": "Deny emergency request stating contingency fund is zero",
          "tag": "CRITICAL",
          "fb": "Incurs immediate judicial sanction for refusing urgent legally mandated demand."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Rebuilding Emergency Budget Lines",
        "question": "What legal path must be followed when contingency reserves reach zero?",
        "hint": "Request formal supplementary credit authorization from the legislative branch.",
        "legalBase": "LRF Art. 5 requires legislative approval for supplementary credit creation when reserves are exhausted."
      }
    },
    "es": {
      "title": "Reserva de Contingencia Agotada",
      "sub": "Ley de Responsabilidad Fiscal 101/2000 Art. 5 — Reasignación de Emergencia",
      "body": "Gastos judiciales de emergencia agotaron el fondo de contingencia; llega nueva solicitud de emergencia por $15.000.",
      "opts": [
        {
          "txt": "Enviar proyecto urgente de modificación de crédito presupuestario al Concejo Municipal",
          "tag": "ÓPTIMO",
          "fb": "Asegura fondos legales con transparencia mediante autorización legislativa adecuada."
        },
        {
          "txt": "Desviar fondos del presupuesto de capacitación docente sin autorización legislativa",
          "tag": "SUBÓPTIMO",
          "fb": "Omite la supervisión legislativa exponiendo al gestor a sanciones por desvío de partida."
        },
        {
          "txt": "Denegar la solicitud de emergencia indicando que la contingencia está en cero",
          "tag": "CRÍTICO",
          "fb": "Incurre en sanción judicial inmediata por rechazar una demanda urgente ordenada por ley."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Reconstrucción de Créditos de Emergencia",
        "question": "¿Qué vía legal debe seguirse cuando la reserva de contingencia llega a cero?",
        "hint": "Solicite autorización formal de crédito suplementario al poder legislativo.",
        "legalBase": "La LRF Art. 5 exige aprobación legislativa para la creación de créditos suplementarios al agotar reservas."
      }
    }
  },
  "M3F7C1": {
    "en": {
      "title": "AAC Software: License vs. Purchase",
      "sub": "Bidding Law 14.133/21 — Total Cost of Ownership (TCO)",
      "body": "Decision between $8,000/year subscription or $25,000 one-time purchase with 3-year support horizon.",
      "opts": [
        {
          "txt": "Choose $25k perpetual purchase with 3-year support based on lower Total Cost of Ownership",
          "tag": "OPTIMAL",
          "fb": "Optimizes public funds over 3+ years while guaranteeing software stability for non-verbal students."
        },
        {
          "txt": "Select $8k annual subscription without long-term cost comparison",
          "tag": "SUBOPTIMAL",
          "fb": "Incurs higher cumulative costs over 4 years and creates recurring budget vulnerability."
        },
        {
          "txt": "Download free open-source software lacking technical support or maintenance",
          "tag": "CRITICAL",
          "fb": "Leaves non-verbal students with unstable software that breaks without vendor support."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Total Cost of Ownership (TCO)",
        "question": "Why should Total Cost of Ownership guide public software procurement?",
        "hint": "TCO accounts for licensing, maintenance, support, and long-term financial predictability.",
        "legalBase": "Bidding Law 14.133/21 requires lifecycle cost evaluation (TCO) in public tech procurements."
      }
    },
    "es": {
      "title": "Software CAA: Licencia Recurrente vs Compra",
      "sub": "Ley de Licitaciones 14.133/21 — Costo Total de Propiedad (TCO)",
      "body": "Decisión entre suscripción de $8.000/año o compra única de $25.000 con horizonte de soporte de 3 años.",
      "opts": [
        {
          "txt": "Elegir compra perpetua de $25k con 3 años de soporte basada en un Costo Total de Propiedad menor",
          "tag": "ÓPTIMO",
          "fb": "Optimiza fondos públicos a 3+ años garantizando estabilidad de software para alumnos no verbales."
        },
        {
          "txt": "Seleccionar suscripción anual de $8k sin comparación de costo a largo plazo",
          "tag": "SUBÓPTIMO",
          "fb": "Incurre en mayores costos acumulados a 4 años y genera vulnerabilidad presupuestaria recurrente."
        },
        {
          "txt": "Descargar software libre sin soporte técnico ni mantenimiento",
          "tag": "CRÍTICO",
          "fb": "Deja a alumnos no verbales con software inestable que falla sin soporte del proveedor."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Costo Total de Propiedad (TCO)",
        "question": "¿Por qué el Costo Total de Propiedad debe guiar las compras públicas de software?",
        "hint": "El TCO contempla licencias, mantenimiento, soporte y previsibilidad financiera a largo plazo.",
        "legalBase": "La Ley de Licitaciones 14.133/21 exige evaluación de costo de ciclo de vida (TCO) en compras tecnológicas."
      }
    }
  },
  "M3F7C2": {
    "en": {
      "title": "Tablet Deployment: Centralized vs. School-Based",
      "sub": "PNE Goal 7 — Educational Technology Quality",
      "body": "50 acquired accessibility tablets must be distributed: centralized resource lab vs 2 per school.",
      "opts": [
        {
          "txt": "Distribute tablets directly to school resource rooms paired with customized usage tracking",
          "tag": "OPTIMAL",
          "fb": "Ensures daily direct accessibility for students in their local schools, maximizing equipment usage."
        },
        {
          "txt": "Keep all tablets in a central secretariat lab requiring student travel",
          "tag": "SUBOPTIMAL",
          "fb": "Creates transportation barriers that prevent daily classroom integration."
        },
        {
          "txt": "Store tablets in central warehouse until formal launch event",
          "tag": "CRITICAL",
          "fb": "Leaves high-value technology unused while warranty period expires."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Decentralized Resource Deployment",
        "question": "Why does decentralizing Assistive Technology yield higher pedagogical impact?",
        "hint": "Proximity to the student in their regular school environment ensures daily functional inclusion.",
        "legalBase": "PNE Goal 7 highlights equity in technological infrastructure distribution across all municipal schools."
      }
    },
    "es": {
      "title": "Despliegue de Tablets: Centralizado vs Descentralizado",
      "sub": "PNE Meta 7 — Calidad en Tecnología Educativa",
      "body": "50 tablets de accesibilidad adquiridas deben distribuirse: laboratorio centralizado vs 2 por escuela.",
      "opts": [
        {
          "txt": "Distribuir tablets directamente a salas de recursos escolares con seguimiento de uso",
          "tag": "ÓPTIMO",
          "fb": "Garantiza accesibilidad directa diaria en las escuelas locales maximizando el uso del equipo."
        },
        {
          "txt": "Mantener todas las tablets en un laboratorio central exigiendo desplazamiento estudiantil",
          "tag": "SUBÓPTIMO",
          "fb": "Crea barreras de transporte que impiden la integración diaria en el aula."
        },
        {
          "txt": "Almacenar tablets en depósito central hasta evento formal de lanzamiento",
          "tag": "CRÍTICO",
          "fb": "Deja tecnología de alto valor inutilizada mientras vence la garantía."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Despliegue Descentralizado de Recursos",
        "question": "¿Por qué descentralizar la Tecnología Asistiva genera mayor impacto pedagógico?",
        "hint": "La cercanía al estudiante en su entorno escolar regular asegura la inclusión funcional diaria.",
        "legalBase": "La Meta 7 del PNE destaca la equidad en la distribución de infraestructura tecnológica escolar."
      }
    }
  },
  "M3F7C3": {
    "en": {
      "title": "Type 2 AEE Resource Room Procurement",
      "sub": "MEC Resolution 4/2009 — Resource Room Standard Specifications",
      "body": "Full equipping of 2 Type 2 Resource Rooms with Braille embossers and high-end software costs $50,000.",
      "opts": [
        {
          "txt": "Procure complete Type 2 rooms following MEC standards and train dedicated specialist staff",
          "tag": "OPTIMAL",
          "fb": "Establishes full specialized infrastructure for visual and physical impairment support."
        },
        {
          "txt": "Purchase equipment without Braille embossers to save $15,000",
          "tag": "SUBOPTIMAL",
          "fb": "Leaves room incomplete according to MEC Type 2 standards, failing blind students."
        },
        {
          "txt": "Buy cheap consumer electronics without specialized accessibility software",
          "tag": "CRITICAL",
          "fb": "Wastes public funds on generic hardware that lacks specialized assistive capability."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Standardized Resource Rooms",
        "question": "What defines a MEC Type 2 Multifunctional Resource Room?",
        "hint": "Type 2 rooms specifically contain advanced Assistive Technology for visual and physical accessibility.",
        "legalBase": "MEC Resolution 4/2009 sets regulatory equipment standards for Type 1 and Type 2 Resource Rooms."
      }
    },
    "es": {
      "title": "Salas de Recursos AEE Tipo 2 Completa",
      "sub": "Resolución MEC 4/2009 — Especificaciones de Salas de Recursos",
      "body": "Equipamiento completo de 2 Salas de Recursos Tipo 2 con impresoras Braille y software avanzado cuesta $50.000.",
      "opts": [
        {
          "txt": "Adquirir salas Tipo 2 completas según norma MEC capacitando personal especialista",
          "tag": "ÓPTIMO",
          "fb": "Establece infraestructura especializada completa para apoyo a discapacidad visual y física."
        },
        {
          "txt": "Comprar equipos sin impresoras Braille para ahorrar $15.000",
          "tag": "SUBÓPTIMO",
          "fb": "Deja la sala incompleta según estándar MEC Tipo 2 fallando a estudiantes ciegos."
        },
        {
          "txt": "Comprar electrónica de consumo barata sin software accesible especializado",
          "tag": "CRÍTICO",
          "fb": "Desperdicia fondos públicos en hardware genérico que carece de capacidad asistiva."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Salas de Recursos Estandarizadas",
        "question": "¿Qué define una Sala de Recursos Multifuncionales Tipo 2 del MEC?",
        "hint": "Las salas Tipo 2 contienen tecnología avanzada específica para accesibilidad visual y física.",
        "legalBase": "La Resolución MEC 4/2009 establece estándares normativos para Salas de Recursos Tipo 1 y Tipo 2."
      }
    }
  },
  "M3F7C4": {
    "en": {
      "title": "Assistive Tech Maintenance Strategy",
      "sub": "Efficiency Principle (CF/88 Art. 37)",
      "body": "Contracting third-party maintenance ($12,000/yr) vs training existing municipal IT staff ($5,000 initial).",
      "opts": [
        {
          "txt": "Invest $5k in specialized training for internal municipal IT staff to handle maintenance",
          "tag": "OPTIMAL",
          "fb": "Builds permanent internal technical capacity and lowers long-term operational maintenance costs."
        },
        {
          "txt": "Sign $12k annual third-party maintenance contract",
          "tag": "SUBOPTIMAL",
          "fb": "Ensures maintenance service but creates permanent annual financial dependency on vendor."
        },
        {
          "txt": "Do not plan maintenance and repair devices only after complete breakdown",
          "tag": "CRITICAL",
          "fb": "Causes prolonged equipment downtime, leaving students without assistive support for months."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Building Internal Technical Capacity",
        "question": "How does internalizing Assistive Tech maintenance align with public efficiency?",
        "hint": "Training internal public servants reduces long-term operational expenses and response times.",
        "legalBase": "CF/88 Art. 37 Efficiency Principle requires public managers to optimize administrative operational costs."
      }
    },
    "es": {
      "title": "Mantenimiento de TA: Empresa vs Técnico Municipal",
      "sub": "Principio de Eficiencia (CF/88 Art. 37)",
      "body": "Contratación de mantenimiento externo ($12.000/año) vs capacitar personal técnico municipal existente ($5.000 inicial).",
      "opts": [
        {
          "txt": "Invertir $5k en capacitar personal de TI municipal existente para asumir mantenimiento",
          "tag": "ÓPTIMO",
          "fb": "Desarrolla capacidad técnica interna permanente reduciendo costos operacionales a largo plazo."
        },
        {
          "txt": "Firmar contrato de mantenimiento externo de $12k anuales",
          "tag": "SUBÓPTIMO",
          "fb": "Garantiza el servicio pero crea dependencia financiera anual permanente del proveedor."
        },
        {
          "txt": "No planificar mantenimiento y reparar equipos solo tras roturas completas",
          "tag": "CRÍTICO",
          "fb": "Causa inactividad prolongada de equipos dejando a alumnos sin apoyo por meses."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Desarrollo de Capacidad Técnica Interna",
        "question": "¿Cómo se alinea la internalización del mantenimiento de TA con la eficiencia pública?",
        "hint": "Capacitar a servidores públicos internos reduce gastos operativos y tiempos de respuesta.",
        "legalBase": "El Principio de Eficiencia de la CF/88 Art. 37 exige optimizar los costos operacionales de la administración."
      }
    }
  },
  "M3F7C5": {
    "en": {
      "title": "Used Tablet Donation Without Tender",
      "sub": "Public Admin Donation Regulations / Tech Asset Standards",
      "body": "Local tech firm offers 30 used tablets. Requires $4,000 refurbishment and software upgrades.",
      "opts": [
        {
          "txt": "Accept donation conditionally, conduct technical audit, and fund $4k refurbish for AEE room use",
          "tag": "OPTIMAL",
          "fb": "Gains 30 functional devices cost-effectively through legal donation acceptance guidelines."
        },
        {
          "txt": "Accept donation without technical inspection and distribute directly to schools",
          "tag": "SUBOPTIMAL",
          "fb": "Risks distributing defective devices with failing batteries and outdated operating systems."
        },
        {
          "txt": "Reject corporate donation outright due to administrative bureaucracy",
          "tag": "CRITICAL",
          "fb": "Misses valuable private sector partnership opportunity to expand accessibility assets."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Corporate Donations Governance",
        "question": "What legal steps govern receiving private corporate equipment donations?",
        "hint": "Incorporate donated assets into public inventory through formal audit and asset registration.",
        "legalBase": "Public Asset Management rules require technical audit and official registration for corporate donations."
      }
    },
    "es": {
      "title": "Donación de Tablets Usadas Sin Licitación",
      "sub": "Reglamento de Donaciones a Adm. Pública / Normas Tecnológicas",
      "body": "Empresa tecnológica local ofrece 30 tablets usadas. Requiere $4.000 en reacondicionamiento y licencias.",
      "opts": [
        {
          "txt": "Aceptar donación condicionalmente, realizar auditoría técnica y financiar $4k de reacondicionamiento",
          "tag": "ÓPTIMO",
          "fb": "Obtiene 30 dispositivos funcionales de forma rentable mediante pautas legales de donación."
        },
        {
          "txt": "Aceptar donación sin inspección técnica y distribuir directamente a las escuelas",
          "tag": "SUBÓPTIMO",
          "fb": "Arriesga distribuir dispositivos defectuosos con baterías agotadas y sistemas obsoletos."
        },
        {
          "txt": "Rechazar la donación corporativa por burocracia administrativa",
          "tag": "CRÍTICO",
          "fb": "Desaprovecha una valiosa oportunidad de alianza con el sector privado para expandir recursos."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gobernanza de Donaciones Corporativas",
        "question": "¿Qué pasos legales rigen la recepción de donaciones de equipos por empresas privadas?",
        "hint": "Incorpore bienes donados al inventario público mediante auditoría técnica e inventariado oficial.",
        "legalBase": "Las normas de Patrimonio Público exigen auditoría técnica e inventario formal para donaciones privadas."
      }
    }
  },
  "M3F8C1": {
    "en": {
      "title": "AEE Specialization Course ($3.5k/slot)",
      "sub": "LDB Art. 62 — Continuing Teacher Education",
      "body": "Private institute offers accredited AEE specialization for 10 teachers at $3,500/slot ($35,000 total).",
      "opts": [
        {
          "txt": "Sponsor 10 teachers with mandatory service commitment to remain in municipal network for 3 years",
          "tag": "OPTIMAL",
          "fb": "Ensures public return on qualification investment through mandatory retention covenants."
        },
        {
          "txt": "Sponsor 10 teachers without service commitment clauses",
          "tag": "SUBOPTIMAL",
          "fb": "Risks losing qualified teachers to private schools immediately after graduation."
        },
        {
          "txt": "Refuse to fund private higher education courses",
          "tag": "CRITICAL",
          "fb": "Stalls teacher qualification, perpetuating pedagogical gaps in inclusive classrooms."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Public Qualification Investment Covenants",
        "question": "How can public administrations protect investment in teacher specialization?",
        "hint": "Require statutory retention commitments ensuring trained staff serve public schools.",
        "legalBase": "LDB Art. 62 allows public funding for teacher qualification tied to public service retention terms."
      }
    },
    "es": {
      "title": "Especialización AEE $3.5k por Vacante",
      "sub": "LDB Art. 62 — Educación Continua Docente",
      "body": "Instituto privado ofrece especialización acreditada en AEE para 10 docentes a $3.500/vacante ($35.000 total).",
      "opts": [
        {
          "txt": "Financiar 10 docentes con compromiso legal de permanencia en la red municipal por 3 años",
          "tag": "ÓPTIMO",
          "fb": "Asegura el retorno público de la inversión mediante cláusulas de permanencia obligatoria."
        },
        {
          "txt": "Financiar 10 docentes sin cláusulas de compromiso de permanencia",
          "tag": "SUBÓPTIMO",
          "fb": "Arriesga perder docentes calificados que migren a escuelas privadas tras graduarse."
        },
        {
          "txt": "Rechazar el financiamiento de cursos de educación superior privada",
          "tag": "CRÍTICO",
          "fb": "Estanca la cualificación docente perpetuando brechas pedagógicas en aulas inclusivas."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Cláusulas de Retorno de Inversión Pública",
        "question": "¿Cómo pueden las administraciones públicas proteger las inversiones en capacitación docente?",
        "hint": "Exija compromisos legales de permanencia garantizando que el personal atienda escuelas públicas.",
        "legalBase": "LDB Art. 62 permite financiar cualificación docente vinculada a términos de permanencia pública."
      }
    }
  },
  "M3F8C2": {
    "en": {
      "title": "Free Public University Training Partnership",
      "sub": "LDB Art. 62 §1 — Academic Cooperation Agreements",
      "body": "Public University offers free training, but requires municipal provision of transport and course materials ($8,000 total).",
      "opts": [
        {
          "txt": "Sign cooperation agreement and allocate $8k for transport and course materials",
          "tag": "OPTIMAL",
          "fb": "Leverages high-level university expertise for a fraction of full tuition costs."
        },
        {
          "txt": "Ask university to cover student transportation costs as well",
          "tag": "SUBOPTIMAL",
          "fb": "Risks losing the university partnership over minor logistics cost disputes."
        },
        {
          "txt": "Decline agreement because university does not pay 100% of costs",
          "tag": "CRITICAL",
          "fb": "Forfeits premium academic training for municipal staff over minimal logistical costs."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Public-Public Academic Cooperation",
        "question": "Why are university cooperation agreements highly cost-effective?",
        "hint": "Combining university academic faculty with municipal logistics creates maximum public value.",
        "legalBase": "LDB Art. 62 §1 prioritizes institutional partnerships between public universities and local school systems."
      }
    },
    "es": {
      "title": "Convenio Gratuito con Universidad Pública",
      "sub": "LDB Art. 62 §1 — Acuerdos de Cooperación Académica",
      "body": "Universidad Pública ofrece capacitación gratuita, pero requiere que el municipio provea transporte y materiales ($8.000 total).",
      "opts": [
        {
          "txt": "Firmar acuerdo de cooperación y asignar $8k para transporte y materiales de estudio",
          "tag": "ÓPTIMO",
          "fb": "Aprovecha la excelencia universitaria pública por una fracción del costo de matrícula."
        },
        {
          "txt": "Pedir a la universidad que asuma también los costos de transporte",
          "tag": "SUBÓPTIMO",
          "fb": "Arriesga perder la alianza universitaria por disputas menores de logística."
        },
        {
          "txt": "Rechazar el convenio porque la universidad no asume el 100% de los costos",
          "tag": "CRÍTICO",
          "fb": "Pierde capacitación académica de primer nivel por costos logísticos mínimos."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Cooperación Académica Interpública",
        "question": "¿Por qué los convenios universitarios son altamente costo-efectivos?",
        "hint": "Combinar el cuerpo docente universitario con la logística municipal genera máximo valor público.",
        "legalBase": "LDB Art. 62 §1 prioriza alianzas institucionales entre universidades públicas y redes locales."
      }
    }
  },
  "M3F8C3": {
    "en": {
      "title": "Training Priority: Braille, LIBRAS, or AAC",
      "sub": "LBI Art. 28 XI — Specialized Modality Preparation",
      "body": "Limited budget ($12,000) allows funding training for only one major specialized domain this semester.",
      "opts": [
        {
          "txt": "Analyze network census student data to prioritize the domain with highest active demand (e.g., LIBRAS/AAC)",
          "tag": "OPTIMAL",
          "fb": "Directs scarce training capital to immediately serve the largest group of enrolled students."
        },
        {
          "txt": "Split $12k equally among all three domains, creating shallow introductory courses",
          "tag": "SUBOPTIMAL",
          "fb": "Provides insufficient depth for true specialized competence in any domain."
        },
        {
          "txt": "Select training domain based on personal preference of secretariat staff",
          "tag": "CRITICAL",
          "fb": "Ignores diagnostic student census data, leaving major student populations without qualified staff."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Data-Driven Qualification Priorities",
        "question": "How should public managers prioritize specialized training topics under tight budgets?",
        "hint": "Use official census data to align training topics directly with active student needs.",
        "legalBase": "LBI Art. 28 XI mandates specialized qualification tailored to student modality demands."
      }
    },
    "es": {
      "title": "Capacitación Prioritaria: Braille, LIBRAS o CAA",
      "sub": "LBI Art. 28 XI — Preparación para Modalidades Especializadas",
      "body": "Presupuesto limitado ($12.000) permite financiar capacitación en solo una gran área especializada este semestre.",
      "opts": [
        {
          "txt": "Analizar el censo escolar para priorizar el área con mayor demanda activa de alumnos",
          "tag": "ÓPTIMO",
          "fb": "Dirige el capital escaso para atender de inmediato al grupo más numeroso de alumnos matriculados."
        },
        {
          "txt": "Dividir $12k por igual entre las tres áreas creando cursos introductorios superficiales",
          "tag": "SUBÓPTIMO",
          "fb": "Ofrece profundidad insuficiente para lograr competencia especializada real en cualquier área."
        },
        {
          "txt": "Seleccionar el tema según la preferencia personal del personal administrativo",
          "tag": "CRÍTICO",
          "fb": "Ignora los datos del censo dejando a poblaciones clave de alumnos sin personal calificado."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Prioridades de Cualificación Basadas en Datos",
        "question": "¿Cómo priorizar temas de capacitación especializada con presupuestos reducidos?",
        "hint": "Utilice datos del censo oficial para alinear los temas con las necesidades estudiantiles activas.",
        "legalBase": "LBI Art. 28 XI exige cualificación especializada adaptada a las demandas de modalidad de los alumnos."
      }
    }
  },
  "M3F8C4": {
    "en": {
      "title": "LIBRAS Interpreter Hiring Strategy",
      "sub": "Law 12.319/10 — LIBRAS Translator and Interpreter Regulations",
      "body": "Urgent need for 3 LIBRAS interpreters: permanent civil service exam vs temporary CLT vs outsourcing.",
      "opts": [
        {
          "txt": "Launch permanent civil service exam while contracting temporary CLT interpreters for immediate coverage",
          "tag": "OPTIMAL",
          "fb": "Ensures immediate sign-language support for deaf students while building permanent municipal staff."
        },
        {
          "txt": "Rely 100% on outsourced private agency interpreters long-term",
          "tag": "SUBOPTIMAL",
          "fb": "Incurs higher recurring costs and high turnover of interpreters disrupting student bonding."
        },
        {
          "txt": "Ask regular teachers to learn basic sign language without hiring professional interpreters",
          "tag": "CRITICAL",
          "fb": "Violates Law 12.319/10, denying deaf students professional interpretation rights."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Professional Interpretation Rights",
        "question": "Why is professional LIBRAS interpretation a distinct legal right?",
        "hint": "LIBRAS is an official national language requiring certified professional interpreters under Law 12.319/10.",
        "legalBase": "Law 12.319/2010 regulates the profession of LIBRAS Translator and Interpreter in education."
      }
    },
    "es": {
      "title": "Intérprete de LIBRAS: Concurso, CLT o Subcontratación",
      "sub": "Ley 12.319/10 — Regulación de Traductores e Intérpretes de LIBRAS",
      "body": "Necesidad urgente de 3 intérpretes de LIBRAS: concurso público permanente vs contrato CLT temporal vs subcontratación.",
      "opts": [
        {
          "txt": "Lanzar concurso público permanente contratando temporales CLT para cobertura inmediata",
          "tag": "ÓPTIMO",
          "fb": "Asegura interpretación inmediata para alumnos sordos mientras construye planta municipal permanente."
        },
        {
          "txt": "Depender 100% de empresas subcontratadas de forma permanente",
          "tag": "SUBÓPTIMO",
          "fb": "Incurre en mayores costos recurrentes y rotación de personal que afecta el vínculo pedagógico."
        },
        {
          "txt": "Pedir a docentes regulares aprender señas básicas sin contratar intérpretes profesionales",
          "tag": "CRÍTICO",
          "fb": "Viola la Ley 12.319/10 negando a los alumnos sordos el derecho a interpretación profesional."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Derecho a la Interpretación Profesional",
        "question": "¿Por qué la interpretación profesional de LIBRAS es un derecho legal específico?",
        "hint": "La LIBRAS es un idioma oficial que requiere intérpretes profesionales certificados según la Ley 12.319/10.",
        "legalBase": "La Ley 12.319/2010 regula la profesión de Traductor e Intérprete de LIBRAS en educación."
      }
    }
  },
  "M3F8C5": {
    "en": {
      "title": "School Principal Refuses Inclusive Protocol",
      "sub": "LBI Art. 88 — Discrimination Crime against Persons with Disabilities",
      "body": "Newly appointed principal refuses enrollment of 3 students with severe ASD citing lack of structure.",
      "opts": [
        {
          "txt": "Issue immediate administrative order enforcing enrollment, launch disciplinary inquiry, and deploy support team",
          "tag": "OPTIMAL",
          "fb": "Upholds non-negotiable right to public education and enforces anti-discrimination criminal laws."
        },
        {
          "txt": "Transfer the 3 students to another distant school without disciplining principal",
          "tag": "SUBOPTIMAL",
          "fb": "Validates discriminatory refusal and imposes illegal burden on affected families."
        },
        {
          "txt": "Allow principal to deny enrollment until school receives new infrastructure",
          "tag": "CRITICAL",
          "fb": "Commits illegal barrier to education, exposing administration to criminal liability under LBI Art. 88."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Zero Tolerance for Discrimination",
        "question": "What are the legal consequences of refusing enrollment to students with disabilities?",
        "hint": "Refusing enrollment on grounds of disability is a criminal offense under LBI Art. 88.",
        "legalBase": "LBI Art. 88 defines refusing or delaying enrollment of persons with disabilities as a crime punishable by imprisonment."
      }
    },
    "es": {
      "title": "Director Recién Nombrado Rechaza Educación Inclusiva",
      "sub": "LBI Art. 88 — Delito de Discriminación contra Personas con Discapacidad",
      "body": "Director recién nombrado rechaza la matrícula de 3 alumnos con TEA grave alegando falta de estructura.",
      "opts": [
        {
          "txt": "Emitir orden de matrícula inmediata, abrir expediente disciplinario y desplegar equipo de apoyo",
          "tag": "ÓPTIMO",
          "fb": "Garantiza el derecho innegable a la educación pública haciendo cumplir leyes antidiscriminación."
        },
        {
          "txt": "Transferir a los 3 alumnos a otra escuela distante sin sancionar al director",
          "tag": "SUBÓPTIMO",
          "fb": "Valida el rechazo discriminatorio imponiendo una carga ilegal a las familias afectadas."
        },
        {
          "txt": "Permitir al director denegar la matrícula hasta recibir nueva infraestructura",
          "tag": "CRÍTICO",
          "fb": "Incurre en barrera ilegal a la educación expuesta a responsabilidad penal bajo LBI Art. 88."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Tolerancia Cero a la Discriminación",
        "question": "¿Cuáles son las consecuencias legales de rechazar la matrícula de alumnos con discapacidad?",
        "hint": "Rechazar la matrícula por motivos de discapacidad constituye delito penal bajo el Art. 88 de la LBI.",
        "legalBase": "LBI Art. 88 tipifica como delito sancionado con prisión rechazar o retrasar la inscripción por discapacidad."
      }
    }
  },
  "M3F9C1": {
    "en": {
      "title": "Municipal Special Ed Plan Targets",
      "sub": "PNE Goal 4 / Municipal Education Plan Guidelines",
      "body": "Drafting 10-year Municipal Special Education Policy with enforceable quantitative metrics.",
      "opts": [
        {
          "txt": "Establish verifiable quantitative targets for resource room coverage, physical accessibility, and teacher qualification",
          "tag": "OPTIMAL",
          "fb": "Creates a robust, binding public policy framework capable of guiding investments across administrations."
        },
        {
          "txt": "Write broad qualitative goals without specific numerical indicators or deadlines",
          "tag": "SUBOPTIMAL",
          "fb": "Produces symbolic policy that lacks concrete accountability or measurable enforcement."
        },
        {
          "txt": "Copy another municipality policy blindly without local diagnostic census data",
          "tag": "CRITICAL",
          "fb": "Fails to address real local infrastructure and population demands."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — State Policy vs Temporary Administration",
        "question": "Why must Municipal Special Education Plans contain enforceable quantitative targets?",
        "hint": "Quantitative metrics ensure continuity across political election cycles and administrative changes.",
        "legalBase": "National Education Plan (PNE) Law 13.005/14 requires measurable goals for local education plans."
      }
    },
    "es": {
      "title": "Plan Municipal de Ed. Especial con Metas Cuantificables",
      "sub": "PNE Meta 4 / Lineamientos del Plan Municipal de Educación",
      "body": "Redacción de la Política Municipal de Educación Especial a 10 años con métricas cuantitativas exigibles.",
      "opts": [
        {
          "txt": "Establecer metas cuantitativas verificables de cobertura de salas, accesibilidad y docentes",
          "tag": "ÓPTIMO",
          "fb": "Crea una política pública vinculante capaz de guiar inversiones a través de diferentes gestiones."
        },
        {
          "txt": "Redactar objetivos cualitativos generales sin indicadores numéricos ni plazos",
          "tag": "SUBÓPTIMO",
          "fb": "Produce política simbólica que carece de rendición de cuentas concreta."
        },
        {
          "txt": "Copiar la política de otro municipio a ciegas sin diagnóstico local",
          "tag": "CRÍTICO",
          "fb": "No logra responder a las demandas reales de infraestructura y población local."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Política de Estado vs Gestión Temporal",
        "question": "¿Por qué los Planes Municipales deben contener metas cuantitativas exigibles?",
        "hint": "Las métricas cuantitativas garantizan continuidad a través de ciclos electorales y cambios de gobierno.",
        "legalBase": "La Ley 13.005/14 del Plan Nacional de Educación exige metas medibles para los planes locales."
      }
    }
  },
  "M3F9C2": {
    "en": {
      "title": "Inter-Municipal Assistive Tech Consortium",
      "sub": "Public Consortiums Law 11.107/05",
      "body": "Proposal to join 4 neighboring municipalities to pool purchasing power for expensive AT devices.",
      "opts": [
        {
          "txt": "Join public consortium to gain economies of scale and lower unit prices for high-end Assistive Tech",
          "tag": "OPTIMAL",
          "fb": "Dramatically enhances purchasing leverage, obtaining advanced devices at reduced costs."
        },
        {
          "txt": "Participate in consortium discussions without committing municipal funds",
          "tag": "SUBOPTIMAL",
          "fb": "Delays joint purchasing benefits while local costs remain elevated."
        },
        {
          "txt": "Reject consortium due to desire for complete local procurement control",
          "tag": "CRITICAL",
          "fb": "Pays significantly higher prices for isolated, small-volume AT procurements."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Regional Economies of Scale",
        "question": "How do public consortiums improve municipal purchasing power?",
        "hint": "Aggregating regional demand enables lower unit prices and shared specialized technical expertise.",
        "legalBase": "Public Consortiums Law 11.107/05 authorizes inter-municipal cooperation for shared public procurement."
      }
    },
    "es": {
      "title": "Consorcio Intermunicipal para Tecnología Asistiva",
      "sub": "Ley de Consorcios Públicos 11.107/05",
      "body": "Propuesta para unirse a 4 municipios vecinos y consolidar poder de compra para dispositivos de TA costosos.",
      "opts": [
        {
          "txt": "Unirse al consorcio público para lograr economías de escala y reducir precios unitarios de TA",
          "tag": "ÓPTIMO",
          "fb": "Aumenta drásticamente el poder de negociación obteniendo dispositivos avanzados a menor costo."
        },
        {
          "txt": "Participar en discusiones del consorcio sin comprometer fondos municipales",
          "tag": "SUBÓPTIMO",
          "fb": "Retrasa los beneficios de compra conjunta mientras los costos locales permanecen elevados."
        },
        {
          "txt": "Rechazar el consorcio por deseo de control local absoluto de compras",
          "tag": "CRÍTICO",
          "fb": "Paga precios significativamente más altos por compras aisladas de bajo volumen."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Economías de Escala Regionales",
        "question": "¿Cómo mejoran los consorcios públicos el poder de compra municipal?",
        "hint": "Agrupar la demanda regional permite reducir precios unitarios y compartir conocimientos técnicos.",
        "legalBase": "La Ley 11.107/05 de Consorcios Públicos autoriza la cooperación intermunicipal para contrataciones."
      }
    }
  },
  "M3F9C3": {
    "en": {
      "title": "8% Drop in Special Ed Retention (INEP)",
      "sub": "LDB Art. 59 — School Retention and Inclusion Standards",
      "body": "School census reveals an 8% drop in retention rates for students with disabilities.",
      "opts": [
        {
          "txt": "Form multi-disciplinary task force to audit individual dropouts and implement personalized retention plans",
          "tag": "OPTIMAL",
          "fb": "Addresses specific pedagogical and accessibility barriers causing student dropouts."
        },
        {
          "txt": "Offer generic attendance awards to schools without addressing individual barriers",
          "tag": "SUBOPTIMAL",
          "fb": "Fails to resolve specific mobility, communication, or learning challenges driving dropouts."
        },
        {
          "txt": "Disregard census data as temporary statistical noise",
          "tag": "CRITICAL",
          "fb": "Ignores growing student exclusion, violating constitutional mandate for continuous inclusion."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Student Retention & Dropout Prevention",
        "question": "Why is enrollment retention as crucial as initial school enrollment?",
        "hint": "Inclusion requires active daily participation and retention, not merely initial enrollment lists.",
        "legalBase": "LDB Art. 59 mandates conditions for student retention and progress in regular classrooms."
      }
    },
    "es": {
      "title": "INEP: Caída del 8% en Permanencia de Ed. Especial",
      "sub": "LDB Art. 59 — Estándares de Permanencia y Calidad Inclusiva",
      "body": "Censo escolar revela una caída del 8% en las tasas de permanencia de estudiantes con discapacidad.",
      "opts": [
        {
          "txt": "Formar equipo multidisciplinario para auditar deserción e implementar planes de permanencia",
          "tag": "ÓPTIMO",
          "fb": "Aborda las barreras pedagógicas y de accesibilidad específicas que provocan la deserción escolar."
        },
        {
          "txt": "Ofrecer premios genéricos de asistencia a escuelas sin abordar barreras individuales",
          "tag": "SUBÓPTIMO",
          "fb": "No logra resolver desafíos específicos de movilidad o comunicación que causan la deserción."
        },
        {
          "txt": "Desestimar los datos del censo como ruido estadístico temporal",
          "tag": "CRÍTICO",
          "fb": "Ignora la creciente exclusión estudiantil violando el mandato constitucional de inclusión continua."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Permanencia Estudiantil y Prevención de Deserción",
        "question": "¿Por qué la permanencia escolar es tan crucial como la matrícula inicial?",
        "hint": "La inclusión exige participación diaria activa y permanencia, no solo listas iniciales de inscripción.",
        "legalBase": "LDB Art. 59 exige condiciones para la permanencia y progreso de los alumnos en la red regular."
      }
    }
  },
  "M3F9C4": {
    "en": {
      "title": "Unfeasible Municipal Accessibility Bill",
      "sub": "LRF Art. 16 — Financial Impact Analysis Requirement",
      "body": "City Council proposes law mandating specialized caregivers in 100% of classrooms without funding source.",
      "opts": [
        {
          "txt": "Issue technical note requesting financial impact study (LRF Art. 16) and propose realistic phased implementation",
          "tag": "OPTIMAL",
          "fb": "Protects fiscal responsibility while guiding legislative goals into realistic, legally sound phases."
        },
        {
          "txt": "Support unfunded bill publicly to gain political approval despite fiscal impossibility",
          "tag": "SUBOPTIMAL",
          "fb": "Creates an unexecutable legal mandate that triggers future budget failure and litigation."
        },
        {
          "txt": "Veto bill confrontationally without offering alternative technical path",
          "tag": "CRITICAL",
          "fb": "Creates political deadlock with council, damaging future education budget negotiations."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Fiscal Impact in Legislative Projects",
        "question": "Why does the Fiscal Responsibility Law mandate budgetary impact studies for new laws?",
        "hint": "Unfunded mandates lead to public service collapse and administrative insolvency.",
        "legalBase": "LRF Art. 16 requires mandatory fiscal impact analysis and funding source definition for expenditure-creating bills."
      }
    },
    "es": {
      "title": "Ley Municipal de Accesibilidad Inviable",
      "sub": "LRF Art. 16 — Análisis de Impacto Financiero Obligatorio",
      "body": "Concejo Municipal propone ley exigiendo cuidadores especializados en el 100% de las aulas sin fuente de financiamiento.",
      "opts": [
        {
          "txt": "Emitir nota técnica solicitando estudio de impacto (LRF Art. 16) proponiendo implementación gradual",
          "tag": "ÓPTIMO",
          "fb": "Protege la responsabilidad fiscal guiando objetivos legislativos hacia fases realistas y viables."
        },
        {
          "txt": "Apoyar la ley sin fondos para ganar simpatía política a pesar de la imposibilidad fiscal",
          "tag": "SUBÓPTIMO",
          "fb": "Crea un mandato inejecutable que desencadena colapso presupuestario y litigios futuros."
        },
        {
          "txt": "Vetar la ley de forma confrontacional sin ofrecer alternativa técnica",
          "tag": "CRÍTICO",
          "fb": "Genera bloqueo político con el concejo perjudicial para futuras negociaciones presupuestarias."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Impacto Fiscal en Proyectos Legislativos",
        "question": "¿Por qué la Ley de Responsabilidad Fiscal exige estudios de impacto para nuevas leyes?",
        "hint": "Los mandatos sin financiamiento conducen al colapso de los servicios públicos y la insolvencia.",
        "legalBase": "La LRF Art. 16 exige análisis de impacto fiscal y definición de fuente de recursos para nuevos gastos."
      }
    }
  },
  "M3F9C5": {
    "en": {
      "title": "Annual Progress Report to Council & Prosecutor",
      "sub": "LBI Art. 96 — Accountability in Public Disability Policies",
      "body": "Annual report deadline arrives for presenting inclusive education metrics to oversight bodies.",
      "opts": [
        {
          "txt": "Present detailed audit containing real progress metrics, remaining challenges, and next-year allocation plans",
          "tag": "OPTIMAL",
          "fb": "Fosters public trust and demonstrates high institutional maturity in inclusive governance."
        },
        {
          "txt": "Submit minimal report omitting budget execution data for Assistive Technology",
          "tag": "SUBOPTIMAL",
          "fb": "Triggers official requests for clarification from oversight bodies due to incomplete data."
        },
        {
          "txt": "Miss deadline and postpone report submission indefinitely",
          "tag": "CRITICAL",
          "fb": "Breaches statutory public reporting obligations under LBI Art. 96, risking formal oversight sanctions."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Systemic Accountability",
        "question": "How does thorough annual accountability strengthen inclusive education management?",
        "hint": "Transparent reporting builds institutional trust, secures budget stability, and informs future policies.",
        "legalBase": "LBI Art. 96 establishes mandatory periodic public reporting on disability policy progress."
      }
    },
    "es": {
      "title": "Informe Anual al Consejo y Ministerio Público",
      "sub": "LBI Art. 96 — Rendición de Cuentas en Políticas Públicas de Discapacidad",
      "body": "Vence el plazo para presentar el informe anual de métricas de educación inclusiva a los órganos de control.",
      "opts": [
        {
          "txt": "Presentar auditoría detallada con avances reales, desafíos pendientes y plan de asignación anual",
          "tag": "ÓPTIMO",
          "fb": "Fomenta la confianza pública y demuestra alta madurez institucional en gobernanza inclusiva."
        },
        {
          "txt": "Entregar informe mínimo omitiendo datos de ejecución presupuestaria para Tecnología Asistiva",
          "tag": "SUBÓPTIMO",
          "fb": "Provoca requerimientos oficiales de aclaración por parte de los órganos de control."
        },
        {
          "txt": "Incumplir el plazo y posponer indefinidamente la entrega del informe",
          "tag": "CRÍTICO",
          "fb": "Incumple obligaciones de rendición de cuentas según la LBI Art. 96 arriesgando sanciones."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Rendición de Cuentas Sistémica",
        "question": "¿Cómo fortalece la rendición de cuentas anual la gestión de la educación inclusiva?",
        "hint": "Los informes transparentes construyen confianza institucional, aseguran el presupuesto y mejoran las políticas.",
        "legalBase": "LBI Art. 96 establece informes públicos periódicos obligatorios sobre avances en discapacidad."
      }
    }
  },
  "M4F10C1": {
    "en": {
      "title": "Lawsuit Against Federal Gov on Salary Floor",
      "sub": "Federal Constitution Art. 212 / National Salary Floor Law",
      "body": "Municipalities join forces to sue federal government for complementation of teacher salary floor funding.",
      "opts": [
        {
          "txt": "Join national municipal litigation while protecting local special education payroll lines",
          "tag": "OPTIMAL",
          "fb": "Advocates for macroeconomic financial justice while maintaining local operational stability."
        },
        {
          "txt": "Pay below national teacher salary floor unilaterally during lawsuit",
          "tag": "SUBOPTIMAL",
          "fb": "Triggers immediate local teacher strikes and legal fines for labor non-compliance."
        },
        {
          "txt": "Defund Special Education to absorb salary floor increases locally",
          "tag": "CRITICAL",
          "fb": "Cannibalizes inclusion programs to cover general payroll, violating constitutional education targets."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Macro-Financial Education Governance",
        "question": "How can municipalities balance national salary floor mandates with special education funds?",
        "hint": "Engage in collective intergovernmental advocacy while shielding protected inclusion budgets.",
        "legalBase": "Federal Constitution Art. 212 establishes shared financial responsibilities across federal entities."
      }
    },
    "es": {
      "title": "Proceso Contra la Unión: ¿Quién Paga el Piso?",
      "sub": "Constitución Federal Art. 212 / Ley del Piso Salarial Nacional",
      "body": "Municipios unen fuerzas para demandar al gobierno federal por la complementación del piso salarial docente.",
      "opts": [
        {
          "txt": "Unirse al litigio municipal nacional protegiendo las líneas salariales de educación especial",
          "tag": "ÓPTIMO",
          "fb": "Aboga por justicia financiera macroeconómica manteniendo la estabilidad operativa local."
        },
        {
          "txt": "Pagar por debajo del piso salarial docente unilateralmente durante el litigio",
          "tag": "SUBÓPTIMO",
          "fb": "Provoca huelgas docentes inmediatas y multas legales por incumplimiento laboral."
        },
        {
          "txt": "Desfinanciar Educación Especial para absorber aumentos del piso salarial",
          "tag": "CRÍTICO",
          "fb": "Canibaliza programas inclusivos para cubrir la nómina general violando metas constitucionales."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Gobernanza Educativa Macrofinanciera",
        "question": "¿Cómo pueden los municipios equilibrar el piso salarial nacional con los fondos de educación especial?",
        "hint": "Participe en la defensa intergubernamental colectiva protegiendo presupuestos inclusivos.",
        "legalBase": "La Constitución Federal Art. 212 establece responsabilidades financieras compartidas."
      }
    }
  },
  "M4F10C2": {
    "en": {
      "title": "National Directors Alliance",
      "sub": "Intergovernmental Cooperation Principles",
      "body": "Invitation to lead a national coalition advocating for systemic budget increases in inclusive education.",
      "opts": [
        {
          "txt": "Accept leadership role, sharing municipal best practices to influence national legislative reform",
          "tag": "OPTIMAL",
          "fb": "Positions municipal leadership as a national benchmark, driving systemic policy evolution."
        },
        {
          "txt": "Participate passively without sharing technical data or taking active leadership",
          "tag": "SUBOPTIMAL",
          "fb": "Misses opportunity to shape national funding guidelines in favor of local needs."
        },
        {
          "txt": "Decline participation citing local workload constraints",
          "tag": "CRITICAL",
          "fb": "Isolates the municipality from national funding policy decisions and peer support networks."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Institutional Leadership & Advocacy",
        "question": "Why is active participation in national coalitions valuable for local public managers?",
        "hint": "Collective advocacy influences national legislation and opens doors to direct federal funding.",
        "legalBase": "Intergovernmental Cooperation Principles promote joint municipal action to influence public policy."
      }
    },
    "es": {
      "title": "Alianza Nacional de Directores",
      "sub": "Principios de Cooperación Intergubernamental",
      "body": "Invitación para liderar una coalición nacional que abogue por aumentos presupuestarios sistémicos en educación inclusiva.",
      "opts": [
        {
          "txt": "Aceptar liderazgo compartiendo buenas prácticas para influir en reformas legislativas",
          "tag": "ÓPTIMO",
          "fb": "Posiciona la gestión municipal como referente nacional impulsando la evolución de políticas."
        },
        {
          "txt": "Participar pasivamente sin compartir datos técnicos ni asumir liderazgo activo",
          "tag": "SUBÓPTIMO",
          "fb": "Pierde la oportunidad de moldear pautas de financiamiento nacional a favor de necesidades locales."
        },
        {
          "txt": "Rechazar la participación alegando exceso de trabajo local",
          "tag": "CRÍTICO",
          "fb": "Aísla al municipio de decisiones sobre financiamiento nacional y redes de apoyo técnico."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Liderazgo Institucional y Sostenibilidad",
        "question": "¿Por qué la participación en coaliciones nacionales es valiosa para los gestores locales?",
        "hint": "La incidencia colectiva influye en leyes nacionales y abre puertas a financiamiento federal directo.",
        "legalBase": "Los Principios de Cooperación Intergubernamental promueven acción conjunta para políticas públicas."
      }
    }
  },
  "M4F10C3": {
    "en": {
      "title": "AI Procurement Audit System",
      "sub": "LGPD Law 13.709/18 / Public Efficiency Principles",
      "body": "Proposal to implement AI algorithm to detect overpricing and optimize Assistive Tech purchasing.",
      "opts": [
        {
          "txt": "Deploy AI audit system with strict data privacy controls (LGPD) and human supervisor review",
          "tag": "OPTIMAL",
          "fb": "Pioneers cutting-edge fiscal efficiency while maintaining human oversight and data privacy compliance."
        },
        {
          "txt": "Deploy AI audit system without human supervisor verification",
          "tag": "SUBOPTIMAL",
          "fb": "Risks automated procurement rejections based on algorithm false positives without recourse."
        },
        {
          "txt": "Reject technological audit innovation to stick strictly to manual paper audits",
          "tag": "CRITICAL",
          "fb": "Maintains slow, error-prone manual auditing that fails to detect sophisticated vendor overpricing."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Innovation & Technological Governance",
        "question": "How can AI enhance public procurement auditing safely?",
        "hint": "Combine automated price pattern detection with mandatory human decision verification and privacy compliance.",
        "legalBase": "LGPD Law 13.709/18 and Public Efficiency Principles govern technological implementation in public administration."
      }
    },
    "es": {
      "title": "IA para Auditar Gastos con TA",
      "sub": "Ley LGPD 13.709/18 / Principios de Eficiencia Pública",
      "body": "Propuesta para implementar un algoritmo de IA que detecte sobreprecios y optimice las compras de TA.",
      "opts": [
        {
          "txt": "Desplegar sistema de IA con controles de privacidad (LGPD) y supervisión humana obligatoria",
          "tag": "ÓPTIMO",
          "fb": "Pionero en eficiencia fiscal de vanguardia manteniendo supervisión humana y privacidad de datos."
        },
        {
          "txt": "Desplegar sistema de IA sin verificación por supervisores humanos",
          "tag": "SUBÓPTIMO",
          "fb": "Arriesga rechazos automáticos de compras basados en falsos positivos del algoritmo sin recurso."
        },
        {
          "txt": "Rechazar la innovación tecnológica para mantener auditorías manuales en papel",
          "tag": "CRÍTICO",
          "fb": "Mantiene auditorías lentas y propensas a errores que no detectan sobreprecios sofisticados."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Innovación y Gobernanza Tecnológica",
        "question": "¿Cómo puede la IA mejorar la auditoría de compras públicas de forma segura?",
        "hint": "Combine detección automatizada de precios con verificación humana obligatoria y privacidad.",
        "legalBase": "La Ley LGPD 13.709/18 y los Principios de Eficiencia Pública rigen la tecnología en la gestión pública."
      }
    }
  },
  "M4F10C4": {
    "en": {
      "title": "Parliamentary Inquiry (CPI) on Special Ed",
      "sub": "CF/88 Art. 58 §3 — Parliamentary Inquiry Powers",
      "body": "City Council launches CPI investigating municipal special education expenditure over the past 4 years.",
      "opts": [
        {
          "txt": "Provide complete audited accounts, contract delivery receipts, and student impact metrics transparently",
          "tag": "OPTIMAL",
          "fb": "Demonstrates immaculate administrative governance, turning inquiry into proof of exemplary public management."
        },
        {
          "txt": "Provide partial documents and request legislative postponement",
          "tag": "SUBOPTIMAL",
          "fb": "Raises political suspicion and prolongs parliamentary investigation turmoil."
        },
        {
          "txt": "Attempt to block CPI investigation via judicial court injunctions",
          "tag": "CRITICAL",
          "fb": "Creates massive political scandal and perception of corruption, destroying public trust."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Legislative Oversight Inquiries",
        "question": "How should public managers face Parliamentary Commissions of Inquiry (CPI)?",
        "hint": "Complete documentation transparency and rigorous audit trails transform inquiries into validation of clean management.",
        "legalBase": "Federal Constitution Art. 58 §3 grants legislative bodies constitutional inspection powers over executive spending."
      }
    },
    "es": {
      "title": "Comisión de Investigación (CPI) sobre Ed. Especial",
      "sub": "CF/88 Art. 58 §3 — Poderes de Investigación Parlamentaria",
      "body": "El Concejo Municipal inicia una CPI para investigar los gastos en educación especial municipal de los últimos 4 años.",
      "opts": [
        {
          "txt": "Entregar cuentas auditadas completas, comprobantes de entrega e impacto estudiantil con transparencia",
          "tag": "ÓPTIMO",
          "fb": "Demuestra gobernanza impecable transformando la investigación en prueba de gestión pública ejemplar."
        },
        {
          "txt": "Entregar documentos parciales solicitando aplazamiento legislativo",
          "tag": "SUBÓPTIMO",
          "fb": "Aumenta la sospecha política y prolonga la agitación de la investigación parlamentaria."
        },
        {
          "txt": "Intentar bloquear la CPI mediante medidas cautelares en tribunales",
          "tag": "CRÍTICO",
          "fb": "Crea un escándalo político masivo y percepción de corrupción destruyendo la confianza pública."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Investigaciones de Control Legislativo",
        "question": "¿Cómo deben los gestores públicos afrontar las Comisiones Parlamentarias de Investigación (CPI)?",
        "hint": "La transparencia documental completa y pistas de auditoría rigurosas validan la gestión limpia.",
        "legalBase": "Constitución Federal Art. 58 §3 otorga a los órganos legislativos facultades de fiscalización de gastos."
      }
    }
  },
  "M4F10C5": {
    "en": {
      "title": "UN International Public Policy Award",
      "sub": "UN Convention on the Rights of Persons with Disabilities",
      "body": "Municipal inclusion program is shortlisted for prestigious United Nations international recognition.",
      "opts": [
        {
          "txt": "Present verified longitudinal diagnostic metrics proving sustained student learning and inclusion impact",
          "tag": "OPTIMAL",
          "fb": "Secures international recognition, establishing the municipality as a global beacon for inclusive public policy."
        },
        {
          "txt": "Present promotional marketing videos without verified student learning data",
          "tag": "SUBOPTIMAL",
          "fb": "Fails international technical evaluation panel standards, missing top award placement."
        },
        {
          "txt": "Withdraw submission claiming public administration should not seek awards",
          "tag": "CRITICAL",
          "fb": "Misses global platform to inspire public inclusion policies and secure international grant opportunities."
        }
      ],
      "debrief": {
        "title": "Phase Debriefing — Global Recognition & Legacy",
        "question": "Why is international validation of public policies important for local education systems?",
        "hint": "Global awards validate public investment decisions, inspire team morale, and attract international technical grants.",
        "legalBase": "UN Convention on the Rights of Persons with Disabilities guides international standards for inclusive public policies."
      }
    },
    "es": {
      "title": "Premio Internacional de la ONU",
      "sub": "Convención de la ONU sobre los Derechos de las Personas con Discapacidad",
      "body": "El programa municipal de inclusión es preseleccionado para un prestigioso reconocimiento internacional de las Naciones Unidas.",
      "opts": [
        {
          "txt": "Presentar métricas longitudinales verificadas demostrando impacto sostenido en aprendizaje e inclusión",
          "tag": "ÓPTIMO",
          "fb": "Consigue el reconocimiento internacional posicionando al municipio como referente global de políticas inclusivas."
        },
        {
          "txt": "Presentar videos promocionales sin datos verificados de aprendizaje estudiantil",
          "tag": "SUBÓPTIMO",
          "fb": "No supera los estándares del panel técnico internacional perdiendo el primer lugar."
        },
        {
          "txt": "Retirar la candidatura alegando que la administración no debe buscar premios",
          "tag": "CRÍTICO",
          "fb": "Pierde plataforma global para inspirar políticas inclusivas y atraer subvenciones internacionales."
        }
      ],
      "debrief": {
        "title": "Debriefing de Fase — Reconocimiento Global y Legado",
        "question": "¿Por qué la validación internacional de políticas públicas es importante para los sistemas locales?",
        "hint": "Los premios globales validan las decisiones de inversión pública, elevan la moral e atraen cooperación técnica.",
        "legalBase": "La Convención de la ONU sobre los Derechos de las Personas con Discapacidad guía estándares globales de inclusión."
      }
    }
  }
};
