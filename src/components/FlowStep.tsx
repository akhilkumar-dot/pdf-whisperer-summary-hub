
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FlowStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const FlowStep: React.FC<FlowStepProps> = ({ number, title, description, isLast = false }) => {
  return (
    <div className="flex flex-col items-center">
      <Card className="card-shadow w-full overflow-hidden border border-white/20 relative card-gradient">
        <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          {number}
        </div>
        <CardContent className="pt-12 pb-8 px-6">
          <h3 className="text-xl font-semibold mb-3 text-gradient">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
      
      {!isLast && (
        <div className="flex items-center justify-center my-3 md:hidden">
          <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary/30 rounded-full"></div>
        </div>
      )}
      
      {!isLast && (
        <div className="hidden md:flex items-center justify-center mx-2">
          <ArrowRight className="h-12 w-12 text-primary drop-shadow-md my-2 animate-pulse-slow" />
        </div>
      )}
    </div>
  );
};

export default FlowStep;
