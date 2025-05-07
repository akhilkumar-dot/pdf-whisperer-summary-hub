
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummarySectionProps {
  summary: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Document Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-accent/30 p-4 rounded-md">
          <p className="whitespace-pre-line">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;
