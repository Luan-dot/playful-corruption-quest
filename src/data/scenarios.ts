
export interface Scenario {
  id: number;
  title: string;
  description: string;
  setting: {
    position: string;
    year: string;
    context: string;
    location: string;
  };
  image?: string;
  context: string;
  lesson: string;
  realWorldExample: string;
  hint: string;
  keyConcepts: string[];
  globalImpact: string;
  stakeholders: string[];
  choices: Array<{
    id: number;
    text: string;
    reasoning: string;
    outcomeText: string;
    outcomes: {
      integrity?: number;
      money?: number;
      power?: number;
      reputation?: number;
    };
  }>;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Contract Bidding",
    description: "You're overseeing a major infrastructure project. A prominent construction company has submitted a bid, but you notice their proposal is slightly overpriced compared to competitors. The CEO, who happens to be your old college friend, reaches out for a private meeting.",
    setting: {
      position: "Public Works Director",
      year: "Present Day",
      location: "Metropolitan City Hall",
      context: "The city desperately needs this infrastructure upgrade, and delays would affect thousands of citizens."
    },
    context: "Government contract bidding is particularly vulnerable to corruption. The OECD estimates that 10-30% of investment in publicly funded construction projects may be lost to corruption. Proper bidding processes with transparency requirements are essential safeguards against favoritism and kickbacks.",
    lesson: "Transparent procurement processes are critical to preventing corruption. When officials have discretionary power over contracts without proper oversight, it creates opportunities for bribery and favoritism.",
    realWorldExample: "In Brazil's Operation Car Wash (2014), investigators uncovered a vast scheme where construction companies paid bribes to executives of the state-owned oil company Petrobras to secure contracts, often at inflated prices. The scandal ultimately implicated dozens of politicians and business leaders.",
    hint: "Consider the principle of transparency. Public procurement decisions should be made based on clear criteria that can withstand scrutiny.",
    keyConcepts: [
      "Conflict of Interest",
      "Procurement Integrity",
      "Favoritism",
      "Competitive Bidding"
    ],
    globalImpact: "Corruption in public contracting costs governments an estimated $2 trillion annually worldwide, reducing funds available for essential services.",
    stakeholders: [
      "City Residents",
      "Taxpayers",
      "Competing Companies",
      "City Council"
    ],
    choices: [
      {
        id: 1,
        text: "Meet privately with your friend but maintain strict professional boundaries and transparency about the bidding process.",
        reasoning: "This balances professional courtesy with ethical requirements, allowing you to hear them out while maintaining transparency.",
        outcomeText: "You explained the situation professionally. While your friend was disappointed, they respected your integrity. The contract went to the most qualified bidder.",
        outcomes: {
          integrity: 10,
          money: 0,
          power: -5,
          reputation: 5
        }
      },
      {
        id: 2,
        text: "Agree to the meeting and see what they're offering before making any decisions.",
        reasoning: "This keeps your options open but puts you in a potentially compromising situation that could lead to ethical dilemmas.",
        outcomeText: "Your friend offered a lucrative post-retirement consulting position in exchange for 'flexibility' in the bidding process. This puts you in a difficult ethical position.",
        outcomes: {
          integrity: -5,
          money: 0,
          power: 0,
          reputation: -5
        }
      },
      {
        id: 3,
        text: "Find technical reasons to disqualify the lower bids and award the contract to your friend's company.",
        reasoning: "This clearly violates ethical principles and procurement regulations, but secures personal advantage and strengthens your network.",
        outcomeText: "You manipulated the process to favor your friend. The contract costs taxpayers an extra $2 million, but you've secured a future job opportunity and strengthened your social network.",
        outcomes: {
          integrity: -20,
          money: 15,
          power: 10,
          reputation: -10
        }
      },
      {
        id: 4,
        text: "Decline the meeting and document the contact attempt in the official procurement file.",
        reasoning: "This maintains complete transparency and avoids any appearance of favoritism, though it might strain your personal relationship.",
        outcomeText: "Your friend was upset by your formality, but the procurement process remained untainted. Your supervisor commended your professionalism.",
        outcomes: {
          integrity: 15,
          money: -5,
          power: -10,
          reputation: 10
        }
      },
      {
        id: 5,
        text: "Meet publicly with all bidders to address questions and clarify requirements.",
        reasoning: "This maintains a level playing field while still allowing companies to present their cases and ask questions.",
        outcomeText: "The transparent approach was appreciated by all bidders. The city received improved proposals after clarifications, saving money while meeting quality requirements.",
        outcomes: {
          integrity: 12,
          money: 8,
          power: 5,
          reputation: 8
        }
      }
    ]
  },
  {
    id: 2,
    title: "The Inspection Shortcut",
    description: "You've been asked to inspect a new apartment building for safety code compliance. The developer mentions they're under tight deadlines and hints that a 'simplified inspection' would be appreciated. They've left an envelope on your desk.",
    setting: {
      position: "Safety Inspector",
      year: "Present Day",
      location: "Growing Suburban Area",
      context: "The housing market is extremely tight, and these apartments are already sold with families planning to move in next month."
    },
    context: "Regulatory capture occurs when regulators are influenced by the industries they're supposed to be regulating. Safety inspections are critical for ensuring public safety, but inspectors often face pressure to speed up processes or overlook minor (or major) violations.",
    lesson: "Regulatory roles require independence and integrity. When inspectors are compromised, public safety is put at risk, often with consequences that aren't immediately visible but can be disastrous later.",
    realWorldExample: "In the UK, the Grenfell Tower fire of 2017 killed 72 people. Investigations revealed that inspections had failed to identify dangerous cladding materials and other safety violations. Multiple levels of oversight had broken down, with economic considerations often prioritized over safety.",
    hint: "Safety regulations exist to protect people's lives. Consider the potential consequences if safety issues remain undetected.",
    keyConcepts: [
      "Regulatory Capture",
      "Public Safety",
      "Bribery",
      "Professional Responsibility"
    ],
    globalImpact: "Corruption in safety inspections directly endangers lives, with building collapses and fires causing thousands of preventable deaths annually worldwide.",
    stakeholders: [
      "Future Residents",
      "Developer",
      "Construction Workers",
      "City Government"
    ],
    choices: [
      {
        id: 1,
        text: "Return the envelope unopened and conduct a thorough inspection according to all safety protocols.",
        reasoning: "This upholds professional standards and ensures public safety, though it might cause delays and economic consequences.",
        outcomeText: "The inspection revealed several safety issues that needed correction. The developer was upset about the delay, but the problems were fixed, potentially saving lives in the future.",
        outcomes: {
          integrity: 15,
          money: -5,
          power: 0,
          reputation: 5
        }
      },
      {
        id: 2,
        text: "Accept the envelope but still check the most critical safety features while overlooking minor violations.",
        reasoning: "This compromise attempts to balance expedience with safety, but creates ethical ambiguity and precedent for future shortcuts.",
        outcomeText: "The envelope contained $5,000. You rationalized that the minor violations weren't dangerous, but you've created a precedent of flexibility with this developer.",
        outcomes: {
          integrity: -10,
          money: 10,
          power: 5,
          reputation: -5
        }
      },
      {
        id: 3,
        text: "Accept the envelope and sign off on the inspection without thorough checking.",
        reasoning: "This prioritizes personal gain and expedience over professional duty and public safety, creating significant ethical and legal risks.",
        outcomeText: "The building passed inspection with minimal delay. Six months later, there was a minor electrical fire traced to one of the issues that should have been caught. Fortunately, no one was hurt, but it raised suspicions about the inspection process.",
        outcomes: {
          integrity: -20,
          money: 15,
          power: -5,
          reputation: -15
        }
      },
      {
        id: 4,
        text: "Return the envelope, report the attempted bribe, and request another inspector take over due to the conflict.",
        reasoning: "This maintains maximum integrity and ensures an unbiased inspection, though it may create professional tensions.",
        outcomeText: "Your report led to an investigation. Other inspectors reported similar experiences with this developer. Your action protected public safety and your professional reputation.",
        outcomes: {
          integrity: 20,
          money: -10,
          power: -5,
          reputation: 15
        }
      },
      {
        id: 5,
        text: "Expedite the inspection process legitimately by prioritizing this project, without compromising standards.",
        reasoning: "This responds to the genuine need for efficiency without compromising safety or ethics.",
        outcomeText: "By working overtime and shuffling your schedule, you completed a thorough inspection quickly. The developer appreciated your help, and residents moved in on time to safe apartments.",
        outcomes: {
          integrity: 8,
          money: 0,
          power: 5,
          reputation: 10
        }
      }
    ]
  },
  {
    id: 3,
    title: "The School Admission",
    description: "As the principal of a prestigious school, you've been approached by a wealthy businessman who wants to secure admission for his child, despite the student not meeting the academic requirements. He's offering a substantial donation to fund a new library.",
    setting: {
      position: "School Principal",
      year: "Present Day",
      location: "Elite Private Academy",
      context: "Your school is underfunded, and the library desperately needs updating for your students."
    },
    context: "Educational corruption can take many forms, from bribery for admissions to manipulation of grades. Research shows that corruption in education not only affects current opportunities but perpetuates social inequality across generations by creating systems where connections and wealth matter more than merit.",
    lesson: "Integrity in education is crucial because it sets the foundation for societal values. When educational institutions compromise on merit, they send powerful signals about what society truly values.",
    realWorldExample: "The 2019 U.S. college admissions bribery scandal, known as 'Operation Varsity Blues,' revealed how wealthy parents paid bribes to secure admission for their children at elite universities. The scandal led to criminal charges against 53 people and raised questions about fairness in higher education admissions.",
    hint: "Consider how your decision affects the educational mission of your institution and what message it sends to students and staff about fairness.",
    keyConcepts: [
      "Educational Ethics",
      "Meritocracy",
      "Social Inequality",
      "Institutional Integrity"
    ],
    globalImpact: "Educational corruption reinforces socioeconomic divides, with UNESCO estimating that over 250 million children worldwide receive inadequate education partly due to corruption.",
    stakeholders: [
      "Current Students",
      "Teachers",
      "Qualified Applicants",
      "School Board"
    ],
    choices: [
      {
        id: 1,
        text: "Decline the offer and explain that all students must meet the same academic standards.",
        reasoning: "This upholds educational integrity and meritocratic principles, though at a financial cost to the institution.",
        outcomeText: "The businessman was disappointed but respected your principles. Your staff's morale improved when they heard you maintained admission standards despite financial pressure.",
        outcomes: {
          integrity: 15,
          money: -15,
          power: 0,
          reputation: 10
        }
      },
      {
        id: 2,
        text: "Accept the donation but require the student to complete additional entrance requirements and receive tutoring.",
        reasoning: "This attempts to balance financial needs with educational standards, creating a compromise that maintains some integrity.",
        outcomeText: "You found a middle ground that maintained some standards while securing needed funds. However, some teachers questioned whether this created an uneven playing field.",
        outcomes: {
          integrity: -5,
          money: 15,
          power: 5,
          reputation: 0
        }
      },
      {
        id: 3,
        text: "Accept the donation and make an exception to admit the student unconditionally.",
        reasoning: "This prioritizes financial gain over educational integrity, potentially opening the door to systemic corruption of admission standards.",
        outcomeText: "The new library was built, but word spread about the special treatment. Other parents now approach you with similar offers, and teachers question the school's values.",
        outcomes: {
          integrity: -15,
          money: 20,
          power: 10,
          reputation: -15
        }
      },
      {
        id: 4,
        text: "Suggest the businessman donate to the school's scholarship fund instead, which helps deserving students regardless of background.",
        reasoning: "This redirects the good intentions to a more ethical outcome, potentially benefiting multiple students based on merit.",
        outcomeText: "After initial resistance, the businessman agreed to fund scholarships. The academic standards remained intact, and three deserving students received financial aid.",
        outcomes: {
          integrity: 20,
          money: 10,
          power: 5,
          reputation: 15
        }
      },
      {
        id: 5,
        text: "Consult with the school board to create a transparent policy for handling donations and admissions.",
        reasoning: "This addresses the systemic issue rather than just the individual case, creating clear guidelines for the future.",
        outcomeText: "The board established clear separation between donations and admissions decisions. This strengthened institutional integrity and provided a framework for handling future situations.",
        outcomes: {
          integrity: 25,
          money: 0,
          power: 10,
          reputation: 20
        }
      }
    ]
  },
  {
    id: 4,
    title: "The Medical Supplies Contract",
    description: "As hospital administrator, you're reviewing bids for a major medical supplies contract. A representative from one company offers kickbacks for choosing their company, claiming 'everyone does it' and their products are 'just as good' as competitors.",
    setting: {
      position: "Hospital Administrator",
      year: "Present Day",
      location: "Community Hospital",
      context: "Your hospital serves vulnerable populations and operates on tight margins, making every budget decision critical."
    },
    context: "Healthcare corruption directly affects human lives and is particularly insidious because it targets vulnerable people. According to Transparency International, corruption in the health sector costs over $500 billion annually worldwide, more than the global spending on all health services.",
    lesson: "Corruption in healthcare has direct human costs. When medical decisions are made based on profit rather than patient welfare, people receive substandard care, creating both individual suffering and public health risks.",
    realWorldExample: "In 2012, executives at Biodiagnostic Laboratory Services in New Jersey were found to have paid millions in bribes to doctors for unnecessary test referrals, costing Medicare and private insurers over $100 million. Multiple physicians were convicted alongside company executives.",
    hint: "Healthcare decisions directly impact patient outcomes. Consider how the quality of supplies affects patient care and safety.",
    keyConcepts: [
      "Healthcare Ethics",
      "Patient Safety",
      "Kickbacks",
      "Quality of Care"
    ],
    globalImpact: "WHO estimates that corruption in healthcare contributes to approximately 140,000 child deaths annually due to substandard medications and services.",
    stakeholders: [
      "Patients",
      "Medical Staff",
      "Taxpayers",
      "Hospital Board"
    ],
    choices: [
      {
        id: 1,
        text: "Report the attempted bribery to the hospital board and ethics committee.",
        reasoning: "This upholds professional ethics and legal requirements, protecting patient safety and institutional integrity.",
        outcomeText: "Your report led to the company being blacklisted from future contracts. Other suppliers noted your hospital's strong ethical stance, leading to better terms on future contracts.",
        outcomes: {
          integrity: 20,
          money: 5,
          power: 5,
          reputation: 15
        }
      },
      {
        id: 2,
        text: "Decline the kickback but don't report it, simply evaluating the bids on their merits.",
        reasoning: "This maintains personal integrity but fails to address the systemic issue, allowing potentially corrupt practices to continue elsewhere.",
        outcomeText: "You maintained your personal integrity but allowed the company to potentially corrupt others in the future. The contract went to the best supplier based on quality and price.",
        outcomes: {
          integrity: 5,
          money: 0,
          power: 0,
          reputation: 5
        }
      },
      {
        id: 3,
        text: "Accept the kickback but ensure it's done discreetly through a consulting arrangement.",
        reasoning: "This prioritizes personal financial gain over patient welfare and professional ethics, with potential legal consequences.",
        outcomeText: "You received substantial personal payments, but the supplies were slightly lower quality. Some patients received suboptimal care, though it wasn't obvious enough to raise alarms.",
        outcomes: {
          integrity: -25,
          money: 25,
          power: 5,
          reputation: -10
        }
      },
      {
        id: 4,
        text: "Work with the ethics committee to implement a blind bidding process for all future contracts.",
        reasoning: "This addresses the systemic vulnerability and creates more transparent processes that reduce corruption opportunities.",
        outcomeText: "The new blind bidding system significantly reduced corruption opportunities. The hospital saved money and improved quality through more competitive and honest bidding.",
        outcomes: {
          integrity: 25,
          money: 15,
          power: 10,
          reputation: 20
        }
      },
      {
        id: 5,
        text: "Record the conversation secretly to gather evidence before reporting to authorities.",
        reasoning: "This ensures concrete evidence of corruption but involves some deception and potential legal complications.",
        outcomeText: "Your recording provided conclusive evidence of attempted bribery. The company faced legal consequences, and your hospital was protected from unethical suppliers.",
        outcomes: {
          integrity: 15,
          money: 0,
          power: -5,
          reputation: 10
        }
      }
    ]
  },
  {
    id: 5,
    title: "The Environmental Compliance Report",
    description: "Your company's latest environmental impact assessment shows levels of a toxic chemical slightly above legal limits. Fixing the issue would be expensive and delay an important project. Your supervisor suggests 'adjusting' the numbers in the report.",
    setting: {
      position: "Environmental Compliance Officer",
      year: "Present Day",
      location: "Industrial Manufacturing Plant",
      context: "The company is the largest employer in a struggling town, and project delays could lead to layoffs."
    },
    context: "Environmental corruption often involves falsifying data or bribing inspectors to ignore violations. The World Bank estimates that corruption in natural resource management costs developing countries $50-100 billion annually in lost revenue and environmental damage.",
    lesson: "Environmental corruption creates externalities that affect entire ecosystems and communities. The costs are often paid by those least responsible and least able to advocate for themselves, including future generations.",
    realWorldExample: "In the Flint Water Crisis (2014), officials falsified water quality reports to hide dangerous lead levels. Their decisions, motivated by cost-cutting, exposed thousands of residents, including children, to toxic lead, causing long-term health consequences.",
    hint: "Environmental regulations protect ecosystems and public health. Consider both immediate economic impacts and long-term environmental and health consequences.",
    keyConcepts: [
      "Environmental Ethics",
      "Data Integrity",
      "Corporate Responsibility",
      "Externalities"
    ],
    globalImpact: "Environmental corruption contributes to over 9 million deaths annually from pollution, with disadvantaged communities bearing the heaviest burden.",
    stakeholders: [
      "Local Community",
      "Company Employees",
      "Regulatory Agencies",
      "Future Generations"
    ],
    choices: [
      {
        id: 1,
        text: "Refuse to alter the report and insist on addressing the compliance issue properly.",
        reasoning: "This upholds professional integrity and environmental regulations, prioritizing long-term health and environmental protection over short-term economic concerns.",
        outcomeText: "The project was delayed by two months, costing the company money. However, the proper solution was implemented, preventing potential harm to local water sources and avoiding future liability.",
        outcomes: {
          integrity: 20,
          money: -15,
          power: -10,
          reputation: 10
        }
      },
      {
        id: 2,
        text: "Suggest implementing a partial fix now to reduce levels while continuing the project, with a plan to fully address the issue later.",
        reasoning: "This compromise attempts to balance environmental and economic concerns, though it carries risk of the 'temporary' solution becoming permanent.",
        outcomeText: "Your compromise kept the project moving with minimal delay while reducing environmental impact. However, the 'temporary' solution has a way of becoming permanent as priorities shift.",
        outcomes: {
          integrity: -5,
          money: 5,
          power: 5,
          reputation: 0
        }
      },
      {
        id: 3,
        text: "Adjust the numbers as suggested to keep the project on schedule.",
        reasoning: "This prioritizes short-term economic interests over environmental integrity and public health, with potential legal and reputational consequences.",
        outcomeText: "The project proceeded without delay, but two years later, unusual health issues appeared in communities downstream. While not definitively linked to your facility, there are suspicions and potential legal exposure.",
        outcomes: {
          integrity: -25,
          money: 20,
          power: 10,
          reputation: -20
        }
      },
      {
        id: 4,
        text: "Anonymously report the violation to regulatory authorities while continuing to work internally for a solution.",
        reasoning: "This ensures environmental protection while attempting to minimize direct professional consequences, though it creates ethical complications.",
        outcomeText: "The anonymous report triggered an investigation, forcing the company to address the issue properly. Your anonymity was maintained, though some suspected your involvement.",
        outcomes: {
          integrity: 10,
          money: -10,
          power: -15,
          reputation: 5
        }
      },
      {
        id: 5,
        text: "Propose an innovative technical solution that could address the compliance issue without significant delay or cost.",
        reasoning: "This seeks a win-win solution that maintains integrity while addressing legitimate economic concerns.",
        outcomeText: "Your creative solution was implemented successfully, bringing compliance without major delays. The approach was praised and later adopted as standard practice in similar situations.",
        outcomes: {
          integrity: 15,
          money: 10,
          power: 15,
          reputation: 20
        }
      }
    ]
  }
];
