
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  CircleUser, 
  Globe 
} from 'lucide-react';

interface SocialComparisonProps {
  scenarioId: number;
  playerChoice: number;
}

// Mock data representing how other players responded
const mockPlayerData = {
  1: { // Scenario 1
    totalPlayers: 1254,
    choices: [
      { id: 1, percentage: 42, description: "Maintained transparency" },
      { id: 2, percentage: 31, description: "Kept options open" },
      { id: 3, percentage: 27, description: "Favored friend's company" }
    ]
  },
  2: { // Scenario 2
    totalPlayers: 987,
    choices: [
      { id: 1, percentage: 56, description: "Conducted thorough inspection" },
      { id: 2, percentage: 29, description: "Partial inspection with bribe" },
      { id: 3, percentage: 15, description: "Minimal inspection" }
    ]
  },
  3: { // Scenario 3
    totalPlayers: 1102,
    choices: [
      { id: 1, percentage: 38, description: "Maintained admission standards" },
      { id: 2, percentage: 45, description: "Compromise solution" },
      { id: 3, percentage: 17, description: "Accepted donation unconditionally" }
    ]
  },
  4: { // Scenario 4
    totalPlayers: 876,
    choices: [
      { id: 1, percentage: 61, description: "Reported bribery attempt" },
      { id: 2, percentage: 24, description: "Declined without reporting" },
      { id: 3, percentage: 15, description: "Accepted kickback" }
    ]
  },
  5: { // Scenario 5
    totalPlayers: 932,
    choices: [
      { id: 1, percentage: 47, description: "Refused to alter report" },
      { id: 2, percentage: 42, description: "Partial fix solution" },
      { id: 3, percentage: 11, description: "Adjusted numbers" }
    ]
  }
};

const SocialComparison: React.FC<SocialComparisonProps> = ({ scenarioId, playerChoice }) => {
  const data = mockPlayerData[scenarioId as keyof typeof mockPlayerData];
  
  if (!data) return null;

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <span>How Others Responded</span>
          <Badge variant="outline" className="ml-auto text-xs">
            {data.totalPlayers.toLocaleString()} players
          </Badge>
        </h3>
        
        <div className="space-y-3">
          {data.choices.map((choice) => (
            <div key={choice.id} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className={playerChoice === choice.id ? "font-medium" : ""}>
                  {choice.description}
                  {playerChoice === choice.id && (
                    <span className="ml-1 text-primary">(Your choice)</span>
                  )}
                </span>
                <span>{choice.percentage}%</span>
              </div>
              <Progress 
                value={choice.percentage} 
                className={`h-2 ${playerChoice === choice.id ? "bg-primary/20" : ""}`}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
          <Globe className="h-3 w-3" />
          <span>Community data updated daily</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialComparison;
