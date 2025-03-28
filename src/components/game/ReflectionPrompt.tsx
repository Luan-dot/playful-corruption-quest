
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PenLine, CheckCircle2, Brain } from 'lucide-react';

interface ReflectionPromptProps {
  scenarioId: number;
  onComplete: () => void;
}

const reflectionQuestions = {
  1: [
    "How do personal relationships influence professional decision-making?",
    "What long-term consequences might favoritism in contracting have on public trust?",
    "How would you design a procurement system that minimizes corruption risks?"
  ],
  2: [
    "What pressures might make a safety inspector vulnerable to corruption?",
    "How do small ethical compromises potentially lead to larger ones over time?",
    "Who bears the ultimate cost when safety regulations are ignored?"
  ],
  3: [
    "How does corruption in education perpetuate inequality?",
    "What message does preferential treatment send to other students?",
    "How can educational institutions balance fundraising needs with merit-based principles?"
  ],
  4: [
    "Why is healthcare particularly vulnerable to corruption?",
    "How might corrupt medical supply procurement directly impact patient outcomes?",
    "What systems could prevent kickbacks while still allowing efficient procurement?"
  ],
  5: [
    "How does the pressure for short-term business goals affect environmental compliance?",
    "Who are the stakeholders affected by environmental data falsification?",
    "What role does transparency play in preventing this type of corruption?"
  ]
};

const ReflectionPrompt: React.FC<ReflectionPromptProps> = ({ scenarioId, onComplete }) => {
  const [reflection, setReflection] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  
  const questions = reflectionQuestions[scenarioId as keyof typeof reflectionQuestions] || [];
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  
  const handleSubmit = () => {
    if (reflection.trim().length > 0) {
      setIsCompleted(true);
      // In a real implementation, this would save the reflection to a database
      setTimeout(onComplete, 1500);
    }
  };
  
  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-corruption-secondary" />
          <h3 className="font-medium">Reflection Moment</h3>
        </div>
        
        {!isCompleted ? (
          <>
            <p className="text-sm mb-3">{randomQuestion}</p>
            <Textarea
              placeholder="Take a moment to reflect on this question..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-24 mb-3"
            />
            <Button onClick={handleSubmit} className="w-full gap-2">
              <PenLine className="h-4 w-4" />
              <span>Submit Reflection</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Your reflections are private and help deepen your understanding
            </p>
          </>
        ) : (
          <div className="text-center py-2">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm">Reflection recorded!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReflectionPrompt;
