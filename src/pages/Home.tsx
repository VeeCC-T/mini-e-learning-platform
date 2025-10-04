import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { courses, getCompletedCourses } from "@/lib/courseData";
import { isAuthenticated } from "@/lib/mockAuth";
import { Award } from "lucide-react";

/**
 * Home page - displays all available courses as cards
 * Shows completion status for logged-in users
 * Anyone can view courses without logging in!
 */
const Home = () => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const userLoggedIn = isAuthenticated();

  // Load completed courses if user is logged in
  useEffect(() => {
    if (userLoggedIn) {
      setCompletedCourses(getCompletedCourses());
    }
  }, [userLoggedIn]);

  const completionPercentage = Math.round(
    (completedCourses.length / courses.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Start Your Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully crafted courses and become a master in your field! 🚀
          </p>

          {/* Progress indicator - only show if logged in */}
          {userLoggedIn && completedCourses.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-full border border-border">
              <Award className="h-5 w-5 text-success" />
              <span className="text-sm font-semibold">
                Your Progress: {completedCourses.length}/{courses.length} courses completed
                ({completionPercentage}%)
              </span>
            </div>
          )}

          {/* Call to action for non-logged-in users */}
          {!userLoggedIn && (
            <div className="mt-6 inline-flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-full border border-border">
              <span className="text-sm">
                💡 <strong>Login</strong> to track your progress and earn completion badges!
              </span>
            </div>
          )}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <CourseCard
                course={course}
                isCompleted={userLoggedIn && completedCourses.includes(course.id)}
              />
            </div>
          ))}
        </div>

        {/* Motivational message */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground italic">
            "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
