
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <Scale className="h-6 w-6 text-primary" />
              <span>LegalBuddy</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your AI-powered legal companion. Making legal knowledge accessible to everyone.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-primary transition-colors">
                  Legal Advisor
                </Link>
              </li>
              <li>
                <Link to="/ocr" className="text-muted-foreground hover:text-primary transition-colors">
                  Document Scanner
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Legal Quiz
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/consulting" className="text-muted-foreground hover:text-primary transition-colors">
                  Consulting
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} LegalBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
