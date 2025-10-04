import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Index page - redirects to home page
 * No login required to view courses!
 */
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Always go to home - anyone can browse courses
    navigate("/home");
  }, [navigate]);

  return null;
};

export default Index;
