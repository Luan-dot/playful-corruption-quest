
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  FileText, 
  Briefcase, 
  Phone, 
  Building, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface InvestigationMiniGameProps {
  onComplete: (score: number) => void;
}

interface EvidenceItem {
  id: string;
  type: 'document' | 'testimony' | 'financial' | 'communication';
  name: string;
  description: string;
  relevance: number; // 0-10 scale of how relevant the evidence is
  discovered: boolean;
}

interface InvestigationLead {
  id: string;
  name: string;
  description: string;
  timeRequired: number; // in game minutes
  evidenceIds: string[];
  followed: boolean;
}

const mockEvidence: EvidenceItem[] = [
  {
    id: "ev-1",
    type: "document",
    name: "Modified Inspection Report",
    description: "A safety inspection report with evidence of alterations to the compliance ratings.",
    relevance: 9,
    discovered: false
  },
  {
    id: "ev-2",
    type: "financial",
    name: "Unusual Consulting Payments",
    description: "Records showing large payments to a consulting company owned by a relative of the inspector.",
    relevance: 8,
    discovered: false
  },
  {
    id: "ev-3",
    type: "communication",
    name: "Email Exchange",
    description: "Emails between the developer and inspector discussing 'streamlining' the inspection process.",
    relevance: 10,
    discovered: false
  },
  {
    id: "ev-4",
    type: "testimony",
    name: "Contractor Statement",
    description: "Statement from a contractor who claims they were instructed to cover up structural issues before inspection.",
    relevance: 7,
    discovered: false
  },
  {
    id: "ev-5",
    type: "document",
    name: "Original Draft Report",
    description: "An earlier version of the inspection report showing multiple critical safety violations.",
    relevance: 9,
    discovered: false
  },
  {
    id: "ev-6",
    type: "financial",
    name: "Inspector's Financial Records",
    description: "Bank statements showing deposits that don't match the inspector's salary.",
    relevance: 6,
    discovered: false
  },
  {
    id: "ev-7",
    type: "communication",
    name: "Text Messages",
    description: "Text messages from the developer reminding the inspector about their 'arrangement'.",
    relevance: 8,
    discovered: false
  },
  {
    id: "ev-8",
    type: "testimony",
    name: "Former Employee Interview",
    description: "Interview with a former employee who left due to concerns about safety shortcuts.",
    relevance: 5,
    discovered: false
  },
  {
    id: "ev-9",
    type: "document",
    name: "Building Code Requirements",
    description: "Official building code documentation highlighting the violations not reported in the final inspection.",
    relevance: 4,
    discovered: false
  },
  {
    id: "ev-10",
    type: "financial",
    name: "Company Expense Reports",
    description: "Expense reports showing gifts and entertainment provided to various inspectors.",
    relevance: 7,
    discovered: false
  }
];

const mockLeads: InvestigationLead[] = [
  {
    id: "lead-1",
    name: "Review Inspection Documentation",
    description: "Examine all inspection reports and attached documentation for inconsistencies.",
    timeRequired: 30,
    evidenceIds: ["ev-1", "ev-5", "ev-9"],
    followed: false
  },
  {
    id: "lead-2",
    name: "Interview Site Contractors",
    description: "Speak with contractors who worked on the building about inspection procedures.",
    timeRequired: 45,
    evidenceIds: ["ev-4", "ev-8"],
    followed: false
  },
  {
    id: "lead-3",
    name: "Analyze Financial Records",
    description: "Review financial transactions between the developer, inspector, and related entities.",
    timeRequired: 60,
    evidenceIds: ["ev-2", "ev-6", "ev-10"],
    followed: false
  },
  {
    id: "lead-4",
    name: "Retrieve Communication Records",
    description: "Obtain emails, text messages, and other communications between key parties.",
    timeRequired: 40,
    evidenceIds: ["ev-3", "ev-7"],
    followed: false
  }
];

