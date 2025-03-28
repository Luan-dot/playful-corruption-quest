
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Search, 
  ExternalLink, 
  Clock, 
  BookMarked,
  Download,
  Bookmark,
  Globe,
  GraduationCap
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'case-study' | 'tool';
  source: string;
  description: string;
  url: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

const mockResources: Resource[] = [
  {
    id: "res-1",
    title: "Understanding the Corruption Perception Index",
    type: "article",
    source: "Transparency International",
    description: "A detailed explanation of how the global Corruption Perception Index works and what it tells us about corruption worldwide.",
    url: "#",
    tags: ["metrics", "global", "measurement"],
    difficulty: "beginner",
    estimatedTime: "15 mins"
  },
  {
    id: "res-2",
    title: "Recognizing Conflicts of Interest",
    type: "video",
    source: "Ethics Academy",
    description: "This educational video explores how to identify and manage conflicts of interest in professional settings.",
    url: "#",
    tags: ["conflicts", "professional ethics", "management"],
    difficulty: "beginner",
    estimatedTime: "22 mins"
  },
  {
    id: "res-3",
    title: "The Panama Papers Investigation",
    type: "case-study",
    source: "International Consortium of Investigative Journalists",
    description: "An in-depth look at how journalists uncovered one of the largest tax haven leaks in history and its global implications.",
    url: "#",
    tags: ["tax evasion", "journalism", "offshore"],
    difficulty: "intermediate",
    estimatedTime: "45 mins"
  },
  {
    id: "res-4",
    title: "Corruption Risk Assessment Tool",
    type: "tool",
    source: "UNODC",
    description: "A practical framework for organizations to identify and mitigate corruption vulnerabilities in their operations.",
    url: "#",
    tags: ["risk management", "prevention", "organizational"],
    difficulty: "advanced",
    estimatedTime: "60 mins"
  },
  {
    id: "res-5",
    title: "Behavioral Economics of Corruption",
    type: "article",
    source: "Journal of Public Integrity",
    description: "Research on how psychological factors influence corrupt behavior and how this understanding can inform anti-corruption strategies.",
    url: "#",
    tags: ["psychology", "research", "prevention"],
    difficulty: "advanced",
    estimatedTime: "30 mins"
  },
  {
    id: "res-6",
    title: "Whistleblower Protection Best Practices",
    type: "case-study",
    source: "Government Accountability Project",
    description: "Examines successful whistleblower protection systems and their impact on exposing corruption.",
    url: "#",
    tags: ["whistleblowing", "protection", "reporting"],
    difficulty: "intermediate",
    estimatedTime: "25 mins"
  },
  {
    id: "res-7",
    title: "Corruption in Healthcare Systems",
    type: "video",
    source: "World Health Organization",
    description: "Overview of common corruption schemes in healthcare and their impact on public health outcomes.",
    url: "#",
    tags: ["healthcare", "public health", "systemic corruption"],
    difficulty: "intermediate",
    estimatedTime: "18 mins"
  },
  {
    id: "res-8",
    title: "Anti-Corruption Compliance Program Template",
    type: "tool",
    source: "Business Ethics Council",
    description: "A customizable template for businesses to develop comprehensive anti-corruption compliance programs.",
    url: "#",
    tags: ["compliance", "business", "prevention"],
    difficulty: "advanced",
    estimatedTime: "90 mins"
  }
];

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [savedResources, setSavedResources] = useState<string[]>([]);
  
  const filteredResources = mockResources.filter(resource => {
    // Filter by search term
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by type based on active tab
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "saved" && savedResources.includes(resource.id)) ||
      resource.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const toggleSaveResource = (id: string) => {
    setSavedResources(prev => 
      prev.includes(id) 
        ? prev.filter(resId => resId !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-corruption-primary" />
            <span>Resource Library</span>
          </h2>
          <Button variant="outline" size="sm" className="gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>Learning Paths</span>
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources by title, description or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="article" className="flex-1">
              <FileText className="h-4 w-4 mr-1" />
              <span>Articles</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex-1">
              <Video className="h-4 w-4 mr-1" />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value="case-study" className="flex-1">
              <BookMarked className="h-4 w-4 mr-1" />
              <span>Case Studies</span>
            </TabsTrigger>
            <TabsTrigger value="tool" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              <span>Tools</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">
              <Bookmark className="h-4 w-4 mr-1" />
              <span>Saved</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredResources.length > 0 ? (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{resource.source}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaveResource(resource.id)}
                          className={savedResources.includes(resource.id) ? "text-yellow-500" : ""}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm mb-3">{resource.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.estimatedTime}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <span>
                              {resource.difficulty === "beginner" ? "Beginner" : 
                               resource.difficulty === "intermediate" ? "Intermediate" : "Advanced"}
                            </span>
                          </span>
                        </div>
                        
                        <Button size="sm" variant="outline" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>Open</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium mb-1">No resources found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or filter selection
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourceLibrary;
