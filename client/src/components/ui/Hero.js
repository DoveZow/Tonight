import React, { useState } from "react";
import "./Hero.css";

const Hero = ({ username, isAuthenticated }) => {
  let heroHeader = "";

  if (isAuthenticated) {
    heroHeader = `Hello, ${username}`;
  } else {
    heroHeader = "Welcome to Tonight";
  }
  return (
    <div className="hero-container  width-100">
      <div className="hero center-content text-white">
        <div className="hero-text">
          <h2>{heroHeader}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
