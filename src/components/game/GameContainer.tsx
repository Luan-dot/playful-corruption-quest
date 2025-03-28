
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  BarChart3, 
  Building, 
  Users, 
  HelpCircle, 
  Info,
  Award,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import ResultsScreen from './ResultsScreen';
import EducationalSidebar from './EducationalSidebar';
import { scenarios } from '@/data/scenarios';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PlayerStats = {
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
}

const GameContainer = () => {
  const { toast } = useToast();
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    integrity: 100,
    money: 50,
    power: 30,
    reputation: 70,
    completedScenarios: 0,
    choices: []
  });
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showingSummary, setShowingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState("scenario");
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

    // Show outcome toast
    toast({
      title: "Decision Made",
      description: choice.outcomeText,
      variant: choice.outcomes.integrity < 0 ? "destructive" : "default",
    });

    // Show summary after choice
    setShowingSummary(true);
  };

  const moveToNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setShowingSummary(false);
      setActiveTab("scenario");
      setShowHint(false);
    } else {
      // Game completed
      setIsGameComplete(true);
    }
  };

  // Get intensity of corruption based on integrity score
  const getCorruptionLevel = () => {
    if (playerStats.integrity >= 80) return "Low";
    if (playerStats.integrity >= 50) return "Moderate";
    if (playerStats.integrity >= 30) return "High";
    return "Severe";
  };

  // Get color classes based on corruption level
  const getCorruptionColorClass = () => {
    if (playerStats.integrity >= 80) return "text-green-600";
    if (playerStats.integrity >= 50) return "text-yellow-500";
    if (playerStats.integrity >= 30) return "text-orange-500";
    return "text-corruption-red";
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  if (isGameComplete) {
    return <ResultsScreen playerStats={playerStats} scenarios={scenarios} />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-corruption-primary">Corruption Conundrum</h1>
        <p className="text-lg text-muted-foreground">
          Navigate the murky waters of corruption and integrity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats panel */}
        <div className="md:col-span-1">
          <Card className="p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <span>Your Status</span>
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Integrity</span>
                  <span className="text-sm font-medium">{playerStats.integrity}%</span>
                </div>
                <Progress value={playerStats.integrity} className="h-2" 
                  style={{
                    background: `linear-gradient(to right, #EA384C, #FFA500, #E5DEFF)`,
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Money</span>
                  <span className="text-sm font-medium">{playerStats.money}%</span>
                </div>
                <Progress value={playerStats.money} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Power</span>
                  <span className="text-sm font-medium">{playerStats.power}%</span>
                </div>
                <Progress value={playerStats.power} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Reputation</span>
                  <span className="text-sm font-medium">{playerStats.reputation}%</span>
                </div>
                <Progress value={playerStats.reputation} className="h-2" />
              </div>
            </div>
            
            <div className="p-3 rounded-md bg-muted mb-4">
              <p className="text-sm flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4" />
                <span>Corruption Level: <span className={getCorruptionColorClass() + " font-bold"}>{getCorruptionLevel()}</span></span>
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="flex gap-1 items-center">
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

            {!isGameComplete && (
              <div className="mt-6">
                <EducationalSidebar scenario={scenarios[currentScenario]} showHint={showHint} toggleHint={toggleHint} />
              </div>
            )}
          </Card>
        </div>
        
        {/* Main game content */}
        <div className="md:col-span-2">
          <Card className="shadow-md overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-muted p-1 flex justify-between items-center">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="scenario" className="data-[state=active]:bg-background">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Scenario</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="context" className="data-[state=active]:bg-background">
                    <div className="flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      <span>Context</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <div className="pr-4">
                  <Badge variant="outline" className="bg-primary/10">
                    Case {currentScenario + 1} of {scenarios.length}
                  </Badge>
                </div>
              </div>
              
              <TabsContent value="scenario" className="p-0 m-0">
                <ScenarioCard 
                  scenario={scenarios[currentScenario]} 
                  onChoice={handleChoice}
                  showingSummary={showingSummary}
                  onContinue={moveToNextScenario}
                />
              </TabsContent>
              
              <TabsContent value="context" className="p-6 m-0 min-h-[400px] bg-muted/20">
                <div className="paper-bg p-6 rounded-md">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Building className="h-5 w-5 text-corruption-primary" />
                    <span>Educational Context</span>
                  </h3>
                  <div className="prose max-w-none">
                    <p className="mb-3">{scenarios[currentScenario].context}</p>
                    
                    <div className="p-4 border border-muted rounded-md mt-4 bg-white/50">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-corruption-secondary" />
                        <span>Why This Matters</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{scenarios[currentScenario].lesson}</p>
                    </div>

                    <div className="p-4 border border-muted rounded-md mt-4 bg-primary/5">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-corruption-primary" />
                        <span>Real-World Example</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{scenarios[currentScenario].realWorldExample}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
