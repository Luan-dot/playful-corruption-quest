
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Consequence } from '@/data/consequences';
import { AlertTriangle, CheckCircle2, Newspaper, TrendingUp, TrendingDown } from 'lucide-react';

interface NewsHeadlinesProps {
  consequences: Consequence[];
}

const NewsHeadlines: React.FC<NewsHeadlinesProps> = ({ consequences }) => {
  if (consequences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 my-6 animate-fade-in">
      <h3 className="text-xl font-serif mb-2 text-center flex items-center justify-center gap-2">
        <Newspaper className="h-5 w-5" />
        <span>Breaking News</span>
      </h3>
      
      {consequences.map((consequence) => {
        // Determine if this is a positive or negative consequence
        const isPositive = consequence.impact.integrity > 0 || consequence.impact.reputation > 0;
        
        // Create a summary of the impacts
        const impacts = [];
        if (consequence.impact.integrity) impacts.push(`Integrity ${consequence.impact.integrity > 0 ? '+' : ''}${consequence.impact.integrity}`);
        if (consequence.impact.money) impacts.push(`Funds ${consequence.impact.money > 0 ? '+' : ''}${consequence.impact.money}`);
        if (consequence.impact.power) impacts.push(`Power ${consequence.impact.power > 0 ? '+' : ''}${consequence.impact.power}`);
        if (consequence.impact.reputation) impacts.push(`Reputation ${consequence.impact.reputation > 0 ? '+' : ''}${consequence.impact.reputation}`);
        
        return (
          <Card key={consequence.id} className={`border rounded-none shadow-none ${isPositive ? 'border-green-800 bg-green-50/30' : 'border-black bg-red-50/10'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {isPositive ? (
                    <CheckCircle2 className="h-5 w-5 text-green-700" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`minimal-badge ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                      Breaking News
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      National Chronicle
                    </span>
                  </div>
                  <h4 className="font-serif font-medium mb-1">{consequence.headline}</h4>
                  <p className="text-sm text-muted-foreground">{consequence.description}</p>
                  
                  {impacts.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {impacts.map((impact, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center gap-1 text-xs">
                          {impact.includes('+') ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          {impact}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NewsHeadlines;
