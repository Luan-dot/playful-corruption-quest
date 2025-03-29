
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Network, User, Building, DollarSign, Users, AlertTriangle, Shield } from 'lucide-react';

interface CorruptionNetworkProps {
  stakeholders: string[];
  title: string;
  isCorrupt: boolean;
}

const CorruptionNetwork: React.FC<CorruptionNetworkProps> = ({ 
  stakeholders, 
  title,
  isCorrupt
}) => {
  // Determine node types based on stakeholder names
  const getNodeIcon = (stakeholder: string) => {
    if (stakeholder.includes('Resident') || stakeholder.includes('Citizen') || stakeholder.includes('Patient')) {
      return <Users className="w-4 h-4" />;
    } else if (stakeholder.includes('Government') || stakeholder.includes('Council') || stakeholder.includes('Board')) {
      return <Building className="w-4 h-4" />;
    } else if (stakeholder.includes('Taxpayer') || stakeholder.includes('Donor') || stakeholder.includes('Investor')) {
      return <DollarSign className="w-4 h-4" />;
    } else {
      return <User className="w-4 h-4" />;
    }
  };

  return (
    <Card className="rounded-none border border-black shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Network className="h-5 w-5" />
          <h3 className="font-serif font-medium">Corruption Network Analysis</h3>
        </div>
        
        <div className="border border-black p-3 mb-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">{title}</span>
            {isCorrupt ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {stakeholders.map((stakeholder, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border border-black/30">
              {getNodeIcon(stakeholder)}
              <span className="text-xs">{stakeholder}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CorruptionNetwork;
