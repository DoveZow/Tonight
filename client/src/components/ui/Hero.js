import React, { useState } from "react";
import "./Hero.css";

const Hero = ({ username }) => {
  let heroheader = "Welcome to Tonight";

  return (
    <div className="hero-container  width-100">
      <div className="hero center-content text-white">
        <div className="hero-text">
          <h2>{heroheader}</h2>
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
