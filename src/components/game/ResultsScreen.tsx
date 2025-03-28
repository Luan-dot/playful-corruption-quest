
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Award, 
  RefreshCw, 
  ReceiptText, 
  Share2,
  CheckCircle2,
  XCircle,
  Brain,
  BookOpen,
  Globe,
  LineChart,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { Scenario } from '@/data/scenarios';

interface ResultsScreenProps {
  playerStats: {
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
  };
  scenarios: Scenario[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ playerStats, scenarios }) => {
  const getFinalMessage = () => {
    if (playerStats.integrity >= 80) {
      return {
        title: "Beacon of Integrity",
        description: "You navigated the challenges with remarkable integrity, showing that ethical leadership is possible even in difficult circumstances.",
        icon: <Award className="h-16 w-16 text-green-500" />,
        color: "text-green-500"
      };
    } else if (playerStats.integrity >= 60) {
      return {
        title: "Mostly Ethical Leader",
        description: "You tried to maintain your principles while being practical. Your leadership showed a commitment to ethics with a few compromises.",
        icon: <CheckCircle2 className="h-16 w-16 text-blue-500" />,
        color: "text-blue-500"
      };
    } else if (playerStats.integrity >= 40) {
      return {
        title: "Pragmatic Opportunist",
        description: "You balanced ethics and self-interest, making compromises when convenient. Your leadership was marked by pragmatism over principle.",
        icon: <Brain className="h-16 w-16 text-yellow-500" />,
        color: "text-yellow-500"
      };
    } else {
      return {
        title: "Corruption Enabler",
        description: "You frequently chose personal gain over ethical considerations, contributing to systemic corruption in your environment.",
        icon: <XCircle className="h-16 w-16 text-red-500" />,
        color: "text-red-500"
      };
    }
  };

  const finalMessage = getFinalMessage();

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <Card className="shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              {finalMessage.icon}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${finalMessage.color}`}>
              {finalMessage.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {finalMessage.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/30 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-primary">{playerStats.integrity}%</div>
              <div className="text-sm text-muted-foreground">Integrity</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-primary">{playerStats.money}%</div>
              <div className="text-sm text-muted-foreground">Wealth</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-primary">{playerStats.power}%</div>
              <div className="text-sm text-muted-foreground">Power</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-md text-center">
              <div className="text-3xl font-bold text-primary">{playerStats.reputation}%</div>
              <div className="text-sm text-muted-foreground">Reputation</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handleRestart} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Play Again</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="journey">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="journey" className="flex-1">
            <ReceiptText className="h-4 w-4 mr-2" />
            <span>Your Journey</span>
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex-1">
            <Brain className="h-4 w-4 mr-2" />
            <span>Lessons Learned</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex-1">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Resources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Decisions</h2>
              
              <div className="space-y-4">
                {playerStats.choices.map((choice, index) => {
                  const scenario = scenarios.find(s => s.id === choice.scenarioId);
                  const scenarioChoice = scenario?.choices.find(c => c.id === choice.choiceId);
                  
                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{scenario?.title}</h3>
                        <Badge variant={scenarioChoice?.outcomes.integrity && scenarioChoice.outcomes.integrity >= 0 ? "outline" : "destructive"} className="text-xs">
                          {scenarioChoice?.outcomes.integrity && scenarioChoice.outcomes.integrity >= 0 ? "Ethical" : "Questionable"}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{choice.text}</p>
                      <p className="text-xs text-muted-foreground italic">"{choice.outcome}"</p>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <span className={scenarioChoice?.outcomes.integrity && scenarioChoice.outcomes.integrity > 0 ? "text-green-500" : "text-red-500"}>
                            {scenarioChoice?.outcomes.integrity && scenarioChoice.outcomes.integrity > 0 ? "+" : ""}{scenarioChoice?.outcomes.integrity} Integrity
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className={scenarioChoice?.outcomes.money && scenarioChoice.outcomes.money > 0 ? "text-green-500" : "text-red-500"}>
                            {scenarioChoice?.outcomes.money && scenarioChoice.outcomes.money > 0 ? "+" : ""}{scenarioChoice?.outcomes.money} Wealth
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span>Key Insights About Corruption</span>
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-primary" />
                    <span>1. Corruption is a spectrum, not binary</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Corruption rarely happens overnight. It's often a series of small compromises that 
                    gradually normalize unethical behavior. Research shows this "slippery slope" effect 
                    makes it easier to rationalize increasingly corrupt behavior over time.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>2. Systemic vs. Individual corruption</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    While individuals make corrupt choices, systems and cultures can either enable or prevent 
                    corruption through incentives, accountability, and oversight. Countries with strong 
                    institutions, transparency, and rule of law consistently show lower corruption levels.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span>3. The rationalization process</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    People rarely see themselves as corrupt. Instead, they justify actions through 
                    excuses like "everyone does it," "it's just this once," or "it's for a greater good." 
                    This cognitive dissonance is a crucial part of how corruption perpetuates.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    <span>4. Economic and social costs</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Corruption has profound effects beyond the immediate parties involved, eroding trust, 
                    increasing inequality, and stunting development. The IMF estimates corruption reduces 
                    global GDP by 2% annually (approximately $2 trillion), with developing countries 
                    bearing the heaviest burden.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>5. Prevention strategies</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Effective anti-corruption efforts require a multi-faceted approach: strong legal frameworks, 
                    independent oversight bodies, whistleblower protections, transparent processes, and a 
                    culture that values integrity. Individual ethical leadership is also crucial for setting 
                    organizational tone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-corruption-primary" />
                <span>Further Learning</span>
              </h2>
              
              <div className="space-y-5 mt-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-1">Organizations Fighting Corruption</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Transparency International - Global coalition against corruption</li>
                    <li>U4 Anti-Corruption Resource Centre - Research and policy guidance</li>
                    <li>Global Anti-Corruption Consortium - Investigative journalism</li>
                    <li>OECD Anti-Corruption Division - International standards and monitoring</li>
                  </ul>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-1">Books on Corruption</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>"Corruption: What Everyone Needs to Know" by Ray Fisman and Miriam Golden</li>
                    <li>"Why Nations Fail" by Daron Acemoglu and James A. Robinson</li>
                    <li>"The Corruption Cure" by Robert Rotberg</li>
                    <li>"Thieves of State" by Sarah Chayes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Anti-Corruption Tools and Frameworks</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>UN Convention Against Corruption (UNCAC)</li>
                    <li>OECD Anti-Bribery Convention</li>
                    <li>Extractive Industries Transparency Initiative (EITI)</li>
                    <li>Open Government Partnership (OGP)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span>Action Steps</span>
                </h3>
                <p className="text-sm">
                  Combating corruption begins with individual actions. Consider how you can promote 
                  transparency and accountability in your own environment, whether at school, work, 
                  or in your community. Small actions like reporting unethical behavior, supporting 
                  anti-corruption initiatives, and making ethical choices yourself all contribute to 
                  building a culture of integrity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsScreen;
