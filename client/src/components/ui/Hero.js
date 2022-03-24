import React, { useState, useEffect } from "react";
import "./Hero.css";
import HeroButtons from "../HeroButtons";

const Hero = ({ username, isAuthenticated, isAdmin }) => {
  let heroHeader = "";
  let heroP = "";

  if (isAuthenticated && !isAdmin) {
    heroHeader = `Hello, ${username}`;
  } else if (isAuthenticated && isAdmin) {
    heroHeader = "Welcome to Admin Dashboard";
  } else {
    heroHeader = "Welcome to Tonight";
  }

  if (isAdmin) {
    heroP = "";
  } else {
    heroP =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim";
  }
  return (
    <div
      className={
        isAdmin
          ? "hero-container width-100 hero-background-admin"
          : "hero-container width-100 hero-background"
      }
    >
      <div className="hero center-content text-white">
        <div className="hero-text">
          <h2>{heroHeader}</h2>
          <p>{heroP}</p>
          <HeroButtons isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
