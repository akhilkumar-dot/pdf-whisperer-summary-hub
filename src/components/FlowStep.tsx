
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
      <Card className="card-shadow w-full">
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
          {number}
        </div>
        <CardContent className="pt-10 pb-6 px-6">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
      
      {!isLast && (
        <div className="flex items-center justify-center my-3 md:hidden">
          <div className="w-1 h-12 bg-primary/30"></div>
        </div>
      )}
      
      {!isLast && (
        <div className="hidden md:flex items-center justify-center mx-2">
          <ArrowRight className="h-10 w-10 text-primary my-2" />
        </div>
      )}
    </div>
  );
};

export default FlowStep;
