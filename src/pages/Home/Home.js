import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "react-bootstrap";

const Home = () => {
  const { currentUser } = useAuth()
  return (
    <div className="outer-div center-content">
      <div className="inner-div center-content">
        <h2>Welcome, user {currentUser && currentUser.email} </h2>
      </div>
    </div>
  );
};

export default Home;
