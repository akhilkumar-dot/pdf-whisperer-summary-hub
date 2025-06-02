
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Sparkles } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b pb-4">
          <CardTitle className="flex items-center text-xl">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span>AI-Generated Summary</span>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-accent/30 p-5 rounded-lg border border-accent/20">
            <p className="whitespace-pre-line leading-relaxed text-foreground">{summary}</p>
          </div>
          
          {/* AI Processing Info */}
          <div className="mt-6 pt-5 border-t border-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Processed with AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This summary was generated using advanced natural language processing models including 
              CLIP and Hugging Face transformers to extract key insights from your document.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummarySection;
