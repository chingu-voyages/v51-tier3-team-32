import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication state (e.g., clear session, token, etc.)
    setIsAuthenticated(false);

    // Redirect to login page after logging out
    navigate("/login");
  }, [navigate, setIsAuthenticated]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
