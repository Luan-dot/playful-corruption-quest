import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scenario } from "@/data/scenarios";
import {
  PenLine,
  ArrowRight,
  Users,
  Clock,
  Building,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { consequenceManager } from "@/lib/consequences-system";

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
  onContinue,
}) => {
  const { title, setting, choices, image } = scenario;

  // Get any modifications for this scenario from the consequence system
  const scenarioModifications = consequenceManager.getScenarioModifications(
    scenario.id
  );

  // Apply modifications to the scenario description
  let modifiedDescription = scenario.description;
  let modifiedChoices = [...scenario.choices];

  // Apply each modification
  scenarioModifications.forEach((modification) => {
    if (modification.effect.scenarioModification) {
      const mod = modification.effect.scenarioModification;

      // Update description if provided
      if (mod.modifiedText) {
        modifiedDescription = mod.modifiedText;
      }

      // Update choice texts and outcomes if provided
      if (mod.modifiedChoices) {
        mod.modifiedChoices.forEach((choiceMod) => {
          const choiceIndex = modifiedChoices.findIndex(
            (c) => c.id === choiceMod.choiceId
          );
          if (choiceIndex >= 0) {
            modifiedChoices[choiceIndex] = {
              ...modifiedChoices[choiceIndex],
              text: choiceMod.newText || modifiedChoices[choiceIndex].text,
              outcomeText:
                choiceMod.newOutcome ||
                modifiedChoices[choiceIndex].outcomeText,
              outcomes: choiceMod.newEffects
                ? {
                    ...modifiedChoices[choiceIndex].outcomes,
                    ...choiceMod.newEffects,
                  }
                : modifiedChoices[choiceIndex].outcomes,
            };
          }
        });
      }

      // Add new choice if provided
      if (mod.additionalChoice) {
        modifiedChoices.push(mod.additionalChoice);
      }
    }
  });

  // Function to determine the icon for ethical rating
  const getEthicalIcon = (integrityImpact: number) => {
    if (integrityImpact > 10) return <CheckCircle2 className="h-4 w-4" />;
    if (integrityImpact > 0) return <CheckCircle2 className="h-4 w-4" />;
    if (integrityImpact > -10) return <AlertTriangle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-serif mb-2">{title}</h3>
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{setting.position}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{setting.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            <span>{setting.location}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4">{modifiedDescription}</p>
            <div className="italic text-sm border-l-2 border-black pl-3 py-1">
              "{setting.context}"
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {scenario.stakeholders.map((stakeholder, index) => (
                <Badge key={index} variant="outline" className="minimal-badge">
                  {stakeholder}
                </Badge>
              ))}
            </div>
          </div>
          {image && (
            <div className="hidden md:block">
              <div className="w-full h-36 rounded-none overflow-hidden border bg-muted">
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
            <PenLine className="h-4 w-4" />
            <h4 className="font-medium font-serif">What will you do?</h4>
          </div>

          {modifiedChoices.map((choice) => (
            <Card
              key={choice.id}
              className="corruption-card cursor-pointer hover:bg-muted/30 rounded-none border"
              onClick={() => onChoice(choice.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getEthicalIcon(choice.outcomes.integrity || 0)}
                  </div>
                  <div>
                    <p>{choice.text}</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      {choice.reasoning}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <Card className="rounded-none border">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 font-serif">Choice Made</h4>
              <p className="text-muted-foreground">
                You've made your decision. The consequences of your actions will
                follow you.
              </p>

              <div className="mt-4 p-3 border border-black text-sm">
                <p className="font-medium mb-1">Reflection:</p>
                <p>
                  Consider how your choice might affect different stakeholders.
                  What potential long-term consequences might arise from this
                  decision?
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="minimal" onClick={onContinue} className="gap-2">
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
