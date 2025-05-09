
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="card-shadow h-full border border-white/20 hover:border-primary/20 transition-all duration-300 overflow-hidden card-gradient">
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="p-3 bg-gradient-to-br from-primary/20 to-violet-400/20 rounded-full mb-4 border border-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gradient">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
