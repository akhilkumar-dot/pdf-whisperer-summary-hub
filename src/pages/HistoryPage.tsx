
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { File, History, Trash, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Define the document type
interface SavedDocument {
  id: string;
  fileName: string;
  dateAdded: string;
  fileSize: string;
  pdfUrl?: string;
}

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved documents from localStorage
    const loadSavedDocuments = () => {
      try {
        const saved = localStorage.getItem('paperpicks-documents');
        if (saved) {
          setSavedDocuments(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved documents:', error);
        toast.error('Failed to load document history');
      } finally {
        setLoading(false);
      }
    };

    loadSavedDocuments();
  }, []);

  const handleViewDocument = (document: SavedDocument) => {
    // Store document info in sessionStorage for the results page
    sessionStorage.setItem('fileName', document.fileName);
    if (document.pdfUrl) {
      sessionStorage.setItem('pdfUrl', document.pdfUrl);
    }
    navigate('/results');
  };

  const handleDeleteDocument = (id: string) => {
    try {
      const updatedDocuments = savedDocuments.filter(doc => doc.id !== id);
      setSavedDocuments(updatedDocuments);
      localStorage.setItem('paperpicks-documents', JSON.stringify(updatedDocuments));
      toast.success('Document removed from history');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to remove document');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8 gap-3">
          <History className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Document History</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : savedDocuments.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <File className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-medium">No saved documents</h3>
                <p className="text-muted-foreground">When you upload and process documents, they will appear here.</p>
                <Button onClick={() => navigate('/')} className="mt-4">
                  Upload a document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedDocuments.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <File className="h-4 w-4" />
                          <span className="truncate max-w-[200px]">{doc.fileName}</span>
                        </TableCell>
                        <TableCell>{doc.dateAdded}</TableCell>
                        <TableCell>{doc.fileSize}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDocument(doc)}
                              className="h-8 px-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm" 
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="h-8 px-2 text-destructive hover:text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={() => navigate('/')}>
                Upload New Document
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
