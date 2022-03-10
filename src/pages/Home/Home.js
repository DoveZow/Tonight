import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "react-bootstrap";

const Home = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const currentEmail = currentUser.email;

  console.log(currentEmail);
  const getUserCredentials = async () => {
    try {
      const body = { currentEmail };
      const response = await fetch("http://localhost:3002/getcredit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const jsonData = await response.json();

      setName(jsonData.uname);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  return (
    <div className="outer-div center-content">
      <div className="inner-div center-content">
        <h2>
          Welcome, user <span className="text-blue">{name}</span>{" "}
        </h2>
      </div>
    </div>
  );
};

export default Home;
