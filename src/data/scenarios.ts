
export interface Scenario {
  id: number;
  title: string;
  description: string;
  setting: {
    position: string;
    year: string;
    context: string;
  };
  image?: string;
  context: string;
  lesson: string;
  choices: Array<{
    id: number;
    text: string;
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
      context: "The city desperately needs this infrastructure upgrade, and delays would affect thousands of citizens."
    },
    context: "Government contract bidding is particularly vulnerable to corruption. The OECD estimates that 10-30% of investment in publicly funded construction projects may be lost to corruption. Proper bidding processes with transparency requirements are essential safeguards against favoritism and kickbacks.",
    lesson: "Transparent procurement processes are critical to preventing corruption. When officials have discretionary power over contracts without proper oversight, it creates opportunities for bribery and favoritism.",
    choices: [
      {
        id: 1,
        text: "Meet privately with your friend but maintain strict professional boundaries and transparency about the bidding process.",
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
        outcomeText: "You manipulated the process to favor your friend. The contract costs taxpayers an extra $2 million, but you've secured a future job opportunity and strengthened your social network.",
        outcomes: {
          integrity: -20,
          money: 15,
          power: 10,
          reputation: -10
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
      context: "The housing market is extremely tight, and these apartments are already sold with families planning to move in next month."
    },
    context: "Regulatory capture occurs when regulators are influenced by the industries they're supposed to be regulating. Safety inspections are critical for ensuring public safety, but inspectors often face pressure to speed up processes or overlook minor (or major) violations.",
    lesson: "Regulatory roles require independence and integrity. When inspectors are compromised, public safety is put at risk, often with consequences that aren't immediately visible but can be disastrous later.",
    choices: [
      {
        id: 1,
        text: "Return the envelope unopened and conduct a thorough inspection according to all safety protocols.",
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
        outcomeText: "The building passed inspection with minimal delay. Six months later, there was a minor electrical fire traced to one of the issues that should have been caught. Fortunately, no one was hurt, but it raised suspicions about the inspection process.",
        outcomes: {
          integrity: -20,
          money: 15,
          power: -5,
          reputation: -15
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
      context: "Your school is underfunded, and the library desperately needs updating for your students."
    },
    context: "Educational corruption can take many forms, from bribery for admissions to manipulation of grades. Research shows that corruption in education not only affects current opportunities but perpetuates social inequality across generations by creating systems where connections and wealth matter more than merit.",
    lesson: "Integrity in education is crucial because it sets the foundation for societal values. When educational institutions compromise on merit, they send powerful signals about what society truly values.",
    choices: [
      {
        id: 1,
        text: "Decline the offer and explain that all students must meet the same academic standards.",
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
        outcomeText: "The new library was built, but word spread about the special treatment. Other parents now approach you with similar offers, and teachers question the school's values.",
        outcomes: {
          integrity: -15,
          money: 20,
          power: 10,
          reputation: -15
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
      context: "Your hospital serves vulnerable populations and operates on tight margins, making every budget decision critical."
    },
    context: "Healthcare corruption directly affects human lives and is particularly insidious because it targets vulnerable people. According to Transparency International, corruption in the health sector costs over $500 billion annually worldwide, more than the global spending on all health services.",
    lesson: "Corruption in healthcare has direct human costs. When medical decisions are made based on profit rather than patient welfare, people receive substandard care, creating both individual suffering and public health risks.",
    choices: [
      {
        id: 1,
        text: "Report the attempted bribery to the hospital board and ethics committee.",
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
        outcomeText: "You received substantial personal payments, but the supplies were slightly lower quality. Some patients received suboptimal care, though it wasn't obvious enough to raise alarms.",
        outcomes: {
          integrity: -25,
          money: 25,
          power: 5,
          reputation: -10
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
      context: "The company is the largest employer in a struggling town, and project delays could lead to layoffs."
    },
    context: "Environmental corruption often involves falsifying data or bribing inspectors to ignore violations. The World Bank estimates that corruption in natural resource management costs developing countries $50-100 billion annually in lost revenue and environmental damage.",
    lesson: "Environmental corruption creates externalities that affect entire ecosystems and communities. The costs are often paid by those least responsible and least able to advocate for themselves, including future generations.",
    choices: [
      {
        id: 1,
        text: "Refuse to alter the report and insist on addressing the compliance issue properly.",
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
        outcomeText: "The project proceeded without delay, but two years later, unusual health issues appeared in communities downstream. While not definitively linked to your facility, there are suspicions and potential legal exposure.",
        outcomes: {
          integrity: -25,
          money: 20,
          power: 10,
          reputation: -20
        }
      }
    ]
  }
];
