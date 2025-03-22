
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 md:pb-24 lg:pb-32">
      {/* Background pattern/gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-legal-100/20 dark:from-primary/10 dark:to-background z-0"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in">
            <span>AI-Powered Legal Assistant</span>
          </div>
          
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Your <span className="text-gradient">Intelligent</span> Legal Companion
          </h1>
          
          <p className="animate-fade-in animate-delay-100 mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Get instant legal assistance, scan documents, test your knowledge, and book consultations with experts - all in one platform.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-200">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link to="/chatbot">
                Try the Legal Advisor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link to="/courses">
                Explore Courses
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="mt-16 max-w-5xl mx-auto animate-fade-in animate-delay-300">
          <div className="relative">
            <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-2xl">
              <div className="bg-gradient-to-br from-legal-700 to-legal-500 w-full h-full flex items-center justify-center">
                <div className="glass p-8 rounded-xl text-white text-center">
                  <h2 className="text-2xl font-bold mb-4">AI-Powered Legal Assistance</h2>
                  <p className="text-white/80">
                    Discover how LegalBuddy can help you navigate complex legal matters with ease.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div 
              className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-legal-300 blur-2xl opacity-60 dark:opacity-30"
              aria-hidden="true"
            />
            <div 
              className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary blur-2xl opacity-60 dark:opacity-30"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
