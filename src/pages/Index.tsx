
import { useState } from "react";
import GameContainer from "@/components/game/GameContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Brain, CheckCircle2, Shield } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pt-12 pb-24 flex flex-col items-center justify-center">
        <div className="container max-w-4xl px-4 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-corruption-primary">Corruption Conundrum</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              An educational journey through ethical dilemmas and the complexity of corruption
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <BookOpen className="h-5 w-5 text-corruption-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Learning Experience</h3>
                      <p className="text-sm text-muted-foreground">Discover the systemic nature of corruption and the importance of ethical leadership.</p>
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
              
              <div className="mt-8 text-center">
                <Button size="lg" onClick={() => setGameStarted(true)} className="px-8">
                  Begin Your Journey
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
      <GameContainer />
    </div>
  );
};

export default Index;
