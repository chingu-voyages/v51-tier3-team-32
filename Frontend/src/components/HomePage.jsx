import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const HomePage = ({ groups }) => {
  return (
    <div>
      <h2>My Groups</h2>
      <Link to="/create-group">Create Group</Link>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            <h3>{group.name}</h3>
            <ul>
              {group.members.map((member, idx) => (
                <li key={idx}>{member.name}: {member.proportion * 100}%</li>
              ))}
            </ul>
            <Link to={`/add-expense/${index}`}>Add Expense</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
