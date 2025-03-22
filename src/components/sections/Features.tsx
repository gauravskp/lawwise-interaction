
import { 
  MessageSquareText,
  ScanText,
  HelpCircle,
  BookOpen,
  Calendar,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "Legal Advisor Chatbot",
    description: "Get instant answers to your legal questions with our AI-powered chatbot.",
    icon: MessageSquareText,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    path: "/chatbot"
  },
  {
    name: "Document Scanner",
    description: "Extract text from legal documents and contracts for easy analysis.",
    icon: ScanText,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    path: "/ocr"
  },
  {
    name: "Legal Quiz",
    description: "Test and enhance your legal knowledge with interactive quizzes.",
    icon: HelpCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    path: "/quiz"
  },
  {
    name: "Legal Courses",
    description: "Learn about various legal topics through structured courses and resources.",
    icon: BookOpen,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    path: "/courses"
  },
  {
    name: "Expert Consulting",
    description: "Book one-on-one consultations with experienced legal professionals.",
    icon: Calendar,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    path: "/consulting"
  },
  {
    name: "Personalized Assistance",
    description: "Get tailored legal insights based on your preferences and previous interactions.",
    icon: Bot,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    path: "/chatbot"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Comprehensive Legal Solutions
          </h2>
          <p className="text-xl text-muted-foreground">
            All the tools you need to navigate legal matters efficiently and confidently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              to={feature.path}
              className={cn(
                "group relative overflow-hidden rounded-xl p-6 hover-shadow",
                "bg-white dark:bg-gray-900/50",
                "border border-border hover:border-primary/20",
                "transition-all duration-300"
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className={cn(
                    "mb-4 w-12 h-12 rounded-lg flex items-center justify-center",
                    feature.bgColor
                  )}
                >
                  <feature.icon className={cn("h-6 w-6", feature.color)} />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.name}
                </h3>
                
                <p className="text-muted-foreground flex-grow">
                  {feature.description}
                </p>
                
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  <span className="mr-2">Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
              
              {/* Background decoration */}
              <div 
                className="absolute right-0 top-0 h-24 w-24 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
