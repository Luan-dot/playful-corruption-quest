
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Info, Newspaper } from 'lucide-react';
import ScenarioCard from './ScenarioCard';
import NewsHeadlines from './NewsHeadlines';
import SocialComparison from './SocialComparison';
import { scenarios } from '@/data/scenarios';
import { newsItems } from '@/data/news';
import { Consequence } from '@/data/consequences';

interface MainContentProps {
  currentScenario: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showingSummary: boolean;
  onChoice: (choiceId: number) => void;
  onContinue: () => void;
  lastChoiceId: number | null;
  triggeredHeadlines: Consequence[];
}

const MainContent: React.FC<MainContentProps> = ({
  currentScenario,
  activeTab,
  setActiveTab,
  showingSummary,
  onChoice,
  onContinue,
  lastChoiceId,
  triggeredHeadlines
}) => {
  // Find a relevant news item for the current scenario
  const getRelevantNews = () => {
    return newsItems.find(item => item.relatedScenarioId === scenarios[currentScenario].id);
  };

  return (
    <Card className="shadow-sm overflow-hidden rounded-none border">
      {/* Display ripple effect headlines if there are any */}
      {triggeredHeadlines.length > 0 && <NewsHeadlines consequences={triggeredHeadlines} />}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-muted p-1 flex justify-between items-center border-b">
          <TabsList className="bg-transparent">
            <TabsTrigger value="scenario" className="data-[state=active]:bg-background">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Scenario</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="context" className="data-[state=active]:bg-background">
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Context</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-background">
              <div className="flex items-center gap-1">
                <Newspaper className="h-4 w-4" />
                <span>News</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <div className="pr-4">
            <Badge variant="outline" className="minimal-badge">
              Case {currentScenario + 1} of {scenarios.length}
            </Badge>
          </div>
        </div>
        
        <TabsContent value="scenario" className="p-0 m-0">
          <ScenarioCard 
            scenario={scenarios[currentScenario]} 
            onChoice={onChoice}
            showingSummary={showingSummary}
            onContinue={onContinue}
          />
          
          {/* Social Comparison - only show after making a choice */}
          {showingSummary && lastChoiceId && (
            <div className="px-6 pb-6">
              <SocialComparison 
                scenarioId={scenarios[currentScenario].id}
                playerChoice={lastChoiceId}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="context" className="p-6 m-0 min-h-[400px]">
          <ContextTab scenario={scenarios[currentScenario]} />
        </TabsContent>
        
        <TabsContent value="news" className="p-6 m-0 min-h-[400px]">
          <NewsTab relevantNews={getRelevantNews()} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

// Split into sub-components to make the main component cleaner
const ContextTab = ({ scenario }) => (
  <div className="p-6 border">
    <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
      <div className="h-5 w-5" />
      <span>Educational Context</span>
    </h3>
    <div className="prose max-w-none">
      <p className="mb-3">{scenario.context}</p>
      
      <div className="p-4 border mt-4">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <div className="h-4 w-4" />
          <span>Why This Matters</span>
        </h4>
        <p className="text-sm text-muted-foreground">{scenario.lesson}</p>
      </div>

      <div className="p-4 border mt-4">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <Info className="h-4 w-4" />
          <span>Real-World Example</span>
        </h4>
        <p className="text-sm text-muted-foreground">{scenario.realWorldExample}</p>
      </div>
      
      <div className="p-4 border border-black mt-4">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <div className="h-4 w-4" />
          <span>Corruption Ecosystem Analysis</span>
        </h4>
        <p className="text-sm text-muted-foreground">
          This type of corruption often involves networks of {scenario.stakeholders.join(", ")}. 
          The power dynamics between these stakeholders and the information asymmetries create conditions 
          where corruption can flourish if proper safeguards aren't in place.
        </p>
      </div>
    </div>
  </div>
);

const NewsTab = ({ relevantNews }) => (
  <>
    {relevantNews ? (
      <div className="p-6 border">
        <div className="border-b pb-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="minimal-badge">Breaking News</Badge>
            <span className="text-sm text-muted-foreground">{relevantNews.date}</span>
          </div>
          <h3 className="text-xl font-serif mb-1">{relevantNews.title}</h3>
          <p className="text-sm text-muted-foreground">Source: {relevantNews.source}</p>
        </div>
        
        <div className="prose max-w-none">
          <p className="mb-4 text-lg">{relevantNews.summary}</p>
          
          <div className="p-4 border">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <div className="h-4 w-4" />
              <span>How This Relates To Your Scenario</span>
            </h4>
            <p className="text-sm">
              This news story illustrates the real-world consequences of situations similar to the one you're facing.
              Consider how your decisions might have similar impacts if scaled to an organizational or systemic level.
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center py-12">
        <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">No Related News</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          There are no current news stories directly related to this scenario. Check back after exploring more cases.
        </p>
      </div>
    )}
  </>
);

export default MainContent;
