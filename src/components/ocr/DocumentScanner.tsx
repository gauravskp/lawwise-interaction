
import { useState } from "react";
import { 
  Upload, 
  Copy, 
  ScanText, 
  X, 
  Check, 
  Edit3,
  Loader2,
  FileText,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function DocumentScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF) or PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For PDFs, just show an icon or placeholder
      setFilePreview(null);
    }
  };

  const handleScanDocument = () => {
    if (!file) return;
    
    setIsLoading(true);
    // Simulate OCR processing
    setTimeout(() => {
      // Generate mock extracted text based on file name
      const documentTypes = {
        contract: "CONTRACT AGREEMENT\n\nThis Agreement (the \"Agreement\") is entered into as of [DATE] by and between:\n\nParty A: [COMPANY NAME], a corporation organized under the laws of [STATE/COUNTRY] with its principal place of business at [ADDRESS] (\"Company\")\n\nAND\n\nParty B: [NAME], residing at [ADDRESS] (\"Contractor\")\n\n1. SERVICES\nContractor agrees to perform the following services: [DESCRIPTION OF SERVICES]\n\n2. TERM\nThis Agreement shall commence on [START DATE] and continue until [END DATE], unless terminated earlier.\n\n3. COMPENSATION\nCompany shall pay Contractor [AMOUNT] per [HOUR/PROJECT/etc.].",
        resume: "PROFESSIONAL RESUME\n\nJOHN DOE\n123 Main Street • City, State ZIP • (555) 123-4567 • john.doe@email.com\n\nPROFESSIONAL SUMMARY\nDedicated and detail-oriented legal professional with over 10 years of experience in contract law and corporate compliance. Proven track record of negotiating complex agreements and ensuring regulatory adherence.\n\nEXPERIENCE\nSenior Legal Counsel | XYZ Corporation | Jan 2018 - Present\n• Oversee all corporate legal matters including contracts, compliance, and intellectual property\n• Reduced litigation costs by 35% through implementation of new risk management protocols\n• Negotiated and finalized over 200 vendor and partnership agreements",
        invoice: "INVOICE\n\nInvoice #: 12345\nDate: January 15, 2023\n\nFrom:\nLaw Firm LLP\n456 Legal Avenue\nCity, State ZIP\nPhone: (555) 987-6543\n\nTo:\nClient Company Inc.\n789 Business Blvd\nCity, State ZIP\n\nService Description:\n- Legal consultation (3 hours): $750\n- Contract review and revision: $1,200\n- Trademark filing preparation: $900\n\nSubtotal: $2,850\nTax (8%): $228\nTotal Due: $3,078\n\nPayment Terms: Due within 30 days\nPayment Methods: Bank transfer, check, or credit card",
      };
      
      let mockText = "Sample extracted text from your document.\n\nThis is placeholder content since this is a frontend demo without actual OCR processing.\n\nIn a real application, this text would be extracted from your document using OCR technology.";
      
      // Try to match the file name to document types
      const fileName = file.name.toLowerCase();
      if (fileName.includes('contract') || fileName.includes('agreement')) {
        mockText = documentTypes.contract;
      } else if (fileName.includes('resume') || fileName.includes('cv')) {
        mockText = documentTypes.resume;
      } else if (fileName.includes('invoice') || fileName.includes('bill')) {
        mockText = documentTypes.invoice;
      }
      
      setExtractedText(mockText);
      setIsLoading(false);
      
      toast({
        title: "Document scanned successfully",
        description: "The text has been extracted from your document.",
      });
    }, 2000);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setExtractedText("");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: "Text copied",
      description: "The extracted text has been copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "extracted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "File downloaded",
      description: "The extracted text has been downloaded as a text file.",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ScanText className="mr-2 h-5 w-5 text-primary" />
          Document Scanner
        </CardTitle>
        <CardDescription>
          Upload a document to extract its text content using OCR technology.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload area */}
        {!file && (
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center",
              "hover:bg-muted/50 transition-colors cursor-pointer"
            )}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-1">Upload a Document</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF, PDF (up to 5MB)
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/png,image/gif,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
        
        {/* Preview area */}
        {file && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded bg-secondary flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{file.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB • {file.type}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {filePreview && (
              <div className="border rounded-lg overflow-hidden max-h-64">
                <img
                  src={filePreview}
                  alt="Document preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            {!extractedText && (
              <Button 
                className="w-full"
                size="lg"
                onClick={handleScanDocument}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ScanText className="mr-2 h-4 w-4" />
                    Scan Document
                  </>
                )}
              </Button>
            )}
          </div>
        )}
        
        {/* Extracted text area */}
        {extractedText && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Extracted Text</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyText}
                  className="flex items-center"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center"
                >
                  {isEditing ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Done
                    </>
                  ) : (
                    <>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {isEditing ? (
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            ) : (
              <div className="border rounded-lg p-4 bg-secondary/50 min-h-[200px] whitespace-pre-wrap font-mono text-sm overflow-auto">
                {extractedText}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t bg-secondary/30 p-4 text-sm text-muted-foreground">
        <p>
          <span className="text-primary">Pro Tip:</span> For best results, ensure your document is well-lit and clearly visible. Text extraction works best on typed documents with clear fonts.
        </p>
      </CardFooter>
    </Card>
  );
}
