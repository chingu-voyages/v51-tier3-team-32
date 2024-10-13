import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]); // Store registered users
  const [loggedInUser, setLoggedInUser] = useState(null); // Track the current logged in user
  const [groups, setGroups] = useState([]);

  const handleLogin = (username, password) => {
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      setLoggedInUser(user.username);
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleRegister = (username, password) => {
    const userExists = registeredUsers.some(user => user.username === username);
    if (!userExists) {
      setRegisteredUsers([...registeredUsers, { username, password }]);
      alert("Registration successful. Please log in.");
    } else {
      alert("Username already exists. Please choose another one.");
    }
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <nav>
              <span>Welcome, {loggedInUser}</span>
              <Link to="/">HomePage</Link>
              <Link to="/logout">Logout</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage groups={groups} />} />
              <Route path="/create-group" element={<CreateGroup groups={groups} setGroups={setGroups} />} />
              <Route path="/add-expense/:groupId" element={<AddExpense groups={groups} setGroups={setGroups} />} />
              <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
