
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, FileText, Eye, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FileUpload = ({ onUploadSuccess }: { onUploadSuccess: (file: File, mode: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<string>("pages");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [saveToHistory, setSaveToHistory] = useState<boolean>(true);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    setFile(selectedFile);
    
    // Create a URL for the PDF preview with better compatibility
    const fileUrl = URL.createObjectURL(selectedFile);
    setPdfUrl(fileUrl);
  };

  const saveDocumentToHistory = (fileName: string, pdfUrl: string | null) => {
    try {
      // Get existing documents or initialize empty array
      const existingDocsJson = localStorage.getItem('paperpicks-documents') || '[]';
      const existingDocs = JSON.parse(existingDocsJson);
      
      // Create new document entry
      const newDoc = {
        id: Date.now().toString(),
        fileName,
        dateAdded: new Date().toLocaleDateString(),
        fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Unknown',
        pdfUrl: pdfUrl
      };
      
      // Add to beginning of array (most recent first)
      const updatedDocs = [newDoc, ...existingDocs];
      
      // Save back to localStorage
      localStorage.setItem('paperpicks-documents', JSON.stringify(updatedDocs));
      
      toast.success('Document saved to history');
    } catch (error) {
      console.error('Error saving to history:', error);
      toast.error('Failed to save document to history');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    
    // Store the PDF URL in session storage for use in the results page
    if (pdfUrl) {
      sessionStorage.setItem('pdfUrl', pdfUrl);
    }
    
    // Store the filename in session storage
    sessionStorage.setItem('fileName', file.name);
    
    // Save to history if enabled
    if (saveToHistory && file.name) {
      saveDocumentToHistory(file.name, pdfUrl);
    }
    
    onUploadSuccess(file, mode);
  };

  return (
    <Card className={`p-8 border-2 ${dragActive ? 'border-primary border-dashed bg-accent/50' : 'border-border'} rounded-xl transition-all duration-300`}>
      <div 
        className="flex flex-col items-center justify-center gap-6"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
          {file ? <FileText className="w-8 h-8 text-primary" /> : <Upload className="w-8 h-8 text-primary" />}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">
            {file ? file.name : "Drag & drop your PDF here"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Or click to browse files"}
          </p>
        </div>
        
        {file && pdfUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> Preview PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>PDF Preview: {file.name}</DialogTitle>
              </DialogHeader>
              <div className="h-full w-full overflow-auto">
                <iframe 
                  src={pdfUrl} 
                  className="w-full h-full" 
                  title="PDF Preview"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Split Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pages">Split by Pages</SelectItem>
              <SelectItem value="headings">Split by Headings</SelectItem>
            </SelectContent>
          </Select>
          
          {!file && (
            <label htmlFor="file-upload" className="w-full sm:w-auto">
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
              />
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <span>Browse</span>
              </Button>
            </label>
          )}
          
          <Button 
            onClick={handleSubmit} 
            disabled={!file}
            className="w-full sm:w-auto"
          >
            {file ? "Generate Summary" : "Upload PDF"}
          </Button>
        </div>
        
        {file && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="save-to-history"
              checked={saveToHistory}
              onChange={() => setSaveToHistory(!saveToHistory)}
              className="h-4 w-4"
            />
            <label htmlFor="save-to-history" className="text-sm text-muted-foreground">
              Save document to history
            </label>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FileUpload;
