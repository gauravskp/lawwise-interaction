
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  BarChart3, 
  ShieldCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimonials */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Trusted by Legal Professionals and Businesses
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our users have to say about LegalBuddy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Client {i}</h4>
                      <p className="text-sm text-muted-foreground">Law Firm</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "LegalBuddy has transformed how we handle routine legal inquiries, saving us countless hours while ensuring our clients get accurate information instantly."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Why Choose LegalBuddy?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Our platform combines cutting-edge AI technology with legal expertise to provide you with reliable, accessible, and efficient legal assistance.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Powered by advanced AI for accurate legal information",
                    "Secure and confidential handling of your data",
                    "Intuitive interface for seamless user experience",
                    "Comprehensive legal resources all in one place",
                    "Expert-verified content and continuous updates"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="mt-8 rounded-full">
                  <Link to="/chatbot">
                    Start Using LegalBuddy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border hover-shadow">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                    <p className="text-muted-foreground">
                      Your data is encrypted and handled with the highest security standards.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border hover-shadow">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Data-Driven</h3>
                    <p className="text-muted-foreground">
                      Leverage analytics to gain insights and improve your legal knowledge.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 mt-12">
                  <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border hover-shadow">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                    <p className="text-muted-foreground">
                      Connect with legal professionals for personalized consultation.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary to-legal-600 p-6 rounded-xl shadow-sm text-white hover-shadow">
                    <h3 className="text-xl font-semibold mb-2">Get Started Today</h3>
                    <p className="text-white/80 mb-4">
                      Join thousands of satisfied users who trust LegalBuddy.
                    </p>
                    <Button variant="secondary" asChild size="sm">
                      <Link to="/chatbot">Try Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-legal-700 to-legal-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Transform Your Legal Experience?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Join LegalBuddy today and experience the future of legal assistance - intelligent, accessible, and efficient.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full">
                <Link to="/chatbot">Try Legal Advisor</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
