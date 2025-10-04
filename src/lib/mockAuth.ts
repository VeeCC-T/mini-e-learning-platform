/**
 * Mock Authentication Utility
 * Uses local storage to simulate user authentication
 * In a real app, this would connect to a backend API
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = "elearning_user";

// Mock user database (in a real app, this would be on a server)
const mockUsers = [
  { id: "1", email: "student@example.com", password: "password123", name: "Alex Student" },
  { id: "2", email: "learner@example.com", password: "learn123", name: "Jordan Learner" },
];

/**
 * Login function - checks credentials and stores user in local storage
 */
export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const userToStore = { id: user.id, email: user.email, name: user.name };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    return userToStore;
  }

  return null;
};

/**
 * Signup function - creates a new user and stores in local storage
 */
export const signup = (email: string, password: string, name: string): User => {
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

/**
 * Get currently logged-in user from local storage
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Logout function - removes user from local storage
 */
export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
