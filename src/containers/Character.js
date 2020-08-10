import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Card from "../components/Card";
import Favorite from "../components/Favorite";

import Gif from "../loader.gif";

import Axios from "axios";

const Character = ({ API_CONFIG }) => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [comicsIsHidden, setComicsIsHidden] = useState(true);
  const [seriesIsHidden, setSeriesIsHidden] = useState(true);
  const [storiesIsHidden, setStoriesIsHidden] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${API_CONFIG.MARVEL_API_PUBLIC_KEY}`
        );
        setData(response.data.data);
        setLoading("loaded");
      } catch (error) {
        console.log("error.message = ", error.message);
      }
    };
    getData();
  }, [id]);

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
        <div className="character_container">
          <section className="hero_section" id={data.results[0].id}>
            <Card
              variant="character"
              name={data.results[0].name}
              description={data.results[0].description}
              photo={
                data.results[0].thumbnail.path +
                "." +
                data.results[0].thumbnail.extension
              }
              comics={data.results[0].comics.items}
              series={data.results[0].series.items}
              stories={data.results[0].stories.items}
              comicsIsHidden={comicsIsHidden}
              setComicsIsHidden={setComicsIsHidden}
              seriesIsHidden={seriesIsHidden}
              setSeriesIsHidden={setSeriesIsHidden}
              storiesIsHidden={storiesIsHidden}
              setStoriesIsHidden={setStoriesIsHidden}
            ></Card>
          </section>
          <section className="favorite_section">
            <Favorite
              id={data.results[0].id}
              variant="character"
              name={data.results[0].name}
              photo={
                data.results[0].thumbnail.path +
                "." +
                data.results[0].thumbnail.extension
              }
            />
            {typeof history.location.state !== "undefined" ? (
              <div className="go_back_btn">
                <button
                  className="btn"
                  onClick={() =>
                    history.push(history.location.state.previousPage)
                  }
                >
                  Go back
                </button>
              </div>
            ) : (
              <button
                className="btn"
                onClick={() => history.push("/characters")}
              >
                See more
              </button>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Character;
