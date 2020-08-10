import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({
  name,
  description,
  photo,
  variant,
  id,
  series,
  stories,
  comics,
  characters,
  comicsIsHidden,
  setComicsIsHidden,
  seriesIsHidden,
  setSeriesIsHidden,
  storiesIsHidden,
  setStoriesIsHidden,
}) => {
  const history = useHistory();

  const renderCardVariant = () => {
    switch (variant) {
      case "comics":
        return (
          <div
            className="list_item"
            style={{
              backgroundImage: `url(${photo})`,
            }}
            id={id}
            onClick={() => {
              history.push("/comic/" + id, {
                previousPage: "/comics/",
              });
            }}
          >
            <div className="list_img">
              {/* <img src={photo} alt={name} /> */}
            </div>
            <div className="list_body">
              <div className="list_title">
                <h2>{name.toUpperCase()}</h2>
              </div>
              <div className="list_content">
                <button className="btn">More</button>

                {/* <div className="list_content">
                {"object" === typeof description ? (
                  <p>Description not available</p>
                ) : (
                  <p>{description}</p>
                )}
              </div> */}
              </div>
            </div>
          </div>
        );
        break;

      case "comic":
        return (
          <div className="hero_wrapper">
            <div className="hero_img">
              <img src={photo} alt={name} />
            </div>

            <div className="hero_body">
              <div className="hero_title">
                <h2>{name.toUpperCase()}</h2>
              </div>

              <div className="hero_content">
                {"object" === typeof description ? (
                  <p>Description not available</p>
                ) : (
                  <p>{description}</p>
                )}
              </div>
            </div>
            <div className="hero_extra_content">
              {characters.length > 0 ? (
                <div className="hero_extra_wrapper">
                  <h3>characters</h3>
                  {characters.map((character, index) => {
                    return (
                      <>
                        <p id={index}>{character.name}</p>
                      </>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        );
      case "characters":
        return (
          <div
            className="list_item"
            id={id}
            style={{
              backgroundImage: `url(${photo})`,
            }}
            onClick={() => {
              history.push("/character/" + id, {
                previousPage: "/characters/",
              });
            }}
          >
            <div className="list_img">
              {/* <img src={photo} alt={name} /> */}
            </div>
            <div className="list_body">
              <div className="list_title">
                <h2>{name.toUpperCase()}</h2>
              </div>
              <div className="list_content">
                <button className="btn">More</button>
                {/* <div className="list_content">
                {!description.length ? (
                  <p>Description not available</p>
                ) : (
                  <p>{description}</p>
                )}
              </div> */}
              </div>
            </div>
          </div>
        );
      case "character":
        return (
          <div className="hero_wrapper">
            <div className="hero_img">
              <img src={photo} alt={name} />
            </div>

            <div className="hero_body">
              <div className="hero_title">
                <h2>{name.toUpperCase()}</h2>
              </div>
              <div className="hero_content">
                {!description.length ? (
                  <p>Description not available</p>
                ) : (
                  <p>{description}</p>
                )}
              </div>
            </div>
            <div className="hero_extra_content">
              {comics.length > 0 ? (
                <div className="extra_content_wrapper">
                  <div className="extra_content_btn">
                    <button
                      className="btn"
                      onClick={() => {
                        setComicsIsHidden(!comicsIsHidden);
                      }}
                    >
                      Comics
                    </button>
                  </div>
                  <div
                    id="comics"
                    className="extra_content_tab"
                    style={{
                      display: comicsIsHidden ? "none" : "block",
                    }}
                  >
                    <h3>Comics</h3>
                    {comics.map((comic, index) => {
                      return <p id={index}>{comic.name}</p>;
                    })}
                  </div>
                </div>
              ) : null}
              {series.length > 0 ? (
                <div className="extra_content_wrapper">
                  <div className="extra_content_btn">
                    <button
                      className="btn"
                      onClick={() => {
                        setSeriesIsHidden(!seriesIsHidden);
                      }}
                    >
                      Series
                    </button>
                  </div>
                  <div
                    id="series"
                    className="extra_content_tab"
                    style={{
                      display: seriesIsHidden ? "none" : "block",
                    }}
                  >
                    <h3>Series</h3>
                    {series.map((serie, index) => {
                      return <p id={index}>{serie.name}</p>;
                    })}
                  </div>
                </div>
              ) : null}
              {stories.length > 0 ? (
                <div className="extra_content_wrapper">
                  <div className="extra_content_btn">
                    <button
                      className="btn"
                      onClick={() => {
                        setStoriesIsHidden(!storiesIsHidden);
                      }}
                    >
                      Stories
                    </button>
                  </div>
                  <div
                    id="stories"
                    className="extra_content_tab"
                    style={{
                      display: storiesIsHidden ? "none" : "block",
                    }}
                  >
                    <h3>Stories</h3>
                    {stories.map((story, index) => {
                      return <p id={index}>{story.name.split("#")[0]}</p>;
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      default:
        return <h1>oh oh something went wrong!</h1>;
        break;
    }
  };
  return <>{renderCardVariant()}</>;
};

export default Card;
