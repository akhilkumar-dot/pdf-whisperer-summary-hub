
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import FeatureCard from '@/components/FeatureCard';
import StepCard from '@/components/StepCard';
import { FileText, Search, Book, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const fileUploadRef = React.useRef<HTMLDivElement>(null);

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
      {/* Hero Section */}
      <section className="hero-gradient min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Effortlessly Summarize Your PDFs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your PDF and get a concise summary, questions, and relevant resources
          </p>
          <Button size="lg" onClick={handleScrollToUpload} className="text-lg px-8">
            Try Now
          </Button>
        </div>
      </section>

      {/* Upload Section */}
      <section className="section-padding bg-white" ref={fileUploadRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Upload Your PDF</h2>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-accent/20">
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
      <section className="section-padding bg-white">
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
            © 2025 PDF Whisperer Summary Hub | 
            <a href="#" className="ml-2 hover:text-foreground transition-colors">Privacy Policy</a> | 
            <a href="#" className="ml-2 hover:text-foreground transition-colors">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
