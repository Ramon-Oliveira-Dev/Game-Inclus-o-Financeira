import json

with open("pt_data.json", "r", encoding="utf-8") as f:
    pt_data = json.load(f)

# Comprehensive Dictionary for translation of Titles, Subtitles, Questions, Options, Feedback, Legal Bases

# Module 1
m1_en = [
    {
        "title": "Wheelchair Requests",
        "sub": "Urgent procurement of 5 wheelchairs",
        "body": "Urgent request for 5 adapted wheelchairs for students with physical disabilities in 3 different schools.",
        "perguntaDebriefing": "How to prioritize urgent Assistive Technology purchases without violating equality?",
        "opts": [
            {
                "txt": "Buy 2 wheelchairs immediately via emergency procurement and open a tender for the remaining 3.",
                "fi": {
                    "t": "Partial Immediate Action",
                    "b": "Addresses the most critical case immediately, but delays full inclusion for the other 3 students.",
                    "baseJuridica": "LBI Art. 28, II — duty to ensure pedagogical material and accessibility resources."
                }
            },
            {
                "txt": "Wait for a single bidding process to purchase all 5 at once (estimated 60 days).",
                "fi": {
                    "t": "Process Respect, Inclusion Delay",
                    "b": "Respects the bidding process, but leaves 5 students without mobility for 2 months.",
                    "baseJuridica": "LBI Art. 28, II."
                }
            },
            {
                "txt": "Deny the request claiming lack of specific budget provision.",
                "fi": {
                    "t": "Rights Violation and Legal Risk",
                    "b": "Presents an imminent risk of a lawsuit by the Public Prosecutor and violates the Brazilian Inclusion Law (LBI).",
                    "baseJuridica": "LBI Art. 88 — practicing or inciting discrimination against a person due to disability."
                }
            }
        ]
    },
    {
        "title": "Free AEE Training",
        "sub": "State course with municipal matching requirement",
        "body": "The State offers a free Special Education (AEE) course for 20 teachers, but requires the municipality to cover transportation and substitutes ($5k).",
        "perguntaDebriefing": "How to evaluate the cost-benefit of free teacher training requiring municipal matching funds?",
        "opts": [
            {
                "txt": "Accept the offer and fund transportation/substitutes using FUNDEB resources.",
                "fi": {
                    "t": "Strategic Investment in Training",
                    "b": "Fulfills the legal duty of continuing education. High-return investment in teaching quality.",
                    "baseJuridica": "LDB Art. 59-A, FUNDEB Art. 36 §3."
                }
            },
            {
                "txt": "Send only 10 teachers to reduce logistics costs by half.",
                "fi": {
                    "t": "Partial Training",
                    "b": "Partially addresses the need. Half of the classes will remain without AEE-trained teachers.",
                    "baseJuridica": "LDB Art. 59-A."
                }
            },
            {
                "txt": "Decline the slots due to lack of budget for daily allowances and transportation.",
                "fi": {
                    "t": "Missed Educational Opportunity",
                    "b": "Refusing free training due to operational issues compromises pedagogical quality.",
                    "baseJuridica": "LDB Art. 59-A — duty of the State regarding teacher training."
                }
            }
        ]
    },
    {
        "title": "School Without Access Ramp",
        "sub": "Architectural barrier in neighborhood school",
        "body": "3 wheelchair users attend a school with stairs at the entrance and no accessible restroom.",
        "perguntaDebriefing": "How to create a multi-year architectural accessibility program without compromising school meals?",
        "opts": [
            {
                "txt": "Contract accessibility works by reallocating 5% of maintenance funds.",
                "fi": {
                    "t": "Definitive Architectural Inclusion",
                    "b": "Definitively solves the structural issue and ensures the right to mobility.",
                    "baseJuridica": "CF/88 Art. 227 §2, LBI Art. 53."
                }
            },
            {
                "txt": "Install a temporary wooden ramp without renovating the restroom.",
                "fi": {
                    "t": "Incomplete Palliative Solution",
                    "b": "Palliative solution that fails ABNT NBR 9050 standards and creates safety risks.",
                    "baseJuridica": "ABNT NBR 9050."
                }
            },
            {
                "txt": "Transfer the 3 students to another, farther school that is already accessible.",
                "fi": {
                    "t": "Forced Transfer Violation",
                    "b": "Forced transfer violates the right to attend neighborhood schools and causes family dissatisfaction.",
                    "baseJuridica": "LBI Art. 28, I — right to access inclusive education close to home."
                }
            }
        ]
    },
    {
        "title": "Semi-Annual Report to Municipal Council",
        "sub": "Financial and pedagogical accountability",
        "body": "The Municipal Council demands a detailed financial report on funds spent on Special Education ($80k spent).",
        "perguntaDebriefing": "Does active transparency strengthen or paralyze Special Education fund management?",
        "opts": [
            {
                "txt": "Present a complete report with quality indicators and student impact metrics.",
                "fi": {
                    "t": "Active Transparency and Compliance",
                    "b": "Increases transparency, strengthens social oversight, and validates administration.",
                    "baseJuridica": "LBI Art. 28, XVIII, Freedom of Information Act (LAI)."
                }
            },
            {
                "txt": "Deliver only a high-level accounting balance sheet without pedagogical details.",
                "fi": {
                    "t": "Bureaucratic Transparency",
                    "b": "Fulfills formal obligations, but leaves room for questioning expenditure effectiveness.",
                    "baseJuridica": "LAI Art. 7."
                }
            },
            {
                "txt": "Postpone delivery claiming workload accumulation in the department.",
                "fi": {
                    "t": "Accountability Delay",
                    "b": "Delays raise suspicion of irregularity and may trigger a representation at the Public Prosecutor's Office.",
                    "baseJuridica": "Administrative Impropriety Law Art. 11."
                }
            }
        ]
    },
    {
        "title": "Didactic Material: Adapted or Universal?",
        "sub": "Pedagogical materials purchasing strategy",
        "body": "The network needs to purchase materials for 50 students with visual and intellectual disabilities ($30k budget).",
        "perguntaDebriefing": "Why is Universal Design financially more efficient in the long term than individual adaptations?",
        "opts": [
            {
                "txt": "Purchase reusable Universal Design for Learning (UDL) materials.",
                "fi": {
                    "t": "Universal Design Efficiency",
                    "b": "UDL benefits all students, reduces future adaptation costs, and complies with legislation.",
                    "baseJuridica": "LBI Art. 3, II — concept of Universal Design."
                }
            },
            {
                "txt": "Buy only individually customized materials ordered per student.",
                "fi": {
                    "t": "Customized High Recurring Cost",
                    "b": "Serves short-term needs, but incurs high recurring costs and prevents resource sharing.",
                    "baseJuridica": "LBI Art. 28, III."
                }
            },
            {
                "txt": "Keep standard unadapted material, instructing teachers to adapt manually.",
                "fi": {
                    "t": "Teacher Overburden and Exclusion",
                    "b": "Overburdens teachers, causes classroom exclusion, and violates learning rights.",
                    "baseJuridica": "LBI Art. 28, II."
                }
            }
        ]
    }
]

print("M1 EN translation definition complete.")
