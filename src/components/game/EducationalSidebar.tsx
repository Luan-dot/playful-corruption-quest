
import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  BookOpen,
  BrainCircuit,
  Globe,
  Bookmark,
  Download,
  Share2,
  MousePointerClick
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState<string>("concepts");
  const [savedConcepts, setSavedConcepts] = useState<string[]>([]);
  
  const toggleSavedConcept = (concept: string) => {
    if (savedConcepts.includes(concept)) {
      setSavedConcepts(savedConcepts.filter(c => c !== concept));
    } else {
      setSavedConcepts([...savedConcepts, concept]);
    }
  };
  
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-3 grid grid-cols-2">
            <TabsTrigger value="concepts" className="text-xs">
              <BrainCircuit className="h-3.5 w-3.5 mr-1" />
              <span>Concepts</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="text-xs">
              <Globe className="h-3.5 w-3.5 mr-1" />
              <span>Impact</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="concepts" className="mt-0">
            <div className="space-y-2">
              {scenario.keyConcepts.map((concept, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded-md flex justify-between items-center group">
                  <span>{concept}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 opacity-50 group-hover:opacity-100"
                    onClick={() => toggleSavedConcept(concept)}
                  >
                    <Bookmark 
                      className={`h-3.5 w-3.5 ${savedConcepts.includes(concept) ? "fill-yellow-400 text-yellow-400" : ""}`} 
                    />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-1">
                <MousePointerClick className="h-3 w-3" />
                <span>Click the bookmark icon to save concepts for later reference</span>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="impact" className="mt-0">
            <Card className="bg-muted/20 border-none">
              <CardContent className="p-3">
                <h4 className="text-xs font-medium mb-2 flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5 text-corruption-secondary" />
                  <span>Global Impact</span>
                </h4>
                <p className="text-xs text-muted-foreground">{scenario.globalImpact}</p>
                
                <div className="mt-3">
                  <h4 className="text-xs font-medium mb-1">Stakeholders Affected</h4>
                  <div className="flex flex-wrap gap-1">
                    {scenario.stakeholders.map((stakeholder, index) => (
                      <Badge key={index} variant="outline" className="text-[10px]">
                        {stakeholder}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-3 flex justify-between">
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                <Download className="h-3 w-3" />
                <span>Download</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
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
