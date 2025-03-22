
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoursesList from "@/components/courses/CoursesList";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  "All Categories",
  "Business Law",
  "IP Law",
  "Employment Law",
  "Family Law",
  "Criminal Law",
  "Legal Skills"
];

const filters = [
  { name: "Level", options: ["Beginner", "Intermediate", "Advanced", "All Levels"] },
  { name: "Duration", options: ["< 2 hours", "2-5 hours", "5-10 hours", "> 10 hours"] },
  { name: "Rating", options: ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"] }
];

const Courses = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Legal Courses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your legal knowledge with comprehensive courses taught by experienced legal professionals.
            </p>
          </div>
          
          {/* Search & Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for courses..." 
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-y-4 gap-x-6">
              <div className="flex flex-nowrap overflow-x-auto pb-2 hide-scrollbar gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={category}
                    variant={index === 0 ? "default" : "outline"}
                    className="whitespace-nowrap"
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-nowrap overflow-x-auto pb-2 hide-scrollbar gap-3">
                {filters.map((filter) => (
                  <Badge 
                    key={filter.name}
                    variant="outline" 
                    className={cn(
                      "px-3 py-1 cursor-pointer hover:bg-secondary",
                      "flex items-center gap-1 whitespace-nowrap"
                    )}
                  >
                    {filter.name}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Courses List */}
          <CoursesList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
