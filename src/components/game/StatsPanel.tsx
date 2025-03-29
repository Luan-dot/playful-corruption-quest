
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  BookMarked,
  HelpCircle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CharacterDevelopment from './CharacterDevelopment';
import CorruptionNetwork from './CorruptionNetwork';
import EducationalSidebar from './EducationalSidebar';
import { CharacterPortrait, LocationIllustration } from './VisualElements';
import { getCorruptionLevel, getCorruptionColorClass, getCharacterEmotion } from '@/hooks/useGameState';
import { PlayerStats } from '@/hooks/useGameState';
import { scenarios } from '@/data/scenarios';

interface StatsPanelProps {
  playerStats: PlayerStats;
  currentScenario: number;
  showHint: boolean;
  toggleHint: () => void;
  branching: boolean;
  onOpenLibrary?: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  playerStats,
  currentScenario,
  showHint,
  toggleHint,
  branching,
  onOpenLibrary
}) => {
  return (
    <Card className="p-4 shadow-sm rounded-none border">
      <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        <span>Status</span>
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Integrity</span>
            <span className="text-sm font-medium">{playerStats.integrity}%</span>
          </div>
          <Progress value={playerStats.integrity} className="minimal-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Money</span>
            <span className="text-sm font-medium">{playerStats.money}%</span>
          </div>
          <Progress value={playerStats.money} className="minimal-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Power</span>
            <span className="text-sm font-medium">{playerStats.power}%</span>
          </div>
          <Progress value={playerStats.power} className="minimal-progress" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Reputation</span>
            <span className="text-sm font-medium">{playerStats.reputation}%</span>
          </div>
          <Progress value={playerStats.reputation} className="minimal-progress" />
        </div>
      </div>
      
      <div className="p-3 border border-black mb-4">
        <p className="text-sm flex gap-2 items-center">
          <AlertTriangle className="h-4 w-4" />
          <span>Corruption Level: <span className={getCorruptionColorClass(playerStats.integrity)}>
            {getCorruptionLevel(playerStats.integrity)}
          </span></span>
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Badge variant="outline" className="flex gap-1 items-center minimal-badge">
          <CheckCircle2 className="h-3 w-3" />
          <span>{playerStats.completedScenarios}/{scenarios.length} Cases</span>
        </Badge>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Higher integrity means less corruption. Your choices affect all your stats.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {onOpenLibrary && (
        <Button 
          variant="minimal" 
          onClick={onOpenLibrary} 
          className="w-full mb-6 gap-2"
        >
          <BookMarked className="h-4 w-4" />
          <span>Resource Library</span>
        </Button>
      )}

      {/* Visual character representation */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Character Portrait</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <CharacterPortrait 
              emotion={getCharacterEmotion(playerStats.integrity, playerStats.reputation)} 
              role={scenarios[currentScenario].setting.position} 
            />
          </div>
          <div className="col-span-2">
            <LocationIllustration 
              setting={scenarios[currentScenario].setting.location} 
            />
          </div>
        </div>
      </div>

      {/* Character Development */}
      <CharacterDevelopment 
        integrity={playerStats.integrity}
        reputation={playerStats.reputation}
        completedScenarios={playerStats.completedScenarios}
      />

      {/* Corruption network visualization */}
      {branching && (
        <div className="mt-6">
          <CorruptionNetwork 
            stakeholders={scenarios[currentScenario].stakeholders}
            title={`Impact Network: ${scenarios[currentScenario].title}`}
            isCorrupt={playerStats.integrity < 50}
          />
        </div>
      )}

      {/* Educational Sidebar */}
      <div className="mt-6">
        <EducationalSidebar scenario={scenarios[currentScenario]} showHint={showHint} toggleHint={toggleHint} />
      </div>
    </Card>
  );
};

export default StatsPanel;
