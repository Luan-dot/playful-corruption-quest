
import React from 'react';
import { User, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PortraitProps {
  emotion: 'neutral' | 'positive' | 'negative';
  role: string;
}

interface LocationProps {
  setting: string;
}

export const CharacterPortrait: React.FC<PortraitProps> = ({ emotion, role }) => {
  return (
    <div className="relative w-full aspect-square border border-black rounded-none overflow-hidden bg-white">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <User className="w-12 h-12 mb-2" />
        <span className="text-sm font-medium">{role}</span>
        <div className="mt-2">
          {emotion === 'positive' && <CheckCircle2 className="w-5 h-5" />}
          {emotion === 'negative' && <AlertTriangle className="w-5 h-5" />}
          {emotion === 'neutral' && <span className="block w-5 h-5 border border-black rounded-full" />}
        </div>
      </div>
    </div>
  );
};

export const LocationIllustration: React.FC<LocationProps> = ({ setting }) => {
  return (
    <div className="relative w-full aspect-video border border-black rounded-none overflow-hidden bg-white">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <MapPin className="w-12 h-12 mb-2" />
        <span className="text-sm font-medium text-center px-4">{setting}</span>
      </div>
    </div>
  );
};
