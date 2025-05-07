
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummarySectionProps {
  summary: string;
  pdfUrl?: string | null;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, pdfUrl }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Summary Card */}
      <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all">
        <CardHeader className="bg-card border-b pb-4">
          <CardTitle className="flex items-center text-xl">
            <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
            Document Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-accent/30 p-5 rounded-lg border border-accent/20">
            <p className="whitespace-pre-line leading-relaxed text-foreground">{summary}</p>
            
            {/* Key points extraction - visual element */}
            <div className="mt-6 pt-5 border-t border-accent/30">
              <h4 className="font-medium mb-3 text-primary">Key Points:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>94% accuracy in early detection (vs. 89% traditional methods)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Study of 1,200 patients across 8 hospitals</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Challenges: data privacy and system integration</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* PDF Preview Card */}
      {pdfUrl && (
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all h-full">
          <CardHeader className="bg-card border-b pb-4">
            <CardTitle className="flex items-center text-xl">
              <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
              PDF Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe 
              src={pdfUrl} 
              className="w-full h-[500px] border-0" 
              title="PDF Preview"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SummarySection;
