import { Link } from "react-router-dom";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/lib/courseData";

/**
 * CourseCard component - displays a single course as an interactive card
 * Props:
 * - course: The course data to display
 * - isCompleted: Whether the user has completed this course
 */
interface CourseCardProps {
  course: Course;
  isCompleted: boolean;
}

const CourseCard = ({ course, isCompleted }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20 animate-scale-in">
        {/* Completion badge - shown in top right if course is completed */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10 bg-success text-success-foreground px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-lg">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </div>
        )}

        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

        <div className="relative p-6">
          {/* Course icon */}
          <div className="text-5xl mb-4 animate-float">
            {course.icon}
          </div>

          {/* Course title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Course description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Course metadata badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="text-xs gap-1">
              <TrendingUp className="h-3 w-3" />
              {course.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs gap-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </Badge>
          </div>

          {/* Call to action */}
          <div className="text-sm font-semibold text-primary group-hover:underline">
            {isCompleted ? "Review Course →" : "Start Learning →"}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
