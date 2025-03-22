
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingCalendar from "@/components/consulting/BookingCalendar";
import { Shield, BookOpen, HeadphonesIcon, Users } from "lucide-react";

const Consulting = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Legal Consulting
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book personalized consultations with expert attorneys for professional legal advice tailored to your needs.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto mb-16">
            <BookingCalendar />
          </div>
          
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Choose Our Legal Consulting Service?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Users,
                  title: "Expert Attorneys",
                  description: "Connect with highly experienced lawyers specializing in various legal fields, from corporate law to family disputes."
                },
                {
                  icon: HeadphonesIcon,
                  title: "Flexible Consultations",
                  description: "Choose between video calls or phone consultations based on your preference and convenience."
                },
                {
                  icon: BookOpen,
                  title: "Comprehensive Advice",
                  description: "Receive detailed guidance on your specific legal matters, documents review, and actionable next steps."
                },
                {
                  icon: Shield,
                  title: "Secure & Confidential",
                  description: "All consultations are conducted through secure channels with strict confidentiality protection."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border hover-shadow flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-secondary p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-center">
                Consultation Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    number: "01",
                    title: "Book a Time Slot",
                    description: "Select your preferred attorney, date, and consultation format."
                  },
                  {
                    number: "02",
                    title: "Provide Case Details",
                    description: "Share basic information about your legal matter before the consultation."
                  },
                  {
                    number: "03",
                    title: "Receive Expert Advice",
                    description: "Discuss your case and get professional legal guidance and next steps."
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-background p-6 rounded-lg h-full">
                      <div className="text-4xl font-bold text-primary/20 mb-3">
                        {step.number}
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-muted-foreground/30">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consulting;
