
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface GameHeaderProps {
  playerStyle: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ playerStyle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-serif mb-2">Political Integrity</h1>
      <p className="text-lg text-muted-foreground font-serif">
        A game about leadership, ethics, and human nature
      </p>
      {playerStyle !== 'Undetermined' && (
        <Badge variant="outline" className="minimal-badge mt-2">
          Playing as: {playerStyle}
        </Badge>
      )}
    </div>
  );
};

export default GameHeader;
