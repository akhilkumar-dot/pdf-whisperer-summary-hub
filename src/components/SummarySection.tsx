
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummarySectionProps {
  summary: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="bg-card border-b pb-3">
        <CardTitle className="flex items-center text-xl">
          <span className="inline-block w-1 h-5 bg-primary rounded-full mr-2"></span>
          Document Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-accent/30 p-5 rounded-lg border border-accent/20">
          <p className="whitespace-pre-line leading-relaxed">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;
