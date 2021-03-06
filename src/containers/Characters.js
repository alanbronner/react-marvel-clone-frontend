import React, { useState, useEffect } from "react";

import Axios from "axios";

import Card from "../components/Card";
import Pagination from "../components/Pagination";

import Gif from "../loader.gif";
import NervousSticker from "../NervousSticker.png";

const Characters = ({ API_CONFIG, data, setData }) => {
  const [loading, setLoading] = useState("loading");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 100;
  let skipping = 0;
  if (currentPage > 1) {
    skipping = (currentPage - 1) * 100;
  }
  const params = `limit=${limit}&offset=${skipping}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `https://gateway.marvel.com/v1/public/characters?${params}&ts=${API_CONFIG.ts}&apikey=${API_CONFIG.MARVEL_API_PUBLIC_KEY}&hash=${API_CONFIG.hash}`
        );

        setData(response.data.data);
        setLoading("loaded");
      } catch (error) {
        console.log("error.message = ", error.message);
      }
    };
    getData();
  }, [params]);

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
          {data.count >= 1 ? (
            <>
              <section className="characters_wrapper">
                {data.results
                  .filter(
                    (comic) =>
                      comic.thumbnail.path !==
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                  )
                  .map((character) => {
                    return (
                      <Card
                        variant="characters"
                        key={character.id}
                        id={character.id}
                        name={character.name}
                        photo={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        description={character.description}
                      />
                    );
                  })}
              </section>
              <section className="pagination_wrapper">
                <Pagination
                  totalPages={data.total / limit}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </section>
            </>
          ) : (
            <div className="search_wrapper_empty">
              <div className="search_wrapper_empty_title">
                <h1>Oups</h1>

                <div className="search_wrapper_empty_img">
                  <img src={NervousSticker} alt="" />
                </div>
                <div className="search_wrapper_empty_content">
                  <span>
                    There is no
                    <span style={{ color: "#ed171e" }}> CHARACTERS</span> that
                    matches your keyword
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Characters;
