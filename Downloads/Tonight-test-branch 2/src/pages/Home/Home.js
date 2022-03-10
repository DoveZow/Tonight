import React,{Fragment, useState, useRef} from "react";
import NavBar from "./Navbar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import "./Home.css"
import DisplayBlock from "./DisplayBlock";


const Home = () => {
  
  
  return (
    <Fragment>
      <NavBar />
      <div id="imh">
        <DisplayBlock/>
      </div>
      <SearchBar/>
    </Fragment>
    
  );
};

export default Home;
