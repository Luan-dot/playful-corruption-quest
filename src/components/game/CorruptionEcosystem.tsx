
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/ui/tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Users, 
  Building, 
  GraduationCap,
  Briefcase,
  Scale,
  FileText,
  AlertTriangle,
  Heart,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
  Banknote
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface CorruptionEcosystemProps {
  onComplete: () => void;
}

const CorruptionEcosystem: React.FC<CorruptionEcosystemProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState("system");
  const [revealedEntities, setRevealedEntities] = useState<Record<string, boolean>>({
    "key-officials": true,
    "business-interests": false,
    "regulatory-bodies": false,
    "judicial-system": false,
    "media": false,
    "civil-society": false
  });
  
  const toggleEntity = (entityId: string) => {
    setRevealedEntities(prev => ({
      ...prev,
      [entityId]: !prev[entityId]
    }));
    
    // Check if all entities are revealed
    const updatedEntities = {
      ...revealedEntities,
      [entityId]: !revealedEntities[entityId]
    };
    
    if (Object.values(updatedEntities).every(value => value)) {
      // If all entities revealed, show a success message or unlock something
      console.log("All entities revealed!");
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Network className="h-6 w-6 text-corruption-primary" />
            <span>Corruption Ecosystem Visualization</span>
          </h2>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="system" className="flex-1">
              <Network className="h-4 w-4 mr-1" />
              <span>System View</span>
            </TabsTrigger>
            <TabsTrigger value="flows" className="flex-1">
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              <span>Resource Flows</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex-1">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Social Impact</span>
            </TabsTrigger>
            <TabsTrigger value="prevention" className="flex-1">
              <Scale className="h-4 w-4 mr-1" />
              <span>Prevention</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="system" className="mt-0">
            <div className="p-4 bg-muted/10 rounded-md mb-6">
              <p className="text-sm mb-4">
                Corruption operates as an interconnected ecosystem. Click on each entity to understand its role and how it connects to others in corrupt systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entity 1: Key Government Officials */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["key-officials"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("key-officials")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-corruption-primary" />
                        <h3 className="font-medium">Key Government Officials</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["key-officials"] ? "bg-primary/20" : ""}>
                        {revealedEntities["key-officials"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["key-officials"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">Officials with discretionary power over valuable resources (contracts, licenses, regulations) are central to corrupt networks.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("business-interests");
                            }}>
                              Business Interests
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("regulatory-bodies");
                            }}>
                              Regulatory Bodies
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Entity 2: Business Interests */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["business-interests"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("business-interests")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-medium">Business Interests</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["business-interests"] ? "bg-primary/20" : ""}>
                        {revealedEntities["business-interests"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["business-interests"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">Companies seeking favorable treatment or unfair advantages often provide the financial resources that fuel corruption.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("key-officials");
                            }}>
                              Key Government Officials
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("media");
                            }}>
                              Media
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Entity 3: Regulatory Bodies */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["regulatory-bodies"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("regulatory-bodies")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Regulatory Bodies</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["regulatory-bodies"] ? "bg-primary/20" : ""}>
                        {revealedEntities["regulatory-bodies"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["regulatory-bodies"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">Agencies designed to enforce rules can be compromised through regulatory capture, where they serve regulated industries rather than public interest.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("key-officials");
                            }}>
                              Key Government Officials
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("judicial-system");
                            }}>
                              Judicial System
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Entity 4: Judicial System */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["judicial-system"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("judicial-system")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Scale className="h-5 w-5 text-purple-500" />
                        <h3 className="font-medium">Judicial System</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["judicial-system"] ? "bg-primary/20" : ""}>
                        {revealedEntities["judicial-system"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["judicial-system"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">Courts and law enforcement that should provide accountability may be compromised through political appointments, bribes, or threats.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("regulatory-bodies");
                            }}>
                              Regulatory Bodies
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("civil-society");
                            }}>
                              Civil Society
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Entity 5: Media */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["media"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("media")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium">Media</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["media"] ? "bg-primary/20" : ""}>
                        {revealedEntities["media"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["media"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">Independent media is crucial for exposing corruption, but can be neutralized through ownership concentration, advertising pressure, or direct threats.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("business-interests");
                            }}>
                              Business Interests
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("civil-society");
                            }}>
                              Civil Society
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Entity 6: Civil Society */}
                <Card 
                  className={`cursor-pointer hover:border-primary transition-colors ${revealedEntities["civil-society"] ? "border-primary" : ""}`}
                  onClick={() => toggleEntity("civil-society")}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">Civil Society</h3>
                      </div>
                      
                      <Badge variant="outline" className={revealedEntities["civil-society"] ? "bg-primary/20" : ""}>
                        {revealedEntities["civil-society"] ? "Revealed" : "Hidden"}
                      </Badge>
                    </div>
                    
                    {revealedEntities["civil-society"] && (
                      <div className="mt-3 text-sm">
                        <p className="mb-2">NGOs, community organizations, and watchdog groups provide crucial oversight, but can be weakened through funding restrictions or co-option.</p>
                        
                        <div className="mt-3 text-xs">
                          <h4 className="font-medium mb-1">Connected to:</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("judicial-system");
                            }}>
                              Judicial System
                            </Badge>
                            <Badge variant="outline" className="text-xs cursor-pointer" onClick={(e) => {
                              e.stopPropagation();
                              toggleEntity("media");
                            }}>
                              Media
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span>Key Insight</span>
              </h3>
              <p className="text-sm">
                Corruption thrives in ecosystems where multiple institutions are weak or compromised simultaneously. When oversight mechanisms fail simultaneously, corrupt networks can operate with impunity. Strengthening any one part of the system can disrupt corrupt networks.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="flows" className="mt-0">
            <div className="space-y-6">
              <div className="p-4 bg-muted/10 rounded-md">
                <h3 className="font-medium mb-3">How Resources Flow in Corrupt Systems</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Banknote className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Financial Flows</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Corrupt financial flows often involve:
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Bribes disguised as consulting fees</li>
                        <li>Inflated contracts with kickbacks</li>
                        <li>Shell companies to hide ownership</li>
                        <li>Offshore accounts to conceal proceeds</li>
                        <li>Cash transactions to avoid detection</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Decision Flows</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Corrupt influence on decisions typically follows patterns:
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Manipulation of technical requirements</li>
                        <li>Selective enforcement of regulations</li>
                        <li>Predecided outcomes disguised as merit-based</li>
                        <li>Information leakage giving unfair advantages</li>
                        <li>Strategic delays or acceleration of processes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Influence Flows</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Softer forms of corrupt influence include:
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>"Revolving door" employment opportunities</li>
                        <li>Gifts and entertainment creating social obligations</li>
                        <li>Nepotism and favoritism in appointments</li>
                        <li>Exclusive access to decision-makers</li>
                        <li>Strategic charitable donations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Detection Challenge</span>
                </h3>
                <p className="text-sm">
                  Resources in corrupt systems flow through channels designed to appear legitimate. Following unusual patterns in decisions, relationships, and financial transactions is key to detecting corruption. Look for results that consistently benefit the same parties despite appearing procedurally correct.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="impact" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Building className="h-5 w-5 text-corruption-primary" />
                      <span>Economic Impact</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Reduced economic growth (2-4% of GDP annually)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Increased business costs (up to 10% of transaction value)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Decreased foreign direct investment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Inefficient resource allocation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Increased inequality as benefits concentrate</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-corruption-secondary" />
                      <span>Social Impact</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Reduced quality of public services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Decreased trust in institutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Increased poverty and vulnerability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Normalized rule-breaking behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Weakened social cohesion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                      <span>Governance Impact</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Undermined rule of law</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Captured regulatory processes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Distorted political representation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Misallocation of public resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Reduced policy effectiveness</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>Human Impact</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>140,000 child deaths annually from corruption in healthcare</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Increased vulnerability to environmental disasters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Reduced access to clean water and sanitation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Lower quality education opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Increased exposure to unsafe infrastructure</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>Impact Insight</span>
                </h3>
                <p className="text-sm">
                  Corruption's impacts are systemic and interconnected. While financial costs are significant, the human costs—in lives, wellbeing, and opportunity—are often invisible but far more profound. Corruption's greatest toll falls on those with the least power and resources to resist it.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prevention" className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Scale className="h-5 w-5 text-corruption-primary" />
                      <span>Institutional Approaches</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Independent anti-corruption agencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Transparent procurement systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Conflict of interest regulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Asset disclosure requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Whistleblower protection laws</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Building className="h-5 w-5 text-corruption-secondary" />
                      <span>Organizational Approaches</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Ethics training programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Clear codes of conduct</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Ethics officers and committees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Anonymous reporting mechanisms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Rotational assignments in sensitive positions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span>Social Approaches</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Civic education programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Independent investigative journalism</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Public awareness campaigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Community monitoring initiatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Social norms that stigmatize corruption</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>Multi-Faceted Prevention Strategy</span>
                  </h3>
                  
                  <p className="text-sm mb-3">
                    Effective anti-corruption strategies combine multiple approaches simultaneously:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-md text-sm">
                      <h4 className="font-medium mb-1">1. Reduce Opportunities</h4>
                      <p className="text-muted-foreground">
                        Simplify procedures, increase transparency, limit discretion, introduce technological solutions, and separate key functions.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-md text-sm">
                      <h4 className="font-medium mb-1">2. Increase Detection Risk</h4>
                      <p className="text-muted-foreground">
                        Strengthen auditing, protect whistleblowers, empower investigative bodies, and encourage reporting.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-md text-sm">
                      <h4 className="font-medium mb-1">3. Raise Costs of Corruption</h4>
                      <p className="text-muted-foreground">
                        Ensure proportionate penalties, enforce consistently, publicize consequences, and recover stolen assets.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-md text-sm">
                      <h4 className="font-medium mb-1">4. Reduce Benefits of Corruption</h4>
                      <p className="text-muted-foreground">
                        Make illicit gains difficult to use, strengthen anti-money laundering systems, and close offshore loopholes.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-md text-sm">
                      <h4 className="font-medium mb-1">5. Strengthen Ethical Culture</h4>
                      <p className="text-muted-foreground">
                        Promote integrity-based leadership, recognize ethical behavior, and develop ethical decision-making skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button onClick={onComplete}>
                  I've Explored the Corruption Ecosystem
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CorruptionEcosystem;
