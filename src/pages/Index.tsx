import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/mockAuth";

/**
 * Index page - redirects to home or login based on authentication
 */
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if authenticated, otherwise to login
    if (isAuthenticated()) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default Index;
