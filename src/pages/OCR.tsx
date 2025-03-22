
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DocumentScanner from "@/components/ocr/DocumentScanner";
import { FileText, BookText, ShieldCheck } from "lucide-react";

const OCR = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Document Scanner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Extract text from legal documents, contracts, or scanned images for easy analysis and editing.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <DocumentScanner />
          </div>
          
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Use Our Document Scanner?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Extract Text Instantly",
                  description: "Convert scanned documents, images, and PDFs into editable and searchable text with high accuracy."
                },
                {
                  icon: BookText,
                  title: "Analyze Legal Documents",
                  description: "Quickly extract key information from contracts, agreements, and legal forms to find important clauses."
                },
                {
                  icon: ShieldCheck,
                  title: "Secure & Private",
                  description: "Your documents are processed securely and never stored on our servers, ensuring complete privacy."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border hover-shadow"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OCR;
