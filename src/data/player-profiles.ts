
export type PlayerStyle = 
  | 'Idealist' 
  | 'Pragmatist' 
  | 'Opportunist' 
  | 'Whistleblower' 
  | 'Reformer' 
  | 'Undetermined';

export interface StoryBranch {
  id: number;
  name: string;
  requiredStyle: PlayerStyle;
  requiredIntegrity: number;
  description: string;
  scenarioModifiers: {
    scenarioId: number;
    newChoices?: boolean;
    modifiedDescription?: string;
  }[];
}

// Function to determine player style based on choices and stats
export const determinePlayerStyle = (
  integrity: number,
  money: number,
  power: number,
  reputation: number,
  choices: Array<{ scenarioId: number; choiceId: number }>
): PlayerStyle => {
  // Count ethical vs corrupt choices
  const ethicalChoices = choices.filter(c => 
    (c.scenarioId === 1 && c.choiceId === 1) ||
    (c.scenarioId === 2 && c.choiceId === 1) ||
    (c.scenarioId === 3 && c.choiceId === 1) ||
    (c.scenarioId === 4 && c.choiceId === 1) ||
    (c.scenarioId === 5 && c.choiceId === 1)
  ).length;
  
  const corruptChoices = choices.filter(c => 
    (c.scenarioId === 1 && c.choiceId === 3) ||
    (c.scenarioId === 2 && c.choiceId === 3) ||
    (c.scenarioId === 3 && c.choiceId === 3) ||
    (c.scenarioId === 4 && c.choiceId === 3) ||
    (c.scenarioId === 5 && c.choiceId === 3)
  ).length;
  
  const compromiseChoices = choices.filter(c => 
    (c.scenarioId === 1 && c.choiceId === 2) ||
    (c.scenarioId === 2 && c.choiceId === 2) ||
    (c.scenarioId === 3 && c.choiceId === 2) ||
    (c.scenarioId === 4 && c.choiceId === 2) ||
    (c.scenarioId === 5 && c.choiceId === 2)
  ).length;

  // Need at least 2 choices to determine a style
  if (choices.length < 2) return 'Undetermined';
  
  // Idealist: high integrity, most ethical choices
  if (integrity >= 75 && ethicalChoices > corruptChoices && ethicalChoices > compromiseChoices) {
    return 'Idealist';
  }
  
  // Whistleblower: moderate-high integrity, reported corruption
  if (integrity >= 60 && choices.some(c => c.scenarioId === 4 && c.choiceId === 1)) {
    return 'Whistleblower';
  }
  
  // Pragmatist: middle integrity, compromise choices
  if (integrity >= 40 && integrity < 75 && compromiseChoices >= ethicalChoices && compromiseChoices >= corruptChoices) {
    return 'Pragmatist';
  }
  
  // Reformer: moderate integrity, mix of ethical and pragmatic choices
  if (integrity >= 50 && ethicalChoices + compromiseChoices > corruptChoices) {
    return 'Reformer';
  }
  
  // Opportunist: low integrity, corrupt choices
  if (integrity < 40 && corruptChoices > ethicalChoices) {
    return 'Opportunist';
  }
  
  // Default
  return 'Undetermined';
};

// Story branches that unlock based on player style
export const storyBranches: StoryBranch[] = [
  {
    id: 1,
    name: "Whistleblower's Dilemma",
    requiredStyle: 'Whistleblower',
    requiredIntegrity: 60,
    description: "As someone known for exposing corruption, you're approached by a whistleblower with explosive information about government officials. However, the source is questionable and the evidence incomplete.",
    scenarioModifiers: [
      { scenarioId: 4, newChoices: true, modifiedDescription: "Your reputation as someone who stands against corruption has preceded you. A junior staff member approaches you privately with evidence of kickbacks in multiple departments, but exposing this could jeopardize critical hospital services." }
    ]
  },
  {
    id: 2,
    name: "Reformer's Challenge",
    requiredStyle: 'Reformer',
    requiredIntegrity: 50,
    description: "Your balanced approach has earned you respect from multiple factions. You're invited to lead a systemic reform initiative, but face opposition from entrenched interests.",
    scenarioModifiers: [
      { scenarioId: 5, newChoices: true, modifiedDescription: "Your reputation as a thoughtful reformer has led to your appointment on an environmental oversight committee. You discover systematic data falsification across the industry that would require major regulatory overhaul to address." }
    ]
  },
  {
    id: 3,
    name: "Pragmatist's Compromise",
    requiredStyle: 'Pragmatist',
    requiredIntegrity: 40,
    description: "Your ability to find middle ground has made you valuable to all sides. You're asked to broker a deal between anti-corruption activists and business interests to create new regulations.",
    scenarioModifiers: [
      { scenarioId: 3, newChoices: true, modifiedDescription: "Your reputation for practical solutions has led to your selection as a mediator. The school board is deadlocked between strict merit-based admissions and a system that gives preference to donors and legacy students." }
    ]
  },
  {
    id: 4,
    name: "Idealist's Stand",
    requiredStyle: 'Idealist',
    requiredIntegrity: 75,
    description: "Your unwavering integrity has made you a symbol of ethical leadership. You're offered a prominent position that would allow you to implement sweeping anti-corruption measures, but at great personal cost.",
    scenarioModifiers: [
      { scenarioId: 5, newChoices: true, modifiedDescription: "Your uncompromising ethical stance has earned you a nomination to lead a new environmental protection agency. You have the chance to implement significant reforms, but powerful industry players are mobilizing against you." }
    ]
  },
  {
    id: 5,
    name: "Opportunist's Gambit",
    requiredStyle: 'Opportunist',
    requiredIntegrity: 0,
    description: "Your flexible ethics have connected you with powerful networks operating in gray areas. You're offered entry into an exclusive circle that can provide wealth and influence, but at the cost of being complicit in their schemes.",
    scenarioModifiers: [
      { scenarioId: 4, newChoices: true, modifiedDescription: "Your willingness to bend rules has attracted attention from a network of hospital administrators and pharmaceutical representatives. They're offering you entry into a lucrative arrangement, but it would mean fully embracing systematic corruption." }
    ]
  }
];
