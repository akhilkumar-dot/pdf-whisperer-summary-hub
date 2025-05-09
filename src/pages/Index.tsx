import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import FeatureCard from '@/components/FeatureCard';
import FlowStep from '@/components/FlowStep';
import Navbar from '@/components/Navbar';
import { FileText, Search, Book, Star, Zap, Clock, Sparkles, Globe, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SummarySection from '@/components/SummarySection';
import QuestionsSection from '@/components/QuestionsSection';

const Index = () => {
  const navigate = useNavigate();
  const fileUploadRef = React.useRef<HTMLDivElement>(null);
  const featuresRef = React.useRef<HTMLDivElement>(null);
  const howItWorksRef = React.useRef<HTMLDivElement>(null);
  const faqRef = React.useRef<HTMLDivElement>(null);

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

  // FAQ Data
  const faqs = [
    {
      id: "faq-1",
      question: "How does PaperPicks generate summaries?",
      answer: "PaperPicks uses advanced AI technology to analyze the text in your PDF documents, identify key points, and generate concise summaries. Our algorithm focuses on maintaining the original meaning while reducing the content to its essential components."
    },
    {
      id: "faq-2",
      question: "Is my document data secure?",
      answer: "Yes, we take data security seriously. Your uploaded documents are processed in a secure environment and are not stored permanently on our servers. All documents are automatically deleted after processing unless you choose to save them in your account."
    },
    {
      id: "faq-3",
      question: "What types of documents work best with PaperPicks?",
      answer: "PaperPicks works well with most text-based PDF documents including research papers, articles, reports, and textbooks. Documents with clear section headers and well-structured content typically yield the best results."
    },
    {
      id: "faq-4",
      question: "Can I customize the length of the summary?",
      answer: "Currently, our system automatically generates summaries of appropriate length based on the document content. We're working on adding customizable summary length options in a future update."
    },
    {
      id: "faq-5",
      question: "How accurate are the generated questions?",
      answer: "Our question generation algorithm is designed to identify core concepts and create relevant questions that help reinforce understanding. While the system is highly effective, it continuously improves with user feedback."
    },
    {
      id: "faq-6",
      question: "Are there any file size limitations?",
      answer: "Yes, the current maximum file size for uploads is 20MB. For optimal performance, we recommend documents between 2-50 pages."
    },
    {
      id: "faq-7",
      question: "Do I need an account to use PaperPicks?",
      answer: "You can use basic features without an account, but creating a free account allows you to save your documents, access history, and enjoy additional features."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
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
      <section id="upload" className="section-padding bg-background border-t border-border" ref={fileUploadRef}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Upload Your PDF</h2>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </section>

      {/* How It Works Section - Updated to match image */}
      <section id="how-it-works" className="section-padding bg-accent/10" ref={howItWorksRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-16">
            Transform any PDF document into comprehensive learning materials in just a few simple steps.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 relative">
            <div className="relative md:px-8 py-4">
              <FlowStep
                number={1}
                title="Upload Your PDF"
                description="Simply upload any PDF document you want to learn from into our secure system. It works with academic papers, textbooks, reports, and more."
                accent="#9b87f5"
              />
            </div>
            
            <div className="relative md:px-8 py-4">
              <FlowStep
                number={2}
                title="AI Processing"
                description="Our advanced AI analyzes the document content, extracting key information, concepts, and knowledge points. The AI understands context and identifies the most important parts."
                accent="#9b87f5"
              />
            </div>
            
            <div className="relative md:px-8 py-4">
              <FlowStep
                number={3}
                title="Get Learning Materials"
                description="Within seconds, receive a complete set of learning materials including summaries, questions, and related resources. Save time and learn more effectively."
                isLast={true}
                accent="#9b87f5"
              />
            </div>
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

      {/* Example Section */}
      <section className="section-padding bg-gradient-to-r from-accent/30 to-primary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Example Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">See what PaperPicks can do</h3>
              <p className="text-lg mb-6">
                Our AI-powered system extracts the most important information from your documents and presents it in a clear, concise format.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span>Condense lengthy documents into digestible summaries</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span>Save hours of reading time with smart extraction</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <span>Highlight key concepts and main arguments</span>
                </li>
              </ul>
            </div>
            <div>
              <SummarySection summary="This research paper discusses the implications of machine learning algorithms in healthcare diagnostics. The authors found that AI-based diagnostic tools achieved 94% accuracy in early detection of certain conditions, compared to 89% with traditional methods. The study involved 1,200 patients across 8 different hospitals and demonstrated significant reduction in false negatives. Key challenges included data privacy concerns and integration with existing hospital systems." />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-background" ref={faqRef}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Find answers to the most common questions about using PaperPicks
          </p>
          
          <QuestionsSection 
            title="Frequently Asked Questions" 
            questions={faqs} 
            className="border-none shadow-lg"
          />
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-6">Still have questions?</p>
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex flex-col h-full">
                <p className="text-lg mb-4">"PaperPicks helped me digest complex research papers in minutes instead of hours. A game-changer for my literature review!"</p>
                <div className="mt-auto pt-4 border-t">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">PhD Candidate</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col h-full">
                <p className="text-lg mb-4">"The question generation feature helped me prepare for my exams by highlighting concepts I might have otherwise missed."</p>
                <div className="mt-auto pt-4 border-t">
                  <p className="font-medium">Maria Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Medical Student</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col h-full">
                <p className="text-lg mb-4">"As a business analyst, I need to review dozens of reports weekly. PaperPicks has saved me countless hours of reading time."</p>
                <div className="mt-auto pt-4 border-t">
                  <p className="font-medium">James Lee</p>
                  <p className="text-sm text-muted-foreground">Senior Business Analyst</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Document Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and students who are saving time and gaining deeper insights with PaperPicks.
          </p>
          <Button size="lg" onClick={handleScrollToUpload} className="text-lg px-10 py-6">
            Try PaperPicks Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                <FileText className="h-6 w-6" />
                <span>PaperPicks</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform how you read and understand documents with our AI-powered analysis tool.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 PaperPicks | 
              <a href="#" className="ml-2 hover:text-foreground transition-colors">Privacy Policy</a> | 
              <a href="#" className="ml-2 hover:text-foreground transition-colors">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
