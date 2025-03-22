
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/chatbot/ChatInterface";

const Chatbot = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Legal Advisor Chatbot
              </h1>
              <p className="text-lg text-muted-foreground">
                Get instant answers to your legal questions from our AI-powered legal assistant.
              </p>
            </div>
            
            <ChatInterface />
            
            <div className="mt-8 bg-secondary/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">About Our Legal Chatbot</h2>
              <p className="text-muted-foreground mb-4">
                Our AI-powered legal assistant provides general legal information to help you understand basic legal concepts and point you in the right direction. While it's a powerful tool, please note:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>The information provided is for general guidance only and should not be considered as legal advice.</li>
                <li>For specific legal issues, we recommend consulting with a qualified attorney.</li>
                <li>Laws vary by jurisdiction, so always verify information for your specific location.</li>
                <li>For complex legal matters, you can book a consultation with one of our expert attorneys.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