const InvestigationMiniGame: React.FC<InvestigationMiniGameProps> = ({ onComplete }) => {
  const [gameTime, setGameTime] = useState(180); // 3 hours in game minutes
  const [remainingTime, setRemainingTime] = useState(180);
  const [evidence, setEvidence] = useState(mockEvidence);
  const [leads, setLeads] = useState(mockLeads);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [activityProgress, setActivityProgress] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  
  // Calculate score based on evidence discovered
  const calculateScore = () => {
    const discoveredEvidence = evidence.filter(item => item.discovered);
    const totalRelevance = discoveredEvidence.reduce((sum, item) => sum + item.relevance, 0);
    const maxPossibleRelevance = evidence.reduce((sum, item) => sum + item.relevance, 0);
    
    return Math.round((totalRelevance / maxPossibleRelevance) * 100);
  };
  
  // Follow a lead
  const followLead = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead || lead.followed || remainingTime < lead.timeRequired) return;
    
    setCurrentActivity(lead.id);
    setActivityProgress(0);
  };
  
  // Handle the completion of an activity
  useEffect(() => {
    if (!currentActivity) return;
    
    const lead = leads.find(l => l.id === currentActivity);
    if (!lead) return;
    
    const timer = setInterval(() => {
      setActivityProgress(prev => {
        const newProgress = prev + 1;
        
        if (newProgress >= 100) {
          clearInterval(timer);
          
          // Mark lead as followed
          setLeads(prev => prev.map(l => 
            l.id === currentActivity ? { ...l, followed: true } : l
          ));
          
          // Discover evidence
          setEvidence(prev => prev.map(e => 
            lead.evidenceIds.includes(e.id) ? { ...e, discovered: true } : e
          ));
          
          // Add tip based on lead
          const newTip = getTipForLead(lead.id);
          if (newTip) {
            setTips(prev => [...prev, newTip]);
          }
          
          // Reduce remaining time
          setRemainingTime(prev => prev - lead.timeRequired);
          
          // Clear current activity
          setCurrentActivity(null);
          
          return 0;
        }
        
        return newProgress;
      });
    }, 50); // Faster for gameplay purposes
    
    return () => clearInterval(timer);
  }, [currentActivity]);
  
  // Check for game end
  useEffect(() => {
    if (remainingTime <= 0 || leads.every(l => l.followed)) {
      setGameComplete(true);
    }
  }, [remainingTime, leads]);
  
  // Get investigative tip based on lead
  const getTipForLead = (leadId: string) => {
    switch(leadId) {
      case "lead-1":
        return "Compare document versions to identify deliberate changes in safety assessments.";
      case "lead-2":
        return "Cross-reference testimonies to establish patterns of safety violations.";
      case "lead-3":
        return "Look for financial transactions that coincide with inspection dates.";
      case "lead-4":
        return "Analyze communication timing and language for evidence of collusion.";
      default:
        return "";
    }
  };
  
  const getEvidenceTypeIcon = (type: string) => {
    switch(type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "testimony":
        return <Users className="h-4 w-4 text-green-500" />;
      case "financial":
        return <Briefcase className="h-4 w-4 text-yellow-500" />;
      case "communication":
        return <Phone className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Search className="h-6 w-6 text-corruption-primary" />
            <span>Corruption Investigation Simulation</span>
          </h2>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-corruption-secondary" />
            <span className="font-medium">
              Time Remaining: {Math.floor(remainingTime / 60)}h {remainingTime % 60}m
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <Progress value={(remainingTime / gameTime) * 100} className="h-2" />
        </div>
        
        {!gameComplete ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                <Building className="h-5 w-5 text-corruption-primary" />
                <span>Investigation Leads</span>
              </h3>
              
              <div className="space-y-3">
                {leads.map((lead) => (
                  <Card 
                    key={lead.id} 
                    className={`${lead.followed ? 'bg-muted/20' : 'hover:bg-muted/10 cursor-pointer'} ${currentActivity === lead.id ? 'border-primary' : ''}`}
                    onClick={() => !lead.followed && !currentActivity && followLead(lead.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-medium ${lead.followed ? 'text-muted-foreground' : ''}`}>
                          {lead.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {lead.timeRequired}m
                        </Badge>
                      </div>
                      <p className={`text-xs ${lead.followed ? 'text-muted-foreground' : ''}`}>
                        {lead.description}
                      </p>
                      
                      {currentActivity === lead.id && (
                        <div className="mt-2">
                          <Progress value={activityProgress} className="h-1.5" />
                          <p className="text-xs text-center mt-1">Investigating...</p>
                        </div>
                      )}
                      
                      {lead.followed && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Completed</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {tips.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span>Investigative Insights</span>
                  </h4>
                  <ul className="space-y-1">
                    {tips.map((tip, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-yellow-500 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-corruption-secondary" />
                <span>Evidence Collected</span>
                <Badge variant="outline" className="ml-2">
                  {evidence.filter(e => e.discovered).length}/{evidence.length}
                </Badge>
              </h3>
              
              <div className="space-y-2">
                {evidence.filter(e => e.discovered).map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        {getEvidenceTypeIcon(item.type)}
                        <div>
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {evidence.filter(e => e.discovered).length === 0 && (
                  <div className="text-center py-6 bg-muted/10 rounded-md">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No evidence collected yet. Follow leads to discover evidence.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Investigation Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You've completed your investigation and gathered evidence of corruption.
            </p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Investigation Score</span>
                <span className="text-sm font-medium">{calculateScore()}%</span>
              </div>
              <Progress value={calculateScore()} className="h-2 mb-1" />
              
              <p className="text-xs text-muted-foreground text-center">
                {calculateScore() >= 70 
                  ? "Excellent work! Your thorough investigation uncovered key evidence."
                  : calculateScore() >= 40
                    ? "Good investigation, though some important evidence was missed."
                    : "Limited evidence was found. The corruption may continue undetected."
                }
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Key Evidence Discovered</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {evidence
                  .filter(e => e.discovered && e.relevance >= 7)
                  .map((item) => (
                    <Badge key={item.id} className="text-xs">
                      {item.name}
                    </Badge>
                  ))
                }
              </div>
            </div>
            
            <Button onClick={() => onComplete(calculateScore())} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Submit Investigation Findings</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestigationMiniGame;
