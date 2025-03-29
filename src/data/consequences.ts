
export interface Consequence {
  id: number;
  scenarioId: number;
  choiceId: number;
  triggerScenarioId: number; // When this scenario appears, this consequence triggers
  headline: string;
  description: string;
  impact: {
    integrity?: number;
    money?: number;
    power?: number;
    reputation?: number;
  };
  isTriggered: boolean;
}

// Initial consequences database
export const consequences: Consequence[] = [
  {
    id: 1,
    scenarioId: 1, // The Contract Bidding
    choiceId: 3,   // Choose corrupt option
    triggerScenarioId: 3, // Triggered in The School Admission scenario
    headline: "Investigation Opened Into Previous Government Contracts",
    description: "Your past decision to favor your friend's company has come back to haunt you. An investigative journalist has uncovered irregularities in the bidding process.",
    impact: {
      integrity: -5,
      reputation: -10,
      power: -5
    },
    isTriggered: false
  },
  {
    id: 2,
    scenarioId: 2, // The Inspection Shortcut
    choiceId: 3,   // Choose corrupt option
    triggerScenarioId: 4, // Triggered in The Medical Supplies Contract
    headline: "Residential Building Found With Critical Safety Issues",
    description: "The building you hastily approved is now showing serious structural problems. Residents are demanding answers and accountability.",
    impact: {
      integrity: -5,
      reputation: -15
    },
    isTriggered: false
  },
  {
    id: 3,
    scenarioId: 3, // The School Admission
    choiceId: 2,   // Choose middle option
    triggerScenarioId: 5, // Triggered in The Environmental Compliance Report
    headline: "Education Board Reviewing Admission Policies After Complaints",
    description: "Your decision to bend the rules for the wealthy businessman's child has led to scrutiny of the entire admissions process.",
    impact: {
      reputation: -5,
      power: -5
    },
    isTriggered: false
  },
  {
    id: 4,
    scenarioId: 1, // The Contract Bidding
    choiceId: 1,   // Choose ethical option
    triggerScenarioId: 4, // Triggered in The Medical Supplies Contract
    headline: "Your Ethical Infrastructure Stance Draws Public Support",
    description: "Your past decision to maintain bidding integrity has earned you public trust. Local ethics organizations are citing your work as exemplary.",
    impact: {
      integrity: 5,
      reputation: 10
    },
    isTriggered: false
  },
  {
    id: 5,
    scenarioId: 2, // The Inspection Shortcut
    choiceId: 1,   // Choose ethical option
    triggerScenarioId: 5, // Triggered in The Environmental Compliance Report
    headline: "Safety-First Approach Prevents Potential Disaster",
    description: "Further inspection of the building you insisted on proper checks for revealed issues that could have caused casualties if left unaddressed.",
    impact: {
      integrity: 5,
      reputation: 10
    },
    isTriggered: false
  }
];
