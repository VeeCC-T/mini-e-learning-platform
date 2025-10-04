import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  courses,
  isCourseCompleted,
  markCourseComplete,
} from "@/lib/courseData";
import { isAuthenticated } from "@/lib/mockAuth";
import { ArrowLeft, CheckCircle2, Clock, TrendingUp, BookOpen } from "lucide-react";
import { toast } from "sonner";

/**
 * Course Details page - shows detailed information about a single course
 * Allows users to mark the course as completed
 */
const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // Find the course by ID
  const course = courses.find((c) => c.id === id);

  // Load completion status
  useEffect(() => {
    if (course) {
      setIsCompleted(isCourseCompleted(course.id));
    }
  }, [course]);

  // Handle marking course as complete
  const handleMarkComplete = () => {
    if (!course) return;

    // Check if user is logged in
    const userLoggedIn = isAuthenticated();
    if (!userLoggedIn) {
      toast.error("Please login to track your progress", {
        description: "Click the login button in the header",
      });
      return;
    }

    if (isCompleted) {
      toast.info("You've already completed this course! 🎉");
      return;
    }

    markCourseComplete(course.id);
    setIsCompleted(true);
    toast.success("Congratulations! Course marked as completed! 🎊", {
      description: "Keep up the great work!",
    });
  };

  // Show error if course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found 😕</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <Card className="p-8 animate-scale-in">
          {/* Course icon and title */}
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl animate-float">{course.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {course.title}
              </h1>

              {/* Course metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {course.difficulty}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </Badge>
                {isCompleted && (
                  <Badge className="bg-success hover:bg-success gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                )}
              </div>

              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>
          </div>

          {/* Gradient divider */}
          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${course.color} mb-6`} />

          {/* Course details section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                About This Course
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.longDescription}
              </p>
            </div>

            {/* What you'll learn section */}
            <div>
              <h2 className="text-xl font-semibold mb-3">What You'll Learn 📚</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Master the fundamentals and core concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Build real-world projects from scratch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Learn best practices and industry standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Get ready for advanced topics and career growth</span>
                </li>
              </ul>
            </div>

            {/* Complete course button */}
            <div className="pt-4">
              <Button
                onClick={handleMarkComplete}
                size="lg"
                className={`w-full md:w-auto gap-2 ${
                  isCompleted
                    ? "bg-success hover:bg-success/90"
                    : "bg-gradient-to-r from-primary to-accent hover:opacity-90"
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
                {isCompleted ? "Course Completed! 🎉" : "Mark as Completed"}
              </Button>

              {!isCompleted && (
                <p className="text-sm text-muted-foreground mt-2">
                  Click when you've finished all the lessons!
                </p>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CourseDetails;
