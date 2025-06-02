import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SummarySection from '@/components/SummarySection';
import { toast } from 'sonner';

// This will be replaced with actual API call
const generateSummary = async (fileName: string): Promise<string> => {
  // Simulate API call - replace with actual FastAPI endpoint
  const response = await fetch('/api/generate-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate summary');
  }
  
  const data = await response.json();
  return data.summary;
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedFileName = sessionStorage.getItem('fileName');
    const storedPdfUrl = sessionStorage.getItem('pdfUrl');
    
    if (!storedFileName) {
      toast.error("No file has been uploaded");
      navigate('/');
      return;
    }
    
    setFileName(storedFileName);
    setPdfUrl(storedPdfUrl);
    
    // Generate summary from uploaded document
    const processSummary = async () => {
      try {
        setLoading(true);
        // For now, use mock data - replace with actual API call
        const mockSummary = `AI-Generated Summary for ${storedFileName}

This document has been processed using advanced AI models including CLIP and Hugging Face transformers to extract key insights and generate a comprehensive summary.

Key findings and insights:
• The document contains detailed analysis of the subject matter with evidence-based conclusions
• Multiple data points and references support the main arguments presented
• The content demonstrates expertise in the field with practical applications
• Technical concepts are explained with clarity and supported by examples

Main topics covered:
- Comprehensive overview of the primary subject
- Detailed methodology and approach
- Results and findings with statistical significance
- Implications and recommendations for future work

This summary was generated using state-of-the-art natural language processing models to ensure accuracy and relevance to the document's core content.`;

        // TODO: Replace with actual API call
        // const generatedSummary = await generateSummary(storedFileName);
        setSummary(mockSummary);
        
      } catch (error) {
        console.error('Error generating summary:', error);
        toast.error("Failed to generate summary. Please try again.");
        setSummary("Error generating summary. Please try uploading the document again.");
      } finally {
        setLoading(false);
      }
    };

    processSummary();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              ← Back
            </Button>
            <h1 className="text-xl font-semibold truncate max-w-[200px] sm:max-w-md">
              {fileName || "Document Summary"}
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-muted-foreground">Generating AI summary...</p>
            <p className="text-sm text-muted-foreground">Processing document with advanced AI models</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PDF Preview Panel */}
            <div className="lg:col-span-6 order-2 lg:order-1 h-[calc(100vh-180px)] min-h-[600px] sticky top-24">
              <div className="bg-white border rounded-lg shadow-sm h-full overflow-hidden">
                <div className="p-3 border-b bg-muted flex justify-between items-center">
                  <h3 className="font-medium">PDF Preview</h3>
                  {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
                </div>
                <div className="h-full">
                  {pdfUrl ? (
                    <iframe 
                      src={pdfUrl} 
                      className="w-full h-full" 
                      title="PDF Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      PDF preview not available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SummarySection summary={summary} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;
