
import { useState, useEffect } from "react";
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  RefreshCw,
  Award,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT an essential element of a valid contract?",
    options: [
      "Offer and acceptance",
      "Consideration",
      "Legal purpose",
      "Written documentation"
    ],
    correctAnswer: "Written documentation",
    explanation: "A valid contract requires offer, acceptance, consideration, and legal purpose. While written documentation helps prove a contract's existence, many contracts can be legally binding even when made verbally or implied by conduct."
  },
  {
    id: 2,
    question: "What does 'fair use' refer to in copyright law?",
    options: [
      "Using copyrighted work with proper attribution",
      "Limited use of copyrighted material without permission for purposes like criticism, education, or research",
      "Using copyrighted work after paying a standard fee",
      "The right to use any material found in the public domain"
    ],
    correctAnswer: "Limited use of copyrighted material without permission for purposes like criticism, education, or research",
    explanation: "Fair use is a legal doctrine that permits limited use of copyrighted material without acquiring permission from the rights holders for purposes such as criticism, comment, news reporting, teaching, scholarship, or research."
  },
  {
    id: 3,
    question: "In property law, what is an easement?",
    options: [
      "A tax benefit for property owners",
      "A right to use another person's land for a specific purpose",
      "A legal restriction on modifying historic buildings",
      "A payment arrangement for purchasing property"
    ],
    correctAnswer: "A right to use another person's land for a specific purpose",
    explanation: "An easement is a legal right to use another person's land for a specific purpose, such as a pathway or driveway access, while the land's owner retains title to the property."
  },
  {
    id: 4,
    question: "What is the standard of proof in most civil cases in the United States?",
    options: [
      "Beyond a reasonable doubt",
      "Clear and convincing evidence",
      "Preponderance of the evidence",
      "Substantial evidence"
    ],
    correctAnswer: "Preponderance of the evidence",
    explanation: "In most civil cases, the standard of proof is 'preponderance of the evidence,' meaning the facts are more likely than not (greater than 50% probability) to be true as presented by the plaintiff."
  },
  {
    id: 5,
    question: "Which legal concept refers to a court's obligation to follow precedents established by higher courts?",
    options: [
      "Stare decisis",
      "Res judicata",
      "Habeas corpus",
      "Respondeat superior"
    ],
    correctAnswer: "Stare decisis",
    explanation: "Stare decisis is the legal principle that obligates courts to follow precedents established by prior decisions, particularly those from higher courts in the same jurisdiction."
  }
];

export default function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds per question
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (quizCompleted || !timerActive) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isAnswered) {
            handleSubmitAnswer();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timerActive, isAnswered, quizCompleted]);

  useEffect(() => {
    // Reset timer when moving to next question
    setTimeRemaining(60);
    setTimerActive(true);
  }, [currentQuestion]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    setTimerActive(false);
    setIsAnswered(true);
    
    const currentQuizQuestion = quizQuestions[currentQuestion];
    if (selectedOption === currentQuizQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeRemaining(60);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate progress
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // If quiz is completed, show results
  if (quizCompleted) {
    const scorePercentage = (score / quizQuestions.length) * 100;
    
    return (
      <Card className="w-full shadow-md overflow-hidden">
        <CardHeader className="text-center bg-primary text-white">
          <CardTitle className="text-2xl flex items-center justify-center">
            <Award className="mr-2 h-6 w-6" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-8 pb-4 px-6">
          <div className="text-center mb-8">
            <div 
              className={cn(
                "inline-flex items-center justify-center",
                "w-24 h-24 rounded-full mb-4 text-3xl font-bold",
                scorePercentage >= 70 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}
            >
              {score}/{quizQuestions.length}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {scorePercentage >= 80 ? "Excellent!" : 
               scorePercentage >= 60 ? "Good Job!" : 
               "Keep Learning!"}
            </h3>
            <p className="text-muted-foreground">
              {scorePercentage >= 80 ? "You have an excellent understanding of legal concepts." : 
               scorePercentage >= 60 ? "You have a good grasp of legal basics with room to grow." : 
               "You're on your way to understanding legal concepts better."}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Score: {scorePercentage.toFixed(0)}%</span>
              <span>Questions: {quizQuestions.length}</span>
              <span>Correct: {score}</span>
            </div>
            
            <Progress value={scorePercentage} className="h-2" />
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 pb-8 flex justify-center">
          <Button 
            onClick={restartQuiz}
            size="lg"
            className="rounded-full px-8"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Take Quiz Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <Card className="w-full shadow-md overflow-hidden">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-primary" />
            <CardTitle>Legal Knowledge Quiz</CardTitle>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-1 h-4 w-4" />
            <span className={timeRemaining < 10 ? "text-red-500 font-bold" : ""}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4 px-6">
        <div className="flex justify-between items-center text-sm mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>Score: {score}/{quizQuestions.length}</span>
        </div>
        
        <Progress value={progress} className="h-1 mb-6" />
        
        <h2 className="text-xl font-medium mb-6">{currentQuizQuestion.question}</h2>
        
        <RadioGroup
          value={selectedOption}
          className="space-y-3"
          disabled={isAnswered}
        >
          {currentQuizQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors",
                isAnswered && option === currentQuizQuestion.correctAnswer
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  : isAnswered && option === selectedOption && option !== currentQuizQuestion.correctAnswer
                  ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  : selectedOption === option
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted/50"
              )}
              onClick={() => handleOptionSelect(option)}
            >
              <RadioGroupItem value={option} id={`option-${index}`} className="invisible" />
              <Label 
                htmlFor={`option-${index}`}
                className="flex-grow cursor-pointer font-normal"
              >
                {option}
              </Label>
              {isAnswered && option === currentQuizQuestion.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
              {isAnswered && option === selectedOption && option !== currentQuizQuestion.correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {isAnswered && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h4 className="font-medium mb-1">Explanation:</h4>
            <p className="text-muted-foreground text-sm">
              {currentQuizQuestion.explanation}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t bg-secondary/30 px-6 py-4">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmitAnswer}
            className="w-full"
            disabled={!selectedOption}
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNextQuestion}
            className="w-full"
          >
            {currentQuestion < quizQuestions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "View Results"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
