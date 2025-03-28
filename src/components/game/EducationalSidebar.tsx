
import React from 'react';
import { Scenario } from '@/data/scenarios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  BookOpen,
  BrainCircuit,
  Globe
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface EducationalSidebarProps {
  scenario: Scenario;
  showHint: boolean;
  toggleHint: () => void;
}

const EducationalSidebar: React.FC<EducationalSidebarProps> = ({
  scenario,
  showHint,
  toggleHint
}) => {
  return (
    <div className="space-y-4">
      <Collapsible open={showHint} onOpenChange={toggleHint}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            <span>{showHint ? "Hide Hint" : "Show Hint"}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-3 text-sm">
              <p className="text-yellow-800">{scenario.hint}</p>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
          <BrainCircuit className="h-4 w-4 text-corruption-primary" />
          <span>Key Concepts</span>
        </h4>
        <div className="space-y-2">
          {scenario.keyConcepts.map((concept, index) => (
            <div key={index} className="text-xs p-2 bg-muted rounded-md">
              {concept}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-corruption-secondary" />
          <span>Global Impact</span>
        </h4>
        <p className="text-xs text-muted-foreground">{scenario.globalImpact}</p>
      </div>

      <div className="text-xs text-center pt-2 border-t">
        <p className="text-muted-foreground">
          <BookOpen className="h-3 w-3 inline mr-1" />
          Learn more about ethical decision-making in our resources section
        </p>
      </div>
    </div>
  );
};

export default EducationalSidebar;
