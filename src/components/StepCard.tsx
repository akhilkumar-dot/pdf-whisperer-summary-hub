
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card className="card-shadow relative card-gradient border border-white/20">
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-bold">{number}</div>
      <CardContent className="pt-8 pb-6 px-6">
        <h3 className="text-lg font-semibold mb-2 text-gradient">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
