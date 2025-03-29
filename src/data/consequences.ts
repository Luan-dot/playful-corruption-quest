import { Consequence } from "@/lib/consequences-system";

export const predefinedConsequences: Consequence[] = [
  // Contract Bidding (Scenario 1) consequences
  {
    id: "friend-connection-followup",
    title: "Old Friend Returns",
    description: "Your college friend returns with more requests.",
    triggerCondition: (decisions) => {
      // Triggered if player chose the neutral or corrupt option in Scenario 1
      return decisions.some(
        (d) => d.scenarioId === 1 && (d.choiceId === 2 || d.choiceId === 3)
      );
    },
    effect: {
      scenarioModification: {
        scenarioId: 3, // Will modify the school admission scenario
        modifiedText:
          "As the principal of a prestigious school, you've been approached by a wealthy businessman who wants to secure admission for his child. With a shock, you recognize him as the CEO of the construction company from your previous government role. He hints that he 'remembers your flexibility' and offers a substantial donation for a new library.",
        modifiedChoices: [
          {
            choiceId: 2, // Modify the compromise choice
            newText:
              "Accept the donation but require the student to complete additional requirements, recognizing this strengthens your questionable relationship.",
            newOutcome:
              "You secured the funds while maintaining some standards. However, this reinforces your pattern of ethical flexibility with this individual, creating a concerning network of mutual obligation.",
            newEffects: {
              integrity: -10, // Worse integrity effect than original
              money: 15,
              power: 10,
              reputation: -5,
            },
          },
        ],
        additionalChoice: {
          id: 4,
          text: "Report the attempted leveraging of your past relationship to the school board.",
          reasoning:
            "This breaks the cycle of compromise and demonstrates your integrity has evolved.",
          outcomeText:
            "The board appreciated your transparency. Though the donation was lost, your reputation for integrity in the educational community soared. Your former contact was surprised by your ethical growth.",
          outcomes: {
            integrity: 25,
            money: -15,
            power: 5,
            reputation: 20,
          },
        },
      },
      newsEvent: {
        headline:
          "Construction Magnate Expands Influence Into Education Sector",
        source: "Community Chronicle",
        content:
          "BuildCorp CEO has been making significant donations to educational institutions, raising questions about corporate influence in education. His connections to former government officials have not gone unnoticed.",
      },
    },
    applied: false,
  },

  // Safety Inspector (Scenario 2) consequences
  {
    id: "inspection-shortcut-consequences",
    title: "The Building Issues Emerge",
    description: "Problems begin to surface in the building you inspected.",
    triggerCondition: (decisions) => {
      // Triggered if player compromised on the inspection
      return decisions.some(
        (d) => d.scenarioId === 2 && (d.choiceId === 2 || d.choiceId === 3)
      );
    },
    effect: {
      scenarioModification: {
        scenarioId: 5, // Environmental assessment scenario
        modifiedText:
          "Your company's latest environmental impact assessment shows levels of a toxic chemical above legal limits. In an unsettling coincidence, these chemicals would flow downstream toward the apartment complex where you previously served as a safety inspector. Fixing the issue would be expensive and delay an important project. Your supervisor suggests 'adjusting' the numbers in the report.",
        modifiedChoices: [
          {
            choiceId: 3, // Modify the corrupt choice
            newText:
              "Adjust the numbers as suggested, knowing you've already compromised safety standards for these same residents before.",
            newOutcome:
              "The project proceeded without delay, but within months, unusual health issues appeared in the apartment community downstream - the same building where you previously cut corners. A journalist has begun connecting the dots between your two involvements.",
            newEffects: {
              integrity: -30, // Much worse integrity effect
              money: 20,
              power: -5, // Now lose power
              reputation: -25, // Much worse reputation hit
            },
          },
        ],
      },
      newsEvent: {
        headline: "Resident Complaints Rising at Eastside Apartments",
        source: "Metro Weekly",
        content:
          "Residents at the recently constructed Eastside Apartments are reporting multiple issues with the building, from electrical problems to water quality concerns. Regulators have begun an investigation into the property's inspection history.",
      },
    },
    applied: false,
  },

  // Environmental Compliance (Scenario 5) followup
  {
    id: "whistleblower-emerges",
    title: "Internal Whistleblower",
    description: "An employee with concerns approaches you.",
    triggerCondition: (decisions) => {
      // Triggered if player falsified environmental reports
      return decisions.some((d) => d.scenarioId === 5 && d.choiceId === 3);
    },
    effect: {
      specialEvent: {
        type: "confrontation",
        content: {
          title: "Whistleblower Confrontation",
          description:
            "A junior environmental scientist in your department has discovered your data manipulation and is threatening to report it to regulators. They've come to you first out of professional courtesy, giving you a chance to address the situation before they take it further. How you handle this unexpected development could determine your professional future.",
        },
      },
      newsEvent: {
        headline: "Environmental Watchdog Group Targets Local Manufacturing",
        source: "Environmental Justice Today",
        content:
          "The NGO 'CleanWater Action' has announced plans to independently test water quality downstream from industrial sites in the region, citing concerns about self-reported compliance data.",
      },
    },
    applied: false,
  },

  // Positive consequence for consistent integrity
  {
    id: "integrity-reputation-grows",
    title: "Reputation for Integrity",
    description: "Your consistent ethical stance earns recognition.",
    triggerCondition: (decisions) => {
      // Triggered if player maintained integrity in multiple scenarios
      const integrityChoices = decisions.filter(
        (d) =>
          (d.scenarioId === 1 && d.choiceId === 1) ||
          (d.scenarioId === 2 && d.choiceId === 1) ||
          (d.scenarioId === 3 && d.choiceId === 1)
      );
      return integrityChoices.length >= 2;
    },
    effect: {
      scenarioModification: {
        scenarioId: 4, // Medical supplies scenario
        modifiedText:
          "As hospital administrator, you're reviewing bids for a major medical supplies contract. A representative from one company attempts to offer kickbacks for choosing their company, but quickly withdraws the suggestion when they recognize you. 'I've heard about your reputation for integrity,' they say, clearly embarrassed. They then present their actual competitive bid.",
        modifiedChoices: [
          {
            choiceId: 1, // Modify the ethical choice
            newText:
              "Thank them for withdrawing the improper suggestion and evaluate bids strictly on merit.",
            newOutcome:
              "Your reputation preceded you, preventing corruption before it started. Others in the industry take note that you cannot be bribed, simplifying future interactions and attracting ethical suppliers.",
            newEffects: {
              integrity: 15,
              money: 10, // Better financial outcome than original
              power: 10, // More power gain than original
              reputation: 20, // Better reputation gain than original
            },
          },
        ],
      },
      newsEvent: {
        headline: "Local Leader Recognized for Ethical Excellence",
        source: "Professional Ethics Quarterly",
        content:
          "The Ethics in Leadership Foundation has highlighted several regional leaders for their commitment to integrity in challenging situations, citing them as models for the next generation of professionals.",
      },
    },
    applied: false,
  },
];
