
import React, { useEffect } from 'react';
import GameHeader from './GameHeader';
import StatsPanel from './StatsPanel';
import MainContent from './MainContent';
import SpecialActivities from './SpecialActivities';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';

interface GameContainerProps {
  difficulty?: string;
  onOpenLibrary?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ 
  difficulty = 'intermediate', 
  onOpenLibrary 
}) => {
  const { toast } = useToast();
  const {
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
    handleChoice,
    moveToNextScenario,
    handleActivityComplete
  } = useGameState(difficulty);

  // Effect to notify player about ripple effects
  useEffect(() => {
    if (hasRippleEffects) {
      toast({
        title: "Ripple Effect Detected",
        description: "Your past decisions have created unexpected consequences in the current scenario.",
        variant: "destructive",
      });
    }
  }, [hasRippleEffects, toast]);

  // If we're in a special activity state or game is complete, show that UI
  if (gameState !== 'main-scenario') {
    return (
      <SpecialActivities 
        gameState={gameState}
        currentScenario={currentScenario}
        playerStats={playerStats}
        onComplete={handleActivityComplete}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl animate-fade-in">
      <GameHeader playerStyle={playerStats.playerStyle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats panel */}
        <div className="md:col-span-1">
          <StatsPanel 
            playerStats={playerStats}
            currentScenario={currentScenario}
            showHint={showHint}
            toggleHint={toggleHint}
            branching={branching}
            onOpenLibrary={onOpenLibrary}
          />
        </div>
        
        {/* Main game content */}
        <div className="md:col-span-2">
          <MainContent 
            currentScenario={currentScenario}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showingSummary={showingSummary}
            onChoice={handleChoice}
            onContinue={moveToNextScenario}
            lastChoiceId={lastChoiceId}
            triggeredHeadlines={triggeredHeadlines}
          />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
