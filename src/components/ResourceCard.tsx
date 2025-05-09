
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article';
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, url, type }) => {
  return (
    <Card className="card-shadow h-full flex flex-col">
      <CardContent className="flex-1 pt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Link className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" onClick={() => window.open(url, '_blank')}>
          Visit {type === 'video' ? 'Video' : 'Article'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
