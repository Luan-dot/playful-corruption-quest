
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleUser, MessageSquare, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DialogueOption {
  id: string;
  text: string;
  relationship: 'professional' | 'friendly' | 'confrontational' | 'evasive';
  nextNodeId: string;
  effect?: {
    reputation?: number;
    suspicion?: number;
    trust?: number;
  };
}

interface DialogueNode {
  id: string;
  character: {
    name: string;
    position: string;
    image?: string;
  };
  text: string;
  options: DialogueOption[];
  isEnding?: boolean;
}

interface DialogueTree {
  initialNodeId: string;
  nodes: Record<string, DialogueNode>;
}

// This is a mockup of a branching dialogue tree for a corruption-related conversation
const mockDialogueTree: DialogueTree = {
  initialNodeId: "start",
  nodes: {
    "start": {
      id: "start",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Thanks for meeting me privately. I wanted to discuss the upcoming contract award. You know how important this infrastructure project is to the city.",
      options: [
        {
          id: "a1",
          text: "Yes, it's a critical project. We need to ensure we follow all proper procedures.",
          relationship: "professional",
          nextNodeId: "professional_response",
          effect: {
            trust: 5,
            suspicion: 0
          }
        },
        {
          id: "a2",
          text: "Of course, I'm always happy to discuss our projects. How can I help?",
          relationship: "friendly",
          nextNodeId: "friendly_response",
          effect: {
            trust: 10,
            suspicion: 0
          }
        },
        {
          id: "a3",
          text: "Why did you want to meet privately? Shouldn't we discuss this in the official committee meeting?",
          relationship: "confrontational",
          nextNodeId: "confrontational_response",
          effect: {
            trust: -10,
            suspicion: 10
          }
        }
      ]
    },
    "professional_response": {
      id: "professional_response",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Of course, procedures are important. But sometimes they can be... flexible. The mayor is very keen to show progress on this project before the election.",
      options: [
        {
          id: "b1",
          text: "I understand the pressures, but our responsibility is to follow the established process, regardless of the timeline.",
          relationship: "professional",
          nextNodeId: "maintain_professional",
          effect: {
            trust: -5,
            suspicion: 5
          }
        },
        {
          id: "b2",
          text: "What do you mean by 'flexible'? I want to help, but we need to be careful.",
          relationship: "evasive",
          nextNodeId: "probe_flexible",
          effect: {
            trust: 5,
            suspicion: 5
          }
        }
      ]
    },
    "friendly_response": {
      id: "friendly_response",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I knew I could count on you. Look, I'll be direct - BuildCorp has submitted a solid proposal. They've also indicated their willingness to support the mayor's foundation. It would be good for everyone if they won the contract.",
      options: [
        {
          id: "c1",
          text: "That sounds like a conflict of interest. The contract should be awarded based on merit alone.",
          relationship: "confrontational",
          nextNodeId: "reject_suggestion",
          effect: {
            trust: -15,
            suspicion: 15
          }
        },
        {
          id: "c2",
          text: "I see. And how exactly would we ensure BuildCorp wins while maintaining appearances?",
          relationship: "evasive",
          nextNodeId: "explore_corruption",
          effect: {
            trust: 15,
            suspicion: 20
          }
        }
      ]
    },
    "confrontational_response": {
      id: "confrontational_response",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "There's no need to be defensive. Some matters are better discussed quietly first. But if you'd prefer to keep everything strictly official, that's your choice.",
      options: [
        {
          id: "d1",
          text: "I prefer transparency in all procurement matters. Let's continue this in the committee.",
          relationship: "professional",
          nextNodeId: "end_conversation",
          effect: {
            trust: -20,
            suspicion: -5,
            reputation: 10
          }
        },
        {
          id: "d2",
          text: "I'm not being defensive, just careful. What did you want to discuss?",
          relationship: "evasive",
          nextNodeId: "cautious_continue",
          effect: {
            trust: 5,
            suspicion: 10
          }
        }
      ]
    },
    "maintain_professional": {
      id: "maintain_professional",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I respect your position, though I think you're being unnecessarily rigid. The mayor won't be pleased, but we'll proceed through official channels. I hope this doesn't affect our working relationship.",
      options: [
        {
          id: "e1",
          text: "Our working relationship is built on integrity. I'm confident we'll continue to work well together within proper guidelines.",
          relationship: "professional",
          nextNodeId: "principled_ending",
          effect: {
            reputation: 15,
            suspicion: -5
          }
        }
      ],
      isEnding: true
    },
    "probe_flexible": {
      id: "probe_flexible",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Let's be practical. We could emphasize certain evaluation criteria that favor BuildCorp's proposal. Nothing improper - just ensuring the right company wins. They've been very supportive of city initiatives.",
      options: [
        {
          id: "f1",
          text: "That would be manipulating the process. I can't be part of that.",
          relationship: "confrontational",
          nextNodeId: "reject_manipulation",
          effect: {
            trust: -20,
            suspicion: 10,
            reputation: 10
          }
        },
        {
          id: "f2",
          text: "I understand the importance of supporting our initiatives. What specific criteria did you have in mind?",
          relationship: "evasive",
          nextNodeId: "compromise_corruption",
          effect: {
            trust: 15,
            suspicion: 15
          }
        }
      ]
    },
    "reject_suggestion": {
      id: "reject_suggestion",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I'm disappointed. I thought you understood how things work in this city. This isn't corruption - it's pragmatic governance. But I see you're not a team player.",
      options: [
        {
          id: "g1",
          text: "Being a team player doesn't mean compromising ethics. I'll be documenting this conversation.",
          relationship: "confrontational",
          nextNodeId: "whistleblower_route",
          effect: {
            trust: -30,
            reputation: 20
          }
        },
        {
          id: "g2",
          text: "I am a team player, but I have concerns about this approach. Perhaps there's a middle ground?",
          relationship: "evasive",
          nextNodeId: "attempt_compromise",
          effect: {
            trust: 5,
            suspicion: 5
          }
        }
      ]
    },
    "explore_corruption": {
      id: "explore_corruption",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I knew you'd understand. It's simple - we adjust the technical evaluation criteria to emphasize BuildCorp's strengths. I can show you exactly what needs to be changed. And of course, your cooperation won't go unnoticed.",
      options: [
        {
          id: "h1",
          text: "Are you suggesting a personal benefit for me? That crosses a line.",
          relationship: "confrontational",
          nextNodeId: "late_rejection",
          effect: {
            trust: -25,
            suspicion: 15
          }
        },
        {
          id: "h2",
          text: "I'm interested in learning more about this arrangement. What's in it for me specifically?",
          relationship: "friendly",
          nextNodeId: "corrupt_agreement",
          effect: {
            trust: 20,
            suspicion: 25,
            reputation: -20
          }
        }
      ]
    },
    "principled_ending": {
      id: "principled_ending",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Very well. We'll proceed by the book. Just remember that opportunities for advancement often come to those who understand the unwritten rules.",
      options: [],
      isEnding: true
    },
    "reject_manipulation": {
      id: "reject_manipulation",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I see. Well, I misjudged you. Let's pretend this conversation never happened. I hope you'll be discreet.",
      options: [
        {
          id: "i1",
          text: "I'll be discreet, but I won't participate in any improper influence on the process.",
          relationship: "professional",
          nextNodeId: "ethical_stand",
          effect: {
            reputation: 15
          }
        }
      ],
      isEnding: true
    },
    "compromise_corruption": {
      id: "compromise_corruption",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I knew we could work together. Here's what we'll do - emphasize local employment impact, which BuildCorp scores highly on. Downplay the cost efficiency metrics. I'll handle the committee. And don't worry, your help will be remembered when the deputy director position opens up.",
      options: [
        {
          id: "j1",
          text: "I understand. I'll make those adjustments to the evaluation framework.",
          relationship: "friendly",
          nextNodeId: "corruption_path",
          effect: {
            trust: 30,
            suspicion: 30,
            reputation: -30
          }
        }
      ],
      isEnding: true
    },
    "whistleblower_route": {
      id: "whistleblower_route",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "That would be a serious mistake. You have no proof, and accusations damage reputations - including yours. Think carefully about your future in this organization.",
      options: [
        {
          id: "k1",
          text: "I'm willing to accept the consequences of upholding integrity in public service.",
          relationship: "professional",
          nextNodeId: "integrity_victory",
          effect: {
            reputation: 30,
            trust: -40
          }
        }
      ],
      isEnding: true
    },
    "attempt_compromise": {
      id: "attempt_compromise",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "The middle ground is what I'm offering. We're not falsifying documents - just emphasizing certain evaluation criteria. Everyone does this. It's how projects get completed in this city.",
      options: [
        {
          id: "l1",
          text: "Even subtle manipulation undermines the integrity of the process. I can't support that.",
          relationship: "professional",
          nextNodeId: "final_rejection",
          effect: {
            trust: -15,
            reputation: 15
          }
        },
        {
          id: "l2",
          text: "I see your point. As long as we're just emphasizing legitimate factors, perhaps that's reasonable.",
          relationship: "friendly",
          nextNodeId: "minor_corruption",
          effect: {
            trust: 20,
            suspicion: 15,
            reputation: -10
          }
        }
      ]
    },
    "end_conversation": {
      id: "end_conversation",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "As you wish. We'll discuss everything through official channels then. Good day.",
      options: [],
      isEnding: true
    },
    "late_rejection": {
      id: "late_rejection",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "You misunderstand. I'm talking about recognition within the department, not anything improper. But clearly you're not comfortable with how things work here. Let's end this discussion.",
      options: [],
      isEnding: true
    },
    "corrupt_agreement": {
      id: "corrupt_agreement",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "BuildCorp is establishing a consulting division. They'll need experts familiar with city procurement. The position would start after you leave government service, of course. Very generous compensation package.",
      options: [
        {
          id: "m1",
          text: "I understand completely. Send me the details on the evaluation criteria changes, and I'll take care of it.",
          relationship: "friendly",
          nextNodeId: "full_corruption",
          effect: {
            trust: 40,
            suspicion: 40,
            reputation: -40
          }
        }
      ],
      isEnding: true
    },
    "ethical_stand": {
      id: "ethical_stand",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Fair enough. I respect your position, even if I don't agree with it. Good day.",
      options: [],
      isEnding: true
    },
    "corruption_path": {
      id: "corruption_path",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Excellent. I'll let the relevant parties know they can count on your support. This is the beginning of a productive relationship.",
      options: [],
      isEnding: true
    },
    "integrity_victory": {
      id: "integrity_victory",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "You're making a mistake. But it's your career. This conversation is over.",
      options: [],
      isEnding: true
    },
    "final_rejection": {
      id: "final_rejection",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Your principles will make your career path more difficult. But that's your choice to make. We'll proceed through normal channels.",
      options: [],
      isEnding: true
    },
    "minor_corruption": {
      id: "minor_corruption",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I'm glad you understand. Here's what we'll adjust in the scoring matrix. Nothing dramatic - just enough to ensure the right outcome. I appreciate your cooperation.",
      options: [],
      isEnding: true
    },
    "full_corruption": {
      id: "full_corruption",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "Perfect. You'll receive the documents tomorrow. I knew you were someone who understands how things really work. This will benefit us both significantly.",
      options: [],
      isEnding: true
    },
    "cautious_continue": {
      id: "cautious_continue",
      character: {
        name: "Director Williams",
        position: "Head of Procurement",
        image: undefined
      },
      text: "I wanted to discuss ways to expedite the BuildCorp contract approval. They've been very supportive of the mayor's initiatives, and we'd like to return the favor.",
      options: [
        {
          id: "n1",
          text: "I can only expedite within the bounds of proper procedure. Everyone must be evaluated equally.",
          relationship: "professional",
          nextNodeId: "maintain_professional",
          effect: {
            trust: -5,
            suspicion: 5
          }
        },
        {
          id: "n2",
          text: "What kind of expedition did you have in mind exactly?",
          relationship: "evasive",
          nextNodeId: "probe_flexible",
          effect: {
            trust: 5,
            suspicion: 10
          }
        }
      ]
    }
  }
};

