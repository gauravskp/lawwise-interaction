
import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Users,
  Star,
  MapPin,
  Languages
} from "lucide-react";
import { addDays, format, startOfWeek, addWeeks, subWeeks, getDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for attorneys
const attorneys = [
  {
    id: 1,
    name: "Jennifer Blackwell",
    specialization: "Corporate Law",
    experience: "15 years",
    rating: 4.9,
    reviews: 124,
    languages: ["English", "Spanish"],
    location: "New York, NY",
    availability: {
      monday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      wednesday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "15:00", "16:00"],
      friday: ["09:00", "10:00", "14:00", "15:00"],
      saturday: ["10:00", "11:00"],
      sunday: []
    },
    avatar: ""
  },
  {
    id: 2,
    name: "Michael Chen",
    specialization: "Intellectual Property",
    experience: "12 years",
    rating: 4.8,
    reviews: 98,
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    availability: {
      monday: ["09:00", "11:00", "13:00", "15:00", "17:00"],
      tuesday: ["10:00", "11:00", "14:00", "16:00"],
      wednesday: ["09:00", "11:00", "13:00", "15:00"],
      thursday: ["10:00", "12:00", "14:00", "16:00"],
      friday: ["09:00", "11:00", "15:00", "17:00"],
      saturday: ["11:00", "13:00"],
      sunday: []
    },
    avatar: ""
  },
  {
    id: 3,
    name: "Sarah Johnson",
    specialization: "Family Law",
    experience: "18 years",
    rating: 4.9,
    reviews: 156,
    languages: ["English", "French"],
    location: "Chicago, IL",
    availability: {
      monday: ["08:00", "10:00", "12:00", "14:00", "16:00"],
      tuesday: ["08:00", "10:00", "14:00", "16:00"],
      wednesday: ["10:00", "12:00", "14:00", "16:00"],
      thursday: ["08:00", "10:00", "12:00", "16:00"],
      friday: ["10:00", "12:00", "14:00"],
      saturday: ["10:00"],
      sunday: []
    },
    avatar: ""
  }
];

// Helper function to get day name
const getDayName = (dateObj: Date) => {
  return format(dateObj, "EEEE").toLowerCase();
};

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAttorney, setSelectedAttorney] = useState(attorneys[0]);
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const { toast } = useToast();

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleNextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1));
  };

  const handlePrevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1));
  };

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    
    toast({
      title: "Consultation Booked!",
      description: `Your appointment with ${selectedAttorney.name} is confirmed for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
    });
    
    // Reset selections
    setSelectedTime(null);
  };

  // Get available times for selected date
  const getAvailableTimes = (date: Date | undefined) => {
    if (!date) return [];
    
    const dayName = getDayName(date);
    return selectedAttorney.availability[dayName as keyof typeof selectedAttorney.availability] || [];
  };

  const availableTimes = selectedDate ? getAvailableTimes(selectedDate) : [];

  // Generate time slots for the week view
  const getTimeSlots = (day: Date) => {
    const dayName = getDayName(day);
    const times = selectedAttorney.availability[dayName as keyof typeof selectedAttorney.availability] || [];
    
    // Only show first 3 slots in week view + indicator if there are more
    const visibleSlots = times.slice(0, 3);
    const hasMoreSlots = times.length > 3;
    
    return { visibleSlots, hasMoreSlots, totalSlots: times.length };
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="attorneys">Choose Attorney</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attorneys" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attorneys.map((attorney) => (
              <Card 
                key={attorney.id}
                className={cn(
                  "hover-shadow cursor-pointer transition-all",
                  selectedAttorney.id === attorney.id && "border-primary ring-1 ring-primary"
                )}
                onClick={() => setSelectedAttorney(attorney)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback>
                        {attorney.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                      {attorney.avatar && <AvatarImage src={attorney.avatar} alt={attorney.name} />}
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{attorney.name}</CardTitle>
                      <CardDescription>{attorney.specialization}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Star className="mr-2 h-4 w-4 text-amber-500" />
                      <span className="font-medium">{attorney.rating}</span>
                      <span className="text-muted-foreground ml-1">({attorney.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{attorney.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{attorney.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{attorney.languages.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button
                    variant={selectedAttorney.id === attorney.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {selectedAttorney.id === attorney.id ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Selected
                      </>
                    ) : (
                      "Select"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Week view */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Available Slots</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <span className="text-sm">
                        {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
                      </span>
                      <Button variant="outline" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {weekDays.map((day) => (
                      <div
                        key={day.toString()}
                        className={cn(
                          "flex flex-col items-center p-2 rounded-md border text-center",
                          getDay(day) === 0 || getDay(day) === 6 ? "bg-secondary/50" : "",
                          selectedDate && format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                            ? "border-primary bg-primary/5"
                            : ""
                        )}
                        onClick={() => handleSelectDate(day)}
                      >
                        <div className="text-sm font-medium mb-1">
                          {format(day, "EEE")}
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full mb-2">
                          {format(day, "d")}
                        </div>
                        
                        {/* Time slots */}
                        <div className="w-full space-y-1 mt-1">
                          {(() => {
                            const { visibleSlots, hasMoreSlots, totalSlots } = getTimeSlots(day);
                            
                            return (
                              <>
                                {visibleSlots.map((time) => (
                                  <div 
                                    key={time}
                                    className="text-xs bg-secondary px-2 py-1 rounded"
                                  >
                                    {time}
                                  </div>
                                ))}
                                
                                {hasMoreSlots && (
                                  <div className="text-xs text-muted-foreground">
                                    +{totalSlots - visibleSlots.length} more
                                  </div>
                                )}
                                
                                {totalSlots === 0 && (
                                  <div className="text-xs text-muted-foreground">
                                    No slots
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Time slot selection */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Select Time
                  </CardTitle>
                  <CardDescription>
                    {selectedDate ? (
                      availableTimes.length > 0 ? (
                        `Available slots for ${format(selectedDate, "EEEE, MMMM d, yyyy")}`
                      ) : (
                        `No available slots for ${format(selectedDate, "EEEE, MMMM d, yyyy")}`
                      )
                    ) : (
                      "Please select a date first"
                    )}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {selectedDate && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={cn(
                              "h-12",
                              selectedTime === time && "ring-2 ring-primary ring-offset-2"
                            )}
                            onClick={() => handleSelectTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-muted-foreground">
                          No available slots for this date. Please select another date.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Booking summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Consultation Details</CardTitle>
                  <CardDescription>
                    Book your legal consultation
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback>
                        {selectedAttorney.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                      {selectedAttorney.avatar && (
                        <AvatarImage 
                          src={selectedAttorney.avatar} 
                          alt={selectedAttorney.name} 
                        />
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedAttorney.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAttorney.specialization}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Date & Time</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                format(selectedDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleSelectDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedTime && "text-muted-foreground"
                        )}
                        disabled={!selectedDate || availableTimes.length === 0}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {selectedTime ? (
                          <span>{selectedTime}</span>
                        ) : (
                          <span>Pick a time</span>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Consultation Type</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="border-primary bg-primary/5 justify-start"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="M10 4v4" />
                          <path d="M2 8h20" />
                          <path d="M6 4v4" />
                        </svg>
                        Video Call
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Phone Call
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Duration</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Consultation Fee</span>
                      <Badge variant="outline" className="font-medium">
                        $150
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-2">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleBookAppointment}
                  >
                    Book Consultation
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By booking, you agree to our terms and cancellation policy.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
