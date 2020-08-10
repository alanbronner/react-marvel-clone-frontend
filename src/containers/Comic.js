import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Axios from "axios";

import Card from "../components/Card";
import Favorite from "../components/Favorite";

import Gif from "../loader.gif";

const Comic = ({ API_CONFIG }) => {
  const { id } = useParams();
  const history = useHistory();
  const previousPage = history.location.state.previousPage;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          `https://gateway.marvel.com/v1/public/comics/${id}?apikey=${API_CONFIG.MARVEL_API_PUBLIC_KEY}`
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
        <div className="comic_container">
          <section className="hero_section" id={data.results[0].id}>
            <Card
              variant="comic"
              name={data.results[0].title}
              description={data.results[0].description}
              photo={
                data.results[0].thumbnail.path +
                "." +
                data.results[0].thumbnail.extension
              }
              characters={data.results[0].characters.items}
            />
          </section>
          <section className="favorite_section">
            <Favorite
              id={data.results[0].id}
              variant="comic"
              name={data.results[0].title}
              photo={
                data.results[0].thumbnail.path +
                "." +
                data.results[0].thumbnail.extension
              }
            />
            <div className="go_back_btn">
              <button
                className="btn"
                onClick={() => history.push(previousPage)}
              >
                Go back
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Comic;
