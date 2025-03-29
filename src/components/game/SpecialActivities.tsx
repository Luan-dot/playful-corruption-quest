
import React from 'react';
import { Button } from '@/components/ui/button';
import ReflectionPrompt from './ReflectionPrompt';
import InvestigationMiniGame from './InvestigationMiniGame';
import CorruptionEcosystem from './CorruptionEcosystem';
import BranchingNarrative from './BranchingNarrative';
import VulnerabilityAssessment from './VulnerabilityAssessment';
import ResultsScreen from './ResultsScreen';
import { scenarios } from '@/data/scenarios';
import { useToast } from '@/hooks/use-toast';
import { GameState, PlayerStats } from '@/hooks/useGameState';

interface SpecialActivitiesProps {
  gameState: GameState;
  currentScenario: number;
  playerStats: PlayerStats;
  onComplete: () => void;
}

const SpecialActivities: React.FC<SpecialActivitiesProps> = ({
  gameState,
  currentScenario,
  playerStats,
  onComplete
}) => {
  const { toast } = useToast();

  // Safeguard against invalid currentScenario index
  const safeScenarioIndex = () => {
    // For activities that need previous scenario data
    if (gameState === 'reflection') {
      return Math.max(0, currentScenario - 1);
    }
    return currentScenario;
  };
  
  // Get the scenario safely
  const getScenario = () => {
    const index = safeScenarioIndex();
    return index < scenarios.length ? scenarios[index] : scenarios[0];
  };
    
  switch(gameState) {
    case 'reflection':
      // Get previous scenario id safely
      const scenarioId = currentScenario > 0 && scenarios[currentScenario - 1] 
        ? scenarios[currentScenario - 1].id 
        : 1;
        
      return (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <h2 className="text-2xl font-serif mb-6 text-center">Reflection Moment</h2>
          <ReflectionPrompt 
            scenarioId={scenarioId} 
            onComplete={onComplete} 
          />
        </div>
      );
        
    case 'investigation':
      return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h2 className="text-2xl font-serif mb-6 text-center">Corruption Investigation Challenge</h2>
          <InvestigationMiniGame 
            onComplete={(score) => {
              toast({
                title: "Investigation Complete",
                description: `You scored ${score}% in your investigation efforts.`,
                variant: score >= 70 ? "default" : "destructive",
              });
              onComplete();
            }} 
          />
        </div>
      );
        
    case 'ecosystem':
      return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h2 className="text-2xl font-serif mb-6 text-center">Understanding Corruption Ecosystems</h2>
          <CorruptionEcosystem onComplete={onComplete} />
        </div>
      );
        
    case 'branching-narrative':
      return (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <h2 className="text-2xl font-serif mb-6 text-center">Corruption Dialogue Simulation</h2>
          <BranchingNarrative 
            onComplete={(stats) => {
              toast({
                title: "Dialogue Complete",
                description: `You navigated the conversation as a ${stats.path}.`,
                variant: stats.reputation > 0 ? "default" : "destructive",
              });
              onComplete();
            }} 
          />
        </div>
      );
        
    case 'vulnerability-assessment':
      return (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <h2 className="text-2xl font-serif mb-6 text-center">Personal Integrity Assessment</h2>
          <VulnerabilityAssessment onComplete={onComplete} />
        </div>
      );
        
    case 'complete':
      return <ResultsScreen playerStats={playerStats} scenarios={scenarios} />;
        
    default:
      return (
        <div className="container mx-auto text-center py-12">
          <h2 className="text-2xl mb-4">Activity not found</h2>
          <Button onClick={onComplete}>Continue</Button>
        </div>
      );
  }
};

export default SpecialActivities;
