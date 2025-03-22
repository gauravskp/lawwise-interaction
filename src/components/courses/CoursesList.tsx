
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users,
  Play,
  BookText,
  Download,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock courses data
const courses = [
  {
    id: 1,
    title: "Introduction to Contract Law",
    description: "Learn the fundamentals of contract law including formation, terms, breaches, and remedies.",
    instructor: "Sarah Johnson, J.D.",
    duration: "3 hours",
    level: "Beginner",
    lessons: 12,
    rating: 4.8,
    students: 1256,
    thumbnail: "bg-gradient-to-br from-blue-600 to-blue-800",
    progress: 0,
    featured: true,
    category: "Business Law"
  },
  {
    id: 2,
    title: "Intellectual Property Rights",
    description: "Understand how to protect your creative work through patents, trademarks, and copyrights.",
    instructor: "Michael Chen, Esq.",
    duration: "4.5 hours",
    level: "Intermediate",
    lessons: 18,
    rating: 4.7,
    students: 894,
    thumbnail: "bg-gradient-to-br from-purple-600 to-purple-800",
    progress: 35,
    featured: false,
    category: "IP Law"
  },
  {
    id: 3,
    title: "Legal Research Techniques",
    description: "Master the skills of effective legal research using digital libraries and databases.",
    instructor: "James Wilson, LL.M.",
    duration: "2.5 hours",
    level: "All Levels",
    lessons: 10,
    rating: 4.5,
    students: 723,
    thumbnail: "bg-gradient-to-br from-green-600 to-green-800",
    progress: 78,
    featured: false,
    category: "Legal Skills"
  },
  {
    id: 4,
    title: "Employment Law Essentials",
    description: "Learn about workplace rights, discrimination laws, and employer obligations.",
    instructor: "Emma Rodriguez, J.D.",
    duration: "5 hours",
    level: "Intermediate",
    lessons: 22,
    rating: 4.9,
    students: 1783,
    thumbnail: "bg-gradient-to-br from-red-600 to-red-800",
    progress: 0,
    featured: true,
    category: "Employment Law"
  }
];

export default function CoursesList() {
  return (
    <div className="w-full">
      {/* Featured course */}
      {courses.filter(course => course.featured)[0] && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Course</h2>
          
          {courses.filter(course => course.featured).map(course => (
            <Card key={course.id} className="overflow-hidden hover-shadow transition-all">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div 
                  className={cn(
                    "aspect-video md:aspect-auto md:h-full flex items-center justify-center",
                    course.thumbnail
                  )}
                >
                  <div className="text-white h-full w-full flex flex-col items-center justify-center">
                    <BookOpen className="h-12 w-12 mb-3" />
                    <p className="text-lg font-medium">{course.category}</p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-2">{course.level}</Badge>
                        <CardTitle className="text-2xl">{course.title}</CardTitle>
                        <CardDescription className="mt-2">{course.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <BookText className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-amber-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">Instructor: {course.instructor}</p>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Button className="w-full sm:w-auto">
                      <Play className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">Download Syllabus</Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* All courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Courses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Card key={course.id} className="overflow-hidden hover-shadow transition-all">
              <div 
                className={cn(
                  "aspect-video flex items-center justify-center relative",
                  course.thumbnail
                )}
              >
                <div className="text-white h-full w-full flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 mb-2" />
                  <p className="font-medium">{course.category}</p>
                </div>
                
                <Badge 
                  className="absolute top-3 right-3"
                  variant="secondary"
                >
                  {course.level}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-3">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookText className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                
                {course.progress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={course.progress > 0 ? "secondary" : "default"}
                >
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
