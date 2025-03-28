
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scenario } from '@/data/scenarios';
import { PenLine, ArrowRight, Users, Clock } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onChoice: (choiceId: number) => void;
  showingSummary: boolean;
  onContinue: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onChoice,
  showingSummary,
  onContinue
}) => {
  const { title, description, setting, choices, image } = scenario;

  // Function to determine the gradient colors for each choice
  const getChoiceGradient = (integrityImpact: number) => {
    if (integrityImpact > 0) return "from-green-500 to-blue-500";
    if (integrityImpact < 0) return "from-red-500 to-orange-500";
    return "from-gray-500 to-blue-500";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{setting.position}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{setting.year}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4">{description}</p>
            <p className="italic text-sm border-l-2 border-primary pl-3 py-1 bg-primary/5">
              "{setting.context}"
            </p>
          </div>
          {image && (
            <div className="hidden md:block">
              <div className="w-full h-36 rounded-md overflow-hidden bg-muted">
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  [Scenario Image]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {!showingSummary ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <PenLine className="h-4 w-4 text-corruption-primary" />
            <h4 className="font-semibold">What will you do?</h4>
          </div>
          
          {choices.map((choice) => (
            <Card 
              key={choice.id}
              className={`corruption-card cursor-pointer hover:bg-muted/30 from-${getChoiceGradient(choice.outcomes.integrity || 0)}`}
              onClick={() => onChoice(choice.id)}
            >
              <CardContent className="p-4">
                <p>{choice.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <Card className="bg-muted/20">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Choice Made</h4>
              <p className="text-muted-foreground">
                You've made your decision. The consequences of your actions will follow you.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={onContinue} className="gap-2">
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioCard;
