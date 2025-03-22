
import { useState } from "react";
import { 
  Send, 
  Bot, 
  User,
  Loader2
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock initial messages
const initialMessages = [
  {
    id: 1,
    content: "Hello! I'm your LegalBuddy AI assistant. How can I help you with legal matters today?",
    sender: "bot",
    timestamp: new Date().toISOString(),
  },
];

// Mock legal topics for suggestions
const legalTopics = [
  "Contract law basics",
  "Tenant rights",
  "Employment law",
  "Intellectual property",
  "Small claims process",
  "Family law questions"
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock response from the legal chatbot
      const botResponses = {
        "contract law basics": "Contracts require offer, acceptance, consideration, and legal intent to be valid. Key elements include: parties' identities, subject matter, terms and conditions, consideration, and signatures. Always read before signing, and consider legal review for important agreements.",
        "tenant rights": "Tenant rights typically include the right to habitable housing, privacy, security deposit protection, and protection against unlawful discrimination. Laws vary by location, so check your local regulations for specific protections in your area.",
        "employment law": "Employment law covers workplace rights including minimum wage, overtime, anti-discrimination protections, workplace safety, and leave entitlements. Both employers and employees have specific rights and responsibilities under these laws.",
        "intellectual property": "Intellectual property includes copyrights (creative works), patents (inventions), trademarks (brand identifiers), and trade secrets. Protection methods vary by type, with registration requirements depending on the IP category and jurisdiction.",
        "small claims process": "Small claims courts handle minor civil disputes up to certain monetary limits (typically $5,000-$10,000). The process involves filing a complaint, paying fees, serving the defendant, attending a hearing, and receiving judgment - all without requiring an attorney.",
        "family law questions": "Family law encompasses marriage, divorce, child custody, support, adoption, and domestic violence issues. These matters are highly location-specific, with procedures and rights varying significantly by jurisdiction.",
        "default": "I'd be happy to help with your legal question. In general, legal matters depend on your jurisdiction, as laws vary by country, state, and sometimes local regulations. For specific legal advice tailored to your situation, it's advisable to consult with a qualified attorney in your area.",
      };
      
      // Determine which response to show based on query
      let responseContent = botResponses.default;
      Object.keys(botResponses).forEach(key => {
        if (userMessage.content.toLowerCase().includes(key)) {
          responseContent = botResponses[key as keyof typeof botResponses];
        }
      });

      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        content: responseContent,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleTopicClick = (topic: string) => {
    setInputValue(topic);
  };

  return (
    <Card className="w-full h-[70vh] overflow-hidden flex flex-col shadow-md">
      <CardHeader className="bg-secondary pb-4 border-b">
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          LegalBuddy Assistant
        </CardTitle>
        <CardDescription>
          Ask any legal question, and I'll provide general information to help guide you.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-0">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[80%] animate-fade-in",
                message.sender === "user" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "flex items-start space-x-2 rounded-xl p-3",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {message.sender === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="text-sm">{message.content}</div>
                  <div className="mt-1 text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mr-auto w-max">
              <div className="bg-secondary rounded-xl p-3 flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing your question...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Suggested topics */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 py-2 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Suggested topics:</p>
          <div className="flex flex-wrap gap-2">
            {legalTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            placeholder="Type your legal question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
