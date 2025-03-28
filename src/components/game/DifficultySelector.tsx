
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Layers,
  AlertTriangle,
  Clock,
  User,
  Users
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelect
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-corruption-primary" />
          <span>Choose Your Challenge Level</span>
        </h2>
        
        <RadioGroup 
          value={selectedDifficulty} 
          onValueChange={onSelect}
          className="space-y-3"
        >
          <div className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="beginner" id="beginner" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="beginner" className="font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <span>Beginner: Ethical Foundations</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Clear ethical dilemmas with more obvious consequences. Ideal for those new to anti-corruption concepts.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="intermediate" id="intermediate" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="intermediate" className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-500" />
                <span>Intermediate: Practical Integrity</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                More nuanced scenarios with complex stakeholder considerations. Balances ethical principles with practical realities.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="advanced" id="advanced" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="advanced" className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span>Advanced: Systemic Challenges</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Complex scenarios with subtle corruption pressures and systemic factors. Tests deep understanding of corruption mechanisms.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 p-3 rounded-md hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="expert" id="expert" className="mt-1" />
            <div className="grid gap-1.5">
              <Label htmlFor="expert" className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-corruption-primary" />
                <span>Expert: Global Perspectives</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Scenarios based on real global corruption cases with cultural and regional nuances. For experienced anti-corruption practitioners.
              </p>
            </div>
          </div>
        </RadioGroup>
        
        <div className="mt-4 text-xs flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>You can change difficulty settings anytime during your journey</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultySelector;
