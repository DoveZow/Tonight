
import React from "react";
import "./SearchBar.css"


const SearchBar = () => {
  async function submitSearch(mes){
    console.log(mes);
  }

  return (
    <div>
      <form method="post" action="/search">
        <input type="text" name="u-search-bar" id="search" placeholder=""></input>
        <button onClick={submitSearch()} id="button" className="button auth-button width-100 background-blue text-white text-bold">
          Search
        </button>
      </form>
      <br/>
    </div>
  )
}

export default SearchBar
