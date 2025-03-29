
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Consequence } from '@/data/consequences';
import { AlertTriangle, CheckCircle2, Newspaper } from 'lucide-react';

interface NewsHeadlinesProps {
  consequences: Consequence[];
}

const NewsHeadlines: React.FC<NewsHeadlinesProps> = ({ consequences }) => {
  if (consequences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 my-6 animate-fade-in">
      <h3 className="text-xl font-serif mb-2 text-center">Breaking News</h3>
      {consequences.map((consequence) => (
        <Card key={consequence.id} className="border border-black rounded-none shadow-none">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {consequence.impact.integrity && consequence.impact.integrity > 0 ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="minimal-badge">
                    Breaking News
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    National Chronicle
                  </span>
                </div>
                <h4 className="font-serif font-medium mb-1">{consequence.headline}</h4>
                <p className="text-sm text-muted-foreground">{consequence.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsHeadlines;
