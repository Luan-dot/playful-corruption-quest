
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleUser, Award, Milestone, TrendingUp, Pulse } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CharacterDevelopmentProps {
  integrity: number;
  reputation: number;
  completedScenarios: number;
}

const CharacterDevelopment: React.FC<CharacterDevelopmentProps> = ({
  integrity,
  reputation,
  completedScenarios
}) => {
  // Calculate character traits based on player stats
  const determineCharacterTitle = () => {
    if (integrity >= 80) return "Ethical Exemplar";
    if (integrity >= 60) return "Principled Professional";
    if (integrity >= 40) return "Pragmatic Player";
    if (integrity >= 20) return "Ethical Compromiser";
    return "Self-Interested Operator";
  };
  
  const determineCharacterTraits = () => {
    const traits = [];
    
    // Integrity-based traits
    if (integrity >= 75) traits.push("Principled Decision-Maker");
    if (integrity >= 60) traits.push("Transparent Communicator");
    if (integrity <= 30) traits.push("Ethical Flexibility");
    if (integrity <= 20) traits.push("Self-Interest Focus");
    
    // Reputation-based traits
    if (reputation >= 70) traits.push("Respected Leader");
    if (reputation >= 60) traits.push("Trusted Colleague");
    if (reputation <= 30) traits.push("Questionable Reputation");
    
    // Ensure we have at least 2 traits
    while (traits.length < 2) {
      traits.push("Developing Professional");
    }
    
    return traits.slice(0, 3); // Return max 3 traits
  };
  
  const title = determineCharacterTitle();
  const traits = determineCharacterTraits();
  
  // Character development milestones (would be more sophisticated in real implementation)
  const milestones = [
    { 
      completed: completedScenarios >= 1, 
      name: "First Ethical Crossroads" 
    },
    { 
      completed: integrity >= 60, 
      name: "Integrity Leadership" 
    },
    { 
      completed: reputation >= 60, 
      name: "Community Respect" 
    },
    { 
      completed: completedScenarios >= 3, 
      name: "Seasoned Decision-Maker" 
    },
    { 
      completed: integrity >= 80, 
      name: "Ethical Champion" 
    }
  ];
  
  const completedMilestones = milestones.filter(m => m.completed).length;
  const milestoneProgress = (completedMilestones / milestones.length) * 100;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <CircleUser className="h-5 w-5 text-corruption-primary" />
          <h3 className="font-medium">Your Character Development</h3>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <CircleUser className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-xs text-muted-foreground">Level {Math.floor(completedScenarios/2) + 1} Professional</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs">Character Growth</span>
              <span className="text-xs">{Math.round(milestoneProgress)}%</span>
            </div>
            <Progress value={milestoneProgress} className="h-2" />
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <span>Character Traits</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <Milestone className="h-4 w-4 text-corruption-secondary" />
            <span>Development Milestones</span>
          </h4>
          <div className="space-y-2 text-sm">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2">
                {milestone.completed ? (
                  <Award className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Pulse className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={milestone.completed ? "" : "text-muted-foreground"}>
                  {milestone.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterDevelopment;
