import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Axios from "axios";

const Search = ({ API_CONFIG, setData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let location = useLocation();

  const toSubmit = async () => {
    if (!searchTerm) {
      return;
    } else {
      let url;
      if (location.pathname === "/comics") {
        url = `http://gateway.marvel.com/v1/public/comics?limit=100&titleStartsWith=${searchTerm}&ts=${API_CONFIG.ts}&apikey=${API_CONFIG.MARVEL_API_PUBLIC_KEY}&hash=${API_CONFIG.hash}`;
      } else {
        url = `http://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${searchTerm}&ts=${API_CONFIG.ts}&apikey=${API_CONFIG.MARVEL_API_PUBLIC_KEY}&hash=${API_CONFIG.hash}`;
      }
      try {
        const response = await Axios.get(url);
        setData(response.data.data);
        setSearchTerm("");
      } catch (error) {
        alert("an error occured");
        console.log("error.message = ", error.message);
      }
    }
  };

  const submit = (event) => {
    event.preventDefault();
    toSubmit();
  };
  return (
    <div className="searchbar_wrapper">
      <form onSubmit={submit}>
        <div className="input_icon_wrap_search">
          <span className="input_icon_search"></span>
          <input
            className="searchbar_with_icon"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
