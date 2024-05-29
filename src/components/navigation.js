import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/pelaksana">Pelaksana</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
