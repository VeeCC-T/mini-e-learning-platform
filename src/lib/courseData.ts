/**
 * Course data and completion tracking
 * Uses local storage to persist course completion status
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

const COMPLETION_KEY = "elearning_completed_courses";

/**
 * All available courses in our mini e-learning platform
 */
export const courses: Course[] = [
  {
    id: "1",
    title: "Intro to Python",
    description: "Learn the basics of Python programming from scratch",
    longDescription:
      "Master Python fundamentals including variables, functions, loops, and data structures. Perfect for absolute beginners who want to start their coding journey with one of the most popular programming languages.",
    icon: "🐍",
    color: "from-blue-500 to-cyan-500",
    difficulty: "Beginner",
    duration: "4 weeks",
  },
  {
    id: "2",
    title: "Web Development Basics",
    description: "Build your first website with HTML, CSS, and JavaScript",
    longDescription:
      "Dive into web development by learning HTML for structure, CSS for styling, and JavaScript for interactivity. By the end, you'll build responsive websites and understand how the web works.",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    difficulty: "Beginner",
    duration: "6 weeks",
  },
  {
    id: "3",
    title: "AI for Beginners",
    description: "Understand artificial intelligence and machine learning concepts",
    longDescription:
      "Explore the fascinating world of AI and machine learning. Learn about neural networks, deep learning, and how AI is transforming technology. Includes hands-on projects and real-world applications.",
    icon: "🤖",
    color: "from-orange-500 to-red-500",
    difficulty: "Intermediate",
    duration: "8 weeks",
  },
  {
    id: "4",
    title: "React Fundamentals",
    description: "Build modern web apps with React and components",
    longDescription:
      "Learn React, the most popular JavaScript library for building user interfaces. Master components, hooks, state management, and build interactive single-page applications.",
    icon: "⚛️",
    color: "from-teal-500 to-green-500",
    difficulty: "Intermediate",
    duration: "5 weeks",
  },
];

/**
 * Get list of completed course IDs from local storage
 */
export const getCompletedCourses = (): string[] => {
  const completed = localStorage.getItem(COMPLETION_KEY);
  if (completed) {
    try {
      return JSON.parse(completed);
    } catch {
      return [];
    }
  }
  return [];
};

/**
 * Mark a course as completed
 */
export const markCourseComplete = (courseId: string): void => {
  const completed = getCompletedCourses();
  if (!completed.includes(courseId)) {
    completed.push(courseId);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
  }
};

/**
 * Check if a specific course is completed
 */
export const isCourseCompleted = (courseId: string): boolean => {
  return getCompletedCourses().includes(courseId);
};

/**
 * Reset all course completion (useful for testing)
 */
export const resetProgress = (): void => {
  localStorage.removeItem(COMPLETION_KEY);
};
