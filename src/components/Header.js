import React from "react";
import { Link, useLocation } from "react-router-dom";

import Search from "../components/Search";

import Logo from "../MarvelLogoColor.svg";
import ConnectionSticker from "../ConnectionSticker.png";
import FavoritesSticker from "../FavoritesSticker.png";
import ComicsSticker from "../ComicsSticker.png";
import CharactersSticker from "../CharactersSticker.png";

const Header = ({ onLogOff, userToken, setData, API_CONFIG }) => {
  const location = useLocation();
  let style = {};
  switch (location.pathname) {
    case "/comics":
      style = {
        backgroundColor: "black",
        borderBottom: "solid 2px #ed171e",
      };

      break;
    default:
      style = {
        backgroundColor: "black",
        borderBottom: "solid 2px #ed171e",
      };
      break;
  }

  return (
    <div className="header_container" style={{ style }}>
      <div className="header_logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      {location.pathname === "/comics" ||
      location.pathname === "/characters" ? (
        <div className="search_section">
          <Search API_CONFIG={API_CONFIG} setData={setData} />
        </div>
      ) : null}
      <div className="header_nav">
        <Link to="/characters">
          <div className="header_link">
            <img src={CharactersSticker} width="40px" />
            <div>
              <span> CHARACTERS</span>
            </div>
          </div>
        </Link>
        <Link to="/comics">
          <div className="header_link">
            <img src={ComicsSticker} width="40px" />
            <div>
              <span>COMICS</span>
            </div>
          </div>
        </Link>
        {!userToken ? null : (
          <>
            <Link to="/favoris">
              <div className="header_link">
                <img src={FavoritesSticker} width="40px" />
                <div>
                  <span>FAVORIS</span>
                </div>
              </div>
            </Link>

            <div className="header_link">
              <img src={ConnectionSticker} width="40px" />
              <div
                onClick={() => {
                  onLogOff();
                }}
              >
                <span>DISCONNECT</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
