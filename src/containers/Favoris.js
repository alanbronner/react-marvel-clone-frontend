import React, { useState, useEffect } from "react";

import Axios from "axios";

import Gif from "../loader.gif";
import Favorite from "../components/Favorite";
import Love from "../Love.png";

const Favoris = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `https://gateway-express-marvel.herokuapp.com/user/${userId}/preferences/favoris`
        );
        setData(response.data.favoris);
        console.log(response.data);
        setLoading("loaded");
      } catch (error) {}
      //   console.log("error.response = ", error.response);
      // setError(error.response.data.message);
    };
    getData();
  }, []);

  return (
    <>
      {loading === "loading" ? (
        <div className="loader_container">
          <div className="loader_img">
            <img src={Gif} alt="" />
          </div>
          <div className="loader_title">
            <h1>Loading ...</h1>
          </div>
        </div>
      ) : (
        <>
          {typeof data !== "undefined" ? (
            <div className="favoris_items">
              <section className="favoris_characters">
                <div className="favoris_title">Characters</div>
                <div className="favoris_characters_wrapper">
                  {data
                    .filter((character) => character.type === "character")
                    .map((character) => {
                      return (
                        <div
                          className="favorite_item_character"
                          style={{
                            backgroundImage: `url(${character.fav})`,
                          }}
                        >
                          <section className="favorite_item_body">
                            <div id={character.id}>{character.name}</div>
                          </section>

                          <section className="favorite_item_remove">
                            <Favorite id={character.id} setData={setData} />
                          </section>
                        </div>
                      );
                    })}
                </div>
              </section>
              <section className="favoris_comics">
                <div className="favoris_title">Comics</div>

                <div className="favoris_comics_wrapper">
                  {data
                    .filter((comic) => comic.type === "comic")
                    .map((comic) => {
                      return (
                        <div
                          className="favorite_item_comic"
                          style={{
                            backgroundImage: `url(${comic.fav})`,
                          }}
                        >
                          <section className="favorite_item_body">
                            <div id={comic.id}>{comic.name}</div>
                          </section>
                          <section className="favorite_item_remove">
                            <Favorite id={comic.id} setData={setData} />
                          </section>
                        </div>
                      );
                    })}
                </div>
              </section>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Favoris;