interface BranchingNarrativeProps {
  onComplete: (stats: {
    reputation: number;
    trust: number;
    suspicion: number;
    path: string;
  }) => void;
}

const BranchingNarrative: React.FC<BranchingNarrativeProps> = ({ onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState(mockDialogueTree.initialNodeId);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [playerStats, setPlayerStats] = useState({
    reputation: 0,
    trust: 0,
    suspicion: 0
  });
  const [dialogueComplete, setDialogueComplete] = useState(false);
  
  const currentNode = mockDialogueTree.nodes[currentNodeId];
  
  const handleSelectOption = (option: DialogueOption) => {
    // Add current exchange to history
    setConversationHistory(prev => [
      ...prev,
      `${currentNode.character.name}: ${currentNode.text}`,
      `You: ${option.text}`
    ]);
    
    // Update player stats
    if (option.effect) {
      setPlayerStats(prev => ({
        reputation: prev.reputation + (option.effect?.reputation || 0),
        trust: prev.trust + (option.effect?.trust || 0),
        suspicion: prev.suspicion + (option.effect?.suspicion || 0)
      }));
    }
    
    // Move to next node
    const nextNode = mockDialogueTree.nodes[option.nextNodeId];
    setCurrentNodeId(option.nextNodeId);
    
    // Check if this is an ending
    if (nextNode.isEnding) {
      // Add final response to history
      setConversationHistory(prev => [
        ...prev,
        `${nextNode.character.name}: ${nextNode.text}`
      ]);
      
      // Mark dialogue as complete
      setDialogueComplete(true);
    }
  };
  
  const getRelationshipBadge = (relationship: string) => {
    switch(relationship) {
      case 'professional':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Professional</Badge>;
      case 'friendly':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Friendly</Badge>;
      case 'confrontational':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Confrontational</Badge>;
      case 'evasive':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Evasive</Badge>;
      default:
        return <Badge variant="outline">Neutral</Badge>;
    }
  };
  
  // Determine path taken
  const determinePath = () => {
    if (playerStats.trust > 20 && playerStats.suspicion > 30) {
      return "Corruption Enabler";
    } else if (playerStats.reputation > 20 && playerStats.trust < 0) {
      return "Ethical Whistleblower";
    } else if (playerStats.reputation > 10 && playerStats.trust > 0) {
      return "Pragmatic Integrity";
    } else {
      return "Cautious Navigator";
    }
  };
  
  // Complete dialogue and return results
  const handleComplete = () => {
    onComplete({
      ...playerStats,
      path: determinePath()
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-corruption-primary" />
            <span>Corruption Dialogue Simulation</span>
          </h2>
        </div>
        
        {dialogueComplete ? (
          <div className="space-y-6">
            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Conversation Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Your Approach</h4>
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <p className="font-medium">{determinePath()}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {playerStats.reputation > 20 
                        ? "You maintained strong ethical boundaries throughout the conversation."
                        : playerStats.trust > 30
                          ? "You were open to questionable arrangements to advance your interests."
                          : "You navigated the situation carefully, avoiding clear ethical commitments."
                      }
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded-md shadow-sm text-center">
                    <p className="text-xs text-muted-foreground">Professional Reputation</p>
                    <p className="font-medium text-lg">{playerStats.reputation > 0 ? "+" : ""}{playerStats.reputation}</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md shadow-sm text-center">
                    <p className="text-xs text-muted-foreground">Williams' Trust</p>
                    <p className="font-medium text-lg">{playerStats.trust > 0 ? "+" : ""}{playerStats.trust}</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md shadow-sm text-center">
                    <p className="text-xs text-muted-foreground">Corruption Exposure</p>
                    <p className="font-medium text-lg">{playerStats.suspicion > 0 ? "+" : ""}{playerStats.suspicion}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Outcome Implications</h4>
                  <div className="p-3 bg-white rounded-md shadow-sm">
                    <p className="text-sm">
                      {playerStats.reputation > 20 && playerStats.trust < 0 
                        ? "You refused to participate in corruption, maintaining your integrity but potentially limiting certain career opportunities within the current administration."
                        : playerStats.trust > 30 && playerStats.suspicion > 30
                          ? "You've become entangled in a potentially corrupt arrangement that could benefit your career in the short term, but may pose significant legal and reputational risks."
                          : "You've maintained a cautious approach, neither fully committing to corruption nor taking a strong ethical stand, leaving your position somewhat ambiguous."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Conversation Record</h3>
              
              <div className="max-h-60 overflow-y-auto p-3 border rounded-md">
                {conversationHistory.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.startsWith("You:") ? "pl-4" : ""}`}>
                    <p className={`text-sm ${message.startsWith("You:") ? "text-corruption-primary" : ""}`}>
                      {message}
                    </p>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>This transcript will not be saved after you continue</span>
              </p>
            </div>
            
            <Button onClick={handleComplete} className="w-full">
              <span>Continue Your Journey</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <CircleUser className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <div>
                    <h3 className="font-medium">{currentNode.character.name}</h3>
                    <p className="text-xs text-muted-foreground">{currentNode.character.position}</p>
                  </div>
                  
                  {conversationHistory.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {conversationHistory.length / 2 + 1} of {Object.keys(mockDialogueTree.nodes).length} exchanges
                    </Badge>
                  )}
                </div>
                
                <div className="p-3 bg-muted/20 rounded-md my-2">
                  <p className="text-sm">{currentNode.text}</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  {currentNode.options.map((option) => (
                    <Card 
                      key={option.id} 
                      className="cursor-pointer hover:bg-muted/10 transition-colors"
                      onClick={() => handleSelectOption(option)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm">{option.text}</p>
                          {getRelationshipBadge(option.relationship)}
                        </div>
                        
                        {option.effect && Object.values(option.effect).some(val => val !== 0) && (
                          <div className="flex gap-2 mt-2 text-xs">
                            {option.effect.reputation && (
                              <span className={option.effect.reputation > 0 ? "text-green-600" : "text-red-600"}>
                                {option.effect.reputation > 0 ? "+" : ""}{option.effect.reputation} Rep
                              </span>
                            )}
                            {option.effect.trust && (
                              <span className={option.effect.trust > 0 ? "text-blue-600" : "text-red-600"}>
                                {option.effect.trust > 0 ? "+" : ""}{option.effect.trust} Trust
                              </span>
                            )}
                            {option.effect.suspicion && (
                              <span className={option.effect.suspicion > 0 ? "text-yellow-600" : "text-green-600"}>
                                {option.effect.suspicion > 0 ? "+" : ""}{option.effect.suspicion} Risk
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            {conversationHistory.length > 0 && (
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Previous Exchanges</span>
                </h4>
                
                <div className="max-h-36 overflow-y-auto p-3 border rounded-md bg-muted/10">
                  {conversationHistory.map((message, index) => (
                    <div key={index} className={`text-xs mb-1 ${message.startsWith("You:") ? "pl-3" : ""}`}>
                      <p className={message.startsWith("You:") ? "text-corruption-primary" : ""}>
                        {message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-yellow-800">
                  Your responses shape the conversation and determine your integrity profile. Choose carefully.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BranchingNarrative;
