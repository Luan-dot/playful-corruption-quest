// This file implements the core consequences tracking system

export interface Decision {
  scenarioId: number;
  choiceId: number;
  timestamp: number;
  stats: {
    integrity: number;
    money: number;
    power: number;
    reputation: number;
  };
}

export interface Consequence {
  id: string;
  title: string;
  description: string;
  triggerCondition: (playerHistory: Decision[]) => boolean;
  effect: {
    scenarioModification?: {
      scenarioId: number;
      modifiedText?: string;
      modifiedChoices?: {
        choiceId: number;
        newText?: string;
        newOutcome?: string;
        newEffects?: {
          integrity?: number;
          money?: number;
          power?: number;
          reputation?: number;
        };
      }[];
      additionalChoice?: {
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
      };
    };
    newsEvent?: {
      headline: string;
      source: string;
      content: string;
      image?: string;
    };
    specialEvent?: {
      type: "investigation" | "confrontation" | "opportunity" | "scandal";
      content: {
        title: string;
        description: string;
      };
    };
  };
  applied: boolean;
}

// Manages all the consequences in the game
export class ConsequenceManager {
  private consequences: Consequence[] = [];
  private decisions: Decision[] = [];
  private activeScenarioModifications: { [scenarioId: number]: Consequence[] } =
    {};
  private pendingNewsEvents: Consequence[] = [];
  private pendingSpecialEvents: Consequence[] = [];

  constructor() {
    // Load saved state from localStorage if available
    this.loadState();
  }

  // Add predefined consequences to the system
  public initialize(consequences: Consequence[]): void {
    this.consequences = consequences;
    this.evaluateConsequences();
  }

  // Record a new player decision
  public recordDecision(decision: Decision): void {
    this.decisions.push(decision);
    this.saveState();
    this.evaluateConsequences();
  }

  // Check if any consequences should be triggered based on history
  private evaluateConsequences(): void {
    this.consequences.forEach((consequence) => {
      if (
        !consequence.applied &&
        consequence.triggerCondition(this.decisions)
      ) {
        // Mark the consequence as applied
        consequence.applied = true;

        // Add scenario modifications to the active list
        if (consequence.effect.scenarioModification) {
          const scenarioId = consequence.effect.scenarioModification.scenarioId;
          if (!this.activeScenarioModifications[scenarioId]) {
            this.activeScenarioModifications[scenarioId] = [];
          }
          this.activeScenarioModifications[scenarioId].push(consequence);
        }

        // Add news events to the pending list
        if (consequence.effect.newsEvent) {
          this.pendingNewsEvents.push(consequence);
        }

        // Add special events to the pending list
        if (consequence.effect.specialEvent) {
          this.pendingSpecialEvents.push(consequence);
        }

        this.saveState();
      }
    });
  }

  // Get modifications for a specific scenario
  public getScenarioModifications(scenarioId: number): Consequence[] {
    return this.activeScenarioModifications[scenarioId] || [];
  }

  // Get and clear pending news events
  public getPendingNewsEvents(): Consequence[] {
    const events = [...this.pendingNewsEvents];
    this.pendingNewsEvents = [];
    this.saveState();
    return events;
  }

  // Get and clear pending special events
  public getPendingSpecialEvents(): Consequence[] {
    const events = [...this.pendingSpecialEvents];
    this.pendingSpecialEvents = [];
    this.saveState();
    return events;
  }

  // Save the current state to localStorage
  private saveState(): void {
    const state = {
      consequences: this.consequences,
      decisions: this.decisions,
      activeScenarioModifications: this.activeScenarioModifications,
      pendingNewsEvents: this.pendingNewsEvents,
      pendingSpecialEvents: this.pendingSpecialEvents,
    };

    localStorage.setItem("consequences_state", JSON.stringify(state));
  }

  // Load state from localStorage
  private loadState(): void {
    const savedState = localStorage.getItem("consequences_state");

    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        this.consequences = state.consequences || [];
        this.decisions = state.decisions || [];
        this.activeScenarioModifications =
          state.activeScenarioModifications || {};
        this.pendingNewsEvents = state.pendingNewsEvents || [];
        this.pendingSpecialEvents = state.pendingSpecialEvents || [];
      } catch (e) {
        console.error("Failed to load saved consequence state", e);
      }
    }
  }

  // Clear saved state (for new game)
  public resetState(): void {
    this.consequences = this.consequences.map((c) => ({
      ...c,
      applied: false,
    }));
    this.decisions = [];
    this.activeScenarioModifications = {};
    this.pendingNewsEvents = [];
    this.pendingSpecialEvents = [];
    this.saveState();
  }
}

// Create and export a singleton instance
export const consequenceManager = new ConsequenceManager();
