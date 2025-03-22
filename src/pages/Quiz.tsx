
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuizInterface from "@/components/quiz/QuizInterface";
import { BookOpen, HelpCircle, Brain } from "lucide-react";

const Quiz = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Legal Knowledge Quiz
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test and enhance your legal knowledge with our interactive quizzes on various legal topics.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-16">
            <QuizInterface />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Test Your Legal Knowledge?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Learn Through Testing",
                  description: "Active recall through quizzes helps cement legal concepts in your memory more effectively than passive reading."
                },
                {
                  icon: HelpCircle,
                  title: "Identify Knowledge Gaps",
                  description: "Discover areas where your legal understanding needs improvement and focus your learning accordingly."
                },
                {
                  icon: Brain,
                  title: "Build Confidence",
                  description: "Regular practice builds your confidence in understanding and discussing legal matters in professional settings."
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
            
            <div className="mt-12 text-center">
              <p className="text-lg">
                Ready to challenge yourself with more legal quizzes?
              </p>
              <p className="text-muted-foreground mt-2">
                Explore our collection of specialized quizzes on contract law, intellectual property, 
                employment law, and many more legal topics.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
