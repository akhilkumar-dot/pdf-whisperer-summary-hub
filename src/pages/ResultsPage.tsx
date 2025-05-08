
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SummarySection from '@/components/SummarySection';
import QuestionsSection from '@/components/QuestionsSection';
import ResourceCard from '@/components/ResourceCard';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, HelpCircle, Link } from 'lucide-react';

// Mock data for demonstration purposes
const mockSummary = `The document discusses advanced techniques in machine learning, focusing particularly on neural networks and their applications in natural language processing.

Key points covered include:
- The evolution of neural network architectures from simple perceptrons to complex transformer models
- How attention mechanisms have revolutionized sequence processing tasks
- Common challenges in training deep learning models and strategies to overcome them
- Practical applications in text summarization, translation, and sentiment analysis

The author emphasizes the importance of both theoretical understanding and practical implementation, providing code examples in Python using TensorFlow and PyTorch frameworks.`;

const mockQuestions = [
  {
    id: "q1",
    question: "What are the main differences between recurrent neural networks and transformer models?",
    answer: "Recurrent neural networks (RNNs) process sequences sequentially, maintaining a hidden state that's updated at each step. This creates challenges with long-term dependencies due to vanishing/exploding gradients. Transformer models, on the other hand, use self-attention mechanisms that allow direct connections between any positions in a sequence, enabling better parallel processing and improved handling of long-range dependencies."
  },
  {
    id: "q2",
    question: "How do attention mechanisms improve neural network performance?",
    answer: "Attention mechanisms allow models to focus on different parts of the input data when producing outputs. This mimics human cognitive processes and helps models handle long sequences by dynamically weighting the importance of different input elements. In natural language processing, attention helps models understand relationships between words regardless of their distance in the text."
  },
  {
    id: "q3",
    question: "What strategies can be used to prevent overfitting in deep learning models?",
    answer: "Several strategies can prevent overfitting: regularization techniques like L1/L2 regularization and dropout, data augmentation to artificially increase training data diversity, early stopping by monitoring validation performance, batch normalization to stabilize learning, and using transfer learning from pre-trained models when data is limited."
  },
];

const mockResources = [
  {
    id: "r1",
    title: "Neural Networks and Deep Learning",
    description: "Comprehensive course covering the fundamentals of neural networks",
    url: "https://www.coursera.org/learn/neural-networks-deep-learning",
    type: "video"
  },
  {
    id: "r2",
    title: "Attention Is All You Need",
    description: "Original research paper introducing the transformer architecture",
    url: "https://arxiv.org/abs/1706.03762",
    type: "article"
  },
  {
    id: "r3",
    title: "Practical Deep Learning for Coders",
    description: "Hands-on tutorials for implementing deep learning models",
    url: "https://course.fast.ai/",
    type: "video"
  },
  {
    id: "r4",
    title: "Understanding LSTM Networks",
    description: "Visual guide to understanding long short-term memory networks",
    url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
    type: "article"
  },
];

const ResultsPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("summary");

  useEffect(() => {
    // In a real app, we would fetch the processed data from an API
    // For now, we'll use session storage and mock data
    const storedFileName = sessionStorage.getItem('fileName');
    
    if (!storedFileName) {
      toast.error("No file has been uploaded");
      navigate('/');
      return;
    }
    
    setFileName(storedFileName);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setSummary(mockSummary);
      setQuestions(mockQuestions);
      setResources(mockResources);
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
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
              {fileName || "Document Results"}
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-muted-foreground">Processing your document...</p>
          </div>
        ) : (
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="summary" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Summary</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Questions</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-6">
              <SummarySection summary={summary} />
            </TabsContent>
            
            <TabsContent value="questions" className="mt-6">
              <QuestionsSection questions={questions} />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    url={resource.url}
                    type={resource.type}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;
