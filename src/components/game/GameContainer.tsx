
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
  CheckCircle2,
  Newspaper,
  Network,
  Lightbulb,
  BookMarked
} from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import ResultsScreen from './ResultsScreen';
import EducationalSidebar from './EducationalSidebar';
import { scenarios } from '@/data/scenarios';
import { newsItems } from '@/data/news';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CharacterDevelopment from './CharacterDevelopment';
import SocialComparison from './SocialComparison';
import ReflectionPrompt from './ReflectionPrompt';
import BranchingNarrative from './BranchingNarrative';
import InvestigationMiniGame from './InvestigationMiniGame';
import CorruptionEcosystem from './CorruptionEcosystem';
import VulnerabilityAssessment from './VulnerabilityAssessment';

interface GameContainerProps {
  difficulty?: string;
  onOpenLibrary?: () => void;
}

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

type GameState = 
  'main-scenario' | 
  'reflection' | 
  'investigation' | 
  'ecosystem' | 
  'branching-narrative' | 
  'vulnerability-assessment' | 
  'complete';

const GameContainer: React.FC<GameContainerProps> = ({ difficulty = 'intermediate', onOpenLibrary }) => {
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
  const [gameState, setGameState] = useState<GameState>('main-scenario');
  const [showHint, setShowHint] = useState(false);
  const [lastChoiceId, setLastChoiceId] = useState<number | null>(null);
  const [showSpecialActivity, setShowSpecialActivity] = useState(false);
  
  useEffect(() => {
    // After completing a scenario, randomly show a special activity
    if (showingSummary && playerStats.completedScenarios > 0 && playerStats.completedScenarios < scenarios.length) {
      const shouldShowActivity = Math.random() > 0.3; // 70% chance to show an activity
      setShowSpecialActivity(shouldShowActivity);
    } else {
      setShowSpecialActivity(false);
    }
  }, [showingSummary, playerStats.completedScenarios]);

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
      
      // Choose an activity based on current scenario
      // This is a simplified version - could be more sophisticated
      let nextActivity: GameState;
      
      if (playerStats.completedScenarios === 1) {
        nextActivity = 'reflection';
      } else if (playerStats.completedScenarios === 2) {
        nextActivity = 'ecosystem';
      } else if (playerStats.completedScenarios === 3) {
        nextActivity = 'branching-narrative';
      } else if (playerStats.completedScenarios === 4) {
        nextActivity = 'investigation';
      } else {
        // Random selection
        const randomIndex = Math.floor(Math.random() * specialActivities.length);
        nextActivity = specialActivities[randomIndex];
      }
      
      setGameState(nextActivity);
      setShowSpecialActivity(false);
    } else if (currentScenario < scenarios.length - 1) {
      // Move to next main scenario
      setCurrentScenario(prev => prev + 1);
      setShowingSummary(false);
      setActiveTab("scenario");
      setShowHint(false);
      setGameState('main-scenario');
    } else {
      // Game completed
      setGameState('complete');
    }
  };
  
  const handleActivityComplete = () => {
    // After completing a special activity, continue to the next scenario
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setShowingSummary(false);
      setActiveTab("scenario");
      setShowHint(false);
      setGameState('main-scenario');
    } else {
      setGameState('complete');
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
    if (playerStats.integrity >= 80) return "text-black";
    if (playerStats.integrity >= 50) return "text-black";
    if (playerStats.integrity >= 30) return "text-black font-medium";
    return "text-black font-bold";
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  // Find a relevant news item for the current scenario
  const getRelevantNews = () => {
    return newsItems.find(item => item.relatedScenarioId === scenarios[currentScenario].id);
  };

  // Render special activities
  const renderSpecialActivity = () => {
    switch(gameState) {
      case 'reflection':
        // Fix: Add a null check for currentScenario and make sure it's valid before accessing
        if (currentScenario <= 0 || !scenarios[currentScenario - 1]) {
          return (
            <div className="container mx-auto px-4 py-6 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Error: Scenario not found</h2>
              <Button variant="minimal" onClick={handleActivityComplete}>Continue</Button>
            </div>
          );
        }
        return (
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <h2 className="text-2xl font-serif mb-6 text-center">Reflection Moment</h2>
            <ReflectionPrompt 
              scenarioId={scenarios[currentScenario - 1].id} 
              onComplete={handleActivityComplete} 
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
                handleActivityComplete();
              }} 
            />
          </div>
        );
        
      case 'ecosystem':
        return (
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <h2 className="text-2xl font-serif mb-6 text-center">Understanding Corruption Ecosystems</h2>
            <CorruptionEcosystem onComplete={handleActivityComplete} />
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
                handleActivityComplete();
              }} 
            />
          </div>
        );
        
      case 'vulnerability-assessment':
        return (
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <h2 className="text-2xl font-serif mb-6 text-center">Personal Integrity Assessment</h2>
            <VulnerabilityAssessment onComplete={handleActivityComplete} />
          </div>
        );
        
      case 'complete':
        return <ResultsScreen playerStats={playerStats} scenarios={scenarios} />;
        
      default:
        return null;
    }
  };

  if (gameState !== 'main-scenario' && gameState !== 'complete') {
    return renderSpecialActivity();
  }
  
  if (gameState === 'complete') {
    return <ResultsScreen playerStats={playerStats} scenarios={scenarios} />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif mb-2">Political Integrity</h1>
        <p className="text-lg text-muted-foreground font-serif">
          A game about leadership, ethics, and human nature
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats panel */}
        <div className="md:col-span-1">
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
                <span>Corruption Level: <span className={getCorruptionColorClass()}>{getCorruptionLevel()}</span></span>
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

            {/* Character Development */}
            <CharacterDevelopment 
              integrity={playerStats.integrity}
              reputation={playerStats.reputation}
              completedScenarios={playerStats.completedScenarios}
            />

            {/* Educational Sidebar */}
            <div className="mt-6">
              <EducationalSidebar scenario={scenarios[currentScenario]} showHint={showHint} toggleHint={toggleHint} />
            </div>
          </Card>
        </div>
        
        {/* Main game content */}
        <div className="md:col-span-2">
          <Card className="shadow-sm overflow-hidden rounded-none border">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-muted p-1 flex justify-between items-center border-b">
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
                  <TabsTrigger value="news" className="data-[state=active]:bg-background">
                    <div className="flex items-center gap-1">
                      <Newspaper className="h-4 w-4" />
                      <span>News</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <div className="pr-4">
                  <Badge variant="outline" className="minimal-badge">
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
                
                {/* Social Comparison - only show after making a choice */}
                {showingSummary && lastChoiceId && (
                  <div className="px-6 pb-6">
                    <SocialComparison 
                      scenarioId={scenarios[currentScenario].id}
                      playerChoice={lastChoiceId}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="context" className="p-6 m-0 min-h-[400px]">
                <div className="p-6 border">
                  <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    <span>Educational Context</span>
                  </h3>
                  <div className="prose max-w-none">
                    <p className="mb-3">{scenarios[currentScenario].context}</p>
                    
                    <div className="p-4 border mt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4" />
                        <span>Why This Matters</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{scenarios[currentScenario].lesson}</p>
                    </div>

                    <div className="p-4 border mt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4" />
                        <span>Real-World Example</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{scenarios[currentScenario].realWorldExample}</p>
                    </div>
                    
                    <div className="p-4 border border-black mt-4">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <Network className="h-4 w-4" />
                        <span>Corruption Ecosystem Analysis</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        This type of corruption often involves networks of {scenarios[currentScenario].stakeholders.join(", ")}. 
                        The power dynamics between these stakeholders and the information asymmetries create conditions 
                        where corruption can flourish if proper safeguards aren't in place.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="news" className="p-6 m-0 min-h-[400px]">
                {getRelevantNews() ? (
                  <div className="p-6 border">
                    <div className="border-b pb-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="minimal-badge">Breaking News</Badge>
                        <span className="text-sm text-muted-foreground">{getRelevantNews()?.date}</span>
                      </div>
                      <h3 className="text-xl font-serif mb-1">{getRelevantNews()?.title}</h3>
                      <p className="text-sm text-muted-foreground">Source: {getRelevantNews()?.source}</p>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="mb-4 text-lg">{getRelevantNews()?.summary}</p>
                      
                      <div className="p-4 border">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4" />
                          <span>How This Relates To Your Scenario</span>
                        </h4>
                        <p className="text-sm">
                          This news story illustrates the real-world consequences of situations similar to the one you're facing.
                          Consider how your decisions might have similar impacts if scaled to an organizational or systemic level.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Related News</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      There are no current news stories directly related to this scenario. Check back after exploring more cases.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
