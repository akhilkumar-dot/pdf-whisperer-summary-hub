
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import Navbar from '@/components/Navbar';
import { FileText, Search, Book, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const fileUploadRef = React.useRef<HTMLDivElement>(null);
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const howItWorksRef = React.useRef<HTMLDivElement>(null);

  const handleScrollToUpload = () => {
    fileUploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUploadSuccess = (file: File, mode: string) => {
    // In a real app, we would upload the file to a server here
    // For now, we'll simulate this by navigating to the results page
    // and storing some mock data in session storage
    
    // Store file info in session storage (just for demo purposes)
    sessionStorage.setItem('fileName', file.name);
    sessionStorage.setItem('fileSize', file.size.toString());
    sessionStorage.setItem('splitMode', mode);
    
    // Navigate to results page
    navigate('/results');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Modernized */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">PDF Analysis Tool</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Effortlessly <span className="text-primary">Summarize</span> Your PDFs
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-lg">
                Upload your PDF and get a concise summary, questions, and relevant resources to enhance your understanding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleScrollToUpload} className="text-lg px-8">
                  Try Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl rounded-full"></div>
                <div className="relative bg-card border shadow-xl rounded-lg p-6 transform rotate-3">
                  <div className="space-y-3">
                    <div className="w-24 h-6 bg-muted rounded-md"></div>
                    <div className="w-full h-4 bg-muted/70 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-muted/70 rounded-md"></div>
                    <div className="w-4/6 h-4 bg-muted/70 rounded-md"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-background border shadow-lg rounded-lg p-6 transform -rotate-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                      <div className="w-32 h-3 bg-muted rounded-md"></div>
                    </div>
                    <div className="w-full h-3 bg-muted/70 rounded-md"></div>
                    <div className="w-4/5 h-3 bg-muted/70 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="section-padding bg-background border-t border-border" ref={fileUploadRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Upload Your PDF</h2>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-accent/20" ref={howItWorksRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <StepCard
              number={1}
              title="Upload your PDF"
              description="Select or drag & drop your document in our secure uploader"
            />
            <StepCard
              number={2}
              title="Get Summary"
              description="Our AI analyzes your document and creates a comprehensive summary"
            />
            <StepCard
              number={3}
              title="Generate Questions"
              description="Review key questions derived from your document content"
            />
            <StepCard
              number={4}
              title="Receive Resources"
              description="Get curated resources related to your document topic"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-background" ref={featuresRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={FileText}
              title="Accurate Text Extraction"
              description="Our advanced algorithms ensure precise extraction of text from any PDF document, maintaining the original structure and context."
            />
            <FeatureCard
              icon={Book}
              title="Automatic Summary Generation"
              description="Get concise, well-structured summaries that capture the key points and main ideas from your documents."
            />
            <FeatureCard
              icon={Search}
              title="Question Generation"
              description="Our AI identifies important concepts and creates relevant questions to help you better understand the document content."
            />
            <FeatureCard
              icon={Star}
              title="Related Resource Suggestions"
              description="Discover videos, articles, and websites related to your document topic to enhance your understanding."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 DocSumAI | 
            <a href="#" className="ml-2 hover:text-foreground transition-colors">Privacy Policy</a> | 
            <a href="#" className="ml-2 hover:text-foreground transition-colors">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
