
import { useState, useEffect } from 'react';
import { scenarios } from '@/data/scenarios';
import { determinePlayerStyle, storyBranches } from '@/data/player-profiles';
import { consequences } from '@/data/consequences';
import { useToast } from '@/hooks/use-toast';

export type PlayerStats = {
  integrity: number;
  money: number;
  power: number;
  reputation: number;
  completedScenarios: number;
  choices: Array<{
    scenarioId: number;
    choiceId: number;
    text: string;
    outcome: string;
  }>;
  playerStyle: string;
  triggeredConsequences: number[];
}

export type GameState = 
  'main-scenario' | 
  'reflection' | 
  'investigation' | 
  'ecosystem' | 
  'branching-narrative' | 
  'vulnerability-assessment' | 
  'complete';

export const useGameState = (difficulty = 'intermediate') => {
  const { toast } = useToast();
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    integrity: 100,
    money: 50,
    power: 30,
    reputation: 70,
    completedScenarios: 0,
    choices: [],
    playerStyle: 'Undetermined',
    triggeredConsequences: []
  });
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showingSummary, setShowingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState("scenario");
  const [gameState, setGameState] = useState<GameState>('main-scenario');
  const [showHint, setShowHint] = useState(false);
  const [lastChoiceId, setLastChoiceId] = useState<number | null>(null);
  const [showSpecialActivity, setShowSpecialActivity] = useState(false);
  const [triggeredHeadlines, setTriggeredHeadlines] = useState<typeof consequences>([]);
  const [branching, setBranching] = useState(false);
  const [hasRippleEffects, setHasRippleEffects] = useState(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'transitioning'>('idle');
  
  // Determine player style based on choices and stats
  useEffect(() => {
    if (playerStats.choices.length > 0) {
      const style = determinePlayerStyle(
        playerStats.integrity,
        playerStats.money,
        playerStats.power,
        playerStats.reputation,
        playerStats.choices.map(c => ({ scenarioId: c.scenarioId, choiceId: c.choiceId }))
      );
      
      if (style !== playerStats.playerStyle) {
        setPlayerStats(prev => ({
          ...prev,
          playerStyle: style
        }));
        
        // Enhanced toast for player style changes
        toast({
          title: "Leadership Style Evolved",
          description: `Your decisions have shaped your character. You are now identified as: ${style}`,
          variant: "default",
        });
      }
    }
  }, [playerStats.choices, playerStats.integrity, playerStats.money, playerStats.power, playerStats.reputation, toast]);
  
  // Check for story branches that should be activated
  useEffect(() => {
    if (playerStats.playerStyle !== 'Undetermined' && playerStats.completedScenarios >= 2) {
      const eligibleBranches = storyBranches.filter(branch => 
        branch.requiredStyle === playerStats.playerStyle && 
        playerStats.integrity >= branch.requiredIntegrity
      );
      
      if (eligibleBranches.length > 0 && !branching) {
        setBranching(true);
        
        // Enhanced toast for branching narratives
        toast({
          title: "Narrative Path Unlocked",
          description: `Your ${playerStats.playerStyle} leadership style has revealed a unique storyline. New options will become available.`,
          variant: "default",
        });
      }
    }
  }, [playerStats.playerStyle, playerStats.integrity, playerStats.completedScenarios, branching, toast]);
  
  useEffect(() => {
    // After completing a scenario, randomly show a special activity
    if (showingSummary && playerStats.completedScenarios > 0 && playerStats.completedScenarios < scenarios.length) {
      // Create more structured special activity selection based on player progress
      const shouldShowActivity = Math.random() > 0.3; // 70% chance to show an activity
      setShowSpecialActivity(shouldShowActivity);
    } else {
      setShowSpecialActivity(false);
    }
  }, [showingSummary, playerStats.completedScenarios]);

  // Check for consequences that should be triggered
  useEffect(() => {
    if (!showingSummary || currentScenario <= 0) return;
    
    // Find consequences that should trigger on this scenario
    const relevantConsequences = consequences.filter(c => 
      c.triggerScenarioId === scenarios[currentScenario].id && 
      !playerStats.triggeredConsequences.includes(c.id) &&
      playerStats.choices.some(choice => choice.scenarioId === c.scenarioId && choice.choiceId === c.choiceId)
    );
    
    if (relevantConsequences.length > 0) {
      setTriggeredHeadlines(relevantConsequences);
      setHasRippleEffects(true);
      
      // Apply consequence effects
      setPlayerStats(prev => {
        const newStats = { ...prev };
        relevantConsequences.forEach(consequence => {
          if (consequence.impact.integrity) newStats.integrity = Math.max(0, Math.min(100, newStats.integrity + consequence.impact.integrity));
          if (consequence.impact.money) newStats.money = Math.max(0, Math.min(100, newStats.money + consequence.impact.money));
          if (consequence.impact.power) newStats.power = Math.max(0, Math.min(100, newStats.power + consequence.impact.power));
          if (consequence.impact.reputation) newStats.reputation = Math.max(0, Math.min(100, newStats.reputation + consequence.impact.reputation));
          newStats.triggeredConsequences.push(consequence.id);
        });
        return newStats;
      });
      
      // Enhanced toast for ripple effects with more specific information
      const impactDescription = relevantConsequences.length > 1 
        ? `${relevantConsequences.length} of your earlier choices have created consequences.`
        : "An earlier choice has returned to impact your current situation.";
        
      setTimeout(() => {
        toast({
          title: "Past Decisions Return",
          description: impactDescription,
          variant: "destructive",
        });
      }, 500); // Slight delay for better pacing
    } else {
      setTriggeredHeadlines([]);
      setHasRippleEffects(false);
    }
  }, [currentScenario, showingSummary, playerStats.choices, playerStats.triggeredConsequences, toast]);

  const handleChoice = (choiceId: number) => {
    const scenario = scenarios[currentScenario];
    const choice = scenario.choices.find(c => c.id === choiceId);
    
    if (!choice) return;
    
    // Update player statistics based on choice outcomes
    setPlayerStats(prev => {
      const newStats = {
        ...prev,
        integrity: Math.max(0, Math.min(100, prev.integrity + (choice.outcomes.integrity || 0))),
        money: Math.max(0, Math.min(100, prev.money + (choice.outcomes.money || 0))),
        power: Math.max(0, Math.min(100, prev.power + (choice.outcomes.power || 0))),
        reputation: Math.max(0, Math.min(100, prev.reputation + (choice.outcomes.reputation || 0))),
        completedScenarios: prev.completedScenarios + 1,
        choices: [...prev.choices, {
          scenarioId: scenario.id,
          choiceId: choice.id,
          text: choice.text,
          outcome: choice.outcomeText
        }]
      };
      return newStats;
    });
    
    setLastChoiceId(choiceId);

    // Improved feedback for choices with better timing
    setTimeout(() => {
      toast({
        title: "Decision Made",
        description: choice.outcomeText,
        variant: choice.outcomes.integrity < 0 ? "destructive" : "default",
      });
    }, 300);

    // Show summary after choice with a slight animation delay
    setShowingSummary(true);
    
    // Check for immediate feedback on particularly significant choices
    if (Math.abs(choice.outcomes.integrity || 0) >= 15 || 
        Math.abs(choice.outcomes.reputation || 0) >= 15) {
      
      setTimeout(() => {
        toast({
          title: "Significant Impact",
          description: "This decision will have far-reaching consequences on your journey.",
          variant: "default",
        });
      }, 1800); // Longer delay for second toast
    }
  };

  const moveToNextScenario = () => {
    // Add transition state for smoother movement between scenarios
    setTransitionState('transitioning');
    
    // After showing the summary, determine next state
    if (showSpecialActivity) {
      // Choose a special activity based on the current scenario and player stats
      const specialActivities: GameState[] = [
        'reflection', 
        'investigation', 
        'ecosystem', 
        'branching-narrative', 
        'vulnerability-assessment'
      ];
      
      // Choose an activity based on current scenario and player style
      let nextActivity: GameState;
      
      if (playerStats.completedScenarios === 1) {
        nextActivity = 'reflection';
      } else if (playerStats.completedScenarios === 2) {
        nextActivity = 'ecosystem';
      } else if (playerStats.completedScenarios === 3) {
        nextActivity = playerStats.integrity < 50 ? 'investigation' : 'branching-narrative';
      } else if (playerStats.completedScenarios === 4) {
        nextActivity = 'vulnerability-assessment';
      } else {
        // Choose based on player style with improved selection logic
        if (playerStats.playerStyle === 'Pragmatic Reformer') {
          nextActivity = Math.random() > 0.5 ? 'ecosystem' : 'reflection';
        } else if (playerStats.playerStyle === 'Power Broker') {
          nextActivity = Math.random() > 0.5 ? 'branching-narrative' : 'investigation';
        } else if (playerStats.playerStyle === 'Ethical Purist') {
          nextActivity = Math.random() > 0.5 ? 'reflection' : 'vulnerability-assessment';
        } else {
          // Random selection
          const randomIndex = Math.floor(Math.random() * specialActivities.length);
          nextActivity = specialActivities[randomIndex];
        }
      }
      
      // Add delay for smoother transition
      setTimeout(() => {
        setGameState(nextActivity);
        setShowSpecialActivity(false);
        setTransitionState('idle');
      }, 400);
    } else if (currentScenario < scenarios.length - 1) {
      // Move to next main scenario with a delay for better pacing
      setTimeout(() => {
        setCurrentScenario(prev => prev + 1);
        setShowingSummary(false);
        setActiveTab("scenario");
        setShowHint(false);
        setGameState('main-scenario');
        setTriggeredHeadlines([]);
        setHasRippleEffects(false);
        setTransitionState('idle');
        
        // Toast to indicate progression
        toast({
          title: "New Scenario",
          description: `Scenario ${currentScenario + 2} of ${scenarios.length}`,
          variant: "default",
        });
      }, 400);
    } else {
      // Game completed
      setTimeout(() => {
        setGameState('complete');
        setTransitionState('idle');
      }, 400);
    }
  };
  
  const handleActivityComplete = () => {
    // After completing a special activity, continue to the next scenario
    setTransitionState('transitioning');
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setShowingSummary(false);
        setActiveTab("scenario");
        setShowHint(false);
        setGameState('main-scenario');
        setHasRippleEffects(false);
      } else {
        setGameState('complete');
      }
      setTransitionState('idle');
    }, 400);
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
    
    if (!showHint) {
      toast({
        title: "Hint Revealed",
        description: "Remember that seeking help is not a sign of weakness, but of wisdom.",
        variant: "default",
      });
    }
  };

  return {
    playerStats,
    currentScenario,
    showingSummary,
    activeTab,
    setActiveTab,
    gameState,
    showHint,
    toggleHint,
    lastChoiceId,
    triggeredHeadlines,
    branching,
    hasRippleEffects,
    transitionState,
    handleChoice,
    moveToNextScenario,
    handleActivityComplete
  };
};

// Helper functions that were inside GameContainer
export const getCorruptionLevel = (integrity: number) => {
  if (integrity >= 80) return "Low";
  if (integrity >= 50) return "Moderate";
  if (integrity >= 30) return "High";
  return "Severe";
};

export const getCorruptionColorClass = (integrity: number) => {
  if (integrity >= 80) return "text-black";
  if (integrity >= 50) return "text-black";
  if (integrity >= 30) return "text-black font-medium";
  return "text-black font-bold";
};

export const getCharacterEmotion = (integrity: number, reputation: number) => {
  if (integrity < 40 || reputation < 40) return 'negative';
  if (integrity > 70 || reputation > 70) return 'positive';
  return 'neutral';
};
