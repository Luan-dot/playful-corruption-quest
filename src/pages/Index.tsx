
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
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-serif">Resource Library</h1>
            <Button variant="minimal" onClick={() => setShowLibrary(false)}>
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
      <div className="min-h-screen bg-background pt-12 pb-24 flex flex-col items-center justify-center">
        <div className="container max-w-3xl px-4 animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif mb-4">Political Integrity</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
              A game about leadership, ethics, and human nature
            </p>
          </div>

          <Card className="mb-8 overflow-hidden border rounded-none shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-serif mb-6">
                You've just been elected as the leader of a government plagued by corruption. 
                Your mission is to navigate complex ethical dilemmas while balancing integrity, 
                popularity, and systemic corruption.
              </h2>
            </div>
            <CardContent className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-serif mb-4">How to Play</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>Each turn, you'll face a political dilemma with no clear "right" answer</li>
                  <li>Your choices reveal your leadership style and ethical framework</li>
                  <li>The game tracks your decisions to create a psychological profile</li>
                  <li>Learn about real-world corruption dynamics and psychological insights</li>
                  <li>Your term lasts 10 turns - each decision shapes your legacy</li>
                </ul>
              </div>
              
              <div className="p-6 border border-black mb-8 bg-white">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">Important Note</h3>
                    <p className="text-muted-foreground">
                      This game is designed to reveal your natural decision-making tendencies. 
                      There are no "correct" answers - only different approaches to complex problems.
                    </p>
                  </div>
                </div>
              </div>
              
              <DifficultySelector 
                selectedDifficulty={difficulty} 
                onSelect={setDifficulty} 
              />
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button variant="minimal" size="lg" onClick={() => setGameStarted(true)} className="px-8">
                  Start Your Term
                </Button>
                <Button variant="outline" size="lg" onClick={() => setShowLibrary(true)} className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Learn More</span>
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
    <div className="min-h-screen bg-background pb-12">
      <GameContainer difficulty={difficulty} onOpenLibrary={() => setShowLibrary(true)} />
    </div>
  );
};

export default Index;
