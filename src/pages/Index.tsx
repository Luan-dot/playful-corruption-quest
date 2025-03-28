
import { useState } from "react";
import GameContainer from "@/components/game/GameContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertTriangle, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Shield, 
  Globe, 
  Users, 
  FileText, 
  Layers, 
  Network, 
  Lightbulb, 
  GraduationCap 
} from 'lucide-react';
import DifficultySelector from "@/components/game/DifficultySelector";
import ResourceLibrary from "@/components/game/ResourceLibrary";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [difficulty, setDifficulty] = useState("intermediate");

  if (showLibrary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-corruption-primary">Resource Library</h1>
            <Button variant="outline" onClick={() => setShowLibrary(false)}>
              Return to Game
            </Button>
          </div>
          
          <ResourceLibrary />
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pt-12 pb-24 flex flex-col items-center justify-center">
        <div className="container max-w-4xl px-4 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-corruption-primary">Corruption Conundrum</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              An immersive educational journey through ethical dilemmas and the complexity of corruption
            </p>
          </div>

          <Card className="mb-8 overflow-hidden">
            <div className="bg-corruption-primary/10 p-6 border-b">
              <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-6 w-6 text-corruption-primary" />
                <span>About This Experience</span>
              </h2>
              <p className="text-muted-foreground">
                This interactive simulation places you in realistic scenarios where corruption and ethical dilemmas arise. 
                Your decisions will shape your career, influence others, and reveal insights about how corruption operates 
                in different contexts.
              </p>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Educational Purpose</h3>
                      <p className="text-sm text-muted-foreground">Learn about the mechanics of corruption, its impacts, and how ethical decisions can make a difference.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <Brain className="h-5 w-5 text-corruption-secondary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Realistic Scenarios</h3>
                      <p className="text-sm text-muted-foreground">Based on real-world situations and research on how corruption manifests in different sectors.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Network className="h-5 w-5 text-corruption-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Branching Narratives</h3>
                      <p className="text-sm text-muted-foreground">Your early decisions affect later scenarios, creating a personalized corruption education experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <Globe className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Global Perspectives</h3>
                      <p className="text-sm text-muted-foreground">Explore corruption mechanisms across different cultural and economic contexts.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Interactive Learning</h3>
                      <p className="text-sm text-muted-foreground">Engage with mini-games, corruption vulnerability assessments, and simulation activities.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">No Right Answers</h3>
                      <p className="text-sm text-muted-foreground">Face complex decisions with competing values and stakeholders, just like in real life.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-muted rounded-md bg-muted/10 mb-6">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-corruption-primary" />
                  <span>New Features</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-2 bg-background rounded text-center text-sm">
                    <Users className="h-4 w-4 mx-auto mb-1 text-corruption-secondary" />
                    <span>Social Comparison</span>
                  </div>
                  <div className="p-2 bg-background rounded text-center text-sm">
                    <Brain className="h-4 w-4 mx-auto mb-1 text-corruption-secondary" />
                    <span>Reflection Prompts</span>
                  </div>
                  <div className="p-2 bg-background rounded text-center text-sm">
                    <FileText className="h-4 w-4 mx-auto mb-1 text-corruption-secondary" />
                    <span>Real-World News</span>
                  </div>
                  <div className="p-2 bg-background rounded text-center text-sm">
                    <Layers className="h-4 w-4 mx-auto mb-1 text-corruption-secondary" />
                    <span>Difficulty Levels</span>
                  </div>
                </div>
              </div>
              
              <DifficultySelector 
                selectedDifficulty={difficulty} 
                onSelect={setDifficulty} 
              />
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => setGameStarted(true)} className="px-8">
                  Begin Your Journey
                </Button>
                <Button variant="outline" size="lg" onClick={() => setShowLibrary(true)} className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Explore Resource Library</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Developed as an educational tool to raise awareness about corruption and promote integrity.
              <br />
              Based on research from Transparency International, the World Bank, and anti-corruption experts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-12">
      <GameContainer difficulty={difficulty} onOpenLibrary={() => setShowLibrary(true)} />
    </div>
  );
};

export default Index;
