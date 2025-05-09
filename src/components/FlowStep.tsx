
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FlowStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  accent?: string;
}

const FlowStep: React.FC<FlowStepProps> = ({ 
  number, 
  title, 
  description, 
  isLast = false,
  accent = "#9b87f5"
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center mb-4">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl"
          style={{ backgroundColor: accent }}
        >
          {number}
        </div>
      </div>
      
      <div className="space-y-2 w-full">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
      
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
          <ArrowRight className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      
      {!isLast && (
        <div className="md:hidden w-1 h-12 bg-primary/30 mx-auto my-4"></div>
      )}
    </div>
  );
};

export default FlowStep;
